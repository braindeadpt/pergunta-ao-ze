"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Painel LED de senhas — DESIGN.md §5.4
 * Dígitos âmbar sobre preto; contam de 0 ao entrar no viewport.
 * Com prefers-reduced-motion mostra os valores finais de imediato.
 */
function DigitoLED({ alvo, visivel }: { alvo: number; visivel: boolean }) {
  const [v, setV] = useState(visivel ? alvo : 0);

  useEffect(() => {
    if (!visivel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(alvo);
      return;
    }
    const t0 = performance.now();
    const dur = 900;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setV(Math.round(alvo * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visivel, alvo]);

  return (
    <span className="font-mono text-4xl font-bold tabular-nums tracking-wider md:text-5xl">
      {String(v).padStart(3, "0")}
    </span>
  );
}

export default function PainelLED({
  stats,
  className = "",
}: {
  stats: { entidades: number; perguntas: number; paginas: number };
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisivel(true),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const linhas: [string, number][] = [
    ["BALCÕES", stats.entidades],
    ["SENHAS SERVIDAS", stats.perguntas],
    ["IMPRESSOS LIDOS", stats.paginas],
  ];

  return (
    <div
      ref={ref}
      className={`led-bar rounded-xl border-2 border-ink p-6 shadow-[8px_8px_0_#1b1d22] md:p-8 ${className}`}
    >
      <div aria-hidden className="flex items-center justify-between border-b-2 border-dashed border-[#ffb020]/30 pb-3 text-xs font-bold uppercase">
        <span>Painel de atendimento</span>
        <span className="animate-pulse">● LIVE</span>
      </div>
      <dl className="mt-4 space-y-4">
        {linhas.map(([label, n]) => (
          <div key={label} className="flex items-end justify-between gap-4">
            <dt className="pb-1.5 font-mono text-sm uppercase tracking-[0.15em] opacity-80">
              {label}
            </dt>
            <dd>
              <DigitoLED alvo={n} visivel={visivel} />
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 border-t-2 border-dashed border-[#ffb020]/30 pt-3 text-center font-mono text-sm font-bold uppercase tracking-[0.2em]">
        A chamar → Senha Z-001
      </div>
    </div>
  );
}
