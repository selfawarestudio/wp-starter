module.exports = {
  presets: [require('@selfaware/tailwind-base')],
  content: ['./src/templates/**/*.twig', './src/scripts/**/*.(js|jsx)'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['sans-serif'],
        serif: ['serif'],
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
}
