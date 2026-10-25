import { ImageResponse } from "next/og";
import { TEMAS } from "@/lib/data/temas";
import { TEMAS_EN } from "@/lib/data/temas.en";
import { TITULOS_EN } from "@/lib/data/titulos.en";
import {
  OG_CORES,
  carregarFontes,
  codigoSenha,
  tamanhoLetra,
  textoSelo,
} from "@/lib/og.ts";
import { ColunaZe, Moldura, Senha } from "@/lib/og-componentes";

/* EN version of the per-answer OG image — only for entries that are
   actually served in English (no revisao, TITULOS_EN present). */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function encontrar(slug: string) {
  for (const tema of TEMAS) {
    const pergunta = tema.perguntas.find((p) => p.id === slug);
    if (pergunta) {
      const en = TEMAS_EN[slug];
      if (!en || en.revisao || !TITULOS_EN[slug]) return null;
      return { tema, pergunta, en };
    }
  }
  return null;
}

export function generateStaticParams() {
  return TEMAS.flatMap((t) =>
    t.perguntas
      .filter((p) => TEMAS_EN[p.id] && !TEMAS_EN[p.id].revisao && TITULOS_EN[p.id])
      .map((p) => ({ slug: p.id }))
  );
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return [
    { id: "0", alt: TITULOS_EN[slug] ?? "Pergunta ao Zé", size, contentType },
  ];
}

export default async function OgImageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hit = encontrar(slug);
  const { fonts, display, mono } = await carregarFontes();

  const pergunta = TITULOS_EN[slug] ?? "Pergunta ao Zé";
  const senha = codigoSenha(slug) ?? "Z-00";
  const entidade = hit?.tema.entidade ?? "Independent";
  const selo = textoSelo(hit?.pergunta.resposta.verificadoEm, "en");

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
