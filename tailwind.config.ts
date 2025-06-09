import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // النظام اللوني الموحد - لا مساومة
        "cosmic-void": "#0f0f1a",
        eventHorizon: "#1a1a2e",
        "primary-gold": "#D4AF37",
        "primary-goldLight": "#F4E4BC",
        "primary-goldDark": "#A67C00",
        "neutron-star": "#4e008e",
        "supernova-red": "#DC143C",
        "quantum-blue": "#1E3A8A",

        // Shadcn UI variables mapped to cosmic system
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        cosmic:
          "0 10px 25px rgba(212, 175, 55, 0.2), 0 5px 10px rgba(78, 0, 142, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1)",
        stellar: "0 4px 20px rgba(212, 175, 55, 0.3)",
        void: "0 8px 32px rgba(0, 0, 0, 0.6)",
      },
      keyframes: {
        // حركات كمية محسوبة
        "cosmic-glow": {
          "0%": {
            textShadow: "0 0 10px #D4AF37, 0 0 20px #D4AF37, 0 0 30px #D4AF37",
            filter: "brightness(1)",
          },
          "100%": {
            textShadow: "0 0 20px #D4AF37, 0 0 30px #D4AF37, 0 0 40px #A67C00",
            filter: "brightness(1.2)",
          },
        },
        "stellar-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.8)" },
        },
        "quantum-entrance": {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "cosmic-glow": "cosmic-glow 2s ease-in-out infinite alternate",
        "stellar-pulse": "stellar-pulse 1.5s ease-in-out infinite",
        "quantum-entrance": "quantum-entrance 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
