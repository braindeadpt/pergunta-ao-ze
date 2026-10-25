import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "educacao",
  titulo: "Ensino superior",
  entidade: "DGES",
  descricao: "Candidatura ao superior e bolsas de estudo",
  perguntas: [
    {
      id: "edu-candidatura",
      texto: "Como me candidato ao ensino superior?",
      palavras: [
        "candidatura", "ensino", "superior", "universidade",
        "faculdade", "concurso", "nacional", "acesso", "dges",
        "inscricao",
      ],
      resposta: {
        passos: [
          "A candidatura nacional ao ensino superior público faz-se online no portal da DGES, em fases ao longo do verão.",
          "Precisas de exames nacionais válidos como provas de ingresso — cada curso exige provas específicas e médias mínimas.",
          "Os resultados saem por fases; se entrares, a matrícula faz-se no prazo indicado na própria plataforma.",
        ],
        fontes: [
          {
            titulo: "Candidatura ao ensino superior — DGES",
            url: "https://www.dges.gov.pt",
            dominio: "dges.gov.pt",
          },
        ],
      },
    },
    {
      id: "edu-bolsa",
      texto: "Como peço bolsa de estudo para o superior?",
      palavras: [
        "bolsa", "estudo", "acao", "social", "escolar",
        "universidade", "propina", "apoio", "dges", "estudante",
      ],
      resposta: {
        passos: [
          "A bolsa de ação social pede-se online no portal da DGES, normalmente no início do ano letivo — há prazos que não convem falhar.",
          "O valor depende dos rendimentos do agregado familiar e do curso; a análise é feita pelos serviços de ação social da instituição.",
          "Tens de estar matriculado e inscrito num estabelecimento de ensino superior para receber.",
        ],
        fontes: [
          {
            titulo: "Bolsas de estudo — DGES",
            url: "https://www.dges.gov.pt",
            dominio: "dges.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
