module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add base styles for all scrollable elements
      scrollbar: {
        DEFAULT: {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4b5563", // Gray
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f3f4f6", // Light Gray
          },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
