import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        cyan: "rgb(var(--color-cyan) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        // Slightly lifted neutrals: same hue family as default slate, a touch lighter/softer
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#d6dfec",
          400: "#a9b8d0",
          500: "#8394af",
          600: "#53647f",
          700: "#3d4e70",
          800: "#2a3857",
          900: "#182340",
          950: "#0b1226",
        },
        violet: {
          400: "#b197fc",
          500: "#9a6ff7",
          600: "#8b5cf6",
          700: "#7c3aed",
        },
        neon: {
          violet: "#8b5cf6",
          cyan: "#00f5ff",
          purple: "#c084fc",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-violet": "0 0 35px -5px rgba(139, 92, 246, 0.45)",
        "glow-cyan": "0 0 35px -5px rgba(0, 245, 255, 0.45)",
        "glass-card": "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.08)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse-slow": "spin-reverse 25s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 5s ease-in-out infinite",
      },
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
