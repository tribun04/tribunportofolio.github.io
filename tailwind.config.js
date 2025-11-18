// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if you're using React, Vue, etc.
  ],
  darkMode: "class", // or 'media' if you prefer system default
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb", // blue-600
          light: "#3b82f6",   // blue-500
          dark: "#1e40af",    // blue-800
        },
        secondary: {
          DEFAULT: "#9333ea", // purple-600
          light: "#a855f7",
          dark: "#7e22ce",
        },
        accent: "#f59e0b", // amber-500
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.1)",
        glow: "0 0 15px rgba(37, 99, 235, 0.6)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [
    
  ],
};
