import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { KeywordEngine } from "../lib/engine.ts";
import { TEMAS } from "../lib/data/temas.ts";
import { TEMAS_EN } from "../lib/data/temas.en.ts";
import { TITULOS_EN, TEMAS_TITULO_EN } from "../lib/data/titulos.en.ts";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const golden: { pergunta: string; idEsperado: string | null }[] = JSON.parse(
  readFileSync(join(RAIZ, "tests/golden.json"), "utf8")
);
const baseline: { top1: number; top3: number } = JSON.parse(
  readFileSync(join(RAIZ, "tests/golden-baseline.json"), "utf8")
);

/** Acertou top-1: id esperado veio como resposta; null = não devia haver resposta. */
function acertouTop1(r: Awaited<ReturnType<KeywordEngine["responder"]>>, esperado: string | null) {
  const id = r.tipo === "resposta" ? r.pergunta?.id : null;
  return id === esperado;
}

function acertouTop3(r: Awaited<ReturnType<KeywordEngine["responder"]>>, esperado: string | null) {
  if (esperado === null) return r.tipo !== "resposta";
  const ids = [
    r.tipo === "resposta" ? r.pergunta?.id : null,
    ...(r.sugestoes ?? []).map((s) => s.id),
  ];
  return ids.includes(esperado);
}

test("golden set: top-1 não regride mais de 2pp face à baseline", async () => {
  const engine = new KeywordEngine();
  let top1 = 0;
  let top3 = 0;
  const falhas: string[] = [];

  for (const c of golden) {
    const r = await engine.responder(c.pergunta);
    const ok1 = acertouTop1(r, c.idEsperado);
    const ok3 = acertouTop3(r, c.idEsperado);
    if (ok1) top1++;
    if (ok3) top3++;
    if (!ok3) {
      const veio =
        r.tipo === "resposta" ? r.pergunta?.id : (r.sugestoes[0]?.id ?? "nada");
      falhas.push(`  ✗ "${c.pergunta}" → esperado ${c.idEsperado}, veio ${veio}`);
    }
  }

  const tx1 = top1 / golden.length;
  const tx3 = top3 / golden.length;
  console.log(
    `golden: ${golden.length} casos | top-1 ${(tx1 * 100).toFixed(1)}% ` +
      `(baseline ${(baseline.top1 * 100).toFixed(1)}%) | ` +
      `top-3 ${(tx3 * 100).toFixed(1)}% (baseline ${(baseline.top3 * 100).toFixed(1)}%)`
  );
  if (falhas.length) console.log("fora do top-3:\n" + falhas.join("\n"));

  assert.ok(
    tx1 >= baseline.top1 - 0.02,
    `top-1 ${(tx1 * 100).toFixed(1)}% abaixo da baseline ` +
      `${(baseline.top1 * 100).toFixed(1)}% - 2pp — atualiza golden-baseline.json ` +
      `só se a regressão for aceite de propósito`
  );
  assert.ok(
    tx3 >= baseline.top3 - 0.01,
    `top-3 ${(tx3 * 100).toFixed(1)}% abaixo da baseline ${(baseline.top3 * 100).toFixed(1)}%`
  );
});

test("títulos curados PT e EN acertam sempre na própria pergunta", async () => {
  const engine = new KeywordEngine();
  for (const tema of TEMAS) {
    for (const p of tema.perguntas) {
      const rPt = await engine.responder(p.texto, "pt");
      assert.equal(rPt.tipo, "resposta", `PT falhou: ${p.id}`);
      assert.equal(rPt.pergunta?.id, p.id);

      const titEn = TITULOS_EN[p.id];
      const en = TEMAS_EN[p.id];
      if (titEn && en && en.revisao !== true) {
        const rEn = await engine.responder(titEn, "en");
        assert.equal(rEn.tipo, "resposta", `EN falhou: ${p.id}`);
        assert.equal(rEn.pergunta?.id, p.id);
        assert.equal(rEn.idioma, "en");
      }
    }
  }
});

test("sugestões em EN usam TITULOS_EN/TEMAS_TITULO_EN e filtram revisao: true", async () => {
  const engine = new KeywordEngine();
  const rPop = await engine.responder("xyzzy unknown topic", "en");
  assert.equal(rPop.tipo, "sugestoes");
  assert.ok(rPop.sugestoes.length > 0);
  for (const s of rPop.sugestoes) {
    assert.notEqual(TEMAS_EN[s.id]?.revisao, true);
    assert.equal(s.texto, TITULOS_EN[s.id]);
    const tema = TEMAS.find((t) => t.perguntas.some((p) => p.id === s.id))!;
    assert.equal(s.tema, TEMAS_TITULO_EN[tema.id]);
  }

  // Mesmo no tema IRS/Finanças (onde at-nif e at-certidao-domicilio têm revisao: true),
  // as sugestões relacionadas em EN nunca expõem entradas por rever.
  const rIrs = await engine.responder("How do I file my IRS return?", "en");
  assert.equal(rIrs.tipo, "resposta");
  for (const s of rIrs.sugestoes) {
    assert.notEqual(TEMAS_EN[s.id]?.revisao, true);
    assert.equal(s.texto, TITULOS_EN[s.id]);
  }
});

test("qualificador forte ausente evita falso positivo mas preserva sugestão útil", async () => {
  const engine = new KeywordEngine();
  const r = await engine.responder("trocar carta de conducao estrangeira", "pt");
  assert.equal(r.tipo, "sugestoes");
  assert.ok(r.sugestoes.some((s) => s.id === "imt-renovar-carta"));
});
