import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "passaporte",
  titulo: "Passaporte",
  entidade: "IRN",
  descricao: "Pedido, renovação, documentos e agendamento",
  perguntas: [
    {
      id: "pep-pedir",
      texto: "Como peço o passaporte?",
      palavras: [
        "passaporte", "pep", "pedir", "tirar", "fazer", "viagem",
        "viajar", "estrangeiro", "documento",
      ],
      resposta: {
        passos: [
          "O passaporte pede-se presencialmente — num balcão do IRN, Loja do Cidadão ou consulado português no estrangeiro.",
          "Leva o Cartão de Cidadão válido. Não precisas de trazer fotografia: é captada no atendimento.",
          "A renovação do Passaporte Eletrónico Português pode ser pedida online, em alguns casos, através do portal do IRN.",
          "O preço depende da urgência e do local do pedido; em território nacional começa nos valores normais de tabela — confirma na fonte.",
        ],
        nota: "O passaporte comum tem validade de 5 anos.",
        fontes: [
          {
            titulo: "Pedir ou renovar o passaporte — gov.pt",
            url: "https://www.gov.pt/servicos/pedir-o-passaporte-eletronico-portugues",
            dominio: "gov.pt",
          },
          {
            titulo: "Passaporte eletrónico — Justiça.gov.pt",
            url: "https://justica.gov.pt/Registos/Identificacao/Passaporte-eletronico",
            dominio: "justica.gov.pt",
          },
        ],
      },
    },
    {
      id: "pep-menor",
      texto: "Que documentos preciso para o passaporte de um menor?",
      palavras: [
        "passaporte", "menor", "crianca", "filho", "documentos",
        "autorizacao", "pais", "responsabilidade",
      ],
      resposta: {
        passos: [
          "O menor tem de estar presente no atendimento, com o próprio Cartão de Cidadão (se o tiver).",
          "É necessária a presença e autorização dos titulares das responsabilidades parentais — regra geral, os dois pais.",
          "Se só um dos pais puder comparecer, leva autorização escrita do outro, com assinatura reconhecida, ou agendada no próprio balcão.",
          "Confirma os requisitos exatos para a tua situação na página do passaporte do IRN antes de ir.",
        ],
        fontes: [
          {
            titulo: "Passaporte eletrónico — Justiça.gov.pt",
            url: "https://justica.gov.pt/Registos/Identificacao/Passaporte-eletronico",
            dominio: "justica.gov.pt",
          },
        ],
      },
    },
    {
      id: "pep-agendar",
      texto: "Como marco atendimento para tratar do passaporte?",
      palavras: [
        "agendar", "marcar", "marcacao", "agendamento", "atendimento",
        "siga", "senha", "balcao", "loja", "cidadao", "passaporte",
      ],
      resposta: {
        passos: [
          "Agenda no portal Siga (siga.marcacaodeatendimento.pt) ou na app SigaApp: escolhes a entidade, o serviço, o local, o dia e a hora.",
          "Também podes tirar uma senha digital para o próprio dia — sujeita à lotação do balcão.",
          "No estrangeiro, o agendamento é feito no portal dos serviços consulares ou diretamente no consulado.",
        ],
        fontes: [
          {
            titulo: "Siga — agendamento de atendimento",
            url: "https://siga.marcacaodeatendimento.pt",
            dominio: "siga.marcacaodeatendimento.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
