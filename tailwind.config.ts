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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Basely brand colors
        purple: "#6C63FF",
        pink: "#FF00A0",
        cyan: "#00FFF0",
        navy: "#0A001A",
      },
    },
  },
  plugins: [],
};
export default config;
