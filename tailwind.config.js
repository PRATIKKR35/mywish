/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#F9F5EA',
          200: '#F1E8CE',
          300: '#E8D9A9',
          400: '#D4AF37',
          500: '#C4A028',
          600: '#B8941F',
          700: '#9A7A19',
          800: '#7A6114',
          900: '#5C4A10',
        }
      }
    },
  },
  plugins: [],
}