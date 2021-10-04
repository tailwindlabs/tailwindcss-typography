const colors = require('tailwindcss/colors')
const { isUsableColor } = require('./utils')

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

module.exports = (theme) => ({
  DEFAULT: {
    css: [
      {
        '--tw-prose-body': theme('colors.gray.700', colors.gray[700]),
        '--tw-prose-headings': theme('colors.gray.900', colors.gray[900]),
        '--tw-prose-lead': theme('colors.gray.600', colors.gray[600]),
        '--tw-prose-links': theme('colors.gray.900', colors.gray[900]),
        '--tw-prose-bold': theme('colors.gray.900', colors.gray[900]),
        '--tw-prose-counters': theme('colors.gray.500', colors.gray[500]),
        '--tw-prose-bullets': theme('colors.gray.300', colors.gray[300]),
        '--tw-prose-rules': theme('colors.gray.200', colors.gray[200]),
        '--tw-prose-quotes': theme('colors.gray.900', colors.gray[900]),
        '--tw-prose-quote-borders': theme('colors.gray.200', colors.gray[200]),
        '--tw-prose-captions': theme('colors.gray.500', colors.gray[500]),
        '--tw-prose-code': theme('colors.gray.900', colors.gray[900]),
        '--tw-prose-pre-code': theme('colors.gray.200', colors.gray[200]),
        '--tw-prose-pre-bg': theme('colors.gray.800', colors.gray[800]),
        '--tw-prose-th-borders': theme('colors.gray.300', colors.gray[300]),
        '--tw-prose-td-borders': theme('colors.gray.200', colors.gray[200]),

        color: 'var(--tw-prose-body)',
        maxWidth: '65ch',
        '[class~="lead"]': {
          color: 'var(--tw-prose-lead)',
        },
        a: {
          color: 'var(--tw-prose-links)',
          textDecoration: 'underline',
          fontWeight: '500',
        },
        strong: {
          color: 'var(--tw-prose-bold)',
          fontWeight: '600',
        },
        'ol[type="A"]': {
          '--list-counter-style': 'upper-alpha',
        },
        'ol[type="a"]': {
          '--list-counter-style': 'lower-alpha',
        },
        'ol[type="A" s]': {
          '--list-counter-style': 'upper-alpha',
        },
        'ol[type="a" s]': {
          '--list-counter-style': 'lower-alpha',
        },
        'ol[type="I"]': {
          '--list-counter-style': 'upper-roman',
        },
        'ol[type="i"]': {
          '--list-counter-style': 'lower-roman',
        },
        'ol[type="I" s]': {
          '--list-counter-style': 'upper-roman',
        },
        'ol[type="i" s]': {
          '--list-counter-style': 'lower-roman',
        },
        'ol[type="1"]': {
          '--list-counter-style': 'decimal',
        },
        'ol > li': {
          position: 'relative',
        },
        'ol > li::before': {
          content: 'counter(list-item, var(--list-counter-style, decimal)) "."',
          position: 'absolute',
          fontWeight: '400',
          color: 'var(--tw-prose-counters)',
        },
        'ul > li': {
          position: 'relative',
        },
        'ul > li::before': {
          content: '""',
          position: 'absolute',
          backgroundColor: 'var(--tw-prose-bullets)',
          borderRadius: '50%',
        },
        hr: {
          borderColor: 'var(--tw-prose-rules)',
          borderTopWidth: 1,
        },
        blockquote: {
          fontWeight: '500',
          fontStyle: 'italic',
          color: 'var(--tw-prose-quotes)',
          borderLeftWidth: '0.25rem',
          borderLeftColor: 'var(--tw-prose-quote-borders)',
          quotes: '"\\201C""\\201D""\\2018""\\2019"',
        },
        'blockquote p:first-of-type::before': {
          content: 'open-quote',
        },
        'blockquote p:last-of-type::after': {
          content: 'close-quote',
        },
        h1: {
          color: 'var(--tw-prose-headings)',
          fontWeight: '800',
        },
        'h1 strong': {
          fontWeight: '900',
        },
        h2: {
          color: 'var(--tw-prose-headings)',
          fontWeight: '700',
        },
        'h2 strong': {
          fontWeight: '800',
        },
        h3: {
          color: 'var(--tw-prose-headings)',
          fontWeight: '600',
        },
        'h3 strong': {
          fontWeight: '700',
        },
        h4: {
          color: 'var(--tw-prose-headings)',
          fontWeight: '600',
        },
        'h4 strong': {
          fontWeight: '700',
        },
        // TODO: Figure out how to not need this, it's a merging issue
        'figure > *': {},
        'figure figcaption': {
          color: 'var(--tw-prose-captions)',
        },
        code: {
          color: 'var(--tw-prose-code)',
          fontWeight: '600',
        },
        'code::before': {
          content: '"`"',
        },
        'code::after': {
          content: '"`"',
        },
        'a code': {
          color: 'var(--tw-prose-links)',
        },
        pre: {
          color: 'var(--tw-prose-pre-code)',
          backgroundColor: 'var(--tw-prose-pre-bg)',
          overflowX: 'auto',
        },
        'pre code': {
          backgroundColor: 'transparent',
          borderWidth: '0',
          borderRadius: '0',
          padding: '0',
          fontWeight: '400',
          color: 'inherit',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          lineHeight: 'inherit',
        },
        'pre code::before': {
          content: 'none',
        },
        'pre code::after': {
          content: 'none',
        },
        table: {
          width: '100%',
          tableLayout: 'auto',
          textAlign: 'left',
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        thead: {
          color: 'var(--tw-prose-headings)',
          fontWeight: '600',
          borderBottomWidth: '1px',
          borderBottomColor: 'var(--tw-prose-th-borders)',
        },
        'thead th': {
          verticalAlign: 'bottom',
        },
        'tbody tr': {
          borderBottomWidth: '1px',
          borderBottomColor: 'var(--tw-prose-td-borders)',
        },
        'tbody tr:last-child': {
          borderBottomWidth: '0',
        },
        'tbody td': {
          verticalAlign: 'top',
        },
      },
      {
        fontSize: rem(16),
        lineHeight: round(28 / 16),
        p: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
        },
        '[class~="lead"]': {
          fontSize: em(20, 16),
          lineHeight: round(32 / 20),
          marginTop: em(24, 20),
          marginBottom: em(24, 20),
        },
        blockquote: {
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
          marginTop: em(24, 16),
          marginBottom: em(8, 16),
          lineHeight: round(24 / 16),
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
        },
        'h2 code': {
          fontSize: em(21, 24),
        },
        'h3 code': {
          fontSize: em(18, 20),
        },
        pre: {
          fontSize: em(14, 16),
          lineHeight: round(24 / 14),
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
          borderRadius: rem(6),
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
          paddingLeft: em(28, 16),
        },
        'ol > li::before': {
          left: '0',
        },
        'ul > li': {
          paddingLeft: em(28, 16),
        },
        'ul > li::before': {
          width: em(6, 16),
          height: em(6, 16),
          top: `calc(${em(28 / 2, 16)} - ${em(3, 16)})`,
          left: em(4, 16),
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
        hr: {
          marginTop: em(48, 16),
          marginBottom: em(48, 16),
        },
        'hr + *': {
          marginTop: '0',
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
        table: {
          fontSize: em(14, 16),
          lineHeight: round(24 / 14),
        },
        'thead th': {
          paddingRight: em(8, 14),
          paddingBottom: em(8, 14),
          paddingLeft: em(8, 14),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody td': {
          paddingTop: em(8, 14),
          paddingRight: em(8, 14),
          paddingBottom: em(8, 14),
          paddingLeft: em(8, 14),
        },
        'tbody td:first-child': {
          paddingLeft: '0',
        },
        'tbody td:last-child': {
          paddingRight: '0',
        },
      },
      {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },
      },
    ],
  },
  sm: {
    css: [
      {
        fontSize: rem(14),
        lineHeight: round(24 / 14),
        p: {
          marginTop: em(16, 14),
          marginBottom: em(16, 14),
        },
        '[class~="lead"]': {
          fontSize: em(18, 14),
          lineHeight: round(28 / 18),
          marginTop: em(16, 18),
          marginBottom: em(16, 18),
        },
        blockquote: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
          paddingLeft: em(20, 18),
        },
        h1: {
          fontSize: em(30, 14),
          marginTop: '0',
          marginBottom: em(24, 30),
          lineHeight: round(36 / 30),
        },
        h2: {
          fontSize: em(20, 14),
          marginTop: em(32, 20),
          marginBottom: em(16, 20),
          lineHeight: round(28 / 20),
        },
        h3: {
          fontSize: em(18, 14),
          marginTop: em(28, 18),
          marginBottom: em(8, 18),
          lineHeight: round(28 / 18),
        },
        h4: {
          marginTop: em(20, 14),
          marginBottom: em(8, 14),
          lineHeight: round(20 / 14),
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
        },
        'h2 code': {
          fontSize: em(18, 20),
        },
        'h3 code': {
          fontSize: em(16, 18),
        },
        pre: {
          fontSize: em(12, 14),
          lineHeight: round(20 / 12),
          marginTop: em(20, 12),
          marginBottom: em(20, 12),
          borderRadius: rem(4),
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
          paddingLeft: em(22, 14),
        },
        'ol > li::before': {
          left: '0',
        },
        'ul > li': {
          paddingLeft: em(22, 14),
        },
        'ul > li::before': {
          height: em(5, 14),
          width: em(5, 14),
          top: `calc(${em(24 / 2, 14)} - ${em(2.5, 14)})`,
          left: em(3, 14),
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
        hr: {
          marginTop: em(40, 14),
          marginBottom: em(40, 14),
        },
        'hr + *': {
          marginTop: '0',
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
        table: {
          fontSize: em(12, 14),
          lineHeight: round(18 / 12),
        },
        'thead th': {
          paddingRight: em(12, 12),
          paddingBottom: em(8, 12),
          paddingLeft: em(12, 12),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody td': {
          paddingTop: em(8, 12),
          paddingRight: em(12, 12),
          paddingBottom: em(8, 12),
          paddingLeft: em(12, 12),
        },
        'tbody td:first-child': {
          paddingLeft: '0',
        },
        'tbody td:last-child': {
          paddingRight: '0',
        },
      },
      {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },
      },
    ],
  },
  lg: {
    css: [
      {
        fontSize: rem(18),
        lineHeight: round(32 / 18),
        p: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
        },
        '[class~="lead"]': {
          fontSize: em(22, 18),
          lineHeight: round(32 / 22),
          marginTop: em(24, 22),
          marginBottom: em(24, 22),
        },
        blockquote: {
          marginTop: em(40, 24),
          marginBottom: em(40, 24),
          paddingLeft: em(24, 24),
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
        h4: {
          marginTop: em(32, 18),
          marginBottom: em(8, 18),
          lineHeight: round(28 / 18),
        },
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
        },
        'h2 code': {
          fontSize: em(26, 30),
        },
        'h3 code': {
          fontSize: em(21, 24),
        },
        pre: {
          fontSize: em(16, 18),
          lineHeight: round(28 / 16),
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
          borderRadius: rem(6),
          paddingTop: em(16, 16),
          paddingRight: em(24, 16),
          paddingBottom: em(16, 16),
          paddingLeft: em(24, 16),
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
          paddingLeft: em(30, 18),
        },
        'ol > li::before': {
          left: '0',
        },
        'ul > li': {
          paddingLeft: em(30, 18),
        },
        'ul > li::before': {
          width: em(6, 18),
          height: em(6, 18),
          top: `calc(${em(32 / 2, 18)} - ${em(3, 18)})`,
          left: em(4, 18),
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
        hr: {
          marginTop: em(56, 18),
          marginBottom: em(56, 18),
        },
        'hr + *': {
          marginTop: '0',
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
        table: {
          fontSize: em(16, 18),
          lineHeight: round(24 / 16),
        },
        'thead th': {
          paddingRight: em(12, 16),
          paddingBottom: em(12, 16),
          paddingLeft: em(12, 16),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody td': {
          paddingTop: em(12, 16),
          paddingRight: em(12, 16),
          paddingBottom: em(12, 16),
          paddingLeft: em(12, 16),
        },
        'tbody td:first-child': {
          paddingLeft: '0',
        },
        'tbody td:last-child': {
          paddingRight: '0',
        },
      },
      {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },
      },
    ],
  },
  xl: {
    css: [
      {
        fontSize: rem(20),
        lineHeight: round(36 / 20),
        p: {
          marginTop: em(24, 20),
          marginBottom: em(24, 20),
        },
        '[class~="lead"]': {
          fontSize: em(24, 20),
          lineHeight: round(36 / 24),
          marginTop: em(24, 24),
          marginBottom: em(24, 24),
        },
        blockquote: {
          marginTop: em(48, 30),
          marginBottom: em(48, 30),
          paddingLeft: em(32, 30),
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
        h4: {
          marginTop: em(36, 20),
          marginBottom: em(12, 20),
          lineHeight: round(32 / 20),
        },
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
          lineHeight: round(28 / 18),
          marginTop: em(18, 18),
        },
        code: {
          fontSize: em(18, 20),
        },
        'h2 code': {
          fontSize: em(31, 36),
        },
        'h3 code': {
          fontSize: em(27, 30),
        },
        pre: {
          fontSize: em(18, 20),
          lineHeight: round(32 / 18),
          marginTop: em(36, 18),
          marginBottom: em(36, 18),
          borderRadius: rem(8),
          paddingTop: em(20, 18),
          paddingRight: em(24, 18),
          paddingBottom: em(20, 18),
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
          paddingLeft: em(36, 20),
        },
        'ol > li::before': {
          left: '0',
        },
        'ul > li': {
          paddingLeft: em(36, 20),
        },
        'ul > li::before': {
          width: em(7, 20),
          height: em(7, 20),
          top: `calc(${em(36 / 2, 20)} - ${em(3.5, 20)})`,
          left: em(5, 20),
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
        hr: {
          marginTop: em(56, 20),
          marginBottom: em(56, 20),
        },
        'hr + *': {
          marginTop: '0',
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
        table: {
          fontSize: em(18, 20),
          lineHeight: round(28 / 18),
        },
        'thead th': {
          paddingRight: em(12, 18),
          paddingBottom: em(16, 18),
          paddingLeft: em(12, 18),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody td': {
          paddingTop: em(16, 18),
          paddingRight: em(12, 18),
          paddingBottom: em(16, 18),
          paddingLeft: em(12, 18),
        },
        'tbody td:first-child': {
          paddingLeft: '0',
        },
        'tbody td:last-child': {
          paddingRight: '0',
        },
      },
      {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },
      },
    ],
  },
  '2xl': {
    css: [
      {
        fontSize: rem(24),
        lineHeight: round(40 / 24),
        p: {
          marginTop: em(32, 24),
          marginBottom: em(32, 24),
        },
        '[class~="lead"]': {
          fontSize: em(30, 24),
          lineHeight: round(44 / 30),
          marginTop: em(32, 30),
          marginBottom: em(32, 30),
        },
        blockquote: {
          marginTop: em(64, 36),
          marginBottom: em(64, 36),
          paddingLeft: em(40, 36),
        },
        h1: {
          fontSize: em(64, 24),
          marginTop: '0',
          marginBottom: em(56, 64),
          lineHeight: round(64 / 64),
        },
        h2: {
          fontSize: em(48, 24),
          marginTop: em(72, 48),
          marginBottom: em(40, 48),
          lineHeight: round(52 / 48),
        },
        h3: {
          fontSize: em(36, 24),
          marginTop: em(56, 36),
          marginBottom: em(24, 36),
          lineHeight: round(44 / 36),
        },
        h4: {
          marginTop: em(40, 24),
          marginBottom: em(16, 24),
          lineHeight: round(36 / 24),
        },
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
        },
        'h2 code': {
          fontSize: em(42, 48),
        },
        'h3 code': {
          fontSize: em(32, 36),
        },
        pre: {
          fontSize: em(20, 24),
          lineHeight: round(36 / 20),
          marginTop: em(40, 20),
          marginBottom: em(40, 20),
          borderRadius: rem(8),
          paddingTop: em(24, 20),
          paddingRight: em(32, 20),
          paddingBottom: em(24, 20),
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
          marginTop: em(12, 24),
          marginBottom: em(12, 24),
        },
        'ol > li': {
          paddingLeft: em(40, 24),
        },
        'ol > li::before': {
          left: '0',
        },
        'ul > li': {
          paddingLeft: em(40, 24),
        },
        'ul > li::before': {
          width: em(8, 24),
          height: em(8, 24),
          top: `calc(${em(40 / 2, 24)} - ${em(4, 24)})`,
          left: em(6, 24),
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
          marginTop: em(16, 24),
          marginBottom: em(16, 24),
        },
        hr: {
          marginTop: em(72, 24),
          marginBottom: em(72, 24),
        },
        'hr + *': {
          marginTop: '0',
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
        table: {
          fontSize: em(20, 24),
          lineHeight: round(28 / 20),
        },
        'thead th': {
          paddingRight: em(12, 20),
          paddingBottom: em(16, 20),
          paddingLeft: em(12, 20),
        },
        'thead th:first-child': {
          paddingLeft: '0',
        },
        'thead th:last-child': {
          paddingRight: '0',
        },
        'tbody td': {
          paddingTop: em(16, 20),
          paddingRight: em(12, 20),
          paddingBottom: em(16, 20),
          paddingLeft: em(12, 20),
        },
        'tbody td:first-child': {
          paddingLeft: '0',
        },
        'tbody td:last-child': {
          paddingRight: '0',
        },
      },
      {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },
      },
    ],
  },

  slate: {
    css: [
      {
        '--tw-prose-body': theme('colors.slate.700', colors.slate[700]),
        '--tw-prose-headings': theme('colors.slate.900', colors.slate[900]),
        '--tw-prose-lead': theme('colors.slate.600', colors.slate[600]),
        '--tw-prose-links': theme('colors.slate.900', colors.slate[900]),
        '--tw-prose-bold': theme('colors.slate.900', colors.slate[900]),
        '--tw-prose-counters': theme('colors.slate.500', colors.slate[500]),
        '--tw-prose-bullets': theme('colors.slate.300', colors.slate[300]),
        '--tw-prose-rules': theme('colors.slate.200', colors.slate[200]),
        '--tw-prose-quotes': theme('colors.slate.900', colors.slate[900]),
        '--tw-prose-quote-borders': theme('colors.slate.200', colors.slate[200]),
        '--tw-prose-captions': theme('colors.slate.500', colors.slate[500]),
        '--tw-prose-code': theme('colors.slate.900', colors.slate[900]),
        '--tw-prose-pre-code': theme('colors.slate.200', colors.slate[200]),
        '--tw-prose-pre-bg': theme('colors.slate.800', colors.slate[800]),
        '--tw-prose-th-borders': theme('colors.slate.300', colors.slate[300]),
        '--tw-prose-td-borders': theme('colors.slate.200', colors.slate[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.slate.300', colors.slate[300]),
        '--tw-prose-invert-headings': theme('colors.white', colors.white),
        '--tw-prose-invert-lead': theme('colors.slate.400', colors.slate[400]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.slate.400', colors.slate[400]),
        '--tw-prose-invert-bullets': theme('colors.slate.600', colors.slate[600]),
        '--tw-prose-invert-rules': theme('colors.slate.700', colors.slate[700]),
        '--tw-prose-invert-quotes': theme('colors.slate.100', colors.slate[100]),
        '--tw-prose-invert-quote-borders': theme('colors.slate.700', colors.slate[700]),
        '--tw-prose-invert-captions': theme('colors.slate.400', colors.slate[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.slate.200', colors.slate[200]),
        '--tw-prose-invert-pre-bg': theme('colors.slate.800', colors.slate[800]),
        '--tw-prose-invert-th-borders': theme('colors.slate.600', colors.slate[600]),
        '--tw-prose-invert-td-borders': theme('colors.slate.700', colors.slate[700]),
      },
    ],
  },

  gray: {
    css: [
      {
        '--tw-prose-body': theme('colors.gray.700', colors.gray[700]),
        '--tw-prose-headings': theme('colors.gray.900', colors.gray[900]),
        '--tw-prose-lead': theme('colors.gray.600', colors.gray[600]),
        '--tw-prose-links': theme('colors.gray.900', colors.gray[900]),
        '--tw-prose-bold': theme('colors.gray.900', colors.gray[900]),
        '--tw-prose-counters': theme('colors.gray.500', colors.gray[500]),
        '--tw-prose-bullets': theme('colors.gray.300', colors.gray[300]),
        '--tw-prose-rules': theme('colors.gray.200', colors.gray[200]),
        '--tw-prose-quotes': theme('colors.gray.900', colors.gray[900]),
        '--tw-prose-quote-borders': theme('colors.gray.200', colors.gray[200]),
        '--tw-prose-captions': theme('colors.gray.500', colors.gray[500]),
        '--tw-prose-code': theme('colors.gray.900', colors.gray[900]),
        '--tw-prose-pre-code': theme('colors.gray.200', colors.gray[200]),
        '--tw-prose-pre-bg': theme('colors.gray.800', colors.gray[800]),
        '--tw-prose-th-borders': theme('colors.gray.300', colors.gray[300]),
        '--tw-prose-td-borders': theme('colors.gray.200', colors.gray[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.gray.300', colors.gray[300]),
        '--tw-prose-invert-headings': theme('colors.white', colors.white),
        '--tw-prose-invert-lead': theme('colors.gray.400', colors.gray[400]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.gray.400', colors.gray[400]),
        '--tw-prose-invert-bullets': theme('colors.gray.600', colors.gray[600]),
        '--tw-prose-invert-rules': theme('colors.gray.700', colors.gray[700]),
        '--tw-prose-invert-quotes': theme('colors.gray.100', colors.gray[100]),
        '--tw-prose-invert-quote-borders': theme('colors.gray.700', colors.gray[700]),
        '--tw-prose-invert-captions': theme('colors.gray.400', colors.gray[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.gray.200', colors.gray[200]),
        '--tw-prose-invert-pre-bg': theme('colors.gray.800', colors.gray[800]),
        '--tw-prose-invert-th-borders': theme('colors.gray.600', colors.gray[600]),
        '--tw-prose-invert-td-borders': theme('colors.gray.700', colors.gray[700]),
      },
    ],
  },

  zinc: {
    css: [
      {
        '--tw-prose-body': theme('colors.zinc.700', colors.zinc[700]),
        '--tw-prose-headings': theme('colors.zinc.900', colors.zinc[900]),
        '--tw-prose-lead': theme('colors.zinc.600', colors.zinc[600]),
        '--tw-prose-links': theme('colors.zinc.900', colors.zinc[900]),
        '--tw-prose-bold': theme('colors.zinc.900', colors.zinc[900]),
        '--tw-prose-counters': theme('colors.zinc.500', colors.zinc[500]),
        '--tw-prose-bullets': theme('colors.zinc.300', colors.zinc[300]),
        '--tw-prose-rules': theme('colors.zinc.200', colors.zinc[200]),
        '--tw-prose-quotes': theme('colors.zinc.900', colors.zinc[900]),
        '--tw-prose-quote-borders': theme('colors.zinc.200', colors.zinc[200]),
        '--tw-prose-captions': theme('colors.zinc.500', colors.zinc[500]),
        '--tw-prose-code': theme('colors.zinc.900', colors.zinc[900]),
        '--tw-prose-pre-code': theme('colors.zinc.200', colors.zinc[200]),
        '--tw-prose-pre-bg': theme('colors.zinc.800', colors.zinc[800]),
        '--tw-prose-th-borders': theme('colors.zinc.300', colors.zinc[300]),
        '--tw-prose-td-borders': theme('colors.zinc.200', colors.zinc[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.zinc.300', colors.zinc[300]),
        '--tw-prose-invert-headings': theme('colors.white', colors.white),
        '--tw-prose-invert-lead': theme('colors.zinc.400', colors.zinc[400]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.zinc.400', colors.zinc[400]),
        '--tw-prose-invert-bullets': theme('colors.zinc.600', colors.zinc[600]),
        '--tw-prose-invert-rules': theme('colors.zinc.700', colors.zinc[700]),
        '--tw-prose-invert-quotes': theme('colors.zinc.100', colors.zinc[100]),
        '--tw-prose-invert-quote-borders': theme('colors.zinc.700', colors.zinc[700]),
        '--tw-prose-invert-captions': theme('colors.zinc.400', colors.zinc[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.zinc.200', colors.zinc[200]),
        '--tw-prose-invert-pre-bg': theme('colors.zinc.800', colors.zinc[800]),
        '--tw-prose-invert-th-borders': theme('colors.zinc.600', colors.zinc[600]),
        '--tw-prose-invert-td-borders': theme('colors.zinc.700', colors.zinc[700]),
      },
    ],
  },

  neutral: {
    css: [
      {
        '--tw-prose-body': theme('colors.neutral.700', colors.neutral[700]),
        '--tw-prose-headings': theme('colors.neutral.900', colors.neutral[900]),
        '--tw-prose-lead': theme('colors.neutral.600', colors.neutral[600]),
        '--tw-prose-links': theme('colors.neutral.900', colors.neutral[900]),
        '--tw-prose-bold': theme('colors.neutral.900', colors.neutral[900]),
        '--tw-prose-counters': theme('colors.neutral.500', colors.neutral[500]),
        '--tw-prose-bullets': theme('colors.neutral.300', colors.neutral[300]),
        '--tw-prose-rules': theme('colors.neutral.200', colors.neutral[200]),
        '--tw-prose-quotes': theme('colors.neutral.900', colors.neutral[900]),
        '--tw-prose-quote-borders': theme('colors.neutral.200', colors.neutral[200]),
        '--tw-prose-captions': theme('colors.neutral.500', colors.neutral[500]),
        '--tw-prose-code': theme('colors.neutral.900', colors.neutral[900]),
        '--tw-prose-pre-code': theme('colors.neutral.200', colors.neutral[200]),
        '--tw-prose-pre-bg': theme('colors.neutral.800', colors.neutral[800]),
        '--tw-prose-th-borders': theme('colors.neutral.300', colors.neutral[300]),
        '--tw-prose-td-borders': theme('colors.neutral.200', colors.neutral[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.neutral.300', colors.neutral[300]),
        '--tw-prose-invert-headings': theme('colors.white', colors.white),
        '--tw-prose-invert-lead': theme('colors.neutral.400', colors.neutral[400]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.neutral.400', colors.neutral[400]),
        '--tw-prose-invert-bullets': theme('colors.neutral.600', colors.neutral[600]),
        '--tw-prose-invert-rules': theme('colors.neutral.700', colors.neutral[700]),
        '--tw-prose-invert-quotes': theme('colors.neutral.100', colors.neutral[100]),
        '--tw-prose-invert-quote-borders': theme('colors.neutral.700', colors.neutral[700]),
        '--tw-prose-invert-captions': theme('colors.neutral.400', colors.neutral[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.neutral.200', colors.neutral[200]),
        '--tw-prose-invert-pre-bg': theme('colors.neutral.800', colors.neutral[800]),
        '--tw-prose-invert-th-borders': theme('colors.neutral.600', colors.neutral[600]),
        '--tw-prose-invert-td-borders': theme('colors.neutral.700', colors.neutral[700]),
      },
    ],
  },

  stone: {
    css: [
      {
        '--tw-prose-body': theme('colors.stone.700', colors.stone[700]),
        '--tw-prose-headings': theme('colors.stone.900', colors.stone[900]),
        '--tw-prose-lead': theme('colors.stone.600', colors.stone[600]),
        '--tw-prose-links': theme('colors.stone.900', colors.stone[900]),
        '--tw-prose-bold': theme('colors.stone.900', colors.stone[900]),
        '--tw-prose-counters': theme('colors.stone.500', colors.stone[500]),
        '--tw-prose-bullets': theme('colors.stone.300', colors.stone[300]),
        '--tw-prose-rules': theme('colors.stone.200', colors.stone[200]),
        '--tw-prose-quotes': theme('colors.stone.900', colors.stone[900]),
        '--tw-prose-quote-borders': theme('colors.stone.200', colors.stone[200]),
        '--tw-prose-captions': theme('colors.stone.500', colors.stone[500]),
        '--tw-prose-code': theme('colors.stone.900', colors.stone[900]),
        '--tw-prose-pre-code': theme('colors.stone.200', colors.stone[200]),
        '--tw-prose-pre-bg': theme('colors.stone.800', colors.stone[800]),
        '--tw-prose-th-borders': theme('colors.stone.300', colors.stone[300]),
        '--tw-prose-td-borders': theme('colors.stone.200', colors.stone[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.stone.300', colors.stone[300]),
        '--tw-prose-invert-headings': theme('colors.white', colors.white),
        '--tw-prose-invert-lead': theme('colors.stone.400', colors.stone[400]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.stone.400', colors.stone[400]),
        '--tw-prose-invert-bullets': theme('colors.stone.600', colors.stone[600]),
        '--tw-prose-invert-rules': theme('colors.stone.700', colors.stone[700]),
        '--tw-prose-invert-quotes': theme('colors.stone.100', colors.stone[100]),
        '--tw-prose-invert-quote-borders': theme('colors.stone.700', colors.stone[700]),
        '--tw-prose-invert-captions': theme('colors.stone.400', colors.stone[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.stone.200', colors.stone[200]),
        '--tw-prose-invert-pre-bg': theme('colors.stone.800', colors.stone[800]),
        '--tw-prose-invert-th-borders': theme('colors.stone.600', colors.stone[600]),
        '--tw-prose-invert-td-borders': theme('colors.stone.700', colors.stone[700]),
      },
    ],
  },

  red: {
    css: [
      {
        '--tw-prose-body': theme('colors.red.800', colors.red[800]),
        '--tw-prose-headings': theme('colors.red.700', colors.red[700]),
        '--tw-prose-lead': theme('colors.red.700', colors.red[700]),
        '--tw-prose-links': theme('colors.red.900', colors.red[900]),
        '--tw-prose-bold': theme('colors.red.900', colors.red[900]),
        '--tw-prose-counters': theme('colors.red.400', colors.red[400]),
        '--tw-prose-bullets': theme('colors.red.300', colors.red[300]),
        '--tw-prose-rules': theme('colors.red.200', colors.red[200]),
        '--tw-prose-quotes': theme('colors.red.900', colors.red[900]),
        '--tw-prose-quote-borders': theme('colors.red.200', colors.red[200]),
        '--tw-prose-captions': theme('colors.red.700', colors.red[700]),
        '--tw-prose-code': theme('colors.red.900', colors.red[900]),
        '--tw-prose-pre-code': theme('colors.red.200', colors.red[200]),
        '--tw-prose-pre-bg': theme('colors.red.900', colors.red[900]),
        '--tw-prose-th-borders': theme('colors.red.300', colors.red[300]),
        '--tw-prose-td-borders': theme('colors.red.200', colors.red[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.red.200', colors.red[200]),
        '--tw-prose-invert-headings': theme('colors.red.500', colors.red[500]),
        '--tw-prose-invert-lead': theme('colors.red.300', colors.red[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.red.300', colors.red[300]),
        '--tw-prose-invert-bullets': theme('colors.red.400', colors.red[400]),
        '--tw-prose-invert-rules': theme('colors.red.700', colors.red[700]),
        '--tw-prose-invert-quotes': theme('colors.red.200', colors.red[200]),
        '--tw-prose-invert-quote-borders': theme('colors.red.700', colors.red[700]),
        '--tw-prose-invert-captions': theme('colors.red.400', colors.red[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.red.200', colors.red[200]),
        '--tw-prose-invert-pre-bg': theme('colors.red.900', colors.red[900]),
        '--tw-prose-invert-th-borders': theme('colors.red.600', colors.red[600]),
        '--tw-prose-invert-td-borders': theme('colors.red.700', colors.red[700]),
      },
    ],
  },

  orange: {
    css: [
      {
        '--tw-prose-body': theme('colors.orange.800', colors.orange[800]),
        '--tw-prose-headings': theme('colors.orange.900', colors.orange[900]),
        '--tw-prose-lead': theme('colors.orange.700', colors.orange[700]),
        '--tw-prose-links': theme('colors.orange.900', colors.orange[900]),
        '--tw-prose-bold': theme('colors.orange.900', colors.orange[900]),
        '--tw-prose-counters': theme('colors.orange.400', colors.orange[400]),
        '--tw-prose-bullets': theme('colors.orange.300', colors.orange[300]),
        '--tw-prose-rules': theme('colors.orange.200', colors.orange[200]),
        '--tw-prose-quotes': theme('colors.orange.900', colors.orange[900]),
        '--tw-prose-quote-borders': theme('colors.orange.200', colors.orange[200]),
        '--tw-prose-captions': theme('colors.orange.700', colors.orange[700]),
        '--tw-prose-code': theme('colors.orange.900', colors.orange[900]),
        '--tw-prose-pre-code': theme('colors.orange.200', colors.orange[200]),
        '--tw-prose-pre-bg': theme('colors.orange.900', colors.orange[900]),
        '--tw-prose-th-borders': theme('colors.orange.300', colors.orange[300]),
        '--tw-prose-td-borders': theme('colors.orange.200', colors.orange[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.orange.200', colors.orange[200]),
        '--tw-prose-invert-headings': theme('colors.orange.100', colors.orange[100]),
        '--tw-prose-invert-lead': theme('colors.orange.300', colors.orange[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.orange.300', colors.orange[300]),
        '--tw-prose-invert-bullets': theme('colors.orange.400', colors.orange[400]),
        '--tw-prose-invert-rules': theme('colors.orange.700', colors.orange[700]),
        '--tw-prose-invert-quotes': theme('colors.orange.200', colors.orange[200]),
        '--tw-prose-invert-quote-borders': theme('colors.orange.700', colors.orange[700]),
        '--tw-prose-invert-captions': theme('colors.orange.400', colors.orange[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.orange.200', colors.orange[200]),
        '--tw-prose-invert-pre-bg': theme('colors.orange.900', colors.orange[900]),
        '--tw-prose-invert-th-borders': theme('colors.orange.600', colors.orange[600]),
        '--tw-prose-invert-td-borders': theme('colors.orange.700', colors.orange[700]),
      },
    ],
  },

  amber: {
    css: [
      {
        '--tw-prose-body': theme('colors.amber.800', colors.amber[800]),
        '--tw-prose-headings': theme('colors.amber.900', colors.amber[900]),
        '--tw-prose-lead': theme('colors.amber.700', colors.amber[700]),
        '--tw-prose-links': theme('colors.amber.900', colors.amber[900]),
        '--tw-prose-bold': theme('colors.amber.900', colors.amber[900]),
        '--tw-prose-counters': theme('colors.amber.400', colors.amber[400]),
        '--tw-prose-bullets': theme('colors.amber.300', colors.amber[300]),
        '--tw-prose-rules': theme('colors.amber.200', colors.amber[200]),
        '--tw-prose-quotes': theme('colors.amber.900', colors.amber[900]),
        '--tw-prose-quote-borders': theme('colors.amber.200', colors.amber[200]),
        '--tw-prose-captions': theme('colors.amber.700', colors.amber[700]),
        '--tw-prose-code': theme('colors.amber.900', colors.amber[900]),
        '--tw-prose-pre-code': theme('colors.amber.200', colors.amber[200]),
        '--tw-prose-pre-bg': theme('colors.amber.900', colors.amber[900]),
        '--tw-prose-th-borders': theme('colors.amber.300', colors.amber[300]),
        '--tw-prose-td-borders': theme('colors.amber.200', colors.amber[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.amber.200', colors.amber[200]),
        '--tw-prose-invert-headings': theme('colors.amber.100', colors.amber[100]),
        '--tw-prose-invert-lead': theme('colors.amber.300', colors.amber[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.amber.300', colors.amber[300]),
        '--tw-prose-invert-bullets': theme('colors.amber.400', colors.amber[400]),
        '--tw-prose-invert-rules': theme('colors.amber.700', colors.amber[700]),
        '--tw-prose-invert-quotes': theme('colors.amber.200', colors.amber[200]),
        '--tw-prose-invert-quote-borders': theme('colors.amber.700', colors.amber[700]),
        '--tw-prose-invert-captions': theme('colors.amber.400', colors.amber[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.amber.200', colors.amber[200]),
        '--tw-prose-invert-pre-bg': theme('colors.amber.900', colors.amber[900]),
        '--tw-prose-invert-th-borders': theme('colors.amber.600', colors.amber[600]),
        '--tw-prose-invert-td-borders': theme('colors.amber.700', colors.amber[700]),
      },
    ],
  },

  yellow: {
    css: [
      {
        '--tw-prose-body': theme('colors.yellow.800', colors.yellow[800]),
        '--tw-prose-headings': theme('colors.yellow.900', colors.yellow[900]),
        '--tw-prose-lead': theme('colors.yellow.700', colors.yellow[700]),
        '--tw-prose-links': theme('colors.yellow.900', colors.yellow[900]),
        '--tw-prose-bold': theme('colors.yellow.900', colors.yellow[900]),
        '--tw-prose-counters': theme('colors.yellow.400', colors.yellow[400]),
        '--tw-prose-bullets': theme('colors.yellow.300', colors.yellow[300]),
        '--tw-prose-rules': theme('colors.yellow.200', colors.yellow[200]),
        '--tw-prose-quotes': theme('colors.yellow.900', colors.yellow[900]),
        '--tw-prose-quote-borders': theme('colors.yellow.200', colors.yellow[200]),
        '--tw-prose-captions': theme('colors.yellow.700', colors.yellow[700]),
        '--tw-prose-code': theme('colors.yellow.900', colors.yellow[900]),
        '--tw-prose-pre-code': theme('colors.yellow.200', colors.yellow[200]),
        '--tw-prose-pre-bg': theme('colors.yellow.900', colors.yellow[900]),
        '--tw-prose-th-borders': theme('colors.yellow.300', colors.yellow[300]),
        '--tw-prose-td-borders': theme('colors.yellow.200', colors.yellow[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.yellow.200', colors.yellow[200]),
        '--tw-prose-invert-headings': theme('colors.yellow.100', colors.yellow[100]),
        '--tw-prose-invert-lead': theme('colors.yellow.300', colors.yellow[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.yellow.300', colors.yellow[300]),
        '--tw-prose-invert-bullets': theme('colors.yellow.400', colors.yellow[400]),
        '--tw-prose-invert-rules': theme('colors.yellow.700', colors.yellow[700]),
        '--tw-prose-invert-quotes': theme('colors.yellow.200', colors.yellow[200]),
        '--tw-prose-invert-quote-borders': theme('colors.yellow.700', colors.yellow[700]),
        '--tw-prose-invert-captions': theme('colors.yellow.400', colors.yellow[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.yellow.200', colors.yellow[200]),
        '--tw-prose-invert-pre-bg': theme('colors.yellow.900', colors.yellow[900]),
        '--tw-prose-invert-th-borders': theme('colors.yellow.600', colors.yellow[600]),
        '--tw-prose-invert-td-borders': theme('colors.yellow.700', colors.yellow[700]),
      },
    ],
  },

  lime: {
    css: [
      {
        '--tw-prose-body': theme('colors.lime.800', colors.lime[800]),
        '--tw-prose-headings': theme('colors.lime.900', colors.lime[900]),
        '--tw-prose-lead': theme('colors.lime.700', colors.lime[700]),
        '--tw-prose-links': theme('colors.lime.900', colors.lime[900]),
        '--tw-prose-bold': theme('colors.lime.900', colors.lime[900]),
        '--tw-prose-counters': theme('colors.lime.400', colors.lime[400]),
        '--tw-prose-bullets': theme('colors.lime.300', colors.lime[300]),
        '--tw-prose-rules': theme('colors.lime.200', colors.lime[200]),
        '--tw-prose-quotes': theme('colors.lime.900', colors.lime[900]),
        '--tw-prose-quote-borders': theme('colors.lime.200', colors.lime[200]),
        '--tw-prose-captions': theme('colors.lime.700', colors.lime[700]),
        '--tw-prose-code': theme('colors.lime.900', colors.lime[900]),
        '--tw-prose-pre-code': theme('colors.lime.200', colors.lime[200]),
        '--tw-prose-pre-bg': theme('colors.lime.900', colors.lime[900]),
        '--tw-prose-th-borders': theme('colors.lime.300', colors.lime[300]),
        '--tw-prose-td-borders': theme('colors.lime.200', colors.lime[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.lime.300', colors.lime[300]),
        '--tw-prose-invert-headings': theme('colors.lime.400', colors.lime[400]),
        '--tw-prose-invert-lead': theme('colors.lime.300', colors.lime[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.lime.300', colors.lime[300]),
        '--tw-prose-invert-bullets': theme('colors.lime.400', colors.lime[400]),
        '--tw-prose-invert-rules': theme('colors.lime.700', colors.lime[700]),
        '--tw-prose-invert-quotes': theme('colors.lime.200', colors.lime[200]),
        '--tw-prose-invert-quote-borders': theme('colors.lime.700', colors.lime[700]),
        '--tw-prose-invert-captions': theme('colors.lime.400', colors.lime[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.lime.200', colors.lime[200]),
        '--tw-prose-invert-pre-bg': theme('colors.lime.900', colors.lime[900]),
        '--tw-prose-invert-th-borders': theme('colors.lime.600', colors.lime[600]),
        '--tw-prose-invert-td-borders': theme('colors.lime.700', colors.lime[700]),
      },
    ],
  },

  green: {
    css: [
      {
        '--tw-prose-body': theme('colors.green.800', colors.green[800]),
        '--tw-prose-headings': theme('colors.green.900', colors.green[900]),
        '--tw-prose-lead': theme('colors.green.700', colors.green[700]),
        '--tw-prose-links': theme('colors.green.900', colors.green[900]),
        '--tw-prose-bold': theme('colors.green.900', colors.green[900]),
        '--tw-prose-counters': theme('colors.green.600', colors.green[600]),
        '--tw-prose-bullets': theme('colors.green.300', colors.green[300]),
        '--tw-prose-rules': theme('colors.green.200', colors.green[200]),
        '--tw-prose-quotes': theme('colors.green.900', colors.green[900]),
        '--tw-prose-quote-borders': theme('colors.green.200', colors.green[200]),
        '--tw-prose-captions': theme('colors.green.700', colors.green[700]),
        '--tw-prose-code': theme('colors.green.900', colors.green[900]),
        '--tw-prose-pre-code': theme('colors.green.200', colors.green[200]),
        '--tw-prose-pre-bg': theme('colors.green.900', colors.green[900]),
        '--tw-prose-th-borders': theme('colors.green.300', colors.green[300]),
        '--tw-prose-td-borders': theme('colors.green.200', colors.green[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.green.200', colors.green[200]),
        '--tw-prose-invert-headings': theme('colors.green.100', colors.green[100]),
        '--tw-prose-invert-lead': theme('colors.green.300', colors.green[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.green.300', colors.green[300]),
        '--tw-prose-invert-bullets': theme('colors.green.400', colors.green[400]),
        '--tw-prose-invert-rules': theme('colors.green.700', colors.green[700]),
        '--tw-prose-invert-quotes': theme('colors.green.200', colors.green[200]),
        '--tw-prose-invert-quote-borders': theme('colors.green.700', colors.green[700]),
        '--tw-prose-invert-captions': theme('colors.green.400', colors.green[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.green.200', colors.green[200]),
        '--tw-prose-invert-pre-bg': theme('colors.green.900', colors.green[900]),
        '--tw-prose-invert-th-borders': theme('colors.green.600', colors.green[600]),
        '--tw-prose-invert-td-borders': theme('colors.green.700', colors.green[700]),
      },
    ],
  },

  emerald: {
    css: [
      {
        '--tw-prose-body': theme('colors.emerald.800', colors.emerald[800]),
        '--tw-prose-headings': theme('colors.emerald.900', colors.emerald[900]),
        '--tw-prose-lead': theme('colors.emerald.700', colors.emerald[700]),
        '--tw-prose-links': theme('colors.emerald.900', colors.emerald[900]),
        '--tw-prose-bold': theme('colors.emerald.900', colors.emerald[900]),
        '--tw-prose-counters': theme('colors.emerald.400', colors.emerald[400]),
        '--tw-prose-bullets': theme('colors.emerald.300', colors.emerald[300]),
        '--tw-prose-rules': theme('colors.emerald.200', colors.emerald[200]),
        '--tw-prose-quotes': theme('colors.emerald.900', colors.emerald[900]),
        '--tw-prose-quote-borders': theme('colors.emerald.200', colors.emerald[200]),
        '--tw-prose-captions': theme('colors.emerald.700', colors.emerald[700]),
        '--tw-prose-code': theme('colors.emerald.900', colors.emerald[900]),
        '--tw-prose-pre-code': theme('colors.emerald.200', colors.emerald[200]),
        '--tw-prose-pre-bg': theme('colors.emerald.900', colors.emerald[900]),
        '--tw-prose-th-borders': theme('colors.emerald.300', colors.emerald[300]),
        '--tw-prose-td-borders': theme('colors.emerald.200', colors.emerald[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.emerald.200', colors.emerald[200]),
        '--tw-prose-invert-headings': theme('colors.emerald.100', colors.emerald[100]),
        '--tw-prose-invert-lead': theme('colors.emerald.300', colors.emerald[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.emerald.300', colors.emerald[300]),
        '--tw-prose-invert-bullets': theme('colors.emerald.400', colors.emerald[400]),
        '--tw-prose-invert-rules': theme('colors.emerald.700', colors.emerald[700]),
        '--tw-prose-invert-quotes': theme('colors.emerald.200', colors.emerald[200]),
        '--tw-prose-invert-quote-borders': theme('colors.emerald.700', colors.emerald[700]),
        '--tw-prose-invert-captions': theme('colors.emerald.400', colors.emerald[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.emerald.200', colors.emerald[200]),
        '--tw-prose-invert-pre-bg': theme('colors.emerald.900', colors.emerald[900]),
        '--tw-prose-invert-th-borders': theme('colors.emerald.600', colors.emerald[600]),
        '--tw-prose-invert-td-borders': theme('colors.emerald.700', colors.emerald[700]),
      },
    ],
  },

  teal: {
    css: [
      {
        '--tw-prose-body': theme('colors.teal.800', colors.teal[800]),
        '--tw-prose-headings': theme('colors.teal.900', colors.teal[900]),
        '--tw-prose-lead': theme('colors.teal.700', colors.teal[700]),
        '--tw-prose-links': theme('colors.teal.900', colors.teal[900]),
        '--tw-prose-bold': theme('colors.teal.900', colors.teal[900]),
        '--tw-prose-counters': theme('colors.teal.400', colors.teal[400]),
        '--tw-prose-bullets': theme('colors.teal.300', colors.teal[300]),
        '--tw-prose-rules': theme('colors.teal.200', colors.teal[200]),
        '--tw-prose-quotes': theme('colors.teal.900', colors.teal[900]),
        '--tw-prose-quote-borders': theme('colors.teal.200', colors.teal[200]),
        '--tw-prose-captions': theme('colors.teal.700', colors.teal[700]),
        '--tw-prose-code': theme('colors.teal.900', colors.teal[900]),
        '--tw-prose-pre-code': theme('colors.teal.200', colors.teal[200]),
        '--tw-prose-pre-bg': theme('colors.teal.900', colors.teal[900]),
        '--tw-prose-th-borders': theme('colors.teal.300', colors.teal[300]),
        '--tw-prose-td-borders': theme('colors.teal.200', colors.teal[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.teal.200', colors.teal[200]),
        '--tw-prose-invert-headings': theme('colors.teal.100', colors.teal[100]),
        '--tw-prose-invert-lead': theme('colors.teal.300', colors.teal[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.teal.300', colors.teal[300]),
        '--tw-prose-invert-bullets': theme('colors.teal.400', colors.teal[400]),
        '--tw-prose-invert-rules': theme('colors.teal.700', colors.teal[700]),
        '--tw-prose-invert-quotes': theme('colors.teal.200', colors.teal[200]),
        '--tw-prose-invert-quote-borders': theme('colors.teal.700', colors.teal[700]),
        '--tw-prose-invert-captions': theme('colors.teal.400', colors.teal[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.teal.200', colors.teal[200]),
        '--tw-prose-invert-pre-bg': theme('colors.teal.900', colors.teal[900]),
        '--tw-prose-invert-th-borders': theme('colors.teal.600', colors.teal[600]),
        '--tw-prose-invert-td-borders': theme('colors.teal.700', colors.teal[700]),
      },
    ],
  },

  cyan: {
    css: [
      {
        '--tw-prose-body': theme('colors.cyan.800', colors.cyan[800]),
        '--tw-prose-headings': theme('colors.cyan.900', colors.cyan[900]),
        '--tw-prose-lead': theme('colors.cyan.700', colors.cyan[700]),
        '--tw-prose-links': theme('colors.cyan.900', colors.cyan[900]),
        '--tw-prose-bold': theme('colors.cyan.900', colors.cyan[900]),
        '--tw-prose-counters': theme('colors.cyan.400', colors.cyan[400]),
        '--tw-prose-bullets': theme('colors.cyan.300', colors.cyan[300]),
        '--tw-prose-rules': theme('colors.cyan.200', colors.cyan[200]),
        '--tw-prose-quotes': theme('colors.cyan.900', colors.cyan[900]),
        '--tw-prose-quote-borders': theme('colors.cyan.200', colors.cyan[200]),
        '--tw-prose-captions': theme('colors.cyan.700', colors.cyan[700]),
        '--tw-prose-code': theme('colors.cyan.900', colors.cyan[900]),
        '--tw-prose-pre-code': theme('colors.cyan.200', colors.cyan[200]),
        '--tw-prose-pre-bg': theme('colors.cyan.900', colors.cyan[900]),
        '--tw-prose-th-borders': theme('colors.cyan.300', colors.cyan[300]),
        '--tw-prose-td-borders': theme('colors.cyan.200', colors.cyan[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.cyan.200', colors.cyan[200]),
        '--tw-prose-invert-headings': theme('colors.cyan.100', colors.cyan[100]),
        '--tw-prose-invert-lead': theme('colors.cyan.300', colors.cyan[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.cyan.300', colors.cyan[300]),
        '--tw-prose-invert-bullets': theme('colors.cyan.400', colors.cyan[400]),
        '--tw-prose-invert-rules': theme('colors.cyan.700', colors.cyan[700]),
        '--tw-prose-invert-quotes': theme('colors.cyan.200', colors.cyan[200]),
        '--tw-prose-invert-quote-borders': theme('colors.cyan.700', colors.cyan[700]),
        '--tw-prose-invert-captions': theme('colors.cyan.400', colors.cyan[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.cyan.200', colors.cyan[200]),
        '--tw-prose-invert-pre-bg': theme('colors.cyan.900', colors.cyan[900]),
        '--tw-prose-invert-th-borders': theme('colors.cyan.600', colors.cyan[600]),
        '--tw-prose-invert-td-borders': theme('colors.cyan.700', colors.cyan[700]),
      },
    ],
  },

  sky: {
    css: [
      {
        '--tw-prose-body': theme('colors.sky.800', colors.sky[800]),
        '--tw-prose-headings': theme('colors.sky.900', colors.sky[900]),
        '--tw-prose-lead': theme('colors.sky.700', colors.sky[700]),
        '--tw-prose-links': theme('colors.sky.900', colors.sky[900]),
        '--tw-prose-bold': theme('colors.sky.900', colors.sky[900]),
        '--tw-prose-counters': theme('colors.sky.400', colors.sky[400]),
        '--tw-prose-bullets': theme('colors.sky.300', colors.sky[300]),
        '--tw-prose-rules': theme('colors.sky.200', colors.sky[200]),
        '--tw-prose-quotes': theme('colors.sky.900', colors.sky[900]),
        '--tw-prose-quote-borders': theme('colors.sky.200', colors.sky[200]),
        '--tw-prose-captions': theme('colors.sky.700', colors.sky[700]),
        '--tw-prose-code': theme('colors.sky.900', colors.sky[900]),
        '--tw-prose-pre-code': theme('colors.sky.200', colors.sky[200]),
        '--tw-prose-pre-bg': theme('colors.sky.900', colors.sky[900]),
        '--tw-prose-th-borders': theme('colors.sky.300', colors.sky[300]),
        '--tw-prose-td-borders': theme('colors.sky.200', colors.sky[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.sky.200', colors.sky[200]),
        '--tw-prose-invert-headings': theme('colors.sky.100', colors.sky[100]),
        '--tw-prose-invert-lead': theme('colors.sky.300', colors.sky[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.sky.300', colors.sky[300]),
        '--tw-prose-invert-bullets': theme('colors.sky.400', colors.sky[400]),
        '--tw-prose-invert-rules': theme('colors.sky.700', colors.sky[700]),
        '--tw-prose-invert-quotes': theme('colors.sky.200', colors.sky[200]),
        '--tw-prose-invert-quote-borders': theme('colors.sky.700', colors.sky[700]),
        '--tw-prose-invert-captions': theme('colors.sky.400', colors.sky[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.sky.200', colors.sky[200]),
        '--tw-prose-invert-pre-bg': theme('colors.sky.900', colors.sky[900]),
        '--tw-prose-invert-th-borders': theme('colors.sky.600', colors.sky[600]),
        '--tw-prose-invert-td-borders': theme('colors.sky.700', colors.sky[700]),
      },
    ],
  },

  blue: {
    css: [
      {
        '--tw-prose-body': theme('colors.blue.800', colors.blue[800]),
        '--tw-prose-headings': theme('colors.blue.900', colors.blue[900]),
        '--tw-prose-lead': theme('colors.blue.700', colors.blue[700]),
        '--tw-prose-links': theme('colors.blue.900', colors.blue[900]),
        '--tw-prose-bold': theme('colors.blue.900', colors.blue[900]),
        '--tw-prose-counters': theme('colors.blue.400', colors.blue[400]),
        '--tw-prose-bullets': theme('colors.blue.300', colors.blue[300]),
        '--tw-prose-rules': theme('colors.blue.200', colors.blue[200]),
        '--tw-prose-quotes': theme('colors.blue.900', colors.blue[900]),
        '--tw-prose-quote-borders': theme('colors.blue.200', colors.blue[200]),
        '--tw-prose-captions': theme('colors.blue.700', colors.blue[700]),
        '--tw-prose-code': theme('colors.blue.900', colors.blue[900]),
        '--tw-prose-pre-code': theme('colors.blue.200', colors.blue[200]),
        '--tw-prose-pre-bg': theme('colors.blue.900', colors.blue[900]),
        '--tw-prose-th-borders': theme('colors.blue.300', colors.blue[300]),
        '--tw-prose-td-borders': theme('colors.blue.200', colors.blue[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.blue.200', colors.blue[200]),
        '--tw-prose-invert-headings': theme('colors.blue.100', colors.blue[100]),
        '--tw-prose-invert-lead': theme('colors.blue.300', colors.blue[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.blue.300', colors.blue[300]),
        '--tw-prose-invert-bullets': theme('colors.blue.400', colors.blue[400]),
        '--tw-prose-invert-rules': theme('colors.blue.700', colors.blue[700]),
        '--tw-prose-invert-quotes': theme('colors.blue.200', colors.blue[200]),
        '--tw-prose-invert-quote-borders': theme('colors.blue.700', colors.blue[700]),
        '--tw-prose-invert-captions': theme('colors.blue.400', colors.blue[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.blue.200', colors.blue[200]),
        '--tw-prose-invert-pre-bg': theme('colors.blue.900', colors.blue[900]),
        '--tw-prose-invert-th-borders': theme('colors.blue.600', colors.blue[600]),
        '--tw-prose-invert-td-borders': theme('colors.blue.700', colors.blue[700]),
      },
    ],
  },

  indigo: {
    css: [
      {
        '--tw-prose-body': theme('colors.indigo.800', colors.indigo[800]),
        '--tw-prose-headings': theme('colors.indigo.900', colors.indigo[900]),
        '--tw-prose-lead': theme('colors.indigo.700', colors.indigo[700]),
        '--tw-prose-links': theme('colors.indigo.900', colors.indigo[900]),
        '--tw-prose-bold': theme('colors.indigo.900', colors.indigo[900]),
        '--tw-prose-counters': theme('colors.indigo.400', colors.indigo[400]),
        '--tw-prose-bullets': theme('colors.indigo.300', colors.indigo[300]),
        '--tw-prose-rules': theme('colors.indigo.200', colors.indigo[200]),
        '--tw-prose-quotes': theme('colors.indigo.900', colors.indigo[900]),
        '--tw-prose-quote-borders': theme('colors.indigo.200', colors.indigo[200]),
        '--tw-prose-captions': theme('colors.indigo.700', colors.indigo[700]),
        '--tw-prose-code': theme('colors.indigo.900', colors.indigo[900]),
        '--tw-prose-pre-code': theme('colors.indigo.200', colors.indigo[200]),
        '--tw-prose-pre-bg': theme('colors.indigo.900', colors.indigo[900]),
        '--tw-prose-th-borders': theme('colors.indigo.300', colors.indigo[300]),
        '--tw-prose-td-borders': theme('colors.indigo.200', colors.indigo[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.indigo.200', colors.indigo[200]),
        '--tw-prose-invert-headings': theme('colors.indigo.100', colors.indigo[100]),
        '--tw-prose-invert-lead': theme('colors.indigo.300', colors.indigo[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.indigo.300', colors.indigo[300]),
        '--tw-prose-invert-bullets': theme('colors.indigo.400', colors.indigo[400]),
        '--tw-prose-invert-rules': theme('colors.indigo.700', colors.indigo[700]),
        '--tw-prose-invert-quotes': theme('colors.indigo.200', colors.indigo[200]),
        '--tw-prose-invert-quote-borders': theme('colors.indigo.700', colors.indigo[700]),
        '--tw-prose-invert-captions': theme('colors.indigo.400', colors.indigo[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.indigo.200', colors.indigo[200]),
        '--tw-prose-invert-pre-bg': theme('colors.indigo.900', colors.indigo[900]),
        '--tw-prose-invert-th-borders': theme('colors.indigo.600', colors.indigo[600]),
        '--tw-prose-invert-td-borders': theme('colors.indigo.700', colors.indigo[700]),
      },
    ],
  },

  violet: {
    css: [
      {
        '--tw-prose-body': theme('colors.violet.800', colors.violet[800]),
        '--tw-prose-headings': theme('colors.violet.900', colors.violet[900]),
        '--tw-prose-lead': theme('colors.violet.700', colors.violet[700]),
        '--tw-prose-links': theme('colors.violet.900', colors.violet[900]),
        '--tw-prose-bold': theme('colors.violet.900', colors.violet[900]),
        '--tw-prose-counters': theme('colors.violet.400', colors.violet[400]),
        '--tw-prose-bullets': theme('colors.violet.300', colors.violet[300]),
        '--tw-prose-rules': theme('colors.violet.200', colors.violet[200]),
        '--tw-prose-quotes': theme('colors.violet.900', colors.violet[900]),
        '--tw-prose-quote-borders': theme('colors.violet.200', colors.violet[200]),
        '--tw-prose-captions': theme('colors.violet.700', colors.violet[700]),
        '--tw-prose-code': theme('colors.violet.900', colors.violet[900]),
        '--tw-prose-pre-code': theme('colors.violet.200', colors.violet[200]),
        '--tw-prose-pre-bg': theme('colors.violet.900', colors.violet[900]),
        '--tw-prose-th-borders': theme('colors.violet.300', colors.violet[300]),
        '--tw-prose-td-borders': theme('colors.violet.200', colors.violet[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.violet.200', colors.violet[200]),
        '--tw-prose-invert-headings': theme('colors.violet.100', colors.violet[100]),
        '--tw-prose-invert-lead': theme('colors.violet.300', colors.violet[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.violet.300', colors.violet[300]),
        '--tw-prose-invert-bullets': theme('colors.violet.400', colors.violet[400]),
        '--tw-prose-invert-rules': theme('colors.violet.700', colors.violet[700]),
        '--tw-prose-invert-quotes': theme('colors.violet.200', colors.violet[200]),
        '--tw-prose-invert-quote-borders': theme('colors.violet.700', colors.violet[700]),
        '--tw-prose-invert-captions': theme('colors.violet.400', colors.violet[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.violet.200', colors.violet[200]),
        '--tw-prose-invert-pre-bg': theme('colors.violet.900', colors.violet[900]),
        '--tw-prose-invert-th-borders': theme('colors.violet.600', colors.violet[600]),
        '--tw-prose-invert-td-borders': theme('colors.violet.700', colors.violet[700]),
      },
    ],
  },

  purple: {
    css: [
      {
        '--tw-prose-body': theme('colors.purple.800', colors.purple[800]),
        '--tw-prose-headings': theme('colors.purple.900', colors.purple[900]),
        '--tw-prose-lead': theme('colors.purple.700', colors.purple[700]),
        '--tw-prose-links': theme('colors.purple.900', colors.purple[900]),
        '--tw-prose-bold': theme('colors.purple.900', colors.purple[900]),
        '--tw-prose-counters': theme('colors.purple.400', colors.purple[400]),
        '--tw-prose-bullets': theme('colors.purple.300', colors.purple[300]),
        '--tw-prose-rules': theme('colors.purple.200', colors.purple[200]),
        '--tw-prose-quotes': theme('colors.purple.900', colors.purple[900]),
        '--tw-prose-quote-borders': theme('colors.purple.200', colors.purple[200]),
        '--tw-prose-captions': theme('colors.purple.700', colors.purple[700]),
        '--tw-prose-code': theme('colors.purple.900', colors.purple[900]),
        '--tw-prose-pre-code': theme('colors.purple.200', colors.purple[200]),
        '--tw-prose-pre-bg': theme('colors.purple.900', colors.purple[900]),
        '--tw-prose-th-borders': theme('colors.purple.300', colors.purple[300]),
        '--tw-prose-td-borders': theme('colors.purple.200', colors.purple[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.purple.200', colors.purple[200]),
        '--tw-prose-invert-headings': theme('colors.purple.100', colors.purple[100]),
        '--tw-prose-invert-lead': theme('colors.purple.300', colors.purple[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.purple.300', colors.purple[300]),
        '--tw-prose-invert-bullets': theme('colors.purple.400', colors.purple[400]),
        '--tw-prose-invert-rules': theme('colors.purple.700', colors.purple[700]),
        '--tw-prose-invert-quotes': theme('colors.purple.200', colors.purple[200]),
        '--tw-prose-invert-quote-borders': theme('colors.purple.700', colors.purple[700]),
        '--tw-prose-invert-captions': theme('colors.purple.400', colors.purple[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.purple.200', colors.purple[200]),
        '--tw-prose-invert-pre-bg': theme('colors.purple.900', colors.purple[900]),
        '--tw-prose-invert-th-borders': theme('colors.purple.600', colors.purple[600]),
        '--tw-prose-invert-td-borders': theme('colors.purple.700', colors.purple[700]),
      },
    ],
  },

  fuchsia: {
    css: [
      {
        '--tw-prose-body': theme('colors.fuchsia.800', colors.fuchsia[800]),
        '--tw-prose-headings': theme('colors.fuchsia.900', colors.fuchsia[900]),
        '--tw-prose-lead': theme('colors.fuchsia.700', colors.fuchsia[700]),
        '--tw-prose-links': theme('colors.fuchsia.900', colors.fuchsia[900]),
        '--tw-prose-bold': theme('colors.fuchsia.900', colors.fuchsia[900]),
        '--tw-prose-counters': theme('colors.fuchsia.400', colors.fuchsia[400]),
        '--tw-prose-bullets': theme('colors.fuchsia.300', colors.fuchsia[300]),
        '--tw-prose-rules': theme('colors.fuchsia.200', colors.fuchsia[200]),
        '--tw-prose-quotes': theme('colors.fuchsia.900', colors.fuchsia[900]),
        '--tw-prose-quote-borders': theme('colors.fuchsia.200', colors.fuchsia[200]),
        '--tw-prose-captions': theme('colors.fuchsia.700', colors.fuchsia[700]),
        '--tw-prose-code': theme('colors.fuchsia.900', colors.fuchsia[900]),
        '--tw-prose-pre-code': theme('colors.fuchsia.200', colors.fuchsia[200]),
        '--tw-prose-pre-bg': theme('colors.fuchsia.900', colors.fuchsia[900]),
        '--tw-prose-th-borders': theme('colors.fuchsia.300', colors.fuchsia[300]),
        '--tw-prose-td-borders': theme('colors.fuchsia.200', colors.fuchsia[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.fuchsia.200', colors.fuchsia[200]),
        '--tw-prose-invert-headings': theme('colors.fuchsia.100', colors.fuchsia[100]),
        '--tw-prose-invert-lead': theme('colors.fuchsia.300', colors.fuchsia[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.fuchsia.300', colors.fuchsia[300]),
        '--tw-prose-invert-bullets': theme('colors.fuchsia.400', colors.fuchsia[400]),
        '--tw-prose-invert-rules': theme('colors.fuchsia.700', colors.fuchsia[700]),
        '--tw-prose-invert-quotes': theme('colors.fuchsia.200', colors.fuchsia[200]),
        '--tw-prose-invert-quote-borders': theme('colors.fuchsia.700', colors.fuchsia[700]),
        '--tw-prose-invert-captions': theme('colors.fuchsia.400', colors.fuchsia[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.fuchsia.200', colors.fuchsia[200]),
        '--tw-prose-invert-pre-bg': theme('colors.fuchsia.900', colors.fuchsia[900]),
        '--tw-prose-invert-th-borders': theme('colors.fuchsia.600', colors.fuchsia[600]),
        '--tw-prose-invert-td-borders': theme('colors.fuchsia.700', colors.fuchsia[700]),
      },
    ],
  },

  pink: {
    css: [
      {
        '--tw-prose-body': theme('colors.pink.800', colors.pink[800]),
        '--tw-prose-headings': theme('colors.pink.900', colors.pink[900]),
        '--tw-prose-lead': theme('colors.pink.700', colors.pink[700]),
        '--tw-prose-links': theme('colors.pink.900', colors.pink[900]),
        '--tw-prose-bold': theme('colors.pink.900', colors.pink[900]),
        '--tw-prose-counters': theme('colors.pink.400', colors.pink[400]),
        '--tw-prose-bullets': theme('colors.pink.300', colors.pink[300]),
        '--tw-prose-rules': theme('colors.pink.200', colors.pink[200]),
        '--tw-prose-quotes': theme('colors.pink.900', colors.pink[900]),
        '--tw-prose-quote-borders': theme('colors.pink.200', colors.pink[200]),
        '--tw-prose-captions': theme('colors.pink.700', colors.pink[700]),
        '--tw-prose-code': theme('colors.pink.900', colors.pink[900]),
        '--tw-prose-pre-code': theme('colors.pink.200', colors.pink[200]),
        '--tw-prose-pre-bg': theme('colors.pink.900', colors.pink[900]),
        '--tw-prose-th-borders': theme('colors.pink.300', colors.pink[300]),
        '--tw-prose-td-borders': theme('colors.pink.200', colors.pink[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.pink.200', colors.pink[200]),
        '--tw-prose-invert-headings': theme('colors.pink.100', colors.pink[100]),
        '--tw-prose-invert-lead': theme('colors.pink.300', colors.pink[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.pink.300', colors.pink[300]),
        '--tw-prose-invert-bullets': theme('colors.pink.400', colors.pink[400]),
        '--tw-prose-invert-rules': theme('colors.pink.700', colors.pink[700]),
        '--tw-prose-invert-quotes': theme('colors.pink.200', colors.pink[200]),
        '--tw-prose-invert-quote-borders': theme('colors.pink.700', colors.pink[700]),
        '--tw-prose-invert-captions': theme('colors.pink.400', colors.pink[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.pink.200', colors.pink[200]),
        '--tw-prose-invert-pre-bg': theme('colors.pink.900', colors.pink[900]),
        '--tw-prose-invert-th-borders': theme('colors.pink.600', colors.pink[600]),
        '--tw-prose-invert-td-borders': theme('colors.pink.700', colors.pink[700]),
      },
    ],
  },

  rose: {
    css: [
      {
        '--tw-prose-body': theme('colors.rose.800', colors.rose[800]),
        '--tw-prose-headings': theme('colors.rose.900', colors.rose[900]),
        '--tw-prose-lead': theme('colors.rose.700', colors.rose[700]),
        '--tw-prose-links': theme('colors.rose.900', colors.rose[900]),
        '--tw-prose-bold': theme('colors.rose.900', colors.rose[900]),
        '--tw-prose-counters': theme('colors.rose.400', colors.rose[400]),
        '--tw-prose-bullets': theme('colors.rose.300', colors.rose[300]),
        '--tw-prose-rules': theme('colors.rose.200', colors.rose[200]),
        '--tw-prose-quotes': theme('colors.rose.900', colors.rose[900]),
        '--tw-prose-quote-borders': theme('colors.rose.200', colors.rose[200]),
        '--tw-prose-captions': theme('colors.rose.700', colors.rose[700]),
        '--tw-prose-code': theme('colors.rose.900', colors.rose[900]),
        '--tw-prose-pre-code': theme('colors.rose.200', colors.rose[200]),
        '--tw-prose-pre-bg': theme('colors.rose.900', colors.rose[900]),
        '--tw-prose-th-borders': theme('colors.rose.300', colors.rose[300]),
        '--tw-prose-td-borders': theme('colors.rose.200', colors.rose[200]),
      },
      {
        '--tw-prose-invert-body': theme('colors.rose.200', colors.rose[200]),
        '--tw-prose-invert-headings': theme('colors.rose.100', colors.rose[100]),
        '--tw-prose-invert-lead': theme('colors.rose.300', colors.rose[300]),
        '--tw-prose-invert-links': theme('colors.white', colors.white),
        '--tw-prose-invert-bold': theme('colors.white', colors.white),
        '--tw-prose-invert-counters': theme('colors.rose.300', colors.rose[300]),
        '--tw-prose-invert-bullets': theme('colors.rose.400', colors.rose[400]),
        '--tw-prose-invert-rules': theme('colors.rose.700', colors.rose[700]),
        '--tw-prose-invert-quotes': theme('colors.rose.200', colors.rose[200]),
        '--tw-prose-invert-quote-borders': theme('colors.rose.700', colors.rose[700]),
        '--tw-prose-invert-captions': theme('colors.rose.400', colors.rose[400]),
        '--tw-prose-invert-code': theme('colors.white', colors.white),
        '--tw-prose-invert-pre-code': theme('colors.rose.200', colors.rose[200]),
        '--tw-prose-invert-pre-bg': theme('colors.rose.900', colors.rose[900]),
        '--tw-prose-invert-th-borders': theme('colors.rose.600', colors.rose[600]),
        '--tw-prose-invert-td-borders': theme('colors.rose.700', colors.rose[700]),
      },
    ],
  },

  // ---

  invert: {
    css: [
      {
        color: 'var(--tw-prose-invert-body)',
        '[class~="lead"]': {
          color: 'var(--tw-prose-invert-lead)',
        },
        a: {
          color: 'var(--tw-prose-invert-links)',
        },
        strong: {
          color: 'var(--tw-prose-invert-bold)',
        },
        'ol > li::before': {
          color: 'var(--tw-prose-invert-counters)',
        },
        'ul > li::before': {
          backgroundColor: 'var(--tw-prose-invert-bullets)',
        },
        hr: {
          borderColor: 'var(--tw-prose-invert-rules)',
        },
        blockquote: {
          color: 'var(--tw-prose-invert-quotes)',
          borderLeftColor: 'var(--tw-prose-invert-quote-borders)',
        },
        h1: {
          color: 'var(--tw-prose-invert-headings)',
        },
        h2: {
          color: 'var(--tw-prose-invert-headings)',
        },
        h3: {
          color: 'var(--tw-prose-invert-headings)',
        },
        h4: {
          color: 'var(--tw-prose-invert-headings)',
        },
        'figure figcaption': {
          color: 'var(--tw-prose-invert-captions)',
        },
        code: {
          color: 'var(--tw-prose-invert-code)',
        },
        'a code': {
          color: 'var(--tw-prose-invert-links)',
        },
        pre: {
          color: 'var(--tw-prose-invert-pre-code)',
          backgroundColor: 'var(--tw-prose-invert-pre-bg)',
        },
        'pre code': {
          backgroundColor: 'transparent',
          color: 'inherit',
        },
        thead: {
          color: 'var(--tw-prose-invert-headings)',
          borderBottomColor: 'var(--tw-prose-invert-th-borders)',
        },
        'tbody tr': {
          borderBottomColor: 'var(--tw-prose-invert-td-borders)',
        },
      },
    ],
  },
})
