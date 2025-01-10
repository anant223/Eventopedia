/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{jsx,js,ts}",
  ],

  theme: {
    extend: {
      boxShadow: {
        myshadow:
          "rgba(255, 255, 255, 0.1) 0px 2px 5px -1px, rgba(255, 255, 255, 0.15) 0px 4px 6px -2px",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        aus: ["Playwrite AU SA", "serif"],
      },
      
      height: {
        contentHeight: "calc(100vh - 80px)",
      },
    },
  },
  plugins: [],
};

