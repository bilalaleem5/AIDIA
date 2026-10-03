import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Microscope,
  BrainCircuit,
  Pill,
  Dna,
  Users,
  FileBadge,
  BriefcaseBusiness,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Atom,
} from "lucide-react";

interface DisciplineData {
  key: string;
  icon: any;
  angleDeg: number;
  role: string;
  roleAr: string;
  synthesis: string;
  synthesisAr: string;
  metric: string;
  metricAr: string;
  gradient: string;
  glowColor: string;
}

const DISCIPLINES: DisciplineData[] = [
  {
    key: "science",
    icon: Microscope,
    angleDeg: -90, // 12 o'clock (Top)
    role: "Scientific Discovery & Rigor",
    roleAr: "الاستكشاف العلمي الرصين",
    synthesis:
      "Peer-reviewed biological discovery, disease target validation, and deep empirical evidence from premier research institutions.",
    synthesisAr:
      "اكتشافات بيولوجية محكمة، والتحقق من الأهداف المرضية، وأدلة علمية عميقة من كبرى المؤسسات البحثية.",
    metric: "TRL 1–3 Validation",
    metricAr: "جاهزية مخبرية TRL 1-3",
    gradient: "from-sky-500 to-indigo-600",
    glowColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    key: "ai",
    icon: BrainCircuit,
    angleDeg: -45, // 1:30 (Top-Right)
    role: "Computational Intelligence",
    roleAr: "الذكاء الحوسبي التوليدي",
    synthesis:
      "Generative molecular screening, binding affinity neural prediction, and multi-omics deep learning pipeline acceleration.",
    synthesisAr:
      "تصميم الجزيئات بالذكاء الاصطناعي، ونمذجة قوى الارتباط، وخوارزميات تحليل البيانات الحيوية المتعددة.",
    metric: "100x Discovery Speed",
    metricAr: "تسريع الاكتشاف 100 ضعف",
    gradient: "from-indigo-500 to-purple-600",
    glowColor: "rgba(99, 102, 241, 0.5)",
  },
  {
    key: "pharma",
    icon: Pill,
    angleDeg: 0, // 3 o'clock (Right)
    role: "Therapeutic Formulation",
    roleAr: "الصياغة والتطوير الدوائي",
    synthesis:
      "Translating in silico hits into stable, deliverable pharmaceutical candidates with rigorous pharmacokinetic and GMP roadmaps.",
    synthesisAr:
      "تحويل النتائج الحوسبية إلى مركبات علاجية مستقرة، وتوصيف الحركية الدوائية، وخطط التصنيع المعتمدة.",
    metric: "Clinical-Grade Standards",
    metricAr: "معايير سريرية معتمدة",
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.45)",
  },
  {
    key: "biotech",
    icon: Dna,
    angleDeg: 45, // 4:30 (Bottom-Right)
    role: "Experimental Biology",
    roleAr: "الهندسة الحيوية المتقدمة",
    synthesis:
      "Synthetic biology, recombinant protein engineering, and high-throughput cellular screening assays for physical proof.",
    synthesisAr:
      "البيولوجيا التركيبية، وهندسة البروتينات المؤتلفة، وفحوصات الخلايا عالية الإنتاجية للإثبات التجريبي.",
    metric: "Wet-Lab Proof",
    metricAr: "تحقق مخبري واقعي",
    gradient: "from-teal-400 to-emerald-500",
    glowColor: "rgba(45, 212, 191, 0.45)",
  },
  {
    key: "entrepreneurship",
    icon: Users,
    angleDeg: 90, // 6 o'clock (Bottom)
    role: "Venture Architecture",
    roleAr: "بناء وتأسيس الشركات",
    synthesis:
      "Empowering scientific principal investigators to evolve into venture founders backed by experienced operators.",
    synthesisAr:
      "تمكين الباحثين والعلماء ليصبحوا رواد أعمال استثنائيين بدعم من مشغلي شركات متمرسين.",
    metric: "Founder-Led Ventures",
    metricAr: "شركات يقودها العلماء",
    gradient: "from-amber-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.45)",
  },
  {
    key: "ip",
    icon: FileBadge,
    angleDeg: 135, // 7:30 (Bottom-Left)
    role: "Defensive IP Strategy",
    roleAr: "حماية الملكية الفكرية",
    synthesis:
      "Global patent claims, composition-of-matter architecture, and worldwide Freedom-to-Operate clearance.",
    synthesisAr:
      "هندسة براءات الاختراع الدولية، وحماية التركيبات الكيميائية، وتأمين حرية العمل التجاري عالمياً.",
    metric: "Global Patent Moats",
    metricAr: "حماية براءات عالمية",
    gradient: "from-emerald-400 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.45)",
  },
  {
    key: "industry",
    icon: BriefcaseBusiness,
    angleDeg: 180, // 9 o'clock (Left)
    role: "Commercial Adoption",
    roleAr: "التبني التجاري والشراكات",
    synthesis:
      "Direct alliances with multinational pharmaceutical leaders, co-development terms, and pilot adoption frameworks.",
    synthesisAr:
      "تحالفات مباشرة مع كبرى شركات الأدوية العالمية، واتفاقيات التطوير المشترك وتسهيل التبني.",
    metric: "Commercial Scale",
    metricAr: "توسع تجاري مباشر",
    gradient: "from-purple-500 to-pink-600",
    glowColor: "rgba(168, 85, 247, 0.45)",
  },
  {
    key: "investment",
    icon: TrendingUp,
    angleDeg: 225, // 10:30 (Top-Left)
    role: "Capital Syndication",
    roleAr: "رأس المال الاستثماري الجريء",
    synthesis:
      "Catalyzing specialized deep-tech, healthcare, and life-sciences venture capital syndicates for accelerated growth.",
    synthesisAr:
      "حشد صناديق الاستثمار الجريء المتخصصة في التقنية الحيوية لتسريع جولات التمويل والنمو.",
    metric: "Series A Syndicates",
    metricAr: "جولات تمويل استثماري",
    gradient: "from-rose-500 to-indigo-600",
    glowColor: "rgba(244, 63, 94, 0.45)",
  },
];

export default function ConvergenceCore() {
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isConvergedMode, setIsConvergedMode] = useState(false);

  // Auto-orbit every 4.0s (4s) when not paused and not in manual full-convergence mode
  useEffect(() => {
    if (isPaused || isConvergedMode) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % DISCIPLINES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, isConvergedMode]);

  const active = DISCIPLINES[activeIdx];
  const ActiveIcon = active.icon;

  // Center coordinate math for SVG filaments
  const centerX = 250;
  const centerY = 250;
  const orbitRadius = 190;

  return (
    <div
      className="mx-auto mt-8 max-w-5xl px-4 select-none sm:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Interactive Mode Switcher */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo/10 text-indigo shadow-soft dark:bg-indigo/20 dark:text-indigo-300">
            <Atom className="h-4 w-4 animate-spin-slow" />
          </span>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-indigo dark:text-indigo-300">
              {rtl ? "محرك الاندماج المعرفي" : "SYNTHESIS ENGINE"}
            </p>
            <p className="text-xs font-semibold text-foreground">
              {isConvergedMode
                ? rtl
                  ? "نمط الاندماج الشامل (8 تخصصات متصلة)"
                  : "All 8 Disciplines Converged"
                : rtl
                ? `${active.roleAr} • نشط الآن`
                : `${active.role} • Active`}
            </p>
          </div>
        </div>

        {/* Toggle Full Convergence Mode */}
        <button
          type="button"
          onClick={() => {
            setIsConvergedMode(!isConvergedMode);
            setIsPaused(true);
          }}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-300 shadow-soft ${
            isConvergedMode
              ? "bg-gradient-to-r from-indigo via-sky-500 to-mint text-white shadow-glow shadow-indigo/30"
              : "border border-border bg-card text-foreground hover:border-indigo/40 hover:bg-secondary"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>
            {isConvergedMode
              ? rtl
                ? "العودة للوضع التفاعلي الفردي"
                : "Single Focus Mode"
              : rtl
              ? "✨ تفعيل الاندماج الشامل للـ 8 تخصصات"
              : "✨ Synthesize All 8 Together"}
          </span>
        </button>
      </div>

      {/* ================= DESKTOP ORBITAL NEXUS ================= */}
      <div className="relative mx-auto hidden h-[540px] w-full max-w-[620px] items-center justify-center md:flex">
        {/* SVG Laser Filaments Canvas */}
        <svg
          viewBox="0 0 500 500"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            {/* Luminous Gradients */}
            <linearGradient id="coreBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>

            {/* Orbit Perimeter Track */}
            <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(99,102,241,0.25)" />
              <stop offset="70%" stopColor="rgba(56,189,248,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Ambient Center Glow */}
          <circle cx="250" cy="250" r="160" fill="url(#haloGlow)" />

          {/* Base Orbital Track */}
          <circle
            cx="250"
            cy="250"
            r={orbitRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="text-border/60 dark:text-border/30"
          />

          {/* 8 Energy Synaptic Filaments Connecting Each Node to Central Nucleus */}
          {DISCIPLINES.map((d, i) => {
            const rad = (d.angleDeg * Math.PI) / 180;
            const x = centerX + orbitRadius * Math.cos(rad);
            const y = centerY + orbitRadius * Math.sin(rad);
            const isTarget = isConvergedMode || activeIdx === i;

            return (
              <g key={d.key}>
                {/* Passive Guide Filament */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={isTarget ? 2 : 1}
                  className={
                    isTarget
                      ? "text-indigo-400/80 dark:text-indigo-400"
                      : "text-border/40 dark:text-border/20"
                  }
                />

                {/* Active Luminous Laser Pulse with Animated Particle */}
                {isTarget && (
                  <>
                    <motion.line
                      x1={x}
                      y1={y}
                      x2={centerX}
                      y2={centerY}
                      stroke="url(#coreBeamGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                    />

                    {/* Animated Photon Bullet streaming into the Nucleus */}
                    <motion.circle
                      r="4"
                      fill="#ffffff"
                      animate={{
                        cx: [x, centerX],
                        cy: [y, centerY],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.15,
                      }}
                      className="drop-shadow-[0_0_6px_#38bdf8]"
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* 8 Satellite Waypoint Nodes (Arranged on the 360° Orbit) */}
        {DISCIPLINES.map((d, i) => {
          const rad = (d.angleDeg * Math.PI) / 180;
          // Percentage positioning: 50% + radius in %
          // 190px in 500px SVG is 38%
          const xPct = 50 + 38 * Math.cos(rad);
          const yPct = 50 + 38 * Math.sin(rad);
          const IconComponent = d.icon;
          const isSelected = activeIdx === i;
          const isGlowing = isConvergedMode || isSelected;

          return (
            <div
              key={d.key}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
            >
              <button
                type="button"
                onClick={() => {
                  setActiveIdx(i);
                  setIsConvergedMode(false);
                  setIsPaused(true);
                }}
                className="group relative flex flex-col items-center focus:outline-none"
                aria-label={t(`home.why.${d.key}`)}
              >
                {/* Orbital Node Circle */}
                <div className="relative">
                  <span
                    className={`grid h-13 w-13 place-items-center rounded-full border-2 transition-all duration-300 ${
                      isSelected
                        ? "scale-120 border-indigo bg-card text-indigo shadow-[0_0_26px_rgba(99,102,241,0.6)] ring-4 ring-indigo/25 dark:text-indigo-300"
                        : isGlowing
                        ? "scale-110 border-sky-400/80 bg-card text-sky-500 shadow-soft"
                        : "border-border bg-card text-muted-foreground shadow-soft hover:scale-110 hover:border-indigo/50 hover:text-foreground"
                    }`}
                  >
                    <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </span>

                  {/* Pulsing Active Ring */}
                  {isSelected && (
                    <motion.span
                      layoutId="orbital-active-ring"
                      className="pointer-events-none absolute -inset-2 rounded-full border-2 border-indigo/60 animate-pulse"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </div>

                {/* Floating Node Label */}
                <span
                  className={`mt-2 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[10px] font-bold tracking-tight transition-all duration-200 ${
                    isSelected
                      ? "bg-indigo text-white shadow-soft"
                      : isGlowing
                      ? "bg-secondary text-foreground font-semibold"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                  dir="auto"
                >
                  {t(`home.why.${d.key}`)}
                </span>
              </button>
            </div>
          );
        })}

        {/* Central Convergence Holographic Nucleus */}
        <div className="relative z-30 flex h-60 w-60 items-center justify-center rounded-full border border-border/80 bg-card/90 p-6 text-center shadow-2xl backdrop-blur-2xl dark:border-indigo/40 dark:bg-card/95 dark:shadow-[0_0_60px_rgba(99,102,241,0.25)]">
          {/* Subtle Ambient Spin Ring */}
          <div className="pointer-events-none absolute -inset-3 rounded-full border border-indigo/30 border-dashed animate-spin-slow opacity-60" />

          <AnimatePresence mode="wait">
            {isConvergedMode ? (
              <motion.div
                key="converged"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo via-sky-400 to-mint text-white shadow-glow shadow-mint/30">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-indigo dark:text-indigo-300">
                  {rtl ? "النموذج المتكامل" : "UNIFIED PIPELINE"}
                </p>
                <p className="text-sm font-extrabold tracking-tight text-foreground sm:text-[15px]">
                  {rtl ? "8 تخصصات في مسار واحد" : "8 Disciplines. 1 Engine."}
                </p>
                <p className="text-[11px] leading-tight text-muted-foreground">
                  {rtl
                    ? "تقليص المسافة بين الاكتشاف العلمي والتطبيق الواقعي."
                    : "Zero gap between science and clinical reality."}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={active.key}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex flex-col items-center justify-center space-y-2 text-center"
              >
                {/* Active Discipline Icon */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr ${active.gradient} text-white shadow-glow shadow-indigo/30`}
                >
                  <ActiveIcon className="h-5 w-5" />
                </div>

                {/* Subtitle / Role Tag */}
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-indigo dark:text-indigo-300">
                  {rtl ? active.roleAr : active.role}
                </span>

                {/* Discipline Name */}
                <h4 className="text-base font-extrabold tracking-tight text-foreground">
                  {t(`home.why.${active.key}`)}
                </h4>

                {/* Synthesis Deliverable */}
                <p className="line-clamp-2 px-1 text-[11px] leading-snug text-muted-foreground">
                  {rtl ? active.synthesisAr : active.synthesis}
                </p>

                {/* Metric Badge */}
                <span className="inline-flex items-center gap-1 rounded-full border border-mint/40 bg-mint/10 px-2.5 py-0.5 font-mono text-[9px] font-bold text-mint-600 dark:text-mint">
                  <CheckCircle2 className="h-3 w-3" />
                  {rtl ? active.metricAr : active.metric}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= MOBILE / TABLET INTERACTIVE CONSTELLATION ================= */}
      <div className="space-y-4 md:hidden">
        {/* Mobile Synapse Hub Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lift text-start">
          <div className="flex items-start gap-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr ${active.gradient} text-white shadow-soft`}
            >
              <ActiveIcon className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-indigo dark:text-indigo-300">
                {rtl ? active.roleAr : active.role}
              </span>
              <h4 className="mt-0.5 text-lg font-bold text-foreground">
                {t(`home.why.${active.key}`)}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {rtl ? active.synthesisAr : active.synthesis}
              </p>
              <div className="mt-2.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-mint/40 bg-mint/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-mint-600 dark:text-mint">
                  <CheckCircle2 className="h-3 w-3" />
                  {rtl ? active.metricAr : active.metric}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile 8 Discipline Trigger Grid (Touch Friendly) */}
        <div className="grid grid-cols-4 gap-2">
          {DISCIPLINES.map((d, i) => {
            const IconComp = d.icon;
            const isSel = activeIdx === i;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => {
                  setActiveIdx(i);
                  setIsPaused(true);
                }}
                className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition-all ${
                  isSel
                    ? "border-2 border-indigo bg-indigo/10 text-indigo shadow-soft dark:text-indigo-300"
                    : "border border-border bg-card text-muted-foreground hover:bg-secondary"
                }`}
              >
                <IconComp className="h-4 w-4" />
                <span className="mt-1 font-mono text-[9px] font-bold truncate w-full">
                  {t(`home.why.${d.key}`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Synchronized Quote Callout at Bottom */}
      <div className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-base sm:text-lg font-medium italic leading-relaxed text-muted-foreground">
          “{t("home.whyClosing")}”
        </p>
      </div>
    </div>
  );
}
