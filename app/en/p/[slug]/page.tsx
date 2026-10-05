import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMAS } from "@/lib/data/temas";
import { TEMAS_EN } from "@/lib/data/temas.en";
import { TITULOS_EN, TEMAS_TITULO_EN } from "@/lib/data/titulos.en";
import { contactosDeFontes } from "@/lib/contactos";
import { SITE_URL } from "@/lib/site";
import ZePersonagem from "@/components/ZePersonagem";
import Partilhar from "@/components/Partilhar";

/* One static page per curated question, in English — /en/p/<id>.
   Entries kept for review (revisao: true) stay PT-only → 404 here. */

function encontrar(slug: string) {
  for (const tema of TEMAS) {
    const pergunta = tema.perguntas.find((p) => p.id === slug);
    if (pergunta) {
      const en = TEMAS_EN[slug];
      if (!en || en.revisao || !TITULOS_EN[slug]) return null;
      return { tema, pergunta, en };
    }
  }
  return null;
}

export function generateStaticParams() {
  return TEMAS.flatMap((t) =>
    t.perguntas
      .filter((p) => TEMAS_EN[p.id] && !TEMAS_EN[p.id].revisao && TITULOS_EN[p.id])
      .map((p) => ({ slug: p.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hit = encontrar(slug);
  if (!hit) return {};
  const { en } = hit;
  const descricao =
    en.passos[0]?.slice(0, 150) ??
    "Curated answer about Portuguese public services.";
  return {
    title: TITULOS_EN[slug],
    description: descricao,
    alternates: {
      canonical: `/en/p/${slug}`,
      languages: { "pt-PT": `/p/${slug}`, en: `/en/p/${slug}` },
    },
    openGraph: { locale: "en_GB" },
  };
}

export default async function PaginaPerguntaEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hit = encontrar(slug);
  if (!hit) notFound();
  const { tema, pergunta, en } = hit;
  const titulo = TITULOS_EN[slug];
  const temaTitulo = TEMAS_TITULO_EN[tema.id] ?? tema.titulo;

  const relacionadas = tema.perguntas
    .filter(
      (p) => p.id !== slug && TEMAS_EN[p.id] && !TEMAS_EN[p.id].revisao && TITULOS_EN[p.id]
    )
    .slice(0, 3);
  const contactos = contactosDeFontes(pergunta.resposta.fontes);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: {
      "@type": "Question",
      name: titulo,
      acceptedAnswer: {
        "@type": "Answer",
        text: en.passos.join(" "),
      },
    },
  };
  const BASE = SITE_URL;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: temaTitulo, item: `${BASE}/en/p` },
      { "@type": "ListItem", position: 3, name: titulo, item: `${BASE}/en/p/${slug}` },
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

      {/* Breadcrumb — Home > Topic > Question */}
      <nav aria-label="Breadcrumb" className="font-mono text-sm text-stone-600">
        <Link href="/" className="underline decoration-stone-300 underline-offset-2 hover:text-ink">
          Home
        </Link>
        <span aria-hidden> › </span>
        <Link href="/en/p" className="underline decoration-stone-300 underline-offset-2 hover:text-ink">
          {temaTitulo}
        </Link>
        <span aria-hidden> › </span>
        <span className="text-ink">{titulo}</span>
      </nav>

      <div className="mt-6 flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <p aria-hidden className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
            ▸ Answer page · {tema.entidade}
          </p>
          <h1 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
            {titulo}
          </h1>
          <p className="mt-3 text-base text-stone-600">
            Curated answer from the topic «{temaTitulo}».
          </p>
        </div>
        <ZePersonagem estado="normal" className="hidden w-24 shrink-0 self-start sm:block" />
      </div>

      <article className="mt-6 rounded-lg border-2 border-ink bg-white px-5 py-5 shadow-[4px_4px_0_#1b1d22]">
        <p aria-hidden className="font-mono text-xs font-bold uppercase tracking-widest text-stone-600">
          {tema.entidade} · {temaTitulo}
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
          {en.passos.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        {en.nota && (
          <p className="mt-3 rounded-md border-2 border-dashed border-amber-400/60 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {en.nota}
          </p>
        )}

        <p className="mt-3 rounded-md border-2 border-dashed border-azulejo/40 bg-azulejo-suave px-3 py-2 text-sm text-azulejo">
          Automatically translated. Always confirm on the official Portuguese
          source.
        </p>

        <div className="mt-4 space-y-2 border-t-2 border-dashed border-ink/15 pt-3">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-esferografica">
            Official sources
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
              <p key={c.telefone}>
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-ink">
                  Call — {c.entidades.join(" · ")}:
                </span>{" "}
                {c.telefone}
                {c.horario && (
                  <span className="text-stone-500"> — {c.horario}</span>
                )}
              </p>
            ))}
          </div>
        )}
      </article>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href={`/chat?q=${encodeURIComponent(titulo)}`}
          className="btn-primary px-5 py-2.5 text-sm"
        >
          Ask Zé more →
        </Link>
        <Link
          href="/en/p"
          className="font-mono text-sm text-azulejo underline underline-offset-2"
        >
          All questions
        </Link>
        <Partilhar
          texto={titulo}
          url={`${SITE_URL}/en/p/${slug}`}
          etiqueta="Share on WhatsApp"
        />
      </div>

      {relacionadas.length > 0 && (
        <div className="mt-8">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-carimbo-tinta">
            ▸ From the same counter
          </p>
          <ul className="mt-3 space-y-2">
            {relacionadas.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/en/p/${p.id}`}
                  className="inline-block rounded-md border-2 border-ink/25 bg-white px-3 py-2 text-sm font-medium transition-colors hover:border-ink hover:bg-form-amarelo/30"
                >
                  {TITULOS_EN[p.id]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-10 border-t-2 border-dashed border-ink/20 pt-4 text-sm text-stone-600">
        Guidance only — always confirm on the official source before acting.
        Independent project, not a government website.
      </p>
    </div>
  );
}
