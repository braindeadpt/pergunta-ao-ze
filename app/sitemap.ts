import type { MetadataRoute } from "next";

const BASE = "https://perguntaaoze.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/chat", "/fontes", "/privacidade", "/termos"];
  return rotas.map((rota) => ({
    url: `${BASE}${rota}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: rota === "" ? 1 : 0.7,
  }));
}
