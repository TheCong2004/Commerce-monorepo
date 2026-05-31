import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      // KHAI BÁO CÁC MỐC MÀN HÌNH TẠI ĐÂY
      screens: {
        xm: { max: "519px" },
        sm: { min: "520px", max: "767px" },
        md: { min: "768px", max: "999px" },
        ml: { min: "1000px", max: "1199px" },
        lg: { min: "888px", max: "1365px" },
        xl: { min: "1366px", max: "1599px" },
        xxl: "1600px",
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      boxShadow: {
       'glass-inset': 'inset 0 17px 5px -9px rgba(254, 254, 91, 0.05)',
       'glass-sm': ' 5px 5px 20px 0px rgba(254, 254, 91, 0.3)',
      },
    }
  },
  plugins: [],
};
export default config;