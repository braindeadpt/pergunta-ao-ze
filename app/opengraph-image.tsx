import { ImageResponse } from "next/og";
import { OG_CORES, carregarFontes } from "@/lib/og.ts";
import { ColunaZe, Moldura, Senha } from "@/lib/og.tsx";

export const alt = "Pergunta ao Zé — os serviços públicos, sem fila nem senha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const { fonts, display, mono } = await carregarFontes();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: OG_CORES.fundo,
          padding: 56,
          fontFamily: mono,
          position: "relative",
        }}
      >
        {/* Moldura de impresso */}
        <Moldura />

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
            <Senha codigo="A-001" />
            <div
              style={{
                marginTop: 18,
                fontSize: 84,
                lineHeight: 0.95,
                color: OG_CORES.tinta,
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
                color: OG_CORES.tintaSuave,
                lineHeight: 1.25,
                maxWidth: 620,
              }}
            >
              Os serviços públicos portugueses, sem fila nem senha — com as
              fontes oficiais sempre à mão.
            </div>
          </div>

          <span style={{ fontSize: 26, color: OG_CORES.tintaSuave }}>
            perguntaaoze.pt
          </span>
        </div>

        {/* O Zé ao balcão + carimbo por baixo */}
        <ColunaZe selo="Grátis. Sem registo." />
      </div>
    ),
    { ...size, fonts }
  );
}
