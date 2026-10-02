import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Domínio antigo → novo: 308 permanente, preserva path e query.
      // `has` host é match exato — previews *.vercel.app e localhost
      // não entram aqui, e perguntaaoze.pt nunca redireciona (sem loop).
      {
        source: "/:path*",
        has: [{ type: "host", value: "perguntaaoze.vercel.app" }],
        destination: "https://perguntaaoze.pt/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
