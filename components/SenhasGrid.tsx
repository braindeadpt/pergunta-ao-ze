"use client";

import { useRef, useState } from "react";
import SenhaTema from "@/components/SenhaTema";
import type { Tema } from "@/lib/types";

/**
 * Grelha de senhas agrupadas por balcão — DESIGN.md §5.1.
 * Mostra os 2 primeiros balcões; o resto fica no DOM (SEO) mas escondido
 * atrás do botão "VER MAIS BALCÕES" (aria-expanded/aria-controls).
 */
export interface Balcao {
  rotulo: string;
  letra: string;
  temas: Tema[];
}

const VISIVEIS = 2;

export default function SenhasGrid({
  balcoes,
  destaque,
}: {
  balcoes: Balcao[];
  destaque: Tema;
}) {
  const [aberto, setAberto] = useState(false);
  const restoRef = useRef<HTMLDivElement>(null);
  const escondidos = balcoes.slice(VISIVEIS);

  const alternar = () => {
    const novo = !aberto;
    setAberto(novo);
    if (novo) {
      // Foco no primeiro balcão revelado
      requestAnimationFrame(() => {
        restoRef.current?.querySelector<HTMLElement>("[data-balcao-header]")?.focus();
      });
    }
  };

  const renderBalcao = (b: Balcao, bi: number, extraRef?: (el: HTMLElement | null) => void) => (
    <div key={b.letra} className="mt-14 first:mt-0">
      <p
        data-balcao-header
        tabIndex={extraRef ? -1 : undefined}
        ref={extraRef}
        className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.2em] outline-band-verde outline-offset-4 focus-visible:outline-2"
      >
        <span className="rounded border-2 border-ink bg-white px-2.5 py-1 shadow-[2px_2px_0_#1b1d22]">
          Balcão {bi + 1}
        </span>
        <span className="text-carimbo-tinta">— {b.rotulo}</span>
      </p>
      <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {b.temas.map((tema, j) => {
          const ultimo =
            bi === balcoes.length - 1 && j === b.temas.length - 1;
          return (
            <SenhaTema
              key={tema.id}
              tema={tema}
              i={bi * 4 + j + 1}
              fundo="#f5e27a"
              numero={`${b.letra}-${String(j + 1).padStart(3, "0")}`}
              balcao={`Balcão ${bi + 1}`}
              tombada={ultimo}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* A senha mais pedida — ocupa 2 colunas */}
      <div className="relative mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative sm:col-span-2">
          <svg viewBox="0 0 24 56" className="absolute -top-4 left-10 z-10 w-6 rotate-6" fill="none" stroke="#1b1d22" strokeWidth="4" strokeLinecap="round" aria-hidden>
            <path d="M12 10 V44" />
            <path d="M6 20 V50 Q6 54 10 54 H14 Q18 54 18 50 V24" />
          </svg>
          <SenhaTema tema={destaque} i={0} fundo="#f5e27a" numero="A-001" balcao="Balcão 1" destaque />
        </div>

        {/* Senha caída — decorativa, saiu do dispensador */}
        <div
          aria-hidden
          className="senha senha-tombada hidden w-52 lg:block"
          style={{ "--fundo": "#f5e27a", position: "absolute", right: "-3rem", bottom: "-5.5rem", transform: "rotate(163deg)" } as React.CSSProperties}
        >
          <div className="px-4 pb-3 pt-4">
            <p className="font-mono text-2xl font-bold">X-000</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-stone-600">Erro de impressão</p>
          </div>
        </div>
      </div>

      {balcoes.slice(0, VISIVEIS).map((b, bi) => renderBalcao(b, bi))}

      {/* Balcões extra — no HTML para SEO, revelados pelo botão */}
      <div
        id="balcoes-extra"
        ref={restoRef}
        className={aberto ? "animate-fade-in-up" : "hidden"}
      >
        {escondidos.map((b, k) => renderBalcao(b, k + VISIVEIS, k === 0 ? (el) => { if (aberto && el) el.dataset.first = "1"; } : undefined))}
      </div>

      <div className="mt-14 text-center">
        <button
          onClick={alternar}
          aria-expanded={aberto}
          aria-controls="balcoes-extra"
          className="carimbo bg-white !text-base !px-6 !py-3 transition-transform hover:scale-105 active:scale-95"
          style={{ transform: aberto ? "rotate(2deg)" : "rotate(-4deg)" }}
        >
          {aberto ? "Recolher balcões" : `Ver mais balcões (${escondidos.length})`}
        </button>
      </div>
    </>
  );
}
