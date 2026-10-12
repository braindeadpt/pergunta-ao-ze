// Post-build: injeta uma Content-Security-Policy por página via <meta http-equiv>.
//
// As páginas são pré-renderizadas estaticamente e cada uma tem ~30 <script>
// inline distintos (payloads __next_f/RSC variam por página). Uma CSP sem
// 'unsafe-inline' exige por isso sha256 por página — com a meta tag fica tudo
// dentro do próprio HTML, sem 130 regras de headers na Vercel.
//
// Nota: browsers ignoram `frame-ancestors`/`report-uri` em meta CSP — o
// anti-clickjacking real é coberto pelo header X-Frame-Options (next.config).
// O MDN HTTP Observatory lê a meta e conta-a como política completa.

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  ".next",
  "server",
  "app",
);

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
const SRC_ATTR_RE = /\bsrc\s*=/i;
const META_CSP_RE = /<meta[^>]*http-equiv=["']?Content-Security-Policy["']?[^>]*\/?>\s*/i;
const CHARSET_RE = /<meta[^>]*charset[^>]*>/i;
const HEAD_RE = /<head[^>]*>/i;

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (entry.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function hashesInline(html) {
  const hashes = new Set();
  for (const m of html.matchAll(SCRIPT_RE)) {
    if (SRC_ATTR_RE.test(m[1])) continue;
    const conteudo = m[2];
    if (!conteudo || conteudo.trim() === "") continue;
    const hash = createHash("sha256").update(conteudo, "utf8").digest("base64");
    hashes.add(`'sha256-${hash}'`);
  }
  return [...hashes];
}

function buildCsp(scriptHashes) {
  return [
    "default-src 'none'",
    `script-src 'self' ${scriptHashes.join(" ")}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "media-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "worker-src 'self'",
  ].join("; ");
}

let ficheiros = 0;
let falhas = 0;

for (const ficheiro of await htmlFiles(APP_DIR)) {
  const original = await readFile(ficheiro, "utf8");

  // Idempotente: remove meta CSP anterior (rebuilds/re-runs)
  let html = original.replace(META_CSP_RE, "");

  const hashes = hashesInline(html);
  const meta = `<meta http-equiv="Content-Security-Policy" content="${buildCsp(hashes)}"/>`;

  if (CHARSET_RE.test(html)) {
    html = html.replace(CHARSET_RE, (m) => m + meta);
  } else if (HEAD_RE.test(html)) {
    html = html.replace(HEAD_RE, (m) => m + meta);
  } else {
    falhas++;
    console.error(`CSP: sem <head>/<meta charset> em ${ficheiro} — não injetado`);
    continue;
  }

  await writeFile(ficheiro, html);
  ficheiros++;
  const rel = ficheiro.slice(APP_DIR.length + 1);
  console.log(`CSP: ${rel} → ${hashes.length} hashes`);
}

console.log(`\nCSP injetada em ${ficheiros} ficheiros${falhas ? `, ${falhas} FALHAS` : ""}.`);
if (falhas > 0) process.exitCode = 1;
