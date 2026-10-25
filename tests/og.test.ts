import { test } from "node:test";
import assert from "node:assert/strict";
import { codigoSenha, tamanhoLetra, textoSelo } from "../lib/og.ts";
import { TEMAS } from "../lib/data/temas.ts";

test("og: código de senha — único, estável e no formato L-NN", () => {
  const codigos = new Set<string>();
  for (const tema of TEMAS) {
    for (const p of tema.perguntas) {
      const c = codigoSenha(p.id);
      assert.match(c!, /^[A-Z]-\d{2}$/, `${p.id}: formato ${c}`);
      assert.ok(!codigos.has(c!), `${p.id}: código duplicado ${c}`);
      codigos.add(c!);
      // estabilidade: chamar duas vezes dá o mesmo
      assert.equal(codigoSenha(p.id), c);
    }
  }
  assert.equal(codigos.size, TEMAS.flatMap((t) => t.perguntas).length);
});

test("og: código de senha devolve null para id desconhecido", () => {
  assert.equal(codigoSenha("nao-existe"), null);
});

test("og: tamanho de letra por comprimento", () => {
  assert.equal(tamanhoLetra("Onde voto?"), 72); // curta
  assert.equal(tamanhoLetra("a".repeat(34)), 72); // fronteira
  assert.equal(tamanhoLetra("b".repeat(35)), 60); // média
  assert.equal(tamanhoLetra("c".repeat(64)), 60);
  assert.equal(tamanhoLetra("d".repeat(65)), 48); // longa
  assert.equal(
    tamanhoLetra("x".repeat(200)),
    48
  );
});

test("og: selo — verificadoEm formata como VerificadoEm; sem data, 'Grátis. Sem registo.'", () => {
  assert.equal(textoSelo("2026-10-25", "pt"), "Confirmado em out. 2026");
  assert.equal(textoSelo("2026-10-25", "en"), "Confirmed in Oct 2026");
  assert.equal(textoSelo(undefined, "pt"), "Grátis. Sem registo.");
  assert.equal(textoSelo("lixo", "en"), "Grátis. Sem registo.");
});
