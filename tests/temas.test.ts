import { test } from "node:test";
import assert from "node:assert/strict";
import { TEMAS } from "../lib/data/temas.ts";
import { ENTIDADES } from "../lib/data/fontes.ts";
import { BALCOES_DEF, balcaoDeTema } from "../lib/balcoes.ts";

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

test("temas: palavras-chave normalizadas (minúsculas, sem espaços nem diacríticos)", () => {
  const problemas: string[] = [];
  for (const t of TEMAS) {
    for (const p of t.perguntas) {
      for (const w of p.palavras) {
        const normalizada = w
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{M}/gu, "");
        if (w !== normalizada || /\s/.test(w)) {
          problemas.push(`${p.id}: keyword inválida "${w}" (esperado "${normalizada}")`);
        }
      }
    }
  }
  assert.deepEqual(problemas, []);
});

test("temas: todos os temas de TEMAS existem exatamente uma vez em BALCOES_DEF", () => {
  const todosEmBalcoes = BALCOES_DEF.flatMap((b) => b.temas);
  assert.equal(
    new Set(todosEmBalcoes).size,
    todosEmBalcoes.length,
    "BALCOES_DEF tem ids de tema duplicados"
  );

  const idsTemas = new Set(TEMAS.map((t) => t.id));
  for (const id of todosEmBalcoes) {
    assert.ok(idsTemas.has(id), `BALCOES_DEF referencia tema inexistente "${id}"`);
  }
  for (const t of TEMAS) {
    assert.ok(
      balcaoDeTema(t.id) >= 0,
      `tema "${t.id}" não está atribuído a nenhum balcão em BALCOES_DEF`
    );
  }
  assert.equal(
    balcaoDeTema("cartao-de-cidadao"),
    0,
    "cartao-de-cidadao deve pertencer ao Balcão 1 (Identificação)"
  );
});
