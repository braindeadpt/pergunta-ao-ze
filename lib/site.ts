/**
 * Domínio canónico do site — único sítio onde se define.
 * NEXT_PUBLIC_SITE_URL permite sobrepor (ex.: preview/staging);
 * defeito: domínio de produção sem www.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://perguntaaoze.pt"
).replace(/\/+$/, "");
