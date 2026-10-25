import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "familia",
  titulo: "Família",
  entidade: "Segurança Social",
  descricao: "Abono de família e licenças de parentalidade",
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
      },
    },
  ],
};

export default tema;
