import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ConsentBanner() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("aidia-consent")) {
      const timer = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const decide = (v: "accepted" | "declined") => {
    localStorage.setItem("aidia-consent", v);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 start-4 z-[65] max-w-sm rounded-2xl border border-border bg-popover p-4 shadow-lift"
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="text-xs leading-relaxed text-muted-foreground">{t("consent.text")}</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => decide("accepted")}
              className="rounded-full bg-indigo px-4 py-1.5 text-xs font-semibold text-white transition-transform active:scale-95"
            >
              {t("consent.accept")}
            </button>
            <button
              onClick={() => decide("declined")}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("consent.decline")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
