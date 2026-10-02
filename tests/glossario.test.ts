import { test } from "node:test";
import assert from "node:assert/strict";
import { TEMAS_EN } from "../lib/data/temas.en.ts";
import { TEMAS } from "../lib/data/temas.ts";
import { KeywordEngine } from "../lib/engine.ts";
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
    "Contact AIMA (Agency for Integration, Migration and Asylum) or the old SEF (the former Foreigners and Borders Service)."
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

// --- correções da revisão humana das sensíveis (D) ---------------------------

test("vis-tipos: D7 nunca é self-employment", () => {
  const txt = textoDe(TEMAS_EN["vis-tipos"]);
  assert.doesNotMatch(txt, /self[‑-]?employ/i);
  assert.match(txt, /living on their own income \(D7\)/);
});

test("IRS: explicado como Portuguese personal income tax na 1.ª ocorrência", () => {
  for (const id of ["irs-entregar", "irs-reembolso"]) {
    const txt = textoDe(TEMAS_EN[id]);
    const i = txt.indexOf("IRS");
    assert.ok(i >= 0, `${id}: não menciona IRS`);
    assert.ok(
      txt.slice(i).startsWith("IRS (Portuguese personal income tax)"),
      `${id}: 1.ª ocorrência de IRS sem explicação`
    );
  }
});

test("variantes banidas de entidades não aparecem em nenhuma entrada", () => {
  const banidos = [
    "Immigration and Borders Authority",
    "Immigration Authority",
    "Citizen Service Center",
  ];
  const problemas: string[] = [];
  for (const [id, r] of Object.entries(TEMAS_EN)) {
    const txt = textoDe(r);
    for (const b of banidos) {
      if (txt.includes(b)) problemas.push(`${id}: contém "${b}"`);
    }
  }
  assert.deepEqual(problemas, []);
});

test("keywords sem 'se f' nem siglas partidas do modelo", () => {
  const problemas: string[] = [];
  for (const [id, r] of Object.entries(TEMAS_EN)) {
    for (const p of r.palavras) {
      if (/\bse f\b|\bse\s+f\b/i.test(p))
        problemas.push(`${id}: "${p}"`);
    }
  }
  assert.deepEqual(problemas, []);
});

test("ue-cesd: EHIC com gloss CESD na 1.ª ocorrência + keyword ehic", () => {
  const r = TEMAS_EN["ue-cesd"];
  assert.match(
    textoDe(r),
    /European Health Insurance Card \(EHIC, known in Portugal as CESD\)/
  );
  assert.ok(r.palavras.includes("ehic"));
});

test("irs-reembolso: estados do portal com gloss EN", () => {
  const txt = textoDe(TEMAS_EN["irs-reembolso"]);
  assert.match(txt, /'Recebida' \(Received\)/);
  assert.match(txt, /'Reembolso Emitido' \(Refund issued\)/);
  assert.match(txt, /'Liquidação Processada' \(Assessment processed\)/);
});

test("vis-agendar-aima: task force da AIMA em vez de mission structure", () => {
  const txt = textoDe(TEMAS_EN["vis-agendar-aima"]);
  assert.doesNotMatch(txt, /mission structure/i);
  assert.match(txt, /dedicated task force \(estrutura de missão\)/);
});

// --- gate de revisão --------------------------------------------------------

test("só at-nif e at-certidao-domicilio ficam com revisao: true", () => {
  const marcadas = Object.entries(TEMAS_EN)
    .filter(([, r]) => (r as { revisao?: boolean }).revisao === true)
    .map(([id]) => id)
    .sort();
  assert.deepEqual(marcadas, ["at-certidao-domicilio", "at-nif"]);
});

test("entrada com revisao: true nunca é servida em EN (PT + nota)", async () => {
  const engine = new KeywordEngine();
  const marcadas = Object.entries(TEMAS_EN)
    .filter(([, r]) => (r as { revisao?: boolean }).revisao === true)
    .map(([id]) => id);
  assert.ok(marcadas.length > 0);
  // força cada entrada marcada como melhor match e confirma o gate
  for (const id of marcadas) {
    const tema = TEMAS.flatMap((t) => t.perguntas).find((p) => p.id === id)!;
    const r = await engine.responder(tema.texto, "en");
    // a pergunta PT deve encontrar a entrada — e ela não pode vir em EN
    assert.equal(r.tipo, "resposta");
    if (r.tipo === "resposta" && r.pergunta.id === id) {
      assert.equal(r.idioma, "pt", `${id} servida em EN apesar de revisao`);
      assert.equal(r.soEmPt, true);
    }
  }
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
