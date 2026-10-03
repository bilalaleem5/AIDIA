import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Quick fade/slide page transition wrapper (200ms). */
export default function PageShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.main
      id="main"
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={wide ? "" : ""}
    >
      {children}
    </motion.main>
  );
}
