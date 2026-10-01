/**
 * Gera lib/data/temas.en.ts — traduções EN das respostas curadas.
 *
 * Uso: npm run traduzir:en
 *
 * - Só re-traduz respostas cujo hash do texto PT mudou (incremental).
 * - Requer LLM_BASE_URL/LLM_API_KEY/LLM_MODEL (lê .env.local se existir).
 * - Falha (exit 1) se alguma tradução alterar números, valores € ou URLs.
 * - Entradas marcadas `revisao: true` são geradas mas NÃO servidas —
 *   ficam à espera de revisão humana (lista SENSIVEIS abaixo).
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");

// --- env -------------------------------------------------------------------
function carregaEnv(f) {
  if (!existsSync(f)) return;
  for (const linha of readFileSync(f, "utf8").split("\n")) {
    const m = linha.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}
carregaEnv(join(RAIZ, ".env.local"));
carregaEnv(join(RAIZ, ".env"));

const BASE_URL = (process.env.LLM_BASE_URL ?? "").replace(/\/+$/, "");
const API_KEY = process.env.LLM_API_KEY ?? "";
const MODEL = process.env.LLM_MODEL ?? "openai/gpt-oss-120b";
const MODO_DRY = process.argv.includes("--dry-run");
/** --forcar id1,id2: re-traduz mesmo que o hash PT não tenha mudado. */
const FORCAR = new Set(
  (process.argv.find((a, i) => process.argv[i - 1] === "--forcar") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);

if (!MODO_DRY && (!BASE_URL || !API_KEY)) {
  console.error("Falta LLM_BASE_URL/LLM_API_KEY — vê .env.example.");
  process.exit(2);
}

// --- dados ------------------------------------------------------------------
const { TEMAS } = await import("../lib/data/temas.ts");
const { normalizarRespostaEn } = await import("../lib/glossario-en.ts");

let existente = {};
try {
  ({ TEMAS_EN: existente } = await import("../lib/data/temas.en.ts"));
} catch {
  /* primeira geração */
}

/** Respostas administrativamente sensíveis — geradas mas retidas até revisão. */
const SENSIVEIS = new Set([
  "aima-residencia",
  "irn-nacionalidade",
  "vis-tipos",
  "vis-agendar-aima",
  "ue-mudar",
  "ue-cesd",
  "irs-entregar",
  "irs-reembolso",
  "at-nif",
  "at-certidao-domicilio",
]);

const GLOSSARIO = `Glossário fixo (não variar entre respostas):
Cartão de Cidadão = Citizen Card; NIF = NIF (Portuguese tax identification number);
NISS = NISS; Segurança Social = Social Security; Finanças / Autoridade Tributária = Tax Authority;
SNS = SNS (National Health Service); SNS 24 = SNS 24; AIMA = AIMA; IRN = IRN;
Chave Móvel Digital = Digital Mobile Key; Loja do Cidadão = Loja do Cidadão;
ePortugal = ePortugal; IRS = IRS (income tax); IUC = IUC (vehicle tax);
Livro de Reclamações = complaints book ("Livro de Reclamações").`;

const PROMPT = (p) => `${GLOSSARIO}

Regras de tradução:
- Inglês claro e simples para imigrantes a viver em Portugal.
- Nomes de entidades e de serviços ficam em português; na primeira menção podes acrescentar uma gloss curta entre parênteses.
- Números de telefone, valores em €, percentagens, datas, URLs e nomes de páginas/botões de sites oficiais ficam EXATAMENTE como no original — o utilizador vai encontrá-los em português.
- "palavras": 5 a 10 palavras-chave de pesquisa em inglês, minúsculas (não precisam de ser traduções literais).
- Devolve SÓ JSON válido: {"passos": ["..."], "nota": "... ou null", "palavras": ["..."]}

Fonte (JSON):
${JSON.stringify({ texto: p.texto, passos: p.resposta.passos, nota: p.resposta.nota ?? null, palavras_pt: p.palavras }, null, 0)}`;

// --- hash + validação --------------------------------------------------------
function hashOrigem(p) {
  const canon = JSON.stringify({
    t: p.texto,
    s: p.resposta.passos,
    n: p.resposta.nota ?? null,
    w: p.palavras,
  });
  return createHash("sha256").update(canon).digest("hex").slice(0, 16);
}

/** Extrai os invariantes que a tradução tem de preservar à letra. */
function invariantes(texto) {
  const nums = (texto.match(/\d[\d .:,]*\d|\d/g) ?? []).map((s) =>
    s.replace(/[ .:,]/g, "")
  );
  const urls = texto.match(/https?:\/\/[^\s)"']+|[\w-]+\.(?:gov\.pt|pt|eu)\b/g) ?? [];
  const euros = (texto.match(/€|\beuros?\b/gi) ?? []).length;
  return {
    nums: nums.sort(),
    urls: urls.map((u) => u.toLowerCase()).sort(),
    euros,
  };
}

function diffInvariantes(pt, en) {
  const a = invariantes(pt);
  const b = invariantes(en);
  const falhas = [];
  if (JSON.stringify(a.nums) !== JSON.stringify(b.nums))
    falhas.push(`números divergem: PT=${a.nums.join(",")} EN=${b.nums.join(",")}`);
  if (JSON.stringify(a.urls) !== JSON.stringify(b.urls))
    falhas.push(`urls divergem: PT=${a.urls.join(",")} EN=${b.urls.join(",")}`);
  if (a.euros !== b.euros)
    falhas.push(`menções a € divergem: PT=${a.euros} EN=${b.euros}`);
  return falhas;
}

// --- chamada ao modelo -------------------------------------------------------
async function traduzir(p) {
  let res = null;
  for (let tentativa = 0; tentativa < 4; tentativa++) {
    res = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "És um tradutor PT→EN de informação administrativa portuguesa. Respondes apenas com JSON válido.",
          },
          { role: "user", content: PROMPT(p) },
        ],
      }),
    });
    if (res.status !== 429) break;
    const espera = Math.min(Number(res.headers.get("retry-after")) || 20, 90);
    await new Promise((r) => setTimeout(r, espera * 1000));
    res = null;
  }
  if (!res) throw new Error("LLM 429 (esgotadas tentativas)");
  const data = await res.json();
  const bruto = data?.choices?.[0]?.message?.content ?? "";
  const inicio = bruto.indexOf("{");
  const fim = bruto.lastIndexOf("}");
  const parsed = JSON.parse(bruto.slice(inicio, fim + 1));
  if (!Array.isArray(parsed.passos) || parsed.passos.length === 0)
    throw new Error("passos vazio");
  return {
    passos: parsed.passos.map((s) => String(s)),
    nota: typeof parsed.nota === "string" && parsed.nota ? parsed.nota : undefined,
    palavras: Array.isArray(parsed.palavras)
      ? parsed.palavras.map((s) => String(s).toLowerCase())
      : [],
  };
}

// --- main --------------------------------------------------------------------
const hoje = new Date().toISOString().slice(0, 10);
const saida = {};
let geradas = 0;
let mantidas = 0;
const erros = [];

for (const tema of TEMAS) {
  for (const p of tema.perguntas) {
    const hash = hashOrigem(p);
    const prev = existente[p.id];
    if (prev && prev.hashOrigem === hash && !FORCAR.has(p.id)) {
      // Mesmo mantida, passa pelo pós-processamento do glossário —
      // corrige variantes antigas sem nova chamada ao LLM.
      saida[p.id] = { ...prev, ...normalizarRespostaEn(prev) };
      mantidas++;
      continue;
    }
    if (MODO_DRY) {
      console.log(`[dry] traduziria ${p.id} (${prev ? "PT mudou" : "novo"})`);
      continue;
    }
    try {
      const en = normalizarRespostaEn(await traduzir(p));
      const falhas = [
        ...p.resposta.passos.map((pt, i) =>
          en.passos[i] ? diffInvariantes(pt, en.passos[i]) : ["passo em falta"]
        ).flat(),
        ...(p.resposta.nota && en.nota
          ? diffInvariantes(p.resposta.nota, en.nota)
          : []),
      ];
      if (falhas.length) {
        erros.push(`${p.id}: ${falhas.join(" | ")}`);
        continue; // não entra no ficheiro — fica o PT com nota
      }
      saida[p.id] = {
        traduzidaDe: p.id,
        geradoEm: hoje,
        hashOrigem: hash,
        ...(SENSIVEIS.has(p.id) ? { revisao: true } : {}),
        palavras: en.palavras,
        passos: en.passos,
        ...(en.nota ? { nota: en.nota } : {}),
      };
      geradas++;
      console.log(`✓ ${p.id}`);
    } catch (e) {
      erros.push(`${p.id}: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
}

if (!MODO_DRY) {
  const blocos = Object.values(saida)
    .map((r) => `  ${JSON.stringify(r.traduzidaDe)}: ${JSON.stringify(r, null, 0)},`)
    .join("\n");
  const conteudo = `/**
 * GERADO por scripts/gerar-temas-en.mjs — não editar à mão.
 * Cada entrada guarda o hash do texto PT de origem; se o PT mudar, o script
 * re-traduz só essa resposta. Entradas com \`revisao: true\` foram geradas mas
 * NÃO são servidas — aguardam revisão humana (retirar a marca após rever).
 * Sensíveis por rever: ${[...SENSIVEIS].join(", ")}
 */
import type { RespostaEn } from "@/lib/types";

export const TEMAS_EN: Record<string, RespostaEn> = {
${blocos}
};
`;
  writeFileSync(join(RAIZ, "lib/data/temas.en.ts"), conteudo);
}

console.log(
  `\n${geradas} traduzidas, ${mantidas} mantidas (hash igual), ${Object.keys(saida).length} no ficheiro, ${erros.length} com erro.`
);
if (erros.length) {
  console.error("FALHAS:\n" + erros.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
