/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // For the Vite entry file
    './src/**/*.{js,ts,jsx,tsx}', // All source files
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"),
    require('@tailwindcss/typography')

  ],
};
