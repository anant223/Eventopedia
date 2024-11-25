// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        myshadow:
          "rgba(255, 255, 255, 0.1) 0px 2px 5px -1px, rgba(255, 255, 255, 0.15) 0px 4px 6px -2px",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Add the Google Font here
      },
    },
  },
  plugins: [],
};
