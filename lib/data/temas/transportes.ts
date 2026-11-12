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
            titulo: "Cartões Navegante — Portal Navegante",
            url: "https://www.navegante.pt/viajar/cartoes-navegante",
            dominio: "navegante.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "tra-descontos",
      texto: "Que descontos existem nos transportes públicos?",
      palavras: [
        "desconto", "passe", "social", "estudante", "jovem",
        "idoso", "65", "23", "transportes", "gratuito", "escola", "andante",
      ],
      resposta: {
        passos: [
          "O passe gratuito para jovens abrange crianças e jovens até aos 23 anos inclusive — basta pedir ou ativar a modalidade gratuita no cartão Navegante, Andante ou operador da tua região.",
          "Há também passes sociais para agregados com rendimentos mais baixos e descontos para maiores de 65 anos e reformados — variam por região e operador.",
          "Consulta a página do operador da tua zona (Navegante em Lisboa, Andante no Porto, CP para comboios) para os documentos e descontos em vigor.",
        ],
        fontes: [
          {
            titulo: "Descontos Navegante — Portal Navegante",
            url: "https://www.navegante.pt/descontos",
            dominio: "navegante.pt",
          },
          {
            titulo: "Andante — Transportes Metropolitanos do Porto",
            url: "https://andante.pt",
            dominio: "andante.pt",
          },
          {
            titulo: "CP — Comboios de Portugal",
            url: "https://www.cp.pt",
            dominio: "cp.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
  ],
};

export default tema;
