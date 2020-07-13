module.exports = {
  purge: ['./demo/pages/**/*.{js,mdx}', './demo/components/**/*.{js,mdx}'],
  theme: {},
  variants: {},
  plugins: [require('../src/index.js')],
}
