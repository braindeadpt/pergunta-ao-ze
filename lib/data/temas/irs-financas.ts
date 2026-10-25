import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "irs-financas",
  titulo: "IRS e Finanças",
  entidade: "Autoridade Tributária",
  descricao: "Declaração anual, reembolso e certidões fiscais",
  perguntas: [
    {
      id: "irs-entregar",
      texto: "Como entrego a declaração de IRS?",
      palavras: [
        "irs", "declaracao", "entregar", "submeter", "imposto",
        "rendimento", "financas", "portal", "modelo", "anual",
        "fisco", "tributaria",
      ],
      resposta: {
        passos: [
          "A declaração anual de IRS (Modelo 3) entrega-se no Portal das Finanças, durante o prazo legal — habitualmente de abril a junho. Confirma as datas do ano em curso na fonte.",
          "Entra com a senha do Portal das Finanças ou com a Chave Móvel Digital.",
          "Se estiveres abrangido pelo IRS Automático, a declaração vem pré-preenchida: revê e confirma.",
          "Guarda o comprovativo de entrega. O reembolso, se existir, é pago por transferência para o IBAN registado.",
        ],
        fontes: [
          {
            titulo: "IRS — Portal das Finanças",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
          {
            titulo: "Entregar a declaração de IRS — gov.pt",
            url: "https://www.gov.pt/servicos/simular-e-entregar-a-declaracao-anual-do-irs",
            dominio: "gov.pt",
          },
        ],
      },
    },
    {
      id: "irs-reembolso",
      texto: "Como sei se tenho reembolso de IRS?",
      palavras: [
        "irs", "reembolso", "receber", "estado", "liquidaçao",
        "reembolsavel", "pagar", "devolver", "financas",
      ],
      resposta: {
        passos: [
          "No Portal das Finanças, na área do IRS, consultas o estado de processamento da declaração: de 'Recebida' até 'Reembolso Emitido' ou 'Liquidação Processada'.",
          "Se o resultado for a pagar, emites aí mesmo a nota de cobrança para pagamento.",
          "Confirma que o teu IBAN está correto na tua área de cidadão para o reembolso não falhar.",
        ],
        fontes: [
          {
            titulo: "Consultar declaração de IRS — Portal das Finanças",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
      },
    },
    {
      id: "at-nif",
      texto: "Como peço o NIF (número de contribuinte)?",
      palavras: [
        "nif", "numero", "contribuinte", "fiscal", "pedir",
        "atribuicao", "estrangeiro", "financas", "identificacao",
      ],
      resposta: {
        passos: [
          "Cidadãos portugueses: o NIF já vem no Cartão de Cidadão — não precisas de pedir nada.",
          "Cidadãos estrangeiros: pedes num balcão das Finanças ou Loja do Cidadão, com documento de identificação e comprovativo de morada.",
          "Se não fores residente na UE, podes ser obrigado a nomear um representante fiscal — verifica se é o teu caso.",
          "Também é possível tratar por procurador ou através dos serviços online da AT em casos específicos.",
        ],
        fontes: [
          {
            titulo: "Pedir o NIF — gov.pt",
            url: "https://www.gov.pt/servicos/pedir-o-numero-de-identificacao-fiscal-para-pessoa-singular",
            dominio: "gov.pt",
          },
          {
            titulo: "Portal das Finanças",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
      },
    },
    {
      id: "at-certidao-domicilio",
      texto: "Como peço a certidão de domicílio fiscal?",
      palavras: [
        "certidao", "domicilio", "fiscal", "financas", "residencia",
        "documento", "comprovativo", "morada",
      ],
      resposta: {
        passos: [
          "No Portal das Finanças, na área 'Todos os Serviços' ou em 'Cidadãos', pede a certidão de domicílio fiscal — é emitida em PDF com código de verificação.",
          "A certidão espelha a morada registada no Cartão de Cidadão; se mudaste de casa, atualiza primeiro a morada do CC.",
        ],
        fontes: [
          {
            titulo: "Portal das Finanças — Serviços Tributários",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
      },
    },
    {
      id: "at-efatura",
      texto: "Como consulto e registo faturas no e-fatura?",
      palavras: [
        "efatura", "fatura", "faturas", "validar", "registar", "consultar",
        "deducoes", "nif", "despesas", "irs", "financas",
      ],
      resposta: {
        passos: [
          "Entra no portal e-Fatura (faturas.portaldasfinancas.gov.pt) ou na app e-Fatura — com senha das Finanças, Chave Móvel Digital ou Cartão de Cidadão.",
          "Em «Verificar faturas» vês as emitidas com o teu NIF; valida ou corrige a classificação das pendentes (saúde, educação, habitação…).",
          "As que não aparecerem podes registar tu — na app até pelo código QR da fatura, mesmo que não tenhas pedido com NIF.",
          "Para efeitos de IRS, a validação do ano deve estar feita até ao fim de fevereiro seguinte; a partir de 15 de março já consultas as despesas consideradas nas deduções.",
        ],
        nota: "Se tens atividade independente, marca se cada despesa foi feita no âmbito da atividade — muda a dedução.",
        fontes: [
          {
            titulo: "e-Fatura — Portal das Finanças",
            url: "https://faturas.portaldasfinancas.gov.pt/",
            dominio: "faturas.portaldasfinancas.gov.pt",
          },
          {
            titulo: "e-Fatura — ajuda do Portal das Finanças",
            url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Rendimentos/Declaracao/e_Fatura/Paginas/default.aspx",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
