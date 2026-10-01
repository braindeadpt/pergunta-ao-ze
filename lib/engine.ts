import { TEMAS } from "@/lib/data/temas";
import type { Fonte, Pergunta, Tema } from "@/lib/types";

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
  responder(pergunta: string): Promise<ResultadoResposta>;
}

const STOPWORDS = new Set([
  "a", "o", "e", "de", "do", "da", "dos", "das", "em", "no", "na", "nos",
  "nas", "um", "uma", "uns", "umas", "para", "por", "com", "sem", "que",
  "como", "qual", "quais", "onde", "quando", "quanto", "quanta", "me",
  "te", "se", "lhe", "eu", "tu", "ele", "ela", "meu", "minha", "teu",
  "tua", "seu", "sua", "ao", "aos", "à", "às", "ou", "mas", "é",
  "ser", "ter", "fazer", "posso", "pode", "quero", "queria", "preciso",
  "tenho", "tens", "isto", "isso", "este", "esta", "esse",
  "essa", "muito", "mais", "ja", "já", "ainda", "so", "só", "la", "lá",
  "ca", "cá", "oi", "ola", "olá", "boas", "obrigado", "obrigada",
]);

function normalizar(texto: string): string[] {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

/**
 * Compara duas palavras por radical: iguais, uma é prefixo da outra,
 * ou partilham um prefixo de >=5 caracteres que cubra >=60% da menor.
 * ("desemprego"/"desempregado", "renovar"/"renovacao")
 */
function mesmaRaiz(a: string, b: string): boolean {
  if (a === b) return true;
  const n = Math.min(a.length, b.length);
  if (n < 5) return false;
  let i = 0;
  while (i < n && a[i] === b[i]) i++;
  return i >= Math.min(6, n) && i / n >= 0.6;
}

interface Candidato {
  p: Pergunta;
  tema: Tema;
  score: number;
}

function pontuar(
  tokens: Set<string>,
  pergunta: Pergunta,
  tema: Tema,
  cache: Map<string, string[]>
): number {
  const norm = (s: string) => {
    if (!cache.has(s)) cache.set(s, normalizar(s));
    return cache.get(s)!;
  };

  let score = 0;
  const soma = (peso: number, alvo: string[]) => {
    for (const t of tokens) {
      if (alvo.some((p) => mesmaRaiz(t, p))) score += peso;
    }
  };

  soma(3, pergunta.palavras);
  soma(2, norm(pergunta.texto));
  soma(1.5, norm(tema.titulo));
  soma(1.5, norm(tema.entidade));
  soma(0.5, norm(tema.descricao));

  return score;
}

/** Ranking partilhado pelos dois motores: devolve os candidatos por score. */
function rankear(pergunta: string): Candidato[] {
  const tokens = new Set(normalizar(pergunta));
  if (tokens.size === 0) return [];

  const cache = new Map<string, string[]>();
  const candidatos: Candidato[] = [];
  for (const tema of TEMAS) {
    for (const p of tema.perguntas) {
      const score = pontuar(tokens, p, tema, cache);
      if (score > 0) candidatos.push({ p, tema, score });
    }
  }
  return candidatos.sort((a, b) => b.score - a.score);
}

function paraSugestao(c: Candidato): Sugestao {
  return { id: c.p.id, texto: c.p.texto, tema: c.tema.titulo };
}

function populares(): Sugestao[] {
  const ids = ["cc-renovar", "irs-entregar", "ss-direta", "sns-consulta"];
  return ids
    .map((id) => {
      for (const tema of TEMAS) {
        const p = tema.perguntas.find((x) => x.id === id);
        if (p) return { id: p.id, texto: p.texto, tema: tema.titulo };
      }
      return null;
    })
    .filter((s): s is Sugestao => s !== null);
}

export class KeywordEngine implements AnswerEngine {
  async responder(pergunta: string): Promise<ResultadoResposta> {
    const candidatos = rankear(pergunta);
    const melhor = candidatos[0];

    if (melhor && melhor.score >= 4) {
      const outras = candidatos
        .slice(1, 4)
        .filter((c) => c.p.id !== melhor.p.id && c.score >= 2)
        .map(paraSugestao);
      return {
        tipo: "resposta",
        pergunta: melhor.p,
        tema: melhor.tema,
        sugestoes: outras,
        via: "keyword",
      };
    }

    return {
      tipo: "sugestoes",
      sugestoes:
        candidatos.length > 0
          ? candidatos.slice(0, 4).map(paraSugestao)
          : populares(),
      via: "keyword",
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

export class LlmEngine implements AnswerEngine {
  private fallback = new KeywordEngine();

  constructor(private cfg: LlmConfig) {}

  async responder(pergunta: string): Promise<ResultadoResposta> {
    const candidatos = rankear(pergunta);
    if (candidatos.length === 0) {
      return { tipo: "sugestoes", sugestoes: populares(), via: "llm" };
    }

    const { contexto, fontes } = montarContexto(candidatos.slice(0, 6));

    for (const model of this.cfg.models) {
      try {
        const bruto = await this.chamarModelo(model, pergunta, contexto);
        const resposta = this.parseResposta(bruto, fontes, candidatos[0]);
        if (resposta) return resposta;
      } catch (err) {
        console.error(`[LlmEngine] modelo ${model} falhou:`, err);
      }
    }

    const fallback = await this.fallback.responder(pergunta);
    return { ...fallback, via: "keyword" };
  }

  private async chamarModelo(model: string, pergunta: string, contexto: string) {
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
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Contexto:\n${contexto}\n\nPergunta do cidadão: ${pergunta}`,
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
    fontes: FonteIndexada[],
    melhorCandidato: Candidato
  ): ResultadoResposta | null {
    const inicio = bruto.indexOf("{");
    const fim = bruto.lastIndexOf("}");
    if (inicio < 0 || fim <= inicio) return null;

    let parsed: { passos?: unknown; nota?: unknown; fontes?: unknown };
    try {
      parsed = JSON.parse(bruto.slice(inicio, fim + 1));
    } catch {
      return null;
    }

    if (!Array.isArray(parsed.passos)) return null;
    const passos = parsed.passos.filter(
      (p): p is string => typeof p === "string" && p.trim().length > 0
    );
    if (passos.length === 0) return null;

    const refs = new Set(
      Array.isArray(parsed.fontes)
        ? parsed.fontes.filter((f): f is string => typeof f === "string")
        : []
    );
    const citadas = fontes.filter((f) => refs.has(f.ref));

    const pergunta: Pergunta = {
      id: "llm",
      texto: melhorCandidato.p.texto,
      palavras: [],
      resposta: {
        passos,
        nota: typeof parsed.nota === "string" ? parsed.nota : undefined,
        fontes: citadas.length > 0 ? citadas : melhorCandidato.p.resposta.fontes,
      },
    };

    return {
      tipo: "resposta",
      pergunta,
      tema: melhorCandidato.tema,
      sugestoes: [],
      via: "llm",
    };
  }
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
