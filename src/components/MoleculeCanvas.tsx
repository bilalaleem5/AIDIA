import { useEffect, useRef } from "react";

/**
 * Molecule / network-node canvas background.
 * Particles drift slowly; lines connect nearby nodes; the whole field
 * parallaxes toward the pointer. Disabled under prefers-reduced-motion.
 */
export default function MoleculeCanvas({ className = "", density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let pts: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor(((w * h) / 22000) * density);
      pts = Array.from({ length: Math.max(18, Math.min(count, 90)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.8 + 0.9,
        hue: Math.random(),
      }));
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };

    const dark = () => document.documentElement.classList.contains("dark");
    const THRESH = 130;

    const tick = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      const px = (mouse.x - 0.5) * 26;
      const py = (mouse.y - 0.5) * 26;

      ctx.clearRect(0, 0, w, h);
      const isDark = dark();
      const node = isDark ? "75, 79, 191" : "75, 79, 191";
      const mintC = "45, 212, 167";

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < THRESH) {
            const alpha = (1 - dist / THRESH) * (isDark ? 0.35 : 0.22);
            ctx.strokeStyle = `rgba(${node},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x + px * 0.4, a.y + py * 0.4);
            ctx.lineTo(b.x + px * 0.4, b.y + py * 0.4);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const c = p.hue > 0.86 ? mintC : node;
        ctx.fillStyle = `rgba(${c},${isDark ? 0.75 : 0.55})`;
        ctx.beginPath();
        ctx.arc(p.x + px * 0.4, p.y + py * 0.4, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [density]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
