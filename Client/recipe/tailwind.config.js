/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js, jsx, ts, tsx}"],
  theme: {
    extend: {
      fontFamily : {
          customFont: ['"SF Pro Text"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
}