import type { Prazo } from "@/lib/types";

/* Prazos do ano — cada data confirmada numa página oficial (verificadoEm).
   Cobrem o próximo ciclo; ficam de fora:
   - bolsa de ação social: o IES ainda não publicou 2027/2028 (não projetar);
   - IUC: vence no fim do mês da matrícula — não é data fixa de calendário. */

const FONTE_PRAZOS_AT = {
  titulo: "Principais prazos — Portal das Finanças",
  url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Rendimentos/Declaracao/prazos/Paginas/default.aspx",
  dominio: "portaldasfinancas.gov.pt",
};
const FONTE_EFATURA = {
  titulo: "e-Fatura — ajuda do Portal das Finanças",
  url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Rendimentos/Declaracao/e_Fatura/Paginas/default.aspx",
  dominio: "portaldasfinancas.gov.pt",
};
const FONTE_IMI = {
  titulo: "Imposto anual — IMI e AIMI (Portal das Finanças)",
  url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Casa_e_propriedades/Imposto_anual/Paginas/default.aspx",
  dominio: "portaldasfinancas.gov.pt",
};

export const PRAZOS: Prazo[] = [
  {
    id: "imi-2026-11",
    titulo: "IMI — prestação de novembro",
    perguntaId: "hab-imi",
    fim: "2026-11-30",
    descricao:
      "Última prestação do IMI 2026 para quem paga em novembro (2.ª prestação se >100 €, 3.ª se >500 €). Se o último dia for fim de semana ou feriado, podes pagar até ao dia útil seguinte.",
    fonte: FONTE_IMI,
    verificadoEm: "2026-10-25",
  },
  {
    id: "efatura-validar-2026",
    titulo: "e-Fatura — validar faturas de 2026",
    perguntaId: "at-efatura",
    fim: "2027-03-01",
    descricao:
      "Valida e classifica as faturas de 2026 no e-Fatura — normalmente até ao fim de fevereiro; em 2027 o dia 28 é domingo, por isso vai até 1 de março.",
    fonte: FONTE_EFATURA,
    verificadoEm: "2026-10-25",
  },
  {
    id: "efatura-consulta-2026",
    titulo: "e-Fatura — já podes consultar as deduções",
    perguntaId: "at-efatura",
    fim: "2027-03-15",
    semAlarme: true,
    descricao:
      "A partir de 15 de março de 2027 já consultas no e-Fatura as despesas consideradas para efeitos de deduções à coleta do IRS 2026.",
    fonte: FONTE_EFATURA,
    verificadoEm: "2026-10-25",
  },
  {
    id: "efatura-reclamar-2026",
    titulo: "e-Fatura — reclamar despesas",
    perguntaId: "at-efatura",
    inicio: "2027-03-16",
    fim: "2027-03-31",
    descricao:
      "De 16 a 31 de março de 2027 podes reclamar no Portal das Finanças omissões ou inexatidões nas despesas gerais e nas despesas por exigência de fatura, por cada titular.",
    fonte: FONTE_EFATURA,
    verificadoEm: "2026-10-25",
  },
  {
    id: "irs-entrega-2026",
    titulo: "Entrega da declaração de IRS 2026",
    perguntaId: "irs-entregar",
    inicio: "2027-04-01",
    fim: "2027-06-30",
    descricao:
      "A declaração de IRS (Modelo 3) relativa a 2026 entrega-se no Portal das Finanças entre 1 de abril e 30 de junho de 2027 — mesmo que o último dia não seja útil.",
    fonte: FONTE_PRAZOS_AT,
    verificadoEm: "2026-10-25",
    recorrente: "anual",
  },
  {
    id: "imi-2027-05",
    titulo: "IMI — prestação de maio",
    perguntaId: "hab-imi",
    fim: "2027-05-31",
    descricao:
      "IMI 2027: pagamento único (até 100 €) ou 1.ª prestação, em maio. Podes optar por pagar a totalidade em maio, qualquer que seja o valor.",
    fonte: FONTE_IMI,
    verificadoEm: "2026-10-25",
  },
  {
    id: "imi-2027-08",
    titulo: "IMI — prestação de agosto",
    perguntaId: "hab-imi",
    fim: "2027-08-31",
    descricao:
      "2.ª prestação do IMI 2027, só para quem paga em três prestações (imposto superior a 500 €).",
    fonte: FONTE_IMI,
    verificadoEm: "2026-10-25",
  },
  {
    id: "irs-reembolso-2026",
    titulo: "IRS — reembolso ou pagamento",
    perguntaId: "irs-reembolso",
    fim: "2027-08-31",
    descricao:
      "Para declarações entregues dentro do prazo, o reembolso (ou a liquidação a pagar) do IRS 2026 está previsto até 31 de agosto de 2027.",
    fonte: FONTE_PRAZOS_AT,
    verificadoEm: "2026-10-25",
    recorrente: "anual",
  },
  {
    id: "imi-2027-11",
    titulo: "IMI — prestação de novembro",
    perguntaId: "hab-imi",
    fim: "2027-11-30",
    descricao:
      "Última prestação do IMI 2027 para quem paga em novembro (2.ª prestação se >100 €, 3.ª se >500 €).",
    fonte: FONTE_IMI,
    verificadoEm: "2026-10-25",
  },
];

/** Hoje no fuso de Portugal — compara-se com datas AAAA-MM-DD. */
export function hojePt(agora = new Date()): string {
  return agora.toLocaleDateString("en-CA", { timeZone: "Europe/Lisbon" });
}

/** Prazos cujo fim ainda não passou, ordenados por data. */
export function prazosAtivos(agora = new Date()): Prazo[] {
  const hoje = hojePt(agora);
  return PRAZOS.filter((p) => p.fim >= hoje).sort((a, b) =>
    a.fim.localeCompare(b.fim)
  );
}

/** Próximo prazo ligado a uma pergunta curada (para a caixa em /p/<id>). */
export function prazoDaPergunta(
  perguntaId: string,
  agora = new Date()
): Prazo | undefined {
  const hoje = hojePt(agora);
  return PRAZOS.filter((p) => p.perguntaId === perguntaId && p.fim >= hoje).sort(
    (a, b) => a.fim.localeCompare(b.fim)
  )[0];
}
