"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Pill flutuante "Pergunta ao Zé…" que aparece depois do hero,
 * como no Italia Aperta ("Chiedi a Pino…").
 */
export default function FloatingAsk() {
  const [visivel, setVisivel] = useState(false);
  const [texto, setTexto] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enviar = () => {
    const q = texto.trim();
    router.push(q ? `/chat?q=${encodeURIComponent(q)}` : "/chat");
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 transition-all duration-300 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-stone-200 bg-white p-2 pl-5 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.25)]">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          placeholder="Pergunta ao Zé…"
          aria-label="Pergunta ao Zé"
          className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
        />
        <button
          onClick={enviar}
          aria-label="Enviar pergunta"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-band-verde text-white transition-colors hover:bg-band-verde-escuro"
        >
          →
        </button>
      </div>
    </div>
  );
}
