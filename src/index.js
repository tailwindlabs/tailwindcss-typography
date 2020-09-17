const plugin = require('tailwindcss/plugin')
const merge = require('lodash/merge')
const castArray = require('lodash/castArray')
const flatMap = require('lodash/flatMap')
const styles = require('./styles')
const parseObjectStyles = require('tailwindcss/lib/util/parseObjectStyles').default
const postcss = require('postcss')

const computed = {
  // Reserved for future "magic properties", for example:
  // bulletColor: (color) => ({ 'ul > li::before': { backgroundColor: color } }),
}

function configToCss(config) {
  return merge(
    ...Object.keys(config)
      .filter((key) => computed[key])
      .map((key) => computed[key](config[key])),
    ...castArray(config.css || {})
  )
}

function applyProseParent(css, { prose, unprose }, transform = (result) => result.nodes) {
  if (Array.isArray(css)) {
    return css.flatMap((rules) => applyProseParent(rules, { prose, unprose }, transform))
  }

  const result = postcss.root()
  result.append(parseObjectStyles(css))

  result.each((node) => {
    if (node.type === 'decl') {
      const rule = postcss.rule({ selector: `:root .${prose}` })
      rule.append(node.clone())
      node.replaceWith(rule)
      return
    }

    if (node.type === 'rule') {
      node.selectors = flatMap(node.selectors, (selector) => {
        if (selector.trim().startsWith('>')) {
          return [`:root .${prose} ${selector}`]
        }

        return [`.${prose} :not(.${unprose}) ${selector}`, `:root .${prose} > ${selector}`]
      })
    }
  })

  return transform(result)
}

module.exports = plugin.withOptions(
  ({ modifiers = ['sm', 'lg', 'xl', '2xl'], className = 'prose' } = {}) => {
    return function ({ addComponents, theme, variants }) {
      const config = theme('typography', {})

      addComponents(
        [
          ...applyProseParent(
            merge(...castArray(styles.default.css), configToCss(config.default || {})),
            { prose: className, unprose: 'unprose' }
          ),
          ...flatMap(modifiers, (modifier) => {
            return applyProseParent(
              merge(...castArray(styles[modifier].css), configToCss(config[modifier] || {})),
              { prose: `${className}-${modifier}`, unprose: 'unprose' }
            )
          }),
          ...flatMap(
            Object.keys(config).filter((key) => !['default', ...modifiers].includes(key)),
            (modifier) => {
              return applyProseParent(configToCss(config[modifier] || {}), {
                prose: `${className}-${modifier}`,
                unprose: 'unprose',
              })
            }
          ),
          // {
          //   [`.${className}`]: merge(
          //     ...castArray(styles.default.css),
          //     configToCss(config.default || {})
          //   ),
          // },
          // ...modifiers.map((modifier) => ({
          //   [`.${className}-${modifier}`]: merge(
          //     ...castArray(styles[modifier].css),
          //     configToCss(config[modifier] || {})
          //   ),
          // })),
          // ...Object.keys(config)
          //   .filter((key) => !['default', ...modifiers].includes(key))
          //   .map((modifier) => ({
          //     [`.${className}-${modifier}`]: configToCss(config[modifier]),
          //   })),
        ],
        variants('typography')
      )
    }
  },
  () => ({ variants: { typography: ['responsive'] } })
)
