import { useTranslation } from "react-i18next";
import { AlertTriangle, FileText, ShieldCheck } from "lucide-react";

type Kind = "global" | "application" | "ip" | "company" | "demoDay" | "submission" | "confidentiality";

const ICONS: Record<Kind, typeof AlertTriangle> = {
  global: AlertTriangle,
  application: FileText,
  ip: ShieldCheck,
  company: FileText,
  demoDay: AlertTriangle,
  submission: FileText,
  confidentiality: ShieldCheck,
};

export default function Disclaimer({ kind, className = "" }: { kind: Kind; className?: string }) {
  const { t } = useTranslation();
  const Icon = ICONS[kind];
  const titleKey =
    kind === "global" ? "disclaimers.globalTitle" : kind === "application" ? "disclaimers.applicationTitle" : kind === "ip" ? "disclaimers.ipTitle" : "disclaimers.globalTitle";
  return (
    <div
      role="note"
      className={`rounded-2xl border border-amber-300/50 bg-amber-50/60 p-5 text-start dark:border-amber-500/25 dark:bg-amber-500/5 ${className}`}
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400">
            {t(titleKey)}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-amber-900/80 dark:text-amber-200/70">{t(`disclaimers.${kind}`)}</p>
        </div>
      </div>
    </div>
  );
}

/** Dashed placeholder block per content rules. */
export function Placeholder({ label, className = "", tall = false }: { label?: string; className?: string; tall?: boolean }) {
  const { t } = useTranslation();
  return (
    <div
      className={`placeholder-block flex ${tall ? "min-h-48" : "min-h-28"} items-center justify-center rounded-2xl p-6 ${className}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label ?? t("common.placeholder")}
      </span>
    </div>
  );
}

/** Small mono pill tag, e.g. B01 / STAGE: PROTOTYPE. */
export function MonoTag({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "mint" | "indigo" }) {
  const tones = {
    default: "border-border bg-secondary/60 text-muted-foreground",
    mint: "border-mint/30 bg-mint/10 text-mint-600 dark:text-mint",
    indigo: "border-indigo/30 bg-indigo/10 text-indigo",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${tones[tone]}`}>
      {children}
    </span>
  );
}
