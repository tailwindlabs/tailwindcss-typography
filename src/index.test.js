const path = require('path')
const tailwind = require('tailwindcss')
const postcss = require('postcss')
const typographyPlugin = require('.')

let html = String.raw
let css = String.raw

function run(config, plugin = tailwind) {
  let { currentTestName } = expect.getState()
  config = {
    ...{ plugins: [typographyPlugin], corePlugins: { preflight: false } },
    ...config,
  }

  return postcss(plugin(config)).process(
    ['@tailwind base;', '@tailwind components;', '@tailwind utilities'].join('\n'),
    {
      from: `${path.resolve(__filename)}?test=${currentTestName}`,
    }
  )
}

test('specificity is reduced with :where', async () => {
  let config = {
    content: [{ raw: html`<div class="prose"></div>` }],
    theme: {
      typography: {
        DEFAULT: {
          css: [
            {
              color: 'var(--tw-prose-body)',
              maxWidth: '65ch',
              '[class~="lead"]': {
                color: 'var(--tw-prose-lead)',
              },
              strong: {
                color: 'var(--tw-prose-bold)',
                fontWeight: '600',
              },
              'ol[type="A"]': {
                listStyleType: 'upper-alpha',
              },
              'blockquote p:first-of-type::before': {
                content: 'open-quote',
              },
              'blockquote p:last-of-type::after': {
                content: 'close-quote',
              },
              'h4 strong': {
                fontWeight: '700',
              },
              'figure > *': {
                margin: 0,
              },
              'ol > li::marker': {
                fontWeight: '400',
                color: 'var(--tw-prose-counters)',
              },
              '> ul > li p': {
                marginTop: '16px',
                marginBottom: '16px',
              },
              'code::before': {
                content: '"&#96;"',
              },
              'code::after': {
                content: '"&#96;"',
              },
            },
          ],
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .prose {
        color: var(--tw-prose-body);
        max-width: 65ch;
      }
      .prose :where([class~='lead']):not(:where([class~='not-prose'] *)) {
        color: var(--tw-prose-lead);
      }
      .prose :where(strong):not(:where([class~='not-prose'] *)) {
        color: var(--tw-prose-bold);
        font-weight: 600;
      }
      .prose :where(ol[type='A']):not(:where([class~='not-prose'] *)) {
        list-style-type: upper-alpha;
      }
      .prose :where(blockquote p:first-of-type):not(:where([class~='not-prose'] *))::before {
        content: open-quote;
      }
      .prose :where(blockquote p:last-of-type):not(:where([class~='not-prose'] *))::after {
        content: close-quote;
      }
      .prose :where(h4 strong):not(:where([class~='not-prose'] *)) {
        font-weight: 700;
      }
      .prose :where(figure > *):not(:where([class~='not-prose'] *)) {
        margin: 0;
      }
      .prose :where(ol > li):not(:where([class~='not-prose'] *))::marker {
        font-weight: 400;
        color: var(--tw-prose-counters);
      }
      .prose > :where(ul > li p):not(:where([class~='not-prose'] *)) {
        margin-top: 16px;
        margin-bottom: 16px;
      }
      .prose :where(code):not(:where([class~='not-prose'] *))::before {
        content: '&#96;';
      }
      .prose :where(code):not(:where([class~='not-prose'] *))::after {
        content: '&#96;';
      }
    `)
  })
})

test('modifiers', async () => {
  let config = {
    content: [{ raw: html`<div class="prose prose-lg"></div>` }],
    theme: {
      typography: {
        DEFAULT: {
          css: [
            {
              color: 'var(--tw-prose-body)',
              maxWidth: '65ch',
              '[class~="lead"]': {
                color: 'var(--tw-prose-lead)',
              },
              strong: {
                color: 'var(--tw-prose-bold)',
                fontWeight: '600',
              },
              'ol[type="A"]': {
                listStyleType: 'upper-alpha',
              },
              'blockquote p:first-of-type::before': {
                content: 'open-quote',
              },
              'blockquote p:last-of-type::after': {
                content: 'close-quote',
              },
              'h4 strong': {
                fontWeight: '700',
              },
              'figure > *': {
                margin: 0,
              },
              'ol > li::marker': {
                fontWeight: '400',
                color: 'var(--tw-prose-counters)',
              },
              'code::before': {
                content: '"&#96;"',
              },
              'code::after': {
                content: '"&#96;"',
              },
            },
          ],
        },
        lg: {
          css: [
            {
              fontSize: '18px',
              lineHeight: '1.75',
              p: {
                marginTop: '24px',
                marginBottom: '24px',
              },
              '[class~="lead"]': {
                fontSize: '22px',
              },
              blockquote: {
                marginTop: '40px',
                marginBottom: '40px',
              },
              h1: {
                fontSize: '48px',
                marginTop: '0',
                marginBottom: '40px',
              },
              h2: {
                fontSize: '30px',
                marginTop: '56px',
                marginBottom: '32px',
              },
              h3: {
                fontSize: '24px',
                marginTop: '40px',
                marginBottom: '16px',
              },
            },
          ],
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .prose {
        color: var(--tw-prose-body);
        max-width: 65ch;
      }
      .prose :where([class~='lead']):not(:where([class~='not-prose'] *)) {
        color: var(--tw-prose-lead);
      }
      .prose :where(strong):not(:where([class~='not-prose'] *)) {
        color: var(--tw-prose-bold);
        font-weight: 600;
      }
      .prose :where(ol[type='A']):not(:where([class~='not-prose'] *)) {
        list-style-type: upper-alpha;
      }
      .prose :where(blockquote p:first-of-type):not(:where([class~='not-prose'] *))::before {
        content: open-quote;
      }
      .prose :where(blockquote p:last-of-type):not(:where([class~='not-prose'] *))::after {
        content: close-quote;
      }
      .prose :where(h4 strong):not(:where([class~='not-prose'] *)) {
        font-weight: 700;
      }
      .prose :where(figure > *):not(:where([class~='not-prose'] *)) {
        margin: 0;
      }
      .prose :where(ol > li):not(:where([class~='not-prose'] *))::marker {
        font-weight: 400;
        color: var(--tw-prose-counters);
      }
      .prose :where(code):not(:where([class~='not-prose'] *))::before {
        content: '&#96;';
      }
      .prose :where(code):not(:where([class~='not-prose'] *))::after {
        content: '&#96;';
      }
      .prose-lg {
        font-size: 18px;
        line-height: 1.75;
      }
      .prose-lg :where(p):not(:where([class~='not-prose'] *)) {
        margin-top: 24px;
        margin-bottom: 24px;
      }
      .prose-lg :where([class~='lead']):not(:where([class~='not-prose'] *)) {
        font-size: 22px;
      }
      .prose-lg :where(blockquote):not(:where([class~='not-prose'] *)) {
        margin-top: 40px;
        margin-bottom: 40px;
      }
      .prose-lg :where(h1):not(:where([class~='not-prose'] *)) {
        font-size: 48px;
        margin-top: 0;
        margin-bottom: 40px;
      }
      .prose-lg :where(h2):not(:where([class~='not-prose'] *)) {
        font-size: 30px;
        margin-top: 56px;
        margin-bottom: 32px;
      }
      .prose-lg :where(h3):not(:where([class~='not-prose'] *)) {
        font-size: 24px;
        margin-top: 40px;
        margin-bottom: 16px;
      }
    `)
  })
})

test('legacy target', async () => {
  let config = {
    plugins: [typographyPlugin({ target: 'legacy' })],
    content: [{ raw: html`<div class="prose"></div>` }],
    theme: {
      typography: {
        DEFAULT: {
          css: [
            {
              color: 'var(--tw-prose-body)',
              maxWidth: '65ch',
              '[class~="lead"]': {
                color: 'var(--tw-prose-lead)',
              },
              strong: {
                color: 'var(--tw-prose-bold)',
                fontWeight: '600',
              },
              'ol[type="A"]': {
                listStyleType: 'upper-alpha',
              },
              'blockquote p:first-of-type::before': {
                content: 'open-quote',
              },
              'blockquote p:last-of-type::after': {
                content: 'close-quote',
              },
              'h4 strong': {
                fontWeight: '700',
              },
              'figure > *': {
                margin: 0,
              },
              'ol > li::marker': {
                fontWeight: '400',
                color: 'var(--tw-prose-counters)',
              },
              'code::before': {
                content: '"&#96;"',
              },
              'code::after': {
                content: '"&#96;"',
              },
            },
          ],
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .prose {
        color: var(--tw-prose-body);
        max-width: 65ch;
      }
      .prose [class~='lead'] {
        color: var(--tw-prose-lead);
      }
      .prose strong {
        color: var(--tw-prose-bold);
        font-weight: 600;
      }
      .prose ol[type='A'] {
        list-style-type: upper-alpha;
      }
      .prose blockquote p:first-of-type::before {
        content: open-quote;
      }
      .prose blockquote p:last-of-type::after {
        content: close-quote;
      }
      .prose h4 strong {
        font-weight: 700;
      }
      .prose figure > * {
        margin: 0;
      }
      .prose ol > li::marker {
        font-weight: 400;
        color: var(--tw-prose-counters);
      }
      .prose code::before {
        content: '&#96;';
      }
      .prose code::after {
        content: '&#96;';
      }
    `)
  })
})

test('custom class name', async () => {
  let config = {
    plugins: [typographyPlugin({ className: 'markdown' })],
    content: [{ raw: html`<div class="markdown"></div>` }],
    theme: {
      typography: {
        DEFAULT: {
          css: [
            {
              color: 'var(--tw-prose-body)',
              maxWidth: '65ch',
              '[class~="lead"]': {
                color: 'var(--tw-prose-lead)',
              },
              strong: {
                color: 'var(--tw-prose-bold)',
                fontWeight: '600',
              },
              'ol[type="A"]': {
                listStyleType: 'upper-alpha',
              },
              'blockquote p:first-of-type::before': {
                content: 'open-quote',
              },
              'blockquote p:last-of-type::after': {
                content: 'close-quote',
              },
              'h4 strong': {
                fontWeight: '700',
              },
              'figure > *': {
                margin: 0,
              },
              'ol > li::marker': {
                fontWeight: '400',
                color: 'var(--tw-prose-counters)',
              },
              'code::before': {
                content: '"&#96;"',
              },
              'code::after': {
                content: '"&#96;"',
              },
            },
          ],
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .markdown {
        color: var(--tw-prose-body);
        max-width: 65ch;
      }
      .markdown :where([class~='lead']):not(:where([class~='not-markdown'] *)) {
        color: var(--tw-prose-lead);
      }
      .markdown :where(strong):not(:where([class~='not-markdown'] *)) {
        color: var(--tw-prose-bold);
        font-weight: 600;
      }
      .markdown :where(ol[type='A']):not(:where([class~='not-markdown'] *)) {
        list-style-type: upper-alpha;
      }
      .markdown :where(blockquote p:first-of-type):not(:where([class~='not-markdown'] *))::before {
        content: open-quote;
      }
      .markdown :where(blockquote p:last-of-type):not(:where([class~='not-markdown'] *))::after {
        content: close-quote;
      }
      .markdown :where(h4 strong):not(:where([class~='not-markdown'] *)) {
        font-weight: 700;
      }
      .markdown :where(figure > *):not(:where([class~='not-markdown'] *)) {
        margin: 0;
      }
      .markdown :where(ol > li):not(:where([class~='not-markdown'] *))::marker {
        font-weight: 400;
        color: var(--tw-prose-counters);
      }
      .markdown :where(code):not(:where([class~='not-markdown'] *))::before {
        content: '&#96;';
      }
      .markdown :where(code):not(:where([class~='not-markdown'] *))::after {
        content: '&#96;';
      }
    `)
  })
})

test('element variants', async () => {
  let config = {
    content: [
      {
        raw: html`<div
          class="
            prose
            prose-headings:underline
            prose-lead:italic
            prose-h1:text-3xl
            prose-h2:text-2xl
            prose-h3:text-xl
            prose-h4:text-lg
            prose-p:text-gray-700
            prose-a:font-bold
            prose-blockquote:italic
            prose-figure:mx-auto
            prose-figcaption:opacity-75
            prose-strong:font-medium
            prose-em:italic
            prose-code:font-mono
            prose-pre:font-mono
            prose-ol:pl-6
            prose-ul:pl-8
            prose-li:my-4
            prose-table:my-8
            prose-thead:border-red-300
            prose-tr:border-red-200
            prose-th:text-left
            prose-td:align-center
            prose-img:rounded-lg
            prose-video:my-12
            prose-hr:border-t-2
        "
        ></div>`,
      },
    ],
    theme: {
      typography: {
        DEFAULT: {
          css: [
            {
              color: 'var(--tw-prose-body)',
              '[class~="lead"]': {
                color: 'var(--tw-prose-lead)',
              },
              strong: {
                color: 'var(--tw-prose-bold)',
                fontWeight: '600',
              },
              'h4 strong': {
                fontWeight: '700',
              },
            },
          ],
        },
      },
    },
  }
  return run(config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      :is(:where(hr):not(:where([class~='not-prose'] *))) {
        --tw-border-opacity: 1;
        border-color: rgb(229 231 235 / var(--tw-border-opacity));
      }
      .prose {
        color: var(--tw-prose-body);
      }
      .prose :where([class~='lead']):not(:where([class~='not-prose'] *)) {
        color: var(--tw-prose-lead);
      }
      .prose :where(strong):not(:where([class~='not-prose'] *)) {
        color: var(--tw-prose-bold);
        font-weight: 600;
      }
      .prose :where(h4 strong):not(:where([class~='not-prose'] *)) {
        font-weight: 700;
      }
      .prose-headings\:underline
        :is(:where(h1, h2, h3, h4, th):not(:where([class~='not-prose'] *))) {
        text-decoration: underline;
      }
      .prose-lead\:italic :is(:where([class~='lead']):not(:where([class~='not-prose'] *))) {
        font-style: italic;
      }
      .prose-h1\:text-3xl :is(:where(h1):not(:where([class~='not-prose'] *))) {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }
      .prose-h2\:text-2xl :is(:where(h2):not(:where([class~='not-prose'] *))) {
        font-size: 1.5rem;
        line-height: 2rem;
      }
      .prose-h3\:text-xl :is(:where(h3):not(:where([class~='not-prose'] *))) {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
      .prose-h4\:text-lg :is(:where(h4):not(:where([class~='not-prose'] *))) {
        font-size: 1.125rem;
        line-height: 1.75rem;
      }
      .prose-p\:text-gray-700 :is(:where(p):not(:where([class~='not-prose'] *))) {
        --tw-text-opacity: 1;
        color: rgb(55 65 81 / var(--tw-text-opacity));
      }
      .prose-a\:font-bold :is(:where(a):not(:where([class~='not-prose'] *))) {
        font-weight: 700;
      }
      .prose-blockquote\:italic :is(:where(blockquote):not(:where([class~='not-prose'] *))) {
        font-style: italic;
      }
      .prose-figure\:mx-auto :is(:where(figure):not(:where([class~='not-prose'] *))) {
        margin-left: auto;
        margin-right: auto;
      }
      .prose-figcaption\:opacity-75 :is(:where(figcaption):not(:where([class~='not-prose'] *))) {
        opacity: 0.75;
      }
      .prose-strong\:font-medium :is(:where(strong):not(:where([class~='not-prose'] *))) {
        font-weight: 500;
      }
      .prose-em\:italic :is(:where(em):not(:where([class~='not-prose'] *))) {
        font-style: italic;
      }
      .prose-code\:font-mono :is(:where(code):not(:where([class~='not-prose'] *))) {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
          'Courier New', monospace;
      }
      .prose-pre\:font-mono :is(:where(pre):not(:where([class~='not-prose'] *))) {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
          'Courier New', monospace;
      }
      .prose-ol\:pl-6 :is(:where(ol):not(:where([class~='not-prose'] *))) {
        padding-left: 1.5rem;
      }
      .prose-ul\:pl-8 :is(:where(ul):not(:where([class~='not-prose'] *))) {
        padding-left: 2rem;
      }
      .prose-li\:my-4 :is(:where(li):not(:where([class~='not-prose'] *))) {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      .prose-table\:my-8 :is(:where(table):not(:where([class~='not-prose'] *))) {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      .prose-thead\:border-red-300 :is(:where(thead):not(:where([class~='not-prose'] *))) {
        --tw-border-opacity: 1;
        border-color: rgb(252 165 165 / var(--tw-border-opacity));
      }
      .prose-tr\:border-red-200 :is(:where(tr):not(:where([class~='not-prose'] *))) {
        --tw-border-opacity: 1;
        border-color: rgb(254 202 202 / var(--tw-border-opacity));
      }
      .prose-th\:text-left :is(:where(th):not(:where([class~='not-prose'] *))) {
        text-align: left;
      }
      .prose-img\:rounded-lg :is(:where(img):not(:where([class~='not-prose'] *))) {
        border-radius: 0.5rem;
      }
      .prose-video\:my-12 :is(:where(video):not(:where([class~='not-prose'] *))) {
        margin-top: 3rem;
        margin-bottom: 3rem;
      }
      .prose-hr\:border-t-2 :is(:where(hr):not(:where([class~='not-prose'] *))) {
        border-top-width: 2px;
      }
    `)
  })
})

test('element variants with custom class name', async () => {
  let config = {
    plugins: [typographyPlugin({ className: 'markdown' })],
    content: [
      {
        raw: html`<div
          class="
            markdown
            markdown-headings:underline
            markdown-lead:italic
            markdown-h1:text-3xl
            markdown-h2:text-2xl
            markdown-h3:text-xl
            markdown-h4:text-lg
            markdown-p:text-gray-700
            markdown-a:font-bold
            markdown-blockquote:italic
            markdown-figure:mx-auto
            markdown-figcaption:opacity-75
            markdown-strong:font-medium
            markdown-em:italic
            markdown-code:font-mono
            markdown-pre:font-mono
            markdown-ol:pl-6
            markdown-ul:pl-8
            markdown-li:my-4
            markdown-table:my-8
            markdown-thead:border-red-300
            markdown-tr:border-red-200
            markdown-th:text-left
            markdown-td:align-center
            markdown-img:rounded-lg
            markdown-video:my-12
            markdown-hr:border-t-2
        "
        ></div>`,
      },
    ],
    theme: {
      typography: {
        DEFAULT: {
          css: [
            {
              color: 'var(--tw-prose-body)',
              '[class~="lead"]': {
                color: 'var(--tw-prose-lead)',
              },
              strong: {
                color: 'var(--tw-prose-bold)',
                fontWeight: '600',
              },
              'h4 strong': {
                fontWeight: '700',
              },
            },
          ],
        },
      },
    },
  }
  return run(config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      :is(:where(hr):not(:where([class~='not-markdown'] *))) {
        --tw-border-opacity: 1;
        border-color: rgb(229 231 235 / var(--tw-border-opacity));
      }
      .markdown {
        color: var(--tw-prose-body);
      }
      .markdown :where([class~='lead']):not(:where([class~='not-markdown'] *)) {
        color: var(--tw-prose-lead);
      }
      .markdown :where(strong):not(:where([class~='not-markdown'] *)) {
        color: var(--tw-prose-bold);
        font-weight: 600;
      }
      .markdown :where(h4 strong):not(:where([class~='not-markdown'] *)) {
        font-weight: 700;
      }
      .markdown-headings\:underline
        :is(:where(h1, h2, h3, h4, th):not(:where([class~='not-markdown'] *))) {
        text-decoration: underline;
      }
      .markdown-lead\:italic :is(:where([class~='lead']):not(:where([class~='not-markdown'] *))) {
        font-style: italic;
      }
      .markdown-h1\:text-3xl :is(:where(h1):not(:where([class~='not-markdown'] *))) {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }
      .markdown-h2\:text-2xl :is(:where(h2):not(:where([class~='not-markdown'] *))) {
        font-size: 1.5rem;
        line-height: 2rem;
      }
      .markdown-h3\:text-xl :is(:where(h3):not(:where([class~='not-markdown'] *))) {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
      .markdown-h4\:text-lg :is(:where(h4):not(:where([class~='not-markdown'] *))) {
        font-size: 1.125rem;
        line-height: 1.75rem;
      }
      .markdown-p\:text-gray-700 :is(:where(p):not(:where([class~='not-markdown'] *))) {
        --tw-text-opacity: 1;
        color: rgb(55 65 81 / var(--tw-text-opacity));
      }
      .markdown-a\:font-bold :is(:where(a):not(:where([class~='not-markdown'] *))) {
        font-weight: 700;
      }
      .markdown-blockquote\:italic :is(:where(blockquote):not(:where([class~='not-markdown'] *))) {
        font-style: italic;
      }
      .markdown-figure\:mx-auto :is(:where(figure):not(:where([class~='not-markdown'] *))) {
        margin-left: auto;
        margin-right: auto;
      }
      .markdown-figcaption\:opacity-75
        :is(:where(figcaption):not(:where([class~='not-markdown'] *))) {
        opacity: 0.75;
      }
      .markdown-strong\:font-medium :is(:where(strong):not(:where([class~='not-markdown'] *))) {
        font-weight: 500;
      }
      .markdown-em\:italic :is(:where(em):not(:where([class~='not-markdown'] *))) {
        font-style: italic;
      }
      .markdown-code\:font-mono :is(:where(code):not(:where([class~='not-markdown'] *))) {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
          'Courier New', monospace;
      }
      .markdown-pre\:font-mono :is(:where(pre):not(:where([class~='not-markdown'] *))) {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
          'Courier New', monospace;
      }
      .markdown-ol\:pl-6 :is(:where(ol):not(:where([class~='not-markdown'] *))) {
        padding-left: 1.5rem;
      }
      .markdown-ul\:pl-8 :is(:where(ul):not(:where([class~='not-markdown'] *))) {
        padding-left: 2rem;
      }
      .markdown-li\:my-4 :is(:where(li):not(:where([class~='not-markdown'] *))) {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      .markdown-table\:my-8 :is(:where(table):not(:where([class~='not-markdown'] *))) {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      .markdown-thead\:border-red-300 :is(:where(thead):not(:where([class~='not-markdown'] *))) {
        --tw-border-opacity: 1;
        border-color: rgb(252 165 165 / var(--tw-border-opacity));
      }
      .markdown-tr\:border-red-200 :is(:where(tr):not(:where([class~='not-markdown'] *))) {
        --tw-border-opacity: 1;
        border-color: rgb(254 202 202 / var(--tw-border-opacity));
      }
      .markdown-th\:text-left :is(:where(th):not(:where([class~='not-markdown'] *))) {
        text-align: left;
      }
      .markdown-img\:rounded-lg :is(:where(img):not(:where([class~='not-markdown'] *))) {
        border-radius: 0.5rem;
      }
      .markdown-video\:my-12 :is(:where(video):not(:where([class~='not-markdown'] *))) {
        margin-top: 3rem;
        margin-bottom: 3rem;
      }
      .markdown-hr\:border-t-2 :is(:where(hr):not(:where([class~='not-markdown'] *))) {
        border-top-width: 2px;
      }
    `)
  })
})

test('customizing defaults with multiple values does not result in invalid css', async () => {
  let config = {
    plugins: [typographyPlugin()],
    content: [
      {
        raw: html`<div class="prose"></div>`,
      },
    ],
    theme: {
      typography: {
        DEFAULT: {
          css: {
            textAlign: ['-webkit-match-parent', 'match-parent'],
          },
        },
      },
    },
  }
  return run(config).then((result) => {
    // TODO: Fix this test. It should list both properties but there's a bug in tailwind that's overriding them.
    expect(result.css).toMatchFormattedCss(css`
      .prose {
        text-align: match-parent;
      }
    `)
  })
})

it('should be possible to use nested syntax (&) when extending the config', () => {
  let config = {
    plugins: [typographyPlugin()],
    content: [
      {
        raw: html`<div class="prose"></div>`,
      },
    ],
    theme: {
      extend: {
        typography: {
          DEFAULT: {
            css: {
              color: '#000',
              a: {
                color: '#888',
                '&:hover': {
                  color: '#ff0000',
                },
              },
            },
          },
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toIncludeCss(css`
      .prose {
        color: #000;
        max-width: 65ch;
      }
    `)

    expect(result.css).toIncludeCss(css`
      .prose :where(a):not(:where([class~='not-prose'] *)) {
        color: #888;
        text-decoration: underline;
        font-weight: 500;
      }
    `)

    expect(result.css).toIncludeCss(css`
      .prose :where(a):not(:where([class~='not-prose'] *)):hover {
        color: #ff0000;
      }
    `)
  })
})
