const defaultTheme = require('tailwindcss/defaultTheme')

const rem = (px) => `${px / 16}rem`
const round = (num) => num.toFixed(7).replace(/[.0]+$/, '')
const em = (px, base) => `${round(px / base)}em`

module.exports = {
  shared: {
    color: defaultTheme.colors.gray[700],
    maxWidth: '65ch',
    '> :first-child': {
      marginTop: '0',
    },
    '> :last-child': {
      marginBottom: '0',
    },
    a: {
      color: defaultTheme.colors.gray[900],
      textDecoration: 'underline',
    },
    strong: {
      color: defaultTheme.colors.gray[900],
      fontWeight: '600',
    },
    ol: {
      counterReset: 'list-counter',
    },
    'ol > li': {
      position: 'relative',
      counterIncrement: 'list-counter',
    },
    'ol > li::before': {
      content: 'counter(list-counter) "."',
      position: 'absolute',
      left: '0',
      fontWeight: '600',
      color: defaultTheme.colors.gray[600],
    },
    'ul > li': {
      position: 'relative',
    },
    'ul > li::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      backgroundColor: defaultTheme.colors.gray[500],
    },
    blockquote: {
      fontWeight: '500',
      fontStyle: 'italic',
      borderLeftWidth: '0.25rem',
      borderLeftColor: defaultTheme.colors.gray[300],
      quotes: '"\\201C""\\201D""\\2018""\\2019"',
    },
    'blockquote p:first-of-type::before': {
      content: 'open-quote',
    },
    'blockquote p:last-of-type::after': {
      content: 'close-quote',
    },
    h1: {
      color: defaultTheme.colors.gray[900],
      fontWeight: '800',
    },
    h2: {
      color: defaultTheme.colors.gray[900],
      fontWeight: '700',
    },
    h3: {
      color: defaultTheme.colors.gray[900],
      fontWeight: '600',
    },
    h4: {
      color: defaultTheme.colors.gray[900],
      fontWeight: '600',
    },
    'figure figcaption': {
      color: defaultTheme.colors.gray[600],
    },
    code: {
      fontFamily: defaultTheme.fontFamily.mono.join(', '),
      backgroundColor: defaultTheme.colors.gray[100],
      borderColor: defaultTheme.colors.gray[300],
      borderWidth: defaultTheme.borderWidth.default,
    },
    pre: {
      color: defaultTheme.colors.gray[300],
      fontFamily: defaultTheme.fontFamily.mono.join(', '),
      backgroundColor: defaultTheme.colors.gray[800],
      overflowX: 'auto',
    },
    'pre code': {
      backgroundColor: 'transparent',
      borderWidth: '0',
      borderRadius: '0',
      padding: '0',
      color: 'inherit',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      lineHeight: 'inherit',
    },
  },
  modifiers: {
    default: {
      css: {
        fontSize: rem(16),
        lineHeight: round(28 / 16),
        p: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
        },
        blockquote: {
          fontSize: em(20, 16),
          lineHeight: round(32 / 20),
          marginTop: em(32, 20),
          marginBottom: em(32, 20),
          paddingLeft: em(20, 20),
        },
        h1: {
          fontSize: em(36, 16),
          marginTop: '0',
          marginBottom: em(32, 36),
          lineHeight: round(40 / 36),
        },
        h2: {
          fontSize: em(24, 16),
          marginTop: em(48, 24),
          marginBottom: em(24, 24),
          lineHeight: round(32 / 24),
        },
        h3: {
          fontSize: em(20, 16),
          marginTop: em(32, 20),
          marginBottom: em(12, 20),
          lineHeight: round(32 / 20),
        },
        h4: {
          marginTop: em(32, 16),
          marginBottom: em(12, 16),
        },
        img: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        video: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        figure: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        'figure figcaption': {
          fontSize: em(14, 16),
          lineHeight: round(20 / 14),
          marginTop: em(12, 14),
        },
        code: {
          fontSize: em(14, 16),
          lineHeight: round(28 / 14),
          borderRadius: em(6, 14),
          paddingTop: em(4, 14),
          paddingRight: em(6, 14),
          paddingBottom: em(4, 14),
          paddingLeft: em(6, 14),
        },
        pre: {
          fontSize: em(14, 16),
          lineHeight: round(24 / 14),
          borderRadius: em(6, 14),
          paddingTop: em(12, 14),
          paddingRight: em(16, 14),
          paddingBottom: em(12, 14),
          paddingLeft: em(16, 14),
        },
        ol: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
        },
        ul: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
        },
        li: {
          marginTop: em(8, 16),
          marginBottom: em(8, 16),
        },
        'ol > li': {
          paddingLeft: em(32, 16),
        },
        'ul > li': {
          paddingLeft: em(32, 16),
        },
        'ul > li::before': {
          // TODO: ask Steve about sizing
          width: em(12, 16),
          height: em(2, 16),
          top: 'calc(0.875em - 0.0625em)', // TODO: track line-height
        },
        '> ul > li p': {
          marginTop: em(12, 16),
          marginBottom: em(12, 16),
        },
        '> ul > li > *:first-child': {
          marginTop: em(20, 16),
        },
        '> ul > li > *:last-child': {
          marginBottom: em(20, 16),
        },
        '> ol > li > *:first-child': {
          marginTop: em(20, 16),
        },
        '> ol > li > *:last-child': {
          marginBottom: em(20, 16),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(12, 16),
          marginBottom: em(12, 16),
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
      },
    },
    sm: {
      css: {
        fontSize: rem(14),
        lineHeight: round(24 / 14),
        p: {
          marginTop: em(16, 14),
          marginBottom: em(16, 14),
        },
        blockquote: {
          fontSize: em(18, 14),
          lineHeight: round(32 / 18),
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
          paddingLeft: em(16, 18),
        },
        h1: {
          fontSize: em(30, 14),
          marginTop: '0',
          marginBottom: em(24, 30),
          lineHeight: round(36 / 30),
        },
        h2: {
          fontSize: em(20, 14),
          marginTop: em(40, 24),
          marginBottom: em(20, 24),
          lineHeight: round(28 / 20),
        },
        h3: {
          fontSize: em(18, 14),
          marginTop: em(24, 18),
          marginBottom: em(8, 18),
          lineHeight: round(28 / 18),
        },
        h4: {
          marginTop: em(24, 16),
          marginBottom: em(8, 16),
        },
        img: {
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
        },
        video: {
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
        },
        figure: {
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        'figure figcaption': {
          fontSize: em(12, 14),
          lineHeight: round(16 / 12),
          marginTop: em(8, 12),
        },
        code: {
          fontSize: em(12, 14),
          lineHeight: round(24 / 12),
          borderRadius: em(6, 12),
          paddingTop: em(2, 12),
          paddingRight: em(4, 12),
          paddingBottom: em(2, 12),
          paddingLeft: em(4, 12),
        },
        pre: {
          fontSize: em(12, 14),
          lineHeight: round(20 / 12),
          borderRadius: em(6, 12),
          paddingTop: em(8, 12),
          paddingRight: em(12, 12),
          paddingBottom: em(8, 12),
          paddingLeft: em(12, 12),
        },
        ol: {
          marginTop: em(16, 14),
          marginBottom: em(16, 14),
        },
        ul: {
          marginTop: em(16, 14),
          marginBottom: em(16, 14),
        },
        li: {
          marginTop: em(4, 14),
          marginBottom: em(4, 14),
        },
        'ol > li': {
          paddingLeft: em(24, 14),
        },
        'ul > li': {
          paddingLeft: em(24, 14),
        },
        'ul > li::before': {
          // TODO: ask Steve about sizing
          height: em(2, 14),
          width: em(12, 14),
          top: 'calc(0.875em - 0.0625em)', // TODO: track line-height
        },
        '> ul > li p': {
          marginTop: em(8, 14),
          marginBottom: em(8, 14),
        },
        '> ul > li > *:first-child': {
          marginTop: em(16, 14),
        },
        '> ul > li > *:last-child': {
          marginBottom: em(16, 14),
        },
        '> ol > li > *:first-child': {
          marginTop: em(16, 14),
        },
        '> ol > li > *:last-child': {
          marginBottom: em(16, 14),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(8, 14),
          marginBottom: em(8, 14),
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
      },
    },
    lg: {
      css: {
        fontSize: rem(18),
        lineHeight: round(32 / 18),
        p: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
        },
        blockquote: {
          fontSize: em(24, 18),
          lineHeight: round(36 / 24),
          marginTop: em(40, 24),
          marginBottom: em(40, 24),
          paddingLeft: em(20, 24),
        },
        h1: {
          fontSize: em(48, 18),
          marginTop: '0',
          marginBottom: em(40, 48),
          lineHeight: round(48 / 48),
        },
        h2: {
          fontSize: em(30, 18),
          marginTop: em(56, 30),
          marginBottom: em(32, 30),
          lineHeight: round(40 / 30),
        },
        h3: {
          fontSize: em(24, 18),
          marginTop: em(40, 24),
          marginBottom: em(16, 24),
          lineHeight: round(36 / 24),
        },
        h4: {}, // TODO
        img: {
          marginTop: em(32, 18),
          marginBottom: em(32, 18),
        },
        video: {
          marginTop: em(32, 18),
          marginBottom: em(32, 18),
        },
        figure: {
          marginTop: em(32, 18),
          marginBottom: em(32, 18),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        'figure figcaption': {
          fontSize: em(16, 18),
          lineHeight: round(24 / 16),
          marginTop: em(16, 16),
        },
        code: {
          fontSize: em(16, 18),
          lineHeight: round(32 / 16),
          borderRadius: rem(6),
          paddingTop: rem(4),
          paddingRight: rem(6),
          paddingBottom: rem(4),
          paddingLeft: rem(6),
        },
        pre: {
          fontSize: em(16, 18),
          lineHeight: round(28 / 16),
          borderRadius: rem(6),
          paddingTop: em(20, 16),
          paddingRight: em(20, 16),
          paddingBottom: em(20, 16),
          paddingLeft: em(20, 16),
        },
        ol: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
        },
        ul: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
        },
        li: {
          marginTop: em(12, 18),
          marginBottom: em(12, 18),
        },
        'ol > li': {
          paddingLeft: em(32, 18),
        },
        'ul > li': {
          paddingLeft: em(32, 18),
        },
        'ul > li::before': {
          width: em(12, 18),
          height: em(2, 18),
          top: 'calc(0.888em - 0.0555em)',
        },
        '> ul > li p': {
          marginTop: em(16, 18),
          marginBottom: em(16, 18),
        },
        '> ul > li > *:first-child': {
          marginTop: em(24, 18),
        },
        '> ul > li > *:last-child': {
          marginBottom: em(24, 18),
        },
        '> ol > li > *:first-child': {
          marginTop: em(24, 18),
        },
        '> ol > li > *:last-child': {
          marginBottom: em(24, 18),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(16, 18),
          marginBottom: em(16, 18),
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
      },
    },
    xl: {
      css: {
        fontSize: rem(20),
        lineHeight: round(36 / 20),
        p: {
          marginTop: em(24, 20),
          marginBottom: em(24, 20),
        },
        blockquote: {
          fontSize: em(32, 20),
          lineHeight: round(40 / 32),
          marginTop: em(48, 32),
          marginBottom: em(48, 32),
          paddingLeft: em(20, 32),
        },
        h1: {
          fontSize: em(56, 20),
          marginTop: '0',
          marginBottom: em(48, 56),
          lineHeight: round(56 / 56),
        },
        h2: {
          fontSize: em(36, 20),
          marginTop: em(56, 36),
          marginBottom: em(32, 36),
          lineHeight: round(40 / 36),
        },
        h3: {
          fontSize: em(30, 20),
          marginTop: em(48, 30),
          marginBottom: em(20, 30),
          lineHeight: round(40 / 30),
        },
        h4: {}, // TODO
        img: {
          marginTop: em(40, 20),
          marginBottom: em(40, 20),
        },
        video: {
          marginTop: em(40, 20),
          marginBottom: em(40, 20),
        },
        figure: {
          marginTop: em(40, 20),
          marginBottom: em(40, 20),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        'figure figcaption': {
          fontSize: em(18, 20),
          lineHeight: round(24 / 18),
          marginTop: em(18, 18),
        },
        code: {
          fontSize: em(18, 20),
          lineHeight: round(36 / 18),
          borderRadius: rem(6),
          paddingTop: em(6, 18),
          paddingRight: em(8, 18),
          paddingBottom: em(6, 18),
          paddingLeft: em(8, 18),
        },
        'h2 code': {
          lineHeight: round(40 / 32.4),
          paddingTop: em(6, 36),
          paddingRight: em(8, 36),
          paddingBottom: em(6, 36),
          paddingLeft: em(8, 36),
        },
        'h3 code': {
          lineHeight: round(40 / 27),
          paddingTop: em(4, 30),
          paddingRight: em(6, 30),
          paddingBottom: em(4, 30),
          paddingLeft: em(6, 30),
        },
        pre: {
          fontSize: em(18, 20),
          lineHeight: round(32 / 18),
          borderRadius: rem(6),
          paddingTop: em(24, 18),
          paddingRight: em(24, 18),
          paddingBottom: em(24, 18),
          paddingLeft: em(24, 18),
        },
        ol: {
          marginTop: em(24, 20),
          marginBottom: em(24, 20),
        },
        ul: {
          marginTop: em(24, 20),
          marginBottom: em(24, 20),
        },
        li: {
          marginTop: em(12, 20),
          marginBottom: em(12, 20),
        },
        'ol > li': {
          paddingLeft: em(40, 20),
        },
        'ul > li': {
          paddingLeft: em(40, 20),
        },
        'ul > li::before': {
          width: em(12, 20),
          height: em(2, 20),
          top: 'calc(0.888em - 0.0555em)',
        },
        '> ul > li p': {
          marginTop: em(16, 20),
          marginBottom: em(16, 20),
        },
        '> ul > li > *:first-child': {
          marginTop: em(24, 20),
        },
        '> ul > li > *:last-child': {
          marginBottom: em(24, 20),
        },
        '> ol > li > *:first-child': {
          marginTop: em(24, 20),
        },
        '> ol > li > *:last-child': {
          marginBottom: em(24, 20),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(16, 20),
          marginBottom: em(16, 20),
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
      },
    },
    '2xl': {
      css: {
        fontSize: rem(24),
        lineHeight: round(40 / 24),
        p: {
          marginTop: em(32, 24),
          marginBottom: em(32, 24),
        },
        blockquote: {
          fontSize: em(36, 24),
          lineHeight: round(48 / 36),
          marginTop: em(56, 36),
          marginBottom: em(56, 36),
          paddingLeft: em(20, 36),
        },
        h1: {
          fontSize: em(64, 24),
          marginTop: '0',
          marginBottom: em(56, 64),
          lineHeight: round(64 / 64),
        },
        h2: {
          fontSize: em(48, 24),
          marginTop: em(64, 48),
          marginBottom: em(40, 48),
          lineHeight: round(40 / 48),
        },
        h3: {
          fontSize: em(36, 24),
          marginTop: em(56, 36),
          marginBottom: em(24, 36),
          lineHeight: round(40 / 36),
        },
        h4: {}, // TODO
        img: {
          marginTop: em(48, 24),
          marginBottom: em(48, 24),
        },
        video: {
          marginTop: em(48, 24),
          marginBottom: em(48, 24),
        },
        figure: {
          marginTop: em(48, 24),
          marginBottom: em(48, 24),
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        'figure figcaption': {
          fontSize: em(20, 24),
          lineHeight: round(32 / 20),
          marginTop: em(20, 20),
        },
        code: {
          fontSize: em(20, 24),
          lineHeight: round(40 / 20),
          borderRadius: rem(6),
          paddingTop: em(8, 20),
          paddingRight: em(10, 20),
          paddingBottom: em(8, 20),
          paddingLeft: em(10, 20),
        },
        'h2 code': {
          lineHeight: round(40 / 32.4),
          paddingTop: em(6, 36),
          paddingRight: em(8, 36),
          paddingBottom: em(6, 36),
          paddingLeft: em(8, 36),
        },
        'h3 code': {
          lineHeight: round(40 / 27),
          paddingTop: em(4, 30),
          paddingRight: em(6, 30),
          paddingBottom: em(4, 30),
          paddingLeft: em(6, 30),
        },
        pre: {
          fontSize: em(20, 24),
          lineHeight: round(36 / 20),
          borderRadius: rem(6),
          paddingTop: em(32, 20),
          paddingRight: em(32, 20),
          paddingBottom: em(32, 20),
          paddingLeft: em(32, 20),
        },
        ol: {
          marginTop: em(32, 24),
          marginBottom: em(32, 24),
        },
        ul: {
          marginTop: em(32, 24),
          marginBottom: em(32, 24),
        },
        li: {
          marginTop: em(16, 24),
          marginBottom: em(16, 24),
        },
        'ol > li': {
          paddingLeft: em(48, 24),
        },
        'ul > li': {
          paddingLeft: em(48, 24),
        },
        'ul > li::before': {
          width: em(12, 24),
          height: em(2, 24),
          top: 'calc(0.888em - 0.0555em)',
        },
        '> ul > li p': {
          marginTop: em(20, 24),
          marginBottom: em(20, 24),
        },
        '> ul > li > *:first-child': {
          marginTop: em(32, 24),
        },
        '> ul > li > *:last-child': {
          marginBottom: em(32, 24),
        },
        '> ol > li > *:first-child': {
          marginTop: em(32, 24),
        },
        '> ol > li > *:last-child': {
          marginBottom: em(32, 24),
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: em(20, 24),
          marginBottom: em(20, 24),
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
      },
    },
  },
}
