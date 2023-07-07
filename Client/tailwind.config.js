/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '720px',
      // => @media (min-width: 576px) { ... }

      'md': '1080px',
      // => @media (min-width: 960px) { ... }

      'lg': '2560px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
}

