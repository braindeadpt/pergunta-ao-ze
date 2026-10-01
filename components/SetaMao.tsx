/**
 * Seta desenhada à mão — traço irregular a apontar para algo.
 * DESIGN.md §5.6. className controla posição/rotação.
 */
export default function SetaMao({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 70"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Traço irregular com pequeno desvio — desenhado à mão */}
      <path d="M8 12 C30 8, 55 14, 72 30 C82 40, 92 48, 104 52" />
      <path d="M88 42 C94 46, 100 50, 106 54" />
      <path d="M90 58 C95 56, 101 55, 107 54" />
    </svg>
  );
}
