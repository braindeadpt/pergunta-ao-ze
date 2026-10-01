import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:py-32">
      <p className="font-serif text-7xl font-semibold tracking-tight text-band-verde">
        404
      </p>
      <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight">
        Esta página entrou para a fila e nunca mais voltou.
      </h1>
      <p className="mt-4 text-stone-500">
        Acontece aos melhores. Volta ao início — ou salta a fila e pergunta
        diretamente ao Zé.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full border border-stone-300 px-6 py-2.5 text-sm font-medium transition-colors hover:border-band-verde hover:text-band-verde"
        >
          Voltar ao início
        </Link>
        <Link
          href="/chat"
          className="rounded-full bg-band-verde px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-band-verde-escuro"
        >
          Perguntar ao Zé
        </Link>
      </div>
    </div>
  );
}
