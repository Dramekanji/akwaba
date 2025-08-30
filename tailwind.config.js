/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#214f7a" },
      container: {
        center: true,
        padding: "1rem",
        screens: { lg: "1024px", xl: "1200px", "2xl": "1400px" },
      },
    },
  },
  plugins: [],
};
