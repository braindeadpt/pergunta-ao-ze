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
        "eleitor", "urna", "eleicao",
      ],
      resposta: {
        passos: [
          "Votas na mesa de voto da freguesia onde estás recenseado — descobre qual é no Portal do Eleitor ou por SMS (serviço anunciado em cada eleição).",
          "Leva um documento de identificação com foto — o Cartão de Cidadão chega; não precisas de cartão de eleitor.",
          "Se estiveres fora da tua área no dia, há modalidades como voto antecipado — anunciadas em cada eleição.",
        ],
        fontes: [
          {
            titulo: "Portal do Eleitor — SG MAI",
            url: "https://www.sg.mai.gov.pt",
            dominio: "sg.mai.gov.pt",
          },
        ],
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
            titulo: "Recenseamento eleitoral — SG MAI",
            url: "https://www.sg.mai.gov.pt",
            dominio: "sg.mai.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
