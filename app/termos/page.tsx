import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de utilização",
};

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        Termos de utilização
      </h1>
      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-stone-700">
        <p>
          O Pergunta ao Zé é um projeto independente de orientação sobre
          serviços públicos. Não é um site do Estado português e não fala em
          nome de nenhuma entidade pública.
        </p>
        <h2 className="pt-2 font-serif text-xl font-semibold">
          O que o site é
        </h2>
        <p>
          Um ponto de partida: responde a perguntas frequentes sobre serviços
          públicos e liga-te às páginas oficiais onde as decisões se tomam e os
          pedidos se fazem.
        </p>
        <h2 className="pt-2 font-serif text-xl font-semibold">
          O que o site não é
        </h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Não presta aconselhamento jurídico, fiscal ou médico.</li>
          <li>Não marca atendimentos nem submete pedidos por ti.</li>
          <li>Não garante que a informação esteja atualizada a cada momento — os serviços mudam regras, prazos e preços.</li>
        </ul>
        <h2 className="pt-2 font-serif text-xl font-semibold">
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
