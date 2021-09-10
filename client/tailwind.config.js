module.exports = {
  purge: ['./index.html', './src/**/*.vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        //default course detail color = #3f4451
        "aqua": '#a5d6f0',
        "aqua-600": '#3793c4',
        "aqua-700": '#21719c',
        "aqua-800": '#084769',
        "aqua-900": "#01324d"
      }
    },
  },
  variants: {
    extend: {},
  },
}
