import type { MetadataRoute } from "next";

// Manifest PWA/TWA — servido em /manifest.webmanifest.
// O Bubblewrap lê este ficheiro para configurar a app Android.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pergunta ao Zé — Os serviços públicos, sem fila nem senha",
    short_name: "Pergunta ao Zé",
    description:
      "O Zé responde a perguntas sobre serviços públicos portugueses e indica as páginas oficiais por onde começar. Projeto independente.",
    id: "/",
    start_url: "/",
    scope: "/",
    lang: "pt-PT",
    display: "standalone",
    orientation: "portrait",
    background_color: "#faf6ec",
    theme_color: "#046a38",
    categories: ["utilities", "productivity"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Perguntar ao Zé",
        url: "/chat",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Prazos do ano",
        url: "/prazos",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
