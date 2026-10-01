import Link from "next/link";
import ZePersonagem from "@/components/ZePersonagem";
import SenhaTema from "@/components/SenhaTema";
import { TEMAS } from "@/lib/data/temas";

const SUGESTOES = ["cartao-de-cidadao", "sns", "irs-financas"];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <div className="text-center">
        <ZePersonagem estado="panico" className="mx-auto w-56 sm:w-64" />

        {/* A senha gigante — número fora de range */}
        <div className="senha mx-auto mt-8 max-w-md -rotate-1">
          <div className="senha-stub px-6 pb-4 pt-6">
            <p aria-hidden className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
              Atendimento · balcão errado
            </p>
            <p className="mt-1 font-mono text-7xl font-bold tracking-tight sm:text-8xl">
              A-404
            </p>
            <p className="mt-2 font-mono text-sm font-bold uppercase tracking-widest text-carimbo-tinta sm:text-base">
              A sua vez é daqui a 3 anos
            </p>
          </div>
          <div className="senha-corte" aria-hidden />
          <div className="px-6 pb-7 pt-4">
            <h1 className="font-display text-2xl uppercase leading-tight">
              Esta página perdeu a senha
            </h1>
            <p className="mt-3 text-base text-stone-600">
              Entrou para a fila e nunca mais voltou. Acontece aos melhores
              impressos.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/" className="btn-outline px-5 py-2.5 text-sm">
                Voltar ao balcão (home)
              </Link>
              <Link href="/chat" className="btn-primary px-5 py-2.5 text-sm">
                Perguntar ao Zé
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Saída útil — senhas-sugestão */}
      <p className="mt-14 text-center font-mono text-sm font-bold uppercase tracking-[0.2em] text-carimbo-tinta">
        ▸ Ou tira outra senha
      </p>
      <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
        {SUGESTOES.map((id, j) => {
          const tema = TEMAS.find((t) => t.id === id);
          if (!tema) return null;
          return (
            <SenhaTema
              key={id}
              tema={tema}
              i={j}
              fundo="#faf6ec"
              numero={`E-${String(j + 1).padStart(3, "0")}`}
            />
          );
        })}
      </div>
    </div>
  );
}
