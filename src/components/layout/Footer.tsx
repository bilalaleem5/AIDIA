import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { LEGAL_PAGES } from "@/lib/data";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const cols: { title: string; links: { label: string; to: string }[] }[] = [
    {
      title: t("footer.accelerator"),
      links: [
        { label: t("nav.menu.ourModel"), to: "/accelerator" },
        { label: t("nav.menu.whatWeAccelerate"), to: "/#what-we-accelerate" },
        { label: t("nav.programs"), to: "/programs" },
      ],
    },
    {
      title: t("footer.apply"),
      links: [
        { label: t("nav.applyNow"), to: "/apply" },
        { label: t("nav.menu.submitTech"), to: "/submit-technology" },
      ],
    },
    {
      title: t("footer.ecosystem"),
      links: [
        { label: t("nav.investors"), to: "/investors" },
        { label: t("nav.partners"), to: "/partners" },
        { label: t("nav.menu.mentorsExperts"), to: "/partners#mentors" },
      ],
    },
    {
      title: t("footer.about"),
      links: [
        { label: t("nav.about"), to: "/about" },
        { label: t("nav.menu.institutionalRelationship"), to: "/about#institutional-relationship" },
        { label: t("nav.menu.contact"), to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card text-foreground transition-colors dark:border-white/10 dark:bg-navy-900 dark:text-white">
      {/* Subtle Ambient Radial Highlight */}
      <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-40 [background:radial-gradient(ellipse_50%_60%_at_80%_0%,rgba(75,79,191,0.25),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3.5">
              <img
                src="/images/Logo.png"
                alt="AIDIA"
                className="h-14 sm:h-16 w-auto max-h-[64px] object-contain drop-shadow-sm"
              />
              <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground dark:text-white">
                AIDIA
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground dark:text-white/60">
              {t("footer.tagline")}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70 dark:text-white/40">
              {t("brand.location")}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 dark:text-white/40">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to + l.label}>
                      <Link
                        to={l.to}
                        className="text-[13px] text-muted-foreground transition-colors hover:text-foreground dark:text-white/65 dark:hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal + institutional */}
        <div className="mt-14 border-t border-border pt-8 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 dark:text-white/40">
              {t("footer.legal")}
            </span>
            {LEGAL_PAGES.map((p) => (
              <Link
                key={p.slug}
                to={`/legal/${p.slug}`}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground dark:text-white/55 dark:hover:text-white"
              >
                {t(`legal.pages.${p.key}`)}
              </Link>
            ))}
          </div>

          {/* Sub-footer Row with ZetaMize AI Attribution */}
          <div className="mt-6 flex flex-col gap-3 text-xs text-muted-foreground dark:text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {t("footer.within")}{" "}
              <a href="#" className="text-indigo hover:underline dark:text-indigo-300">
                {t("brand.society")}
              </a>
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <p>{t("footer.copyright", { year })}</p>
              <span className="hidden sm:inline text-border dark:text-white/20">•</span>
              <p className="flex items-center gap-1.5 font-medium">
                <span>Made by</span>
                <a
                  href="https://zetamize.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-indigo transition-colors hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-white hover:underline"
                >
                  ZetaMize AI
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
