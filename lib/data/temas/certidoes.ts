import type { Tema } from "@/lib/types";

const tema: Tema = {
  id: "certidoes",
  titulo: "Certidões",
  entidade: "IRN",
  descricao: "Nascimento, casamento e registo predial online",
  perguntas: [
    {
      id: "cert-online",
      texto: "Como peço uma certidão online?",
      palavras: [
        "certidao", "nascimento", "casamento", "obito", "online",
        "pedir", "civil", "registo", "documento", "narrativa",
      ],
      resposta: {
        passos: [
          "No Civil Online (registos IRN) pedes a certidão permanente de nascimento, casamento ou óbito — o acesso online é gratuito.",
          "Recebes um código de acesso para consultar a certidão durante 6 meses — é esse código que entregas a quem a pede.",
          "A certidão em papel continua disponível nos balcões de registo, paga.",
        ],
        fontes: [
          {
            titulo: "Civil Online — Registos IRN",
            url: "https://www.civilonline.mj.pt/CivilOnline/",
            dominio: "civilonline.mj.pt",
          },
          {
            titulo: "Pedir certidão — IRN",
            url: "https://irn.justica.gov.pt/Servicos/Pedir-certidao",
            dominio: "irn.justica.gov.pt",
          },
        ],
      },
    },
    {
      id: "cert-predial",
      texto: "Como peço a certidão predial de um imóvel?",
      palavras: [
        "predial", "certidao", "imovel", "casa", "terreno",
        "registo", "propriedade", "matriz", "caderneta",
      ],
      resposta: {
        passos: [
          "No Predial Online pedes a certidão permanente de registo predial com o número de descrição ou de matriz do imóvel — fica disponível online por 6 meses.",
          "A certidão predial mostra quem é o proprietário registado e os ónus (hipotecas, penhoras).",
          "Não confundir com a caderneta predial, que é fiscal e se emite no Portal das Finanças.",
        ],
        fontes: [
          {
            titulo: "Predial Online — Registos IRN",
            url: "https://www.predialonline.pt",
            dominio: "predialonline.pt",
          },
        ],
      },
    },
    {
      id: "cert-nascimento",
      texto: "Nasceu um bebé: como faço o registo de nascimento?",
      palavras: [
        "nascimento", "bebe", "registar", "registo", "nascer", "cidadao",
        "maternidade", "recem", "nascido", "crianca", "hospital",
      ],
      resposta: {
        passos: [
          "O mais simples é logo na maternidade: o balcão «Nascer Cidadão» regista o bebé e pede o primeiro Cartão de Cidadão — tudo grátis, antes da mãe ter alta.",
          "Se não houver balcão, pedes online (nascimento.justica.gov.pt, com Chave Móvel Digital) ou em qualquer conservatória do registo civil.",
          "O prazo é de 20 dias após o nascimento. Precisas da declaração da maternidade/hospital e da identificação dos pais.",
          "No registo escolhes o nome (até 2 nomes próprios e 4 apelidos) e a naturalidade do bebé.",
        ],
        nota: "O registo é obrigatório e gratuito — e o primeiro Cartão de Cidadão de criança até 1 ano também é grátis.",
        fontes: [
          {
            titulo: "Nascer Cidadão — justica.gov.pt",
            url: "https://justica.gov.pt/Servicos/Nascer-Cidadao",
            dominio: "justica.gov.pt",
          },
          {
            titulo: "Declaração de nascimento online",
            url: "https://nascimento.justica.gov.pt/nascimento",
            dominio: "nascimento.justica.gov.pt",
          },
        ],
      },
    },
  ],
};

export default tema;
