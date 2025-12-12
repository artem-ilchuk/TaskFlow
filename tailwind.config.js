/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  safelist: [
    { pattern: /p-\[\d+(\.\d+)?rem\]/ },
    { pattern: /(sm|md|lg|xl):p-\[\d+(\.\d+)?rem\]/ },
    {
      pattern: /^(gap|col-span)-/,
    },
    {
      pattern: /^(sm|md|lg|xl):gap-/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
