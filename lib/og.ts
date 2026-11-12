import { TEMAS } from "./data/temas.ts";
import type { Lang } from "./i18n.ts";

/* Base das imagens OG — usada por app/opengraph-image.tsx (global) e por
   app/(en/)p/[slug]/opengraph-image.tsx (uma por resposta curada).
   Sem JSX aqui: este ficheiro é importado pelos testes em Node. */

/* O Zé a carimbar — mesma arte do ZePersonagem, como string (o satori
   não renderiza <svg> diretamente; vai num <img> data-uri).
   Zero tags <text>: ZÉ e BALCÃO são paths vetoriais para o Resvg não
   renderizar caixas brancas vazias sem fontes embebidas no SVG. */
export const ZE_SVG = `<svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#1b3fa0" stroke-width="13" stroke-linecap="round">
    <path d="M148 184 Q122 190 108 206"/>
    <path d="M206 182 Q248 158 276 116"/>
  </g>
  <circle cx="105" cy="208" r="8" fill="#fff" stroke="#1b1d22" stroke-width="3"/>
  <path d="M136 214 L142 166 Q176 156 210 166 L216 214 Z" fill="#1b3fa0" stroke="#1b1d22" stroke-width="3.5" stroke-linejoin="round"/>
  <g transform="rotate(-5 196 186)">
    <rect x="182" y="176" width="30" height="18" rx="2.5" fill="#fff" stroke="#1b1d22" stroke-width="2.5"/>
    <path d="M190 182.3 H195.4 L190 189.3 H195.4 M204 182.3 H198.6 V189.3 H204 M198.6 185.8 H203.1 M200.6 180.3 L202.5 178.5" fill="none" stroke="#1b1d22" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <g transform="translate(92,6) scale(3.5)">
    <path d="M10 4 H38 A6 6 0 0 1 44 10 V30 A6 6 0 0 1 38 36 H24 L13 44 V36 H10 A6 6 0 0 1 10 4 Z" fill="#046a38" stroke="#1b1d22" stroke-width="1.4"/>
    <g transform="rotate(16 45 18)">
      <rect x="44.4" y="12" width="2.6" height="9" rx="1" fill="#f5c518" stroke="#1b1d22" stroke-width="0.7"/>
      <path d="M44.4 21 L45.7 24 L47 21 Z" fill="#1b1d22"/>
    </g>
    <circle cx="18" cy="20" r="3.4" fill="#fff"/>
    <circle cx="30" cy="20" r="3.4" fill="#fff"/>
    <circle cx="18" cy="20" r="1.5" fill="#0b3d24"/>
    <circle cx="30" cy="20" r="1.5" fill="#0b3d24"/>
    <g fill="none" stroke="#1b1d22" stroke-width="1.5">
      <circle cx="18" cy="20" r="5.4"/>
      <circle cx="30" cy="20" r="5.4"/>
      <path d="M23.4 19 Q24 17.6 24.6 19"/>
      <path d="M12.6 19.5 L4.6 17.5"/>
      <path d="M35.4 19.5 L43.4 17.5"/>
    </g>
    <path d="M18 27.5 Q24 31 30 27.5" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
  </g>
  <circle cx="279" cy="110" r="8" fill="#fff" stroke="#1b1d22" stroke-width="3"/>
  <g transform="rotate(-12 283 94)" stroke="#1b1d22" stroke-width="3">
    <rect x="266" y="88" width="34" height="16" rx="3" fill="#d5232f"/>
    <rect x="277" y="72" width="12" height="16" rx="3" fill="#f5c518"/>
  </g>
  <rect x="10" y="208" width="320" height="84" rx="6" fill="#faf6ec" stroke="#1b1d22" stroke-width="4"/>
  <g>
    <rect x="136" y="238" width="68" height="24" rx="3" fill="#fff" stroke="#1b1d22" stroke-width="3"/>
    <path d="M145.3 246.1 V254.1 M145.3 246.1 H148.8 A2 2 0 0 1 148.8 250.1 H145.3 M148.8 250.1 H149.1 A2 2 0 0 1 149.1 254.1 H145.3 M154.1 254.1 L156.8 246.1 H157.2 L159.9 254.1 M155.2 251.4 H158.8 M162.9 246.1 V254.1 H168.3 M176.8 247.8 A2.7 2.7 0 0 0 171.6 248.8 V251.4 A2.7 2.7 0 0 0 176.8 252.4 M180.1 254.1 L182.8 246.1 H183.2 L185.9 254.1 M181.2 251.4 H184.8 M189.1 248.9 A2.8 2.8 0 0 1 194.7 248.9 V251.3 A2.8 2.8 0 0 1 189.1 251.3 Z" fill="none" stroke="#1b1d22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M180.8 243.4 Q181.9 241.8 183 243 T185.2 242.6" fill="none" stroke="#1b1d22" stroke-width="1.45" stroke-linecap="round"/>
  </g>
  <g stroke="#1b1d22" stroke-width="2.5" fill="#fff">
    <rect x="258" y="196" width="52" height="14" rx="1.5" transform="rotate(-4 284 203)"/>
    <rect x="262" y="190" width="52" height="14" rx="1.5" transform="rotate(3 288 197)"/>
    <rect x="256" y="184" width="52" height="14" rx="1.5" transform="rotate(-2 282 191)"/>
  </g>
</svg>`;

export const OG_CORES = {
  fundo: "#f5e27a",
  tinta: "#1b1d22",
  tintaSuave: "#3d3a34",
  carimbo: "#d5232f",
  carimboTinta: "#a31522",
} as const;

/* Google Fonts → TTF para o satori (fallback para sans se a rede falhar) */
async function carregarFonte(familia: string, peso: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${familia}:wght@${peso}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } }
  ).then((r) => r.text());
  const url = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) return null;
  const data = await fetch(url).then((r) => r.arrayBuffer());
  return {
    name: familia.split("+").join(" "),
    data,
    weight: peso as 400 | 700,
    style: "normal" as const,
  };
}

interface FontesOg {
  fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: "normal";
  }[];
  display: string;
  mono: string;
}

async function tentarFontes(): Promise<FontesOg> {
  const fonts = (
    await Promise.allSettled([
      carregarFonte("Archivo+Black", 400),
      carregarFonte("Space+Mono", 400),
      carregarFonte("Space+Mono", 700),
    ])
  )
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter((f): f is NonNullable<typeof f> => f !== null);

  return {
    fonts,
    display: fonts.some((f) => f.name === "Archivo Black")
      ? "Archivo Black"
      : "sans-serif",
    mono: fonts.some((f) => f.name === "Space Mono") ? "Space Mono" : "monospace",
  };
}

// Memoizado: as ~114 imagens OG do build partilham a mesma Promise — as
// 3 fontes são descarregadas uma vez só. Se a primeira tentativa vier sem
// Archivo Black ou Space Mono (falha de rede no build), tenta outra vez
// uma única vez antes de aceitar o fallback.
let fontesPromise: Promise<FontesOg> | null = null;

export function carregarFontes(): Promise<FontesOg> {
  fontesPromise ??= (async () => {
    let r = await tentarFontes();
    if (r.display === "sans-serif" || r.mono === "monospace") {
      r = await tentarFontes();
    }
    if (r.display === "sans-serif" || r.mono === "monospace") {
      console.warn(
        "[og] Google Fonts em falta — imagens OG geradas com fallback sans/mono"
      );
    }
    return r;
  })();
  return fontesPromise;
}

export function zeUri(): string {
  return `data:image/svg+xml;base64,${Buffer.from(ZE_SVG).toString("base64")}`;
}

/** Letra(s) do tema pela posição: A–Z até 26, depois AA, AB… (base-26). */
export function letraTema(i: number): string {
  if (i < 26) return String.fromCharCode(65 + i);
  return (
    String.fromCharCode(64 + Math.floor(i / 26)) +
    String.fromCharCode(65 + (i % 26))
  );
}

/**
 * Código de senha por pergunta: letra = posição do tema em TEMAS
 * (derivado da ordem em TEMAS — muda se reordenares), número = posição
 * da pergunta dentro do tema (1-based, 2 dígitos). Letra por posição —
 * não pela inicial — porque vários temas partilham a inicial
 * (cartao, carta, certidoes, chave…).
 */
export function codigoSenha(perguntaId: string): string | null {
  for (let i = 0; i < TEMAS.length; i++) {
    const j = TEMAS[i].perguntas.findIndex((p) => p.id === perguntaId);
    if (j >= 0) {
      return `${letraTema(i)}-${String(j + 1).padStart(2, "0")}`;
    }
  }
  return null;
}

/**
 * Tamanho da pergunta conforme o comprimento — o texto nunca corta a
 * meio de uma palavra (o satori faz wrap normal) e tem de caber na
 * moldura. Limiares medidos contra os textos da base (~10–110 chars).
 */
export function tamanhoLetra(texto: string): number {
  if (texto.length <= 34) return 72;
  if (texto.length <= 64) return 60;
  return 48;
}

import { formatarMesAno } from "./i18n.ts";

/**
 * Texto do carimbo: "Confirmado em out. 2026" / "Confirmed in Oct 2026"
 * quando a resposta tem verificadoEm (mesmo formato de VerificadoEm);
 * o selo "Grátis. Sem registo." / "Free. No sign-up." quando não tem.
 */
export function textoSelo(iso: string | undefined, lang: Lang): string {
  const texto = iso ? formatarMesAno(iso, lang) : null;
  if (!texto) return lang === "en" ? "Free. No sign-up." : "Grátis. Sem registo.";
  return lang === "en" ? `Confirmed in ${texto}` : `Confirmado em ${texto}`;
}
