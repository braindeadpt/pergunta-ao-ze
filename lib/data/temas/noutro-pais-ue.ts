import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "noutro-pais-ue",
  titulo: "Viver noutro país da UE",
  entidade: "ePortugal · UE",
  descricao: "Residência, trabalho e saúde no espaço europeu",
  perguntas: [
    {
      id: "ue-mudar",
      texto: "Vou viver para outro país da UE: o que tenho de fazer?",
      palavras: [
        "ue", "uniao", "europeia", "mudar", "viver", "trabalhar",
        "pais", "estrangeiro", "emigrar", "residencia", "europa",
      ],
      resposta: {
        passos: [
          "Regista-te como residente no país de destino — em regra, passados 3 meses tens de pedir o certificado de registo local.",
          "Atualiza a morada fiscal: se deixares de ser residente fiscal em Portugal, trata da alteração no Portal das Finanças.",
          "Vê se a tua carta de condução portuguesa precisa de ser trocada e como fica a tua situação na Segurança Social — as regras de coordenação são europeias.",
          "Para trabalho destacado por empresa portuguesa, pode ser preciso o documento A1.",
        ],
        fontes: [
          {
            titulo: "Viver, trabalhar e viajar na UE — gov.pt",
            url: "https://www.gov.pt",
            dominio: "gov.pt",
          },
          {
            titulo: "Os teus direitos na UE — europa.eu",
            url: "https://europa.eu/youreurope/",
            dominio: "europa.eu",
          },
        ],
      },
    },
    {
      id: "ue-cesd",
      texto: "O que é o Cartão Europeu de Seguro de Doença?",
      palavras: [
        "cesd", "cartao", "europeu", "seguro", "doenca", "viagem",
        "saude", "estrangeiro", "ferias",
      ],
      resposta: {
        passos: [
          "O CESD garante acesso a cuidados de saúde durante estadas temporárias noutro país da UE (e mais alguns), nas mesmas condições dos residentes.",
          "Pede-se gratuitamente na Segurança Social Direta ou num balcão da Segurança Social, antes de viajar.",
          "Não substitui o seguro de viagem: cobre saúde pública de urgência, não repatriamento nem privados.",
        ],
        fontes: [
          {
            titulo: "Cartão Europeu de Seguro de Doença — Segurança Social",
            url: "https://www.seg-social.pt",
            dominio: "seg-social.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
