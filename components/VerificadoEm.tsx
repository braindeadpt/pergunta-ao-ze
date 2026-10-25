import type { Lang } from "@/lib/i18n";
import { formatarMesAno } from "@/lib/i18n";

/** "Confirmado em out. 2026" / "Confirmed in Oct 2026" — só renderiza se a
 *  resposta tiver `verificadoEm` válido (AAAA-MM-DD). */
export default function VerificadoEm({
  iso,
  lang = "pt",
  className = "",
}: {
  iso?: string;
  lang?: Lang;
  className?: string;
}) {
  if (!iso) return null;
  const texto = formatarMesAno(iso, lang);
  if (!texto) return null;
  return (
    <span className={className}>
      {lang === "en" ? `Confirmed in ${texto}` : `Confirmado em ${texto}`}
    </span>
  );
}
