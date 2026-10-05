import type { Metadata } from "next";
import Link from "next/link";
import { TEMAS } from "@/lib/data/temas";
import { TEMAS_EN } from "@/lib/data/temas.en";
import {
  TITULOS_EN,
  TEMAS_TITULO_EN,
  BALCOES_ROTULO_EN,
} from "@/lib/data/titulos.en";
import { BALCOES_DEF, balcaoDeTema } from "@/lib/balcoes";

/* English index — only entries with a published EN translation
   (revisao: true entries stay PT-only until reviewed). */

export const metadata: Metadata = {
  title: "All questions (English)",
  description:
    "Curated answers about Portuguese public services in English — organised by counter: identity, money, work, health, driving, housing and borders.",
  alternates: {
    canonical: "/en/p",
    languages: { "pt-PT": "/p", en: "/en/p" },
  },
};

export default function IndicePerguntasEn() {
  const porBalcao = new Map<number, typeof TEMAS>();
  for (const t of TEMAS) {
    const perguntasEn = t.perguntas.filter(
      (p) => TEMAS_EN[p.id] && !TEMAS_EN[p.id].revisao && TITULOS_EN[p.id]
    );
    if (!perguntasEn.length) continue;
    const bi = balcaoDeTema(t.id);
    const chave = bi >= 0 ? bi : BALCOES_DEF.length - 1;
    const temaEn = { ...t, perguntas: perguntasEn };
    porBalcao.set(chave, [...(porBalcao.get(chave) ?? []), temaEn]);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p aria-hidden className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
        ▸ Answer archive
      </p>
      <h1 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
        All questions
      </h1>
      <p className="mt-3 text-base text-stone-600">
        Every question has its own answer page, with steps and official
        sources. Prefer to ask? Open the{" "}
        <Link href="/chat" className="text-azulejo underline underline-offset-2">
          chat
        </Link>{" "}
        and write in English.
      </p>

      {BALCOES_DEF.map((balcao, i) => {
        const blocos = porBalcao.get(i);
        if (!blocos?.length) return null;
        return (
          <section key={balcao.rotulo} className="mt-10">
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink">
              Counter {i + 1} — {BALCOES_ROTULO_EN[i] ?? balcao.rotulo}
            </h2>
            <ul className="mt-3 space-y-3">
              {blocos.flatMap((t) =>
                t.perguntas.map((p) => (
                  <li key={p.id} className="group">
                    <Link
                      href={`/en/p/${p.id}`}
                      className="font-medium text-ink underline decoration-ink/25 underline-offset-2 transition-colors hover:text-azulejo"
                    >
                      {TITULOS_EN[p.id]}
                    </Link>
                    <span className="ml-2 font-mono text-sm text-stone-500">
                      {TEMAS_TITULO_EN[t.id] ?? t.entidade}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
