import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "direitos-trabalho",
  titulo: "Trabalho e direitos",
  entidade: "ACT — Autoridade para as Condições do Trabalho",
  descricao: "Férias, subsídios, despedimento e queixas junto da ACT",
  perguntas: [
    {
      id: "dt-ferias",
      texto: "Quantos dias de férias tenho por ano?",
      palavras: [
        "ferias", "dias", "uteis", "descanso", "trabalho", "contrato",
        "gozar", "marcar", "direito", "empregador",
      ],
      resposta: {
        passos: [
          "O Código do Trabalho garante 22 dias úteis de férias por ano.",
          "No primeiro ano de contrato há regras próprias: o direito a férias é proporcional ao tempo trabalhado.",
          "As férias são marcadas por acordo contigo e com o empregador; em falta de acordo, o empregador marca dentro das datas previstas na lei.",
          "Férias não gozadas por culpa do empregador têm de ser compensadas. Em caso de dúvida ou incumprimento, a ACT esclarece e fiscaliza.",
        ],
        fontes: [
          {
            titulo: "ACT — Autoridade para as Condições do Trabalho",
            url: "https://portal.act.gov.pt/Pages/Home.aspx",
            dominio: "portal.act.gov.pt",
          },
          {
            titulo: "Segurança e Saúde no Trabalho — guia gov.pt",
            url: "https://www.gov.pt/guias/seguranca-e-saude-no-trabalho-em-portugal",
            dominio: "gov.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
    {
      id: "dt-subsidios",
      texto: "Tenho direito a subsídio de férias e de Natal?",
      palavras: [
        "subsidio", "ferias", "natal", "decimo", "terceiro", "pagamento",
        "dezembro", "direito", "trabalho", "vencimento", "salario",
      ],
      resposta: {
        passos: [
          "Sim — o Código do Trabalho garante subsídio de férias e subsídio de Natal a trabalhadores por conta de outrem.",
          "O subsídio de Natal é pago até 15 de dezembro; o de férias antes do período de férias, salvo acordo em contrário.",
          "Se não recebeste, começa por falar com a entidade empregadora; se não resolver, podes apresentar queixa à ACT.",
          "Guarda os recibos de vencimento — são a prova do que te foi (ou não) pago.",
        ],
        fontes: [
          {
            titulo: "Fazer uma queixa à ACT — gov.pt",
            url: "https://www.gov.pt/servicos/fazer-uma-queixa-a-autoridade-para-as-condicoes-do-trabalho-act-",
            dominio: "gov.pt",
          },
          {
            titulo: "ACT — Autoridade para as Condições do Trabalho",
            url: "https://portal.act.gov.pt/Pages/Home.aspx",
            dominio: "portal.act.gov.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
    {
      id: "dt-despedido",
      texto: "Fui despedido — o que devo fazer?",
      palavras: [
        "despedido", "despedimento", "demitiram", "mandaram", "embora",
        "trabalho", "emprego", "contestar", "carta", "ilicito",
      ],
      resposta: {
        passos: [
          "O despedimento tem de ser comunicado por escrito com o motivo — guarda a carta ou a comunicação que recebeste.",
          "Para contestar o despedimento há prazos legais apertados: a ACT explica-te o prazo e os passos do teu caso concreto (linha 300 069 300, dias úteis das 9h00 às 12h30).",
          "Inscreve-te no IEFP para o subsídio de desemprego — a inscrição online é a mais rápida.",
          "Junta o contrato de trabalho, os recibos de vencimento e a carta de despedimento — são a base de qualquer pedido.",
        ],
        fontes: [
          {
            titulo: "Fazer uma queixa à ACT — gov.pt",
            url: "https://www.gov.pt/servicos/fazer-uma-queixa-a-autoridade-para-as-condicoes-do-trabalho-act-",
            dominio: "gov.pt",
          },
          {
            titulo: "Inscrição para emprego — IEFP",
            url: "https://www.iefp.pt/inscricao-para-emprego",
            dominio: "iefp.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
    {
      id: "dt-act",
      texto: "Como faço uma queixa à ACT?",
      palavras: [
        "queixa", "denuncia", "act", "reclamar", "empregador",
        "patrao", "incumprimento", "assedio", "anonimo",
      ],
      resposta: {
        passos: [
          "Online: no portal da ACT a queixa chama-se «pedido de intervenção inspetiva» — entras com Cartão de Cidadão, Chave Móvel Digital ou NIF e senha.",
          "Há um formulário próprio para casos de assédio moral ou sexual.",
          "Também podes queixar-te presencialmente num serviço local da ACT ou por escrito — a tua identidade não é revelada ao empregador.",
          "Descreve o problema com datas, locais e nomes, e junta provas: contrato, recibos de vencimento, registos de horário.",
          "Linha de atendimento ACT: 300 069 300, dias úteis das 9h00 às 12h30.",
        ],
        fontes: [
          {
            titulo: "Fazer uma queixa à ACT — gov.pt",
            url: "https://www.gov.pt/servicos/fazer-uma-queixa-a-autoridade-para-as-condicoes-do-trabalho-act-",
            dominio: "gov.pt",
          },
          {
            titulo: "Pedido de intervenção — portal da ACT",
            url: "https://portal.act.gov.pt/Pages/PedidoInformacao.aspx",
            dominio: "portal.act.gov.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
    {
      id: "dt-contrato",
      texto: "O que deve constar num contrato de trabalho?",
      palavras: [
        "contrato", "trabalho", "escrito", "termo", "indeterminado",
        "efetivo", "funcao", "retribuicao", "horario", "assinado",
      ],
      resposta: {
        passos: [
          "Regra geral o contrato é escrito — a exceção mais comum é o contrato por tempo indeterminado sem forma especial.",
          "Deve indicar a atividade/função, a retribuição, o período normal de trabalho, o local e a data de início.",
          "Se for a termo certo ou incerto, tem de dizer o motivo do termo — sem motivo válido o termo é nulo.",
          "Se não tens cópia, pede-a à entidade empregadora; os recibos de vencimento e a declaração na Segurança Social Direta também comprovam a relação de trabalho.",
        ],
        fontes: [
          {
            titulo: "ACT — Autoridade para as Condições do Trabalho",
            url: "https://portal.act.gov.pt/Pages/Home.aspx",
            dominio: "portal.act.gov.pt",
          },
          {
            titulo: "Fazer uma queixa à ACT — gov.pt",
            url: "https://www.gov.pt/servicos/fazer-uma-queixa-a-autoridade-para-as-condicoes-do-trabalho-act-",
            dominio: "gov.pt",
          },
        ],
        verificadoEm: "2026-11-27",
      },
    },
  ],
};

export default tema;
