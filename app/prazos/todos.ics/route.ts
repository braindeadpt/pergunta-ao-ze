import { PRAZOS } from "@/lib/data/prazos";
import { calendarioIcs } from "@/lib/ics";
import { SITE_URL } from "@/lib/site";

/* /prazos/todos.ics → calendário com todos os prazos (subscrição). */

export const dynamic = "force-static";

export function GET() {
  const ics = calendarioIcs(PRAZOS, { base: SITE_URL });
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="perguntaaoze-prazos.ics"',
    },
  });
}
