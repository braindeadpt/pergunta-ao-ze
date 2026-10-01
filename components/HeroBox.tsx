"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";


const EXEMPLOS: { q: string; tema: string; entidade: string }[] = [
  { q: "Como renovo o Cartão de Cidadão sem apanhar a fila das 7h?", tema: "cartao-de-cidadao", entidade: "IRN" },
  { q: "Como peço o subsídio de desemprego?", tema: "desemprego-iefp", entidade: "Segurança Social" },
  { q: "Como mudo a morada fiscal?", tema: "cartao-de-cidadao", entidade: "IRN" },
  { q: "Como marco consulta no centro de saúde?", tema: "sns", entidade: "SNS 24" },
  { q: "Como pago o IUC do carro?", tema: "carta-conducao-imt", entidade: "IMT" },
  { q: "Como abro atividade como independente?", tema: "empresa-atividade", entidade: "Portal das Finanças" },
  { q: "Como ativo a Chave Móvel Digital?", tema: "chave-movel-digital", entidade: "AMA" },
  { q: "Como peço uma certidão de nascimento online?", tema: "certidoes", entidade: "IRN" },
  { q: "Como peço a pensão de velhice?", tema: "pensoes-reforma", entidade: "Segurança Social" },
  { q: "Como peço a nacionalidade portuguesa?", tema: "aima-imigracao", entidade: "IRN" },
];

export default function HeroBox() {
  const [pergunta, setPergunta] = useState("");
  const [idx, setIdx] = useState(0);
  const [texto, setTexto] = useState("");
  const [batendo, setBatendo] = useState(false);
  const char = useRef(0);
  const apagando = useRef(false);
  const router = useRouter();

  useEffect(() => {
    // DESIGN.md §9 — com prefers-reduced-motion, placeholder estático
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTexto(EXEMPLOS[0].q);
      return;
    }
    const tick = () => {
      const alvo = EXEMPLOS[idx].q;
      if (!apagando.current) {
        char.current++;
        setTexto(alvo.slice(0, char.current));
        if (char.current >= alvo.length) {
          apagando.current = true;
          return 3000;
        }
        return 55;
      }
      char.current--;
      setTexto(alvo.slice(0, char.current));
      if (char.current <= 0) {
        apagando.current = false;
        setIdx((i) => (i + 1) % EXEMPLOS.length);
        return 350;
      }
      return 20;
    };

    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      timer = setTimeout(loop, tick());
    };
    loop();
    return () => clearTimeout(timer);
  }, [idx]);

  const enviar = (q: string) => {
    const trimmed = q.trim();
    if (trimmed) router.push(`/chat?q=${encodeURIComponent(trimmed)}`);
  };

  // O carimbo "bate" (~220ms) antes de navegar
  const baterCarimbo = () => {
    if (!pergunta.trim()) return;
    setBatendo(true);
    setTimeout(() => enviar(pergunta), 220);
  };

  const exemplo = EXEMPLOS[idx];

  return (
    <div className="w-full">
      {/* FORMULÁRIO Z-01 — a caixa de pergunta */}
      <div className="relative z-10 rounded-lg border-2 border-ink bg-white text-left shadow-[8px_8px_0_#1b1d22] transition-shadow focus-within:shadow-[10px_10px_0_#1b1d22]">
        <div className="flex items-center justify-between border-b-2 border-dashed border-ink/20 px-5 py-2.5">
          <p aria-hidden className="font-mono text-xs font-bold uppercase tracking-widest text-stone-700">
            Formulário Z-01 · via única
          </p>
          <span aria-hidden="true" className="carimbo -my-1">Sem fila</span>
        </div>
        <div className="relative">
          <p className="px-6 pt-4 font-mono text-sm uppercase tracking-[0.25em] text-stone-700">
            Assunto
          </p>
          <textarea
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                enviar(pergunta);
              }
            }}
            rows={3}
            aria-label="A tua pergunta para o Zé"
            className="w-full resize-none bg-transparent px-6 pt-2 text-lg outline-none"
          />
          {pergunta === "" && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-11 text-lg text-stone-500"
            >
              {texto}
              <span className="caret-blink ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 bg-stone-500" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 border-t-2 border-dashed border-ink/20 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-sm uppercase tracking-wide text-stone-600">
            NIF ou nºs de documento: não são precisos
          </p>
          {/* O botão de submeter É um carimbo — bate antes de navegar */}
          <button
            onClick={baterCarimbo}
            disabled={!pergunta.trim()}
            className={`carimbo shrink-0 self-end px-4 py-2 text-sm sm:self-auto ${
              batendo ? "stamp-batendo" : ""
            } bg-white disabled:opacity-30`}
            style={{ transform: "rotate(-7deg)" }}
          >
            Entregar →
          </button>
        </div>
      </div>

      {/* Senha rotativa — espreita por baixo do formulário */}
      <div className="relative -top-4 mx-auto w-[88%] max-w-md rotate-1">
        <div
          key={idx}
          className="senha animate-fade-in-up"
          style={{ "--fundo": "#faf6ec" } as CSSProperties}
        >
          <div className="px-5 pt-6 pb-4">
            <div aria-hidden className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-stone-600">
              <span>Senha Z-{String(idx + 1).padStart(3, "0")}</span>
              <span>{exemplo.entidade}</span>
            </div>
            <div className="senha-corte my-3" aria-hidden />
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-[17px] leading-snug">
                {exemplo.q}
              </p>
              <button
                onClick={() => enviar(exemplo.q)}
                className="grid size-10 shrink-0 place-items-center rounded-lg border-2 border-ink bg-band-verde text-white shadow-[3px_3px_0_#1b1d22] transition-all hover:-translate-y-0.5 hover:bg-band-verde-escuro hover:shadow-[4px_4px_0_#1b1d22]"
                aria-label="Usa esta pergunta"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
