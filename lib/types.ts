export interface Fonte {
  titulo: string;
  url: string;
  dominio: string;
}

export interface Resposta {
  passos: string[];
  nota?: string;
  fontes: Fonte[];
  /** Data em que a resposta foi confirmada nas fontes oficiais (AAAA-MM-DD).
   *  Preenchida à mão pelo mantenedor — ausente enquanto não for verificada. */
  verificadoEm?: string;
}

export interface Pergunta {
  id: string;
  texto: string;
  palavras: string[];
  resposta: Resposta;
}

/** Prazo de calendário para o cidadão — cada data confirmada numa fonte
 *  oficial. Datas AAAA-MM-DD (calendário em Portugal); `fim` é inclusivo. */
export interface Prazo {
  id: string;
  titulo: string;
  perguntaId?: string;
  inicio?: string;
  fim: string;
  descricao: string;
  fonte: Fonte;
  verificadoEm: string;
  recorrente?: "anual";
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
