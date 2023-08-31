const colors = require('tailwindcss/colors')

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.blueGray,
        info: colors.gray,
        error: colors.red,
        'black-semi-transparent': '#000000EE',
        'rust-team-member-online': '#A6EA33',
        'rust-team-member-offline': '#686B6B',
        'rust-team-member-dead': '#CD412B',
        lime: {
          100: '#F0FCCF',
          200: '#DCF9A3',
          300: '#C8F477',
          400: '#B1F051',
          500: '#94CC16',
          600: '#75A10E',
          700: '#5C7D0A',
          800: '#3E5C07',
          900: '#244105',
        },
        cyan: {
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
      }
    },
    zIndex: {
      'vending-machine-contents': 998,
      'bottom-bar': 999,
      'modal': 1000,
      'tooltip': 1001,
      'auto': 'auto',
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}
