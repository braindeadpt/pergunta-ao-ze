import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "justica-multas",
  titulo: "Justiça e multas",
  entidade: "ANSR · Justiça",
  descricao: "Multas de trânsito e certificado de registo criminal",
  perguntas: [
    {
      id: "jus-multa",
      texto: "Recebi uma multa de trânsito: como consulto e pago?",
      palavras: [
        "multa", "transito", "ansr", "contraordenacao", "pagar",
        "coima", "radar", "velocidade", "estacionamento", "auto",
      ],
      resposta: {
        passos: [
          "As contraordenações rodoviárias são geridas pela ANSR — podes consultar o processo e pagar online com os dados da notificação.",
          "Se ainda não recebeste a notificação em casa, no portal da ANSR consegues verificar multas associadas ao teu veículo ou carta.",
          "Tens prazos para pagar voluntariamente (mais barato) ou para apresentar defesa — não deixes passar o prazo.",
        ],
        fontes: [
          {
            titulo: "Contraordenações — ANSR",
            url: "https://www.ansr.pt",
            dominio: "ansr.pt",
          },
        ],
      },
    },
    {
      id: "jus-registo-criminal",
      texto: "Como peço o certificado do registo criminal?",
      palavras: [
        "registo", "criminal", "certificado", "cadastro", "pedir",
        "online", "emprego", "justica", "penal",
      ],
      resposta: {
        passos: [
          "Online, no portal Registo Criminal Online da Justiça — autenticas-te com Chave Móvel Digital ou Cartão de Cidadão e recebes um código de acesso ao certificado.",
          "Presencial, nos balcões de registo criminal das Lojas de Cidadão, Espaços de Registos ou tribunais.",
          "Também podes autorizar um terceiro (ex.: empregador) a consultar o teu registo online por tempo limitado.",
        ],
        fontes: [
          {
            titulo: "Registo Criminal Online",
            url: "https://registocriminal.justica.gov.pt",
            dominio: "registocriminal.justica.gov.pt",
          },
          {
            titulo: "Certificado do registo criminal — ePortugal",
            url: "https://eportugal.gov.pt",
            dominio: "eportugal.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
