import type { Metadata } from "next";
import { getFontes, getEstatisticas } from "@/lib/data/fontes";
import { BALCOES_DEF, balcaoDeDominio } from "@/lib/balcoes";
import FontesArquivo, {
  type GrupoArquivo,
} from "@/components/FontesArquivo";
import ZePersonagem from "@/components/ZePersonagem";

export const metadata: Metadata = {
  title: "Fontes oficiais",
  description:
    "As páginas oficiais que o Zé usa para responder — entidades nacionais e europeias.",
};

export default function FontesPage() {
  const fontes = getFontes();
  const stats = getEstatisticas();

  // Cada entidade vai para o balcão onde mais perguntas a referenciam.
  // Sem referências → cai no "Arquivo geral" (dedução, não invenção).
  const grupos: GrupoArquivo[] = BALCOES_DEF.map((b) => ({
    rotulo: b.rotulo,
    letra: b.letra,
    fichas: [],
  }));
  const geral: GrupoArquivo = { rotulo: "Arquivo geral", letra: "G", fichas: [] };

  for (const g of fontes) {
    const bi = balcaoDeDominio(g.entidade.dominio);
    (bi >= 0 ? grupos[bi] : geral).fichas.push({
      dominio: g.entidade.dominio,
      nome: g.entidade.nome,
      ambito: g.entidade.ambito,
      contacto: g.entidade.contacto,
      fontes: g.fontes,
    });
  }
  const visiveis = grupos.filter((g) => g.fichas.length > 0);
  if (geral.fichas.length > 0) visiveis.push(geral);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-carimbo-tinta">
            ▸ Arquivo geral · repartições
          </p>
          <h1 className="mt-2 font-display text-4xl uppercase tracking-tight sm:text-5xl">
            Fontes oficiais
          </h1>
          <p className="mt-3 max-w-xl text-base text-stone-600">
            O Zé só responde com base nestas páginas — {stats.entidades}{" "}
            entidades, {stats.paginas} páginas. Todas pertencem ao Estado
            português ou à União Europeia. Abre uma ficha para ver contactos e
            páginas.
          </p>
        </div>
        <ZePersonagem
          estado="normal"
          className="hidden w-28 shrink-0 self-start sm:block"
        />
      </div>

      <div className="mt-8">
        <FontesArquivo grupos={visiveis} />
      </div>

      <p className="mt-10 border-t-2 border-dashed border-ink/20 pt-4 text-sm text-stone-600">
        Falta uma repartição?{" "}
        <a
          href="https://github.com/braindeadpt/pergunta-ao-ze/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-azulejo underline underline-offset-2"
        >
          Abre uma issue ↗
        </a>
      </p>
    </div>
  );
}
