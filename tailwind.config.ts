import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1248px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        heading: ["Ubuntu", "system-ui", "sans-serif"],
        arefin: ["Poppins", "system-ui", "sans-serif"],
        "arefin-heading": ["Ubuntu", "Poppins", "system-ui", "sans-serif"],
      },
      // Fluid type ramp — backed by CSS vars in src/index.css :root.
      // Use these instead of text-2xl/3xl/4xl/etc. for headings + body.
      // Spec: Dr-Arefin-Spec/reviewer/10-typography-system.md
      fontSize: {
        "fluid-display": ["var(--fs-display)", { lineHeight: "var(--lh-display)", letterSpacing: "var(--ls-display)" }],
        "fluid-h1":      ["var(--fs-h1)",      { lineHeight: "var(--lh-h1)",      letterSpacing: "var(--ls-h1)" }],
        "fluid-h2":      ["var(--fs-h2)",      { lineHeight: "var(--lh-h2)",      letterSpacing: "var(--ls-h2)" }],
        "fluid-h3":      ["var(--fs-h3)",      { lineHeight: "var(--lh-h3)",      letterSpacing: "var(--ls-h3)" }],
        "fluid-h4":      ["var(--fs-h4)",      { lineHeight: "var(--lh-h4)",      letterSpacing: "var(--ls-h4)" }],
        "fluid-lede":    ["var(--fs-lede)",    { lineHeight: "var(--lh-lede)" }],
        "fluid-body":    ["var(--fs-body)",    { lineHeight: "var(--lh-body)" }],
        "fluid-small":   ["var(--fs-small)",   { lineHeight: "var(--lh-small)" }],
        "fluid-micro":   ["var(--fs-micro)",   { lineHeight: "1.4" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "body-text": "hsl(var(--body-text))",
        "muted-text": "hsl(var(--muted-text))",
        "highlight": "hsl(var(--highlight))",
        "brand-soft": "hsl(var(--brand-soft))",
        "bg-dark": "hsl(var(--bg-dark))",
        "bg-footer": "hsl(var(--bg-footer))",
        "cta-bg": "hsl(var(--cta-bg))",
        "surface": "hsl(var(--surface))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-card-in": {
          "0%": { opacity: "0", transform: "translateX(40px) scale(0.92)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(5%, 10%) scale(1.05)" },
          "66%": { transform: "translate(-3%, -5%) scale(0.97)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-8%, 5%) scale(1.08)" },
          "66%": { transform: "translate(4%, -8%) scale(0.95)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(6%, -6%) scale(1.03)" },
          "66%": { transform: "translate(-5%, 8%) scale(0.98)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "float-card-in": "float-card-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.5s both",
        "aurora-1": "aurora-1 8s ease-in-out infinite",
        "aurora-2": "aurora-2 10s ease-in-out infinite",
        "aurora-3": "aurora-3 12s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
