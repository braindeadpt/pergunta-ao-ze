import { test } from "node:test";
import assert from "node:assert/strict";
import {
  anonimizar,
  guardarSemResposta,
  lerSemResposta,
  MAX_SEM_POR_DIA,
  TTL_SEM_MS,
} from "../lib/semresposta.ts";
import type { RedisMin } from "../lib/ratelimit.ts";

/** Fake mínimo com listas, para testar guardar/ler sem Redis real. */
class FakeRedis implements RedisMin {
  listas = new Map<string, string[]>();
  expira = new Map<string, number>();
  falhar = false;
  async incr() {
    return 0;
  }
  async get() {
    return null;
  }
  async pexpire(key: string, ms: number) {
    if (this.falhar) throw new Error("redis em baixo");
    this.expira.set(key, ms);
    return 1;
  }
  async pttl() {
    return -1;
  }
  async pexpireat() {
    return 1;
  }
  async rpush(key: string, ...values: string[]) {
    if (this.falhar) throw new Error("redis em baixo");
    const l = this.listas.get(key) ?? [];
    l.push(...values);
    this.listas.set(key, l);
    return l.length;
  }
  async lrange(key: string, start: number, stop: number) {
    if (this.falhar) throw new Error("redis em baixo");
    const l = this.listas.get(key) ?? [];
    const ini = Math.max(0, start < 0 ? l.length + start : start);
    const fim = stop < 0 ? l.length + stop : stop;
    return l.slice(ini, fim + 1);
  }
  async ltrim(key: string, start: number, stop: number) {
    if (this.falhar) throw new Error("redis em baixo");
    const l = this.listas.get(key) ?? [];
    const ini = Math.max(0, start < 0 ? l.length + start : start);
    const fim = stop < 0 ? l.length + stop : stop;
    this.listas.set(key, l.slice(ini, fim + 1));
    return "OK";
  }
}

const T0 = Date.UTC(2026, 9, 25, 12, 0, 0);

// --- anonimizar ---------------------------------------------------------------

test("anonimizar: emails", () => {
  assert.equal(
    anonimizar("o meu email é joao.silva@gmail.com obrigado"),
    "o meu email é [removido] obrigado"
  );
});

test("anonimizar: NIF, NISS e nº documento (9 dígitos) e CC", () => {
  for (const seq of ["215780432", "11987654321", "123456789"]) {
    assert.ok(
      !/\d/.test(anonimizar(`nif ${seq} pf`)),
      `sequência ${seq} ficou exposta`
    );
  }
});

test("anonimizar: telefones — seguidos, espaçados e com +351", () => {
  for (const tel of ["963123456", "963 123 456", "+351 912 345 678", "211-950-500"]) {
    const out = anonimizar(`liga-me ${tel} quando puderes`);
    assert.ok(!/963|912|211|345|950/.test(out), `${tel} ficou exposto em "${out}"`);
  }
});

test("anonimizar: qualquer sequência de 6+ dígitos", () => {
  assert.equal(anonimizar("bilhete 1234567"), "bilhete [removido]");
  // menos de 6 dígitos soltos ficam (datas, preços, nº de porta…)
  assert.equal(anonimizar("paguei 25 euros em 2026"), "paguei 25 euros em 2026");
  assert.equal(anonimizar("vivo no nº 42"), "vivo no nº 42");
});

test("anonimizar: texto normal fica intacto", () => {
  const q = "como marco uma consulta no centro de saude?";
  assert.equal(anonimizar(q), q);
});

// --- guardar / ler ------------------------------------------------------------

test("guardar: entra na lista do dia anonimizada, com TTL 30d", async () => {
  const r = new FakeRedis();
  await guardarSemResposta(r, "renovar cc nif 215780432", T0);
  const lista = r.listas.get("ze:sem:2026-10-25")!;
  assert.equal(lista.length, 1);
  assert.equal(lista[0], "renovar cc nif [removido]");
  assert.equal(r.expira.get("ze:sem:2026-10-25"), TTL_SEM_MS);
});

test("guardar: nunca passa de 500 entradas por dia (fica com as recentes)", async () => {
  const r = new FakeRedis();
  for (let i = 0; i < MAX_SEM_POR_DIA + 50; i++) {
    await guardarSemResposta(r, `pergunta numero ${i}`, T0);
  }
  const lista = r.listas.get("ze:sem:2026-10-25")!;
  assert.equal(lista.length, MAX_SEM_POR_DIA);
  assert.ok(lista.at(-1)!.includes(`${MAX_SEM_POR_DIA + 49}`));
});

test("guardar: sem Redis é no-op; Redis em baixo não lança", async () => {
  await assert.doesNotReject(guardarSemResposta(null, "qualquer coisa", T0));
  const r = new FakeRedis();
  r.falhar = true;
  await assert.doesNotReject(guardarSemResposta(r, "qualquer coisa", T0));
});

test("ler: agrega por frequência nos últimos N dias", async () => {
  const r = new FakeRedis();
  const dia = (n: number) => {
    const d = new Date(T0);
    d.setUTCDate(d.getUTCDate() - n);
    return d.getTime();
  };
  await guardarSemResposta(r, "visto de trabalho", dia(0));
  await guardarSemResposta(r, "visto de trabalho", dia(1));
  await guardarSemResposta(r, "visto de trabalho", dia(1));
  await guardarSemResposta(r, "cartao verde", dia(2));
  await guardarSemResposta(r, "fora do intervalo", Date.UTC(2026, 8, 1));

  const top = await lerSemResposta(r, 7, T0);
  assert.deepEqual(top, [
    { pergunta: "visto de trabalho", n: 3 },
    { pergunta: "cartao verde", n: 1 },
  ]);
});
