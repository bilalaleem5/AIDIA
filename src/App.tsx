import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchPalette from "@/components/SearchPalette";
import ConsentBanner from "@/components/ConsentBanner";
import Home from "@/pages/Home";
import Accelerator from "@/pages/Accelerator";
import Apply from "@/pages/Apply";
import SubmitTechnology from "@/pages/SubmitTechnology";
import { Programs, ProgramDetail } from "@/pages/Programs";
import { Investors } from "@/pages/Audiences";
import { Partners } from "@/pages/PartnersMentors";
import { About, LegalPage, NotFound } from "@/pages/AboutLegal";
import Contact from "@/pages/Contact";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("aidia-theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-indigo focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <Routes>
        {/* Core 9 Master Navigation Pages + Submit Technology */}
        <Route path="/" element={<Home />} />
        <Route path="/accelerator" element={<Accelerator />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/submit-technology" element={<SubmitTechnology />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Redirects for removed pages and legacy paths to keep links clean */}
        <Route path="/companies" element={<Navigate to="/" replace />} />
        <Route path="/researchers" element={<Navigate to="/submit-technology" replace />} />
        <Route path="/resources" element={<Navigate to="/" replace />} />
        <Route path="/batches" element={<Navigate to="/accelerator" replace />} />
        <Route path="/batches/:slug" element={<Navigate to="/accelerator" replace />} />
        <Route path="/demo-day" element={<Navigate to="/accelerator" replace />} />
        <Route path="/alumni" element={<Navigate to="/accelerator" replace />} />
        <Route path="/universities" element={<Navigate to="/submit-technology" replace />} />
        <Route path="/investor-registration" element={<Navigate to="/investors#register" replace />} />
        <Route path="/become-a-partner" element={<Navigate to="/partners#collaborate" replace />} />
        <Route path="/mentors" element={<Navigate to="/partners#mentors" replace />} />
        <Route path="/news" element={<Navigate to="/" replace />} />
        <Route path="/events" element={<Navigate to="/" replace />} />
        <Route path="/team" element={<Navigate to="/about#governance" replace />} />
        <Route path="/about/institutional-relationship" element={<Navigate to="/about#institutional-relationship" replace />} />

        {/* Legal & 404 */}
        <Route path="/legal/:slug" element={<LegalPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ConsentBanner />
      <Toaster position="bottom-center" richColors toastOptions={{ style: { borderRadius: "14px" } }} />
    </>
  );
}
