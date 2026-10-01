import Link from "next/link";
import type { CSSProperties } from "react";
import HeroBox from "@/components/HeroBox";
import FloatingAsk from "@/components/FloatingAsk";
import SenhaTema from "@/components/SenhaTema";
import PainelLED from "@/components/PainelLED";
import ZePersonagem from "@/components/ZePersonagem";
import ZeFace from "@/components/ZeFace";
import SetaMao from "@/components/SetaMao";
import { TEMAS } from "@/lib/data/temas";
import { getEstatisticas, getFontes } from "@/lib/data/fontes";

/* ✓ e ✗ manuscritos — traço irregular, tinta de caneta */
const CheckMao = () => (
  <svg viewBox="0 0 18 18" className="size-6 shrink-0" fill="none" stroke="#046a38" strokeWidth="3" strokeLinecap="round" aria-hidden>
    <path d="M2.5 10 C4.5 12 6 13.5 7.5 15 C10 10.5 13 6 16.5 2.5" />
  </svg>
);
const XMao = () => (
  <svg viewBox="0 0 18 18" className="size-6 shrink-0" fill="none" stroke="#d5232f" strokeWidth="3" strokeLinecap="round" aria-hidden>
    <path d="M3.5 3 C7 6.5 11 11 15 14.5" />
    <path d="M14.5 3 C11 7 7 11 3 14" />
  </svg>
);
/* Clipe de papel — prende senhas ao tabuleiro */
const Clipe = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 56" className={className} fill="none" stroke="#1b1d22" strokeWidth="4" strokeLinecap="round" aria-hidden>
    <path d="M12 10 V44" />
    <path d="M6 20 V50 Q6 54 10 54 H14 Q18 54 18 50 V24" />
  </svg>
);

const porId = (id: string) => TEMAS.find((t) => t.id === id)!;

/* Os balcões do atendimento — agrupamento dos temas */
const BALCOES: { rotulo: string; letra: string; ids: string[] }[] = [
  { rotulo: "Identificação", letra: "I", ids: ["passaporte", "chave-movel-digital", "certidoes"] },
  { rotulo: "Dinheiro", letra: "D", ids: ["irs-financas", "seguranca-social", "pensoes-reforma"] },
  { rotulo: "Trabalho e empresa", letra: "T", ids: ["desemprego-iefp", "empresa-atividade"] },
  { rotulo: "Saúde e família", letra: "S", ids: ["sns", "familia"] },
  { rotulo: "Estrada e casa", letra: "E", ids: ["carta-conducao-imt", "transportes", "habitacao"] },
  { rotulo: "Fronteiras", letra: "F", ids: ["aima-imigracao", "vistos-entrada", "noutro-pais-ue"] },
  { rotulo: "Balcão do povo", letra: "P", ids: ["eleicoes-voto", "justica-multas", "reclamacoes", "educacao", "eportugal-agendamento"] },
];

export default function Home() {
  const stats = getEstatisticas();
  const fontes = getFontes();
  const destaque = porId("cartao-de-cidadao");

  return (
    <>
      {/* ── HERO — assimétrico: formulário à esquerda, o Zé ao balcão ── */}
      <section className="overflow-x-clip">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 pb-16 pt-10 md:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div className="text-left">
            <div className="animate-fade-in-up led-bar inline-block -rotate-1 rounded-md border-2 border-ink px-4 py-1.5 text-[11px] font-bold uppercase shadow-[4px_4px_0_#1b1d22] md:text-xs">
              Senha Z-001 → É a tua vez
            </div>

            <h1
              className="animate-fade-in-up mt-6 font-display text-[2.9rem] uppercase leading-[0.98] tracking-tight md:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              Serviços
              <br />
              públicos?
              <br />
              <span className="text-band-verde">Pergunta ao Zé.</span>
            </h1>

            <p
              className="animate-fade-in-up mt-5 max-w-lg text-lg leading-relaxed text-stone-600"
              style={{ animationDelay: "240ms" }}
            >
              Encontra a página oficial certa — sem fila, sem senha, sem
              formulário em triplicado. (O formulário em baixo é o único que
              te pedimos. E nem precisas de o preencher a tinta azul.)
            </p>

            <div className="animate-fade-in-up relative mt-9" style={{ animationDelay: "360ms" }}>
              <HeroBox />
              {/* Seta à mão aponta para o carimbo */}
              <div className="pointer-events-none absolute -right-2 bottom-20 hidden w-24 -rotate-6 text-ink md:block lg:-right-14">
                <SetaMao className="w-full -scale-y-100 rotate-[200deg]" />
                <p className="-mt-4 rotate-6 text-right font-mono text-[11px] font-bold uppercase tracking-wider">
                  carimba aqui
                </p>
              </div>
            </div>
          </div>

          {/* O Zé atrás do balcão — olhos seguem o cursor */}
          <div className="relative mx-auto mt-2 w-full max-w-md lg:mt-8 lg:rotate-[0.5deg]">
            <span className="carimbo absolute -top-2 right-2 z-10 bg-white md:-right-4">
              Balcão aberto
            </span>
            <Clipe className="absolute -left-6 top-24 z-10 hidden w-5 -rotate-12 lg:block" />
            <ZePersonagem estado="normal" olhosVivos />
          </div>
        </div>
      </section>

      {/* ── TEMAS — senhas de atendimento, agrupadas por balcão ── */}
      <section id="temas" className="overflow-x-clip border-t-2 border-ink bg-amarelo-papel">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="relative">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
              ▸ Retire a sua senha
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">
              Escolhe o teu balcão
            </h2>
            <span className="carimbo absolute -top-4 right-0 hidden rotate-6 bg-white md:block">
              Senhas grátis
            </span>
            <p className="mt-4 max-w-lg text-stone-800">
              Cada tema é uma senha. Toca na que precisas — a tua vez chega
              sempre, aqui.
            </p>
          </div>

          {/* A senha mais pedida — ocupa 2 colunas */}
          <div className="relative mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative sm:col-span-2">
              <Clipe className="absolute -top-4 left-10 z-10 w-6 rotate-6" />
              <SenhaTema tema={destaque} i={0} fundo="#f5e27a" numero="A-001" balcao="Balcão 1" destaque />
            </div>

            {/* Senha caída — decorativa, saiu do dispensador */}
            <div
              aria-hidden
              className="senha senha-tombada hidden w-52 lg:block"
              style={{ "--fundo": "#f5e27a", position: "absolute", right: "-3rem", bottom: "-5.5rem", transform: "rotate(163deg)" } as CSSProperties}
            >
              <div className="px-4 pb-3 pt-4">
                <p className="font-mono text-2xl font-bold">X-000</p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-stone-600">Erro de impressão</p>
              </div>
            </div>
          </div>

          {/* Um balcão por grupo de temas */}
          {BALCOES.map((b, bi) => (
            <div key={b.letra} className="mt-14">
              <p className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.2em]">
                <span className="rounded border-2 border-ink bg-white px-2.5 py-1 shadow-[2px_2px_0_#1b1d22]">
                  Balcão {bi + 1}
                </span>
                <span className="text-carimbo-tinta">— {b.rotulo}</span>
              </p>
              <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {b.ids.map((id, j) => {
                  const tema = porId(id);
                  const ultimo = bi === BALCOES.length - 1 && j === b.ids.length - 1;
                  return (
                    <SenhaTema
                      key={id}
                      tema={tema}
                      i={bi * 4 + j + 1}
                      fundo="#f5e27a"
                      numero={`${b.letra}-${String(j + 1).padStart(3, "0")}`}
                      balcao={`Balcão ${bi + 1}`}
                      tombada={ultimo}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS — painel LED sobre azul esferográfica ── */}
      <section id="como-funciona" className="relative border-t-2 border-ink bg-esferografica text-white">
        {/* Carimbo que invade da secção anterior */}
        <span className="carimbo absolute -top-5 right-6 rotate-[10deg] bg-white md:right-16">
          Urgente
        </span>
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-led">
                ▸ Departamento de estatística
              </p>
              <h2 className="mt-2 font-display text-4xl uppercase leading-none tracking-tight md:text-5xl">
                {stats.paginas} impressos lidos.
                <br />
                Zero filas.
              </h2>
              <p className="mt-5 max-w-lg text-blue-100/90">
                Não precisas de saber qual é a repartição: o Zé leu os guias
                oficiais e leva-te à página certa.
              </p>
              <Link
                href="/fontes"
                className="mt-8 inline-block rounded-lg border-2 border-white bg-transparent px-6 py-2.5 font-semibold text-white shadow-[3px_3px_0_rgba(255,255,255,0.35)] transition-all hover:-translate-y-0.5 hover:bg-white hover:text-esferografica hover:shadow-[5px_5px_0_rgba(255,255,255,0.35)]"
              >
                Ver o arquivo de fontes →
              </Link>
            </div>
            <PainelLED stats={stats} className="-rotate-1" />
          </div>
          <div className="mt-12 flex flex-wrap gap-2.5">
            {fontes.map((g) => (
              <a
                key={g.entidade.dominio}
                href={`https://${g.entidade.dominio}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/30 px-3.5 py-1.5 font-mono text-[12px] tracking-wide text-blue-100 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              >
                {g.entidade.dominio}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXEMPLO DE RESPOSTA — zona sóbria (a piada fica à volta) ── */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-band-vermelho">
              ▸ Despacho interno
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-none tracking-tight md:text-5xl">
              Cada resposta tem a sua fonte.
            </h2>
            <p className="mt-4 max-w-md text-stone-600">
              O Zé só cita páginas oficiais. Um clique e estás no site do
              Estado, onde as decisões se tomam.
            </p>
            {/* O Zé a carimbar — sai do contentor, vigia o exemplo */}
            <div className="mt-6 hidden w-44 -rotate-2 lg:block">
              <ZePersonagem estado="carimbar" />
            </div>
          </div>
          <div className="relative rotate-[0.4deg]">
            <span aria-hidden className="fita -left-4 -top-3 -rotate-45" />
            <span aria-hidden className="fita -right-4 -top-3 rotate-45" />
            <div className="rounded-lg border-2 border-ink bg-paper p-5 shadow-[6px_6px_0_#1b1d22] sm:p-6">
              <div className="flex justify-end">
                <p className="max-w-[85%] rounded-xl rounded-br-sm border-2 border-ink bg-band-verde px-4 py-2.5 text-[15px] text-white shadow-[3px_3px_0_#1b1d22]">
                  Como renovo o Cartão de Cidadão?
                </p>
              </div>
              <div className="mt-4 flex gap-3">
                <ZeFace className="mt-1 size-8 shrink-0" />
                <div className="relative rounded-xl rounded-tl-sm border-2 border-ink bg-white px-5 py-4 shadow-[3px_3px_0_#1b1d22]">
                  <span className="carimbo absolute -right-3 -top-4 rotate-[8deg] bg-white">
                    Deferido
                  </span>
                  <ul className="list-disc space-y-2 pl-5 text-[15px] text-stone-700">
                    <li>
                      Online, no ePortugal — se tens 25 anos ou mais e não
                      precisas de alterar dados nem foto.
                    </li>
                    <li>
                      Presencial — agenda no Siga e vai a um Espaço de Registos ou
                      Loja do Cidadão.
                    </li>
                    <li>
                      A renovação online é mais barata. Confirma o valor atual na
                      fonte.
                    </li>
                  </ul>
                  <a
                    href="https://eportugal.gov.pt/servicos/renovar-o-cartao-de-cidadao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-between rounded-lg border-2 border-azulejo/60 px-4 py-3 text-sm transition-colors hover:bg-azulejo-suave"
                  >
                    <span className="font-medium text-azulejo">
                      1. Renovar o Cartão de Cidadão
                    </span>
                    <span className="font-mono text-xs text-stone-500">
                      eportugal.gov.pt ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAZ / NÃO FAZ — formulário Z-02, uma folha só ── */}
      <section className="border-t-2 border-ink bg-amarelo-papel">
        <div className="mx-auto max-w-4xl px-4 py-20">
          <div className="relative rotate-[0.5deg] border-2 border-ink bg-white shadow-[8px_8px_0_#1b1d22]">
            <span aria-hidden className="fita -left-5 -top-3 -rotate-45" />
            <span aria-hidden className="fita -right-5 -top-3 rotate-45" />
            {/* Cabeçalho do impresso */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-6 py-4 sm:px-8">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-stone-600">
                  Formulário Z-02 · preencher a tinta
                </p>
                <h2 className="mt-1 font-display text-2xl uppercase tracking-tight md:text-3xl">
                  O que faz, o que não faz
                </h2>
              </div>
              <span className="carimbo rotate-[6deg]">Via única</span>
            </div>
            <div className="folha-linhas grid md:grid-cols-2 md:divide-x-2 md:divide-dashed md:divide-ink/25">
              <div className="px-6 py-7 sm:px-8">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-band-verde">
                  Autorizado
                </p>
                <ul className="mt-5 space-y-4">
                  {[
                    "Explicar os passos, por ordem",
                    "Citar as páginas oficiais",
                    "Funcionar sem conta nem registo",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3.5 text-lg font-medium">
                      <CheckMao />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 border-dashed border-ink/25 px-6 py-7 sm:px-8 md:border-t-0">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
                  Indeferido
                </p>
                <ul className="mt-5 space-y-4">
                  {[
                    "Marcar atendimentos por ti",
                    "Pagar o IUC ou o IRS por ti",
                    "Guardar as tuas conversas",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3.5 text-lg font-medium">
                      <XMao />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="border-t-2 border-dashed border-ink/25 px-6 py-3.5 font-mono text-[11px] uppercase tracking-wide text-stone-500 sm:px-8">
              A informação pode ficar desatualizada — confirma sempre na fonte.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ — Livro de Reclamações ── */}
      <section id="perguntas" className="border-t-2 border-ink">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <div className="relative text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-band-vermelho">
              ▸ Artigo 74.º da Lei nº 144/2015
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-tight md:text-5xl">
              Livro de reclamações
            </h2>
            <p className="mt-3 text-stone-600">
              As queixas mais frequentes — respondidas antes de chegarem ao
              livro.
            </p>
            {/* O Zé em pânico — as reclamações chegaram */}
            <div className="absolute -right-24 -top-16 hidden w-36 rotate-3 lg:block xl:-right-32">
              <ZePersonagem estado="panico" />
            </div>
          </div>
          <div className="relative mt-10 -rotate-[0.4deg]">
            <span aria-hidden className="fita -top-3 left-16 -rotate-3" />
            {/* Lombada vermelha do livro */}
            <div
              aria-hidden
              className="absolute -left-3.5 -top-2 bottom-[-8px] w-5 rounded-l-md border-2 border-ink bg-band-vermelho"
            />
            <div className="border-2 border-ink bg-white shadow-[8px_8px_0_#1b1d22]">
              <div className="flex items-center justify-between border-b-2 border-ink bg-form-amarelo/40 px-6 py-3.5">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
                  Livro de reclamações — via do cidadão
                </p>
                <span className="carimbo rotate-[8deg]">Via do cidadão</span>
              </div>
              <div className="divide-y-2 divide-dashed divide-ink/15">
                {[
                  {
                    q: "É um site do Estado?",
                    a: "Não. O Pergunta ao Zé é um projeto independente. Aponta para as páginas oficiais, mas não fala em nome de nenhuma entidade pública.",
                  },
                  {
                    q: "Onde vai parar a minha pergunta?",
                    a: "Pode ser processada por um modelo de IA (Groq, tier gratuito) que só recebe a pergunta e excertos das respostas curadas — nunca dados pessoais. Se a IA falhar, responde a pesquisa local. As conversas não são guardadas.",
                  },
                  {
                    q: "Que serviços conhece?",
                    a: "Cartão de Cidadão, passaporte, Chave Móvel Digital, IRS e Finanças, Segurança Social, SNS, carta de condução e veículos, empresa, residência e nacionalidade, certidões, justiça, eleições, habitação, família, pensões, ensino superior, transportes e vida noutro país da UE.",
                  },
                  {
                    q: "É grátis?",
                    a: "Sim — sem conta, sem anúncios, sem subscrições. Nem sequer temos onde meter um IBAN.",
                  },
                  {
                    q: "E se a resposta estiver errada ou desatualizada?",
                    a: "Pode acontecer — os serviços mudam regras e preços. Cada resposta mostra as fontes oficiais: confirma lá antes de agir.",
                  },
                ].map((f, i) => (
                  <details key={f.q} className="group px-6 py-5">
                    <summary className="flex items-start justify-between gap-4">
                      <span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-carimbo-tinta">
                          Reclamação nº {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-1 block font-medium">{f.q}</span>
                      </span>
                      <span aria-hidden className="faq-plus mt-1 text-xl text-stone-500">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-stone-600">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final — tinta de carimbo ── */}
      <section className="overflow-x-clip border-t-2 border-ink bg-band-vermelho">
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
          {/* O Zé aliviado — despachou o dia */}
          <div className="relative mx-auto w-52 -rotate-1">
            <span className="carimbo-claro absolute -right-8 top-6 z-10 rotate-6 bg-band-vermelho">
              Grátis
            </span>
            <ZePersonagem estado="aliviado" />
          </div>
          <h2 className="mt-6 font-display text-4xl uppercase tracking-tight text-white md:text-5xl">
            A tua vez é agora.
          </h2>
          <p className="mt-3 font-mono text-sm uppercase tracking-widest text-white/80">
            Sem senha. Sem fila. Sem impresso em triplicado.
          </p>
          <Link
            href="/chat"
            className="btn-primary mt-8 px-8 py-3.5 text-base shadow-[5px_5px_0_#1b1d22] hover:shadow-[7px_7px_0_#1b1d22]"
          >
            Pergunta ao Zé →
          </Link>
        </div>
      </section>

      <FloatingAsk />
    </>
  );
}
