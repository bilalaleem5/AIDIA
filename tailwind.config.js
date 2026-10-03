/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand tokens
        indigo: {
          DEFAULT: "#4B4FBF",
          50: "#ECEEFA",
          100: "#DADCF2",
          200: "#B6BBE6",
          300: "#8F96D8",
          400: "#6A6FC9",
          500: "#4B4FBF",
          600: "#3C3FA3",
          700: "#2F3184",
          800: "#242666",
          900: "#1A1C4A",
        },
        navy: {
          DEFAULT: "#0B1B4D",
          50: "#E8ECF7",
          100: "#C4CFEA",
          600: "#16307A",
          700: "#102463",
          800: "#0B1B4D",
          900: "#081335",
          950: "#050C24",
        },
        mint: {
          DEFAULT: "#2DD4A7",
          50: "#E6FAF4",
          600: "#1FAE87",
        },
        ink: "#0F1222",
        paper: "#FAFAF8",
        hairline: "#E3E5F2",
      },
      fontFamily: {
        sans: ["Inter", "'IBM Plex Sans Arabic'", "system-ui", "sans-serif"],
        arabic: ["'IBM Plex Sans Arabic'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        "2xl": "16px",
        xl: "12px",
        lg: "10px",
        md: "8px",
        sm: "6px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,27,77,0.04), 0 4px 16px rgba(11,27,77,0.06)",
        lift: "0 2px 4px rgba(11,27,77,0.05), 0 12px 32px rgba(11,27,77,0.12)",
        glow: "0 0 0 1px rgba(75,79,191,0.2), 0 8px 32px rgba(75,79,191,0.25)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-rtl": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(75,79,191,0.45)" },
          "70%": { boxShadow: "0 0 0 12px rgba(75,79,191,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(75,79,191,0)" },
        },
        "scroll-cue": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        "marquee-slow": "marquee 55s linear infinite",
        "marquee-rtl": "marquee-rtl 36s linear infinite",
        "pulse-ring": "pulse-ring 6s cubic-bezier(0.4,0,0.6,1) infinite",
        "scroll-cue": "scroll-cue 2.2s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
