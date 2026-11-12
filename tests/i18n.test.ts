import { test } from "node:test";
import assert from "node:assert/strict";
import { detetarIdioma, temPaginaEn } from "../lib/i18n.ts";
import { TEMAS } from "../lib/data/temas.ts";
import { TEMAS_EN } from "../lib/data/temas.en.ts";
import { TITULOS_EN } from "../lib/data/titulos.en.ts";

test("perguntas claramente em inglês → en", () => {
  for (const q of [
    "How do I get a NIF?",
    "How do I file IRS?",
    "Where do I vote?",
    "renew citizen card",
    "unemployment benefit application",
    "residence permit",
    "appointment",
    "IRS deadline",
  ]) {
    assert.equal(detetarIdioma(q), "en", q);
  }
});

test("perguntas em português → pt", () => {
  for (const q of [
    "Como renuevo o cartão de cidadão?",
    "quanto tempo demora o reembolso do irs",
    "marcar consulta no centro de saúde",
    "onde voto nas eleições",
    "quero pedir o abono",
  ]) {
    assert.equal(detetarIdioma(q), "pt", q);
  }
});

test("nomes próprios / demasiado curtas → ambíguo (null)", () => {
  for (const q of ["NIF?", "SNS", "ePortugal", "AIMA"]) {
    assert.equal(detetarIdioma(q), null, q);
  }
});

test("temPaginaEn: devolve false para entradas com revisao: true e IDs desconhecidos", () => {
  assert.equal(temPaginaEn("at-nif"), true);
  assert.equal(temPaginaEn("at-certidao-domicilio"), true);
  (TEMAS_EN["at-nif"] as { revisao?: boolean }).revisao = true;
  try {
    assert.equal(temPaginaEn("at-nif"), false);
  } finally {
    delete (TEMAS_EN["at-nif"] as { revisao?: boolean }).revisao;
  }
  assert.equal(temPaginaEn("id-desconhecido"), false);
  assert.equal(temPaginaEn(""), false);
});

test("temPaginaEn: garante que páginas válidas têm TEMAS_EN sem revisão e TITULOS_EN preenchido", () => {
  assert.equal(temPaginaEn("cc-renovar"), true);
  let totalEn = 0;
  for (const tema of TEMAS) {
    for (const p of tema.perguntas) {
      if (temPaginaEn(p.id)) {
        totalEn++;
        const en = TEMAS_EN[p.id];
        assert.ok(en, `TEMAS_EN deve existir para ${p.id}`);
        assert.equal(Boolean(en.revisao), false, `revisao deve ser false para ${p.id}`);
        const titulo = TITULOS_EN[p.id];
        assert.ok(
          typeof titulo === "string" && titulo.trim().length > 0,
          `TITULOS_EN deve ser string não vazia para ${p.id}`
        );
      }
    }
  }
  assert.ok(totalEn > 0, "devem existir perguntas publicadas em EN");
});
