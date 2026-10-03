import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { MonoTag } from "@/components/Disclaimer";
import { BrandButton } from "@/components/BrandButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PROGRAM_KEYS, PROGRAM_BADGES } from "@/lib/data";

export function Programs() {
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  return (
    <PageShell wide>
      <PageHero kicker={t("programs.kicker")} title={t("programs.title")} sub={t("programs.sub")} />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            {PROGRAM_KEYS.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <Link
                  to={`/programs/${p}`}
                  className={`group flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    i === 0 ? "border-indigo/30 bg-gradient-to-br from-indigo/8 to-transparent md:col-span-2" : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MonoTag tone={i === 0 ? "indigo" : "default"}>{PROGRAM_BADGES[p]}</MonoTag>
                    {i === 0 && <MonoTag tone="mint">FLAGSHIP</MonoTag>}
                    <span className="ms-auto font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      {t("common.duration")}: {t(`programsData.${p}.duration`)}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold tracking-tight">{t(`programsData.${p}.name`)}</h2>
                  <p className="mt-1 font-medium text-indigo">{t(`programsData.${p}.tagline`)}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t(`programsData.${p}.overview`)}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo">
                    {t("common.learnMore")}
                    <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${rtl ? "-scale-x-100 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-8">
            <p className="text-center text-xs italic text-muted-foreground">{t("disclaimers.programScope")}</p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

export function ProgramDetail() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  const key = PROGRAM_KEYS.find((k) => k === slug);

  if (!key) {
    return (
      <PageShell wide>
        <PageHero kicker={t("programs.kicker")} title={t("notFound.title")} />
      </PageShell>
    );
  }

  const core = t(`programsData.${key}.core`, { returnObjects: true }) as string[];

  return (
    <PageShell wide>
      <PageHero kicker={`${t("programs.kicker")} — ${PROGRAM_BADGES[key]}`} title={t(`programsData.${key}.name`)} sub={t(`programsData.${key}.tagline`)}>
        <div className="flex flex-wrap items-center gap-4">
          <BrandButton to="/apply" pulse>{t("common.applyNow")}</BrandButton>
          <MonoTag tone="mint">{t(`programsData.${key}.duration`)}</MonoTag>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight">{t("common.overview")}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t(`programsData.${key}.overview`)}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-12 text-2xl font-bold tracking-tight">{t("common.whoItsFor")}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t(`programsData.${key}.who`)}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 className="mt-12 text-2xl font-bold tracking-tight">{t("programs.coreAreas")}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {core.map((c) => (
                  <span key={c} className="rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <h2 className="mt-12 text-2xl font-bold tracking-tight">{t("common.faq")}</h2>
              <div className="mt-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="faq" className="rounded-2xl border border-border px-5">
                    <AccordionTrigger className="text-sm font-semibold">{t("common.faq")}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{t("programs.faqEmpty")}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Reveal>
          </div>
          <aside className="space-y-4">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t("common.timeline")}</p>
                <div className="mt-4 space-y-3">
                  {core.slice(0, 5).map((c, i) => (
                    <div key={c} className="flex items-center gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-indigo/10 font-mono text-[10px] font-semibold text-indigo">{i + 1}</span>
                      <span className="text-sm font-medium">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t("common.outcomes")}</p>
                <div className="mt-4 space-y-2.5">
                  {[
                    "Validated AI Pipeline & Target Candidate",
                    "Intellectual Property & Freedom-to-Operate Roadmap",
                    "Regulatory & Clinical Pathway Definition",
                    "Investor-Ready Data Room & Demo Day Access",
                  ].map((outcome) => (
                    <div key={outcome} className="flex items-start gap-2.5 text-xs font-medium">
                      <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-mint" />
                      <span className="text-muted-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-xs italic leading-relaxed text-muted-foreground">{t("disclaimers.programScope")}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <BrandButton to="/apply" className="w-full">{t("programs.apply")}</BrandButton>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Next program nav */}
      <section className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-4 sm:px-6">
          {PROGRAM_KEYS.filter((k) => k !== key)
            .slice(0, 3)
            .map((k) => (
              <Link key={k} to={`/programs/${k}`} className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-indigo">
                {t(`programsData.${k}.name`)}
                <ArrowRight className={`h-3.5 w-3.5 transition-transform ${rtl ? "-scale-x-100 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
              </Link>
            ))}
        </div>
      </section>
    </PageShell>
  );
}
