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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const deveFocarBotaoRef = useRef(false);
  const recolherTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const limparTimerRecolher = () => {
    if (recolherTimerRef.current !== null) {
      clearTimeout(recolherTimerRef.current);
      recolherTimerRef.current = null;
    }
  };

  useEffect(() => {
    const temas = document.getElementById("temas");
    const cta = document.getElementById("cta");
    let limite = temas ? temas.offsetTop : 520;
    let passouHero = false;
    let noCta = false;
    const atualizar = () => {
      const v = passouHero && !noCta;
      setVisivel(v);
      if (!v) setExpandido(false);
    };
    const onScroll = () => {
      passouHero = window.scrollY > limite;
      atualizar();
    };
    const onResize = () => {
      limite = temas ? temas.offsetTop : 520;
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    // Esconde quando a secção CTA está visível — nunca tapa o painel/rodapé
    const io = cta
      ? new IntersectionObserver(([e]) => { noCta = e.isIntersecting; atualizar(); }, { threshold: 0.15 })
      : null;
    if (io && cta) io.observe(cta);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      limparTimerRecolher();
    };
  }, []);

  useEffect(() => {
    if (expandido) {
      inputRef.current?.focus();
    } else if (deveFocarBotaoRef.current) {
      deveFocarBotaoRef.current = false;
      botaoRef.current?.focus();
    }
  }, [expandido]);

  const enviar = () => {
    const q = texto.trim();
    router.push(q ? `/chat?q=${encodeURIComponent(q)}` : "/chat");
  };

  const recolher = () => {
    limparTimerRecolher();
    // 2s sem interação fora do formulário → volta a botão pequeno
    recolherTimerRef.current = setTimeout(() => {
      recolherTimerRef.current = null;
      if (!wrapperRef.current?.contains(document.activeElement)) {
        setExpandido(false);
      }
    }, 2000);
  };

  const fecharComEscape = () => {
    limparTimerRecolher();
    deveFocarBotaoRef.current = true;
    setExpandido(false);
  };

  return (
    <div
      inert={!visivel || undefined}
      aria-hidden={!visivel}
      className={`fixed bottom-5 right-5 z-50 flex items-end justify-end transition-all duration-300 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {expandido ? (
        <div
          ref={wrapperRef}
          className="flex w-[min(22rem,calc(100vw-2.5rem))] rotate-[0.5deg] items-center gap-2 rounded-lg border-2 border-ink bg-white p-2 pl-4 shadow-[5px_5px_0_#1b1d22] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-band-verde"
          onMouseLeave={recolher}
          onBlur={recolher}
          onFocusCapture={limparTimerRecolher}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              fecharComEscape();
            }
          }}
        >
          <input
            ref={inputRef}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviar()}
            placeholder="Pergunta ao Zé…"
            aria-label="Pergunta ao Zé"
            className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-stone-500"
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
          ref={botaoRef}
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
