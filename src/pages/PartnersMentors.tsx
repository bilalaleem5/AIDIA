import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Handshake, Loader2, Send, Users } from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { MonoTag } from "@/components/Disclaimer";
import { BrandButton } from "@/components/BrandButton";
import { F } from "./SubmitTechnology";
import { refNumber } from "@/lib/data";
import { submitFormToSheet } from "@/lib/sheetsConfig";

const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-indigo focus:ring-2 focus:ring-indigo/20";

export function Partners() {
  const { t } = useTranslation();
  const cats = t("partners.categories", { returnObjects: true }) as string[];
  const mentorCats = t("mentors.categories", { returnObjects: true }) as string[];
  const areas = t("partners.become.areas", { returnObjects: true }) as string[];
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [partnerSent, setPartnerSent] = useState(false);
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [partnerRefNo, setPartnerRefNo] = useState<string | null>(null);
  const [mentorSent, setMentorSent] = useState(false);
  const [mentorSubmitting, setMentorSubmitting] = useState(false);
  const [mentorRefNo, setMentorRefNo] = useState<string | null>(null);
  const [formType, setFormType] = useState<"partner" | "mentor">("partner");

  return (
    <PageShell wide>
      <PageHero
        kicker={t("partners.kicker")}
        title={t("partners.title")}
        sub={t("partners.sub")}
      >
        <div className="flex flex-wrap items-center gap-3">
          <BrandButton to="#collaborate" pulse>
            {t("nav.menu.becomePartner")}
          </BrandButton>
          <BrandButton to="#mentors" variant="secondary">
            {t("nav.menu.mentorsExperts")}
          </BrandButton>
        </div>
      </PageHero>

      {/* 1. Partner Categories */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">{t("partners.title")}</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cats.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex items-center justify-between">
                    <Handshake className="h-5 w-5 text-indigo" />
                    <MonoTag>{`P-${String(i + 1).padStart(2, "0")}`}</MonoTag>
                  </div>
                  <p className="mt-4 text-lg font-bold">{c}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Strategic alignment for translational pilots, compute infrastructure, and clinical pathways.
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-mint-600 dark:text-mint">
                      Active Framework
                    </span>
                    <a href="#collaborate" className="text-xs font-semibold text-indigo hover:underline">
                      {t("common.learnMore")} →
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <p className="text-center text-xs italic text-muted-foreground">{t("disclaimers.partnerAuth")}</p>
          </Reveal>
        </div>
      </section>

      {/* 2. Mentors & Expert Network */}
      <section id="mentors" className="border-t border-border bg-secondary/30 py-16 sm:py-24 dark:bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo">
              {t("mentors.kicker")}
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">{t("mentors.title")}</h2>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">{t("mentors.sub")}</p>

          <Reveal className="mt-10">
            <div className="flex flex-wrap gap-2">
              {mentorCats.map((mc) => (
                <span
                  key={mc}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-soft"
                >
                  {mc}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-8 flex justify-center">
            <BrandButton to="#collaborate" variant="secondary">
              {t("mentors.joinTitle")}
            </BrandButton>
          </Reveal>
        </div>
      </section>

      {/* 3. Integrated Engagement Form */}
      <section id="collaborate" className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="text-center">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo">
                {t("partners.become.kicker")}
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">{t("partners.become.title")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("partners.become.sub")}</p>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-full border border-border bg-card p-1">
                <button
                  type="button"
                  onClick={() => setFormType("partner")}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                    formType === "partner" ? "bg-indigo text-white shadow-soft" : "text-muted-foreground"
                  }`}
                >
                  {t("nav.menu.becomePartner")}
                </button>
                <button
                  type="button"
                  onClick={() => setFormType("mentor")}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                    formType === "mentor" ? "bg-indigo text-white shadow-soft" : "text-muted-foreground"
                  }`}
                >
                  {t("mentors.joinTitle")}
                </button>
              </div>
            </div>
          </Reveal>

          {/* Form: Partner */}
          {formType === "partner" && (
            <Reveal delay={0.08} className="mt-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("partners.become.form.area")}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {areas.map((a) => {
                  const on = selectedAreas.includes(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setSelectedAreas(on ? selectedAreas.filter((x) => x !== a) : [...selectedAreas, a])
                      }
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                        on
                          ? "border-indigo bg-indigo text-white"
                          : "border-border bg-card text-muted-foreground hover:border-indigo/50"
                      }`}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>

              {partnerSent ? (
                <div className="rounded-2xl border border-mint/30 bg-mint/8 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-mint-600 dark:text-mint" />
                  <p className="mt-4 text-xl font-bold">{t("partners.become.success")}</p>
                  {partnerRefNo && (
                    <div className="mx-auto mt-4 max-w-xs rounded-xl border border-border bg-card p-3 shadow-soft">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("apply.referenceNo") || "Reference No"}</p>
                      <p className="mt-1 font-mono text-lg font-bold text-indigo" dir="ltr">{partnerRefNo}</p>
                    </div>
                  )}
                </div>
              ) : (
                <form
                  className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setPartnerSubmitting(true);
                    const formEl = e.currentTarget;
                    const values = Object.fromEntries(new FormData(formEl).entries());
                    const ref = refNumber();
                    const timestamp = new Date().toISOString();
                    const payload = {
                      ref,
                      at: timestamp,
                      ...values,
                      areas: selectedAreas,
                      area: selectedAreas.join(", "),
                      data: values,
                    };

                    // 1. Local backup
                    try {
                      const list = JSON.parse(localStorage.getItem("aidia-partner-inquiries") ?? "[]");
                      list.push(payload);
                      localStorage.setItem("aidia-partner-inquiries", JSON.stringify(list));
                    } catch (err) {
                      console.warn("Local storage save error:", err);
                    }

                    // 2. Google Sheets sync
                    try {
                      await submitFormToSheet("PARTNERS", payload);
                    } catch (err) {
                      console.warn("Sheet sync error:", err);
                    } finally {
                      setPartnerSubmitting(false);
                      setPartnerRefNo(ref);
                      setPartnerSent(true);
                      toast.success(t("partners.become.success"));
                    }
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <F label={t("partners.become.form.org")}>
                      <input name="org" required className={inputCls} />
                    </F>
                    <F label={t("partners.become.form.name")}>
                      <input name="name" required className={inputCls} />
                    </F>
                    <F label={t("partners.become.form.email")}>
                      <input name="email" type="email" required className={inputCls} />
                    </F>
                    <F label={t("partners.become.form.area")}>
                      <input name="area" value={selectedAreas.join(", ")} readOnly className={inputCls} />
                    </F>
                  </div>
                  <F label={t("partners.become.form.message")}>
                    <textarea name="message" rows={4} required className={inputCls} />
                  </F>
                  <button
                    type="submit"
                    disabled={partnerSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:shadow-glow active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {partnerSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{t("common.loading") || "Submitting..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> {t("partners.become.submit")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </Reveal>
          )}

          {/* Form: Mentor */}
          {formType === "mentor" && (
            <Reveal delay={0.08} className="mt-10">
              {mentorSent ? (
                <div className="rounded-2xl border border-mint/30 bg-mint/8 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-mint-600 dark:text-mint" />
                  <p className="mt-4 text-xl font-bold">{t("mentors.success")}</p>
                  {mentorRefNo && (
                    <div className="mx-auto mt-4 max-w-xs rounded-xl border border-border bg-card p-3 shadow-soft">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("apply.referenceNo") || "Reference No"}</p>
                      <p className="mt-1 font-mono text-lg font-bold text-indigo" dir="ltr">{mentorRefNo}</p>
                    </div>
                  )}
                </div>
              ) : (
                <form
                  className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setMentorSubmitting(true);
                    const formEl = e.currentTarget;
                    const values = Object.fromEntries(new FormData(formEl).entries());
                    const ref = refNumber();
                    const timestamp = new Date().toISOString();
                    const payload = {
                      ref,
                      at: timestamp,
                      status: "Pending Review",
                      ...values,
                      data: values,
                    };

                    // 1. Local backup
                    try {
                      const list = JSON.parse(localStorage.getItem("aidia-mentor-interests") ?? "[]");
                      list.push(payload);
                      localStorage.setItem("aidia-mentor-interests", JSON.stringify(list));
                    } catch (err) {
                      console.warn("Local storage save error:", err);
                    }

                    // 2. Google Sheets sync
                    try {
                      await submitFormToSheet("MENTORS", payload);
                    } catch (err) {
                      console.warn("Sheet sync error:", err);
                    } finally {
                      setMentorSubmitting(false);
                      setMentorRefNo(ref);
                      setMentorSent(true);
                      toast.success(t("mentors.success"));
                    }
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <F label={t("mentors.form.name")}>
                      <input name="name" required className={inputCls} />
                    </F>
                    <F label={t("mentors.form.email")}>
                      <input name="email" type="email" required className={inputCls} />
                    </F>
                    <F label={t("mentors.form.org")}>
                      <input name="org" className={inputCls} />
                    </F>
                    <F label={t("mentors.form.expertise")}>
                      <select name="expertise" className={inputCls} defaultValue="">
                        <option value="" disabled>
                          —
                        </option>
                        {mentorCats.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </F>
                  </div>
                  <F label={t("mentors.form.bio")}>
                    <textarea name="bio" rows={3} className={inputCls} />
                  </F>
                  <button
                    type="submit"
                    disabled={mentorSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:shadow-glow active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {mentorSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{t("common.loading") || "Submitting..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> {t("mentors.submit")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </Reveal>
          )}
        </div>
      </section>
    </PageShell>
  );
}
