import { test } from "node:test";
import assert from "node:assert/strict";
import { TEMAS_EN } from "../lib/data/temas.en.ts";
import {
  ENTIDADES_EN,
  normalizarRespostaEn,
} from "../lib/glossario-en.ts";

/** Texto completo de uma resposta (passos + nota). */
function textoDe(r: { passos: string[]; nota?: string }): string {
  return [...r.passos, r.nota ?? ""].join("\n");
}

test("entidades usam sempre o gloss canónico (ou nenhum)", () => {
  const problemas: string[] = [];
  const canonico = new Map(ENTIDADES_EN.map((e) => [e.nome, e.gloss]));
  for (const [id, r] of Object.entries(TEMAS_EN)) {
    const txt = textoDe(r);
    for (const e of ENTIDADES_EN) {
      // apanha "Nome (qualquer coisa)" e rejeita gloss diferente do canónico
      const re = new RegExp(
        `${e.exc?.startsWith("(?<") ? e.exc : ""}` +
          `${e.nome.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}` +
          `${e.exc?.startsWith("(?!") ? e.exc : ""}\\s*\\(([^)]*)\\)`,
        "g"
      );
      for (const m of txt.matchAll(re)) {
        if (m[1] !== canonico.get(e.nome))
          problemas.push(`${id}: "${e.nome} (${m[1]})" devia ser "(${e.gloss})"`);
      }
    }
  }
  assert.deepEqual(problemas, []);
});

test("gloss aparece só na 1.ª ocorrência de cada resposta", () => {
  const problemas: string[] = [];
  for (const [id, r] of Object.entries(TEMAS_EN)) {
    const txt = textoDe(r);
    for (const e of ENTIDADES_EN) {
      const re = new RegExp(
        `${e.exc?.startsWith("(?<") ? e.exc : ""}` +
          `${e.nome.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}` +
          `${e.exc?.startsWith("(?!") ? e.exc : ""}\\s*\\(`,
        "g"
      );
      const n = [...txt.matchAll(re)].length;
      if (n > 1) problemas.push(`${id}: "${e.nome}" tem gloss ${n}×`);
    }
  }
  assert.deepEqual(problemas, []);
});

test("palavras-chave: minúsculas, sem splits nem termos PT", () => {
  const problemas: string[] = [];
  for (const [id, r] of Object.entries(TEMAS_EN)) {
    for (const p of r.palavras) {
      if (p !== p.toLowerCase() || p !== p.trim() || / {2}/.test(p))
        problemas.push(`${id}: keyword mal formatada "${p}"`);
      if (/\b[a-z]{1,2} [a-z]\b/.test(p))
        problemas.push(`${id}: keyword com sigla partida "${p}"`);
      if (/[áàâãéêíóôõúç]/.test(p))
        problemas.push(`${id}: keyword não é inglês "${p}"`);
    }
  }
  assert.deepEqual(problemas, []);
});

test("normalizarRespostaEn é determinístico e idempotente", () => {
  const entrada = {
    passos: [
      "Contact AIMA (Immigration Authority) or the old SEF (Foreigners Office).",
      "Then AIMA (Immigration and Borders Authority) sends a letter; the IRN (National Identification Office) handles IDs.",
    ],
    nota: "SNS (Health System) and SNS 24.",
    palavras: ["se f case", " AimA ", "portal das finanças"],
  };
  const r = normalizarRespostaEn(entrada);
  assert.equal(
    r.passos[0],
    "Contact AIMA (Agency for Integration, Migration and Asylum) or the old SEF (Foreigners and Borders Service)."
  );
  assert.equal(
    r.passos[1],
    "Then AIMA sends a letter; the IRN (Institute of Registries and Notaries) handles IDs."
  );
  assert.equal(
    r.nota,
    "SNS (National Health Service) and SNS 24."
  );
  assert.deepEqual(r.palavras, ["sef case", "aima", "tax authority portal"]);
  // idempotente
  assert.deepEqual(normalizarRespostaEn(r), r);
});

test("números, URLs e € intactos após normalização", () => {
  const entrada = {
    passos: [
      "Call AIMA (wrong gloss) on 217 115 000, 9h–20h, or see aima.gov.pt — fee is €25.",
    ],
    palavras: [],
  };
  const r = normalizarRespostaEn(entrada);
  assert.match(r.passos[0], /217 115 000/);
  assert.match(r.passos[0], /aima\.gov\.pt/);
  assert.match(r.passos[0], /€25/);
});
