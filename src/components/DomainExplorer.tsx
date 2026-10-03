import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom, BrainCircuit, Pill, Dna, ScanSearch, Network,
  Sparkles, Microscope, ArrowRight, CheckCircle2
} from "lucide-react";
import { CATEGORY_KEYS, CATEGORY_BADGES } from "@/lib/data";
import { BrandButton } from "@/components/BrandButton";

const ICONS = [Atom, BrainCircuit, Pill, Dna, ScanSearch, Network, Sparkles, Microscope, BrainCircuit];

const DOMAIN_DATA: Record<string, { capabilities: string[]; capabilitiesAr: string[]; stage: string; stageAr: string }> = {
  "ai-drug-discovery": {
    capabilities: ["De Novo Molecular Design", "Binding Affinity Prediction", "Virtual Screening Pipelines", "Structure-Activity Modeling"],
    capabilitiesAr: ["توليد الجزيئات بالذكاء الاصطناعي", "التنبؤ بقوة الارتباط الجزيئي", "خطوط الفحص الافتراضي عالي السرعة", "نمذجة العلاقة بين البنية والنشاط"],
    stage: "Pre-Seed to Series A • Lab Validated",
    stageAr: "من مرحلة ما قبل البذرة إلى جولة أ • تحقق مخبري",
  },
  "biomedical-ai": {
    capabilities: ["Multi-Omics Data Integration", "Medical Imaging Deep Learning", "Clinical Decision Support", "Predictive Biomarkers"],
    capabilitiesAr: ["دمج البيانات الجينومية والبروتينية", "التعلم العميق للتصوير الطبي", "أنظمة دعم القرار السريري", "المؤشرات الحيوية التنبؤية"],
    stage: "Proof-of-Concept to Prototype",
    stageAr: "من إثبات المفهوم إلى النموذج الأولي",
  },
  "pharma-tech": {
    capabilities: ["Targeted Drug Delivery Systems", "Formulation Optimization", "Process Analytical Tech (PAT)", "GMP Pilot Scale-Up"],
    capabilitiesAr: ["أنظمة توصيل الدواء المستهدف", "تحسين وتطوير التركيبات", "تقنيات تحليل العمليات التصنيعية", "التوسع نحو التصنيع المعتمد"],
    stage: "Preclinical Development",
    stageAr: "مرحلة التطوير ما قبل السريري",
  },
  "biotechnology": {
    capabilities: ["Target Validation Biology", "Recombinant Protein Engineering", "Synthetic Biology Platforms", "High-Throughput Cell Assays"],
    capabilitiesAr: ["التحقق من الأهداف البيولوجية", "هندسة البروتينات المؤتلفة", "منصات البيولوجيا التركيبية", "فحوصات الخلايا عالية الإنتاجية"],
    stage: "Early Discovery to Lead Optimization",
    stageAr: "من الاكتشاف المبكر إلى تحسين المركبات",
  },
  "digital-health": {
    capabilities: ["Real-World Evidence (RWE)", "Decentralized Clinical Trials", "Continuous Patient Telemetry", "SaMD Regulatory Roadmaps"],
    capabilitiesAr: ["أدلة العالم الحقيقي (RWE)", "التجارب السريرية اللامركزية", "المراقبة المستمرة للمرضى", "مسارات ترخيص البرمجيات الطبية"],
    stage: "Product Beta to Commercial Pilot",
    stageAr: "من النسخة التجريبية إلى الإطلاق التجاري",
  },
  "biomedical-data": {
    capabilities: ["Curated Chemical Compound Libraries", "Federated Genomic Pipelines", "FAIR Data Compliance", "High-Performance Data Infrastructure"],
    capabilitiesAr: ["قواعد بيانات المركبات الكيميائية", "خطوط بيانات الجينوم الموحدة", "معايير البيانات المفتوحة (FAIR)", "بنية تحتية بيانية فائقة الأداء"],
    stage: "Data Assets & Infrastructure",
    stageAr: "بنية تحتية وأصول بيانات متقدمة",
  },
  "ai-models": {
    capabilities: ["Scientific Foundation Models", "Biomedical LLM Fine-Tuning", "Automated Literature NLP", "Generative Hypothesis Design"],
    capabilitiesAr: ["النماذج التأسيسية العلمية", "الضبط الدقيق للنماذج الحيوية", "استخراج المعرفة من الأوراق العلمية", "توليد الفرضيات العلمية آلياً"],
    stage: "Algorithm Validation to API Deployment",
    stageAr: "من التحقق من الخوارزميات إلى واجهات البرمجة",
  },
  "diagnostics": {
    capabilities: ["Rapid Point-of-Care Biosensors", "Early Liquid Biopsy Biomarkers", "Microfluidic Lab-on-Chip", "Diagnostic Algorithmic Validation"],
    capabilitiesAr: ["مستشعرات نقطة الرعاية السريعة", "المؤشرات الحيوية المبكرة للعيّنات", "الشرائح الميكروفلويدية الذكية", "التحقق من خوارزميات التشخيص"],
    stage: "Bench Validation to Clinical Trials",
    stageAr: "من الفحص المخبري إلى التجارب السريرية",
  },
  "spin-offs": {
    capabilities: ["University IP Portfolio Spin-Out", "Freedom-to-Operate (FTO) Review", "Commercial Licensing Frameworks", "Operator & Co-Founder Matching"],
    capabilitiesAr: ["تحويل الملكية الفكرية الجامعية", "مراجعة حرية العمل التجاري (FTO)", "أطر الترخيص التجاري والاستثماري", "ربط الباحثين بالشركاء المؤسسين"],
    stage: "University IP to Standalone Startup",
    stageAr: "من براءة اختراع جامعية إلى شركة ناشئة",
  },
};

export default function DomainExplorer() {
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  const [activeKey, setActiveKey] = useState<string>(CATEGORY_KEYS[0]);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through domains every 6s if not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveKey((current) => {
        const idx = CATEGORY_KEYS.indexOf(current as any);
        const nextIdx = (idx + 1) % CATEGORY_KEYS.length;
        return CATEGORY_KEYS[nextIdx];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeIdx = CATEGORY_KEYS.indexOf(activeKey as any);
  const ActiveIcon = ICONS[activeIdx >= 0 ? activeIdx : 0];
  const activeBadge = CATEGORY_BADGES[activeKey] || "C01";
  const activeMeta = DOMAIN_DATA[activeKey] || DOMAIN_DATA["ai-drug-discovery"];
  const capabilities = rtl ? activeMeta.capabilitiesAr : activeMeta.capabilities;
  const stage = rtl ? activeMeta.stageAr : activeMeta.stage;

  return (
    <div
      className="mx-auto mt-12 max-w-7xl px-4 sm:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
        {/* Left Side: Sleek Domain Navigation Rail (All 9 Visible) */}
        <div className="space-y-1.5 lg:col-span-5">
          <div className="mb-3 flex items-center justify-between px-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo">
              {rtl ? "المجالات التسعة المعتمدة" : "9 Strategic Domains"}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
              {rtl ? "تحديث تلقائي" : "Interactive Explorer"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {CATEGORY_KEYS.map((key, i) => {
              const Icon = ICONS[i];
              const isActive = activeKey === key;
              const badge = CATEGORY_BADGES[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveKey(key);
                    setIsPaused(true);
                  }}
                  className={`group relative flex w-full items-center justify-between rounded-xl px-4 py-3 text-start transition-all duration-200 ${
                    isActive
                      ? "border border-indigo/40 bg-card text-foreground shadow-lift dark:border-indigo/50 dark:bg-card/90"
                      : "border border-transparent bg-card/40 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                  }`}
                >
                  {/* Active highlight bar */}
                  {isActive && (
                    <motion.div
                      layoutId="domainActivePill"
                      className="absolute inset-y-2 start-1 w-1 rounded-full bg-gradient-to-b from-indigo to-mint"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-3 ps-1">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                        isActive
                          ? "bg-indigo text-white shadow-soft"
                          : "bg-secondary text-muted-foreground group-hover:bg-secondary/80 group-hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold tracking-tight">
                      {t(`categories.${key}.t`)}
                    </span>
                  </div>

                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? "bg-indigo/10 text-indigo dark:bg-indigo/20 dark:text-indigo-300"
                        : "text-muted-foreground/60 group-hover:text-muted-foreground"
                    }`}
                  >
                    {badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: High-Tech Glassmorphic Spotlight Stage */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/95 to-secondary/30 p-7 sm:p-10 shadow-lift dark:from-card dark:via-card/90 dark:to-indigo/10"
            >
              {/* Background ambient decorative orb */}
              <div
                className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-indigo/20 to-mint/15 blur-3xl"
                aria-hidden="true"
              />

              <div>
                {/* Top Badge Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo/30 bg-indigo/10 px-3 py-1 font-mono text-[11px] font-bold text-indigo dark:text-indigo-300">
                      <ActiveIcon className="h-3.5 w-3.5" />
                      {activeBadge} • {rtl ? "مسار تسريع معتمد" : "ACCELERATION DOMAIN"}
                    </span>
                  </div>
                  <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-mono text-[11px] font-semibold text-mint-600 dark:text-mint">
                    {stage}
                  </span>
                </div>

                {/* Domain Title */}
                <h3 className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                  {t(`categories.${activeKey}.t`)}
                </h3>

                {/* Core Description */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {t(`categories.${activeKey}.d`)}
                </p>

                {/* Accelerated Capabilities Grid */}
                <div className="mt-8">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/80 mb-3.5">
                    {rtl ? "القدرات والتقنيات المُسرّعة" : "Accelerated Core Capabilities"}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {capabilities.map((cap) => (
                      <div
                        key={cap}
                        className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-background/60 px-3.5 py-2.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:border-indigo/40"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-mint-600 dark:text-mint" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="mt-10 pt-6 border-t border-border/70 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <BrandButton to="/apply" pulse>
                    {t("common.applyAccelerator")}
                  </BrandButton>
                  <BrandButton to="/submit-technology" variant="secondary">
                    {t("common.submitTechnology")}
                  </BrandButton>
                </div>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo transition-colors hover:text-indigo/80"
                >
                  {t("nav.programs")}
                  <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
