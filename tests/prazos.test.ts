import { test } from "node:test";
import assert from "node:assert/strict";
import { PRAZOS } from "../lib/data/prazos.ts";
import { TEMAS } from "../lib/data/temas.ts";
import { ENTIDADES } from "../lib/data/fontes.ts";

const DATA_RE = /^\d{4}-\d{2}-\d{2}$/;
const idsPerguntas = new Set(TEMAS.flatMap((t) => t.perguntas.map((p) => p.id)));

test("prazos: ids únicos", () => {
  const ids = PRAZOS.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("prazos: perguntaId existe na base curada", () => {
  for (const p of PRAZOS) {
    if (p.perguntaId) {
      assert.ok(idsPerguntas.has(p.perguntaId), `${p.id}: perguntaId desconhecido`);
    }
  }
});

test("prazos: datas válidas, inicio <= fim", () => {
  for (const p of PRAZOS) {
    assert.match(p.fim, DATA_RE, `${p.id}: fim inválido`);
    assert.ok(!Number.isNaN(Date.parse(p.fim)), p.id);
    if (p.inicio) {
      assert.match(p.inicio, DATA_RE, `${p.id}: início inválido`);
      assert.ok(p.inicio <= p.fim, `${p.id}: inicio depois do fim`);
    }
  }
});

test("prazos: fonte com domínio em fontes.ts e verificadoEm preenchido", () => {
  for (const p of PRAZOS) {
    assert.ok(p.fonte.dominio in ENTIDADES, `${p.id}: domínio desconhecido`);
    assert.match(p.verificadoEm, DATA_RE, `${p.id}: sem verificadoEm`);
  }
});
