import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "eleicoes-voto",
  titulo: "Eleições e voto",
  entidade: "SG MAI",
  descricao: "Recenseamento e onde votar",
  perguntas: [
    {
      id: "ele-onde",
      texto: "Onde voto e que documentos preciso?",
      palavras: [
        "votar", "voto", "eleicoes", "mesa", "assembleia", "onde",
        "eleitor", "urna", "eleicao", "3838", "sms",
      ],
      resposta: {
        passos: [
          "Votas na mesa de voto da freguesia onde estás recenseado — descobre qual é em recenseamento.pt ou envia um SMS grátis para o 3838 com «RE <n.º de identificação civil sem check-digit> <data de nascimento AAAAMMDD>».",
          "Leva um documento de identificação com foto — o Cartão de Cidadão chega; já não precisas de número nem de cartão de eleitor.",
          "Se estiveres fora da tua área no dia, há modalidades como o voto antecipado em mobilidade — anunciadas antes de cada eleição.",
        ],
        fontes: [
          {
            titulo: "Portal do Recenseamento — Onde votar",
            url: "https://www.recenseamento.pt/",
            dominio: "recenseamento.pt",
          },
          {
            titulo: "Eleições e Referendos — SG MAI",
            url: "https://www.sg.mai.gov.pt/AdministracaoEleitoral/EleicoesReferendos/Paginas/default.aspx",
            dominio: "sg.mai.gov.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "ele-recenseamento",
      texto: "Preciso de me recensear para votar?",
      palavras: [
        "recenseamento", "eleitoral", "inscrever", "votar",
        "eleitor", "cartao", "inscricao",
      ],
      resposta: {
        passos: [
          "Para cidadãos portugueses residentes em Portugal o recenseamento é automático: tens de ter a morada do Cartão de Cidadão atualizada.",
          "Se a morada do CC estiver errada, votas na freguesia da morada registada — atualiza-a antes da eleição.",
          "Residentes no estrangeiro e cidadãos estrangeiros com direito de voto têm regras próprias — vê a tua situação na fonte.",
        ],
        fontes: [
          {
            titulo: "Portal do Recenseamento Eleitoral",
            url: "https://www.recenseamento.pt/",
            dominio: "recenseamento.pt",
          },
          {
            titulo: "Recenseamento eleitoral — SG MAI",
            url: "https://www.sg.mai.gov.pt/AdministracaoEleitoral/RecenseamentoEleitoral/Paginas/default.aspx",
            dominio: "sg.mai.gov.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
  ],
};

export default tema;
