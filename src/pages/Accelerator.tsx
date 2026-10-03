import { useTranslation } from "react-i18next";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Disclaimer from "@/components/Disclaimer";
import { BrandButton } from "@/components/BrandButton";

export default function Accelerator() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const pathwayRef = useRef<HTMLDivElement>(null);
  const pathwayInView = useInView(pathwayRef, { once: true, margin: "-100px" });
  const pathway = t("accelerator.pathway", { returnObjects: true }) as string[];
  const lookFor = t("accelerator.lookFor", { returnObjects: true }) as { t: string; d: string }[];
  const who = t("accelerator.who", { returnObjects: true }) as string[];
  const howSteps = t("accelerator.howSteps", { returnObjects: true }) as { t: string; d: string }[];

  return (
    <PageShell wide>
      <PageHero kicker={t("accelerator.kicker")} title={t("accelerator.title")} sub={t("accelerator.sub")}>
        <BrandButton to="/apply">{t("common.applyNow")}</BrandButton>
      </PageHero>

      {/* Pathway */}
      <section className="py-16 sm:py-24" ref={pathwayRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3" role="list" aria-label={t("accelerator.kicker")}>
            {pathway.map((step, i) => (
              <motion.div
                key={step}
                role="listitem"
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={pathwayInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className={`rounded-full border px-5 py-2.5 text-sm font-semibold ${i === pathway.length - 1 ? "border-mint/50 bg-mint/10 text-mint-600 dark:text-mint" : "border-indigo/30 bg-indigo/8 text-indigo"}`}>
                  <span className="me-2 font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </span>
                {i < pathway.length - 1 && (
                  <motion.span
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={pathwayInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.3 }}
                    className="hidden h-px w-8 origin-left bg-border sm:block rtl:origin-right"
                    aria-hidden
                  />
                )}
              </motion.div>
            ))}
          </div>
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-2xl text-sm italic text-muted-foreground">{t("disclaimers.pathwayNote")}</p>
          </Reveal>
        </div>
      </section>

      {/* Infrastructure & Lab Visual Feature */}
      <section className="border-t border-border py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
              <div className="grid items-center lg:grid-cols-12">
                <div className="relative h-72 overflow-hidden sm:h-96 lg:col-span-7 lg:h-[440px]">
                  <img
                    src="/images/accelerator_compute_lab.jpg"
                    alt="AI Drug Innovation Compute and Wet-Lab Infrastructure"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent lg:hidden" />
                  <div className="absolute start-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-md">
                      RIYADH COMPUTE & LAB CLUSTER
                    </span>
                    <span className="rounded-full border border-mint/30 bg-mint/20 px-3 py-1 font-mono text-[11px] font-semibold text-mint backdrop-blur-md">
                      HPC & ROBOTIC ASSAYS
                    </span>
                  </div>
                </div>
                <div className="space-y-5 p-8 sm:p-10 lg:col-span-5 lg:p-12">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                    ACCELERATOR INFRASTRUCTURE
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {t("accelerator.title")}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t("accelerator.sub")}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <BrandButton to="/apply" pulse>
                      {t("common.applyNow")}
                    </BrandButton>
                    <BrandButton to="/programs" variant="secondary">
                      {t("nav.programs")}
                    </BrandButton>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* We look for */}
      <section className="border-t border-border bg-secondary/40 py-16 sm:py-24 dark:bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="start" title={t("accelerator.lookForTitle")} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {lookFor.map((item, i) => (
              <Reveal key={item.t} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="font-mono text-lg font-semibold text-indigo/50">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-base font-bold">{item.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who can apply */}
      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="start" title={t("accelerator.whoTitle")} />
          <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {who.map((w, i) => (
              <Reveal key={w} delay={i * 0.03}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-mint-600 dark:text-mint" />
                  <span className="text-sm font-medium">{w}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply — 6-step vertical timeline */}
      <section className="border-t border-border bg-secondary/40 py-16 sm:py-24 dark:bg-secondary/10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading title={t("accelerator.howTitle")} />
          <div className="relative mt-14">
            <div className="absolute bottom-6 start-5 top-2 w-px bg-border" aria-hidden />
            {howSteps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <div className="relative mb-8 flex gap-5 ps-1 last:mb-0">
                  <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-indigo/30 bg-card font-mono text-xs font-semibold text-indigo shadow-soft">
                    {i + 1}
                  </span>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <p className="text-base font-bold">{s.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-12 space-y-6">
            <Disclaimer kind="application" />
            <div className="text-center">
              <BrandButton to="/apply" pulse>{t("common.startApplication")}</BrandButton>
              <p className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <ArrowDown className="h-3 w-3" /> {t("apply.draftNote")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
