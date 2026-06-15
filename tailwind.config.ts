import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1f2723",
        paper: "#f6f1e8",
        moss: "#58735c",
        coral: "#bd5b4a",
        steel: "#49677a",
        gold: "#b8842d"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(31, 39, 35, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
