const mdx = require('@mdx-js/mdx')

module.exports = {
  purge: {
    content: ['./demo/pages/**/*.{js,mdx}', './demo/components/**/*.{js,mdx}'],
    transform: {
      mdx: (content) => mdx.sync(content),
    },
  },
  theme: {},
  variants: {},
  plugins: [require('../src/index.js')],
}
