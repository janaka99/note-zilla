import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          100: "var(--background-100)",
          500: "var(--background-500)",
        },
        primary: {
          100: "var(--primary-100)",
          500: "var(--primary-500)",
        },
        secondary: {
          100: "var(--secondary-100)",
          500: "var(--secondary-500)",
        },
        accent: {
          100: "var(--accent-100)",
          500: "var(--accent-500)",
        },
      },
      fontFamily: {
        script: ["Style Script", "cursive"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
