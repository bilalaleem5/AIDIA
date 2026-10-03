import { Reveal } from "./Reveal";

export function Kicker({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-indigo">
      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
      {children}
    </span>
  );
}

export default function SectionHeading({
  kicker,
  title,
  sub,
  align = "center",
  dark = false,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  align?: "center" | "start";
  dark?: boolean;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-start";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {kicker && (
        <Reveal>
          <Kicker>{kicker}</Kicker>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2
          className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] ${
            dark ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-white/65" : "text-muted-foreground"}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
