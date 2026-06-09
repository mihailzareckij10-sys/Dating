import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0c0c11",
          900: "#111118",
          850: "#161620",
          800: "#1c1c28",
          700: "#262633",
          600: "#33333f",
        },
        brand: {
          DEFAULT: "#ff4d76",
          50: "#fff1f5",
          400: "#ff6f91",
          500: "#ff4d76",
          600: "#ed2d5c",
        },
        verify: "#3da4ff",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 28px -12px rgba(0,0,0,0.55)",
        glow: "0 8px 30px -8px rgba(255,77,118,0.45)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.2s linear infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
