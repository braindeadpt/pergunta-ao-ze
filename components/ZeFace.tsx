/**
 * A cara do Zé — o balão de fala da marca ganha olhos e sorriso.
 * Usado nos avatares do chat, hero e momentos vazios.
 */
export default function ZeFace({ className = "size-8" }: { className?: string }) {
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
      <circle cx="18" cy="20" r="3.4" fill="#ffffff" />
      <circle cx="30" cy="20" r="3.4" fill="#ffffff" />
      <circle cx="18" cy="20" r="1.5" fill="#0b3d24" />
      <circle cx="30" cy="20" r="1.5" fill="#0b3d24" />
      <circle cx="13.5" cy="26" r="2.1" fill="#ffffff" opacity="0.28" />
      <circle cx="34.5" cy="26" r="2.1" fill="#ffffff" opacity="0.28" />
      <path
        d="M17.5 27.5 Q24 33 30.5 27.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
