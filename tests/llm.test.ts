import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { LlmEngine } from "../lib/engine.ts";
import { TITULOS_EN } from "../lib/data/titulos.en.ts";
import { TEMAS_EN } from "../lib/data/temas.en.ts";

// Pergunta aberta/parafraseada para exercitar a chamada HTTP ao modelo
// (a pergunta curada exata faz curto-circuito em F-11).
const PERGUNTA =
  "Tenho mais de 25 anos e o meu Cartão de Cidadão vai caducar, posso tratar online?";

let chamadas = 0;
let modelosChamados: string[] = [];
let fetchOriginal: typeof globalThis.fetch;

function fetchCom(conteudo: unknown | ((model: string) => unknown)) {
  return async (_url: string | URL | Request, init?: RequestInit) => {
    chamadas++;
    const body = init?.body ? JSON.parse(String(init.body)) : {};
    if (typeof body.model === "string") modelosChamados.push(body.model);
    const payload =
      typeof conteudo === "function" ? conteudo(body.model) : conteudo;
    return {
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content:
                typeof payload === "string" ? payload : JSON.stringify(payload),
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

function engine(models = ["modelo-x"]) {
  return new LlmEngine({
    baseUrl: "http://llm-falso",
    apiKey: "teste",
    models,
    timeoutMs: 50,
  });
}

beforeEach(() => {
  chamadas = 0;
  modelosChamados = [];
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
  assert.equal(chamadas, 1);
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
  assert.equal(chamadas, 1);
  assert.equal(r.via, "keyword");
});

test("llm: JSON inválido → fallback keyword", async () => {
  globalThis.fetch = fetchCom("isto não é JSON de todo");
  const r = await engine().responder(PERGUNTA);
  assert.equal(chamadas, 1);
  assert.equal(r.via, "keyword");
});

test("llm: timeout → fallback keyword sem rebentar", async () => {
  globalThis.fetch = fetchLento;
  const r = await engine().responder(PERGUNTA);
  assert.equal(r.via, "keyword");
  assert.equal(r.pergunta?.id, "cc-renovar");
});

test("llm (F-04): match fraco (score < 2) nem chama o modelo e devolve via=keyword", async () => {
  globalThis.fetch = fetchCom({ passos: ["x"] });
  const r = await engine().responder("asdkfj qwerty zzzzz random");
  assert.equal(chamadas, 0);
  assert.equal(r.tipo, "sugestoes");
  assert.equal(r.via, "keyword");
  assert.notEqual(r.via, "llm");
  assert.ok(r.sugestoes.length > 0);

  const rEn = await engine().responder("asdkfj qwerty zzzzz random", "en");
  assert.equal(chamadas, 0);
  assert.equal(rEn.via, "keyword");
  for (const s of rEn.sugestoes) {
    assert.equal(s.texto, TITULOS_EN[s.id]);
    assert.notEqual(TEMAS_EN[s.id]?.revisao, true);
  }
});

test("llm (F-11): pergunta curada exata em PT e EN faz curto-circuito sem fetch", async () => {
  globalThis.fetch = fetchCom({ passos: ["não devia ser chamado"] });

  const rPt = await engine().responder("Como renovo o Cartão de Cidadão?", "pt");
  assert.equal(chamadas, 0);
  assert.equal(rPt.tipo, "resposta");
  assert.equal(rPt.via, "keyword");
  assert.equal(rPt.pergunta?.id, "cc-renovar");
  assert.ok(rPt.pergunta?.resposta.nota);

  const rEn = await engine().responder("How do I renew my Citizen Card?", "en");
  assert.equal(chamadas, 0);
  assert.equal(rEn.tipo, "resposta");
  assert.equal(rEn.via, "keyword");
  assert.equal(rEn.idioma, "en");
  assert.equal(rEn.pergunta?.id, "cc-renovar");
  assert.deepEqual(rEn.pergunta?.resposta.passos, TEMAS_EN["cc-renovar"].passos);
});

test("llm (F-03): entrada revisao: true (at-nif) em EN nunca é traduzida pelo LLM", async () => {
  globalThis.fetch = fetchCom({
    passos: ["Foreigners can get a NIF at any counter."],
    nota: null,
    fontes: ["F1"],
  });
  const r = await engine().responder(
    "I am a foreign citizen moving to Portugal, how do I get a NIF tax number?",
    "en"
  );
  assert.equal(chamadas, 0);
  assert.equal(r.tipo, "resposta");
  assert.equal(r.via, "keyword");
  assert.equal(r.pergunta?.id, "at-nif");
  assert.equal(r.idioma, "pt");
  assert.equal(r.soEmPt, true);
});

test("llm (F-03 + F-12): resposta EN gerada por LLM aplica normalizarRespostaEn e sugestões EN", async () => {
  globalThis.fetch = fetchCom({
    passos: [
      "Submit your IRS (Income Tax) declaration on the Portal das Finanças (Finance Website).",
      "Later check IRS (Tax) status again on Portal das Finanças.",
    ],
    nota: "Use Chave Móvel Digital (Mobile Key) to log in.",
    fontes: ["F1"],
  });
  const r = await engine().responder(
    "Can you explain how I submit my annual IRS declaration online?",
    "en"
  );
  assert.equal(chamadas, 1);
  assert.equal(r.tipo, "resposta");
  assert.equal(r.via, "llm");
  assert.equal(r.idioma, "en");
  assert.match(
    r.pergunta!.resposta.passos[0],
    /IRS \(Portuguese personal income tax\)/
  );
  assert.match(
    r.pergunta!.resposta.passos[0],
    /Portal das Finanças \(Tax Authority portal\)/
  );
  // 2.ª ocorrência não repete o gloss
  assert.doesNotMatch(r.pergunta!.resposta.passos[1], /IRS \(/);
  assert.match(
    r.pergunta!.resposta.nota ?? "",
    /Chave Móvel Digital \(Digital Mobile Key\)/
  );
  for (const s of r.sugestoes) {
    assert.equal(s.texto, TITULOS_EN[s.id]);
    assert.notEqual(TEMAS_EN[s.id]?.revisao, true);
  }
});

test("llm (F-27): passos: [] válido no 1.º modelo devolve sugestões sem chamar 2.º modelo", async () => {
  globalThis.fetch = fetchCom({
    passos: [],
    nota: "O contexto fornecido não cobre esta situação específica.",
    fontes: [],
  });
  const r = await engine(["modelo-primario", "modelo-fallback"]).responder(
    PERGUNTA
  );
  assert.equal(chamadas, 1);
  assert.deepEqual(modelosChamados, ["modelo-primario"]);
  assert.equal(r.tipo, "sugestoes");
  assert.ok(r.sugestoes.length > 0);
});

test("llm (F-27): JSON inválido no 1.º modelo continua a tentar o 2.º modelo fallback", async () => {
  globalThis.fetch = fetchCom((model: string) =>
    model === "modelo-primario"
      ? "resposta truncada sem json"
      : {
          passos: ["Online no ePortugal com Chave Móvel Digital."],
          nota: null,
          fontes: ["F1"],
        }
  );
  const r = await engine(["modelo-primario", "modelo-fallback"]).responder(
    PERGUNTA
  );
  assert.equal(chamadas, 2);
  assert.deepEqual(modelosChamados, ["modelo-primario", "modelo-fallback"]);
  assert.equal(r.tipo, "resposta");
  assert.equal(r.via, "llm");
});
