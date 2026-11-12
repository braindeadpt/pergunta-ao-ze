import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ZE_SVG,
  codigoSenha,
  letraTema,
  tamanhoLetra,
  textoSelo,
  zeUri,
} from "../lib/og.ts";
import { TEMAS } from "../lib/data/temas.ts";

test("og: código de senha — único, estável e no formato L-NN", () => {
  const codigos = new Set<string>();
  for (const tema of TEMAS) {
    for (const p of tema.perguntas) {
      const c = codigoSenha(p.id);
      assert.match(c!, /^[A-Z]-\d{2}$/, `${p.id}: formato ${c}`);
      assert.ok(!codigos.has(c!), `${p.id}: código duplicado ${c}`);
      codigos.add(c!);
      // estabilidade: chamar duas vezes dá o mesmo
      assert.equal(codigoSenha(p.id), c);
    }
  }
  assert.equal(codigos.size, TEMAS.flatMap((t) => t.perguntas).length);
});

test("og: código de senha devolve null para id desconhecido", () => {
  assert.equal(codigoSenha("nao-existe"), null);
});

test("og: letraTema passa a duas letras depois de Z (guarda >26 temas)", () => {
  assert.equal(letraTema(0), "A");
  assert.equal(letraTema(25), "Z");
  assert.equal(letraTema(26), "AA");
  assert.equal(letraTema(27), "AB");
  assert.equal(letraTema(51), "AZ");
  assert.equal(letraTema(52), "BA");
  assert.match(letraTema(200), /^[A-Z]{2}$/); // nunca caracteres fora de A–Z
});

test("og: tamanho de letra por comprimento", () => {
  assert.equal(tamanhoLetra("Onde voto?"), 72); // curta
  assert.equal(tamanhoLetra("a".repeat(34)), 72); // fronteira
  assert.equal(tamanhoLetra("b".repeat(35)), 60); // média
  assert.equal(tamanhoLetra("c".repeat(64)), 60);
  assert.equal(tamanhoLetra("d".repeat(65)), 48); // longa
  assert.equal(
    tamanhoLetra("x".repeat(200)),
    48
  );
});

test("og: selo — verificadoEm formata como VerificadoEm; sem data, selo por língua", () => {
  assert.equal(textoSelo("2026-10-25", "pt"), "Confirmado em out. 2026");
  assert.equal(textoSelo("2026-10-25", "en"), "Confirmed in Oct 2026");
  assert.equal(textoSelo(undefined, "pt"), "Grátis. Sem registo.");
  assert.equal(textoSelo(undefined, "en"), "Free. No sign-up.");
  assert.equal(textoSelo("lixo", "en"), "Free. No sign-up.");
});

test("og: ZE_SVG é SVG bem formado, sem <text>, com paths vetoriais e camadas separadas", () => {
  assert.match(ZE_SVG, /^<svg\b[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  assert.match(ZE_SVG, /viewBox="0 0 340 300"/);
  assert.match(ZE_SVG, /<\/svg>$/);

  // Zero tags <text> ou <tspan>: o Resvg num <img> data-uri não tem fontes embebidas
  assert.ok(!/<text\b/i.test(ZE_SVG), "ZE_SVG não pode conter tags <text>");
  assert.ok(!/<tspan\b/i.test(ZE_SVG), "ZE_SVG não pode conter tags <tspan>");

  // Validação estrutural XML/SVG: todas as tags abertas fecham pela ordem certa
  const pilha: string[] = [];
  const tagRe = /<\/?([a-zA-Z][\w-]*)(\s[^>]*)?>/g;
  let m: RegExpExecArray | null;
  let pos = 0;
  while ((m = tagRe.exec(ZE_SVG)) !== null) {
    const entre = ZE_SVG.slice(pos, m.index).trim();
    assert.equal(entre, "", `texto solto inesperado no SVG: "${entre}"`);
    pos = m.index + m[0].length;

    const token = m[0];
    const nome = m[1];
    const attrs = m[2] ?? "";
    // Aspas balanceadas nos atributos
    const aspas = (attrs.match(/"/g) ?? []).length;
    assert.equal(aspas % 2, 0, `aspas desbalanceadas em ${token}`);

    if (token.startsWith("</")) {
      const aberta = pilha.pop();
      assert.equal(aberta, nome, `fecho </${nome}> não corresponde a <${aberta}>`);
    } else if (!token.endsWith("/>")) {
      pilha.push(nome);
    }
  }
  assert.equal(ZE_SVG.slice(pos).trim(), "");
  assert.deepEqual(pilha, [], `tags SVG por fechar: ${pilha.join(", ")}`);

  // Crachá (182,176 30x18) e placa do balcão (136,238 68x24) têm paths vetoriais
  assert.match(
    ZE_SVG,
    /<rect x="182" y="176" width="30" height="18"[^/]*\/>\s*<path d="M[^"]+"/,
    "crachá ZÉ deve ter <path> vetorial"
  );
  assert.match(
    ZE_SVG,
    /<rect x="136" y="238" width="68" height="24"[^/]*\/>\s*<path d="M[^"]+"/,
    "placa BALCÃO deve ter <path> vetorial"
  );

  // Carimbo na mão direita vem depois da cabeça verde e fora da zona da cabeça/caneta (x >= 260)
  const idxCabeca = ZE_SVG.indexOf('transform="translate(92,6) scale(3.5)"');
  const idxCarimbo = ZE_SVG.indexOf('fill="#d5232f"');
  assert.ok(idxCabeca > 0 && idxCarimbo > idxCabeca, "carimbo deve estar numa camada à frente da cabeça");
  const carimboRect = ZE_SVG.match(/<rect x="(\d+(?:\.\d+)?)"[^>]*fill="#d5232f"/);
  assert.ok(carimboRect && Number(carimboRect[1]) >= 260, "carimbo deve estar separado à direita da cabeça/caneta");
});

test("og: zeUri() gera data-URI base64 válido e reversível", () => {
  const uri = zeUri();
  const prefixo = "data:image/svg+xml;base64,";
  assert.ok(uri.startsWith(prefixo));
  const b64 = uri.slice(prefixo.length);
  assert.match(b64, /^[A-Za-z0-9+/]+=*$/);
  const descodificado = Buffer.from(b64, "base64").toString("utf8");
  assert.equal(descodificado, ZE_SVG);
  assert.ok(!/<text\b/i.test(descodificado));
});
