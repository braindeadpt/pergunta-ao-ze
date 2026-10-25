import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "empresa-atividade",
  titulo: "Abrir empresa ou atividade",
  entidade: "IRN · Balcão do Empreendedor",
  descricao: "Empresa na Hora e início de atividade independente",
  perguntas: [
    {
      id: "empresa-abrir",
      texto: "Como abro uma empresa?",
      palavras: [
        "empresa", "abrir", "criar", "sociedade", "negocio",
        "constituir", "empresario", "unipessoal", "limitada", "lda",
      ],
      resposta: {
        passos: [
          "Empresa na Hora — constituis a sociedade num só balcão (ou online, no Balcão do Empreendedor), com firmas pré-aprovadas.",
          "Escolhe a forma jurídica (unipessoal, por quotas, anónima), o nome — com certificado de admissibilidade se não usares um nome pré-aprovado — e os sócios.",
          "Depois da constituição, a inscrição na Segurança Social e as declarações fiscais seguem os prazos próprios — a AT e a SS são notificadas, mas confirma as obrigações seguintes.",
          "Alternativa mais simples: atividade em nome individual (trabalhador independente), que se abre diretamente no Portal das Finanças.",
        ],
        fontes: [
          {
            titulo: "Empresa na Hora — gov.pt",
            url: "https://www.gov.pt/servicos/criar-uma-empresa-na-hora",
            dominio: "gov.pt",
          },
          {
            titulo: "Balcão do Empreendedor — gov.pt",
            url: "https://www.gov.pt/guias/servicos-para-a-atividade-economica",
            dominio: "gov.pt",
          },
        ],
      },
    },
    {
      id: "empresa-independente",
      texto: "Como abro atividade como trabalhador independente?",
      palavras: [
        "atividade", "independente", "abrir", "recibos", "verdes",
        "freelance", "trabalhador", "prestacao", "servicos", "cae",
      ],
      resposta: {
        passos: [
          "No Portal das Finanças: 'Todos os Serviços' → 'Atividade' → 'Entregar Declaração' de início de atividade.",
          "Escolhes o código de atividade (CAE/CIRS), o regime de IVA e a contabilidade — o regime simplificado é o mais comum para começar.",
          "A partir daí passas recibos verdes no Portal das Finanças e fazes as declarações periódicas.",
          "Se for a primeira atividade, podes ter isenção de contribuições à Segurança Social nos primeiros 12 meses — confirma as condições.",
        ],
        fontes: [
          {
            titulo: "Abrir atividade independente — Portal das Finanças",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
          {
            titulo: "Trabalhador independente — gov.pt",
            url: "https://www.gov.pt",
            dominio: "gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
