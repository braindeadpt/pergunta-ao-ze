"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ZeFace from "@/components/ZeFace";

/**
 * Botão flutuante "Pergunta ao Zé" — aparece depois do hero, recolhido
 * num botão pequeno com o Zé (canto inferior direito). Expande para o
 * campo de pergunta ao clicar; volta a recolher 2s depois de perder o foco.
 * Nunca cobre o centro do conteúdo nem texto clicável.
 */
export default function FloatingAsk() {
  const [visivel, setVisivel] = useState(false);
  const [expandido, setExpandido] = useState(false);
  const [texto, setTexto] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const hero = document.getElementById("temas");
    const limite = hero ? hero.offsetTop : 520;
    const onScroll = () => {
      const v = window.scrollY > limite;
      setVisivel(v);
      if (!v) setExpandido(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (expandido) inputRef.current?.focus();
  }, [expandido]);

  const enviar = () => {
    const q = texto.trim();
    router.push(q ? `/chat?q=${encodeURIComponent(q)}` : "/chat");
  };

  const recolher = () => {
    // 2s sem interação → volta a botão pequeno
    setTimeout(() => {
      if (document.activeElement !== inputRef.current) setExpandido(false);
    }, 2000);
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-end justify-end transition-all duration-300 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {expandido ? (
        <div
          className="flex w-[min(22rem,calc(100vw-2.5rem))] rotate-[0.5deg] items-center gap-2 rounded-lg border-2 border-ink bg-white p-2 pl-4 shadow-[5px_5px_0_#1b1d22]"
          onMouseLeave={recolher}
        >
          <input
            ref={inputRef}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviar()}
            onBlur={recolher}
            placeholder="Pergunta ao Zé…"
            aria-label="Pergunta ao Zé"
            className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-stone-400"
          />
          <button
            onClick={enviar}
            aria-label="Enviar pergunta"
            className="grid size-9 shrink-0 place-items-center rounded-md border-2 border-ink bg-band-verde text-white shadow-[2px_2px_0_#1b1d22] transition-all hover:-translate-y-0.5 hover:bg-band-verde-escuro"
          >
            →
          </button>
        </div>
      ) : (
        <button
          onClick={() => setExpandido(true)}
          aria-label="Perguntar ao Zé"
          className="group flex rotate-2 items-center gap-2 rounded-full border-2 border-ink bg-white py-1.5 pl-1.5 pr-4 shadow-[4px_4px_0_#1b1d22] transition-all hover:-translate-y-0.5 hover:rotate-0 hover:shadow-[5px_5px_0_#1b1d22]"
        >
          <ZeFace expressao="pisca" className="size-9" />
          <span className="font-mono text-sm font-bold uppercase tracking-wider">
            Pergunta
          </span>
        </button>
      )}
    </div>
  );
}
