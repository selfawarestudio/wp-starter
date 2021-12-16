module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-fluid': {
      min: '400px',
      max: '1280px',
    },
    'postcss-focus-visible': {},
    autoprefixer: {},
    cssnano: {},
  },
}
