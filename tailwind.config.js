/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      bangla: ["'Noto Sans Bengali'", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
