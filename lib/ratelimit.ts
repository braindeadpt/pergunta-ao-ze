import { createHash } from "node:crypto";

/**
 * Rate limiting para a rota /api/responder.
 *
 * Implementação em memória (Map + janela fixa).
 * LIMITAÇÃO CONHECIDA: em serverless (Vercel) cada instância tem o seu
 * contador — o limite efetivo é ~limite × nº de instâncias quentes e
 * reinicia a cada deploy. Serve para travar abuso casual; para proteção
 * rigorosa trocar por uma implementação com Redis/Upstash atrás da mesma
 * interface — a rota não muda.
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
  ): ResultadoLimite;
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

/** Hash do IP com sal — nunca guardamos o IP em claro. */
export function hashIp(ip: string): string {
  const sal = process.env.RATE_LIMIT_SALT ?? "ze-sal-2026";
  return createHash("sha256").update(`${sal}:${ip}`).digest("hex").slice(0, 24);
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

// Instância partilhada do processo (módulo singleton).
export const limiter = new MemoryRateLimiter();

export const LIMITE_POR_IP = Number(process.env.RATE_LIMIT_PER_IP ?? 20);
export const JANELA_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);
export const MAX_LLM_CALLS_PER_DAY = Number(process.env.MAX_LLM_CALLS_PER_DAY ?? 500);

/** Contador diário de chamadas ao LLM (por data UTC). */
export class ContadorDiario {
  private dia = "";
  private n = 0;

  /** Devolve true se ainda há quota; incrementa quando conta=true. */
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

export const contadorLlm = new ContadorDiario();
