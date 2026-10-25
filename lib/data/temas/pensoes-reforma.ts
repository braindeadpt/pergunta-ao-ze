import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "pensoes-reforma",
  titulo: "Pensões e reforma",
  entidade: "Segurança Social",
  descricao: "Pedir a pensão e consultar a carreira contributiva",
  perguntas: [
    {
      id: "pen-pedir",
      texto: "Como peço a pensão de velhice?",
      palavras: [
        "pensao", "velhice", "reforma", "reformar", "aposentacao",
        "pedir", "idade", "seguranca", "social", "jubilacao",
      ],
      resposta: {
        passos: [
          "O pedido faz-se na Segurança Social Direta — em 'Pensões' → 'Pensão de velhice' — ou presencialmente num balcão da Segurança Social com agendamento.",
          "Podes pedir antes de atingir a idade legal: a pensão começa a contar da data que escolheres dentro das regras.",
          "Antes de pedir, confirma os teus anos de descontos na carreira contributiva — afetam o valor e a elegibilidade.",
          "A idade legal da reforma muda consoante o ano e a esperança média de vida — confirma o valor atual na fonte.",
        ],
        fontes: [
          {
            titulo: "Pensão de velhice — Segurança Social",
            url: "https://www.seg-social.pt/pensao-de-velhice",
            dominio: "seg-social.pt",
          },
        ],
      },
    },
    {
      id: "pen-carreira",
      texto: "Como consulto os meus descontos para a Segurança Social?",
      palavras: [
        "descontos", "carreira", "contributiva", "remuneracoes",
        "declaracoes", "seguranca", "social", "anos", "trabalho",
        "contribuicoes",
      ],
      resposta: {
        passos: [
          "Na Segurança Social Direta, em 'Emprego' → 'Remunerações', vês todos os salários declarados pelos empregadores ao longo da carreira.",
          "Se faltarem meses ou anos, podes pedir a regularização à Segurança Social — guarda recibos e contratos antigos como prova.",
          "O simulador de pensões no mesmo portal estima o valor da tua pensão futura.",
        ],
        fontes: [
          {
            titulo: "Segurança Social Direta — Remunerações",
            url: "https://www.seg-social.pt",
            dominio: "seg-social.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
