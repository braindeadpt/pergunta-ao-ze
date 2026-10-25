import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { LlmEngine } from "../lib/engine.ts";

const PERGUNTA = "Como renovo o Cartão de Cidadão?";

let chamadas = 0;
let fetchOriginal: typeof globalThis.fetch;

function fetchCom(conteudo: unknown) {
  return async () => {
    chamadas++;
    return {
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content:
                typeof conteudo === "string" ? conteudo : JSON.stringify(conteudo),
            },
          },
        ],
      }),
    } as Response;
  };
}

const fetchLento: typeof globalThis.fetch = (_url, init) =>
  new Promise<Response>((_, rej) => {
    init?.signal?.addEventListener("abort", () =>
      rej(Object.assign(new Error("abortado"), { name: "AbortError" }))
    );
    // nunca resolve sozinho — só o abort do timeout o despacha
  });

function engine() {
  return new LlmEngine({
    baseUrl: "http://llm-falso",
    apiKey: "teste",
    models: ["modelo-x"],
    timeoutMs: 50,
  });
}

beforeEach(() => {
  chamadas = 0;
  fetchOriginal = globalThis.fetch;
});
afterEach(() => {
  globalThis.fetch = fetchOriginal;
});

test("llm: resposta válida mantém o id curado, via=llm e sugestões", async () => {
  globalThis.fetch = fetchCom({
    passos: [
      "Online no ePortugal, se tens 25 anos ou mais e Chave Móvel Digital.",
      "Presencial num Espaço de Registos ou Loja do Cidadão, com agendamento no Siga.",
    ],
    nota: "Podes renovar antes de caducar.",
    fontes: ["F1"],
  });
  const r = await engine().responder(PERGUNTA);
  assert.equal(chamadas, 1);
  assert.equal(r.tipo, "resposta");
  assert.equal(r.via, "llm");
  // o id é o da pergunta curada — /p/cc-renovar existe e a partilha funciona
  assert.equal(r.pergunta?.id, "cc-renovar");
  assert.ok(r.pergunta!.resposta.passos[0].includes("ePortugal"));
  assert.ok(r.pergunta!.resposta.fontes.length > 0);
  assert.ok(r.sugestoes.length <= 3);
});

test("llm: número inventado no output → descarta e cai no keyword", async () => {
  globalThis.fetch = fetchCom({
    passos: ["A renovação custa 999 euros em qualquer balcão."],
    nota: null,
    fontes: ["F1"],
  });
  const r = await engine().responder(PERGUNTA);
  assert.equal(r.tipo, "resposta");
  assert.equal(r.via, "keyword");
  assert.equal(r.pergunta?.id, "cc-renovar");
});

test("llm: URL inventado no output → descarta e cai no keyword", async () => {
  globalThis.fetch = fetchCom({
    passos: ["Agenda em renovar-cc-online.pt — rápido e seguro."],
    nota: null,
    fontes: [],
  });
  const r = await engine().responder(PERGUNTA);
  assert.equal(r.via, "keyword");
});

test("llm: JSON inválido → fallback keyword", async () => {
  globalThis.fetch = fetchCom("isto não é JSON de todo");
  const r = await engine().responder(PERGUNTA);
  assert.equal(r.via, "keyword");
});

test("llm: timeout → fallback keyword sem rebentar", async () => {
  globalThis.fetch = fetchLento;
  const r = await engine().responder(PERGUNTA);
  assert.equal(r.via, "keyword");
  assert.equal(r.pergunta?.id, "cc-renovar");
});

test("llm: match fraco (score < 2) nem chama o modelo → sugestões populares", async () => {
  globalThis.fetch = fetchCom({ passos: ["x"] });
  const r = await engine().responder("asdkfj qwerty zzzzz random");
  assert.equal(chamadas, 0);
  assert.equal(r.tipo, "sugestoes");
  assert.ok(r.sugestoes.length > 0);
});
