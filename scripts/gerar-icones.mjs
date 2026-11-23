// Gera os ícones PNG para o manifest PWA/TWA a partir de app/icon.svg.
// Uso: node scripts/gerar-icones.mjs
import { readFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync("app/icon.svg");
mkdirSync("public/icons", { recursive: true });

const BOLHA = { density: 2400 }; // viewBox 28x28 -> ~933px antes do resize

const papel = { r: 250, g: 246, b: 236 }; // --color-paper
const amarelo = { r: 245, g: 197, b: 24 }; // --color-form-amarelo

async function bolha(px) {
  return sharp(svg, BOLHA).resize(px, px).png().toBuffer();
}

async function comFundo(tamanho, bolhaPx, fundo, destino) {
  const b = await bolha(bolhaPx);
  await sharp({
    create: { width: tamanho, height: tamanho, channels: 3, background: fundo },
  })
    .composite([{ input: b, gravity: "centre" }])
    .png()
    .toFile(destino);
  console.log(`${destino} (${tamanho}x${tamanho})`);
}

// Icons "any": bolha verde em transparente (Android/launcher genérico).
await sharp(await bolha(460))
  .extend({ top: 26, bottom: 26, left: 26, right: 26, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toFile("public/icons/icon-512.png");
console.log("public/icons/icon-512.png (512x512)");

await sharp(await bolha(172))
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toFile("public/icons/icon-192.png");
console.log("public/icons/icon-192.png (192x192)");

// Maskable: zona segura = 80% centrais -> bolha a ~62% do canvas, fundo amarelo.
await comFundo(512, 320, amarelo, "public/icons/icon-512-maskable.png");
await comFundo(192, 120, amarelo, "public/icons/icon-192-maskable.png");

// Apple touch icon: sem transparência, fundo papel.
await comFundo(180, 148, papel, "public/icons/apple-touch-icon.png");
