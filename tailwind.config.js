/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // keyframes: {
      //   slideInFromLeft: {
      //     "0%": { opacity: "0", transform: "translateX(-100%)" },
      //     "100%": { opacity: "1", transform: "translateX(0)" },
      //   },
      // },
      // animation: {
      //   slideInFromLeft: "slideInFromLeft 0.5s ease forwards",
      // },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none", // Chrome, Safari, Opera
        },
      });
    },
  ],
};
