import Link from "next/link";
import ZeMark from "@/components/ZeMark";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <ZeMark className="size-7" />
              <span className="font-display text-lg tracking-tight">
                Pergunta ao <span className="text-band-verde">Zé</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-stone-600">
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
            <Link href="/p" className="hover:text-ink">
              Todas as perguntas
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

        <div className="mt-10 flex flex-col gap-4 border-t border-stone-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-600">
            Informação de orientação — confirma sempre na fonte oficial antes de
            agir.
          </p>
          <div className="flex items-center gap-4 text-sm text-stone-600">
            <span>
              Feito por{" "}
              <a
                href="https://www.linkedin.com/in/pedropovoas/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-stone-600 underline-offset-2 hover:text-ink hover:underline"
              >
                Pedro Póvoas
              </a>
            </span>
            <a
              href="https://github.com/braindeadpt/pergunta-ao-ze"
              target="_blank"
              rel="noopener noreferrer"
              title="Código-fonte no GitHub — se o Zé ajudou, uma estrela ajuda o projeto"
              className="inline-flex items-center gap-1.5 rounded-md border-2 border-ink/50 px-3 py-1.5 font-mono text-sm font-bold uppercase tracking-wider text-stone-700 transition-all hover:border-ink hover:bg-form-amarelo/30 hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-3.5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
              GitHub
              <span aria-hidden="true" className="text-amber-500">★</span>
              <span className="sr-only">— dá uma estrela ao projeto</span>
            </a>
            <a
              href="https://www.linkedin.com/in/pedropovoas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pedro Póvoas no LinkedIn"
              className="text-stone-500 transition-colors hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
