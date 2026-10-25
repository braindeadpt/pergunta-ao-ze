import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "educacao",
  titulo: "Ensino superior",
  entidade: "IES (antiga DGES)",
  descricao: "Candidatura ao superior e bolsas de estudo",
  perguntas: [
    {
      id: "edu-candidatura",
      texto: "Como me candidato ao ensino superior?",
      palavras: [
        "candidatura", "ensino", "superior", "universidade",
        "faculdade", "concurso", "nacional", "acesso", "dges",
        "inscricao", "ies", "iesuperior",
      ],
      resposta: {
        passos: [
          "A candidatura nacional ao ensino superior público faz-se online, na plataforma do IES (Instituto para o Ensino Superior, que substituiu a DGES), em três fases ao longo do verão.",
          "Para entrar na candidatura online precisas de uma senha, que pedes na tua escola secundária ou num Gabinete de Acesso ao Ensino Superior (GAES).",
          "Precisas de exames nacionais válidos como provas de ingresso — cada curso exige provas específicas e médias mínimas.",
          "Os resultados saem por fases; se entrares, a matrícula faz-se no prazo indicado na própria plataforma.",
        ],
        fontes: [
          {
            titulo: "Acesso ao ensino superior — IES",
            url: "https://iesuperior.pt/acesso/",
            dominio: "iesuperior.pt",
          },
        ],
        verificadoEm: "2026-10-25",
      },
    },
    {
      id: "edu-bolsa",
      texto: "Como peço bolsa de estudo para o superior?",
      palavras: [
        "bolsa", "estudo", "acao", "social", "escolar",
        "universidade", "propina", "apoio", "dges", "estudante",
        "ies", "iesuperior", "sas",
      ],
      resposta: {
        passos: [
          "A bolsa de ação social pede-se online, na área reservada do estudante, a partir do site do IES (Instituto para o Ensino Superior, que substituiu a DGES).",
          "O prazo principal abre no verão e fecha no início de outubro (em 2026/2027 foi de 14 de agosto a 2 de outubro). Até 31 de maio ainda podes pedir, mas a bolsa é proporcional ao tempo que falta.",
          "O valor depende dos rendimentos do agregado familiar. No site do IES há um simulador que dá uma estimativa antes de pedires.",
          "Tens de estar matriculado e inscrito num estabelecimento de ensino superior. Para dúvidas, fala com os Serviços de Ação Social (SAS) da tua instituição.",
        ],
        nota: "Há um regulamento novo (Portaria n.º 331-B/2026/1), que se aplica por inteiro a partir de 2027/2028. Em 2026/2027 já há regras transitórias.",
        fontes: [
          {
            titulo: "Bolsas de estudo — IES",
            url: "https://iesuperior.pt/bolsas-de-estudo/",
            dominio: "iesuperior.pt",
          },
        ],
        verificadoEm: "2026-10-25",
      },
    },
  ],
};

export default tema;
