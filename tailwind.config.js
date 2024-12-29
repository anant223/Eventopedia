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
      },
      backgroundImage: {
        "radial-blue":
          "radial-gradient(circle, rgb(57 74 143 / 85%) 30%, rgb(17 9 40 / 83%) 80%)",
        "feature-bg":
          "radial-gradient(circle, rgba(30,36,64,1) 40%, rgba(40,36,64,1) 80%)",
        "howitWork-bg":
          "radial-gradient(circle, rgba(30,36,64,1) 40%, rgba(40,36,64,1) 80%)",
      },
      height: {
        contentHeight: "calc(100vh - 80px)",
      },
    },
  },
  plugins: [
  ],
};

