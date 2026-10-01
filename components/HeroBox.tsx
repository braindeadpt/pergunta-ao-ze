"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TemaArt from "@/components/TemaArt";

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

  const exemplo = EXEMPLOS[idx];

  return (
    <div className="w-full">
      {/* Caixa de pergunta */}
      <div className="relative z-10 rounded-3xl border border-stone-300 bg-white shadow-[0_4px_28px_-8px_rgba(0,0,0,0.15)] focus-within:border-band-verde focus-within:ring-4 focus-within:ring-band-verde/10">
        <div className="relative">
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
            className="w-full resize-none rounded-t-3xl bg-transparent px-6 pt-5 text-lg outline-none"
          />
          {pergunta === "" && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-5 text-lg text-stone-400"
            >
              {texto}
              <span className="caret-blink ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 bg-stone-400" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 px-5 pb-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-stone-400">
            Não precisas de dados pessoais, como o NIF ou números de documentos.
          </p>
          <button
            onClick={() => enviar(pergunta)}
            disabled={!pergunta.trim()}
            className="btn-primary shrink-0 self-end px-5 py-2.5 text-sm sm:self-auto"
          >
            Continuar na conversa →
          </button>
        </div>
      </div>

      {/* Cartão de exemplo rotativo — espreita por baixo da caixa */}
      <div className="relative -top-6 mx-auto w-[92%] max-w-lg">
        <div
          key={idx}
          className="animate-fade-in-up overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-md"
        >
          <TemaArt temaId={exemplo.tema} className="h-28" />
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
                {exemplo.entidade} · exemplo {idx + 1} de {EXEMPLOS.length}
              </p>
              <p className="mt-1 font-serif text-lg font-medium leading-snug">
                {exemplo.q}
              </p>
            </div>
            <button
              onClick={() => enviar(exemplo.q)}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-band-verde text-white transition-colors hover:bg-band-verde-escuro"
              aria-label="Usa esta pergunta"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
