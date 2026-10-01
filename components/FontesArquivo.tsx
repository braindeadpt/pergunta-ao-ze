"use client";

import { useMemo, useRef, useState } from "react";
import type { ContactoEntidade, Fonte } from "@/lib/types";

export interface FichaFonte {
  dominio: string;
  nome: string;
  ambito: string;
  contacto?: ContactoEntidade;
  fontes: Fonte[];
}

export interface GrupoArquivo {
  rotulo: string;
  letra: string;
  fichas: FichaFonte[];
}

/* Separadores de pasta de arquivo — cores chapadas, texto com contraste AA */
const SEPARADORES = [
  { fundo: "#f5c518", texto: "#1b1d22" },
  { fundo: "#1b3fa0", texto: "#ffffff" },
  { fundo: "#d5232f", texto: "#ffffff" },
];

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function FontesArquivo({ grupos }: { grupos: GrupoArquivo[] }) {
  const [abertas, setAbertas] = useState<Set<string>>(new Set());
  const [pesquisa, setPesquisa] = useState("");
  const arquivo = useRef<HTMLDivElement>(null);

  const todas = grupos.flatMap((g) => g.fichas.map((f) => f.dominio));
  const todasAbertas = abertas.size === todas.length;

  const alternarTodas = () =>
    setAbertas(todasAbertas ? new Set() : new Set(todas));

  const alternar = (dominio: string) =>
    setAbertas((s) => {
      const n = new Set(s);
      if (n.has(dominio)) n.delete(dominio);
      else n.add(dominio);
      return n;
    });

  const q = norm(pesquisa.trim());
  const gruposVisiveis = useMemo(
    () =>
      q
        ? grupos
            .map((g) => ({
              ...g,
              fichas: g.fichas.filter(
                (f) => norm(f.nome).includes(q) || norm(f.dominio).includes(q)
              ),
            }))
            .filter((g) => g.fichas.length > 0)
        : grupos,
    [grupos, q]
  );
  const nVisiveis = gruposVisiveis.reduce((a, g) => a + g.fichas.length, 0);

  return (
    <div ref={arquivo}>
      {/* Barra de ferramentas do arquivo */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex flex-1 min-w-56 items-center gap-2 rounded-lg border-2 border-ink bg-white px-3 py-2 shadow-[3px_3px_0_#1b1d22] focus-within:shadow-[4px_4px_0_#1b1d22]">
          <span aria-hidden className="font-mono text-sm font-bold uppercase tracking-widest text-stone-600">
            ▸
          </span>
          <input
            type="search"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            placeholder="Procurar entidade ou domínio…"
            aria-label="Procurar entidade ou domínio no arquivo"
            className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
          />
        </label>
        <button
          onClick={alternarTodas}
          aria-expanded={todasAbertas}
          aria-controls="arquivo-fichas"
          className="carimbo bg-white !px-5 !py-2 !text-sm transition-transform hover:scale-105 active:scale-95"
          style={{ transform: "rotate(-3deg)" }}
        >
          {todasAbertas ? "Fechar todas" : "Abrir todas"}
        </button>
      </div>
      <p aria-live="polite" className="mt-2 font-mono text-sm text-stone-600">
        {q ? `${nVisiveis} fichas encontradas` : `${todas.length} fichas no arquivo`}
      </p>

      <div id="arquivo-fichas" className="mt-6 space-y-7">
        {gruposVisiveis.map((g, gi) => (
          <section key={g.letra}>
            <p className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.2em]">
              <span className="rounded border-2 border-ink bg-white px-2.5 py-1 shadow-[2px_2px_0_#1b1d22]">
                Balcão {gi + 1}
              </span>
              <span className="text-carimbo-tinta">— {g.rotulo}</span>
            </p>
            <div className="mt-3 grid gap-x-5 gap-y-3 sm:grid-cols-2 sm:gap-y-4">
              {g.fichas.map((f, i) => {
                const sep = SEPARADORES[(gi + i) % SEPARADORES.length];
                const aberta = abertas.has(f.dominio);
                return (
                  <section key={f.dominio} className="relative sm:pt-2.5">
                    {/* Separador da pasta — aba colorida a sair do topo */}
                    <div
                      aria-hidden
                      className="absolute left-6 top-0 hidden rounded-t-md border-2 border-b-0 border-ink px-2.5 font-mono text-[10px] font-bold uppercase leading-5 tracking-widest sm:block"
                      style={{ backgroundColor: sep.fundo, color: sep.texto }}
                    >
                      {f.dominio}
                    </div>
                    <div className="rounded-lg border-2 border-ink bg-white shadow-[4px_4px_0_#1b1d22]">
                      <button
                        onClick={() => alternar(f.dominio)}
                        aria-expanded={aberta}
                        aria-controls={`ficha-${f.dominio}`}
                        className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-left outline-band-verde outline-offset-2 focus-visible:outline-2 sm:py-2.5"
                      >
                        <span
                          aria-hidden
                          className={`font-mono text-sm transition-transform ${aberta ? "rotate-90" : ""}`}
                        >
                          ▸
                        </span>
                        <span className="font-display text-base uppercase tracking-tight">
                          {f.nome}
                        </span>
                        <span className="ml-auto flex shrink-0 items-center gap-2">
                          <span className="font-mono text-sm text-stone-600 sm:hidden">
                            {f.dominio}
                          </span>
                          <span className="rounded-md border-2 border-ink/40 px-2 py-0.5 font-mono text-sm font-bold uppercase tracking-widest text-stone-600">
                            {f.ambito}
                          </span>
                        </span>
                      </button>
                      {/* Detalhe — sempre no HTML (SEO), escondido até abrir */}
                      <div
                        id={`ficha-${f.dominio}`}
                        className={aberta ? "border-t-2 border-dashed border-ink/15 px-4 py-3" : "hidden"}
                      >
                        {f.contacto && (
                          <div className="mb-3 space-y-0.5 text-sm text-stone-700">
                            {f.contacto.telefone && (
                              <p>
                                <span className="font-mono text-sm font-bold uppercase tracking-wider text-ink">
                                  Ligar:
                                </span>{" "}
                                <a
                                  href={`tel:${f.contacto.telefone.split(" ou ")[0].replace(/\s/g, "")}`}
                                  className="font-medium text-ink"
                                >
                                  {f.contacto.telefone}
                                </a>
                                {f.contacto.horario && (
                                  <span className="text-stone-600">
                                    {" "}
                                    · {f.contacto.horario}
                                  </span>
                                )}
                              </p>
                            )}
                            {f.contacto.email && (
                              <p>
                                <span className="text-stone-600">Email:</span>{" "}
                                <a
                                  href={`mailto:${f.contacto.email}`}
                                  className="font-medium text-ink underline decoration-stone-300 underline-offset-2 hover:decoration-ink"
                                >
                                  {f.contacto.email}
                                </a>
                              </p>
                            )}
                            {f.contacto.nota && (
                              <p className="text-stone-600">{f.contacto.nota}</p>
                            )}
                          </div>
                        )}
                        <ul className="space-y-1.5">
                          {f.fontes.map((fo) => (
                            <li key={fo.url}>
                              <a
                                href={fo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-azulejo underline decoration-azulejo/30 underline-offset-2 hover:decoration-azulejo"
                              >
                                {fo.titulo} ↗
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
