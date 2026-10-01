"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Pergunta, Tema } from "@/lib/types";
import type { Sugestao } from "@/lib/engine";
import { getContactoPorDominio } from "@/lib/data/fontes";
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
      tipo: "resposta" | "sugestoes" | "erro";
      pergunta?: Pergunta;
      tema?: Tema;
      sugestoes: Sugestao[];
      via?: "keyword" | "llm";
    };

export default function Chat() {
  const params = useSearchParams();
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [input, setInput] = useState("");
  const [aCarregar, setACarregar] = useState(false);
  const [fraseIdx, setFraseIdx] = useState(0);
  const [batendo, setBatendo] = useState(false);
  const [movel, setMovel] = useState(false);
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

  async function perguntar(texto: string) {
    const q = texto.trim();
    if (!q || aCarregar) return;
    ultimaPergunta.current = q;
    senhaN.current += 1;
    setMensagens((m) => [...m, { papel: "utilizador", texto: q }]);
    setInput("");
    setACarregar(true);
    try {
      const res = await fetch("/api/responder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta: q }),
      });
      const data = await res.json();
      setMensagens((m) => [
        ...m,
        { papel: "ze", tipo: data.tipo ?? "sugestoes", pergunta: data.pergunta, tema: data.tema, sugestoes: data.sugestoes ?? [], via: data.via },
      ]);
      // Anuncia a chegada da resposta a leitores de ecrã
      anuncio.current && (anuncio.current.textContent = "Resposta recebida.");
    } catch {
      setMensagens((m) => [...m, { papel: "ze", tipo: "erro", sugestoes: [] }]);
      anuncio.current && (anuncio.current.textContent = "Falha ao obter resposta.");
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

        {mensagens.map((m, i) =>
          m.papel === "utilizador" ? (
            (senhaVisivel += 1) && (
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
            )
          ) : (
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
                    <p className="text-base">
                      Algo falhou ao contactar o servidor — a culpa não é tua.
                    </p>
                    <button
                      onClick={() => ultimaPergunta.current && perguntar(ultimaPergunta.current)}
                      className="btn-outline mt-3 px-4 py-2 text-sm"
                    >
                      Tentar de novo
                    </button>
                  </>
                ) : m.tipo === "resposta" && m.pergunta ? (
                  <>
                    <p aria-hidden className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-stone-600">
                      {m.tema?.entidade} · {m.tema?.titulo}
                      {m.via === "llm" && (
                        <span className="rounded-md border border-azulejo/50 bg-azulejo-suave px-2 py-0.5 text-xs font-bold text-azulejo">
                          gerada por IA
                        </span>
                      )}
                    </p>
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
                        Fontes oficiais
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
                      const vistos = new Set<string>();
                      const linhas = m.pergunta.resposta.fontes
                        .map((f) => getContactoPorDominio(f.dominio))
                        .filter((c): c is NonNullable<typeof c> => {
                          if (!c || vistos.has(c.nome)) return false;
                          vistos.add(c.nome);
                          return true;
                        });
                      if (linhas.length === 0) return null;
                      return (
                        <div className="mt-3 space-y-1 rounded-md border-2 border-dashed border-ink/20 bg-stone-50 px-3 py-2.5 text-sm text-stone-700">
                          {linhas.map((c) => (
                            <p key={c.nome}>
                              <span className="font-mono text-sm font-bold uppercase tracking-wider text-ink">
                                Ligar:
                              </span>{" "}
                              {c.contacto.telefone}
                              {c.contacto.horario && (
                                <span className="text-stone-500">
                                  {" "}
                                  — {c.contacto.horario}
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
                      Esta pergunta ficou presa na tutela — nem o Zé chega lá.
                      Tenta reformular, ou abre o{" "}
                      <a
                        href="https://eportugal.gov.pt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-azulejo underline underline-offset-2"
                      >
                        ePortugal ↗
                      </a>
                      . Estas talvez ajudem:
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
                      Perguntas relacionadas:
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
          )
        )}

        {aCarregar && (
          <div className="animate-fade-in-up flex gap-3">
            <div className="flex items-center gap-4 rounded-lg rounded-tl-sm border-2 border-ink bg-white px-5 py-4 shadow-[3px_3px_0_#1b1d22]">
              <ZePersonagem estado="pensar" className="w-24 shrink-0" />
              <p
                key={fraseIdx}
                className="animate-fade-in-up font-mono text-sm text-stone-600"
                aria-live="polite"
              >
                {FRASES_BALCAO[fraseIdx]}
              </p>
            </div>
          </div>
        )}
        <div ref={fim} />
      </div>

      {/* FORMULÁRIO Z-01 — a mesma família visual da home */}
      <div ref={barra} className="sticky bottom-0 border-t-2 border-ink bg-paper py-4">
        <div className="rounded-lg border-2 border-ink bg-white shadow-[4px_4px_0_#1b1d22] focus-within:shadow-[5px_5px_0_#1b1d22]">
          <div aria-hidden className="flex items-center justify-between border-b-2 border-dashed border-ink/20 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-stone-600">
            <span>Formulário Z-01</span>
            <span>Via única</span>
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
