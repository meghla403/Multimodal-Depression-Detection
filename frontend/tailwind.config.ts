import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22C55E",
        secondary: "#10B981",
        accent: "#4ADE80",
        surface: "#0A0A0A",
        "surface-2": "#141414",
        "surface-3": "#1F1F1F",
        border: "#262626",
        ink: "#F5F5F5",
        muted: "#A3A3A3",
        success: "#22C55E",
        danger: "#EF4444",
        warn: "#EAB308",
        brand: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(34, 197, 94, 0.25)",
        glow: "0 0 40px -8px rgba(34, 197, 94, 0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-100vw)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(100vw)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-down": "fade-down 0.7s ease-out both",
        "slide-in-left": "slide-in-left 0.8s ease-out both",
        "slide-in-right": "slide-in-right 0.8s ease-out both",
        float: "float 4s ease-in-out infinite",
        "spin-slow": "spin-slow 30s linear infinite",
        "spin-medium": "spin-slow 18s linear infinite",
        "spin-reverse": "spin-reverse 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
