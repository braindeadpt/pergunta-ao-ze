import { TEMAS } from "./data/temas.ts";
import { TEMAS_EN } from "./data/temas.en.ts";
import { TITULOS_EN, TEMAS_TITULO_EN } from "./data/titulos.en.ts";
import { normalizarRespostaEn } from "./glossario-en.ts";
import type { Fonte, Pergunta, Tema } from "./types";
import type { Lang } from "./i18n";

export interface Sugestao {
  id: string;
  texto: string;
  tema: string;
}

export interface ResultadoResposta {
  tipo: "resposta" | "sugestoes";
  pergunta?: Pergunta;
  tema?: Tema;
  sugestoes: Sugestao[];
  via?: "keyword" | "llm";
  /** Resposta LLM gerada com contexto parcial — mostrar ao utilizador. */
  disclaimer?: string;
  /** Resposta genérica de IA sem contexto curado — fora do âmbito verificado. */
  foraAmbito?: boolean;
  /** Língua efetiva da resposta devolvida */
  idioma?: Lang;
  /** Pedida EN mas a tradução não existe/está por rever — a resposta é PT */
  soEmPt?: boolean;
}

/**
 * Interface do motor de respostas.
 * - KeywordEngine: respostas curadas, sem IA. Sempre disponível.
 * - LlmEngine: provider OpenAI-compatible (AMALIA via vLLM, OpenRouter,
 *   Regolo, OpenAI...) com grounding nas fontes curadas e fallback
 *   automático para o KeywordEngine se o provider falhar.
 * Ativa-se com ANSWER_ENGINE=llm + LLM_BASE_URL/LLM_API_KEY/LLM_MODEL.
 */
export interface AnswerEngine {
  responder(pergunta: string, lang?: Lang): Promise<ResultadoResposta>;
}

const SIGLAS_CURTAS = new Set([
  "cc", "bi", "d7", "d8", "d2", "ue", "24", "65", "tv", "cp", "at", "ss",
]);

const STOPWORDS = new Set([
  "a", "o", "e", "de", "do", "da", "dos", "das", "em", "no", "na", "nos",
  "nas", "um", "uma", "uns", "umas", "para", "por", "com", "sem", "que",
  "como", "qual", "quais", "onde", "quando", "quanto", "quanta", "me",
  "te", "se", "lhe", "eu", "tu", "ele", "ela", "meu", "minha", "teu",
  "tua", "seu", "sua", "ao", "aos", "à", "às", "ou", "mas", "é",
  "ser", "ter", "posso", "pode", "quero", "queria", "preciso",
  "tenho", "tens", "isto", "isso", "este", "esta", "esse",
  "essa", "muito", "mais", "ja", "já", "ainda", "so", "só", "la", "lá",
  "ca", "cá", "oi", "ola", "olá", "boas", "obrigado", "obrigada",
]);

/**
 * Lematização determinística para flexões verbais curtas/irregulares e
 * equivalentes frequentes que teriam prefixo comum < 6 letras em mesmaRaiz().
 */
const LEMAS: Record<string, string> = {
  peco: "pedir",
  pedi: "pedir",
  pede: "pedir",
  pedem: "pedir",
  pediu: "pedir",
  pedimos: "pedir",
  faco: "fazer",
  fiz: "fazer",
  fez: "fazer",
  faz: "fazer",
  fazem: "fazer",
  faca: "fazer",
  renovo: "renovar",
  renovei: "renovar",
  renova: "renovar",
  renovou: "renovar",
  caducou: "caducado",
  caducar: "caducado",
  caducada: "caducado",
  caducados: "caducado",
  caducadas: "caducado",
  expirou: "expirado",
  expirar: "expirado",
  expirada: "expirado",
  expirados: "expirado",
  expiradas: "expirado",
  roubaram: "roubado",
  roubou: "roubado",
  roubar: "roubado",
  roubada: "roubado",
  roubo: "roubado",
  furtaram: "furtado",
  furtou: "furtado",
  furtar: "furtado",
  furtada: "furtado",
  furto: "furtado",
  perco: "perdido",
  perdi: "perdido",
  perdeu: "perdido",
  perder: "perdido",
  perdida: "perdido",
  tiro: "tirar",
  tirei: "tirar",
  tira: "tirar",
  tirou: "tirar",
  cancelo: "cancelar",
  cancelei: "cancelar",
  cancela: "cancelar",
  cancelou: "cancelar",
  rescindo: "rescindir",
  rescindi: "rescindir",
  voto: "votar",
  votei: "votar",
  vota: "votar",
  votou: "votar",
  mudo: "mudar",
  mudei: "mudar",
  mudou: "mudar",
  abro: "abrir",
  abri: "abrir",
  abriu: "abrir",
  marco: "marcar",
  marquei: "marcar",
  marcou: "marcar",
  agendo: "agendar",
  agendei: "agendar",
  agendou: "agendar",
  ativo: "ativar",
  ativei: "ativar",
  adiro: "aderir",
  aderi: "aderir",
  entrego: "entregar",
  entreguei: "entregar",
  pago: "pagar",
  paguei: "pagar",
  pagou: "pagar",
  consulto: "consultar",
  consultei: "consultar",
  troco: "trocar",
  troquei: "trocar",
  troca: "trocar",
  gratis: "gratuito",
  gratuita: "gratuito",
  gratuitos: "gratuito",
  gratuitas: "gratuito",
  estrangeira: "estrangeiro",
  estrangeiros: "estrangeiro",
  estrangeiras: "estrangeiro",
  queixas: "queixa",
  queixar: "queixa",
  reclamar: "reclamacao",
  reclamacoes: "reclamacao",
};

/** Verbos de ação genéricos: desempatam dentro de um tema, mas não pontuam sozinhos. */
const VERBOS_AUXILIARES = new Set([
  "pedir", "fazer", "tirar", "consultar", "abrir", "pagar",
  "entregar", "submeter", "receber", "validar", "aderir", "escolher",
]);

/** Expansão semântica de siglas oficiais para os termos dos temas curados. */
const EXPANSAO_SIGLAS: Record<string, string[]> = {
  cc: ["cartao", "cidadao"],
  bi: ["cartao", "cidadao"],
  cmd: ["chave", "movel", "digital"],
  cesd: ["cartao", "europeu", "seguro", "doenca"],
  ehic: ["cartao", "europeu", "seguro", "doenca"],
  d7: ["visto"],
  d8: ["visto", "nomada", "digital"],
  d2: ["visto"],
  ss: ["seguranca", "social"],
  cp: ["comboio", "transportes"],
};

const PAISES_UE_DESTINO = new Set([
  "espanha", "franca", "alemanha", "italia", "irlanda", "belgica",
  "holanda", "luxemburgo", "austria", "dinamarca", "suecia", "polonia", "grecia",
]);

/** Modificadores que alteram o procedimento legal — se ausentes do candidato, evita falso positivo. */
const QUALIFICADORES_FORTES = new Set([
  "trocar", "estrangeiro", "internacional", "divorcio", "obito",
  "falecimento", "heranca", "inspecao", "alfandega", "importar",
  "legalizar", "exchange", "foreign", "niss",
]);

// Frase normalizada que afirma já ter NISS ("já tenho niss", "tenho o niss",
// "obtive o niss", "niss atribuído") — nesse caso o token é contexto, não
// pedido. Exige o NISS como objeto da posse e sem negação antes do verbo:
// "já tenho NIF, como peço o NISS" e "ainda não tenho NISS" ficam de fora.
const NISS_POSSE =
  /(?<!nao )(?:ja )?tenho (?:(?:o|meu|teu|seu) )*niss\b|\b(?:obtive|recebi) (?:o )?niss\b|\bniss (?:ja )?(?:foi |esta )?atribuido\b|\bcom (?:(?:o|meu|teu|seu) )+niss\b/;

const SETORES_REGULADOR = [
  "regulador", "regulator", "anacom", "erse", "banco", "operadora",
  "telecom", "telecomunicacoes", "energia", "arbitragem", "provedor",
];

function normalizar(texto: string): string[] {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => (t.length > 2 || SIGLAS_CURTAS.has(t)) && !STOPWORDS.has(t))
    .map((t) => LEMAS[t] ?? t);
}

function normalizarFraseExata(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function ehTituloCuradoExato(fraseNorm: string, p: Pergunta): boolean {
  if (!fraseNorm) return false;
  if (fraseNorm === normalizarFraseExata(p.texto)) return true;
  const titEn = TITULOS_EN[p.id];
  return titEn !== undefined && fraseNorm === normalizarFraseExata(titEn);
}

/**
 * Compara duas palavras por radical: iguais, equivalentes diretas,
 * ou partilham um prefixo de >=5 caracteres que cubra >=60% da menor.
 * ("desemprego"/"desempregado", "renovar"/"renovacao")
 */
function mesmaRaiz(a: string, b: string): boolean {
  const la = LEMAS[a] ?? a;
  const lb = LEMAS[b] ?? b;
  if (la === lb) return true;
  if (
    (la === "carta" && lb.startsWith("cartao")) ||
    (lb === "carta" && la.startsWith("cartao"))
  ) {
    return false;
  }
  if (
    (la === "queixa" && lb === "reclamacao") ||
    (la === "reclamacao" && lb === "queixa")
  ) {
    return true;
  }
  const n = Math.min(la.length, lb.length);
  if (n < 5) return false;
  let i = 0;
  while (i < n && la[i] === lb[i]) i++;
  return i >= Math.min(6, n) && i / n >= 0.6;
}

interface Candidato {
  p: Pergunta;
  tema: Tema;
  score: number;
}

function pontuar(
  tokens: Set<string>,
  tokensBase: Set<string>,
  fraseNorm: string,
  intencaoDefinicao: boolean,
  pergunta: Pergunta,
  tema: Tema,
  cache: Map<string, string[]>,
  lang: Lang
): number {
  const norm = (s: string) => {
    if (!cache.has(s)) cache.set(s, normalizar(s));
    return cache.get(s)!;
  };

  let scoreDominio = 0;
  let scoreAux = 0;

  const soma = (peso: number, alvo: string[]) => {
    for (const t of tokens) {
      if (alvo.some((p) => mesmaRaiz(t, p))) {
        if (VERBOS_AUXILIARES.has(t)) scoreAux += peso;
        else scoreDominio += peso;
      }
    }
  };

  soma(3, norm(pergunta.palavras.join(" ")));
  // Palavras-chave e títulos EN — entram no ranking quando o pedido é em inglês.
  if (lang === "en") {
    const en = TEMAS_EN[pergunta.id];
    if (en) soma(3, norm(en.palavras.join(" ")));
    const titEn = TITULOS_EN[pergunta.id];
    if (titEn) soma(2, norm(titEn));
    const temaTitEn = TEMAS_TITULO_EN[tema.id];
    if (temaTitEn) soma(1.5, norm(temaTitEn));
  }
  soma(2, norm(pergunta.texto));
  soma(1.5, norm(tema.titulo));
  soma(1.5, norm(tema.entidade));
  soma(0.5, norm(tema.descricao));

  const tituloExato = ehTituloCuradoExato(fraseNorm, pergunta);
  if (!tituloExato && scoreDominio === 0) return 0;

  let score = scoreDominio + scoreAux;
  if (tituloExato) score += 50;

  // Perguntas definicionais ("o que é a CMD?", "para que serve o CESD?")
  if (
    intencaoDefinicao &&
    scoreDominio > 0 &&
    (pergunta.id.endsWith("-o-que-e") ||
      pergunta.id.endsWith("-para-que-serve") ||
      /^(o que e|para que serve)\b/.test(normalizarFraseExata(pergunta.texto)))
  ) {
    score += 3;
  }

  // Perda/furto do CC vs perda da carta PIN/PUK ou renovação normal
  if (
    pergunta.id === "cc-perdido" &&
    tokens.has("cartao") &&
    (tokens.has("perdido") ||
      tokens.has("roubado") ||
      tokens.has("furtado") ||
      tokens.has("lost") ||
      tokens.has("stolen") ||
      tokens.has("theft")) &&
    !tokens.has("pin") &&
    !tokens.has("puk") &&
    !tokens.has("carta") &&
    !tokens.has("codigo") &&
    !tokens.has("codigos") &&
    !tokens.has("code") &&
    !tokens.has("letter")
  ) {
    score += 4;
  }

  // Linha SNS 24 vs número de utente do SNS
  if (
    pergunta.id === "sns-24" &&
    tokens.has("sns") &&
    tokens.has("24") &&
    !tokens.has("utente")
  ) {
    score += 4;
  }

  // Emigrar/viver num país concreto da UE (ex.: Espanha) reforça noutro-pais-ue
  if (tema.id === "noutro-pais-ue" && scoreDominio > 0) {
    for (const t of tokensBase) {
      if (PAISES_UE_DESTINO.has(t)) {
        score += 3;
        break;
      }
    }
  }

  // Marcação genérica (Loja do Cidadão / Siga) vs marcação específica de passaporte
  if (
    pergunta.id === "pep-agendar" &&
    !tokens.has("passaporte") &&
    !tokens.has("pep") &&
    !tokens.has("passport")
  ) {
    score = Math.max(0, score - 1);
  }

  // Queixa genérica de consumo (Livro de Reclamações) vs regulador setorial
  if (
    pergunta.id === "rec-regulador" &&
    !SETORES_REGULADOR.some((s) => tokens.has(s))
  ) {
    score = Math.max(0, score - 1);
  }

  // Guarda contra falsos positivos quando há qualificadores fortes ausentes da resposta
  if (!tituloExato && score > 2) {
    let qualificadoresEmFalta = false;
    for (const q of tokensBase) {
      if (!QUALIFICADORES_FORTES.has(q)) continue;
      // "niss" afirmado como já obtido é contexto, não pedido — não
      // penaliza ("já tenho NISS, como emitir recibos?").
      if (q === "niss" && NISS_POSSE.test(fraseNorm)) continue;
      const chaveVocab = `__vocab_${lang}_${pergunta.id}`;
      if (!cache.has(chaveVocab)) {
        const en = lang === "en" ? TEMAS_EN[pergunta.id] : undefined;
        const textoTotal = [
          pergunta.palavras.join(" "),
          pergunta.texto,
          ...pergunta.resposta.passos,
          pergunta.resposta.nota ?? "",
          ...(en ? [en.palavras.join(" "), ...en.passos, en.nota ?? ""] : []),
          lang === "en" ? (TITULOS_EN[pergunta.id] ?? "") : "",
        ].join(" ");
        cache.set(chaveVocab, normalizar(textoTotal));
      }
      const vocab = cache.get(chaveVocab)!;
      const coberto =
        vocab.some((v) => mesmaRaiz(q, v)) ||
        (q === "trocar" &&
          vocab.some(
            (v) => v === "mudar" || v === "alterar" || v === "escolher"
          ));
      if (!coberto) {
        qualificadoresEmFalta = true;
        break;
      }
    }
    if (qualificadoresEmFalta) {
      score = 2 + Math.min(1.9, score / 15);
    }
  }

  return score;
}

/** Ranking partilhado pelos dois motores: devolve os candidatos por score.
 *  Exportado para os testes medirem top-1/top-3 e experimentarem limiares. */
export function rankear(pergunta: string, lang: Lang = "pt"): Candidato[] {
  const fraseNorm = normalizarFraseExata(pergunta);
  const listaBase = normalizar(pergunta);
  const tokensBase = new Set(listaBase);
  if (tokensBase.size === 0 && !fraseNorm) return [];

  const tokens = new Set(tokensBase);
  for (const t of tokensBase) {
    const exp = EXPANSAO_SIGLAS[t];
    if (exp) for (const e of exp) tokens.add(e);
    if (t === "at" && lang === "pt") {
      tokens.add("financas");
      tokens.add("tributaria");
    }
  }

  const intencaoDefinicao = /\b(o que e|para que serve|que significa|what is)\b/.test(
    fraseNorm
  );

  const cache = new Map<string, string[]>();
  const candidatos: Candidato[] = [];
  for (const tema of TEMAS) {
    for (const p of tema.perguntas) {
      const score = pontuar(
        tokens,
        tokensBase,
        fraseNorm,
        intencaoDefinicao,
        p,
        tema,
        cache,
        lang
      );
      if (score > 0) candidatos.push({ p, tema, score });
    }
  }
  return candidatos.sort((a, b) => b.score - a.score);
}

function paraSugestao(c: Candidato, lang: Lang = "pt"): Sugestao {
  if (lang === "en") {
    return {
      id: c.p.id,
      texto: TITULOS_EN[c.p.id] ?? c.p.texto,
      tema: TEMAS_TITULO_EN[c.tema.id] ?? c.tema.titulo,
    };
  }
  return { id: c.p.id, texto: c.p.texto, tema: c.tema.titulo };
}

function elegivelSugestao(id: string, lang: Lang): boolean {
  return lang !== "en" || TEMAS_EN[id]?.revisao !== true;
}

function populares(lang: Lang = "pt"): Sugestao[] {
  const ids = ["cc-renovar", "irs-entregar", "ss-direta", "sns-consulta"];
  return ids
    .filter((id) => elegivelSugestao(id, lang))
    .map((id) => {
      for (const tema of TEMAS) {
        const p = tema.perguntas.find((x) => x.id === id);
        if (p) return paraSugestao({ p, tema, score: 0 }, lang);
      }
      return null;
    })
    .filter((s): s is Sugestao => s !== null);
}

function sugestoesDe(
  candidatos: Candidato[],
  lang: Lang,
  limite: number,
  minScore = 0,
  excluirId?: string
): Sugestao[] {
  return candidatos
    .filter(
      (c) =>
        c.p.id !== excluirId &&
        c.score >= minScore &&
        elegivelSugestao(c.p.id, lang)
    )
    .slice(0, limite)
    .map((c) => paraSugestao(c, lang));
}

export class KeywordEngine implements AnswerEngine {
  async responder(
    pergunta: string,
    lang: Lang = "pt"
  ): Promise<ResultadoResposta> {
    const candidatos = rankear(pergunta, lang);
    const melhor = candidatos[0];

    if (melhor && melhor.score >= 4) {
      const outras = sugestoesDe(
        candidatos.slice(1),
        lang,
        3,
        2,
        melhor.p.id
      );

      // Tradução EN curada — só é servida depois de revista (revisao !== true)
      const en = lang === "en" ? TEMAS_EN[melhor.p.id] : undefined;
      const servirEn = en && en.revisao !== true;
      const devolvida: Pergunta = servirEn
        ? {
            ...melhor.p,
            resposta: {
              ...melhor.p.resposta,
              passos: en.passos,
              nota: en.nota,
            },
          }
        : melhor.p;

      return {
        tipo: "resposta",
        pergunta: devolvida,
        tema: melhor.tema,
        sugestoes: outras,
        via: "keyword",
        idioma: servirEn ? "en" : "pt",
        soEmPt: lang === "en" && !servirEn,
      };
    }

    const sugs = sugestoesDe(candidatos, lang, 4);
    return {
      tipo: "sugestoes",
      sugestoes: sugs.length > 0 ? sugs : populares(lang),
      via: "keyword",
      idioma: lang,
    };
  }
}

interface FonteIndexada extends Fonte {
  ref: string;
}

interface LlmConfig {
  baseUrl: string;
  apiKey: string;
  models: string[];
  timeoutMs: number;
}

type AnaliseRespostaLlm =
  | { estado: "ok"; resposta: ResultadoResposta }
  | { estado: "recusa" }
  | { estado: "rejeitado" };

const SYSTEM_PROMPT = `És o Zé, o assistente do Pergunta ao Zé — um projeto independente que ajuda cidadãos a orientarem-se nos serviços públicos portugueses. Não és um site do Estado.

Regras:
- Responde APENAS com base no contexto fornecido. Cada bloco de contexto lista fontes com referências (F1, F2, ...).
- Português europeu, frases curtas e diretas, 3 a 5 passos.
- Não inventes preços, prazos, leis ou requisitos que não estejam no contexto.
- Se o contexto não cobrir a pergunta, devolve "passos" vazio e explica na "nota".
- Nunca peças dados pessoais (NIF, números de documentos, dados de saúde).
- Responde apenas com JSON válido neste formato:
  {"passos": ["..."], "nota": "..." ou null, "fontes": ["F1", "F3"]}
- "fontes" só pode conter referências das fontes fornecidas.`;

// Tier intermédio (score 1–2): o contexto é fraco, por isso o prompt é
// mais estrito — só responde se o contexto cobrir a pergunta diretamente.
const SYSTEM_PROMPT_FRACO = `És o Zé, o assistente do Pergunta ao Zé — um projeto independente que ajuda cidadãos a orientarem-se nos serviços públicos, nas finanças e na burocracia portuguesa. Não és um site do Estado.

Regras:
- O contexto fornecido é reduzido. Responde APENAS se o contexto cobrir diretamente a pergunta.
- Se a pergunta for fora do âmbito de serviços públicos, finanças ou burocracia portuguesa, ou se o contexto não bastar, devolve "passos" vazio e explica na "nota" para onde encaminhar o cidadão.
- Português europeu, frases curtas e diretas, 3 a 5 passos.
- Não inventes preços, prazos, leis ou requisitos que não estejam no contexto.
- Nunca peças dados pessoais (NIF, números de documentos, dados de saúde).
- Responde apenas com JSON válido neste formato:
  {"passos": ["..."], "nota": "..." ou null, "fontes": ["F1", "F3"]}
- "fontes" só pode conter referências das fontes fornecidas.`;

// Limiares de contexto para chamar o LLM (score do melhor candidato):
//   >= LIMIAR_LLM — contexto suficiente, resposta normal
//   >= LIMIAR_LLM_MINIMO e < LIMIAR_LLM — contexto parcial (um token fraco):
//     prompt estrito + resposta marcada com disclaimer
//   <  LIMIAR_LLM_MINIMO — sem base para fundamentar: sugestões diretas
const LIMIAR_LLM = 3;
const LIMIAR_LLM_MINIMO = 2;

const DISCLAIMER_FRACO: Record<Lang, string> = {
  pt: "Resposta gerada por IA com contexto parcial — confirma nos links oficiais antes de agir.",
  en: "AI-generated answer from partial context — confirm on the official links before acting.",
};

// Tier geral (score < LIMIAR_LLM_MINIMO): sem contexto curado, mas a pergunta
// é do domínio cívico/financeiro português — resposta genérica e orientadora,
// claramente marcada como não verificada.
const SYSTEM_PROMPT_GERAL = `És o Zé, o assistente do Pergunta ao Zé — um projeto independente que ajuda cidadãos a orientarem-se nos serviços públicos, nas finanças e na burocracia portuguesa. Não és um site do Estado.

Esta pergunta não tem resposta verificada na base curada. Responde APENAS se for sobre serviços públicos, finanças, economia, legislação, política ou vida cívica em Portugal.

Regras:
- Responde de forma genérica e orientadora: o que é, como funciona em geral e a que entidade ou portal oficial recorrer para confirmar.
- NUNCA cites valores concretos (€ ou %), prazos ou datas exatas, números de artigos de lei nem telefones — podem estar desatualizados. Diz antes para confirmar na fonte oficial.
- Não incluas URLs nem nomes de fontes — indica só a entidade (ex.: Portal das Finanças, Segurança Social Direta, ACT).
- Em política sê factual e neutro — sem opiniões, previsões ou tomada de partido.
- Se a pergunta for claramente fora deste âmbito (saúde pessoal, receitas, tecnologia, desporto, conselhos pessoais...), devolve "passos" vazio e explica na "nota" para onde encaminhar o cidadão.
- Português europeu, frases curtas e diretas, 3 a 5 passos.
- Nunca peças dados pessoais (NIF, números de documentos, dados de saúde).
- Responde apenas com JSON válido neste formato:
  {"passos": ["..."], "nota": "..." ou null, "fontes": []}`;

const DISCLAIMER_GERAL: Record<Lang, string> = {
  pt: "Resposta genérica de IA, fora do âmbito verificado do Zé — pode conter erros. Confirma sempre na fonte oficial antes de agir.",
  en: "Generic AI answer, outside Zé's verified scope — may contain errors. Always confirm on the official source before acting.",
};

// Vocabulário de domínio — sem pelo menos um destes tokens a pergunta vai
// direto para sugestões (poupa a quota da LLM a spam/fora de tópico).
const TOPICO_GERAL = [
  "imposto", "taxa", "iva", "irs", "irc", "financas", "orcamento",
  "economia", "inflacao", "juro", "divida", "deficit", "banco", "seguro",
  "credito", "emprestimo", "salario", "ordenado", "vencimento", "subsidio",
  "pensao", "reforma", "desemprego", "trabalho", "patrao", "empregador",
  "contrato", "despedimento", "ferias", "lei", "legal", "ilegal", "crime",
  "tribunal", "juiz", "advogado", "multa", "processo", "direito", "dever",
  "governo", "ministro", "presidente", "parlamento", "deputado", "partido",
  "eleicao", "voto", "votar", "camara", "municipio", "freguesia", "junta",
  "estado", "portugal", "portugues", "cidadao", "nacionalidade",
  "residencia", "visto", "imigrante", "imigracao", "arrendamento",
  "renda", "senhorio", "habitacao", "escola", "universidade", "saude",
  "hospital", "policia", "consumo", "empresa", "negocio", "sociedade",
  "fatura", "recibo", "contribuinte", "nif", "niss", "seguranca",
  "social", "apoio", "bolsa", "tax", "law", "government", "economy",
  "politic", "election", "salary", "pension", "fine", "court",
  "contract", "rent", "landlord", "portuguese", "unemployment",
];

function pareceTopicoGeral(pergunta: string): boolean {
  return normalizar(pergunta).some((t) =>
    TOPICO_GERAL.some((p) => mesmaRaiz(t, p))
  );
}

// No tier geral não há contexto para verificar detalhes exatos — o prompt
// proíbe-os e este filtro rejeita a resposta se aparecerem: URLs/domínios,
// % ou €, datas, telefones e números de artigo de lei.
const PROIBIDO_GERAL = new RegExp(
  [
    "https?://|www\\.",
    "[a-z0-9][a-z0-9.-]*\\.(pt|gov|com|net|org|eu|io|info)\\b",
    "\\d+([.,]\\d+)?\\s*(%|€|euros?|por cento)",
    "\\bart(igo)?\\.?º?\\.?\\s*\\d|\\bn\\.?º\\s*\\d",
    "\\b\\d{3}[ .]\\d{3}[ .]\\d{3}\\b|\\b\\d{9}\\b",
    "\\b(19|20)\\d{2}\\b",
    "\\b\\d{1,2}\\s+de\\s+\\w+\\s+de\\s+\\d{4}\\b|\\b\\d{1,2}/\\d{1,2}/\\d{2,4}\\b",
  ].join("|"),
  "i"
);

export class LlmEngine implements AnswerEngine {
  private fallback = new KeywordEngine();
  private cfg: LlmConfig;

  constructor(cfg: LlmConfig) {
    this.cfg = cfg;
  }

  async responder(
    pergunta: string,
    lang: Lang = "pt"
  ): Promise<ResultadoResposta> {
    const candidatos = rankear(pergunta, lang);
    // Sem match mínimo não há contexto curado. Se a pergunta for do domínio
    // cívico/financeiro português, tenta o tier geral (resposta orientadora
    // marcada como não verificada) antes de cair nas sugestões.
    if (candidatos.length === 0 || candidatos[0].score < LIMIAR_LLM_MINIMO) {
      if (pareceTopicoGeral(pergunta)) {
        const geral = await this.responderGeral(pergunta, lang);
        if (geral) return geral;
        // Houve chamada real ao provider — marca via=llm para a rota não
        // devolver a reserva do teto diário.
        return {
          tipo: "sugestoes",
          sugestoes: populares(lang),
          via: "llm",
          idioma: lang,
        };
      }
      return {
        tipo: "sugestoes",
        sugestoes: populares(lang),
        via: "keyword",
        idioma: lang,
      };
    }
    // Tier intermédio: contexto parcial — prompt estrito e a resposta sai
    // marcada com disclaimer de contexto parcial.
    const fraco = candidatos[0].score < LIMIAR_LLM;

    // F-11: curto-circuito instantâneo para pergunta curada exata (senhas/sugestões)
    const fraseNorm = normalizarFraseExata(pergunta);
    if (ehTituloCuradoExato(fraseNorm, candidatos[0].p)) {
      const direto = await this.fallback.responder(pergunta, lang);
      return { ...direto, via: "keyword" };
    }

    // F-03: em EN nunca traduz via LLM respostas sensíveis sem revisão humana
    if (lang === "en") {
      const enTop = TEMAS_EN[candidatos[0].p.id];
      if (!enTop || enTop.revisao === true) {
        const seguro = await this.fallback.responder(pergunta, lang);
        return { ...seguro, via: "keyword" };
      }
    }

    const candidatosContexto = (
      lang === "en"
        ? candidatos.filter((c) => {
            const en = TEMAS_EN[c.p.id];
            return Boolean(en && en.revisao !== true);
          })
        : candidatos
    ).slice(0, fraco ? 3 : 6);
    const { contexto, fontes } = montarContexto(candidatosContexto);

    for (const model of this.cfg.models) {
      try {
        const bruto = await this.chamarModelo(
          model,
          pergunta,
          contexto,
          lang,
          fraco ? SYSTEM_PROMPT_FRACO : SYSTEM_PROMPT
        );
        const analise = this.parseResposta(
          bruto,
          contexto,
          fontes,
          candidatos,
          lang
        );
        if (analise.estado === "ok") {
          if (fraco) analise.resposta.disclaimer = DISCLAIMER_FRACO[lang];
          return { ...analise.resposta, idioma: lang };
        }
        if (analise.estado === "recusa") {
          // O melhor candidato não cobre a pergunta (típico quando o score
          // vem de tokens auxiliares, ex.: "o que é o orçamento de estado"
          // a bater num "*-o-que-e" qualquer). Se for do domínio, tenta o
          // tier geral antes de devolver sugestões.
          if (pareceTopicoGeral(pergunta)) {
            // Só o modelo primário — uma recusa não deve queimar o fallback.
            const geral = await this.responderGeral(pergunta, lang, [
              this.cfg.models[0],
            ]);
            if (geral) return geral;
          }
          const sugs = sugestoesDe(candidatos, lang, 4);
          return {
            tipo: "sugestoes",
            sugestoes: sugs.length > 0 ? sugs : populares(lang),
            via: "llm",
            idioma: lang,
          };
        }
      } catch (err) {
        console.error(`[LlmEngine] modelo ${model} falhou:`, err);
      }
    }

    const fallback = await this.fallback.responder(pergunta, lang);
    return { ...fallback, via: "keyword" };
  }

  // Tier geral: sem contexto curado — o modelo responde de forma genérica e
  // orientadora sobre o domínio cívico/financeiro português, com proibição
  // de citar valores, prazos, artigos ou URLs. Devolve null se o modelo
  // recusar (fora de tópico) ou falhar — o chamador cai nas sugestões.
  private async responderGeral(
    pergunta: string,
    lang: Lang,
    modelos?: string[]
  ): Promise<ResultadoResposta | null> {
    for (const model of modelos ?? this.cfg.models) {
      try {
        const bruto = await this.chamarModelo(
          model,
          pergunta,
          "",
          lang,
          SYSTEM_PROMPT_GERAL
        );
        const analise = this.parseRespostaGeral(bruto, pergunta, lang);
        if (analise) return analise;
      } catch (err) {
        console.error(`[LlmEngine] tier geral — modelo ${model} falhou:`, err);
      }
    }
    return null;
  }

  private parseRespostaGeral(
    bruto: string,
    pergunta: string,
    lang: Lang
  ): ResultadoResposta | null {
    const inicio = bruto.indexOf("{");
    const fim = bruto.lastIndexOf("}");
    if (inicio < 0 || fim <= inicio) return null;

    let parsed: { passos?: unknown; nota?: unknown };
    try {
      parsed = JSON.parse(bruto.slice(inicio, fim + 1));
    } catch {
      return null;
    }

    if (!Array.isArray(parsed.passos)) return null;
    const passos = parsed.passos.filter(
      (p): p is string => typeof p === "string" && p.trim().length > 0
    );
    // Recusa fundamentada do próprio modelo (fora de tópico)
    if (passos.length === 0) return null;

    // Sem contexto não há como verificar detalhes exatos — se o modelo
    // emitir URL/domínio, valores, datas, telefones ou n.os de artigo, a
    // resposta não é fiável e cai nas sugestões.
    const nota =
      typeof parsed.nota === "string" && parsed.nota.trim().length > 0
        ? parsed.nota
        : undefined;
    const saida = [...passos, nota ?? ""].join("\n");
    if (PROIBIDO_GERAL.test(saida)) return null;

    const sintetica: Pergunta = {
      id: "",
      texto: pergunta,
      palavras: [],
      resposta: { passos, nota, fontes: [] },
    };

    return {
      tipo: "resposta",
      pergunta: sintetica,
      sugestoes: populares(lang),
      via: "llm",
      disclaimer: DISCLAIMER_GERAL[lang],
      foraAmbito: true,
      idioma: lang,
    };
  }

  private async chamarModelo(
    model: string,
    pergunta: string,
    contexto: string,
    lang: Lang,
    systemPrompt: string
  ) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), this.cfg.timeoutMs);
    try {
      const res = await fetch(`${this.cfg.baseUrl}/chat/completions`, {
        method: "POST",
        signal: ctrl.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.cfg.apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.2,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: `Contexto:\n${contexto}\n\nPergunta do cidadão: ${pergunta}${
                lang === "en"
                  ? "\n\nResponde em inglês claro e simples (o cidadão não lê português). Mantém nomes de entidades, telefones, valores e URLs exatamente como no contexto."
                  : ""
              }`,
            },
          ],
        }),
      });
      if (!res.ok) throw new Error(`LLM respondeu ${res.status}`);
      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content;
      if (typeof content !== "string") throw new Error("resposta vazia");
      return content;
    } finally {
      clearTimeout(t);
    }
  }

  private parseResposta(
    bruto: string,
    contexto: string,
    fontes: FonteIndexada[],
    candidatos: Candidato[],
    lang: Lang
  ): AnaliseRespostaLlm {
    const melhorCandidato = candidatos[0];
    const inicio = bruto.indexOf("{");
    const fim = bruto.lastIndexOf("}");
    if (inicio < 0 || fim <= inicio) return { estado: "rejeitado" };

    let parsed: { passos?: unknown; nota?: unknown; fontes?: unknown };
    try {
      parsed = JSON.parse(bruto.slice(inicio, fim + 1));
    } catch {
      return { estado: "rejeitado" };
    }

    if (!Array.isArray(parsed.passos)) return { estado: "rejeitado" };
    let passos = parsed.passos.filter(
      (p): p is string => typeof p === "string" && p.trim().length > 0
    );
    // F-27: recusa explícita fundamentada (passos: []) — não desperdiça 2.º modelo
    if (passos.length === 0) return { estado: "recusa" };

    let nota =
      typeof parsed.nota === "string" && parsed.nota.trim().length > 0
        ? parsed.nota
        : undefined;

    // F-03: aplica o glossário canónico EN antes do check de invariantes e retorno
    if (lang === "en") {
      const normEn = normalizarRespostaEn(
        { passos, nota, palavras: [] },
        melhorCandidato.p.id
      );
      passos = normEn.passos;
      nota = normEn.nota;
    }

    // Grounding: cada número, telefone, data, valor € ou URL do output tem
    // de existir no contexto enviado — se inventou, descarta e cai no
    // KeywordEngine (mesma lógica de invariantes do gerar-temas-en.mjs).
    const saida = [...passos, nota ?? ""].join("\n");
    const foraDoContexto = invariantesForaDoContexto(saida, contexto);
    if (foraDoContexto.length > 0) {
      console.error(
        `[LlmEngine] resposta descartada — inventou ${foraDoContexto.join(", ")}`
      );
      return { estado: "rejeitado" };
    }

    const refs = new Set(
      Array.isArray(parsed.fontes)
        ? parsed.fontes.filter((f): f is string => typeof f === "string")
        : []
    );
    const citadas = fontes.filter((f) => refs.has(f.ref));

    // O id fica o da pergunta curada que serviu de base — os links /p/slug
    // e a partilha funcionam como numa resposta keyword.
    const pergunta: Pergunta = {
      ...melhorCandidato.p,
      resposta: {
        ...melhorCandidato.p.resposta,
        passos,
        nota,
        fontes:
          citadas.length > 0 ? citadas : melhorCandidato.p.resposta.fontes,
      },
    };

    return {
      estado: "ok",
      resposta: {
        tipo: "resposta",
        pergunta,
        tema: melhorCandidato.tema,
        sugestoes: sugestoesDe(
          candidatos.slice(1),
          lang,
          3,
          2,
          melhorCandidato.p.id
        ),
        via: "llm",
      },
    };
  }
}

/** Dígitos normalizados (sem separadores) e URLs de um texto. */
function invariantes(texto: string): { nums: Set<string>; urls: Set<string> } {
  const nums = new Set(
    (texto.match(/\d[\d .:,]*\d|\d/g) ?? []).map((s) =>
      s.replace(/[ .:,]/g, "")
    )
  );
  const urls = new Set(
    (texto.match(/https?:\/\/[^\s)"']+|[\w-]+\.(?:gov\.pt|pt|eu)\b/g) ?? []).map(
      (u) => u.toLowerCase()
    )
  );
  return { nums, urls };
}

/**
 * Invariantes do output que não existem no contexto — sinal de alucinação.
 * Comparação por conjunto (não por multiplicidade): a paráfrase pode
 * reorganizar os números, mas não pode introduzir novos.
 */
function invariantesForaDoContexto(saida: string, contexto: string): string[] {
  const out = invariantes(saida);
  const ctx = invariantes(contexto);
  const fora: string[] = [];
  for (const n of out.nums) if (!ctx.nums.has(n)) fora.push(`número "${n}"`);
  for (const u of out.urls) if (!ctx.urls.has(u)) fora.push(`url "${u}"`);
  return fora;
}

function montarContexto(candidatos: Candidato[]) {
  const fontes: FonteIndexada[] = [];
  const porUrl = new Map<string, FonteIndexada>();

  const ref = (f: Fonte) => {
    const existente = porUrl.get(f.url);
    if (existente) return existente.ref;
    const nova: FonteIndexada = { ...f, ref: `F${fontes.length + 1}` };
    fontes.push(nova);
    porUrl.set(f.url, nova);
    return nova.ref;
  };

  const blocos = candidatos.map((c) => {
    const refs = c.p.resposta.fontes.map(ref).join(", ");
    const passos = c.p.resposta.passos.map((p) => `  - ${p}`).join("\n");
    const nota = c.p.resposta.nota ? `\n  Nota: ${c.p.resposta.nota}` : "";
    return `### ${c.tema.titulo} (${c.tema.entidade}) — "${c.p.texto}"\n${passos}${nota}\n  Fontes: ${refs}`;
  });

  const listaFontes = fontes
    .map((f) => `${f.ref}: ${f.titulo} — ${f.url}`)
    .join("\n");

  return { contexto: `${blocos.join("\n\n")}\n\nFontes:\n${listaFontes}`, fontes };
}

let engine: AnswerEngine | null = null;

export function getEngine(): AnswerEngine {
  if (!engine) {
    if (
      process.env.ANSWER_ENGINE === "llm" &&
      process.env.LLM_BASE_URL &&
      process.env.LLM_MODEL
    ) {
      const models = [
        process.env.LLM_MODEL,
        ...(process.env.LLM_MODEL_FALLBACK?.split(",") ?? []),
      ]
        .map((m) => m.trim())
        .filter(Boolean);
      engine = new LlmEngine({
        baseUrl: process.env.LLM_BASE_URL.replace(/\/+$/, ""),
        apiKey: process.env.LLM_API_KEY ?? "",
        models,
        timeoutMs: Number(process.env.LLM_TIMEOUT_MS ?? 20000),
      });
    } else {
      engine = new KeywordEngine();
    }
  }
  return engine;
}
