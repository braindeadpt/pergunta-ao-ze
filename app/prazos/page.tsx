import type { Metadata } from "next";
import Link from "next/link";
import { prazosAtivos, hojePt } from "@/lib/data/prazos";
import { SITE_URL } from "@/lib/site";
import VerificadoEm from "@/components/VerificadoEm";
import Partilhar from "@/components/Partilhar";
import type { Prazo } from "@/lib/types";

export const metadata: Metadata = {
  title: "Prazos do ano — IRS, IMI, e-fatura",
  description:
    "Os prazos que interessam ao cidadão português, com datas confirmadas nas fontes oficiais e botão para adicionar ao calendário.",
  alternates: { canonical: "/prazos" },
};

function dataCurta(iso: string) {
  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

function periodo(p: Prazo) {
  if (!p.inicio || p.inicio === p.fim) return dataCurta(p.fim);
  return `${dataCurta(p.inicio)} → ${dataCurta(p.fim)}`;
}

function CartaoPrazo({ p }: { p: Prazo }) {
  return (
    <li className="rounded-lg border-2 border-ink bg-white px-5 py-4 shadow-[4px_4px_0_#1b1d22]">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-carimbo-tinta">
        {periodo(p)}
        {p.recorrente === "anual" && " · anual"}
      </p>
      <h2 className="mt-1 font-display text-lg uppercase leading-snug">
        {p.titulo}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-700">
        {p.descricao}
      </p>
      <p className="mt-2 font-mono text-xs text-stone-500">
        Fonte:{" "}
        <a
          href={p.fonte.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-azulejo underline underline-offset-2"
        >
          {p.fonte.dominio}
        </a>
        <VerificadoEm
          iso={p.verificadoEm}
          lang="pt"
          className="before:content-['_·_']"
        />
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <a
          href={`/prazos/${p.id}`}
          download={`${p.id}.ics`}
          className="btn-outline px-3 py-1.5 text-xs"
        >
          Adicionar ao calendário
        </a>
        {p.perguntaId && (
          <Link
            href={`/p/${p.perguntaId}`}
            className="font-mono text-xs text-azulejo underline underline-offset-2"
          >
            Ver a resposta →
          </Link>
        )}
        <Partilhar
          texto={`${p.titulo} — ${periodo(p)}`}
          url={`${SITE_URL}/prazos`}
          etiqueta="Partilhar"
        />
      </div>
    </li>
  );
}

export default function PaginaPrazos() {
  const hoje = hojePt();
  const mesAtual = hoje.slice(0, 7);
  const ativos = prazosAtivos();
  const esteMes = ativos.filter((p) => p.fim.slice(0, 7) === mesAtual);
  const proximos = ativos.filter((p) => p.fim.slice(0, 7) !== mesAtual);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav aria-label="Caminho" className="font-mono text-sm text-stone-600">
        <Link
          href="/"
          className="underline decoration-stone-300 underline-offset-2 hover:text-ink"
        >
          Início
        </Link>
        <span aria-hidden> › </span>
        <span className="text-ink">Prazos</span>
      </nav>

      <p className="mt-6 font-mono text-sm font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
        ▸ Não percas o prazo
      </p>
      <h1 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
        Prazos do ano
      </h1>
      <p className="mt-3 text-base text-stone-600">
        Datas confirmadas nas fontes oficiais. Cada prazo tem um ficheiro de
        calendário (.ics) — ou subscreve{" "}
        <a
          href="/prazos/todos.ics"
          className="font-mono text-sm text-azulejo underline underline-offset-2"
        >
          todos de uma vez
        </a>
        .
      </p>

      {esteMes.length > 0 && (
        <>
          <h2 className="mt-8 font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink">
            ▸ Este mês
          </h2>
          <ul className="mt-3 space-y-4">
            {esteMes.map((p) => (
              <CartaoPrazo key={p.id} p={p} />
            ))}
          </ul>
        </>
      )}

      {proximos.length > 0 && (
        <>
          <h2 className="mt-8 font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink">
            ▸ Próximos
          </h2>
          <ul className="mt-3 space-y-4">
            {proximos.map((p) => (
              <CartaoPrazo key={p.id} p={p} />
            ))}
          </ul>
        </>
      )}

      <p className="mt-10 border-t-2 border-dashed border-ink/20 pt-4 text-sm text-stone-600">
        Datas de calendário em Portugal continental. Confirma sempre na fonte
        oficial antes de agir — se o último dia calhar a fim de semana ou
        feriado, a regra é poderes cumprir até ao dia útil seguinte.
      </p>
    </div>
  );
}
