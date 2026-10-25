import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { KeywordEngine } from "../lib/engine.ts";

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
});
