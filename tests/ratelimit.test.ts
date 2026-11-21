import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MemoryRateLimiter,
  ContadorDiario,
  UpstashRateLimiter,
  ContadorDiarioRedis,
  hashIp,
  type RedisMin,
} from "../lib/ratelimit.ts";

/** Fake Redis em memória — mesmo contrato incr/get/pexpire/pttl/pexpireat.
 *  O relógio é injetado (`agora`) para os testes serem independentes
 *  do Date.now() real — nunca ler o relógio do sistema aqui. */
class FakeRedis implements RedisMin {
  store = new Map<string, { v: number; expiraEm?: number }>();
  listas = new Map<string, string[]>();
  falhar = false;
  agora: () => number;

  constructor(agora: () => number = () => Date.now()) {
    this.agora = agora;
  }

  private entry(key: string) {
    let e = this.store.get(key);
    if (e?.expiraEm && e.expiraEm <= this.agora()) {
      this.store.delete(key);
      e = undefined;
    }
    if (!e) {
      e = { v: 0 };
      this.store.set(key, e);
    }
    return e;
  }
  private maybeFail() {
    if (this.falhar) throw new Error("redis em baixo");
  }
  async incr(key: string) {
    this.maybeFail();
    return ++this.entry(key).v;
  }
  async decr(key: string) {
    this.maybeFail();
    return --this.entry(key).v;
  }
  async get(key: string) {
    this.maybeFail();
    const e = this.store.get(key);
    if (!e || (e.expiraEm !== undefined && e.expiraEm <= this.agora()))
      return null;
    return e.v;
  }
  async pexpire(key: string, ms: number) {
    this.maybeFail();
    this.entry(key).expiraEm = this.agora() + ms;
    return 1;
  }
  async pttl(key: string) {
    this.maybeFail();
    const e = this.store.get(key);
    if (!e || (e.expiraEm !== undefined && e.expiraEm <= this.agora()))
      return -2; // chave não existe (expirada)
    return e.expiraEm !== undefined ? e.expiraEm - this.agora() : -1;
  }
  async pexpireat(key: string, unixMs: number) {
    this.maybeFail();
    this.entry(key).expiraEm = unixMs;
    return 1;
  }
  async rpush(key: string, ...values: string[]) {
    this.maybeFail();
    const l = this.listas.get(key) ?? [];
    l.push(...values);
    this.listas.set(key, l);
    return l.length;
  }
  async lrange(key: string, start: number, stop: number) {
    this.maybeFail();
    const l = this.listas.get(key) ?? [];
    const ini = Math.max(0, start < 0 ? l.length + start : start);
    const fim = stop < 0 ? l.length + stop : stop;
    return l.slice(ini, fim + 1);
  }
  async ltrim(key: string, start: number, stop: number) {
    this.maybeFail();
    const l = this.listas.get(key) ?? [];
    const ini = Math.max(0, start < 0 ? l.length + start : start);
    const fim = stop < 0 ? l.length + stop : stop;
    this.listas.set(key, l.slice(ini, fim + 1));
    return "OK";
  }
}

test("dentro do limite: todos passam e 'restantes' desce", () => {
  const l = new MemoryRateLimiter();
  const t0 = 1_000_000;
  for (let i = 0; i < 5; i++) {
    const r = l.check("ip-a", 5, 60_000, t0 + i);
    assert.equal(r.ok, true);
    assert.equal(r.restantes, 4 - i);
  }
});

test("a exceder: o pedido limite+1 falha com retryAfter", () => {
  const l = new MemoryRateLimiter();
  const t0 = 1_000_000;
  for (let i = 0; i < 3; i++) l.check("ip-b", 3, 60_000, t0 + i);
  const r = l.check("ip-b", 3, 60_000, t0 + 3);
  assert.equal(r.ok, false);
  assert.ok(r.retryAfterSec > 0 && r.retryAfterSec <= 60);
  // E continua bloqueado dentro da janela
  assert.equal(l.check("ip-b", 3, 60_000, t0 + 1000).ok, false);
});

test("janela a expirar: passado o tempo, o contador reinicia", () => {
  const l = new MemoryRateLimiter();
  const t0 = 1_000_000;
  for (let i = 0; i < 3; i++) l.check("ip-c", 3, 60_000, t0 + i);
  const r = l.check("ip-c", 3, 60_000, t0 + 61_000);
  assert.equal(r.ok, true);
  assert.equal(r.restantes, 2);
});

test("IPs diferentes não partilham o contador", () => {
  const l = new MemoryRateLimiter();
  const t0 = 1_000_000;
  l.check("ip-x", 1, 60_000, t0);
  assert.equal(l.check("ip-x", 1, 60_000, t0).ok, false);
  assert.equal(l.check("ip-y", 1, 60_000, t0).ok, true);
});

test("hashIp: não devolve o IP em claro e é determinístico", () => {
  const h = hashIp("203.0.113.10");
  assert.equal(h, hashIp("203.0.113.10"));
  assert.notEqual(h, hashIp("203.0.113.11"));
  assert.ok(!h.includes("203"));
  assert.equal(h.length, 24);
});

test("teto diário: acima do limite deixa de haver quota (KeywordEngine)", () => {
  const c = new ContadorDiario();
  const t0 = Date.UTC(2026, 9, 1, 10, 0, 0);
  assert.equal(c.verificar(3, true, t0), true);
  assert.equal(c.verificar(3, true, t0), true);
  assert.equal(c.verificar(3, true, t0), true);
  assert.equal(c.verificar(3, false, t0), false); // esgotou
  assert.equal(c.verificar(3, true, t0), false);
});

test("teto diário: ao mudar de dia UTC o contador reinicia", () => {
  const c = new ContadorDiario();
  const dia1 = Date.UTC(2026, 9, 1, 23, 0, 0);
  const dia2 = Date.UTC(2026, 9, 2, 1, 0, 0);
  c.verificar(1, true, dia1);
  assert.equal(c.verificar(1, false, dia1), false);
  assert.equal(c.verificar(1, true, dia2), true); // novo dia
});

// --- backend Redis (Upstash) ------------------------------------------------

test("Upstash: dentro do limite passa e restantes desce", async () => {
  const l = new UpstashRateLimiter(new FakeRedis(), new MemoryRateLimiter());
  for (let i = 0; i < 5; i++) {
    const r = await l.check("ip-a", 5, 60_000);
    assert.equal(r.ok, true);
    assert.equal(r.restantes, 4 - i);
  }
});

test("Upstash: a exceder devolve 429 com retryAfter do TTL", async () => {
  const redis = new FakeRedis();
  const l = new UpstashRateLimiter(redis, new MemoryRateLimiter());
  for (let i = 0; i < 3; i++) await l.check("ip-b", 3, 60_000);
  const r = await l.check("ip-b", 3, 60_000);
  assert.equal(r.ok, false);
  assert.ok(r.retryAfterSec > 0 && r.retryAfterSec <= 60);
});

test("Upstash: chave tem TTL da janela (pexpire na 1.ª contagem)", async () => {
  const t0 = Date.UTC(2026, 9, 1, 10, 0, 0);
  const redis = new FakeRedis(() => t0);
  const l = new UpstashRateLimiter(redis, new MemoryRateLimiter());
  await l.check("ip-ttl", 5, 60_000, t0);
  const e = redis.store.get("ze:rl:ip-ttl");
  assert.equal(e?.expiraEm, t0 + 60_000);
});

test("Upstash em baixo: fail-open para memória (pedido passa)", async () => {
  const redis = new FakeRedis();
  redis.falhar = true;
  const mem = new MemoryRateLimiter();
  const l = new UpstashRateLimiter(redis, mem);
  const r = await l.check("ip-z", 2, 60_000);
  assert.equal(r.ok, true); // degradou sem erro
  // E o fallback conta mesmo (2.º do mesmo IP ainda conta na memória)
  assert.equal((await l.check("ip-z", 2, 60_000)).restantes, 0);
});

for (const t0 of [
  Date.UTC(2026, 9, 1, 10, 0, 0),
  Date.UTC(2030, 5, 15, 10, 0, 0),
  Date.UTC(2024, 0, 31, 23, 30, 0),
]) {
  test(`Contador diário Redis: conta, esgota e expira à meia-noite UTC (t0=${new Date(t0).toISOString()})`, async () => {
    const redis = new FakeRedis(() => t0);
    const c = new ContadorDiarioRedis(redis);
    const dia = new Date(t0).toISOString().slice(0, 10);
    assert.equal(await c.verificar(2, true, t0), true);
    assert.equal(await c.verificar(2, true, t0), true);
    assert.equal(await c.verificar(2, false, t0), false); // esgotou
    const meiaNoite = new Date(t0);
    meiaNoite.setUTCHours(24, 0, 0, 0);
    const e = redis.store.get(`ze:llm:${dia}`);
    assert.equal(e?.expiraEm, meiaNoite.getTime());
    // passada a meia-noite UTC, a chave expira e o contador reinicia
    const dia2 = meiaNoite.getTime() + 60_000;
    const redis2 = new FakeRedis(() => dia2);
    redis2.store = redis.store;
    const c2 = new ContadorDiarioRedis(redis2);
    assert.equal(await c2.verificar(2, true, dia2), true);
  });
}

test("Contador diário Redis em baixo: fail-closed → KeywordEngine", async () => {
  const redis = new FakeRedis();
  redis.falhar = true;
  const c = new ContadorDiarioRedis(redis);
  assert.equal(await c.verificar(500, false), false);
  assert.equal(await c.verificar(500, true), false);
});

test("reserva atómica: N concorrentes no último slot → só 1 passa", async () => {
  const t0 = Date.UTC(2026, 9, 1, 10, 0, 0);
  const redis = new FakeRedis(() => t0);
  const c = new ContadorDiarioRedis(redis);
  const LIMITE = 5;
  for (let i = 0; i < LIMITE - 1; i++) await c.verificar(LIMITE, true, t0);
  const ok = (
    await Promise.all(
      Array.from({ length: 20 }, () => c.verificar(LIMITE, true, t0))
    )
  ).filter(Boolean).length;
  assert.equal(ok, 1);
});

test("libertar devolve a reserva e nunca desce abaixo de 0", async () => {
  const t0 = Date.UTC(2026, 9, 1, 10, 0, 0);
  const redis = new FakeRedis(() => t0);
  const c = new ContadorDiarioRedis(redis);
  const dia = new Date(t0).toISOString().slice(0, 10);
  assert.equal(await c.verificar(1, true, t0), true); // esgota
  assert.equal(await c.verificar(1, true, t0), false);
  await c.libertar(t0); // devolve o slot
  assert.equal(await c.verificar(1, true, t0), true); // há quota outra vez
  await c.libertar(t0); // 1 → 0
  await c.libertar(t0); // já a 0: prende, nunca fica negativo
  assert.equal(redis.store.get(`ze:llm:${dia}`)?.v, 0);
});

test("libertar usa o dia da reserva — não debita o dia seguinte", async () => {
  const fimDia1 = Date.UTC(2026, 9, 1, 23, 59, 59);
  const inicioDia2 = Date.UTC(2026, 9, 2, 0, 0, 1);
  const redis = new FakeRedis(() => inicioDia2);
  const c = new ContadorDiarioRedis(redis);
  // O dia 2 já tem uma reserva gasta.
  assert.equal(await c.verificar(2, true, inicioDia2), true);
  // Reserva feita no dia 1 devolvida no dia 2: vai à chave do dia 1
  // (já expirada) e deixa o contador do dia 2 intacto.
  await c.libertar(fimDia1);
  const dia2 = new Date(inicioDia2).toISOString().slice(0, 10);
  assert.equal(redis.store.get(`ze:llm:${dia2}`)?.v, 1);
  // A chave zombie do dia 1 fica expirada — GET devolve null (em Redis
  // real o PEXPIREAT no passado apaga-a de imediato).
  const dia1 = new Date(fimDia1).toISOString().slice(0, 10);
  assert.equal(await redis.get(`ze:llm:${dia1}`), null);
});

test("limite inválido (NaN): fail-closed nos dois backends", async () => {
  const c = new ContadorDiarioRedis(new FakeRedis());
  assert.equal(await c.verificar(NaN, false), false);
  assert.equal(await c.verificar(NaN, true), false);
  const mem = new ContadorDiario();
  assert.equal(mem.verificar(NaN, false), false);
  assert.equal(mem.verificar(NaN, true), false);
});

test("libertar em baixo não lança (a resposta ao utilizador não parte)", async () => {
  const redis = new FakeRedis();
  redis.falhar = true;
  const c = new ContadorDiarioRedis(redis);
  await c.libertar(); // só regista o erro
});

test("ContadorDiario (memória): libertar devolve quota sem ir abaixo de 0", () => {
  const c = new ContadorDiario();
  const t0 = Date.UTC(2026, 9, 1, 10, 0, 0);
  assert.equal(c.verificar(1, true, t0), true);
  assert.equal(c.verificar(1, true, t0), false);
  c.libertar(t0);
  assert.equal(c.verificar(1, true, t0), true);
  c.libertar(t0);
  assert.equal(c.total, 0);
});
