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

      // addComponents({
      //   [`@variants ${variants('typography').join(', ')}`]: union(
      //     ['default', 'sm', 'lg', 'xl', '2xl'].filter((x) =>
      //       modifiers.includes(x)
      //     ),
      //     Object.keys(config)
      //   ).map((modifier) => ({
      //     [`.prose${modifier === 'default' ? '' : `-${modifier}`}`]: merge(
      //       modifier === 'default' ? styles.shared : {},
      //       styles.modifiers[modifier] ? styles.modifiers[modifier].css : {},
      //       configToCss(config[modifier] || {})
      //     ),
      //   })),
      // })

      addComponents({
        [`@variants ${variants('typography').join(', ')}`]: [
          {
            '.prose': merge(
              ...castArray(styles.default.css),
              configToCss(config.default || {})
            ),
            ...(!modifiers.includes('sm')
              ? {}
              : {
                  '.prose-sm': merge(
                    ...castArray(styles.sm.css),
                    configToCss(config.sm || {})
                  ),
                }),
            ...(!modifiers.includes('lg')
              ? {}
              : {
                  '.prose-lg': merge(
                    ...castArray(styles.lg.css),
                    configToCss(config.lg || {})
                  ),
                }),
            ...(!modifiers.includes('xl')
              ? {}
              : {
                  '.prose-xl': merge(
                    ...castArray(styles.xl.css),
                    configToCss(config.xl || {})
                  ),
                }),
            ...(!modifiers.includes('2xl')
              ? {}
              : {
                  '.prose-2xl': merge(
                    ...castArray(styles['2xl'].css),
                    configToCss(config['2xl'] || {})
                  ),
                }),
          },
          ...Object.keys(config)
            .filter((x) => !['default', 'sm', 'lg', 'xl', '2xl'].includes(x))
            .map((modifier) => ({
              [`.prose-${modifier}`]: configToCss(config[modifier]),
            })),
        ],
      })
    }
  },
  () => ({ variants: { typography: ['responsive'] } })
)
