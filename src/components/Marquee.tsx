import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

/** Infinite horizontal marquee, pause on hover, RTL-aware. */
export default function Marquee({
  children,
  slow = false,
  className = "",
}: {
  children: ReactNode;
  slow?: boolean;
  className?: string;
}) {
  const { i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  return (
    <div className={`marquee-track overflow-hidden ${className}`} dir="ltr">
      <div
        className={`flex w-max items-center gap-3 pe-3 ${
          rtl ? "animate-marquee-rtl" : slow ? "animate-marquee-slow" : "animate-marquee"
        }`}
        style={rtl ? { animationName: "marquee-rtl" } : undefined}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
