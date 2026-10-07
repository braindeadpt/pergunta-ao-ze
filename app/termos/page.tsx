import type { Metadata } from "next";
import ZePersonagem from "@/components/ZePersonagem";

export const metadata: Metadata = {
  title: "Termos de utilização",
  description:
    "O que o Pergunta ao Zé é (orientação com fontes oficiais) e não é (serviço do Estado nem aconselhamento jurídico).",
};

const SECCOES = [
  { id: "o-que-e", t: "O que o site é" },
  { id: "o-que-nao-e", t: "O que o site não é" },
  { id: "responsabilidade", t: "Responsabilidade" },
];

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
            ▸ Impresso Z-04 · ler antes de reclamar
          </p>
          <h1 className="mt-2 font-display text-4xl uppercase tracking-tight sm:text-5xl">
            Termos de utilização
          </h1>
        </div>
        <div className="relative hidden shrink-0 sm:block">
          <ZePersonagem estado="pensar" className="w-28" />
          <span
            aria-hidden
            className="carimbo absolute -left-8 top-16 rotate-[-8deg] bg-white text-xs"
          >
            Via do cidadão
          </span>
        </div>
      </div>

      {/* Índice — formulário de leitura */}
      <nav
        aria-label="Índice da página"
        className="mt-8 border-2 border-ink bg-form-amarelo/30 px-5 py-4 shadow-[4px_4px_0_#1b1d22]"
      >
        <p aria-hidden className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-stone-600">
          Índice · preencher por esta ordem
        </p>
        <ol className="mt-2 space-y-1">
          {SECCOES.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="font-mono text-sm font-medium text-azulejo underline decoration-azulejo/30 underline-offset-2 hover:decoration-azulejo"
              >
                {String(i + 1).padStart(2, "0")} — {s.t}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8 space-y-5 border-2 border-ink bg-white p-7 text-base leading-relaxed text-stone-700 shadow-[6px_6px_0_#1b1d22]">
        <p>
          O Pergunta ao Zé é um projeto independente de orientação sobre
          serviços públicos. Não é um site do Estado português e não fala em
          nome de nenhuma entidade pública.
        </p>
        <h2
          id="o-que-e"
          className="pt-2 font-display text-lg uppercase tracking-tight"
        >
          O que o site é
        </h2>
        <p>
          Um ponto de partida: responde a perguntas frequentes sobre serviços
          públicos e liga-te às páginas oficiais onde as decisões se tomam e os
          pedidos se fazem.
        </p>
        <h2
          id="o-que-nao-e"
          className="pt-2 font-display text-lg uppercase tracking-tight"
        >
          O que o site não é
        </h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Não presta aconselhamento jurídico, fiscal ou médico.</li>
          <li>Não marca atendimentos nem submete pedidos por ti.</li>
          <li>Não garante que a informação esteja atualizada a cada momento — os serviços mudam regras, prazos e preços.</li>
        </ul>
        <h2
          id="responsabilidade"
          className="pt-2 font-display text-lg uppercase tracking-tight"
        >
          Responsabilidade
        </h2>
        <p>
          Antes de agir com base numa resposta, confirma sempre na fonte
          oficial indicada. Em caso de divergência, vale a página oficial.
        </p>
      </div>
    </div>
  );
}
