import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "vistos-entrada",
  titulo: "Vir viver para Portugal",
  entidade: "MNE · AIMA",
  descricao: "Vistos de trabalho, estudo e residência",
  perguntas: [
    {
      id: "vis-tipos",
      texto: "Que visto preciso para vir viver para Portugal?",
      palavras: [
        "visto", "visa", "portugal", "mudar", "viver", "trabalhar",
        "estudar", "d7", "nomada", "digital", "imigrar",
      ],
      resposta: {
        passos: [
          "Depende do motivo: há vistos de trabalho, estudo, procura de emprego, rendimentos próprios (D7), nómada digital, reagrupamento familiar, entre outros.",
          "Os vistos de residência pedem-se no consulado português do país onde vives, através do portal de vistos do MNE.",
          "Cidadãos da UE não precisam de visto — só de se registar como residentes passados 3 meses.",
          "Depois de entrar com visto, a autorização de residência é tratada na AIMA.",
        ],
        fontes: [
          {
            titulo: "Portal de Vistos — MNE",
            url: "https://vistos.mne.gov.pt",
            dominio: "vistos.mne.gov.pt",
          },
          {
            titulo: "AIMA",
            url: "https://aima.gov.pt",
            dominio: "aima.gov.pt",
          },
        ],
      },
    },
    {
      id: "vis-agendar-aima",
      texto: "Como marco atendimento na AIMA?",
      palavras: [
        "aima", "agendar", "marcar", "atendimento", "balcao",
        "residencia", "renovar", "titulo", "sef",
      ],
      resposta: {
        passos: [
          "Os agendamentos e renovações fazem-se pelos canais digitais da AIMA — portal e estrutura de missão — com vagas libertadas por períodos.",
          "Se tens um processo em curso herdado do SEF, acompanha-o na área reservada da AIMA; muitos processos transitaram automaticamente.",
          "As vagas esgotam rápido e os prazos variam — consulta regularmente o portal e os avisos oficiais.",
        ],
        fontes: [
          {
            titulo: "AIMA — Agência para a Integração, Migrações e Asilo",
            url: "https://aima.gov.pt",
            dominio: "aima.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
