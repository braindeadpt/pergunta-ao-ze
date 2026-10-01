import type { Metadata } from "next";
import Link from "next/link";
import { TEMAS } from "@/lib/data/temas";
import { BALCOES_DEF, balcaoDeTema } from "@/lib/balcoes";

/* Índice de todas as respostas curadas — arquivo de perguntas */

export const metadata: Metadata = {
  title: "Todas as perguntas",
  description:
    "Índice das respostas curadas do Pergunta ao Zé, agrupadas por balcão: identificação, dinheiro, trabalho, saúde, estrada, casa e fronteiras.",
  alternates: { canonical: "/p" },
};

export default function IndicePerguntas() {
  const porBalcao = new Map<number, typeof TEMAS>();
  for (const t of TEMAS) {
    const bi = balcaoDeTema(t.id);
    const chave = bi >= 0 ? bi : BALCOES_DEF.length - 1;
    porBalcao.set(chave, [...(porBalcao.get(chave) ?? []), t]);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p aria-hidden className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
        ▸ Arquivo de respostas
      </p>
      <h1 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
        Todas as perguntas
      </h1>
      <p className="mt-3 text-base text-stone-600">
        Cada pergunta tem a sua própria página de resposta, com passos e fontes
        oficiais. Se preferires perguntar ao Zé, abre o{" "}
        <Link href="/chat" className="text-azulejo underline underline-offset-2">
          chat
        </Link>
        .
      </p>

      {BALCOES_DEF.map((balcao, i) => {
        const blocos = porBalcao.get(i);
        if (!blocos?.length) return null;
        return (
          <section key={balcao.rotulo} className="mt-10">
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink">
              Balcão {i + 1} — {balcao.rotulo}
            </h2>
            <ul className="mt-3 space-y-3">
              {blocos.flatMap((t) =>
                t.perguntas.map((p) => (
                  <li key={p.id} className="group">
                    <Link
                      href={`/p/${p.id}`}
                      className="font-medium text-ink underline decoration-ink/25 underline-offset-2 transition-colors hover:text-azulejo"
                    >
                      {p.texto}
                    </Link>
                    <span className="ml-2 font-mono text-sm text-stone-500">
                      {t.entidade}
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
