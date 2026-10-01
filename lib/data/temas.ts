import type { Tema } from "@/lib/types";

export const TEMAS: Tema[] = [
  {
    id: "cartao-de-cidadao",
    titulo: "Cartão de Cidadão",
    entidade: "IRN",
    descricao: "Renovação, códigos PIN/PUK e mudança de morada",
    perguntas: [
      {
        id: "cc-renovar",
        texto: "Como renovo o Cartão de Cidadão?",
        palavras: [
          "cartao", "cidadao", "cc", "renovar", "renovacao", "expirado",
          "caducado", "validade", "novo", "identificacao", "documento",
        ],
        resposta: {
          passos: [
            "Online, no ePortugal — se tens 25 anos ou mais, a Chave Móvel Digital ou leitor de cartão, e não precisas de alterar dados nem foto.",
            "Presencial — agenda no Siga (siga.gov.pt ou app SigaApp) e vai a um Espaço de Registos, Loja do Cidadão ou consulado.",
            "Leva o Cartão de Cidadão atual. No atendimento presencial tiram a foto e recolhem a assinatura na hora.",
            "O preço depende do prazo e do local; a renovação online é mais barata. Confirma o valor atual na fonte.",
          ],
          nota: "Podes renovar antes de caducar — não precisas de esperar que expire.",
          fontes: [
            {
              titulo: "Renovar o Cartão de Cidadão",
              url: "https://eportugal.gov.pt/servicos/renovar-o-cartao-de-cidadao",
              dominio: "eportugal.gov.pt",
            },
            {
              titulo: "Instituto dos Registos e do Notariado",
              url: "https://irn.justica.gov.pt",
              dominio: "irn.justica.gov.pt",
            },
          ],
        },
      },
      {
        id: "cc-pin-puk",
        texto: "Perdi a carta com o PIN e o PUK do Cartão de Cidadão. E agora?",
        palavras: [
          "pin", "puk", "codigo", "codigos", "carta", "perdi", "perdida",
          "recuperar", "cartao", "cidadao", "assinatura", "autenticacao",
        ],
        resposta: {
          passos: [
            "Os códigos PIN, PUK e de cancelamento vêm na carta de código que recebeste com o Cartão de Cidadão.",
            "Se perdeste a carta, pede uma segunda via presencialmente num balcão do IRN, Espaço de Registos ou Loja do Cidadão — não é possível recuperar os códigos online.",
            "Sem o PIN de autenticação não consegues usar o leitor de cartão para entrar em serviços — mas podes usar a Chave Móvel Digital em alternativa.",
          ],
          fontes: [
            {
              titulo: "Cartão de Cidadão — Autenticação.gov.pt",
              url: "https://www.autenticacao.gov.pt/o-cartao-de-cidadao",
              dominio: "autenticacao.gov.pt",
            },
          ],
        },
      },
      {
        id: "cc-morada",
        texto: "Como mudo a morada no Cartão de Cidadão?",
        palavras: [
          "morada", "mudar", "alterar", "residencia", "domicilio",
          "cartao", "cidadao", "mudanca", "casa", "freguesia",
        ],
        resposta: {
          passos: [
            "Online, no ePortugal — com Chave Móvel Digital ou leitor de cartão e o PIN de morada.",
            "Recebes em casa uma carta com um código de confirmação, que introduces no ePortugal para concluir a alteração.",
            "Presencial — na Junta de Freguesia, num balcão do IRN ou numa Loja do Cidadão.",
            "A morada do Cartão de Cidadão é a tua morada fiscal: ao mudá-la, atualizas automaticamente a morada junto das Finanças.",
          ],
          fontes: [
            {
              titulo: "Alterar a morada do Cartão de Cidadão",
              url: "https://eportugal.gov.pt/servicos/alterar-a-morada-do-cartao-de-cidadao",
              dominio: "eportugal.gov.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "passaporte",
    titulo: "Passaporte",
    entidade: "IRN",
    descricao: "Pedido, renovação, documentos e agendamento",
    perguntas: [
      {
        id: "pep-pedir",
        texto: "Como peço o passaporte?",
        palavras: [
          "passaporte", "pep", "pedir", "tirar", "fazer", "viagem",
          "viajar", "estrangeiro", "documento",
        ],
        resposta: {
          passos: [
            "O passaporte pede-se presencialmente — num balcão do IRN, Loja do Cidadão ou consulado português no estrangeiro.",
            "Leva o Cartão de Cidadão válido. Não precisas de trazer fotografia: é captada no atendimento.",
            "A renovação do Passaporte Eletrónico Português pode ser pedida online, em alguns casos, através do portal do IRN.",
            "O preço depende da urgência e do local do pedido; em território nacional começa nos valores normais de tabela — confirma na fonte.",
          ],
          nota: "O passaporte comum tem validade de 5 anos.",
          fontes: [
            {
              titulo: "Pedir ou renovar o passaporte — gov.pt",
              url: "https://www.gov.pt/servicos/pedir-o-passaporte-eletronico-portugues",
              dominio: "gov.pt",
            },
            {
              titulo: "Passaporte eletrónico — Justiça.gov.pt",
              url: "https://justica.gov.pt/Registos/Identificacao/Passaporte-eletronico",
              dominio: "justica.gov.pt",
            },
          ],
        },
      },
      {
        id: "pep-menor",
        texto: "Que documentos preciso para o passaporte de um menor?",
        palavras: [
          "passaporte", "menor", "crianca", "filho", "documentos",
          "autorizacao", "pais", "responsabilidade",
        ],
        resposta: {
          passos: [
            "O menor tem de estar presente no atendimento, com o próprio Cartão de Cidadão (se o tiver).",
            "É necessária a presença e autorização dos titulares das responsabilidades parentais — regra geral, os dois pais.",
            "Se só um dos pais puder comparecer, leva autorização escrita do outro, com assinatura reconhecida, ou agendada no próprio balcão.",
            "Confirma os requisitos exatos para a tua situação na página do passaporte do IRN antes de ir.",
          ],
          fontes: [
            {
              titulo: "Passaporte eletrónico — Justiça.gov.pt",
              url: "https://justica.gov.pt/Registos/Identificacao/Passaporte-eletronico",
              dominio: "justica.gov.pt",
            },
          ],
        },
      },
      {
        id: "pep-agendar",
        texto: "Como marco atendimento para tratar do passaporte?",
        palavras: [
          "agendar", "marcar", "marcacao", "agendamento", "atendimento",
          "siga", "senha", "balcao", "loja", "cidadao", "passaporte",
        ],
        resposta: {
          passos: [
            "Agenda no portal Siga (siga.marcacaodeatendimento.pt) ou na app SigaApp: escolhes a entidade, o serviço, o local, o dia e a hora.",
            "Também podes tirar uma senha digital para o próprio dia — sujeita à lotação do balcão.",
            "No estrangeiro, o agendamento é feito no portal dos serviços consulares ou diretamente no consulado.",
          ],
          fontes: [
            {
              titulo: "Siga — agendamento de atendimento",
              url: "https://siga.marcacaodeatendimento.pt",
              dominio: "siga.marcacaodeatendimento.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "chave-movel-digital",
    titulo: "Chave Móvel Digital",
    entidade: "AMA",
    descricao: "Ativação e utilização para entrar nos serviços",
    perguntas: [
      {
        id: "cmd-ativar",
        texto: "Como ativo a Chave Móvel Digital?",
        palavras: [
          "chave", "movel", "digital", "cmd", "ativar", "ativaçao",
          "autenticacao", "login", "senha", "telemovel", "sms",
        ],
        resposta: {
          passos: [
            "Online, em autenticacao.gov.pt — com leitor de cartão e o PIN de autenticação do Cartão de Cidadão, ou por videochamada de ativação.",
            "Presencial — num balcão de atendimento aderente (Espaços do Cidadão, Lojas de Cidadão), só com o telemóvel e o Cartão de Cidadão.",
            "Depois de ativada, escolhes um PIN de 4 dígitos e passas a entrar nos serviços públicos com número de telemóvel + PIN + código enviado por SMS.",
            "É gratuita e funciona na Segurança Social Direta, Portal das Finanças, SNS, ePortugal e dezenas de outros serviços.",
          ],
          fontes: [
            {
              titulo: "Chave Móvel Digital — Autenticação.gov.pt",
              url: "https://www.autenticacao.gov.pt/chave-movel-digital",
              dominio: "autenticacao.gov.pt",
            },
          ],
        },
      },
      {
        id: "cmd-para-que-serve",
        texto: "Para que serve a Chave Móvel Digital?",
        palavras: [
          "chave", "movel", "digital", "cmd", "serve", "usar", "entrar",
          "servicos", "autenticar", "assinar",
        ],
        resposta: {
          passos: [
            "Serve para te autenticares nos portais do Estado — Finanças, Segurança Social Direta, SNS 24, ePortugal e muitos outros — só com o telemóvel.",
            "Permite também assinar documentos eletrónicos com valor legal, sem leitor de cartão.",
            "É a forma mais simples de aceder aos serviços se perdeste os códigos PIN do Cartão de Cidadão.",
          ],
          fontes: [
            {
              titulo: "Chave Móvel Digital — Autenticação.gov.pt",
              url: "https://www.autenticacao.gov.pt/chave-movel-digital",
              dominio: "autenticacao.gov.pt",
            },
          ],
        },
      },
    ],
  },
  {
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
              titulo: "Entregar a declaração de IRS — ePortugal",
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
              titulo: "Pedir o NIF — ePortugal",
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
    ],
  },
  {
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
  },
  {
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
    ],
  },
  {
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
    ],
  },
  {
    id: "empresa-atividade",
    titulo: "Abrir empresa ou atividade",
    entidade: "IRN · Balcão do Empreendedor",
    descricao: "Empresa na Hora e início de atividade independente",
    perguntas: [
      {
        id: "empresa-abrir",
        texto: "Como abro uma empresa?",
        palavras: [
          "empresa", "abrir", "criar", "sociedade", "negocio",
          "constituir", "empresario", "unipessoal", "limitada", "lda",
        ],
        resposta: {
          passos: [
            "Empresa na Hora — constituis a sociedade num só balcão (ou online, no Balcão do Empreendedor), com firmas pré-aprovadas.",
            "Escolhe a forma jurídica (unipessoal, por quotas, anónima), o nome — com certificado de admissibilidade se não usares um nome pré-aprovado — e os sócios.",
            "Depois da constituição, a inscrição na Segurança Social e as declarações fiscais seguem os prazos próprios — a AT e a SS são notificadas, mas confirma as obrigações seguintes.",
            "Alternativa mais simples: atividade em nome individual (trabalhador independente), que se abre diretamente no Portal das Finanças.",
          ],
          fontes: [
            {
              titulo: "Empresa na Hora — ePortugal",
              url: "https://eportugal.gov.pt/servicos/criar-uma-empresa-na-hora",
              dominio: "eportugal.gov.pt",
            },
            {
              titulo: "Balcão do Empreendedor — gov.pt",
              url: "https://www.gov.pt/guias/servicos-para-a-atividade-economica",
              dominio: "gov.pt",
            },
          ],
        },
      },
      {
        id: "empresa-independente",
        texto: "Como abro atividade como trabalhador independente?",
        palavras: [
          "atividade", "independente", "abrir", "recibos", "verdes",
          "freelance", "trabalhador", "prestacao", "servicos", "cae",
        ],
        resposta: {
          passos: [
            "No Portal das Finanças: 'Todos os Serviços' → 'Atividade' → 'Entregar Declaração' de início de atividade.",
            "Escolhes o código de atividade (CAE/CIRS), o regime de IVA e a contabilidade — o regime simplificado é o mais comum para começar.",
            "A partir daí passas recibos verdes no Portal das Finanças e fazes as declarações periódicas.",
            "Se for a primeira atividade, podes ter isenção de contribuições à Segurança Social nos primeiros 12 meses — confirma as condições.",
          ],
          fontes: [
            {
              titulo: "Abrir atividade independente — Portal das Finanças",
              url: "https://www.portaldasfinancas.gov.pt",
              dominio: "portaldasfinancas.gov.pt",
            },
            {
              titulo: "Trabalhador independente — ePortugal",
              url: "https://eportugal.gov.pt",
              dominio: "eportugal.gov.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "aima-imigracao",
    titulo: "Residência e nacionalidade",
    entidade: "AIMA · IRN",
    descricao: "Autorização de residência e nacionalidade portuguesa",
    perguntas: [
      {
        id: "aima-residencia",
        texto: "Como peço autorização de residência em Portugal?",
        palavras: [
          "residencia", "autorizacao", "aima", "visto", "imigracao",
          "estrangeiro", "titulo", "permanencia", "sef", "trabalhar",
        ],
        resposta: {
          passos: [
            "As autorizações de residência passaram para a AIMA (Agência para a Integração, Migrações e Asilo), que substituiu o SEF nestas funções.",
            "O tipo de autorização depende da situação — trabalho, estudo, reagrupamento familiar, procura de emprego — e o pedido faz-se no portal da AIMA ou por agendamento.",
            "Reúne antes os documentos típicos: passaporte válido, comprovativo de meios de subsistência, alojamento e registo criminal.",
            "Os prazos e a fila de agendamentos variam muito: acompanha o estado do processo na área pessoal da AIMA.",
          ],
          fontes: [
            {
              titulo: "AIMA — Agência para a Integração, Migrações e Asilo",
              url: "https://aima.gov.pt",
              dominio: "aima.gov.pt",
            },
          ],
        },
      },
      {
        id: "irn-nacionalidade",
        texto: "Como peço a nacionalidade portuguesa?",
        palavras: [
          "nacionalidade", "portuguesa", "cidadania", "naturalizacao",
          "irn", "pedir", "passaporte", "portugues",
        ],
        resposta: {
          passos: [
            "O pedido faz-se ao IRN — presencialmente nos balcões de nacionalidade e Lojas de Cidadão, ou por correio; advogados e solicitadores podem submeter online.",
            "Os requisitos dependem da via: residência legal em Portugal durante o tempo exigido por lei, casamento ou união com cidadão português, ascendência, entre outras.",
            "Para a via da residência, é normalmente preciso provar conhecimento de língua portuguesa e a ligação efetiva à comunidade.",
            "Acompanha o processo com o número que te é atribuído — os prazos de decisão podem ser longos.",
          ],
          fontes: [
            {
              titulo: "Nacionalidade portuguesa — IRN",
              url: "https://irn.justica.gov.pt",
              dominio: "irn.justica.gov.pt",
            },
            {
              titulo: "Nacionalidade — ePortugal",
              url: "https://eportugal.gov.pt",
              dominio: "eportugal.gov.pt",
            },
          ],
        },
      },
    ],
  },
  {
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
    ],
  },
  {
    id: "eportugal-agendamento",
    titulo: "ePortugal e atendimento",
    entidade: "AMA",
    descricao: "Portal dos serviços e marcação de atendimento",
    perguntas: [
      {
        id: "ep-o-que-e",
        texto: "O que é o ePortugal?",
        palavras: [
          "eportugal", "portal", "servicos", "publicos", "estado",
          "site", "governo", "digital",
        ],
        resposta: {
          passos: [
            "É o portal único dos serviços públicos portugueses: reúne e explica centenas de serviços — documentos, impostos, saúde, trabalho, empresa.",
            "Muitos serviços começam e acabam ali; outros encaminham para o portal da entidade responsável.",
            "Para usar os serviços online convém teres a Chave Móvel Digital ou o Cartão de Cidadão com leitor.",
          ],
          fontes: [
            {
              titulo: "ePortugal — Portal dos Serviços Públicos",
              url: "https://eportugal.gov.pt",
              dominio: "eportugal.gov.pt",
            },
          ],
        },
      },
      {
        id: "ep-agendar",
        texto: "Como marco atendimento presencial num serviço público?",
        palavras: [
          "agendar", "atendimento", "marcar", "senha", "siga",
          "loja", "cidadao", "balcao", "presencial",
        ],
        resposta: {
          passos: [
            "No siga.gov.pt ou na app SigaApp agendes atendimento para a maioria dos serviços do Estado — IRN, Finanças, IMT, Segurança Social e outros.",
            "Escolhes entidade, serviço, local, dia e hora; recebes a confirmação e a senha digital.",
            "Há serviços com agendamento próprio (consulados, AIMA, centros de saúde) — nesses casos usa o portal da entidade.",
          ],
          fontes: [
            {
              titulo: "Siga — Agendamento de atendimento",
              url: "https://siga.marcacaodeatendimento.pt",
              dominio: "siga.marcacaodeatendimento.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "desemprego-iefp",
    titulo: "Desemprego e emprego",
    entidade: "IEFP · Segurança Social",
    descricao: "Inscrição no IEFP e subsídio de desemprego",
    perguntas: [
      {
        id: "iefp-inscrever",
        texto: "Como me inscrevo no IEFP?",
        palavras: [
          "iefp", "inscrever", "desemprego", "desempregado", "emprego",
          "inscricao", "centro", "procura", "trabalho",
        ],
        resposta: {
          passos: [
            "Online, no iefponline — fazes a pré-inscrição e recebes a convocatória para concluir no centro de emprego.",
            "Presencial — no centro de emprego da tua área, com documento de identificação e comprovativos da situação.",
            "Se ficaste sem trabalho, inscreve-te logo: a data de inscrição conta para o subsídio de desemprego.",
          ],
          fontes: [
            {
              titulo: "IEFP — Inscrição para emprego",
              url: "https://www.iefp.pt",
              dominio: "iefp.pt",
            },
          ],
        },
      },
      {
        id: "ss-subsidio-desemprego",
        texto: "Como peço o subsídio de desemprego?",
        palavras: [
          "subsidio", "desemprego", "pedir", "requerimento", "fundo",
          "sem", "trabalho", "despedido", "seguranca", "social",
        ],
        resposta: {
          passos: [
            "Primeiro inscreve-te no IEFP como candidato a emprego — é condição para o subsídio.",
            "Depois entregas o requerimento do subsídio de desemprego na Segurança Social Direta, dentro do prazo após o fim do contrato.",
            "Precisas de ter descontado o período mínimo exigido e de declaração da entidade empregadora que prove o desemprego involuntário (RP5044).",
          ],
          fontes: [
            {
              titulo: "Subsídio de desemprego — Segurança Social",
              url: "https://www.seg-social.pt/desemprego1",
              dominio: "seg-social.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "noutro-pais-ue",
    titulo: "Viver noutro país da UE",
    entidade: "ePortugal · UE",
    descricao: "Residência, trabalho e saúde no espaço europeu",
    perguntas: [
      {
        id: "ue-mudar",
        texto: "Vou viver para outro país da UE: o que tenho de fazer?",
        palavras: [
          "ue", "uniao", "europeia", "mudar", "viver", "trabalhar",
          "pais", "estrangeiro", "emigrar", "residencia", "europa",
        ],
        resposta: {
          passos: [
            "Regista-te como residente no país de destino — em regra, passados 3 meses tens de pedir o certificado de registo local.",
            "Atualiza a morada fiscal: se deixares de ser residente fiscal em Portugal, trata da alteração no Portal das Finanças.",
            "Vê se a tua carta de condução portuguesa precisa de ser trocada e como fica a tua situação na Segurança Social — as regras de coordenação são europeias.",
            "Para trabalho destacado por empresa portuguesa, pode ser preciso o documento A1.",
          ],
          fontes: [
            {
              titulo: "Viver, trabalhar e viajar na UE — ePortugal",
              url: "https://eportugal.gov.pt",
              dominio: "eportugal.gov.pt",
            },
            {
              titulo: "Os teus direitos na UE — europa.eu",
              url: "https://europa.eu/youreurope/",
              dominio: "europa.eu",
            },
          ],
        },
      },
      {
        id: "ue-cesd",
        texto: "O que é o Cartão Europeu de Seguro de Doença?",
        palavras: [
          "cesd", "cartao", "europeu", "seguro", "doenca", "viagem",
          "saude", "estrangeiro", "ferias",
        ],
        resposta: {
          passos: [
            "O CESD garante acesso a cuidados de saúde durante estadas temporárias noutro país da UE (e mais alguns), nas mesmas condições dos residentes.",
            "Pede-se gratuitamente na Segurança Social Direta ou num balcão da Segurança Social, antes de viajar.",
            "Não substitui o seguro de viagem: cobre saúde pública de urgência, não repatriamento nem privados.",
          ],
          fontes: [
            {
              titulo: "Cartão Europeu de Seguro de Doença — Segurança Social",
              url: "https://www.seg-social.pt",
              dominio: "seg-social.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "pensoes-reforma",
    titulo: "Pensões e reforma",
    entidade: "Segurança Social",
    descricao: "Pedir a pensão e consultar a carreira contributiva",
    perguntas: [
      {
        id: "pen-pedir",
        texto: "Como peço a pensão de velhice?",
        palavras: [
          "pensao", "velhice", "reforma", "reformar", "aposentacao",
          "pedir", "idade", "seguranca", "social", "jubilacao",
        ],
        resposta: {
          passos: [
            "O pedido faz-se na Segurança Social Direta — em 'Pensões' → 'Pensão de velhice' — ou presencialmente num balcão da Segurança Social com agendamento.",
            "Podes pedir antes de atingir a idade legal: a pensão começa a contar da data que escolheres dentro das regras.",
            "Antes de pedir, confirma os teus anos de descontos na carreira contributiva — afetam o valor e a elegibilidade.",
            "A idade legal da reforma muda consoante o ano e a esperança média de vida — confirma o valor atual na fonte.",
          ],
          fontes: [
            {
              titulo: "Pensão de velhice — Segurança Social",
              url: "https://www.seg-social.pt/pensao-de-velhice",
              dominio: "seg-social.pt",
            },
          ],
        },
      },
      {
        id: "pen-carreira",
        texto: "Como consulto os meus descontos para a Segurança Social?",
        palavras: [
          "descontos", "carreira", "contributiva", "remuneracoes",
          "declaracoes", "seguranca", "social", "anos", "trabalho",
          "contribuicoes",
        ],
        resposta: {
          passos: [
            "Na Segurança Social Direta, em 'Emprego' → 'Remunerações', vês todos os salários declarados pelos empregadores ao longo da carreira.",
            "Se faltarem meses ou anos, podes pedir a regularização à Segurança Social — guarda recibos e contratos antigos como prova.",
            "O simulador de pensões no mesmo portal estima o valor da tua pensão futura.",
          ],
          fontes: [
            {
              titulo: "Segurança Social Direta — Remunerações",
              url: "https://www.seg-social.pt",
              dominio: "seg-social.pt",
            },
          ],
        },
      },
    ],
  },
  {
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
    ],
  },
  {
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
  },
  {
    id: "justica-multas",
    titulo: "Justiça e multas",
    entidade: "ANSR · Justiça",
    descricao: "Multas de trânsito e certificado de registo criminal",
    perguntas: [
      {
        id: "jus-multa",
        texto: "Recebi uma multa de trânsito: como consulto e pago?",
        palavras: [
          "multa", "transito", "ansr", "contraordenacao", "pagar",
          "coima", "radar", "velocidade", "estacionamento", "auto",
        ],
        resposta: {
          passos: [
            "As contraordenações rodoviárias são geridas pela ANSR — podes consultar o processo e pagar online com os dados da notificação.",
            "Se ainda não recebeste a notificação em casa, no portal da ANSR consegues verificar multas associadas ao teu veículo ou carta.",
            "Tens prazos para pagar voluntariamente (mais barato) ou para apresentar defesa — não deixes passar o prazo.",
          ],
          fontes: [
            {
              titulo: "Contraordenações — ANSR",
              url: "https://www.ansr.pt",
              dominio: "ansr.pt",
            },
          ],
        },
      },
      {
        id: "jus-registo-criminal",
        texto: "Como peço o certificado do registo criminal?",
        palavras: [
          "registo", "criminal", "certificado", "cadastro", "pedir",
          "online", "emprego", "justica", "penal",
        ],
        resposta: {
          passos: [
            "Online, no portal Registo Criminal Online da Justiça — autenticas-te com Chave Móvel Digital ou Cartão de Cidadão e recebes um código de acesso ao certificado.",
            "Presencial, nos balcões de registo criminal das Lojas de Cidadão, Espaços de Registos ou tribunais.",
            "Também podes autorizar um terceiro (ex.: empregador) a consultar o teu registo online por tempo limitado.",
          ],
          fontes: [
            {
              titulo: "Registo Criminal Online",
              url: "https://registocriminal.justica.gov.pt",
              dominio: "registocriminal.justica.gov.pt",
            },
            {
              titulo: "Certificado do registo criminal — ePortugal",
              url: "https://eportugal.gov.pt",
              dominio: "eportugal.gov.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "eleicoes-voto",
    titulo: "Eleições e voto",
    entidade: "SG MAI",
    descricao: "Recenseamento e onde votar",
    perguntas: [
      {
        id: "ele-onde",
        texto: "Onde voto e que documentos preciso?",
        palavras: [
          "votar", "voto", "eleicoes", "mesa", "assembleia", "onde",
          "eleitor", "urna", "eleicao",
        ],
        resposta: {
          passos: [
            "Votas na mesa de voto da freguesia onde estás recenseado — descobre qual é no Portal do Eleitor ou por SMS (serviço anunciado em cada eleição).",
            "Leva um documento de identificação com foto — o Cartão de Cidadão chega; não precisas de cartão de eleitor.",
            "Se estiveres fora da tua área no dia, há modalidades como voto antecipado — anunciadas em cada eleição.",
          ],
          fontes: [
            {
              titulo: "Portal do Eleitor — SG MAI",
              url: "https://www.sg.mai.gov.pt",
              dominio: "sg.mai.gov.pt",
            },
          ],
        },
      },
      {
        id: "ele-recenseamento",
        texto: "Preciso de me recensear para votar?",
        palavras: [
          "recenseamento", "eleitoral", "inscrever", "votar",
          "eleitor", "cartao", "inscricao",
        ],
        resposta: {
          passos: [
            "Para cidadãos portugueses residentes em Portugal o recenseamento é automático: tens de ter a morada do Cartão de Cidadão atualizada.",
            "Se a morada do CC estiver errada, votas na freguesia da morada registada — atualiza-a antes da eleição.",
            "Residentes no estrangeiro e cidadãos estrangeiros com direito de voto têm regras próprias — vê a tua situação na fonte.",
          ],
          fontes: [
            {
              titulo: "Recenseamento eleitoral — SG MAI",
              url: "https://www.sg.mai.gov.pt",
              dominio: "sg.mai.gov.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "educacao",
    titulo: "Ensino superior",
    entidade: "DGES",
    descricao: "Candidatura ao superior e bolsas de estudo",
    perguntas: [
      {
        id: "edu-candidatura",
        texto: "Como me candidato ao ensino superior?",
        palavras: [
          "candidatura", "ensino", "superior", "universidade",
          "faculdade", "concurso", "nacional", "acesso", "dges",
          "inscricao",
        ],
        resposta: {
          passos: [
            "A candidatura nacional ao ensino superior público faz-se online no portal da DGES, em fases ao longo do verão.",
            "Precisas de exames nacionais válidos como provas de ingresso — cada curso exige provas específicas e médias mínimas.",
            "Os resultados saem por fases; se entrares, a matrícula faz-se no prazo indicado na própria plataforma.",
          ],
          fontes: [
            {
              titulo: "Candidatura ao ensino superior — DGES",
              url: "https://www.dges.gov.pt",
              dominio: "dges.gov.pt",
            },
          ],
        },
      },
      {
        id: "edu-bolsa",
        texto: "Como peço bolsa de estudo para o superior?",
        palavras: [
          "bolsa", "estudo", "acao", "social", "escolar",
          "universidade", "propina", "apoio", "dges", "estudante",
        ],
        resposta: {
          passos: [
            "A bolsa de ação social pede-se online no portal da DGES, normalmente no início do ano letivo — há prazos que não convem falhar.",
            "O valor depende dos rendimentos do agregado familiar e do curso; a análise é feita pelos serviços de ação social da instituição.",
            "Tens de estar matriculado e inscrito num estabelecimento de ensino superior para receber.",
          ],
          fontes: [
            {
              titulo: "Bolsas de estudo — DGES",
              url: "https://www.dges.gov.pt",
              dominio: "dges.gov.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "vistos-entrada",
    titulo: "Vir viver para Portugal",
    entidade: "MNE · AIMA",
    descricao: "Vistos de trabalho, estudo e residência",
    perguntas: [
      {
        id: "vis-tipos",
        texto: "Que visto preciso para vir viver para Portugal?",
        palavras: [
          "visto", "visa", "portugal", "mudar", "viver", "trabalhar",
          "estudar", "d7", "nomada", "digital", "imigrar",
        ],
        resposta: {
          passos: [
            "Depende do motivo: há vistos de trabalho, estudo, procura de emprego, rendimentos próprios (D7), nómada digital, reagrupamento familiar, entre outros.",
            "Os vistos de residência pedem-se no consulado português do país onde vives, através do portal de vistos do MNE.",
            "Cidadãos da UE não precisam de visto — só de se registar como residentes passados 3 meses.",
            "Depois de entrar com visto, a autorização de residência é tratada na AIMA.",
          ],
          fontes: [
            {
              titulo: "Portal de Vistos — MNE",
              url: "https://vistos.mne.gov.pt",
              dominio: "vistos.mne.gov.pt",
            },
            {
              titulo: "AIMA",
              url: "https://aima.gov.pt",
              dominio: "aima.gov.pt",
            },
          ],
        },
      },
      {
        id: "vis-agendar-aima",
        texto: "Como marco atendimento na AIMA?",
        palavras: [
          "aima", "agendar", "marcar", "atendimento", "balcao",
          "residencia", "renovar", "titulo", "sef",
        ],
        resposta: {
          passos: [
            "Os agendamentos e renovações fazem-se pelos canais digitais da AIMA — portal e estrutura de missão — com vagas libertadas por períodos.",
            "Se tens um processo em curso herdado do SEF, acompanha-o na área reservada da AIMA; muitos processos transitaram automaticamente.",
            "As vagas esgotam rápido e os prazos variam — consulta regularmente o portal e os avisos oficiais.",
          ],
          fontes: [
            {
              titulo: "AIMA — Agência para a Integração, Migrações e Asilo",
              url: "https://aima.gov.pt",
              dominio: "aima.gov.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "reclamacoes",
    titulo: "Reclamações",
    entidade: "DGE · reguladores",
    descricao: "Livro de Reclamações online e queixas a entidades",
    perguntas: [
      {
        id: "rec-livro",
        texto: "Como faço uma reclamação no Livro de Reclamações online?",
        palavras: [
          "livro", "reclamacoes", "reclamacao", "queixa", "online",
          "eletronico", "consumidor", "servico", "empresa",
        ],
        resposta: {
          passos: [
            "Entra em livroreclamacoes.pt, regista-te como consumidor e escreve a reclamação contra a entidade — tem o mesmo valor que o livro físico.",
            "A entidade é obrigada a responder dentro do prazo legal e a queixa chega ao regulador do setor.",
            "Guarda o comprovativo de submissão — é a tua prova.",
          ],
          fontes: [
            {
              titulo: "Livro de Reclamações Eletrónico",
              url: "https://www.livroreclamacoes.pt",
              dominio: "livroreclamacoes.pt",
            },
          ],
        },
      },
      {
        id: "rec-regulador",
        texto: "Quando devo queixar-me ao regulador em vez do livro?",
        palavras: [
          "regulador", "queixa", "anacom", "erse", "banco",
          "portugal", "provedor", "justica", "telecom", "energia",
        ],
        resposta: {
          passos: [
            "O Livro de Reclamações cobre a maioria dos serviços, mas setores regulados (telecomunicações, energia, banca, transportes) têm entidades próprias que tratam conflitos.",
            "Exemplos: ANACOM para telecomunicações, ERSE para energia, Banco de Portugal para bancos — reclamar diretamente ao regulador costuma ser mais eficaz.",
            "Para conflitos de consumo até certo valor, os centros de arbitragem resolvem sem tribunal.",
          ],
          fontes: [
            {
              titulo: "Reclamações — ePortugal",
              url: "https://eportugal.gov.pt",
              dominio: "eportugal.gov.pt",
            },
          ],
        },
      },
    ],
  },
  {
    id: "transportes",
    titulo: "Transportes e passes",
    entidade: "Navegante · CP",
    descricao: "Passe Navegante e descontos nos transportes",
    perguntas: [
      {
        id: "tra-navegante",
        texto: "Como peço o passe Navegante?",
        palavras: [
          "passe", "navegante", "transportes", "metro", "autocarro",
          "comboio", "viva", "cartao", "mensal",
        ],
        resposta: {
          passos: [
            "O cartão Navegante (para a área metropolitana de Lisboa) pede-se online no portal Navegante ou nos espaços dedicados, com foto e documento de identificação.",
            "Depois de ter o cartão, carregas o passe mensal nas máquinas do Metro, estações ou app.",
            "Noutras regiões há cartões equivalentes — o processo é parecido junto do operador local.",
          ],
          fontes: [
            {
              titulo: "Portal Navegante",
              url: "https://www.navegante.pt",
              dominio: "navegante.pt",
            },
          ],
        },
      },
      {
        id: "tra-descontos",
        texto: "Que descontos existem nos transportes públicos?",
        palavras: [
          "desconto", "passe", "social", "estudante", "jovem",
          "idoso", "65", "transportes", "gratuito", "escola",
        ],
        resposta: {
          passos: [
            "Há passes sociais para agregados com rendimentos mais baixos, passes para estudantes, e condições especiais para maiores de 65 e menores — variam por região e operador.",
            "O passe social pede-se com comprovativo de rendimentos, normalmente junto do operador ou portal da rede de transportes da região.",
            "Consulta a página do operador da tua zona (Navegante em Lisboa, Andante no Porto, CP para comboios) para os descontos em vigor.",
          ],
          fontes: [
            {
              titulo: "CP — Comboios de Portugal",
              url: "https://www.cp.pt",
              dominio: "cp.pt",
            },
            {
              titulo: "Portal Navegante",
              url: "https://www.navegante.pt",
              dominio: "navegante.pt",
            },
          ],
        },
      },
    ],
  },
];

export function findPergunta(id: string) {
  for (const tema of TEMAS) {
    const p = tema.perguntas.find((x) => x.id === id);
    if (p) return { pergunta: p, tema };
  }
  return undefined;
}
