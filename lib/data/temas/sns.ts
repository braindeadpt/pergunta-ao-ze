import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "sns",
  titulo: "Saúde (SNS)",
  entidade: "SNS / SNS 24",
  descricao: "Médico de família, consultas e linha SNS 24",
  perguntas: [
    {
      id: "sns-consulta",
      texto: "Como marco uma consulta no SNS?",
      palavras: [
        "consulta", "marcar", "medico", "centro", "saude", "sns",
        "hospital", "clinica", "exame", "agendar",
      ],
      resposta: {
        passos: [
          "No teu centro de saúde — presencialmente, por telefone ou através dos canais digitais da unidade (muitas aceitam pedidos pela app SNS ou portal SNS 24).",
          "Se não sabes qual é o teu centro de saúde, procura-o no portal do SNS pela tua morada.",
          "Para aconselhamento antes de marcar, liga para o SNS 24 — 808 24 24 24 — que te encaminha para o serviço certo.",
        ],
        fontes: [
          {
            titulo: "Portal SNS 24",
            url: "https://www.sns24.gov.pt",
            dominio: "sns24.gov.pt",
          },
          {
            titulo: "Portal do SNS",
            url: "https://www.sns.gov.pt",
            dominio: "sns.gov.pt",
          },
        ],
      },
    },
    {
      id: "sns-medico-familia",
      texto: "Como escolho ou mudo de médico de família?",
      palavras: [
        "medico", "familia", "mudar", "escolher", "inscrever",
        "utente", "centro", "saude", "reforma", "pensao",
      ],
      resposta: {
        passos: [
          "Inscreve-te (ou atualiza a inscrição) no centro de saúde da tua área de residência — leva documento de identificação e comprovativo de morada.",
          "A atribuição de médico de família depende das vagas da unidade; se não houver, ficas em lista de espera mas manténs acesso às consultas.",
          "Se o teu médico se reformar ou sair, o próprio centro de saúde trata da reatribuição — não precisas de fazer nada.",
        ],
        fontes: [
          {
            titulo: "Cuidados de Saúde Primários — SNS",
            url: "https://www.sns.gov.pt",
            dominio: "sns.gov.pt",
          },
        ],
      },
    },
    {
      id: "sns-24",
      texto: "Para que serve o SNS 24?",
      palavras: [
        "sns", "24", "linha", "ligar", "telefone", "808",
        "aconselhamento", "sintomas", "urgencia", "doente",
      ],
      resposta: {
        passos: [
          "É a linha de triagem e aconselhamento do SNS — 808 24 24 24 — para sintomas, dúvidas de saúde e encaminhamento para o serviço certo.",
          "No portal e na app SNS 24 também consultas receitas, pedes baixa de autodeclaração (até 3 dias) e vês exames e vacinas.",
          "Em emergência não uses o SNS 24: liga 112.",
        ],
        fontes: [
          {
            titulo: "Portal SNS 24",
            url: "https://www.sns24.gov.pt",
            dominio: "sns24.gov.pt",
          },
        ],
      },
    },
    {
      id: "sns-utente",
      texto: "Como sei o meu número de utente do SNS?",
      palavras: [
        "utente", "numero", "sns", "saude", "registo", "rnu",
        "identificacao", "cartao", "consultar",
      ],
      resposta: {
        passos: [
          "Se tens Cartão de Cidadão, o número nacional de utente está no verso do cartão — é atribuído automaticamente quando pedes o CC.",
          "Também o consultas na área pessoal do portal SNS 24 ou na app SNS 24, na informação do teu registo (RNU).",
          "Cidadãos estrangeiros sem CC: o número é atribuído na primeira vez que fores a uma unidade pública do SNS (centro de saúde ou hospital) — leva um documento de identificação.",
        ],
        fontes: [
          {
            titulo: "Obter o número de utente do SNS — gov.pt",
            url: "https://www.gov.pt/servicos/pedir-o-numero-de-utente-do-sns",
            dominio: "gov.pt",
          },
          {
            titulo: "Portal SNS 24 — área pessoal",
            url: "https://www.sns24.gov.pt",
            dominio: "sns24.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
