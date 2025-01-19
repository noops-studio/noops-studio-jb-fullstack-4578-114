/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // For the Vite entry file
    './src/**/*.{js,ts,jsx,tsx}', // All source files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"),
    require('@tailwindcss/typography')

  ],
};
