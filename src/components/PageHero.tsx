import { motion, useReducedMotion } from "framer-motion";
import { Kicker } from "@/components/SectionHeading";
import type { ReactNode } from "react";

/** Consistent inner-page hero. */
export default function PageHero({
  kicker,
  title,
  sub,
  children,
}: {
  kicker: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="mesh-hero relative overflow-hidden border-b border-border pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(ellipse_40%_50%_at_85%_20%,rgba(75,79,191,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <Kicker>{kicker}</Kicker>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {sub && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{sub}</p>}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
