/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        secondary: '#20C997',
        error: '#DC3545',
        lightBg: '#F8F9FA',
        darkBg: '#1A1A2E',
        textLight: '#FFFFFF',
        textDark: '#212529',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}