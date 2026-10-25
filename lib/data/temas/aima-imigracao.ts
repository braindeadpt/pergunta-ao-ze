import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "aima-imigracao",
  titulo: "Residência e nacionalidade",
  entidade: "AIMA · IRN",
  descricao: "Autorização de residência e nacionalidade portuguesa",
  perguntas: [
    {
      id: "aima-residencia",
      texto: "Como peço autorização de residência em Portugal?",
      palavras: [
        "residencia", "autorizacao", "aima", "visto", "imigracao",
        "estrangeiro", "titulo", "permanencia", "sef", "trabalhar",
      ],
      resposta: {
        passos: [
          "As autorizações de residência passaram para a AIMA (Agência para a Integração, Migrações e Asilo), que substituiu o SEF nestas funções.",
          "O tipo de autorização depende da situação — trabalho, estudo, reagrupamento familiar, procura de emprego — e o pedido faz-se no portal da AIMA ou por agendamento.",
          "Reúne antes os documentos típicos: passaporte válido, comprovativo de meios de subsistência, alojamento e registo criminal.",
          "Os prazos e a fila de agendamentos variam muito: acompanha o estado do processo na área pessoal da AIMA.",
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
    {
      id: "irn-nacionalidade",
      texto: "Como peço a nacionalidade portuguesa?",
      palavras: [
        "nacionalidade", "portuguesa", "cidadania", "naturalizacao",
        "irn", "pedir", "passaporte", "portugues",
      ],
      resposta: {
        passos: [
          "O pedido faz-se ao IRN — presencialmente nos balcões de nacionalidade e Lojas de Cidadão, ou por correio; advogados e solicitadores podem submeter online.",
          "Os requisitos dependem da via: residência legal em Portugal durante o tempo exigido por lei, casamento ou união com cidadão português, ascendência, entre outras.",
          "Para a via da residência, é normalmente preciso provar conhecimento de língua portuguesa e a ligação efetiva à comunidade.",
          "Acompanha o processo com o número que te é atribuído — os prazos de decisão podem ser longos.",
        ],
        fontes: [
          {
            titulo: "Nacionalidade portuguesa — IRN",
            url: "https://irn.justica.gov.pt",
            dominio: "irn.justica.gov.pt",
          },
          {
            titulo: "Nacionalidade — ePortugal",
            url: "https://eportugal.gov.pt",
            dominio: "eportugal.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
