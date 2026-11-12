import type { ContactoEntidade, Fonte } from "./types.ts";
import { getContactoPorDominio } from "./data/fontes.ts";

export interface TelefoneLink {
  visivel: string;
  href: string;
}

export type SegmentoNota =
  | { tipo: "texto"; texto: string }
  | { tipo: "telefone"; visivel: string; href: string };

export interface ContactoLinha {
  /** Chave estável e única por linha agrupada */
  chave: string;
  /** String original do telefone (vazia quando a entidade apenas tem email/nota) */
  telefone: string;
  /** Números individuais extraídos com URI `tel:` pronto a marcar */
  telefones: TelefoneLink[];
  /** Partes distintas de todos os horários das entidades agrupadas */
  horario?: string;
  /** Notas distintas das entidades citadas (ordem de citação) */
  notas: string[];
  /** Emails distintos das entidades citadas (ordem de citação) */
  emails: string[];
  /** Entidades que partilham este contacto (ordem de citação) */
  entidades: string[];
}

/**
 * Converte um número de telefone visível num URI `tel:` limpo e válido:
 * - Números curtos / emergência (3–4 dígitos, ex.: `112`) → `tel:112` (nunca `+351`)
 * - Internacionais com `+` (ex.: `+351 210 990 111`) → `tel:+351210990111`
 * - Internacionais com `00` (ex.: `00 800 6 7 8 9 10 11`) → `tel:0080067891011`
 * - Nacionais PT geográficos, nómadas e móveis (`2xx`, `3xx`, `9xx` de 9 dígitos) → `tel:+351...`
 * - Nacionais PT não-geográficos (`808`, `800`, `707`, etc. de 9 dígitos) → `tel:808242424`
 */
export function telefoneParaHref(raw: string): string | null {
  const limpo = raw.trim();
  if (!limpo) return null;

  const temMais = limpo.startsWith("+");
  const digitos = limpo.replace(/\D/g, "");
  if (!digitos) return null;

  if (temMais) {
    return `tel:+${digitos}`;
  }
  if (digitos.startsWith("00")) {
    return `tel:${digitos}`;
  }
  if (digitos.length >= 3 && digitos.length <= 4) {
    return `tel:${digitos}`;
  }
  if (digitos.length === 9 && /^[239]\d{8}$/.test(digitos)) {
    return `tel:+351${digitos}`;
  }
  if (digitos.length === 12 && digitos.startsWith("351")) {
    const nacional = digitos.slice(3);
    if (/^[239]\d{8}$/.test(nacional)) {
      return `tel:+${digitos}`;
    }
  }
  return `tel:${digitos}`;
}

/**
 * Divide uma string oficial com um ou mais telefones separados por `" ou "`
 * (ex.: `"300 003 990 ou 210 489 010"`) em itens `{ visivel, href }` sem duplicados.
 */
export function extrairTelefones(raw: string): TelefoneLink[] {
  if (!raw.trim()) return [];
  const resultados: TelefoneLink[] = [];
  const vistos = new Set<string>();

  for (const parte of raw.split(/\s+ou\s+/i)) {
    const visivel = parte.trim();
    if (!visivel) continue;
    const href = telefoneParaHref(visivel);
    if (!href || vistos.has(href)) continue;
    vistos.add(href);
    resultados.push({ visivel, href });
  }

  return resultados;
}

const NOTA_TEL_RE =
  /(?<![\dA-Za-zÀ-ÿ/+-])(?:\+351\s?[23789]\d{2}(?:\s\d{3}\s\d{3}|\s\d{2}\s\d{2}\s\d{2}|\d{6})|00\s?\d{3}(?:\s\d{1,3}){3,8}|[23789]\d{2}(?:\s\d{3}\s\d{3}|\s\d{2}\s\d{2}\s\d{2}|\d{6})|(?:112|117|144|1414))(?![\dA-Za-zÀ-ÿ€%/])/g;

/**
 * Segmenta uma nota oficial preservando o texto e isolando números de telefone
 * marcáveis (ex.: `210 990 111` na nota do IRN ou `112` na nota do SNS 24).
 */
export function segmentarNota(nota: string): SegmentoNota[] {
  if (!nota) return [];
  const segmentos: SegmentoNota[] = [];
  let cursor = 0;

  for (const match of nota.matchAll(NOTA_TEL_RE)) {
    const idx = match.index ?? 0;
    const visivel = match[0];
    const href = telefoneParaHref(visivel);
    if (!href) continue;

    if (idx > cursor) {
      segmentos.push({ tipo: "texto", texto: nota.slice(cursor, idx) });
    }
    segmentos.push({ tipo: "telefone", visivel, href });
    cursor = idx + visivel.length;
  }

  if (cursor < nota.length) {
    segmentos.push({ tipo: "texto", texto: nota.slice(cursor) });
  }

  return segmentos;
}

/**
 * Reúne os contactos das entidades citadas pelas fontes de uma resposta,
 * agrupados por telefone (ou por email/entidade quando não há telefone).
 * Entidades diferentes com o mesmo telefone (ex.: SNS / SNS 24) ficam na mesma
 * linha e juntam horários, notas e emails distintos sem duplicar partes iguais.
 */
export function contactosDeFontes(
  fontes: Fonte[],
  obterContacto: (
    dominio: string
  ) => { nome: string; contacto: ContactoEntidade } | null = getContactoPorDominio
): ContactoLinha[] {
  const registos = new Map<
    string,
    {
      chave: string;
      telefone: string;
      telefones: TelefoneLink[];
      entidades: string[];
      partesHorario: Set<string>;
      notas: Set<string>;
      emails: Set<string>;
    }
  >();

  for (const f of fontes) {
    const e = obterContacto(f.dominio);
    if (!e?.contacto) continue;

    const tel = e.contacto.telefone?.trim() ?? "";
    const email = e.contacto.email?.trim() ?? "";
    const nota = e.contacto.nota?.trim() ?? "";
    const telefones = tel ? extrairTelefones(tel) : [];

    if (telefones.length === 0 && !email && !nota) continue;

    const chave =
      telefones.length > 0
        ? `tel:${telefones.map((t) => t.href).join("|")}`
        : email
          ? `email:${email.toLowerCase()}`
          : `entidade:${e.nome}`;

    let registo = registos.get(chave);
    if (!registo) {
      registo = {
        chave,
        telefone: tel,
        telefones,
        entidades: [],
        partesHorario: new Set(),
        notas: new Set(),
        emails: new Set(),
      };
      registos.set(chave, registo);
    }

    if (!registo.entidades.includes(e.nome)) {
      registo.entidades.push(e.nome);
    }
    for (const parte of (e.contacto.horario ?? "").split(";")) {
      const p = parte.trim();
      if (p) registo.partesHorario.add(p);
    }
    if (nota) registo.notas.add(nota);
    if (email) registo.emails.add(email);
  }

  return [...registos.values()].map((r) => ({
    chave: r.chave,
    telefone: r.telefone,
    telefones: r.telefones,
    horario: [...r.partesHorario].join("; ") || undefined,
    notas: [...r.notas],
    emails: [...r.emails],
    entidades: r.entidades,
  }));
}
