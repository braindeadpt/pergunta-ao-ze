"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ZeMark from "@/components/ZeMark";

const LINKS_DESKTOP_PT = [
  { href: "/#temas", rotulo: "Senhas" },
  { href: "/prazos", rotulo: "Prazos" },
  { href: "/fontes", rotulo: "Fontes" },
  { href: "/p", rotulo: "Arquivo" },
] as const;

const LINKS_MOBILE_PT = [
  { href: "/#temas", rotulo: "Senhas" },
  { href: "/prazos", rotulo: "Prazos" },
  { href: "/fontes", rotulo: "Fontes" },
  { href: "/p", rotulo: "Todas as perguntas" },
] as const;

const LINKS_DESKTOP_EN = [
  { href: "/#temas", rotulo: "Tickets" },
  { href: "/prazos", rotulo: "Deadlines" },
  { href: "/fontes", rotulo: "Sources" },
  { href: "/en/p", rotulo: "All questions" },
] as const;

const LINKS_MOBILE_EN = [
  { href: "/#temas", rotulo: "Tickets" },
  { href: "/prazos", rotulo: "Deadlines" },
  { href: "/fontes", rotulo: "Sources" },
  { href: "/en/p", rotulo: "All questions" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);
  const botaoMenuRef = useRef<HTMLButtonElement>(null);
  const emIngles = pathname?.startsWith("/en") ?? false;
  const linksDesktop = emIngles ? LINKS_DESKTOP_EN : LINKS_DESKTOP_PT;
  const linksMobile = emIngles ? LINKS_MOBILE_EN : LINKS_MOBILE_PT;

  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuAberto) return;
    const aoPremirTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuAberto(false);
        botaoMenuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", aoPremirTecla);
    return () => window.removeEventListener("keydown", aoPremirTecla);
  }, [menuAberto]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const aoMudar = () => {
      if (mq.matches) setMenuAberto(false);
    };
    mq.addEventListener("change", aoMudar);
    return () => mq.removeEventListener("change", aoMudar);
  }, []);

  const linkAtivo = (href: string) =>
    href !== "/#temas" &&
    (pathname === href ||
      (href === "/p" && pathname.startsWith("/p/")) ||
      (href === "/en/p" &&
        (pathname === "/en/p" || pathname.startsWith("/en/p/"))));

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="led-bar px-4 py-2 text-center text-sm font-bold uppercase">
        {emIngles
          ? "Independent project · not a government website"
          : "Projeto independente · não é um site do Estado"}
      </div>
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
        <Link
          href="/"
          onClick={() => setMenuAberto(false)}
          className="flex shrink-0 items-center gap-2 sm:gap-2.5"
        >
          <ZeMark className="size-7" decorativo />
          <span className="font-display text-base tracking-tight sm:text-lg">
            Pergunta ao <span className="text-band-verde">Zé</span>
          </span>
        </Link>

        <nav
          aria-label={emIngles ? "Main navigation" : "Navegação principal"}
          className="hidden items-center gap-5 font-mono text-sm font-bold uppercase tracking-wider text-stone-600 md:flex lg:gap-6"
        >
          {linksDesktop.map((item) => {
            const ativo = linkAtivo(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={
                  ativo
                    ? "text-band-verde underline decoration-2 underline-offset-4"
                    : "hover:text-band-verde"
                }
              >
                {item.rotulo}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/chat"
            onClick={() => setMenuAberto(false)}
            className="btn-primary px-3 py-1.5 text-xs sm:px-4 sm:text-sm"
          >
            {emIngles ? "Ask Zé" : "Perguntar ao Zé"}
          </Link>

          <button
            ref={botaoMenuRef}
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={
              menuAberto
                ? emIngles
                  ? "Close navigation menu"
                  : "Fechar menu de navegação"
                : emIngles
                  ? "Open navigation menu"
                  : "Abrir menu de navegação"
            }
            className={`inline-flex size-9 items-center justify-center rounded-lg border-2 border-ink text-ink shadow-[2px_2px_0_#1b1d22] transition-all md:hidden ${
              menuAberto
                ? "translate-x-0.5 translate-y-0.5 bg-form-amarelo/50 shadow-none"
                : "bg-white hover:bg-form-amarelo/25"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              {menuAberto ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label={emIngles ? "Mobile menu" : "Menu móvel"}
        className={
          menuAberto
            ? "border-t-2 border-ink bg-paper px-4 py-3 md:hidden"
            : "hidden"
        }
      >
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-2.5">
          {linksMobile.map((item) => {
            const ativo = linkAtivo(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuAberto(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`flex items-center justify-between rounded-lg border-2 border-ink px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_#1b1d22] transition-colors ${
                    ativo
                      ? "bg-form-amarelo/45 text-ink"
                      : "bg-white text-ink hover:bg-form-amarelo/25"
                  }`}
                >
                  <span>{item.rotulo}</span>
                  <span aria-hidden="true" className="text-stone-500">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
