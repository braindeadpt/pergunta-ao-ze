import Link from "next/link";
import type { CSSProperties } from "react";
import type { Tema } from "@/lib/types";

/**
 * Senha de atendimento — DESIGN.md §5.1
 * Talão com picotado, número grande, "à sua frente", balcão e a pergunta.
 * `fundo` deve ser a cor da secção onde o talão está (para o picotado).
 */
const ROTACOES = [-1.4, 1.1, -0.7, 1.6, -1, 0.7];

export default function SenhaTema({
  tema,
  i,
  fundo = "#f5e27a",
}: {
  tema: Tema;
  i: number;
  fundo?: string;
}) {
  const num = `A-${String(41 + i * 6).padStart(3, "0")}`;
  const aFrente = ((i * 5 + 3) % 11) + 1;
  const balcao = (i % 6) + 1;
  const rot = ROTACOES[i % ROTACOES.length];
  const [principal, ...resto] = tema.perguntas;

  return (
    <article
      className="senha group"
      style={{ "--fundo": fundo, transform: `rotate(${rot}deg)` } as CSSProperties}
    >
      {/* Via que se rasga — número da senha */}
      <div className="senha-stub px-5 pb-3 pt-5">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400">
          <span>Atendimento</span>
          <span>{9 + (i % 8)}:{String(7 + i * 11 % 53).padStart(2, "0")}h</span>
        </div>
        <p className="mt-1 font-mono text-4xl font-bold tracking-tight">
          {num}
        </p>
        <div className="mt-1.5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-widest text-stone-500">
          <span>Balcão {balcao} · {tema.entidade}</span>
        </div>
        <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-widest text-stone-400">
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
          <h3 className="font-display text-lg leading-tight transition-colors group-hover:text-band-verde-escuro">
            {tema.titulo}
          </h3>
          <p className="mt-1.5 flex items-baseline justify-between gap-3 text-[15px] leading-snug text-stone-700">
            {principal.texto}
            <span aria-hidden className="shrink-0 transition-transform group-hover:translate-x-1">→</span>
          </p>
        </Link>
        {resto.length > 0 && (
          <ul className="mt-3 space-y-1 border-t border-dashed border-ink/20 pt-2.5">
            {resto.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/chat?q=${encodeURIComponent(p.texto)}`}
                  className="font-mono text-[11px] leading-relaxed text-stone-500 underline decoration-ink/25 underline-offset-2 transition-colors hover:text-ink"
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
