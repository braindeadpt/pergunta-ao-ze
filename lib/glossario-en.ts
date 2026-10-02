/**
 * Glossário canónico PT→EN aplicado como pós-processamento determinístico
 * às traduções geradas (lib/data/temas.en.ts). O validador em
 * tests/glossario.test.ts falha se uma entidade aparecer com gloss errado
 * ou com mais do que uma tradução no ficheiro.
 *
 * Regra: 1.ª ocorrência de cada entidade numa resposta fica
 * "Nome (gloss canónico)"; as seguintes ficam só "Nome".
 */

interface Entidade {
  nome: string;
  gloss: string;
  /** Lookbehind/lookahead extra para não casar dentro de nome mais longo. */
  exc?: string;
}

export const ENTIDADES_EN: Entidade[] = [
  // Nomes mais longos primeiro para não colidirem por prefixo.
  { nome: "Segurança Social Direta", gloss: "Social Security Direct" },
  { nome: "Portal das Finanças", gloss: "Tax Authority portal" },
  { nome: "Cartão de Cidadão", gloss: "Citizen Card" },
  { nome: "Chave Móvel Digital", gloss: "Digital Mobile Key" },
  { nome: "Loja do Cidadão", gloss: "Citizen Shop" },
  { nome: "Segurança Social", gloss: "Social Security", exc: "(?! Direta)" },
  { nome: "Finanças", gloss: "Tax Authority", exc: "(?<!Portal das )" },
  { nome: "ePortugal", gloss: "public services portal" },
  { nome: "AIMA", gloss: "Agency for Integration, Migration and Asylum" },
  { nome: "SEF", gloss: "the former Foreigners and Borders Service" },
  { nome: "IRN", gloss: "Institute of Registries and Notaries" },
  { nome: "SNS", gloss: "National Health Service", exc: "(?! ?24)" },
  { nome: "NISS", gloss: "Social Security identification number" },
  { nome: "NIF", gloss: "Portuguese tax identification number" },
  { nome: "IMT", gloss: "Institute for Mobility and Transport" },
  { nome: "AT", gloss: "Tax Authority" },
  { nome: "IRS", gloss: "Portuguese personal income tax" },
  { nome: "IUC", gloss: "vehicle tax" },
];

/**
 * Correções de conteúdo determinísticas — revisão humana a entradas
 * sensíveis. Vivem no pós-processamento para sobreviverem a
 * regenerações via --forcar (o modelo pode voltar a errar).
 */
const CORRECOES: { re: RegExp; para: string }[] = [
  // D7 é para quem vive de rendimentos próprios/passivos (pensões,
  // rendas) — nunca "self-employment". Aceita hífen normal ou ‑ (U+2011).
  {
    re: /self[‑-]?employ(?:ed|ment)\s+visas?\s*\(D7\)/gi,
    para: "visas for people living on their own income (D7)",
  },
  // "estrutura de missão" traduzida à letra não diz nada.
  {
    re: /\bthe portal and mission structure\b/gi,
    para: "the AIMA online portal and its dedicated task force (estrutura de missão)",
  },
  // Estados do Portal das Finanças: termo PT mantém-se + gloss EN.
  { re: /'Recebida'(?!\s*\()/g, para: "'Recebida' (Received)" },
  {
    re: /'Reembolso Emitido'(?!\s*\()/g,
    para: "'Reembolso Emitido' (Refund issued)",
  },
  {
    re: /'Liquidação Processada'(?!\s*\()/g,
    para: "'Liquidação Processada' (Assessment processed)",
  },
];

function aplicarCorrecoes(texto: string): string {
  for (const c of CORRECOES) texto = texto.replace(c.re, c.para);
  return texto;
}

/** Palavras-chave EN extra por entrada (revisão humana). */
const PALAVRAS_EXTRA: Record<string, string[]> = {
  "ue-cesd": ["ehic"], // o nome que um estrangeiro procura
};

/**
 * CESD: o nome internacionalmente conhecido é EHIC — vem à frente,
 * com o nome PT como gloss. Ocorrências seguintes ficam "EHIC/CESD".
 * `visto` é partilhado entre passos e nota da mesma resposta.
 */
function normalizarCesd(texto: string, visto: { v: boolean }): string {
  const canonico =
    "European Health Insurance Card (EHIC, known in Portugal as CESD)";
  return texto.replace(
    /\bEuropean Health Insurance Card \(EHIC, known in Portugal as CESD\)|\bEuropean Health Insurance Card\b|\bCESD(?:\s*\(\s*European Health Insurance Card\s*\))?|\bEHIC\b/g,
    (m) =>
      m === canonico // já normalizado: idempotente
        ? ((visto.v = true), m)
        : visto.v
          ? "EHIC/CESD"
          : ((visto.v = true), canonico)
  );
}

function escapar(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function padraoEntidade(e: Entidade): RegExp {
  // Nome (gloss opcional) — o gloss entre parênteses é sempre reescrito.
  return new RegExp(
    `${e.exc?.startsWith("(?<") ? e.exc : ""}\\b${escapar(e.nome)}\\b` +
      `${e.exc?.startsWith("(?!") || e.exc?.startsWith("(?=") ? e.exc : ""}` +
      `(\\s*\\([^)]*\\))?`,
    "g"
  );
}

/**
 * Normaliza um texto EN. `vistos` é partilhado entre passos e nota da
 * mesma resposta, para que só a 1.ª ocorrência global leve o gloss.
 */
export function normalizarEntidades(texto: string, vistos: Set<string>): string {
  for (const e of ENTIDADES_EN) {
    // 1) Ordem invertida do modelo: "Digital Mobile Key (Chave Móvel
    //    Digital)" → "Chave Móvel Digital (Digital Mobile Key)".
    const reInvertido = new RegExp(
      `\\b${escapar(e.gloss)}\\b\\s*\\(\\s*${escapar(e.nome)}\\s*\\)`,
      "g"
    );
    texto = texto.replace(reInvertido, () =>
      vistos.has(e.nome)
        ? e.nome
        : (vistos.add(e.nome), `${e.nome} (${e.gloss})`)
    );
    // 2) Forma normal: "Nome" ou "Nome (qualquer gloss)" → canónico.
    //    Matches dentro de parênteses (offset-1 == '(') são gloss de um
    //    nome EN e ficam intocados.
    texto = texto.replace(
      padraoEntidade(e),
      (m, _g, offset: number) =>
        texto[offset - 1] === "("
          ? m // gloss de um nome EN ("...(Chave Móvel Digital)")
          : vistos.has(e.nome)
            ? e.nome // ocorrência seguinte: sem gloss
            : (vistos.add(e.nome), `${e.nome} (${e.gloss})`)
    );
  }
  return texto;
}

/** Limpa palavras-chave EN: minúsculas, espaços únicos, splits e termos PT. */
export function normalizarPalavras(palavras: string[]): string[] {
  const saida: string[] = [];
  for (const p of palavras) {
    const limpa = p
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\bse f\b/g, "sef") // sigla partida pelo modelo
      .replace(/\bloja do cidadão\b/g, "citizen shop")
      .replace(/\bportal das finanças\b/g, "tax authority portal");
    if (limpa && !saida.includes(limpa)) saida.push(limpa);
  }
  return saida;
}

/** Aplica o glossário a uma resposta EN completa (passos + nota + palavras). */
export function normalizarRespostaEn(
  resposta: {
    passos: string[];
    nota?: string;
    palavras: string[];
  },
  id?: string
): { passos: string[]; nota?: string; palavras: string[] } {
  const vistos = new Set<string>();
  const cesd = { v: false };
  const corrigir = (t: string) =>
    normalizarCesd(normalizarEntidades(aplicarCorrecoes(t), vistos), cesd);
  return {
    passos: resposta.passos.map(corrigir),
    nota: resposta.nota ? corrigir(resposta.nota) : undefined,
    palavras: normalizarPalavras([
      ...resposta.palavras,
      ...(id ? PALAVRAS_EXTRA[id] ?? [] : []),
    ]),
  };
}
