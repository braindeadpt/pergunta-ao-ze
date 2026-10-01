"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Pergunta, Tema } from "@/lib/types";
import type { Sugestao } from "@/lib/engine";
import { detetarIdioma, idiomaDoNavegador, type Lang } from "@/lib/i18n";
import { contactosDeFontes } from "@/lib/contactos";
import { TEMAS } from "@/lib/data/temas";
import ZePersonagem from "@/components/ZePersonagem";
import SenhaTema from "@/components/SenhaTema";

/* DESIGN.md §9 — frases de balcão a rodar durante o loading */
const FRASES_BALCAO = [
  "A procurar no arquivo…",
  "A pedir carimbo ao chefe…",
  "A fotocopiar em triplicado…",
  "A perguntar ao colega do balcão 3…",
];

const FRASES_BALCAO_EN = [
  "Searching the archive…",
  "Asking the boss for a stamp…",
  "Photocopying in triplicate…",
  "Asking the colleague at counter 3…",
];

/* Mensagens do próprio chat — PT por defeito, EN quando a língua ativa é EN */
const TXT = {
  pt: {
    frases: FRASES_BALCAO,
    erroMsg: "Algo falhou ao contactar o servidor — a culpa não é tua.",
    tentar: "Tentar de novo",
    limiteMsg:
      "Demasiados pedidos seguidos desta ligação — o balcão precisa de respirar.",
    limiteDepois: (s: number) =>
      s >= 90
        ? `Tenta de novo daqui a ~${Math.ceil(s / 60)} min.`
        : `Tenta de novo daqui a ${s}s.`,
    semRes1: "Esta pergunta ficou presa na tutela — nem o Zé chega lá. Tenta reformular, ou abre o",
    semRes2: ". Estas talvez ajudem:",
    relacionadas: "Perguntas relacionadas:",
    fontes: "Fontes oficiais",
    ligar: "Ligar:",
    ia: "gerada por IA",
    anuncioOk: "Resposta recebida.",
    anuncioLimite: "Limite de pedidos. Tenta de novo mais tarde.",
    anuncioErro: "Falha ao obter resposta.",
  },
  en: {
    frases: FRASES_BALCAO_EN,
    erroMsg: "Something went wrong contacting the server — it's not your fault.",
    tentar: "Try again",
    limiteMsg: "Too many requests from this connection — the counter needs a breather.",
    limiteDepois: (s: number) =>
      s >= 90
        ? `Try again in ~${Math.ceil(s / 60)} min.`
        : `Try again in ${s}s.`,
    semRes1: "This question got stuck in the pipeline — even Zé can't reach it. Try rephrasing, or open",
    semRes2: ". These might help:",
    relacionadas: "Related questions:",
    fontes: "Official sources",
    ligar: "Call:",
    ia: "AI-generated",
    anuncioOk: "Response received.",
    anuncioLimite: "Request limit reached. Try again later.",
    anuncioErro: "Failed to get an answer.",
  },
} as const;

/** Aviso sempre visível numa resposta traduzida — nunca escondido */
const AVISO_TRADUCAO =
  "Automatically translated. Always confirm on the official Portuguese source.";
const AVISO_SO_PT =
  "This answer is only available in Portuguese — showing the original.";

/* Senhas-sugestão do estado vazio */
const SUGESTOES_IDS = [
  "cartao-de-cidadao",
  "sns",
  "irs-financas",
  "carta-conducao-imt",
];

type Mensagem =
  | { papel: "utilizador"; texto: string }
  | {
      papel: "ze";
      tipo: "resposta" | "sugestoes" | "erro" | "limite";
      pergunta?: Pergunta;
      tema?: Tema;
      sugestoes: Sugestao[];
      via?: "keyword" | "llm";
      retryAte?: number;
      langUsada?: Lang;
      idioma?: Lang;
      soEmPt?: boolean;
    };

export default function Chat() {
  const params = useSearchParams();
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [input, setInput] = useState("");
  const [aCarregar, setACarregar] = useState(false);
  const [fraseIdx, setFraseIdx] = useState(0);
  const [batendo, setBatendo] = useState(false);
  const [movel, setMovel] = useState(false);
  const [tick, setTick] = useState(0);
  // "auto" = deteção por pergunta; PT/EN fixa a escolha e prevalece sempre
  const [langSel, setLangSel] = useState<"auto" | Lang>("auto");
  const ultimaLang = useRef<Lang>("pt");
  const ultimaPergunta = useRef("");
  const senhaN = useRef(0);
  const fim = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLDivElement>(null);
  const [padBaixo, setPadBaixo] = useState(176);
  const enviado = useRef(false);
  const anuncio = useRef<HTMLParagraphElement>(null);

  // Padding inferior = altura real da barra + 16px (a última senha nunca fica tapada)
  useEffect(() => {
    const el = barra.current;
    if (!el) return;
    const mede = () => setPadBaixo(el.offsetHeight + 16);
    mede();
    const ro = new ResizeObserver(mede);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Frases de balcão a rodar durante o loading
  useEffect(() => {
    if (!aCarregar) {
      setFraseIdx(0);
      return;
    }
    const t = setInterval(() => setFraseIdx((i) => (i + 1) % FRASES_BALCAO.length), 2000);
    return () => clearInterval(t);
  }, [aCarregar]);

  useEffect(() => {
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    fim.current?.scrollIntoView({ behavior: suave ? "smooth" : "auto" });
  }, [mensagens, aCarregar]);

  // Countdown do 429 — só corre enquanto houver uma mensagem "limite" ativa
  useEffect(() => {
    const ativa = mensagens.some(
      (m) => m.papel === "ze" && m.tipo === "limite" && (m.retryAte ?? 0) > Date.now()
    );
    if (!ativa) return;
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [mensagens, tick]);

  // Preferência persistida + língua inicial = a do navegador
  useEffect(() => {
    ultimaLang.current = idiomaDoNavegador();
    const guardada = localStorage.getItem("ze-lang");
    if (guardada === "pt" || guardada === "en") setLangSel(guardada);
  }, []);

  useEffect(() => {
    localStorage.setItem("ze-lang", langSel);
  }, [langSel]);

  /** Língua efetiva de uma pergunta: seletor > heurística > última língua > navegador */
  function langDaPergunta(q: string): Lang {
    if (langSel !== "auto") return langSel;
    const detetada = detetarIdioma(q);
    return detetada ?? ultimaLang.current;
  }

  async function perguntar(texto: string) {
    const q = texto.trim();
    if (!q || aCarregar) return;
    const lang = langDaPergunta(q);
    ultimaLang.current = lang;
    ultimaPergunta.current = q;
    senhaN.current += 1;
    setMensagens((m) => [...m, { papel: "utilizador", texto: q }]);
    setInput("");
    setACarregar(true);
    const T = TXT[lang];
    try {
      const res = await fetch("/api/responder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta: q, lang }),
      });
      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        const seg = Math.min(Math.max(Number(data.retryAfter) || 60, 5), 900);
        setMensagens((m) => [
          ...m,
          { papel: "ze", tipo: "limite", retryAte: Date.now() + seg * 1000, sugestoes: [], langUsada: lang },
        ]);
        anuncio.current && (anuncio.current.textContent = T.anuncioLimite);
        return;
      }
      if (!res.ok) throw new Error(`resposta ${res.status}`);
      const data = await res.json();
      setMensagens((m) => [
        ...m,
        { papel: "ze", tipo: data.tipo ?? "sugestoes", pergunta: data.pergunta, tema: data.tema, sugestoes: data.sugestoes ?? [], via: data.via, langUsada: lang, idioma: data.idioma, soEmPt: data.soEmPt },
      ]);
      // Anuncia a chegada da resposta a leitores de ecrã
      anuncio.current && (anuncio.current.textContent = T.anuncioOk);
    } catch {
      setMensagens((m) => [...m, { papel: "ze", tipo: "erro", sugestoes: [], langUsada: lang }]);
      anuncio.current && (anuncio.current.textContent = T.anuncioErro);
    } finally {
      setACarregar(false);
    }
  }

  // O carimbo ENVIAR bate antes de submeter
  const carimbar = () => {
    if (!input.trim() || aCarregar) return;
    setBatendo(true);
    setTimeout(() => {
      setBatendo(false);
      perguntar(input);
    }, 220);
  };

  // Placeholder curto em ecrãs pequenos
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const atualiza = () => setMovel(mq.matches);
    atualiza();
    mq.addEventListener("change", atualiza);
    return () => mq.removeEventListener("change", atualiza);
  }, []);

  useEffect(() => {
    const q = params.get("q");
    if (q && !enviado.current) {
      enviado.current = true;
      perguntar(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  let senhaVisivel = 0;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4">
      {/* Região de anúncio para leitores de ecrã — resposta recebida / erro */}
      <p ref={anuncio} aria-live="polite" className="sr-only" />

      <div
        className="flex-1 space-y-6 pt-8"
        style={{ paddingBottom: padBaixo }}
      >
        {mensagens.length === 0 && (
          <div className="pt-4 sm:pt-8">
            <div className="text-center">
              <ZePersonagem estado="aliviado" className="mx-auto w-60" />
              <p className="mt-4 font-display text-3xl uppercase tracking-tight sm:text-4xl">
                Olá, sou o Zé.
              </p>
              <p aria-hidden className="mx-auto mt-3 max-w-md font-mono text-xs uppercase leading-relaxed tracking-wider text-stone-600">
                Balcão aberto · sem senha · sem fila
              </p>
              <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-stone-700">
                Pergunta-me sobre serviços públicos portugueses — documentos,
                impostos, saúde, trabalho, empresa. Já li os guias chatos por ti.
              </p>
            </div>
            {/* Senhas-sugestão — os mesmos talões da home */}
            <p className="mt-8 text-center font-mono text-sm font-bold uppercase tracking-[0.2em] text-carimbo-tinta">
              ▸ Ou tira uma senha
            </p>
            <div className="mx-auto mt-5 grid max-w-2xl gap-6 sm:grid-cols-2">
              {SUGESTOES_IDS.map((id, j) => {
                const tema = TEMAS.find((t) => t.id === id);
                if (!tema) return null;
                return (
                  <SenhaTema
                    key={id}
                    tema={tema}
                    i={j}
                    fundo="#faf6ec"
                    numero={`Z-${String(j + 1).padStart(3, "0")}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {mensagens.map((m, i) => {
          if (m.papel === "utilizador") {
            senhaVisivel += 1;
            return (
              <div key={i} className="animate-fade-in-up flex justify-end">
                <div className="max-w-[85%] border-2 border-ink bg-band-verde text-white shadow-[3px_3px_0_#1b1d22]">
                  {/* Cabeçalho de talão — decorativo */}
                  <div aria-hidden className="flex items-center justify-between gap-6 border-b-2 border-dashed border-white/40 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white/80">
                    <span>Senha Z-{String(senhaVisivel).padStart(3, "0")}</span>
                    <span>Cidadão</span>
                  </div>
                  <p className="px-4 py-3 text-base">{m.texto}</p>
                </div>
              </div>
            );
          }
          const T = TXT[m.langUsada ?? "pt"];
          return (
            <div key={i} className="animate-fade-in-up flex gap-3">
              <ZePersonagem
                estado={
                  m.tipo === "resposta" ? "carimbar" : m.tipo === "sugestoes" ? "panico" : "normal"
                }
                className="mt-1 hidden w-28 shrink-0 self-start lg:block"
              />
              <div className="relative min-w-0 flex-1 rounded-lg rounded-tl-sm border-2 border-ink bg-white px-5 py-4 shadow-[3px_3px_0_#1b1d22] lg:max-w-[85%]">
                {m.tipo === "resposta" && (
                  <span
                    aria-hidden
                    className="carimbo stamp-batendo absolute -right-2 -top-4 rotate-[7deg] bg-white text-xs"
                  >
                    Deferido
                  </span>
                )}
                {m.tipo === "erro" ? (
                  <>
                    <p className="text-base">{T.erroMsg}</p>
                    <button
                      onClick={() => ultimaPergunta.current && perguntar(ultimaPergunta.current)}
                      className="btn-outline mt-3 px-4 py-2 text-sm"
                    >
                      {T.tentar}
                    </button>
                  </>
                ) : m.tipo === "limite" ? (
                  <>
                    <p className="text-base">
                      {T.limiteMsg}{" "}
                      {(() => {
                        const s = Math.max(
                          0,
                          Math.ceil(((m.retryAte ?? 0) - Date.now()) / 1000)
                        );
                        return T.limiteDepois(s);
                      })()}
                    </p>
                    <button
                      onClick={() => ultimaPergunta.current && perguntar(ultimaPergunta.current)}
                      disabled={(m.retryAte ?? 0) > Date.now()}
                      className="btn-outline mt-3 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {T.tentar}
                    </button>
                  </>
                ) : m.tipo === "resposta" && m.pergunta ? (
                  <>
                    <p aria-hidden className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-stone-600">
                      {m.tema?.entidade} · {m.tema?.titulo}
                      {m.via === "llm" && (
                        <span className="rounded-md border border-azulejo/50 bg-azulejo-suave px-2 py-0.5 text-xs font-bold text-azulejo">
                          {T.ia}
                        </span>
                      )}
                    </p>
                    {m.idioma === "en" && (
                      <p className="mt-3 rounded-md border-2 border-dashed border-azulejo/50 bg-azulejo-suave/40 px-3 py-2 font-mono text-xs uppercase tracking-wider text-esferografica">
                        {AVISO_TRADUCAO}
                      </p>
                    )}
                    {m.soEmPt && (
                      <p className="mt-3 rounded-md border-2 border-dashed border-stone-300 bg-stone-50 px-3 py-2 font-mono text-xs uppercase tracking-wider text-stone-600">
                        {AVISO_SO_PT}
                      </p>
                    )}
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
                      {m.pergunta.resposta.passos.map((p, j) => (
                        <li key={j}>{p}</li>
                      ))}
                    </ul>
                    {m.pergunta.resposta.nota && (
                      <p className="mt-3 rounded-md border-2 border-dashed border-amber-400/60 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                        {m.pergunta.resposta.nota}
                      </p>
                    )}
                    <div className="mt-4 space-y-2 border-t-2 border-dashed border-ink/15 pt-3">
                      <p className="font-mono text-sm font-bold uppercase tracking-widest text-esferografica">
                        {T.fontes}
                      </p>
                      {m.pergunta.resposta.fontes.map((f, j) => (
                        <a
                          key={j}
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-md border-2 border-azulejo/40 px-3 py-2 text-sm transition-colors hover:bg-azulejo-suave"
                        >
                          <span className="font-medium text-azulejo">
                            {j + 1}. {f.titulo}
                          </span>
                          <span aria-hidden className="shrink-0 font-mono text-xs text-stone-500">
                            {f.dominio} ↗
                          </span>
                        </a>
                      ))}
                    </div>
                    {(() => {
                      const linhas = contactosDeFontes(m.pergunta.resposta.fontes);
                      if (linhas.length === 0) return null;
                      return (
                        <div className="mt-3 space-y-1 rounded-md border-2 border-dashed border-ink/20 bg-stone-50 px-3 py-2.5 text-sm text-stone-700">
                          {linhas.map((c) => (
                            <p key={c.telefone}>
                              <span className="font-mono text-sm font-bold uppercase tracking-wider text-ink">
                                {T.ligar}
                              </span>{" "}
                              {c.telefone}
                              {c.horario && (
                                <span className="text-stone-500">
                                  {" "}
                                  — {c.horario}
                                </span>
                              )}
                            </p>
                          ))}
                        </div>
                      );
                    })()}
                  </>
                ) : (
                  <>
                    <p className="text-base">
                      {T.semRes1}{" "}
                      <a
                        href="https://eportugal.gov.pt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-azulejo underline underline-offset-2"
                      >
                        ePortugal ↗
                      </a>
                      {T.semRes2}
                    </p>
                    <div className="mt-3 flex flex-col gap-2">
                      {m.sugestoes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => perguntar(s.texto)}
                          className="rounded-md border-2 border-dashed border-ink/30 px-3 py-2 text-left text-sm transition-colors hover:border-ink hover:bg-form-amarelo/20"
                        >
                          <span aria-hidden className="font-mono text-xs font-bold uppercase tracking-widest text-stone-600">
                            {s.tema}
                          </span>
                          <br />
                          {s.texto}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {m.sugestoes.length > 0 && m.tipo === "resposta" && (
                  <div className="mt-4">
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-stone-600">
                      {T.relacionadas}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.sugestoes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => perguntar(s.texto)}
                          className="chip-sm"
                        >
                          {s.texto}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {aCarregar && (
          <div className="animate-fade-in-up flex gap-3">
            <div className="flex items-center gap-4 rounded-lg rounded-tl-sm border-2 border-ink bg-white px-5 py-4 shadow-[3px_3px_0_#1b1d22]">
              <ZePersonagem estado="pensar" className="w-24 shrink-0" />
              <p
                key={fraseIdx}
                className="animate-fade-in-up font-mono text-sm text-stone-600"
                aria-live="polite"
              >
                {TXT[ultimaLang.current].frases[fraseIdx]}
              </p>
            </div>
          </div>
        )}
        <div ref={fim} />
      </div>

      {/* FORMULÁRIO Z-01 — a mesma família visual da home */}
      <div ref={barra} className="sticky bottom-0 border-t-2 border-ink bg-paper py-4">
        <div className="rounded-lg border-2 border-ink bg-white shadow-[4px_4px_0_#1b1d22] focus-within:shadow-[5px_5px_0_#1b1d22]">
          <div className="flex items-center justify-between border-b-2 border-dashed border-ink/20 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-stone-600">
            <span aria-hidden>Formulário Z-01</span>
            <div className="flex items-center gap-1.5 normal-case tracking-normal">
              {/* Seletor PT|EN — fixa a língua das respostas; "auto" deteta por pergunta */}
              <span className="sr-only">Idioma das respostas</span>
              {(["pt", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={langSel === l}
                  title={
                    l === "pt"
                      ? "Respostas em português (clique de novo para deteção automática)"
                      : "Answers in English (click again for auto-detect)"
                  }
                  onClick={() => setLangSel((s) => (s === l ? "auto" : l))}
                  className={`transition-all ${
                    langSel === l
                      ? "carimbo bg-white"
                      : "rounded border-2 border-stone-300 px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-stone-400 hover:border-stone-500 hover:text-stone-600"
                  }`}
                >
                  {l}
                </button>
              ))}
              <span aria-hidden className="text-stone-400">
                {langSel === "auto" ? "· auto" : ""}
              </span>
            </div>
          </div>
          <div className="flex items-end gap-2 p-2">
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  carimbar();
                }
              }}
              rows={1}
              placeholder={movel ? "Pergunta ao Zé…" : "A tua pergunta para o Zé"}
              aria-label="A tua pergunta para o Zé"
              className="max-h-32 flex-1 resize-none overflow-auto bg-transparent px-3 py-2 text-base outline-none placeholder:text-stone-400"
            />
            {/* O botão de envio É um carimbo — bate ao submeter */}
            <button
              onClick={carimbar}
              disabled={!input.trim() || aCarregar}
              aria-label="Enviar pergunta"
              className={`carimbo shrink-0 px-3 py-2 text-sm ${
                batendo ? "stamp-batendo" : ""
              } bg-white disabled:cursor-not-allowed disabled:border-stone-500 disabled:text-stone-600 disabled:bg-stone-100`}
              style={{ transform: "rotate(-7deg)" }}
            >
              <span className="hidden sm:inline">Enviar </span>→
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-sm text-stone-600">
          Projeto independente — o Zé aponta para páginas oficiais, mas a
          informação pode ficar desatualizada. Confirma sempre na fonte.
        </p>
      </div>
    </div>
  );
}
