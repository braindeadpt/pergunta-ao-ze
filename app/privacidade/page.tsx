import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidade",
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        Privacidade
      </h1>
      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-stone-700">
        <p>
          O Pergunta ao Zé foi desenhado para precisar do mínimo de informação
          possível.
        </p>
        <h2 className="pt-2 font-serif text-xl font-semibold">
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
        <h2 className="pt-2 font-serif text-xl font-semibold">
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
        <h2 className="pt-2 font-serif text-xl font-semibold">
          Dados técnicos
        </h2>
        <p>
          Como em qualquer site, o alojamento pode registar dados técnicos dos
          pedidos (endereço IP, data, página pedida) por razões de segurança e
          operação.
        </p>
        <h2 className="pt-2 font-serif text-xl font-semibold">
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
