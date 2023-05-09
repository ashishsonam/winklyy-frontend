/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      CocogooseThin: ['Cocogoose Pro Thin-trial'],
      CocogooseRegular: ['Cocogoose Pro Ultralight-trial'],
      CocogooseMedium: ['Cocogoose Pro Light-trial'],
      CocogooseSemibold: ['Cocogoose Pro Semilight-trial'],
      CocogooseBold: ['Cocogoose Pro-trial'],
    },
    screen: {
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
    extend: {
      colors: {
        brown900: '#430D27',
        brown800: '#693d52',
        brown700: '#7b5668',
        brown500: '#a18693',
        brown300: '#c7b6be',
        brown200:'#d9cfd4',
        brown100: '#ece7e9',
        creamyWhite900: '#EFF0EC'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
