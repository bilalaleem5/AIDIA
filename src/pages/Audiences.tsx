import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import Disclaimer from "@/components/Disclaimer";
import { BrandButton } from "@/components/BrandButton";
import { F } from "./SubmitTechnology";
import { refNumber } from "@/lib/data";
import { submitFormToSheet } from "@/lib/sheetsConfig";

const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-indigo focus:ring-2 focus:ring-indigo/20";

export function Investors() {
  const { t } = useTranslation();
  const journey = t("investors.journey", { returnObjects: true }) as { t: string; d: string }[];
  const links = t("investors.links", { returnObjects: true }) as string[];
  const fields = ["name", "organization", "position", "country", "email", "phone", "website", "linkedin", "focus", "interests", "stage", "geo", "range", "other"];
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refNo, setRefNo] = useState<string | null>(null);

  return (
    <PageShell wide>
      <PageHero kicker={t("investors.kicker")} title={t("investors.title")} sub={t("investors.sub")}>
        <BrandButton to="#register" pulse>
          {t("investors.cta")}
        </BrandButton>
      </PageHero>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">{t("investors.journeyTitle")}</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((j, i) => (
              <Reveal key={j.t} delay={i * 0.07}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="font-mono text-3xl font-bold text-indigo/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-lg font-bold">{j.t}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{j.d}</p>
                  {i < journey.length - 1 && (
                    <ArrowRight className="absolute end-4 top-6 hidden h-4 w-4 text-indigo/40 lg:block rtl:-scale-x-100" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight">{t("investors.linksTitle")}</h2>
          </Reveal>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((l) => (
              <div
                key={l}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 transition-all hover:border-indigo/40 hover:shadow-soft"
              >
                <span className="text-sm font-medium">{l}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground rtl:-scale-x-100" />
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-4">
            <p className="text-sm italic text-muted-foreground">{t("disclaimers.dueDiligence")}</p>
            <Disclaimer kind="global" />
          </div>

          {/* Integrated Investor Registration Section */}
          <div id="register" className="mt-20 scroll-mt-24">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10">
                <div className="max-w-2xl">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo">
                    {t("investors.reg.title")}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">{t("investors.reg.sub")}</h3>
                  <p className="mt-2 text-xs italic leading-relaxed text-muted-foreground">
                    {t("investors.reg.approvalNote")}
                  </p>
                </div>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 rounded-2xl border border-mint/30 bg-mint/8 p-8 text-center"
                  >
                    <CheckCircle2 className="mx-auto h-10 w-10 text-mint-600 dark:text-mint" />
                    <p className="mt-4 text-xl font-bold">{t("investors.reg.success")}</p>
                    {refNo && (
                      <div className="mx-auto mt-4 max-w-xs rounded-xl border border-border bg-card p-3 shadow-soft">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("apply.referenceNo") || "Reference No"}</p>
                        <p className="mt-1 font-mono text-lg font-bold text-indigo" dir="ltr">{refNo}</p>
                      </div>
                    )}
                    <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
                      {t("investors.reg.successNote")}
                    </p>
                    <p className="mt-4 text-xs italic text-muted-foreground">
                      {t("disclaimers.investorRegistration")}
                    </p>
                  </motion.div>
                ) : (
                  <form
                    className="mt-8 space-y-5"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setSubmitting(true);
                      const formEl = e.currentTarget;
                      const values = Object.fromEntries(new FormData(formEl).entries());
                      const ref = refNumber();
                      const timestamp = new Date().toISOString();
                      const payload = { ref, at: timestamp, status: "pending", ...values, data: values };

                      // 1. Local backup
                      try {
                        const list = JSON.parse(localStorage.getItem("aidia-investors") ?? "[]");
                        list.push(payload);
                        localStorage.setItem("aidia-investors", JSON.stringify(list));
                      } catch (err) {
                        console.warn("Local storage save error:", err);
                      }

                      // 2. Google Sheets sync
                      try {
                        await submitFormToSheet("INVESTORS", payload);
                      } catch (err) {
                        console.warn("Sheet sync error:", err);
                      } finally {
                        setSubmitting(false);
                        setRefNo(ref);
                        setSent(true);
                        toast.success(t("investors.reg.success"));
                      }
                    }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      {fields.map((f) => (
                        <F key={f} label={t(`investors.reg.fields.${f}`) || (f === "phone" ? (t("common.phone") || "Phone Number") : f)}>
                          <input
                            name={f}
                            type={f === "email" ? "email" : f === "phone" ? "tel" : "text"}
                            required={["name", "email", "organization"].includes(f)}
                            className={inputCls}
                          />
                        </F>
                      ))}
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-4 flex items-center justify-center gap-2 rounded-full bg-indigo px-8 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:shadow-glow active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{t("common.loading") || "Submitting..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> {t("investors.reg.submit")}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
