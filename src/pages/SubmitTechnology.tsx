import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, FileUp, Loader2, Send } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import Disclaimer from "@/components/Disclaimer";
import { BrandButton } from "@/components/BrandButton";
import { refNumber } from "@/lib/data";
import { submitFormToSheet } from "@/lib/sheetsConfig";

const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-indigo focus:ring-2 focus:ring-indigo/20";

export function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}

export default function SubmitTechnology() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refNo, setRefNo] = useState<string | null>(null);
  const accepts = t("submitTech.acceptsList", { returnObjects: true }) as string[];
  const f = (k: string) => t(`submitTech.fields.${k}`);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formEl = e.currentTarget;
    const values = Object.fromEntries(new FormData(formEl).entries());
    const ref = refNumber();
    const timestamp = new Date().toISOString();
    const payload = { ref, at: timestamp, ...values, data: values };

    // 1. Local backup
    try {
      const list = JSON.parse(localStorage.getItem("aidia-tech-submissions") ?? "[]");
      list.push(payload);
      localStorage.setItem("aidia-tech-submissions", JSON.stringify(list));
    } catch (err) {
      console.warn("Local storage save error:", err);
    }

    // 2. Google Sheets sync
    try {
      await submitFormToSheet("SUBMIT_TECH", payload);
    } catch (err) {
      console.warn("Sheet sync error:", err);
    } finally {
      setSubmitting(false);
      setRefNo(ref);
      setSent(true);
      toast.success(t("submitTech.success"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <PageShell wide>
      <PageHero kicker={t("submitTech.kicker")} title={t("submitTech.title")} sub={t("submitTech.sub")} />

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t("submitTech.accepts")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {accepts.map((a) => (
                <span key={a} className="rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm font-medium dark:bg-secondary/20">
                  {a}
                </span>
              ))}
            </div>
          </Reveal>

          {sent ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-12 rounded-2xl border border-mint/30 bg-mint/8 p-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-mint-600 dark:text-mint" />
              <p className="mt-4 text-xl font-bold">{t("submitTech.success")}</p>
              {refNo && (
                <div className="mx-auto mt-4 max-w-xs rounded-xl border border-border bg-card p-3 shadow-soft">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("apply.referenceNo") || "Reference No"}</p>
                  <p className="mt-1 font-mono text-lg font-bold text-indigo" dir="ltr">{refNo}</p>
                </div>
              )}
              <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">{t("submitTech.successNote")}</p>
              <BrandButton to="/" variant="secondary" className="mt-6">{t("common.breadcrumbHome")}</BrandButton>
            </motion.div>
          ) : (
            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} className="mt-10 space-y-6 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <F label={f("techName")}><input name="techName" required className={inputCls} /></F>
                  <F label={f("researchTitle")}><input name="researchTitle" className={inputCls} /></F>
                  <F label={f("researcher")}><input name="researcher" required className={inputCls} /></F>
                  <F label={f("institution")}><input name="institution" className={inputCls} /></F>
                  <F label={f("category")}>
                    <select name="category" className={inputCls} required defaultValue="">
                      <option value="" disabled>—</option>
                      {accepts.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </F>
                  <F label={f("stage")}><input name="stage" className={inputCls} /></F>
                </div>
                <F label={f("description")}><textarea name="description" required rows={4} className={inputCls} /></F>
                <div className="grid gap-5 sm:grid-cols-2">
                  <F label={f("ipStatus")}><input name="ipStatus" className={inputCls} /></F>
                  <F label={f("patentInfo")}><input name="patentInfo" className={inputCls} /></F>
                </div>
                <F label={f("publications")}><textarea name="publications" rows={2} className={inputCls} /></F>
                <F label={f("evidence")}><textarea name="evidence" rows={3} className={inputCls} /></F>
                <F label={f("applications")}><textarea name="applications" rows={3} className={inputCls} /></F>
                <F label={f("commercial")}><textarea name="commercial" rows={3} className={inputCls} /></F>
                <F label={f("documents")}>
                  <div className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-input bg-secondary/40 px-4 py-8 text-center transition-colors hover:border-indigo/50 dark:bg-secondary/10">
                    <FileUp className="h-5 w-5 text-indigo" />
                    <span className="text-xs text-muted-foreground">{f("documents")}</span>
                    <input type="file" className="sr-only" />
                  </div>
                </F>
                <div className="grid gap-5 sm:grid-cols-3">
                  <F label={f("contactName")}><input name="contactName" required className={inputCls} /></F>
                  <F label={f("contactEmail")}><input name="contactEmail" type="email" required className={inputCls} /></F>
                  <F label={f("contactPhone")}><input name="contactPhone" type="tel" className={inputCls} /></F>
                </div>
                <Disclaimer kind="submission" />
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:shadow-glow active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t("common.loading") || "Submitting..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> {t("submitTech.submit")}
                    </>
                  )}
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </PageShell>
  );
}
