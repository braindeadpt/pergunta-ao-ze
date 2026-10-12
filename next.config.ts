import type { NextConfig } from "next";

const HEADERS_SEGURANCA = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Anti-clickjacking real — `frame-ancestors` na meta CSP (ver
  // scripts/injetar-csp.mjs) é ignorado pelos browsers, este header cobre-o.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // O site só carrega recursos same-origin — seguro.
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/:path*", headers: HEADERS_SEGURANCA },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'none'; frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
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
