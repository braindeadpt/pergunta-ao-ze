import { redisCliente, type RedisMin } from "./ratelimit.ts";

/**
 * Contadores diários de uso do /api/responder, em Redis.
 *
 * Chaves `ze:st:{AAAA-MM-DD}:{metrica}` (dia UTC), TTL de 90 dias —
 * ao contrário de `ze:llm:{dia}` (que expira à meia-noite e serve só
 * o teto diário), estas guardam histórico consultável.
 *
 * Só existem com Upstash/Vercel KV configurado; sem Redis o registo
 * é um no-op silencioso e a leitura devolve 503 no endpoint.
 * Falhas de Redis no registo são engolidas — stats nunca podem
 * partir a resposta ao utilizador.
 */

export const TTL_STATS_MS = 90 * 24 * 60 * 60 * 1000;

export const METRICAS = ["total", "llm", "kw", "en", "sug"] as const;
export type Metrica = (typeof METRICAS)[number];

export interface UsoResposta {
  via?: "keyword" | "llm";
  idioma?: string;
  tipo?: "resposta" | "sugestoes";
}

export class StatsDiarias {
  private redis: RedisMin;
  private ttlMs: number;
  constructor(redis: RedisMin, ttlMs = TTL_STATS_MS) {
    this.redis = redis;
    this.ttlMs = ttlMs;
  }

  /** Incrementa os contadores do dia (UTC) para uma resposta servida. */
  async registar(r: UsoResposta, agora = Date.now()): Promise<void> {
    const dia = new Date(agora).toISOString().slice(0, 10);
    const keys = [`ze:st:${dia}:total`];
    if (r.via === "llm") keys.push(`ze:st:${dia}:llm`);
    if (r.via === "keyword") keys.push(`ze:st:${dia}:kw`);
    if (r.idioma === "en") keys.push(`ze:st:${dia}:en`);
    if (r.tipo === "sugestoes") keys.push(`ze:st:${dia}:sug`);
    await Promise.all(
      keys.map(async (k) => {
        const n = await this.redis.incr(k);
        if (n === 1) await this.redis.pexpire(k, this.ttlMs);
      })
    );
  }

  /** Lê os contadores de um dia (AAAA-MM-DD). Falta de chaves = zeros. */
  async ler(dia: string): Promise<Record<Metrica, number>> {
    const out = {} as Record<Metrica, number>;
    for (const m of METRICAS) {
      out[m] = Number((await this.redis.get(`ze:st:${dia}:${m}`)) ?? 0);
    }
    return out;
  }
}

/** Singleton — null sem Redis. */
export const stats: StatsDiarias | null = redisCliente
  ? new StatsDiarias(redisCliente)
  : null;

/** Regista uma resposta servida; nunca lança nem bloqueia o pedido. */
export async function registarRespostaEm(
  s: StatsDiarias | null,
  r: UsoResposta
): Promise<void> {
  if (!s) return;
  try {
    await s.registar(r);
  } catch (e) {
    console.error("[stats] falhou a registar uso (ignorado):", e);
  }
}

export function registarResposta(r: UsoResposta): Promise<void> {
  return registarRespostaEm(stats, r);
}
