import type { Metadata } from "next";
import ZePersonagem from "@/components/ZePersonagem";

export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "O que acontece à tua pergunta: sem contas, sem cookies de rastreamento, sem guardar dados pessoais.",
};

const SECCOES = [
  { id: "pergunta", t: "O que acontece à tua pergunta" },
  { id: "nao-guardamos", t: "O que não guardamos" },
  { id: "tecnicos", t: "Dados técnicos" },
  { id: "regra", t: "Uma regra simples" },
];

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
            ▸ Impresso Z-03 · versão cidadão
          </p>
          <h1 className="mt-2 font-display text-4xl uppercase tracking-tight sm:text-5xl">
            Privacidade
          </h1>
        </div>
        <div className="relative hidden shrink-0 sm:block">
          <ZePersonagem estado="pensar" className="w-28" />
          <span
            aria-hidden
            className="carimbo absolute -left-8 top-16 rotate-[-8deg] bg-white text-xs"
          >
            Leia atentamente
          </span>
        </div>
      </div>

      {/* Índice — formulário de leitura */}
      <nav
        aria-label="Índice da página"
        className="mt-8 border-2 border-ink bg-form-amarelo/30 px-5 py-4 shadow-[4px_4px_0_#1b1d22]"
      >
        <p aria-hidden className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-stone-600">
          Índice · preencher por esta ordem
        </p>
        <ol className="mt-2 space-y-1">
          {SECCOES.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="font-mono text-sm font-medium text-azulejo underline decoration-azulejo/30 underline-offset-2 hover:decoration-azulejo"
              >
                {String(i + 1).padStart(2, "0")} — {s.t}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8 space-y-5 border-2 border-ink bg-white p-7 text-base leading-relaxed text-stone-700 shadow-[6px_6px_0_#1b1d22]">
        <p>
          O Pergunta ao Zé foi desenhado para precisar do mínimo de informação
          possível.
        </p>
        <h2
          id="pergunta"
          className="pt-2 font-display text-lg uppercase tracking-tight"
        >
          O que acontece à tua pergunta
        </h2>
        <p>
          Quando escreves uma pergunta, ela é enviada ao nosso servidor e pode
          ser processada por um modelo de inteligência artificial alojado na{" "}
          <a
            href="https://groq.com/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-azulejo underline decoration-azulejo/30 underline-offset-2 hover:decoration-azulejo"
          >
            Groq
          </a>{" "}
          (fornecedor externo, tier gratuito). O modelo só recebe a tua
          pergunta mais excertos das nossas respostas curadas — nunca te pede
          nem deve receber dados pessoais. Se a IA falhar, a resposta vem do
          motor de pesquisa local, sem envio a terceiros.
        </p>
        <h2
          id="nao-guardamos"
          className="pt-2 font-display text-lg uppercase tracking-tight"
        >
          O que não guardamos
        </h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Não guardamos as conversas nem as perguntas.</li>
          <li>Não pedimos conta, email, NIF ou números de documentos.</li>
          <li>Não usamos cookies de rastreamento nem publicidade.</li>
        </ul>
        <p>
          Usamos Vercel Analytics — métricas de visitas agregadas e anónimas,
          sem cookies nem identificação pessoal.
        </p>
        <h2
          id="tecnicos"
          className="pt-2 font-display text-lg uppercase tracking-tight"
        >
          Dados técnicos
        </h2>
        <p>
          Como em qualquer site, o alojamento pode registar dados técnicos dos
          pedidos (endereço IP, data, página pedida) por razões de segurança e
          operação.
        </p>
        <p>
          Para limitar o abuso do chat, contamos pedidos por endereço IP
          usando apenas uma <em>hash</em> (resumo criptográfico) do endereço,
          guardada em memória durante ~10 minutos e depois apagada. Nunca
          guardamos o IP em claro nem o associamos às perguntas.
        </p>
        <h2
          id="regra"
          className="pt-2 font-display text-lg uppercase tracking-tight"
        >
          Uma regra simples
        </h2>
        <p>
          Não escrevas dados pessoais nas perguntas — números de documentos,
          NIF, dados de saúde. O Zé não precisa deles para responder.
        </p>
      </div>
    </div>
  );
}
