import { ImageResponse } from "next/og";

export const alt = "Pergunta ao Zé — os serviços públicos, sem fila nem senha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* O Zé a carimbar — mesma arte do ZePersonagem, como string (o satori
   não renderiza <svg> diretamente; vai num <img> data-uri). */
const ZE_SVG = `<svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#1b3fa0" stroke-width="13" stroke-linecap="round">
    <path d="M148 184 Q122 190 108 206"/>
    <path d="M204 182 Q236 152 252 118"/>
  </g>
  <g fill="#fff" stroke="#1b1d22" stroke-width="3">
    <circle cx="105" cy="208" r="8"/>
    <circle cx="255" cy="112" r="8"/>
  </g>
  <g transform="rotate(-14 258 92)" stroke="#1b1d22" stroke-width="3">
    <rect x="242" y="86" width="34" height="16" rx="3" fill="#d5232f"/>
    <rect x="253" y="70" width="12" height="16" rx="3" fill="#f5c518"/>
  </g>
  <path d="M136 214 L142 166 Q176 156 210 166 L216 214 Z" fill="#1b3fa0" stroke="#1b1d22" stroke-width="3.5" stroke-linejoin="round"/>
  <g transform="rotate(-5 196 186)">
    <rect x="182" y="176" width="30" height="18" rx="2.5" fill="#fff" stroke="#1b1d22" stroke-width="2.5"/>
    <text x="197" y="188.5" text-anchor="middle" font-family="monospace" font-size="9" font-weight="700" fill="#1b1d22">ZÉ</text>
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
  <rect x="10" y="208" width="320" height="84" rx="6" fill="#faf6ec" stroke="#1b1d22" stroke-width="4"/>
  <g>
    <rect x="136" y="238" width="68" height="24" rx="3" fill="#fff" stroke="#1b1d22" stroke-width="3"/>
    <text x="170" y="253.5" text-anchor="middle" font-family="monospace" font-size="10" font-weight="700" letter-spacing="1" fill="#1b1d22">BALCÃO</text>
  </g>
  <g stroke="#1b1d22" stroke-width="2.5" fill="#fff">
    <rect x="258" y="196" width="52" height="14" rx="1.5" transform="rotate(-4 284 203)"/>
    <rect x="262" y="190" width="52" height="14" rx="1.5" transform="rotate(3 288 197)"/>
    <rect x="256" y="184" width="52" height="14" rx="1.5" transform="rotate(-2 282 191)"/>
  </g>
</svg>`;

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

export default async function OgImage() {
  const fonts = (
    await Promise.allSettled([
      carregarFonte("Archivo+Black", 400),
      carregarFonte("Space+Mono", 400),
      carregarFonte("Space+Mono", 700),
    ])
  )
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter((f): f is NonNullable<typeof f> => f !== null);

  const zeUri = `data:image/svg+xml;base64,${Buffer.from(ZE_SVG).toString("base64")}`;

  const display = fonts.some((f) => f.name === "Archivo Black")
    ? "Archivo Black"
    : "sans-serif";
  const mono = fonts.some((f) => f.name === "Space Mono")
    ? "Space Mono"
    : "monospace";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f5e27a",
          padding: 56,
          fontFamily: mono,
          position: "relative",
        }}
      >
        {/* Moldura de impresso */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: "4px solid #1b1d22",
            display: "flex",
          }}
        />

        {/* Coluna esquerda — senha + título */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 18,
                color: "#1b1d22",
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  letterSpacing: 6,
                  color: "#a31522",
                  fontWeight: 700,
                }}
              >
                SENHA
              </span>
              <span style={{ fontSize: 64, fontWeight: 700 }}>A-001</span>
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 84,
                lineHeight: 0.95,
                color: "#1b1d22",
                fontFamily: display,
                textTransform: "uppercase",
                letterSpacing: -2,
              }}
            >
              Pergunta ao Zé
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 30,
                color: "#3d3a34",
                lineHeight: 1.25,
                maxWidth: 620,
              }}
            >
              Os serviços públicos portugueses, sem fila nem senha — com as
              fontes oficiais sempre à mão.
            </div>
          </div>

          <span style={{ fontSize: 26, color: "#3d3a34" }}>
            perguntaaoze.pt
          </span>
        </div>

        {/* O Zé ao balcão + carimbo por baixo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 16,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zeUri} width={400} height={353} alt="" />
          <div
            style={{
              display: "flex",
              border: "4px solid #d5232f",
              borderRadius: 8,
              padding: "6px 16px",
              color: "#a31522",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              transform: "rotate(-4deg)",
              background: "rgba(255,255,255,0.4)",
              whiteSpace: "nowrap",
              marginTop: -14,
            }}
          >
            Grátis. Sem registo.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
