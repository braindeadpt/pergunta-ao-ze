import type { Tema } from "@/lib/types";
import tCartaoDeCidadao from "./temas/cartao-de-cidadao.ts";
import tPassaporte from "./temas/passaporte.ts";
import tChaveMovelDigital from "./temas/chave-movel-digital.ts";
import tIrsFinancas from "./temas/irs-financas.ts";
import tSegurancaSocial from "./temas/seguranca-social.ts";
import tSns from "./temas/sns.ts";
import tCartaConducaoImt from "./temas/carta-conducao-imt.ts";
import tEmpresaAtividade from "./temas/empresa-atividade.ts";
import tAimaImigracao from "./temas/aima-imigracao.ts";
import tCertidoes from "./temas/certidoes.ts";
import tEportugalAgendamento from "./temas/eportugal-agendamento.ts";
import tDesempregoIefp from "./temas/desemprego-iefp.ts";
import tNoutroPaisUe from "./temas/noutro-pais-ue.ts";
import tPensoesReforma from "./temas/pensoes-reforma.ts";
import tHabitacao from "./temas/habitacao.ts";
import tFamilia from "./temas/familia.ts";
import tJusticaMultas from "./temas/justica-multas.ts";
import tEleicoesVoto from "./temas/eleicoes-voto.ts";
import tEducacao from "./temas/educacao.ts";
import tVistosEntrada from "./temas/vistos-entrada.ts";
import tReclamacoes from "./temas/reclamacoes.ts";
import tTransportes from "./temas/transportes.ts";

export const TEMAS: Tema[] = [
  tCartaoDeCidadao,
  tPassaporte,
  tChaveMovelDigital,
  tIrsFinancas,
  tSegurancaSocial,
  tSns,
  tCartaConducaoImt,
  tEmpresaAtividade,
  tAimaImigracao,
  tCertidoes,
  tEportugalAgendamento,
  tDesempregoIefp,
  tNoutroPaisUe,
  tPensoesReforma,
  tHabitacao,
  tFamilia,
  tJusticaMultas,
  tEleicoesVoto,
  tEducacao,
  tVistosEntrada,
  tReclamacoes,
  tTransportes,
];

export function findPergunta(id: string) {
  for (const tema of TEMAS) {
    const p = tema.perguntas.find((x) => x.id === id);
    if (p) return { pergunta: p, tema };
  }
  return undefined;
}
