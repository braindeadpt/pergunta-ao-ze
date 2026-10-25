import { PRAZOS } from "@/lib/data/prazos";
import { calendarioIcs } from "@/lib/ics";
import { SITE_URL } from "@/lib/site";

/* /prazos/<id> → .ics de um prazo, gerado no build. */

export const dynamic = "force-static";

export function generateStaticParams() {
  return PRAZOS.map((p) => ({ id: p.id }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const prazo = PRAZOS.find((p) => p.id === id);
  if (!prazo) return new Response("Not found", { status: 404 });

  const ics = calendarioIcs([prazo], { base: SITE_URL });
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${id}.ics"`,
    },
  });
}
