import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "seguranca-social",
  titulo: "Segurança Social",
  entidade: "Segurança Social",
  descricao: "NISS, Segurança Social Direta, baixas e prestações",
  perguntas: [
    {
      id: "ss-niss",
      texto: "Como peço o NISS (número de Segurança Social)?",
      palavras: [
        "niss", "numero", "seguranca", "social", "pedir", "inscricao",
        "trabalhar", "emprego", "contribuinte", "social",
      ],
      resposta: {
        passos: [
          "O NISS pede-se online no site da Segurança Social, através do serviço 'NISS na Hora' ou do formulário de atribuição.",
          "Precisas de documento de identificação e, se fores cidadão estrangeiro, do título de residência ou autorização válida.",
          "Se fores começar a trabalhar, o empregador também pode tratar da inscrição — pergunta antes de fazeres o pedido para não duplicar.",
        ],
        fontes: [
          {
            titulo: "Pedir o NISS — Segurança Social",
            url: "https://www.seg-social.pt/pedido-niss-formulario",
            dominio: "seg-social.pt",
          },
        ],
      },
    },
    {
      id: "ss-direta",
      texto: "Como adiro à Segurança Social Direta?",
      palavras: [
        "seguranca", "social", "direta", "aderir", "registo",
        "senha", "aceder", "conta", "online",
      ],
      resposta: {
        passos: [
          "Precisas primeiro de ter NISS (número de identificação da Segurança Social).",
          "No site seg-social.pt, escolhe 'Registar' na Segurança Social Direta e define a tua senha — podes autenticar-te com a Chave Móvel Digital.",
          "Com a conta ativa consultas declarações de remunerações, baixas, pensões, dívidas e prestações familiares.",
        ],
        fontes: [
          {
            titulo: "Segurança Social Direta",
            url: "https://www.seg-social.pt",
            dominio: "seg-social.pt",
          },
        ],
      },
    },
    {
      id: "ss-baixa",
      texto: "Como funciona a baixa médica (CIT)?",
      palavras: [
        "baixa", "medica", "cit", "doenca", "subsidio", "doente",
        "faltar", "trabalho", "atestado", "medico",
      ],
      resposta: {
        passos: [
          "O médico do SNS emite o Certificado de Incapacidade Temporária (CIT) em consulta — é enviado eletronicamente à Segurança Social e, por ti, ao empregador.",
          "Acompanhas o estado do CIT e do subsídio de doença na Segurança Social Direta.",
          "Em alguns casos podes autodeclarar uma baixa até 3 dias no portal ou app SNS 24, dentro dos limites anuais.",
        ],
        fontes: [
          {
            titulo: "Doença — Segurança Social",
            url: "https://www.seg-social.pt/doenca",
            dominio: "seg-social.pt",
          },
          {
            titulo: "Baixa médica — ePortugal",
            url: "https://eportugal.gov.pt",
            dominio: "eportugal.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
