import { useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, FlaskConical, Layers, Search } from "lucide-react";
import { CATEGORY_KEYS, PROGRAM_KEYS } from "@/lib/data";

export default function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const pages = useMemo(
    () => [
      { k: "nav.accelerator", to: "/accelerator" },
      { k: "nav.applyNow", to: "/apply" },
      { k: "nav.menu.submitTech", to: "/submit-technology" },
      { k: "nav.programs", to: "/programs" },
      { k: "nav.investors", to: "/investors" },
      { k: "nav.partners", to: "/partners" },
      { k: "nav.about", to: "/about" },
    ],
    []
  );

  const go = (to: string) => {
    onClose();
    navigate(to);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-navy-950/45 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover shadow-lift"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={t("search.title")}
          >
            <Command shouldFilter>
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder={t("search.placeholder")}
                  className="h-13 w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <kbd className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
              </div>
              <Command.List className="max-h-[46vh] overflow-y-auto p-2">
                <Command.Empty className="py-10 text-center text-sm text-muted-foreground">{t("search.empty")}</Command.Empty>
                <Command.Group heading={t("search.groups.pages")} className="text-[11px] font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                  {pages.map((p) => (
                    <Command.Item
                      key={p.to}
                      value={`${t(p.k)} ${p.to}`}
                      onSelect={() => go(p.to)}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground aria-selected:bg-secondary"
                    >
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      {t(p.k)}
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading={t("search.groups.programs")} className="text-[11px] font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                  {PROGRAM_KEYS.map((p) => (
                    <Command.Item
                      key={p}
                      value={t(`programsData.${p}.name`)}
                      onSelect={() => go(`/programs/${p}`)}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground aria-selected:bg-secondary"
                    >
                      <FlaskConical className="h-4 w-4 text-indigo" />
                      {t(`programsData.${p}.name`)}
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading={t("search.groups.categories")} className="text-[11px] font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                  {CATEGORY_KEYS.map((c) => (
                    <Command.Item
                      key={c}
                      value={t(`categories.${c}.t`)}
                      onSelect={() => go("/programs")}
                      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground aria-selected:bg-secondary"
                    >
                      <Building2 className="h-4 w-4 text-mint-600" />
                      {t(`categories.${c}.t`)}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
              <div className="border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">{t("search.hint")}</div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
