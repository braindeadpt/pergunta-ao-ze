"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import SenhaTema from "@/components/SenhaTema";
import type { Tema } from "@/lib/types";

/**
 * Grelha de senhas agrupadas por balcão — DESIGN.md §5.1.
 * Mostra os 2 primeiros balcões; o resto fica no DOM (SEO) mas escondido
 * atrás do botão "VER MAIS BALCÕES" (aria-expanded/aria-controls).
 * Quando o utilizador escreve no filtro, pesquisa nos 7 balcões + destaque.
 */
export interface Balcao {
  rotulo: string;
  letra: string;
  temas: Tema[];
}

const VISIVEIS = 2;

const CONECTORES = new Set([
  "a", "o", "e", "de", "do", "da", "dos", "das",
  "em", "no", "na", "nos", "nas", "ao", "aos",
  "os", "as", "um", "uma", "para", "por", "com",
]);

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const palavrasNorm = (s: string) =>
  norm(s)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

interface EntradaIndexada {
  tema: Tema;
  numero: string;
  balcao: string;
  i: number;
  palavrasTema: string[];
  palavrasPorPergunta: string[][];
}

export default function SenhasGrid({
  balcoes,
  destaque,
}: {
  balcoes: Balcao[];
  destaque: Tema;
}) {
  const [aberto, setAberto] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const restoRef = useRef<HTMLDivElement>(null);
  const escondidos = balcoes.slice(VISIVEIS);

  const alternar = () => {
    const novo = !aberto;
    setAberto(novo);
    if (novo) {
      // Foco no primeiro balcão revelado
      requestAnimationFrame(() => {
        restoRef.current?.querySelector<HTMLElement>("[data-balcao-header]")?.focus();
      });
    }
  };

  // Índice completo dos 7 balcões + destaque (A-001 entra no Balcão 1 apenas na pesquisa)
  const { balcoesIndexados, vocabGlobal } = useMemo(() => {
    const vocab = new Set<string>();
    const indexarTema = (
      tema: Tema,
      numero: string,
      balcao: string,
      i: number
    ): EntradaIndexada => {
      const base = palavrasNorm(
        `${tema.titulo} ${tema.entidade} ${tema.descricao}`
      );
      const porPergunta = tema.perguntas.map((p) =>
        palavrasNorm(`${p.texto} ${p.palavras.join(" ")}`)
      );
      const todas = [...base, ...porPergunta.flat()];
      for (const w of todas) vocab.add(w);
      return {
        tema,
        numero,
        balcao,
        i,
        palavrasTema: todas,
        palavrasPorPergunta: porPergunta,
      };
    };

    const lista = balcoes.map((b, bi) => {
      const rotuloBalcao = `Balcão ${bi + 1}`;
      const itens: EntradaIndexada[] = [];
      if (bi === 0) {
        itens.push(indexarTema(destaque, "A-001", rotuloBalcao, 0));
      }
      b.temas.forEach((tema, j) => {
        itens.push(
          indexarTema(
            tema,
            `${b.letra}-${String(j + 1).padStart(3, "0")}`,
            rotuloBalcao,
            bi * 4 + j + 1
          )
        );
      });
      return {
        bi,
        rotulo: b.rotulo,
        letra: b.letra,
        itens,
      };
    });

    return { balcoesIndexados: lista, vocabGlobal: vocab };
  }, [balcoes, destaque]);

  const pesquisaLimpa = pesquisa.trim();
  const termosBrutos = useMemo(() => palavrasNorm(pesquisaLimpa), [pesquisaLimpa]);
  const termos = useMemo(() => {
    if (termosBrutos.length <= 1) return termosBrutos;
    const filtrados = termosBrutos.filter((t) => !CONECTORES.has(t));
    return filtrados.length > 0 ? filtrados : termosBrutos;
  }, [termosBrutos]);
  const aFiltrar = termos.length > 0;

  const resultados = useMemo(() => {
    if (!aFiltrar) return [];
    const correspondePalavra = (w: string, t: string) => {
      if (t.length <= 3 && vocabGlobal.has(t)) return w === t;
      return w.startsWith(t) || (t.length >= 5 && w.includes(t));
    };

    return balcoesIndexados
      .map((b) => {
        const itens = b.itens
          .filter((item) =>
            termos.every((t) =>
              item.palavrasTema.some((w) => correspondePalavra(w, t))
            )
          )
          .map((item) => {
            // Promove perguntas com match direto ao topo do talão durante o filtro
            const pontuadas = item.tema.perguntas.map((p, idx) => {
              const pWords = item.palavrasPorPergunta[idx];
              const hits = termos.filter((t) =>
                pWords.some((w) => correspondePalavra(w, t))
              ).length;
              return { p, hits };
            });
            const temMatchPergunta = pontuadas.some((x) => x.hits > 0);
            const temaExibido = temMatchPergunta
              ? {
                  ...item.tema,
                  perguntas: [...pontuadas]
                    .sort((a, c) => c.hits - a.hits)
                    .map((x) => x.p),
                }
              : item.tema;
            return { ...item, tema: temaExibido };
          });
        return { ...b, itens };
      })
      .filter((b) => b.itens.length > 0);
  }, [aFiltrar, balcoesIndexados, termos, vocabGlobal]);

  const totalEncontrados = resultados.reduce((acc, b) => acc + b.itens.length, 0);

  const renderBalcao = (b: Balcao, bi: number, extraRef?: (el: HTMLElement | null) => void) => (
    <div key={b.letra} className="mt-14 first:mt-0">
      <p
        data-balcao-header
        tabIndex={extraRef ? -1 : undefined}
        ref={extraRef}
        className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.2em] outline-band-verde outline-offset-4 focus-visible:outline-2"
      >
        <span className="rounded border-2 border-ink bg-white px-2.5 py-1 shadow-[2px_2px_0_#1b1d22]">
          Balcão {bi + 1}
        </span>
        <span className="text-carimbo-tinta">— {b.rotulo}</span>
      </p>
      <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {b.temas.map((tema, j) => (
          <SenhaTema
            key={tema.id}
            tema={tema}
            i={bi * 4 + j + 1}
            fundo="#f5e27a"
            numero={`${b.letra}-${String(j + 1).padStart(3, "0")}`}
            balcao={`Balcão ${bi + 1}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Barra de filtro instantâneo de senhas */}
      <div className="mt-8 max-w-2xl">
        <div className="flex items-center gap-2 rounded-lg border-2 border-ink bg-white px-3.5 py-2.5 shadow-[3px_3px_0_#1b1d22] focus-within:shadow-[4px_4px_0_#1b1d22] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-band-verde">
          <span
            aria-hidden
            className="font-mono text-sm font-bold uppercase tracking-widest text-stone-600"
          >
            ▸
          </span>
          <input
            ref={inputRef}
            type="search"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" && pesquisa) {
                e.preventDefault();
                setPesquisa("");
              }
            }}
            placeholder="Procurar tema ou assunto (ex.: passaporte, IMI, carta, AIMA)…"
            aria-label="Procurar tema ou assunto nas senhas"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-stone-500 sm:text-base [&::-webkit-search-cancel-button]:hidden"
          />
          {pesquisa.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setPesquisa("");
                inputRef.current?.focus();
              }}
              className="shrink-0 rounded border-2 border-ink/50 bg-paper px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-form-amarelo/40"
            >
              Limpar
            </button>
          )}
        </div>
        <p
          aria-live="polite"
          className={
            aFiltrar
              ? "mt-2.5 font-mono text-sm font-bold text-stone-800"
              : "sr-only"
          }
        >
          {aFiltrar
            ? totalEncontrados === 0
              ? `0 senhas encontradas para «${pesquisaLimpa}»`
              : totalEncontrados === 1
                ? "1 senha encontrada"
                : `${totalEncontrados} senhas encontradas`
            : ""}
        </p>
      </div>

      {aFiltrar ? (
        totalEncontrados > 0 ? (
          <div className="mt-10 space-y-14">
            {resultados.map((b) => (
              <div key={b.letra}>
                <p className="flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.2em]">
                  <span className="rounded border-2 border-ink bg-white px-2.5 py-1 shadow-[2px_2px_0_#1b1d22]">
                    Balcão {b.bi + 1}
                  </span>
                  <span className="text-carimbo-tinta">— {b.rotulo}</span>
                </p>
                <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {b.itens.map((item) => (
                    <SenhaTema
                      key={item.tema.id}
                      tema={item.tema}
                      i={item.i}
                      fundo="#f5e27a"
                      numero={item.numero}
                      balcao={item.balcao}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 max-w-xl rounded-lg border-2 border-ink bg-white px-6 py-6 shadow-[4px_4px_0_#1b1d22]">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-carimbo-tinta">
              ▸ Sem senha neste balcão
            </p>
            <p className="mt-2 text-base text-ink">
              Não há nenhuma senha local para{" "}
              <span className="font-semibold">«{pesquisaLimpa}»</span>. Podes
              perguntar diretamente ao Zé.
            </p>
            <Link
              href={`/chat?q=${encodeURIComponent(pesquisaLimpa.slice(0, 500))}`}
              className="btn-primary mt-4 px-5 py-2.5 text-sm"
            >
              Perguntar «
              {pesquisaLimpa.length > 36
                ? `${pesquisaLimpa.slice(0, 36)}…`
                : pesquisaLimpa}
              » ao Zé →
            </Link>
          </div>
        )
      ) : (
        <>
          {/* A senha mais pedida — ocupa 2 colunas */}
          <div className="relative mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative sm:col-span-2">
              <svg viewBox="0 0 24 56" className="absolute -top-4 left-10 z-10 w-6 rotate-6" fill="none" stroke="#1b1d22" strokeWidth="4" strokeLinecap="round" aria-hidden>
                <path d="M12 10 V44" />
                <path d="M6 20 V50 Q6 54 10 54 H14 Q18 54 18 50 V24" />
              </svg>
              <SenhaTema tema={destaque} i={0} fundo="#f5e27a" numero="A-001" balcao="Balcão 1" destaque />
            </div>

            {/* Senha caída — decorativa, saiu do dispensador */}
            <div
              aria-hidden
              className="senha senha-tombada hidden w-52 lg:block"
              style={{ "--fundo": "#f5e27a", position: "absolute", right: "-3rem", bottom: "-5.5rem", transform: "rotate(163deg)" } as React.CSSProperties}
            >
              <div className="px-4 pb-3 pt-4">
                <p className="font-mono text-2xl font-bold">X-000</p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-stone-600">Erro de impressão</p>
              </div>
            </div>
          </div>

          {balcoes.slice(0, VISIVEIS).map((b, bi) => renderBalcao(b, bi))}

          {/* Balcões extra — no HTML para SEO, revelados pelo botão */}
          <div
            id="balcoes-extra"
            ref={restoRef}
            className={aberto ? "animate-fade-in-up" : "hidden"}
          >
            {escondidos.map((b, k) => renderBalcao(b, k + VISIVEIS, k === 0 ? (el) => { if (aberto && el) el.dataset.first = "1"; } : undefined))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={alternar}
              aria-expanded={aberto}
              aria-controls="balcoes-extra"
              className="carimbo bg-white !text-base !px-6 !py-3 transition-transform hover:scale-105 active:scale-95"
              style={{ transform: aberto ? "rotate(2deg)" : "rotate(-4deg)" }}
            >
              {aberto ? "Recolher balcões" : `Ver mais balcões (${escondidos.length})`}
            </button>
          </div>
        </>
      )}
    </>
  );
}
