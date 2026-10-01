import Link from "next/link";
import ZeMark from "@/components/ZeMark";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="led-bar px-4 py-2 text-center text-xs font-bold uppercase md:text-sm">
        Projeto independente · não é um site do Estado
      </div>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <ZeMark className="size-7" />
          <span className="font-display text-lg tracking-tight">
            Pergunta ao <span className="text-band-verde">Zé</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 font-mono text-xs font-bold uppercase tracking-wider text-stone-600 md:flex">
          <Link href="/#temas" className="hover:text-band-verde">
            Senhas
          </Link>
          <Link href="/#como-funciona" className="hover:text-band-verde">
            Como funciona
          </Link>
          <Link href="/fontes" className="hover:text-band-verde">
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
