import { test } from "node:test";
import assert from "node:assert/strict";
import {
  contactosDeFontes,
  extrairTelefones,
  segmentarNota,
  telefoneParaHref,
} from "../lib/contactos.ts";
import { ENTIDADES } from "../lib/data/fontes.ts";

test("contactos: extrairTelefones separa números com 'ou' em links tel: individuais", () => {
  assert.deepEqual(extrairTelefones("300 003 990 ou 210 489 010"), [
    { visivel: "300 003 990", href: "tel:+351300003990" },
    { visivel: "210 489 010", href: "tel:+351210489010" },
  ]);
});

test("contactos: telefoneParaHref trata curtos (112), 808 nacionais e 00800 internacionais", () => {
  assert.equal(telefoneParaHref("112"), "tel:112");
  assert.equal(telefoneParaHref("808 24 24 24"), "tel:808242424");
  assert.equal(telefoneParaHref("210 990 111"), "tel:+351210990111");
  assert.equal(telefoneParaHref("00 800 6 7 8 9 10 11"), "tel:0080067891011");
  assert.equal(telefoneParaHref("+351 217 206 707"), "tel:+351217206707");
  assert.equal(telefoneParaHref("   "), null);
});

test("contactos: segmentarNota torna 210 990 111 e 112 clicáveis sem falsos positivos em horas", () => {
  assert.deepEqual(
    segmentarNota("Cartão de Cidadão: 210 990 111 (úteis 9h–18h; cancelamentos 24h)"),
    [
      { tipo: "texto", texto: "Cartão de Cidadão: " },
      { tipo: "telefone", visivel: "210 990 111", href: "tel:+351210990111" },
      { tipo: "texto", texto: " (úteis 9h–18h; cancelamentos 24h)" },
    ]
  );

  assert.deepEqual(segmentarNota("Emergência com risco de vida: 112"), [
    { tipo: "texto", texto: "Emergência com risco de vida: " },
    { tipo: "telefone", visivel: "112", href: "tel:112" },
  ]);

  assert.deepEqual(segmentarNota("Atendimento automático 24h/7 · n.º 112/2026 · 112€"), [
    { tipo: "texto", texto: "Atendimento automático 24h/7 · n.º 112/2026 · 112€" },
  ]);
});

test("contactos: sns.gov.pt + sns24.gov.pt agrupam telefone e preservam nota do 112 e horários", () => {
  const linhas = contactosDeFontes([
    { titulo: "Portal do SNS", url: "https://www.sns.gov.pt", dominio: "sns.gov.pt" },
    { titulo: "Portal SNS 24", url: "https://www.sns24.gov.pt", dominio: "sns24.gov.pt" },
  ]);

  assert.equal(linhas.length, 1);
  assert.deepEqual(linhas[0].entidades, ["Portal do SNS", "Portal SNS 24"]);
  assert.deepEqual(linhas[0].telefones, [
    { visivel: "808 24 24 24", href: "tel:808242424" },
  ]);
  assert.equal(
    linhas[0].horario,
    "clínico: 24h, todos os dias; administrativo: 8h–22h"
  );
  assert.deepEqual(linhas[0].notas, ["Emergência com risco de vida: 112"]);
});

test("contactos: preserva nota da linha CC (210 990 111), emails oficiais e número 00 800", () => {
  const linhas = contactosDeFontes([
    {
      titulo: "IRN",
      url: "https://irn.justica.gov.pt",
      dominio: "irn.justica.gov.pt",
    },
    {
      titulo: "Justiça",
      url: "https://justica.gov.pt",
      dominio: "justica.gov.pt",
    },
    {
      titulo: "IMT Online",
      url: "https://servicos.imt-ip.pt",
      dominio: "servicos.imt-ip.pt",
    },
    {
      titulo: "IMT",
      url: "https://www.imt-ip.pt",
      dominio: "imt-ip.pt",
    },
    {
      titulo: "AIMA",
      url: "https://aima.gov.pt",
      dominio: "aima.gov.pt",
    },
    {
      titulo: "Your Europe",
      url: "https://europa.eu/youreurope",
      dominio: "europa.eu",
    },
  ]);

  assert.equal(linhas.length, 4);

  const irn = linhas[0];
  assert.deepEqual(irn.telefones, [{ visivel: "211 950 500", href: "tel:+351211950500" }]);
  assert.deepEqual(irn.notas, [
    "Cartão de Cidadão: 210 990 111 (úteis 9h–18h; cancelamentos 24h)",
  ]);

  const imt = linhas[1];
  assert.deepEqual(imt.entidades, ["IMT Online", "IMT — Mobilidade e Transportes"]);
  assert.deepEqual(imt.emails, ["imt@imt-ip.pt"]);

  const aima = linhas[2];
  assert.deepEqual(aima.emails, ["geral@aima.gov.pt"]);

  const europa = linhas[3];
  assert.deepEqual(europa.telefones, [
    { visivel: "00 800 6 7 8 9 10 11", href: "tel:0080067891011" },
  ]);
  assert.deepEqual(europa.notas, ["Europe Direct — em português"]);
});

test("contactos: deduplica notas iguais e preserva entidades apenas com email ou nota sem telefone", () => {
  const financas = contactosDeFontes([
    {
      titulo: "Finanças",
      url: "https://www.portaldasfinancas.gov.pt",
      dominio: "portaldasfinancas.gov.pt",
    },
    {
      titulo: "e-Fatura",
      url: "https://faturas.portaldasfinancas.gov.pt",
      dominio: "faturas.portaldasfinancas.gov.pt",
    },
  ]);
  assert.equal(financas.length, 1);
  assert.deepEqual(financas[0].notas, ["Centro de Atendimento Telefónico (CAT)"]);

  const semTel = contactosDeFontes(
    [
      { titulo: "Balcão Digital", url: "https://exemplo.gov.pt", dominio: "exemplo.gov.pt" },
      { titulo: "Apoio Escrito", url: "https://nota.gov.pt", dominio: "nota.gov.pt" },
    ],
    (dominio) => {
      if (dominio === "exemplo.gov.pt") {
        return {
          nome: "Entidade Email",
          contacto: { email: "apoio@exemplo.gov.pt", nota: "Atendimento apenas escrito" },
        };
      }
      if (dominio === "nota.gov.pt") {
        return {
          nome: "Entidade Nota",
          contacto: { nota: "Balcão mediante agendamento" },
        };
      }
      return null;
    }
  );

  assert.equal(semTel.length, 2);
  assert.deepEqual(semTel[0].telefones, []);
  assert.deepEqual(semTel[0].emails, ["apoio@exemplo.gov.pt"]);
  assert.deepEqual(semTel[0].notas, ["Atendimento apenas escrito"]);
  assert.deepEqual(semTel[1].notas, ["Balcão mediante agendamento"]);
  assert.notEqual(semTel[0].chave, semTel[1].chave);
});

test("contactos: todos os telefones de ENTIDADES produzem links tel: limpos sem espaços", () => {
  for (const [dominio, meta] of Object.entries(ENTIDADES)) {
    const tel = meta.contacto?.telefone;
    if (!tel) continue;
    const extraidos = extrairTelefones(tel);
    assert.ok(extraidos.length > 0, `${dominio}: nenhum telefone extraído`);
    for (const item of extraidos) {
      assert.match(item.href, /^tel:\+?\d+$/, `${dominio}: href inválido "${item.href}"`);
    }
  }
});
