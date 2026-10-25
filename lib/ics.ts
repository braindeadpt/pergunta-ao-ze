import type { Prazo } from "./types.ts";

/* Geração de .ics (RFC 5545) — puro, testável em Node.
   Eventos de dia inteiro: DTSTART;VALUE=DATE e DTEND exclusivo (fim+1).
   Prazos com início geram um evento só no dia do fim, "Último dia: …". */

/** Escape RFC 5545: backslash, ponto e vírgula, vírgula e quebras de linha. */
export function escIcs(texto: string): string {
  return texto
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

const enc = new TextEncoder();

/** Dobra uma linha aos 75 octetos; continuações começam com espaço.
 *  Nunca parte um carácter UTF-8 a meio. */
export function dobrar(linha: string): string {
  const partes: string[] = [];
  let atual = "";
  for (const ch of linha) {
    if (enc.encode(atual + ch).length > (partes.length === 0 ? 75 : 74)) {
      partes.push(atual);
      atual = ch;
    } else {
      atual += ch;
    }
  }
  partes.push(atual);
  return partes.join("\r\n ");
}

const isoParaData = (iso: string) => iso.replace(/-/g, "");

/** fim inclusivo → DTEND exclusivo (dia seguinte). */
function diaSeguinte(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

function dtstamp(agora = new Date()): string {
  return agora.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export interface IcsOpts {
  /** URL absoluto do site (para links na DESCRIPTION). */
  base: string;
  agora?: Date;
}

/** Um VEVENT por prazo, sempre no dia do fim. */
export function eventoIcs(p: Prazo, { base, agora }: IcsOpts): string {
  const linhas = [
    "BEGIN:VEVENT",
    `UID:${p.id}@perguntaaoze.pt`,
    `DTSTAMP:${dtstamp(agora)}`,
    `SUMMARY:${escIcs(p.inicio ? `Último dia: ${p.titulo}` : p.titulo)}`,
    `DTSTART;VALUE=DATE:${isoParaData(p.fim)}`,
    `DTEND;VALUE=DATE:${diaSeguinte(p.fim)}`,
    `DESCRIPTION:${escIcs(
      [
        p.descricao,
        p.inicio ? `Período: ${p.inicio} a ${p.fim}.` : `Data: ${p.fim}.`,
        p.perguntaId ? `Resposta: ${base}/p/${p.perguntaId}` : "",
        `Fonte: ${p.fonte.url}`,
      ]
        .filter(Boolean)
        .join("\n")
    )}`,
    `URL:${base}/prazos`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    // 7 dias antes do fim do evento (que é no dia do fim do prazo)
    "TRIGGER;RELATED=END:-P7D",
    `DESCRIPTION:${escIcs(`Faltam 7 dias: ${p.titulo}`)}`,
    "END:VALARM",
    "END:VEVENT",
  ];
  return linhas.map(dobrar).join("\r\n");
}

/** Calendário completo — usado por /prazos/[id] (1 evento) e /prazos/todos.ics. */
export function calendarioIcs(prazos: Prazo[], opts: IcsOpts): string {
  const linhas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pergunta ao Zé//Prazos//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escIcs("Prazos — Pergunta ao Zé")}`,
    ...prazos.map((p) => eventoIcs(p, opts)),
    "END:VCALENDAR",
  ];
  return linhas.map(dobrar).join("\r\n") + "\r\n";
}
