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
