import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMAS } from "@/lib/data/temas";
import { getContactoPorDominio } from "@/lib/data/fontes";
import ZePersonagem from "@/components/ZePersonagem";

/* Uma página estática por pergunta curada — /p/<id da pergunta> */

function encontrar(slug: string) {
  for (const tema of TEMAS) {
    const pergunta = tema.perguntas.find((p) => p.id === slug);
    if (pergunta) return { tema, pergunta };
  }
  return null;
}

export function generateStaticParams() {
  return TEMAS.flatMap((t) => t.perguntas.map((p) => ({ slug: p.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hit = encontrar(slug);
  if (!hit) return {};
  const { tema, pergunta } = hit;
  const descricao =
    pergunta.resposta.passos[0]?.slice(0, 150) ??
    `${tema.titulo} — ${tema.entidade}`;
  return {
    title: pergunta.texto,
    description: descricao,
    alternates: { canonical: `/p/${slug}` },
  };
}

const geradoEm = new Intl.DateTimeFormat("pt-PT", {
  month: "long",
  year: "numeric",
}).format(new Date());

export default async function PaginaPergunta({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hit = encontrar(slug);
  if (!hit) notFound();
  const { tema, pergunta } = hit;

  const relacionadas = tema.perguntas.filter((p) => p.id !== slug).slice(0, 3);
  const vistos = new Set<string>();
  const contactos = pergunta.resposta.fontes
    .map((f) => getContactoPorDominio(f.dominio))
    .filter((c): c is NonNullable<typeof c> => {
      if (!c || vistos.has(c.nome)) return false;
      vistos.add(c.nome);
      return true;
    });

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: {
      "@type": "Question",
      name: pergunta.texto,
      acceptedAnswer: {
        "@type": "Answer",
        text: pergunta.resposta.passos.join(" "),
      },
    },
  };
  const BASE = "https://perguntaaoze.vercel.app";
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: BASE },
      { "@type": "ListItem", position: 2, name: tema.titulo, item: `${BASE}/#temas` },
      { "@type": "ListItem", position: 3, name: pergunta.texto, item: `${BASE}/p/${slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Breadcrumb — Início > Tema > Pergunta */}
      <nav aria-label="Caminho" className="font-mono text-sm text-stone-600">
        <Link href="/" className="underline decoration-stone-300 underline-offset-2 hover:text-ink">
          Início
        </Link>
        <span aria-hidden> › </span>
        <Link href="/#temas" className="underline decoration-stone-300 underline-offset-2 hover:text-ink">
          {tema.titulo}
        </Link>
        <span aria-hidden> › </span>
        <span className="text-ink">{pergunta.texto}</span>
      </nav>

      {/* Senha da página — a moldura é a piada, a resposta é séria */}
      <div className="mt-6 flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <p aria-hidden className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
            ▸ Página de resposta · {tema.entidade}
          </p>
          <h1 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
            {pergunta.texto}
          </h1>
          <p className="mt-3 text-base text-stone-600">
            Resposta curada do tema «{tema.titulo}».{" "}
            <span className="font-mono text-sm">
              Gerado a partir da base curada em {geradoEm}.
            </span>
          </p>
        </div>
        <ZePersonagem estado="normal" className="hidden w-24 shrink-0 self-start sm:block" />
      </div>

      {/* Ficha de resposta — sóbria */}
      <article className="mt-6 rounded-lg border-2 border-ink bg-white px-5 py-5 shadow-[4px_4px_0_#1b1d22]">
        <p aria-hidden className="font-mono text-xs font-bold uppercase tracking-widest text-stone-600">
          {tema.entidade} · {tema.titulo}
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
          {pergunta.resposta.passos.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        {pergunta.resposta.nota && (
          <p className="mt-3 rounded-md border-2 border-dashed border-amber-400/60 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {pergunta.resposta.nota}
          </p>
        )}

        <div className="mt-4 space-y-2 border-t-2 border-dashed border-ink/15 pt-3">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-esferografica">
            Fontes oficiais
          </p>
          {pergunta.resposta.fontes.map((f, i) => (
            <a
              key={`${f.url}-${i}`}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-md border-2 border-azulejo/40 px-3 py-2 text-sm transition-colors hover:bg-azulejo-suave"
            >
              <span className="font-medium text-azulejo">
                {i + 1}. {f.titulo}
              </span>
              <span aria-hidden className="shrink-0 font-mono text-xs text-stone-500">
                {f.dominio} ↗
              </span>
            </a>
          ))}
        </div>

        {contactos.length > 0 && (
          <div className="mt-3 space-y-1 rounded-md border-2 border-dashed border-ink/20 bg-stone-50 px-3 py-2.5 text-sm text-stone-700">
            {contactos.map((c) => (
              <p key={c.nome}>
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-ink">
                  Ligar — {c.nome}:
                </span>{" "}
                {c.contacto.telefone}
                {c.contacto.horario && (
                  <span className="text-stone-500"> — {c.contacto.horario}</span>
                )}
              </p>
            ))}
          </div>
        )}
      </article>

      {/* CTA + relacionadas */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href={`/chat?q=${encodeURIComponent(pergunta.texto)}`}
          className="btn-primary px-5 py-2.5 text-sm"
        >
          Pergunta mais ao Zé →
        </Link>
        <Link
          href="/p"
          className="font-mono text-sm text-azulejo underline underline-offset-2"
        >
          Todas as perguntas
        </Link>
      </div>

      {relacionadas.length > 0 && (
        <div className="mt-8">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-carimbo-tinta">
            ▸ Do mesmo balcão
          </p>
          <ul className="mt-3 space-y-2">
            {relacionadas.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/p/${p.id}`}
                  className="inline-block rounded-md border-2 border-ink/25 bg-white px-3 py-2 text-sm font-medium transition-colors hover:border-ink hover:bg-form-amarelo/30"
                >
                  {p.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-10 border-t-2 border-dashed border-ink/20 pt-4 text-sm text-stone-600">
        Informação de orientação — confirma sempre na fonte oficial antes de
        agir.
      </p>
    </div>
  );
}
