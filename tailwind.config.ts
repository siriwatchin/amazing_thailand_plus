import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Trust tier pills — light theme
    "bg-emerald-100", "text-emerald-800",
    "bg-amber-100",   "text-amber-800",
    "bg-orange-100",  "text-orange-800",
    "bg-teal-100",    "text-teal-800",
  ],
  theme: {
    extend: {
      colors: {
        // ── Light theme backgrounds ──────────────────────────────
        page: {
          DEFAULT: "#F5EDD6",   // warm parchment — main bg
          raised:  "#EDD9B0",   // slightly darker sections
        },
        surface: {
          DEFAULT: "#FBF6EE",   // elevated cards
          raised:  "#F5EDD6",
        },
        // Primary text on light bg
        ink: {
          DEFAULT: "#1A2E16",   // deep forest — primary
        },

        // ── Accent colours ────────────────────────────────────────
        jungle: { DEFAULT: "#2D5A3D", light: "#3D7A55" },
        earth:  { DEFAULT: "#B5511F", light: "#C96A30", dark: "#8C3D14" },
        gold:   { DEFAULT: "#C9922A", dark:  "#A8731A" },
        river:  { DEFAULT: "#1A8A7A" },
        canopy: { DEFAULT: "#4A8C5C" },
        terracotta: { DEFAULT: "#C4652A" },
        // ── Thai festival accents ─────────────────────────────────
        lotus:  { DEFAULT: "#D6447A", light: "#E76A98", dark: "#A8325E" }, // ชมพูบัว — Songkran/Loi Krathong
        jade:   { DEFAULT: "#0E8A6E", light: "#13A685" },                  // หยกไทย — temple jade, vibrant nature
        ruby:   { DEFAULT: "#9A1B2F" },                                    // ทับทิม — royal accent

        // ── Backward-compat aliases ───────────────────────────────
        // All bg-navy / bg-forest now resolve to light parchment
        navy: {
          DEFAULT: "#F5EDD6",
          800:     "#FBF6EE",
          700:     "#EDD9B0",
        },
        forest: {
          DEFAULT: "#F5EDD6",
          800:     "#FBF6EE",
          700:     "#EDD9B0",
        },
        // text-mist now resolves to dark ink (inverted for light mode)
        mist: { DEFAULT: "#1A2E16" },
        parchment: { DEFAULT: "#1A2E16" },

        // Functional
        trust:     { DEFAULT: "#1A8A7A" },
        expert:    { DEFAULT: "#4A8C5C" },
        community: { DEFAULT: "#C4652A" },
      },

      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
      },

      backgroundImage: {
        // Hero — warm sunrise over temple / golden hour parchment
        "gradient-hero":    "linear-gradient(180deg, #EDD9B0 0%, #F5EDD6 55%, #F5EDD6 100%)",
        // Accent
        "gradient-jungle":  "linear-gradient(135deg, #2D5A3D 0%, #1A2E16 100%)",
        "gradient-gold":    "linear-gradient(90deg, #C9922A, #C4742A)",
        "gradient-earth":   "linear-gradient(90deg, #C9922A, #C4742A)",
        // Sections — alternate between surface shades
        "gradient-section": "linear-gradient(180deg, #F5EDD6 0%, #EDD9B0 50%, #F5EDD6 100%)",
        "gradient-card":    "linear-gradient(135deg, #FBF6EE 0%, #F5EDD6 100%)",
        // Passport header — keep dark/rich for the physical passport feel
        "gradient-purple":  "linear-gradient(135deg, #2D5A3D 0%, #1A2E16 100%)",
      },

      keyframes: {
        "float-up": {
          "0%":   { transform: "translateY(0px) rotate(0deg)", opacity: "0.5" },
          "50%":  { transform: "translateY(-20px) rotate(5deg)", opacity: "0.8" },
          "100%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.5" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(201,146,42,0.15)" },
          "50%":       { boxShadow: "0 0 30px rgba(201,146,42,0.4)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "stamp-in": {
          "0%":   { transform: "scale(0) rotate(-15deg)", opacity: "0" },
          "60%":  { transform: "scale(1.15) rotate(3deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "typing-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "stamp-collect": {
          "0%":   { transform: "scale(1)" },
          "30%":  { transform: "scale(1.3) rotate(-8deg)" },
          "60%":  { transform: "scale(0.9) rotate(4deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
      },

      animation: {
        "float-up":      "float-up 5s ease-in-out infinite",
        "pulse-glow":    "pulse-glow 2.5s ease-in-out infinite",
        "fade-up":       "fade-up 0.8s ease-out forwards",
        "stamp-in":      "stamp-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "typing-cursor": "typing-cursor 1s step-end infinite",
        "shimmer":       "shimmer 3s linear infinite",
        "stamp-collect": "stamp-collect 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
      },

      boxShadow: {
        "card":       "0 2px 16px rgba(26,46,22,0.08), 0 1px 4px rgba(26,46,22,0.05)",
        "card-hover": "0 8px 32px rgba(26,46,22,0.12), 0 2px 8px rgba(201,146,42,0.12)",
        "gold-glow":  "0 0 32px rgba(201,146,42,0.35)",
        "stamp-glow": "0 0 16px rgba(201,146,42,0.45)",
        "card-glow":  "0 4px 24px rgba(181,81,31,0.18), 0 1px 6px rgba(26,46,22,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
