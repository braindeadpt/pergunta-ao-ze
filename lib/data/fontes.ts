import { TEMAS } from "@/lib/data/temas";
import type { ContactoEntidade, EntidadeFonte, Fonte, Ambito } from "@/lib/types";

interface MetaEntidade {
  nome: string;
  ambito: Ambito;
  contacto?: ContactoEntidade;
}

// Contactos verificados nas páginas oficiais (gov.pt/contactos, seg-social.pt,
// imt-ip.pt/contactos, aima.gov.pt/contactos, iefp.pt/contactos, sns.gov.pt...)
// Linha Cidadão (gov.pt) cobre gov.pt, ePortugal, Chave Móvel Digital e Siga.
const LINHA_CIDADAO: ContactoEntidade = {
  telefone: "300 003 990 ou 210 489 010",
  horario: "dias úteis, 9h–18h",
};
const LINHA_REGISTOS: ContactoEntidade = {
  telefone: "211 950 500",
  horario: "dias úteis, 9h–17h",
};

const ENTIDADES: Record<string, MetaEntidade> = {
  "eportugal.gov.pt": { nome: "ePortugal — Portal dos Serviços Públicos", ambito: "Nacional", contacto: LINHA_CIDADAO },
  "irn.justica.gov.pt": {
    nome: "Instituto dos Registos e do Notariado",
    ambito: "Nacional",
    contacto: {
      ...LINHA_REGISTOS,
      nota: "Cartão de Cidadão: 210 990 111 (úteis 9h–18h; cancelamentos 24h)",
    },
  },
  "autenticacao.gov.pt": {
    nome: "Autenticação.gov.pt (AMA)",
    ambito: "Nacional",
    contacto: { ...LINHA_CIDADAO, nota: "A Linha Cidadão também apoia na Chave Móvel Digital" },
  },
  "portaldasfinancas.gov.pt": {
    nome: "Portal das Finanças (AT)",
    ambito: "Nacional",
    contacto: { telefone: "217 206 707", horario: "dias úteis, 9h–19h", nota: "Centro de Atendimento Telefónico (CAT)" },
  },
  "seg-social.pt": {
    nome: "Segurança Social",
    ambito: "Nacional",
    contacto: {
      telefone: "300 502 502 ou 210 545 400",
      horario: "dias úteis, 9h–18h",
      nota: "Atendimento automático 24h/7",
    },
  },
  "sns24.gov.pt": {
    nome: "Portal SNS 24",
    ambito: "Nacional",
    contacto: {
      telefone: "808 24 24 24",
      horario: "clínico: 24h, todos os dias; administrativo: 8h–22h",
      nota: "Emergência com risco de vida: 112",
    },
  },
  "sns.gov.pt": {
    nome: "Portal do SNS",
    ambito: "Nacional",
    contacto: { telefone: "808 24 24 24", horario: "clínico: 24h, todos os dias" },
  },
  "imt-ip.pt": {
    nome: "IMT — Mobilidade e Transportes",
    ambito: "Nacional",
    contacto: { telefone: "210 488 488", horario: "dias úteis, 9h–17h", email: "imt@imt-ip.pt" },
  },
  "servicos.imt-ip.pt": {
    nome: "IMT Online",
    ambito: "Nacional",
    contacto: { telefone: "210 488 488", horario: "dias úteis, 9h–17h" },
  },
  "automovelonline.mj.pt": { nome: "Automóvel Online (IRN)", ambito: "Nacional", contacto: LINHA_REGISTOS },
  "aima.gov.pt": {
    nome: "AIMA — Integração, Migrações e Asilo",
    ambito: "Nacional",
    contacto: { telefone: "217 115 000", horario: "dias úteis, 8h–20h", email: "geral@aima.gov.pt" },
  },
  "iefp.pt": {
    nome: "IEFP — Emprego e Formação Profissional",
    ambito: "Nacional",
    contacto: { telefone: "215 803 555", horario: "dias úteis, 9h–19h" },
  },
  "gov.pt": { nome: "gov.pt — Portal do Governo", ambito: "Nacional", contacto: LINHA_CIDADAO },
  "justica.gov.pt": { nome: "Justiça.gov.pt", ambito: "Nacional", contacto: LINHA_REGISTOS },
  "siga.marcacaodeatendimento.pt": { nome: "Siga — Agendamento de Atendimento", ambito: "Nacional", contacto: LINHA_CIDADAO },
  "civilonline.mj.pt": { nome: "Civil Online — Registos IRN", ambito: "Nacional", contacto: LINHA_REGISTOS },
  "predialonline.pt": { nome: "Predial Online — Registos", ambito: "Nacional", contacto: LINHA_REGISTOS },
  "portaldahabitacao.pt": { nome: "Portal da Habitação", ambito: "Nacional" },
  "ansr.pt": { nome: "ANSR — Segurança Rodoviária", ambito: "Nacional" },
  "registocriminal.justica.gov.pt": { nome: "Registo Criminal Online", ambito: "Nacional", contacto: LINHA_REGISTOS },
  "sg.mai.gov.pt": { nome: "Secretaria-Geral do MAI — Eleições", ambito: "Nacional" },
  "dges.gov.pt": {
    nome: "DGES — Ensino Superior",
    ambito: "Nacional",
    contacto: {
      telefone: "213 126 000",
      horario: "dias úteis, 9h30–12h30",
      nota: "Balcão eletrónico (BeCom) é o contacto preferencial",
    },
  },
  "vistos.mne.gov.pt": { nome: "Portal de Vistos — MNE", ambito: "Nacional" },
  "livroreclamacoes.pt": { nome: "Livro de Reclamações Eletrónico", ambito: "Nacional" },
  "navegante.pt": { nome: "Portal Navegante", ambito: "Nacional" },
  "cp.pt": {
    nome: "CP — Comboios de Portugal",
    ambito: "Nacional",
    contacto: { telefone: "210 900 032", horario: "24 horas, todos os dias" },
  },
  "europa.eu": {
    nome: "Your Europe — União Europeia",
    ambito: "Europeu",
    contacto: {
      telefone: "00 800 6 7 8 9 10 11",
      horario: "grátis na UE · dias úteis, 9h–18h (CET)",
      nota: "Europe Direct — em português",
    },
  },
};

export function getFontes(): { entidade: EntidadeFonte; fontes: Fonte[] }[] {
  const porDominio = new Map<string, Set<string>>();

  for (const tema of TEMAS) {
    for (const pergunta of tema.perguntas) {
      for (const fonte of pergunta.resposta.fontes) {
        if (!porDominio.has(fonte.dominio)) {
          porDominio.set(fonte.dominio, new Set());
        }
        porDominio.get(fonte.dominio)!.add(`${fonte.titulo}|||${fonte.url}`);
      }
    }
  }

  return [...porDominio.entries()]
    .map(([dominio, set]) => {
      const meta = ENTIDADES[dominio] ?? { nome: dominio, ambito: "Nacional" as Ambito };
      return {
        entidade: { dominio, nome: meta.nome, ambito: meta.ambito, contacto: meta.contacto },
        fontes: [...set].map((s) => {
          const [titulo, url] = s.split("|||");
          return { titulo, url, dominio };
        }),
      };
    })
    .sort((a, b) => a.entidade.nome.localeCompare(b.entidade.nome, "pt"));
}

export function getContactoPorDominio(
  dominio: string
): { nome: string; contacto: ContactoEntidade } | null {
  const meta = ENTIDADES[dominio];
  if (!meta?.contacto) return null;
  return { nome: meta.nome, contacto: meta.contacto };
}

export function getEstatisticas() {
  const grupos = getFontes();
  const paginas = grupos.reduce((acc, g) => acc + g.fontes.length, 0);
  const nacionais = grupos.filter((g) => g.entidade.ambito === "Nacional").length;
  const europeias = grupos.filter((g) => g.entidade.ambito === "Europeu").length;
  const regionais = grupos.filter((g) => g.entidade.ambito === "Regional").length;
  const perguntas = TEMAS.reduce((acc, t) => acc + t.perguntas.length, 0);
  return { paginas, nacionais, europeias, regionais, entidades: grupos.length, perguntas };
}
