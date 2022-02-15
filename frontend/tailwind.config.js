module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    },
    fontFamily:{
      'title' : ['Poppins'],
      'social' : ['Inter']
    },
    borderRadius: {
      'btn': '23px',
      'form': '20px',
    },
    extend: {
      colors: {
        primaryColor: '#254D32',
        bgColor: '#181D27',
        link : '#34A853',
        inputFont : "#00000",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
