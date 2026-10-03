import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NAV_ITEMS } from "@/lib/data";
import { setLanguage } from "@/i18n";

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3 sm:gap-3.5 pt-0.5" aria-label="AIDIA">
      <img
        src="/images/Logo.png"
        alt="AIDIA"
        className="h-12 sm:h-14 md:h-15 w-auto max-h-[58px] object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
      />
      <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
        AIDIA
      </span>
    </Link>
  );
}

export default function Navbar({ onOpenSearch }: { onOpenSearch?: () => void } = {}) {
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const lastY = useRef(0);
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 120 && y > lastY.current && !drawer);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [drawer]);

  useEffect(() => {
    setDrawer(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("aidia-theme", next ? "dark" : "light");
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/85 py-2.5 sm:py-3 shadow-soft backdrop-blur-xl"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 xl:gap-1.5 lg:flex" aria-label={t("nav.browseAll")}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.labelKey}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1.5">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="hidden h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:grid"
                aria-label={t("nav.search") || "Search"}
              >
                <Search className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="hidden h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:grid"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setLanguage(rtl ? "en" : "ar")}
              className="hidden h-9 items-center rounded-full border border-border px-3 font-mono text-[11px] font-medium text-muted-foreground transition-colors hover:border-indigo/40 hover:text-foreground sm:flex"
              aria-label="Switch language"
            >
              {rtl ? "EN" : "عربي"}
            </button>
            <Link
              to="/apply"
              className="hidden animate-pulse-ring items-center rounded-full bg-indigo px-4 py-2 text-[13px] font-semibold text-white shadow-soft transition-all hover:shadow-glow active:scale-[0.98] sm:inline-flex"
            >
              {t("nav.applyNow")}
            </Link>
            <button
              onClick={() => setDrawer(true)}
              className="grid h-9 w-9 place-items-center rounded-full text-foreground lg:hidden"
              aria-label={t("nav.openMenu")}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-navy-950/40 backdrop-blur-sm lg:hidden"
              onClick={() => setDrawer(false)}
            />
            <motion.div
              initial={{ x: rtl ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: rtl ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`fixed inset-y-0 z-[61] flex w-[86%] max-w-sm flex-col bg-background shadow-lift lg:hidden ${rtl ? "left-0" : "right-0"}`}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo />
                <button onClick={() => setDrawer(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary" aria-label={t("nav.closeMenu")}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {NAV_ITEMS.map((item) => (
                  <div key={item.labelKey} className="border-b border-border/60 py-1 last:border-0">
                    <Link
                      to={item.to}
                      onClick={() => setDrawer(false)}
                      className="block py-3 text-base font-semibold text-foreground transition-colors hover:text-indigo"
                    >
                      {t(item.labelKey)}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t border-border p-5">
                <Link
                  to="/apply"
                  className="flex w-full items-center justify-center rounded-full bg-indigo px-4 py-3 text-sm font-semibold text-white"
                >
                  {t("nav.applyNow")}
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage(rtl ? "en" : "ar")}
                    className="flex-1 rounded-full border border-border py-2.5 font-mono text-xs text-muted-foreground"
                  >
                    {rtl ? "English" : "العربية"}
                  </button>
                  <button onClick={toggleTheme} className="flex-1 rounded-full border border-border py-2.5 text-xs text-muted-foreground">
                    {dark ? "Light" : "Dark"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
