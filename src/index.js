const plugin = require('tailwindcss/plugin')
const merge = require('lodash.merge')
const castArray = require('lodash.castarray')
const uniq = require('lodash.uniq')
const styles = require('./styles')
const { isUsableColor } = require('./utils')

const computed = {
  // Reserved for future "magic properties", for example:
  // bulletColor: (color) => ({ 'ul > li::before': { backgroundColor: color } }),
}

function inWhere(selector, className) {
  if (selector.endsWith('::before')) {
    return `:where(${selector.slice(0, -8)}):not(:where(.not-${className} *))::before`
  }

  if (selector.endsWith('::after')) {
    return `:where(${selector.slice(0, -7)}):not(:where(.not-${className} *))::after`
  }

  return `:where(${selector}):not(:where(.not-${className} *))`
}

function configToCss(config = {}, { target, className }) {
  return Object.fromEntries(
    Object.entries(
      merge(
        {},
        ...Object.keys(config)
          .filter((key) => computed[key])
          .map((key) => computed[key](config[key])),
        ...castArray(config.css || {})
      )
    ).map(([k, v]) => {
      if (target === 'legacy') {
        return [k, v]
      }

      if (typeof v == 'object' && v.constructor == Object) {
        return [inWhere(k, className), v]
      }

      return [k, v]
    })
  )
}

module.exports = plugin.withOptions(
  ({ modifiers, className = 'prose', target = 'modern' } = {}) => {
    return function ({ addComponents, theme, variants }) {
      const DEFAULT_MODIFIERS = [
        'DEFAULT',
        'sm',
        'lg',
        'xl',
        '2xl',
        ...Object.entries(theme('colors'))
          .filter(([color, values]) => {
            return isUsableColor(color, values)
          })
          .map(([color]) => color),
      ]
      modifiers = modifiers === undefined ? DEFAULT_MODIFIERS : modifiers
      const config = theme('typography')

      const all = uniq([
        'DEFAULT',
        ...modifiers,
        ...Object.keys(config).filter((modifier) => !DEFAULT_MODIFIERS.includes(modifier)),
      ])

      addComponents(
        all.map((modifier) => ({
          [modifier === 'DEFAULT' ? `.${className}` : `.${className}-${modifier}`]: configToCss(
            config[modifier],
            { target, className },
          ),
        })),
        variants('typography')
      )
    }
  },
  () => ({
    theme: { typography: styles },
    variants: { typography: ['responsive'] },
  })
)
