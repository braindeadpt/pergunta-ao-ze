import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MemoryRateLimiter,
  ContadorDiario,
  hashIp,
} from "../lib/ratelimit.ts";

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
