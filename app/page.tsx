import Link from "next/link";
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

export default function Home() {
  const stats = getEstatisticas();
  const fontes = getFontes();

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
            <ZePersonagem estado="normal" olhosVivos />
          </div>
        </div>
      </section>

      {/* ── TEMAS — senhas de atendimento sobre papel amarelo ── */}
      <section id="temas" className="border-t-2 border-ink bg-amarelo-papel">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="relative">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-band-vermelho">
              ▸ Retire a sua senha
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">
              Escolhe o teu balcão
            </h2>
            <span className="carimbo absolute -top-4 right-0 hidden rotate-6 bg-white md:block">
              Senhas grátis
            </span>
            <p className="mt-4 max-w-lg text-stone-700">
              Cada tema é uma senha. Toca na que precisas — a tua vez chega
              sempre, aqui.
            </p>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {TEMAS.map((tema, i) => (
              <SenhaTema key={tema.id} tema={tema} i={i} fundo="#f5e27a" />
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS — painel LED sobre azul esferográfica ── */}
      <section id="como-funciona" className="border-t-2 border-ink bg-esferografica text-white">
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
          <div>
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
          </div>
          <div className="relative rotate-[0.4deg]">
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
                    <span className="font-mono text-xs text-stone-400">
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
            {/* Cabeçalho do impresso */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-6 py-4 sm:px-8">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-stone-500">
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
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-band-vermelho">
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
            <p className="border-t-2 border-dashed border-ink/25 px-6 py-3.5 font-mono text-[11px] uppercase tracking-wide text-stone-400 sm:px-8">
              A informação pode ficar desatualizada — confirma sempre na fonte.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ — Livro de Reclamações ── */}
      <section id="perguntas" className="border-t-2 border-ink">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <div className="text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-band-vermelho">
              ▸ Artigo 74.º da Lei nº 144/2015
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-tight md:text-5xl">
              Livro de reclamações
            </h2>
            <p className="mt-3 text-stone-500">
              As queixas mais frequentes — respondidas antes de chegarem ao
              livro.
            </p>
          </div>
          <div className="relative mt-10 -rotate-[0.4deg]">
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
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-band-vermelho">
                          Reclamação nº {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-1 block font-medium">{f.q}</span>
                      </span>
                      <span aria-hidden className="faq-plus mt-1 text-xl text-stone-400">
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

      {/* ── CTA final ── */}
      <section className="border-t-2 border-ink bg-band-verde-escuro">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="relative inline-block">
            <ZeFace expressao="pisca" className="mx-auto size-14 rotate-3" />
            <span className="carimbo-claro absolute -right-20 -top-1 hidden rotate-6 md:block">
              Grátis
            </span>
          </div>
          <h2 className="mt-5 font-display text-4xl uppercase tracking-tight text-emerald-50 md:text-5xl">
            A tua vez é agora.
          </h2>
          <p className="mt-3 font-mono text-sm uppercase tracking-widest text-emerald-100/70">
            Sem senha. Sem fila. Sem impresso em triplicado.
          </p>
          <Link
            href="/chat"
            className="mt-8 inline-block rounded-lg border-2 border-ink bg-white px-8 py-3.5 font-semibold text-band-verde-escuro shadow-[5px_5px_0_#1b1d22] transition-all hover:-translate-y-1 hover:shadow-[7px_7px_0_#1b1d22]"
          >
            Pergunta ao Zé →
          </Link>
        </div>
      </section>

      <FloatingAsk />
    </>
  );
}
