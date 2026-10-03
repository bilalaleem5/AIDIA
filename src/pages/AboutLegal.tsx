import { useState } from "react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Compass, Eye, Network, Target, Users,
  Sparkles, ExternalLink,
  Copy, Check, Mail
} from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { MonoTag, Placeholder } from "@/components/Disclaimer";
import { BrandButton } from "@/components/BrandButton";
import { LEGAL_PAGES } from "@/lib/data";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="0"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3" />
    </svg>
  );
}

export function About() {
  const { t } = useTranslation();
  const focus = t("about.focus.items", { returnObjects: true }) as string[];
  const flow = t("about.institutional.flow", { returnObjects: true }) as { t: string; d: string }[];
  const groups = t("team.groups", { returnObjects: true }) as string[];
  const [copied, setCopied] = useState(false);

  const stats = [
    { num: "12–16", label: "Weeks Acceleration", sub: "Intensive venture building" },
    { num: "9", label: "Core Bio/Tech Domains", sub: "From AI models to diagnostics" },
    { num: "11", label: "Expert Specializations", sub: "Scientific, IP & market advisors" },
    { num: "100%", label: "IP & Science Focused", sub: "Strict confidentiality & rigor" },
  ];

  return (
    <PageShell wide>
      <PageHero
        kicker={t("about.kicker")}
        title={t("about.title")}
        sub={t("about.sub")}
      >
        <div className="flex flex-wrap items-center gap-3">
          <BrandButton to="#mission" pulse>
            Our Mission & Model
          </BrandButton>
          <BrandButton to="#institutional-relationship" variant="secondary">
            {t("nav.menu.institutionalRelationship")}
          </BrandButton>
          <BrandButton to="/contact" variant="ghost">
            {t("nav.menu.contact")} →
          </BrandButton>
        </div>
      </PageHero>

      {/* ============ FEATURED HERO IMAGE ============ */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl border border-border shadow-lift">
              <img
                src="/images/ai_drug_lab.jpg"
                alt="AI Drug Innovation Accelerator Laboratory"
                className="h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[460px] lg:h-[520px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
              <div className="absolute bottom-6 start-6 end-6 sm:bottom-10 sm:start-10 sm:end-10 flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo/90 px-3.5 py-1.5 font-mono text-[10px] font-bold text-white shadow-soft backdrop-blur-sm">
                    <Sparkles className="h-3 w-3" />
                    AI DRUG INNOVATION ACCELERATOR
                  </div>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Where Computational Intelligence Meets Pharmaceutical Science
                  </h2>
                  <p className="mt-2 text-sm text-white/80">
                    Connecting researchers, founders, intellectual property, validation pathways, and capital in Riyadh, Saudi Arabia.
                  </p>
                </div>
                <div className="hidden sm:block">
                  <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs font-medium text-white backdrop-blur-md">
                    Riyadh, Kingdom of Saudi Arabia
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="border-t border-border bg-secondary/30 py-12 sm:py-16 dark:bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((st, i) => (
              <Reveal key={st.label} delay={i * 0.06}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <p className="font-mono text-3xl font-extrabold text-indigo sm:text-4xl">{st.num}</p>
                  <p className="mt-2 text-sm font-bold text-foreground">{st.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{st.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 1. MISSION, VISION, MODEL & GOVERNANCE ============ */}
      <section id="mission" className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            kicker="FOUNDATIONAL PILLARS"
            title="Designed for Scientific Rigor & Market Impact"
            sub="We eliminate the traditional silos separating laboratory discoveries, proprietary AI algorithms, and venture-backed commercialization."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { icon: Target, k: "mission" },
              { icon: Eye, k: "vision" },
              { icon: Compass, k: "model" },
              { icon: Network, k: "governance" },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex items-center justify-between">
                    <c.icon className="h-6 w-6 text-indigo" />
                    <MonoTag tone="indigo">{`Pillar 0${i + 1}`}</MonoTag>
                  </div>
                  <p className="mt-4 text-xl font-bold">{t(`about.${c.k}.t`)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`about.${c.k}.d`)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <SectionHeading align="start" title={t("about.focus.t")} />
            <div className="mt-6 flex flex-wrap gap-2.5">
              {focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-indigo/25 bg-indigo/8 px-5 py-2.5 text-sm font-semibold text-indigo shadow-soft"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 2. BIOTECH INNOVATION STRATEGY ============ */}
      <section className="border-t border-border bg-secondary/40 py-16 sm:py-24 dark:bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="space-y-6">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo">
                  STRATEGIC ADVANTAGE
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Bridging the Translation Gap
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  The journey from an academic research breakthrough to a validated pharmaceutical product is fraught with technical, clinical, and commercial hurdles. We provide the ecosystem, validation frameworks, and investment readiness that transform raw science into global therapeutic ventures.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    "Intellectual Property & Technology Transfer Guidance",
                    "Computational Validation & Preclinical Target Assessment",
                    "Regulatory Affairs Strategy for GCC & Global Markets",
                    "Direct Engagement with Specialized Venture Capital & Pharma Partners"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint/20 text-mint-600 dark:text-mint">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <BrandButton to="/programs">Explore Accelerator Programs</BrandButton>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="group relative overflow-hidden rounded-3xl border border-border shadow-lift">
                <img
                  src="/images/biotech_innovation.jpg"
                  alt="Biotechnology Innovation Campus"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 start-6 end-6">
                  <span className="rounded-full bg-mint/90 px-3 py-1 font-mono text-[10px] font-bold text-navy-950 shadow-soft">
                    ECOSYSTEM COLLABORATION
                  </span>
                  <p className="mt-2 text-base font-bold text-white">
                    Connecting Founders, Scientists, Clinicians & Investors
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 3. INSTITUTIONAL RELATIONSHIP ============ */}
      <section id="institutional-relationship" className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo">
              {t("about.institutional.kicker")}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">{t("about.institutional.title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("about.institutional.text")}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <h3 className="text-xl font-bold tracking-tight">{t("about.institutional.flowTitle")}</h3>
            <div className="relative mt-8 space-y-0">
              {flow.map((f, i) => (
                <motion.div
                  key={f.t}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  className="relative flex gap-5 pb-8 last:pb-0"
                >
                  {i < flow.length - 1 && (
                    <span className="absolute bottom-0 start-[22px] top-12 w-px bg-border" aria-hidden />
                  )}
                  <span
                    className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 bg-card font-mono text-xs font-bold ${
                      i === 0
                        ? "border-navy-800 text-navy-800 dark:border-white dark:text-white"
                        : i === 1
                        ? "border-indigo text-indigo"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div
                    className={`flex-1 rounded-2xl border p-5 ${
                      i === 1 ? "border-indigo/40 bg-indigo/5" : "border-border bg-card"
                    }`}
                  >
                    <p className="text-base font-bold">{f.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-10">
            <a
              href="https://aidruginno.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground shadow-soft transition-colors hover:border-indigo/40"
            >
              {t("about.institutional.visit")}
              <ExternalLink className="h-3.5 w-3.5 text-indigo" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============ 4. GOVERNANCE & TEAM FRAMEWORK ============ */}
      <section id="governance" className="border-t border-border bg-secondary/30 py-16 sm:py-24 dark:bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo">
              {t("team.kicker")}
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">{t("team.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("team.sub")}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g, gi) => (
              <Reveal key={g} delay={gi * 0.04}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold text-indigo/60">
                      G-{String(gi + 1).padStart(2, "0")}
                    </span>
                    <MonoTag tone="indigo">Framework</MonoTag>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-foreground">{g}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Distinguished domain experts and institutional leadership guiding participating ventures.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. DIRECT WHATSAPP CONTACT ============ */}
      <section id="contact" className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              {t("contact.kicker")}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">{t("contact.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("contact.sub")}</p>
          </div>

          <div className="mt-10">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-card via-card to-emerald-500/5 p-8 text-center shadow-xl dark:border-emerald-400/20 dark:from-navy-900 dark:via-navy-900 dark:to-emerald-950/20 sm:p-12">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

                {/* WhatsApp Brand Badge */}
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#25D366] to-emerald-600 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 hover:scale-105">
                  <WhatsAppIcon className="h-11 w-11 fill-white drop-shadow-sm" />
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-card bg-emerald-500 dark:border-navy-900" />
                  </span>
                </div>

                {/* Phone Number Display */}
                <div className="mt-6">
                  <span className="inline-block rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    {t("contact.phoneLabel")}
                  </span>
                  <p className="mt-3 font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground" dir="ltr">
                    +966 50 521 0112
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("contact.hours")}
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                  <a
                    href="https://wa.me/966505210112"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:shadow-[#25D366]/50 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-5 w-5 fill-white" />
                    <span>{t("contact.whatsappBtn")}</span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("+966 50 521 0112");
                      setCopied(true);
                      toast.success(t("contact.copiedToast"));
                      setTimeout(() => setCopied(false), 2500);
                    }}
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-card/80 hover:bg-secondary/70 px-5 py-4 text-sm font-semibold text-foreground transition-all active:scale-[0.98]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">{t("contact.copied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-muted-foreground" />
                        <span>{t("contact.copyNumber")}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Email & Full Directory Link */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border border-border/80 bg-background/60 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Mail className="h-4 w-4 text-indigo" />
                    <span>Official Email:</span>
                    <a href="mailto:info@aidia.sa" className="font-mono font-bold text-indigo hover:underline" dir="ltr">
                      info@aidia.sa
                    </a>
                  </div>
                  <span className="hidden sm:inline text-muted-foreground/40">•</span>
                  <Link
                    to="/contact"
                    className="text-xs font-semibold text-indigo hover:underline flex items-center gap-1"
                  >
                    <span>View Full Contact Directory</span>
                    <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </Link>
                </div>

                {/* Assurance details */}
                <div className="mt-8 pt-8 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-2">
                    <p className="text-xs font-semibold text-foreground">{t("contact.responseTimeTitle")}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{t("contact.responseTime")}</p>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-semibold text-foreground">{t("contact.directLeadershipTitle")}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{t("contact.directLeadership")}</p>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-semibold text-foreground">{t("contact.confidentialityTitle")}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{t("contact.confidentiality")}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function LegalPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const page = LEGAL_PAGES.find((p) => p.slug === slug);
  if (!page) return <NotFound />;
  return (
    <PageShell wide>
      <PageHero kicker={t("legal.kicker")} title={t(`legal.pages.${page.key}`)} />
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {page.key === "accessibility" && (
            <Reveal className="mb-6">
              <p className="rounded-2xl border border-mint/30 bg-mint/8 p-5 text-sm leading-relaxed text-foreground">
                {t("legal.accessibilityNote")}
              </p>
            </Reveal>
          )}
          {page.key === "investorDisclaimer" && (
            <Reveal className="mb-6">
              <p className="rounded-2xl border border-amber-300/50 bg-amber-50/60 p-5 text-sm leading-relaxed text-amber-900/80 dark:border-amber-500/25 dark:bg-amber-500/5 dark:text-amber-200/70">
                {t("disclaimers.global")}
              </p>
            </Reveal>
          )}
          <Placeholder tall label={t("legal.supplied")} className="min-h-64" />
        </div>
      </section>
    </PageShell>
  );
}

export function NotFound() {
  const { t } = useTranslation();
  return (
    <PageShell wide>
      <section className="mesh-hero flex min-h-[70vh] items-center justify-center pt-16">
        <div className="px-4 text-center">
          <p className="font-mono text-7xl font-bold text-indigo/20" dir="ltr">
            404
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">{t("notFound.title")}</h1>
          <p className="mt-3 text-muted-foreground">{t("notFound.sub")}</p>
          <BrandButton to="/" className="mt-8">
            {t("notFound.back")}
          </BrandButton>
        </div>
      </section>
    </PageShell>
  );
}
