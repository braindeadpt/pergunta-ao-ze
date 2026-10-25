import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "transportes",
  titulo: "Transportes e passes",
  entidade: "Navegante · CP",
  descricao: "Passe Navegante e descontos nos transportes",
  perguntas: [
    {
      id: "tra-navegante",
      texto: "Como peço o passe Navegante?",
      palavras: [
        "passe", "navegante", "transportes", "metro", "autocarro",
        "comboio", "viva", "cartao", "mensal",
      ],
      resposta: {
        passos: [
          "O cartão Navegante (para a área metropolitana de Lisboa) pede-se online no portal Navegante ou nos espaços dedicados, com foto e documento de identificação.",
          "Depois de ter o cartão, carregas o passe mensal nas máquinas do Metro, estações ou app.",
          "Noutras regiões há cartões equivalentes — o processo é parecido junto do operador local.",
        ],
        fontes: [
          {
            titulo: "Portal Navegante",
            url: "https://www.navegante.pt",
            dominio: "navegante.pt",
          },
        ],
      },
    },
    {
      id: "tra-descontos",
      texto: "Que descontos existem nos transportes públicos?",
      palavras: [
        "desconto", "passe", "social", "estudante", "jovem",
        "idoso", "65", "transportes", "gratuito", "escola",
      ],
      resposta: {
        passos: [
          "Há passes sociais para agregados com rendimentos mais baixos, passes para estudantes, e condições especiais para maiores de 65 e menores — variam por região e operador.",
          "O passe social pede-se com comprovativo de rendimentos, normalmente junto do operador ou portal da rede de transportes da região.",
          "Consulta a página do operador da tua zona (Navegante em Lisboa, Andante no Porto, CP para comboios) para os descontos em vigor.",
        ],
        fontes: [
          {
            titulo: "CP — Comboios de Portugal",
            url: "https://www.cp.pt",
            dominio: "cp.pt",
          },
          {
            titulo: "Portal Navegante",
            url: "https://www.navegante.pt",
            dominio: "navegante.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
