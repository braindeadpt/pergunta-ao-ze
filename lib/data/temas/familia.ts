import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "familia",
  titulo: "Família",
  entidade: "Segurança Social · IRN",
  descricao: "Abono, parentalidade, casamento e união de facto",
  perguntas: [
    {
      id: "fam-abono",
      texto: "Como peço o abono de família?",
      palavras: [
        "abono", "familia", "filho", "filha", "crianca", "apoio",
        "subsidio", "pedir", "seguranca", "social", "nascimento",
      ],
      resposta: {
        passos: [
          "O pedido faz-se na Segurança Social Direta ('Família' → 'Abono de família') ou num balcão da Segurança Social.",
          "O valor depende do escalão de rendimentos do agregado — calculado automaticamente a partir dos dados da AT.",
          "O abono pode ser pedido desde o nascimento e mantém-se consoante a idade e escolaridade da criança.",
          "Há prestações adicionais (pré-natal, deficiência, monoparental) — vê o que se aplica ao teu caso na fonte.",
        ],
        fontes: [
          {
            titulo: "Abono de família — Segurança Social",
            url: "https://www.seg-social.pt/abono-de-familia-e-outros-apoios",
            dominio: "seg-social.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "fam-parental",
      texto: "Como funciona a licença de parentalidade?",
      palavras: [
        "licenca", "parentalidade", "parental", "mae", "pai",
        "bebe", "nascimento", "gozar", "trabalho", "subsidio",
      ],
      resposta: {
        passos: [
          "A licença parental inicial é partilhada entre mãe e pai, com períodos obrigatórios para cada um — as durações exatas estão na lei e mudam ocasionalmente.",
          "A marcação dos períodos comunica-se ao empregador e à Segurança Social, com antecedência mínima definida.",
          "O subsídio parental é pedido na Segurança Social Direta e o valor depende das remunerações e do regime escolhido.",
        ],
        fontes: [
          {
            titulo: "Parentalidade — Segurança Social",
            url: "https://www.seg-social.pt/parentalidade",
            dominio: "seg-social.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "fam-casamento-uniao",
      texto: "Como inicio o processo de casamento ou provo união de facto?",
      palavras: [
        "casamento", "casar", "uniao", "facto", "civil", "conservatoria",
        "noivos", "junta", "freguesia", "regime", "bens", "companheiro",
      ],
      resposta: {
        passos: [
          "Para casar (civil, católico ou civil sob forma religiosa), inicias o processo no Civil Online (com Chave Móvel Digital ou Cartão de Cidadão) ou presencialmente numa conservatória do registo civil, com pelo menos 1 mês de antecedência.",
          "No pedido indicas a modalidade, o local, a data e o regime de bens; depois de a conservatória confirmar que não há impedimentos, o casamento tem de realizar-se nos 6 meses seguintes.",
          "A união de facto não se regista na conservatória: aplica-se a quem vive em condições análogas às dos cônjuges há mais de 2 anos e prova-se com declaração emitida pela Junta de Freguesia.",
          "Para pedir a declaração na Junta de Freguesia, ambos apresentam declaração sob compromisso de honra de que vivem juntos há mais de 2 anos e certidões de cópia integral do registo de nascimento.",
        ],
        fontes: [
          {
            titulo: "Iniciar processo de casamento — Justiça.gov.pt",
            url: "https://justica.gov.pt/Servicos/Iniciar-processo-de-casamento",
            dominio: "justica.gov.pt",
          },
          {
            titulo: "Iniciar o processo de casamento — gov.pt",
            url: "https://www.gov.pt/servicos/iniciar-o-processo-de-casamento",
            dominio: "gov.pt",
          },
          {
            titulo: "Civil Online — Registos IRN",
            url: "https://www.civilonline.mj.pt/CivilOnline/",
            dominio: "civilonline.mj.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
  ],
};

export default tema;
