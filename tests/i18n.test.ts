import { test } from "node:test";
import assert from "node:assert/strict";
import { detetarIdioma } from "../lib/i18n.ts";

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
