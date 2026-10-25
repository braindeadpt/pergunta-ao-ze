import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "reclamacoes",
  titulo: "Reclamações",
  entidade: "DGE · reguladores",
  descricao: "Livro de Reclamações online e queixas a entidades",
  perguntas: [
    {
      id: "rec-livro",
      texto: "Como faço uma reclamação no Livro de Reclamações online?",
      palavras: [
        "livro", "reclamacoes", "reclamacao", "queixa", "online",
        "eletronico", "consumidor", "servico", "empresa",
      ],
      resposta: {
        passos: [
          "Entra em livroreclamacoes.pt, regista-te como consumidor e escreve a reclamação contra a entidade — tem o mesmo valor que o livro físico.",
          "A entidade é obrigada a responder dentro do prazo legal e a queixa chega ao regulador do setor.",
          "Guarda o comprovativo de submissão — é a tua prova.",
        ],
        fontes: [
          {
            titulo: "Livro de Reclamações Eletrónico",
            url: "https://www.livroreclamacoes.pt",
            dominio: "livroreclamacoes.pt",
          },
        ],
      },
    },
    {
      id: "rec-regulador",
      texto: "Quando devo queixar-me ao regulador em vez do livro?",
      palavras: [
        "regulador", "queixa", "anacom", "erse", "banco",
        "portugal", "provedor", "justica", "telecom", "energia",
      ],
      resposta: {
        passos: [
          "O Livro de Reclamações cobre a maioria dos serviços, mas setores regulados (telecomunicações, energia, banca, transportes) têm entidades próprias que tratam conflitos.",
          "Exemplos: ANACOM para telecomunicações, ERSE para energia, Banco de Portugal para bancos — reclamar diretamente ao regulador costuma ser mais eficaz.",
          "Para conflitos de consumo até certo valor, os centros de arbitragem resolvem sem tribunal.",
        ],
        fontes: [
          {
            titulo: "Reclamações — gov.pt",
            url: "https://www.gov.pt",
            dominio: "gov.pt",
          },
        ],
      },
    },
    {
      id: "rec-cancelar-contrato",
      texto: "Como rescindo um contrato de telecomunicações?",
      palavras: [
        "cancelar", "rescindir", "contrato", "operadora", "fidelizacao",
        "cessacao", "telecomunicacoes", "net", "telemovel", "tv",
      ],
      resposta: {
        passos: [
          "Confirma primeiro se tens fidelização ativa — na área de cliente da operadora. Cancelar durante a fidelização pode ter penalização (há exceções legais, p.ex. desemprego ou emigração).",
          "A via oficial é a Plataforma de Cessação de Contratos (cessacaodecontratos.pt), gerida pela Direção-Geral do Consumidor — autenticas com Chave Móvel Digital ou Cartão de Cidadão.",
          "O processo na plataforma tem duas etapas: pedido de informação contratual e depois o pedido de cessação (denúncia).",
          "Também podes rescindir diretamente à operadora — área de cliente, loja, carta ou linha de apoio. Guarda sempre prova do pedido.",
        ],
        nota: "Se discordares do valor cobrado, recorre a um Centro de Arbitragem de Conflitos de Consumo — é gratuito.",
        fontes: [
          {
            titulo: "Plataforma de Cessação de Contratos",
            url: "https://www.cessacaodecontratos.pt",
            dominio: "cessacaodecontratos.pt",
          },
          {
            titulo: "ANACOM — regulador das comunicações",
            url: "https://www.anacom.pt",
            dominio: "anacom.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
