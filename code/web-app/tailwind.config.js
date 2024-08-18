/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, rgba(51,139,119,1) 0%, rgba(41,133,112,1) 35%, rgba(26,108,89,1) 100%)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
