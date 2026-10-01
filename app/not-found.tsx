import Link from "next/link";
import ZePersonagem from "@/components/ZePersonagem";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:py-20">
      <ZePersonagem estado="panico" className="mx-auto w-56" />

      {/* Senha perdida */}
      <div className="senha mx-auto mt-6 max-w-sm -rotate-1">
        <div className="senha-stub px-6 pb-3 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-400">
            Atendimento · balcão errado
          </p>
          <p className="mt-1 font-mono text-5xl font-bold tracking-tight">404</p>
          <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-widest text-band-vermelho">
            A sua vez é daqui a 3 anos
          </p>
        </div>
        <div className="senha-corte" aria-hidden />
        <div className="px-6 pb-7 pt-4">
          <h1 className="font-display text-xl uppercase leading-tight">
            Esta página perdeu a senha
          </h1>
          <p className="mt-3 text-[15px] text-stone-600">
            Entrou para a fila e nunca mais voltou. Acontece aos melhores
            impressos.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-outline px-5 py-2.5 text-sm">
              Voltar ao início
            </Link>
            <Link href="/chat" className="btn-primary px-5 py-2.5 text-sm">
              Perguntar ao Zé
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
