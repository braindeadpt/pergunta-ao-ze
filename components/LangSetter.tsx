"use client";

import { useEffect } from "react";

/** O html lang só existe no layout raiz — nas páginas /en/* corrigimo-lo
 *  aqui, para a11y e sinal linguístico consistente com o conteúdo. */
export default function LangSetter({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "pt-PT";
    };
  }, [lang]);
  return null;
}
