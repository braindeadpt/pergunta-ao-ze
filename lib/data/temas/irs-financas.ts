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
          "A declaração anual de IRS (Modelo 3) entrega-se no Portal das Finanças de 1 de abril a 30 de junho do ano seguinte ao dos rendimentos.",
          "Entra com a senha do Portal das Finanças ou com a Chave Móvel Digital.",
          "Se estiveres abrangido pelo IRS Automático, a declaração vem pré-preenchida: revê e confirma.",
          "Guarda o comprovativo de entrega. Se entregares dentro do prazo, o reembolso ou o pagamento está previsto até 31 de agosto; o reembolso é pago por transferência para o IBAN registado.",
        ],
        fontes: [
          {
            titulo: "Declaração de IRS — apoio do Portal das Finanças",
            url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Rendimentos/Declaracao/Paginas/default.aspx",
            dominio: "portaldasfinancas.gov.pt",
          },
          {
            titulo: "Principais prazos do IRS — Portal das Finanças",
            url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Rendimentos/Declaracao/prazos/Paginas/default.aspx",
            dominio: "portaldasfinancas.gov.pt",
          },
          {
            titulo: "Entregar a declaração de IRS — gov.pt",
            url: "https://www.gov.pt/servicos/simular-e-entregar-a-declaracao-anual-do-irs",
            dominio: "gov.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "irs-reembolso",
      texto: "Como sei se tenho reembolso de IRS?",
      palavras: [
        "irs", "reembolso", "receber", "estado", "liquidacao",
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
            titulo: "Pagamentos e reembolsos — apoio do Portal das Finanças",
            url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/pagamentos_e_reembolsos/Pages/default.aspx",
            dominio: "portaldasfinancas.gov.pt",
          },
          {
            titulo: "Portal das Finanças",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "at-nif",
      texto: "Como peço o NIF (número de contribuinte)?",
      palavras: [
        "nif", "numero", "contribuinte", "fiscal", "pedir",
        "atribuicao", "estrangeiro", "financas", "identificacao",
        "representante",
      ],
      resposta: {
        passos: [
          "Cidadãos portugueses com Cartão de Cidadão já têm o NIF atribuído automaticamente no cartão — não precisas de pedir nada.",
          "Cidadãos estrangeiros: pedes num Serviço de Finanças ou Loja do Cidadão (com agendamento prévio), levando passaporte ou documento de identificação civil e comprovativo de morada.",
          "Também pode ser pedido online no Portal das Finanças (no e-balcão: Registo Contribuinte → Identific → Atrib/Alter NIF-Singulares) através de um representante legal ou mandatário com procuração.",
          "Se residires fora da UE, Noruega, Islândia ou Liechtenstein, tens de nomear um representante fiscal em Portugal ou aderir às notificações eletrónicas no Portal das Finanças (dispensado se não tiveres relação jurídica tributária em Portugal).",
        ],
        fontes: [
          {
            titulo: "Pedir o NIF — gov.pt",
            url: "https://www.gov.pt/servicos/pedir-o-numero-de-identificacao-fiscal-para-pessoa-singular",
            dominio: "gov.pt",
          },
          {
            titulo: "NIF — apoio do Portal das Finanças",
            url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Dados_pessoais_familia/Dados_pessoais/NIF/Paginas/default.aspx",
            dominio: "portaldasfinancas.gov.pt",
          },
          {
            titulo: "Nomear representante fiscal — gov.pt",
            url: "https://www.gov.pt/servicos/nomear-representante-fiscal",
            dominio: "gov.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "at-certidao-domicilio",
      texto: "Como peço a certidão de domicílio fiscal?",
      palavras: [
        "certidao", "domicilio", "fiscal", "financas", "residencia",
        "documento", "comprovativo", "morada", "estrangeiro",
      ],
      resposta: {
        passos: [
          "No Portal das Finanças, em 'Todos os Serviços' ou 'Cidadãos' → 'Certidões', pedes a certidão de domicílio fiscal — é emitida gratuitamente em PDF (disponível em português e inglês) com código de validação.",
          "Se tens Cartão de Cidadão, a certidão reflete a morada do CC: se mudaste de casa, altera primeiro a morada do Cartão de Cidadão no portal gov.pt ou num balcão do IRN.",
          "Cidadãos estrangeiros sem Cartão de Cidadão atualizam a morada diretamente no Portal das Finanças ('Dados Cadastrais' → 'Morada' → 'Entregar Pedido de Alteração', ou no e-balcão com título de residência se mudarem o estatuto de não residente para residente) ou num Serviço de Finanças com agendamento.",
        ],
        fontes: [
          {
            titulo: "Certidões e comprovativos — apoio do Portal das Finanças",
            url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Casa_e_propriedades/Certidoes_e_comprovativos/Paginas/default.aspx",
            dominio: "portaldasfinancas.gov.pt",
          },
          {
            titulo: "Morada fiscal — apoio do Portal das Finanças",
            url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Dados_pessoais_familia/Dados_pessoais/Morada/Paginas/default.aspx",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
        verificadoEm: "2026-11-12",
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
        verificadoEm: "2026-11-12",
      },
    },
  ],
};

export default tema;
