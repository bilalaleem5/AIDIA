import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FlaskConical, Cpu, ClipboardCheck, BadgeCheck, FileBadge } from "lucide-react";

const NODE_ICONS = [FlaskConical, Cpu, ClipboardCheck, BadgeCheck, FileBadge];
const KEYS = ["research", "technology", "assessment", "validation", "ip"] as const;

// Perfectly calibrated horizontal milestones with subtle, elegant S-wave journey
// All 5 nodes sit on the horizontal equator (y = 37.5% = 75px in 200px container)
const MILESTONE_POSITIONS = [
  { key: "research", xPct: 9 },
  { key: "technology", xPct: 29.5 },
  { key: "assessment", xPct: 50 },
  { key: "validation", xPct: 70.5 },
  { key: "ip", xPct: 91 },
] as const;

// Smooth sinusoidal roadmap curve that enters and exits each node with dy=0 (horizontal tangent)
// P0=(90, 75), P1=(295, 75), P2=(500, 75), P3=(705, 75), P4=(910, 75)
// Crests at y=55 (-20px gentle arch), Valleys at y=95 (+20px gentle dip)
const ROAD_CURVE_D =
  "M 90 75 " +
  "C 141.25 75, 141.25 55, 192.5 55 C 243.75 55, 243.75 75, 295 75 " +
  "C 346.25 75, 346.25 95, 397.5 95 C 448.75 95, 448.75 75, 500 75 " +
  "C 551.25 75, 551.25 55, 602.5 55 C 653.75 55, 653.75 75, 705 75 " +
  "C 756.25 75, 756.25 95, 807.5 95 C 858.75 95, 858.75 75, 910 75";

export default function PathwayModel() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const reduce = useReducedMotion();

  // Smooth auto-flow every 4 seconds when in view and not paused
  useEffect(() => {
    if (isPaused || !inView || reduce) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % KEYS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, inView, reduce]);

  const handleSelect = (index: number) => {
    setActive(index);
    setIsPaused(true);
    const timeout = setTimeout(() => setIsPaused(false), 8000);
    return () => clearTimeout(timeout);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setActive((a) => (a + 1) % KEYS.length);
      setIsPaused(true);
    }
    if (e.key === "ArrowLeft") {
      setActive((a) => (a - 1 + KEYS.length) % KEYS.length);
      setIsPaused(true);
    }
  };

  return (
    <div
      ref={ref}
      onKeyDown={onKey}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="group"
      aria-label={t("home.modelTitle")}
      tabIndex={-1}
      className="outline-none"
    >
      {/* Desktop / Tablet Winding Roadmap Pathway */}
      <div className="relative mx-auto hidden max-w-5xl md:block h-[200px] w-full px-4 select-none">
        {/* SVG Curved Roadmap Canvas */}
        <svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            {/* Luminous Active Gradient */}
            <linearGradient id="roadmapActiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>

            {/* Ambient Glow */}
            <linearGradient id="roadmapSoftGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
              <stop offset="50%" stopColor="rgba(56,189,248,0.3)" />
              <stop offset="100%" stopColor="rgba(45,212,167,0.3)" />
            </linearGradient>
          </defs>

          {/* Base Inactive Curved Guide Track */}
          <path
            d={ROAD_CURVE_D}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-border/70 dark:text-border/40"
          />

          {/* Active Glowing Progress Path */}
          <motion.path
            d={ROAD_CURVE_D}
            fill="none"
            stroke="url(#roadmapActiveGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: active / (KEYS.length - 1) }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]"
          />

          {/* Active Soft Neon Halo along Progress */}
          <motion.path
            d={ROAD_CURVE_D}
            fill="none"
            stroke="url(#roadmapSoftGlow)"
            strokeWidth="10"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: active / (KEYS.length - 1) }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="opacity-40 blur-[3px]"
          />
        </svg>

        {/* 5 Perfectly Leveled Milestone Nodes */}
        <div className="relative h-full w-full" dir="ltr">
          {MILESTONE_POSITIONS.map((pos, i) => {
            const k = pos.key;
            const Icon = NODE_ICONS[i];
            const isActive = active === i;
            const isCompleted = i < active;

            return (
              <div
                key={k}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.xPct}%`, top: "37.5%" }}
              >
                <button
                  type="button"
                  onClick={() => handleSelect(i)}
                  className="group relative flex flex-col items-center focus:outline-none"
                  aria-pressed={isActive}
                  aria-label={t(`home.model.${k}.t`)}
                >
                  {/* Milestone Circle (Centered on Road at y=37.5%) */}
                  <div className="relative">
                    <span
                      className={`grid h-16 w-16 place-items-center rounded-full border-2 bg-card transition-all duration-300 lg:h-18 lg:w-18 ${
                        isActive
                          ? "scale-110 border-indigo shadow-glow shadow-indigo/40 dark:shadow-[0_0_26px_rgba(99,102,241,0.65)] ring-4 ring-indigo/20"
                          : isCompleted
                          ? "border-mint/70 bg-mint/10 text-mint-600 dark:text-mint shadow-[0_0_12px_rgba(45,212,167,0.35)]"
                          : "border-border shadow-soft group-hover:border-indigo/50 group-hover:shadow-lift"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 transition-colors lg:h-7 lg:w-7 ${
                          isActive
                            ? "text-indigo dark:text-indigo-300"
                            : isCompleted
                            ? "text-mint-600 dark:text-mint"
                            : "text-muted-foreground group-hover:text-indigo"
                        }`}
                      />
                    </span>

                    {/* Active Luminous Pulsing Halo */}
                    {isActive && (
                      <motion.span
                        layoutId="pathway-ring"
                        className="pointer-events-none absolute -inset-2.5 rounded-full border-2 border-indigo/60 dark:border-indigo/40 animate-pulse"
                        transition={{ type: "spring", stiffness: 340, damping: 28 }}
                      />
                    )}
                  </div>

                  {/* Evenly Leveled Milestone Text Labels */}
                  <div
                    className="absolute top-full mt-3.5 flex w-36 flex-col items-center text-center pointer-events-none"
                    dir="auto"
                  >
                    <span
                      className={`font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
                        isActive
                          ? "text-indigo dark:text-indigo-300 font-extrabold"
                          : isCompleted
                          ? "text-mint-600 dark:text-mint"
                          : "text-muted-foreground"
                      }`}
                      style={{ direction: "ltr" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-0.5 text-sm font-bold tracking-tight transition-colors lg:text-[15px] ${
                        isActive
                          ? "text-foreground font-extrabold"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {t(`home.model.${k}.t`)}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Stepper (Synced with Auto-Flow) */}
      <div className="relative space-y-2 md:hidden">
        <div className="absolute bottom-6 start-8 top-6 w-0.5 border-s-2 border-dashed border-border" aria-hidden />

        <motion.div
          className="absolute start-8 top-6 w-0.5 origin-top bg-gradient-to-b from-indigo via-sky-400 to-mint shadow-[0_0_10px_rgba(45,212,167,0.7)]"
          initial={false}
          animate={{ height: `${(active / (KEYS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-hidden="true"
        />

        {KEYS.map((k, i) => {
          const Icon = NODE_ICONS[i];
          const isActive = active === i;
          const isCompleted = i < active;

          return (
            <div key={k} className="relative">
              <button
                type="button"
                onClick={() => handleSelect(i)}
                aria-expanded={isActive}
                className="flex w-full items-center gap-4 rounded-2xl p-3 text-start transition-colors hover:bg-secondary/60"
              >
                <span
                  className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 bg-card transition-all ${
                    isActive
                      ? "border-indigo shadow-glow shadow-indigo/30 ring-2 ring-indigo/20"
                      : isCompleted
                      ? "border-mint/60 bg-mint/5"
                      : "border-border"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive
                        ? "text-indigo dark:text-indigo-300"
                        : isCompleted
                        ? "text-mint-600 dark:text-mint"
                        : "text-muted-foreground"
                    }`}
                  />
                </span>
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`block text-sm font-bold ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {t(`home.model.${k}.t`)}
                  </span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-3 ps-14 pe-4 text-sm leading-relaxed text-muted-foreground">
                      {t(`home.model.${k}.d`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Synchronized Stage Briefing Panel with 4s Progress Indicator */}
      <div className="mt-8 hidden md:block" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-lift text-start"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo/10 text-indigo shadow-soft dark:bg-indigo/20 dark:text-indigo-300">
                {(() => {
                  const Icon = NODE_ICONS[active];
                  return <Icon className="h-6 w-6" />;
                })()}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-indigo dark:text-indigo-300">
                    {String(active + 1).padStart(2, "0")} — {t(`home.model.${KEYS[active]}.t`)}
                  </p>
                  <span className="font-mono text-[10px] text-muted-foreground/70">
                    {active + 1} / {KEYS.length}
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {t(`home.model.${KEYS[active]}.d`)}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground/70">
                  <span>{t("home.modelHint")}</span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-mint-600 dark:text-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
                    {isPaused ? (t("common.paused") || "Paused on focus") : "Auto-flow active"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom 4-second auto-cycle countdown progress bar */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-border/40 overflow-hidden">
              <motion.div
                key={`${active}-${isPaused}`}
                initial={{ width: "0%" }}
                animate={{ width: isPaused ? "100%" : "100%" }}
                transition={isPaused ? { duration: 0 } : { duration: 4, ease: "linear" }}
                className="h-full bg-gradient-to-r from-indigo via-sky-400 to-mint"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
