"use client";

import { useEffect, useRef } from "react";

/**
 * O Zé completo — cabeça de balão verde + corpo atrás do balcão.
 * DESIGN.md §2.2: estados normal | pensar | carimbar | panico | aliviado.
 * Traço grosso, cores chapadas. `olhosVivos` = os olhos seguem o cursor.
 */
export type EstadoZe = "normal" | "pensar" | "carimbar" | "panico" | "aliviado";

export default function ZePersonagem({
  estado = "normal",
  olhosVivos = false,
  className = "w-full",
}: {
  estado?: EstadoZe;
  olhosVivos?: boolean;
  className?: string;
}) {
  const pupilas = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!olhosVivos) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const svg = pupilas.current?.ownerSVGElement;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width * 0.52)) / 260)) * 1.3;
      const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height * 0.24)) / 260)) * 1.1;
      pupilas.current!.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [olhosVivos]);

  const olhosFechados = estado === "aliviado";
  const olhosArregalados = estado === "panico";
  const rOlho = olhosArregalados ? 4.4 : 3.4;
  const rPupila = olhosArregalados ? 2 : 1.5;
  const offPensar = estado === "pensar" && !olhosVivos ? "translate(0.9px, -1.6px)" : undefined;

  return (
    <svg
      viewBox="0 0 340 300"
      className={className}
      role="img"
      aria-label="O Zé, atrás do balcão"
    >
      {/* ── Papéis voadores (pânico) ── */}
      {estado === "panico" && (
        <g stroke="#1b1d22" strokeWidth="2.5" fill="#fff">
          <rect x="52" y="46" width="40" height="28" transform="rotate(-18 72 60)" />
          <rect x="262" y="34" width="40" height="28" transform="rotate(14 282 48)" />
          <rect x="292" y="110" width="36" height="24" transform="rotate(28 310 122)" />
        </g>
      )}

      {/* ── Braços (mangas azul-esferográfica, mãos brancas) ── */}
      <g fill="none" stroke="#1b3fa0" strokeWidth="13" strokeLinecap="round">
        {estado === "panico" ? (
          <>
            <path d="M146 182 Q118 156 108 124" />
            <path d="M206 182 Q238 154 250 122" />
          </>
        ) : (
          <>
            <path d="M148 184 Q122 190 108 206" />
            {estado === "pensar" ? (
              <path d="M204 184 Q200 168 168 160" />
            ) : estado === "carimbar" ? (
              <path d="M204 182 Q236 152 252 118" />
            ) : (
              <path d="M204 184 Q230 190 244 204" />
            )}
          </>
        )}
      </g>
      {/* Mãos */}
      <g fill="#fff" stroke="#1b1d22" strokeWidth="3">
        {estado === "panico" ? (
          <>
            <circle cx="106" cy="118" r="8" />
            <circle cx="252" cy="116" r="8" />
          </>
        ) : (
          <>
            <circle cx="105" cy="208" r="8" />
            {estado === "pensar" ? (
              <circle cx="163" cy="159" r="8" />
            ) : estado === "carimbar" ? (
              <circle cx="255" cy="112" r="8" />
            ) : (
              <circle cx="247" cy="206" r="8" />
            )}
          </>
        )}
      </g>
      {/* Carimbo na mão (estado carimbar) */}
      {estado === "carimbar" && (
        <g transform="rotate(-14 258 92)" stroke="#1b1d22" strokeWidth="3">
          <rect x="242" y="86" width="34" height="16" rx="3" fill="#d5232f" />
          <rect x="253" y="70" width="12" height="16" rx="3" fill="#f5c518" />
        </g>
      )}

      {/* ── Torso (camisa azul-esferográfica) ── */}
      <path
        d="M136 214 L142 166 Q176 156 210 166 L216 214 Z"
        fill="#1b3fa0"
        stroke="#1b1d22"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Crachá */}
      <g transform="rotate(-5 196 186)">
        <rect x="182" y="176" width="30" height="18" rx="2.5" fill="#fff" stroke="#1b1d22" strokeWidth="2.5" />
        <text
          x="197"
          y="188.5"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fontWeight="700"
          fill="#1b1d22"
        >
          ZÉ
        </text>
      </g>

      {/* ── Cabeça: o balão verde ── */}
      <g transform="translate(92,6) scale(3.5)">
        <path
          d="M10 4 H38 A6 6 0 0 1 44 10 V30 A6 6 0 0 1 38 36 H24 L13 44 V36 H10 A6 6 0 0 1 4 30 V10 A6 6 0 0 1 10 4 Z"
          fill="#046a38"
          stroke="#1b1d22"
          strokeWidth="1.4"
        />
        {/* Caneta atrás da "orelha" */}
        <g transform="rotate(16 45 18)">
          <rect x="44.4" y="12" width="2.6" height="9" rx="1" fill="#f5c518" stroke="#1b1d22" strokeWidth="0.7" />
          <path d="M44.4 21 L45.7 24 L47 21 Z" fill="#1b1d22" />
        </g>
        {/* Olhos */}
        {olhosFechados ? (
          <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
            <path d="M14.5 19.5 Q18 23 21.5 19.5" />
            <path d="M26.5 19.5 Q30 23 33.5 19.5" />
          </g>
        ) : (
          <>
            <circle cx="18" cy="20" r={rOlho} fill="#fff" />
            <circle cx="30" cy="20" r={rOlho} fill="#fff" />
            <g ref={pupilas} style={{ transform: offPensar }}>
              <circle cx="18" cy="20" r={rPupila} fill="#0b3d24" />
              <circle cx="30" cy="20" r={rPupila} fill="#0b3d24" />
            </g>
          </>
        )}
        {/* Óculos */}
        <g fill="none" stroke="#1b1d22" strokeWidth="1.5">
          <circle cx="18" cy="20" r="5.4" />
          <circle cx="30" cy="20" r="5.4" />
          <path d="M23.4 19 Q24 17.6 24.6 19" />
          <path d="M12.6 19.5 L4.6 17.5" />
          <path d="M35.4 19.5 L43.4 17.5" />
        </g>
        {/* Sobrancelhas expressivas */}
        {(estado === "pensar" || estado === "panico") && (
          <g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
            {estado === "pensar" ? (
              <path d="M14 12.8 Q18 10.8 22 12.4" />
            ) : (
              <>
                <path d="M14 12.6 Q18 10.4 22 12.6" />
                <path d="M26 12.6 Q30 10.4 34 12.6" />
              </>
            )}
          </g>
        )}
        {/* Boca */}
        {estado === "panico" ? (
          <ellipse cx="24" cy="29" rx="3.6" ry="4" fill="#fff" />
        ) : estado === "pensar" ? (
          <path
            d="M19 29.5 Q24 31 29 29"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        ) : estado === "carimbar" ? (
          <path
            d="M18 27.5 Q24 31 30 27.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        ) : estado === "aliviado" ? (
          <path
            d="M16 26.5 Q24 34.5 32 26.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M17.5 27.5 Q24 33 30.5 27.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        )}
        {/* Gota de suor (pânico) */}
        {estado === "panico" && (
          <path
            d="M45 9 Q47.5 13 45.6 16 A2.6 2.6 0 0 1 43 16 Q41.8 13 45 9 Z"
            fill="#7ec8f0"
            stroke="#1b1d22"
            strokeWidth="0.7"
          />
        )}
      </g>

      {/* ── Balcão ── */}
      <rect
        x="10"
        y="208"
        width="320"
        height="84"
        rx="6"
        fill="#f5e27a"
        stroke="#1b1d22"
        strokeWidth="4"
      />
      {/* Placa do balcão */}
      <g>
        <rect x="136" y="238" width="68" height="24" rx="3" fill="#fff" stroke="#1b1d22" strokeWidth="3" />
        <text
          x="170"
          y="253.5"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1"
          fill="#1b1d22"
        >
          BALCÃO
        </text>
      </g>
      {/* Pilha de papéis no balcão */}
      <g stroke="#1b1d22" strokeWidth="2.5" fill="#fff">
        <rect x="258" y="196" width="52" height="14" rx="1.5" transform="rotate(-4 284 203)" />
        <rect x="262" y="190" width="52" height="14" rx="1.5" transform="rotate(3 288 197)" />
        <rect x="256" y="184" width="52" height="14" rx="1.5" transform="rotate(-2 282 191)" />
      </g>
      <g stroke="#1b1d22" strokeWidth="1.2" opacity="0.55">
        <line x1="262" y1="189" x2="298" y2="187" />
        <line x1="263" y1="193" x2="294" y2="191.4" />
        <line x1="266" y1="197.5" x2="304" y2="196" />
      </g>
      {/* Carimbo pousado no balcão (quando não está na mão) */}
      {estado !== "carimbar" && (
        <g stroke="#1b1d22" strokeWidth="2.5">
          <rect x="44" y="192" width="30" height="14" rx="3" fill="#d5232f" />
          <rect x="52" y="180" width="14" height="12" rx="4" fill="#f5c518" />
        </g>
      )}
    </svg>
  );
}
