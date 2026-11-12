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
            titulo: "Revalidar a carta de condução — gov.pt",
            url: "https://www.gov.pt/servicos/revalidar-a-carta-de-conducao",
            dominio: "gov.pt",
          },
          {
            titulo: "Revalidação da carta de condução — IMT",
            url: "https://www.imt-ip.pt/condutores/informacoes-gerais/quero-ser-condutor/revalidacao-da-carta-de-conducao/",
            dominio: "imt-ip.pt",
          },
          {
            titulo: "IMT Online",
            url: "https://servicos.imt-ip.pt",
            dominio: "servicos.imt-ip.pt",
          },
        ],
        verificadoEm: "2026-11-12",
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
            titulo: "Pagar o IUC — gov.pt",
            url: "https://www.gov.pt/servicos/pagar-o-imposto-unico-de-circulacao-iuc-",
            dominio: "gov.pt",
          },
          {
            titulo: "IUC — apoio do Portal das Finanças",
            url: "https://info.portaldasfinancas.gov.pt/pt/apoio_ao_contribuinte/Cidadaos/Veiculos/IUC/Paginas/default.aspx",
            dominio: "portaldasfinancas.gov.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "imt-registo-veiculo",
      texto: "Como registo um veículo em meu nome?",
      palavras: [
        "registo", "veiculo", "carro", "comprar", "usado", "dua",
        "documento", "unico", "automovel", "transferir", "propriedade",
      ],
      resposta: {
        passos: [
          "O registo de propriedade faz-se online no Automóvel Online ou presencialmente numa Conservatória de Registo Automóvel (IRN).",
          "Precisas do Documento Único Automóvel (DUA) do veículo e do requerimento de registo assinado pelo vendedor.",
          "Não deixes andar: o registo deve ser pedido no prazo legal após a compra, sob pena de coima.",
        ],
        fontes: [
          {
            titulo: "Registar veículo — gov.pt",
            url: "https://www.gov.pt/servicos/registar-veiculo-automovel-servico-automovel-online",
            dominio: "gov.pt",
          },
          {
            titulo: "Automóvel Online",
            url: "https://www.automovelonline.mj.pt",
            dominio: "automovelonline.mj.pt",
          },
        ],
        verificadoEm: "2026-11-12",
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
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "imt-inspecao",
      texto: "Quando tenho de levar o carro à inspeção (IPO)?",
      palavras: [
        "inspecao", "ipo", "carro", "veiculo", "automovel", "periodica",
        "centro", "citv", "reinspecao", "aprovado", "reprovado",
      ],
      resposta: {
        passos: [
          "Nos automóveis ligeiros de passageiros, a primeira inspeção faz-se 4 anos após a data da primeira matrícula, depois a cada 2 anos até aos 8 anos, e anualmente a partir dos 8 anos.",
          "Podes levar o carro a qualquer Centro de Inspeção Técnica de Veículos (CITV) até ao dia e mês de aniversário da primeira matrícula, podendo antecipar até 3 meses face a essa data.",
          "Leva o Certificado de Matrícula (DUA) e a ficha da última inspeção; já não é obrigatório afixar o selo no para-brisas, mas tens de guardar a ficha de inspeção.",
          "Se o veículo reprovar, tens 30 dias seguidos para corrigir as deficiências e voltar ao mesmo centro para reinspeção.",
        ],
        nota: "Confirma antes se o veículo tem alguma ação de recolha (recall) ativa do fabricante — um recall por regularizar dá reprovação na inspeção.",
        fontes: [
          {
            titulo: "Levar o carro à inspeção — gov.pt",
            url: "https://www.gov.pt/servicos/levar-o-carro-a-inspecao",
            dominio: "gov.pt",
          },
          {
            titulo: "Tipos e periodicidade de inspeções — IMT",
            url: "https://www.imt-ip.pt/veiculos/inspecao-de-veiculos/tipos-de-inspecoes/",
            dominio: "imt-ip.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
    {
      id: "imt-trocar-carta",
      texto: "Como troco uma carta de condução estrangeira pela portuguesa?",
      palavras: [
        "trocar", "troca", "carta", "conducao", "estrangeira",
        "estrangeiro", "imt", "reconhecimento", "cplp", "ocde",
        "brasil", "reino", "unido", "europeia",
      ],
      resposta: {
        passos: [
          "Se a carta foi emitida num país da UE/EEE, podes conduzir em Portugal até ao fim da validade; se for da CPLP ou OCDE (como Brasil, Angola, Cabo Verde, Reino Unido ou Suíça), também estás dispensado da troca até aos 60 anos se cumprires os requisitos legais.",
          "Para cartas de países com acordo bilateral, tens 2 anos após fixar residência em Portugal para pedir a troca sem exame; para países não aderentes às convenções internacionais, tens de pedir a troca de imediato e fazer prova prática.",
          "O pedido faz-se no IMT Online: precisas de residência legal em Portugal, NIF, atestado médico eletrónico (enviado pelo médico ao IMT) e da carta original válida.",
          "Fora da UE/EEE é ainda exigida declaração de autenticidade emitida pela autoridade do país de origem (e tradução certificada se não estiver em português, inglês, francês ou espanhol).",
        ],
        fontes: [
          {
            titulo: "Trocar carta de condução estrangeira por portuguesa — gov.pt",
            url: "https://www.gov.pt/servicos/trocar-carta-de-conducao-estrangeira-por-portuguesa",
            dominio: "gov.pt",
          },
          {
            titulo: "Troca de título de condução estrangeiro — IMT",
            url: "https://www.imt-ip.pt/condutores/reconhecimento/troca-de-titulo-de-conducao-estrangeiro/",
            dominio: "imt-ip.pt",
          },
        ],
        verificadoEm: "2026-11-12",
      },
    },
  ],
};

export default tema;
