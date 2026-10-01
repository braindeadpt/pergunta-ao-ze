/**
 * A cara do Zé — o balão de fala da marca ganha olhos e expressões.
 * DESIGN.md §2.2: normal | pisca (cumplicidade) | hmm (não sei)
 */
export default function ZeFace({
  className = "size-8",
  expressao = "normal",
}: {
  className?: string;
  expressao?: "normal" | "pisca" | "hmm";
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Zé"
    >
      <path
        d="M10 4 H38 A6 6 0 0 1 44 10 V30 A6 6 0 0 1 38 36 H24 L13 44 V36 H10 A6 6 0 0 1 4 30 V10 A6 6 0 0 1 10 4 Z"
        fill="#046a38"
      />
      {/* Olho esquerdo — sempre aberto */}
      <circle cx="18" cy="20" r="3.4" fill="#ffffff" />
      <circle cx="18" cy="20" r="1.5" fill="#0b3d24" />
      {/* Olho direito — aberto ou a piscar */}
      {expressao === "pisca" ? (
        <path
          d="M26.5 21 Q30 17.5 33.5 21"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      ) : (
        <>
          <circle cx="30" cy="20" r="3.4" fill="#ffffff" />
          <circle cx="30" cy="20" r="1.5" fill="#0b3d24" />
        </>
      )}
      {expressao === "hmm" ? (
        <path
          d="M17 14.5 Q21 12 25 14.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
      ) : null}
      {/* Boca: sorriso | sorriso (pisca) | linha reta (hmm) */}
      {expressao === "hmm" ? (
        <path
          d="M19 29 H29"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M17.5 27.5 Q24 33 30.5 27.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
