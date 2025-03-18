/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@angular/material/**/*.mjs"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f97316',
        secondary: '#171717',
      }
    },
    keyframes: {
      pulseBorder: {
        '0%': { boxShadow: '0 0 0 0 rgba(249, 115, 22, 0.7)' }, 
        '50%': { boxShadow: '0 0 15px 5px rgba(249, 115, 22, 0.5)' },
        '100%': { boxShadow: '0 0 0 0 rgba(249, 115, 22, 0.7)' },
      }
    },
    animation: {
      pulseBorder: 'pulseBorder 1.5s infinite',
    }
  },
  plugins: [require('tailwindcss-primeui')]
}
