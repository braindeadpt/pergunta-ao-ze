import {
  IdCard, BookUser, KeyRound, ReceiptText, ShieldCheck, HeartPulse,
  CarFront, Store, Stamp, ScrollText, MonitorCheck, BriefcaseBusiness,
  Globe, PiggyBank, House, HeartHandshake, Scale, Vote, GraduationCap,
  PlaneTakeoff, BookOpenText, TramFront, FileQuestion,
  type LucideIcon,
} from "lucide-react";

interface Arte {
  icon: LucideIcon;
  bg: string;
  ink: string;
  blob: string;
}

const ARTES: Record<string, Arte> = {
  "cartao-de-cidadao": { icon: IdCard, bg: "#e2ecdf", ink: "#1d5c38", blob: "#b9d3b4" },
  "passaporte": { icon: BookUser, bg: "#e4e6f6", ink: "#2f3a8f", blob: "#c3c8ec" },
  "chave-movel-digital": { icon: KeyRound, bg: "#dfebf6", ink: "#1d4f9c", blob: "#bed5ef" },
  "irs-financas": { icon: ReceiptText, bg: "#f1e8d5", ink: "#8a5a18", blob: "#e3d2ac" },
  "seguranca-social": { icon: ShieldCheck, bg: "#ddf0e8", ink: "#0f6b4f", blob: "#b5dfcc" },
  "sns": { icon: HeartPulse, bg: "#f6e2e0", ink: "#a03a3a", blob: "#ebc4c0" },
  "carta-conducao-imt": { icon: CarFront, bg: "#e0e9f5", ink: "#2c5aa0", blob: "#c2d4ec" },
  "empresa-atividade": { icon: Store, bg: "#f5e4d0", ink: "#9a5a24", blob: "#e7ca9f" },
  "aima-imigracao": { icon: Stamp, bg: "#ebe4f4", ink: "#6b4a9e", blob: "#d4c4ea" },
  "certidoes": { icon: ScrollText, bg: "#efeada", ink: "#7a6831", blob: "#ddd3ac" },
  "eportugal-agendamento": { icon: MonitorCheck, bg: "#dceee9", ink: "#14655a", blob: "#b3dcd3" },
  "desemprego-iefp": { icon: BriefcaseBusiness, bg: "#e7ecd8", ink: "#5a6b2a", blob: "#ccd6a8" },
  "noutro-pais-ue": { icon: Globe, bg: "#e1e9f8", ink: "#2b4d9e", blob: "#c2d1f0" },
  "pensoes-reforma": { icon: PiggyBank, bg: "#f2e6d2", ink: "#8f5b26", blob: "#e5cda4" },
  "habitacao": { icon: House, bg: "#f4e2d3", ink: "#a04f2c", blob: "#e8c5a8" },
  "familia": { icon: HeartHandshake, bg: "#f5e2ea", ink: "#a03a63", blob: "#eac3d2" },
  "justica-multas": { icon: Scale, bg: "#e5e8ec", ink: "#4a5568", blob: "#c9d0da" },
  "eleicoes-voto": { icon: Vote, bg: "#e0ebe4", ink: "#2a6b45", blob: "#bad4c4" },
  "educacao": { icon: GraduationCap, bg: "#e3e6f9", ink: "#41489e", blob: "#c5caee" },
  "vistos-entrada": { icon: PlaneTakeoff, bg: "#e5e4f6", ink: "#4d47a0", blob: "#c9c5ec" },
  "reclamacoes": { icon: BookOpenText, bg: "#f5ebd0", ink: "#8a6a1f", blob: "#e7d5a3" },
  "transportes": { icon: TramFront, bg: "#dfecdc", ink: "#2e6b3a", blob: "#bcd8b6" },
};

const FALLBACK: Arte = { icon: FileQuestion, bg: "#e9e6e0", ink: "#5c5648", blob: "#d4cec2" };

export function getArte(id: string): Arte {
  return ARTES[id] ?? FALLBACK;
}

/**
 * Banda de ilustração flat estilo "pastel + pontilhado + cartão com ícone",
 * inspirada nos cartões do Italia Aperta.
 */
export default function TemaArt({ temaId, className = "" }: { temaId: string; className?: string }) {
  const { icon: Icon, bg, ink, blob } = getArte(temaId);
  return (
    <div
      aria-hidden
      className={`art-dots relative overflow-hidden ${className}`}
      style={{ backgroundColor: bg }}
    >
      <div
        className="absolute -right-6 -top-8 size-28 rounded-full opacity-70"
        style={{ backgroundColor: blob }}
      />
      <div
        className="absolute -bottom-10 -left-4 size-24 rounded-full opacity-60"
        style={{ backgroundColor: blob }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="grid size-20 -rotate-3 place-items-center rounded-2xl bg-white shadow-[0_6px_20px_-8px_rgba(0,0,0,0.25)]"
        >
          <Icon className="size-10" style={{ color: ink }} strokeWidth={1.6} />
        </div>
      </div>
    </div>
  );
}
