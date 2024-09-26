import flowbite from "flowbite/plugin";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [flowbite],
  theme: {
    extend: {
      fontFamily: {
        "fira-sans": ["Fira Sans", "sans-serif"],
      },
      colors: {
        pink: {
          100: "#EDEBFE",
        },
        purple: {
          100: "#EDEBFE",
          500: "#9061F9",
          600: "#7E3AF2",
          700: "#6C2BD9",
          800: "#5521B5",
          900: "#4A1D96",
        },
      },
    },
  },
};
