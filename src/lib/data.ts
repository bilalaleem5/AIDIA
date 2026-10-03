export const CATEGORY_KEYS = [
  "ai-drug-discovery",
  "biomedical-ai",
  "pharma-tech",
  "biotechnology",
  "digital-health",
  "biomedical-data",
  "ai-models",
  "diagnostics",
  "spin-offs",
] as const;

export const PROGRAM_KEYS = [
  "accelerator-program",
  "pre-accelerator",
  "research-to-startup",
  "ai-drug-discovery-program",
  "corporate-innovation",
] as const;

export const PROGRAM_BADGES: Record<string, string> = {
  "accelerator-program": "P01",
  "pre-accelerator": "P02",
  "research-to-startup": "P03",
  "ai-drug-discovery-program": "P04",
  "corporate-innovation": "P05",
};

export const CATEGORY_BADGES: Record<string, string> = {
  "ai-drug-discovery": "C01",
  "biomedical-ai": "C02",
  "pharma-tech": "C03",
  biotechnology: "C04",
  "digital-health": "C05",
  "biomedical-data": "C06",
  "ai-models": "C07",
  diagnostics: "C08",
  "spin-offs": "C09",
};

export type NavItem = { labelKey: string; to: string };

export const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.about", to: "/about" },
  { labelKey: "nav.accelerator", to: "/accelerator" },
  { labelKey: "nav.programs", to: "/programs" },
  { labelKey: "nav.investors", to: "/investors" },
  { labelKey: "nav.partners", to: "/partners" },
  { labelKey: "nav.contact", to: "/contact" },
];

export const LEGAL_PAGES = [
  { slug: "privacy-policy", key: "privacy" },
  { slug: "terms-of-use", key: "terms" },
  { slug: "application-terms", key: "applicationTerms" },
  { slug: "investor-disclaimer", key: "investorDisclaimer" },
  { slug: "intellectual-property-notice", key: "ipNotice" },
  { slug: "accessibility", key: "accessibility" },
] as const;

export function refNumber() {
  const d = new Date();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AIDIA-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}-${rand}`;
}
