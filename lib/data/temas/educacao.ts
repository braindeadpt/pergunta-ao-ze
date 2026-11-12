import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "educacao",
  titulo: "Educação e ensino superior",
  entidade: "Educação · IES",
  descricao: "Matrículas escolares, candidatura ao superior e bolsas",
  perguntas: [
    {
      id: "edu-matriculas",
      texto: "Como faço a matrícula escolar (pré-escolar, básico e secundário)?",
      palavras: [
        "matricula", "matriculas", "escola", "escolar", "pre", "basico",
        "secundario", "portal", "aluno", "filho", "ano", "letivo",
        "transferencia", "renovar",
      ],
      resposta: {
        passos: [
          "O pedido faz-se online no Portal das Matrículas (portaldasmatriculas.edu.gov.pt), entrando com Chave Móvel Digital, Cartão de Cidadão ou senha do Portal das Finanças do encarregado de educação.",
          "É obrigatório matricular pela primeira vez no pré-escolar e no 1.º ano (habitualmente entre abril e junho) e renovar nos 5.º, 7.º, 10.º e 12.º anos nos prazos fixados para cada ano letivo.",
          "Na passagem para os 2.º, 3.º, 4.º, 6.º, 8.º, 9.º e 11.º anos a renovação é automática, salvo se houver transferência de escola, mudança de encarregado de educação, de curso ou escolha de disciplinas.",
          "Indicas por ordem de preferência até 5 estabelecimentos de ensino e juntas os dados de identificação, NIF, NISS e comprovativo de morada fiscal.",
        ],
        fontes: [
          {
            titulo: "Portal das Matrículas",
            url: "https://www.portaldasmatriculas.edu.gov.pt/",
            dominio: "portaldasmatriculas.edu.gov.pt",
          },
          {
            titulo: "Matrícula e renovação nos ensinos pré-escolar, básico e secundário — gov.pt",
            url: "https://www.gov.pt/servicos/fazer-pedidos-de-matricula-e-renovacao-de-matricula-nos-ensinos-pre-escolar-basico-e-secundario",
            dominio: "gov.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
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
