import type { Metadata } from "next";
import { getFontes, getEstatisticas } from "@/lib/data/fontes";

export const metadata: Metadata = {
  title: "Fontes oficiais",
  description:
    "As páginas oficiais que o Zé usa para responder — entidades nacionais e europeias.",
};

export default function FontesPage() {
  const grupos = getFontes();
  const stats = getEstatisticas();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-band-vermelho">
        ▸ Diretório de repartições
      </p>
      <h1 className="mt-2 font-display text-4xl uppercase tracking-tight">
        Fontes oficiais
      </h1>
      <p className="mt-3 text-stone-600">
        O Zé só responde com base nestas páginas — {stats.entidades} entidades,
        {" "}
        {stats.paginas} páginas. Todas pertencem ao Estado português ou à União
        Europeia.
      </p>

      <div className="mt-10 space-y-7">
        {grupos.map((g, i) => (
          <section
            key={g.entidade.dominio}
            className="rounded-lg border-2 border-ink bg-white p-6 shadow-[5px_5px_0_#1b1d22]"
            style={{ transform: `rotate(${i % 2 === 0 ? -0.4 : 0.4}deg)` }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-xl">{g.entidade.nome}</h2>
              <span className="shrink-0 rounded-md border-2 border-ink/40 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-stone-500">
                {g.entidade.ambito}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-xs text-stone-400">
              {g.entidade.dominio}
            </p>
            {g.entidade.contacto && (
              <div className="mt-2.5 space-y-0.5 text-sm text-stone-600">
                {g.entidade.contacto.telefone && (
                  <p>
                    <span className="text-stone-400">Telefone:</span>{" "}
                    <a
                      href={`tel:${g.entidade.contacto.telefone.split(" ou ")[0].replace(/\s/g, "")}`}
                      className="font-medium text-ink"
                    >
                      {g.entidade.contacto.telefone}
                    </a>
                    {g.entidade.contacto.horario && (
                      <span className="text-stone-400">
                        {" "}
                        · {g.entidade.contacto.horario}
                      </span>
                    )}
                  </p>
                )}
                {g.entidade.contacto.email && (
                  <p>
                    <span className="text-stone-400">Email:</span>{" "}
                    <a
                      href={`mailto:${g.entidade.contacto.email}`}
                      className="font-medium text-ink underline decoration-stone-300 underline-offset-2 hover:decoration-ink"
                    >
                      {g.entidade.contacto.email}
                    </a>
                  </p>
                )}
                {g.entidade.contacto.nota && (
                  <p className="text-stone-400">{g.entidade.contacto.nota}</p>
                )}
              </div>
            )}
            <ul className="mt-4 space-y-2 border-t-2 border-dashed border-ink/15 pt-4">
              {g.fontes.map((f) => (
                <li key={f.url}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-azulejo underline decoration-azulejo/30 underline-offset-2 hover:decoration-azulejo"
                  >
                    {f.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
