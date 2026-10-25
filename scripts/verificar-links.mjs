// Verifica os links das fontes oficiais curadas.
//
// Uso: node --experimental-strip-types scripts/verificar-links.mjs
//      (Node >=22.18 dispensa a flag — strip-types já vem ligado)
//
// Recolhe:
//   - todos os `url` das fontes de cada resposta em lib/data/temas.ts
//   - os domínios das entidades em lib/data/fontes.ts (raiz https://dominio)
//
// Para cada URL: HEAD com fallback a GET, timeout 15 s, 2 tentativas extra,
// máx. 5 pedidos em simultâneo, User-Agent identificado.
//
// Reporta e falha (exit 1) se houver: 4xx, 5xx, timeouts/erros de rede e
// redirects para outro domínio. Redirects dentro do mesmo domínio só avisam.
// Avisa (sem falhar) quando uma resposta tem verificadoEm com +180 dias.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const { TEMAS } = await import("../lib/data/temas.ts");

const UA = "pergunta-ao-ze link-checker (+https://perguntaaoze.pt)";
const TIMEOUT_MS = 15_000;
const TENTATIVAS = 3; // 1 + 2 repetições
const CONCORRENCIA = 5;
const FRESCURA_DIAS = 180;

// --- recolha de URLs ---------------------------------------------------------
const urls = new Map(); // url -> origem (para o relatório)

for (const tema of TEMAS) {
  for (const p of tema.perguntas) {
    for (const f of p.resposta.fontes ?? []) {
      urls.set(f.url, `${p.id} → ${f.titulo}`);
    }
  }
}

// fontes.ts guarda entidades por domínio (chaves do objeto ENTIDADES);
// verificar a raiz confirma que o serviço está no ar.
const fontesSrc = readFileSync(join(RAIZ, "lib/data/fontes.ts"), "utf8");
for (const m of fontesSrc.matchAll(/^\s*"([a-z0-9-]+(?:\.[a-z0-9-]+)+)"\s*:/gim)) {
  const raizEntidade = `https://${m[1]}`;
  if (!urls.has(raizEntidade)) urls.set(raizEntidade, "entidade (fontes.ts)");
}

// --- verificação -------------------------------------------------------------
function dominio(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

async function tentar(url, metodo) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: metodo,
      redirect: "follow",
      signal: ctrl.signal,
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml,*/*;q=0.8",
      },
    });
    // Drena o corpo para libertar a ligação; não precisamos do conteúdo.
    await res.arrayBuffer().catch(() => {});
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function verificar(url) {
  let ultimoErro = null;
  for (let i = 0; i < TENTATIVAS; i++) {
    try {
      // HEAD primeiro; qualquer falha/erro >=400 cai em GET — muitos WAFs
      // aceitam GET e recusam HEAD (ou devolvem 4xx/5xx falsos).
      let res = await tentar(url, "HEAD").catch(() => null);
      if (!res || res.status >= 400) res = await tentar(url, "GET");

      const final = dominio(res.url);
      if (res.status >= 400) {
        return { url, tipo: "http", detalhe: `HTTP ${res.status}` };
      }
      if (res.redirected && final !== dominio(url)) {
        return { url, tipo: "redirect", detalhe: `redirect para ${final}` };
      }
      if (res.redirected) {
        return { url, tipo: "aviso", detalhe: `redirect interno → ${res.url}` };
      }
      return null; // ok
    } catch (e) {
      ultimoErro = e?.name === "AbortError" ? new Error("timeout (15 s)") : e;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  return {
    url,
    tipo: "erro",
    detalhe: ultimoErro?.message ?? "falha de rede",
  };
}

// --- frescura (verificadoEm) -------------------------------------------------
const avisos = [];
const limite = Date.now() - FRESCURA_DIAS * 24 * 60 * 60 * 1000;
for (const tema of TEMAS) {
  for (const p of tema.perguntas) {
    const v = p.resposta.verificadoEm;
    if (v && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
      if (Date.parse(`${v}T00:00:00Z`) < limite) {
        avisos.push(`verificadoEm antigo (> ${FRESCURA_DIAS}d): ${p.id} (${v})`);
      }
    }
  }
}

// --- corrida com concorrência limitada ---------------------------------------
const entradas = [...urls.entries()];
const falhas = [];
let proximo = 0;

async function trabalhador() {
  while (proximo < entradas.length) {
    const [url, origem] = entradas[proximo++];
    const r = await verificar(url);
    if (!r) continue;
    r.origem = origem;
    if (r.tipo === "aviso") avisos.push(`${r.url} (${r.detalhe})`);
    else falhas.push(r);
    process.stdout.write(".");
  }
}

await Promise.all(Array.from({ length: CONCORRENCIA }, trabalhador));
console.log(`\n\n${entradas.length} URLs verificados.\n`);

if (avisos.length) {
  console.log("AVISOS (não falham a corrida):");
  for (const a of avisos) console.log(`  ~ ${a}`);
  console.log();
}

if (falhas.length) {
  console.log("FALHAS:");
  for (const f of falhas) {
    console.log(`  ✗ ${f.url}\n      ${f.tipo}: ${f.detalhe} — usado em ${f.origem}`);
  }
  process.exit(1);
}
console.log("Todos os links respondem.");
