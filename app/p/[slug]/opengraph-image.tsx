import { ImageResponse } from "next/og";
import { TEMAS } from "@/lib/data/temas";
import {
  OG_CORES,
  carregarFontes,
  codigoSenha,
  tamanhoLetra,
  textoSelo,
} from "@/lib/og.ts";
import { ColunaZe, Moldura, Senha } from "@/lib/og-componentes";

/* Uma imagem OG por resposta curada — o preview do WhatsApp mostra a
   pergunta partilhada, com senha estável e carimbo de verificação. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function encontrar(slug: string) {
  for (const tema of TEMAS) {
    const pergunta = tema.perguntas.find((p) => p.id === slug);
    if (pergunta) return { tema, pergunta };
  }
  return null;
}

export function generateStaticParams() {
  return TEMAS.flatMap((t) => t.perguntas.map((p) => ({ slug: p.id })));
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hit = encontrar(slug);
  return [{ id: "0", alt: hit?.pergunta.texto ?? "Pergunta ao Zé", size, contentType }];
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hit = encontrar(slug);
  const { fonts, display, mono } = await carregarFontes();

  const pergunta = hit?.pergunta.texto ?? "Pergunta ao Zé";
  const senha = codigoSenha(slug) ?? "Z-00";
  const entidade = hit?.tema.entidade ?? "Independente";
  const selo = textoSelo(hit?.pergunta.resposta.verificadoEm, "pt");

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
        <Moldura />

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
            <Senha codigo={senha} />
            <div
              style={{
                marginTop: 16,
                fontSize: tamanhoLetra(pergunta),
                lineHeight: 1.04,
                color: OG_CORES.tinta,
                fontFamily: display,
                textTransform: "uppercase",
                letterSpacing: -1.5,
                maxWidth: 660,
              }}
            >
              {pergunta}
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
                color: OG_CORES.tintaSuave,
                textTransform: "uppercase",
              }}
            >
              {entidade}
            </div>
          </div>

          <span style={{ fontSize: 26, color: OG_CORES.tintaSuave }}>
            perguntaaoze.pt
          </span>
        </div>

        <ColunaZe selo={selo} />
      </div>
    ),
    { ...size, fonts }
  );
}
