import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="0"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3" />
    </svg>
  );
}

export default function Contact() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      toast.success(isAr ? "تم نسخ رقم الهاتف إلى الحافظة" : "Phone number copied to clipboard!");
      setTimeout(() => setCopiedPhone(false), 2500);
    } else {
      setCopiedEmail(text);
      toast.success(isAr ? `تم نسخ البريد الإلكتروني (${text})` : `Email (${text}) copied to clipboard!`);
      setTimeout(() => setCopiedEmail(null), 2500);
    }
  };

  const emailChannels = [
    {
      role: isAr ? "الاستفسارات العامة والمركز الرئيسي" : "General & Executive Inquiries",
      email: "info@aidia.sa",
      desc: isAr ? "للتواصل العام، الإعلام، والشؤون المؤسسية" : "For overall program inquiries, media & corporate governance",
    },
    {
      role: isAr ? "التقديم على برنامج المسرّعة" : "Accelerator & Admissions",
      email: "apply@aidia.sa",
      desc: isAr ? "لاستفسارات الشركات الناشئة ورواد الأعمال المتقدمين" : "Support for cohort applications, eligibility & screening criteria",
    },
    {
      role: isAr ? "تقديم الأبحاث والتقنيات" : "Research & Tech Submissions",
      email: "tech@aidia.sa",
      desc: isAr ? "للعلماء والباحثين وأصحاب براءات الاختراع الحيوية" : "Direct channel for PIs, scientists & university tech transfer offices",
    },
    {
      role: isAr ? "علاقات المستثمرين وصناديق رأس المال" : "Investor Relations & VCs",
      email: "investors@aidia.sa",
      desc: isAr ? "لصناديق الاستثمار الجريء، المكاتب العائلية، والشركاء الماليين" : "Accredited investors, VC syndicates & co-investment opportunities",
    },
    {
      role: isAr ? "الشراكات المؤسسية وشبكة المرشدين" : "Partnerships & Mentorship",
      email: "partners@aidia.sa",
      desc: isAr ? "للمستشفيات، مراكز الحوسبة الفائقة، والخبراء السريريين" : "Clinical sandboxes, compute clusters & industry advisory network",
    },
  ];

  const portals = [
    {
      title: isAr ? "تقديم طلب المسرّعة" : "Apply to Cohort",
      to: "/apply",
      desc: isAr ? "بوابة التقديم الرسمية للشركات الناشئة في الذكاء الاصطناعي الحيوي" : "12-16 week intensive venture building with up to $250k initial funding",
    },
    {
      title: isAr ? "تقديم بحث أو تقنية" : "Submit Technology",
      to: "/submit-technology",
      desc: isAr ? "للعلماء والجامعات لتحويل براءات الاختراع إلى شركات تجارية" : "Confidential IP submission for scientists & institutional researchers",
    },
    {
      title: isAr ? "تسجيل المستثمرين" : "Investor Registration",
      to: "/investors",
      desc: isAr ? "للوصول إلى صفقات الدفعة وفرص الاستثمار المشترك" : "Accredited venture funds, sovereign entities & syndicate access",
    },
    {
      title: isAr ? "الشراكات والمرشدون" : "Partners & Mentors",
      to: "/partners",
      desc: isAr ? "للتعاون المؤسسي وتقديم الخبرة العلمية والسريرية" : "Translational pilots, DGX compute access & clinical validation",
    },
  ];

  return (
    <PageShell wide>
      <PageHero
        kicker={isAr ? "تواصل مباشر" : "DIRECT CONTACT"}
        title={isAr ? "تواصل مع فريق AIDIA" : "Connect With the AIDIA Team"}
        sub={
          isAr
            ? "نحن هنا للإجابة على استفساراتكم ومناقشة فرص التعاون والشراكة وتسريع الابتكار في الذكاء الاصطناعي الحيوي."
            : "Direct access for biotech founders, breakthrough scientists, sovereign partners, and accredited life-sciences investors."
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://wa.me/966505210112"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 text-sm font-bold shadow-soft transition-all hover:scale-105"
          >
            <WhatsAppIcon className="h-4 w-4 fill-white" />
            <span>{isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
          </a>
          <a
            href="mailto:info@aidia.sa"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 hover:bg-secondary px-5 py-2.5 text-sm font-semibold text-foreground transition-all"
          >
            <Mail className="h-4 w-4 text-indigo" />
            <span>info@aidia.sa</span>
          </a>
        </div>
      </PageHero>

      {/* Main Contact Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            
            {/* 1. Official WhatsApp Card */}
            <Reveal>
              <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-card via-card to-emerald-500/5 p-8 shadow-soft dark:border-emerald-400/20 dark:from-navy-900 dark:via-navy-900 dark:to-emerald-950/20 sm:p-10">
                <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      {isAr ? "خط واتساب الرسمي المباشر" : "Instant Messaging Channel"}
                    </span>
                    <WhatsAppIcon className="h-7 w-7 fill-[#25D366]" />
                  </div>

                  <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {isAr ? "تواصل فوري عبر واتساب" : "Direct WhatsApp Support"}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {isAr
                      ? "تواصل مباشرة مع قيادة المسرّعة ومديري المشاريع للاستفسارات السريعة، تقديم التقنيات، ومناقشة الشراكات."
                      : "Connect straight with the AIDIA accelerator leadership and venture directors for immediate responses and initial consultations."}
                  </p>

                  <div className="mt-8 rounded-2xl border border-border/80 bg-background/80 p-5 backdrop-blur">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isAr ? "رقم الهاتف المباشر" : "Direct WhatsApp Line"}
                    </p>
                    <p className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-foreground" dir="ltr">
                      +966 50 521 0112
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{isAr ? "الأحد – الخميس، 9:00 ص – 5:00 م بتوقيت مكة المكرمة" : "Sunday – Thursday, 9:00 AM – 5:00 PM AST"}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/966505210112"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-5 w-5 fill-white" />
                    <span>{isAr ? "بدء محادثة واتساب" : "Chat on WhatsApp"}</span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </a>

                  <button
                    type="button"
                    onClick={() => copyToClipboard("+966 50 521 0112", "phone")}
                    className="flex items-center justify-center gap-2 rounded-full border border-border bg-card hover:bg-secondary px-5 py-3.5 text-sm font-semibold text-foreground transition-all active:scale-[0.98]"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">{isAr ? "تم النسخ!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-muted-foreground" />
                        <span>{isAr ? "نسخ الرقم" : "Copy"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Reveal>

            {/* 2. Headquarters & Location Info Card */}
            <Reveal delay={0.1}>
              <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo/10 px-3 py-1 font-mono text-[11px] font-semibold text-indigo">
                      <Building2 className="h-3.5 w-3.5" />
                      {isAr ? "المقر الرئيسي والمنظومة" : "Headquarters & DeepTech Hub"}
                    </span>
                    <MapPin className="h-6 w-6 text-indigo" />
                  </div>

                  <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {isAr ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {isAr
                      ? "يقع مركز المسرّعة في قلب منظومة التقنية الحيوية والذكاء الاصطناعي الوطنية، متصلاً بالمستشفيات التخصصية والجامعات البحثية ومراكز الحوسبة السحابية."
                      : "Headquartered within the Kingdom's premier scientific & innovation district, directly connected with specialized hospitals, research universities, and DGX compute clusters."}
                  </p>

                  <div className="mt-8 space-y-3.5">
                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-3.5">
                      <MapPin className="h-5 w-5 shrink-0 text-indigo mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-foreground">{isAr ? "الموقع" : "Location"}</p>
                        <p className="text-xs text-muted-foreground">
                          {isAr ? "منطقة الرياض للابتكار والتقنيات الحيوية، الرياض، المملكة العربية السعودية" : "Riyadh DeepTech & Biotech Innovation Corridor, Riyadh, KSA"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-3.5">
                      <Clock className="h-5 w-5 shrink-0 text-indigo mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-foreground">{isAr ? "ساعات العمل الرسمية" : "Working Hours"}</p>
                        <p className="text-xs text-muted-foreground">
                          {isAr ? "الأحد – الخميس: 9:00 ص – 5:00 م (توقيت مكة المكرمة AST)" : "Sunday – Thursday: 9:00 AM – 5:00 PM (AST / UTC+3)"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-3.5">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-indigo mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-foreground">{isAr ? "حماية الملكية الفكرية والسرية" : "Governance & IP Safeguards"}</p>
                        <p className="text-xs text-muted-foreground">
                          {isAr ? "جميع الاتصالات والمناقشات محمية باتفاقيات عدم إفصاح صارمة (NDA)." : "Strict non-disclosure confidentiality agreements for all technology discussions."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/60">
                  <p className="text-xs text-muted-foreground">
                    {isAr
                      ? "لزيارة المقر أو الاجتماعات الحضورية، يرجى التنسيق المسبق عبر البريد الإلكتروني أو الواتساب."
                      : "For physical visits and on-site accelerator meetings, prior coordination via WhatsApp or email is required."}
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

          {/* 3. Official Email Inquiries Directory */}
          <div className="mt-16">
            <div className="text-center sm:text-start">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo">
                {isAr ? "دليل البريد الإلكتروني" : "EMAIL DIRECTORY"}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {isAr ? "قنوات البريد الإلكتروني المخصصة" : "Dedicated Department Inquiries"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isAr
                  ? "راسل الفريق المختص مباشرة لضمان أسرع وقت استجابة لاحتياجاتك."
                  : "Reach the dedicated team directly for prompt routing and institutional follow-up."}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {emailChannels.map((item, idx) => (
                <Reveal key={item.email} delay={idx * 0.05}>
                  <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-indigo/40 hover:shadow-lift">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-semibold text-indigo">
                          0{idx + 1}
                        </span>
                        <Mail className="h-4 w-4 text-indigo" />
                      </div>
                      <h3 className="mt-3 text-base font-bold text-foreground">{item.role}</h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between gap-2">
                      <a
                        href={`mailto:${item.email}`}
                        className="font-mono text-sm font-bold text-indigo hover:underline"
                        dir="ltr"
                      >
                        {item.email}
                      </a>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(item.email, "email")}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        title={isAr ? "نسخ البريد" : "Copy email"}
                      >
                        {copiedEmail === item.email ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* 4. Action Portals */}
          <div className="mt-16 rounded-3xl border border-border bg-secondary/20 p-8 sm:p-12">
            <div className="text-center">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo">
                {isAr ? "المسارات السريعة" : "FAST-TRACK PATHWAYS"}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {isAr ? "هل تبحث عن مسار محدد؟" : "Looking for a Specific Track?"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
                {isAr
                  ? "بدلاً من الاستفسار العام، يمكنك التقديم مباشرة عبر النماذج المتخصصة لمنظومة AIDIA."
                  : "Skip the generic inbox and fast-track your submission through our dedicated portals."}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {portals.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-indigo hover:shadow-lift"
                >
                  <div>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors flex items-center justify-between">
                      <span>{p.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/50 text-[11px] font-semibold text-indigo">
                    {isAr ? "فتح النموذج ←" : "Open portal →"}
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
