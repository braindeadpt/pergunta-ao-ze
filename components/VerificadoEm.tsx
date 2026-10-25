import type { Lang } from "@/lib/i18n";

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
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const texto = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "pt-PT", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
  return (
    <span className={className}>
      {lang === "en" ? `Confirmed in ${texto}` : `Confirmado em ${texto}`}
    </span>
  );
}
