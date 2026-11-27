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
          "Depende do enquadramento: abaixo do limiar de faturação do artigo 53.º do Código do IVA ficas isento — o recibo sai sem IVA, com a menção legal correspondente.",
          "Acima do limiar, ou se renunciares à isenção, passas a cobrar IVA ao cliente e a entregar declarações periódicas de IVA.",
          "O limiar de isenção é atualizado por lei — confirma o valor em vigor no Portal das Finanças ou com a AT antes de emitir.",
          "Clientes noutros países (UE ou fora dela) podem ter regras diferentes de IVA — confirma o caso concreto antes de emitir.",
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
      texto: "Tenho de entregar declaração anual de atividade às Finanças?",
      palavras: [
        "declaracao", "anual", "atividade", "faturacao", "financas",
        "janeiro", "valores", "independente", "irs", "enquadramento",
      ],
      resposta: {
        passos: [
          "Sim — em janeiro entregas no Portal das Finanças a declaração anual com os valores faturados no ano anterior.",
          "É distinta do IRS: serve para confirmar o enquadramento de IVA e de atividade.",
          "Sem a declaração podes ficar com dados em falta ou perder o enquadramento de isenção que tinhas.",
          "Confirma o prazo exato do ano em curso no Portal das Finanças.",
        ],
        fontes: [
          {
            titulo: "Declarações de atividade — apoio do Portal das Finanças",
            url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Atividade_profissional/Declaracoes_de_atividade/Paginas/default.aspx",
            dominio: "portaldasfinancas.gov.pt",
          },
          {
            titulo: "Guia do trabalhador independente — gov.pt",
            url: "https://www.gov.pt/guias/trabalhador-independente",
            dominio: "gov.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
  ],
};

export default tema;
