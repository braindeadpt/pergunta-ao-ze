import { NextResponse } from "next/server";
import { redisCliente, MAX_LLM_CALLS_PER_DAY } from "@/lib/ratelimit";
import { StatsDiarias } from "@/lib/stats";

/**
 * GET /api/stats — contadores diários de uso do /api/responder.
 * Requer STATS_TOKEN (Bearer ou ?token=). Sem Redis → 503.
 *
 *   GET /api/stats                       → hoje (UTC)
 *   GET /api/stats?ultimos=7             → últimos 7 dias (máx 30)
 *   GET /api/stats?dia=2026-10-04        → um dia específico
 */
export async function GET(request: Request) {
  const token = process.env.STATS_TOKEN;
  if (!token) {
    // Esconde a existência do endpoint quando não está configurado.
    return NextResponse.json({ erro: "Not found" }, { status: 404 });
  }
  const url = new URL(request.url);
  const auth = request.headers.get("authorization");
  const ok =
    auth === `Bearer ${token}` || url.searchParams.get("token") === token;
  if (!ok) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }
  if (!redisCliente) {
    return NextResponse.json(
      { erro: "Sem backend Redis — stats desligadas (falta Upstash/Vercel KV)." },
      { status: 503 }
    );
  }

  const stats = new StatsDiarias(redisCliente);
  const dias: string[] = [];
  const diaQ = url.searchParams.get("dia");
  if (diaQ) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(diaQ)) {
      return NextResponse.json(
        { erro: "dia inválido — usa AAAA-MM-DD." },
        { status: 400 }
      );
    }
    dias.push(diaQ);
  } else {
    const ultimos = Math.min(
      Math.max(Number(url.searchParams.get("ultimos") ?? 1) || 1, 1),
      30
    );
    for (let i = 0; i < ultimos; i++) {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - i);
      dias.push(d.toISOString().slice(0, 10));
    }
  }

  const dados = [];
  for (const dia of dias) dados.push({ dia, ...(await stats.ler(dia)) });

  const hoje = new Date().toISOString().slice(0, 10);
  const llmHoje = Number((await redisCliente.get(`ze:llm:${hoje}`)) ?? 0);

  return NextResponse.json({
    llmHoje,
    llmTeto: MAX_LLM_CALLS_PER_DAY,
    dias: dados,
  });
}
