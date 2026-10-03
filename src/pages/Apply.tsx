import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronLeft, ChevronRight, FileUp, Loader2, Plus, RotateCcw, Send, Trash2, X,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import Disclaimer from "@/components/Disclaimer";
import { BrandButton } from "@/components/BrandButton";
import { PROGRAM_KEYS } from "@/lib/data";
import { refNumber } from "@/lib/data";
import { submitFormToSheet } from "@/lib/sheetsConfig";

type FormData = Record<string, unknown>;
const DRAFT_KEY = "aidia-application-draft";

/* ---------- Field primitives ---------- */

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  const { t } = useTranslation();
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-semibold text-foreground">
        {label}
        {required && <span className="font-mono text-[9px] font-medium uppercase tracking-wider text-indigo">{t("common.required")}</span>}
        {!required && <span className="font-mono text-[9px] font-medium uppercase tracking-wider text-muted-foreground/60">{t("common.optional")}</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-indigo focus:ring-2 focus:ring-indigo/20";

function TI({ value, onChange, type = "text", placeholder }: { value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />;
}

function TA({ value, onChange, rows = 4 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={`${inputCls} resize-y`} />;
}

function Chips({ options, values, onChange }: { options: string[]; values: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => {
        const on = values.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? values.filter((v) => v !== opt) : [...values, opt])}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
              on ? "border-indigo bg-indigo text-white shadow-soft" : "border-border bg-card text-muted-foreground hover:border-indigo/50 hover:text-foreground"
            }`}
          >
            {on && <Check className="me-1.5 inline h-3.5 w-3.5" />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function RadioCards({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2" role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-start text-sm font-medium transition-all active:scale-[0.98] ${
            value === opt ? "border-indigo bg-indigo/8 text-foreground shadow-soft" : "border-border bg-card text-muted-foreground hover:border-indigo/40"
          }`}
        >
          <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${value === opt ? "border-indigo bg-indigo" : "border-input"}`}>
            {value === opt && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
          </span>
          {opt}
        </button>
      ))}
    </div>
  );
}

function UploadBox({ label }: { label: string }) {
  const { t } = useTranslation();
  const [name, setName] = useState<string | null>(null);
  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-input bg-secondary/40 px-4 py-8 text-center transition-colors hover:border-indigo/50 dark:bg-secondary/10">
        <FileUp className="h-5 w-5 text-indigo" />
        <span className="text-xs font-medium text-muted-foreground">{name ?? label}</span>
        <input type="file" className="sr-only" onChange={(e) => setName(e.target.files?.[0]?.name ?? null)} />
      </label>
      {name && (
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-mint-600 dark:text-mint">
          <CheckCircle2 className="h-3 w-3" /> {t("common.save")}
        </p>
      )}
    </div>
  );
}

/* ---------- Step definitions ---------- */

const STEP_KEYS = [
  "applicant", "project", "problem", "solution", "technology", "ip", "evidence", "market", "business", "team", "video", "program", "review",
] as const;

type Member = { name: string; role: string; background: string; expertise: string; organization: string; linkedin: string; experience: string };

export default function Apply() {
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  const [view, setView] = useState<"landing" | "wizard" | "success">("landing");
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(() => {
    try {
      return JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "{}");
    } catch {
      return {};
    }
  });
  const [refNo, setRefNo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const saveTimer = useRef<number | null>(null);

  const get = (k: string, fallback = "") => (data[k] as string) ?? fallback;
  const getArr = (k: string): string[] => (data[k] as string[]) ?? [];
  const set = (k: string, v: unknown) => setData((d) => ({ ...d, [k]: v }));

  // Autosave every 10s + on change (debounced)
  useEffect(() => {
    if (view !== "wizard") return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      setLastSaved(Date.now());
    }, 2000);
    const interval = window.setInterval(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      setLastSaved(Date.now());
    }, 10000);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      window.clearInterval(interval);
    };
  }, [data, view]);

  const who = t("apply.who", { returnObjects: true }) as { t: string; d: string }[];
  const how = t("apply.how", { returnObjects: true }) as { t: string; d: string }[];
  const optTypes = t("apply.options.types", { returnObjects: true }) as string[];
  const optStages = t("apply.options.stages", { returnObjects: true }) as string[];
  const optTechStages = t("apply.options.techStages", { returnObjects: true }) as string[];
  const optIpStatuses = t("apply.options.ipStatuses", { returnObjects: true }) as string[];
  const optEvidence = t("apply.options.evidence", { returnObjects: true }) as string[];
  const optValidation = t("apply.options.validationStages", { returnObjects: true }) as string[];
  const optRevenue = t("apply.options.revenue", { returnObjects: true }) as string[];
  const optFunding = t("apply.options.funding", { returnObjects: true }) as string[];
  const techGroups = t("apply.techGroups", { returnObjects: true }) as Record<string, { t: string; items: string[] }>;
  const members = (data.teamMembers as Member[]) ?? [];

  const REQUIRED: Record<number, string[]> = useMemo(
    () => ({
      0: ["fullName", "email"],
      1: ["projectName"],
      2: ["problemWhat"],
      3: ["solutionWhat"],
    }),
    []
  );

  const validate = (): boolean => {
    const req = REQUIRED[step] ?? [];
    const missing = req.filter((k) => !get(k).trim());
    if (step === 11) {
      const consents = ["consentPrivacy", "consentTerms", "consentAccuracy"];
      const unchecked = consents.filter((k) => !data[k]);
      setErrors(unchecked.map((k) => `apply.fields.${k}`));
      return unchecked.length === 0;
    }
    setErrors(missing.map((k) => `apply.fields.${k}`));
    return missing.length === 0;
  };

  const next = () => {
    if (!validate()) {
      toast.error(t("common.required"));
      return;
    }
    setStep((s) => Math.min(STEP_KEYS.length - 1, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setErrors([]);
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    setSubmitting(true);
    const ref = refNumber();
    const timestamp = new Date().toISOString();
    const payload = { ref, at: timestamp, ...data, data };

    // 1. Always keep local backup
    try {
      const apps = JSON.parse(localStorage.getItem("aidia-applications") ?? "[]");
      apps.push(payload);
      localStorage.setItem("aidia-applications", JSON.stringify(apps));
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      console.warn("Local storage save error:", e);
    }

    // 2. Sync to Google Sheet
    try {
      await submitFormToSheet("APPLY", payload);
    } catch (e) {
      console.warn("Sheet sync error:", e);
    } finally {
      setSubmitting(false);
      setRefNo(ref);
      setView("success");
      window.scrollTo({ top: 0 });
    }
  };

  const progress = Math.round(((step + 1) / STEP_KEYS.length) * 100);

  /* ================= LANDING ================= */
  if (view === "landing") {
    const hasDraft = Object.keys(data).length > 0;
    return (
      <PageShell wide>
        <PageHero kicker={t("apply.kicker")} title={t("apply.title")} sub={t("apply.sub")}>
          <div className="flex flex-wrap gap-3">
            <BrandButton onClick={() => setView("wizard")} pulse>
              {hasDraft ? `${t("common.next")} — ${t("apply.savedAt")}` : t("common.startApplication")}
            </BrandButton>
            {hasDraft && (
              <BrandButton
                variant="ghost"
                arrow={false}
                onClick={() => {
                  setData({});
                  localStorage.removeItem(DRAFT_KEY);
                  toast.success(t("apply.newApplication"));
                }}
              >
                <RotateCcw className="h-4 w-4" /> {t("apply.newApplication")}
              </BrandButton>
            )}
          </div>
        </PageHero>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight">{t("apply.whoTitle")}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {who.map((w, i) => (
                <Reveal key={w.t} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-soft">
                    <span className="font-mono text-lg font-semibold text-indigo/50">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-3 text-lg font-bold">{w.t}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <h2 className="mt-16 text-2xl font-bold tracking-tight">{t("apply.howTitle")}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {how.map((h, i) => (
                <Reveal key={h.t} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-border bg-secondary/50 p-6 dark:bg-secondary/10">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo font-mono text-xs font-bold text-white">{i + 1}</span>
                    <p className="mt-4 text-base font-bold">{h.t}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{h.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              <Disclaimer kind="application" />
              <Disclaimer kind="ip" />
            </div>
            <Reveal className="mt-8 rounded-2xl border border-indigo/25 bg-indigo/5 p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">{t("common.note")}: </span>
                {t("apply.draftNote")}
              </p>
            </Reveal>
            <Reveal className="mt-10 text-center">
              <BrandButton onClick={() => setView("wizard")} pulse>{t("common.startApplication")}</BrandButton>
            </Reveal>
          </div>
        </section>
      </PageShell>
    );
  }

  /* ================= SUCCESS ================= */
  if (view === "success") {
    return (
      <PageShell wide>
        <section className="mesh-hero flex min-h-[80vh] items-center pt-16">
          <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 15 }}>
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mint/15 text-mint-600 dark:text-mint">
                <CheckCircle2 className="h-10 w-10" />
              </span>
            </motion.div>
            <h1 className="mt-8 text-3xl font-extrabold tracking-tight sm:text-4xl">{t("apply.submitSuccess")}</h1>
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t("apply.referenceNo")}</p>
              <p className="mt-2 font-mono text-2xl font-bold text-indigo" dir="ltr">{refNo}</p>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">{t("apply.confirmationNote")}</p>
            <div className="mt-8 flex justify-center gap-3">
              <BrandButton to="/">{t("common.breadcrumbHome")}</BrandButton>
              <BrandButton variant="secondary" onClick={() => { setView("landing"); setStep(0); }}>{t("apply.newApplication")}</BrandButton>
            </div>
            <div className="mt-8 text-start">
              <Disclaimer kind="application" />
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  /* ================= WIZARD ================= */
  const stepKey = STEP_KEYS[step];
  const BackIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;

  const stepBody = () => {
    switch (stepKey) {
      case "applicant":
        return (
          <div className="space-y-6">
            <Field label={t("apply.fields.applicantType")} required>
              <RadioCards options={optTypes} value={get("applicantType")} onChange={(v) => set("applicantType", v)} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("apply.fields.fullName")} required><TI value={get("fullName")} onChange={(v) => set("fullName", v)} /></Field>
              <Field label={t("apply.fields.position")}><TI value={get("position")} onChange={(v) => set("position", v)} /></Field>
              <Field label={t("apply.fields.organization")}><TI value={get("organization")} onChange={(v) => set("organization", v)} /></Field>
              <Field label={t("apply.fields.country")}><TI value={get("country")} onChange={(v) => set("country", v)} /></Field>
              <Field label={t("apply.fields.email")} required><TI type="email" value={get("email")} onChange={(v) => set("email", v)} /></Field>
              <Field label={t("apply.fields.phone")}><TI type="tel" value={get("phone")} onChange={(v) => set("phone", v)} /></Field>
              <Field label={t("apply.fields.linkedin")}><TI value={get("linkedin")} onChange={(v) => set("linkedin", v)} placeholder="https://" /></Field>
              <Field label={t("apply.fields.website")}><TI value={get("website")} onChange={(v) => set("website", v)} placeholder="https://" /></Field>
            </div>
          </div>
        );
      case "project":
        return (
          <div className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("apply.fields.projectName")} required><TI value={get("projectName")} onChange={(v) => set("projectName", v)} /></Field>
              <Field label={t("apply.fields.country")}><TI value={get("projectCountry")} onChange={(v) => set("projectCountry", v)} /></Field>
              <Field label={t("apply.fields.city")}><TI value={get("city")} onChange={(v) => set("city", v)} /></Field>
              <Field label={t("apply.fields.website")}><TI value={get("projectWebsite")} onChange={(v) => set("projectWebsite", v)} placeholder="https://" /></Field>
              <Field label={t("apply.fields.foundingDate")}><TI type="date" value={get("foundingDate")} onChange={(v) => set("foundingDate", v)} /></Field>
              <Field label={t("apply.fields.teamSize")}><TI type="number" value={get("teamSize")} onChange={(v) => set("teamSize", v)} /></Field>
            </div>
            <Field label={t("apply.fields.currentStage")}>
              <RadioCards options={optStages} value={get("currentStage")} onChange={(v) => set("currentStage", v)} />
            </Field>
            <Field label={t("apply.fields.registrationStatus")}><TI value={get("registrationStatus")} onChange={(v) => set("registrationStatus", v)} /></Field>
            <Field label={t("apply.fields.socialProfiles")}><TI value={get("socialProfiles")} onChange={(v) => set("socialProfiles", v)} placeholder="https://" /></Field>
          </div>
        );
      case "problem":
        return (
          <div className="space-y-6">
            <Field label={t("apply.fields.problemWhat")} required><TA value={get("problemWhat")} onChange={(v) => set("problemWhat", v)} /></Field>
            <Field label={t("apply.fields.problemWho")}><TA value={get("problemWho")} onChange={(v) => set("problemWho", v)} rows={3} /></Field>
            <Field label={t("apply.fields.problemWhy")}><TA value={get("problemWhy")} onChange={(v) => set("problemWhy", v)} rows={3} /></Field>
            <Field label={t("apply.fields.problemCurrent")}><TA value={get("problemCurrent")} onChange={(v) => set("problemCurrent", v)} rows={3} /></Field>
            <Field label={t("apply.fields.problemLimits")}><TA value={get("problemLimits")} onChange={(v) => set("problemLimits", v)} rows={3} /></Field>
          </div>
        );
      case "solution":
        return (
          <div className="space-y-6">
            <Field label={t("apply.fields.solutionWhat")} required><TA value={get("solutionWhat")} onChange={(v) => set("solutionWhat", v)} /></Field>
            <Field label={t("apply.fields.solutionHow")}><TA value={get("solutionHow")} onChange={(v) => set("solutionHow", v)} /></Field>
            <Field label={t("apply.fields.solutionDifferent")}><TA value={get("solutionDifferent")} onChange={(v) => set("solutionDifferent", v)} rows={3} /></Field>
            <Field label={t("apply.fields.solutionInnovation")}><TA value={get("solutionInnovation")} onChange={(v) => set("solutionInnovation", v)} rows={3} /></Field>
            <Field label={t("apply.fields.solutionEvidence")}><TA value={get("solutionEvidence")} onChange={(v) => set("solutionEvidence", v)} rows={3} /></Field>
            <Field label={t("apply.fields.solutionRemaining")}><TA value={get("solutionRemaining")} onChange={(v) => set("solutionRemaining", v)} rows={3} /></Field>
          </div>
        );
      case "technology":
        return (
          <div className="space-y-6">
            {Object.entries(techGroups).map(([gk, group]) => (
              <Field key={gk} label={`${t("apply.fields.techGroups")} — ${group.t}`}>
                <Chips options={group.items} values={getArr("techAreas")} onChange={(v) => set("techAreas", v)} />
              </Field>
            ))}
            <Field label={t("apply.fields.techDescription")}><TA value={get("techDescription")} onChange={(v) => set("techDescription", v)} /></Field>
            <Field label={t("apply.fields.techStage")}>
              <RadioCards options={optTechStages} value={get("techStage")} onChange={(v) => set("techStage", v)} />
            </Field>
          </div>
        );
      case "ip":
        return (
          <div className="space-y-6">
            <Disclaimer kind="confidentiality" />
            <Field label={t("apply.fields.ipStatus")}>
              <RadioCards options={optIpStatuses} value={get("ipStatus")} onChange={(v) => set("ipStatus", v)} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("apply.fields.patentNumber")}><TI value={get("patentNumber")} onChange={(v) => set("patentNumber", v)} /></Field>
              <Field label={t("apply.fields.jurisdiction")}><TI value={get("jurisdiction")} onChange={(v) => set("jurisdiction", v)} /></Field>
              <Field label={t("apply.fields.filingDate")}><TI type="date" value={get("filingDate")} onChange={(v) => set("filingDate", v)} /></Field>
              <Field label={t("apply.fields.ipOwner")}><TI value={get("ipOwner")} onChange={(v) => set("ipOwner", v)} /></Field>
            </div>
            <Field label={t("apply.fields.licensingStatus")}><TI value={get("licensingStatus")} onChange={(v) => set("licensingStatus", v)} /></Field>
            <Field label={t("apply.fields.ipDocs")}><UploadBox label={t("apply.fields.ipDocs")} /></Field>
          </div>
        );
      case "evidence":
        return (
          <div className="space-y-6">
            <Field label={t("apply.fields.evidenceTypes")}>
              <Chips options={optEvidence} values={getArr("evidenceTypes")} onChange={(v) => set("evidenceTypes", v)} />
            </Field>
            <Field label={t("apply.fields.evidenceStage")}>
              <div className="flex flex-wrap gap-2" role="radiogroup">
                {optValidation.map((opt, i) => {
                  const on = get("evidenceStage") === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => set("evidenceStage", opt)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all active:scale-95 ${
                        on ? "border-mint bg-mint/15 text-mint-600 dark:text-mint" : "border-border bg-card text-muted-foreground hover:border-mint/50"
                      }`}
                    >
                      <span className="font-mono text-[9px] opacity-70">{i + 1}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field label={t("apply.fields.evidenceDescription")}><TA value={get("evidenceDescription")} onChange={(v) => set("evidenceDescription", v)} /></Field>
            <Field label={t("apply.fields.evidenceDocs")}><UploadBox label={t("apply.fields.evidenceDocs")} /></Field>
          </div>
        );
      case "market":
        return (
          <div className="space-y-6">
            <Field label={t("apply.fields.targetMarket")}><TA value={get("targetMarket")} onChange={(v) => set("targetMarket", v)} rows={3} /></Field>
            <Field label={t("apply.fields.marketNeed")}><TA value={get("marketNeed")} onChange={(v) => set("marketNeed", v)} rows={3} /></Field>
            <Field label={t("apply.fields.competition")}><TA value={get("competition")} onChange={(v) => set("competition", v)} rows={3} /></Field>
            <Field label={t("apply.fields.advantage")}><TA value={get("advantage")} onChange={(v) => set("advantage", v)} rows={3} /></Field>
            <Field label={t("apply.fields.commercializationRoute")}><TA value={get("commercializationRoute")} onChange={(v) => set("commercializationRoute", v)} rows={3} /></Field>
          </div>
        );
      case "business":
        return (
          <div className="space-y-6">
            <Field label={t("apply.fields.modelDescription")}><TA value={get("modelDescription")} onChange={(v) => set("modelDescription", v)} /></Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t("apply.fields.revenue")}>
                <Chips options={optRevenue} values={get("revenue") ? [get("revenue")] : []} onChange={(v) => set("revenue", v[v.length - 1] ?? "")} />
              </Field>
              <Field label={t("apply.fields.funding")}>
                <Chips options={optFunding} values={get("funding") ? [get("funding")] : []} onChange={(v) => set("funding", v[v.length - 1] ?? "")} />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label={t("apply.fields.fundingRaised")}><TI value={get("fundingRaised")} onChange={(v) => set("fundingRaised", v)} /></Field>
              <Field label={t("apply.fields.fundingRequired")}><TI value={get("fundingRequired")} onChange={(v) => set("fundingRequired", v)} /></Field>
              <Field label={t("apply.fields.currency")}><TI value={get("currency")} onChange={(v) => set("currency", v)} placeholder="SAR / USD" /></Field>
            </div>
            <Field label={t("apply.fields.valuation")}><TI value={get("valuation")} onChange={(v) => set("valuation", v)} /></Field>
            <Field label={t("apply.fields.partners")}><TA value={get("partners")} onChange={(v) => set("partners", v)} rows={3} /></Field>
            <Field label={t("apply.fields.commercializationRequirements")}><TA value={get("commercializationRequirements")} onChange={(v) => set("commercializationRequirements", v)} rows={3} /></Field>
          </div>
        );
      case "team":
        return (
          <div className="space-y-6">
            {members.map((m, i) => (
              <div key={i} className="relative rounded-2xl border border-border bg-secondary/40 p-5 dark:bg-secondary/10">
                <button
                  type="button"
                  onClick={() => set("teamMembers", members.filter((_, j) => j !== i))}
                  className="absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  aria-label="Remove member"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(["name", "role", "background", "expertise", "organization", "linkedin", "experience"] as const).map((f) => (
                    <Field key={f} label={t(`apply.fields.member${f[0].toUpperCase()}${f.slice(1)}` as never) ?? f}>
                      <TI
                        value={m[f]}
                        onChange={(v) => {
                          const next = [...members];
                          next[i] = { ...m, [f]: v };
                          set("teamMembers", next);
                        }}
                      />
                    </Field>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => set("teamMembers", [...members, { name: "", role: "", background: "", expertise: "", organization: "", linkedin: "", experience: "" }])}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-indigo/40 bg-indigo/5 px-4 py-5 text-sm font-semibold text-indigo transition-colors hover:bg-indigo/10"
            >
              <Plus className="h-4 w-4" /> {t("apply.fields.addMember")}
            </button>
            <Field label={t("apply.fields.founderStatement")}><TA value={get("founderStatement")} onChange={(v) => set("founderStatement", v)} rows={5} /></Field>
          </div>
        );
      case "video":
        return (
          <div className="space-y-6">
            <div className="rounded-2xl border border-indigo/25 bg-indigo/5 p-5">
              <p className="text-sm font-medium text-foreground">{t("apply.fields.videoPrompt")}</p>
              <p className="mt-2 text-xs text-muted-foreground">{t("apply.fields.videoNote")}</p>
            </div>
            <Field label={t("apply.fields.videoLink")}><TI value={get("videoLink")} onChange={(v) => set("videoLink", v)} placeholder="https://youtube.com / vimeo.com / loom.com" /></Field>
            <Field label={t("apply.fields.videoUpload")}><UploadBox label={t("apply.fields.videoUpload")} /></Field>
          </div>
        );
      case "program":
        return (
          <div className="space-y-6">
            <Field label={t("apply.fields.programInterest")}>
              <Chips
                options={PROGRAM_KEYS.map((p) => t(`programsData.${p}.name`))}
                values={getArr("programs")}
                onChange={(v) => set("programs", v)}
              />
            </Field>
            <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
              {(["consentPrivacy", "consentTerms", "consentAccuracy"] as const).map((c) => (
                <label key={c} className="flex cursor-pointer items-start gap-3">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={!!data[c]}
                    onClick={() => set(c, !data[c])}
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-colors ${
                      data[c] ? "border-indigo bg-indigo text-white" : "border-input"
                    }`}
                  >
                    {!!data[c] && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <span className="text-sm text-foreground">{t(`apply.fields.${c}`)}</span>
                </label>
              ))}
            </div>
            <Disclaimer kind="application" />
          </div>
        );
      case "review": {
        const reviewGroups: { label: string; keys: string[] }[] = [
          { label: t("apply.steps.applicant.t"), keys: ["applicantType", "fullName", "position", "organization", "country", "email"] },
          { label: t("apply.steps.project.t"), keys: ["projectName", "currentStage", "city", "projectCountry"] },
          { label: t("apply.steps.problem.t"), keys: ["problemWhat"] },
          { label: t("apply.steps.solution.t"), keys: ["solutionWhat"] },
          { label: t("apply.steps.technology.t"), keys: ["techStage", "techDescription"] },
          { label: t("apply.steps.ip.t"), keys: ["ipStatus"] },
          { label: t("apply.steps.business.t"), keys: ["revenue", "funding", "fundingRaised", "fundingRequired"] },
        ];
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{t("apply.reviewSub")}</p>
            {reviewGroups.map((g, gi) => (
              <div key={g.label} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">{g.label}</p>
                  <button type="button" onClick={() => setStep(Math.min(gi, 11))} className="text-xs font-semibold text-indigo hover:underline">
                    {t("apply.edit")}
                  </button>
                </div>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {g.keys.map((k) => (
                    <div key={k}>
                      <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{t(`apply.fields.${k}` as never) ?? k}</dt>
                      <dd className="mt-0.5 text-sm text-foreground">{get(k) || <span className="text-muted-foreground/60">{t("apply.notProvided")}</span>}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
            {getArr("programs").length > 0 && (
              <div className="flex flex-wrap gap-2">
                {getArr("programs").map((p) => (
                  <span key={p} className="rounded-full bg-indigo/10 px-3 py-1 text-xs font-semibold text-indigo">{p}</span>
                ))}
              </div>
            )}
          </div>
        );
      }
    }
  };

  return (
    <PageShell wide>
      <section className="mesh-hero border-b border-border pb-8 pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo">
                {t("apply.step")} {step + 1} {t("apply.of")} {STEP_KEYS.length}
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{t(`apply.steps.${stepKey}.t`)}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{t(`apply.steps.${stepKey}.d`)}</p>
            </div>
            <span className="font-mono text-2xl font-bold text-indigo/30" dir="ltr">{progress}%</span>
          </div>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={progress} aria-label={t("apply.progress")}>
            <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo to-mint" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
          </div>
          {lastSaved && (
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <CheckCircle2 className="h-3 w-3 text-mint-600 dark:text-mint" />
              {t("apply.savedAt")} — {new Date(lastSaved).toLocaleTimeString(i18n.language === "ar" ? "ar-SA" : "en-GB")}
            </p>
          )}
        </div>
      </section>

      <section className="pb-40 pt-10 sm:pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: rtl ? -18 : 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: rtl ? 18 : -18 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {stepBody()}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Sticky bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all enabled:hover:border-indigo/40 enabled:hover:text-foreground disabled:opacity-40 active:scale-95"
          >
            <BackIcon className="h-4 w-4" /> {t("common.back")}
          </button>
          {step < STEP_KEYS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="flex items-center gap-2 rounded-full bg-indigo px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-glow active:scale-95"
            >
              {t("common.next")} <NextIcon className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="flex items-center gap-2 rounded-full bg-mint-600 px-6 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:bg-mint-600/90 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t("common.loading") || "Submitting..."}</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> {t("common.submit")}
                </>
              )}
            </button>
          )}
        </div>
      </div>
      {errors.length > 0 && (
        <div className="sr-only" role="alert">
          {errors.map((e) => t(e as never)).join(", ")}
        </div>
      )}
      {/* Icons referenced for tree-shaking safety */}
      <span className="hidden">
        <X /><ArrowLeft /><ArrowRight />
      </span>
    </PageShell>
  );
}
