import Link from "next/link";
import ZeMark from "@/components/ZeMark";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <ZeMark className="size-7" />
              <span className="font-serif text-lg font-semibold tracking-tight">
                Pergunta ao <span className="text-band-verde">Zé</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-stone-500">
              Projeto independente: não é um site do Estado. Aponta para as
              páginas oficiais, mas não fala em nome de nenhuma entidade.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm text-stone-600">
            <Link href="/#temas" className="hover:text-ink">
              O que podes perguntar
            </Link>
            <Link href="/#como-funciona" className="hover:text-ink">
              Como funciona
            </Link>
            <Link href="/fontes" className="hover:text-ink">
              Fontes
            </Link>
            <Link href="/chat" className="hover:text-ink">
              Perguntar ao Zé
            </Link>
            <Link href="/privacidade" className="hover:text-ink">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-ink">
              Termos de utilização
            </Link>
          </nav>
        </div>

        <p className="mt-10 border-t border-stone-100 pt-6 text-xs text-stone-400">
          Informação de orientação — confirma sempre na fonte oficial antes de
          agir.
        </p>
      </div>
    </footer>
  );
}
