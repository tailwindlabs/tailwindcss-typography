const fs = require('fs')
const postcss = require('postcss')
const tailwind = require('tailwindcss')
const CleanCSS = require('clean-css')

function buildDistFile(filename) {
  return new Promise((resolve, reject) => {
    console.log(`Processing ./${filename}.css...`)

    fs.readFile(`./css/${filename}.css`, (err, css) => {
      if (err) throw err

      return postcss([tailwind({
        corePlugins: false,
        plugins: [
          require('../src/index.js')
        ]
      }), require('autoprefixer')])
        .process(css, {
          from: `./${filename}.css`,
          to: `./dist/${filename}.css`,
          map: { inline: false },
        })
        .then(result => {
          fs.writeFileSync(`./dist/${filename}.css`, result.css)
          if (result.map) {
            fs.writeFileSync(`./dist/${filename}.css.map`, result.map)
          }
          return result
        })
        .then(result => {
          const minified = new CleanCSS().minify(result.css)
          fs.writeFileSync(`./dist/${filename}.min.css`, minified.styles)
        })
        .then(resolve)
        .catch(error => {
          console.log(error)
          reject()
        })
    })
  })
}

console.info('Building Tailwind!')

Promise.all([
  buildDistFile('motion'),
]).then(() => {
  console.log('Finished building CSS.')
})
