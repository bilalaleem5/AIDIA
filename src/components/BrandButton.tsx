import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Variant = "primary" | "secondary" | "ghost" | "navy" | "white";

const STYLES: Record<Variant, string> = {
  primary: "bg-indigo text-white shadow-soft hover:shadow-glow",
  secondary: "border border-border bg-card text-foreground hover:border-indigo/40 hover:bg-secondary",
  ghost: "text-muted-foreground hover:text-foreground",
  navy: "bg-navy-800 text-white hover:bg-navy-700",
  white: "bg-white text-navy-800 hover:bg-indigo-50",
};

export function BrandButton({
  to,
  children,
  variant = "primary",
  className = "",
  arrow = true,
  pulse = false,
  onClick,
  type,
}: {
  to?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  pulse?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const { i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  const inner = (
    <>
      <span className="swap-a">
        {children}
        {arrow && <ArrowRight className={`h-4 w-4 ${rtl ? "-scale-x-100" : ""}`} aria-hidden />}
      </span>
      <span className="swap-b" aria-hidden>
        {children}
        {arrow && <ArrowRight className={`h-4 w-4 ${rtl ? "-scale-x-100" : ""}`} />}
      </span>
    </>
  );
  const cls = `btn-swap inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${STYLES[variant]} ${
    pulse ? "animate-pulse-ring" : ""
  } ${className}`;

  const content = (
    <motion.span className="inline-block" whileTap={{ scale: 0.98 }}>
      {to ? (
        <Link to={to} className={cls}>
          {inner}
        </Link>
      ) : (
        <button type={type ?? "button"} onClick={onClick} className={cls}>
          {inner}
        </button>
      )}
    </motion.span>
  );
  return content;
}
