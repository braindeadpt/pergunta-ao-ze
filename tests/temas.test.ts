import { test } from "node:test";
import assert from "node:assert/strict";
import { TEMAS } from "../lib/data/temas.ts";
import { ENTIDADES } from "../lib/data/fontes.ts";

/**
 * Validação estrutural da base curada — corre em cada build/CI.
 * Se um tema novo falhar aqui, o erro diz o que falta.
 */

test("temas: ids de tema e de pergunta são únicos", () => {
  const temas = TEMAS.map((t) => t.id);
  assert.equal(new Set(temas).size, temas.length, "ids de tema duplicados");

  const perguntas = TEMAS.flatMap((t) => t.perguntas.map((p) => p.id));
  assert.equal(
    new Set(perguntas).size,
    perguntas.length,
    "ids de pergunta duplicados"
  );
});

test("temas: cada pergunta tem palavras-chave não vazias", () => {
  for (const t of TEMAS) {
    for (const p of t.perguntas) {
      assert.ok(
        p.palavras.length > 0 && p.palavras.every((w) => w.trim().length > 0),
        `${p.id}: palavras vazias ou em falta`
      );
    }
  }
});

test("temas: cada resposta tem pelo menos 1 passo e 1 fonte", () => {
  for (const t of TEMAS) {
    for (const p of t.perguntas) {
      assert.ok(p.resposta.passos.length > 0, `${p.id}: sem passos`);
      assert.ok(p.resposta.fontes.length > 0, `${p.id}: sem fontes`);
    }
  }
});

test("temas: o domínio de cada fonte existe em fontes.ts (ENTIDADES)", () => {
  for (const t of TEMAS) {
    for (const p of t.perguntas) {
      for (const f of p.resposta.fontes) {
        assert.ok(
          f.dominio in ENTIDADES,
          `${p.id}: domínio "${f.dominio}" sem entrada em lib/data/fontes.ts`
        );
      }
    }
  }
});
