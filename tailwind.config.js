/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@angular/material/**/*.mjs"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6500',
        secondary: '#171717',
      }
    },
  },
  plugins: [],
}
