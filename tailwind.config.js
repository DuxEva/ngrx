/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        redhat: ["redhat", "sans-serif"],
      },
      keyframes: {
        "scale-up": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "scale-up": "scale-up 300ms ease-out forwards",
      },
      colors: {
        red: {
          1: "#C73B0F",
        },
        rose: {
          900: "#260F08",
          500: "#87635A",
          400: "#AD8A85",
          300: "#CAAFA7",
          100: "Rose-100",
          50: "#FCF8F6",
        },
        green: {
          1: "#1EA575",
        },
      },
    },
  },
  plugins: [],
};
