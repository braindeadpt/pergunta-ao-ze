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

const MAX_BODY_BYTES = 8 * 1024;
const keywordFallback = new KeywordEngine();

export async function POST(request: Request) {
  // Rate limit por IP — corre antes de ler o corpo.
  const chave = hashIp(ipDoPedido(request));
  const limite = await limiter.check(chave, LIMITE_POR_IP, JANELA_MS);
  if (!limite.ok) {
    return NextResponse.json(
      {
        erro: "Demasiados pedidos seguidos. Espera um momento e tenta de novo.",
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
      { erro: "Pedido demasiado grande." },
      { status: 400 }
    );
  }

  let pergunta: unknown;
  let lang: "pt" | "en" = "pt";
  try {
    const body = await request.json();
    pergunta = body?.pergunta;
    if (body?.lang === "en") lang = "en";
  } catch {
    return NextResponse.json({ erro: "Pedido inválido." }, { status: 400 });
  }

  if (typeof pergunta !== "string" || pergunta.trim().length === 0) {
    return NextResponse.json({ erro: "Escreve a tua pergunta." }, { status: 400 });
  }

  if (pergunta.length > 500) {
    return NextResponse.json(
      { erro: "A pergunta é demasiado longa." },
      { status: 400 }
    );
  }

  // Teto diário de chamadas LLM: acima dele responde só o KeywordEngine.
  const llmDisponivel = await contadorLlm.verificar(MAX_LLM_CALLS_PER_DAY);
  const engine = llmDisponivel ? getEngine() : keywordFallback;
  const resultado = await engine.responder(pergunta.trim(), lang);
  if (resultado.via === "llm") {
    await contadorLlm.verificar(MAX_LLM_CALLS_PER_DAY, true);
  }
  // Contadores diários de uso (ze:st:*, 90 dias). Nunca lança — stats
  // não podem partir a resposta ao utilizador.
  await registarResposta(resultado);
  return NextResponse.json(resultado);
}
