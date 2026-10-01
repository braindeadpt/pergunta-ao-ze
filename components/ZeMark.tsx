/**
 * Marca do Zé — balão de fala verde com "Zé".
 * Um balão porque o produto é literalmente uma pergunta.
 */
export default function ZeMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={className}
      role="img"
      aria-label="Pergunta ao Zé"
    >
      <path
        d="M5.5 2 H22.5 A3.5 3.5 0 0 1 26 5.5 V16.5 A3.5 3.5 0 0 1 22.5 20 H14 L7.5 26 V20 H5.5 A3.5 3.5 0 0 1 2 16.5 V5.5 A3.5 3.5 0 0 1 5.5 2 Z"
        fill="#046a38"
      />
      <text
        x="14"
        y="14.5"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="10.5"
        fill="#ffffff"
        textAnchor="middle"
      >
        Zé
      </text>
    </svg>
  );
}
