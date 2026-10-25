import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "carta-conducao-imt",
  titulo: "Carta de condução e veículos",
  entidade: "IMT",
  descricao: "Renovação da carta, IUC, inspeção e registo",
  perguntas: [
    {
      id: "imt-renovar-carta",
      texto: "Como renovo a carta de condução?",
      palavras: [
        "carta", "conducao", "renovar", "revalidar", "imt",
        "expirada", "caducada", "titulo", "conduzir",
      ],
      resposta: {
        passos: [
          "Online, no IMT Online — entras com Chave Móvel Digital ou Cartão de Cidadão.",
          "Precisas de um atestado médico eletrónico: o médico emite-o e ele entra automaticamente no sistema do IMT — não entregas papel.",
          "Presencial, nos Espaços do Cidadão ou balcões IMT, para os casos em que o online não se aplica.",
          "A partir de certas idades a revalidação tem prazos mais curtos — confirma as regras da tua faixa etária na fonte.",
        ],
        fontes: [
          {
            titulo: "Revalidar o título de condução — IMT",
            url: "https://www.imt-ip.pt",
            dominio: "imt-ip.pt",
          },
          {
            titulo: "IMT Online",
            url: "https://servicos.imt-ip.pt",
            dominio: "servicos.imt-ip.pt",
          },
        ],
      },
    },
    {
      id: "imt-iuc",
      texto: "Como pago o IUC (imposto de circulação)?",
      palavras: [
        "iuc", "imposto", "circulacao", "unico", "carro", "veiculo",
        "pagar", "selo", "matricula",
      ],
      resposta: {
        passos: [
          "O IUC paga-se no Portal das Finanças: emites a nota de cobrança na secção do Imposto Único de Circulação.",
          "O prazo termina no fim do mês de aniversário da matrícula do veículo.",
          "Podes pagar por referência multibanco, MB Way ou débito direto, conforme o valor.",
        ],
        fontes: [
          {
            titulo: "IUC — Portal das Finanças",
            url: "https://www.portaldasfinancas.gov.pt",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
      },
    },
    {
      id: "imt-registo-veiculo",
      texto: "Como registo um veículo em meu nome?",
      palavras: [
        "registo", "veiculo", "carro", "comprar", "usado", "dua",
        "documento", "unico", "automvel", "transferir", "propriedade",
      ],
      resposta: {
        passos: [
          "O registo de propriedade faz-se online no Automóvel Online ou presencialmente numa Conservatória de Registo Automóvel (IRN).",
          "Precisas do Documento Único Automóvel (DUA) do veículo e do requerimento de registo assinado pelo vendedor.",
          "Não deixes andar: o registo deve ser pedido no prazo legal após a compra, sob pena de coima.",
        ],
        fontes: [
          {
            titulo: "Registar veículo — ePortugal",
            url: "https://www.gov.pt/servicos/registar-veiculo-automovel-servico-automovel-online",
            dominio: "gov.pt",
          },
          {
            titulo: "Automóvel Online",
            url: "https://www.automovelonline.mj.pt",
            dominio: "automovelonline.mj.pt",
          },
        ],
      },
    },
    {
      id: "imt-pontos",
      texto: "Como consulto os pontos da minha carta de condução?",
      palavras: [
        "pontos", "carta", "conducao", "infracoes", "contraordenacoes",
        "registo", "pontuacao", "ansr", "multas", "retirar",
      ],
      resposta: {
        passos: [
          "Regista-te no Portal de Contraordenações Rodoviárias (ANSR) — com Cartão de Cidadão (leitor) ou Chave Móvel Digital.",
          "Lá vês os pontos da tua carta, os processos de contraordenação e o teu registo de infrações.",
          "A carta por pontos começa com 12 pontos; as infrações graves tiram 3 e as muito graves 5.",
          "Se estiveres registado e os pontos não aparecerem, envia email à ANSR (mail@ansr.pt) com o teu NIF.",
        ],
        fontes: [
          {
            titulo: "Portal de Contraordenações Rodoviárias — ANSR",
            url: "https://portalcontraordenacoes.ansr.pt/",
            dominio: "portalcontraordenacoes.ansr.pt",
          },
          {
            titulo: "Consultar os pontos da carta de condução — gov.pt",
            url: "https://www.gov.pt/servicos/consultar-os-pontos-da-carta-de-conducao",
            dominio: "gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
