import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "eportugal-agendamento",
  titulo: "gov.pt (ePortugal) e atendimento",
  entidade: "AMA",
  descricao: "Portal dos serviços e marcação de atendimento",
  perguntas: [
    {
      id: "ep-o-que-e",
      texto: "O que é o ePortugal (agora gov.pt)?",
      palavras: [
        "eportugal", "gov", "portal", "servicos", "publicos", "estado",
        "site", "governo", "digital",
      ],
      resposta: {
        passos: [
          "O portal ePortugal passou a chamar-se gov.pt: é o portal único dos serviços públicos portugueses, onde se reúnem e explicam centenas de serviços — documentos, impostos, saúde, trabalho, empresa.",
          "Muitos serviços começam e acabam ali; outros encaminham para o portal da entidade responsável.",
          "Para usar os serviços online convém teres a Chave Móvel Digital ou o Cartão de Cidadão com leitor.",
        ],
        fontes: [
          {
            titulo: "gov.pt (antigo ePortugal) — Portal dos Serviços Públicos",
            url: "https://www.gov.pt",
            dominio: "gov.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "ep-agendar",
      texto: "Como marco atendimento presencial num serviço público?",
      palavras: [
        "agendar", "atendimento", "marcar", "senha", "siga",
        "loja", "cidadao", "balcao", "presencial",
      ],
      resposta: {
        passos: [
          "No portal Siga (siga.marcacaodeatendimento.pt) ou na app SigaApp agendas atendimento para a maioria dos serviços do Estado — IRN, Finanças, IMT, Segurança Social e outros.",
          "Escolhes entidade, serviço, local, dia e hora; recebes a confirmação e a senha digital.",
          "Há serviços com agendamento próprio (consulados, AIMA, centros de saúde) — nesses casos usa o portal da entidade.",
        ],
        fontes: [
          {
            titulo: "Siga — Agendamento de atendimento",
            url: "https://siga.marcacaodeatendimento.pt",
            dominio: "siga.marcacaodeatendimento.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
  ],
};

export default tema;
