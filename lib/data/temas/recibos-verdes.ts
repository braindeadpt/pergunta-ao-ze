import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "recibos-verdes",
  titulo: "Recibos verdes e IVA",
  entidade: "Autoridade Tributária",
  descricao: "Emitir recibos, isenção de IVA, retenção na fonte e declarações",
  perguntas: [
    {
      id: "rv-emitir",
      texto: "Como passo um recibo verde?",
      palavras: [
        "recibo", "verde", "emitir", "emito", "passar", "fatura",
        "faturar", "servico", "independente", "portal", "financas",
        "cliente",
      ],
      resposta: {
        passos: [
          "Entra no Portal das Finanças (Chave Móvel Digital, Cartão de Cidadão ou NIF e senha) e escolhe «Faturas e Recibos Verdes» → «Emitir».",
          "Escolhe «Fatura-Recibo» se recebes o pagamento na hora; «Fatura» se o cliente paga depois — nesse caso emites o recibo quando receberes.",
          "Preenche a data, o NIF do cliente (adquirente), a descrição do serviço e o valor.",
          "Só consegues emitir com atividade aberta nas Finanças — se ainda não tens, entrega primeiro a declaração de início de atividade.",
        ],
        fontes: [
          {
            titulo: "Emitir faturas e recibos — Portal das Finanças",
            url: "https://www.portaldasfinancas.gov.pt/pt/menu.action?pai=3001",
            dominio: "portaldasfinancas.gov.pt",
          },
          {
            titulo: "Trabalhar por conta própria — guia do trabalhador independente (gov.pt)",
            url: "https://www.gov.pt/guias/trabalhar-por-conta-propria-guia-para-trabalhadores-independentes",
            dominio: "gov.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
    {
      id: "rv-iva",
      texto: "Tenho de cobrar IVA nos recibos verdes?",
      palavras: [
        "iva", "imposto", "valor", "acrescentado", "cobrar", "isencao",
        "artigo", "53", "faturacao", "recibo", "verde", "independente",
      ],
      resposta: {
        passos: [
          "Depende do enquadramento: se estiveres isento pelo artigo 53.º do Código do IVA (abaixo do limiar de faturação e sem renúncia), o recibo sai sem IVA, com a menção legal correspondente.",
          "Se renunciaste à isenção e optaste pelo regime normal, cobras IVA mesmo abaixo do limiar e entregas declarações periódicas.",
          "Se ultrapassares o limiar num ano, a obrigação de cobrar IVA começa a 1 de janeiro do ano seguinte — entrega a declaração de alterações nos 15 dias úteis após o fim do ano. Se excederes o limiar em mais de 25% durante o ano, cobras desde esse momento e entregas a declaração nos 15 dias seguintes.",
          "O limiar de isenção é atualizado por lei — confirma o valor em vigor no Portal das Finanças ou com a AT antes de emitir.",
        ],
        fontes: [
          {
            titulo: "Obrigações fiscais — guia do trabalhador independente (gov.pt)",
            url: "https://www.gov.pt/guias/trabalhar-por-conta-propria-guia-para-trabalhadores-independentes",
            dominio: "gov.pt",
          },
          {
            titulo: "Portal das Finanças",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
    {
      id: "rv-retencao",
      texto: "O que é a retenção na fonte nos recibos verdes?",
      palavras: [
        "retencao", "fonte", "desconto", "irs", "recibo", "verde",
        "cliente", "pagamento", "percentagem", "dispensa",
      ],
      resposta: {
        passos: [
          "Quando passas recibo a uma empresa ou entidade com contabilidade organizada, parte do valor fica retida para o teu IRS — recebes o líquido.",
          "Ao emitir, o portal indica se aplica retenção conforme o teu enquadramento; a lei prevê casos de dispensa.",
          "A retenção não é imposto a mais: é um adiantamento por conta do IRS do ano — acerta-se na declaração anual.",
          "Se o cliente é um particular (sem contabilidade organizada), regra geral não há retenção.",
        ],
        fontes: [
          {
            titulo: "Obrigações fiscais — guia do trabalhador independente (gov.pt)",
            url: "https://www.gov.pt/guias/trabalhar-por-conta-propria-guia-para-trabalhadores-independentes",
            dominio: "gov.pt",
          },
          {
            titulo: "Portal das Finanças",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
    {
      id: "rv-trimestral",
      texto: "Que declarações tenho de entregar à Segurança Social como trabalhador independente?",
      palavras: [
        "declaracao", "trimestral", "rendimentos", "seguranca", "social",
        "contribuicoes", "independente", "janeiro", "abril", "julho",
        "outubro", "direta",
      ],
      resposta: {
        passos: [
          "A declaração trimestral de rendimentos entrega-se na Segurança Social Direta em janeiro, abril, julho e outubro — sempre sobre os rendimentos do trimestre anterior.",
          "É ela que fixa a contribuição mensal do trimestre seguinte; se não entregares, a Segurança Social calcula por valores presumidos.",
          "No início de atividade há um período inicial de isenção de contribuições — confirma o teu enquadramento na Segurança Social Direta.",
          "Guarda os comprovativos das declarações entregues.",
        ],
        fontes: [
          {
            titulo: "Declaração trimestral — Segurança Social",
            url: "https://www.seg-social.pt/declaracao-trimestral",
            dominio: "seg-social.pt",
          },
          {
            titulo: "Trabalhadores independentes — Segurança Social",
            url: "https://www.seg-social.pt/trabalhadores-independentes",
            dominio: "seg-social.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
    {
      id: "rv-anual",
      texto: "Tenho de entregar a declaração anual à Segurança Social?",
      palavras: [
        "declaracao", "anual", "rendimentos", "seguranca", "social",
        "janeiro", "confirmar", "independente", "direta", "contribuicoes",
      ],
      resposta: {
        passos: [
          "Sim — em janeiro confirmas ou declaras na Segurança Social Direta os rendimentos do ano civil anterior.",
          "Serve para ajustar as tuas contribuições — não é o IRS nem uma declaração às Finanças.",
          "Ficas dispensado se fores pensionista e tiveres entregue pelo menos uma declaração trimestral no ano anterior.",
          "Se não entregares, a Segurança Social calcula as contribuições por valores presumidos.",
        ],
        fontes: [
          {
            titulo: "Trabalhador independente — declarar ou confirmar a declaração anual (gov.pt)",
            url: "https://www.gov.pt/servicos/trabalhador-independente-declaracao-do-valor-de-atividade",
            dominio: "gov.pt",
          },
          {
            titulo: "Declaração trimestral — Segurança Social",
            url: "https://www.seg-social.pt/declaracao-trimestral",
            dominio: "seg-social.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
  ],
};

export default tema;
