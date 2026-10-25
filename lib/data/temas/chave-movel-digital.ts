import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "chave-movel-digital",
  titulo: "Chave Móvel Digital",
  entidade: "AMA",
  descricao: "Ativação e utilização para entrar nos serviços",
  perguntas: [
    {
      id: "cmd-ativar",
      texto: "Como ativo a Chave Móvel Digital?",
      palavras: [
        "chave", "movel", "digital", "cmd", "ativar", "ativaçao",
        "autenticacao", "login", "senha", "telemovel", "sms",
      ],
      resposta: {
        passos: [
          "Online, em autenticacao.gov.pt — com leitor de cartão e o PIN de autenticação do Cartão de Cidadão, ou por videochamada de ativação.",
          "Presencial — num balcão de atendimento aderente (Espaços do Cidadão, Lojas de Cidadão), só com o telemóvel e o Cartão de Cidadão.",
          "Depois de ativada, escolhes um PIN de 4 dígitos e passas a entrar nos serviços públicos com número de telemóvel + PIN + código enviado por SMS.",
          "É gratuita e funciona na Segurança Social Direta, Portal das Finanças, SNS, ePortugal e dezenas de outros serviços.",
        ],
        fontes: [
          {
            titulo: "Chave Móvel Digital — Autenticação.gov.pt",
            url: "https://www.autenticacao.gov.pt/chave-movel-digital",
            dominio: "autenticacao.gov.pt",
          },
        ],
      },
    },
    {
      id: "cmd-para-que-serve",
      texto: "Para que serve a Chave Móvel Digital?",
      palavras: [
        "chave", "movel", "digital", "cmd", "serve", "usar", "entrar",
        "servicos", "autenticar", "assinar",
      ],
      resposta: {
        passos: [
          "Serve para te autenticares nos portais do Estado — Finanças, Segurança Social Direta, SNS 24, ePortugal e muitos outros — só com o telemóvel.",
          "Permite também assinar documentos eletrónicos com valor legal, sem leitor de cartão.",
          "É a forma mais simples de aceder aos serviços se perdeste os códigos PIN do Cartão de Cidadão.",
        ],
        fontes: [
          {
            titulo: "Chave Móvel Digital — Autenticação.gov.pt",
            url: "https://www.autenticacao.gov.pt/chave-movel-digital",
            dominio: "autenticacao.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
