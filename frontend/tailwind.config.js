module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primaryColor: '#254D32',
        bgColor: '#181D27'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
