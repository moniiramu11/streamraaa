/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          950: '#0a1929',
          900: '#0f2942',
          800: '#164063',
          700: '#1e5180',
          600: '#2563a0',
          500: '#3373b4',
          400: '#4a8cc9',
          300: '#6ba5d9',
          200: '#9cc3e8',
          100: '#cde1f5',
        },
      },
    },
  },
  plugins: [],
};