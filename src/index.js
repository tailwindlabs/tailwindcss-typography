const plugin = require('tailwindcss/plugin')
const merge = require('lodash/merge')
const castArray = require('lodash/castArray')
const uniq = require('lodash/uniq')
const styles = require('./styles')

const computed = {
  // Reserved for future "magic properties", for example:
  // bulletColor: (color) => ({ 'ul > li::before': { backgroundColor: color } }),
}

function configToCss(config = {}) {
  return merge(
    {},
    ...Object.keys(config)
      .filter((key) => computed[key])
      .map((key) => computed[key](config[key])),
    ...castArray(config.css || {})
  )
}

const DEFAULT_MODIFIERS = ['DEFAULT', 'sm', 'lg', 'xl', '2xl']
module.exports = plugin.withOptions(
  ({ modifiers = DEFAULT_MODIFIERS, className = 'prose' } = {}) => {
    return function ({ addComponents, theme, variants }) {
      const config = theme('typography')

      const all = uniq([
        'DEFAULT',
        ...modifiers,
        ...Object.keys(config).filter((modifier) => !DEFAULT_MODIFIERS.includes(modifier)),
      ])

      addComponents(
        all.map((modifier) => ({
          [modifier === 'DEFAULT' ? `.${className}` : `.${className}-${modifier}`]: configToCss(
            config[modifier]
          ),
        })),
        variants('typography')
      )
    }
  },
  () => ({ theme: { typography: styles }, variants: { typography: ['responsive'] } })
)
