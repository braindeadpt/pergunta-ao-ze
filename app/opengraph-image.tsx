import { ImageResponse } from "next/og";

export const alt = "Pergunta ao Zé — os serviços públicos, sem fila nem senha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f4",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Balão do Zé */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 96,
                height: 72,
                background: "#046a38",
                borderRadius: 18,
                fontSize: 34,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Zé
            </div>
            <div
              style={{
                width: 20,
                height: 20,
                background: "#046a38",
                marginLeft: 22,
                marginTop: -8,
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#1c1917",
              letterSpacing: -1,
            }}
          >
            Pergunta ao Zé
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#1c1917",
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Os serviços públicos, sem fila nem senha.
          </div>
          <div style={{ fontSize: 28, color: "#57534e" }}>
            Respostas com fontes oficiais — projeto independente.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#78716c",
          }}
        >
          <span>perguntaaoze.vercel.app</span>
          <span style={{ color: "#046a38", fontWeight: 700 }}>
            Grátis. Sem registo.
          </span>
        </div>
      </div>
    ),
    size
  );
}
