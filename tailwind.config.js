export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bangla: ["'Tiro Bangla'", "sans-serif"],
        roboto: ["'Roboto'", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
