import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bd: {
          bg: "#070712",
          surface: "#10101f",
          elevated: "#17172b",
          border: "rgba(185, 160, 255, 0.16)",
          muted: "#a6a3bb",
          text: "#f7f4ff",
          purple: "#7c3aed",
          violet: "#a855f7",
          magenta: "#d946ef",
          cyan: "#22d3ee",
          success: "#34d399",
          warning: "#f59e0b",
          danger: "#fb7185"
        }
      },
      fontFamily: {
        sans: [
          "IBM Plex Sans Arabic",
          "Tajawal",
          "Cairo",
          "system-ui",
          "sans-serif"
        ]
      },
      boxShadow: {
        glow: "0 0 42px rgba(124, 58, 237, 0.28)",
        card: "0 18px 60px rgba(0, 0, 0, 0.26)"
      },
      backgroundImage: {
        "bd-gradient":
          "linear-gradient(135deg, #7c3aed 0%, #a855f7 48%, #d946ef 100%)",
        "bd-radial":
          "radial-gradient(circle at top, rgba(168, 85, 247, 0.18), transparent 36%)"
      },
      borderRadius: {
        bd: "8px"
      }
    }
  },
  plugins: []
};

export default config;
