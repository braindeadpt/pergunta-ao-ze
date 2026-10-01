import type { Fonte } from "@/lib/types";
import { getContactoPorDominio } from "@/lib/data/fontes";

export interface ContactoLinha {
  telefone: string;
  /** Partes distintas de todos os horários das entidades com este número */
  horario?: string;
  /** Entidades que partilham este telefone (ordem de citação) */
  entidades: string[];
}

/**
 * Reúne os contactos das entidades citadas pelas fontes de uma resposta,
 * agrupados por número de telefone. Entidades diferentes com o mesmo
 * telefone (ex.: SNS / SNS 24) ficam na mesma linha e os horários
 * distintos juntam-se — sem escolher um nem duplicar partes iguais.
 */
export function contactosDeFontes(fontes: Fonte[]): ContactoLinha[] {
  const porTelefone = new Map<string, { linha: ContactoLinha; partes: Set<string> }>();

  for (const f of fontes) {
    const e = getContactoPorDominio(f.dominio);
    const tel = e?.contacto?.telefone?.trim();
    if (!e || !tel) continue;

    let registo = porTelefone.get(tel);
    if (!registo) {
      registo = { linha: { telefone: tel, entidades: [] }, partes: new Set() };
      porTelefone.set(tel, registo);
    }
    if (!registo.linha.entidades.includes(e.nome)) {
      registo.linha.entidades.push(e.nome);
    }
    for (const parte of (e.contacto?.horario ?? "").split(";")) {
      const p = parte.trim();
      if (p) registo.partes.add(p);
    }
  }

  return [...porTelefone.values()].map(({ linha, partes }) => ({
    ...linha,
    horario: [...partes].join("; ") || undefined,
  }));
}
