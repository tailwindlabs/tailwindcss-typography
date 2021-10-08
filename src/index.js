const plugin = require('tailwindcss/plugin')
const merge = require('lodash.merge')
const castArray = require('lodash.castarray')
const styles = require('./styles')

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

// TODO:
// - Add `prose-base` for less annoying responsive stuff (prose prose-sm prose-slate md:prose-base)
// - Fix `:where` stuff not working with media queries

module.exports = plugin.withOptions(
  ({ className = 'prose', target = 'modern' } = {}) => {
    return function ({ addComponents, theme, prefix }) {
      let modifiers = theme('typography')

      addComponents(
        Object.keys(modifiers).map((modifier) => ({
          [modifier === 'DEFAULT' ? `.${className}` : `.${className}-${modifier}`]: configToCss(
            modifiers[modifier],
            { target, className, prefix }
          ),
        }))
      )
    }
  },
  () => {
    return {
      theme: { typography: styles },
    }
  }
)
