"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Pergunta, Tema } from "@/lib/types";
import type { Sugestao } from "@/lib/engine";
import { getContactoPorDominio } from "@/lib/data/fontes";
import ZeFace from "@/components/ZeFace";
import ZePersonagem from "@/components/ZePersonagem";

const FRASES_BALCAO = [
  "A pedir carimbo ao chefe…",
  "A procurar o impresso certo…",
  "A conferir o livro de ponto…",
  "Quase — a fila anda devagar…",
];

const SUGESTOES_INICIAIS = [
  "Como renovo o Cartão de Cidadão?",
  "Fiquei desempregado, o que faço?",
  "Como marco consulta no centro de saúde?",
  "Como pago o IUC do carro?",
  "Quero abrir uma empresa, por onde começo?",
  "Como peço a nacionalidade portuguesa?",
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
  const fim = useRef<HTMLDivElement>(null);
  const enviado = useRef(false);

  // Frases de balcão a rodar durante o loading
  useEffect(() => {
    if (!aCarregar) {
      setFraseIdx(0);
      return;
    }
    const t = setInterval(() => setFraseIdx((i) => (i + 1) % FRASES_BALCAO.length), 1900);
    return () => clearInterval(t);
  }, [aCarregar]);

  useEffect(() => {
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    fim.current?.scrollIntoView({ behavior: suave ? "smooth" : "auto" });
  }, [mensagens, aCarregar]);

  async function perguntar(texto: string) {
    const q = texto.trim();
    if (!q || aCarregar) return;
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
    } catch {
      setMensagens((m) => [...m, { papel: "ze", tipo: "erro", sugestoes: [] }]);
    } finally {
      setACarregar(false);
    }
  }

  useEffect(() => {
    const q = params.get("q");
    if (q && !enviado.current) {
      enviado.current = true;
      perguntar(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4">
      <div className="flex-1 space-y-6 py-8">
        {mensagens.length === 0 && (
          <div className="pt-4 text-center sm:pt-8">
            <ZePersonagem estado="normal" className="mx-auto w-52" />
            <p className="mt-4 font-display text-3xl uppercase tracking-tight sm:text-4xl">
              Olá, sou o Zé.
            </p>
            <p className="mx-auto mt-3 max-w-md font-mono text-[12px] uppercase leading-relaxed tracking-wider text-stone-500">
              Balcão aberto · sem senha · sem fila
            </p>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-stone-600">
              Pergunta-me sobre serviços públicos portugueses — documentos,
              impostos, saúde, trabalho, empresa. Já li os guias chatos por ti.
            </p>
            <div className="mx-auto mt-7 flex max-w-lg flex-wrap justify-center gap-2">
              {SUGESTOES_INICIAIS.map((s) => (
                <button
                  key={s}
                  onClick={() => perguntar(s)}
                  className="chip"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {mensagens.map((m, i) =>
          m.papel === "utilizador" ? (
            <div key={i} className="animate-fade-in-up flex justify-end">
              <div className="max-w-[85%] rounded-lg rounded-br-sm border-2 border-ink bg-band-verde px-4 py-3 text-white shadow-[3px_3px_0_#1b1d22]">
                {m.texto}
              </div>
            </div>
          ) : (
            <div key={i} className="animate-fade-in-up flex gap-3">
              <ZeFace
                expressao={m.tipo === "erro" ? "hmm" : "normal"}
                className="mt-1 size-8 shrink-0"
              />
              <div className="relative max-w-[85%] flex-1 rounded-lg rounded-tl-sm border-2 border-ink bg-white px-5 py-4 shadow-[3px_3px_0_#1b1d22]">
                {m.tipo === "resposta" && (
                  <span
                    aria-hidden
                    className="carimbo stamp-batendo absolute -right-3 -top-4 rotate-[7deg] bg-white"
                  >
                    Deferido
                  </span>
                )}
                {m.tipo === "erro" ? (
                  <p className="text-[15px]">
                    A máquina engasgou-se — tenta outra vez daqui a um momento.
                  </p>
                ) : m.tipo === "resposta" && m.pergunta ? (
                  <>
                    <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-stone-400">
                      {m.tema?.entidade} · {m.tema?.titulo}
                      {m.via === "llm" && (
                        <span className="rounded-md border border-azulejo/50 bg-azulejo-suave px-2 py-0.5 text-[10px] font-bold text-azulejo">
                          gerada por IA
                        </span>
                      )}
                    </p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
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
                          <span className="shrink-0 font-mono text-[11px] text-stone-400">
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
                        <div className="mt-3 space-y-1 rounded-md border-2 border-dashed border-ink/20 bg-stone-50 px-3 py-2.5 text-[13px] text-stone-600">
                          {linhas.map((c) => (
                            <p key={c.nome}>
                              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                                Ligar:
                              </span>{" "}
                              {c.contacto.telefone}
                              {c.contacto.horario && (
                                <span className="text-stone-400">
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
                    <p className="text-[15px]">
                      Não apanhei essa — nem o Zé sabe tudo. Mas estas talvez
                      ajudem:
                    </p>
                    <div className="mt-3 flex flex-col gap-2">
                      {m.sugestoes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => perguntar(s.texto)}
                          className="rounded-md border-2 border-dashed border-ink/30 px-3 py-2 text-left text-sm transition-colors hover:border-ink hover:bg-form-amarelo/20"
                        >
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400">
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
                    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-stone-400">
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
              <ZePersonagem estado="pensar" className="w-20 shrink-0" />
              <p
                key={fraseIdx}
                className="animate-fade-in-up font-mono text-[13px] text-stone-500"
                aria-live="polite"
              >
                {FRASES_BALCAO[fraseIdx]}
              </p>
            </div>
          </div>
        )}
        <div ref={fim} />
      </div>

      <div className="sticky bottom-0 border-t-2 border-ink bg-paper py-4">
        <div className="flex items-end gap-2 rounded-lg border-2 border-ink bg-white p-2 shadow-[4px_4px_0_#1b1d22] focus-within:shadow-[5px_5px_0_#1b1d22]">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                perguntar(input);
              }
            }}
            rows={1}
            placeholder="A tua pergunta para o Zé"
            aria-label="A tua pergunta para o Zé"
            className="max-h-32 flex-1 resize-none bg-transparent px-3 py-2 outline-none placeholder:text-stone-400"
          />
          <button
            onClick={() => perguntar(input)}
            disabled={!input.trim() || aCarregar}
            className="btn-primary px-4 py-2 text-sm"
          >
            Carimbar →
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-stone-400">
          O Zé responde com base em páginas oficiais, mas a informação pode
          ficar desatualizada — confirma sempre na fonte.
        </p>
      </div>
    </div>
  );
}
