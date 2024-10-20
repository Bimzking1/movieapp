/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    animation: {
      bumpy: 'bumpy 800ms ease-in-out infinite',
      spinner: 'spinner 800ms ease-in-out infinite',
    },
    keyframes: {
      spinner: {
        '0%': {
          transform: 'rotate(0deg)'
        },
        '100%': {
          transform: 'rotate(360deg)'
        }
      },
      bumpy: {
        '0%': {
          transform: 'rotate(0deg)'
        },
        '100%': {
          transform: 'rotate(10deg)'
        }
      },
    }
  },
  plugins: [],
}