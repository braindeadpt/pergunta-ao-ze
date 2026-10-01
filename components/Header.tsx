import Link from "next/link";
import ZeMark from "@/components/ZeMark";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-paper/90 backdrop-blur">
      <div className="bg-band-verde-escuro px-4 py-1.5 text-center text-[13px] font-medium text-emerald-50">
        Projeto independente: não é um site do Estado.
      </div>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <ZeMark className="size-7" />
          <span className="font-serif text-lg font-semibold tracking-tight">
            Pergunta ao <span className="text-band-verde">Zé</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-stone-600 md:flex">
          <Link href="/#temas" className="hover:text-ink">
            O que podes perguntar
          </Link>
          <Link href="/#como-funciona" className="hover:text-ink">
            Como funciona
          </Link>
          <Link href="/fontes" className="hover:text-ink">
            Fontes
          </Link>
        </nav>

        <Link href="/chat" className="btn-primary px-4 py-1.5 text-sm">
          Perguntar ao Zé
        </Link>
      </div>
    </header>
  );
}
