const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./public/**/*.html'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')(`${__dirname}/tailwind.config.js`),
    require('postcss-nested'),
    require('postcss-custom-properties'),
    require('autoprefixer'),
  ]
}
