import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#F97316",
          dark: "#ea6c10",
          light: "#fb923c",
        },
        brand: {
          bg: "#0A0E1A",
          bg2: "#0D1117",
          card: "#1F2937",
          border: "#374151",
          surface: "#111827",
        },
        cyan: {
          accent: "#00C2FF",
        },
        purple: {
          accent: "#8B5CF6",
        },
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        blob: "blob 7s infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        typewriter: "typewriter 3s steps(40) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #0A0E1A 0%, #0D1117 50%, #111827 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
