/**
 * Botão "Partilhar no WhatsApp" — link wa.me, sem JS nem tracking.
 * O wa.me abre o picker de chat do WhatsApp com a mensagem pronta.
 */
export default function Partilhar({
  texto,
  url,
  etiqueta,
}: {
  /** Texto da mensagem (a pergunta) — o URL é anexado no fim. */
  texto: string;
  /** URL absoluto da página a partilhar. */
  url: string;
  /** Rótulo do botão (PT/EN conforme a página). */
  etiqueta: string;
}) {
  const href = `https://wa.me/?text=${encodeURIComponent(`${texto}\n${url}`)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-outline px-4 py-2.5 text-sm"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        focusable="false"
      >
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3 3.6c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-2-.9c-.3-.1-.5-.2-.7.1l-1 1.1c-.2.2-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.5-.6c.1-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.4-.5-.7-.5h-.6Z" />
      </svg>
      {etiqueta}
    </a>
  );
}
