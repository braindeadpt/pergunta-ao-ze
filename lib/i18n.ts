/**
 * Deteção de língua da pergunta — heurística barata por palavras-função.
 * Devolve "pt" | "en" ou null quando é ambíguo/demasiado curto —
 * nesse caso o Chat decide (última língua usada ou navigator.language).
 */
export type Lang = "pt" | "en";

/* Palavras-função distintivas — sem as que existem nas duas línguas
   ("a", "me", "no") para não falsear o empate. */
const PT = new Set([
  "o", "os", "as", "de", "do", "da", "dos", "das", "em", "na", "nos",
  "nas", "um", "uma", "que", "como", "qual", "quais", "onde", "quando",
  "quanto", "para", "por", "com", "sem", "meu", "minha", "teu", "tua",
  "seu", "sua", "eu", "tu", "se", "ao", "aos", "ou", "mas", "ser",
  "ter", "fazer", "posso", "pode", "quero", "preciso", "tenho", "obrigado",
  "obrigada", "isto", "isso", "este", "esta", "já", "ainda", "só", "cá",
]);

const EN = new Set([
  "the", "i", "my", "how", "do", "does", "what", "where", "when", "can",
  "is", "are", "for", "to", "get", "renew", "apply", "need", "want",
  "have", "with", "and", "you", "your", "it", "this", "that", "please",
  "help", "in", "of", "an", "am", "was", "will", "would", "should",
  "could", "which", "who", "deadline", "cost", "price", "much",
  /* substantivos distintivos — perguntas tipo telegrama ("residence permit") */
  "permit", "residence", "appointment", "licence", "license", "passport",
  "card", "benefit", "pension", "allowance", "visa", "fine", "tax",
  "health", "driver", "driving", "voting", "election", "birth",
  "marriage", "certificate", "registration", "booking", "renewal",
]);

export function detetarIdioma(texto: string): Lang | null {
  const toks = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .split(/[^a-z]+/)
    .filter(Boolean);
  let pt = 0;
  let en = 0;
  for (const t of toks) {
    if (PT.has(t)) pt++;
    if (EN.has(t)) en++;
  }
  if (en > pt) return "en";
  if (pt > en) return "pt";
  return null;
}

/** Língua preferida do navegador — "en" se começar por en, senão "pt". */
export function idiomaDoNavegador(): Lang {
  return typeof navigator !== "undefined" &&
    navigator.language?.toLowerCase().startsWith("en")
    ? "en"
    : "pt";
}
