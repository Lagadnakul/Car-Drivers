/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#10B981", // Emerald green as primary color
        secondary: "#1E293B", // Slate dark for secondary elements
        accent: "#F59E0B", // Amber for accent/highlight elements
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
        hover: "0 10px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};