import { test } from "node:test";
import assert from "node:assert/strict";
import {
  StatsDiarias,
  registarRespostaEm,
  TTL_STATS_MS,
} from "../lib/stats.ts";
import type { RedisMin } from "../lib/ratelimit.ts";

/** Fake mínimo do contrato RedisMin usado pelos StatsDiarias. */
class FakeRedis implements RedisMin {
  store = new Map<string, { v: number; expiraEm?: number }>();
  falhar = false;
  async incr(key: string) {
    if (this.falhar) throw new Error("redis em baixo");
    const e = this.store.get(key) ?? { v: 0 };
    e.v += 1;
    this.store.set(key, e);
    return e.v;
  }
  async get(key: string) {
    if (this.falhar) throw new Error("redis em baixo");
    return this.store.get(key)?.v ?? null;
  }
  async pexpire(key: string, ms: number) {
    if (this.falhar) throw new Error("redis em baixo");
    const e = this.store.get(key) ?? { v: 0 };
    e.expiraEm = ms;
    this.store.set(key, e);
    return 1;
  }
  async pttl() {
    return -1;
  }
  async pexpireat() {
    return 1;
  }
}

const T0 = Date.UTC(2026, 9, 4, 15, 0, 0);
const DIA = "2026-10-04";

test("stats: resposta via llm conta total + llm (+en se for EN)", async () => {
  const r = new FakeRedis();
  const s = new StatsDiarias(r);
  await s.registar({ via: "llm", idioma: "pt", tipo: "resposta" }, T0);
  await s.registar({ via: "llm", idioma: "en", tipo: "resposta" }, T0);

  const lido = await s.ler(DIA);
  assert.equal(lido.total, 2);
  assert.equal(lido.llm, 2);
  assert.equal(lido.en, 1);
  assert.equal(lido.kw, 0);
  assert.equal(lido.sug, 0);
});

test("stats: keyword/pt/sugestoes só conta as métricas certas", async () => {
  const r = new FakeRedis();
  const s = new StatsDiarias(r);
  await s.registar({ via: "keyword", idioma: "pt", tipo: "sugestoes" }, T0);

  const lido = await s.ler(DIA);
  assert.equal(lido.total, 1);
  assert.equal(lido.kw, 1);
  assert.equal(lido.sug, 1);
  assert.equal(lido.llm, 0);
  assert.equal(lido.en, 0);
});

test("stats: TTL de 90 dias é definido na 1.ª escrita de cada chave", async () => {
  const r = new FakeRedis();
  const s = new StatsDiarias(r);
  await s.registar({ via: "llm", idioma: "pt", tipo: "resposta" }, T0);
  assert.equal(r.store.get(`ze:st:${DIA}:total`)?.expiraEm, TTL_STATS_MS);
  assert.equal(r.store.get(`ze:st:${DIA}:llm`)?.expiraEm, TTL_STATS_MS);
});

test("stats: dias diferentes têm chaves diferentes; dia vazio = zeros", async () => {
  const r = new FakeRedis();
  const s = new StatsDiarias(r);
  await s.registar({ via: "llm", tipo: "resposta" }, Date.UTC(2026, 9, 4));
  await s.registar({ via: "keyword", tipo: "resposta" }, Date.UTC(2026, 9, 5));

  assert.equal((await s.ler("2026-10-04")).llm, 1);
  assert.equal((await s.ler("2026-10-04")).kw, 0);
  assert.equal((await s.ler("2026-10-05")).kw, 1);
  assert.deepEqual(await s.ler("2026-10-06"), {
    total: 0,
    llm: 0,
    kw: 0,
    en: 0,
    sug: 0,
  });
});

test("stats: falha de Redis nunca lança nem parte o pedido", async () => {
  const r = new FakeRedis();
  r.falhar = true;
  const s = new StatsDiarias(r);
  await assert.doesNotReject(
    registarRespostaEm(s, { via: "llm", idioma: "pt", tipo: "resposta" })
  );
  // sem backend (null) também é no-op
  await assert.doesNotReject(
    registarRespostaEm(null, { via: "llm", tipo: "resposta" })
  );
});
