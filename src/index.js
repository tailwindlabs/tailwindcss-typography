const plugin = require('tailwindcss/plugin')
const merge = require('lodash.merge')
const castArray = require('lodash.castarray')
const uniq = require('lodash.uniq')
const styles = require('./styles')
const { isUsableColor } = require('./utils')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default
const toColorValue = require('tailwindcss/lib/util/toColorValue').default

const computed = {
  // Reserved for future "magic properties", for example:
  // bulletColor: (color) => ({ 'ul > li::before': { backgroundColor: color } }),
}

function inWhere(selector, { className, prefix }) {
  let prefixedNot = prefix(`.not-${className}`).slice(1)

  if (selector.endsWith('::before')) {
    if (selector.startsWith('>')) {
      return `> :where(${selector.slice(2, -8)}):not(:where([class~="${prefixedNot}"] *))::before`
    }
    return `:where(${selector.slice(0, -8)}):not(:where([class~="${prefixedNot}"] *))::before`
  }

  if (selector.endsWith('::after')) {
    if (selector.startsWith('>')) {
      return `> :where(${selector.slice(2, -8)}):not(:where([class~="${prefixedNot}"] *))::before`
    }
    return `:where(${selector.slice(0, -7)}):not(:where([class~="${prefixedNot}"] *))::after`
  }

  if (selector.startsWith('>')) {
    return `> :where(${selector.slice(2)}):not(:where([class~="${prefixedNot}"] *))`
  }

  return `:where(${selector}):not(:where([class~="${prefixedNot}"] *))`
}

function configToCss(config = {}, { target, className, prefix }) {
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
        return [inWhere(k, { className, prefix }), v]
      }

      return [k, v]
    })
  )
}

// module.exports = plugin.withOptions(
//   ({ modifiers, className = 'prose', target = 'modern' } = {}) => {
//     return function ({ matchComponents, addComponents, theme, prefix }) {
//       // Default prose styles (includes base color + base size)
//       addComponents({
//         prose: {
//           // ...
//         },
//       })

//       // Themes, like prose-slate
//       matchComponents({
//         prose: (theme) => {
//           // ...
//         },
//       })

//       // For inverting a theme
//       addComponents({
//         '.prose-invert': {
//           // ...
//         },
//       })

//       // Sizes, like prose-xl, composable with themes
//       matchComponents({
//         prose: (size) => {
//           // ...
//         },
//       })

//       // Element colors
//       matchComponents({
//         'prose-headings': (color) => {
//           // ...
//         },
//         'prose-lead': (color) => {
//           // ...
//         },
//         'prose-body': (color) => {
//           // ...
//         },
//         'prose-links': (color) => {
//           // ...
//         },
//         'prose-bullets': (color) => {
//           // ...
//         },
//         'prose-counters': (color) => {
//           // ...
//         },
//         'prose-rules': (color) => {
//           // ...
//         },
//         'prose-quotes': (color) => {
//           // ...
//         },
//         'prose-quote-borders': (color) => {
//           // ...
//         },
//         'prose-strong': (color) => {
//           // ...
//         },
//         'prose-captions': (color) => {
//           // ...
//         },
//         'prose-code': (color) => {
//           // ...
//         },
//         'prose-pre-bg': (color) => {
//           // ...
//         },
//         'prose-pre-code': (color) => {
//           // ...
//         },
//         'prose-thead-borders': (color) => {
//           // ...
//         },
//         'prose-tr-borders': (color) => {
//           // ...
//         },
//       })
//     }
//   },
//   () => ({
//     theme: { typography: styles },
//   })
// )

module.exports = plugin.withOptions(
  ({ modifiers, className = 'prose', target = 'modern' } = {}) => {
    return function ({ matchComponents, addComponents, theme, variants, prefix }) {
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
            { target, className, prefix }
          ),
        })),
        variants('typography')
      )

      // Questions:
      // - How do we configure colors for things like `prose-body-blue-500`? Should each piece auto-read from the best matching key (body -> textColor, headings -> textColor, quote-borders -> borderColor, etc.)
      // - If inside `typography`, can we provide BC for old config, or do modifiers need a new sub-key (`typography.modifiers`? `typography.themes`?)
      // - Do things exend the way we expect when the theme object is complicated and deeply nested?
      // - Where do we read the colors for the monochromatic themes?
      // - Should it be easy/possible to disable built-in modifiers? Was more important in AOT, is it still important? Maybe can do it by just not using extend?
      // - How does the customization API work when you don't use extend? For consistency it should probably totally override
      // - Document safelisting best practices to avoid 1000mb CSS file
      // - Should we ditch the `css` key in each modifier?
      // - Does customizing the complex CSS stuff give predictable results?
      //    extend: {
      //      typography: { lg: { css: { h2: { margin-top: 500px }}}}
      // - Removing backticks around <code> snippets? Easy way to do this without complex CSS customization?
      //    - CSS var? `--prose-code-pseudo-content: "`"`

      matchComponents(
        {
          ...Object.fromEntries(
            [
              'body',
              'headings',
              'lead',
              'links',
              'bold',
              'counters',
              'bullets',
              'rules',
              'quotes',
              'quote-borders',
              'captions',
              'code',
              'pre-code',
              'pre-bg',
              'th-borders',
              'td-borders',
            ].map((el) => {
              return [
                `prose-${el}`,
                (value) => {
                  let color = toColorValue(value)
                  return { [`--tw-prose-${el}`]: color, [`--tw-prose-invert-${el}`]: color }
                },
              ]
            })
          ),
        },
        { values: flattenColorPalette(theme('colors')), type: ['color', 'any'] }
      )
    }
  },
  () => ({
    theme: { typography: styles },
    variants: { typography: ['responsive'] },
  })
)
