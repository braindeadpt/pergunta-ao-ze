import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "desemprego-iefp",
  titulo: "Desemprego e emprego",
  entidade: "IEFP · Segurança Social",
  descricao: "Inscrição no IEFP e subsídio de desemprego",
  perguntas: [
    {
      id: "iefp-inscrever",
      texto: "Como me inscrevo no IEFP?",
      palavras: [
        "iefp", "inscrever", "desemprego", "desempregado", "emprego",
        "inscricao", "centro", "procura", "trabalho",
      ],
      resposta: {
        passos: [
          "Online, no iefponline — fazes a pré-inscrição e recebes a convocatória para concluir no centro de emprego.",
          "Presencial — no centro de emprego da tua área, com documento de identificação e comprovativos da situação.",
          "Se ficaste sem trabalho, inscreve-te logo: a data de inscrição conta para o subsídio de desemprego.",
        ],
        fontes: [
          {
            titulo: "IEFP — Inscrição para emprego",
            url: "https://www.iefp.pt",
            dominio: "iefp.pt",
          },
        ],
      },
    },
    {
      id: "ss-subsidio-desemprego",
      texto: "Como peço o subsídio de desemprego?",
      palavras: [
        "subsidio", "desemprego", "pedir", "requerimento", "fundo",
        "sem", "trabalho", "despedido", "seguranca", "social",
      ],
      resposta: {
        passos: [
          "Primeiro inscreve-te no IEFP como candidato a emprego — é condição para o subsídio.",
          "Depois entregas o requerimento do subsídio de desemprego na Segurança Social Direta, dentro do prazo após o fim do contrato.",
          "Precisas de ter descontado o período mínimo exigido e de declaração da entidade empregadora que prove o desemprego involuntário (RP5044).",
        ],
        fontes: [
          {
            titulo: "Subsídio de desemprego — Segurança Social",
            url: "https://www.seg-social.pt/desemprego1",
            dominio: "seg-social.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
