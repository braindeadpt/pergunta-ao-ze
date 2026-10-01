import { TEMAS } from "@/lib/data/temas";

/**
 * Os balcões do atendimento — agrupamento dos temas.
 * Fonte única para a home (senhas) e para /fontes (arquivo).
 */
export const BALCOES_DEF: { rotulo: string; letra: string; temas: string[] }[] = [
  { rotulo: "Identificação", letra: "I", temas: ["passaporte", "chave-movel-digital", "certidoes"] },
  { rotulo: "Dinheiro", letra: "D", temas: ["irs-financas", "seguranca-social", "pensoes-reforma"] },
  { rotulo: "Trabalho e empresa", letra: "T", temas: ["desemprego-iefp", "empresa-atividade"] },
  { rotulo: "Saúde e família", letra: "S", temas: ["sns", "familia"] },
  { rotulo: "Estrada e casa", letra: "E", temas: ["carta-conducao-imt", "transportes", "habitacao"] },
  { rotulo: "Fronteiras", letra: "F", temas: ["aima-imigracao", "vistos-entrada", "noutro-pais-ue"] },
  { rotulo: "Balcão do povo", letra: "P", temas: ["eleicoes-voto", "justica-multas", "reclamacoes", "educacao", "eportugal-agendamento"] },
];

const temaParaBalcao = new Map<string, number>(
  BALCOES_DEF.flatMap((b, i) => b.temas.map((id) => [id, i] as const))
);

/**
 * Deduz o balcão de uma entidade pelo nº de perguntas que a referenciam
 * em cada balcão. Empate → o primeiro balcão pela ordem definida.
 * Devolve o índice em BALCOES_DEF (ou -1 se nenhum tema a referencia).
 */
export function balcaoDeDominio(dominio: string): number {
  const contagem = new Array(BALCOES_DEF.length).fill(0);
  for (const tema of TEMAS) {
    const bi = temaParaBalcao.get(tema.id);
    if (bi === undefined) continue;
    const refs = tema.perguntas.filter((p) =>
      p.resposta.fontes.some((f) => f.dominio === dominio)
    ).length;
    contagem[bi] += refs;
  }
  let melhor = -1;
  let max = 0;
  contagem.forEach((n, i) => {
    if (n > max) {
      max = n;
      melhor = i;
    }
  });
  return melhor;
}
