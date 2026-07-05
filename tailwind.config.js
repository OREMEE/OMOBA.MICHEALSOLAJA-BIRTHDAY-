/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B1428",
          2: "#101B33",
          3: "#152142",
        },
        cream: "#F6F1E4",
        gold: {
          DEFAULT: "#C9A458",
          light: "#E4C77E",
          deep: "#8A6E32",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        script: ["'Great Vibes'", "cursive"],
        body: ["'Cormorant Garamond'", "serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg,#E4C77E 0%,#C9A458 45%,#8A6E32 100%)",
        "ink-radial":
          "radial-gradient(120% 140% at 50% 0%, rgba(201,164,88,0.08), rgba(201,164,88,0) 60%)",
      },
      boxShadow: {
        gold: "0 8px 24px rgba(201,164,88,0.35)",
        "gold-lg": "0 20px 60px rgba(201,164,88,0.2)",
        card: "0 20px 60px rgba(0,0,0,0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-18px) translateX(8px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(14px) translateX(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "floatSlow 11s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};