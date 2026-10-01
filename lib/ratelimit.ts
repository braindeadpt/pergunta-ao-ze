import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting para a rota /api/responder.
 *
 * Dois backends atrás da mesma interface:
 * - UpstashRateLimiter / ContadorDiarioRedis: Redis via REST (@upstash/redis),
 *   ativo quando UPSTASH_REDIS_REST_URL+TOKEN (ou KV_REST_API_*) existem.
 * - MemoryRateLimiter / ContadorDiario: em memória — defeito local e fallback.
 *
 * Seleção no fim do ficheiro (singletons `limiter` e `contadorLlm`).
 * Falha de Redis no limite por IP → degrada para memória (fail-open);
 * falha no contador diário do LLM → devolve false (fail-closed, KeywordEngine).
 */

export interface ResultadoLimite {
  ok: boolean;
  /** Segundos até a janela reabrir (quando ok === false). */
  retryAfterSec: number;
  /** Quantos pedidos restam na janela. */
  restantes: number;
}

export interface RateLimiter {
  check(
    chave: string,
    limite: number,
    janelaMs: number,
    agora?: number
  ): ResultadoLimite | Promise<ResultadoLimite>;
}

export interface ContadorDiarioIface {
  /** Devolve true se ainda há quota; incrementa quando conta=true. */
  verificar(limite: number, conta?: boolean, agora?: number): boolean | Promise<boolean>;
}

interface Entrada {
  count: number;
  resetAt: number;
}

export class MemoryRateLimiter implements RateLimiter {
  private store = new Map<string, Entrada>();
  private ultimaLimpeza = 0;

  check(
    chave: string,
    limite: number,
    janelaMs: number,
    agora = Date.now()
  ): ResultadoLimite {
    // Limpeza oportunista (1×/min) para a Map não crescer sem fim.
    if (agora - this.ultimaLimpeza > 60_000) {
      for (const [k, e] of this.store) if (e.resetAt <= agora) this.store.delete(k);
      this.ultimaLimpeza = agora;
    }

    const e = this.store.get(chave);
    if (!e || e.resetAt <= agora) {
      this.store.set(chave, { count: 1, resetAt: agora + janelaMs });
      return { ok: true, retryAfterSec: 0, restantes: limite - 1 };
    }

    if (e.count >= limite) {
      return {
        ok: false,
        retryAfterSec: Math.ceil((e.resetAt - agora) / 1000),
        restantes: 0,
      };
    }

    e.count += 1;
    return { ok: true, retryAfterSec: 0, restantes: limite - e.count };
  }
}

/** Contrato mínimo de Redis — o fake dos testes implementa isto. */
export interface RedisMin {
  incr(key: string): Promise<number>;
  get(key: string): Promise<string | number | null>;
  pexpire(key: string, ms: number): Promise<number>;
  pttl(key: string): Promise<number>;
  pexpireat(key: string, unixMs: number): Promise<number>;
}

/**
 * Limite por IP em Redis: INCR na chave `ze:rl:{hash}` + PEXPIRE na 1.ª
 * contagem (janela fixa de janelaMs). Erros de rede delegam no fallback
 * em memória — o pedido do utilizador nunca falha por causa do Redis.
 */
export class UpstashRateLimiter implements RateLimiter {
  private redis: RedisMin;
  private fallback: RateLimiter;
  constructor(redis: RedisMin, fallback: RateLimiter) {
    this.redis = redis;
    this.fallback = fallback;
  }

  async check(
    chave: string,
    limite: number,
    janelaMs: number,
    agora = Date.now()
  ): Promise<ResultadoLimite> {
    const key = `ze:rl:${chave}`;
    try {
      const n = await this.redis.incr(key);
      if (n === 1) await this.redis.pexpire(key, janelaMs);
      if (n > limite) {
        const ttl = await this.redis.pttl(key);
        return {
          ok: false,
          retryAfterSec: Math.max(1, Math.ceil(ttl / 1000)),
          restantes: 0,
        };
      }
      return { ok: true, retryAfterSec: 0, restantes: limite - n };
    } catch (e) {
      console.error("[ratelimit] Redis falhou no limite por IP; fallback em memória:", e);
      return this.fallback.check(chave, limite, janelaMs, agora);
    }
  }
}

/** Meia-noite UTC seguinte (o contador diário usa dias UTC, como em memória). */
function proximaMeiaNoiteUtc(agora: number): number {
  const d = new Date(agora);
  d.setUTCHours(24, 0, 0, 0);
  return d.getTime();
}

/**
 * Teto diário de chamadas ao LLM em Redis: chave `ze:llm:{AAAA-MM-DD}`
 * (dia UTC) com expiração à meia-noite UTC seguinte.
 * FAIL-CLOSED: se o Redis não responder devolve false → KeywordEngine.
 */
export class ContadorDiarioRedis implements ContadorDiarioIface {
  private redis: RedisMin;
  constructor(redis: RedisMin) {
    this.redis = redis;
  }

  async verificar(limite: number, conta = false, agora = Date.now()): Promise<boolean> {
    const dia = new Date(agora).toISOString().slice(0, 10);
    const key = `ze:llm:${dia}`;
    try {
      if (!conta) {
        const n = Number((await this.redis.get(key)) ?? 0);
        return n < limite;
      }
      const n = await this.redis.incr(key);
      if (n === 1) await this.redis.pexpireat(key, proximaMeiaNoiteUtc(agora));
      return n <= limite;
    } catch (e) {
      console.error("[ratelimit] Redis falhou no contador diário LLM; fail-closed:", e);
      return false;
    }
  }
}

/** Contador diário em memória (dia UTC). */
export class ContadorDiario implements ContadorDiarioIface {
  private dia = "";
  private n = 0;

  verificar(limite: number, conta = false, agora = Date.now()): boolean {
    const hoje = new Date(agora).toISOString().slice(0, 10);
    if (hoje !== this.dia) {
      this.dia = hoje;
      this.n = 0;
    }
    if (this.n >= limite) return false;
    if (conta) this.n += 1;
    return true;
  }

  get total() {
    return this.n;
  }
}

/** Hash do IP com sal — nunca guardamos o IP em claro. */
export function hashIp(ip: string): string {
  const sal = process.env.RATE_LIMIT_SALT;
  if (!sal && process.env.NODE_ENV === "production") {
    throw new Error(
      "RATE_LIMIT_SALT não está definido em produção — recusar usar o defeito. Define-o nas envs da Vercel."
    );
  }
  return createHash("sha256")
    .update(`${sal ?? "ze-sal-2026"}:${ip}`)
    .digest("hex")
    .slice(0, 24);
}

/**
 * IP do cliente. Na Vercel, `x-vercel-forwarded-for` é definido pela
 * plataforma (não forjável pelo cliente); fora dela usamos o primeiro
 * valor de x-forwarded-for. Em dev sem proxy, "local".
 */
export function ipDoPedido(request: Request): string {
  const vercel = request.headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0].trim();
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "local";
}

export const LIMITE_POR_IP = Number(process.env.RATE_LIMIT_PER_IP ?? 20);
export const JANELA_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);
export const MAX_LLM_CALLS_PER_DAY = Number(process.env.MAX_LLM_CALLS_PER_DAY ?? 500);

// --- seleção por env ----------------------------------------------------------
// UPSTASH_REDIS_REST_URL/TOKEN (Upstash direto) ou KV_REST_API_URL/TOKEN
// (Vercel KV — mesmo protocolo REST). Sem envs: memória + aviso no arranque.
const memoria = new MemoryRateLimiter();

function criarRedis(): RedisMin | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const redis = criarRedis();

export const limiter: RateLimiter = redis
  ? new UpstashRateLimiter(redis, memoria)
  : memoria;

export const contadorLlm: ContadorDiarioIface = redis
  ? new ContadorDiarioRedis(redis)
  : new ContadorDiario();

if (!redis) {
  console.warn(
    "[ratelimit] Sem UPSTASH_REDIS_REST_URL/TOKEN (nem KV_*): limite por IP e teto diário correm EM MEMÓRIA (por instância). Vê README → Rate limit em produção."
  );
}
if (
  process.env.NODE_ENV === "production" &&
  !process.env.RATE_LIMIT_SALT &&
  process.env.NEXT_PHASE !== "phase-production-build"
) {
  throw new Error(
    "[ratelimit] RATE_LIMIT_SALT não definido em produção — arranque recusado em vez de usar o defeito público. Define a env na Vercel."
  );
}
