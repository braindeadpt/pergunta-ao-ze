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
          Quando escreves uma pergunta, ela é enviada ao nosso servidor para ser
          comparada com um conjunto curado de respostas sobre serviços
          públicos. Nesta versão não há inteligência artificial nem envio para
          terceiros. Se no futuro as respostas passarem a usar um modelo de IA,
          a pergunta poderá ser enviada ao fornecedor desse modelo — e esta
          página dirá qual.
        </p>
        <h2 className="pt-2 font-serif text-xl font-semibold">
          O que não guardamos
        </h2>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>Não guardamos as conversas nem as perguntas.</li>
          <li>Não pedimos conta, email, NIF ou números de documentos.</li>
          <li>Não usamos cookies de rastreamento nem publicidade.</li>
        </ul>
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
