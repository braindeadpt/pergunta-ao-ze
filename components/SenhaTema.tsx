import Link from "next/link";
import type { CSSProperties } from "react";
import type { Tema } from "@/lib/types";

/**
 * Senha de atendimento — DESIGN.md §5.1
 * Talão com picotado, número grande, "à sua frente", balcão e a pergunta.
 * `fundo` deve ser a cor da secção onde o talão está (para o picotado).
 * `destaque`: senha grande (2 colunas, A-001, "MAIS PEDIDA").
 * `tombada`: senha caída — fica de cabeça para baixo e endireita no hover.
 */
const ROTACOES = [-1.4, 1.1, -0.7, 1.6, -1, 0.7, 2.1, -1.9];
const DESNIVAL = ["lg:mt-0", "lg:mt-8", "lg:mt-3", "lg:mt-10", "lg:mt-1", "lg:mt-6"];

export default function SenhaTema({
  tema,
  i,
  fundo = "#f5e27a",
  numero,
  balcao,
  destaque = false,
  tombada = false,
}: {
  tema: Tema;
  i: number;
  fundo?: string;
  numero?: string;
  balcao?: string;
  destaque?: boolean;
  tombada?: boolean;
}) {
  const num = numero ?? `A-${String(41 + i * 6).padStart(3, "0")}`;
  const aFrente = ((i * 5 + 3) % 11) + 1;
  const rot = ROTACOES[i % ROTACOES.length];
  const [principal, ...resto] = tema.perguntas;

  const transform = tombada ? "rotate(176deg) translateY(6px)" : `rotate(${rot}deg)`;

  return (
    <article
      className={`senha group ${tombada ? "senha-tombada" : ""} ${destaque ? "" : DESNIVAL[i % DESNIVAL.length]}`}
      style={{ "--fundo": fundo, transform } as CSSProperties}
    >
      {destaque && (
        <span aria-hidden="true" className="carimbo absolute -right-3 -top-3 z-10 rotate-6 bg-white text-[13px]">
          Mais pedida
        </span>
      )}

      {/* Via que se rasga — número da senha */}
      <div className={`senha-stub px-5 pb-3 ${destaque ? "pt-7" : "pt-5"}`}>
        {/* Decoração pura: cabeçalho/hora fictícios — escondido de leitores de ecrã */}
        <div aria-hidden className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500">
          <span>Atendimento</span>
          <span>{9 + (i % 8)}:{String(7 + i * 11 % 53).padStart(2, "0")}h</span>
        </div>
        <p className={`mt-1 font-mono font-bold tracking-tight ${destaque ? "text-6xl" : "text-4xl"}`}>
          {num}
        </p>
        <div className="mt-1.5 flex items-center justify-between font-mono text-sm uppercase tracking-widest text-stone-700">
          <span>{balcao ?? `Balcão ${(i % 6) + 1}`} · {tema.entidade}</span>
        </div>
        <p aria-hidden className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-stone-600">
          À sua frente: {aFrente} {aFrente === 1 ? "pessoa" : "pessoas"}
        </p>
      </div>

      {/* Picotado */}
      <div className="senha-corte" aria-hidden />

      {/* Corpo do talão — a pergunta */}
      <div className="px-5 pb-6 pt-4">
        <Link
          href={`/chat?q=${encodeURIComponent(principal.texto)}`}
          className="block"
        >
          <h3 className={`font-display leading-tight transition-colors group-hover:text-band-verde-escuro ${destaque ? "text-2xl md:text-3xl" : "text-lg"}`}>
            {tema.titulo}
          </h3>
          <p className="mt-1.5 flex items-baseline justify-between gap-3 text-base leading-snug text-stone-800">
            {principal.texto}
            <span aria-hidden className="shrink-0 transition-transform group-hover:translate-x-1">→</span>
          </p>
        </Link>
        {resto.length > 0 && (
          <ul className="mt-3 space-y-1.5 border-t border-dashed border-ink/20 pt-2.5">
            {(destaque ? resto : resto.slice(0, 2)).map((p) => (
              <li key={p.id}>
                <Link
                  href={`/chat?q=${encodeURIComponent(p.texto)}`}
                  className="font-mono text-sm leading-relaxed text-stone-700 underline decoration-ink/25 underline-offset-2 transition-colors hover:text-ink"
                >
                  {p.texto}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
