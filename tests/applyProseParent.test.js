const parseObjectStyles = require('tailwindcss/lib/util/parseObjectStyles').default
const postcssJs = require('postcss-js')
const postcss = require('postcss')
const flatMap = require('lodash/flatMap')

function objectify(css) {
  return Object.entries(postcssJs.objectify(css)).map(([key, value]) => {
    return {
      [key]: value,
    }
  })
}

function applyProseParent(css, { prose, unprose }, transform = (result) => result.nodes) {
  if (Array.isArray(css)) {
    return css.flatMap((rules) => applyProseParent(rules, { prose, unprose }, transform))
  }

  const result = postcss.root()
  result.append(parseObjectStyles(css))

  result.each((node) => {
    if (node.type === 'decl') {
      const rule = postcss.rule({ selector: `.${prose}` })
      rule.append(node.clone())
      node.replaceWith(rule)
      return
    }

    if (node.type === 'rule') {
      node.selectors = flatMap(node.selectors, (selector) => {
        if (selector.trim().startsWith('>')) {
          return [`.${prose} ${selector}`]
        }

        return [`.${prose} :not(.${unprose}) ${selector}`, `.${prose} > ${selector}`]
      })
    }
  })

  return transform(result)
}

test('it generally works', () => {
  const input = {
    maxWidth: '65ch',
    '[class~="lead"]': {
      color: '#ccc',
    },
    a: {
      textDecoration: 'underline',
    },
    '> ul p': {
      marginTop: '16px',
    },
  }

  expect(applyProseParent(input, { prose: 'prose', unprose: 'unprose' }, objectify)).toEqual([
    {
      '.prose': {
        maxWidth: '65ch',
      },
    },
    {
      '.prose :not(.unprose) [class~="lead"], .prose > [class~="lead"]': {
        color: '#ccc',
      },
    },
    {
      '.prose :not(.unprose) a, .prose > a': {
        textDecoration: 'underline',
      },
    },
    {
      '.prose > ul p': {
        marginTop: '16px',
      },
    },
  ])
})

test('you can provide the CSS as an array', () => {
  const input = [
    {
      maxWidth: '65ch',
      '[class~="lead"]': {
        color: '#ccc',
      },
      a: {
        color: 'blue',
      },
    },
    {
      a: {
        textDecoration: 'underline',
      },
      '> ul p': {
        marginTop: '16px',
      },
    },
    {
      a: {
        fontWeight: 'bold',
      },
    },
  ]

  expect(applyProseParent(input, { prose: 'prose', unprose: 'unprose' }, objectify)).toEqual([
    {
      '.prose': {
        maxWidth: '65ch',
      },
    },
    {
      '.prose :not(.unprose) [class~="lead"], .prose > [class~="lead"]': {
        color: '#ccc',
      },
    },
    {
      '.prose :not(.unprose) a, .prose > a': {
        color: 'blue',
      },
    },
    {
      '.prose :not(.unprose) a, .prose > a': {
        textDecoration: 'underline',
      },
    },
    {
      '.prose > ul p': {
        marginTop: '16px',
      },
    },
    {
      '.prose :not(.unprose) a, .prose > a': {
        fontWeight: 'bold',
      },
    },
  ])
})

test('it supports nested selectors', () => {
  const input = {
    a: {
      textDecoration: 'underline',
      strong: {
        fontWeight: 'bold',
      },
    },
    '> ul': {
      p: {
        marginTop: '16px',
      },
    },
    p: {
      '> &': {
        marginBottom: '12px',
      },
    },
  }

  expect(applyProseParent(input, { prose: 'prose', unprose: 'unprose' }, objectify)).toEqual([
    {
      '.prose :not(.unprose) a, .prose > a': {
        textDecoration: 'underline',
      },
    },
    {
      '.prose :not(.unprose) a strong, .prose > a strong': {
        fontWeight: 'bold',
      },
    },
    {
      '.prose > ul p': {
        marginTop: '16px',
      },
    },
    {
      '.prose > p': {
        marginBottom: '12px',
      },
    },
  ])
})

test('it supports rules with multiple selectors', () => {
  const input = {
    'ul li, > ul p, ol li, a': {
      p: {
        marginTop: '16px',
      },
    },
  }

  expect(applyProseParent(input, { prose: 'prose', unprose: 'unprose' }, objectify)).toEqual([
    {
      '.prose :not(.unprose) ul li p, .prose > ul li p, .prose > ul p p, .prose :not(.unprose) ol li p, .prose > ol li p, .prose :not(.unprose) a p, .prose > a p': {
        marginTop: '16px',
      },
    },
  ])
})
