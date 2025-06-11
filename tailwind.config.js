/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--border))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
      },
    },
  },
  plugins: [],
} 