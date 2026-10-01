import type { Metadata } from "next";
import { getFontes, getEstatisticas } from "@/lib/data/fontes";
import ZePersonagem from "@/components/ZePersonagem";

export const metadata: Metadata = {
  title: "Fontes oficiais",
  description:
    "As páginas oficiais que o Zé usa para responder — entidades nacionais e europeias.",
};

/* Separadores de pasta de arquivo — cores chapadas, texto com contraste AA */
const SEPARADORES = [
  { fundo: "#f5c518", texto: "#1b1d22" },
  { fundo: "#1b3fa0", texto: "#ffffff" },
  { fundo: "#d5232f", texto: "#ffffff" },
];

export default function FontesPage() {
  const grupos = getFontes();
  const stats = getEstatisticas();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
            ▸ Arquivo geral · repartições
          </p>
          <h1 className="mt-2 font-display text-4xl uppercase tracking-tight sm:text-5xl">
            Fontes oficiais
          </h1>
          <p className="mt-3 max-w-xl text-base text-stone-600">
            O Zé só responde com base nestas páginas — {stats.entidades}{" "}
            entidades, {stats.paginas} páginas. Todas pertencem ao Estado
            português ou à União Europeia.
          </p>
        </div>
        <ZePersonagem
          estado="normal"
          className="hidden w-28 shrink-0 sm:block"
        />
      </div>

      <div className="mt-12 space-y-10">
        {grupos.map((g, i) => {
          const sep = SEPARADORES[i % SEPARADORES.length];
          return (
            <section key={g.entidade.dominio} className="relative">
              {/* Separador da pasta — aba colorida a sair do topo */}
              <div
                aria-hidden
                className="absolute -top-5 left-6 rounded-t-md border-2 border-b-0 border-ink px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest"
                style={{ backgroundColor: sep.fundo, color: sep.texto }}
              >
                Pasta {String(i + 1).padStart(2, "0")}
              </div>
              <div
                className="rounded-lg rounded-tl-none border-2 border-ink bg-white p-6 shadow-[5px_5px_0_#1b1d22]"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.3 : 0.3}deg)` }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display text-xl uppercase tracking-tight">
                    {g.entidade.nome}
                  </h2>
                  <span className="shrink-0 rounded-md border-2 border-ink/40 px-2.5 py-0.5 font-mono text-sm font-bold uppercase tracking-widest text-stone-600">
                    {g.entidade.ambito}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-sm text-stone-600">
                  {g.entidade.dominio}
                </p>
                {g.entidade.contacto && (
                  <div className="mt-2.5 space-y-0.5 text-sm text-stone-700">
                    {g.entidade.contacto.telefone && (
                      <p>
                        <span className="text-stone-600">Telefone:</span>{" "}
                        <a
                          href={`tel:${g.entidade.contacto.telefone.split(" ou ")[0].replace(/\s/g, "")}`}
                          className="font-medium text-ink"
                        >
                          {g.entidade.contacto.telefone}
                        </a>
                        {g.entidade.contacto.horario && (
                          <span className="text-stone-600">
                            {" "}
                            · {g.entidade.contacto.horario}
                          </span>
                        )}
                      </p>
                    )}
                    {g.entidade.contacto.email && (
                      <p>
                        <span className="text-stone-600">Email:</span>{" "}
                        <a
                          href={`mailto:${g.entidade.contacto.email}`}
                          className="font-medium text-ink underline decoration-stone-300 underline-offset-2 hover:decoration-ink"
                        >
                          {g.entidade.contacto.email}
                        </a>
                      </p>
                    )}
                    {g.entidade.contacto.nota && (
                      <p className="text-stone-600">{g.entidade.contacto.nota}</p>
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
                        className="text-sm font-medium text-azulejo underline decoration-azulejo/30 underline-offset-2 hover:decoration-azulejo"
                      >
                        {f.titulo} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-12 border-t-2 border-dashed border-ink/20 pt-4 text-sm text-stone-600">
        Falta uma repartição?{" "}
        <a
          href="https://github.com/braindeadpt/pergunta-ao-ze/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-azulejo underline underline-offset-2"
        >
          Abre uma issue ↗
        </a>
      </p>
    </div>
  );
}
