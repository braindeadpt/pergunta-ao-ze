"use client";

import { usePathname } from "next/navigation";

/**
 * Aviso "informação de orientação" do rodapé — omite-se nas páginas /p/ e /en/p/,
 * que já mostram a mesma frase no fim da resposta (contexto certo).
 */
export default function AvisoRodape() {
  const pathname = usePathname();
  if (pathname?.startsWith("/p/") || pathname?.startsWith("/en/p/")) return <div />;
  if (pathname?.startsWith("/en")) {
    return (
      <p className="text-sm text-stone-600">
        Guidance only — always confirm on the official source before acting.
      </p>
    );
  }
  return (
    <p className="text-sm text-stone-600">
      Informação de orientação — confirma sempre na fonte oficial antes de
      agir.
    </p>
  );
}
