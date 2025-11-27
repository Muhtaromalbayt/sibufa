import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1E3A8A",
                "primary-light": "#3B82F6",
                accent: "#D4AF37",
                surface: "#FFFFFF",
                "surface-alt": "#F3F4F6",
                "text-main": "#111827",
                "text-sub": "#4B5563",
                danger: "#DC2626",
                success: "#059669",
                // GSM Colors mapped
                "gsm-blue": "#2875b7",
                "gsm-red": "#ba2f55",
                "gsm-green": "#83b5a3",
                "gsm-gold": "#fae6af",
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
                heading: ["var(--font-poppins)"],
            },
        },
    },
    plugins: [],
};
export default config;
