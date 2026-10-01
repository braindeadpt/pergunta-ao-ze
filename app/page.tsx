import Link from "next/link";
import HeroBox from "@/components/HeroBox";
import FloatingAsk from "@/components/FloatingAsk";
import TemaArt from "@/components/TemaArt";
import ZeFace from "@/components/ZeFace";
import { TEMAS } from "@/lib/data/temas";
import { getEstatisticas, getFontes } from "@/lib/data/fontes";

export default function Home() {
  const stats = getEstatisticas();
  const fontes = getFontes();

  return (
    <>
      {/* Hero — a página começa como uma conversa */}
      <section>
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-14 text-center md:pt-20">
          <div className="animate-fade-in-up flex items-end justify-center gap-3">
            <ZeFace className="size-12 shrink-0 -rotate-3" />
            <p className="rounded-2xl rounded-bl-md border border-stone-200 bg-white px-4 py-2.5 text-left font-serif text-lg font-medium leading-snug shadow-sm">
              Olá! Sou o Zé — já li os guias chatos por ti.
            </p>
          </div>
          <h1
            className="animate-fade-in-up mt-9 font-serif text-[3.4rem] font-semibold leading-[1.05] tracking-tight md:text-[4.5rem]"
            style={{ animationDelay: "120ms" }}
          >
            Serviços públicos?
            <br />
            Pergunta ao Zé.
          </h1>
          <p
            className="animate-fade-in-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600"
            style={{ animationDelay: "240ms" }}
          >
            Encontra a página oficial certa — sem fila, sem senha, sem
            formulário em triplicado.
          </p>
          <div className="animate-fade-in-up mt-10" style={{ animationDelay: "360ms" }}>
            <HeroBox />
          </div>
        </div>
      </section>

      {/* Temas */}
      <section id="temas" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-serif text-4xl font-semibold tracking-tight">
          De onde queres partir?
        </h2>
        <p className="mt-3 text-stone-500">
          Os temas que o Zé já decorou — toca numa pergunta e ela abre na
          conversa, pronta a enviar.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMAS.map((tema) => (
            <article
              key={tema.id}
              className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)]"
            >
              <TemaArt temaId={tema.id} className="h-32" />
              <div className="p-5 pt-4">
                <p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">
                  {tema.entidade}
                </p>
                <h3 className="mt-1 font-serif text-[1.55rem] font-semibold leading-tight">
                  {tema.titulo}
                </h3>
                <p className="mt-1 text-sm text-stone-500">{tema.descricao}</p>
                <ul className="mt-4 divide-y divide-stone-100 border-t border-stone-100">
                  {tema.perguntas.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/chat?q=${encodeURIComponent(p.texto)}`}
                        className="group/q flex items-center justify-between gap-3 py-2.5"
                      >
                        <span className="text-sm leading-snug text-stone-700 transition-colors group-hover/q:text-ink">
                          {p.texto}
                        </span>
                        <span
                          aria-hidden
                          className="shrink-0 text-lg text-stone-300 transition-all group-hover/q:translate-x-1 group-hover/q:text-band-verde"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Fontes + stats */}
      <section id="como-funciona" className="border-y border-stone-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
                {stats.paginas} páginas oficiais.
                <br />
                Uma pergunta.
              </h2>
              <p className="mt-5 max-w-lg text-stone-600">
                Não precisas de saber qual é a entidade: o Zé procura nas
                páginas oficiais e leva-te à certa.
              </p>
              <div className="mt-8 flex flex-wrap gap-10">
                <div>
                  <p className="font-serif text-4xl font-semibold">
                    {stats.entidades}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">entidades</p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-semibold">
                    {stats.perguntas}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    perguntas com resposta
                  </p>
                </div>
                <div>
                  <p className="font-serif text-4xl font-semibold">
                    {stats.paginas}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    páginas oficiais
                  </p>
                </div>
              </div>
              <Link
                href="/fontes"
                className="btn-outline mt-9 px-6 py-2.5 text-sm"
              >
                Vê todas as fontes
              </Link>
            </div>
            <div className="flex flex-wrap content-start gap-2.5 lg:justify-end">
              {fontes.map((g) => (
                <a
                  key={g.entidade.dominio}
                  href={`https://${g.entidade.dominio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-stone-200 bg-paper px-3.5 py-1.5 text-[13px] text-stone-600 transition-colors hover:border-band-verde hover:text-band-verde"
                >
                  <span
                    aria-hidden
                    className={`size-1.5 rounded-full ${
                      g.entidade.ambito === "Europeu"
                        ? "bg-azulejo"
                        : "bg-band-verde"
                    }`}
                  />
                  {g.entidade.dominio}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exemplo de resposta */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight">
              Cada resposta tem a sua fonte.
            </h2>
            <p className="mt-4 max-w-md text-stone-600">
              O Zé só cita páginas oficiais. Um clique e estás no site do
              Estado, onde as decisões se tomam.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-stone-200 bg-paper p-5 shadow-sm sm:p-6">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-band-verde px-4 py-2.5 text-[15px] text-white">
                Como renovo o Cartão de Cidadão?
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <ZeFace className="mt-1 size-8 shrink-0" />
              <div className="rounded-2xl rounded-tl-sm border border-stone-200 bg-white px-5 py-4">
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
                  className="mt-4 flex items-center justify-between rounded-xl border border-stone-200 px-4 py-3 text-sm transition-colors hover:border-azulejo hover:bg-azulejo-suave"
                >
                  <span className="font-medium text-azulejo">
                    1. Renovar o Cartão de Cidadão
                  </span>
                  <span className="text-xs text-stone-400">
                    eportugal.gov.pt ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que faz / não faz */}
      <section className="border-y border-stone-200/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="font-serif text-4xl font-semibold tracking-tight">
            O que faz, o que não faz.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-stone-200 bg-paper p-7">
              <h3 className="font-semibold text-band-verde">Faz</h3>
              <ul className="mt-4 space-y-3.5 font-serif text-xl text-ink">
                {[
                  "Explica os passos",
                  "Cita as páginas oficiais",
                  "Funciona sem conta nem registo",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-sm text-band-verde"
                    >
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-stone-200 bg-paper p-7">
              <h3 className="font-semibold text-band-vermelho">Não faz</h3>
              <ul className="mt-4 space-y-3.5 font-serif text-xl text-ink">
                {[
                  "Não marca atendimentos",
                  "Não paga o IUC por ti",
                  "Não guarda as conversas",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-red-50 text-sm text-band-vermelho"
                    >
                      ✗
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-7 text-sm text-stone-500">
            A informação pode ficar desatualizada: antes de decidir, abre a
            fonte.
          </p>
        </div>
      </section>

      {/* Mais detalhes */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight">
              Mais detalhes, melhor resposta.
            </h2>
            <p className="mt-4 max-w-md text-stone-600">
              Onde estás e quem és mudam balcões e regras. Diz ao Zé o distrito,
              a situação e o que precisas.
            </p>
            <p className="mt-4 text-sm text-stone-400">
              Nunca NIF, números de documento ou dados de saúde — o Zé não
              precisa deles.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-7">
            <div className="flex flex-wrap gap-2">
              {[
                ["Onde", "Faro"],
                ["Quem", "trabalhadora por conta de outrem"],
                ["O quê", "acabei de ser mãe"],
              ].map(([k, v]) => (
                <span
                  key={k}
                  className="rounded-full border border-stone-200 bg-paper px-3.5 py-1.5 text-sm"
                >
                  <span className="text-stone-400">{k}</span>{" "}
                  <span className="font-medium">{v}</span>
                </span>
              ))}
            </div>
            <blockquote className="mt-5 border-l-2 border-band-verde pl-4 font-serif text-lg italic leading-relaxed text-stone-700">
              “Vivo em Faro e acabei de ser mãe. Trabalho por conta de outrem:
              como peço o subsídio de parentalidade?”
            </blockquote>
            <Link
              href={`/chat?q=${encodeURIComponent(
                "Vivo em Faro e acabei de ser mãe. Trabalho por conta de outrem: como peço o subsídio de parentalidade?"
              )}`}
              className="btn-primary mt-5 px-5 py-2.5 text-sm"
            >
              Pergunta ao Zé
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="perguntas" className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="font-serif text-4xl font-semibold tracking-tight">
          Perguntas frequentes
        </h2>
        <div className="mt-8 divide-y divide-stone-200 rounded-[1.75rem] border border-stone-200 bg-white">
          {[
            {
              q: "É um site do Estado?",
              a: "Não. O Pergunta ao Zé é um projeto independente. Aponta para as páginas oficiais, mas não fala em nome de nenhuma entidade pública.",
            },
            {
              q: "Onde vai parar a minha pergunta?",
              a: "A pergunta é comparada com um conjunto curado de respostas sobre serviços públicos — nesta versão não há inteligência artificial nem envio para terceiros. As conversas não são guardadas.",
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
          ].map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex items-center justify-between gap-4 font-medium">
                {f.q}
                <span aria-hidden className="faq-plus text-xl text-stone-400">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-stone-200/70 bg-band-verde-escuro">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-4">
            <ZeFace className="size-11 shrink-0 rotate-3" />
            <h2 className="font-serif text-4xl font-semibold tracking-tight text-emerald-50">
              Tens outra pergunta?
            </h2>
          </div>
          <p className="mt-3 text-sm text-emerald-100/70">
            O Zé espera por ti — e não é preciso senha.
          </p>
          <Link
            href="/chat"
            className="mt-7 inline-block rounded-full bg-white px-7 py-3.5 font-medium text-band-verde-escuro transition-transform hover:scale-105"
          >
            Pergunta ao Zé
          </Link>
        </div>
      </section>

      <FloatingAsk />
    </>
  );
}
