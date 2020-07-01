const defaultTheme = require('tailwindcss/defaultTheme')

function rem(px) {
  return `${px / 16}rem`
}

module.exports = {
  config: {
    theme: {
      typography: (theme) => ({
        default: {
          // what goes here
          textColor: theme('colors.gray.700'),
          headingTextColor: theme('colors.gray.900'),
          linkColor: theme('colors.gray.900'),

          // heading weight(s)
          // link weight
          // link underline?
          // bold color
          // bold weight
          // bullet color
          // counter color

          // base font size
          // heading font sizes
          // code font size (in paragraphs this could be a `em` value)
          // code block font size
        },
        lg: {
          // what goes here
        },
      }),
    },
  },
  handler: function ({ addComponents, theme }) {
    addComponents({
      '.prose': {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },

        fontSize: rem(16),
        lineHeight: rem(28),
        color: theme('typography.default.textColor'),
        maxWidth: '65ch',
        p: {
          marginTop: rem(20),
          marginBottom: rem(20),
        },
        h2: {
          marginTop: rem(48),
          marginBottom: rem(24),
          fontSize: rem(24),
          fontWeight: '700',
          lineHeight: rem(32),
          letterSpacing: theme('letterSpacing.tight'), // Consider removing
          color: theme('typography.default.headingTextColor'),
        },
        h3: {
          marginTop: rem(32),
          marginBottom: rem(12),
          fontSize: rem(20),
          fontWeight: '600',
          lineHeight: rem(32),
          color: theme('typography.default.headingTextColor'),
        },
        'h3 + *': {
          marginTop: '0',
        },
        ol: {
          counterReset: 'list-counter',
          marginTop: rem(20),
          marginBottom: rem(20),
        },
        ul: {
          marginTop: rem(20),
          marginBottom: rem(20),
        },
        li: {
          marginTop: rem(8),
          marginBottom: rem(8),
        },
        'ol li': {
          position: 'relative',
          counterIncrement: 'list-counter',
          paddingLeft: rem(32),
        },
        'ol li:before': {
          content: 'counter(list-counter) "."',
          position: 'absolute',
          left: '0',
          fontWeight: '600',
          color: theme('colors.gray.600'),
        },
        'ul li': {
          position: 'relative',
          paddingLeft: rem(32),
        },
        'ul li:before': {
          content: '""',
          position: 'absolute',
          top: 'calc(0.875em - 0.0625em)',
          left: '0',
          backgroundColor: theme('colors.gray.500'),
          height: '0.125em',
          width: '0.75em',
        },
        img: {
          marginTop: rem(32),
          marginBottom: rem(32),
        },
        video: {
          marginTop: rem(32),
          marginBottom: rem(32),
        },
        figure: {
          marginTop: rem(32),
          marginBottom: rem(32),
        },
        code: {
          fontSize: rem(14),
          lineHeight: rem(24),
          fontFamily: theme('fontFamily.mono').join(', '),
          color: theme('colors.gray.700'),
          backgroundColor: theme('colors.gray.100'),
          borderColor: theme('colors.gray.300'),
          borderWidth: theme('borderWidth.default'),
          borderRadius: rem(6),
          paddingTop: rem(4),
          paddingRight: rem(6),
          paddingBottom: rem(4),
          paddingLeft: rem(6),
        },
        a: {
          color: theme('typography.default.linkColor'),
          textDecoration: 'underline',
        },
        strong: {
          color: theme('colors.gray.900'),
          fontWeight: '600',
        },
        pre: {
          color: theme('colors.gray.300'),
          fontSize: rem(14),
          fontFamily: theme('fontFamily.mono').join(', '),
          lineHeight: rem(24),
          borderRadius: rem(6),
          backgroundColor: theme('colors.gray.800'),
          paddingTop: rem(12),
          paddingRight: rem(16),
          paddingBottom: rem(12),
          paddingLeft: rem(16),
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
      '.prose-lg': {
        '> :first-child': {
          marginTop: '0',
        },
        '> :last-child': {
          marginBottom: '0',
        },

        fontSize: rem(18),
        lineHeight: rem(32),
        color: theme('colors.gray.700'),
        maxWidth: '65ch',
        p: {
          marginTop: rem(24),
          marginBottom: rem(24),
        },
        h2: {
          marginTop: rem(56),
          marginBottom: rem(32),
          fontSize: rem(30),
          fontWeight: '700',
          lineHeight: rem(40),
          letterSpacing: theme('letterSpacing.tight'), // Consider removing
          color: theme('colors.gray.900'),
        },
        h3: {
          marginTop: rem(40),
          marginBottom: rem(16),
          fontSize: rem(24),
          fontWeight: '600',
          lineHeight: rem(36),
          color: theme('colors.gray.900'),
        },
        'h3 + *': {
          marginTop: '0',
        },
        ol: {
          counterReset: 'list-counter',
          marginTop: rem(24),
          marginBottom: rem(24),
        },
        ul: {
          marginTop: rem(24),
          marginBottom: rem(24),
        },
        li: {
          marginTop: rem(12),
          marginBottom: rem(12),
        },
        'ol li': {
          position: 'relative',
          counterIncrement: 'list-counter',
          paddingLeft: rem(32),
        },
        'ol li:before': {
          content: 'counter(list-counter) "."',
          position: 'absolute',
          left: '0',
          fontWeight: '600',
          color: theme('colors.gray.600'),
        },
        'ul li': {
          position: 'relative',
          paddingLeft: rem(32),
        },
        'ul li:before': {
          content: '""',
          position: 'absolute',
          top: 'calc(0.875em - 0.0625em)',
          left: '0',
          backgroundColor: theme('colors.gray.500'),
          height: '0.125em',
          width: '0.75em',
        },
        img: {
          marginTop: rem(32),
          marginBottom: rem(32),
        },
        video: {
          marginTop: rem(32),
          marginBottom: rem(32),
        },
        figure: {
          marginTop: rem(32),
          marginBottom: rem(32),
        },
        code: {
          fontSize: rem(16),
          lineHeight: rem(32),
          fontFamily: theme('fontFamily.mono').join(', '),
          color: theme('colors.gray.700'),
          backgroundColor: theme('colors.gray.100'),
          borderColor: theme('colors.gray.300'),
          borderWidth: theme('borderWidth.default'),
          borderRadius: rem(6),
          paddingTop: rem(4),
          paddingRight: rem(6),
          paddingBottom: rem(4),
          paddingLeft: rem(6),
        },
        a: {
          color: theme('colors.gray.900'),
          textDecoration: 'underline',
        },
        strong: {
          color: theme('colors.gray.900'),
          fontWeight: '600',
        },
        pre: {
          color: theme('colors.gray.300'),
          fontSize: rem(16),
          fontFamily: theme('fontFamily.mono').join(', '),
          lineHeight: rem(28),
          borderRadius: rem(6),
          backgroundColor: theme('colors.gray.800'),
          paddingTop: rem(20),
          paddingRight: rem(20),
          paddingBottom: rem(20),
          paddingLeft: rem(20),
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
    })
  },
}
