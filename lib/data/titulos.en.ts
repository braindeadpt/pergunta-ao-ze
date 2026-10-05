/**
 * Títulos EN das perguntas/temas — curados à mão (não gerados).
 *
 * O ficheiro temas.en.ts é gerado por script e só guarda passos/nota;
 * os títulos das páginas /en/p/ vivem aqui para serem revistos como
 * conteúdo próprio. Entradas com `revisao: true` no temas.en.ts não
 * têm página EN — manter coerente ao adicionar slugs novos.
 */

export const TITULOS_EN: Record<string, string> = {
  "cc-renovar": "How do I renew my Citizen Card?",
  "cc-pin-puk": "I lost the letter with my Citizen Card PIN and PUK. Now what?",
  "cc-morada": "How do I change the address on my Citizen Card?",
  "pep-pedir": "How do I apply for a passport?",
  "pep-menor": "What documents do I need for a child's passport?",
  "pep-agendar": "How do I book an appointment for my passport?",
  "cmd-ativar": "How do I activate the Digital Mobile Key (Chave Móvel Digital)?",
  "cmd-para-que-serve": "What is the Digital Mobile Key (Chave Móvel Digital) for?",
  "irs-entregar": "How do I file my IRS (income tax) return?",
  "irs-reembolso": "How do I check my IRS refund?",
  "ss-niss": "How do I get a NISS (Social Security number)?",
  "ss-direta": "How do I sign up for Segurança Social Direta?",
  "ss-baixa": "How does sick leave (CIT) work?",
  "sns-consulta": "How do I book an appointment in the SNS (health service)?",
  "sns-medico-familia": "How do I choose or change my family doctor?",
  "sns-24": "What is the SNS 24 line for?",
  "imt-renovar-carta": "How do I renew my driving licence?",
  "imt-iuc": "How do I pay the IUC (road tax)?",
  "imt-registo-veiculo": "How do I register a vehicle in my name?",
  "empresa-abrir": "How do I start a company?",
  "empresa-independente": "How do I register as a self-employed worker?",
  "aima-residencia": "How do I apply for a residence permit in Portugal?",
  "irn-nacionalidade": "How do I apply for Portuguese nationality?",
  "cert-online": "How do I request a certificate online?",
  "cert-predial": "How do I get a land registry certificate (certidão predial)?",
  "ep-o-que-e": "What is ePortugal?",
  "ep-agendar": "How do I book an in-person appointment at a public service?",
  "iefp-inscrever": "How do I register with the IEFP (employment centre)?",
  "ss-subsidio-desemprego": "How do I apply for unemployment benefit?",
  "ue-mudar": "I'm moving to another EU country: what do I need to do?",
  "ue-cesd": "What is the European Health Insurance Card (EHIC/CESD)?",
  "pen-pedir": "How do I apply for the old-age pension?",
  "pen-carreira": "How do I check my Social Security contributions?",
  "hab-porta65": "How do I apply for Porta 65 (rental support)?",
  "hab-registar-contrato": "Does my landlord have to register the rental contract with the Tax Authority?",
  "fam-abono": "How do I apply for child benefit (abono de família)?",
  "fam-parental": "How does parental leave work?",
  "jus-multa": "I got a traffic fine: how do I check and pay it?",
  "jus-registo-criminal": "How do I get a criminal record certificate?",
  "ele-onde": "Where do I vote and what documents do I need?",
  "ele-recenseamento": "Do I need to register to vote?",
  "edu-candidatura": "How do I apply to university in Portugal?",
  "edu-bolsa": "How do I apply for a university scholarship?",
  "vis-tipos": "Which visa do I need to live in Portugal?",
  "vis-agendar-aima": "How do I book an appointment with AIMA?",
  "rec-livro": "How do I file a complaint in the online Complaints Book (Livro de Reclamações)?",
  "rec-regulador": "When should I complain to the regulator instead of the Complaints Book?",
  "tra-navegante": "How do I get the Navegante travel pass?",
  "tra-descontos": "What discounts exist on public transport?",
};

/** Título do tema em EN para breadcrumbs e índice (tema.id → título). */
export const TEMAS_TITULO_EN: Record<string, string> = {
  "cartao-de-cidadao": "Citizen Card",
  "passaporte": "Passport",
  "chave-movel-digital": "Digital Mobile Key",
  "irs-financas": "Taxes & Finanças",
  "seguranca-social": "Social Security",
  "sns": "Health (SNS)",
  "carta-conducao-imt": "Driving licence & vehicles",
  "empresa-atividade": "Starting a business",
  "aima-imigracao": "Residence & nationality",
  "certidoes": "Certificates",
  "eportugal-agendamento": "ePortugal & appointments",
  "desemprego-iefp": "Unemployment & jobs",
  "noutro-pais-ue": "Living in another EU country",
  "pensoes-reforma": "Pensions & retirement",
  "habitacao": "Housing",
  "familia": "Family",
  "justica-multas": "Justice & fines",
  "eleicoes-voto": "Elections & voting",
  "educacao": "Higher education",
  "vistos-entrada": "Moving to Portugal",
  "reclamacoes": "Complaints",
  "transportes": "Transport & passes",
};

/** Rótulos EN dos balcões do índice /en/p (mesma ordem de BALCOES_DEF). */
export const BALCOES_ROTULO_EN = [
  "Identity",
  "Money",
  "Work & business",
  "Health & family",
  "Road & home",
  "Borders",
  "Everything-else counter",
];
