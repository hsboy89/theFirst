/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#4A90E2',
          orange: '#FF8C42',
          green: '#6BCF7E',
          purple: '#9B59B6',
        },
        secondary: {
          pink: '#FF6B9D',
          yellow: '#FFD93D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
