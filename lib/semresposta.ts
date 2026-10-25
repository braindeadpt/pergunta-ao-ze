import type { RedisMin } from "./ratelimit.ts";
import { redisCliente } from "./ratelimit.ts";

/**
 * Perguntas sem resposta curada — lista diária em Redis.
 *
 * Quando o motor devolve "sugestoes" (sem match), o texto da pergunta é
 * anonimizado (emails, telefones, NIF/NISS, números de documento e qualquer
 * sequência de 6+ dígitos → "[removido]") e guardado em `ze:sem:{dia}`:
 * retenção de 30 dias, máximo 500 entradas por dia (LTRIM fica com as
 * mais recentes).
 *
 * Serve só para sabermos que temas faltam à base — nunca é associado
 * a quem perguntou. Sem Redis é no-op; falhas são engolidas.
 */

export const TTL_SEM_MS = 30 * 24 * 60 * 60 * 1000;
export const MAX_SEM_POR_DIA = 500;

/**
 * Retira dados pessoais de um texto livre: emails, sequências de 6+
 * dígitos (com ou sem separadores — cobre NIF, NISS, nº de documento e
 * telefones) e devolve "[removido]" no lugar.
 */
export function anonimizar(texto: string): string {
  let out = texto;
  // emails
  out = out.replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[removido]");
  // números longos possivelmente com separadores (9 6 3   1 2 3   4 5 6,
  // 123.456.789, 211-950-500...) — só substitui se houver >=6 dígitos
  out = out.replace(/\d[\d\s./-]{4,}\d/g, (m) =>
    m.replace(/\D/g, "").length >= 6 ? "[removido]" : m
  );
  // sequências contíguas de 6+ dígitos que sobraram
  out = out.replace(/\d{6,}/g, "[removido]");
  return out.replace(/\s+/g, " ").trim();
}

/** Guarda a pergunta anonimizada na lista do dia. Nunca lança. */
export async function guardarSemResposta(
  redis: RedisMin | null,
  pergunta: string,
  agora = Date.now()
): Promise<void> {
  if (!redis) return;
  try {
    const dia = new Date(agora).toISOString().slice(0, 10);
    const key = `ze:sem:${dia}`;
    const texto = anonimizar(pergunta);
    if (!texto) return;
    await redis.rpush(key, texto);
    await redis.ltrim(key, -MAX_SEM_POR_DIA, -1);
    await redis.pexpire(key, TTL_SEM_MS);
  } catch (e) {
    console.error("[sem-resposta] falhou a guardar (ignorado):", e);
  }
}

export interface SemRespostaItem {
  pergunta: string;
  n: number;
}

/** Lê as listas dos últimos `dias` dias e agrega por frequência (desc). */
export async function lerSemResposta(
  redis: RedisMin,
  dias: number,
  agora = Date.now()
): Promise<SemRespostaItem[]> {
  const contagens = new Map<string, number>();
  for (let i = 0; i < dias; i++) {
    const d = new Date(agora);
    d.setUTCDate(d.getUTCDate() - i);
    const dia = d.toISOString().slice(0, 10);
    const lista = await redis.lrange(`ze:sem:${dia}`, 0, -1);
    for (const texto of lista) {
      contagens.set(texto, (contagens.get(texto) ?? 0) + 1);
    }
  }
  return [...contagens.entries()]
    .map(([pergunta, n]) => ({ pergunta, n }))
    .sort((a, b) => b.n - a.n || a.pergunta.localeCompare(b.pergunta));
}

/** Atalho com o singleton partilhado — chamado pela rota /api/responder. */
export function registarSemResposta(pergunta: string): Promise<void> {
  return guardarSemResposta(redisCliente, pergunta);
}
