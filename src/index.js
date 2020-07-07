const plugin = require('tailwindcss/plugin')
const merge = require('lodash/merge')
const styles = require('./styles')

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
    ...(config.css || {}),
  }
}

module.exports = plugin.withOptions(
  ({ modifiers = ['default', 'sm', 'lg', 'xl'] } = {}) => {
    return function ({ addComponents, theme, variants }) {
      const config = theme('typography', {})

      // addComponents(
      //   union(
      //     ['default', 'sm', 'lg', 'xl'].filter(modifiers.includes),
      //     Object.keys(config)
      //   ).map((modifier) => ({
      //     [`.prose${modifier === 'default' ? '' : `-${modifier}`}`]: merge(
      //       styles.modifiers[modifier] || {},
      //       configToCss(config[modifier] || {})
      //     ),
      //   }))
      // )

      addComponents({
        [`@variants ${variants('typography').join(', ')}`]: [
          {
            '.prose': merge(
              styles.shared,
              !modifiers.includes('default')
                ? {}
                : styles.modifiers.default.css,
              configToCss(config.default || {})
            ),
            ...(!modifiers.includes('sm')
              ? {}
              : {
                  '.prose-sm': merge(
                    styles.modifiers.sm.css,
                    configToCss(config.sm || {})
                  ),
                }),
            ...(!modifiers.includes('lg')
              ? {}
              : {
                  '.prose-lg': merge(
                    styles.modifiers.lg.css,
                    configToCss(config.lg || {})
                  ),
                }),
            ...(!modifiers.includes('xl')
              ? {}
              : {
                  '.prose-xl': merge(
                    styles.modifiers.xl.css,
                    configToCss(config.xl || {})
                  ),
                }),
          },
          ...Object.keys(config)
            .filter((x) => !['default', 'sm', 'lg', 'xl'].includes(x))
            .map((modifier) => ({
              [`.prose-${modifier}`]: configToCss(config[modifier]),
            })),
        ],
      })
    }
  },
  () => ({ variants: { typography: ['responsive'] } })
)
