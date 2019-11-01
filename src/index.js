const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  config: {
    theme: {
      typography: {
        h1: {
          fontSize: defaultTheme.fontSize['4xl'],
          fontWeight: defaultTheme.fontWeight['bold'],
          color: defaultTheme.colors.gray[900],
          lineHeight: defaultTheme.lineHeight.none
        },
        'h1 + *': {
          marginTop: defaultTheme.spacing[8],
        },
        h2: {
          fontSize: defaultTheme.fontSize['2xl'],
          fontWeight: defaultTheme.fontWeight['bold'],
          color: defaultTheme.colors.gray[900],
          lineHeight: defaultTheme.lineHeight.tight
        },
        '* + h2': {
          marginTop: defaultTheme.spacing[8],
        },
        'h2 + *': {
          marginTop: defaultTheme.spacing[4],
        },
        h3: {
          fontSize: defaultTheme.fontSize['xl'],
          fontWeight: defaultTheme.fontWeight['bold'],
          color: defaultTheme.colors.gray[900],
          lineHeight: defaultTheme.lineHeight.tight
        },
        '* + h3': {
          marginTop: defaultTheme.spacing[6],
        },
        'h2 + h3': {
          marginTop: defaultTheme.spacing[4],
        },
        'h3 + *': {
          marginTop: defaultTheme.spacing[2],
        },
        h4: {
          fontSize: defaultTheme.fontSize['base'],
          fontWeight: defaultTheme.fontWeight['bold'],
          color: defaultTheme.colors.gray[900],
          lineHeight: defaultTheme.lineHeight.normal
        },
        '* + h4': {
          marginTop: defaultTheme.spacing[6],
        },
        'h3 + h4': {
          marginTop: defaultTheme.spacing[2],
        },
        'h4 + *': {
          marginTop: defaultTheme.spacing[2],
        },
        p: {
          fontSize: defaultTheme.fontSize.base,
          fontWeight: defaultTheme.fontWeight.normal,
          color: defaultTheme.colors.gray[800],
          lineHeight: defaultTheme.lineHeight.relaxed,
        },
        'p + p': {
          marginTop: defaultTheme.spacing[4]
        },
        strong: {
          fontWeight: defaultTheme.fontWeight.bold,
          color: defaultTheme.colors.gray[900],
        },
        a: {
          fontWeight: defaultTheme.fontWeight.medium,
          color: defaultTheme.colors.blue[600],
        },
        'a:hover': {
          textDecoration: 'underline',
        },
        code: {
          backgroundColor: defaultTheme.colors.gray[200],
          fontSize: '.875em', // Use `em` so change is relative to current font size
          paddingLeft: defaultTheme.spacing[1],
          paddingRight: defaultTheme.spacing[1],
        },
        'img': {
          marginTop: defaultTheme.spacing[8],
          marginBottom: defaultTheme.spacing[8],
        },
        ol: {
          listStyleType: 'decimal',
          paddingLeft: defaultTheme.spacing[5]
        },
        '* + ol': {
          marginTop: defaultTheme.spacing[4],
        },
        'ol + *': {
          marginTop: defaultTheme.spacing[4],
        },
        'li ol': {
          marginTop: defaultTheme.spacing[2],
        },
        ul: {
          listStyleType: 'disc',
          paddingLeft: defaultTheme.spacing[5]
        },
        '* + ul': {
          marginTop: defaultTheme.spacing[4],
        },
        'ul + *': {
          marginTop: defaultTheme.spacing[4],
        },
        'li ul': {
          marginTop: defaultTheme.spacing[2],
        },
        li: {
          fontSize: defaultTheme.fontSize.base,
          fontWeight: defaultTheme.fontWeight.normal,
          color: defaultTheme.colors.gray[800],
          lineHeight: defaultTheme.lineHeight.relaxed,
        },
        'li + li': {
          marginTop: defaultTheme.spacing[2],
        },
        'li p': {
          marginTop: defaultTheme.spacing[4],
        },
        'li p + p': {
          marginTop: defaultTheme.spacing[2],
        },
        'li:first-child p:first-child': {
          marginTop: defaultTheme.spacing[2],
        },
        blockquote: {
          fontStyle: 'italic',
          borderLeftWidth: defaultTheme.borderWidth[4],
          borderLeftStyle: 'solid',
          borderLeftColor: defaultTheme.colors.gray[300],
          paddingLeft: defaultTheme.spacing[4]
        },
        '* + blockquote': {
          marginTop: defaultTheme.spacing[4],
        },
        'blockquote + *': {
          marginTop: defaultTheme.spacing[4],
        },
        pre: {
          backgroundColor: defaultTheme.colors.gray[200],
          paddingTop: defaultTheme.spacing[3],
          paddingRight: defaultTheme.spacing[4],
          paddingBottom: defaultTheme.spacing[3],
          paddingLeft: defaultTheme.spacing[4],
        },
        '* + pre': {
          marginTop: defaultTheme.spacing[4],
        },
        'pre + *': {
          marginTop: defaultTheme.spacing[4],
        },
        'pre code': {
          fontSize: defaultTheme.fontSize.sm,
        }
      }
    },
  },
  handler: function ({ addComponents, theme }) {
    addComponents({
      '.rich-text': theme('typography')
    })
  }
}
