import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en";
import { ar } from "./ar";

const stored = typeof window !== "undefined" ? localStorage.getItem("aidia-lang") : null;
const initial = stored === "ar" || stored === "en" ? stored : "en";

i18n.use(initReactI18next).init({
  resources: { en, ar },
  lng: initial,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export function applyDir(lng: string) {
  const dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
}

applyDir(initial);

export function setLanguage(lng: "en" | "ar") {
  i18n.changeLanguage(lng);
  localStorage.setItem("aidia-lang", lng);
  applyDir(lng);
}

export default i18n;
