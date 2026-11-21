import { NextResponse } from "next/server";
import { getEngine, KeywordEngine } from "@/lib/engine";
import {
  limiter,
  hashIp,
  ipDoPedido,
  contadorLlm,
  LIMITE_POR_IP,
  JANELA_MS,
  MAX_LLM_CALLS_PER_DAY,
} from "@/lib/ratelimit";
import { registarResposta } from "@/lib/stats";
import { registarSemResposta } from "@/lib/semresposta";

const MAX_BODY_BYTES = 8 * 1024;
const keywordFallback = new KeywordEngine();

export async function POST(request: Request) {
  const acceptLang = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const isEnPre = acceptLang.startsWith("en");

  // Rate limit por IP — corre antes de ler o corpo.
  const chave = hashIp(ipDoPedido(request));
  const limite = await limiter.check(chave, LIMITE_POR_IP, JANELA_MS);
  if (!limite.ok) {
    return NextResponse.json(
      {
        erro: isEnPre
          ? "Too many requests. Please wait a moment and try again."
          : "Demasiados pedidos seguidos. Espera um momento e tenta de novo.",
        retryAfter: limite.retryAfterSec,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limite.retryAfterSec) },
      }
    );
  }

  const len = Number(request.headers.get("content-length") ?? 0);
  if (len > MAX_BODY_BYTES) {
    return NextResponse.json(
      { erro: isEnPre ? "Request is too large." : "Pedido demasiado grande." },
      { status: 400 }
    );
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json(
      { erro: isEnPre ? "Invalid request." : "Pedido inválido." },
      { status: 400 }
    );
  }

  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json(
      { erro: isEnPre ? "Request is too large." : "Pedido demasiado grande." },
      { status: 400 }
    );
  }

  let body: { pergunta?: unknown; lang?: string } | null = null;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { erro: isEnPre ? "Invalid request." : "Pedido inválido." },
      { status: 400 }
    );
  }

  const lang: "pt" | "en" = body?.lang === "en" ? "en" : "pt";
  const isEn = lang === "en" || (body?.lang === undefined && isEnPre);
  const pergunta = body?.pergunta;

  if (typeof pergunta !== "string" || pergunta.trim().length === 0) {
    return NextResponse.json(
      { erro: isEn ? "Please write your question." : "Escreve a tua pergunta." },
      { status: 400 }
    );
  }

  if (pergunta.length > 500) {
    return NextResponse.json(
      { erro: isEn ? "Question is too long." : "A pergunta é demasiado longa." },
      { status: 400 }
    );
  }

  // Teto diário de chamadas LLM: a quota reserva-se ANTES de chamar o
  // modelo — INCR atómico. Ler o contador sem contar deixava passar
  // todos os pedidos em voo com n < teto (corrida verifica-e-age).
  const quotaLlm = await contadorLlm.verificar(MAX_LLM_CALLS_PER_DAY, true);
  const engine = quotaLlm ? getEngine() : keywordFallback;
  let resultado;
  try {
    resultado = await engine.responder(pergunta.trim(), lang);
  } catch (err) {
    if (quotaLlm) await contadorLlm.libertar();
    throw err;
  }
  // Sem chamada real ao LLM (fallback keyword / provider em baixo):
  // devolve a reserva — o teto conta só chamadas ao modelo.
  if (quotaLlm && resultado.via !== "llm") {
    await contadorLlm.libertar();
  }
  // Contadores diários de uso (ze:st:*, 90 dias). Nunca lança — stats
  // não podem partir a resposta ao utilizador.
  await registarResposta(resultado);
  // Sem match curado: guarda a pergunta anonimizada (ze:sem:{dia}, 30 dias,
  // máx 500/dia) — é a lista de espera de conteúdo. No-op sem Redis.
  if (resultado.tipo === "sugestoes") {
    await registarSemResposta(pergunta.trim());
  }
  return NextResponse.json(resultado);
}
