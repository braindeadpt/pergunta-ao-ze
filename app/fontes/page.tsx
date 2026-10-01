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
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        Fontes oficiais
      </h1>
      <p className="mt-3 text-stone-600">
        O Zé só responde com base nestas páginas — {stats.entidades} entidades,
        {" "}
        {stats.paginas} páginas. Todas pertencem ao Estado português ou à União
        Europeia.
      </p>

      <div className="mt-10 space-y-6">
        {grupos.map((g) => (
          <section
            key={g.entidade.dominio}
            className="rounded-2xl border border-stone-200 bg-white p-5"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-semibold">{g.entidade.nome}</h2>
              <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-500">
                {g.entidade.ambito}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-stone-400">{g.entidade.dominio}</p>
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
            <ul className="mt-4 space-y-2">
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
