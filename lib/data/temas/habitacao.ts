import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "habitacao",
  titulo: "Habitação",
  entidade: "Portal da Habitação",
  descricao: "Apoios ao arrendamento, incluindo o Porta 65",
  perguntas: [
    {
      id: "hab-porta65",
      texto: "Como me candidato ao Porta 65 (apoio à renda)?",
      palavras: [
        "porta", "65", "renda", "arrendamento", "apoio", "habitacao",
        "jovem", "casa", "alugar", "candidatura",
      ],
      resposta: {
        passos: [
          "As candidaturas fazem-se online no Portal da Habitação, dentro das janelas de candidatura que abrem ao longo do ano.",
          "Há modalidades para jovens e para famílias, com limites de rendimento e de valor de renda que variam por zona.",
          "Precisas do contrato de arrendamento registado nas Finanças pelo senhorio — sem isso a candidatura falha.",
          "Confirma na fonte as janelas de candidatura e os limites em vigor: mudam com frequência.",
        ],
        fontes: [
          {
            titulo: "Porta 65 — Portal da Habitação",
            url: "https://www.portaldahabitacao.pt",
            dominio: "portaldahabitacao.pt",
          },
        ],
      },
    },
    {
      id: "hab-registar-contrato",
      texto: "O senhorio tem de registar o contrato de arrendamento nas Finanças?",
      palavras: [
        "contrato", "arrendamento", "registar", "senhorio",
        "financas", "renda", "recibo", "eletronico",
      ],
      resposta: {
        passos: [
          "Sim — é obrigação do senhorio registar o contrato no Portal das Finanças e emitir os recibos de renda eletrónicos.",
          "Sem contrato registado, não tens recibo de renda — e precisas dele para apoios como o Porta 65 e para deduzir a renda no IRS.",
          "Em certos casos o inquilino pode declarar ele próprio o contrato às Finanças quando o senhorio não o faz.",
        ],
        fontes: [
          {
            titulo: "Arrendamento — Portal das Finanças",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
      },
    },
    {
      id: "hab-imi",
      texto: "Como consulto e pago o IMI?",
      palavras: [
        "imi", "imposto", "imovel", "municipal", "pagar", "nota",
        "cobranca", "predial", "caderneta", "isencao",
      ],
      resposta: {
        passos: [
          "No Portal das Finanças (senha, Chave Móvel Digital ou CC): a nota de cobrança do IMI está em «Imóveis» → «Consultar Notas de Cobrança» ou em «Pagamentos a decorrer».",
          "A nota tem o valor, o prazo e as referências — pagas por multibanco, MB Way, homebanking ou débito direto.",
          "Presencialmente, pagas num balcão das Finanças ou Espaço Cidadão.",
          "Para isenções ou a caderneta predial, consulta a área «Imóveis» do portal.",
        ],
        nota: "O IMI é anual — conforme o valor pode ser pago em prestações; confirma na nota de cobrança.",
        fontes: [
          {
            titulo: "Pagar o IMI — gov.pt",
            url: "https://www.gov.pt/servicos/pagar-o-imposto-municipal-sobre-imoveis-imi-",
            dominio: "gov.pt",
          },
          {
            titulo: "Portal das Finanças — Imóveis",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
