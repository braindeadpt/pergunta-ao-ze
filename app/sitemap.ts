import type { MetadataRoute } from "next";
import { TEMAS } from "@/lib/data/temas";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = ["", "/chat", "/fontes", "/p", "/privacidade", "/termos"];
  const agora = new Date();
  const paginas: MetadataRoute.Sitemap = rotas.map((rota) => ({
    url: `${BASE}${rota}`,
    lastModified: agora,
    changeFrequency: "weekly",
    priority: rota === "" ? 1 : 0.7,
  }));
  for (const tema of TEMAS) {
    for (const p of tema.perguntas) {
      paginas.push({
        url: `${BASE}/p/${p.id}`,
        lastModified: agora,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return paginas;
}
