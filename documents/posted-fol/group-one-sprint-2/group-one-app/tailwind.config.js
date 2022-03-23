module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      title: ["Poppins"],
      social: ["Inter"],
    },
    extend: {
      colors: {
        primaryColor: "#254D32",
        bgColor: "#181D27",
        link: "#34A853",
        inputFont: "#00000",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
