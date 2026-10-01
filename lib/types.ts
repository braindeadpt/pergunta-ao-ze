export interface Fonte {
  titulo: string;
  url: string;
  dominio: string;
}

export interface Resposta {
  passos: string[];
  nota?: string;
  fontes: Fonte[];
}

export interface Pergunta {
  id: string;
  texto: string;
  palavras: string[];
  resposta: Resposta;
}

export interface Tema {
  id: string;
  titulo: string;
  entidade: string;
  descricao: string;
  perguntas: Pergunta[];
}

/** Tradução EN gerada por scripts/gerar-temas-en.mjs (ficheiro commitado). */
export interface RespostaEn {
  traduzidaDe: string;
  geradoEm: string;
  hashOrigem: string;
  /** true = gerada mas retida até revisão humana — não é servida */
  revisao?: boolean;
  palavras: string[];
  passos: string[];
  nota?: string;
}

export type Ambito = "Nacional" | "Regional" | "Europeu";

export interface ContactoEntidade {
  telefone?: string;
  horario?: string;
  email?: string;
  nota?: string;
}

export interface EntidadeFonte {
  dominio: string;
  nome: string;
  ambito: Ambito;
  contacto?: ContactoEntidade;
}
