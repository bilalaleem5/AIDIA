import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, ChevronRight,
  FlaskConical, Handshake,
  Sparkles, TrendingUp,
} from "lucide-react";
import MoleculeCanvas from "@/components/MoleculeCanvas";
import { Reveal } from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import DomainExplorer from "@/components/DomainExplorer";
import Marquee from "@/components/Marquee";
import SectionHeading, { Kicker } from "@/components/SectionHeading";
import PathwayModel from "@/components/PathwayModel";
import WhatWeDoEngine from "@/components/WhatWeDoEngine";
import ConvergenceCore from "@/components/ConvergenceCore";
import { BrandButton } from "@/components/BrandButton";
import { MonoTag } from "@/components/Disclaimer";
import PageShell from "@/components/PageShell";
import { CATEGORY_KEYS, CATEGORY_BADGES, PROGRAM_KEYS, PROGRAM_BADGES } from "@/lib/data";

const ROUTER_CARDS = [
  { key: "research", to: "/submit-technology", icon: FlaskConical },
  { key: "startup", to: "/apply", icon: Sparkles },
  { key: "investor", to: "/investors", icon: TrendingUp },
  { key: "collaborate", to: "/partners", icon: Handshake },
] as const;

const MENTOR_CATS = [
  "AI Drug Discovery", "Pharmaceutical Sciences", "Biotechnology", "Clinical Development", "Regulatory Affairs",
  "Intellectual Property", "Commercialization", "Investment", "Entrepreneurship", "Manufacturing", "Market Access",
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  const reduce = useReducedMotion();
  const mentorCats = t("mentors.categories", { returnObjects: true }) as string[];

  return (
    <PageShell wide>
      {/* ============ 1. HERO ============ */}
      <section className="mesh-hero grain relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20 sm:pt-24">
        <MoleculeCanvas className="absolute inset-0 h-full w-full opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-indigo"
          >
            {t("home.heroKicker")}
          </motion.p>
          <h1 className="mt-6 text-[clamp(2.3rem,6vw,5.2rem)] font-extrabold leading-[1.12] tracking-tight text-foreground min-h-[3.6em] sm:min-h-[2.8em] text-center">
            <Typewriter
              prefix={t("home.heroPrefix")}
              words={t("home.heroWords", { returnObjects: true }) as string[]}
              gradientClassName="text-gradient-biotech"
            />
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t("home.heroSub")}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <BrandButton to="/apply" pulse>{t("common.applyAccelerator")}</BrandButton>
            <BrandButton to="/programs" variant="secondary">{t("nav.programs")}</BrandButton>
            <BrandButton to="/investors" variant="navy">{t("common.forInvestors")}</BrandButton>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-6"
          >
            <Link to="/submit-technology" className="link-sweep text-sm font-medium text-muted-foreground">
              {t("home.heroGhost")} →
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2" aria-hidden>
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">{t("home.scroll")}</span>
          <span className="block h-12 w-px overflow-hidden bg-border">
            <span className="block h-full w-full origin-top animate-scroll-cue bg-indigo" />
          </span>
        </div>
      </section>

      {/* ============ 2. I AM A… ROUTER ============ */}
      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="start" kicker={t("home.routerKicker")} title={t("home.routerTitle")} sub={t("home.routerSub")} />
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ROUTER_CARDS.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.05}>
                <Link
                  to={c.to}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-indigo/40 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between">
                    <c.icon className="h-5 w-5 text-indigo" />
                    <ChevronRight className={`h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 ${rtl ? "-scale-x-100 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                  </div>
                  <div className="mt-8">
                    <p className="text-lg font-bold text-foreground">{t(`home.router.${c.key}.t`)}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t(`home.router.${c.key}.d`)}</p>
                    <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo">
                      {t(`home.router.${c.key}.cta`)} →
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. WHAT WE ACCELERATE ============ */}
      <section id="what-we-accelerate" className="border-t border-border bg-secondary/40 py-16 sm:py-24 dark:bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading kicker={t("home.wwaKicker")} title={t("home.wwaTitle")} sub={t("home.wwaSub")} />
        </div>
        <Reveal className="mt-10" y={12}>
          <Marquee>
            {CATEGORY_KEYS.map((c) => (
              <Link
                key={c}
                to="/programs"
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-indigo/40 hover:text-indigo"
              >
                <span className="font-mono text-[10px] text-mint-600">{CATEGORY_BADGES[c]}</span>
                {t(`categories.${c}.t`)}
              </Link>
            ))}
          </Marquee>
        </Reveal>
        {/* Interactive Domain Explorer Console */}
        <DomainExplorer />
      </section>

      {/* ============ 4. FEATURED SCIENTIFIC INNOVATION ============ */}
      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
                <img
                  src="/images/scientific_discovery.jpg"
                  alt="AI Drug Discovery & Molecular Modeling"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 start-6 end-6">
                  <span className="rounded-full bg-indigo/90 px-3.5 py-1.5 font-mono text-[10px] font-bold text-white shadow-soft">
                    COMPUTATIONAL MEDICINE
                  </span>
                  <p className="mt-2 text-lg font-bold text-white">
                    From In Silico Prediction to Clinically Validated Compounds
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo">
                  CROSS-DISCIPLINARY ACCELERATION
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Compressing Discovery From Years to Weeks
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Traditional pharmaceutical R&D takes over a decade and billions of dollars. By uniting generative AI, molecular dynamics simulations, and structured validation pipelines, the AI Drug Innovation Accelerator reduces the distance between scientific breakthrough and market-ready therapeutic venture.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <p className="font-mono text-3xl font-bold text-indigo">12–16</p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">Weeks Acceleration Program</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <p className="font-mono text-3xl font-bold text-mint-600 dark:text-mint">9</p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">Deep Tech & Bio Domains</p>
                  </div>
                </div>
                <div className="pt-2">
                  <BrandButton to="/programs">{t("nav.programs")}</BrandButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 5. THE ACCELERATION MODEL ============ */}
      <section className="border-t border-border bg-secondary/40 py-16 sm:py-24 dark:bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading kicker={t("home.modelKicker")} title={t("home.modelTitle")} sub={t("home.modelSub")} />
          <div className="mt-12">
            <PathwayModel />
          </div>
        </div>
      </section>

      {/* ============ 6. WHAT WE DO ============ */}
      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading kicker={t("home.whatKicker")} title={t("home.whatTitle")} />
        </div>
        <WhatWeDoEngine />
      </section>

      {/* ============ 7. PROGRAMS ============ */}
      <section className="border-t border-border bg-secondary/40 py-16 sm:py-24 dark:bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading align="start" kicker={t("home.programsKicker")} title={t("home.programsTitle")} sub={t("home.programsSub")} />
            <Reveal delay={0.1}>
              <Link to="/programs" className="link-sweep hidden text-sm font-semibold text-indigo sm:block">
                {t("common.viewAll")} →
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAM_KEYS.slice(0, 3).map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <Link
                  to={`/programs/${p}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-indigo/40 hover:shadow-lift"
                >
                  <div className="flex items-center gap-2">
                    <MonoTag tone={i === 0 ? "indigo" : "default"}>{PROGRAM_BADGES[p]}</MonoTag>
                    {i === 0 && <MonoTag tone="mint">FLAGSHIP</MonoTag>}
                    <span className="ms-auto font-mono text-[10px] text-muted-foreground">{t(`programsData.${p}.duration`)}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">{t(`programsData.${p}.name`)}</h3>
                  <p className="mt-1 font-medium text-indigo">{t(`programsData.${p}.tagline`)}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t(`programsData.${p}.overview`)}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-indigo">
                    {t("common.learnMore")} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 8. WHY AI DRUG INNOVATION (Convergence Core) ============ */}
      <section className="border-t border-border py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading kicker={t("home.whyKicker")} title={t("home.whyTitle")} />
          <ConvergenceCore />
        </div>
      </section>

      {/* ============ 9. SPLIT PANELS (Researchers & Investors) ============ */}
      <section className="border-t border-border bg-secondary/40 py-16 sm:py-24 dark:bg-secondary/10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2">
          {[
            { key: "splitResearchers", to: "/submit-technology", ctaTo: "/submit-technology", icon: FlaskConical, dark: false },
            { key: "splitInvestors", to: "/investors", ctaTo: "/investors#register", icon: TrendingUp, dark: true },
          ].map((p, i) => (
            <Reveal key={p.key} delay={i * 0.08}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                  p.dark ? "mesh-navy grain text-white" : "border border-border bg-card"
                }`}
              >
                <p.icon className={`h-8 w-8 ${p.dark ? "text-mint" : "text-indigo"}`} />
                <Kicker>{t(`home.${p.key}.kicker`)}</Kicker>
                <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight">{t(`home.${p.key}.title`)}</h3>
                <p className={`mt-3 flex-1 text-sm leading-relaxed ${p.dark ? "text-white/65" : "text-muted-foreground"}`}>{t(`home.${p.key}.d`)}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <BrandButton to={p.ctaTo} variant={p.dark ? "white" : "primary"} className="px-5 py-2.5 text-xs">
                    {t(`home.${p.key}.cta`)}
                  </BrandButton>
                  <Link to={p.to} className={`link-sweep text-xs font-semibold ${p.dark ? "text-white/80" : "text-indigo"}`}>
                    {t(`home.${p.key}.more`)}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 10. MENTORS STRIP ============ */}
      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading kicker={t("home.mentorsKicker")} title={t("home.mentorsTitle")} sub={t("home.mentorsSub")} />
          <Reveal className="mt-10" y={12}>
            <Marquee slow>
              {MENTOR_CATS.map((m, i) => (
                <span
                  key={m}
                  className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-5 py-2.5 text-sm text-muted-foreground shadow-soft"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  {mentorCats[i]}
                </span>
              ))}
            </Marquee>
          </Reveal>
          <Reveal className="mt-8 text-center">
            <Link to="/partners#mentors" className="link-sweep text-sm font-semibold text-indigo">
              {t("nav.menu.mentorsExperts")} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ 11. CLOSING CTA ============ */}
      <section className="mesh-navy grain relative overflow-hidden py-20 text-center text-white sm:py-28">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl sm:leading-[1.1]">{t("home.ctaTitle")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-white/65">{t("home.ctaNote")}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <BrandButton to="/apply" variant="white">{t("common.applyAccelerator")}</BrandButton>
              <BrandButton to="/submit-technology" variant="primary">{t("common.submitTechnology")}</BrandButton>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
