import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "cartao-de-cidadao",
  titulo: "Cartão de Cidadão",
  entidade: "IRN",
  descricao: "Renovação, códigos PIN/PUK e mudança de morada",
  perguntas: [
    {
      id: "cc-renovar",
      texto: "Como renovo o Cartão de Cidadão?",
      palavras: [
        "cartao", "cidadao", "cc", "renovar", "renovacao", "expirado",
        "caducado", "validade", "novo", "identificacao", "documento",
      ],
      resposta: {
        passos: [
          "Online, no ePortugal — se tens 25 anos ou mais, a Chave Móvel Digital ou leitor de cartão, e não precisas de alterar dados nem foto.",
          "Presencial — agenda no Siga (siga.gov.pt ou app SigaApp) e vai a um Espaço de Registos, Loja do Cidadão ou consulado.",
          "Leva o Cartão de Cidadão atual. No atendimento presencial tiram a foto e recolhem a assinatura na hora.",
          "O preço depende do prazo e do local; a renovação online é mais barata. Confirma o valor atual na fonte.",
        ],
        nota: "Podes renovar antes de caducar — não precisas de esperar que expire.",
        fontes: [
          {
            titulo: "Renovar o Cartão de Cidadão",
            url: "https://www.gov.pt/servicos/renovar-o-cartao-de-cidadao",
            dominio: "gov.pt",
          },
          {
            titulo: "Instituto dos Registos e do Notariado",
            url: "https://irn.justica.gov.pt",
            dominio: "irn.justica.gov.pt",
          },
        ],
      },
    },
    {
      id: "cc-pin-puk",
      texto: "Perdi a carta com o PIN e o PUK do Cartão de Cidadão. E agora?",
      palavras: [
        "pin", "puk", "codigo", "codigos", "carta", "perdi", "perdida",
        "recuperar", "cartao", "cidadao", "assinatura", "autenticacao",
      ],
      resposta: {
        passos: [
          "Os códigos PIN, PUK e de cancelamento vêm na carta de código que recebeste com o Cartão de Cidadão.",
          "Se perdeste a carta, pede uma segunda via presencialmente num balcão do IRN, Espaço de Registos ou Loja do Cidadão — não é possível recuperar os códigos online.",
          "Sem o PIN de autenticação não consegues usar o leitor de cartão para entrar em serviços — mas podes usar a Chave Móvel Digital em alternativa.",
        ],
        fontes: [
          {
            titulo: "Cartão de Cidadão — Autenticação.gov.pt",
            url: "https://www.autenticacao.gov.pt/o-cartao-de-cidadao",
            dominio: "autenticacao.gov.pt",
          },
        ],
      },
    },
    {
      id: "cc-morada",
      texto: "Como mudo a morada no Cartão de Cidadão?",
      palavras: [
        "morada", "mudar", "alterar", "residencia", "domicilio",
        "cartao", "cidadao", "mudanca", "casa", "freguesia",
      ],
      resposta: {
        passos: [
          "Online, no ePortugal — com Chave Móvel Digital ou leitor de cartão e o PIN de morada.",
          "Recebes em casa uma carta com um código de confirmação, que introduces no ePortugal para concluir a alteração.",
          "Presencial — na Junta de Freguesia, num balcão do IRN ou numa Loja do Cidadão.",
          "A morada do Cartão de Cidadão é a tua morada fiscal: ao mudá-la, atualizas automaticamente a morada junto das Finanças.",
        ],
        fontes: [
          {
            titulo: "Alterar a morada do Cartão de Cidadão",
            url: "https://www.gov.pt/servicos/alterar-a-morada-do-cartao-de-cidadao",
            dominio: "gov.pt",
          },
        ],
      },
    },
    {
      id: "cc-perdido",
      texto: "Perdi o Cartão de Cidadão ou furtaram-mo. O que faço?",
      palavras: [
        "perdi", "perdido", "furtado", "roubado", "furto", "roubo",
        "segunda", "via", "cancelar", "cartao", "cidadao", "carteira",
      ],
      resposta: {
        passos: [
          "Primeiro cancela o cartão — online no ePortugal, presencialmente, ou pela Linha Cartão de Cidadão (+351) 210 990 111, que funciona 24h, todos os dias.",
          "Se foi furto, participa à polícia (PSP ou GNR) — a participação oficializa o furto junto das autoridades.",
          "Depois pedes a substituição: online no ePortugal (casos de perda, destruição, roubo ou furto) ou presencialmente num balcão do IRN, Espaço de Registos ou Loja do Cidadão.",
          "Se perdeste a carteira toda, o balcão «Perdi a Carteira» da Loja de Cidadão das Laranjeiras trata de vários documentos de uma vez — funciona por agendamento.",
        ],
        nota: "O cancelamento online deve ser feito nos 10 dias seguintes à perda ou furto.",
        fontes: [
          {
            titulo: "Pedir a 2.ª via de documentos perdidos ou roubados — gov.pt",
            url: "https://www.gov.pt/guias/pedir-a-2-a-via-de-documentos-perdidos-ou-roubados",
            dominio: "gov.pt",
          },
          {
            titulo: "Renovar o Cartão de Cidadão — gov.pt",
            url: "https://www.gov.pt/servicos/renovar-o-cartao-de-cidadao",
            dominio: "gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
