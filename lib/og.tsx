import { OG_CORES, zeUri } from "./og.ts";

/* Peças JSX partilhadas pelas imagens OG (global + por resposta). */

/** Moldura de impresso — borda a 20px das margens. */
export function Moldura() {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        border: `4px solid ${OG_CORES.tinta}`,
        display: "flex",
      }}
    />
  );
}

/** Carimbo vermelho inclinado (verificação ou "Grátis. Sem registo."). */
export function Carimbo({ texto }: { texto: string }) {
  return (
    <div
      style={{
        display: "flex",
        border: `4px solid ${OG_CORES.carimbo}`,
        borderRadius: 8,
        padding: "6px 16px",
        color: OG_CORES.carimboTinta,
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
      {texto}
    </div>
  );
}

/** Coluna direita: o Zé ao balcão + carimbo por baixo. */
export function ColunaZe({ selo }: { selo: string }) {
  return (
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
      <img src={zeUri()} width={400} height={353} alt="" />
      <Carimbo texto={selo} />
    </div>
  );
}

/** Cabeçalho "SENHA X-NN" — rótulo vermelho + código grande. */
export function Senha({ codigo }: { codigo: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 18,
        color: OG_CORES.tinta,
      }}
    >
      <span
        style={{
          fontSize: 28,
          letterSpacing: 6,
          color: OG_CORES.carimboTinta,
          fontWeight: 700,
        }}
      >
        SENHA
      </span>
      <span style={{ fontSize: 64, fontWeight: 700 }}>{codigo}</span>
    </div>
  );
}
