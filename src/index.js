const plugin = require('tailwindcss/plugin')
const merge = require('lodash/merge')
const castArray = require('lodash/castArray')
const styles = require('./styles')
// const union = require('lodash/union')

const computed = {
  // bulletColor: (color) => ({ 'ul > li::before': { backgroundColor: color } }),
}

function configToCss(config) {
  return {
    ...Object.keys(config)
      .filter((x) => computed[x])
      .reduce((acc, cur) => {
        return { ...acc, ...computed[cur](config[cur]) }
      }, {}),
    ...merge(...castArray(config.css || {})),
  }
}

module.exports = plugin.withOptions(
  ({ modifiers = ['sm', 'lg', 'xl', '2xl'] } = {}) => {
    return function ({ addComponents, theme, variants }) {
      const config = theme('typography', {})

      addComponents({
        [`@variants ${variants('typography').join(', ')}`]: [
          {
            '.prose': merge(
              ...castArray(styles.default.css),
              configToCss(config.default || {})
            ),
          },
          ...modifiers.map((modifier) => ({
            [`.prose-${modifier}`]: merge(
              ...castArray(styles[modifier].css),
              configToCss(config[modifier] || {})
            ),
          })),
          ...Object.keys(config)
            .filter((key) => !['default', ...modifiers].includes(key))
            .map((modifier) => ({
              [`.prose-${modifier}`]: configToCss(config[modifier]),
            })),
        ],
      })
    }
  },
  () => ({ variants: { typography: ['responsive'] } })
)
