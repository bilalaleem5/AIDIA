import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  TrendingUp,
  CheckCircle2,
  FileBadge,
  BriefcaseBusiness,
  Landmark,
  Network,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Activity,
  Zap,
} from "lucide-react";

interface CapabilityItem {
  key: string;
  icon: any;
  image: string;
  phase: string;
  phaseAr: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  deliverable: string;
  deliverableAr: string;
  tags: string[];
  tagsAr: string[];
  telemetry: {
    metric1: { label: string; labelAr: string; value: string };
    metric2: { label: string; labelAr: string; value: string };
    badge: string;
    badgeAr: string;
  };
}

const CAPABILITIES: CapabilityItem[] = [
  {
    key: "assessment",
    icon: ClipboardCheck,
    image: "/images/scientific_discovery.jpg",
    phase: "PHASE 01",
    phaseAr: "المرحلة 01",
    title: "Structured Assessment & Diligence",
    titleAr: "التقييم المنهجي والتدقيق الفني",
    subtitle: "De-risking breakthrough science before venture commitment.",
    subtitleAr: "إزالة المخاطر عن الأبحاث المتقدمة قبل الالتزام الاستثماري.",
    description:
      "We rigorously evaluate incoming research, algorithmic models, and teams across scientific feasibility, IP defensibility, market viability, and regulatory clarity.",
    descriptionAr:
      "نقوم بتقييم الأبحاث والنماذج الخوارزمية والفرق بدقة عبر الجدوى العلمية، وحماية الملكية الفكرية، والجاهزية السوقية، والمسار التنظيمي.",
    deliverable: "Institutional Technical & Commercial Diligence Dossier",
    deliverableAr: "ملف التدقيق الفني والتجاري المعتمد",
    tags: [
      "TRL 3–6 Evaluation",
      "Scientific Merit Peer Review",
      "Freedom-to-Operate Audit",
      "Founder & Team Assessment",
    ],
    tagsAr: [
      "تقييم الجاهزية التقنية TRL 3-6",
      "مراجعة الأقران للجدوى العلمية",
      "تدقيق حرية العمل التجاري FTO",
      "تقييم الفريق المؤسس",
    ],
    telemetry: {
      metric1: { label: "Turnaround", labelAr: "مدة التدقيق", value: "14 Days" },
      metric2: { label: "Diligence Depth", labelAr: "عمق التقييم", value: "360° Audit" },
      badge: "Scientific Feasibility Verified",
      badgeAr: "تم التحقق من الجدوى العلمية",
    },
  },
  {
    key: "development",
    icon: TrendingUp,
    image: "/images/ai_drug_lab.jpg",
    phase: "PHASE 02",
    phaseAr: "المرحلة 02",
    title: "Technology & Venture Development",
    titleAr: "تطوير التقنية وبناء المشروع",
    subtitle: "Bridging computational models with wet-lab experimental roadmaps.",
    subtitleAr: "ربط النماذج الحوسبية بخطط التجارب المخبرية الواقعية.",
    description:
      "We provide dedicated AI engineering, high-performance compute access, wet-lab validation matching, and entrepreneurial architecture to turn raw algorithms into clinical-grade platforms.",
    descriptionAr:
      "نوفر هندسة حوسبية متخصصة، وحوسبة فائقة الأداء، وشبكات مخابر متقدمة، لبناء منصات تقنية علاجية بمعايير عالمية.",
    deliverable: "In Silico Pipeline Architecture & Working Prototype",
    deliverableAr: "معمارية خطوط الذكاء الاصطناعي والنموذج الأولي",
    tags: [
      "GPU Compute Allocation",
      "Model Architecture Optimization",
      "Target Profiling Pipelines",
      "Venture Blueprint Design",
    ],
    tagsAr: [
      "تخصيص الحوسبة السحابية الفائقة",
      "تحسين بنية النماذج الحوسبية",
      "خطوط توصيف الأهداف الجزيئية",
      "تصميم هيكل الشركة الناشئة",
    ],
    telemetry: {
      metric1: { label: "Compute Tier", labelAr: "قدرات الحوسبة", value: "H100 / A100" },
      metric2: { label: "Build Velocity", labelAr: "سرعة الإنجاز", value: "3x Faster" },
      badge: "Production Pipeline Ready",
      badgeAr: "خطوط إنتاج برمجية معتمدة",
    },
  },
  {
    key: "validation",
    icon: CheckCircle2,
    image: "/images/biotech_innovation.jpg",
    phase: "PHASE 03",
    phaseAr: "المرحلة 03",
    title: "Evidence-Building & Validation",
    titleAr: "بناء الأدلة والتحقق التجريبي",
    subtitle: "Generating definitive proof-of-concept for investors and pharma.",
    subtitleAr: "توليد إثبات مفهوم قاطع للمستثمرين وشركات الأدوية.",
    description:
      "From in silico molecular affinity predictions to wet-lab assay verification, we help teams generate reproducible scientific evidence that meets international biopharma standards.",
    descriptionAr:
      "من التنبؤ الحوسبي إلى الفحص المخبري، نساعد الفرق على إنتاج أدلة علمية موثوقة وقابلة للتكرار تطابق معايير صناعة الأدوية الدولية.",
    deliverable: "Validated Preclinical Proof-of-Concept & Data Room",
    deliverableAr: "إثبات مفهوم معتمد مسبقاً وسجل بيانات تجريبي كامل",
    tags: [
      "Wet-Lab Assay Verification",
      "Binding Affinity Benchmarks",
      "Reproducibility Testing",
      "Pharma-Grade Data Rooms",
    ],
    tagsAr: [
      "فحوصات المخابر الرطبة المعتمدة",
      "معايير قوة الارتباط الجزيئي",
      "اختبارات التكرارية والموثوقية",
      "غرف بيانات مطابقة لمعايير الأدوية",
    ],
    telemetry: {
      metric1: { label: "Validation Standard", labelAr: "بروتوكول التحقق", value: "GLP / GCP Aligned" },
      metric2: { label: "Assay Rigor", labelAr: "موثوقية الفحص", value: ">98% Confidence" },
      badge: "Experimental Proof Secured",
      badgeAr: "إثبات تجريبي موثق",
    },
  },
  {
    key: "ip",
    icon: FileBadge,
    image: "/images/accelerator_compute_lab.jpg",
    phase: "PHASE 04",
    phaseAr: "المرحلة 04",
    title: "IP Strategy & Patent Positioning",
    titleAr: "استراتيجية الملكية الفكرية والتموضع الدولي",
    subtitle: "Building ironclad defensive moats around algorithms and molecules.",
    subtitleAr: "بناء حماية قانونية استثنائية حول الخوارزميات والجزيئات العلاجية.",
    description:
      "We guide inventors on patent architecture, freedom-to-operate clearances, composition-of-matter filings, and proprietary algorithm safeguards across global jurisdictions (PCT, USPTO, EPO, SAIP).",
    descriptionAr:
      "نرشد المبتكرين في هندسة براءات الاختراع، وحرية العمل، وتأمين حماية التركيبات الكيميائية والخوارزميات عبر المكاتب الدولية (SAIP, USPTO, EPO).",
    deliverable: "Defensible Global Patent Architecture & Filing Strategy",
    deliverableAr: "هندسة استراتيجية شاملة لتسجيل براءات الاختراع عالمياً",
    tags: [
      "Composition of Matter Claims",
      "AI Method Patent Defense",
      "Trade Secret Protection",
      "Global PCT Roadmap",
    ],
    tagsAr: [
      "مطالبات براءات التركيبات الكيميائية",
      "حماية خوارزميات الذكاء الاصطناعي",
      "بروتوكولات الأسرار التجارية",
      "خريطة التسجيل الدولي PCT",
    ],
    telemetry: {
      metric1: { label: "Jurisdiction", labelAr: "نطاق الحماية", value: "Global / PCT" },
      metric2: { label: "Claim Moat", labelAr: "عمق المطالبات", value: "Multi-Layered" },
      badge: "Defensive Moat Established",
      badgeAr: "حماية فكرية محصنة",
    },
  },
  {
    key: "commercialization",
    icon: BriefcaseBusiness,
    image: "/images/scientific_discovery.jpg",
    phase: "PHASE 05",
    phaseAr: "المرحلة 05",
    title: "Commercialization & Licensing",
    titleAr: "التسويق التجاري وترخيص الأدوية",
    subtitle: "Designing real pathways to revenue, clinical adoption, and partnerships.",
    subtitleAr: "رسم مسارات واضحة للإيرادات والترخيص والتبني الطبي.",
    description:
      "We connect ventures directly with regional and global pharmaceutical leaders, structuring licensing deals, co-development agreements, and pilot adoption frameworks.",
    descriptionAr:
      "نربط المشاريع مباشرة بكبرى شركات الأدوية الإقليمية والعالمية، لصياغة صفقات الترخيص واتفاقيات التطوير المشترك وتسهيل التبني التجاري.",
    deliverable: "Biopharma Deal Term Sheet & Market Entry Model",
    deliverableAr: "نموذج دخول السوق وشروط اتفاقيات الترخيص الدوائي",
    tags: [
      "Pharma Partnership Matching",
      "Out-Licensing Strategy",
      "Indication Prioritization",
      "Reimbursement Frameworks",
    ],
    tagsAr: [
      "مطابقة الشراكات مع شركات الأدوية",
      "استراتيجيات منح التراخيص",
      "تحديد أولويات الدواعي العلاجية",
      "نماذج التسعير والتغطية التأمينية",
    ],
    telemetry: {
      metric1: { label: "Pharma Access", labelAr: "شبكة الشركاء", value: "Top Tier Direct" },
      metric2: { label: "Route to Market", labelAr: "الهدف التجاري", value: "License & Spin-Out" },
      badge: "Commercial Channel Active",
      badgeAr: "قنوات السوق مفعلة",
    },
  },
  {
    key: "investment",
    icon: Landmark,
    image: "/images/ai_drug_lab.jpg",
    phase: "PHASE 06",
    phaseAr: "المرحلة 06",
    title: "Investment Readiness & Syndicate Access",
    titleAr: "الجاهزية للاستثمار وشبكات التمويل",
    subtitle: "Preparing deep-tech ventures to engage institutional capital with confidence.",
    subtitleAr: "إعداد المشاريع العلمية المتقدمة لجولات التمويل المؤسسي بثقة.",
    description:
      "We build institutional-grade data rooms, cap table strategies, financial models, and milestone roadmaps, introducing validated ventures directly to specialized bio-tech VCs.",
    descriptionAr:
      "نبني غرف بيانات متكاملة، ونماذج مالية احترافية، وهياكل حصص متزنة، ونربط المشاريع المعتمدة مباشرة بصناديق الاستثمار الجريء المتخصصة.",
    deliverable: "Institutional Pitch Deck, Financial Model & Syndicate Intro",
    deliverableAr: "عرض استثماري مؤسسي ونموذج مالي وربط مباشر بالمستثمرين",
    tags: [
      "Cap Table Optimization",
      "Institutional Pitch Coaching",
      "Target Investor Syndicate",
      "Due Diligence Data Room",
    ],
    tagsAr: [
      "تحسين جدول الحصص الاستثماري",
      "تدريب احترافي على العروض",
      "شبكات مستثمرين متخصصين",
      "غرفة بيانات التدقيق الاستثماري",
    ],
    telemetry: {
      metric1: { label: "Target Stage", labelAr: "المرحلة المستهدفة", value: "Pre-Seed → Series A" },
      metric2: { label: "Investor Network", labelAr: "شبكة الصناديق", value: "DeepTech VCs" },
      badge: "Investor-Ready Certified",
      badgeAr: "جاهزية استثمارية معتمدة",
    },
  },
  {
    key: "ecosystem",
    icon: Network,
    image: "/images/biotech_innovation.jpg",
    phase: "PHASE 07",
    phaseAr: "المرحلة 07",
    title: "Ecosystem Connections & Global Alliances",
    titleAr: "ربط المنظومة والتحالفات الدولية",
    subtitle: "Uniting universities, CROs, clinicians, and government leadership.",
    subtitleAr: "توحيد الجامعات ومراكز الأبحاث والأطباء والقيادات الحكومية.",
    description:
      "AIDIA acts as the central connective tissue linking Saudi universities, international research powerhouses, clinical trials networks, industry mentors, and sovereign health initiatives.",
    descriptionAr:
      "تعمل مسرعة AIDIA كحلقة وصل استراتيجية تربط الجامعات السعودية، والمراكز البحثية العالمية، وشبكات التجارب السريرية، مع مبادرات الصحة الوطنية.",
    deliverable: "Multilateral Ecosystem Collaboration Agreement",
    deliverableAr: "اتفاقيات تعاون متعددة الأطراف وشبكات تحالف استراتيجي",
    tags: [
      "Academic Spinout Channels",
      "Clinical Trial Networks",
      "Global Mentor Council",
      "National Biotech Alignment",
    ],
    tagsAr: [
      "قنوات ترخيص الأبحاث الجامعية",
      "شبكات التجارب السريرية",
      "مجلس المرشدين الدولي",
      "التوافق مع الاستراتيجية الوطنية",
    ],
    telemetry: {
      metric1: { label: "Alliance Reach", labelAr: "شبكة التحالفات", value: "50+ Global Entities" },
      metric2: { label: "Mentor Council", labelAr: "مجلس الخبراء", value: "World-Class Experts" },
      badge: "Ecosystem Integrated",
      badgeAr: "منظومة متكاملة وشاملة",
    },
  },
];

export default function WhatWeDoEngine() {
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-flow every 5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CAPABILITIES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const active = CAPABILITIES[activeIdx];
  const Icon = active.icon;

  const nextStep = () => {
    setActiveIdx((prev) => (prev + 1) % CAPABILITIES.length);
    setIsPaused(true);
  };

  const prevStep = () => {
    setActiveIdx((prev) => (prev - 1 + CAPABILITIES.length) % CAPABILITIES.length);
    setIsPaused(true);
  };

  return (
    <div
      className="mx-auto mt-12 max-w-7xl px-4 sm:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Futuristic Translational Pipeline Rail (Zero Scrollbar - 100% Balanced & Visible) */}
      <div className="relative mb-6 rounded-2xl border border-border/80 bg-card/70 p-2 backdrop-blur-xl shadow-soft">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {CAPABILITIES.map((item, idx) => {
            const ItemIcon = item.icon;
            const isSelected = activeIdx === idx;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  setIsPaused(true);
                }}
                className={`group relative flex flex-col items-center justify-center rounded-xl px-2 py-3 text-center transition-all duration-300 ${
                  isSelected
                    ? "text-white shadow-md"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                }`}
              >
                {/* Luminous Active Slider Pill */}
                {isSelected && (
                  <motion.div
                    layoutId="what-engine-active-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo via-indigo/90 to-sky-600 shadow-glow shadow-indigo/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Top Row: Milestone Number & Icon */}
                <div className="relative z-10 flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[10px] font-bold tracking-wider ${
                      isSelected ? "text-white/90" : "text-indigo dark:text-indigo-400"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <ItemIcon
                    className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 ${
                      isSelected ? "text-white" : "text-muted-foreground group-hover:text-indigo"
                    }`}
                  />
                </div>

                {/* Bottom Row: Title */}
                <span
                  className={`relative z-10 mt-1 text-[11px] sm:text-xs font-bold tracking-tight leading-snug line-clamp-1 w-full text-center ${
                    isSelected ? "text-white" : "text-foreground/80 group-hover:text-foreground"
                  }`}
                >
                  {t(`home.what.${item.key}.t`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Panoramic Interactive Command Center (Single Unified Cockpit) */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-card via-card to-secondary/30 shadow-lift backdrop-blur-xl dark:border-border/80 dark:bg-gradient-to-b dark:from-card/95 dark:via-card/75 dark:to-navy-950/90 dark:shadow-2xl">
        {/* Ambient Top Glow Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo/50 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12 items-center"
          >
            {/* Left Column: Operational Blueprint & Strategy (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-start">
              <div>
                {/* Stage Tag & Live Status Beacon */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-indigo/30 bg-indigo/10 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-indigo dark:text-indigo-300 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-indigo animate-pulse" />
                    {rtl ? active.phaseAr : active.phase} • {t("home.whatKicker")}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {activeIdx + 1} / {CAPABILITIES.length}
                  </span>
                </div>

                {/* Massive Title */}
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {rtl ? active.titleAr : active.title}
                </h3>

                {/* Subtitle / Promise */}
                <p className="mt-2 text-base font-medium text-indigo dark:text-indigo-300">
                  {rtl ? active.subtitleAr : active.subtitle}
                </p>

                {/* Comprehensive Narrative */}
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {rtl ? active.descriptionAr : active.description}
                </p>
              </div>

              {/* Execution Matrix / Core Deliverables (Interactive Glass Tags) */}
              <div className="space-y-3 pt-2">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {rtl ? "مخرجات وركائز التنفيذ" : "EXECUTION CAPABILITIES & SCOPE"}
                </p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {(rtl ? active.tagsAr : active.tags).map((tag, tIdx) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: tIdx * 0.06 + 0.1 }}
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-card/90 px-3.5 py-2.5 text-xs font-semibold text-foreground shadow-soft backdrop-blur-sm transition-colors hover:border-indigo/40 hover:bg-secondary/70 dark:bg-secondary/40 dark:border-border/70"
                    >
                      <Zap className="h-3.5 w-3.5 shrink-0 text-indigo dark:text-indigo-400" />
                      <span className="leading-snug">{tag}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Output Strip & Direct Fast-Action */}
              <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between border-t border-border">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-mint-600 dark:text-mint shrink-0" />
                  <span className="text-xs font-medium text-muted-foreground">
                    <strong className="font-semibold text-foreground">
                      {rtl ? "المخرج الرئيسي: " : "Core Deliverable: "}
                    </strong>
                    {rtl ? active.deliverableAr : active.deliverable}
                  </span>
                </div>
                <Link
                  to="/submit-technology"
                  className="group inline-flex items-center gap-2 text-xs font-bold text-indigo transition-colors hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-foreground shrink-0"
                >
                  <span>{rtl ? "استشر فريق المسرّعة" : "Engage On This"}</span>
                  <ArrowRight
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      rtl ? "-scale-x-100 group-hover:-translate-x-1" : "group-hover:translate-x-1"
                    }`}
                  />
                </Link>
              </div>
            </div>

            {/* Right Column: Holographic Bio-Telemetry Stage (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative overflow-hidden rounded-2xl border border-border/80 shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
                {/* Dynamic Lab Photography Background */}
                <motion.img
                  key={active.image}
                  src={active.image}
                  alt={rtl ? active.titleAr : active.title}
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="h-full w-full object-cover"
                />

                {/* Dark Vignette & Sci-Fi Ambient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
                <div className="absolute inset-0 bg-indigo-950/20 mix-blend-color" />

                {/* Radar Grid Scanline */}
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="pointer-events-none absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-indigo/20 to-transparent blur-[1px]"
                />

                {/* Top Telemetry Floating Chip */}
                <div className="absolute top-4 start-4 end-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[10px] font-bold text-white backdrop-blur-md shadow-soft">
                    <Activity className="h-3 w-3 text-mint animate-pulse" />
                    {rtl ? active.telemetry.badgeAr : active.telemetry.badge}
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[10px] font-bold text-white/80 backdrop-blur-md">
                    LIVE TELEMETRY
                  </span>
                </div>

                {/* Bottom Telemetry Metrics Glass Deck */}
                <div className="absolute bottom-4 start-4 end-4 grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-white/15 bg-black/65 p-3 backdrop-blur-md">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">
                      {rtl ? active.telemetry.metric1.labelAr : active.telemetry.metric1.label}
                    </p>
                    <p className="mt-1 font-mono text-sm font-bold text-white sm:text-base">
                      {active.telemetry.metric1.value}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-black/65 p-3 backdrop-blur-md">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">
                      {rtl ? active.telemetry.metric2.labelAr : active.telemetry.metric2.label}
                    </p>
                    <p className="mt-1 font-mono text-sm font-bold text-mint sm:text-base">
                      {active.telemetry.metric2.value}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Controls & Auto-Flow Status */}
              <div className="mt-4 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-mint-600 dark:bg-mint animate-pulse" />
                  <span className="font-mono text-[11px] font-medium text-muted-foreground">
                    {isPaused
                      ? rtl
                        ? "متوقف للتصفح"
                        : "Paused on interaction"
                      : rtl
                      ? "تدفق تلقائي مستمر"
                      : "Auto-pilot active"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevStep}
                    aria-label="Previous capability"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-foreground shadow-soft transition-colors hover:border-indigo/50 hover:bg-secondary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    aria-label="Next capability"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-foreground shadow-soft transition-colors hover:border-indigo/50 hover:bg-secondary"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Synchronized Progress Line */}
        <div className="h-1 w-full bg-border/40 overflow-hidden">
          <motion.div
            key={`${activeIdx}-${isPaused}`}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? "100%" : "100%" }}
            transition={isPaused ? { duration: 0 } : { duration: 5.5, ease: "linear" }}
            className="h-full bg-gradient-to-r from-indigo via-sky-400 to-mint"
          />
        </div>
      </div>
    </div>
  );
}
