import { test } from "node:test";
import assert from "node:assert/strict";
import { calendarioIcs, dobrar, escIcs, eventoIcs } from "../lib/ics.ts";
import type { Prazo } from "../lib/types.ts";

const P: Prazo = {
  id: "irs-entrega-2026",
  titulo: "Entrega da declaração de IRS 2026",
  perguntaId: "irs-entregar",
  inicio: "2027-04-01",
  fim: "2027-06-30",
  descricao: "Entrega no Portal das Finanças; datas, sempre.",
  fonte: { titulo: "F", url: "https://info.portaldasfinancas.gov.pt/x", dominio: "portaldasfinancas.gov.pt" },
  verificadoEm: "2026-10-25",
};
const OPTS = { base: "https://perguntaaoze.pt", agora: new Date("2026-10-25T10:00:00Z") };

test("ics: CRLF, escape e linhas <= 75 octetos", () => {
  const ics = calendarioIcs([P], OPTS);
  assert.ok(ics.includes("\r\n"));
  assert.ok(!ics.replace(/\r\n/g, "").includes("\n"));
  for (const l of ics.split("\r\n")) {
    assert.ok(new TextEncoder().encode(l).length <= 75, `linha longa: ${l}`);
  }
  assert.equal(escIcs("a,b;c\nd\\e"), "a\\,b\\;c\\nd\\\\e");
});

test("ics: dobrar aos 75 octetos com continuação em espaço", () => {
  const longa = "x".repeat(160);
  const dobrada = dobrar(longa);
  const partes = dobrada.split("\r\n");
  assert.equal(partes.length, 3); // 75 + 74 + resto
  assert.equal(partes[1][0], " ");
  // UTF-8 multibyte nunca é partido
  const mb = dobrar("€".repeat(80));
  for (const l of mb.split("\r\n")) {
    assert.ok(new TextEncoder().encode(l).length <= 75);
  }
});

test("ics: evento de dia inteiro com DTEND exclusivo no fim", () => {
  const ev = eventoIcs(P, OPTS);
  assert.match(ev, /SUMMARY:Último dia: Entrega da declaração de IRS 2026/);
  assert.match(ev, /DTSTART;VALUE=DATE:20270630/);
  assert.match(ev, /DTEND;VALUE=DATE:20270701/);
  assert.match(ev, /UID:irs-entrega-2026@perguntaaoze\.pt/);
  assert.match(ev, /DTSTAMP:20261025T100000Z/);
  assert.match(ev, /TRIGGER;RELATED=END:-P7D/);
  assert.match(ev, /Resposta: https:\/\/perguntaaoze\.pt\/p\/irs-entregar/);
  assert.match(ev, /Fonte: https:\/\/info\.portaldasfinancas\.gov\.pt\/x/);
});

test("ics: prazo sem início usa o título simples", () => {
  const ev = eventoIcs({ ...P, inicio: undefined }, OPTS);
  assert.match(ev, /SUMMARY:Entrega da declaração de IRS 2026/);
  assert.ok(!ev.includes("Último dia"));
});

test("ics: calendário válido (VCALENDAR + PRODID + CALNAME)", () => {
  const ics = calendarioIcs([P], OPTS);
  assert.ok(ics.startsWith("BEGIN:VCALENDAR"));
  assert.ok(ics.includes("VERSION:2.0"));
  assert.ok(ics.includes("Prazos — Pergunta ao Zé"));
  assert.ok(ics.trimEnd().endsWith("END:VCALENDAR"));
});
