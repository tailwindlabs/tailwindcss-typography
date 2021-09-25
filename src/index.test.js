const tailwind = require('tailwindcss')
const snapshotDiff = require('snapshot-diff')
const postcss = require('postcss')
const typographyPlugin = require('.')

function run(options = {}, config = {}) {
  return postcss([tailwind({ ...config, corePlugins: [], plugins: [typographyPlugin(options)] })])
    .process(['@tailwind base;', '@tailwind components;', '@tailwind utilities;'].join('\n'), {
      from: undefined,
    })
    .then((result) => result.css)
}

async function diffOnly(options = {}, config = {}) {
  const [before, after] = await Promise.all([run(), run(options, config)])

  return `\n\n${snapshotDiff(before, after, {
    aAnnotation: '__REMOVE_ME__',
    bAnnotation: '__REMOVE_ME__',
    contextLines: 0,
  })
    .replace(/\n\n@@([^@@]*)@@/g, '') // Top level @@ signs
    .replace(/@@([^@@]*)@@/g, '\n---\n') // In between @@ signs
    .replace(/[-+] __REMOVE_ME__\n/g, '')
    .replace(/Snapshot Diff:\n/g, '')
    .replace(/"/g, "'")
    .split('\n')
    .map((line) => `  ${line}`.trimEnd())
    .join('\n')}\n\n`
}

it('should generate the default classes for the typography components', async () => {
  expect(await run()).toMatchInlineSnapshot(`
    ".prose {
      color: #374151;
      max-width: 65ch;
    }

    .prose :where([class~=\\"lead\\"]) {
      color: #4b5563;
      font-size: 1.25em;
      line-height: 1.6;
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose :where(a) {
      color: #111827;
      text-decoration: underline;
      font-weight: 500;
    }

    .prose :where(strong) {
      color: #111827;
      font-weight: 600;
    }

    .prose :where(ol[type=\\"A\\"]) {
      --list-counter-style: upper-alpha;
    }

    .prose :where(ol[type=\\"a\\"]) {
      --list-counter-style: lower-alpha;
    }

    .prose :where(ol[type=\\"A\\" s]) {
      --list-counter-style: upper-alpha;
    }

    .prose :where(ol[type=\\"a\\" s]) {
      --list-counter-style: lower-alpha;
    }

    .prose :where(ol[type=\\"I\\"]) {
      --list-counter-style: upper-roman;
    }

    .prose :where(ol[type=\\"i\\"]) {
      --list-counter-style: lower-roman;
    }

    .prose :where(ol[type=\\"I\\" s]) {
      --list-counter-style: upper-roman;
    }

    .prose :where(ol[type=\\"i\\" s]) {
      --list-counter-style: lower-roman;
    }

    .prose :where(ol[type=\\"1\\"]) {
      --list-counter-style: decimal;
    }

    .prose :where(ol > li) {
      position: relative;
      padding-left: 1.75em;
    }

    .prose :where(ol > li)::before {
      content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
      position: absolute;
      font-weight: 400;
      color: #6b7280;
      left: 0;
    }

    .prose :where(ul > li) {
      position: relative;
      padding-left: 1.75em;
    }

    .prose :where(ul > li)::before {
      content: \\"\\";
      position: absolute;
      background-color: #d1d5db;
      border-radius: 50%;
      width: 0.375em;
      height: 0.375em;
      top: calc(0.875em - 0.1875em);
      left: 0.25em;
    }

    .prose :where(hr) {
      border-color: #e5e7eb;
      border-top-width: 1px;
      margin-top: 3em;
      margin-bottom: 3em;
    }

    .prose :where(blockquote) {
      font-weight: 500;
      font-style: italic;
      color: #111827;
      border-left-width: 0.25rem;
      border-left-color: #e5e7eb;
      quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
      margin-top: 1.6em;
      margin-bottom: 1.6em;
      padding-left: 1em;
    }

    .prose :where(blockquote p:first-of-type)::before {
      content: open-quote;
    }

    .prose :where(blockquote p:last-of-type)::after {
      content: close-quote;
    }

    .prose :where(h1) {
      color: #111827;
      font-weight: 800;
      font-size: 2.25em;
      margin-top: 0;
      margin-bottom: 0.8888889em;
      line-height: 1.1111111;
    }

    .prose :where(h1 strong) {
      font-weight: 900;
    }

    .prose :where(h2) {
      color: #111827;
      font-weight: 700;
      font-size: 1.5em;
      margin-top: 2em;
      margin-bottom: 1em;
      line-height: 1.3333333;
    }

    .prose :where(h2 strong) {
      font-weight: 800;
    }

    .prose :where(h3) {
      color: #111827;
      font-weight: 600;
      font-size: 1.25em;
      margin-top: 1.6em;
      margin-bottom: 0.6em;
      line-height: 1.6;
    }

    .prose :where(h3 strong) {
      font-weight: 700;
    }

    .prose :where(h4) {
      color: #111827;
      font-weight: 600;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      line-height: 1.5;
    }

    .prose :where(h4 strong) {
      font-weight: 700;
    }

    .prose :where(figure figcaption) {
      color: #6b7280;
      font-size: 0.875em;
      line-height: 1.4285714;
      margin-top: 0.8571429em;
    }

    .prose :where(code) {
      color: #111827;
      font-weight: 600;
      font-size: 0.875em;
    }

    .prose :where(code)::before {
      content: \\"\`\\";
    }

    .prose :where(code)::after {
      content: \\"\`\\";
    }

    .prose :where(a code) {
      color: #111827;
    }

    .prose :where(pre) {
      color: #e5e7eb;
      background-color: #1f2937;
      overflow-x: auto;
      font-size: 0.875em;
      line-height: 1.7142857;
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
      border-radius: 0.375rem;
      padding-top: 0.8571429em;
      padding-right: 1.1428571em;
      padding-bottom: 0.8571429em;
      padding-left: 1.1428571em;
    }

    .prose :where(pre code) {
      background-color: transparent;
      border-width: 0;
      border-radius: 0;
      padding: 0;
      font-weight: 400;
      color: inherit;
      font-size: inherit;
      font-family: inherit;
      line-height: inherit;
    }

    .prose :where(pre code)::before {
      content: none;
    }

    .prose :where(pre code)::after {
      content: none;
    }

    .prose :where(table) {
      width: 100%;
      table-layout: auto;
      text-align: left;
      margin-top: 2em;
      margin-bottom: 2em;
      font-size: 0.875em;
      line-height: 1.7142857;
    }

    .prose :where(thead) {
      color: #111827;
      font-weight: 600;
      border-bottom-width: 1px;
      border-bottom-color: #d1d5db;
    }

    .prose :where(thead th) {
      vertical-align: bottom;
      padding-right: 0.5714286em;
      padding-bottom: 0.5714286em;
      padding-left: 0.5714286em;
    }

    .prose :where(tbody tr) {
      border-bottom-width: 1px;
      border-bottom-color: #e5e7eb;
    }

    .prose :where(tbody tr:last-child) {
      border-bottom-width: 0;
    }

    .prose :where(tbody td) {
      vertical-align: top;
      padding-top: 0.5714286em;
      padding-right: 0.5714286em;
      padding-bottom: 0.5714286em;
      padding-left: 0.5714286em;
    }

    .prose {
      font-size: 1rem;
      line-height: 1.75;
    }

    .prose :where(p) {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }

    .prose :where(img) {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose :where(video) {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose :where(figure) {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose :where(figure > *) {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose :where(h2 code) {
      font-size: 0.875em;
    }

    .prose :where(h3 code) {
      font-size: 0.9em;
    }

    .prose :where(ol) {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }

    .prose :where(ul) {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }

    .prose :where(li) {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }

    .prose :where(> ul > li p) {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }

    .prose :where(> ul > li > *:first-child) {
      margin-top: 1.25em;
    }

    .prose :where(> ul > li > *:last-child) {
      margin-bottom: 1.25em;
    }

    .prose :where(> ol > li > *:first-child) {
      margin-top: 1.25em;
    }

    .prose :where(> ol > li > *:last-child) {
      margin-bottom: 1.25em;
    }

    .prose :where(ul ul, ul ol, ol ul, ol ol) {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }

    .prose :where(hr + *) {
      margin-top: 0;
    }

    .prose :where(h2 + *) {
      margin-top: 0;
    }

    .prose :where(h3 + *) {
      margin-top: 0;
    }

    .prose :where(h4 + *) {
      margin-top: 0;
    }

    .prose :where(thead th:first-child) {
      padding-left: 0;
    }

    .prose :where(thead th:last-child) {
      padding-right: 0;
    }

    .prose :where(tbody td:first-child) {
      padding-left: 0;
    }

    .prose :where(tbody td:last-child) {
      padding-right: 0;
    }

    .prose :where(> :first-child) {
      margin-top: 0;
    }

    .prose :where(> :last-child) {
      margin-bottom: 0;
    }

    .prose-sm {
      font-size: 0.875rem;
      line-height: 1.7142857;
    }

    .prose-sm :where(p) {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }

    .prose-sm :where([class~=\\"lead\\"]) {
      font-size: 1.2857143em;
      line-height: 1.5555556;
      margin-top: 0.8888889em;
      margin-bottom: 0.8888889em;
    }

    .prose-sm :where(blockquote) {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
      padding-left: 1.1111111em;
    }

    .prose-sm :where(h1) {
      font-size: 2.1428571em;
      margin-top: 0;
      margin-bottom: 0.8em;
      line-height: 1.2;
    }

    .prose-sm :where(h2) {
      font-size: 1.4285714em;
      margin-top: 1.6em;
      margin-bottom: 0.8em;
      line-height: 1.4;
    }

    .prose-sm :where(h3) {
      font-size: 1.2857143em;
      margin-top: 1.5555556em;
      margin-bottom: 0.4444444em;
      line-height: 1.5555556;
    }

    .prose-sm :where(h4) {
      margin-top: 1.4285714em;
      margin-bottom: 0.5714286em;
      line-height: 1.4285714;
    }

    .prose-sm :where(img) {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }

    .prose-sm :where(video) {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }

    .prose-sm :where(figure) {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }

    .prose-sm :where(figure > *) {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-sm :where(figure figcaption) {
      font-size: 0.8571429em;
      line-height: 1.3333333;
      margin-top: 0.6666667em;
    }

    .prose-sm :where(code) {
      font-size: 0.8571429em;
    }

    .prose-sm :where(h2 code) {
      font-size: 0.9em;
    }

    .prose-sm :where(h3 code) {
      font-size: 0.8888889em;
    }

    .prose-sm :where(pre) {
      font-size: 0.8571429em;
      line-height: 1.6666667;
      margin-top: 1.6666667em;
      margin-bottom: 1.6666667em;
      border-radius: 0.25rem;
      padding-top: 0.6666667em;
      padding-right: 1em;
      padding-bottom: 0.6666667em;
      padding-left: 1em;
    }

    .prose-sm :where(ol) {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }

    .prose-sm :where(ul) {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }

    .prose-sm :where(li) {
      margin-top: 0.2857143em;
      margin-bottom: 0.2857143em;
    }

    .prose-sm :where(ol > li) {
      padding-left: 1.5714286em;
    }

    .prose-sm :where(ol > li)::before {
      left: 0;
    }

    .prose-sm :where(ul > li) {
      padding-left: 1.5714286em;
    }

    .prose-sm :where(ul > li)::before {
      height: 0.3571429em;
      width: 0.3571429em;
      top: calc(0.8571429em - 0.1785714em);
      left: 0.2142857em;
    }

    .prose-sm :where(> ul > li p) {
      margin-top: 0.5714286em;
      margin-bottom: 0.5714286em;
    }

    .prose-sm :where(> ul > li > *:first-child) {
      margin-top: 1.1428571em;
    }

    .prose-sm :where(> ul > li > *:last-child) {
      margin-bottom: 1.1428571em;
    }

    .prose-sm :where(> ol > li > *:first-child) {
      margin-top: 1.1428571em;
    }

    .prose-sm :where(> ol > li > *:last-child) {
      margin-bottom: 1.1428571em;
    }

    .prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      margin-top: 0.5714286em;
      margin-bottom: 0.5714286em;
    }

    .prose-sm :where(hr) {
      margin-top: 2.8571429em;
      margin-bottom: 2.8571429em;
    }

    .prose-sm :where(hr + *) {
      margin-top: 0;
    }

    .prose-sm :where(h2 + *) {
      margin-top: 0;
    }

    .prose-sm :where(h3 + *) {
      margin-top: 0;
    }

    .prose-sm :where(h4 + *) {
      margin-top: 0;
    }

    .prose-sm :where(table) {
      font-size: 0.8571429em;
      line-height: 1.5;
    }

    .prose-sm :where(thead th) {
      padding-right: 1em;
      padding-bottom: 0.6666667em;
      padding-left: 1em;
    }

    .prose-sm :where(thead th:first-child) {
      padding-left: 0;
    }

    .prose-sm :where(thead th:last-child) {
      padding-right: 0;
    }

    .prose-sm :where(tbody td) {
      padding-top: 0.6666667em;
      padding-right: 1em;
      padding-bottom: 0.6666667em;
      padding-left: 1em;
    }

    .prose-sm :where(tbody td:first-child) {
      padding-left: 0;
    }

    .prose-sm :where(tbody td:last-child) {
      padding-right: 0;
    }

    .prose-sm :where(> :first-child) {
      margin-top: 0;
    }

    .prose-sm :where(> :last-child) {
      margin-bottom: 0;
    }

    .prose-lg {
      font-size: 1.125rem;
      line-height: 1.7777778;
    }

    .prose-lg :where(p) {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-lg :where([class~=\\"lead\\"]) {
      font-size: 1.2222222em;
      line-height: 1.4545455;
      margin-top: 1.0909091em;
      margin-bottom: 1.0909091em;
    }

    .prose-lg :where(blockquote) {
      margin-top: 1.6666667em;
      margin-bottom: 1.6666667em;
      padding-left: 1em;
    }

    .prose-lg :where(h1) {
      font-size: 2.6666667em;
      margin-top: 0;
      margin-bottom: 0.8333333em;
      line-height: 1;
    }

    .prose-lg :where(h2) {
      font-size: 1.6666667em;
      margin-top: 1.8666667em;
      margin-bottom: 1.0666667em;
      line-height: 1.3333333;
    }

    .prose-lg :where(h3) {
      font-size: 1.3333333em;
      margin-top: 1.6666667em;
      margin-bottom: 0.6666667em;
      line-height: 1.5;
    }

    .prose-lg :where(h4) {
      margin-top: 1.7777778em;
      margin-bottom: 0.4444444em;
      line-height: 1.5555556;
    }

    .prose-lg :where(img) {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
    }

    .prose-lg :where(video) {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
    }

    .prose-lg :where(figure) {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
    }

    .prose-lg :where(figure > *) {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-lg :where(figure figcaption) {
      font-size: 0.8888889em;
      line-height: 1.5;
      margin-top: 1em;
    }

    .prose-lg :where(code) {
      font-size: 0.8888889em;
    }

    .prose-lg :where(h2 code) {
      font-size: 0.8666667em;
    }

    .prose-lg :where(h3 code) {
      font-size: 0.875em;
    }

    .prose-lg :where(pre) {
      font-size: 0.8888889em;
      line-height: 1.75;
      margin-top: 2em;
      margin-bottom: 2em;
      border-radius: 0.375rem;
      padding-top: 1em;
      padding-right: 1.5em;
      padding-bottom: 1em;
      padding-left: 1.5em;
    }

    .prose-lg :where(ol) {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-lg :where(ul) {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-lg :where(li) {
      margin-top: 0.6666667em;
      margin-bottom: 0.6666667em;
    }

    .prose-lg :where(ol > li) {
      padding-left: 1.6666667em;
    }

    .prose-lg :where(ol > li)::before {
      left: 0;
    }

    .prose-lg :where(ul > li) {
      padding-left: 1.6666667em;
    }

    .prose-lg :where(ul > li)::before {
      width: 0.3333333em;
      height: 0.3333333em;
      top: calc(0.8888889em - 0.1666667em);
      left: 0.2222222em;
    }

    .prose-lg :where(> ul > li p) {
      margin-top: 0.8888889em;
      margin-bottom: 0.8888889em;
    }

    .prose-lg :where(> ul > li > *:first-child) {
      margin-top: 1.3333333em;
    }

    .prose-lg :where(> ul > li > *:last-child) {
      margin-bottom: 1.3333333em;
    }

    .prose-lg :where(> ol > li > *:first-child) {
      margin-top: 1.3333333em;
    }

    .prose-lg :where(> ol > li > *:last-child) {
      margin-bottom: 1.3333333em;
    }

    .prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      margin-top: 0.8888889em;
      margin-bottom: 0.8888889em;
    }

    .prose-lg :where(hr) {
      margin-top: 3.1111111em;
      margin-bottom: 3.1111111em;
    }

    .prose-lg :where(hr + *) {
      margin-top: 0;
    }

    .prose-lg :where(h2 + *) {
      margin-top: 0;
    }

    .prose-lg :where(h3 + *) {
      margin-top: 0;
    }

    .prose-lg :where(h4 + *) {
      margin-top: 0;
    }

    .prose-lg :where(table) {
      font-size: 0.8888889em;
      line-height: 1.5;
    }

    .prose-lg :where(thead th) {
      padding-right: 0.75em;
      padding-bottom: 0.75em;
      padding-left: 0.75em;
    }

    .prose-lg :where(thead th:first-child) {
      padding-left: 0;
    }

    .prose-lg :where(thead th:last-child) {
      padding-right: 0;
    }

    .prose-lg :where(tbody td) {
      padding-top: 0.75em;
      padding-right: 0.75em;
      padding-bottom: 0.75em;
      padding-left: 0.75em;
    }

    .prose-lg :where(tbody td:first-child) {
      padding-left: 0;
    }

    .prose-lg :where(tbody td:last-child) {
      padding-right: 0;
    }

    .prose-lg :where(> :first-child) {
      margin-top: 0;
    }

    .prose-lg :where(> :last-child) {
      margin-bottom: 0;
    }

    .prose-xl {
      font-size: 1.25rem;
      line-height: 1.8;
    }

    .prose-xl :where(p) {
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose-xl :where([class~=\\"lead\\"]) {
      font-size: 1.2em;
      line-height: 1.5;
      margin-top: 1em;
      margin-bottom: 1em;
    }

    .prose-xl :where(blockquote) {
      margin-top: 1.6em;
      margin-bottom: 1.6em;
      padding-left: 1.0666667em;
    }

    .prose-xl :where(h1) {
      font-size: 2.8em;
      margin-top: 0;
      margin-bottom: 0.8571429em;
      line-height: 1;
    }

    .prose-xl :where(h2) {
      font-size: 1.8em;
      margin-top: 1.5555556em;
      margin-bottom: 0.8888889em;
      line-height: 1.1111111;
    }

    .prose-xl :where(h3) {
      font-size: 1.5em;
      margin-top: 1.6em;
      margin-bottom: 0.6666667em;
      line-height: 1.3333333;
    }

    .prose-xl :where(h4) {
      margin-top: 1.8em;
      margin-bottom: 0.6em;
      line-height: 1.6;
    }

    .prose-xl :where(img) {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-xl :where(video) {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-xl :where(figure) {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-xl :where(figure > *) {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-xl :where(figure figcaption) {
      font-size: 0.9em;
      line-height: 1.5555556;
      margin-top: 1em;
    }

    .prose-xl :where(code) {
      font-size: 0.9em;
    }

    .prose-xl :where(h2 code) {
      font-size: 0.8611111em;
    }

    .prose-xl :where(h3 code) {
      font-size: 0.9em;
    }

    .prose-xl :where(pre) {
      font-size: 0.9em;
      line-height: 1.7777778;
      margin-top: 2em;
      margin-bottom: 2em;
      border-radius: 0.5rem;
      padding-top: 1.1111111em;
      padding-right: 1.3333333em;
      padding-bottom: 1.1111111em;
      padding-left: 1.3333333em;
    }

    .prose-xl :where(ol) {
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose-xl :where(ul) {
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose-xl :where(li) {
      margin-top: 0.6em;
      margin-bottom: 0.6em;
    }

    .prose-xl :where(ol > li) {
      padding-left: 1.8em;
    }

    .prose-xl :where(ol > li)::before {
      left: 0;
    }

    .prose-xl :where(ul > li) {
      padding-left: 1.8em;
    }

    .prose-xl :where(ul > li)::before {
      width: 0.35em;
      height: 0.35em;
      top: calc(0.9em - 0.175em);
      left: 0.25em;
    }

    .prose-xl :where(> ul > li p) {
      margin-top: 0.8em;
      margin-bottom: 0.8em;
    }

    .prose-xl :where(> ul > li > *:first-child) {
      margin-top: 1.2em;
    }

    .prose-xl :where(> ul > li > *:last-child) {
      margin-bottom: 1.2em;
    }

    .prose-xl :where(> ol > li > *:first-child) {
      margin-top: 1.2em;
    }

    .prose-xl :where(> ol > li > *:last-child) {
      margin-bottom: 1.2em;
    }

    .prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      margin-top: 0.8em;
      margin-bottom: 0.8em;
    }

    .prose-xl :where(hr) {
      margin-top: 2.8em;
      margin-bottom: 2.8em;
    }

    .prose-xl :where(hr + *) {
      margin-top: 0;
    }

    .prose-xl :where(h2 + *) {
      margin-top: 0;
    }

    .prose-xl :where(h3 + *) {
      margin-top: 0;
    }

    .prose-xl :where(h4 + *) {
      margin-top: 0;
    }

    .prose-xl :where(table) {
      font-size: 0.9em;
      line-height: 1.5555556;
    }

    .prose-xl :where(thead th) {
      padding-right: 0.6666667em;
      padding-bottom: 0.8888889em;
      padding-left: 0.6666667em;
    }

    .prose-xl :where(thead th:first-child) {
      padding-left: 0;
    }

    .prose-xl :where(thead th:last-child) {
      padding-right: 0;
    }

    .prose-xl :where(tbody td) {
      padding-top: 0.8888889em;
      padding-right: 0.6666667em;
      padding-bottom: 0.8888889em;
      padding-left: 0.6666667em;
    }

    .prose-xl :where(tbody td:first-child) {
      padding-left: 0;
    }

    .prose-xl :where(tbody td:last-child) {
      padding-right: 0;
    }

    .prose-xl :where(> :first-child) {
      margin-top: 0;
    }

    .prose-xl :where(> :last-child) {
      margin-bottom: 0;
    }

    .prose-2xl {
      font-size: 1.5rem;
      line-height: 1.6666667;
    }

    .prose-2xl :where(p) {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-2xl :where([class~=\\"lead\\"]) {
      font-size: 1.25em;
      line-height: 1.4666667;
      margin-top: 1.0666667em;
      margin-bottom: 1.0666667em;
    }

    .prose-2xl :where(blockquote) {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
      padding-left: 1.1111111em;
    }

    .prose-2xl :where(h1) {
      font-size: 2.6666667em;
      margin-top: 0;
      margin-bottom: 0.875em;
      line-height: 1;
    }

    .prose-2xl :where(h2) {
      font-size: 2em;
      margin-top: 1.5em;
      margin-bottom: 0.8333333em;
      line-height: 1.0833333;
    }

    .prose-2xl :where(h3) {
      font-size: 1.5em;
      margin-top: 1.5555556em;
      margin-bottom: 0.6666667em;
      line-height: 1.2222222;
    }

    .prose-2xl :where(h4) {
      margin-top: 1.6666667em;
      margin-bottom: 0.6666667em;
      line-height: 1.5;
    }

    .prose-2xl :where(img) {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-2xl :where(video) {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-2xl :where(figure) {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-2xl :where(figure > *) {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-2xl :where(figure figcaption) {
      font-size: 0.8333333em;
      line-height: 1.6;
      margin-top: 1em;
    }

    .prose-2xl :where(code) {
      font-size: 0.8333333em;
    }

    .prose-2xl :where(h2 code) {
      font-size: 0.875em;
    }

    .prose-2xl :where(h3 code) {
      font-size: 0.8888889em;
    }

    .prose-2xl :where(pre) {
      font-size: 0.8333333em;
      line-height: 1.8;
      margin-top: 2em;
      margin-bottom: 2em;
      border-radius: 0.5rem;
      padding-top: 1.2em;
      padding-right: 1.6em;
      padding-bottom: 1.2em;
      padding-left: 1.6em;
    }

    .prose-2xl :where(ol) {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-2xl :where(ul) {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-2xl :where(li) {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }

    .prose-2xl :where(ol > li) {
      padding-left: 1.6666667em;
    }

    .prose-2xl :where(ol > li)::before {
      left: 0;
    }

    .prose-2xl :where(ul > li) {
      padding-left: 1.6666667em;
    }

    .prose-2xl :where(ul > li)::before {
      width: 0.3333333em;
      height: 0.3333333em;
      top: calc(0.8333333em - 0.1666667em);
      left: 0.25em;
    }

    .prose-2xl :where(> ul > li p) {
      margin-top: 0.8333333em;
      margin-bottom: 0.8333333em;
    }

    .prose-2xl :where(> ul > li > *:first-child) {
      margin-top: 1.3333333em;
    }

    .prose-2xl :where(> ul > li > *:last-child) {
      margin-bottom: 1.3333333em;
    }

    .prose-2xl :where(> ol > li > *:first-child) {
      margin-top: 1.3333333em;
    }

    .prose-2xl :where(> ol > li > *:last-child) {
      margin-bottom: 1.3333333em;
    }

    .prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      margin-top: 0.6666667em;
      margin-bottom: 0.6666667em;
    }

    .prose-2xl :where(hr) {
      margin-top: 3em;
      margin-bottom: 3em;
    }

    .prose-2xl :where(hr + *) {
      margin-top: 0;
    }

    .prose-2xl :where(h2 + *) {
      margin-top: 0;
    }

    .prose-2xl :where(h3 + *) {
      margin-top: 0;
    }

    .prose-2xl :where(h4 + *) {
      margin-top: 0;
    }

    .prose-2xl :where(table) {
      font-size: 0.8333333em;
      line-height: 1.4;
    }

    .prose-2xl :where(thead th) {
      padding-right: 0.6em;
      padding-bottom: 0.8em;
      padding-left: 0.6em;
    }

    .prose-2xl :where(thead th:first-child) {
      padding-left: 0;
    }

    .prose-2xl :where(thead th:last-child) {
      padding-right: 0;
    }

    .prose-2xl :where(tbody td) {
      padding-top: 0.8em;
      padding-right: 0.6em;
      padding-bottom: 0.8em;
      padding-left: 0.6em;
    }

    .prose-2xl :where(tbody td:first-child) {
      padding-left: 0;
    }

    .prose-2xl :where(tbody td:last-child) {
      padding-right: 0;
    }

    .prose-2xl :where(> :first-child) {
      margin-top: 0;
    }

    .prose-2xl :where(> :last-child) {
      margin-bottom: 0;
    }

    .prose-red :where(a) {
      color: #dc2626;
    }

    .prose-red :where(a code) {
      color: #dc2626;
    }

    .prose-yellow :where(a) {
      color: #d97706;
    }

    .prose-yellow :where(a code) {
      color: #d97706;
    }

    .prose-green :where(a) {
      color: #059669;
    }

    .prose-green :where(a code) {
      color: #059669;
    }

    .prose-blue :where(a) {
      color: #2563eb;
    }

    .prose-blue :where(a code) {
      color: #2563eb;
    }

    .prose-indigo :where(a) {
      color: #4f46e5;
    }

    .prose-indigo :where(a code) {
      color: #4f46e5;
    }

    .prose-purple :where(a) {
      color: #7c3aed;
    }

    .prose-purple :where(a code) {
      color: #7c3aed;
    }

    .prose-pink :where(a) {
      color: #db2777;
    }

    .prose-pink :where(a code) {
      color: #db2777;
    }

    @media (min-width: 640px) {
      .sm\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .sm\\\\:prose :where([class~=\\"lead\\"]) {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose :where(a) {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .sm\\\\:prose :where(strong) {
        color: #111827;
        font-weight: 600;
      }

      .sm\\\\:prose :where(ol[type=\\"A\\"]) {
        --list-counter-style: upper-alpha;
      }

      .sm\\\\:prose :where(ol[type=\\"a\\"]) {
        --list-counter-style: lower-alpha;
      }

      .sm\\\\:prose :where(ol[type=\\"A\\" s]) {
        --list-counter-style: upper-alpha;
      }

      .sm\\\\:prose :where(ol[type=\\"a\\" s]) {
        --list-counter-style: lower-alpha;
      }

      .sm\\\\:prose :where(ol[type=\\"I\\"]) {
        --list-counter-style: upper-roman;
      }

      .sm\\\\:prose :where(ol[type=\\"i\\"]) {
        --list-counter-style: lower-roman;
      }

      .sm\\\\:prose :where(ol[type=\\"I\\" s]) {
        --list-counter-style: upper-roman;
      }

      .sm\\\\:prose :where(ol[type=\\"i\\" s]) {
        --list-counter-style: lower-roman;
      }

      .sm\\\\:prose :where(ol[type=\\"1\\"]) {
        --list-counter-style: decimal;
      }

      .sm\\\\:prose :where(ol > li) {
        position: relative;
        padding-left: 1.75em;
      }

      .sm\\\\:prose :where(ol > li)::before {
        content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .sm\\\\:prose :where(ul > li) {
        position: relative;
        padding-left: 1.75em;
      }

      .sm\\\\:prose :where(ul > li)::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .sm\\\\:prose :where(hr) {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .sm\\\\:prose :where(blockquote) {
        font-weight: 500;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: #e5e7eb;
        quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .sm\\\\:prose :where(blockquote p:first-of-type)::before {
        content: open-quote;
      }

      .sm\\\\:prose :where(blockquote p:last-of-type)::after {
        content: close-quote;
      }

      .sm\\\\:prose :where(h1) {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .sm\\\\:prose :where(h1 strong) {
        font-weight: 900;
      }

      .sm\\\\:prose :where(h2) {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .sm\\\\:prose :where(h2 strong) {
        font-weight: 800;
      }

      .sm\\\\:prose :where(h3) {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .sm\\\\:prose :where(h3 strong) {
        font-weight: 700;
      }

      .sm\\\\:prose :where(h4) {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .sm\\\\:prose :where(h4 strong) {
        font-weight: 700;
      }

      .sm\\\\:prose :where(figure figcaption) {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .sm\\\\:prose :where(code) {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .sm\\\\:prose :where(code)::before {
        content: \\"\`\\";
      }

      .sm\\\\:prose :where(code)::after {
        content: \\"\`\\";
      }

      .sm\\\\:prose :where(a code) {
        color: #111827;
      }

      .sm\\\\:prose :where(pre) {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .sm\\\\:prose :where(pre code) {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .sm\\\\:prose :where(pre code)::before {
        content: none;
      }

      .sm\\\\:prose :where(pre code)::after {
        content: none;
      }

      .sm\\\\:prose :where(table) {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .sm\\\\:prose :where(thead) {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .sm\\\\:prose :where(thead th) {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .sm\\\\:prose :where(tbody tr) {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .sm\\\\:prose :where(tbody tr:last-child) {
        border-bottom-width: 0;
      }

      .sm\\\\:prose :where(tbody td) {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .sm\\\\:prose {
        font-size: 1rem;
        line-height: 1.75;
      }

      .sm\\\\:prose :where(p) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose :where(h2 code) {
        font-size: 0.875em;
      }

      .sm\\\\:prose :where(h3 code) {
        font-size: 0.9em;
      }

      .sm\\\\:prose :where(ol) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose :where(ul) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose :where(li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .sm\\\\:prose :where(> ul > li p) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .sm\\\\:prose :where(> ul > li > *:first-child) {
        margin-top: 1.25em;
      }

      .sm\\\\:prose :where(> ul > li > *:last-child) {
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose :where(> ol > li > *:first-child) {
        margin-top: 1.25em;
      }

      .sm\\\\:prose :where(> ol > li > *:last-child) {
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .sm\\\\:prose :where(hr + *) {
        margin-top: 0;
      }

      .sm\\\\:prose :where(h2 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose :where(h3 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose :where(h4 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose :where(thead th:first-child) {
        padding-left: 0;
      }

      .sm\\\\:prose :where(thead th:last-child) {
        padding-right: 0;
      }

      .sm\\\\:prose :where(tbody td:first-child) {
        padding-left: 0;
      }

      .sm\\\\:prose :where(tbody td:last-child) {
        padding-right: 0;
      }

      .sm\\\\:prose :where(> :first-child) {
        margin-top: 0;
      }

      .sm\\\\:prose :where(> :last-child) {
        margin-bottom: 0;
      }

      .sm\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .sm\\\\:prose-sm :where(p) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm :where([class~=\\"lead\\"]) {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .sm\\\\:prose-sm :where(blockquote) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .sm\\\\:prose-sm :where(h1) {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .sm\\\\:prose-sm :where(h2) {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .sm\\\\:prose-sm :where(h3) {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .sm\\\\:prose-sm :where(h4) {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .sm\\\\:prose-sm :where(img) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .sm\\\\:prose-sm :where(video) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .sm\\\\:prose-sm :where(figure) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .sm\\\\:prose-sm :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-sm :where(figure figcaption) {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .sm\\\\:prose-sm :where(code) {
        font-size: 0.8571429em;
      }

      .sm\\\\:prose-sm :where(h2 code) {
        font-size: 0.9em;
      }

      .sm\\\\:prose-sm :where(h3 code) {
        font-size: 0.8888889em;
      }

      .sm\\\\:prose-sm :where(pre) {
        font-size: 0.8571429em;
        line-height: 1.6666667;
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        border-radius: 0.25rem;
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-sm :where(ol) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm :where(ul) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm :where(li) {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .sm\\\\:prose-sm :where(ol > li) {
        padding-left: 1.5714286em;
      }

      .sm\\\\:prose-sm :where(ol > li)::before {
        left: 0;
      }

      .sm\\\\:prose-sm :where(ul > li) {
        padding-left: 1.5714286em;
      }

      .sm\\\\:prose-sm :where(ul > li)::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .sm\\\\:prose-sm :where(> ul > li p) {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .sm\\\\:prose-sm :where(> ul > li > *:first-child) {
        margin-top: 1.1428571em;
      }

      .sm\\\\:prose-sm :where(> ul > li > *:last-child) {
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm :where(> ol > li > *:first-child) {
        margin-top: 1.1428571em;
      }

      .sm\\\\:prose-sm :where(> ol > li > *:last-child) {
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .sm\\\\:prose-sm :where(hr) {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .sm\\\\:prose-sm :where(hr + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-sm :where(h2 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-sm :where(h3 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-sm :where(h4 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-sm :where(table) {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .sm\\\\:prose-sm :where(thead th) {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-sm :where(thead th:first-child) {
        padding-left: 0;
      }

      .sm\\\\:prose-sm :where(thead th:last-child) {
        padding-right: 0;
      }

      .sm\\\\:prose-sm :where(tbody td) {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-sm :where(tbody td:first-child) {
        padding-left: 0;
      }

      .sm\\\\:prose-sm :where(tbody td:last-child) {
        padding-right: 0;
      }

      .sm\\\\:prose-sm :where(> :first-child) {
        margin-top: 0;
      }

      .sm\\\\:prose-sm :where(> :last-child) {
        margin-bottom: 0;
      }

      .sm\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .sm\\\\:prose-lg :where(p) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg :where([class~=\\"lead\\"]) {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .sm\\\\:prose-lg :where(blockquote) {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-lg :where(h1) {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .sm\\\\:prose-lg :where(h2) {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .sm\\\\:prose-lg :where(h3) {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .sm\\\\:prose-lg :where(h4) {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .sm\\\\:prose-lg :where(img) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .sm\\\\:prose-lg :where(video) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .sm\\\\:prose-lg :where(figure) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .sm\\\\:prose-lg :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-lg :where(figure figcaption) {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .sm\\\\:prose-lg :where(code) {
        font-size: 0.8888889em;
      }

      .sm\\\\:prose-lg :where(h2 code) {
        font-size: 0.8666667em;
      }

      .sm\\\\:prose-lg :where(h3 code) {
        font-size: 0.875em;
      }

      .sm\\\\:prose-lg :where(pre) {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .sm\\\\:prose-lg :where(ol) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg :where(ul) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg :where(li) {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .sm\\\\:prose-lg :where(ol > li) {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-lg :where(ol > li)::before {
        left: 0;
      }

      .sm\\\\:prose-lg :where(ul > li) {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-lg :where(ul > li)::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .sm\\\\:prose-lg :where(> ul > li p) {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .sm\\\\:prose-lg :where(> ul > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-lg :where(> ul > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg :where(> ol > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-lg :where(> ol > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .sm\\\\:prose-lg :where(hr) {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .sm\\\\:prose-lg :where(hr + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-lg :where(h2 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-lg :where(h3 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-lg :where(h4 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-lg :where(table) {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .sm\\\\:prose-lg :where(thead th) {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .sm\\\\:prose-lg :where(thead th:first-child) {
        padding-left: 0;
      }

      .sm\\\\:prose-lg :where(thead th:last-child) {
        padding-right: 0;
      }

      .sm\\\\:prose-lg :where(tbody td) {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .sm\\\\:prose-lg :where(tbody td:first-child) {
        padding-left: 0;
      }

      .sm\\\\:prose-lg :where(tbody td:last-child) {
        padding-right: 0;
      }

      .sm\\\\:prose-lg :where(> :first-child) {
        margin-top: 0;
      }

      .sm\\\\:prose-lg :where(> :last-child) {
        margin-bottom: 0;
      }

      .sm\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .sm\\\\:prose-xl :where(p) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl :where([class~=\\"lead\\"]) {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .sm\\\\:prose-xl :where(blockquote) {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .sm\\\\:prose-xl :where(h1) {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .sm\\\\:prose-xl :where(h2) {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .sm\\\\:prose-xl :where(h3) {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .sm\\\\:prose-xl :where(h4) {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .sm\\\\:prose-xl :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-xl :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-xl :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-xl :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-xl :where(figure figcaption) {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .sm\\\\:prose-xl :where(code) {
        font-size: 0.9em;
      }

      .sm\\\\:prose-xl :where(h2 code) {
        font-size: 0.8611111em;
      }

      .sm\\\\:prose-xl :where(h3 code) {
        font-size: 0.9em;
      }

      .sm\\\\:prose-xl :where(pre) {
        font-size: 0.9em;
        line-height: 1.7777778;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.1111111em;
        padding-right: 1.3333333em;
        padding-bottom: 1.1111111em;
        padding-left: 1.3333333em;
      }

      .sm\\\\:prose-xl :where(ol) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl :where(ul) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl :where(li) {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .sm\\\\:prose-xl :where(ol > li) {
        padding-left: 1.8em;
      }

      .sm\\\\:prose-xl :where(ol > li)::before {
        left: 0;
      }

      .sm\\\\:prose-xl :where(ul > li) {
        padding-left: 1.8em;
      }

      .sm\\\\:prose-xl :where(ul > li)::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .sm\\\\:prose-xl :where(> ul > li p) {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .sm\\\\:prose-xl :where(> ul > li > *:first-child) {
        margin-top: 1.2em;
      }

      .sm\\\\:prose-xl :where(> ul > li > *:last-child) {
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl :where(> ol > li > *:first-child) {
        margin-top: 1.2em;
      }

      .sm\\\\:prose-xl :where(> ol > li > *:last-child) {
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .sm\\\\:prose-xl :where(hr) {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .sm\\\\:prose-xl :where(hr + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-xl :where(h2 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-xl :where(h3 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-xl :where(h4 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-xl :where(table) {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .sm\\\\:prose-xl :where(thead th) {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .sm\\\\:prose-xl :where(thead th:first-child) {
        padding-left: 0;
      }

      .sm\\\\:prose-xl :where(thead th:last-child) {
        padding-right: 0;
      }

      .sm\\\\:prose-xl :where(tbody td) {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .sm\\\\:prose-xl :where(tbody td:first-child) {
        padding-left: 0;
      }

      .sm\\\\:prose-xl :where(tbody td:last-child) {
        padding-right: 0;
      }

      .sm\\\\:prose-xl :where(> :first-child) {
        margin-top: 0;
      }

      .sm\\\\:prose-xl :where(> :last-child) {
        margin-bottom: 0;
      }

      .sm\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .sm\\\\:prose-2xl :where(p) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl :where([class~=\\"lead\\"]) {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .sm\\\\:prose-2xl :where(blockquote) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .sm\\\\:prose-2xl :where(h1) {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .sm\\\\:prose-2xl :where(h2) {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .sm\\\\:prose-2xl :where(h3) {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .sm\\\\:prose-2xl :where(h4) {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .sm\\\\:prose-2xl :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-2xl :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-2xl :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-2xl :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-2xl :where(figure figcaption) {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .sm\\\\:prose-2xl :where(code) {
        font-size: 0.8333333em;
      }

      .sm\\\\:prose-2xl :where(h2 code) {
        font-size: 0.875em;
      }

      .sm\\\\:prose-2xl :where(h3 code) {
        font-size: 0.8888889em;
      }

      .sm\\\\:prose-2xl :where(pre) {
        font-size: 0.8333333em;
        line-height: 1.8;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.2em;
        padding-right: 1.6em;
        padding-bottom: 1.2em;
        padding-left: 1.6em;
      }

      .sm\\\\:prose-2xl :where(ol) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl :where(ul) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl :where(li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .sm\\\\:prose-2xl :where(ol > li) {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-2xl :where(ol > li)::before {
        left: 0;
      }

      .sm\\\\:prose-2xl :where(ul > li) {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-2xl :where(ul > li)::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .sm\\\\:prose-2xl :where(> ul > li p) {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .sm\\\\:prose-2xl :where(> ul > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-2xl :where(> ul > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl :where(> ol > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-2xl :where(> ol > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .sm\\\\:prose-2xl :where(hr) {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .sm\\\\:prose-2xl :where(hr + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl :where(h2 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl :where(h3 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl :where(h4 + *) {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl :where(table) {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .sm\\\\:prose-2xl :where(thead th) {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .sm\\\\:prose-2xl :where(thead th:first-child) {
        padding-left: 0;
      }

      .sm\\\\:prose-2xl :where(thead th:last-child) {
        padding-right: 0;
      }

      .sm\\\\:prose-2xl :where(tbody td) {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .sm\\\\:prose-2xl :where(tbody td:first-child) {
        padding-left: 0;
      }

      .sm\\\\:prose-2xl :where(tbody td:last-child) {
        padding-right: 0;
      }

      .sm\\\\:prose-2xl :where(> :first-child) {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl :where(> :last-child) {
        margin-bottom: 0;
      }

      .sm\\\\:prose-red :where(a) {
        color: #dc2626;
      }

      .sm\\\\:prose-red :where(a code) {
        color: #dc2626;
      }

      .sm\\\\:prose-yellow :where(a) {
        color: #d97706;
      }

      .sm\\\\:prose-yellow :where(a code) {
        color: #d97706;
      }

      .sm\\\\:prose-green :where(a) {
        color: #059669;
      }

      .sm\\\\:prose-green :where(a code) {
        color: #059669;
      }

      .sm\\\\:prose-blue :where(a) {
        color: #2563eb;
      }

      .sm\\\\:prose-blue :where(a code) {
        color: #2563eb;
      }

      .sm\\\\:prose-indigo :where(a) {
        color: #4f46e5;
      }

      .sm\\\\:prose-indigo :where(a code) {
        color: #4f46e5;
      }

      .sm\\\\:prose-purple :where(a) {
        color: #7c3aed;
      }

      .sm\\\\:prose-purple :where(a code) {
        color: #7c3aed;
      }

      .sm\\\\:prose-pink :where(a) {
        color: #db2777;
      }

      .sm\\\\:prose-pink :where(a code) {
        color: #db2777;
      }
    }

    @media (min-width: 768px) {
      .md\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .md\\\\:prose :where([class~=\\"lead\\"]) {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose :where(a) {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .md\\\\:prose :where(strong) {
        color: #111827;
        font-weight: 600;
      }

      .md\\\\:prose :where(ol[type=\\"A\\"]) {
        --list-counter-style: upper-alpha;
      }

      .md\\\\:prose :where(ol[type=\\"a\\"]) {
        --list-counter-style: lower-alpha;
      }

      .md\\\\:prose :where(ol[type=\\"A\\" s]) {
        --list-counter-style: upper-alpha;
      }

      .md\\\\:prose :where(ol[type=\\"a\\" s]) {
        --list-counter-style: lower-alpha;
      }

      .md\\\\:prose :where(ol[type=\\"I\\"]) {
        --list-counter-style: upper-roman;
      }

      .md\\\\:prose :where(ol[type=\\"i\\"]) {
        --list-counter-style: lower-roman;
      }

      .md\\\\:prose :where(ol[type=\\"I\\" s]) {
        --list-counter-style: upper-roman;
      }

      .md\\\\:prose :where(ol[type=\\"i\\" s]) {
        --list-counter-style: lower-roman;
      }

      .md\\\\:prose :where(ol[type=\\"1\\"]) {
        --list-counter-style: decimal;
      }

      .md\\\\:prose :where(ol > li) {
        position: relative;
        padding-left: 1.75em;
      }

      .md\\\\:prose :where(ol > li)::before {
        content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .md\\\\:prose :where(ul > li) {
        position: relative;
        padding-left: 1.75em;
      }

      .md\\\\:prose :where(ul > li)::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .md\\\\:prose :where(hr) {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .md\\\\:prose :where(blockquote) {
        font-weight: 500;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: #e5e7eb;
        quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .md\\\\:prose :where(blockquote p:first-of-type)::before {
        content: open-quote;
      }

      .md\\\\:prose :where(blockquote p:last-of-type)::after {
        content: close-quote;
      }

      .md\\\\:prose :where(h1) {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .md\\\\:prose :where(h1 strong) {
        font-weight: 900;
      }

      .md\\\\:prose :where(h2) {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .md\\\\:prose :where(h2 strong) {
        font-weight: 800;
      }

      .md\\\\:prose :where(h3) {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .md\\\\:prose :where(h3 strong) {
        font-weight: 700;
      }

      .md\\\\:prose :where(h4) {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .md\\\\:prose :where(h4 strong) {
        font-weight: 700;
      }

      .md\\\\:prose :where(figure figcaption) {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .md\\\\:prose :where(code) {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .md\\\\:prose :where(code)::before {
        content: \\"\`\\";
      }

      .md\\\\:prose :where(code)::after {
        content: \\"\`\\";
      }

      .md\\\\:prose :where(a code) {
        color: #111827;
      }

      .md\\\\:prose :where(pre) {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .md\\\\:prose :where(pre code) {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .md\\\\:prose :where(pre code)::before {
        content: none;
      }

      .md\\\\:prose :where(pre code)::after {
        content: none;
      }

      .md\\\\:prose :where(table) {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .md\\\\:prose :where(thead) {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .md\\\\:prose :where(thead th) {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .md\\\\:prose :where(tbody tr) {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .md\\\\:prose :where(tbody tr:last-child) {
        border-bottom-width: 0;
      }

      .md\\\\:prose :where(tbody td) {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .md\\\\:prose {
        font-size: 1rem;
        line-height: 1.75;
      }

      .md\\\\:prose :where(p) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .md\\\\:prose :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose :where(h2 code) {
        font-size: 0.875em;
      }

      .md\\\\:prose :where(h3 code) {
        font-size: 0.9em;
      }

      .md\\\\:prose :where(ol) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .md\\\\:prose :where(ul) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .md\\\\:prose :where(li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .md\\\\:prose :where(> ul > li p) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .md\\\\:prose :where(> ul > li > *:first-child) {
        margin-top: 1.25em;
      }

      .md\\\\:prose :where(> ul > li > *:last-child) {
        margin-bottom: 1.25em;
      }

      .md\\\\:prose :where(> ol > li > *:first-child) {
        margin-top: 1.25em;
      }

      .md\\\\:prose :where(> ol > li > *:last-child) {
        margin-bottom: 1.25em;
      }

      .md\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .md\\\\:prose :where(hr + *) {
        margin-top: 0;
      }

      .md\\\\:prose :where(h2 + *) {
        margin-top: 0;
      }

      .md\\\\:prose :where(h3 + *) {
        margin-top: 0;
      }

      .md\\\\:prose :where(h4 + *) {
        margin-top: 0;
      }

      .md\\\\:prose :where(thead th:first-child) {
        padding-left: 0;
      }

      .md\\\\:prose :where(thead th:last-child) {
        padding-right: 0;
      }

      .md\\\\:prose :where(tbody td:first-child) {
        padding-left: 0;
      }

      .md\\\\:prose :where(tbody td:last-child) {
        padding-right: 0;
      }

      .md\\\\:prose :where(> :first-child) {
        margin-top: 0;
      }

      .md\\\\:prose :where(> :last-child) {
        margin-bottom: 0;
      }

      .md\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .md\\\\:prose-sm :where(p) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm :where([class~=\\"lead\\"]) {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .md\\\\:prose-sm :where(blockquote) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .md\\\\:prose-sm :where(h1) {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .md\\\\:prose-sm :where(h2) {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .md\\\\:prose-sm :where(h3) {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .md\\\\:prose-sm :where(h4) {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .md\\\\:prose-sm :where(img) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .md\\\\:prose-sm :where(video) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .md\\\\:prose-sm :where(figure) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .md\\\\:prose-sm :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-sm :where(figure figcaption) {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .md\\\\:prose-sm :where(code) {
        font-size: 0.8571429em;
      }

      .md\\\\:prose-sm :where(h2 code) {
        font-size: 0.9em;
      }

      .md\\\\:prose-sm :where(h3 code) {
        font-size: 0.8888889em;
      }

      .md\\\\:prose-sm :where(pre) {
        font-size: 0.8571429em;
        line-height: 1.6666667;
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        border-radius: 0.25rem;
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-sm :where(ol) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm :where(ul) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm :where(li) {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .md\\\\:prose-sm :where(ol > li) {
        padding-left: 1.5714286em;
      }

      .md\\\\:prose-sm :where(ol > li)::before {
        left: 0;
      }

      .md\\\\:prose-sm :where(ul > li) {
        padding-left: 1.5714286em;
      }

      .md\\\\:prose-sm :where(ul > li)::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .md\\\\:prose-sm :where(> ul > li p) {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .md\\\\:prose-sm :where(> ul > li > *:first-child) {
        margin-top: 1.1428571em;
      }

      .md\\\\:prose-sm :where(> ul > li > *:last-child) {
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm :where(> ol > li > *:first-child) {
        margin-top: 1.1428571em;
      }

      .md\\\\:prose-sm :where(> ol > li > *:last-child) {
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .md\\\\:prose-sm :where(hr) {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .md\\\\:prose-sm :where(hr + *) {
        margin-top: 0;
      }

      .md\\\\:prose-sm :where(h2 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-sm :where(h3 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-sm :where(h4 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-sm :where(table) {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .md\\\\:prose-sm :where(thead th) {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-sm :where(thead th:first-child) {
        padding-left: 0;
      }

      .md\\\\:prose-sm :where(thead th:last-child) {
        padding-right: 0;
      }

      .md\\\\:prose-sm :where(tbody td) {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-sm :where(tbody td:first-child) {
        padding-left: 0;
      }

      .md\\\\:prose-sm :where(tbody td:last-child) {
        padding-right: 0;
      }

      .md\\\\:prose-sm :where(> :first-child) {
        margin-top: 0;
      }

      .md\\\\:prose-sm :where(> :last-child) {
        margin-bottom: 0;
      }

      .md\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .md\\\\:prose-lg :where(p) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg :where([class~=\\"lead\\"]) {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .md\\\\:prose-lg :where(blockquote) {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-lg :where(h1) {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .md\\\\:prose-lg :where(h2) {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .md\\\\:prose-lg :where(h3) {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .md\\\\:prose-lg :where(h4) {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .md\\\\:prose-lg :where(img) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .md\\\\:prose-lg :where(video) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .md\\\\:prose-lg :where(figure) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .md\\\\:prose-lg :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-lg :where(figure figcaption) {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .md\\\\:prose-lg :where(code) {
        font-size: 0.8888889em;
      }

      .md\\\\:prose-lg :where(h2 code) {
        font-size: 0.8666667em;
      }

      .md\\\\:prose-lg :where(h3 code) {
        font-size: 0.875em;
      }

      .md\\\\:prose-lg :where(pre) {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .md\\\\:prose-lg :where(ol) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg :where(ul) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg :where(li) {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .md\\\\:prose-lg :where(ol > li) {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-lg :where(ol > li)::before {
        left: 0;
      }

      .md\\\\:prose-lg :where(ul > li) {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-lg :where(ul > li)::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .md\\\\:prose-lg :where(> ul > li p) {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .md\\\\:prose-lg :where(> ul > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-lg :where(> ul > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg :where(> ol > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-lg :where(> ol > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .md\\\\:prose-lg :where(hr) {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .md\\\\:prose-lg :where(hr + *) {
        margin-top: 0;
      }

      .md\\\\:prose-lg :where(h2 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-lg :where(h3 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-lg :where(h4 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-lg :where(table) {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .md\\\\:prose-lg :where(thead th) {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .md\\\\:prose-lg :where(thead th:first-child) {
        padding-left: 0;
      }

      .md\\\\:prose-lg :where(thead th:last-child) {
        padding-right: 0;
      }

      .md\\\\:prose-lg :where(tbody td) {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .md\\\\:prose-lg :where(tbody td:first-child) {
        padding-left: 0;
      }

      .md\\\\:prose-lg :where(tbody td:last-child) {
        padding-right: 0;
      }

      .md\\\\:prose-lg :where(> :first-child) {
        margin-top: 0;
      }

      .md\\\\:prose-lg :where(> :last-child) {
        margin-bottom: 0;
      }

      .md\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .md\\\\:prose-xl :where(p) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl :where([class~=\\"lead\\"]) {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .md\\\\:prose-xl :where(blockquote) {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .md\\\\:prose-xl :where(h1) {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .md\\\\:prose-xl :where(h2) {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .md\\\\:prose-xl :where(h3) {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .md\\\\:prose-xl :where(h4) {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .md\\\\:prose-xl :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-xl :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-xl :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-xl :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-xl :where(figure figcaption) {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .md\\\\:prose-xl :where(code) {
        font-size: 0.9em;
      }

      .md\\\\:prose-xl :where(h2 code) {
        font-size: 0.8611111em;
      }

      .md\\\\:prose-xl :where(h3 code) {
        font-size: 0.9em;
      }

      .md\\\\:prose-xl :where(pre) {
        font-size: 0.9em;
        line-height: 1.7777778;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.1111111em;
        padding-right: 1.3333333em;
        padding-bottom: 1.1111111em;
        padding-left: 1.3333333em;
      }

      .md\\\\:prose-xl :where(ol) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl :where(ul) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl :where(li) {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .md\\\\:prose-xl :where(ol > li) {
        padding-left: 1.8em;
      }

      .md\\\\:prose-xl :where(ol > li)::before {
        left: 0;
      }

      .md\\\\:prose-xl :where(ul > li) {
        padding-left: 1.8em;
      }

      .md\\\\:prose-xl :where(ul > li)::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .md\\\\:prose-xl :where(> ul > li p) {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .md\\\\:prose-xl :where(> ul > li > *:first-child) {
        margin-top: 1.2em;
      }

      .md\\\\:prose-xl :where(> ul > li > *:last-child) {
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl :where(> ol > li > *:first-child) {
        margin-top: 1.2em;
      }

      .md\\\\:prose-xl :where(> ol > li > *:last-child) {
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .md\\\\:prose-xl :where(hr) {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .md\\\\:prose-xl :where(hr + *) {
        margin-top: 0;
      }

      .md\\\\:prose-xl :where(h2 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-xl :where(h3 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-xl :where(h4 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-xl :where(table) {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .md\\\\:prose-xl :where(thead th) {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .md\\\\:prose-xl :where(thead th:first-child) {
        padding-left: 0;
      }

      .md\\\\:prose-xl :where(thead th:last-child) {
        padding-right: 0;
      }

      .md\\\\:prose-xl :where(tbody td) {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .md\\\\:prose-xl :where(tbody td:first-child) {
        padding-left: 0;
      }

      .md\\\\:prose-xl :where(tbody td:last-child) {
        padding-right: 0;
      }

      .md\\\\:prose-xl :where(> :first-child) {
        margin-top: 0;
      }

      .md\\\\:prose-xl :where(> :last-child) {
        margin-bottom: 0;
      }

      .md\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .md\\\\:prose-2xl :where(p) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl :where([class~=\\"lead\\"]) {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .md\\\\:prose-2xl :where(blockquote) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .md\\\\:prose-2xl :where(h1) {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .md\\\\:prose-2xl :where(h2) {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .md\\\\:prose-2xl :where(h3) {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .md\\\\:prose-2xl :where(h4) {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .md\\\\:prose-2xl :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-2xl :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-2xl :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-2xl :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-2xl :where(figure figcaption) {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .md\\\\:prose-2xl :where(code) {
        font-size: 0.8333333em;
      }

      .md\\\\:prose-2xl :where(h2 code) {
        font-size: 0.875em;
      }

      .md\\\\:prose-2xl :where(h3 code) {
        font-size: 0.8888889em;
      }

      .md\\\\:prose-2xl :where(pre) {
        font-size: 0.8333333em;
        line-height: 1.8;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.2em;
        padding-right: 1.6em;
        padding-bottom: 1.2em;
        padding-left: 1.6em;
      }

      .md\\\\:prose-2xl :where(ol) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl :where(ul) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl :where(li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .md\\\\:prose-2xl :where(ol > li) {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-2xl :where(ol > li)::before {
        left: 0;
      }

      .md\\\\:prose-2xl :where(ul > li) {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-2xl :where(ul > li)::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .md\\\\:prose-2xl :where(> ul > li p) {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .md\\\\:prose-2xl :where(> ul > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-2xl :where(> ul > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl :where(> ol > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-2xl :where(> ol > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .md\\\\:prose-2xl :where(hr) {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .md\\\\:prose-2xl :where(hr + *) {
        margin-top: 0;
      }

      .md\\\\:prose-2xl :where(h2 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-2xl :where(h3 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-2xl :where(h4 + *) {
        margin-top: 0;
      }

      .md\\\\:prose-2xl :where(table) {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .md\\\\:prose-2xl :where(thead th) {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .md\\\\:prose-2xl :where(thead th:first-child) {
        padding-left: 0;
      }

      .md\\\\:prose-2xl :where(thead th:last-child) {
        padding-right: 0;
      }

      .md\\\\:prose-2xl :where(tbody td) {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .md\\\\:prose-2xl :where(tbody td:first-child) {
        padding-left: 0;
      }

      .md\\\\:prose-2xl :where(tbody td:last-child) {
        padding-right: 0;
      }

      .md\\\\:prose-2xl :where(> :first-child) {
        margin-top: 0;
      }

      .md\\\\:prose-2xl :where(> :last-child) {
        margin-bottom: 0;
      }

      .md\\\\:prose-red :where(a) {
        color: #dc2626;
      }

      .md\\\\:prose-red :where(a code) {
        color: #dc2626;
      }

      .md\\\\:prose-yellow :where(a) {
        color: #d97706;
      }

      .md\\\\:prose-yellow :where(a code) {
        color: #d97706;
      }

      .md\\\\:prose-green :where(a) {
        color: #059669;
      }

      .md\\\\:prose-green :where(a code) {
        color: #059669;
      }

      .md\\\\:prose-blue :where(a) {
        color: #2563eb;
      }

      .md\\\\:prose-blue :where(a code) {
        color: #2563eb;
      }

      .md\\\\:prose-indigo :where(a) {
        color: #4f46e5;
      }

      .md\\\\:prose-indigo :where(a code) {
        color: #4f46e5;
      }

      .md\\\\:prose-purple :where(a) {
        color: #7c3aed;
      }

      .md\\\\:prose-purple :where(a code) {
        color: #7c3aed;
      }

      .md\\\\:prose-pink :where(a) {
        color: #db2777;
      }

      .md\\\\:prose-pink :where(a code) {
        color: #db2777;
      }
    }

    @media (min-width: 1024px) {
      .lg\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .lg\\\\:prose :where([class~=\\"lead\\"]) {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose :where(a) {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .lg\\\\:prose :where(strong) {
        color: #111827;
        font-weight: 600;
      }

      .lg\\\\:prose :where(ol[type=\\"A\\"]) {
        --list-counter-style: upper-alpha;
      }

      .lg\\\\:prose :where(ol[type=\\"a\\"]) {
        --list-counter-style: lower-alpha;
      }

      .lg\\\\:prose :where(ol[type=\\"A\\" s]) {
        --list-counter-style: upper-alpha;
      }

      .lg\\\\:prose :where(ol[type=\\"a\\" s]) {
        --list-counter-style: lower-alpha;
      }

      .lg\\\\:prose :where(ol[type=\\"I\\"]) {
        --list-counter-style: upper-roman;
      }

      .lg\\\\:prose :where(ol[type=\\"i\\"]) {
        --list-counter-style: lower-roman;
      }

      .lg\\\\:prose :where(ol[type=\\"I\\" s]) {
        --list-counter-style: upper-roman;
      }

      .lg\\\\:prose :where(ol[type=\\"i\\" s]) {
        --list-counter-style: lower-roman;
      }

      .lg\\\\:prose :where(ol[type=\\"1\\"]) {
        --list-counter-style: decimal;
      }

      .lg\\\\:prose :where(ol > li) {
        position: relative;
        padding-left: 1.75em;
      }

      .lg\\\\:prose :where(ol > li)::before {
        content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .lg\\\\:prose :where(ul > li) {
        position: relative;
        padding-left: 1.75em;
      }

      .lg\\\\:prose :where(ul > li)::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .lg\\\\:prose :where(hr) {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .lg\\\\:prose :where(blockquote) {
        font-weight: 500;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: #e5e7eb;
        quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .lg\\\\:prose :where(blockquote p:first-of-type)::before {
        content: open-quote;
      }

      .lg\\\\:prose :where(blockquote p:last-of-type)::after {
        content: close-quote;
      }

      .lg\\\\:prose :where(h1) {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .lg\\\\:prose :where(h1 strong) {
        font-weight: 900;
      }

      .lg\\\\:prose :where(h2) {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .lg\\\\:prose :where(h2 strong) {
        font-weight: 800;
      }

      .lg\\\\:prose :where(h3) {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .lg\\\\:prose :where(h3 strong) {
        font-weight: 700;
      }

      .lg\\\\:prose :where(h4) {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .lg\\\\:prose :where(h4 strong) {
        font-weight: 700;
      }

      .lg\\\\:prose :where(figure figcaption) {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .lg\\\\:prose :where(code) {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .lg\\\\:prose :where(code)::before {
        content: \\"\`\\";
      }

      .lg\\\\:prose :where(code)::after {
        content: \\"\`\\";
      }

      .lg\\\\:prose :where(a code) {
        color: #111827;
      }

      .lg\\\\:prose :where(pre) {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .lg\\\\:prose :where(pre code) {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .lg\\\\:prose :where(pre code)::before {
        content: none;
      }

      .lg\\\\:prose :where(pre code)::after {
        content: none;
      }

      .lg\\\\:prose :where(table) {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .lg\\\\:prose :where(thead) {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .lg\\\\:prose :where(thead th) {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .lg\\\\:prose :where(tbody tr) {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .lg\\\\:prose :where(tbody tr:last-child) {
        border-bottom-width: 0;
      }

      .lg\\\\:prose :where(tbody td) {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .lg\\\\:prose {
        font-size: 1rem;
        line-height: 1.75;
      }

      .lg\\\\:prose :where(p) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose :where(h2 code) {
        font-size: 0.875em;
      }

      .lg\\\\:prose :where(h3 code) {
        font-size: 0.9em;
      }

      .lg\\\\:prose :where(ol) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose :where(ul) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose :where(li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .lg\\\\:prose :where(> ul > li p) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .lg\\\\:prose :where(> ul > li > *:first-child) {
        margin-top: 1.25em;
      }

      .lg\\\\:prose :where(> ul > li > *:last-child) {
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose :where(> ol > li > *:first-child) {
        margin-top: 1.25em;
      }

      .lg\\\\:prose :where(> ol > li > *:last-child) {
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .lg\\\\:prose :where(hr + *) {
        margin-top: 0;
      }

      .lg\\\\:prose :where(h2 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose :where(h3 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose :where(h4 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose :where(thead th:first-child) {
        padding-left: 0;
      }

      .lg\\\\:prose :where(thead th:last-child) {
        padding-right: 0;
      }

      .lg\\\\:prose :where(tbody td:first-child) {
        padding-left: 0;
      }

      .lg\\\\:prose :where(tbody td:last-child) {
        padding-right: 0;
      }

      .lg\\\\:prose :where(> :first-child) {
        margin-top: 0;
      }

      .lg\\\\:prose :where(> :last-child) {
        margin-bottom: 0;
      }

      .lg\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .lg\\\\:prose-sm :where(p) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm :where([class~=\\"lead\\"]) {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .lg\\\\:prose-sm :where(blockquote) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .lg\\\\:prose-sm :where(h1) {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .lg\\\\:prose-sm :where(h2) {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .lg\\\\:prose-sm :where(h3) {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .lg\\\\:prose-sm :where(h4) {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .lg\\\\:prose-sm :where(img) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .lg\\\\:prose-sm :where(video) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .lg\\\\:prose-sm :where(figure) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .lg\\\\:prose-sm :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-sm :where(figure figcaption) {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .lg\\\\:prose-sm :where(code) {
        font-size: 0.8571429em;
      }

      .lg\\\\:prose-sm :where(h2 code) {
        font-size: 0.9em;
      }

      .lg\\\\:prose-sm :where(h3 code) {
        font-size: 0.8888889em;
      }

      .lg\\\\:prose-sm :where(pre) {
        font-size: 0.8571429em;
        line-height: 1.6666667;
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        border-radius: 0.25rem;
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-sm :where(ol) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm :where(ul) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm :where(li) {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .lg\\\\:prose-sm :where(ol > li) {
        padding-left: 1.5714286em;
      }

      .lg\\\\:prose-sm :where(ol > li)::before {
        left: 0;
      }

      .lg\\\\:prose-sm :where(ul > li) {
        padding-left: 1.5714286em;
      }

      .lg\\\\:prose-sm :where(ul > li)::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .lg\\\\:prose-sm :where(> ul > li p) {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .lg\\\\:prose-sm :where(> ul > li > *:first-child) {
        margin-top: 1.1428571em;
      }

      .lg\\\\:prose-sm :where(> ul > li > *:last-child) {
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm :where(> ol > li > *:first-child) {
        margin-top: 1.1428571em;
      }

      .lg\\\\:prose-sm :where(> ol > li > *:last-child) {
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .lg\\\\:prose-sm :where(hr) {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .lg\\\\:prose-sm :where(hr + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-sm :where(h2 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-sm :where(h3 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-sm :where(h4 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-sm :where(table) {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .lg\\\\:prose-sm :where(thead th) {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-sm :where(thead th:first-child) {
        padding-left: 0;
      }

      .lg\\\\:prose-sm :where(thead th:last-child) {
        padding-right: 0;
      }

      .lg\\\\:prose-sm :where(tbody td) {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-sm :where(tbody td:first-child) {
        padding-left: 0;
      }

      .lg\\\\:prose-sm :where(tbody td:last-child) {
        padding-right: 0;
      }

      .lg\\\\:prose-sm :where(> :first-child) {
        margin-top: 0;
      }

      .lg\\\\:prose-sm :where(> :last-child) {
        margin-bottom: 0;
      }

      .lg\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .lg\\\\:prose-lg :where(p) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg :where([class~=\\"lead\\"]) {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .lg\\\\:prose-lg :where(blockquote) {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-lg :where(h1) {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .lg\\\\:prose-lg :where(h2) {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .lg\\\\:prose-lg :where(h3) {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .lg\\\\:prose-lg :where(h4) {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .lg\\\\:prose-lg :where(img) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .lg\\\\:prose-lg :where(video) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .lg\\\\:prose-lg :where(figure) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .lg\\\\:prose-lg :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-lg :where(figure figcaption) {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .lg\\\\:prose-lg :where(code) {
        font-size: 0.8888889em;
      }

      .lg\\\\:prose-lg :where(h2 code) {
        font-size: 0.8666667em;
      }

      .lg\\\\:prose-lg :where(h3 code) {
        font-size: 0.875em;
      }

      .lg\\\\:prose-lg :where(pre) {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .lg\\\\:prose-lg :where(ol) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg :where(ul) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg :where(li) {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .lg\\\\:prose-lg :where(ol > li) {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-lg :where(ol > li)::before {
        left: 0;
      }

      .lg\\\\:prose-lg :where(ul > li) {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-lg :where(ul > li)::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .lg\\\\:prose-lg :where(> ul > li p) {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .lg\\\\:prose-lg :where(> ul > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-lg :where(> ul > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg :where(> ol > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-lg :where(> ol > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .lg\\\\:prose-lg :where(hr) {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .lg\\\\:prose-lg :where(hr + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-lg :where(h2 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-lg :where(h3 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-lg :where(h4 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-lg :where(table) {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .lg\\\\:prose-lg :where(thead th) {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .lg\\\\:prose-lg :where(thead th:first-child) {
        padding-left: 0;
      }

      .lg\\\\:prose-lg :where(thead th:last-child) {
        padding-right: 0;
      }

      .lg\\\\:prose-lg :where(tbody td) {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .lg\\\\:prose-lg :where(tbody td:first-child) {
        padding-left: 0;
      }

      .lg\\\\:prose-lg :where(tbody td:last-child) {
        padding-right: 0;
      }

      .lg\\\\:prose-lg :where(> :first-child) {
        margin-top: 0;
      }

      .lg\\\\:prose-lg :where(> :last-child) {
        margin-bottom: 0;
      }

      .lg\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .lg\\\\:prose-xl :where(p) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl :where([class~=\\"lead\\"]) {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .lg\\\\:prose-xl :where(blockquote) {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .lg\\\\:prose-xl :where(h1) {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .lg\\\\:prose-xl :where(h2) {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .lg\\\\:prose-xl :where(h3) {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .lg\\\\:prose-xl :where(h4) {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .lg\\\\:prose-xl :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-xl :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-xl :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-xl :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-xl :where(figure figcaption) {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .lg\\\\:prose-xl :where(code) {
        font-size: 0.9em;
      }

      .lg\\\\:prose-xl :where(h2 code) {
        font-size: 0.8611111em;
      }

      .lg\\\\:prose-xl :where(h3 code) {
        font-size: 0.9em;
      }

      .lg\\\\:prose-xl :where(pre) {
        font-size: 0.9em;
        line-height: 1.7777778;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.1111111em;
        padding-right: 1.3333333em;
        padding-bottom: 1.1111111em;
        padding-left: 1.3333333em;
      }

      .lg\\\\:prose-xl :where(ol) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl :where(ul) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl :where(li) {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .lg\\\\:prose-xl :where(ol > li) {
        padding-left: 1.8em;
      }

      .lg\\\\:prose-xl :where(ol > li)::before {
        left: 0;
      }

      .lg\\\\:prose-xl :where(ul > li) {
        padding-left: 1.8em;
      }

      .lg\\\\:prose-xl :where(ul > li)::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .lg\\\\:prose-xl :where(> ul > li p) {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .lg\\\\:prose-xl :where(> ul > li > *:first-child) {
        margin-top: 1.2em;
      }

      .lg\\\\:prose-xl :where(> ul > li > *:last-child) {
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl :where(> ol > li > *:first-child) {
        margin-top: 1.2em;
      }

      .lg\\\\:prose-xl :where(> ol > li > *:last-child) {
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .lg\\\\:prose-xl :where(hr) {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .lg\\\\:prose-xl :where(hr + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-xl :where(h2 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-xl :where(h3 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-xl :where(h4 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-xl :where(table) {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .lg\\\\:prose-xl :where(thead th) {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .lg\\\\:prose-xl :where(thead th:first-child) {
        padding-left: 0;
      }

      .lg\\\\:prose-xl :where(thead th:last-child) {
        padding-right: 0;
      }

      .lg\\\\:prose-xl :where(tbody td) {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .lg\\\\:prose-xl :where(tbody td:first-child) {
        padding-left: 0;
      }

      .lg\\\\:prose-xl :where(tbody td:last-child) {
        padding-right: 0;
      }

      .lg\\\\:prose-xl :where(> :first-child) {
        margin-top: 0;
      }

      .lg\\\\:prose-xl :where(> :last-child) {
        margin-bottom: 0;
      }

      .lg\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .lg\\\\:prose-2xl :where(p) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl :where([class~=\\"lead\\"]) {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .lg\\\\:prose-2xl :where(blockquote) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .lg\\\\:prose-2xl :where(h1) {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .lg\\\\:prose-2xl :where(h2) {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .lg\\\\:prose-2xl :where(h3) {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .lg\\\\:prose-2xl :where(h4) {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .lg\\\\:prose-2xl :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-2xl :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-2xl :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-2xl :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-2xl :where(figure figcaption) {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .lg\\\\:prose-2xl :where(code) {
        font-size: 0.8333333em;
      }

      .lg\\\\:prose-2xl :where(h2 code) {
        font-size: 0.875em;
      }

      .lg\\\\:prose-2xl :where(h3 code) {
        font-size: 0.8888889em;
      }

      .lg\\\\:prose-2xl :where(pre) {
        font-size: 0.8333333em;
        line-height: 1.8;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.2em;
        padding-right: 1.6em;
        padding-bottom: 1.2em;
        padding-left: 1.6em;
      }

      .lg\\\\:prose-2xl :where(ol) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl :where(ul) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl :where(li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .lg\\\\:prose-2xl :where(ol > li) {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-2xl :where(ol > li)::before {
        left: 0;
      }

      .lg\\\\:prose-2xl :where(ul > li) {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-2xl :where(ul > li)::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .lg\\\\:prose-2xl :where(> ul > li p) {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .lg\\\\:prose-2xl :where(> ul > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-2xl :where(> ul > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl :where(> ol > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-2xl :where(> ol > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .lg\\\\:prose-2xl :where(hr) {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .lg\\\\:prose-2xl :where(hr + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl :where(h2 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl :where(h3 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl :where(h4 + *) {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl :where(table) {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .lg\\\\:prose-2xl :where(thead th) {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .lg\\\\:prose-2xl :where(thead th:first-child) {
        padding-left: 0;
      }

      .lg\\\\:prose-2xl :where(thead th:last-child) {
        padding-right: 0;
      }

      .lg\\\\:prose-2xl :where(tbody td) {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .lg\\\\:prose-2xl :where(tbody td:first-child) {
        padding-left: 0;
      }

      .lg\\\\:prose-2xl :where(tbody td:last-child) {
        padding-right: 0;
      }

      .lg\\\\:prose-2xl :where(> :first-child) {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl :where(> :last-child) {
        margin-bottom: 0;
      }

      .lg\\\\:prose-red :where(a) {
        color: #dc2626;
      }

      .lg\\\\:prose-red :where(a code) {
        color: #dc2626;
      }

      .lg\\\\:prose-yellow :where(a) {
        color: #d97706;
      }

      .lg\\\\:prose-yellow :where(a code) {
        color: #d97706;
      }

      .lg\\\\:prose-green :where(a) {
        color: #059669;
      }

      .lg\\\\:prose-green :where(a code) {
        color: #059669;
      }

      .lg\\\\:prose-blue :where(a) {
        color: #2563eb;
      }

      .lg\\\\:prose-blue :where(a code) {
        color: #2563eb;
      }

      .lg\\\\:prose-indigo :where(a) {
        color: #4f46e5;
      }

      .lg\\\\:prose-indigo :where(a code) {
        color: #4f46e5;
      }

      .lg\\\\:prose-purple :where(a) {
        color: #7c3aed;
      }

      .lg\\\\:prose-purple :where(a code) {
        color: #7c3aed;
      }

      .lg\\\\:prose-pink :where(a) {
        color: #db2777;
      }

      .lg\\\\:prose-pink :where(a code) {
        color: #db2777;
      }
    }

    @media (min-width: 1280px) {
      .xl\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .xl\\\\:prose :where([class~=\\"lead\\"]) {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose :where(a) {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .xl\\\\:prose :where(strong) {
        color: #111827;
        font-weight: 600;
      }

      .xl\\\\:prose :where(ol[type=\\"A\\"]) {
        --list-counter-style: upper-alpha;
      }

      .xl\\\\:prose :where(ol[type=\\"a\\"]) {
        --list-counter-style: lower-alpha;
      }

      .xl\\\\:prose :where(ol[type=\\"A\\" s]) {
        --list-counter-style: upper-alpha;
      }

      .xl\\\\:prose :where(ol[type=\\"a\\" s]) {
        --list-counter-style: lower-alpha;
      }

      .xl\\\\:prose :where(ol[type=\\"I\\"]) {
        --list-counter-style: upper-roman;
      }

      .xl\\\\:prose :where(ol[type=\\"i\\"]) {
        --list-counter-style: lower-roman;
      }

      .xl\\\\:prose :where(ol[type=\\"I\\" s]) {
        --list-counter-style: upper-roman;
      }

      .xl\\\\:prose :where(ol[type=\\"i\\" s]) {
        --list-counter-style: lower-roman;
      }

      .xl\\\\:prose :where(ol[type=\\"1\\"]) {
        --list-counter-style: decimal;
      }

      .xl\\\\:prose :where(ol > li) {
        position: relative;
        padding-left: 1.75em;
      }

      .xl\\\\:prose :where(ol > li)::before {
        content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .xl\\\\:prose :where(ul > li) {
        position: relative;
        padding-left: 1.75em;
      }

      .xl\\\\:prose :where(ul > li)::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .xl\\\\:prose :where(hr) {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .xl\\\\:prose :where(blockquote) {
        font-weight: 500;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: #e5e7eb;
        quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .xl\\\\:prose :where(blockquote p:first-of-type)::before {
        content: open-quote;
      }

      .xl\\\\:prose :where(blockquote p:last-of-type)::after {
        content: close-quote;
      }

      .xl\\\\:prose :where(h1) {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .xl\\\\:prose :where(h1 strong) {
        font-weight: 900;
      }

      .xl\\\\:prose :where(h2) {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .xl\\\\:prose :where(h2 strong) {
        font-weight: 800;
      }

      .xl\\\\:prose :where(h3) {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .xl\\\\:prose :where(h3 strong) {
        font-weight: 700;
      }

      .xl\\\\:prose :where(h4) {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .xl\\\\:prose :where(h4 strong) {
        font-weight: 700;
      }

      .xl\\\\:prose :where(figure figcaption) {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .xl\\\\:prose :where(code) {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .xl\\\\:prose :where(code)::before {
        content: \\"\`\\";
      }

      .xl\\\\:prose :where(code)::after {
        content: \\"\`\\";
      }

      .xl\\\\:prose :where(a code) {
        color: #111827;
      }

      .xl\\\\:prose :where(pre) {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .xl\\\\:prose :where(pre code) {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .xl\\\\:prose :where(pre code)::before {
        content: none;
      }

      .xl\\\\:prose :where(pre code)::after {
        content: none;
      }

      .xl\\\\:prose :where(table) {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .xl\\\\:prose :where(thead) {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .xl\\\\:prose :where(thead th) {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .xl\\\\:prose :where(tbody tr) {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .xl\\\\:prose :where(tbody tr:last-child) {
        border-bottom-width: 0;
      }

      .xl\\\\:prose :where(tbody td) {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .xl\\\\:prose {
        font-size: 1rem;
        line-height: 1.75;
      }

      .xl\\\\:prose :where(p) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose :where(h2 code) {
        font-size: 0.875em;
      }

      .xl\\\\:prose :where(h3 code) {
        font-size: 0.9em;
      }

      .xl\\\\:prose :where(ol) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose :where(ul) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose :where(li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .xl\\\\:prose :where(> ul > li p) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .xl\\\\:prose :where(> ul > li > *:first-child) {
        margin-top: 1.25em;
      }

      .xl\\\\:prose :where(> ul > li > *:last-child) {
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose :where(> ol > li > *:first-child) {
        margin-top: 1.25em;
      }

      .xl\\\\:prose :where(> ol > li > *:last-child) {
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .xl\\\\:prose :where(hr + *) {
        margin-top: 0;
      }

      .xl\\\\:prose :where(h2 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose :where(h3 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose :where(h4 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose :where(thead th:first-child) {
        padding-left: 0;
      }

      .xl\\\\:prose :where(thead th:last-child) {
        padding-right: 0;
      }

      .xl\\\\:prose :where(tbody td:first-child) {
        padding-left: 0;
      }

      .xl\\\\:prose :where(tbody td:last-child) {
        padding-right: 0;
      }

      .xl\\\\:prose :where(> :first-child) {
        margin-top: 0;
      }

      .xl\\\\:prose :where(> :last-child) {
        margin-bottom: 0;
      }

      .xl\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .xl\\\\:prose-sm :where(p) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm :where([class~=\\"lead\\"]) {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .xl\\\\:prose-sm :where(blockquote) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .xl\\\\:prose-sm :where(h1) {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .xl\\\\:prose-sm :where(h2) {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .xl\\\\:prose-sm :where(h3) {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .xl\\\\:prose-sm :where(h4) {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .xl\\\\:prose-sm :where(img) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .xl\\\\:prose-sm :where(video) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .xl\\\\:prose-sm :where(figure) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .xl\\\\:prose-sm :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-sm :where(figure figcaption) {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .xl\\\\:prose-sm :where(code) {
        font-size: 0.8571429em;
      }

      .xl\\\\:prose-sm :where(h2 code) {
        font-size: 0.9em;
      }

      .xl\\\\:prose-sm :where(h3 code) {
        font-size: 0.8888889em;
      }

      .xl\\\\:prose-sm :where(pre) {
        font-size: 0.8571429em;
        line-height: 1.6666667;
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        border-radius: 0.25rem;
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-sm :where(ol) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm :where(ul) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm :where(li) {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .xl\\\\:prose-sm :where(ol > li) {
        padding-left: 1.5714286em;
      }

      .xl\\\\:prose-sm :where(ol > li)::before {
        left: 0;
      }

      .xl\\\\:prose-sm :where(ul > li) {
        padding-left: 1.5714286em;
      }

      .xl\\\\:prose-sm :where(ul > li)::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .xl\\\\:prose-sm :where(> ul > li p) {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .xl\\\\:prose-sm :where(> ul > li > *:first-child) {
        margin-top: 1.1428571em;
      }

      .xl\\\\:prose-sm :where(> ul > li > *:last-child) {
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm :where(> ol > li > *:first-child) {
        margin-top: 1.1428571em;
      }

      .xl\\\\:prose-sm :where(> ol > li > *:last-child) {
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .xl\\\\:prose-sm :where(hr) {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .xl\\\\:prose-sm :where(hr + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-sm :where(h2 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-sm :where(h3 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-sm :where(h4 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-sm :where(table) {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .xl\\\\:prose-sm :where(thead th) {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-sm :where(thead th:first-child) {
        padding-left: 0;
      }

      .xl\\\\:prose-sm :where(thead th:last-child) {
        padding-right: 0;
      }

      .xl\\\\:prose-sm :where(tbody td) {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-sm :where(tbody td:first-child) {
        padding-left: 0;
      }

      .xl\\\\:prose-sm :where(tbody td:last-child) {
        padding-right: 0;
      }

      .xl\\\\:prose-sm :where(> :first-child) {
        margin-top: 0;
      }

      .xl\\\\:prose-sm :where(> :last-child) {
        margin-bottom: 0;
      }

      .xl\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .xl\\\\:prose-lg :where(p) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg :where([class~=\\"lead\\"]) {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .xl\\\\:prose-lg :where(blockquote) {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-lg :where(h1) {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .xl\\\\:prose-lg :where(h2) {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .xl\\\\:prose-lg :where(h3) {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .xl\\\\:prose-lg :where(h4) {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .xl\\\\:prose-lg :where(img) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .xl\\\\:prose-lg :where(video) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .xl\\\\:prose-lg :where(figure) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .xl\\\\:prose-lg :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-lg :where(figure figcaption) {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .xl\\\\:prose-lg :where(code) {
        font-size: 0.8888889em;
      }

      .xl\\\\:prose-lg :where(h2 code) {
        font-size: 0.8666667em;
      }

      .xl\\\\:prose-lg :where(h3 code) {
        font-size: 0.875em;
      }

      .xl\\\\:prose-lg :where(pre) {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .xl\\\\:prose-lg :where(ol) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg :where(ul) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg :where(li) {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .xl\\\\:prose-lg :where(ol > li) {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-lg :where(ol > li)::before {
        left: 0;
      }

      .xl\\\\:prose-lg :where(ul > li) {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-lg :where(ul > li)::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .xl\\\\:prose-lg :where(> ul > li p) {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .xl\\\\:prose-lg :where(> ul > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-lg :where(> ul > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg :where(> ol > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-lg :where(> ol > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .xl\\\\:prose-lg :where(hr) {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .xl\\\\:prose-lg :where(hr + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-lg :where(h2 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-lg :where(h3 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-lg :where(h4 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-lg :where(table) {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .xl\\\\:prose-lg :where(thead th) {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .xl\\\\:prose-lg :where(thead th:first-child) {
        padding-left: 0;
      }

      .xl\\\\:prose-lg :where(thead th:last-child) {
        padding-right: 0;
      }

      .xl\\\\:prose-lg :where(tbody td) {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .xl\\\\:prose-lg :where(tbody td:first-child) {
        padding-left: 0;
      }

      .xl\\\\:prose-lg :where(tbody td:last-child) {
        padding-right: 0;
      }

      .xl\\\\:prose-lg :where(> :first-child) {
        margin-top: 0;
      }

      .xl\\\\:prose-lg :where(> :last-child) {
        margin-bottom: 0;
      }

      .xl\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .xl\\\\:prose-xl :where(p) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl :where([class~=\\"lead\\"]) {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .xl\\\\:prose-xl :where(blockquote) {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .xl\\\\:prose-xl :where(h1) {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .xl\\\\:prose-xl :where(h2) {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .xl\\\\:prose-xl :where(h3) {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .xl\\\\:prose-xl :where(h4) {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .xl\\\\:prose-xl :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-xl :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-xl :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-xl :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-xl :where(figure figcaption) {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .xl\\\\:prose-xl :where(code) {
        font-size: 0.9em;
      }

      .xl\\\\:prose-xl :where(h2 code) {
        font-size: 0.8611111em;
      }

      .xl\\\\:prose-xl :where(h3 code) {
        font-size: 0.9em;
      }

      .xl\\\\:prose-xl :where(pre) {
        font-size: 0.9em;
        line-height: 1.7777778;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.1111111em;
        padding-right: 1.3333333em;
        padding-bottom: 1.1111111em;
        padding-left: 1.3333333em;
      }

      .xl\\\\:prose-xl :where(ol) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl :where(ul) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl :where(li) {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .xl\\\\:prose-xl :where(ol > li) {
        padding-left: 1.8em;
      }

      .xl\\\\:prose-xl :where(ol > li)::before {
        left: 0;
      }

      .xl\\\\:prose-xl :where(ul > li) {
        padding-left: 1.8em;
      }

      .xl\\\\:prose-xl :where(ul > li)::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .xl\\\\:prose-xl :where(> ul > li p) {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .xl\\\\:prose-xl :where(> ul > li > *:first-child) {
        margin-top: 1.2em;
      }

      .xl\\\\:prose-xl :where(> ul > li > *:last-child) {
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl :where(> ol > li > *:first-child) {
        margin-top: 1.2em;
      }

      .xl\\\\:prose-xl :where(> ol > li > *:last-child) {
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .xl\\\\:prose-xl :where(hr) {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .xl\\\\:prose-xl :where(hr + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-xl :where(h2 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-xl :where(h3 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-xl :where(h4 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-xl :where(table) {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .xl\\\\:prose-xl :where(thead th) {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .xl\\\\:prose-xl :where(thead th:first-child) {
        padding-left: 0;
      }

      .xl\\\\:prose-xl :where(thead th:last-child) {
        padding-right: 0;
      }

      .xl\\\\:prose-xl :where(tbody td) {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .xl\\\\:prose-xl :where(tbody td:first-child) {
        padding-left: 0;
      }

      .xl\\\\:prose-xl :where(tbody td:last-child) {
        padding-right: 0;
      }

      .xl\\\\:prose-xl :where(> :first-child) {
        margin-top: 0;
      }

      .xl\\\\:prose-xl :where(> :last-child) {
        margin-bottom: 0;
      }

      .xl\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .xl\\\\:prose-2xl :where(p) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl :where([class~=\\"lead\\"]) {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .xl\\\\:prose-2xl :where(blockquote) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .xl\\\\:prose-2xl :where(h1) {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .xl\\\\:prose-2xl :where(h2) {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .xl\\\\:prose-2xl :where(h3) {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .xl\\\\:prose-2xl :where(h4) {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .xl\\\\:prose-2xl :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-2xl :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-2xl :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-2xl :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-2xl :where(figure figcaption) {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .xl\\\\:prose-2xl :where(code) {
        font-size: 0.8333333em;
      }

      .xl\\\\:prose-2xl :where(h2 code) {
        font-size: 0.875em;
      }

      .xl\\\\:prose-2xl :where(h3 code) {
        font-size: 0.8888889em;
      }

      .xl\\\\:prose-2xl :where(pre) {
        font-size: 0.8333333em;
        line-height: 1.8;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.2em;
        padding-right: 1.6em;
        padding-bottom: 1.2em;
        padding-left: 1.6em;
      }

      .xl\\\\:prose-2xl :where(ol) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl :where(ul) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl :where(li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .xl\\\\:prose-2xl :where(ol > li) {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-2xl :where(ol > li)::before {
        left: 0;
      }

      .xl\\\\:prose-2xl :where(ul > li) {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-2xl :where(ul > li)::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .xl\\\\:prose-2xl :where(> ul > li p) {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .xl\\\\:prose-2xl :where(> ul > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-2xl :where(> ul > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl :where(> ol > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-2xl :where(> ol > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .xl\\\\:prose-2xl :where(hr) {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .xl\\\\:prose-2xl :where(hr + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl :where(h2 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl :where(h3 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl :where(h4 + *) {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl :where(table) {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .xl\\\\:prose-2xl :where(thead th) {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .xl\\\\:prose-2xl :where(thead th:first-child) {
        padding-left: 0;
      }

      .xl\\\\:prose-2xl :where(thead th:last-child) {
        padding-right: 0;
      }

      .xl\\\\:prose-2xl :where(tbody td) {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .xl\\\\:prose-2xl :where(tbody td:first-child) {
        padding-left: 0;
      }

      .xl\\\\:prose-2xl :where(tbody td:last-child) {
        padding-right: 0;
      }

      .xl\\\\:prose-2xl :where(> :first-child) {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl :where(> :last-child) {
        margin-bottom: 0;
      }

      .xl\\\\:prose-red :where(a) {
        color: #dc2626;
      }

      .xl\\\\:prose-red :where(a code) {
        color: #dc2626;
      }

      .xl\\\\:prose-yellow :where(a) {
        color: #d97706;
      }

      .xl\\\\:prose-yellow :where(a code) {
        color: #d97706;
      }

      .xl\\\\:prose-green :where(a) {
        color: #059669;
      }

      .xl\\\\:prose-green :where(a code) {
        color: #059669;
      }

      .xl\\\\:prose-blue :where(a) {
        color: #2563eb;
      }

      .xl\\\\:prose-blue :where(a code) {
        color: #2563eb;
      }

      .xl\\\\:prose-indigo :where(a) {
        color: #4f46e5;
      }

      .xl\\\\:prose-indigo :where(a code) {
        color: #4f46e5;
      }

      .xl\\\\:prose-purple :where(a) {
        color: #7c3aed;
      }

      .xl\\\\:prose-purple :where(a code) {
        color: #7c3aed;
      }

      .xl\\\\:prose-pink :where(a) {
        color: #db2777;
      }

      .xl\\\\:prose-pink :where(a code) {
        color: #db2777;
      }
    }

    @media (min-width: 1536px) {
      .\\\\32xl\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .\\\\32xl\\\\:prose :where([class~=\\"lead\\"]) {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose :where(a) {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .\\\\32xl\\\\:prose :where(strong) {
        color: #111827;
        font-weight: 600;
      }

      .\\\\32xl\\\\:prose :where(ol[type=\\"A\\"]) {
        --list-counter-style: upper-alpha;
      }

      .\\\\32xl\\\\:prose :where(ol[type=\\"a\\"]) {
        --list-counter-style: lower-alpha;
      }

      .\\\\32xl\\\\:prose :where(ol[type=\\"A\\" s]) {
        --list-counter-style: upper-alpha;
      }

      .\\\\32xl\\\\:prose :where(ol[type=\\"a\\" s]) {
        --list-counter-style: lower-alpha;
      }

      .\\\\32xl\\\\:prose :where(ol[type=\\"I\\"]) {
        --list-counter-style: upper-roman;
      }

      .\\\\32xl\\\\:prose :where(ol[type=\\"i\\"]) {
        --list-counter-style: lower-roman;
      }

      .\\\\32xl\\\\:prose :where(ol[type=\\"I\\" s]) {
        --list-counter-style: upper-roman;
      }

      .\\\\32xl\\\\:prose :where(ol[type=\\"i\\" s]) {
        --list-counter-style: lower-roman;
      }

      .\\\\32xl\\\\:prose :where(ol[type=\\"1\\"]) {
        --list-counter-style: decimal;
      }

      .\\\\32xl\\\\:prose :where(ol > li) {
        position: relative;
        padding-left: 1.75em;
      }

      .\\\\32xl\\\\:prose :where(ol > li)::before {
        content: counter(list-item, var(--list-counter-style, decimal)) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .\\\\32xl\\\\:prose :where(ul > li) {
        position: relative;
        padding-left: 1.75em;
      }

      .\\\\32xl\\\\:prose :where(ul > li)::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .\\\\32xl\\\\:prose :where(hr) {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .\\\\32xl\\\\:prose :where(blockquote) {
        font-weight: 500;
        font-style: italic;
        color: #111827;
        border-left-width: 0.25rem;
        border-left-color: #e5e7eb;
        quotes: \\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\";
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose :where(blockquote p:first-of-type)::before {
        content: open-quote;
      }

      .\\\\32xl\\\\:prose :where(blockquote p:last-of-type)::after {
        content: close-quote;
      }

      .\\\\32xl\\\\:prose :where(h1) {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .\\\\32xl\\\\:prose :where(h1 strong) {
        font-weight: 900;
      }

      .\\\\32xl\\\\:prose :where(h2) {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .\\\\32xl\\\\:prose :where(h2 strong) {
        font-weight: 800;
      }

      .\\\\32xl\\\\:prose :where(h3) {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .\\\\32xl\\\\:prose :where(h3 strong) {
        font-weight: 700;
      }

      .\\\\32xl\\\\:prose :where(h4) {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose :where(h4 strong) {
        font-weight: 700;
      }

      .\\\\32xl\\\\:prose :where(figure figcaption) {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .\\\\32xl\\\\:prose :where(code) {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose :where(code)::before {
        content: \\"\`\\";
      }

      .\\\\32xl\\\\:prose :where(code)::after {
        content: \\"\`\\";
      }

      .\\\\32xl\\\\:prose :where(a code) {
        color: #111827;
      }

      .\\\\32xl\\\\:prose :where(pre) {
        color: #e5e7eb;
        background-color: #1f2937;
        overflow-x: auto;
        font-size: 0.875em;
        line-height: 1.7142857;
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
        border-radius: 0.375rem;
        padding-top: 0.8571429em;
        padding-right: 1.1428571em;
        padding-bottom: 0.8571429em;
        padding-left: 1.1428571em;
      }

      .\\\\32xl\\\\:prose :where(pre code) {
        background-color: transparent;
        border-width: 0;
        border-radius: 0;
        padding: 0;
        font-weight: 400;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
      }

      .\\\\32xl\\\\:prose :where(pre code)::before {
        content: none;
      }

      .\\\\32xl\\\\:prose :where(pre code)::after {
        content: none;
      }

      .\\\\32xl\\\\:prose :where(table) {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .\\\\32xl\\\\:prose :where(thead) {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .\\\\32xl\\\\:prose :where(thead th) {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .\\\\32xl\\\\:prose :where(tbody tr) {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .\\\\32xl\\\\:prose :where(tbody tr:last-child) {
        border-bottom-width: 0;
      }

      .\\\\32xl\\\\:prose :where(tbody td) {
        vertical-align: top;
        padding-top: 0.5714286em;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .\\\\32xl\\\\:prose {
        font-size: 1rem;
        line-height: 1.75;
      }

      .\\\\32xl\\\\:prose :where(p) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose :where(h2 code) {
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose :where(h3 code) {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose :where(ol) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose :where(ul) {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose :where(li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .\\\\32xl\\\\:prose :where(> ul > li p) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .\\\\32xl\\\\:prose :where(> ul > li > *:first-child) {
        margin-top: 1.25em;
      }

      .\\\\32xl\\\\:prose :where(> ul > li > *:last-child) {
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose :where(> ol > li > *:first-child) {
        margin-top: 1.25em;
      }

      .\\\\32xl\\\\:prose :where(> ol > li > *:last-child) {
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .\\\\32xl\\\\:prose :where(hr + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose :where(h2 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose :where(h3 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose :where(h4 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose :where(thead th:first-child) {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose :where(thead th:last-child) {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose :where(tbody td:first-child) {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose :where(tbody td:last-child) {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose :where(> :first-child) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose :where(> :last-child) {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .\\\\32xl\\\\:prose-sm :where(p) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm :where([class~=\\"lead\\"]) {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-sm :where(blockquote) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .\\\\32xl\\\\:prose-sm :where(h1) {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .\\\\32xl\\\\:prose-sm :where(h2) {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .\\\\32xl\\\\:prose-sm :where(h3) {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .\\\\32xl\\\\:prose-sm :where(h4) {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .\\\\32xl\\\\:prose-sm :where(img) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .\\\\32xl\\\\:prose-sm :where(video) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .\\\\32xl\\\\:prose-sm :where(figure) {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .\\\\32xl\\\\:prose-sm :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(figure figcaption) {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-sm :where(code) {
        font-size: 0.8571429em;
      }

      .\\\\32xl\\\\:prose-sm :where(h2 code) {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose-sm :where(h3 code) {
        font-size: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-sm :where(pre) {
        font-size: 0.8571429em;
        line-height: 1.6666667;
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        border-radius: 0.25rem;
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-sm :where(ol) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm :where(ul) {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm :where(li) {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .\\\\32xl\\\\:prose-sm :where(ol > li) {
        padding-left: 1.5714286em;
      }

      .\\\\32xl\\\\:prose-sm :where(ol > li)::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(ul > li) {
        padding-left: 1.5714286em;
      }

      .\\\\32xl\\\\:prose-sm :where(ul > li)::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .\\\\32xl\\\\:prose-sm :where(> ul > li p) {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .\\\\32xl\\\\:prose-sm :where(> ul > li > *:first-child) {
        margin-top: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm :where(> ul > li > *:last-child) {
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm :where(> ol > li > *:first-child) {
        margin-top: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm :where(> ol > li > *:last-child) {
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .\\\\32xl\\\\:prose-sm :where(hr) {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .\\\\32xl\\\\:prose-sm :where(hr + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(h2 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(h3 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(h4 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(table) {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-sm :where(thead th) {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-sm :where(thead th:first-child) {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(thead th:last-child) {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(tbody td) {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-sm :where(tbody td:first-child) {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(tbody td:last-child) {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(> :first-child) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm :where(> :last-child) {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .\\\\32xl\\\\:prose-lg :where(p) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg :where([class~=\\"lead\\"]) {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .\\\\32xl\\\\:prose-lg :where(blockquote) {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-lg :where(h1) {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .\\\\32xl\\\\:prose-lg :where(h2) {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .\\\\32xl\\\\:prose-lg :where(h3) {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-lg :where(h4) {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .\\\\32xl\\\\:prose-lg :where(img) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .\\\\32xl\\\\:prose-lg :where(video) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .\\\\32xl\\\\:prose-lg :where(figure) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .\\\\32xl\\\\:prose-lg :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(figure figcaption) {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .\\\\32xl\\\\:prose-lg :where(code) {
        font-size: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-lg :where(h2 code) {
        font-size: 0.8666667em;
      }

      .\\\\32xl\\\\:prose-lg :where(h3 code) {
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose-lg :where(pre) {
        font-size: 0.8888889em;
        line-height: 1.75;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.375rem;
        padding-top: 1em;
        padding-right: 1.5em;
        padding-bottom: 1em;
        padding-left: 1.5em;
      }

      .\\\\32xl\\\\:prose-lg :where(ol) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg :where(ul) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg :where(li) {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-lg :where(ol > li) {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-lg :where(ol > li)::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(ul > li) {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-lg :where(ul > li)::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .\\\\32xl\\\\:prose-lg :where(> ul > li p) {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-lg :where(> ul > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg :where(> ul > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg :where(> ol > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg :where(> ol > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-lg :where(hr) {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .\\\\32xl\\\\:prose-lg :where(hr + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(h2 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(h3 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(h4 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(table) {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-lg :where(thead th) {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .\\\\32xl\\\\:prose-lg :where(thead th:first-child) {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(thead th:last-child) {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(tbody td) {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .\\\\32xl\\\\:prose-lg :where(tbody td:first-child) {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(tbody td:last-child) {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(> :first-child) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg :where(> :last-child) {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .\\\\32xl\\\\:prose-xl :where(p) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl :where([class~=\\"lead\\"]) {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .\\\\32xl\\\\:prose-xl :where(blockquote) {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .\\\\32xl\\\\:prose-xl :where(h1) {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .\\\\32xl\\\\:prose-xl :where(h2) {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .\\\\32xl\\\\:prose-xl :where(h3) {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .\\\\32xl\\\\:prose-xl :where(h4) {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .\\\\32xl\\\\:prose-xl :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-xl :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-xl :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-xl :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(figure figcaption) {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .\\\\32xl\\\\:prose-xl :where(code) {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose-xl :where(h2 code) {
        font-size: 0.8611111em;
      }

      .\\\\32xl\\\\:prose-xl :where(h3 code) {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose-xl :where(pre) {
        font-size: 0.9em;
        line-height: 1.7777778;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.1111111em;
        padding-right: 1.3333333em;
        padding-bottom: 1.1111111em;
        padding-left: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-xl :where(ol) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl :where(ul) {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl :where(li) {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .\\\\32xl\\\\:prose-xl :where(ol > li) {
        padding-left: 1.8em;
      }

      .\\\\32xl\\\\:prose-xl :where(ol > li)::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(ul > li) {
        padding-left: 1.8em;
      }

      .\\\\32xl\\\\:prose-xl :where(ul > li)::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .\\\\32xl\\\\:prose-xl :where(> ul > li p) {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .\\\\32xl\\\\:prose-xl :where(> ul > li > *:first-child) {
        margin-top: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl :where(> ul > li > *:last-child) {
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl :where(> ol > li > *:first-child) {
        margin-top: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl :where(> ol > li > *:last-child) {
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .\\\\32xl\\\\:prose-xl :where(hr) {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .\\\\32xl\\\\:prose-xl :where(hr + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(h2 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(h3 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(h4 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(table) {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .\\\\32xl\\\\:prose-xl :where(thead th) {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-xl :where(thead th:first-child) {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(thead th:last-child) {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(tbody td) {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-xl :where(tbody td:first-child) {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(tbody td:last-child) {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(> :first-child) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl :where(> :last-child) {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .\\\\32xl\\\\:prose-2xl :where(p) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl :where([class~=\\"lead\\"]) {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .\\\\32xl\\\\:prose-2xl :where(blockquote) {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .\\\\32xl\\\\:prose-2xl :where(h1) {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .\\\\32xl\\\\:prose-2xl :where(h2) {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .\\\\32xl\\\\:prose-2xl :where(h3) {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .\\\\32xl\\\\:prose-2xl :where(h4) {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-2xl :where(img) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-2xl :where(video) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-2xl :where(figure) {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-2xl :where(figure > *) {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(figure figcaption) {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .\\\\32xl\\\\:prose-2xl :where(code) {
        font-size: 0.8333333em;
      }

      .\\\\32xl\\\\:prose-2xl :where(h2 code) {
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose-2xl :where(h3 code) {
        font-size: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-2xl :where(pre) {
        font-size: 0.8333333em;
        line-height: 1.8;
        margin-top: 2em;
        margin-bottom: 2em;
        border-radius: 0.5rem;
        padding-top: 1.2em;
        padding-right: 1.6em;
        padding-bottom: 1.2em;
        padding-left: 1.6em;
      }

      .\\\\32xl\\\\:prose-2xl :where(ol) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl :where(ul) {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl :where(li) {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .\\\\32xl\\\\:prose-2xl :where(ol > li) {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-2xl :where(ol > li)::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(ul > li) {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-2xl :where(ul > li)::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .\\\\32xl\\\\:prose-2xl :where(> ul > li p) {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .\\\\32xl\\\\:prose-2xl :where(> ul > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl :where(> ul > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl :where(> ol > li > *:first-child) {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl :where(> ol > li > *:last-child) {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-2xl :where(hr) {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .\\\\32xl\\\\:prose-2xl :where(hr + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(h2 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(h3 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(h4 + *) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(table) {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .\\\\32xl\\\\:prose-2xl :where(thead th) {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .\\\\32xl\\\\:prose-2xl :where(thead th:first-child) {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(thead th:last-child) {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(tbody td) {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .\\\\32xl\\\\:prose-2xl :where(tbody td:first-child) {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(tbody td:last-child) {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(> :first-child) {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl :where(> :last-child) {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-red :where(a) {
        color: #dc2626;
      }

      .\\\\32xl\\\\:prose-red :where(a code) {
        color: #dc2626;
      }

      .\\\\32xl\\\\:prose-yellow :where(a) {
        color: #d97706;
      }

      .\\\\32xl\\\\:prose-yellow :where(a code) {
        color: #d97706;
      }

      .\\\\32xl\\\\:prose-green :where(a) {
        color: #059669;
      }

      .\\\\32xl\\\\:prose-green :where(a code) {
        color: #059669;
      }

      .\\\\32xl\\\\:prose-blue :where(a) {
        color: #2563eb;
      }

      .\\\\32xl\\\\:prose-blue :where(a code) {
        color: #2563eb;
      }

      .\\\\32xl\\\\:prose-indigo :where(a) {
        color: #4f46e5;
      }

      .\\\\32xl\\\\:prose-indigo :where(a code) {
        color: #4f46e5;
      }

      .\\\\32xl\\\\:prose-purple :where(a) {
        color: #7c3aed;
      }

      .\\\\32xl\\\\:prose-purple :where(a code) {
        color: #7c3aed;
      }

      .\\\\32xl\\\\:prose-pink :where(a) {
        color: #db2777;
      }

      .\\\\32xl\\\\:prose-pink :where(a code) {
        color: #db2777;
      }
    }"
  `)
})

it('should be possible to change the default className from `prose` to `markdown`', async () => {
  expect(await diffOnly({ className: 'markdown' })).toMatchInlineSnapshot(`
    "

      - .prose {
      + .markdown {

      ---

      - .prose :where([class~='lead']) {
      + .markdown :where([class~='lead']) {

      ---

      - .prose :where(a) {
      + .markdown :where(a) {

      ---

      - .prose :where(strong) {
      + .markdown :where(strong) {

      ---

      - .prose :where(ol[type='A']) {
      + .markdown :where(ol[type='A']) {

      ---

      - .prose :where(ol[type='a']) {
      + .markdown :where(ol[type='a']) {

      ---

      - .prose :where(ol[type='A' s]) {
      + .markdown :where(ol[type='A' s]) {

      ---

      - .prose :where(ol[type='a' s]) {
      + .markdown :where(ol[type='a' s]) {

      ---

      - .prose :where(ol[type='I']) {
      + .markdown :where(ol[type='I']) {

      ---

      - .prose :where(ol[type='i']) {
      + .markdown :where(ol[type='i']) {

      ---

      - .prose :where(ol[type='I' s]) {
      + .markdown :where(ol[type='I' s]) {

      ---

      - .prose :where(ol[type='i' s]) {
      + .markdown :where(ol[type='i' s]) {

      ---

      - .prose :where(ol[type='1']) {
      + .markdown :where(ol[type='1']) {

      ---

      - .prose :where(ol > li) {
      + .markdown :where(ol > li) {

      ---

      - .prose :where(ol > li)::before {
      + .markdown :where(ol > li)::before {

      ---

      - .prose :where(ul > li) {
      + .markdown :where(ul > li) {

      ---

      - .prose :where(ul > li)::before {
      + .markdown :where(ul > li)::before {

      ---

      - .prose :where(hr) {
      + .markdown :where(hr) {

      ---

      - .prose :where(blockquote) {
      + .markdown :where(blockquote) {

      ---

      - .prose :where(blockquote p:first-of-type)::before {
      + .markdown :where(blockquote p:first-of-type)::before {

      ---

      - .prose :where(blockquote p:last-of-type)::after {
      + .markdown :where(blockquote p:last-of-type)::after {

      ---

      - .prose :where(h1) {
      + .markdown :where(h1) {

      ---

      - .prose :where(h1 strong) {
      + .markdown :where(h1 strong) {

      ---

      - .prose :where(h2) {
      + .markdown :where(h2) {

      ---

      - .prose :where(h2 strong) {
      + .markdown :where(h2 strong) {

      ---

      - .prose :where(h3) {
      + .markdown :where(h3) {

      ---

      - .prose :where(h3 strong) {
      + .markdown :where(h3 strong) {

      ---

      - .prose :where(h4) {
      + .markdown :where(h4) {

      ---

      - .prose :where(h4 strong) {
      + .markdown :where(h4 strong) {

      ---

      - .prose :where(figure figcaption) {
      + .markdown :where(figure figcaption) {

      ---

      - .prose :where(code) {
      + .markdown :where(code) {

      ---

      - .prose :where(code)::before {
      + .markdown :where(code)::before {

      ---

      - .prose :where(code)::after {
      + .markdown :where(code)::after {

      ---

      - .prose :where(a code) {
      + .markdown :where(a code) {

      ---

      - .prose :where(pre) {
      + .markdown :where(pre) {

      ---

      - .prose :where(pre code) {
      + .markdown :where(pre code) {

      ---

      - .prose :where(pre code)::before {
      + .markdown :where(pre code)::before {

      ---

      - .prose :where(pre code)::after {
      + .markdown :where(pre code)::after {

      ---

      - .prose :where(table) {
      + .markdown :where(table) {

      ---

      - .prose :where(thead) {
      + .markdown :where(thead) {

      ---

      - .prose :where(thead th) {
      + .markdown :where(thead th) {

      ---

      - .prose :where(tbody tr) {
      + .markdown :where(tbody tr) {

      ---

      - .prose :where(tbody tr:last-child) {
      + .markdown :where(tbody tr:last-child) {

      ---

      - .prose :where(tbody td) {
      + .markdown :where(tbody td) {

      ---

      - .prose {
      + .markdown {

      ---

      - .prose :where(p) {
      + .markdown :where(p) {

      ---

      - .prose :where(img) {
      + .markdown :where(img) {

      ---

      - .prose :where(video) {
      + .markdown :where(video) {

      ---

      - .prose :where(figure) {
      + .markdown :where(figure) {

      ---

      - .prose :where(figure > *) {
      + .markdown :where(figure > *) {

      ---

      - .prose :where(h2 code) {
      + .markdown :where(h2 code) {

      ---

      - .prose :where(h3 code) {
      + .markdown :where(h3 code) {

      ---

      - .prose :where(ol) {
      + .markdown :where(ol) {

      ---

      - .prose :where(ul) {
      + .markdown :where(ul) {

      ---

      - .prose :where(li) {
      + .markdown :where(li) {

      ---

      - .prose :where(> ul > li p) {
      + .markdown :where(> ul > li p) {

      ---

      - .prose :where(> ul > li > *:first-child) {
      + .markdown :where(> ul > li > *:first-child) {

      ---

      - .prose :where(> ul > li > *:last-child) {
      + .markdown :where(> ul > li > *:last-child) {

      ---

      - .prose :where(> ol > li > *:first-child) {
      + .markdown :where(> ol > li > *:first-child) {

      ---

      - .prose :where(> ol > li > *:last-child) {
      + .markdown :where(> ol > li > *:last-child) {

      ---

      - .prose :where(ul ul, ul ol, ol ul, ol ol) {
      + .markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      - .prose :where(hr + *) {
      + .markdown :where(hr + *) {

      ---

      - .prose :where(h2 + *) {
      + .markdown :where(h2 + *) {

      ---

      - .prose :where(h3 + *) {
      + .markdown :where(h3 + *) {

      ---

      - .prose :where(h4 + *) {
      + .markdown :where(h4 + *) {

      ---

      - .prose :where(thead th:first-child) {
      + .markdown :where(thead th:first-child) {

      ---

      - .prose :where(thead th:last-child) {
      + .markdown :where(thead th:last-child) {

      ---

      - .prose :where(tbody td:first-child) {
      + .markdown :where(tbody td:first-child) {

      ---

      - .prose :where(tbody td:last-child) {
      + .markdown :where(tbody td:last-child) {

      ---

      - .prose :where(> :first-child) {
      + .markdown :where(> :first-child) {

      ---

      - .prose :where(> :last-child) {
      + .markdown :where(> :last-child) {

      ---

      - .prose-sm {
      + .markdown-sm {

      ---

      - .prose-sm :where(p) {
      + .markdown-sm :where(p) {

      ---

      - .prose-sm :where([class~='lead']) {
      + .markdown-sm :where([class~='lead']) {

      ---

      - .prose-sm :where(blockquote) {
      + .markdown-sm :where(blockquote) {

      ---

      - .prose-sm :where(h1) {
      + .markdown-sm :where(h1) {

      ---

      - .prose-sm :where(h2) {
      + .markdown-sm :where(h2) {

      ---

      - .prose-sm :where(h3) {
      + .markdown-sm :where(h3) {

      ---

      - .prose-sm :where(h4) {
      + .markdown-sm :where(h4) {

      ---

      - .prose-sm :where(img) {
      + .markdown-sm :where(img) {

      ---

      - .prose-sm :where(video) {
      + .markdown-sm :where(video) {

      ---

      - .prose-sm :where(figure) {
      + .markdown-sm :where(figure) {

      ---

      - .prose-sm :where(figure > *) {
      + .markdown-sm :where(figure > *) {

      ---

      - .prose-sm :where(figure figcaption) {
      + .markdown-sm :where(figure figcaption) {

      ---

      - .prose-sm :where(code) {
      + .markdown-sm :where(code) {

      ---

      - .prose-sm :where(h2 code) {
      + .markdown-sm :where(h2 code) {

      ---

      - .prose-sm :where(h3 code) {
      + .markdown-sm :where(h3 code) {

      ---

      - .prose-sm :where(pre) {
      + .markdown-sm :where(pre) {

      ---

      - .prose-sm :where(ol) {
      + .markdown-sm :where(ol) {

      ---

      - .prose-sm :where(ul) {
      + .markdown-sm :where(ul) {

      ---

      - .prose-sm :where(li) {
      + .markdown-sm :where(li) {

      ---

      - .prose-sm :where(ol > li) {
      + .markdown-sm :where(ol > li) {

      ---

      - .prose-sm :where(ol > li)::before {
      + .markdown-sm :where(ol > li)::before {

      ---

      - .prose-sm :where(ul > li) {
      + .markdown-sm :where(ul > li) {

      ---

      - .prose-sm :where(ul > li)::before {
      + .markdown-sm :where(ul > li)::before {

      ---

      - .prose-sm :where(> ul > li p) {
      + .markdown-sm :where(> ul > li p) {

      ---

      - .prose-sm :where(> ul > li > *:first-child) {
      + .markdown-sm :where(> ul > li > *:first-child) {

      ---

      - .prose-sm :where(> ul > li > *:last-child) {
      + .markdown-sm :where(> ul > li > *:last-child) {

      ---

      - .prose-sm :where(> ol > li > *:first-child) {
      + .markdown-sm :where(> ol > li > *:first-child) {

      ---

      - .prose-sm :where(> ol > li > *:last-child) {
      + .markdown-sm :where(> ol > li > *:last-child) {

      ---

      - .prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      + .markdown-sm :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      - .prose-sm :where(hr) {
      + .markdown-sm :where(hr) {

      ---

      - .prose-sm :where(hr + *) {
      + .markdown-sm :where(hr + *) {

      ---

      - .prose-sm :where(h2 + *) {
      + .markdown-sm :where(h2 + *) {

      ---

      - .prose-sm :where(h3 + *) {
      + .markdown-sm :where(h3 + *) {

      ---

      - .prose-sm :where(h4 + *) {
      + .markdown-sm :where(h4 + *) {

      ---

      - .prose-sm :where(table) {
      + .markdown-sm :where(table) {

      ---

      - .prose-sm :where(thead th) {
      + .markdown-sm :where(thead th) {

      ---

      - .prose-sm :where(thead th:first-child) {
      + .markdown-sm :where(thead th:first-child) {

      ---

      - .prose-sm :where(thead th:last-child) {
      + .markdown-sm :where(thead th:last-child) {

      ---

      - .prose-sm :where(tbody td) {
      + .markdown-sm :where(tbody td) {

      ---

      - .prose-sm :where(tbody td:first-child) {
      + .markdown-sm :where(tbody td:first-child) {

      ---

      - .prose-sm :where(tbody td:last-child) {
      + .markdown-sm :where(tbody td:last-child) {

      ---

      - .prose-sm :where(> :first-child) {
      + .markdown-sm :where(> :first-child) {

      ---

      - .prose-sm :where(> :last-child) {
      + .markdown-sm :where(> :last-child) {

      ---

      - .prose-lg {
      + .markdown-lg {

      ---

      - .prose-lg :where(p) {
      + .markdown-lg :where(p) {

      ---

      - .prose-lg :where([class~='lead']) {
      + .markdown-lg :where([class~='lead']) {

      ---

      - .prose-lg :where(blockquote) {
      + .markdown-lg :where(blockquote) {

      ---

      - .prose-lg :where(h1) {
      + .markdown-lg :where(h1) {

      ---

      - .prose-lg :where(h2) {
      + .markdown-lg :where(h2) {

      ---

      - .prose-lg :where(h3) {
      + .markdown-lg :where(h3) {

      ---

      - .prose-lg :where(h4) {
      + .markdown-lg :where(h4) {

      ---

      - .prose-lg :where(img) {
      + .markdown-lg :where(img) {

      ---

      - .prose-lg :where(video) {
      + .markdown-lg :where(video) {

      ---

      - .prose-lg :where(figure) {
      + .markdown-lg :where(figure) {

      ---

      - .prose-lg :where(figure > *) {
      + .markdown-lg :where(figure > *) {

      ---

      - .prose-lg :where(figure figcaption) {
      + .markdown-lg :where(figure figcaption) {

      ---

      - .prose-lg :where(code) {
      + .markdown-lg :where(code) {

      ---

      - .prose-lg :where(h2 code) {
      + .markdown-lg :where(h2 code) {

      ---

      - .prose-lg :where(h3 code) {
      + .markdown-lg :where(h3 code) {

      ---

      - .prose-lg :where(pre) {
      + .markdown-lg :where(pre) {

      ---

      - .prose-lg :where(ol) {
      + .markdown-lg :where(ol) {

      ---

      - .prose-lg :where(ul) {
      + .markdown-lg :where(ul) {

      ---

      - .prose-lg :where(li) {
      + .markdown-lg :where(li) {

      ---

      - .prose-lg :where(ol > li) {
      + .markdown-lg :where(ol > li) {

      ---

      - .prose-lg :where(ol > li)::before {
      + .markdown-lg :where(ol > li)::before {

      ---

      - .prose-lg :where(ul > li) {
      + .markdown-lg :where(ul > li) {

      ---

      - .prose-lg :where(ul > li)::before {
      + .markdown-lg :where(ul > li)::before {

      ---

      - .prose-lg :where(> ul > li p) {
      + .markdown-lg :where(> ul > li p) {

      ---

      - .prose-lg :where(> ul > li > *:first-child) {
      + .markdown-lg :where(> ul > li > *:first-child) {

      ---

      - .prose-lg :where(> ul > li > *:last-child) {
      + .markdown-lg :where(> ul > li > *:last-child) {

      ---

      - .prose-lg :where(> ol > li > *:first-child) {
      + .markdown-lg :where(> ol > li > *:first-child) {

      ---

      - .prose-lg :where(> ol > li > *:last-child) {
      + .markdown-lg :where(> ol > li > *:last-child) {

      ---

      - .prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      + .markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      - .prose-lg :where(hr) {
      + .markdown-lg :where(hr) {

      ---

      - .prose-lg :where(hr + *) {
      + .markdown-lg :where(hr + *) {

      ---

      - .prose-lg :where(h2 + *) {
      + .markdown-lg :where(h2 + *) {

      ---

      - .prose-lg :where(h3 + *) {
      + .markdown-lg :where(h3 + *) {

      ---

      - .prose-lg :where(h4 + *) {
      + .markdown-lg :where(h4 + *) {

      ---

      - .prose-lg :where(table) {
      + .markdown-lg :where(table) {

      ---

      - .prose-lg :where(thead th) {
      + .markdown-lg :where(thead th) {

      ---

      - .prose-lg :where(thead th:first-child) {
      + .markdown-lg :where(thead th:first-child) {

      ---

      - .prose-lg :where(thead th:last-child) {
      + .markdown-lg :where(thead th:last-child) {

      ---

      - .prose-lg :where(tbody td) {
      + .markdown-lg :where(tbody td) {

      ---

      - .prose-lg :where(tbody td:first-child) {
      + .markdown-lg :where(tbody td:first-child) {

      ---

      - .prose-lg :where(tbody td:last-child) {
      + .markdown-lg :where(tbody td:last-child) {

      ---

      - .prose-lg :where(> :first-child) {
      + .markdown-lg :where(> :first-child) {

      ---

      - .prose-lg :where(> :last-child) {
      + .markdown-lg :where(> :last-child) {

      ---

      - .prose-xl {
      + .markdown-xl {

      ---

      - .prose-xl :where(p) {
      + .markdown-xl :where(p) {

      ---

      - .prose-xl :where([class~='lead']) {
      + .markdown-xl :where([class~='lead']) {

      ---

      - .prose-xl :where(blockquote) {
      + .markdown-xl :where(blockquote) {

      ---

      - .prose-xl :where(h1) {
      + .markdown-xl :where(h1) {

      ---

      - .prose-xl :where(h2) {
      + .markdown-xl :where(h2) {

      ---

      - .prose-xl :where(h3) {
      + .markdown-xl :where(h3) {

      ---

      - .prose-xl :where(h4) {
      + .markdown-xl :where(h4) {

      ---

      - .prose-xl :where(img) {
      + .markdown-xl :where(img) {

      ---

      - .prose-xl :where(video) {
      + .markdown-xl :where(video) {

      ---

      - .prose-xl :where(figure) {
      + .markdown-xl :where(figure) {

      ---

      - .prose-xl :where(figure > *) {
      + .markdown-xl :where(figure > *) {

      ---

      - .prose-xl :where(figure figcaption) {
      + .markdown-xl :where(figure figcaption) {

      ---

      - .prose-xl :where(code) {
      + .markdown-xl :where(code) {

      ---

      - .prose-xl :where(h2 code) {
      + .markdown-xl :where(h2 code) {

      ---

      - .prose-xl :where(h3 code) {
      + .markdown-xl :where(h3 code) {

      ---

      - .prose-xl :where(pre) {
      + .markdown-xl :where(pre) {

      ---

      - .prose-xl :where(ol) {
      + .markdown-xl :where(ol) {

      ---

      - .prose-xl :where(ul) {
      + .markdown-xl :where(ul) {

      ---

      - .prose-xl :where(li) {
      + .markdown-xl :where(li) {

      ---

      - .prose-xl :where(ol > li) {
      + .markdown-xl :where(ol > li) {

      ---

      - .prose-xl :where(ol > li)::before {
      + .markdown-xl :where(ol > li)::before {

      ---

      - .prose-xl :where(ul > li) {
      + .markdown-xl :where(ul > li) {

      ---

      - .prose-xl :where(ul > li)::before {
      + .markdown-xl :where(ul > li)::before {

      ---

      - .prose-xl :where(> ul > li p) {
      + .markdown-xl :where(> ul > li p) {

      ---

      - .prose-xl :where(> ul > li > *:first-child) {
      + .markdown-xl :where(> ul > li > *:first-child) {

      ---

      - .prose-xl :where(> ul > li > *:last-child) {
      + .markdown-xl :where(> ul > li > *:last-child) {

      ---

      - .prose-xl :where(> ol > li > *:first-child) {
      + .markdown-xl :where(> ol > li > *:first-child) {

      ---

      - .prose-xl :where(> ol > li > *:last-child) {
      + .markdown-xl :where(> ol > li > *:last-child) {

      ---

      - .prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      + .markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      - .prose-xl :where(hr) {
      + .markdown-xl :where(hr) {

      ---

      - .prose-xl :where(hr + *) {
      + .markdown-xl :where(hr + *) {

      ---

      - .prose-xl :where(h2 + *) {
      + .markdown-xl :where(h2 + *) {

      ---

      - .prose-xl :where(h3 + *) {
      + .markdown-xl :where(h3 + *) {

      ---

      - .prose-xl :where(h4 + *) {
      + .markdown-xl :where(h4 + *) {

      ---

      - .prose-xl :where(table) {
      + .markdown-xl :where(table) {

      ---

      - .prose-xl :where(thead th) {
      + .markdown-xl :where(thead th) {

      ---

      - .prose-xl :where(thead th:first-child) {
      + .markdown-xl :where(thead th:first-child) {

      ---

      - .prose-xl :where(thead th:last-child) {
      + .markdown-xl :where(thead th:last-child) {

      ---

      - .prose-xl :where(tbody td) {
      + .markdown-xl :where(tbody td) {

      ---

      - .prose-xl :where(tbody td:first-child) {
      + .markdown-xl :where(tbody td:first-child) {

      ---

      - .prose-xl :where(tbody td:last-child) {
      + .markdown-xl :where(tbody td:last-child) {

      ---

      - .prose-xl :where(> :first-child) {
      + .markdown-xl :where(> :first-child) {

      ---

      - .prose-xl :where(> :last-child) {
      + .markdown-xl :where(> :last-child) {

      ---

      - .prose-2xl {
      + .markdown-2xl {

      ---

      - .prose-2xl :where(p) {
      + .markdown-2xl :where(p) {

      ---

      - .prose-2xl :where([class~='lead']) {
      + .markdown-2xl :where([class~='lead']) {

      ---

      - .prose-2xl :where(blockquote) {
      + .markdown-2xl :where(blockquote) {

      ---

      - .prose-2xl :where(h1) {
      + .markdown-2xl :where(h1) {

      ---

      - .prose-2xl :where(h2) {
      + .markdown-2xl :where(h2) {

      ---

      - .prose-2xl :where(h3) {
      + .markdown-2xl :where(h3) {

      ---

      - .prose-2xl :where(h4) {
      + .markdown-2xl :where(h4) {

      ---

      - .prose-2xl :where(img) {
      + .markdown-2xl :where(img) {

      ---

      - .prose-2xl :where(video) {
      + .markdown-2xl :where(video) {

      ---

      - .prose-2xl :where(figure) {
      + .markdown-2xl :where(figure) {

      ---

      - .prose-2xl :where(figure > *) {
      + .markdown-2xl :where(figure > *) {

      ---

      - .prose-2xl :where(figure figcaption) {
      + .markdown-2xl :where(figure figcaption) {

      ---

      - .prose-2xl :where(code) {
      + .markdown-2xl :where(code) {

      ---

      - .prose-2xl :where(h2 code) {
      + .markdown-2xl :where(h2 code) {

      ---

      - .prose-2xl :where(h3 code) {
      + .markdown-2xl :where(h3 code) {

      ---

      - .prose-2xl :where(pre) {
      + .markdown-2xl :where(pre) {

      ---

      - .prose-2xl :where(ol) {
      + .markdown-2xl :where(ol) {

      ---

      - .prose-2xl :where(ul) {
      + .markdown-2xl :where(ul) {

      ---

      - .prose-2xl :where(li) {
      + .markdown-2xl :where(li) {

      ---

      - .prose-2xl :where(ol > li) {
      + .markdown-2xl :where(ol > li) {

      ---

      - .prose-2xl :where(ol > li)::before {
      + .markdown-2xl :where(ol > li)::before {

      ---

      - .prose-2xl :where(ul > li) {
      + .markdown-2xl :where(ul > li) {

      ---

      - .prose-2xl :where(ul > li)::before {
      + .markdown-2xl :where(ul > li)::before {

      ---

      - .prose-2xl :where(> ul > li p) {
      + .markdown-2xl :where(> ul > li p) {

      ---

      - .prose-2xl :where(> ul > li > *:first-child) {
      + .markdown-2xl :where(> ul > li > *:first-child) {

      ---

      - .prose-2xl :where(> ul > li > *:last-child) {
      + .markdown-2xl :where(> ul > li > *:last-child) {

      ---

      - .prose-2xl :where(> ol > li > *:first-child) {
      + .markdown-2xl :where(> ol > li > *:first-child) {

      ---

      - .prose-2xl :where(> ol > li > *:last-child) {
      + .markdown-2xl :where(> ol > li > *:last-child) {

      ---

      - .prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      + .markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      - .prose-2xl :where(hr) {
      + .markdown-2xl :where(hr) {

      ---

      - .prose-2xl :where(hr + *) {
      + .markdown-2xl :where(hr + *) {

      ---

      - .prose-2xl :where(h2 + *) {
      + .markdown-2xl :where(h2 + *) {

      ---

      - .prose-2xl :where(h3 + *) {
      + .markdown-2xl :where(h3 + *) {

      ---

      - .prose-2xl :where(h4 + *) {
      + .markdown-2xl :where(h4 + *) {

      ---

      - .prose-2xl :where(table) {
      + .markdown-2xl :where(table) {

      ---

      - .prose-2xl :where(thead th) {
      + .markdown-2xl :where(thead th) {

      ---

      - .prose-2xl :where(thead th:first-child) {
      + .markdown-2xl :where(thead th:first-child) {

      ---

      - .prose-2xl :where(thead th:last-child) {
      + .markdown-2xl :where(thead th:last-child) {

      ---

      - .prose-2xl :where(tbody td) {
      + .markdown-2xl :where(tbody td) {

      ---

      - .prose-2xl :where(tbody td:first-child) {
      + .markdown-2xl :where(tbody td:first-child) {

      ---

      - .prose-2xl :where(tbody td:last-child) {
      + .markdown-2xl :where(tbody td:last-child) {

      ---

      - .prose-2xl :where(> :first-child) {
      + .markdown-2xl :where(> :first-child) {

      ---

      - .prose-2xl :where(> :last-child) {
      + .markdown-2xl :where(> :last-child) {

      ---

      - .prose-red :where(a) {
      + .markdown-red :where(a) {

      ---

      - .prose-red :where(a code) {
      + .markdown-red :where(a code) {

      ---

      - .prose-yellow :where(a) {
      + .markdown-yellow :where(a) {

      ---

      - .prose-yellow :where(a code) {
      + .markdown-yellow :where(a code) {

      ---

      - .prose-green :where(a) {
      + .markdown-green :where(a) {

      ---

      - .prose-green :where(a code) {
      + .markdown-green :where(a code) {

      ---

      - .prose-blue :where(a) {
      + .markdown-blue :where(a) {

      ---

      - .prose-blue :where(a code) {
      + .markdown-blue :where(a code) {

      ---

      - .prose-indigo :where(a) {
      + .markdown-indigo :where(a) {

      ---

      - .prose-indigo :where(a code) {
      + .markdown-indigo :where(a code) {

      ---

      - .prose-purple :where(a) {
      + .markdown-purple :where(a) {

      ---

      - .prose-purple :where(a code) {
      + .markdown-purple :where(a code) {

      ---

      - .prose-pink :where(a) {
      + .markdown-pink :where(a) {

      ---

      - .prose-pink :where(a code) {
      + .markdown-pink :where(a code) {

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose :where([class~='lead']) {
      +   .sm\\\\:markdown :where([class~='lead']) {

      ---

      -   .sm\\\\:prose :where(a) {
      +   .sm\\\\:markdown :where(a) {

      ---

      -   .sm\\\\:prose :where(strong) {
      +   .sm\\\\:markdown :where(strong) {

      ---

      -   .sm\\\\:prose :where(ol[type='A']) {
      +   .sm\\\\:markdown :where(ol[type='A']) {

      ---

      -   .sm\\\\:prose :where(ol[type='a']) {
      +   .sm\\\\:markdown :where(ol[type='a']) {

      ---

      -   .sm\\\\:prose :where(ol[type='A' s]) {
      +   .sm\\\\:markdown :where(ol[type='A' s]) {

      ---

      -   .sm\\\\:prose :where(ol[type='a' s]) {
      +   .sm\\\\:markdown :where(ol[type='a' s]) {

      ---

      -   .sm\\\\:prose :where(ol[type='I']) {
      +   .sm\\\\:markdown :where(ol[type='I']) {

      ---

      -   .sm\\\\:prose :where(ol[type='i']) {
      +   .sm\\\\:markdown :where(ol[type='i']) {

      ---

      -   .sm\\\\:prose :where(ol[type='I' s]) {
      +   .sm\\\\:markdown :where(ol[type='I' s]) {

      ---

      -   .sm\\\\:prose :where(ol[type='i' s]) {
      +   .sm\\\\:markdown :where(ol[type='i' s]) {

      ---

      -   .sm\\\\:prose :where(ol[type='1']) {
      +   .sm\\\\:markdown :where(ol[type='1']) {

      ---

      -   .sm\\\\:prose :where(ol > li) {
      +   .sm\\\\:markdown :where(ol > li) {

      ---

      -   .sm\\\\:prose :where(ol > li)::before {
      +   .sm\\\\:markdown :where(ol > li)::before {

      ---

      -   .sm\\\\:prose :where(ul > li) {
      +   .sm\\\\:markdown :where(ul > li) {

      ---

      -   .sm\\\\:prose :where(ul > li)::before {
      +   .sm\\\\:markdown :where(ul > li)::before {

      ---

      -   .sm\\\\:prose :where(hr) {
      +   .sm\\\\:markdown :where(hr) {

      ---

      -   .sm\\\\:prose :where(blockquote) {
      +   .sm\\\\:markdown :where(blockquote) {

      ---

      -   .sm\\\\:prose :where(blockquote p:first-of-type)::before {
      +   .sm\\\\:markdown :where(blockquote p:first-of-type)::before {

      ---

      -   .sm\\\\:prose :where(blockquote p:last-of-type)::after {
      +   .sm\\\\:markdown :where(blockquote p:last-of-type)::after {

      ---

      -   .sm\\\\:prose :where(h1) {
      +   .sm\\\\:markdown :where(h1) {

      ---

      -   .sm\\\\:prose :where(h1 strong) {
      +   .sm\\\\:markdown :where(h1 strong) {

      ---

      -   .sm\\\\:prose :where(h2) {
      +   .sm\\\\:markdown :where(h2) {

      ---

      -   .sm\\\\:prose :where(h2 strong) {
      +   .sm\\\\:markdown :where(h2 strong) {

      ---

      -   .sm\\\\:prose :where(h3) {
      +   .sm\\\\:markdown :where(h3) {

      ---

      -   .sm\\\\:prose :where(h3 strong) {
      +   .sm\\\\:markdown :where(h3 strong) {

      ---

      -   .sm\\\\:prose :where(h4) {
      +   .sm\\\\:markdown :where(h4) {

      ---

      -   .sm\\\\:prose :where(h4 strong) {
      +   .sm\\\\:markdown :where(h4 strong) {

      ---

      -   .sm\\\\:prose :where(figure figcaption) {
      +   .sm\\\\:markdown :where(figure figcaption) {

      ---

      -   .sm\\\\:prose :where(code) {
      +   .sm\\\\:markdown :where(code) {

      ---

      -   .sm\\\\:prose :where(code)::before {
      +   .sm\\\\:markdown :where(code)::before {

      ---

      -   .sm\\\\:prose :where(code)::after {
      +   .sm\\\\:markdown :where(code)::after {

      ---

      -   .sm\\\\:prose :where(a code) {
      +   .sm\\\\:markdown :where(a code) {

      ---

      -   .sm\\\\:prose :where(pre) {
      +   .sm\\\\:markdown :where(pre) {

      ---

      -   .sm\\\\:prose :where(pre code) {
      +   .sm\\\\:markdown :where(pre code) {

      ---

      -   .sm\\\\:prose :where(pre code)::before {
      +   .sm\\\\:markdown :where(pre code)::before {

      ---

      -   .sm\\\\:prose :where(pre code)::after {
      +   .sm\\\\:markdown :where(pre code)::after {

      ---

      -   .sm\\\\:prose :where(table) {
      +   .sm\\\\:markdown :where(table) {

      ---

      -   .sm\\\\:prose :where(thead) {
      +   .sm\\\\:markdown :where(thead) {

      ---

      -   .sm\\\\:prose :where(thead th) {
      +   .sm\\\\:markdown :where(thead th) {

      ---

      -   .sm\\\\:prose :where(tbody tr) {
      +   .sm\\\\:markdown :where(tbody tr) {

      ---

      -   .sm\\\\:prose :where(tbody tr:last-child) {
      +   .sm\\\\:markdown :where(tbody tr:last-child) {

      ---

      -   .sm\\\\:prose :where(tbody td) {
      +   .sm\\\\:markdown :where(tbody td) {

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose :where(p) {
      +   .sm\\\\:markdown :where(p) {

      ---

      -   .sm\\\\:prose :where(img) {
      +   .sm\\\\:markdown :where(img) {

      ---

      -   .sm\\\\:prose :where(video) {
      +   .sm\\\\:markdown :where(video) {

      ---

      -   .sm\\\\:prose :where(figure) {
      +   .sm\\\\:markdown :where(figure) {

      ---

      -   .sm\\\\:prose :where(figure > *) {
      +   .sm\\\\:markdown :where(figure > *) {

      ---

      -   .sm\\\\:prose :where(h2 code) {
      +   .sm\\\\:markdown :where(h2 code) {

      ---

      -   .sm\\\\:prose :where(h3 code) {
      +   .sm\\\\:markdown :where(h3 code) {

      ---

      -   .sm\\\\:prose :where(ol) {
      +   .sm\\\\:markdown :where(ol) {

      ---

      -   .sm\\\\:prose :where(ul) {
      +   .sm\\\\:markdown :where(ul) {

      ---

      -   .sm\\\\:prose :where(li) {
      +   .sm\\\\:markdown :where(li) {

      ---

      -   .sm\\\\:prose :where(> ul > li p) {
      +   .sm\\\\:markdown :where(> ul > li p) {

      ---

      -   .sm\\\\:prose :where(> ul > li > *:first-child) {
      +   .sm\\\\:markdown :where(> ul > li > *:first-child) {

      ---

      -   .sm\\\\:prose :where(> ul > li > *:last-child) {
      +   .sm\\\\:markdown :where(> ul > li > *:last-child) {

      ---

      -   .sm\\\\:prose :where(> ol > li > *:first-child) {
      +   .sm\\\\:markdown :where(> ol > li > *:first-child) {

      ---

      -   .sm\\\\:prose :where(> ol > li > *:last-child) {
      +   .sm\\\\:markdown :where(> ol > li > *:last-child) {

      ---

      -   .sm\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
      +   .sm\\\\:markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .sm\\\\:prose :where(hr + *) {
      +   .sm\\\\:markdown :where(hr + *) {

      ---

      -   .sm\\\\:prose :where(h2 + *) {
      +   .sm\\\\:markdown :where(h2 + *) {

      ---

      -   .sm\\\\:prose :where(h3 + *) {
      +   .sm\\\\:markdown :where(h3 + *) {

      ---

      -   .sm\\\\:prose :where(h4 + *) {
      +   .sm\\\\:markdown :where(h4 + *) {

      ---

      -   .sm\\\\:prose :where(thead th:first-child) {
      +   .sm\\\\:markdown :where(thead th:first-child) {

      ---

      -   .sm\\\\:prose :where(thead th:last-child) {
      +   .sm\\\\:markdown :where(thead th:last-child) {

      ---

      -   .sm\\\\:prose :where(tbody td:first-child) {
      +   .sm\\\\:markdown :where(tbody td:first-child) {

      ---

      -   .sm\\\\:prose :where(tbody td:last-child) {
      +   .sm\\\\:markdown :where(tbody td:last-child) {

      ---

      -   .sm\\\\:prose :where(> :first-child) {
      +   .sm\\\\:markdown :where(> :first-child) {

      ---

      -   .sm\\\\:prose :where(> :last-child) {
      +   .sm\\\\:markdown :where(> :last-child) {

      ---

      -   .sm\\\\:prose-sm {
      +   .sm\\\\:markdown-sm {

      ---

      -   .sm\\\\:prose-sm :where(p) {
      +   .sm\\\\:markdown-sm :where(p) {

      ---

      -   .sm\\\\:prose-sm :where([class~='lead']) {
      +   .sm\\\\:markdown-sm :where([class~='lead']) {

      ---

      -   .sm\\\\:prose-sm :where(blockquote) {
      +   .sm\\\\:markdown-sm :where(blockquote) {

      ---

      -   .sm\\\\:prose-sm :where(h1) {
      +   .sm\\\\:markdown-sm :where(h1) {

      ---

      -   .sm\\\\:prose-sm :where(h2) {
      +   .sm\\\\:markdown-sm :where(h2) {

      ---

      -   .sm\\\\:prose-sm :where(h3) {
      +   .sm\\\\:markdown-sm :where(h3) {

      ---

      -   .sm\\\\:prose-sm :where(h4) {
      +   .sm\\\\:markdown-sm :where(h4) {

      ---

      -   .sm\\\\:prose-sm :where(img) {
      +   .sm\\\\:markdown-sm :where(img) {

      ---

      -   .sm\\\\:prose-sm :where(video) {
      +   .sm\\\\:markdown-sm :where(video) {

      ---

      -   .sm\\\\:prose-sm :where(figure) {
      +   .sm\\\\:markdown-sm :where(figure) {

      ---

      -   .sm\\\\:prose-sm :where(figure > *) {
      +   .sm\\\\:markdown-sm :where(figure > *) {

      ---

      -   .sm\\\\:prose-sm :where(figure figcaption) {
      +   .sm\\\\:markdown-sm :where(figure figcaption) {

      ---

      -   .sm\\\\:prose-sm :where(code) {
      +   .sm\\\\:markdown-sm :where(code) {

      ---

      -   .sm\\\\:prose-sm :where(h2 code) {
      +   .sm\\\\:markdown-sm :where(h2 code) {

      ---

      -   .sm\\\\:prose-sm :where(h3 code) {
      +   .sm\\\\:markdown-sm :where(h3 code) {

      ---

      -   .sm\\\\:prose-sm :where(pre) {
      +   .sm\\\\:markdown-sm :where(pre) {

      ---

      -   .sm\\\\:prose-sm :where(ol) {
      +   .sm\\\\:markdown-sm :where(ol) {

      ---

      -   .sm\\\\:prose-sm :where(ul) {
      +   .sm\\\\:markdown-sm :where(ul) {

      ---

      -   .sm\\\\:prose-sm :where(li) {
      +   .sm\\\\:markdown-sm :where(li) {

      ---

      -   .sm\\\\:prose-sm :where(ol > li) {
      +   .sm\\\\:markdown-sm :where(ol > li) {

      ---

      -   .sm\\\\:prose-sm :where(ol > li)::before {
      +   .sm\\\\:markdown-sm :where(ol > li)::before {

      ---

      -   .sm\\\\:prose-sm :where(ul > li) {
      +   .sm\\\\:markdown-sm :where(ul > li) {

      ---

      -   .sm\\\\:prose-sm :where(ul > li)::before {
      +   .sm\\\\:markdown-sm :where(ul > li)::before {

      ---

      -   .sm\\\\:prose-sm :where(> ul > li p) {
      +   .sm\\\\:markdown-sm :where(> ul > li p) {

      ---

      -   .sm\\\\:prose-sm :where(> ul > li > *:first-child) {
      +   .sm\\\\:markdown-sm :where(> ul > li > *:first-child) {

      ---

      -   .sm\\\\:prose-sm :where(> ul > li > *:last-child) {
      +   .sm\\\\:markdown-sm :where(> ul > li > *:last-child) {

      ---

      -   .sm\\\\:prose-sm :where(> ol > li > *:first-child) {
      +   .sm\\\\:markdown-sm :where(> ol > li > *:first-child) {

      ---

      -   .sm\\\\:prose-sm :where(> ol > li > *:last-child) {
      +   .sm\\\\:markdown-sm :where(> ol > li > *:last-child) {

      ---

      -   .sm\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      +   .sm\\\\:markdown-sm :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .sm\\\\:prose-sm :where(hr) {
      +   .sm\\\\:markdown-sm :where(hr) {

      ---

      -   .sm\\\\:prose-sm :where(hr + *) {
      +   .sm\\\\:markdown-sm :where(hr + *) {

      ---

      -   .sm\\\\:prose-sm :where(h2 + *) {
      +   .sm\\\\:markdown-sm :where(h2 + *) {

      ---

      -   .sm\\\\:prose-sm :where(h3 + *) {
      +   .sm\\\\:markdown-sm :where(h3 + *) {

      ---

      -   .sm\\\\:prose-sm :where(h4 + *) {
      +   .sm\\\\:markdown-sm :where(h4 + *) {

      ---

      -   .sm\\\\:prose-sm :where(table) {
      +   .sm\\\\:markdown-sm :where(table) {

      ---

      -   .sm\\\\:prose-sm :where(thead th) {
      +   .sm\\\\:markdown-sm :where(thead th) {

      ---

      -   .sm\\\\:prose-sm :where(thead th:first-child) {
      +   .sm\\\\:markdown-sm :where(thead th:first-child) {

      ---

      -   .sm\\\\:prose-sm :where(thead th:last-child) {
      +   .sm\\\\:markdown-sm :where(thead th:last-child) {

      ---

      -   .sm\\\\:prose-sm :where(tbody td) {
      +   .sm\\\\:markdown-sm :where(tbody td) {

      ---

      -   .sm\\\\:prose-sm :where(tbody td:first-child) {
      +   .sm\\\\:markdown-sm :where(tbody td:first-child) {

      ---

      -   .sm\\\\:prose-sm :where(tbody td:last-child) {
      +   .sm\\\\:markdown-sm :where(tbody td:last-child) {

      ---

      -   .sm\\\\:prose-sm :where(> :first-child) {
      +   .sm\\\\:markdown-sm :where(> :first-child) {

      ---

      -   .sm\\\\:prose-sm :where(> :last-child) {
      +   .sm\\\\:markdown-sm :where(> :last-child) {

      ---

      -   .sm\\\\:prose-lg {
      +   .sm\\\\:markdown-lg {

      ---

      -   .sm\\\\:prose-lg :where(p) {
      +   .sm\\\\:markdown-lg :where(p) {

      ---

      -   .sm\\\\:prose-lg :where([class~='lead']) {
      +   .sm\\\\:markdown-lg :where([class~='lead']) {

      ---

      -   .sm\\\\:prose-lg :where(blockquote) {
      +   .sm\\\\:markdown-lg :where(blockquote) {

      ---

      -   .sm\\\\:prose-lg :where(h1) {
      +   .sm\\\\:markdown-lg :where(h1) {

      ---

      -   .sm\\\\:prose-lg :where(h2) {
      +   .sm\\\\:markdown-lg :where(h2) {

      ---

      -   .sm\\\\:prose-lg :where(h3) {
      +   .sm\\\\:markdown-lg :where(h3) {

      ---

      -   .sm\\\\:prose-lg :where(h4) {
      +   .sm\\\\:markdown-lg :where(h4) {

      ---

      -   .sm\\\\:prose-lg :where(img) {
      +   .sm\\\\:markdown-lg :where(img) {

      ---

      -   .sm\\\\:prose-lg :where(video) {
      +   .sm\\\\:markdown-lg :where(video) {

      ---

      -   .sm\\\\:prose-lg :where(figure) {
      +   .sm\\\\:markdown-lg :where(figure) {

      ---

      -   .sm\\\\:prose-lg :where(figure > *) {
      +   .sm\\\\:markdown-lg :where(figure > *) {

      ---

      -   .sm\\\\:prose-lg :where(figure figcaption) {
      +   .sm\\\\:markdown-lg :where(figure figcaption) {

      ---

      -   .sm\\\\:prose-lg :where(code) {
      +   .sm\\\\:markdown-lg :where(code) {

      ---

      -   .sm\\\\:prose-lg :where(h2 code) {
      +   .sm\\\\:markdown-lg :where(h2 code) {

      ---

      -   .sm\\\\:prose-lg :where(h3 code) {
      +   .sm\\\\:markdown-lg :where(h3 code) {

      ---

      -   .sm\\\\:prose-lg :where(pre) {
      +   .sm\\\\:markdown-lg :where(pre) {

      ---

      -   .sm\\\\:prose-lg :where(ol) {
      +   .sm\\\\:markdown-lg :where(ol) {

      ---

      -   .sm\\\\:prose-lg :where(ul) {
      +   .sm\\\\:markdown-lg :where(ul) {

      ---

      -   .sm\\\\:prose-lg :where(li) {
      +   .sm\\\\:markdown-lg :where(li) {

      ---

      -   .sm\\\\:prose-lg :where(ol > li) {
      +   .sm\\\\:markdown-lg :where(ol > li) {

      ---

      -   .sm\\\\:prose-lg :where(ol > li)::before {
      +   .sm\\\\:markdown-lg :where(ol > li)::before {

      ---

      -   .sm\\\\:prose-lg :where(ul > li) {
      +   .sm\\\\:markdown-lg :where(ul > li) {

      ---

      -   .sm\\\\:prose-lg :where(ul > li)::before {
      +   .sm\\\\:markdown-lg :where(ul > li)::before {

      ---

      -   .sm\\\\:prose-lg :where(> ul > li p) {
      +   .sm\\\\:markdown-lg :where(> ul > li p) {

      ---

      -   .sm\\\\:prose-lg :where(> ul > li > *:first-child) {
      +   .sm\\\\:markdown-lg :where(> ul > li > *:first-child) {

      ---

      -   .sm\\\\:prose-lg :where(> ul > li > *:last-child) {
      +   .sm\\\\:markdown-lg :where(> ul > li > *:last-child) {

      ---

      -   .sm\\\\:prose-lg :where(> ol > li > *:first-child) {
      +   .sm\\\\:markdown-lg :where(> ol > li > *:first-child) {

      ---

      -   .sm\\\\:prose-lg :where(> ol > li > *:last-child) {
      +   .sm\\\\:markdown-lg :where(> ol > li > *:last-child) {

      ---

      -   .sm\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      +   .sm\\\\:markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .sm\\\\:prose-lg :where(hr) {
      +   .sm\\\\:markdown-lg :where(hr) {

      ---

      -   .sm\\\\:prose-lg :where(hr + *) {
      +   .sm\\\\:markdown-lg :where(hr + *) {

      ---

      -   .sm\\\\:prose-lg :where(h2 + *) {
      +   .sm\\\\:markdown-lg :where(h2 + *) {

      ---

      -   .sm\\\\:prose-lg :where(h3 + *) {
      +   .sm\\\\:markdown-lg :where(h3 + *) {

      ---

      -   .sm\\\\:prose-lg :where(h4 + *) {
      +   .sm\\\\:markdown-lg :where(h4 + *) {

      ---

      -   .sm\\\\:prose-lg :where(table) {
      +   .sm\\\\:markdown-lg :where(table) {

      ---

      -   .sm\\\\:prose-lg :where(thead th) {
      +   .sm\\\\:markdown-lg :where(thead th) {

      ---

      -   .sm\\\\:prose-lg :where(thead th:first-child) {
      +   .sm\\\\:markdown-lg :where(thead th:first-child) {

      ---

      -   .sm\\\\:prose-lg :where(thead th:last-child) {
      +   .sm\\\\:markdown-lg :where(thead th:last-child) {

      ---

      -   .sm\\\\:prose-lg :where(tbody td) {
      +   .sm\\\\:markdown-lg :where(tbody td) {

      ---

      -   .sm\\\\:prose-lg :where(tbody td:first-child) {
      +   .sm\\\\:markdown-lg :where(tbody td:first-child) {

      ---

      -   .sm\\\\:prose-lg :where(tbody td:last-child) {
      +   .sm\\\\:markdown-lg :where(tbody td:last-child) {

      ---

      -   .sm\\\\:prose-lg :where(> :first-child) {
      +   .sm\\\\:markdown-lg :where(> :first-child) {

      ---

      -   .sm\\\\:prose-lg :where(> :last-child) {
      +   .sm\\\\:markdown-lg :where(> :last-child) {

      ---

      -   .sm\\\\:prose-xl {
      +   .sm\\\\:markdown-xl {

      ---

      -   .sm\\\\:prose-xl :where(p) {
      +   .sm\\\\:markdown-xl :where(p) {

      ---

      -   .sm\\\\:prose-xl :where([class~='lead']) {
      +   .sm\\\\:markdown-xl :where([class~='lead']) {

      ---

      -   .sm\\\\:prose-xl :where(blockquote) {
      +   .sm\\\\:markdown-xl :where(blockquote) {

      ---

      -   .sm\\\\:prose-xl :where(h1) {
      +   .sm\\\\:markdown-xl :where(h1) {

      ---

      -   .sm\\\\:prose-xl :where(h2) {
      +   .sm\\\\:markdown-xl :where(h2) {

      ---

      -   .sm\\\\:prose-xl :where(h3) {
      +   .sm\\\\:markdown-xl :where(h3) {

      ---

      -   .sm\\\\:prose-xl :where(h4) {
      +   .sm\\\\:markdown-xl :where(h4) {

      ---

      -   .sm\\\\:prose-xl :where(img) {
      +   .sm\\\\:markdown-xl :where(img) {

      ---

      -   .sm\\\\:prose-xl :where(video) {
      +   .sm\\\\:markdown-xl :where(video) {

      ---

      -   .sm\\\\:prose-xl :where(figure) {
      +   .sm\\\\:markdown-xl :where(figure) {

      ---

      -   .sm\\\\:prose-xl :where(figure > *) {
      +   .sm\\\\:markdown-xl :where(figure > *) {

      ---

      -   .sm\\\\:prose-xl :where(figure figcaption) {
      +   .sm\\\\:markdown-xl :where(figure figcaption) {

      ---

      -   .sm\\\\:prose-xl :where(code) {
      +   .sm\\\\:markdown-xl :where(code) {

      ---

      -   .sm\\\\:prose-xl :where(h2 code) {
      +   .sm\\\\:markdown-xl :where(h2 code) {

      ---

      -   .sm\\\\:prose-xl :where(h3 code) {
      +   .sm\\\\:markdown-xl :where(h3 code) {

      ---

      -   .sm\\\\:prose-xl :where(pre) {
      +   .sm\\\\:markdown-xl :where(pre) {

      ---

      -   .sm\\\\:prose-xl :where(ol) {
      +   .sm\\\\:markdown-xl :where(ol) {

      ---

      -   .sm\\\\:prose-xl :where(ul) {
      +   .sm\\\\:markdown-xl :where(ul) {

      ---

      -   .sm\\\\:prose-xl :where(li) {
      +   .sm\\\\:markdown-xl :where(li) {

      ---

      -   .sm\\\\:prose-xl :where(ol > li) {
      +   .sm\\\\:markdown-xl :where(ol > li) {

      ---

      -   .sm\\\\:prose-xl :where(ol > li)::before {
      +   .sm\\\\:markdown-xl :where(ol > li)::before {

      ---

      -   .sm\\\\:prose-xl :where(ul > li) {
      +   .sm\\\\:markdown-xl :where(ul > li) {

      ---

      -   .sm\\\\:prose-xl :where(ul > li)::before {
      +   .sm\\\\:markdown-xl :where(ul > li)::before {

      ---

      -   .sm\\\\:prose-xl :where(> ul > li p) {
      +   .sm\\\\:markdown-xl :where(> ul > li p) {

      ---

      -   .sm\\\\:prose-xl :where(> ul > li > *:first-child) {
      +   .sm\\\\:markdown-xl :where(> ul > li > *:first-child) {

      ---

      -   .sm\\\\:prose-xl :where(> ul > li > *:last-child) {
      +   .sm\\\\:markdown-xl :where(> ul > li > *:last-child) {

      ---

      -   .sm\\\\:prose-xl :where(> ol > li > *:first-child) {
      +   .sm\\\\:markdown-xl :where(> ol > li > *:first-child) {

      ---

      -   .sm\\\\:prose-xl :where(> ol > li > *:last-child) {
      +   .sm\\\\:markdown-xl :where(> ol > li > *:last-child) {

      ---

      -   .sm\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .sm\\\\:markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .sm\\\\:prose-xl :where(hr) {
      +   .sm\\\\:markdown-xl :where(hr) {

      ---

      -   .sm\\\\:prose-xl :where(hr + *) {
      +   .sm\\\\:markdown-xl :where(hr + *) {

      ---

      -   .sm\\\\:prose-xl :where(h2 + *) {
      +   .sm\\\\:markdown-xl :where(h2 + *) {

      ---

      -   .sm\\\\:prose-xl :where(h3 + *) {
      +   .sm\\\\:markdown-xl :where(h3 + *) {

      ---

      -   .sm\\\\:prose-xl :where(h4 + *) {
      +   .sm\\\\:markdown-xl :where(h4 + *) {

      ---

      -   .sm\\\\:prose-xl :where(table) {
      +   .sm\\\\:markdown-xl :where(table) {

      ---

      -   .sm\\\\:prose-xl :where(thead th) {
      +   .sm\\\\:markdown-xl :where(thead th) {

      ---

      -   .sm\\\\:prose-xl :where(thead th:first-child) {
      +   .sm\\\\:markdown-xl :where(thead th:first-child) {

      ---

      -   .sm\\\\:prose-xl :where(thead th:last-child) {
      +   .sm\\\\:markdown-xl :where(thead th:last-child) {

      ---

      -   .sm\\\\:prose-xl :where(tbody td) {
      +   .sm\\\\:markdown-xl :where(tbody td) {

      ---

      -   .sm\\\\:prose-xl :where(tbody td:first-child) {
      +   .sm\\\\:markdown-xl :where(tbody td:first-child) {

      ---

      -   .sm\\\\:prose-xl :where(tbody td:last-child) {
      +   .sm\\\\:markdown-xl :where(tbody td:last-child) {

      ---

      -   .sm\\\\:prose-xl :where(> :first-child) {
      +   .sm\\\\:markdown-xl :where(> :first-child) {

      ---

      -   .sm\\\\:prose-xl :where(> :last-child) {
      +   .sm\\\\:markdown-xl :where(> :last-child) {

      ---

      -   .sm\\\\:prose-2xl {
      +   .sm\\\\:markdown-2xl {

      ---

      -   .sm\\\\:prose-2xl :where(p) {
      +   .sm\\\\:markdown-2xl :where(p) {

      ---

      -   .sm\\\\:prose-2xl :where([class~='lead']) {
      +   .sm\\\\:markdown-2xl :where([class~='lead']) {

      ---

      -   .sm\\\\:prose-2xl :where(blockquote) {
      +   .sm\\\\:markdown-2xl :where(blockquote) {

      ---

      -   .sm\\\\:prose-2xl :where(h1) {
      +   .sm\\\\:markdown-2xl :where(h1) {

      ---

      -   .sm\\\\:prose-2xl :where(h2) {
      +   .sm\\\\:markdown-2xl :where(h2) {

      ---

      -   .sm\\\\:prose-2xl :where(h3) {
      +   .sm\\\\:markdown-2xl :where(h3) {

      ---

      -   .sm\\\\:prose-2xl :where(h4) {
      +   .sm\\\\:markdown-2xl :where(h4) {

      ---

      -   .sm\\\\:prose-2xl :where(img) {
      +   .sm\\\\:markdown-2xl :where(img) {

      ---

      -   .sm\\\\:prose-2xl :where(video) {
      +   .sm\\\\:markdown-2xl :where(video) {

      ---

      -   .sm\\\\:prose-2xl :where(figure) {
      +   .sm\\\\:markdown-2xl :where(figure) {

      ---

      -   .sm\\\\:prose-2xl :where(figure > *) {
      +   .sm\\\\:markdown-2xl :where(figure > *) {

      ---

      -   .sm\\\\:prose-2xl :where(figure figcaption) {
      +   .sm\\\\:markdown-2xl :where(figure figcaption) {

      ---

      -   .sm\\\\:prose-2xl :where(code) {
      +   .sm\\\\:markdown-2xl :where(code) {

      ---

      -   .sm\\\\:prose-2xl :where(h2 code) {
      +   .sm\\\\:markdown-2xl :where(h2 code) {

      ---

      -   .sm\\\\:prose-2xl :where(h3 code) {
      +   .sm\\\\:markdown-2xl :where(h3 code) {

      ---

      -   .sm\\\\:prose-2xl :where(pre) {
      +   .sm\\\\:markdown-2xl :where(pre) {

      ---

      -   .sm\\\\:prose-2xl :where(ol) {
      +   .sm\\\\:markdown-2xl :where(ol) {

      ---

      -   .sm\\\\:prose-2xl :where(ul) {
      +   .sm\\\\:markdown-2xl :where(ul) {

      ---

      -   .sm\\\\:prose-2xl :where(li) {
      +   .sm\\\\:markdown-2xl :where(li) {

      ---

      -   .sm\\\\:prose-2xl :where(ol > li) {
      +   .sm\\\\:markdown-2xl :where(ol > li) {

      ---

      -   .sm\\\\:prose-2xl :where(ol > li)::before {
      +   .sm\\\\:markdown-2xl :where(ol > li)::before {

      ---

      -   .sm\\\\:prose-2xl :where(ul > li) {
      +   .sm\\\\:markdown-2xl :where(ul > li) {

      ---

      -   .sm\\\\:prose-2xl :where(ul > li)::before {
      +   .sm\\\\:markdown-2xl :where(ul > li)::before {

      ---

      -   .sm\\\\:prose-2xl :where(> ul > li p) {
      +   .sm\\\\:markdown-2xl :where(> ul > li p) {

      ---

      -   .sm\\\\:prose-2xl :where(> ul > li > *:first-child) {
      +   .sm\\\\:markdown-2xl :where(> ul > li > *:first-child) {

      ---

      -   .sm\\\\:prose-2xl :where(> ul > li > *:last-child) {
      +   .sm\\\\:markdown-2xl :where(> ul > li > *:last-child) {

      ---

      -   .sm\\\\:prose-2xl :where(> ol > li > *:first-child) {
      +   .sm\\\\:markdown-2xl :where(> ol > li > *:first-child) {

      ---

      -   .sm\\\\:prose-2xl :where(> ol > li > *:last-child) {
      +   .sm\\\\:markdown-2xl :where(> ol > li > *:last-child) {

      ---

      -   .sm\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .sm\\\\:markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .sm\\\\:prose-2xl :where(hr) {
      +   .sm\\\\:markdown-2xl :where(hr) {

      ---

      -   .sm\\\\:prose-2xl :where(hr + *) {
      +   .sm\\\\:markdown-2xl :where(hr + *) {

      ---

      -   .sm\\\\:prose-2xl :where(h2 + *) {
      +   .sm\\\\:markdown-2xl :where(h2 + *) {

      ---

      -   .sm\\\\:prose-2xl :where(h3 + *) {
      +   .sm\\\\:markdown-2xl :where(h3 + *) {

      ---

      -   .sm\\\\:prose-2xl :where(h4 + *) {
      +   .sm\\\\:markdown-2xl :where(h4 + *) {

      ---

      -   .sm\\\\:prose-2xl :where(table) {
      +   .sm\\\\:markdown-2xl :where(table) {

      ---

      -   .sm\\\\:prose-2xl :where(thead th) {
      +   .sm\\\\:markdown-2xl :where(thead th) {

      ---

      -   .sm\\\\:prose-2xl :where(thead th:first-child) {
      +   .sm\\\\:markdown-2xl :where(thead th:first-child) {

      ---

      -   .sm\\\\:prose-2xl :where(thead th:last-child) {
      +   .sm\\\\:markdown-2xl :where(thead th:last-child) {

      ---

      -   .sm\\\\:prose-2xl :where(tbody td) {
      +   .sm\\\\:markdown-2xl :where(tbody td) {

      ---

      -   .sm\\\\:prose-2xl :where(tbody td:first-child) {
      +   .sm\\\\:markdown-2xl :where(tbody td:first-child) {

      ---

      -   .sm\\\\:prose-2xl :where(tbody td:last-child) {
      +   .sm\\\\:markdown-2xl :where(tbody td:last-child) {

      ---

      -   .sm\\\\:prose-2xl :where(> :first-child) {
      +   .sm\\\\:markdown-2xl :where(> :first-child) {

      ---

      -   .sm\\\\:prose-2xl :where(> :last-child) {
      +   .sm\\\\:markdown-2xl :where(> :last-child) {

      ---

      -   .sm\\\\:prose-red :where(a) {
      +   .sm\\\\:markdown-red :where(a) {

      ---

      -   .sm\\\\:prose-red :where(a code) {
      +   .sm\\\\:markdown-red :where(a code) {

      ---

      -   .sm\\\\:prose-yellow :where(a) {
      +   .sm\\\\:markdown-yellow :where(a) {

      ---

      -   .sm\\\\:prose-yellow :where(a code) {
      +   .sm\\\\:markdown-yellow :where(a code) {

      ---

      -   .sm\\\\:prose-green :where(a) {
      +   .sm\\\\:markdown-green :where(a) {

      ---

      -   .sm\\\\:prose-green :where(a code) {
      +   .sm\\\\:markdown-green :where(a code) {

      ---

      -   .sm\\\\:prose-blue :where(a) {
      +   .sm\\\\:markdown-blue :where(a) {

      ---

      -   .sm\\\\:prose-blue :where(a code) {
      +   .sm\\\\:markdown-blue :where(a code) {

      ---

      -   .sm\\\\:prose-indigo :where(a) {
      +   .sm\\\\:markdown-indigo :where(a) {

      ---

      -   .sm\\\\:prose-indigo :where(a code) {
      +   .sm\\\\:markdown-indigo :where(a code) {

      ---

      -   .sm\\\\:prose-purple :where(a) {
      +   .sm\\\\:markdown-purple :where(a) {

      ---

      -   .sm\\\\:prose-purple :where(a code) {
      +   .sm\\\\:markdown-purple :where(a code) {

      ---

      -   .sm\\\\:prose-pink :where(a) {
      +   .sm\\\\:markdown-pink :where(a) {

      ---

      -   .sm\\\\:prose-pink :where(a code) {
      +   .sm\\\\:markdown-pink :where(a code) {

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose :where([class~='lead']) {
      +   .md\\\\:markdown :where([class~='lead']) {

      ---

      -   .md\\\\:prose :where(a) {
      +   .md\\\\:markdown :where(a) {

      ---

      -   .md\\\\:prose :where(strong) {
      +   .md\\\\:markdown :where(strong) {

      ---

      -   .md\\\\:prose :where(ol[type='A']) {
      +   .md\\\\:markdown :where(ol[type='A']) {

      ---

      -   .md\\\\:prose :where(ol[type='a']) {
      +   .md\\\\:markdown :where(ol[type='a']) {

      ---

      -   .md\\\\:prose :where(ol[type='A' s]) {
      +   .md\\\\:markdown :where(ol[type='A' s]) {

      ---

      -   .md\\\\:prose :where(ol[type='a' s]) {
      +   .md\\\\:markdown :where(ol[type='a' s]) {

      ---

      -   .md\\\\:prose :where(ol[type='I']) {
      +   .md\\\\:markdown :where(ol[type='I']) {

      ---

      -   .md\\\\:prose :where(ol[type='i']) {
      +   .md\\\\:markdown :where(ol[type='i']) {

      ---

      -   .md\\\\:prose :where(ol[type='I' s]) {
      +   .md\\\\:markdown :where(ol[type='I' s]) {

      ---

      -   .md\\\\:prose :where(ol[type='i' s]) {
      +   .md\\\\:markdown :where(ol[type='i' s]) {

      ---

      -   .md\\\\:prose :where(ol[type='1']) {
      +   .md\\\\:markdown :where(ol[type='1']) {

      ---

      -   .md\\\\:prose :where(ol > li) {
      +   .md\\\\:markdown :where(ol > li) {

      ---

      -   .md\\\\:prose :where(ol > li)::before {
      +   .md\\\\:markdown :where(ol > li)::before {

      ---

      -   .md\\\\:prose :where(ul > li) {
      +   .md\\\\:markdown :where(ul > li) {

      ---

      -   .md\\\\:prose :where(ul > li)::before {
      +   .md\\\\:markdown :where(ul > li)::before {

      ---

      -   .md\\\\:prose :where(hr) {
      +   .md\\\\:markdown :where(hr) {

      ---

      -   .md\\\\:prose :where(blockquote) {
      +   .md\\\\:markdown :where(blockquote) {

      ---

      -   .md\\\\:prose :where(blockquote p:first-of-type)::before {
      +   .md\\\\:markdown :where(blockquote p:first-of-type)::before {

      ---

      -   .md\\\\:prose :where(blockquote p:last-of-type)::after {
      +   .md\\\\:markdown :where(blockquote p:last-of-type)::after {

      ---

      -   .md\\\\:prose :where(h1) {
      +   .md\\\\:markdown :where(h1) {

      ---

      -   .md\\\\:prose :where(h1 strong) {
      +   .md\\\\:markdown :where(h1 strong) {

      ---

      -   .md\\\\:prose :where(h2) {
      +   .md\\\\:markdown :where(h2) {

      ---

      -   .md\\\\:prose :where(h2 strong) {
      +   .md\\\\:markdown :where(h2 strong) {

      ---

      -   .md\\\\:prose :where(h3) {
      +   .md\\\\:markdown :where(h3) {

      ---

      -   .md\\\\:prose :where(h3 strong) {
      +   .md\\\\:markdown :where(h3 strong) {

      ---

      -   .md\\\\:prose :where(h4) {
      +   .md\\\\:markdown :where(h4) {

      ---

      -   .md\\\\:prose :where(h4 strong) {
      +   .md\\\\:markdown :where(h4 strong) {

      ---

      -   .md\\\\:prose :where(figure figcaption) {
      +   .md\\\\:markdown :where(figure figcaption) {

      ---

      -   .md\\\\:prose :where(code) {
      +   .md\\\\:markdown :where(code) {

      ---

      -   .md\\\\:prose :where(code)::before {
      +   .md\\\\:markdown :where(code)::before {

      ---

      -   .md\\\\:prose :where(code)::after {
      +   .md\\\\:markdown :where(code)::after {

      ---

      -   .md\\\\:prose :where(a code) {
      +   .md\\\\:markdown :where(a code) {

      ---

      -   .md\\\\:prose :where(pre) {
      +   .md\\\\:markdown :where(pre) {

      ---

      -   .md\\\\:prose :where(pre code) {
      +   .md\\\\:markdown :where(pre code) {

      ---

      -   .md\\\\:prose :where(pre code)::before {
      +   .md\\\\:markdown :where(pre code)::before {

      ---

      -   .md\\\\:prose :where(pre code)::after {
      +   .md\\\\:markdown :where(pre code)::after {

      ---

      -   .md\\\\:prose :where(table) {
      +   .md\\\\:markdown :where(table) {

      ---

      -   .md\\\\:prose :where(thead) {
      +   .md\\\\:markdown :where(thead) {

      ---

      -   .md\\\\:prose :where(thead th) {
      +   .md\\\\:markdown :where(thead th) {

      ---

      -   .md\\\\:prose :where(tbody tr) {
      +   .md\\\\:markdown :where(tbody tr) {

      ---

      -   .md\\\\:prose :where(tbody tr:last-child) {
      +   .md\\\\:markdown :where(tbody tr:last-child) {

      ---

      -   .md\\\\:prose :where(tbody td) {
      +   .md\\\\:markdown :where(tbody td) {

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose :where(p) {
      +   .md\\\\:markdown :where(p) {

      ---

      -   .md\\\\:prose :where(img) {
      +   .md\\\\:markdown :where(img) {

      ---

      -   .md\\\\:prose :where(video) {
      +   .md\\\\:markdown :where(video) {

      ---

      -   .md\\\\:prose :where(figure) {
      +   .md\\\\:markdown :where(figure) {

      ---

      -   .md\\\\:prose :where(figure > *) {
      +   .md\\\\:markdown :where(figure > *) {

      ---

      -   .md\\\\:prose :where(h2 code) {
      +   .md\\\\:markdown :where(h2 code) {

      ---

      -   .md\\\\:prose :where(h3 code) {
      +   .md\\\\:markdown :where(h3 code) {

      ---

      -   .md\\\\:prose :where(ol) {
      +   .md\\\\:markdown :where(ol) {

      ---

      -   .md\\\\:prose :where(ul) {
      +   .md\\\\:markdown :where(ul) {

      ---

      -   .md\\\\:prose :where(li) {
      +   .md\\\\:markdown :where(li) {

      ---

      -   .md\\\\:prose :where(> ul > li p) {
      +   .md\\\\:markdown :where(> ul > li p) {

      ---

      -   .md\\\\:prose :where(> ul > li > *:first-child) {
      +   .md\\\\:markdown :where(> ul > li > *:first-child) {

      ---

      -   .md\\\\:prose :where(> ul > li > *:last-child) {
      +   .md\\\\:markdown :where(> ul > li > *:last-child) {

      ---

      -   .md\\\\:prose :where(> ol > li > *:first-child) {
      +   .md\\\\:markdown :where(> ol > li > *:first-child) {

      ---

      -   .md\\\\:prose :where(> ol > li > *:last-child) {
      +   .md\\\\:markdown :where(> ol > li > *:last-child) {

      ---

      -   .md\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
      +   .md\\\\:markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .md\\\\:prose :where(hr + *) {
      +   .md\\\\:markdown :where(hr + *) {

      ---

      -   .md\\\\:prose :where(h2 + *) {
      +   .md\\\\:markdown :where(h2 + *) {

      ---

      -   .md\\\\:prose :where(h3 + *) {
      +   .md\\\\:markdown :where(h3 + *) {

      ---

      -   .md\\\\:prose :where(h4 + *) {
      +   .md\\\\:markdown :where(h4 + *) {

      ---

      -   .md\\\\:prose :where(thead th:first-child) {
      +   .md\\\\:markdown :where(thead th:first-child) {

      ---

      -   .md\\\\:prose :where(thead th:last-child) {
      +   .md\\\\:markdown :where(thead th:last-child) {

      ---

      -   .md\\\\:prose :where(tbody td:first-child) {
      +   .md\\\\:markdown :where(tbody td:first-child) {

      ---

      -   .md\\\\:prose :where(tbody td:last-child) {
      +   .md\\\\:markdown :where(tbody td:last-child) {

      ---

      -   .md\\\\:prose :where(> :first-child) {
      +   .md\\\\:markdown :where(> :first-child) {

      ---

      -   .md\\\\:prose :where(> :last-child) {
      +   .md\\\\:markdown :where(> :last-child) {

      ---

      -   .md\\\\:prose-sm {
      +   .md\\\\:markdown-sm {

      ---

      -   .md\\\\:prose-sm :where(p) {
      +   .md\\\\:markdown-sm :where(p) {

      ---

      -   .md\\\\:prose-sm :where([class~='lead']) {
      +   .md\\\\:markdown-sm :where([class~='lead']) {

      ---

      -   .md\\\\:prose-sm :where(blockquote) {
      +   .md\\\\:markdown-sm :where(blockquote) {

      ---

      -   .md\\\\:prose-sm :where(h1) {
      +   .md\\\\:markdown-sm :where(h1) {

      ---

      -   .md\\\\:prose-sm :where(h2) {
      +   .md\\\\:markdown-sm :where(h2) {

      ---

      -   .md\\\\:prose-sm :where(h3) {
      +   .md\\\\:markdown-sm :where(h3) {

      ---

      -   .md\\\\:prose-sm :where(h4) {
      +   .md\\\\:markdown-sm :where(h4) {

      ---

      -   .md\\\\:prose-sm :where(img) {
      +   .md\\\\:markdown-sm :where(img) {

      ---

      -   .md\\\\:prose-sm :where(video) {
      +   .md\\\\:markdown-sm :where(video) {

      ---

      -   .md\\\\:prose-sm :where(figure) {
      +   .md\\\\:markdown-sm :where(figure) {

      ---

      -   .md\\\\:prose-sm :where(figure > *) {
      +   .md\\\\:markdown-sm :where(figure > *) {

      ---

      -   .md\\\\:prose-sm :where(figure figcaption) {
      +   .md\\\\:markdown-sm :where(figure figcaption) {

      ---

      -   .md\\\\:prose-sm :where(code) {
      +   .md\\\\:markdown-sm :where(code) {

      ---

      -   .md\\\\:prose-sm :where(h2 code) {
      +   .md\\\\:markdown-sm :where(h2 code) {

      ---

      -   .md\\\\:prose-sm :where(h3 code) {
      +   .md\\\\:markdown-sm :where(h3 code) {

      ---

      -   .md\\\\:prose-sm :where(pre) {
      +   .md\\\\:markdown-sm :where(pre) {

      ---

      -   .md\\\\:prose-sm :where(ol) {
      +   .md\\\\:markdown-sm :where(ol) {

      ---

      -   .md\\\\:prose-sm :where(ul) {
      +   .md\\\\:markdown-sm :where(ul) {

      ---

      -   .md\\\\:prose-sm :where(li) {
      +   .md\\\\:markdown-sm :where(li) {

      ---

      -   .md\\\\:prose-sm :where(ol > li) {
      +   .md\\\\:markdown-sm :where(ol > li) {

      ---

      -   .md\\\\:prose-sm :where(ol > li)::before {
      +   .md\\\\:markdown-sm :where(ol > li)::before {

      ---

      -   .md\\\\:prose-sm :where(ul > li) {
      +   .md\\\\:markdown-sm :where(ul > li) {

      ---

      -   .md\\\\:prose-sm :where(ul > li)::before {
      +   .md\\\\:markdown-sm :where(ul > li)::before {

      ---

      -   .md\\\\:prose-sm :where(> ul > li p) {
      +   .md\\\\:markdown-sm :where(> ul > li p) {

      ---

      -   .md\\\\:prose-sm :where(> ul > li > *:first-child) {
      +   .md\\\\:markdown-sm :where(> ul > li > *:first-child) {

      ---

      -   .md\\\\:prose-sm :where(> ul > li > *:last-child) {
      +   .md\\\\:markdown-sm :where(> ul > li > *:last-child) {

      ---

      -   .md\\\\:prose-sm :where(> ol > li > *:first-child) {
      +   .md\\\\:markdown-sm :where(> ol > li > *:first-child) {

      ---

      -   .md\\\\:prose-sm :where(> ol > li > *:last-child) {
      +   .md\\\\:markdown-sm :where(> ol > li > *:last-child) {

      ---

      -   .md\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      +   .md\\\\:markdown-sm :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .md\\\\:prose-sm :where(hr) {
      +   .md\\\\:markdown-sm :where(hr) {

      ---

      -   .md\\\\:prose-sm :where(hr + *) {
      +   .md\\\\:markdown-sm :where(hr + *) {

      ---

      -   .md\\\\:prose-sm :where(h2 + *) {
      +   .md\\\\:markdown-sm :where(h2 + *) {

      ---

      -   .md\\\\:prose-sm :where(h3 + *) {
      +   .md\\\\:markdown-sm :where(h3 + *) {

      ---

      -   .md\\\\:prose-sm :where(h4 + *) {
      +   .md\\\\:markdown-sm :where(h4 + *) {

      ---

      -   .md\\\\:prose-sm :where(table) {
      +   .md\\\\:markdown-sm :where(table) {

      ---

      -   .md\\\\:prose-sm :where(thead th) {
      +   .md\\\\:markdown-sm :where(thead th) {

      ---

      -   .md\\\\:prose-sm :where(thead th:first-child) {
      +   .md\\\\:markdown-sm :where(thead th:first-child) {

      ---

      -   .md\\\\:prose-sm :where(thead th:last-child) {
      +   .md\\\\:markdown-sm :where(thead th:last-child) {

      ---

      -   .md\\\\:prose-sm :where(tbody td) {
      +   .md\\\\:markdown-sm :where(tbody td) {

      ---

      -   .md\\\\:prose-sm :where(tbody td:first-child) {
      +   .md\\\\:markdown-sm :where(tbody td:first-child) {

      ---

      -   .md\\\\:prose-sm :where(tbody td:last-child) {
      +   .md\\\\:markdown-sm :where(tbody td:last-child) {

      ---

      -   .md\\\\:prose-sm :where(> :first-child) {
      +   .md\\\\:markdown-sm :where(> :first-child) {

      ---

      -   .md\\\\:prose-sm :where(> :last-child) {
      +   .md\\\\:markdown-sm :where(> :last-child) {

      ---

      -   .md\\\\:prose-lg {
      +   .md\\\\:markdown-lg {

      ---

      -   .md\\\\:prose-lg :where(p) {
      +   .md\\\\:markdown-lg :where(p) {

      ---

      -   .md\\\\:prose-lg :where([class~='lead']) {
      +   .md\\\\:markdown-lg :where([class~='lead']) {

      ---

      -   .md\\\\:prose-lg :where(blockquote) {
      +   .md\\\\:markdown-lg :where(blockquote) {

      ---

      -   .md\\\\:prose-lg :where(h1) {
      +   .md\\\\:markdown-lg :where(h1) {

      ---

      -   .md\\\\:prose-lg :where(h2) {
      +   .md\\\\:markdown-lg :where(h2) {

      ---

      -   .md\\\\:prose-lg :where(h3) {
      +   .md\\\\:markdown-lg :where(h3) {

      ---

      -   .md\\\\:prose-lg :where(h4) {
      +   .md\\\\:markdown-lg :where(h4) {

      ---

      -   .md\\\\:prose-lg :where(img) {
      +   .md\\\\:markdown-lg :where(img) {

      ---

      -   .md\\\\:prose-lg :where(video) {
      +   .md\\\\:markdown-lg :where(video) {

      ---

      -   .md\\\\:prose-lg :where(figure) {
      +   .md\\\\:markdown-lg :where(figure) {

      ---

      -   .md\\\\:prose-lg :where(figure > *) {
      +   .md\\\\:markdown-lg :where(figure > *) {

      ---

      -   .md\\\\:prose-lg :where(figure figcaption) {
      +   .md\\\\:markdown-lg :where(figure figcaption) {

      ---

      -   .md\\\\:prose-lg :where(code) {
      +   .md\\\\:markdown-lg :where(code) {

      ---

      -   .md\\\\:prose-lg :where(h2 code) {
      +   .md\\\\:markdown-lg :where(h2 code) {

      ---

      -   .md\\\\:prose-lg :where(h3 code) {
      +   .md\\\\:markdown-lg :where(h3 code) {

      ---

      -   .md\\\\:prose-lg :where(pre) {
      +   .md\\\\:markdown-lg :where(pre) {

      ---

      -   .md\\\\:prose-lg :where(ol) {
      +   .md\\\\:markdown-lg :where(ol) {

      ---

      -   .md\\\\:prose-lg :where(ul) {
      +   .md\\\\:markdown-lg :where(ul) {

      ---

      -   .md\\\\:prose-lg :where(li) {
      +   .md\\\\:markdown-lg :where(li) {

      ---

      -   .md\\\\:prose-lg :where(ol > li) {
      +   .md\\\\:markdown-lg :where(ol > li) {

      ---

      -   .md\\\\:prose-lg :where(ol > li)::before {
      +   .md\\\\:markdown-lg :where(ol > li)::before {

      ---

      -   .md\\\\:prose-lg :where(ul > li) {
      +   .md\\\\:markdown-lg :where(ul > li) {

      ---

      -   .md\\\\:prose-lg :where(ul > li)::before {
      +   .md\\\\:markdown-lg :where(ul > li)::before {

      ---

      -   .md\\\\:prose-lg :where(> ul > li p) {
      +   .md\\\\:markdown-lg :where(> ul > li p) {

      ---

      -   .md\\\\:prose-lg :where(> ul > li > *:first-child) {
      +   .md\\\\:markdown-lg :where(> ul > li > *:first-child) {

      ---

      -   .md\\\\:prose-lg :where(> ul > li > *:last-child) {
      +   .md\\\\:markdown-lg :where(> ul > li > *:last-child) {

      ---

      -   .md\\\\:prose-lg :where(> ol > li > *:first-child) {
      +   .md\\\\:markdown-lg :where(> ol > li > *:first-child) {

      ---

      -   .md\\\\:prose-lg :where(> ol > li > *:last-child) {
      +   .md\\\\:markdown-lg :where(> ol > li > *:last-child) {

      ---

      -   .md\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      +   .md\\\\:markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .md\\\\:prose-lg :where(hr) {
      +   .md\\\\:markdown-lg :where(hr) {

      ---

      -   .md\\\\:prose-lg :where(hr + *) {
      +   .md\\\\:markdown-lg :where(hr + *) {

      ---

      -   .md\\\\:prose-lg :where(h2 + *) {
      +   .md\\\\:markdown-lg :where(h2 + *) {

      ---

      -   .md\\\\:prose-lg :where(h3 + *) {
      +   .md\\\\:markdown-lg :where(h3 + *) {

      ---

      -   .md\\\\:prose-lg :where(h4 + *) {
      +   .md\\\\:markdown-lg :where(h4 + *) {

      ---

      -   .md\\\\:prose-lg :where(table) {
      +   .md\\\\:markdown-lg :where(table) {

      ---

      -   .md\\\\:prose-lg :where(thead th) {
      +   .md\\\\:markdown-lg :where(thead th) {

      ---

      -   .md\\\\:prose-lg :where(thead th:first-child) {
      +   .md\\\\:markdown-lg :where(thead th:first-child) {

      ---

      -   .md\\\\:prose-lg :where(thead th:last-child) {
      +   .md\\\\:markdown-lg :where(thead th:last-child) {

      ---

      -   .md\\\\:prose-lg :where(tbody td) {
      +   .md\\\\:markdown-lg :where(tbody td) {

      ---

      -   .md\\\\:prose-lg :where(tbody td:first-child) {
      +   .md\\\\:markdown-lg :where(tbody td:first-child) {

      ---

      -   .md\\\\:prose-lg :where(tbody td:last-child) {
      +   .md\\\\:markdown-lg :where(tbody td:last-child) {

      ---

      -   .md\\\\:prose-lg :where(> :first-child) {
      +   .md\\\\:markdown-lg :where(> :first-child) {

      ---

      -   .md\\\\:prose-lg :where(> :last-child) {
      +   .md\\\\:markdown-lg :where(> :last-child) {

      ---

      -   .md\\\\:prose-xl {
      +   .md\\\\:markdown-xl {

      ---

      -   .md\\\\:prose-xl :where(p) {
      +   .md\\\\:markdown-xl :where(p) {

      ---

      -   .md\\\\:prose-xl :where([class~='lead']) {
      +   .md\\\\:markdown-xl :where([class~='lead']) {

      ---

      -   .md\\\\:prose-xl :where(blockquote) {
      +   .md\\\\:markdown-xl :where(blockquote) {

      ---

      -   .md\\\\:prose-xl :where(h1) {
      +   .md\\\\:markdown-xl :where(h1) {

      ---

      -   .md\\\\:prose-xl :where(h2) {
      +   .md\\\\:markdown-xl :where(h2) {

      ---

      -   .md\\\\:prose-xl :where(h3) {
      +   .md\\\\:markdown-xl :where(h3) {

      ---

      -   .md\\\\:prose-xl :where(h4) {
      +   .md\\\\:markdown-xl :where(h4) {

      ---

      -   .md\\\\:prose-xl :where(img) {
      +   .md\\\\:markdown-xl :where(img) {

      ---

      -   .md\\\\:prose-xl :where(video) {
      +   .md\\\\:markdown-xl :where(video) {

      ---

      -   .md\\\\:prose-xl :where(figure) {
      +   .md\\\\:markdown-xl :where(figure) {

      ---

      -   .md\\\\:prose-xl :where(figure > *) {
      +   .md\\\\:markdown-xl :where(figure > *) {

      ---

      -   .md\\\\:prose-xl :where(figure figcaption) {
      +   .md\\\\:markdown-xl :where(figure figcaption) {

      ---

      -   .md\\\\:prose-xl :where(code) {
      +   .md\\\\:markdown-xl :where(code) {

      ---

      -   .md\\\\:prose-xl :where(h2 code) {
      +   .md\\\\:markdown-xl :where(h2 code) {

      ---

      -   .md\\\\:prose-xl :where(h3 code) {
      +   .md\\\\:markdown-xl :where(h3 code) {

      ---

      -   .md\\\\:prose-xl :where(pre) {
      +   .md\\\\:markdown-xl :where(pre) {

      ---

      -   .md\\\\:prose-xl :where(ol) {
      +   .md\\\\:markdown-xl :where(ol) {

      ---

      -   .md\\\\:prose-xl :where(ul) {
      +   .md\\\\:markdown-xl :where(ul) {

      ---

      -   .md\\\\:prose-xl :where(li) {
      +   .md\\\\:markdown-xl :where(li) {

      ---

      -   .md\\\\:prose-xl :where(ol > li) {
      +   .md\\\\:markdown-xl :where(ol > li) {

      ---

      -   .md\\\\:prose-xl :where(ol > li)::before {
      +   .md\\\\:markdown-xl :where(ol > li)::before {

      ---

      -   .md\\\\:prose-xl :where(ul > li) {
      +   .md\\\\:markdown-xl :where(ul > li) {

      ---

      -   .md\\\\:prose-xl :where(ul > li)::before {
      +   .md\\\\:markdown-xl :where(ul > li)::before {

      ---

      -   .md\\\\:prose-xl :where(> ul > li p) {
      +   .md\\\\:markdown-xl :where(> ul > li p) {

      ---

      -   .md\\\\:prose-xl :where(> ul > li > *:first-child) {
      +   .md\\\\:markdown-xl :where(> ul > li > *:first-child) {

      ---

      -   .md\\\\:prose-xl :where(> ul > li > *:last-child) {
      +   .md\\\\:markdown-xl :where(> ul > li > *:last-child) {

      ---

      -   .md\\\\:prose-xl :where(> ol > li > *:first-child) {
      +   .md\\\\:markdown-xl :where(> ol > li > *:first-child) {

      ---

      -   .md\\\\:prose-xl :where(> ol > li > *:last-child) {
      +   .md\\\\:markdown-xl :where(> ol > li > *:last-child) {

      ---

      -   .md\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .md\\\\:markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .md\\\\:prose-xl :where(hr) {
      +   .md\\\\:markdown-xl :where(hr) {

      ---

      -   .md\\\\:prose-xl :where(hr + *) {
      +   .md\\\\:markdown-xl :where(hr + *) {

      ---

      -   .md\\\\:prose-xl :where(h2 + *) {
      +   .md\\\\:markdown-xl :where(h2 + *) {

      ---

      -   .md\\\\:prose-xl :where(h3 + *) {
      +   .md\\\\:markdown-xl :where(h3 + *) {

      ---

      -   .md\\\\:prose-xl :where(h4 + *) {
      +   .md\\\\:markdown-xl :where(h4 + *) {

      ---

      -   .md\\\\:prose-xl :where(table) {
      +   .md\\\\:markdown-xl :where(table) {

      ---

      -   .md\\\\:prose-xl :where(thead th) {
      +   .md\\\\:markdown-xl :where(thead th) {

      ---

      -   .md\\\\:prose-xl :where(thead th:first-child) {
      +   .md\\\\:markdown-xl :where(thead th:first-child) {

      ---

      -   .md\\\\:prose-xl :where(thead th:last-child) {
      +   .md\\\\:markdown-xl :where(thead th:last-child) {

      ---

      -   .md\\\\:prose-xl :where(tbody td) {
      +   .md\\\\:markdown-xl :where(tbody td) {

      ---

      -   .md\\\\:prose-xl :where(tbody td:first-child) {
      +   .md\\\\:markdown-xl :where(tbody td:first-child) {

      ---

      -   .md\\\\:prose-xl :where(tbody td:last-child) {
      +   .md\\\\:markdown-xl :where(tbody td:last-child) {

      ---

      -   .md\\\\:prose-xl :where(> :first-child) {
      +   .md\\\\:markdown-xl :where(> :first-child) {

      ---

      -   .md\\\\:prose-xl :where(> :last-child) {
      +   .md\\\\:markdown-xl :where(> :last-child) {

      ---

      -   .md\\\\:prose-2xl {
      +   .md\\\\:markdown-2xl {

      ---

      -   .md\\\\:prose-2xl :where(p) {
      +   .md\\\\:markdown-2xl :where(p) {

      ---

      -   .md\\\\:prose-2xl :where([class~='lead']) {
      +   .md\\\\:markdown-2xl :where([class~='lead']) {

      ---

      -   .md\\\\:prose-2xl :where(blockquote) {
      +   .md\\\\:markdown-2xl :where(blockquote) {

      ---

      -   .md\\\\:prose-2xl :where(h1) {
      +   .md\\\\:markdown-2xl :where(h1) {

      ---

      -   .md\\\\:prose-2xl :where(h2) {
      +   .md\\\\:markdown-2xl :where(h2) {

      ---

      -   .md\\\\:prose-2xl :where(h3) {
      +   .md\\\\:markdown-2xl :where(h3) {

      ---

      -   .md\\\\:prose-2xl :where(h4) {
      +   .md\\\\:markdown-2xl :where(h4) {

      ---

      -   .md\\\\:prose-2xl :where(img) {
      +   .md\\\\:markdown-2xl :where(img) {

      ---

      -   .md\\\\:prose-2xl :where(video) {
      +   .md\\\\:markdown-2xl :where(video) {

      ---

      -   .md\\\\:prose-2xl :where(figure) {
      +   .md\\\\:markdown-2xl :where(figure) {

      ---

      -   .md\\\\:prose-2xl :where(figure > *) {
      +   .md\\\\:markdown-2xl :where(figure > *) {

      ---

      -   .md\\\\:prose-2xl :where(figure figcaption) {
      +   .md\\\\:markdown-2xl :where(figure figcaption) {

      ---

      -   .md\\\\:prose-2xl :where(code) {
      +   .md\\\\:markdown-2xl :where(code) {

      ---

      -   .md\\\\:prose-2xl :where(h2 code) {
      +   .md\\\\:markdown-2xl :where(h2 code) {

      ---

      -   .md\\\\:prose-2xl :where(h3 code) {
      +   .md\\\\:markdown-2xl :where(h3 code) {

      ---

      -   .md\\\\:prose-2xl :where(pre) {
      +   .md\\\\:markdown-2xl :where(pre) {

      ---

      -   .md\\\\:prose-2xl :where(ol) {
      +   .md\\\\:markdown-2xl :where(ol) {

      ---

      -   .md\\\\:prose-2xl :where(ul) {
      +   .md\\\\:markdown-2xl :where(ul) {

      ---

      -   .md\\\\:prose-2xl :where(li) {
      +   .md\\\\:markdown-2xl :where(li) {

      ---

      -   .md\\\\:prose-2xl :where(ol > li) {
      +   .md\\\\:markdown-2xl :where(ol > li) {

      ---

      -   .md\\\\:prose-2xl :where(ol > li)::before {
      +   .md\\\\:markdown-2xl :where(ol > li)::before {

      ---

      -   .md\\\\:prose-2xl :where(ul > li) {
      +   .md\\\\:markdown-2xl :where(ul > li) {

      ---

      -   .md\\\\:prose-2xl :where(ul > li)::before {
      +   .md\\\\:markdown-2xl :where(ul > li)::before {

      ---

      -   .md\\\\:prose-2xl :where(> ul > li p) {
      +   .md\\\\:markdown-2xl :where(> ul > li p) {

      ---

      -   .md\\\\:prose-2xl :where(> ul > li > *:first-child) {
      +   .md\\\\:markdown-2xl :where(> ul > li > *:first-child) {

      ---

      -   .md\\\\:prose-2xl :where(> ul > li > *:last-child) {
      +   .md\\\\:markdown-2xl :where(> ul > li > *:last-child) {

      ---

      -   .md\\\\:prose-2xl :where(> ol > li > *:first-child) {
      +   .md\\\\:markdown-2xl :where(> ol > li > *:first-child) {

      ---

      -   .md\\\\:prose-2xl :where(> ol > li > *:last-child) {
      +   .md\\\\:markdown-2xl :where(> ol > li > *:last-child) {

      ---

      -   .md\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .md\\\\:markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .md\\\\:prose-2xl :where(hr) {
      +   .md\\\\:markdown-2xl :where(hr) {

      ---

      -   .md\\\\:prose-2xl :where(hr + *) {
      +   .md\\\\:markdown-2xl :where(hr + *) {

      ---

      -   .md\\\\:prose-2xl :where(h2 + *) {
      +   .md\\\\:markdown-2xl :where(h2 + *) {

      ---

      -   .md\\\\:prose-2xl :where(h3 + *) {
      +   .md\\\\:markdown-2xl :where(h3 + *) {

      ---

      -   .md\\\\:prose-2xl :where(h4 + *) {
      +   .md\\\\:markdown-2xl :where(h4 + *) {

      ---

      -   .md\\\\:prose-2xl :where(table) {
      +   .md\\\\:markdown-2xl :where(table) {

      ---

      -   .md\\\\:prose-2xl :where(thead th) {
      +   .md\\\\:markdown-2xl :where(thead th) {

      ---

      -   .md\\\\:prose-2xl :where(thead th:first-child) {
      +   .md\\\\:markdown-2xl :where(thead th:first-child) {

      ---

      -   .md\\\\:prose-2xl :where(thead th:last-child) {
      +   .md\\\\:markdown-2xl :where(thead th:last-child) {

      ---

      -   .md\\\\:prose-2xl :where(tbody td) {
      +   .md\\\\:markdown-2xl :where(tbody td) {

      ---

      -   .md\\\\:prose-2xl :where(tbody td:first-child) {
      +   .md\\\\:markdown-2xl :where(tbody td:first-child) {

      ---

      -   .md\\\\:prose-2xl :where(tbody td:last-child) {
      +   .md\\\\:markdown-2xl :where(tbody td:last-child) {

      ---

      -   .md\\\\:prose-2xl :where(> :first-child) {
      +   .md\\\\:markdown-2xl :where(> :first-child) {

      ---

      -   .md\\\\:prose-2xl :where(> :last-child) {
      +   .md\\\\:markdown-2xl :where(> :last-child) {

      ---

      -   .md\\\\:prose-red :where(a) {
      +   .md\\\\:markdown-red :where(a) {

      ---

      -   .md\\\\:prose-red :where(a code) {
      +   .md\\\\:markdown-red :where(a code) {

      ---

      -   .md\\\\:prose-yellow :where(a) {
      +   .md\\\\:markdown-yellow :where(a) {

      ---

      -   .md\\\\:prose-yellow :where(a code) {
      +   .md\\\\:markdown-yellow :where(a code) {

      ---

      -   .md\\\\:prose-green :where(a) {
      +   .md\\\\:markdown-green :where(a) {

      ---

      -   .md\\\\:prose-green :where(a code) {
      +   .md\\\\:markdown-green :where(a code) {

      ---

      -   .md\\\\:prose-blue :where(a) {
      +   .md\\\\:markdown-blue :where(a) {

      ---

      -   .md\\\\:prose-blue :where(a code) {
      +   .md\\\\:markdown-blue :where(a code) {

      ---

      -   .md\\\\:prose-indigo :where(a) {
      +   .md\\\\:markdown-indigo :where(a) {

      ---

      -   .md\\\\:prose-indigo :where(a code) {
      +   .md\\\\:markdown-indigo :where(a code) {

      ---

      -   .md\\\\:prose-purple :where(a) {
      +   .md\\\\:markdown-purple :where(a) {

      ---

      -   .md\\\\:prose-purple :where(a code) {
      +   .md\\\\:markdown-purple :where(a code) {

      ---

      -   .md\\\\:prose-pink :where(a) {
      +   .md\\\\:markdown-pink :where(a) {

      ---

      -   .md\\\\:prose-pink :where(a code) {
      +   .md\\\\:markdown-pink :where(a code) {

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose :where([class~='lead']) {
      +   .lg\\\\:markdown :where([class~='lead']) {

      ---

      -   .lg\\\\:prose :where(a) {
      +   .lg\\\\:markdown :where(a) {

      ---

      -   .lg\\\\:prose :where(strong) {
      +   .lg\\\\:markdown :where(strong) {

      ---

      -   .lg\\\\:prose :where(ol[type='A']) {
      +   .lg\\\\:markdown :where(ol[type='A']) {

      ---

      -   .lg\\\\:prose :where(ol[type='a']) {
      +   .lg\\\\:markdown :where(ol[type='a']) {

      ---

      -   .lg\\\\:prose :where(ol[type='A' s]) {
      +   .lg\\\\:markdown :where(ol[type='A' s]) {

      ---

      -   .lg\\\\:prose :where(ol[type='a' s]) {
      +   .lg\\\\:markdown :where(ol[type='a' s]) {

      ---

      -   .lg\\\\:prose :where(ol[type='I']) {
      +   .lg\\\\:markdown :where(ol[type='I']) {

      ---

      -   .lg\\\\:prose :where(ol[type='i']) {
      +   .lg\\\\:markdown :where(ol[type='i']) {

      ---

      -   .lg\\\\:prose :where(ol[type='I' s]) {
      +   .lg\\\\:markdown :where(ol[type='I' s]) {

      ---

      -   .lg\\\\:prose :where(ol[type='i' s]) {
      +   .lg\\\\:markdown :where(ol[type='i' s]) {

      ---

      -   .lg\\\\:prose :where(ol[type='1']) {
      +   .lg\\\\:markdown :where(ol[type='1']) {

      ---

      -   .lg\\\\:prose :where(ol > li) {
      +   .lg\\\\:markdown :where(ol > li) {

      ---

      -   .lg\\\\:prose :where(ol > li)::before {
      +   .lg\\\\:markdown :where(ol > li)::before {

      ---

      -   .lg\\\\:prose :where(ul > li) {
      +   .lg\\\\:markdown :where(ul > li) {

      ---

      -   .lg\\\\:prose :where(ul > li)::before {
      +   .lg\\\\:markdown :where(ul > li)::before {

      ---

      -   .lg\\\\:prose :where(hr) {
      +   .lg\\\\:markdown :where(hr) {

      ---

      -   .lg\\\\:prose :where(blockquote) {
      +   .lg\\\\:markdown :where(blockquote) {

      ---

      -   .lg\\\\:prose :where(blockquote p:first-of-type)::before {
      +   .lg\\\\:markdown :where(blockquote p:first-of-type)::before {

      ---

      -   .lg\\\\:prose :where(blockquote p:last-of-type)::after {
      +   .lg\\\\:markdown :where(blockquote p:last-of-type)::after {

      ---

      -   .lg\\\\:prose :where(h1) {
      +   .lg\\\\:markdown :where(h1) {

      ---

      -   .lg\\\\:prose :where(h1 strong) {
      +   .lg\\\\:markdown :where(h1 strong) {

      ---

      -   .lg\\\\:prose :where(h2) {
      +   .lg\\\\:markdown :where(h2) {

      ---

      -   .lg\\\\:prose :where(h2 strong) {
      +   .lg\\\\:markdown :where(h2 strong) {

      ---

      -   .lg\\\\:prose :where(h3) {
      +   .lg\\\\:markdown :where(h3) {

      ---

      -   .lg\\\\:prose :where(h3 strong) {
      +   .lg\\\\:markdown :where(h3 strong) {

      ---

      -   .lg\\\\:prose :where(h4) {
      +   .lg\\\\:markdown :where(h4) {

      ---

      -   .lg\\\\:prose :where(h4 strong) {
      +   .lg\\\\:markdown :where(h4 strong) {

      ---

      -   .lg\\\\:prose :where(figure figcaption) {
      +   .lg\\\\:markdown :where(figure figcaption) {

      ---

      -   .lg\\\\:prose :where(code) {
      +   .lg\\\\:markdown :where(code) {

      ---

      -   .lg\\\\:prose :where(code)::before {
      +   .lg\\\\:markdown :where(code)::before {

      ---

      -   .lg\\\\:prose :where(code)::after {
      +   .lg\\\\:markdown :where(code)::after {

      ---

      -   .lg\\\\:prose :where(a code) {
      +   .lg\\\\:markdown :where(a code) {

      ---

      -   .lg\\\\:prose :where(pre) {
      +   .lg\\\\:markdown :where(pre) {

      ---

      -   .lg\\\\:prose :where(pre code) {
      +   .lg\\\\:markdown :where(pre code) {

      ---

      -   .lg\\\\:prose :where(pre code)::before {
      +   .lg\\\\:markdown :where(pre code)::before {

      ---

      -   .lg\\\\:prose :where(pre code)::after {
      +   .lg\\\\:markdown :where(pre code)::after {

      ---

      -   .lg\\\\:prose :where(table) {
      +   .lg\\\\:markdown :where(table) {

      ---

      -   .lg\\\\:prose :where(thead) {
      +   .lg\\\\:markdown :where(thead) {

      ---

      -   .lg\\\\:prose :where(thead th) {
      +   .lg\\\\:markdown :where(thead th) {

      ---

      -   .lg\\\\:prose :where(tbody tr) {
      +   .lg\\\\:markdown :where(tbody tr) {

      ---

      -   .lg\\\\:prose :where(tbody tr:last-child) {
      +   .lg\\\\:markdown :where(tbody tr:last-child) {

      ---

      -   .lg\\\\:prose :where(tbody td) {
      +   .lg\\\\:markdown :where(tbody td) {

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose :where(p) {
      +   .lg\\\\:markdown :where(p) {

      ---

      -   .lg\\\\:prose :where(img) {
      +   .lg\\\\:markdown :where(img) {

      ---

      -   .lg\\\\:prose :where(video) {
      +   .lg\\\\:markdown :where(video) {

      ---

      -   .lg\\\\:prose :where(figure) {
      +   .lg\\\\:markdown :where(figure) {

      ---

      -   .lg\\\\:prose :where(figure > *) {
      +   .lg\\\\:markdown :where(figure > *) {

      ---

      -   .lg\\\\:prose :where(h2 code) {
      +   .lg\\\\:markdown :where(h2 code) {

      ---

      -   .lg\\\\:prose :where(h3 code) {
      +   .lg\\\\:markdown :where(h3 code) {

      ---

      -   .lg\\\\:prose :where(ol) {
      +   .lg\\\\:markdown :where(ol) {

      ---

      -   .lg\\\\:prose :where(ul) {
      +   .lg\\\\:markdown :where(ul) {

      ---

      -   .lg\\\\:prose :where(li) {
      +   .lg\\\\:markdown :where(li) {

      ---

      -   .lg\\\\:prose :where(> ul > li p) {
      +   .lg\\\\:markdown :where(> ul > li p) {

      ---

      -   .lg\\\\:prose :where(> ul > li > *:first-child) {
      +   .lg\\\\:markdown :where(> ul > li > *:first-child) {

      ---

      -   .lg\\\\:prose :where(> ul > li > *:last-child) {
      +   .lg\\\\:markdown :where(> ul > li > *:last-child) {

      ---

      -   .lg\\\\:prose :where(> ol > li > *:first-child) {
      +   .lg\\\\:markdown :where(> ol > li > *:first-child) {

      ---

      -   .lg\\\\:prose :where(> ol > li > *:last-child) {
      +   .lg\\\\:markdown :where(> ol > li > *:last-child) {

      ---

      -   .lg\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
      +   .lg\\\\:markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .lg\\\\:prose :where(hr + *) {
      +   .lg\\\\:markdown :where(hr + *) {

      ---

      -   .lg\\\\:prose :where(h2 + *) {
      +   .lg\\\\:markdown :where(h2 + *) {

      ---

      -   .lg\\\\:prose :where(h3 + *) {
      +   .lg\\\\:markdown :where(h3 + *) {

      ---

      -   .lg\\\\:prose :where(h4 + *) {
      +   .lg\\\\:markdown :where(h4 + *) {

      ---

      -   .lg\\\\:prose :where(thead th:first-child) {
      +   .lg\\\\:markdown :where(thead th:first-child) {

      ---

      -   .lg\\\\:prose :where(thead th:last-child) {
      +   .lg\\\\:markdown :where(thead th:last-child) {

      ---

      -   .lg\\\\:prose :where(tbody td:first-child) {
      +   .lg\\\\:markdown :where(tbody td:first-child) {

      ---

      -   .lg\\\\:prose :where(tbody td:last-child) {
      +   .lg\\\\:markdown :where(tbody td:last-child) {

      ---

      -   .lg\\\\:prose :where(> :first-child) {
      +   .lg\\\\:markdown :where(> :first-child) {

      ---

      -   .lg\\\\:prose :where(> :last-child) {
      +   .lg\\\\:markdown :where(> :last-child) {

      ---

      -   .lg\\\\:prose-sm {
      +   .lg\\\\:markdown-sm {

      ---

      -   .lg\\\\:prose-sm :where(p) {
      +   .lg\\\\:markdown-sm :where(p) {

      ---

      -   .lg\\\\:prose-sm :where([class~='lead']) {
      +   .lg\\\\:markdown-sm :where([class~='lead']) {

      ---

      -   .lg\\\\:prose-sm :where(blockquote) {
      +   .lg\\\\:markdown-sm :where(blockquote) {

      ---

      -   .lg\\\\:prose-sm :where(h1) {
      +   .lg\\\\:markdown-sm :where(h1) {

      ---

      -   .lg\\\\:prose-sm :where(h2) {
      +   .lg\\\\:markdown-sm :where(h2) {

      ---

      -   .lg\\\\:prose-sm :where(h3) {
      +   .lg\\\\:markdown-sm :where(h3) {

      ---

      -   .lg\\\\:prose-sm :where(h4) {
      +   .lg\\\\:markdown-sm :where(h4) {

      ---

      -   .lg\\\\:prose-sm :where(img) {
      +   .lg\\\\:markdown-sm :where(img) {

      ---

      -   .lg\\\\:prose-sm :where(video) {
      +   .lg\\\\:markdown-sm :where(video) {

      ---

      -   .lg\\\\:prose-sm :where(figure) {
      +   .lg\\\\:markdown-sm :where(figure) {

      ---

      -   .lg\\\\:prose-sm :where(figure > *) {
      +   .lg\\\\:markdown-sm :where(figure > *) {

      ---

      -   .lg\\\\:prose-sm :where(figure figcaption) {
      +   .lg\\\\:markdown-sm :where(figure figcaption) {

      ---

      -   .lg\\\\:prose-sm :where(code) {
      +   .lg\\\\:markdown-sm :where(code) {

      ---

      -   .lg\\\\:prose-sm :where(h2 code) {
      +   .lg\\\\:markdown-sm :where(h2 code) {

      ---

      -   .lg\\\\:prose-sm :where(h3 code) {
      +   .lg\\\\:markdown-sm :where(h3 code) {

      ---

      -   .lg\\\\:prose-sm :where(pre) {
      +   .lg\\\\:markdown-sm :where(pre) {

      ---

      -   .lg\\\\:prose-sm :where(ol) {
      +   .lg\\\\:markdown-sm :where(ol) {

      ---

      -   .lg\\\\:prose-sm :where(ul) {
      +   .lg\\\\:markdown-sm :where(ul) {

      ---

      -   .lg\\\\:prose-sm :where(li) {
      +   .lg\\\\:markdown-sm :where(li) {

      ---

      -   .lg\\\\:prose-sm :where(ol > li) {
      +   .lg\\\\:markdown-sm :where(ol > li) {

      ---

      -   .lg\\\\:prose-sm :where(ol > li)::before {
      +   .lg\\\\:markdown-sm :where(ol > li)::before {

      ---

      -   .lg\\\\:prose-sm :where(ul > li) {
      +   .lg\\\\:markdown-sm :where(ul > li) {

      ---

      -   .lg\\\\:prose-sm :where(ul > li)::before {
      +   .lg\\\\:markdown-sm :where(ul > li)::before {

      ---

      -   .lg\\\\:prose-sm :where(> ul > li p) {
      +   .lg\\\\:markdown-sm :where(> ul > li p) {

      ---

      -   .lg\\\\:prose-sm :where(> ul > li > *:first-child) {
      +   .lg\\\\:markdown-sm :where(> ul > li > *:first-child) {

      ---

      -   .lg\\\\:prose-sm :where(> ul > li > *:last-child) {
      +   .lg\\\\:markdown-sm :where(> ul > li > *:last-child) {

      ---

      -   .lg\\\\:prose-sm :where(> ol > li > *:first-child) {
      +   .lg\\\\:markdown-sm :where(> ol > li > *:first-child) {

      ---

      -   .lg\\\\:prose-sm :where(> ol > li > *:last-child) {
      +   .lg\\\\:markdown-sm :where(> ol > li > *:last-child) {

      ---

      -   .lg\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      +   .lg\\\\:markdown-sm :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .lg\\\\:prose-sm :where(hr) {
      +   .lg\\\\:markdown-sm :where(hr) {

      ---

      -   .lg\\\\:prose-sm :where(hr + *) {
      +   .lg\\\\:markdown-sm :where(hr + *) {

      ---

      -   .lg\\\\:prose-sm :where(h2 + *) {
      +   .lg\\\\:markdown-sm :where(h2 + *) {

      ---

      -   .lg\\\\:prose-sm :where(h3 + *) {
      +   .lg\\\\:markdown-sm :where(h3 + *) {

      ---

      -   .lg\\\\:prose-sm :where(h4 + *) {
      +   .lg\\\\:markdown-sm :where(h4 + *) {

      ---

      -   .lg\\\\:prose-sm :where(table) {
      +   .lg\\\\:markdown-sm :where(table) {

      ---

      -   .lg\\\\:prose-sm :where(thead th) {
      +   .lg\\\\:markdown-sm :where(thead th) {

      ---

      -   .lg\\\\:prose-sm :where(thead th:first-child) {
      +   .lg\\\\:markdown-sm :where(thead th:first-child) {

      ---

      -   .lg\\\\:prose-sm :where(thead th:last-child) {
      +   .lg\\\\:markdown-sm :where(thead th:last-child) {

      ---

      -   .lg\\\\:prose-sm :where(tbody td) {
      +   .lg\\\\:markdown-sm :where(tbody td) {

      ---

      -   .lg\\\\:prose-sm :where(tbody td:first-child) {
      +   .lg\\\\:markdown-sm :where(tbody td:first-child) {

      ---

      -   .lg\\\\:prose-sm :where(tbody td:last-child) {
      +   .lg\\\\:markdown-sm :where(tbody td:last-child) {

      ---

      -   .lg\\\\:prose-sm :where(> :first-child) {
      +   .lg\\\\:markdown-sm :where(> :first-child) {

      ---

      -   .lg\\\\:prose-sm :where(> :last-child) {
      +   .lg\\\\:markdown-sm :where(> :last-child) {

      ---

      -   .lg\\\\:prose-lg {
      +   .lg\\\\:markdown-lg {

      ---

      -   .lg\\\\:prose-lg :where(p) {
      +   .lg\\\\:markdown-lg :where(p) {

      ---

      -   .lg\\\\:prose-lg :where([class~='lead']) {
      +   .lg\\\\:markdown-lg :where([class~='lead']) {

      ---

      -   .lg\\\\:prose-lg :where(blockquote) {
      +   .lg\\\\:markdown-lg :where(blockquote) {

      ---

      -   .lg\\\\:prose-lg :where(h1) {
      +   .lg\\\\:markdown-lg :where(h1) {

      ---

      -   .lg\\\\:prose-lg :where(h2) {
      +   .lg\\\\:markdown-lg :where(h2) {

      ---

      -   .lg\\\\:prose-lg :where(h3) {
      +   .lg\\\\:markdown-lg :where(h3) {

      ---

      -   .lg\\\\:prose-lg :where(h4) {
      +   .lg\\\\:markdown-lg :where(h4) {

      ---

      -   .lg\\\\:prose-lg :where(img) {
      +   .lg\\\\:markdown-lg :where(img) {

      ---

      -   .lg\\\\:prose-lg :where(video) {
      +   .lg\\\\:markdown-lg :where(video) {

      ---

      -   .lg\\\\:prose-lg :where(figure) {
      +   .lg\\\\:markdown-lg :where(figure) {

      ---

      -   .lg\\\\:prose-lg :where(figure > *) {
      +   .lg\\\\:markdown-lg :where(figure > *) {

      ---

      -   .lg\\\\:prose-lg :where(figure figcaption) {
      +   .lg\\\\:markdown-lg :where(figure figcaption) {

      ---

      -   .lg\\\\:prose-lg :where(code) {
      +   .lg\\\\:markdown-lg :where(code) {

      ---

      -   .lg\\\\:prose-lg :where(h2 code) {
      +   .lg\\\\:markdown-lg :where(h2 code) {

      ---

      -   .lg\\\\:prose-lg :where(h3 code) {
      +   .lg\\\\:markdown-lg :where(h3 code) {

      ---

      -   .lg\\\\:prose-lg :where(pre) {
      +   .lg\\\\:markdown-lg :where(pre) {

      ---

      -   .lg\\\\:prose-lg :where(ol) {
      +   .lg\\\\:markdown-lg :where(ol) {

      ---

      -   .lg\\\\:prose-lg :where(ul) {
      +   .lg\\\\:markdown-lg :where(ul) {

      ---

      -   .lg\\\\:prose-lg :where(li) {
      +   .lg\\\\:markdown-lg :where(li) {

      ---

      -   .lg\\\\:prose-lg :where(ol > li) {
      +   .lg\\\\:markdown-lg :where(ol > li) {

      ---

      -   .lg\\\\:prose-lg :where(ol > li)::before {
      +   .lg\\\\:markdown-lg :where(ol > li)::before {

      ---

      -   .lg\\\\:prose-lg :where(ul > li) {
      +   .lg\\\\:markdown-lg :where(ul > li) {

      ---

      -   .lg\\\\:prose-lg :where(ul > li)::before {
      +   .lg\\\\:markdown-lg :where(ul > li)::before {

      ---

      -   .lg\\\\:prose-lg :where(> ul > li p) {
      +   .lg\\\\:markdown-lg :where(> ul > li p) {

      ---

      -   .lg\\\\:prose-lg :where(> ul > li > *:first-child) {
      +   .lg\\\\:markdown-lg :where(> ul > li > *:first-child) {

      ---

      -   .lg\\\\:prose-lg :where(> ul > li > *:last-child) {
      +   .lg\\\\:markdown-lg :where(> ul > li > *:last-child) {

      ---

      -   .lg\\\\:prose-lg :where(> ol > li > *:first-child) {
      +   .lg\\\\:markdown-lg :where(> ol > li > *:first-child) {

      ---

      -   .lg\\\\:prose-lg :where(> ol > li > *:last-child) {
      +   .lg\\\\:markdown-lg :where(> ol > li > *:last-child) {

      ---

      -   .lg\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      +   .lg\\\\:markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .lg\\\\:prose-lg :where(hr) {
      +   .lg\\\\:markdown-lg :where(hr) {

      ---

      -   .lg\\\\:prose-lg :where(hr + *) {
      +   .lg\\\\:markdown-lg :where(hr + *) {

      ---

      -   .lg\\\\:prose-lg :where(h2 + *) {
      +   .lg\\\\:markdown-lg :where(h2 + *) {

      ---

      -   .lg\\\\:prose-lg :where(h3 + *) {
      +   .lg\\\\:markdown-lg :where(h3 + *) {

      ---

      -   .lg\\\\:prose-lg :where(h4 + *) {
      +   .lg\\\\:markdown-lg :where(h4 + *) {

      ---

      -   .lg\\\\:prose-lg :where(table) {
      +   .lg\\\\:markdown-lg :where(table) {

      ---

      -   .lg\\\\:prose-lg :where(thead th) {
      +   .lg\\\\:markdown-lg :where(thead th) {

      ---

      -   .lg\\\\:prose-lg :where(thead th:first-child) {
      +   .lg\\\\:markdown-lg :where(thead th:first-child) {

      ---

      -   .lg\\\\:prose-lg :where(thead th:last-child) {
      +   .lg\\\\:markdown-lg :where(thead th:last-child) {

      ---

      -   .lg\\\\:prose-lg :where(tbody td) {
      +   .lg\\\\:markdown-lg :where(tbody td) {

      ---

      -   .lg\\\\:prose-lg :where(tbody td:first-child) {
      +   .lg\\\\:markdown-lg :where(tbody td:first-child) {

      ---

      -   .lg\\\\:prose-lg :where(tbody td:last-child) {
      +   .lg\\\\:markdown-lg :where(tbody td:last-child) {

      ---

      -   .lg\\\\:prose-lg :where(> :first-child) {
      +   .lg\\\\:markdown-lg :where(> :first-child) {

      ---

      -   .lg\\\\:prose-lg :where(> :last-child) {
      +   .lg\\\\:markdown-lg :where(> :last-child) {

      ---

      -   .lg\\\\:prose-xl {
      +   .lg\\\\:markdown-xl {

      ---

      -   .lg\\\\:prose-xl :where(p) {
      +   .lg\\\\:markdown-xl :where(p) {

      ---

      -   .lg\\\\:prose-xl :where([class~='lead']) {
      +   .lg\\\\:markdown-xl :where([class~='lead']) {

      ---

      -   .lg\\\\:prose-xl :where(blockquote) {
      +   .lg\\\\:markdown-xl :where(blockquote) {

      ---

      -   .lg\\\\:prose-xl :where(h1) {
      +   .lg\\\\:markdown-xl :where(h1) {

      ---

      -   .lg\\\\:prose-xl :where(h2) {
      +   .lg\\\\:markdown-xl :where(h2) {

      ---

      -   .lg\\\\:prose-xl :where(h3) {
      +   .lg\\\\:markdown-xl :where(h3) {

      ---

      -   .lg\\\\:prose-xl :where(h4) {
      +   .lg\\\\:markdown-xl :where(h4) {

      ---

      -   .lg\\\\:prose-xl :where(img) {
      +   .lg\\\\:markdown-xl :where(img) {

      ---

      -   .lg\\\\:prose-xl :where(video) {
      +   .lg\\\\:markdown-xl :where(video) {

      ---

      -   .lg\\\\:prose-xl :where(figure) {
      +   .lg\\\\:markdown-xl :where(figure) {

      ---

      -   .lg\\\\:prose-xl :where(figure > *) {
      +   .lg\\\\:markdown-xl :where(figure > *) {

      ---

      -   .lg\\\\:prose-xl :where(figure figcaption) {
      +   .lg\\\\:markdown-xl :where(figure figcaption) {

      ---

      -   .lg\\\\:prose-xl :where(code) {
      +   .lg\\\\:markdown-xl :where(code) {

      ---

      -   .lg\\\\:prose-xl :where(h2 code) {
      +   .lg\\\\:markdown-xl :where(h2 code) {

      ---

      -   .lg\\\\:prose-xl :where(h3 code) {
      +   .lg\\\\:markdown-xl :where(h3 code) {

      ---

      -   .lg\\\\:prose-xl :where(pre) {
      +   .lg\\\\:markdown-xl :where(pre) {

      ---

      -   .lg\\\\:prose-xl :where(ol) {
      +   .lg\\\\:markdown-xl :where(ol) {

      ---

      -   .lg\\\\:prose-xl :where(ul) {
      +   .lg\\\\:markdown-xl :where(ul) {

      ---

      -   .lg\\\\:prose-xl :where(li) {
      +   .lg\\\\:markdown-xl :where(li) {

      ---

      -   .lg\\\\:prose-xl :where(ol > li) {
      +   .lg\\\\:markdown-xl :where(ol > li) {

      ---

      -   .lg\\\\:prose-xl :where(ol > li)::before {
      +   .lg\\\\:markdown-xl :where(ol > li)::before {

      ---

      -   .lg\\\\:prose-xl :where(ul > li) {
      +   .lg\\\\:markdown-xl :where(ul > li) {

      ---

      -   .lg\\\\:prose-xl :where(ul > li)::before {
      +   .lg\\\\:markdown-xl :where(ul > li)::before {

      ---

      -   .lg\\\\:prose-xl :where(> ul > li p) {
      +   .lg\\\\:markdown-xl :where(> ul > li p) {

      ---

      -   .lg\\\\:prose-xl :where(> ul > li > *:first-child) {
      +   .lg\\\\:markdown-xl :where(> ul > li > *:first-child) {

      ---

      -   .lg\\\\:prose-xl :where(> ul > li > *:last-child) {
      +   .lg\\\\:markdown-xl :where(> ul > li > *:last-child) {

      ---

      -   .lg\\\\:prose-xl :where(> ol > li > *:first-child) {
      +   .lg\\\\:markdown-xl :where(> ol > li > *:first-child) {

      ---

      -   .lg\\\\:prose-xl :where(> ol > li > *:last-child) {
      +   .lg\\\\:markdown-xl :where(> ol > li > *:last-child) {

      ---

      -   .lg\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .lg\\\\:markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .lg\\\\:prose-xl :where(hr) {
      +   .lg\\\\:markdown-xl :where(hr) {

      ---

      -   .lg\\\\:prose-xl :where(hr + *) {
      +   .lg\\\\:markdown-xl :where(hr + *) {

      ---

      -   .lg\\\\:prose-xl :where(h2 + *) {
      +   .lg\\\\:markdown-xl :where(h2 + *) {

      ---

      -   .lg\\\\:prose-xl :where(h3 + *) {
      +   .lg\\\\:markdown-xl :where(h3 + *) {

      ---

      -   .lg\\\\:prose-xl :where(h4 + *) {
      +   .lg\\\\:markdown-xl :where(h4 + *) {

      ---

      -   .lg\\\\:prose-xl :where(table) {
      +   .lg\\\\:markdown-xl :where(table) {

      ---

      -   .lg\\\\:prose-xl :where(thead th) {
      +   .lg\\\\:markdown-xl :where(thead th) {

      ---

      -   .lg\\\\:prose-xl :where(thead th:first-child) {
      +   .lg\\\\:markdown-xl :where(thead th:first-child) {

      ---

      -   .lg\\\\:prose-xl :where(thead th:last-child) {
      +   .lg\\\\:markdown-xl :where(thead th:last-child) {

      ---

      -   .lg\\\\:prose-xl :where(tbody td) {
      +   .lg\\\\:markdown-xl :where(tbody td) {

      ---

      -   .lg\\\\:prose-xl :where(tbody td:first-child) {
      +   .lg\\\\:markdown-xl :where(tbody td:first-child) {

      ---

      -   .lg\\\\:prose-xl :where(tbody td:last-child) {
      +   .lg\\\\:markdown-xl :where(tbody td:last-child) {

      ---

      -   .lg\\\\:prose-xl :where(> :first-child) {
      +   .lg\\\\:markdown-xl :where(> :first-child) {

      ---

      -   .lg\\\\:prose-xl :where(> :last-child) {
      +   .lg\\\\:markdown-xl :where(> :last-child) {

      ---

      -   .lg\\\\:prose-2xl {
      +   .lg\\\\:markdown-2xl {

      ---

      -   .lg\\\\:prose-2xl :where(p) {
      +   .lg\\\\:markdown-2xl :where(p) {

      ---

      -   .lg\\\\:prose-2xl :where([class~='lead']) {
      +   .lg\\\\:markdown-2xl :where([class~='lead']) {

      ---

      -   .lg\\\\:prose-2xl :where(blockquote) {
      +   .lg\\\\:markdown-2xl :where(blockquote) {

      ---

      -   .lg\\\\:prose-2xl :where(h1) {
      +   .lg\\\\:markdown-2xl :where(h1) {

      ---

      -   .lg\\\\:prose-2xl :where(h2) {
      +   .lg\\\\:markdown-2xl :where(h2) {

      ---

      -   .lg\\\\:prose-2xl :where(h3) {
      +   .lg\\\\:markdown-2xl :where(h3) {

      ---

      -   .lg\\\\:prose-2xl :where(h4) {
      +   .lg\\\\:markdown-2xl :where(h4) {

      ---

      -   .lg\\\\:prose-2xl :where(img) {
      +   .lg\\\\:markdown-2xl :where(img) {

      ---

      -   .lg\\\\:prose-2xl :where(video) {
      +   .lg\\\\:markdown-2xl :where(video) {

      ---

      -   .lg\\\\:prose-2xl :where(figure) {
      +   .lg\\\\:markdown-2xl :where(figure) {

      ---

      -   .lg\\\\:prose-2xl :where(figure > *) {
      +   .lg\\\\:markdown-2xl :where(figure > *) {

      ---

      -   .lg\\\\:prose-2xl :where(figure figcaption) {
      +   .lg\\\\:markdown-2xl :where(figure figcaption) {

      ---

      -   .lg\\\\:prose-2xl :where(code) {
      +   .lg\\\\:markdown-2xl :where(code) {

      ---

      -   .lg\\\\:prose-2xl :where(h2 code) {
      +   .lg\\\\:markdown-2xl :where(h2 code) {

      ---

      -   .lg\\\\:prose-2xl :where(h3 code) {
      +   .lg\\\\:markdown-2xl :where(h3 code) {

      ---

      -   .lg\\\\:prose-2xl :where(pre) {
      +   .lg\\\\:markdown-2xl :where(pre) {

      ---

      -   .lg\\\\:prose-2xl :where(ol) {
      +   .lg\\\\:markdown-2xl :where(ol) {

      ---

      -   .lg\\\\:prose-2xl :where(ul) {
      +   .lg\\\\:markdown-2xl :where(ul) {

      ---

      -   .lg\\\\:prose-2xl :where(li) {
      +   .lg\\\\:markdown-2xl :where(li) {

      ---

      -   .lg\\\\:prose-2xl :where(ol > li) {
      +   .lg\\\\:markdown-2xl :where(ol > li) {

      ---

      -   .lg\\\\:prose-2xl :where(ol > li)::before {
      +   .lg\\\\:markdown-2xl :where(ol > li)::before {

      ---

      -   .lg\\\\:prose-2xl :where(ul > li) {
      +   .lg\\\\:markdown-2xl :where(ul > li) {

      ---

      -   .lg\\\\:prose-2xl :where(ul > li)::before {
      +   .lg\\\\:markdown-2xl :where(ul > li)::before {

      ---

      -   .lg\\\\:prose-2xl :where(> ul > li p) {
      +   .lg\\\\:markdown-2xl :where(> ul > li p) {

      ---

      -   .lg\\\\:prose-2xl :where(> ul > li > *:first-child) {
      +   .lg\\\\:markdown-2xl :where(> ul > li > *:first-child) {

      ---

      -   .lg\\\\:prose-2xl :where(> ul > li > *:last-child) {
      +   .lg\\\\:markdown-2xl :where(> ul > li > *:last-child) {

      ---

      -   .lg\\\\:prose-2xl :where(> ol > li > *:first-child) {
      +   .lg\\\\:markdown-2xl :where(> ol > li > *:first-child) {

      ---

      -   .lg\\\\:prose-2xl :where(> ol > li > *:last-child) {
      +   .lg\\\\:markdown-2xl :where(> ol > li > *:last-child) {

      ---

      -   .lg\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .lg\\\\:markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .lg\\\\:prose-2xl :where(hr) {
      +   .lg\\\\:markdown-2xl :where(hr) {

      ---

      -   .lg\\\\:prose-2xl :where(hr + *) {
      +   .lg\\\\:markdown-2xl :where(hr + *) {

      ---

      -   .lg\\\\:prose-2xl :where(h2 + *) {
      +   .lg\\\\:markdown-2xl :where(h2 + *) {

      ---

      -   .lg\\\\:prose-2xl :where(h3 + *) {
      +   .lg\\\\:markdown-2xl :where(h3 + *) {

      ---

      -   .lg\\\\:prose-2xl :where(h4 + *) {
      +   .lg\\\\:markdown-2xl :where(h4 + *) {

      ---

      -   .lg\\\\:prose-2xl :where(table) {
      +   .lg\\\\:markdown-2xl :where(table) {

      ---

      -   .lg\\\\:prose-2xl :where(thead th) {
      +   .lg\\\\:markdown-2xl :where(thead th) {

      ---

      -   .lg\\\\:prose-2xl :where(thead th:first-child) {
      +   .lg\\\\:markdown-2xl :where(thead th:first-child) {

      ---

      -   .lg\\\\:prose-2xl :where(thead th:last-child) {
      +   .lg\\\\:markdown-2xl :where(thead th:last-child) {

      ---

      -   .lg\\\\:prose-2xl :where(tbody td) {
      +   .lg\\\\:markdown-2xl :where(tbody td) {

      ---

      -   .lg\\\\:prose-2xl :where(tbody td:first-child) {
      +   .lg\\\\:markdown-2xl :where(tbody td:first-child) {

      ---

      -   .lg\\\\:prose-2xl :where(tbody td:last-child) {
      +   .lg\\\\:markdown-2xl :where(tbody td:last-child) {

      ---

      -   .lg\\\\:prose-2xl :where(> :first-child) {
      +   .lg\\\\:markdown-2xl :where(> :first-child) {

      ---

      -   .lg\\\\:prose-2xl :where(> :last-child) {
      +   .lg\\\\:markdown-2xl :where(> :last-child) {

      ---

      -   .lg\\\\:prose-red :where(a) {
      +   .lg\\\\:markdown-red :where(a) {

      ---

      -   .lg\\\\:prose-red :where(a code) {
      +   .lg\\\\:markdown-red :where(a code) {

      ---

      -   .lg\\\\:prose-yellow :where(a) {
      +   .lg\\\\:markdown-yellow :where(a) {

      ---

      -   .lg\\\\:prose-yellow :where(a code) {
      +   .lg\\\\:markdown-yellow :where(a code) {

      ---

      -   .lg\\\\:prose-green :where(a) {
      +   .lg\\\\:markdown-green :where(a) {

      ---

      -   .lg\\\\:prose-green :where(a code) {
      +   .lg\\\\:markdown-green :where(a code) {

      ---

      -   .lg\\\\:prose-blue :where(a) {
      +   .lg\\\\:markdown-blue :where(a) {

      ---

      -   .lg\\\\:prose-blue :where(a code) {
      +   .lg\\\\:markdown-blue :where(a code) {

      ---

      -   .lg\\\\:prose-indigo :where(a) {
      +   .lg\\\\:markdown-indigo :where(a) {

      ---

      -   .lg\\\\:prose-indigo :where(a code) {
      +   .lg\\\\:markdown-indigo :where(a code) {

      ---

      -   .lg\\\\:prose-purple :where(a) {
      +   .lg\\\\:markdown-purple :where(a) {

      ---

      -   .lg\\\\:prose-purple :where(a code) {
      +   .lg\\\\:markdown-purple :where(a code) {

      ---

      -   .lg\\\\:prose-pink :where(a) {
      +   .lg\\\\:markdown-pink :where(a) {

      ---

      -   .lg\\\\:prose-pink :where(a code) {
      +   .lg\\\\:markdown-pink :where(a code) {

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose :where([class~='lead']) {
      +   .xl\\\\:markdown :where([class~='lead']) {

      ---

      -   .xl\\\\:prose :where(a) {
      +   .xl\\\\:markdown :where(a) {

      ---

      -   .xl\\\\:prose :where(strong) {
      +   .xl\\\\:markdown :where(strong) {

      ---

      -   .xl\\\\:prose :where(ol[type='A']) {
      +   .xl\\\\:markdown :where(ol[type='A']) {

      ---

      -   .xl\\\\:prose :where(ol[type='a']) {
      +   .xl\\\\:markdown :where(ol[type='a']) {

      ---

      -   .xl\\\\:prose :where(ol[type='A' s]) {
      +   .xl\\\\:markdown :where(ol[type='A' s]) {

      ---

      -   .xl\\\\:prose :where(ol[type='a' s]) {
      +   .xl\\\\:markdown :where(ol[type='a' s]) {

      ---

      -   .xl\\\\:prose :where(ol[type='I']) {
      +   .xl\\\\:markdown :where(ol[type='I']) {

      ---

      -   .xl\\\\:prose :where(ol[type='i']) {
      +   .xl\\\\:markdown :where(ol[type='i']) {

      ---

      -   .xl\\\\:prose :where(ol[type='I' s]) {
      +   .xl\\\\:markdown :where(ol[type='I' s]) {

      ---

      -   .xl\\\\:prose :where(ol[type='i' s]) {
      +   .xl\\\\:markdown :where(ol[type='i' s]) {

      ---

      -   .xl\\\\:prose :where(ol[type='1']) {
      +   .xl\\\\:markdown :where(ol[type='1']) {

      ---

      -   .xl\\\\:prose :where(ol > li) {
      +   .xl\\\\:markdown :where(ol > li) {

      ---

      -   .xl\\\\:prose :where(ol > li)::before {
      +   .xl\\\\:markdown :where(ol > li)::before {

      ---

      -   .xl\\\\:prose :where(ul > li) {
      +   .xl\\\\:markdown :where(ul > li) {

      ---

      -   .xl\\\\:prose :where(ul > li)::before {
      +   .xl\\\\:markdown :where(ul > li)::before {

      ---

      -   .xl\\\\:prose :where(hr) {
      +   .xl\\\\:markdown :where(hr) {

      ---

      -   .xl\\\\:prose :where(blockquote) {
      +   .xl\\\\:markdown :where(blockquote) {

      ---

      -   .xl\\\\:prose :where(blockquote p:first-of-type)::before {
      +   .xl\\\\:markdown :where(blockquote p:first-of-type)::before {

      ---

      -   .xl\\\\:prose :where(blockquote p:last-of-type)::after {
      +   .xl\\\\:markdown :where(blockquote p:last-of-type)::after {

      ---

      -   .xl\\\\:prose :where(h1) {
      +   .xl\\\\:markdown :where(h1) {

      ---

      -   .xl\\\\:prose :where(h1 strong) {
      +   .xl\\\\:markdown :where(h1 strong) {

      ---

      -   .xl\\\\:prose :where(h2) {
      +   .xl\\\\:markdown :where(h2) {

      ---

      -   .xl\\\\:prose :where(h2 strong) {
      +   .xl\\\\:markdown :where(h2 strong) {

      ---

      -   .xl\\\\:prose :where(h3) {
      +   .xl\\\\:markdown :where(h3) {

      ---

      -   .xl\\\\:prose :where(h3 strong) {
      +   .xl\\\\:markdown :where(h3 strong) {

      ---

      -   .xl\\\\:prose :where(h4) {
      +   .xl\\\\:markdown :where(h4) {

      ---

      -   .xl\\\\:prose :where(h4 strong) {
      +   .xl\\\\:markdown :where(h4 strong) {

      ---

      -   .xl\\\\:prose :where(figure figcaption) {
      +   .xl\\\\:markdown :where(figure figcaption) {

      ---

      -   .xl\\\\:prose :where(code) {
      +   .xl\\\\:markdown :where(code) {

      ---

      -   .xl\\\\:prose :where(code)::before {
      +   .xl\\\\:markdown :where(code)::before {

      ---

      -   .xl\\\\:prose :where(code)::after {
      +   .xl\\\\:markdown :where(code)::after {

      ---

      -   .xl\\\\:prose :where(a code) {
      +   .xl\\\\:markdown :where(a code) {

      ---

      -   .xl\\\\:prose :where(pre) {
      +   .xl\\\\:markdown :where(pre) {

      ---

      -   .xl\\\\:prose :where(pre code) {
      +   .xl\\\\:markdown :where(pre code) {

      ---

      -   .xl\\\\:prose :where(pre code)::before {
      +   .xl\\\\:markdown :where(pre code)::before {

      ---

      -   .xl\\\\:prose :where(pre code)::after {
      +   .xl\\\\:markdown :where(pre code)::after {

      ---

      -   .xl\\\\:prose :where(table) {
      +   .xl\\\\:markdown :where(table) {

      ---

      -   .xl\\\\:prose :where(thead) {
      +   .xl\\\\:markdown :where(thead) {

      ---

      -   .xl\\\\:prose :where(thead th) {
      +   .xl\\\\:markdown :where(thead th) {

      ---

      -   .xl\\\\:prose :where(tbody tr) {
      +   .xl\\\\:markdown :where(tbody tr) {

      ---

      -   .xl\\\\:prose :where(tbody tr:last-child) {
      +   .xl\\\\:markdown :where(tbody tr:last-child) {

      ---

      -   .xl\\\\:prose :where(tbody td) {
      +   .xl\\\\:markdown :where(tbody td) {

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose :where(p) {
      +   .xl\\\\:markdown :where(p) {

      ---

      -   .xl\\\\:prose :where(img) {
      +   .xl\\\\:markdown :where(img) {

      ---

      -   .xl\\\\:prose :where(video) {
      +   .xl\\\\:markdown :where(video) {

      ---

      -   .xl\\\\:prose :where(figure) {
      +   .xl\\\\:markdown :where(figure) {

      ---

      -   .xl\\\\:prose :where(figure > *) {
      +   .xl\\\\:markdown :where(figure > *) {

      ---

      -   .xl\\\\:prose :where(h2 code) {
      +   .xl\\\\:markdown :where(h2 code) {

      ---

      -   .xl\\\\:prose :where(h3 code) {
      +   .xl\\\\:markdown :where(h3 code) {

      ---

      -   .xl\\\\:prose :where(ol) {
      +   .xl\\\\:markdown :where(ol) {

      ---

      -   .xl\\\\:prose :where(ul) {
      +   .xl\\\\:markdown :where(ul) {

      ---

      -   .xl\\\\:prose :where(li) {
      +   .xl\\\\:markdown :where(li) {

      ---

      -   .xl\\\\:prose :where(> ul > li p) {
      +   .xl\\\\:markdown :where(> ul > li p) {

      ---

      -   .xl\\\\:prose :where(> ul > li > *:first-child) {
      +   .xl\\\\:markdown :where(> ul > li > *:first-child) {

      ---

      -   .xl\\\\:prose :where(> ul > li > *:last-child) {
      +   .xl\\\\:markdown :where(> ul > li > *:last-child) {

      ---

      -   .xl\\\\:prose :where(> ol > li > *:first-child) {
      +   .xl\\\\:markdown :where(> ol > li > *:first-child) {

      ---

      -   .xl\\\\:prose :where(> ol > li > *:last-child) {
      +   .xl\\\\:markdown :where(> ol > li > *:last-child) {

      ---

      -   .xl\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
      +   .xl\\\\:markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .xl\\\\:prose :where(hr + *) {
      +   .xl\\\\:markdown :where(hr + *) {

      ---

      -   .xl\\\\:prose :where(h2 + *) {
      +   .xl\\\\:markdown :where(h2 + *) {

      ---

      -   .xl\\\\:prose :where(h3 + *) {
      +   .xl\\\\:markdown :where(h3 + *) {

      ---

      -   .xl\\\\:prose :where(h4 + *) {
      +   .xl\\\\:markdown :where(h4 + *) {

      ---

      -   .xl\\\\:prose :where(thead th:first-child) {
      +   .xl\\\\:markdown :where(thead th:first-child) {

      ---

      -   .xl\\\\:prose :where(thead th:last-child) {
      +   .xl\\\\:markdown :where(thead th:last-child) {

      ---

      -   .xl\\\\:prose :where(tbody td:first-child) {
      +   .xl\\\\:markdown :where(tbody td:first-child) {

      ---

      -   .xl\\\\:prose :where(tbody td:last-child) {
      +   .xl\\\\:markdown :where(tbody td:last-child) {

      ---

      -   .xl\\\\:prose :where(> :first-child) {
      +   .xl\\\\:markdown :where(> :first-child) {

      ---

      -   .xl\\\\:prose :where(> :last-child) {
      +   .xl\\\\:markdown :where(> :last-child) {

      ---

      -   .xl\\\\:prose-sm {
      +   .xl\\\\:markdown-sm {

      ---

      -   .xl\\\\:prose-sm :where(p) {
      +   .xl\\\\:markdown-sm :where(p) {

      ---

      -   .xl\\\\:prose-sm :where([class~='lead']) {
      +   .xl\\\\:markdown-sm :where([class~='lead']) {

      ---

      -   .xl\\\\:prose-sm :where(blockquote) {
      +   .xl\\\\:markdown-sm :where(blockquote) {

      ---

      -   .xl\\\\:prose-sm :where(h1) {
      +   .xl\\\\:markdown-sm :where(h1) {

      ---

      -   .xl\\\\:prose-sm :where(h2) {
      +   .xl\\\\:markdown-sm :where(h2) {

      ---

      -   .xl\\\\:prose-sm :where(h3) {
      +   .xl\\\\:markdown-sm :where(h3) {

      ---

      -   .xl\\\\:prose-sm :where(h4) {
      +   .xl\\\\:markdown-sm :where(h4) {

      ---

      -   .xl\\\\:prose-sm :where(img) {
      +   .xl\\\\:markdown-sm :where(img) {

      ---

      -   .xl\\\\:prose-sm :where(video) {
      +   .xl\\\\:markdown-sm :where(video) {

      ---

      -   .xl\\\\:prose-sm :where(figure) {
      +   .xl\\\\:markdown-sm :where(figure) {

      ---

      -   .xl\\\\:prose-sm :where(figure > *) {
      +   .xl\\\\:markdown-sm :where(figure > *) {

      ---

      -   .xl\\\\:prose-sm :where(figure figcaption) {
      +   .xl\\\\:markdown-sm :where(figure figcaption) {

      ---

      -   .xl\\\\:prose-sm :where(code) {
      +   .xl\\\\:markdown-sm :where(code) {

      ---

      -   .xl\\\\:prose-sm :where(h2 code) {
      +   .xl\\\\:markdown-sm :where(h2 code) {

      ---

      -   .xl\\\\:prose-sm :where(h3 code) {
      +   .xl\\\\:markdown-sm :where(h3 code) {

      ---

      -   .xl\\\\:prose-sm :where(pre) {
      +   .xl\\\\:markdown-sm :where(pre) {

      ---

      -   .xl\\\\:prose-sm :where(ol) {
      +   .xl\\\\:markdown-sm :where(ol) {

      ---

      -   .xl\\\\:prose-sm :where(ul) {
      +   .xl\\\\:markdown-sm :where(ul) {

      ---

      -   .xl\\\\:prose-sm :where(li) {
      +   .xl\\\\:markdown-sm :where(li) {

      ---

      -   .xl\\\\:prose-sm :where(ol > li) {
      +   .xl\\\\:markdown-sm :where(ol > li) {

      ---

      -   .xl\\\\:prose-sm :where(ol > li)::before {
      +   .xl\\\\:markdown-sm :where(ol > li)::before {

      ---

      -   .xl\\\\:prose-sm :where(ul > li) {
      +   .xl\\\\:markdown-sm :where(ul > li) {

      ---

      -   .xl\\\\:prose-sm :where(ul > li)::before {
      +   .xl\\\\:markdown-sm :where(ul > li)::before {

      ---

      -   .xl\\\\:prose-sm :where(> ul > li p) {
      +   .xl\\\\:markdown-sm :where(> ul > li p) {

      ---

      -   .xl\\\\:prose-sm :where(> ul > li > *:first-child) {
      +   .xl\\\\:markdown-sm :where(> ul > li > *:first-child) {

      ---

      -   .xl\\\\:prose-sm :where(> ul > li > *:last-child) {
      +   .xl\\\\:markdown-sm :where(> ul > li > *:last-child) {

      ---

      -   .xl\\\\:prose-sm :where(> ol > li > *:first-child) {
      +   .xl\\\\:markdown-sm :where(> ol > li > *:first-child) {

      ---

      -   .xl\\\\:prose-sm :where(> ol > li > *:last-child) {
      +   .xl\\\\:markdown-sm :where(> ol > li > *:last-child) {

      ---

      -   .xl\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      +   .xl\\\\:markdown-sm :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .xl\\\\:prose-sm :where(hr) {
      +   .xl\\\\:markdown-sm :where(hr) {

      ---

      -   .xl\\\\:prose-sm :where(hr + *) {
      +   .xl\\\\:markdown-sm :where(hr + *) {

      ---

      -   .xl\\\\:prose-sm :where(h2 + *) {
      +   .xl\\\\:markdown-sm :where(h2 + *) {

      ---

      -   .xl\\\\:prose-sm :where(h3 + *) {
      +   .xl\\\\:markdown-sm :where(h3 + *) {

      ---

      -   .xl\\\\:prose-sm :where(h4 + *) {
      +   .xl\\\\:markdown-sm :where(h4 + *) {

      ---

      -   .xl\\\\:prose-sm :where(table) {
      +   .xl\\\\:markdown-sm :where(table) {

      ---

      -   .xl\\\\:prose-sm :where(thead th) {
      +   .xl\\\\:markdown-sm :where(thead th) {

      ---

      -   .xl\\\\:prose-sm :where(thead th:first-child) {
      +   .xl\\\\:markdown-sm :where(thead th:first-child) {

      ---

      -   .xl\\\\:prose-sm :where(thead th:last-child) {
      +   .xl\\\\:markdown-sm :where(thead th:last-child) {

      ---

      -   .xl\\\\:prose-sm :where(tbody td) {
      +   .xl\\\\:markdown-sm :where(tbody td) {

      ---

      -   .xl\\\\:prose-sm :where(tbody td:first-child) {
      +   .xl\\\\:markdown-sm :where(tbody td:first-child) {

      ---

      -   .xl\\\\:prose-sm :where(tbody td:last-child) {
      +   .xl\\\\:markdown-sm :where(tbody td:last-child) {

      ---

      -   .xl\\\\:prose-sm :where(> :first-child) {
      +   .xl\\\\:markdown-sm :where(> :first-child) {

      ---

      -   .xl\\\\:prose-sm :where(> :last-child) {
      +   .xl\\\\:markdown-sm :where(> :last-child) {

      ---

      -   .xl\\\\:prose-lg {
      +   .xl\\\\:markdown-lg {

      ---

      -   .xl\\\\:prose-lg :where(p) {
      +   .xl\\\\:markdown-lg :where(p) {

      ---

      -   .xl\\\\:prose-lg :where([class~='lead']) {
      +   .xl\\\\:markdown-lg :where([class~='lead']) {

      ---

      -   .xl\\\\:prose-lg :where(blockquote) {
      +   .xl\\\\:markdown-lg :where(blockquote) {

      ---

      -   .xl\\\\:prose-lg :where(h1) {
      +   .xl\\\\:markdown-lg :where(h1) {

      ---

      -   .xl\\\\:prose-lg :where(h2) {
      +   .xl\\\\:markdown-lg :where(h2) {

      ---

      -   .xl\\\\:prose-lg :where(h3) {
      +   .xl\\\\:markdown-lg :where(h3) {

      ---

      -   .xl\\\\:prose-lg :where(h4) {
      +   .xl\\\\:markdown-lg :where(h4) {

      ---

      -   .xl\\\\:prose-lg :where(img) {
      +   .xl\\\\:markdown-lg :where(img) {

      ---

      -   .xl\\\\:prose-lg :where(video) {
      +   .xl\\\\:markdown-lg :where(video) {

      ---

      -   .xl\\\\:prose-lg :where(figure) {
      +   .xl\\\\:markdown-lg :where(figure) {

      ---

      -   .xl\\\\:prose-lg :where(figure > *) {
      +   .xl\\\\:markdown-lg :where(figure > *) {

      ---

      -   .xl\\\\:prose-lg :where(figure figcaption) {
      +   .xl\\\\:markdown-lg :where(figure figcaption) {

      ---

      -   .xl\\\\:prose-lg :where(code) {
      +   .xl\\\\:markdown-lg :where(code) {

      ---

      -   .xl\\\\:prose-lg :where(h2 code) {
      +   .xl\\\\:markdown-lg :where(h2 code) {

      ---

      -   .xl\\\\:prose-lg :where(h3 code) {
      +   .xl\\\\:markdown-lg :where(h3 code) {

      ---

      -   .xl\\\\:prose-lg :where(pre) {
      +   .xl\\\\:markdown-lg :where(pre) {

      ---

      -   .xl\\\\:prose-lg :where(ol) {
      +   .xl\\\\:markdown-lg :where(ol) {

      ---

      -   .xl\\\\:prose-lg :where(ul) {
      +   .xl\\\\:markdown-lg :where(ul) {

      ---

      -   .xl\\\\:prose-lg :where(li) {
      +   .xl\\\\:markdown-lg :where(li) {

      ---

      -   .xl\\\\:prose-lg :where(ol > li) {
      +   .xl\\\\:markdown-lg :where(ol > li) {

      ---

      -   .xl\\\\:prose-lg :where(ol > li)::before {
      +   .xl\\\\:markdown-lg :where(ol > li)::before {

      ---

      -   .xl\\\\:prose-lg :where(ul > li) {
      +   .xl\\\\:markdown-lg :where(ul > li) {

      ---

      -   .xl\\\\:prose-lg :where(ul > li)::before {
      +   .xl\\\\:markdown-lg :where(ul > li)::before {

      ---

      -   .xl\\\\:prose-lg :where(> ul > li p) {
      +   .xl\\\\:markdown-lg :where(> ul > li p) {

      ---

      -   .xl\\\\:prose-lg :where(> ul > li > *:first-child) {
      +   .xl\\\\:markdown-lg :where(> ul > li > *:first-child) {

      ---

      -   .xl\\\\:prose-lg :where(> ul > li > *:last-child) {
      +   .xl\\\\:markdown-lg :where(> ul > li > *:last-child) {

      ---

      -   .xl\\\\:prose-lg :where(> ol > li > *:first-child) {
      +   .xl\\\\:markdown-lg :where(> ol > li > *:first-child) {

      ---

      -   .xl\\\\:prose-lg :where(> ol > li > *:last-child) {
      +   .xl\\\\:markdown-lg :where(> ol > li > *:last-child) {

      ---

      -   .xl\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      +   .xl\\\\:markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .xl\\\\:prose-lg :where(hr) {
      +   .xl\\\\:markdown-lg :where(hr) {

      ---

      -   .xl\\\\:prose-lg :where(hr + *) {
      +   .xl\\\\:markdown-lg :where(hr + *) {

      ---

      -   .xl\\\\:prose-lg :where(h2 + *) {
      +   .xl\\\\:markdown-lg :where(h2 + *) {

      ---

      -   .xl\\\\:prose-lg :where(h3 + *) {
      +   .xl\\\\:markdown-lg :where(h3 + *) {

      ---

      -   .xl\\\\:prose-lg :where(h4 + *) {
      +   .xl\\\\:markdown-lg :where(h4 + *) {

      ---

      -   .xl\\\\:prose-lg :where(table) {
      +   .xl\\\\:markdown-lg :where(table) {

      ---

      -   .xl\\\\:prose-lg :where(thead th) {
      +   .xl\\\\:markdown-lg :where(thead th) {

      ---

      -   .xl\\\\:prose-lg :where(thead th:first-child) {
      +   .xl\\\\:markdown-lg :where(thead th:first-child) {

      ---

      -   .xl\\\\:prose-lg :where(thead th:last-child) {
      +   .xl\\\\:markdown-lg :where(thead th:last-child) {

      ---

      -   .xl\\\\:prose-lg :where(tbody td) {
      +   .xl\\\\:markdown-lg :where(tbody td) {

      ---

      -   .xl\\\\:prose-lg :where(tbody td:first-child) {
      +   .xl\\\\:markdown-lg :where(tbody td:first-child) {

      ---

      -   .xl\\\\:prose-lg :where(tbody td:last-child) {
      +   .xl\\\\:markdown-lg :where(tbody td:last-child) {

      ---

      -   .xl\\\\:prose-lg :where(> :first-child) {
      +   .xl\\\\:markdown-lg :where(> :first-child) {

      ---

      -   .xl\\\\:prose-lg :where(> :last-child) {
      +   .xl\\\\:markdown-lg :where(> :last-child) {

      ---

      -   .xl\\\\:prose-xl {
      +   .xl\\\\:markdown-xl {

      ---

      -   .xl\\\\:prose-xl :where(p) {
      +   .xl\\\\:markdown-xl :where(p) {

      ---

      -   .xl\\\\:prose-xl :where([class~='lead']) {
      +   .xl\\\\:markdown-xl :where([class~='lead']) {

      ---

      -   .xl\\\\:prose-xl :where(blockquote) {
      +   .xl\\\\:markdown-xl :where(blockquote) {

      ---

      -   .xl\\\\:prose-xl :where(h1) {
      +   .xl\\\\:markdown-xl :where(h1) {

      ---

      -   .xl\\\\:prose-xl :where(h2) {
      +   .xl\\\\:markdown-xl :where(h2) {

      ---

      -   .xl\\\\:prose-xl :where(h3) {
      +   .xl\\\\:markdown-xl :where(h3) {

      ---

      -   .xl\\\\:prose-xl :where(h4) {
      +   .xl\\\\:markdown-xl :where(h4) {

      ---

      -   .xl\\\\:prose-xl :where(img) {
      +   .xl\\\\:markdown-xl :where(img) {

      ---

      -   .xl\\\\:prose-xl :where(video) {
      +   .xl\\\\:markdown-xl :where(video) {

      ---

      -   .xl\\\\:prose-xl :where(figure) {
      +   .xl\\\\:markdown-xl :where(figure) {

      ---

      -   .xl\\\\:prose-xl :where(figure > *) {
      +   .xl\\\\:markdown-xl :where(figure > *) {

      ---

      -   .xl\\\\:prose-xl :where(figure figcaption) {
      +   .xl\\\\:markdown-xl :where(figure figcaption) {

      ---

      -   .xl\\\\:prose-xl :where(code) {
      +   .xl\\\\:markdown-xl :where(code) {

      ---

      -   .xl\\\\:prose-xl :where(h2 code) {
      +   .xl\\\\:markdown-xl :where(h2 code) {

      ---

      -   .xl\\\\:prose-xl :where(h3 code) {
      +   .xl\\\\:markdown-xl :where(h3 code) {

      ---

      -   .xl\\\\:prose-xl :where(pre) {
      +   .xl\\\\:markdown-xl :where(pre) {

      ---

      -   .xl\\\\:prose-xl :where(ol) {
      +   .xl\\\\:markdown-xl :where(ol) {

      ---

      -   .xl\\\\:prose-xl :where(ul) {
      +   .xl\\\\:markdown-xl :where(ul) {

      ---

      -   .xl\\\\:prose-xl :where(li) {
      +   .xl\\\\:markdown-xl :where(li) {

      ---

      -   .xl\\\\:prose-xl :where(ol > li) {
      +   .xl\\\\:markdown-xl :where(ol > li) {

      ---

      -   .xl\\\\:prose-xl :where(ol > li)::before {
      +   .xl\\\\:markdown-xl :where(ol > li)::before {

      ---

      -   .xl\\\\:prose-xl :where(ul > li) {
      +   .xl\\\\:markdown-xl :where(ul > li) {

      ---

      -   .xl\\\\:prose-xl :where(ul > li)::before {
      +   .xl\\\\:markdown-xl :where(ul > li)::before {

      ---

      -   .xl\\\\:prose-xl :where(> ul > li p) {
      +   .xl\\\\:markdown-xl :where(> ul > li p) {

      ---

      -   .xl\\\\:prose-xl :where(> ul > li > *:first-child) {
      +   .xl\\\\:markdown-xl :where(> ul > li > *:first-child) {

      ---

      -   .xl\\\\:prose-xl :where(> ul > li > *:last-child) {
      +   .xl\\\\:markdown-xl :where(> ul > li > *:last-child) {

      ---

      -   .xl\\\\:prose-xl :where(> ol > li > *:first-child) {
      +   .xl\\\\:markdown-xl :where(> ol > li > *:first-child) {

      ---

      -   .xl\\\\:prose-xl :where(> ol > li > *:last-child) {
      +   .xl\\\\:markdown-xl :where(> ol > li > *:last-child) {

      ---

      -   .xl\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .xl\\\\:markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .xl\\\\:prose-xl :where(hr) {
      +   .xl\\\\:markdown-xl :where(hr) {

      ---

      -   .xl\\\\:prose-xl :where(hr + *) {
      +   .xl\\\\:markdown-xl :where(hr + *) {

      ---

      -   .xl\\\\:prose-xl :where(h2 + *) {
      +   .xl\\\\:markdown-xl :where(h2 + *) {

      ---

      -   .xl\\\\:prose-xl :where(h3 + *) {
      +   .xl\\\\:markdown-xl :where(h3 + *) {

      ---

      -   .xl\\\\:prose-xl :where(h4 + *) {
      +   .xl\\\\:markdown-xl :where(h4 + *) {

      ---

      -   .xl\\\\:prose-xl :where(table) {
      +   .xl\\\\:markdown-xl :where(table) {

      ---

      -   .xl\\\\:prose-xl :where(thead th) {
      +   .xl\\\\:markdown-xl :where(thead th) {

      ---

      -   .xl\\\\:prose-xl :where(thead th:first-child) {
      +   .xl\\\\:markdown-xl :where(thead th:first-child) {

      ---

      -   .xl\\\\:prose-xl :where(thead th:last-child) {
      +   .xl\\\\:markdown-xl :where(thead th:last-child) {

      ---

      -   .xl\\\\:prose-xl :where(tbody td) {
      +   .xl\\\\:markdown-xl :where(tbody td) {

      ---

      -   .xl\\\\:prose-xl :where(tbody td:first-child) {
      +   .xl\\\\:markdown-xl :where(tbody td:first-child) {

      ---

      -   .xl\\\\:prose-xl :where(tbody td:last-child) {
      +   .xl\\\\:markdown-xl :where(tbody td:last-child) {

      ---

      -   .xl\\\\:prose-xl :where(> :first-child) {
      +   .xl\\\\:markdown-xl :where(> :first-child) {

      ---

      -   .xl\\\\:prose-xl :where(> :last-child) {
      +   .xl\\\\:markdown-xl :where(> :last-child) {

      ---

      -   .xl\\\\:prose-2xl {
      +   .xl\\\\:markdown-2xl {

      ---

      -   .xl\\\\:prose-2xl :where(p) {
      +   .xl\\\\:markdown-2xl :where(p) {

      ---

      -   .xl\\\\:prose-2xl :where([class~='lead']) {
      +   .xl\\\\:markdown-2xl :where([class~='lead']) {

      ---

      -   .xl\\\\:prose-2xl :where(blockquote) {
      +   .xl\\\\:markdown-2xl :where(blockquote) {

      ---

      -   .xl\\\\:prose-2xl :where(h1) {
      +   .xl\\\\:markdown-2xl :where(h1) {

      ---

      -   .xl\\\\:prose-2xl :where(h2) {
      +   .xl\\\\:markdown-2xl :where(h2) {

      ---

      -   .xl\\\\:prose-2xl :where(h3) {
      +   .xl\\\\:markdown-2xl :where(h3) {

      ---

      -   .xl\\\\:prose-2xl :where(h4) {
      +   .xl\\\\:markdown-2xl :where(h4) {

      ---

      -   .xl\\\\:prose-2xl :where(img) {
      +   .xl\\\\:markdown-2xl :where(img) {

      ---

      -   .xl\\\\:prose-2xl :where(video) {
      +   .xl\\\\:markdown-2xl :where(video) {

      ---

      -   .xl\\\\:prose-2xl :where(figure) {
      +   .xl\\\\:markdown-2xl :where(figure) {

      ---

      -   .xl\\\\:prose-2xl :where(figure > *) {
      +   .xl\\\\:markdown-2xl :where(figure > *) {

      ---

      -   .xl\\\\:prose-2xl :where(figure figcaption) {
      +   .xl\\\\:markdown-2xl :where(figure figcaption) {

      ---

      -   .xl\\\\:prose-2xl :where(code) {
      +   .xl\\\\:markdown-2xl :where(code) {

      ---

      -   .xl\\\\:prose-2xl :where(h2 code) {
      +   .xl\\\\:markdown-2xl :where(h2 code) {

      ---

      -   .xl\\\\:prose-2xl :where(h3 code) {
      +   .xl\\\\:markdown-2xl :where(h3 code) {

      ---

      -   .xl\\\\:prose-2xl :where(pre) {
      +   .xl\\\\:markdown-2xl :where(pre) {

      ---

      -   .xl\\\\:prose-2xl :where(ol) {
      +   .xl\\\\:markdown-2xl :where(ol) {

      ---

      -   .xl\\\\:prose-2xl :where(ul) {
      +   .xl\\\\:markdown-2xl :where(ul) {

      ---

      -   .xl\\\\:prose-2xl :where(li) {
      +   .xl\\\\:markdown-2xl :where(li) {

      ---

      -   .xl\\\\:prose-2xl :where(ol > li) {
      +   .xl\\\\:markdown-2xl :where(ol > li) {

      ---

      -   .xl\\\\:prose-2xl :where(ol > li)::before {
      +   .xl\\\\:markdown-2xl :where(ol > li)::before {

      ---

      -   .xl\\\\:prose-2xl :where(ul > li) {
      +   .xl\\\\:markdown-2xl :where(ul > li) {

      ---

      -   .xl\\\\:prose-2xl :where(ul > li)::before {
      +   .xl\\\\:markdown-2xl :where(ul > li)::before {

      ---

      -   .xl\\\\:prose-2xl :where(> ul > li p) {
      +   .xl\\\\:markdown-2xl :where(> ul > li p) {

      ---

      -   .xl\\\\:prose-2xl :where(> ul > li > *:first-child) {
      +   .xl\\\\:markdown-2xl :where(> ul > li > *:first-child) {

      ---

      -   .xl\\\\:prose-2xl :where(> ul > li > *:last-child) {
      +   .xl\\\\:markdown-2xl :where(> ul > li > *:last-child) {

      ---

      -   .xl\\\\:prose-2xl :where(> ol > li > *:first-child) {
      +   .xl\\\\:markdown-2xl :where(> ol > li > *:first-child) {

      ---

      -   .xl\\\\:prose-2xl :where(> ol > li > *:last-child) {
      +   .xl\\\\:markdown-2xl :where(> ol > li > *:last-child) {

      ---

      -   .xl\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .xl\\\\:markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .xl\\\\:prose-2xl :where(hr) {
      +   .xl\\\\:markdown-2xl :where(hr) {

      ---

      -   .xl\\\\:prose-2xl :where(hr + *) {
      +   .xl\\\\:markdown-2xl :where(hr + *) {

      ---

      -   .xl\\\\:prose-2xl :where(h2 + *) {
      +   .xl\\\\:markdown-2xl :where(h2 + *) {

      ---

      -   .xl\\\\:prose-2xl :where(h3 + *) {
      +   .xl\\\\:markdown-2xl :where(h3 + *) {

      ---

      -   .xl\\\\:prose-2xl :where(h4 + *) {
      +   .xl\\\\:markdown-2xl :where(h4 + *) {

      ---

      -   .xl\\\\:prose-2xl :where(table) {
      +   .xl\\\\:markdown-2xl :where(table) {

      ---

      -   .xl\\\\:prose-2xl :where(thead th) {
      +   .xl\\\\:markdown-2xl :where(thead th) {

      ---

      -   .xl\\\\:prose-2xl :where(thead th:first-child) {
      +   .xl\\\\:markdown-2xl :where(thead th:first-child) {

      ---

      -   .xl\\\\:prose-2xl :where(thead th:last-child) {
      +   .xl\\\\:markdown-2xl :where(thead th:last-child) {

      ---

      -   .xl\\\\:prose-2xl :where(tbody td) {
      +   .xl\\\\:markdown-2xl :where(tbody td) {

      ---

      -   .xl\\\\:prose-2xl :where(tbody td:first-child) {
      +   .xl\\\\:markdown-2xl :where(tbody td:first-child) {

      ---

      -   .xl\\\\:prose-2xl :where(tbody td:last-child) {
      +   .xl\\\\:markdown-2xl :where(tbody td:last-child) {

      ---

      -   .xl\\\\:prose-2xl :where(> :first-child) {
      +   .xl\\\\:markdown-2xl :where(> :first-child) {

      ---

      -   .xl\\\\:prose-2xl :where(> :last-child) {
      +   .xl\\\\:markdown-2xl :where(> :last-child) {

      ---

      -   .xl\\\\:prose-red :where(a) {
      +   .xl\\\\:markdown-red :where(a) {

      ---

      -   .xl\\\\:prose-red :where(a code) {
      +   .xl\\\\:markdown-red :where(a code) {

      ---

      -   .xl\\\\:prose-yellow :where(a) {
      +   .xl\\\\:markdown-yellow :where(a) {

      ---

      -   .xl\\\\:prose-yellow :where(a code) {
      +   .xl\\\\:markdown-yellow :where(a code) {

      ---

      -   .xl\\\\:prose-green :where(a) {
      +   .xl\\\\:markdown-green :where(a) {

      ---

      -   .xl\\\\:prose-green :where(a code) {
      +   .xl\\\\:markdown-green :where(a code) {

      ---

      -   .xl\\\\:prose-blue :where(a) {
      +   .xl\\\\:markdown-blue :where(a) {

      ---

      -   .xl\\\\:prose-blue :where(a code) {
      +   .xl\\\\:markdown-blue :where(a code) {

      ---

      -   .xl\\\\:prose-indigo :where(a) {
      +   .xl\\\\:markdown-indigo :where(a) {

      ---

      -   .xl\\\\:prose-indigo :where(a code) {
      +   .xl\\\\:markdown-indigo :where(a code) {

      ---

      -   .xl\\\\:prose-purple :where(a) {
      +   .xl\\\\:markdown-purple :where(a) {

      ---

      -   .xl\\\\:prose-purple :where(a code) {
      +   .xl\\\\:markdown-purple :where(a code) {

      ---

      -   .xl\\\\:prose-pink :where(a) {
      +   .xl\\\\:markdown-pink :where(a) {

      ---

      -   .xl\\\\:prose-pink :where(a code) {
      +   .xl\\\\:markdown-pink :where(a code) {

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose :where([class~='lead']) {
      +   .\\\\32xl\\\\:markdown :where([class~='lead']) {

      ---

      -   .\\\\32xl\\\\:prose :where(a) {
      +   .\\\\32xl\\\\:markdown :where(a) {

      ---

      -   .\\\\32xl\\\\:prose :where(strong) {
      +   .\\\\32xl\\\\:markdown :where(strong) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='A']) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='A']) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='a']) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='a']) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='A' s]) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='A' s]) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='a' s]) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='a' s]) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='I']) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='I']) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='i']) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='i']) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='I' s]) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='I' s]) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='i' s]) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='i' s]) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='1']) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='1']) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol > li) {
      +   .\\\\32xl\\\\:markdown :where(ol > li) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol > li)::before {
      +   .\\\\32xl\\\\:markdown :where(ol > li)::before {

      ---

      -   .\\\\32xl\\\\:prose :where(ul > li) {
      +   .\\\\32xl\\\\:markdown :where(ul > li) {

      ---

      -   .\\\\32xl\\\\:prose :where(ul > li)::before {
      +   .\\\\32xl\\\\:markdown :where(ul > li)::before {

      ---

      -   .\\\\32xl\\\\:prose :where(hr) {
      +   .\\\\32xl\\\\:markdown :where(hr) {

      ---

      -   .\\\\32xl\\\\:prose :where(blockquote) {
      +   .\\\\32xl\\\\:markdown :where(blockquote) {

      ---

      -   .\\\\32xl\\\\:prose :where(blockquote p:first-of-type)::before {
      +   .\\\\32xl\\\\:markdown :where(blockquote p:first-of-type)::before {

      ---

      -   .\\\\32xl\\\\:prose :where(blockquote p:last-of-type)::after {
      +   .\\\\32xl\\\\:markdown :where(blockquote p:last-of-type)::after {

      ---

      -   .\\\\32xl\\\\:prose :where(h1) {
      +   .\\\\32xl\\\\:markdown :where(h1) {

      ---

      -   .\\\\32xl\\\\:prose :where(h1 strong) {
      +   .\\\\32xl\\\\:markdown :where(h1 strong) {

      ---

      -   .\\\\32xl\\\\:prose :where(h2) {
      +   .\\\\32xl\\\\:markdown :where(h2) {

      ---

      -   .\\\\32xl\\\\:prose :where(h2 strong) {
      +   .\\\\32xl\\\\:markdown :where(h2 strong) {

      ---

      -   .\\\\32xl\\\\:prose :where(h3) {
      +   .\\\\32xl\\\\:markdown :where(h3) {

      ---

      -   .\\\\32xl\\\\:prose :where(h3 strong) {
      +   .\\\\32xl\\\\:markdown :where(h3 strong) {

      ---

      -   .\\\\32xl\\\\:prose :where(h4) {
      +   .\\\\32xl\\\\:markdown :where(h4) {

      ---

      -   .\\\\32xl\\\\:prose :where(h4 strong) {
      +   .\\\\32xl\\\\:markdown :where(h4 strong) {

      ---

      -   .\\\\32xl\\\\:prose :where(figure figcaption) {
      +   .\\\\32xl\\\\:markdown :where(figure figcaption) {

      ---

      -   .\\\\32xl\\\\:prose :where(code) {
      +   .\\\\32xl\\\\:markdown :where(code) {

      ---

      -   .\\\\32xl\\\\:prose :where(code)::before {
      +   .\\\\32xl\\\\:markdown :where(code)::before {

      ---

      -   .\\\\32xl\\\\:prose :where(code)::after {
      +   .\\\\32xl\\\\:markdown :where(code)::after {

      ---

      -   .\\\\32xl\\\\:prose :where(a code) {
      +   .\\\\32xl\\\\:markdown :where(a code) {

      ---

      -   .\\\\32xl\\\\:prose :where(pre) {
      +   .\\\\32xl\\\\:markdown :where(pre) {

      ---

      -   .\\\\32xl\\\\:prose :where(pre code) {
      +   .\\\\32xl\\\\:markdown :where(pre code) {

      ---

      -   .\\\\32xl\\\\:prose :where(pre code)::before {
      +   .\\\\32xl\\\\:markdown :where(pre code)::before {

      ---

      -   .\\\\32xl\\\\:prose :where(pre code)::after {
      +   .\\\\32xl\\\\:markdown :where(pre code)::after {

      ---

      -   .\\\\32xl\\\\:prose :where(table) {
      +   .\\\\32xl\\\\:markdown :where(table) {

      ---

      -   .\\\\32xl\\\\:prose :where(thead) {
      +   .\\\\32xl\\\\:markdown :where(thead) {

      ---

      -   .\\\\32xl\\\\:prose :where(thead th) {
      +   .\\\\32xl\\\\:markdown :where(thead th) {

      ---

      -   .\\\\32xl\\\\:prose :where(tbody tr) {
      +   .\\\\32xl\\\\:markdown :where(tbody tr) {

      ---

      -   .\\\\32xl\\\\:prose :where(tbody tr:last-child) {
      +   .\\\\32xl\\\\:markdown :where(tbody tr:last-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(tbody td) {
      +   .\\\\32xl\\\\:markdown :where(tbody td) {

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose :where(p) {
      +   .\\\\32xl\\\\:markdown :where(p) {

      ---

      -   .\\\\32xl\\\\:prose :where(img) {
      +   .\\\\32xl\\\\:markdown :where(img) {

      ---

      -   .\\\\32xl\\\\:prose :where(video) {
      +   .\\\\32xl\\\\:markdown :where(video) {

      ---

      -   .\\\\32xl\\\\:prose :where(figure) {
      +   .\\\\32xl\\\\:markdown :where(figure) {

      ---

      -   .\\\\32xl\\\\:prose :where(figure > *) {
      +   .\\\\32xl\\\\:markdown :where(figure > *) {

      ---

      -   .\\\\32xl\\\\:prose :where(h2 code) {
      +   .\\\\32xl\\\\:markdown :where(h2 code) {

      ---

      -   .\\\\32xl\\\\:prose :where(h3 code) {
      +   .\\\\32xl\\\\:markdown :where(h3 code) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol) {
      +   .\\\\32xl\\\\:markdown :where(ol) {

      ---

      -   .\\\\32xl\\\\:prose :where(ul) {
      +   .\\\\32xl\\\\:markdown :where(ul) {

      ---

      -   .\\\\32xl\\\\:prose :where(li) {
      +   .\\\\32xl\\\\:markdown :where(li) {

      ---

      -   .\\\\32xl\\\\:prose :where(> ul > li p) {
      +   .\\\\32xl\\\\:markdown :where(> ul > li p) {

      ---

      -   .\\\\32xl\\\\:prose :where(> ul > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown :where(> ul > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(> ul > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown :where(> ul > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(> ol > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown :where(> ol > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(> ol > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown :where(> ol > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
      +   .\\\\32xl\\\\:markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .\\\\32xl\\\\:prose :where(hr + *) {
      +   .\\\\32xl\\\\:markdown :where(hr + *) {

      ---

      -   .\\\\32xl\\\\:prose :where(h2 + *) {
      +   .\\\\32xl\\\\:markdown :where(h2 + *) {

      ---

      -   .\\\\32xl\\\\:prose :where(h3 + *) {
      +   .\\\\32xl\\\\:markdown :where(h3 + *) {

      ---

      -   .\\\\32xl\\\\:prose :where(h4 + *) {
      +   .\\\\32xl\\\\:markdown :where(h4 + *) {

      ---

      -   .\\\\32xl\\\\:prose :where(thead th:first-child) {
      +   .\\\\32xl\\\\:markdown :where(thead th:first-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(thead th:last-child) {
      +   .\\\\32xl\\\\:markdown :where(thead th:last-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(tbody td:first-child) {
      +   .\\\\32xl\\\\:markdown :where(tbody td:first-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(tbody td:last-child) {
      +   .\\\\32xl\\\\:markdown :where(tbody td:last-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(> :first-child) {
      +   .\\\\32xl\\\\:markdown :where(> :first-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(> :last-child) {
      +   .\\\\32xl\\\\:markdown :where(> :last-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm {
      +   .\\\\32xl\\\\:markdown-sm {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(p) {
      +   .\\\\32xl\\\\:markdown-sm :where(p) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where([class~='lead']) {
      +   .\\\\32xl\\\\:markdown-sm :where([class~='lead']) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(blockquote) {
      +   .\\\\32xl\\\\:markdown-sm :where(blockquote) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(h1) {
      +   .\\\\32xl\\\\:markdown-sm :where(h1) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(h2) {
      +   .\\\\32xl\\\\:markdown-sm :where(h2) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(h3) {
      +   .\\\\32xl\\\\:markdown-sm :where(h3) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(h4) {
      +   .\\\\32xl\\\\:markdown-sm :where(h4) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(img) {
      +   .\\\\32xl\\\\:markdown-sm :where(img) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(video) {
      +   .\\\\32xl\\\\:markdown-sm :where(video) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(figure) {
      +   .\\\\32xl\\\\:markdown-sm :where(figure) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(figure > *) {
      +   .\\\\32xl\\\\:markdown-sm :where(figure > *) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(figure figcaption) {
      +   .\\\\32xl\\\\:markdown-sm :where(figure figcaption) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(code) {
      +   .\\\\32xl\\\\:markdown-sm :where(code) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(h2 code) {
      +   .\\\\32xl\\\\:markdown-sm :where(h2 code) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(h3 code) {
      +   .\\\\32xl\\\\:markdown-sm :where(h3 code) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(pre) {
      +   .\\\\32xl\\\\:markdown-sm :where(pre) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(ol) {
      +   .\\\\32xl\\\\:markdown-sm :where(ol) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(ul) {
      +   .\\\\32xl\\\\:markdown-sm :where(ul) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(li) {
      +   .\\\\32xl\\\\:markdown-sm :where(li) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(ol > li) {
      +   .\\\\32xl\\\\:markdown-sm :where(ol > li) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(ol > li)::before {
      +   .\\\\32xl\\\\:markdown-sm :where(ol > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(ul > li) {
      +   .\\\\32xl\\\\:markdown-sm :where(ul > li) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(ul > li)::before {
      +   .\\\\32xl\\\\:markdown-sm :where(ul > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(> ul > li p) {
      +   .\\\\32xl\\\\:markdown-sm :where(> ul > li p) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(> ul > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-sm :where(> ul > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(> ul > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-sm :where(> ul > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(> ol > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-sm :where(> ol > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(> ol > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-sm :where(> ol > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      +   .\\\\32xl\\\\:markdown-sm :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(hr) {
      +   .\\\\32xl\\\\:markdown-sm :where(hr) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(hr + *) {
      +   .\\\\32xl\\\\:markdown-sm :where(hr + *) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(h2 + *) {
      +   .\\\\32xl\\\\:markdown-sm :where(h2 + *) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(h3 + *) {
      +   .\\\\32xl\\\\:markdown-sm :where(h3 + *) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(h4 + *) {
      +   .\\\\32xl\\\\:markdown-sm :where(h4 + *) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(table) {
      +   .\\\\32xl\\\\:markdown-sm :where(table) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(thead th) {
      +   .\\\\32xl\\\\:markdown-sm :where(thead th) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(thead th:first-child) {
      +   .\\\\32xl\\\\:markdown-sm :where(thead th:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(thead th:last-child) {
      +   .\\\\32xl\\\\:markdown-sm :where(thead th:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(tbody td) {
      +   .\\\\32xl\\\\:markdown-sm :where(tbody td) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(tbody td:first-child) {
      +   .\\\\32xl\\\\:markdown-sm :where(tbody td:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(tbody td:last-child) {
      +   .\\\\32xl\\\\:markdown-sm :where(tbody td:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(> :first-child) {
      +   .\\\\32xl\\\\:markdown-sm :where(> :first-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm :where(> :last-child) {
      +   .\\\\32xl\\\\:markdown-sm :where(> :last-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg {
      +   .\\\\32xl\\\\:markdown-lg {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(p) {
      +   .\\\\32xl\\\\:markdown-lg :where(p) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where([class~='lead']) {
      +   .\\\\32xl\\\\:markdown-lg :where([class~='lead']) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(blockquote) {
      +   .\\\\32xl\\\\:markdown-lg :where(blockquote) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h1) {
      +   .\\\\32xl\\\\:markdown-lg :where(h1) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h2) {
      +   .\\\\32xl\\\\:markdown-lg :where(h2) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h3) {
      +   .\\\\32xl\\\\:markdown-lg :where(h3) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h4) {
      +   .\\\\32xl\\\\:markdown-lg :where(h4) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(img) {
      +   .\\\\32xl\\\\:markdown-lg :where(img) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(video) {
      +   .\\\\32xl\\\\:markdown-lg :where(video) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(figure) {
      +   .\\\\32xl\\\\:markdown-lg :where(figure) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(figure > *) {
      +   .\\\\32xl\\\\:markdown-lg :where(figure > *) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(figure figcaption) {
      +   .\\\\32xl\\\\:markdown-lg :where(figure figcaption) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(code) {
      +   .\\\\32xl\\\\:markdown-lg :where(code) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h2 code) {
      +   .\\\\32xl\\\\:markdown-lg :where(h2 code) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h3 code) {
      +   .\\\\32xl\\\\:markdown-lg :where(h3 code) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(pre) {
      +   .\\\\32xl\\\\:markdown-lg :where(pre) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ol) {
      +   .\\\\32xl\\\\:markdown-lg :where(ol) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ul) {
      +   .\\\\32xl\\\\:markdown-lg :where(ul) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(li) {
      +   .\\\\32xl\\\\:markdown-lg :where(li) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ol > li) {
      +   .\\\\32xl\\\\:markdown-lg :where(ol > li) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ol > li)::before {
      +   .\\\\32xl\\\\:markdown-lg :where(ol > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ul > li) {
      +   .\\\\32xl\\\\:markdown-lg :where(ul > li) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ul > li)::before {
      +   .\\\\32xl\\\\:markdown-lg :where(ul > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> ul > li p) {
      +   .\\\\32xl\\\\:markdown-lg :where(> ul > li p) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> ul > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> ul > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> ul > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> ul > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> ol > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> ol > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> ol > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> ol > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      +   .\\\\32xl\\\\:markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(hr) {
      +   .\\\\32xl\\\\:markdown-lg :where(hr) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(hr + *) {
      +   .\\\\32xl\\\\:markdown-lg :where(hr + *) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h2 + *) {
      +   .\\\\32xl\\\\:markdown-lg :where(h2 + *) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h3 + *) {
      +   .\\\\32xl\\\\:markdown-lg :where(h3 + *) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h4 + *) {
      +   .\\\\32xl\\\\:markdown-lg :where(h4 + *) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(table) {
      +   .\\\\32xl\\\\:markdown-lg :where(table) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(thead th) {
      +   .\\\\32xl\\\\:markdown-lg :where(thead th) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(thead th:first-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(thead th:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(thead th:last-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(thead th:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(tbody td) {
      +   .\\\\32xl\\\\:markdown-lg :where(tbody td) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(tbody td:first-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(tbody td:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(tbody td:last-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(tbody td:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> :first-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> :first-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> :last-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> :last-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl {
      +   .\\\\32xl\\\\:markdown-xl {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(p) {
      +   .\\\\32xl\\\\:markdown-xl :where(p) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where([class~='lead']) {
      +   .\\\\32xl\\\\:markdown-xl :where([class~='lead']) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(blockquote) {
      +   .\\\\32xl\\\\:markdown-xl :where(blockquote) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h1) {
      +   .\\\\32xl\\\\:markdown-xl :where(h1) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h2) {
      +   .\\\\32xl\\\\:markdown-xl :where(h2) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h3) {
      +   .\\\\32xl\\\\:markdown-xl :where(h3) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h4) {
      +   .\\\\32xl\\\\:markdown-xl :where(h4) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(img) {
      +   .\\\\32xl\\\\:markdown-xl :where(img) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(video) {
      +   .\\\\32xl\\\\:markdown-xl :where(video) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(figure) {
      +   .\\\\32xl\\\\:markdown-xl :where(figure) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(figure > *) {
      +   .\\\\32xl\\\\:markdown-xl :where(figure > *) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(figure figcaption) {
      +   .\\\\32xl\\\\:markdown-xl :where(figure figcaption) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(code) {
      +   .\\\\32xl\\\\:markdown-xl :where(code) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h2 code) {
      +   .\\\\32xl\\\\:markdown-xl :where(h2 code) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h3 code) {
      +   .\\\\32xl\\\\:markdown-xl :where(h3 code) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(pre) {
      +   .\\\\32xl\\\\:markdown-xl :where(pre) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ol) {
      +   .\\\\32xl\\\\:markdown-xl :where(ol) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ul) {
      +   .\\\\32xl\\\\:markdown-xl :where(ul) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(li) {
      +   .\\\\32xl\\\\:markdown-xl :where(li) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ol > li) {
      +   .\\\\32xl\\\\:markdown-xl :where(ol > li) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ol > li)::before {
      +   .\\\\32xl\\\\:markdown-xl :where(ol > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ul > li) {
      +   .\\\\32xl\\\\:markdown-xl :where(ul > li) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ul > li)::before {
      +   .\\\\32xl\\\\:markdown-xl :where(ul > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> ul > li p) {
      +   .\\\\32xl\\\\:markdown-xl :where(> ul > li p) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> ul > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> ul > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> ul > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> ul > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> ol > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> ol > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> ol > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> ol > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .\\\\32xl\\\\:markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(hr) {
      +   .\\\\32xl\\\\:markdown-xl :where(hr) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(hr + *) {
      +   .\\\\32xl\\\\:markdown-xl :where(hr + *) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h2 + *) {
      +   .\\\\32xl\\\\:markdown-xl :where(h2 + *) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h3 + *) {
      +   .\\\\32xl\\\\:markdown-xl :where(h3 + *) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h4 + *) {
      +   .\\\\32xl\\\\:markdown-xl :where(h4 + *) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(table) {
      +   .\\\\32xl\\\\:markdown-xl :where(table) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(thead th) {
      +   .\\\\32xl\\\\:markdown-xl :where(thead th) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(thead th:first-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(thead th:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(thead th:last-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(thead th:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(tbody td) {
      +   .\\\\32xl\\\\:markdown-xl :where(tbody td) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(tbody td:first-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(tbody td:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(tbody td:last-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(tbody td:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> :first-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> :first-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> :last-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> :last-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl {
      +   .\\\\32xl\\\\:markdown-2xl {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(p) {
      +   .\\\\32xl\\\\:markdown-2xl :where(p) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where([class~='lead']) {
      +   .\\\\32xl\\\\:markdown-2xl :where([class~='lead']) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(blockquote) {
      +   .\\\\32xl\\\\:markdown-2xl :where(blockquote) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h1) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h1) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h2) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h2) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h3) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h3) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h4) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h4) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(img) {
      +   .\\\\32xl\\\\:markdown-2xl :where(img) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(video) {
      +   .\\\\32xl\\\\:markdown-2xl :where(video) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(figure) {
      +   .\\\\32xl\\\\:markdown-2xl :where(figure) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(figure > *) {
      +   .\\\\32xl\\\\:markdown-2xl :where(figure > *) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(figure figcaption) {
      +   .\\\\32xl\\\\:markdown-2xl :where(figure figcaption) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(code) {
      +   .\\\\32xl\\\\:markdown-2xl :where(code) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h2 code) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h2 code) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h3 code) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h3 code) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(pre) {
      +   .\\\\32xl\\\\:markdown-2xl :where(pre) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ol) {
      +   .\\\\32xl\\\\:markdown-2xl :where(ol) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ul) {
      +   .\\\\32xl\\\\:markdown-2xl :where(ul) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(li) {
      +   .\\\\32xl\\\\:markdown-2xl :where(li) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ol > li) {
      +   .\\\\32xl\\\\:markdown-2xl :where(ol > li) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ol > li)::before {
      +   .\\\\32xl\\\\:markdown-2xl :where(ol > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ul > li) {
      +   .\\\\32xl\\\\:markdown-2xl :where(ul > li) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ul > li)::before {
      +   .\\\\32xl\\\\:markdown-2xl :where(ul > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> ul > li p) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> ul > li p) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> ul > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> ul > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> ul > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> ul > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> ol > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> ol > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> ol > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> ol > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .\\\\32xl\\\\:markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(hr) {
      +   .\\\\32xl\\\\:markdown-2xl :where(hr) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(hr + *) {
      +   .\\\\32xl\\\\:markdown-2xl :where(hr + *) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h2 + *) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h2 + *) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h3 + *) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h3 + *) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h4 + *) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h4 + *) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(table) {
      +   .\\\\32xl\\\\:markdown-2xl :where(table) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(thead th) {
      +   .\\\\32xl\\\\:markdown-2xl :where(thead th) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(thead th:first-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(thead th:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(thead th:last-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(thead th:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(tbody td) {
      +   .\\\\32xl\\\\:markdown-2xl :where(tbody td) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(tbody td:first-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(tbody td:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(tbody td:last-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(tbody td:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> :first-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> :first-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> :last-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> :last-child) {

      ---

      -   .\\\\32xl\\\\:prose-red :where(a) {
      +   .\\\\32xl\\\\:markdown-red :where(a) {

      ---

      -   .\\\\32xl\\\\:prose-red :where(a code) {
      +   .\\\\32xl\\\\:markdown-red :where(a code) {

      ---

      -   .\\\\32xl\\\\:prose-yellow :where(a) {
      +   .\\\\32xl\\\\:markdown-yellow :where(a) {

      ---

      -   .\\\\32xl\\\\:prose-yellow :where(a code) {
      +   .\\\\32xl\\\\:markdown-yellow :where(a code) {

      ---

      -   .\\\\32xl\\\\:prose-green :where(a) {
      +   .\\\\32xl\\\\:markdown-green :where(a) {

      ---

      -   .\\\\32xl\\\\:prose-green :where(a code) {
      +   .\\\\32xl\\\\:markdown-green :where(a code) {

      ---

      -   .\\\\32xl\\\\:prose-blue :where(a) {
      +   .\\\\32xl\\\\:markdown-blue :where(a) {

      ---

      -   .\\\\32xl\\\\:prose-blue :where(a code) {
      +   .\\\\32xl\\\\:markdown-blue :where(a code) {

      ---

      -   .\\\\32xl\\\\:prose-indigo :where(a) {
      +   .\\\\32xl\\\\:markdown-indigo :where(a) {

      ---

      -   .\\\\32xl\\\\:prose-indigo :where(a code) {
      +   .\\\\32xl\\\\:markdown-indigo :where(a code) {

      ---

      -   .\\\\32xl\\\\:prose-purple :where(a) {
      +   .\\\\32xl\\\\:markdown-purple :where(a) {

      ---

      -   .\\\\32xl\\\\:prose-purple :where(a code) {
      +   .\\\\32xl\\\\:markdown-purple :where(a code) {

      ---

      -   .\\\\32xl\\\\:prose-pink :where(a) {
      +   .\\\\32xl\\\\:markdown-pink :where(a) {

      ---

      -   .\\\\32xl\\\\:prose-pink :where(a code) {
      +   .\\\\32xl\\\\:markdown-pink :where(a code) {

    "
  `)
})

it('should be possible to change the default modifiers', async () => {
  expect(await diffOnly({ modifiers: ['sm', 'lg', 'xl' /**, '2xl' */] })).toMatchInlineSnapshot(`
    "

      - .prose-2xl {
      -   font-size: 1.5rem;
      -   line-height: 1.6666667;
      - }
      -
      - .prose-2xl :where(p) {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl :where([class~='lead']) {
      -   font-size: 1.25em;
      -   line-height: 1.4666667;
      -   margin-top: 1.0666667em;
      -   margin-bottom: 1.0666667em;
      - }
      -
      - .prose-2xl :where(blockquote) {
      -   margin-top: 1.7777778em;
      -   margin-bottom: 1.7777778em;
      -   padding-left: 1.1111111em;
      - }
      -
      - .prose-2xl :where(h1) {
      -   font-size: 2.6666667em;
      -   margin-top: 0;
      -   margin-bottom: 0.875em;
      -   line-height: 1;
      - }
      -
      - .prose-2xl :where(h2) {
      -   font-size: 2em;
      -   margin-top: 1.5em;
      -   margin-bottom: 0.8333333em;
      -   line-height: 1.0833333;
      - }
      -
      - .prose-2xl :where(h3) {
      -   font-size: 1.5em;
      -   margin-top: 1.5555556em;
      -   margin-bottom: 0.6666667em;
      -   line-height: 1.2222222;
      - }
      -
      - .prose-2xl :where(h4) {
      -   margin-top: 1.6666667em;
      -   margin-bottom: 0.6666667em;
      -   line-height: 1.5;
      - }
      -
      - .prose-2xl :where(img) {
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      - }
      -
      - .prose-2xl :where(video) {
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      - }
      -
      - .prose-2xl :where(figure) {
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      - }
      -
      - .prose-2xl :where(figure > *) {
      -   margin-top: 0;
      -   margin-bottom: 0;
      - }
      -
      - .prose-2xl :where(figure figcaption) {
      -   font-size: 0.8333333em;
      -   line-height: 1.6;
      -   margin-top: 1em;
      - }
      -
      - .prose-2xl :where(code) {
      -   font-size: 0.8333333em;
      - }
      -
      - .prose-2xl :where(h2 code) {
      -   font-size: 0.875em;
      - }
      -
      - .prose-2xl :where(h3 code) {
      -   font-size: 0.8888889em;
      - }
      -
      - .prose-2xl :where(pre) {
      -   font-size: 0.8333333em;
      -   line-height: 1.8;
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      -   border-radius: 0.5rem;
      -   padding-top: 1.2em;
      -   padding-right: 1.6em;
      -   padding-bottom: 1.2em;
      -   padding-left: 1.6em;
      - }
      -
      - .prose-2xl :where(ol) {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl :where(ul) {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl :where(li) {
      -   margin-top: 0.5em;
      -   margin-bottom: 0.5em;
      - }
      -
      - .prose-2xl :where(ol > li) {
      -   padding-left: 1.6666667em;
      - }
      -
      - .prose-2xl :where(ol > li)::before {
      -   left: 0;
      - }
      -
      - .prose-2xl :where(ul > li) {
      -   padding-left: 1.6666667em;
      - }
      -
      - .prose-2xl :where(ul > li)::before {
      -   width: 0.3333333em;
      -   height: 0.3333333em;
      -   top: calc(0.8333333em - 0.1666667em);
      -   left: 0.25em;
      - }
      -
      - .prose-2xl :where(> ul > li p) {
      -   margin-top: 0.8333333em;
      -   margin-bottom: 0.8333333em;
      - }
      -
      - .prose-2xl :where(> ul > li > *:first-child) {
      -   margin-top: 1.3333333em;
      - }
      -
      - .prose-2xl :where(> ul > li > *:last-child) {
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl :where(> ol > li > *:first-child) {
      -   margin-top: 1.3333333em;
      - }
      -
      - .prose-2xl :where(> ol > li > *:last-child) {
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      -   margin-top: 0.6666667em;
      -   margin-bottom: 0.6666667em;
      - }
      -
      - .prose-2xl :where(hr) {
      -   margin-top: 3em;
      -   margin-bottom: 3em;
      - }
      -
      - .prose-2xl :where(hr + *) {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl :where(h2 + *) {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl :where(h3 + *) {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl :where(h4 + *) {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl :where(table) {
      -   font-size: 0.8333333em;
      -   line-height: 1.4;
      - }
      -
      - .prose-2xl :where(thead th) {
      -   padding-right: 0.6em;
      -   padding-bottom: 0.8em;
      -   padding-left: 0.6em;
      - }
      -
      - .prose-2xl :where(thead th:first-child) {
      -   padding-left: 0;
      - }
      -
      - .prose-2xl :where(thead th:last-child) {
      -   padding-right: 0;
      - }
      -
      - .prose-2xl :where(tbody td) {
      -   padding-top: 0.8em;
      -   padding-right: 0.6em;
      -   padding-bottom: 0.8em;
      -   padding-left: 0.6em;
      - }
      -
      - .prose-2xl :where(tbody td:first-child) {
      -   padding-left: 0;
      - }
      -
      - .prose-2xl :where(tbody td:last-child) {
      -   padding-right: 0;
      - }
      -
      - .prose-2xl :where(> :first-child) {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl :where(> :last-child) {
      -   margin-bottom: 0;
      - }
      -
      - .prose-red :where(a) {
      -   color: #dc2626;
      - }
      -
      - .prose-red :where(a code) {
      -   color: #dc2626;
      - }
      -
      - .prose-yellow :where(a) {
      -   color: #d97706;
      - }
      -
      - .prose-yellow :where(a code) {
      -   color: #d97706;
      - }
      -
      - .prose-green :where(a) {
      -   color: #059669;
      - }
      -
      - .prose-green :where(a code) {
      -   color: #059669;
      - }
      -
      - .prose-blue :where(a) {
      -   color: #2563eb;
      - }
      -
      - .prose-blue :where(a code) {
      -   color: #2563eb;
      - }
      -
      - .prose-indigo :where(a) {
      -   color: #4f46e5;
      - }
      -
      - .prose-indigo :where(a code) {
      -   color: #4f46e5;
      - }
      -
      - .prose-purple :where(a) {
      -   color: #7c3aed;
      - }
      -
      - .prose-purple :where(a code) {
      -   color: #7c3aed;
      - }
      -
      - .prose-pink :where(a) {
      -   color: #db2777;
      - }
      -
      - .prose-pink :where(a code) {
      -   color: #db2777;
      - }
      -

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl {
      -     font-size: 1.5rem;
      -     line-height: 1.6666667;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(p) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where([class~='lead']) {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(blockquote) {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(h1) {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(h2) {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(h3) {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(h4) {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(img) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(video) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(figure) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(figure > *) {
      -     margin-top: 0;

      ---

      -   }
      -
      -   .sm\\\\:prose-2xl :where(figure figcaption) {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(code) {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(h2 code) {
      -     font-size: 0.875em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(h3 code) {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(pre) {
      -     font-size: 0.8333333em;
      -     line-height: 1.8;
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -     border-radius: 0.5rem;
      -     padding-top: 1.2em;
      -     padding-right: 1.6em;
      -     padding-bottom: 1.2em;
      -     padding-left: 1.6em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(ol) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(ul) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(li) {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(ol > li) {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(ol > li)::before {
      -     left: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(ul > li) {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(ul > li)::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(> ul > li p) {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;

      ---

      -
      -   .sm\\\\:prose-2xl :where(> ul > li > *:first-child) {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(> ul > li > *:last-child) {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(> ol > li > *:first-child) {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(> ol > li > *:last-child) {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(hr) {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(hr + *) {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(h2 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(h4 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(table) {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(thead th) {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(thead th:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(thead th:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(tbody td) {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(tbody td:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(tbody td:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(> :first-child) {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl :where(> :last-child) {
      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-red :where(a) {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-red :where(a code) {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-yellow :where(a) {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-yellow :where(a code) {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-green :where(a) {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-green :where(a code) {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-blue :where(a) {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-blue :where(a code) {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-indigo :where(a) {
      -     color: #4f46e5;
      -   }
      -
      -   .sm\\\\:prose-indigo :where(a code) {
      -     color: #4f46e5;
      -   }
      -
      -   .sm\\\\:prose-purple :where(a) {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-purple :where(a code) {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-pink :where(a) {
      -     color: #db2777;
      -   }
      -
      -   .sm\\\\:prose-pink :where(a code) {
      -     color: #db2777;
      -   }

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .md\\\\:prose-2xl {
      -     font-size: 1.5rem;
      -     line-height: 1.6666667;
      -   }
      -
      -   .md\\\\:prose-2xl :where(p) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl :where([class~='lead']) {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(blockquote) {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(h1) {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .md\\\\:prose-2xl :where(h2) {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .md\\\\:prose-2xl :where(h3) {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .md\\\\:prose-2xl :where(h4) {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .md\\\\:prose-2xl :where(img) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(video) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(figure) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(figure > *) {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(figure figcaption) {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(code) {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(h2 code) {
      -     font-size: 0.875em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(h3 code) {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(pre) {
      -     font-size: 0.8333333em;
      -     line-height: 1.8;
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -     border-radius: 0.5rem;
      -     padding-top: 1.2em;
      -     padding-right: 1.6em;
      -     padding-bottom: 1.2em;
      -     padding-left: 1.6em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(ol) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(ul) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(li) {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(ol > li) {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(ol > li)::before {
      -     left: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(ul > li) {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(ul > li)::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(> ul > li p) {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(> ul > li > *:first-child) {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(> ul > li > *:last-child) {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(> ol > li > *:first-child) {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(> ol > li > *:last-child) {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(hr) {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(hr + *) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(h2 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(h4 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(table) {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .md\\\\:prose-2xl :where(thead th) {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(thead th:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(thead th:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(tbody td) {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .md\\\\:prose-2xl :where(tbody td:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(tbody td:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(> :first-child) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl :where(> :last-child) {

      ---

      -   }
      -
      -   .md\\\\:prose-red :where(a) {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-red :where(a code) {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-yellow :where(a) {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-yellow :where(a code) {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-green :where(a) {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-green :where(a code) {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-blue :where(a) {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-blue :where(a code) {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-indigo :where(a) {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-indigo :where(a code) {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-purple :where(a) {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-purple :where(a code) {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-pink :where(a) {
      -     color: #db2777;
      -   }
      -
      -   .md\\\\:prose-pink :where(a code) {
      -     color: #db2777;

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl {
      -     font-size: 1.5rem;
      -     line-height: 1.6666667;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(p) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where([class~='lead']) {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(blockquote) {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(h1) {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(h2) {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(h3) {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(h4) {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(img) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(video) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(figure) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(figure > *) {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(figure figcaption) {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(code) {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(h2 code) {
      -     font-size: 0.875em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(h3 code) {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(pre) {
      -     font-size: 0.8333333em;
      -     line-height: 1.8;
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -     border-radius: 0.5rem;
      -     padding-top: 1.2em;
      -     padding-right: 1.6em;
      -     padding-bottom: 1.2em;
      -     padding-left: 1.6em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(ol) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(ul) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(li) {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(ol > li) {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(ol > li)::before {
      -     left: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(ul > li) {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(ul > li)::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(> ul > li p) {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(> ul > li > *:first-child) {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(> ul > li > *:last-child) {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(> ol > li > *:first-child) {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(> ol > li > *:last-child) {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(hr) {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(hr + *) {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(h2 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(h4 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(table) {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(thead th) {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(thead th:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(thead th:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(tbody td) {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(tbody td:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(tbody td:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(> :first-child) {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl :where(> :last-child) {

      ---

      -   }
      -
      -   .lg\\\\:prose-red :where(a) {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-red :where(a code) {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-yellow :where(a) {
      -     color: #d97706;
      -   }
      -
      -   .lg\\\\:prose-yellow :where(a code) {
      -     color: #d97706;
      -   }
      -
      -   .lg\\\\:prose-green :where(a) {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-green :where(a code) {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-blue :where(a) {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-blue :where(a code) {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-indigo :where(a) {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-indigo :where(a code) {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-purple :where(a) {
      -     color: #7c3aed;
      -   }
      -
      -   .lg\\\\:prose-purple :where(a code) {
      -     color: #7c3aed;

      ---

      -
      -   .lg\\\\:prose-pink :where(a) {
      -     color: #db2777;
      -   }
      -
      -   .lg\\\\:prose-pink :where(a code) {
      -     color: #db2777;
      -   }

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl {
      -     font-size: 1.5rem;
      -     line-height: 1.6666667;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(p) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where([class~='lead']) {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(blockquote) {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(h1) {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(h2) {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(h3) {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(h4) {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(img) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(video) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(figure) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(figure > *) {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(figure figcaption) {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(code) {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(h2 code) {
      -     font-size: 0.875em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(h3 code) {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(pre) {
      -     font-size: 0.8333333em;
      -     line-height: 1.8;
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -     border-radius: 0.5rem;
      -     padding-top: 1.2em;
      -     padding-right: 1.6em;
      -     padding-bottom: 1.2em;
      -     padding-left: 1.6em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(ol) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(ul) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(li) {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(ol > li) {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(ol > li)::before {
      -     left: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(ul > li) {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(ul > li)::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(> ul > li p) {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(> ul > li > *:first-child) {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(> ul > li > *:last-child) {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(> ol > li > *:first-child) {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(> ol > li > *:last-child) {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(hr) {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(hr + *) {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(h2 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(h4 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(table) {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(thead th) {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(thead th:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(thead th:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(tbody td) {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(tbody td:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(tbody td:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(> :first-child) {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl :where(> :last-child) {

      ---

      -   }
      -
      -   .xl\\\\:prose-red :where(a) {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-red :where(a code) {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-yellow :where(a) {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-yellow :where(a code) {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-green :where(a) {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-green :where(a code) {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-blue :where(a) {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-blue :where(a code) {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-indigo :where(a) {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-indigo :where(a code) {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-purple :where(a) {
      -     color: #7c3aed;
      -   }
      -
      -   .xl\\\\:prose-purple :where(a code) {
      -     color: #7c3aed;

      ---

      -
      -   .xl\\\\:prose-pink :where(a) {
      -     color: #db2777;
      -   }
      -
      -   .xl\\\\:prose-pink :where(a code) {
      -     color: #db2777;
      -   }

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl {
      -     font-size: 1.5rem;
      -     line-height: 1.6666667;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(p) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where([class~='lead']) {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(blockquote) {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(h1) {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(h2) {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(h3) {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(h4) {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(img) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(video) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(figure) {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(figure > *) {
      -     margin-top: 0;

      ---

      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(figure figcaption) {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(code) {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(h2 code) {
      -     font-size: 0.875em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(h3 code) {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(pre) {
      -     font-size: 0.8333333em;
      -     line-height: 1.8;
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -     border-radius: 0.5rem;
      -     padding-top: 1.2em;
      -     padding-right: 1.6em;
      -     padding-bottom: 1.2em;
      -     padding-left: 1.6em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(ol) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(ul) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(li) {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(ol > li) {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(ol > li)::before {
      -     left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(ul > li) {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(ul > li)::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(> ul > li p) {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(> ul > li > *:first-child) {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(> ul > li > *:last-child) {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(> ol > li > *:first-child) {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(> ol > li > *:last-child) {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(hr) {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(hr + *) {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(h2 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(h4 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(table) {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(thead th) {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(thead th:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(thead th:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(tbody td) {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(tbody td:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(tbody td:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(> :first-child) {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl :where(> :last-child) {
      -     margin-bottom: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-red :where(a) {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-red :where(a code) {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow :where(a) {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow :where(a code) {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green :where(a) {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green :where(a code) {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue :where(a) {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue :where(a code) {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo :where(a) {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo :where(a code) {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple :where(a) {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple :where(a code) {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink :where(a) {
      -     color: #db2777;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink :where(a code) {
      -     color: #db2777;

    "
  `)
})

it('should be possible to change the default modifiers and change the className', async () => {
  expect(await diffOnly({ modifiers: [/** 'sm', */ 'lg', 'xl', '2xl'], className: 'markdown' }))
    .toMatchInlineSnapshot(`
    "

      - .prose {
      + .markdown {

      ---

      - .prose :where([class~='lead']) {
      + .markdown :where([class~='lead']) {

      ---

      - .prose :where(a) {
      + .markdown :where(a) {

      ---

      - .prose :where(strong) {
      + .markdown :where(strong) {

      ---

      - .prose :where(ol[type='A']) {
      + .markdown :where(ol[type='A']) {

      ---

      - .prose :where(ol[type='a']) {
      + .markdown :where(ol[type='a']) {

      ---

      - .prose :where(ol[type='A' s]) {
      + .markdown :where(ol[type='A' s]) {

      ---

      - .prose :where(ol[type='a' s]) {
      + .markdown :where(ol[type='a' s]) {

      ---

      - .prose :where(ol[type='I']) {
      + .markdown :where(ol[type='I']) {

      ---

      - .prose :where(ol[type='i']) {
      + .markdown :where(ol[type='i']) {

      ---

      - .prose :where(ol[type='I' s]) {
      + .markdown :where(ol[type='I' s]) {

      ---

      - .prose :where(ol[type='i' s]) {
      + .markdown :where(ol[type='i' s]) {

      ---

      - .prose :where(ol[type='1']) {
      + .markdown :where(ol[type='1']) {

      ---

      - .prose :where(ol > li) {
      + .markdown :where(ol > li) {

      ---

      - .prose :where(ol > li)::before {
      + .markdown :where(ol > li)::before {

      ---

      - .prose :where(ul > li) {
      + .markdown :where(ul > li) {

      ---

      - .prose :where(ul > li)::before {
      + .markdown :where(ul > li)::before {

      ---

      - .prose :where(hr) {
      + .markdown :where(hr) {

      ---

      - .prose :where(blockquote) {
      + .markdown :where(blockquote) {

      ---

      - .prose :where(blockquote p:first-of-type)::before {
      + .markdown :where(blockquote p:first-of-type)::before {

      ---

      - .prose :where(blockquote p:last-of-type)::after {
      + .markdown :where(blockquote p:last-of-type)::after {

      ---

      - .prose :where(h1) {
      + .markdown :where(h1) {

      ---

      - .prose :where(h1 strong) {
      + .markdown :where(h1 strong) {

      ---

      - .prose :where(h2) {
      + .markdown :where(h2) {

      ---

      - .prose :where(h2 strong) {
      + .markdown :where(h2 strong) {

      ---

      - .prose :where(h3) {
      + .markdown :where(h3) {

      ---

      - .prose :where(h3 strong) {
      + .markdown :where(h3 strong) {

      ---

      - .prose :where(h4) {
      + .markdown :where(h4) {

      ---

      - .prose :where(h4 strong) {
      + .markdown :where(h4 strong) {

      ---

      - .prose :where(figure figcaption) {
      + .markdown :where(figure figcaption) {

      ---

      - .prose :where(code) {
      + .markdown :where(code) {

      ---

      - .prose :where(code)::before {
      + .markdown :where(code)::before {

      ---

      - .prose :where(code)::after {
      + .markdown :where(code)::after {

      ---

      - .prose :where(a code) {
      + .markdown :where(a code) {

      ---

      - .prose :where(pre) {
      + .markdown :where(pre) {

      ---

      - .prose :where(pre code) {
      + .markdown :where(pre code) {

      ---

      - .prose :where(pre code)::before {
      + .markdown :where(pre code)::before {

      ---

      - .prose :where(pre code)::after {
      + .markdown :where(pre code)::after {

      ---

      - .prose :where(table) {
      + .markdown :where(table) {

      ---

      - .prose :where(thead) {
      + .markdown :where(thead) {

      ---

      - .prose :where(thead th) {
      + .markdown :where(thead th) {

      ---

      - .prose :where(tbody tr) {
      + .markdown :where(tbody tr) {

      ---

      - .prose :where(tbody tr:last-child) {
      + .markdown :where(tbody tr:last-child) {

      ---

      - .prose :where(tbody td) {
      + .markdown :where(tbody td) {

      ---

      - .prose {
      + .markdown {

      ---

      - .prose :where(p) {
      + .markdown :where(p) {

      ---

      - .prose :where(img) {
      + .markdown :where(img) {

      ---

      - .prose :where(video) {
      + .markdown :where(video) {

      ---

      - .prose :where(figure) {
      + .markdown :where(figure) {

      ---

      - .prose :where(figure > *) {
      + .markdown :where(figure > *) {

      ---

      - .prose :where(h2 code) {
      + .markdown :where(h2 code) {

      ---

      - .prose :where(h3 code) {
      + .markdown :where(h3 code) {

      ---

      - .prose :where(ol) {
      + .markdown :where(ol) {

      ---

      - .prose :where(ul) {
      + .markdown :where(ul) {

      ---

      - .prose :where(li) {
      + .markdown :where(li) {

      ---

      - .prose :where(> ul > li p) {
      + .markdown :where(> ul > li p) {

      ---

      - .prose :where(> ul > li > *:first-child) {
      + .markdown :where(> ul > li > *:first-child) {

      ---

      - .prose :where(> ul > li > *:last-child) {
      + .markdown :where(> ul > li > *:last-child) {

      ---

      - .prose :where(> ol > li > *:first-child) {
      + .markdown :where(> ol > li > *:first-child) {

      ---

      - .prose :where(> ol > li > *:last-child) {
      + .markdown :where(> ol > li > *:last-child) {

      ---

      - .prose :where(ul ul, ul ol, ol ul, ol ol) {
      + .markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      - }
      -
      - .prose :where(hr + *) {
      -   margin-top: 0;
      - }
      -
      - .prose :where(h2 + *) {
      -   margin-top: 0;
      - }
      -
      - .prose :where(h3 + *) {
      -   margin-top: 0;
      - }
      -
      - .prose :where(h4 + *) {
      -   margin-top: 0;
      - }
      -
      - .prose :where(thead th:first-child) {
      -   padding-left: 0;
      - }
      -
      - .prose :where(thead th:last-child) {
      -   padding-right: 0;
      - }
      -
      - .prose :where(tbody td:first-child) {
      -   padding-left: 0;
      - }
      -
      - .prose :where(tbody td:last-child) {
      -   padding-right: 0;
      - }
      -
      - .prose :where(> :first-child) {
      -   margin-top: 0;
      - }
      -
      - .prose :where(> :last-child) {
      -   margin-bottom: 0;
      - }
      -
      - .prose-sm {
      -   font-size: 0.875rem;
      -   line-height: 1.7142857;
      - }
      -
      - .prose-sm :where(p) {
      -   margin-top: 1.1428571em;
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm :where([class~='lead']) {
      -   font-size: 1.2857143em;
      -   line-height: 1.5555556;
      -   margin-top: 0.8888889em;
      -   margin-bottom: 0.8888889em;
      - }
      -
      - .prose-sm :where(blockquote) {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      -   padding-left: 1.1111111em;
      - }
      -
      - .prose-sm :where(h1) {
      -   font-size: 2.1428571em;
      -   margin-top: 0;
      -   margin-bottom: 0.8em;
      -   line-height: 1.2;

      ---

      - .prose-sm :where(h2) {
      -   font-size: 1.4285714em;
      -   margin-top: 1.6em;
      -   margin-bottom: 0.8em;
      -   line-height: 1.4;
      - }
      -
      - .prose-sm :where(h3) {
      -   font-size: 1.2857143em;
      -   margin-top: 1.5555556em;
      -   margin-bottom: 0.4444444em;
      -   line-height: 1.5555556;
      - }
      -
      - .prose-sm :where(h4) {
      -   margin-top: 1.4285714em;
      -   margin-bottom: 0.5714286em;
      -   line-height: 1.4285714;
      - }
      -
      - .prose-sm :where(img) {
      -   margin-top: 1.7142857em;
      -   margin-bottom: 1.7142857em;
      - }
      -
      - .prose-sm :where(video) {
      -   margin-top: 1.7142857em;
      -   margin-bottom: 1.7142857em;
      - }
      -
      - .prose-sm :where(figure) {
      -   margin-top: 1.7142857em;
      -   margin-bottom: 1.7142857em;
      - }
      -
      - .prose-sm :where(figure > *) {
      -   margin-top: 0;
      -   margin-bottom: 0;
      - }
      -
      - .prose-sm :where(figure figcaption) {
      -   font-size: 0.8571429em;
      -   line-height: 1.3333333;
      -   margin-top: 0.6666667em;
      - }
      -
      - .prose-sm :where(code) {
      -   font-size: 0.8571429em;
      - }
      -
      - .prose-sm :where(h2 code) {
      -   font-size: 0.9em;
      - }
      -
      - .prose-sm :where(h3 code) {
      -   font-size: 0.8888889em;
      - }
      -
      - .prose-sm :where(pre) {
      -   font-size: 0.8571429em;
      -   line-height: 1.6666667;
      -   margin-top: 1.6666667em;
      -   margin-bottom: 1.6666667em;
      -   border-radius: 0.25rem;
      -   padding-top: 0.6666667em;
      -   padding-right: 1em;
      -   padding-bottom: 0.6666667em;
      -   padding-left: 1em;
      - }
      -
      - .prose-sm :where(ol) {
      -   margin-top: 1.1428571em;
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm :where(ul) {
      -   margin-top: 1.1428571em;
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm :where(li) {
      -   margin-top: 0.2857143em;
      -   margin-bottom: 0.2857143em;
      - }
      -
      - .prose-sm :where(ol > li) {
      -   padding-left: 1.5714286em;
      - }
      -
      - .prose-sm :where(ol > li)::before {
      -   left: 0;
      - }
      -
      - .prose-sm :where(ul > li) {
      -   padding-left: 1.5714286em;
      - }
      -
      - .prose-sm :where(ul > li)::before {
      -   height: 0.3571429em;
      -   width: 0.3571429em;
      -   top: calc(0.8571429em - 0.1785714em);
      -   left: 0.2142857em;
      - }
      -
      - .prose-sm :where(> ul > li p) {
      -   margin-top: 0.5714286em;
      -   margin-bottom: 0.5714286em;
      - }
      -
      - .prose-sm :where(> ul > li > *:first-child) {
      -   margin-top: 1.1428571em;
      - }
      -
      - .prose-sm :where(> ul > li > *:last-child) {
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm :where(> ol > li > *:first-child) {
      -   margin-top: 1.1428571em;
      - }
      -
      - .prose-sm :where(> ol > li > *:last-child) {
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      -   margin-top: 0.5714286em;
      -   margin-bottom: 0.5714286em;
      - }
      -
      - .prose-sm :where(hr) {
      -   margin-top: 2.8571429em;
      -   margin-bottom: 2.8571429em;
      - }
      -
      - .prose-sm :where(hr + *) {
      + .markdown :where(hr + *) {

      ---

      - .prose-sm :where(h2 + *) {
      + .markdown :where(h2 + *) {

      ---

      - .prose-sm :where(h3 + *) {
      + .markdown :where(h3 + *) {

      ---

      - .prose-sm :where(h4 + *) {
      + .markdown :where(h4 + *) {

      ---

      - .prose-sm :where(table) {
      -   font-size: 0.8571429em;
      -   line-height: 1.5;
      - }
      -
      - .prose-sm :where(thead th) {
      -   padding-right: 1em;
      -   padding-bottom: 0.6666667em;
      -   padding-left: 1em;
      - }
      -
      - .prose-sm :where(thead th:first-child) {
      + .markdown :where(thead th:first-child) {

      ---

      - .prose-sm :where(thead th:last-child) {
      + .markdown :where(thead th:last-child) {

      ---

      - .prose-sm :where(tbody td) {
      -   padding-top: 0.6666667em;
      -   padding-right: 1em;
      -   padding-bottom: 0.6666667em;
      -   padding-left: 1em;
      - }
      -
      - .prose-sm :where(tbody td:first-child) {
      + .markdown :where(tbody td:first-child) {

      ---

      - .prose-sm :where(tbody td:last-child) {
      + .markdown :where(tbody td:last-child) {

      ---

      - .prose-sm :where(> :first-child) {
      + .markdown :where(> :first-child) {

      ---

      - .prose-sm :where(> :last-child) {
      + .markdown :where(> :last-child) {

      ---

      - .prose-lg {
      + .markdown-lg {

      ---

      - .prose-lg :where(p) {
      + .markdown-lg :where(p) {

      ---

      - .prose-lg :where([class~='lead']) {
      + .markdown-lg :where([class~='lead']) {

      ---

      - .prose-lg :where(blockquote) {
      + .markdown-lg :where(blockquote) {

      ---

      - .prose-lg :where(h1) {
      + .markdown-lg :where(h1) {

      ---

      - .prose-lg :where(h2) {
      + .markdown-lg :where(h2) {

      ---

      - .prose-lg :where(h3) {
      + .markdown-lg :where(h3) {

      ---

      - .prose-lg :where(h4) {
      + .markdown-lg :where(h4) {

      ---

      - .prose-lg :where(img) {
      + .markdown-lg :where(img) {

      ---

      - .prose-lg :where(video) {
      + .markdown-lg :where(video) {

      ---

      - .prose-lg :where(figure) {
      + .markdown-lg :where(figure) {

      ---

      - .prose-lg :where(figure > *) {
      + .markdown-lg :where(figure > *) {

      ---

      - .prose-lg :where(figure figcaption) {
      + .markdown-lg :where(figure figcaption) {

      ---

      - .prose-lg :where(code) {
      + .markdown-lg :where(code) {

      ---

      - .prose-lg :where(h2 code) {
      + .markdown-lg :where(h2 code) {

      ---

      - .prose-lg :where(h3 code) {
      + .markdown-lg :where(h3 code) {

      ---

      - .prose-lg :where(pre) {
      + .markdown-lg :where(pre) {

      ---

      - .prose-lg :where(ol) {
      + .markdown-lg :where(ol) {

      ---

      - .prose-lg :where(ul) {
      + .markdown-lg :where(ul) {

      ---

      - .prose-lg :where(li) {
      + .markdown-lg :where(li) {

      ---

      - .prose-lg :where(ol > li) {
      + .markdown-lg :where(ol > li) {

      ---

      - .prose-lg :where(ol > li)::before {
      + .markdown-lg :where(ol > li)::before {

      ---

      - .prose-lg :where(ul > li) {
      + .markdown-lg :where(ul > li) {

      ---

      - .prose-lg :where(ul > li)::before {
      + .markdown-lg :where(ul > li)::before {

      ---

      - .prose-lg :where(> ul > li p) {
      + .markdown-lg :where(> ul > li p) {

      ---

      - .prose-lg :where(> ul > li > *:first-child) {
      + .markdown-lg :where(> ul > li > *:first-child) {

      ---

      - .prose-lg :where(> ul > li > *:last-child) {
      + .markdown-lg :where(> ul > li > *:last-child) {

      ---

      - .prose-lg :where(> ol > li > *:first-child) {
      + .markdown-lg :where(> ol > li > *:first-child) {

      ---

      - .prose-lg :where(> ol > li > *:last-child) {
      + .markdown-lg :where(> ol > li > *:last-child) {

      ---

      - .prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      + .markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      - .prose-lg :where(hr) {
      + .markdown-lg :where(hr) {

      ---

      - .prose-lg :where(hr + *) {
      + .markdown-lg :where(hr + *) {

      ---

      - .prose-lg :where(h2 + *) {
      + .markdown-lg :where(h2 + *) {

      ---

      - .prose-lg :where(h3 + *) {
      + .markdown-lg :where(h3 + *) {

      ---

      - .prose-lg :where(h4 + *) {
      + .markdown-lg :where(h4 + *) {

      ---

      - .prose-lg :where(table) {
      + .markdown-lg :where(table) {

      ---

      - .prose-lg :where(thead th) {
      + .markdown-lg :where(thead th) {

      ---

      - .prose-lg :where(thead th:first-child) {
      + .markdown-lg :where(thead th:first-child) {

      ---

      - .prose-lg :where(thead th:last-child) {
      + .markdown-lg :where(thead th:last-child) {

      ---

      - .prose-lg :where(tbody td) {
      + .markdown-lg :where(tbody td) {

      ---

      - .prose-lg :where(tbody td:first-child) {
      + .markdown-lg :where(tbody td:first-child) {

      ---

      - .prose-lg :where(tbody td:last-child) {
      + .markdown-lg :where(tbody td:last-child) {

      ---

      - .prose-lg :where(> :first-child) {
      + .markdown-lg :where(> :first-child) {

      ---

      - .prose-lg :where(> :last-child) {
      + .markdown-lg :where(> :last-child) {

      ---

      - .prose-xl {
      + .markdown-xl {

      ---

      - .prose-xl :where(p) {
      + .markdown-xl :where(p) {

      ---

      - .prose-xl :where([class~='lead']) {
      + .markdown-xl :where([class~='lead']) {

      ---

      - .prose-xl :where(blockquote) {
      + .markdown-xl :where(blockquote) {

      ---

      - .prose-xl :where(h1) {
      + .markdown-xl :where(h1) {

      ---

      - .prose-xl :where(h2) {
      + .markdown-xl :where(h2) {

      ---

      - .prose-xl :where(h3) {
      + .markdown-xl :where(h3) {

      ---

      - .prose-xl :where(h4) {
      + .markdown-xl :where(h4) {

      ---

      - .prose-xl :where(img) {
      + .markdown-xl :where(img) {

      ---

      - .prose-xl :where(video) {
      + .markdown-xl :where(video) {

      ---

      - .prose-xl :where(figure) {
      + .markdown-xl :where(figure) {

      ---

      - .prose-xl :where(figure > *) {
      + .markdown-xl :where(figure > *) {

      ---

      - .prose-xl :where(figure figcaption) {
      + .markdown-xl :where(figure figcaption) {

      ---

      - .prose-xl :where(code) {
      + .markdown-xl :where(code) {

      ---

      - .prose-xl :where(h2 code) {
      + .markdown-xl :where(h2 code) {

      ---

      - .prose-xl :where(h3 code) {
      + .markdown-xl :where(h3 code) {

      ---

      - .prose-xl :where(pre) {
      + .markdown-xl :where(pre) {

      ---

      - .prose-xl :where(ol) {
      + .markdown-xl :where(ol) {

      ---

      - .prose-xl :where(ul) {
      + .markdown-xl :where(ul) {

      ---

      - .prose-xl :where(li) {
      + .markdown-xl :where(li) {

      ---

      - .prose-xl :where(ol > li) {
      + .markdown-xl :where(ol > li) {

      ---

      - .prose-xl :where(ol > li)::before {
      + .markdown-xl :where(ol > li)::before {

      ---

      - .prose-xl :where(ul > li) {
      + .markdown-xl :where(ul > li) {

      ---

      - .prose-xl :where(ul > li)::before {
      + .markdown-xl :where(ul > li)::before {

      ---

      - .prose-xl :where(> ul > li p) {
      + .markdown-xl :where(> ul > li p) {

      ---

      - .prose-xl :where(> ul > li > *:first-child) {
      + .markdown-xl :where(> ul > li > *:first-child) {

      ---

      - .prose-xl :where(> ul > li > *:last-child) {
      + .markdown-xl :where(> ul > li > *:last-child) {

      ---

      - .prose-xl :where(> ol > li > *:first-child) {
      + .markdown-xl :where(> ol > li > *:first-child) {

      ---

      - .prose-xl :where(> ol > li > *:last-child) {
      + .markdown-xl :where(> ol > li > *:last-child) {

      ---

      - .prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      + .markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      - .prose-xl :where(hr) {
      + .markdown-xl :where(hr) {

      ---

      - .prose-xl :where(hr + *) {
      + .markdown-xl :where(hr + *) {

      ---

      - .prose-xl :where(h2 + *) {
      + .markdown-xl :where(h2 + *) {

      ---

      - .prose-xl :where(h3 + *) {
      + .markdown-xl :where(h3 + *) {

      ---

      - .prose-xl :where(h4 + *) {
      + .markdown-xl :where(h4 + *) {

      ---

      - .prose-xl :where(table) {
      + .markdown-xl :where(table) {

      ---

      - .prose-xl :where(thead th) {
      + .markdown-xl :where(thead th) {

      ---

      - .prose-xl :where(thead th:first-child) {
      + .markdown-xl :where(thead th:first-child) {

      ---

      - .prose-xl :where(thead th:last-child) {
      + .markdown-xl :where(thead th:last-child) {

      ---

      - .prose-xl :where(tbody td) {
      + .markdown-xl :where(tbody td) {

      ---

      - .prose-xl :where(tbody td:first-child) {
      + .markdown-xl :where(tbody td:first-child) {

      ---

      - .prose-xl :where(tbody td:last-child) {
      + .markdown-xl :where(tbody td:last-child) {

      ---

      - .prose-xl :where(> :first-child) {
      + .markdown-xl :where(> :first-child) {

      ---

      - .prose-xl :where(> :last-child) {
      + .markdown-xl :where(> :last-child) {

      ---

      - .prose-2xl {
      + .markdown-2xl {

      ---

      - .prose-2xl :where(p) {
      + .markdown-2xl :where(p) {

      ---

      - .prose-2xl :where([class~='lead']) {
      + .markdown-2xl :where([class~='lead']) {

      ---

      - .prose-2xl :where(blockquote) {
      + .markdown-2xl :where(blockquote) {

      ---

      - .prose-2xl :where(h1) {
      + .markdown-2xl :where(h1) {

      ---

      - .prose-2xl :where(h2) {
      + .markdown-2xl :where(h2) {

      ---

      - .prose-2xl :where(h3) {
      + .markdown-2xl :where(h3) {

      ---

      - .prose-2xl :where(h4) {
      + .markdown-2xl :where(h4) {

      ---

      - .prose-2xl :where(img) {
      + .markdown-2xl :where(img) {

      ---

      - .prose-2xl :where(video) {
      + .markdown-2xl :where(video) {

      ---

      - .prose-2xl :where(figure) {
      + .markdown-2xl :where(figure) {

      ---

      - .prose-2xl :where(figure > *) {
      + .markdown-2xl :where(figure > *) {

      ---

      - .prose-2xl :where(figure figcaption) {
      + .markdown-2xl :where(figure figcaption) {

      ---

      - .prose-2xl :where(code) {
      + .markdown-2xl :where(code) {

      ---

      - .prose-2xl :where(h2 code) {
      + .markdown-2xl :where(h2 code) {

      ---

      - .prose-2xl :where(h3 code) {
      + .markdown-2xl :where(h3 code) {

      ---

      - .prose-2xl :where(pre) {
      + .markdown-2xl :where(pre) {

      ---

      - .prose-2xl :where(ol) {
      + .markdown-2xl :where(ol) {

      ---

      - .prose-2xl :where(ul) {
      + .markdown-2xl :where(ul) {

      ---

      - .prose-2xl :where(li) {
      + .markdown-2xl :where(li) {

      ---

      - .prose-2xl :where(ol > li) {
      + .markdown-2xl :where(ol > li) {

      ---

      - .prose-2xl :where(ol > li)::before {
      + .markdown-2xl :where(ol > li)::before {

      ---

      - .prose-2xl :where(ul > li) {
      + .markdown-2xl :where(ul > li) {

      ---

      - .prose-2xl :where(ul > li)::before {
      + .markdown-2xl :where(ul > li)::before {

      ---

      - .prose-2xl :where(> ul > li p) {
      + .markdown-2xl :where(> ul > li p) {

      ---

      - .prose-2xl :where(> ul > li > *:first-child) {
      + .markdown-2xl :where(> ul > li > *:first-child) {

      ---

      - .prose-2xl :where(> ul > li > *:last-child) {
      + .markdown-2xl :where(> ul > li > *:last-child) {

      ---

      - .prose-2xl :where(> ol > li > *:first-child) {
      + .markdown-2xl :where(> ol > li > *:first-child) {

      ---

      - .prose-2xl :where(> ol > li > *:last-child) {
      + .markdown-2xl :where(> ol > li > *:last-child) {

      ---

      - .prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      + .markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      - .prose-2xl :where(hr) {
      + .markdown-2xl :where(hr) {

      ---

      - .prose-2xl :where(hr + *) {
      + .markdown-2xl :where(hr + *) {

      ---

      - .prose-2xl :where(h2 + *) {
      + .markdown-2xl :where(h2 + *) {

      ---

      - .prose-2xl :where(h3 + *) {
      + .markdown-2xl :where(h3 + *) {

      ---

      - .prose-2xl :where(h4 + *) {
      + .markdown-2xl :where(h4 + *) {

      ---

      - .prose-2xl :where(table) {
      + .markdown-2xl :where(table) {

      ---

      - .prose-2xl :where(thead th) {
      + .markdown-2xl :where(thead th) {

      ---

      - .prose-2xl :where(thead th:first-child) {
      + .markdown-2xl :where(thead th:first-child) {

      ---

      - .prose-2xl :where(thead th:last-child) {
      + .markdown-2xl :where(thead th:last-child) {

      ---

      - .prose-2xl :where(tbody td) {
      + .markdown-2xl :where(tbody td) {

      ---

      - .prose-2xl :where(tbody td:first-child) {
      + .markdown-2xl :where(tbody td:first-child) {

      ---

      - .prose-2xl :where(tbody td:last-child) {
      + .markdown-2xl :where(tbody td:last-child) {

      ---

      - .prose-2xl :where(> :first-child) {
      + .markdown-2xl :where(> :first-child) {

      ---

      - .prose-2xl :where(> :last-child) {
      + .markdown-2xl :where(> :last-child) {

      ---

      - }
      -
      - .prose-red :where(a) {
      -   color: #dc2626;
      - }
      -
      - .prose-red :where(a code) {
      -   color: #dc2626;
      - }
      -
      - .prose-yellow :where(a) {
      -   color: #d97706;
      - }
      -
      - .prose-yellow :where(a code) {
      -   color: #d97706;

      ---

      - .prose-green :where(a) {
      -   color: #059669;
      - }
      -
      - .prose-green :where(a code) {
      -   color: #059669;
      - }
      -
      - .prose-blue :where(a) {
      -   color: #2563eb;
      - }
      -
      - .prose-blue :where(a code) {
      -   color: #2563eb;
      - }
      -
      - .prose-indigo :where(a) {
      -   color: #4f46e5;
      - }
      -
      - .prose-indigo :where(a code) {
      -   color: #4f46e5;
      - }
      -
      - .prose-purple :where(a) {
      -   color: #7c3aed;
      - }
      -
      - .prose-purple :where(a code) {
      -   color: #7c3aed;
      - }
      -
      - .prose-pink :where(a) {
      -   color: #db2777;
      - }
      -
      - .prose-pink :where(a code) {
      -   color: #db2777;
      - }
      -

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose :where([class~='lead']) {
      +   .sm\\\\:markdown :where([class~='lead']) {

      ---

      -   .sm\\\\:prose :where(a) {
      +   .sm\\\\:markdown :where(a) {

      ---

      -   .sm\\\\:prose :where(strong) {
      +   .sm\\\\:markdown :where(strong) {

      ---

      -   .sm\\\\:prose :where(ol[type='A']) {
      +   .sm\\\\:markdown :where(ol[type='A']) {

      ---

      -   .sm\\\\:prose :where(ol[type='a']) {
      +   .sm\\\\:markdown :where(ol[type='a']) {

      ---

      -   .sm\\\\:prose :where(ol[type='A' s]) {
      +   .sm\\\\:markdown :where(ol[type='A' s]) {

      ---

      -   .sm\\\\:prose :where(ol[type='a' s]) {
      +   .sm\\\\:markdown :where(ol[type='a' s]) {

      ---

      -   .sm\\\\:prose :where(ol[type='I']) {
      +   .sm\\\\:markdown :where(ol[type='I']) {

      ---

      -   .sm\\\\:prose :where(ol[type='i']) {
      +   .sm\\\\:markdown :where(ol[type='i']) {

      ---

      -   .sm\\\\:prose :where(ol[type='I' s]) {
      +   .sm\\\\:markdown :where(ol[type='I' s]) {

      ---

      -   .sm\\\\:prose :where(ol[type='i' s]) {
      +   .sm\\\\:markdown :where(ol[type='i' s]) {

      ---

      -   .sm\\\\:prose :where(ol[type='1']) {
      +   .sm\\\\:markdown :where(ol[type='1']) {

      ---

      -   .sm\\\\:prose :where(ol > li) {
      +   .sm\\\\:markdown :where(ol > li) {

      ---

      -   .sm\\\\:prose :where(ol > li)::before {
      +   .sm\\\\:markdown :where(ol > li)::before {

      ---

      -   .sm\\\\:prose :where(ul > li) {
      +   .sm\\\\:markdown :where(ul > li) {

      ---

      -   .sm\\\\:prose :where(ul > li)::before {
      +   .sm\\\\:markdown :where(ul > li)::before {

      ---

      -   .sm\\\\:prose :where(hr) {
      +   .sm\\\\:markdown :where(hr) {

      ---

      -   .sm\\\\:prose :where(blockquote) {
      +   .sm\\\\:markdown :where(blockquote) {

      ---

      -   .sm\\\\:prose :where(blockquote p:first-of-type)::before {
      +   .sm\\\\:markdown :where(blockquote p:first-of-type)::before {

      ---

      -   .sm\\\\:prose :where(blockquote p:last-of-type)::after {
      +   .sm\\\\:markdown :where(blockquote p:last-of-type)::after {

      ---

      -   .sm\\\\:prose :where(h1) {
      +   .sm\\\\:markdown :where(h1) {

      ---

      -   .sm\\\\:prose :where(h1 strong) {
      +   .sm\\\\:markdown :where(h1 strong) {

      ---

      -   .sm\\\\:prose :where(h2) {
      +   .sm\\\\:markdown :where(h2) {

      ---

      -   .sm\\\\:prose :where(h2 strong) {
      +   .sm\\\\:markdown :where(h2 strong) {

      ---

      -   .sm\\\\:prose :where(h3) {
      +   .sm\\\\:markdown :where(h3) {

      ---

      -   .sm\\\\:prose :where(h3 strong) {
      +   .sm\\\\:markdown :where(h3 strong) {

      ---

      -   .sm\\\\:prose :where(h4) {
      +   .sm\\\\:markdown :where(h4) {

      ---

      -   .sm\\\\:prose :where(h4 strong) {
      +   .sm\\\\:markdown :where(h4 strong) {

      ---

      -   .sm\\\\:prose :where(figure figcaption) {
      +   .sm\\\\:markdown :where(figure figcaption) {

      ---

      -   .sm\\\\:prose :where(code) {
      +   .sm\\\\:markdown :where(code) {

      ---

      -   .sm\\\\:prose :where(code)::before {
      +   .sm\\\\:markdown :where(code)::before {

      ---

      -   .sm\\\\:prose :where(code)::after {
      +   .sm\\\\:markdown :where(code)::after {

      ---

      -   .sm\\\\:prose :where(a code) {
      +   .sm\\\\:markdown :where(a code) {

      ---

      -   .sm\\\\:prose :where(pre) {
      +   .sm\\\\:markdown :where(pre) {

      ---

      -   .sm\\\\:prose :where(pre code) {
      +   .sm\\\\:markdown :where(pre code) {

      ---

      -   .sm\\\\:prose :where(pre code)::before {
      +   .sm\\\\:markdown :where(pre code)::before {

      ---

      -   .sm\\\\:prose :where(pre code)::after {
      +   .sm\\\\:markdown :where(pre code)::after {

      ---

      -   .sm\\\\:prose :where(table) {
      +   .sm\\\\:markdown :where(table) {

      ---

      -   .sm\\\\:prose :where(thead) {
      +   .sm\\\\:markdown :where(thead) {

      ---

      -   .sm\\\\:prose :where(thead th) {
      +   .sm\\\\:markdown :where(thead th) {

      ---

      -   .sm\\\\:prose :where(tbody tr) {
      +   .sm\\\\:markdown :where(tbody tr) {

      ---

      -   .sm\\\\:prose :where(tbody tr:last-child) {
      +   .sm\\\\:markdown :where(tbody tr:last-child) {

      ---

      -   .sm\\\\:prose :where(tbody td) {
      +   .sm\\\\:markdown :where(tbody td) {

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose :where(p) {
      +   .sm\\\\:markdown :where(p) {

      ---

      -   .sm\\\\:prose :where(img) {
      +   .sm\\\\:markdown :where(img) {

      ---

      -   .sm\\\\:prose :where(video) {
      +   .sm\\\\:markdown :where(video) {

      ---

      -   .sm\\\\:prose :where(figure) {
      +   .sm\\\\:markdown :where(figure) {

      ---

      -   .sm\\\\:prose :where(figure > *) {
      +   .sm\\\\:markdown :where(figure > *) {

      ---

      -   .sm\\\\:prose :where(h2 code) {
      +   .sm\\\\:markdown :where(h2 code) {

      ---

      -   .sm\\\\:prose :where(h3 code) {
      +   .sm\\\\:markdown :where(h3 code) {

      ---

      -   .sm\\\\:prose :where(ol) {
      +   .sm\\\\:markdown :where(ol) {

      ---

      -   .sm\\\\:prose :where(ul) {
      +   .sm\\\\:markdown :where(ul) {

      ---

      -   .sm\\\\:prose :where(li) {
      +   .sm\\\\:markdown :where(li) {

      ---

      -   .sm\\\\:prose :where(> ul > li p) {
      +   .sm\\\\:markdown :where(> ul > li p) {

      ---

      -   .sm\\\\:prose :where(> ul > li > *:first-child) {
      +   .sm\\\\:markdown :where(> ul > li > *:first-child) {

      ---

      -   .sm\\\\:prose :where(> ul > li > *:last-child) {
      +   .sm\\\\:markdown :where(> ul > li > *:last-child) {

      ---

      -   .sm\\\\:prose :where(> ol > li > *:first-child) {
      +   .sm\\\\:markdown :where(> ol > li > *:first-child) {

      ---

      -   .sm\\\\:prose :where(> ol > li > *:last-child) {
      +   .sm\\\\:markdown :where(> ol > li > *:last-child) {

      ---

      -   .sm\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
      +   .sm\\\\:markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   }
      -
      -   .sm\\\\:prose :where(hr + *) {
      -     margin-top: 0;

      ---

      -   .sm\\\\:prose :where(h2 + *) {
      +   .sm\\\\:markdown :where(hr + *) {

      ---

      -   .sm\\\\:prose :where(h3 + *) {
      +   .sm\\\\:markdown :where(h2 + *) {

      ---

      -   .sm\\\\:prose :where(h4 + *) {
      +   .sm\\\\:markdown :where(h3 + *) {

      ---

      -   .sm\\\\:prose :where(thead th:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose :where(thead th:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose :where(tbody td:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose :where(tbody td:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose :where(> :first-child) {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose :where(> :last-child) {
      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .sm\\\\:prose-sm :where(p) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm :where([class~='lead']) {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(blockquote) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(h1) {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .sm\\\\:prose-sm :where(h2) {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .sm\\\\:prose-sm :where(h3) {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .sm\\\\:prose-sm :where(h4) {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .sm\\\\:prose-sm :where(img) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(video) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(figure) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(figure > *) {
      +   .sm\\\\:markdown :where(h4 + *) {

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-sm :where(figure figcaption) {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;

      ---

      -   .sm\\\\:prose-sm :where(code) {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(h2 code) {
      -     font-size: 0.9em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(h3 code) {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(pre) {
      -     font-size: 0.8571429em;
      -     line-height: 1.6666667;
      -     margin-top: 1.6666667em;
      -     margin-bottom: 1.6666667em;
      -     border-radius: 0.25rem;
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(ol) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(ul) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(li) {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(ol > li) {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(ol > li)::before {
      -     left: 0;
      -   }
      -
      -   .sm\\\\:prose-sm :where(ul > li) {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(ul > li)::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(> ul > li p) {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(> ul > li > *:first-child) {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(> ul > li > *:last-child) {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(> ol > li > *:first-child) {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(> ol > li > *:last-child) {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(hr) {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(hr + *) {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm :where(h2 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm :where(h4 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm :where(table) {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .sm\\\\:prose-sm :where(thead th) {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(thead th:first-child) {
      +   .sm\\\\:markdown :where(thead th:first-child) {

      ---

      -   .sm\\\\:prose-sm :where(thead th:last-child) {
      +   .sm\\\\:markdown :where(thead th:last-child) {

      ---

      -   .sm\\\\:prose-sm :where(tbody td) {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .sm\\\\:prose-sm :where(tbody td:first-child) {
      +   .sm\\\\:markdown :where(tbody td:first-child) {

      ---

      -   .sm\\\\:prose-sm :where(tbody td:last-child) {
      +   .sm\\\\:markdown :where(tbody td:last-child) {

      ---

      -   .sm\\\\:prose-sm :where(> :first-child) {
      +   .sm\\\\:markdown :where(> :first-child) {

      ---

      -   .sm\\\\:prose-sm :where(> :last-child) {
      +   .sm\\\\:markdown :where(> :last-child) {

      ---

      -   .sm\\\\:prose-lg {
      +   .sm\\\\:markdown-lg {

      ---

      -   .sm\\\\:prose-lg :where(p) {
      +   .sm\\\\:markdown-lg :where(p) {

      ---

      -   .sm\\\\:prose-lg :where([class~='lead']) {
      +   .sm\\\\:markdown-lg :where([class~='lead']) {

      ---

      -   .sm\\\\:prose-lg :where(blockquote) {
      +   .sm\\\\:markdown-lg :where(blockquote) {

      ---

      -   .sm\\\\:prose-lg :where(h1) {
      +   .sm\\\\:markdown-lg :where(h1) {

      ---

      -   .sm\\\\:prose-lg :where(h2) {
      +   .sm\\\\:markdown-lg :where(h2) {

      ---

      -   .sm\\\\:prose-lg :where(h3) {
      +   .sm\\\\:markdown-lg :where(h3) {

      ---

      -   .sm\\\\:prose-lg :where(h4) {
      +   .sm\\\\:markdown-lg :where(h4) {

      ---

      -   .sm\\\\:prose-lg :where(img) {
      +   .sm\\\\:markdown-lg :where(img) {

      ---

      -   .sm\\\\:prose-lg :where(video) {
      +   .sm\\\\:markdown-lg :where(video) {

      ---

      -   .sm\\\\:prose-lg :where(figure) {
      +   .sm\\\\:markdown-lg :where(figure) {

      ---

      -   .sm\\\\:prose-lg :where(figure > *) {
      +   .sm\\\\:markdown-lg :where(figure > *) {

      ---

      -   .sm\\\\:prose-lg :where(figure figcaption) {
      +   .sm\\\\:markdown-lg :where(figure figcaption) {

      ---

      -   .sm\\\\:prose-lg :where(code) {
      +   .sm\\\\:markdown-lg :where(code) {

      ---

      -   .sm\\\\:prose-lg :where(h2 code) {
      +   .sm\\\\:markdown-lg :where(h2 code) {

      ---

      -   .sm\\\\:prose-lg :where(h3 code) {
      +   .sm\\\\:markdown-lg :where(h3 code) {

      ---

      -   .sm\\\\:prose-lg :where(pre) {
      +   .sm\\\\:markdown-lg :where(pre) {

      ---

      -   .sm\\\\:prose-lg :where(ol) {
      +   .sm\\\\:markdown-lg :where(ol) {

      ---

      -   .sm\\\\:prose-lg :where(ul) {
      +   .sm\\\\:markdown-lg :where(ul) {

      ---

      -   .sm\\\\:prose-lg :where(li) {
      +   .sm\\\\:markdown-lg :where(li) {

      ---

      -   .sm\\\\:prose-lg :where(ol > li) {
      +   .sm\\\\:markdown-lg :where(ol > li) {

      ---

      -   .sm\\\\:prose-lg :where(ol > li)::before {
      +   .sm\\\\:markdown-lg :where(ol > li)::before {

      ---

      -   .sm\\\\:prose-lg :where(ul > li) {
      +   .sm\\\\:markdown-lg :where(ul > li) {

      ---

      -   .sm\\\\:prose-lg :where(ul > li)::before {
      +   .sm\\\\:markdown-lg :where(ul > li)::before {

      ---

      -   .sm\\\\:prose-lg :where(> ul > li p) {
      +   .sm\\\\:markdown-lg :where(> ul > li p) {

      ---

      -   .sm\\\\:prose-lg :where(> ul > li > *:first-child) {
      +   .sm\\\\:markdown-lg :where(> ul > li > *:first-child) {

      ---

      -   .sm\\\\:prose-lg :where(> ul > li > *:last-child) {
      +   .sm\\\\:markdown-lg :where(> ul > li > *:last-child) {

      ---

      -   .sm\\\\:prose-lg :where(> ol > li > *:first-child) {
      +   .sm\\\\:markdown-lg :where(> ol > li > *:first-child) {

      ---

      -   .sm\\\\:prose-lg :where(> ol > li > *:last-child) {
      +   .sm\\\\:markdown-lg :where(> ol > li > *:last-child) {

      ---

      -   .sm\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      +   .sm\\\\:markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .sm\\\\:prose-lg :where(hr) {
      +   .sm\\\\:markdown-lg :where(hr) {

      ---

      -   .sm\\\\:prose-lg :where(hr + *) {
      +   .sm\\\\:markdown-lg :where(hr + *) {

      ---

      -   .sm\\\\:prose-lg :where(h2 + *) {
      +   .sm\\\\:markdown-lg :where(h2 + *) {

      ---

      -   .sm\\\\:prose-lg :where(h3 + *) {
      +   .sm\\\\:markdown-lg :where(h3 + *) {

      ---

      -   .sm\\\\:prose-lg :where(h4 + *) {
      +   .sm\\\\:markdown-lg :where(h4 + *) {

      ---

      -   .sm\\\\:prose-lg :where(table) {
      +   .sm\\\\:markdown-lg :where(table) {

      ---

      -   .sm\\\\:prose-lg :where(thead th) {
      +   .sm\\\\:markdown-lg :where(thead th) {

      ---

      -   .sm\\\\:prose-lg :where(thead th:first-child) {
      +   .sm\\\\:markdown-lg :where(thead th:first-child) {

      ---

      -   .sm\\\\:prose-lg :where(thead th:last-child) {
      +   .sm\\\\:markdown-lg :where(thead th:last-child) {

      ---

      -   .sm\\\\:prose-lg :where(tbody td) {
      +   .sm\\\\:markdown-lg :where(tbody td) {

      ---

      -   .sm\\\\:prose-lg :where(tbody td:first-child) {
      +   .sm\\\\:markdown-lg :where(tbody td:first-child) {

      ---

      -   .sm\\\\:prose-lg :where(tbody td:last-child) {
      +   .sm\\\\:markdown-lg :where(tbody td:last-child) {

      ---

      -   .sm\\\\:prose-lg :where(> :first-child) {
      +   .sm\\\\:markdown-lg :where(> :first-child) {

      ---

      -   .sm\\\\:prose-lg :where(> :last-child) {
      +   .sm\\\\:markdown-lg :where(> :last-child) {

      ---

      -   .sm\\\\:prose-xl {
      +   .sm\\\\:markdown-xl {

      ---

      -   .sm\\\\:prose-xl :where(p) {
      +   .sm\\\\:markdown-xl :where(p) {

      ---

      -   .sm\\\\:prose-xl :where([class~='lead']) {
      +   .sm\\\\:markdown-xl :where([class~='lead']) {

      ---

      -   .sm\\\\:prose-xl :where(blockquote) {
      +   .sm\\\\:markdown-xl :where(blockquote) {

      ---

      -   .sm\\\\:prose-xl :where(h1) {
      +   .sm\\\\:markdown-xl :where(h1) {

      ---

      -   .sm\\\\:prose-xl :where(h2) {
      +   .sm\\\\:markdown-xl :where(h2) {

      ---

      -   .sm\\\\:prose-xl :where(h3) {
      +   .sm\\\\:markdown-xl :where(h3) {

      ---

      -   .sm\\\\:prose-xl :where(h4) {
      +   .sm\\\\:markdown-xl :where(h4) {

      ---

      -   .sm\\\\:prose-xl :where(img) {
      +   .sm\\\\:markdown-xl :where(img) {

      ---

      -   .sm\\\\:prose-xl :where(video) {
      +   .sm\\\\:markdown-xl :where(video) {

      ---

      -   .sm\\\\:prose-xl :where(figure) {
      +   .sm\\\\:markdown-xl :where(figure) {

      ---

      -   .sm\\\\:prose-xl :where(figure > *) {
      +   .sm\\\\:markdown-xl :where(figure > *) {

      ---

      -   .sm\\\\:prose-xl :where(figure figcaption) {
      +   .sm\\\\:markdown-xl :where(figure figcaption) {

      ---

      -   .sm\\\\:prose-xl :where(code) {
      +   .sm\\\\:markdown-xl :where(code) {

      ---

      -   .sm\\\\:prose-xl :where(h2 code) {
      +   .sm\\\\:markdown-xl :where(h2 code) {

      ---

      -   .sm\\\\:prose-xl :where(h3 code) {
      +   .sm\\\\:markdown-xl :where(h3 code) {

      ---

      -   .sm\\\\:prose-xl :where(pre) {
      +   .sm\\\\:markdown-xl :where(pre) {

      ---

      -   .sm\\\\:prose-xl :where(ol) {
      +   .sm\\\\:markdown-xl :where(ol) {

      ---

      -   .sm\\\\:prose-xl :where(ul) {
      +   .sm\\\\:markdown-xl :where(ul) {

      ---

      -   .sm\\\\:prose-xl :where(li) {
      +   .sm\\\\:markdown-xl :where(li) {

      ---

      -   .sm\\\\:prose-xl :where(ol > li) {
      +   .sm\\\\:markdown-xl :where(ol > li) {

      ---

      -   .sm\\\\:prose-xl :where(ol > li)::before {
      +   .sm\\\\:markdown-xl :where(ol > li)::before {

      ---

      -   .sm\\\\:prose-xl :where(ul > li) {
      +   .sm\\\\:markdown-xl :where(ul > li) {

      ---

      -   .sm\\\\:prose-xl :where(ul > li)::before {
      +   .sm\\\\:markdown-xl :where(ul > li)::before {

      ---

      -   .sm\\\\:prose-xl :where(> ul > li p) {
      +   .sm\\\\:markdown-xl :where(> ul > li p) {

      ---

      -   .sm\\\\:prose-xl :where(> ul > li > *:first-child) {
      +   .sm\\\\:markdown-xl :where(> ul > li > *:first-child) {

      ---

      -   .sm\\\\:prose-xl :where(> ul > li > *:last-child) {
      +   .sm\\\\:markdown-xl :where(> ul > li > *:last-child) {

      ---

      -   .sm\\\\:prose-xl :where(> ol > li > *:first-child) {
      +   .sm\\\\:markdown-xl :where(> ol > li > *:first-child) {

      ---

      -   .sm\\\\:prose-xl :where(> ol > li > *:last-child) {
      +   .sm\\\\:markdown-xl :where(> ol > li > *:last-child) {

      ---

      -   .sm\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .sm\\\\:markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .sm\\\\:prose-xl :where(hr) {
      +   .sm\\\\:markdown-xl :where(hr) {

      ---

      -   .sm\\\\:prose-xl :where(hr + *) {
      +   .sm\\\\:markdown-xl :where(hr + *) {

      ---

      -   .sm\\\\:prose-xl :where(h2 + *) {
      +   .sm\\\\:markdown-xl :where(h2 + *) {

      ---

      -   .sm\\\\:prose-xl :where(h3 + *) {
      +   .sm\\\\:markdown-xl :where(h3 + *) {

      ---

      -   .sm\\\\:prose-xl :where(h4 + *) {
      +   .sm\\\\:markdown-xl :where(h4 + *) {

      ---

      -   .sm\\\\:prose-xl :where(table) {
      +   .sm\\\\:markdown-xl :where(table) {

      ---

      -   .sm\\\\:prose-xl :where(thead th) {
      +   .sm\\\\:markdown-xl :where(thead th) {

      ---

      -   .sm\\\\:prose-xl :where(thead th:first-child) {
      +   .sm\\\\:markdown-xl :where(thead th:first-child) {

      ---

      -   .sm\\\\:prose-xl :where(thead th:last-child) {
      +   .sm\\\\:markdown-xl :where(thead th:last-child) {

      ---

      -   .sm\\\\:prose-xl :where(tbody td) {
      +   .sm\\\\:markdown-xl :where(tbody td) {

      ---

      -   .sm\\\\:prose-xl :where(tbody td:first-child) {
      +   .sm\\\\:markdown-xl :where(tbody td:first-child) {

      ---

      -   .sm\\\\:prose-xl :where(tbody td:last-child) {
      +   .sm\\\\:markdown-xl :where(tbody td:last-child) {

      ---

      -   .sm\\\\:prose-xl :where(> :first-child) {
      +   .sm\\\\:markdown-xl :where(> :first-child) {

      ---

      -   .sm\\\\:prose-xl :where(> :last-child) {
      +   .sm\\\\:markdown-xl :where(> :last-child) {

      ---

      -   .sm\\\\:prose-2xl {
      +   .sm\\\\:markdown-2xl {

      ---

      -   .sm\\\\:prose-2xl :where(p) {
      +   .sm\\\\:markdown-2xl :where(p) {

      ---

      -   .sm\\\\:prose-2xl :where([class~='lead']) {
      +   .sm\\\\:markdown-2xl :where([class~='lead']) {

      ---

      -   .sm\\\\:prose-2xl :where(blockquote) {
      +   .sm\\\\:markdown-2xl :where(blockquote) {

      ---

      -   .sm\\\\:prose-2xl :where(h1) {
      +   .sm\\\\:markdown-2xl :where(h1) {

      ---

      -   .sm\\\\:prose-2xl :where(h2) {
      +   .sm\\\\:markdown-2xl :where(h2) {

      ---

      -   .sm\\\\:prose-2xl :where(h3) {
      +   .sm\\\\:markdown-2xl :where(h3) {

      ---

      -   .sm\\\\:prose-2xl :where(h4) {
      +   .sm\\\\:markdown-2xl :where(h4) {

      ---

      -   .sm\\\\:prose-2xl :where(img) {
      +   .sm\\\\:markdown-2xl :where(img) {

      ---

      -   .sm\\\\:prose-2xl :where(video) {
      +   .sm\\\\:markdown-2xl :where(video) {

      ---

      -   .sm\\\\:prose-2xl :where(figure) {
      +   .sm\\\\:markdown-2xl :where(figure) {

      ---

      -   .sm\\\\:prose-2xl :where(figure > *) {
      +   .sm\\\\:markdown-2xl :where(figure > *) {

      ---

      -   .sm\\\\:prose-2xl :where(figure figcaption) {
      +   .sm\\\\:markdown-2xl :where(figure figcaption) {

      ---

      -   .sm\\\\:prose-2xl :where(code) {
      +   .sm\\\\:markdown-2xl :where(code) {

      ---

      -   .sm\\\\:prose-2xl :where(h2 code) {
      +   .sm\\\\:markdown-2xl :where(h2 code) {

      ---

      -   .sm\\\\:prose-2xl :where(h3 code) {
      +   .sm\\\\:markdown-2xl :where(h3 code) {

      ---

      -   .sm\\\\:prose-2xl :where(pre) {
      +   .sm\\\\:markdown-2xl :where(pre) {

      ---

      -   .sm\\\\:prose-2xl :where(ol) {
      +   .sm\\\\:markdown-2xl :where(ol) {

      ---

      -   .sm\\\\:prose-2xl :where(ul) {
      +   .sm\\\\:markdown-2xl :where(ul) {

      ---

      -   .sm\\\\:prose-2xl :where(li) {
      +   .sm\\\\:markdown-2xl :where(li) {

      ---

      -   .sm\\\\:prose-2xl :where(ol > li) {
      +   .sm\\\\:markdown-2xl :where(ol > li) {

      ---

      -   .sm\\\\:prose-2xl :where(ol > li)::before {
      +   .sm\\\\:markdown-2xl :where(ol > li)::before {

      ---

      -   .sm\\\\:prose-2xl :where(ul > li) {
      +   .sm\\\\:markdown-2xl :where(ul > li) {

      ---

      -   .sm\\\\:prose-2xl :where(ul > li)::before {
      +   .sm\\\\:markdown-2xl :where(ul > li)::before {

      ---

      -   .sm\\\\:prose-2xl :where(> ul > li p) {
      +   .sm\\\\:markdown-2xl :where(> ul > li p) {

      ---

      -   .sm\\\\:prose-2xl :where(> ul > li > *:first-child) {
      +   .sm\\\\:markdown-2xl :where(> ul > li > *:first-child) {

      ---

      -   .sm\\\\:prose-2xl :where(> ul > li > *:last-child) {
      +   .sm\\\\:markdown-2xl :where(> ul > li > *:last-child) {

      ---

      -   .sm\\\\:prose-2xl :where(> ol > li > *:first-child) {
      +   .sm\\\\:markdown-2xl :where(> ol > li > *:first-child) {

      ---

      -   .sm\\\\:prose-2xl :where(> ol > li > *:last-child) {
      +   .sm\\\\:markdown-2xl :where(> ol > li > *:last-child) {

      ---

      -   .sm\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .sm\\\\:markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .sm\\\\:prose-2xl :where(hr) {
      +   .sm\\\\:markdown-2xl :where(hr) {

      ---

      -   .sm\\\\:prose-2xl :where(hr + *) {
      +   .sm\\\\:markdown-2xl :where(hr + *) {

      ---

      -   .sm\\\\:prose-2xl :where(h2 + *) {
      +   .sm\\\\:markdown-2xl :where(h2 + *) {

      ---

      -   .sm\\\\:prose-2xl :where(h3 + *) {
      +   .sm\\\\:markdown-2xl :where(h3 + *) {

      ---

      -   .sm\\\\:prose-2xl :where(h4 + *) {
      +   .sm\\\\:markdown-2xl :where(h4 + *) {

      ---

      -   .sm\\\\:prose-2xl :where(table) {
      +   .sm\\\\:markdown-2xl :where(table) {

      ---

      -   .sm\\\\:prose-2xl :where(thead th) {
      +   .sm\\\\:markdown-2xl :where(thead th) {

      ---

      -   .sm\\\\:prose-2xl :where(thead th:first-child) {
      +   .sm\\\\:markdown-2xl :where(thead th:first-child) {

      ---

      -   .sm\\\\:prose-2xl :where(thead th:last-child) {
      +   .sm\\\\:markdown-2xl :where(thead th:last-child) {

      ---

      -   .sm\\\\:prose-2xl :where(tbody td) {
      +   .sm\\\\:markdown-2xl :where(tbody td) {

      ---

      -   .sm\\\\:prose-2xl :where(tbody td:first-child) {
      +   .sm\\\\:markdown-2xl :where(tbody td:first-child) {

      ---

      -   .sm\\\\:prose-2xl :where(tbody td:last-child) {
      +   .sm\\\\:markdown-2xl :where(tbody td:last-child) {

      ---

      -   .sm\\\\:prose-2xl :where(> :first-child) {
      +   .sm\\\\:markdown-2xl :where(> :first-child) {

      ---

      -   .sm\\\\:prose-2xl :where(> :last-child) {
      +   .sm\\\\:markdown-2xl :where(> :last-child) {

      ---

      -   }
      -
      -   .sm\\\\:prose-red :where(a) {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-red :where(a code) {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-yellow :where(a) {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-yellow :where(a code) {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-green :where(a) {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-green :where(a code) {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-blue :where(a) {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-blue :where(a code) {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-indigo :where(a) {
      -     color: #4f46e5;

      ---

      -
      -   .sm\\\\:prose-indigo :where(a code) {
      -     color: #4f46e5;
      -   }
      -
      -   .sm\\\\:prose-purple :where(a) {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-purple :where(a code) {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-pink :where(a) {
      -     color: #db2777;
      -   }
      -
      -   .sm\\\\:prose-pink :where(a code) {
      -     color: #db2777;
      -   }

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose :where([class~='lead']) {
      +   .md\\\\:markdown :where([class~='lead']) {

      ---

      -   .md\\\\:prose :where(a) {
      +   .md\\\\:markdown :where(a) {

      ---

      -   .md\\\\:prose :where(strong) {
      +   .md\\\\:markdown :where(strong) {

      ---

      -   .md\\\\:prose :where(ol[type='A']) {
      +   .md\\\\:markdown :where(ol[type='A']) {

      ---

      -   .md\\\\:prose :where(ol[type='a']) {
      +   .md\\\\:markdown :where(ol[type='a']) {

      ---

      -   .md\\\\:prose :where(ol[type='A' s]) {
      +   .md\\\\:markdown :where(ol[type='A' s]) {

      ---

      -   .md\\\\:prose :where(ol[type='a' s]) {
      +   .md\\\\:markdown :where(ol[type='a' s]) {

      ---

      -   .md\\\\:prose :where(ol[type='I']) {
      +   .md\\\\:markdown :where(ol[type='I']) {

      ---

      -   .md\\\\:prose :where(ol[type='i']) {
      +   .md\\\\:markdown :where(ol[type='i']) {

      ---

      -   .md\\\\:prose :where(ol[type='I' s]) {
      +   .md\\\\:markdown :where(ol[type='I' s]) {

      ---

      -   .md\\\\:prose :where(ol[type='i' s]) {
      +   .md\\\\:markdown :where(ol[type='i' s]) {

      ---

      -   .md\\\\:prose :where(ol[type='1']) {
      +   .md\\\\:markdown :where(ol[type='1']) {

      ---

      -   .md\\\\:prose :where(ol > li) {
      +   .md\\\\:markdown :where(ol > li) {

      ---

      -   .md\\\\:prose :where(ol > li)::before {
      +   .md\\\\:markdown :where(ol > li)::before {

      ---

      -   .md\\\\:prose :where(ul > li) {
      +   .md\\\\:markdown :where(ul > li) {

      ---

      -   .md\\\\:prose :where(ul > li)::before {
      +   .md\\\\:markdown :where(ul > li)::before {

      ---

      -   .md\\\\:prose :where(hr) {
      +   .md\\\\:markdown :where(hr) {

      ---

      -   .md\\\\:prose :where(blockquote) {
      +   .md\\\\:markdown :where(blockquote) {

      ---

      -   .md\\\\:prose :where(blockquote p:first-of-type)::before {
      +   .md\\\\:markdown :where(blockquote p:first-of-type)::before {

      ---

      -   .md\\\\:prose :where(blockquote p:last-of-type)::after {
      +   .md\\\\:markdown :where(blockquote p:last-of-type)::after {

      ---

      -   .md\\\\:prose :where(h1) {
      +   .md\\\\:markdown :where(h1) {

      ---

      -   .md\\\\:prose :where(h1 strong) {
      +   .md\\\\:markdown :where(h1 strong) {

      ---

      -   .md\\\\:prose :where(h2) {
      +   .md\\\\:markdown :where(h2) {

      ---

      -   .md\\\\:prose :where(h2 strong) {
      +   .md\\\\:markdown :where(h2 strong) {

      ---

      -   .md\\\\:prose :where(h3) {
      +   .md\\\\:markdown :where(h3) {

      ---

      -   .md\\\\:prose :where(h3 strong) {
      +   .md\\\\:markdown :where(h3 strong) {

      ---

      -   .md\\\\:prose :where(h4) {
      +   .md\\\\:markdown :where(h4) {

      ---

      -   .md\\\\:prose :where(h4 strong) {
      +   .md\\\\:markdown :where(h4 strong) {

      ---

      -   .md\\\\:prose :where(figure figcaption) {
      +   .md\\\\:markdown :where(figure figcaption) {

      ---

      -   .md\\\\:prose :where(code) {
      +   .md\\\\:markdown :where(code) {

      ---

      -   .md\\\\:prose :where(code)::before {
      +   .md\\\\:markdown :where(code)::before {

      ---

      -   .md\\\\:prose :where(code)::after {
      +   .md\\\\:markdown :where(code)::after {

      ---

      -   .md\\\\:prose :where(a code) {
      +   .md\\\\:markdown :where(a code) {

      ---

      -   .md\\\\:prose :where(pre) {
      +   .md\\\\:markdown :where(pre) {

      ---

      -   .md\\\\:prose :where(pre code) {
      +   .md\\\\:markdown :where(pre code) {

      ---

      -   .md\\\\:prose :where(pre code)::before {
      +   .md\\\\:markdown :where(pre code)::before {

      ---

      -   .md\\\\:prose :where(pre code)::after {
      +   .md\\\\:markdown :where(pre code)::after {

      ---

      -   .md\\\\:prose :where(table) {
      +   .md\\\\:markdown :where(table) {

      ---

      -   .md\\\\:prose :where(thead) {
      +   .md\\\\:markdown :where(thead) {

      ---

      -   .md\\\\:prose :where(thead th) {
      +   .md\\\\:markdown :where(thead th) {

      ---

      -   .md\\\\:prose :where(tbody tr) {
      +   .md\\\\:markdown :where(tbody tr) {

      ---

      -   .md\\\\:prose :where(tbody tr:last-child) {
      +   .md\\\\:markdown :where(tbody tr:last-child) {

      ---

      -   .md\\\\:prose :where(tbody td) {
      +   .md\\\\:markdown :where(tbody td) {

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose :where(p) {
      +   .md\\\\:markdown :where(p) {

      ---

      -   .md\\\\:prose :where(img) {
      +   .md\\\\:markdown :where(img) {

      ---

      -   .md\\\\:prose :where(video) {
      +   .md\\\\:markdown :where(video) {

      ---

      -   .md\\\\:prose :where(figure) {
      +   .md\\\\:markdown :where(figure) {

      ---

      -   .md\\\\:prose :where(figure > *) {
      +   .md\\\\:markdown :where(figure > *) {

      ---

      -   .md\\\\:prose :where(h2 code) {
      +   .md\\\\:markdown :where(h2 code) {

      ---

      -   .md\\\\:prose :where(h3 code) {
      +   .md\\\\:markdown :where(h3 code) {

      ---

      -   .md\\\\:prose :where(ol) {
      +   .md\\\\:markdown :where(ol) {

      ---

      -   .md\\\\:prose :where(ul) {
      +   .md\\\\:markdown :where(ul) {

      ---

      -   .md\\\\:prose :where(li) {
      +   .md\\\\:markdown :where(li) {

      ---

      -   .md\\\\:prose :where(> ul > li p) {
      +   .md\\\\:markdown :where(> ul > li p) {

      ---

      -   .md\\\\:prose :where(> ul > li > *:first-child) {
      +   .md\\\\:markdown :where(> ul > li > *:first-child) {

      ---

      -   .md\\\\:prose :where(> ul > li > *:last-child) {
      +   .md\\\\:markdown :where(> ul > li > *:last-child) {

      ---

      -   .md\\\\:prose :where(> ol > li > *:first-child) {
      +   .md\\\\:markdown :where(> ol > li > *:first-child) {

      ---

      -   .md\\\\:prose :where(> ol > li > *:last-child) {
      +   .md\\\\:markdown :where(> ol > li > *:last-child) {

      ---

      -   .md\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
      +   .md\\\\:markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .md\\\\:prose :where(hr + *) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose :where(h2 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose :where(h4 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose :where(thead th:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose :where(thead th:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose :where(tbody td:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose :where(tbody td:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose :where(> :first-child) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose :where(> :last-child) {
      -     margin-bottom: 0;
      -   }
      -
      -   .md\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .md\\\\:prose-sm :where(p) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm :where([class~='lead']) {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .md\\\\:prose-sm :where(blockquote) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .md\\\\:prose-sm :where(h1) {
      -     font-size: 2.1428571em;
      +   .md\\\\:markdown :where(hr + *) {

      ---

      -     margin-bottom: 0.8em;
      -     line-height: 1.2;

      ---

      -   .md\\\\:prose-sm :where(h2) {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .md\\\\:prose-sm :where(h3) {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .md\\\\:prose-sm :where(h4) {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .md\\\\:prose-sm :where(img) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .md\\\\:prose-sm :where(video) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .md\\\\:prose-sm :where(figure) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .md\\\\:prose-sm :where(figure > *) {
      +   .md\\\\:markdown :where(h2 + *) {

      ---

      -     margin-bottom: 0;

      ---

      -   .md\\\\:prose-sm :where(figure figcaption) {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .md\\\\:prose-sm :where(code) {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .md\\\\:prose-sm :where(h2 code) {
      -     font-size: 0.9em;
      -   }
      -
      -   .md\\\\:prose-sm :where(h3 code) {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .md\\\\:prose-sm :where(pre) {
      -     font-size: 0.8571429em;
      -     line-height: 1.6666667;
      -     margin-top: 1.6666667em;
      -     margin-bottom: 1.6666667em;
      -     border-radius: 0.25rem;
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .md\\\\:prose-sm :where(ol) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm :where(ul) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm :where(li) {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .md\\\\:prose-sm :where(ol > li) {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm :where(ol > li)::before {
      -     left: 0;
      -   }
      -
      -   .md\\\\:prose-sm :where(ul > li) {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm :where(ul > li)::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .md\\\\:prose-sm :where(> ul > li p) {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm :where(> ul > li > *:first-child) {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm :where(> ul > li > *:last-child) {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm :where(> ol > li > *:first-child) {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm :where(> ol > li > *:last-child) {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm :where(hr) {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .md\\\\:prose-sm :where(hr + *) {
      +   .md\\\\:markdown :where(h3 + *) {

      ---

      -   .md\\\\:prose-sm :where(h2 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-sm :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-sm :where(h4 + *) {
      +   .md\\\\:markdown :where(h4 + *) {

      ---

      -   }
      -
      -   .md\\\\:prose-sm :where(table) {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;

      ---

      -   .md\\\\:prose-sm :where(thead th) {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .md\\\\:prose-sm :where(thead th:first-child) {
      +   .md\\\\:markdown :where(thead th:first-child) {

      ---

      -   .md\\\\:prose-sm :where(thead th:last-child) {
      +   .md\\\\:markdown :where(thead th:last-child) {

      ---

      -   .md\\\\:prose-sm :where(tbody td) {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .md\\\\:prose-sm :where(tbody td:first-child) {
      +   .md\\\\:markdown :where(tbody td:first-child) {

      ---

      -   .md\\\\:prose-sm :where(tbody td:last-child) {
      +   .md\\\\:markdown :where(tbody td:last-child) {

      ---

      -   .md\\\\:prose-sm :where(> :first-child) {
      +   .md\\\\:markdown :where(> :first-child) {

      ---

      -   .md\\\\:prose-sm :where(> :last-child) {
      +   .md\\\\:markdown :where(> :last-child) {

      ---

      -   .md\\\\:prose-lg {
      +   .md\\\\:markdown-lg {

      ---

      -   .md\\\\:prose-lg :where(p) {
      +   .md\\\\:markdown-lg :where(p) {

      ---

      -   .md\\\\:prose-lg :where([class~='lead']) {
      +   .md\\\\:markdown-lg :where([class~='lead']) {

      ---

      -   .md\\\\:prose-lg :where(blockquote) {
      +   .md\\\\:markdown-lg :where(blockquote) {

      ---

      -   .md\\\\:prose-lg :where(h1) {
      +   .md\\\\:markdown-lg :where(h1) {

      ---

      -   .md\\\\:prose-lg :where(h2) {
      +   .md\\\\:markdown-lg :where(h2) {

      ---

      -   .md\\\\:prose-lg :where(h3) {
      +   .md\\\\:markdown-lg :where(h3) {

      ---

      -   .md\\\\:prose-lg :where(h4) {
      +   .md\\\\:markdown-lg :where(h4) {

      ---

      -   .md\\\\:prose-lg :where(img) {
      +   .md\\\\:markdown-lg :where(img) {

      ---

      -   .md\\\\:prose-lg :where(video) {
      +   .md\\\\:markdown-lg :where(video) {

      ---

      -   .md\\\\:prose-lg :where(figure) {
      +   .md\\\\:markdown-lg :where(figure) {

      ---

      -   .md\\\\:prose-lg :where(figure > *) {
      +   .md\\\\:markdown-lg :where(figure > *) {

      ---

      -   .md\\\\:prose-lg :where(figure figcaption) {
      +   .md\\\\:markdown-lg :where(figure figcaption) {

      ---

      -   .md\\\\:prose-lg :where(code) {
      +   .md\\\\:markdown-lg :where(code) {

      ---

      -   .md\\\\:prose-lg :where(h2 code) {
      +   .md\\\\:markdown-lg :where(h2 code) {

      ---

      -   .md\\\\:prose-lg :where(h3 code) {
      +   .md\\\\:markdown-lg :where(h3 code) {

      ---

      -   .md\\\\:prose-lg :where(pre) {
      +   .md\\\\:markdown-lg :where(pre) {

      ---

      -   .md\\\\:prose-lg :where(ol) {
      +   .md\\\\:markdown-lg :where(ol) {

      ---

      -   .md\\\\:prose-lg :where(ul) {
      +   .md\\\\:markdown-lg :where(ul) {

      ---

      -   .md\\\\:prose-lg :where(li) {
      +   .md\\\\:markdown-lg :where(li) {

      ---

      -   .md\\\\:prose-lg :where(ol > li) {
      +   .md\\\\:markdown-lg :where(ol > li) {

      ---

      -   .md\\\\:prose-lg :where(ol > li)::before {
      +   .md\\\\:markdown-lg :where(ol > li)::before {

      ---

      -   .md\\\\:prose-lg :where(ul > li) {
      +   .md\\\\:markdown-lg :where(ul > li) {

      ---

      -   .md\\\\:prose-lg :where(ul > li)::before {
      +   .md\\\\:markdown-lg :where(ul > li)::before {

      ---

      -   .md\\\\:prose-lg :where(> ul > li p) {
      +   .md\\\\:markdown-lg :where(> ul > li p) {

      ---

      -   .md\\\\:prose-lg :where(> ul > li > *:first-child) {
      +   .md\\\\:markdown-lg :where(> ul > li > *:first-child) {

      ---

      -   .md\\\\:prose-lg :where(> ul > li > *:last-child) {
      +   .md\\\\:markdown-lg :where(> ul > li > *:last-child) {

      ---

      -   .md\\\\:prose-lg :where(> ol > li > *:first-child) {
      +   .md\\\\:markdown-lg :where(> ol > li > *:first-child) {

      ---

      -   .md\\\\:prose-lg :where(> ol > li > *:last-child) {
      +   .md\\\\:markdown-lg :where(> ol > li > *:last-child) {

      ---

      -   .md\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      +   .md\\\\:markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .md\\\\:prose-lg :where(hr) {
      +   .md\\\\:markdown-lg :where(hr) {

      ---

      -   .md\\\\:prose-lg :where(hr + *) {
      +   .md\\\\:markdown-lg :where(hr + *) {

      ---

      -   .md\\\\:prose-lg :where(h2 + *) {
      +   .md\\\\:markdown-lg :where(h2 + *) {

      ---

      -   .md\\\\:prose-lg :where(h3 + *) {
      +   .md\\\\:markdown-lg :where(h3 + *) {

      ---

      -   .md\\\\:prose-lg :where(h4 + *) {
      +   .md\\\\:markdown-lg :where(h4 + *) {

      ---

      -   .md\\\\:prose-lg :where(table) {
      +   .md\\\\:markdown-lg :where(table) {

      ---

      -   .md\\\\:prose-lg :where(thead th) {
      +   .md\\\\:markdown-lg :where(thead th) {

      ---

      -   .md\\\\:prose-lg :where(thead th:first-child) {
      +   .md\\\\:markdown-lg :where(thead th:first-child) {

      ---

      -   .md\\\\:prose-lg :where(thead th:last-child) {
      +   .md\\\\:markdown-lg :where(thead th:last-child) {

      ---

      -   .md\\\\:prose-lg :where(tbody td) {
      +   .md\\\\:markdown-lg :where(tbody td) {

      ---

      -   .md\\\\:prose-lg :where(tbody td:first-child) {
      +   .md\\\\:markdown-lg :where(tbody td:first-child) {

      ---

      -   .md\\\\:prose-lg :where(tbody td:last-child) {
      +   .md\\\\:markdown-lg :where(tbody td:last-child) {

      ---

      -   .md\\\\:prose-lg :where(> :first-child) {
      +   .md\\\\:markdown-lg :where(> :first-child) {

      ---

      -   .md\\\\:prose-lg :where(> :last-child) {
      +   .md\\\\:markdown-lg :where(> :last-child) {

      ---

      -   .md\\\\:prose-xl {
      +   .md\\\\:markdown-xl {

      ---

      -   .md\\\\:prose-xl :where(p) {
      +   .md\\\\:markdown-xl :where(p) {

      ---

      -   .md\\\\:prose-xl :where([class~='lead']) {
      +   .md\\\\:markdown-xl :where([class~='lead']) {

      ---

      -   .md\\\\:prose-xl :where(blockquote) {
      +   .md\\\\:markdown-xl :where(blockquote) {

      ---

      -   .md\\\\:prose-xl :where(h1) {
      +   .md\\\\:markdown-xl :where(h1) {

      ---

      -   .md\\\\:prose-xl :where(h2) {
      +   .md\\\\:markdown-xl :where(h2) {

      ---

      -   .md\\\\:prose-xl :where(h3) {
      +   .md\\\\:markdown-xl :where(h3) {

      ---

      -   .md\\\\:prose-xl :where(h4) {
      +   .md\\\\:markdown-xl :where(h4) {

      ---

      -   .md\\\\:prose-xl :where(img) {
      +   .md\\\\:markdown-xl :where(img) {

      ---

      -   .md\\\\:prose-xl :where(video) {
      +   .md\\\\:markdown-xl :where(video) {

      ---

      -   .md\\\\:prose-xl :where(figure) {
      +   .md\\\\:markdown-xl :where(figure) {

      ---

      -   .md\\\\:prose-xl :where(figure > *) {
      +   .md\\\\:markdown-xl :where(figure > *) {

      ---

      -   .md\\\\:prose-xl :where(figure figcaption) {
      +   .md\\\\:markdown-xl :where(figure figcaption) {

      ---

      -   .md\\\\:prose-xl :where(code) {
      +   .md\\\\:markdown-xl :where(code) {

      ---

      -   .md\\\\:prose-xl :where(h2 code) {
      +   .md\\\\:markdown-xl :where(h2 code) {

      ---

      -   .md\\\\:prose-xl :where(h3 code) {
      +   .md\\\\:markdown-xl :where(h3 code) {

      ---

      -   .md\\\\:prose-xl :where(pre) {
      +   .md\\\\:markdown-xl :where(pre) {

      ---

      -   .md\\\\:prose-xl :where(ol) {
      +   .md\\\\:markdown-xl :where(ol) {

      ---

      -   .md\\\\:prose-xl :where(ul) {
      +   .md\\\\:markdown-xl :where(ul) {

      ---

      -   .md\\\\:prose-xl :where(li) {
      +   .md\\\\:markdown-xl :where(li) {

      ---

      -   .md\\\\:prose-xl :where(ol > li) {
      +   .md\\\\:markdown-xl :where(ol > li) {

      ---

      -   .md\\\\:prose-xl :where(ol > li)::before {
      +   .md\\\\:markdown-xl :where(ol > li)::before {

      ---

      -   .md\\\\:prose-xl :where(ul > li) {
      +   .md\\\\:markdown-xl :where(ul > li) {

      ---

      -   .md\\\\:prose-xl :where(ul > li)::before {
      +   .md\\\\:markdown-xl :where(ul > li)::before {

      ---

      -   .md\\\\:prose-xl :where(> ul > li p) {
      +   .md\\\\:markdown-xl :where(> ul > li p) {

      ---

      -   .md\\\\:prose-xl :where(> ul > li > *:first-child) {
      +   .md\\\\:markdown-xl :where(> ul > li > *:first-child) {

      ---

      -   .md\\\\:prose-xl :where(> ul > li > *:last-child) {
      +   .md\\\\:markdown-xl :where(> ul > li > *:last-child) {

      ---

      -   .md\\\\:prose-xl :where(> ol > li > *:first-child) {
      +   .md\\\\:markdown-xl :where(> ol > li > *:first-child) {

      ---

      -   .md\\\\:prose-xl :where(> ol > li > *:last-child) {
      +   .md\\\\:markdown-xl :where(> ol > li > *:last-child) {

      ---

      -   .md\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .md\\\\:markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .md\\\\:prose-xl :where(hr) {
      +   .md\\\\:markdown-xl :where(hr) {

      ---

      -   .md\\\\:prose-xl :where(hr + *) {
      +   .md\\\\:markdown-xl :where(hr + *) {

      ---

      -   .md\\\\:prose-xl :where(h2 + *) {
      +   .md\\\\:markdown-xl :where(h2 + *) {

      ---

      -   .md\\\\:prose-xl :where(h3 + *) {
      +   .md\\\\:markdown-xl :where(h3 + *) {

      ---

      -   .md\\\\:prose-xl :where(h4 + *) {
      +   .md\\\\:markdown-xl :where(h4 + *) {

      ---

      -   .md\\\\:prose-xl :where(table) {
      +   .md\\\\:markdown-xl :where(table) {

      ---

      -   .md\\\\:prose-xl :where(thead th) {
      +   .md\\\\:markdown-xl :where(thead th) {

      ---

      -   .md\\\\:prose-xl :where(thead th:first-child) {
      +   .md\\\\:markdown-xl :where(thead th:first-child) {

      ---

      -   .md\\\\:prose-xl :where(thead th:last-child) {
      +   .md\\\\:markdown-xl :where(thead th:last-child) {

      ---

      -   .md\\\\:prose-xl :where(tbody td) {
      +   .md\\\\:markdown-xl :where(tbody td) {

      ---

      -   .md\\\\:prose-xl :where(tbody td:first-child) {
      +   .md\\\\:markdown-xl :where(tbody td:first-child) {

      ---

      -   .md\\\\:prose-xl :where(tbody td:last-child) {
      +   .md\\\\:markdown-xl :where(tbody td:last-child) {

      ---

      -   .md\\\\:prose-xl :where(> :first-child) {
      +   .md\\\\:markdown-xl :where(> :first-child) {

      ---

      -   .md\\\\:prose-xl :where(> :last-child) {
      +   .md\\\\:markdown-xl :where(> :last-child) {

      ---

      -   .md\\\\:prose-2xl {
      +   .md\\\\:markdown-2xl {

      ---

      -   .md\\\\:prose-2xl :where(p) {
      +   .md\\\\:markdown-2xl :where(p) {

      ---

      -   .md\\\\:prose-2xl :where([class~='lead']) {
      +   .md\\\\:markdown-2xl :where([class~='lead']) {

      ---

      -   .md\\\\:prose-2xl :where(blockquote) {
      +   .md\\\\:markdown-2xl :where(blockquote) {

      ---

      -   .md\\\\:prose-2xl :where(h1) {
      +   .md\\\\:markdown-2xl :where(h1) {

      ---

      -   .md\\\\:prose-2xl :where(h2) {
      +   .md\\\\:markdown-2xl :where(h2) {

      ---

      -   .md\\\\:prose-2xl :where(h3) {
      +   .md\\\\:markdown-2xl :where(h3) {

      ---

      -   .md\\\\:prose-2xl :where(h4) {
      +   .md\\\\:markdown-2xl :where(h4) {

      ---

      -   .md\\\\:prose-2xl :where(img) {
      +   .md\\\\:markdown-2xl :where(img) {

      ---

      -   .md\\\\:prose-2xl :where(video) {
      +   .md\\\\:markdown-2xl :where(video) {

      ---

      -   .md\\\\:prose-2xl :where(figure) {
      +   .md\\\\:markdown-2xl :where(figure) {

      ---

      -   .md\\\\:prose-2xl :where(figure > *) {
      +   .md\\\\:markdown-2xl :where(figure > *) {

      ---

      -   .md\\\\:prose-2xl :where(figure figcaption) {
      +   .md\\\\:markdown-2xl :where(figure figcaption) {

      ---

      -   .md\\\\:prose-2xl :where(code) {
      +   .md\\\\:markdown-2xl :where(code) {

      ---

      -   .md\\\\:prose-2xl :where(h2 code) {
      +   .md\\\\:markdown-2xl :where(h2 code) {

      ---

      -   .md\\\\:prose-2xl :where(h3 code) {
      +   .md\\\\:markdown-2xl :where(h3 code) {

      ---

      -   .md\\\\:prose-2xl :where(pre) {
      +   .md\\\\:markdown-2xl :where(pre) {

      ---

      -   .md\\\\:prose-2xl :where(ol) {
      +   .md\\\\:markdown-2xl :where(ol) {

      ---

      -   .md\\\\:prose-2xl :where(ul) {
      +   .md\\\\:markdown-2xl :where(ul) {

      ---

      -   .md\\\\:prose-2xl :where(li) {
      +   .md\\\\:markdown-2xl :where(li) {

      ---

      -   .md\\\\:prose-2xl :where(ol > li) {
      +   .md\\\\:markdown-2xl :where(ol > li) {

      ---

      -   .md\\\\:prose-2xl :where(ol > li)::before {
      +   .md\\\\:markdown-2xl :where(ol > li)::before {

      ---

      -   .md\\\\:prose-2xl :where(ul > li) {
      +   .md\\\\:markdown-2xl :where(ul > li) {

      ---

      -   .md\\\\:prose-2xl :where(ul > li)::before {
      +   .md\\\\:markdown-2xl :where(ul > li)::before {

      ---

      -   .md\\\\:prose-2xl :where(> ul > li p) {
      +   .md\\\\:markdown-2xl :where(> ul > li p) {

      ---

      -   .md\\\\:prose-2xl :where(> ul > li > *:first-child) {
      +   .md\\\\:markdown-2xl :where(> ul > li > *:first-child) {

      ---

      -   .md\\\\:prose-2xl :where(> ul > li > *:last-child) {
      +   .md\\\\:markdown-2xl :where(> ul > li > *:last-child) {

      ---

      -   .md\\\\:prose-2xl :where(> ol > li > *:first-child) {
      +   .md\\\\:markdown-2xl :where(> ol > li > *:first-child) {

      ---

      -   .md\\\\:prose-2xl :where(> ol > li > *:last-child) {
      +   .md\\\\:markdown-2xl :where(> ol > li > *:last-child) {

      ---

      -   .md\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .md\\\\:markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .md\\\\:prose-2xl :where(hr) {
      +   .md\\\\:markdown-2xl :where(hr) {

      ---

      -   .md\\\\:prose-2xl :where(hr + *) {
      +   .md\\\\:markdown-2xl :where(hr + *) {

      ---

      -   .md\\\\:prose-2xl :where(h2 + *) {
      +   .md\\\\:markdown-2xl :where(h2 + *) {

      ---

      -   .md\\\\:prose-2xl :where(h3 + *) {
      +   .md\\\\:markdown-2xl :where(h3 + *) {

      ---

      -   .md\\\\:prose-2xl :where(h4 + *) {
      +   .md\\\\:markdown-2xl :where(h4 + *) {

      ---

      -   .md\\\\:prose-2xl :where(table) {
      +   .md\\\\:markdown-2xl :where(table) {

      ---

      -   .md\\\\:prose-2xl :where(thead th) {
      +   .md\\\\:markdown-2xl :where(thead th) {

      ---

      -   .md\\\\:prose-2xl :where(thead th:first-child) {
      +   .md\\\\:markdown-2xl :where(thead th:first-child) {

      ---

      -   .md\\\\:prose-2xl :where(thead th:last-child) {
      +   .md\\\\:markdown-2xl :where(thead th:last-child) {

      ---

      -   .md\\\\:prose-2xl :where(tbody td) {
      +   .md\\\\:markdown-2xl :where(tbody td) {

      ---

      -   .md\\\\:prose-2xl :where(tbody td:first-child) {
      +   .md\\\\:markdown-2xl :where(tbody td:first-child) {

      ---

      -   .md\\\\:prose-2xl :where(tbody td:last-child) {
      +   .md\\\\:markdown-2xl :where(tbody td:last-child) {

      ---

      -   .md\\\\:prose-2xl :where(> :first-child) {
      +   .md\\\\:markdown-2xl :where(> :first-child) {

      ---

      -   .md\\\\:prose-2xl :where(> :last-child) {
      +   .md\\\\:markdown-2xl :where(> :last-child) {

      ---

      -   }
      -
      -   .md\\\\:prose-red :where(a) {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-red :where(a code) {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-yellow :where(a) {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-yellow :where(a code) {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-green :where(a) {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-green :where(a code) {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-blue :where(a) {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-blue :where(a code) {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-indigo :where(a) {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-indigo :where(a code) {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-purple :where(a) {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-purple :where(a code) {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-pink :where(a) {
      -     color: #db2777;
      -   }
      -
      -   .md\\\\:prose-pink :where(a code) {
      -     color: #db2777;

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose :where([class~='lead']) {
      +   .lg\\\\:markdown :where([class~='lead']) {

      ---

      -   .lg\\\\:prose :where(a) {
      +   .lg\\\\:markdown :where(a) {

      ---

      -   .lg\\\\:prose :where(strong) {
      +   .lg\\\\:markdown :where(strong) {

      ---

      -   .lg\\\\:prose :where(ol[type='A']) {
      +   .lg\\\\:markdown :where(ol[type='A']) {

      ---

      -   .lg\\\\:prose :where(ol[type='a']) {
      +   .lg\\\\:markdown :where(ol[type='a']) {

      ---

      -   .lg\\\\:prose :where(ol[type='A' s]) {
      +   .lg\\\\:markdown :where(ol[type='A' s]) {

      ---

      -   .lg\\\\:prose :where(ol[type='a' s]) {
      +   .lg\\\\:markdown :where(ol[type='a' s]) {

      ---

      -   .lg\\\\:prose :where(ol[type='I']) {
      +   .lg\\\\:markdown :where(ol[type='I']) {

      ---

      -   .lg\\\\:prose :where(ol[type='i']) {
      +   .lg\\\\:markdown :where(ol[type='i']) {

      ---

      -   .lg\\\\:prose :where(ol[type='I' s]) {
      +   .lg\\\\:markdown :where(ol[type='I' s]) {

      ---

      -   .lg\\\\:prose :where(ol[type='i' s]) {
      +   .lg\\\\:markdown :where(ol[type='i' s]) {

      ---

      -   .lg\\\\:prose :where(ol[type='1']) {
      +   .lg\\\\:markdown :where(ol[type='1']) {

      ---

      -   .lg\\\\:prose :where(ol > li) {
      +   .lg\\\\:markdown :where(ol > li) {

      ---

      -   .lg\\\\:prose :where(ol > li)::before {
      +   .lg\\\\:markdown :where(ol > li)::before {

      ---

      -   .lg\\\\:prose :where(ul > li) {
      +   .lg\\\\:markdown :where(ul > li) {

      ---

      -   .lg\\\\:prose :where(ul > li)::before {
      +   .lg\\\\:markdown :where(ul > li)::before {

      ---

      -   .lg\\\\:prose :where(hr) {
      +   .lg\\\\:markdown :where(hr) {

      ---

      -   .lg\\\\:prose :where(blockquote) {
      +   .lg\\\\:markdown :where(blockquote) {

      ---

      -   .lg\\\\:prose :where(blockquote p:first-of-type)::before {
      +   .lg\\\\:markdown :where(blockquote p:first-of-type)::before {

      ---

      -   .lg\\\\:prose :where(blockquote p:last-of-type)::after {
      +   .lg\\\\:markdown :where(blockquote p:last-of-type)::after {

      ---

      -   .lg\\\\:prose :where(h1) {
      +   .lg\\\\:markdown :where(h1) {

      ---

      -   .lg\\\\:prose :where(h1 strong) {
      +   .lg\\\\:markdown :where(h1 strong) {

      ---

      -   .lg\\\\:prose :where(h2) {
      +   .lg\\\\:markdown :where(h2) {

      ---

      -   .lg\\\\:prose :where(h2 strong) {
      +   .lg\\\\:markdown :where(h2 strong) {

      ---

      -   .lg\\\\:prose :where(h3) {
      +   .lg\\\\:markdown :where(h3) {

      ---

      -   .lg\\\\:prose :where(h3 strong) {
      +   .lg\\\\:markdown :where(h3 strong) {

      ---

      -   .lg\\\\:prose :where(h4) {
      +   .lg\\\\:markdown :where(h4) {

      ---

      -   .lg\\\\:prose :where(h4 strong) {
      +   .lg\\\\:markdown :where(h4 strong) {

      ---

      -   .lg\\\\:prose :where(figure figcaption) {
      +   .lg\\\\:markdown :where(figure figcaption) {

      ---

      -   .lg\\\\:prose :where(code) {
      +   .lg\\\\:markdown :where(code) {

      ---

      -   .lg\\\\:prose :where(code)::before {
      +   .lg\\\\:markdown :where(code)::before {

      ---

      -   .lg\\\\:prose :where(code)::after {
      +   .lg\\\\:markdown :where(code)::after {

      ---

      -   .lg\\\\:prose :where(a code) {
      +   .lg\\\\:markdown :where(a code) {

      ---

      -   .lg\\\\:prose :where(pre) {
      +   .lg\\\\:markdown :where(pre) {

      ---

      -   .lg\\\\:prose :where(pre code) {
      +   .lg\\\\:markdown :where(pre code) {

      ---

      -   .lg\\\\:prose :where(pre code)::before {
      +   .lg\\\\:markdown :where(pre code)::before {

      ---

      -   .lg\\\\:prose :where(pre code)::after {
      +   .lg\\\\:markdown :where(pre code)::after {

      ---

      -   .lg\\\\:prose :where(table) {
      +   .lg\\\\:markdown :where(table) {

      ---

      -   .lg\\\\:prose :where(thead) {
      +   .lg\\\\:markdown :where(thead) {

      ---

      -   .lg\\\\:prose :where(thead th) {
      +   .lg\\\\:markdown :where(thead th) {

      ---

      -   .lg\\\\:prose :where(tbody tr) {
      +   .lg\\\\:markdown :where(tbody tr) {

      ---

      -   .lg\\\\:prose :where(tbody tr:last-child) {
      +   .lg\\\\:markdown :where(tbody tr:last-child) {

      ---

      -   .lg\\\\:prose :where(tbody td) {
      +   .lg\\\\:markdown :where(tbody td) {

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose :where(p) {
      +   .lg\\\\:markdown :where(p) {

      ---

      -   .lg\\\\:prose :where(img) {
      +   .lg\\\\:markdown :where(img) {

      ---

      -   .lg\\\\:prose :where(video) {
      +   .lg\\\\:markdown :where(video) {

      ---

      -   .lg\\\\:prose :where(figure) {
      +   .lg\\\\:markdown :where(figure) {

      ---

      -   .lg\\\\:prose :where(figure > *) {
      +   .lg\\\\:markdown :where(figure > *) {

      ---

      -   .lg\\\\:prose :where(h2 code) {
      +   .lg\\\\:markdown :where(h2 code) {

      ---

      -   .lg\\\\:prose :where(h3 code) {
      +   .lg\\\\:markdown :where(h3 code) {

      ---

      -   .lg\\\\:prose :where(ol) {
      +   .lg\\\\:markdown :where(ol) {

      ---

      -   .lg\\\\:prose :where(ul) {
      +   .lg\\\\:markdown :where(ul) {

      ---

      -   .lg\\\\:prose :where(li) {
      +   .lg\\\\:markdown :where(li) {

      ---

      -   .lg\\\\:prose :where(> ul > li p) {
      +   .lg\\\\:markdown :where(> ul > li p) {

      ---

      -   .lg\\\\:prose :where(> ul > li > *:first-child) {
      +   .lg\\\\:markdown :where(> ul > li > *:first-child) {

      ---

      -   .lg\\\\:prose :where(> ul > li > *:last-child) {
      +   .lg\\\\:markdown :where(> ul > li > *:last-child) {

      ---

      -   .lg\\\\:prose :where(> ol > li > *:first-child) {
      +   .lg\\\\:markdown :where(> ol > li > *:first-child) {

      ---

      -   .lg\\\\:prose :where(> ol > li > *:last-child) {
      +   .lg\\\\:markdown :where(> ol > li > *:last-child) {

      ---

      -   .lg\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
      +   .lg\\\\:markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   }
      -
      -   .lg\\\\:prose :where(hr + *) {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose :where(h2 + *) {
      -     margin-top: 0;

      ---

      -   .lg\\\\:prose :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose :where(h4 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose :where(thead th:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose :where(thead th:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose :where(tbody td:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose :where(tbody td:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose :where(> :first-child) {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose :where(> :last-child) {
      -     margin-bottom: 0;
      -   }
      -
      -   .lg\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .lg\\\\:prose-sm :where(p) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm :where([class~='lead']) {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(blockquote) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(h1) {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .lg\\\\:prose-sm :where(h2) {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .lg\\\\:prose-sm :where(h3) {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .lg\\\\:prose-sm :where(h4) {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .lg\\\\:prose-sm :where(img) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(video) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(figure) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(figure > *) {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .lg\\\\:prose-sm :where(figure figcaption) {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(code) {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(h2 code) {
      -     font-size: 0.9em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(h3 code) {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(pre) {
      -     font-size: 0.8571429em;
      -     line-height: 1.6666667;
      -     margin-top: 1.6666667em;
      -     margin-bottom: 1.6666667em;
      -     border-radius: 0.25rem;
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(ol) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(ul) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(li) {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(ol > li) {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(ol > li)::before {
      -     left: 0;
      -   }
      -
      -   .lg\\\\:prose-sm :where(ul > li) {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(ul > li)::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(> ul > li p) {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(> ul > li > *:first-child) {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(> ul > li > *:last-child) {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(> ol > li > *:first-child) {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(> ol > li > *:last-child) {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(hr) {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(hr + *) {
      +   .lg\\\\:markdown :where(hr + *) {

      ---

      -   .lg\\\\:prose-sm :where(h2 + *) {
      +   .lg\\\\:markdown :where(h2 + *) {

      ---

      -   .lg\\\\:prose-sm :where(h3 + *) {
      +   .lg\\\\:markdown :where(h3 + *) {

      ---

      -   .lg\\\\:prose-sm :where(h4 + *) {
      +   .lg\\\\:markdown :where(h4 + *) {

      ---

      -   .lg\\\\:prose-sm :where(table) {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .lg\\\\:prose-sm :where(thead th) {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(thead th:first-child) {
      +   .lg\\\\:markdown :where(thead th:first-child) {

      ---

      -   .lg\\\\:prose-sm :where(thead th:last-child) {
      +   .lg\\\\:markdown :where(thead th:last-child) {

      ---

      -   .lg\\\\:prose-sm :where(tbody td) {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .lg\\\\:prose-sm :where(tbody td:first-child) {
      +   .lg\\\\:markdown :where(tbody td:first-child) {

      ---

      -   .lg\\\\:prose-sm :where(tbody td:last-child) {
      +   .lg\\\\:markdown :where(tbody td:last-child) {

      ---

      -   .lg\\\\:prose-sm :where(> :first-child) {
      +   .lg\\\\:markdown :where(> :first-child) {

      ---

      -   .lg\\\\:prose-sm :where(> :last-child) {
      +   .lg\\\\:markdown :where(> :last-child) {

      ---

      -   .lg\\\\:prose-lg {
      +   .lg\\\\:markdown-lg {

      ---

      -   .lg\\\\:prose-lg :where(p) {
      +   .lg\\\\:markdown-lg :where(p) {

      ---

      -   .lg\\\\:prose-lg :where([class~='lead']) {
      +   .lg\\\\:markdown-lg :where([class~='lead']) {

      ---

      -   .lg\\\\:prose-lg :where(blockquote) {
      +   .lg\\\\:markdown-lg :where(blockquote) {

      ---

      -   .lg\\\\:prose-lg :where(h1) {
      +   .lg\\\\:markdown-lg :where(h1) {

      ---

      -   .lg\\\\:prose-lg :where(h2) {
      +   .lg\\\\:markdown-lg :where(h2) {

      ---

      -   .lg\\\\:prose-lg :where(h3) {
      +   .lg\\\\:markdown-lg :where(h3) {

      ---

      -   .lg\\\\:prose-lg :where(h4) {
      +   .lg\\\\:markdown-lg :where(h4) {

      ---

      -   .lg\\\\:prose-lg :where(img) {
      +   .lg\\\\:markdown-lg :where(img) {

      ---

      -   .lg\\\\:prose-lg :where(video) {
      +   .lg\\\\:markdown-lg :where(video) {

      ---

      -   .lg\\\\:prose-lg :where(figure) {
      +   .lg\\\\:markdown-lg :where(figure) {

      ---

      -   .lg\\\\:prose-lg :where(figure > *) {
      +   .lg\\\\:markdown-lg :where(figure > *) {

      ---

      -   .lg\\\\:prose-lg :where(figure figcaption) {
      +   .lg\\\\:markdown-lg :where(figure figcaption) {

      ---

      -   .lg\\\\:prose-lg :where(code) {
      +   .lg\\\\:markdown-lg :where(code) {

      ---

      -   .lg\\\\:prose-lg :where(h2 code) {
      +   .lg\\\\:markdown-lg :where(h2 code) {

      ---

      -   .lg\\\\:prose-lg :where(h3 code) {
      +   .lg\\\\:markdown-lg :where(h3 code) {

      ---

      -   .lg\\\\:prose-lg :where(pre) {
      +   .lg\\\\:markdown-lg :where(pre) {

      ---

      -   .lg\\\\:prose-lg :where(ol) {
      +   .lg\\\\:markdown-lg :where(ol) {

      ---

      -   .lg\\\\:prose-lg :where(ul) {
      +   .lg\\\\:markdown-lg :where(ul) {

      ---

      -   .lg\\\\:prose-lg :where(li) {
      +   .lg\\\\:markdown-lg :where(li) {

      ---

      -   .lg\\\\:prose-lg :where(ol > li) {
      +   .lg\\\\:markdown-lg :where(ol > li) {

      ---

      -   .lg\\\\:prose-lg :where(ol > li)::before {
      +   .lg\\\\:markdown-lg :where(ol > li)::before {

      ---

      -   .lg\\\\:prose-lg :where(ul > li) {
      +   .lg\\\\:markdown-lg :where(ul > li) {

      ---

      -   .lg\\\\:prose-lg :where(ul > li)::before {
      +   .lg\\\\:markdown-lg :where(ul > li)::before {

      ---

      -   .lg\\\\:prose-lg :where(> ul > li p) {
      +   .lg\\\\:markdown-lg :where(> ul > li p) {

      ---

      -   .lg\\\\:prose-lg :where(> ul > li > *:first-child) {
      +   .lg\\\\:markdown-lg :where(> ul > li > *:first-child) {

      ---

      -   .lg\\\\:prose-lg :where(> ul > li > *:last-child) {
      +   .lg\\\\:markdown-lg :where(> ul > li > *:last-child) {

      ---

      -   .lg\\\\:prose-lg :where(> ol > li > *:first-child) {
      +   .lg\\\\:markdown-lg :where(> ol > li > *:first-child) {

      ---

      -   .lg\\\\:prose-lg :where(> ol > li > *:last-child) {
      +   .lg\\\\:markdown-lg :where(> ol > li > *:last-child) {

      ---

      -   .lg\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      +   .lg\\\\:markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .lg\\\\:prose-lg :where(hr) {
      +   .lg\\\\:markdown-lg :where(hr) {

      ---

      -   .lg\\\\:prose-lg :where(hr + *) {
      +   .lg\\\\:markdown-lg :where(hr + *) {

      ---

      -   .lg\\\\:prose-lg :where(h2 + *) {
      +   .lg\\\\:markdown-lg :where(h2 + *) {

      ---

      -   .lg\\\\:prose-lg :where(h3 + *) {
      +   .lg\\\\:markdown-lg :where(h3 + *) {

      ---

      -   .lg\\\\:prose-lg :where(h4 + *) {
      +   .lg\\\\:markdown-lg :where(h4 + *) {

      ---

      -   .lg\\\\:prose-lg :where(table) {
      +   .lg\\\\:markdown-lg :where(table) {

      ---

      -   .lg\\\\:prose-lg :where(thead th) {
      +   .lg\\\\:markdown-lg :where(thead th) {

      ---

      -   .lg\\\\:prose-lg :where(thead th:first-child) {
      +   .lg\\\\:markdown-lg :where(thead th:first-child) {

      ---

      -   .lg\\\\:prose-lg :where(thead th:last-child) {
      +   .lg\\\\:markdown-lg :where(thead th:last-child) {

      ---

      -   .lg\\\\:prose-lg :where(tbody td) {
      +   .lg\\\\:markdown-lg :where(tbody td) {

      ---

      -   .lg\\\\:prose-lg :where(tbody td:first-child) {
      +   .lg\\\\:markdown-lg :where(tbody td:first-child) {

      ---

      -   .lg\\\\:prose-lg :where(tbody td:last-child) {
      +   .lg\\\\:markdown-lg :where(tbody td:last-child) {

      ---

      -   .lg\\\\:prose-lg :where(> :first-child) {
      +   .lg\\\\:markdown-lg :where(> :first-child) {

      ---

      -   .lg\\\\:prose-lg :where(> :last-child) {
      +   .lg\\\\:markdown-lg :where(> :last-child) {

      ---

      -   .lg\\\\:prose-xl {
      +   .lg\\\\:markdown-xl {

      ---

      -   .lg\\\\:prose-xl :where(p) {
      +   .lg\\\\:markdown-xl :where(p) {

      ---

      -   .lg\\\\:prose-xl :where([class~='lead']) {
      +   .lg\\\\:markdown-xl :where([class~='lead']) {

      ---

      -   .lg\\\\:prose-xl :where(blockquote) {
      +   .lg\\\\:markdown-xl :where(blockquote) {

      ---

      -   .lg\\\\:prose-xl :where(h1) {
      +   .lg\\\\:markdown-xl :where(h1) {

      ---

      -   .lg\\\\:prose-xl :where(h2) {
      +   .lg\\\\:markdown-xl :where(h2) {

      ---

      -   .lg\\\\:prose-xl :where(h3) {
      +   .lg\\\\:markdown-xl :where(h3) {

      ---

      -   .lg\\\\:prose-xl :where(h4) {
      +   .lg\\\\:markdown-xl :where(h4) {

      ---

      -   .lg\\\\:prose-xl :where(img) {
      +   .lg\\\\:markdown-xl :where(img) {

      ---

      -   .lg\\\\:prose-xl :where(video) {
      +   .lg\\\\:markdown-xl :where(video) {

      ---

      -   .lg\\\\:prose-xl :where(figure) {
      +   .lg\\\\:markdown-xl :where(figure) {

      ---

      -   .lg\\\\:prose-xl :where(figure > *) {
      +   .lg\\\\:markdown-xl :where(figure > *) {

      ---

      -   .lg\\\\:prose-xl :where(figure figcaption) {
      +   .lg\\\\:markdown-xl :where(figure figcaption) {

      ---

      -   .lg\\\\:prose-xl :where(code) {
      +   .lg\\\\:markdown-xl :where(code) {

      ---

      -   .lg\\\\:prose-xl :where(h2 code) {
      +   .lg\\\\:markdown-xl :where(h2 code) {

      ---

      -   .lg\\\\:prose-xl :where(h3 code) {
      +   .lg\\\\:markdown-xl :where(h3 code) {

      ---

      -   .lg\\\\:prose-xl :where(pre) {
      +   .lg\\\\:markdown-xl :where(pre) {

      ---

      -   .lg\\\\:prose-xl :where(ol) {
      +   .lg\\\\:markdown-xl :where(ol) {

      ---

      -   .lg\\\\:prose-xl :where(ul) {
      +   .lg\\\\:markdown-xl :where(ul) {

      ---

      -   .lg\\\\:prose-xl :where(li) {
      +   .lg\\\\:markdown-xl :where(li) {

      ---

      -   .lg\\\\:prose-xl :where(ol > li) {
      +   .lg\\\\:markdown-xl :where(ol > li) {

      ---

      -   .lg\\\\:prose-xl :where(ol > li)::before {
      +   .lg\\\\:markdown-xl :where(ol > li)::before {

      ---

      -   .lg\\\\:prose-xl :where(ul > li) {
      +   .lg\\\\:markdown-xl :where(ul > li) {

      ---

      -   .lg\\\\:prose-xl :where(ul > li)::before {
      +   .lg\\\\:markdown-xl :where(ul > li)::before {

      ---

      -   .lg\\\\:prose-xl :where(> ul > li p) {
      +   .lg\\\\:markdown-xl :where(> ul > li p) {

      ---

      -   .lg\\\\:prose-xl :where(> ul > li > *:first-child) {
      +   .lg\\\\:markdown-xl :where(> ul > li > *:first-child) {

      ---

      -   .lg\\\\:prose-xl :where(> ul > li > *:last-child) {
      +   .lg\\\\:markdown-xl :where(> ul > li > *:last-child) {

      ---

      -   .lg\\\\:prose-xl :where(> ol > li > *:first-child) {
      +   .lg\\\\:markdown-xl :where(> ol > li > *:first-child) {

      ---

      -   .lg\\\\:prose-xl :where(> ol > li > *:last-child) {
      +   .lg\\\\:markdown-xl :where(> ol > li > *:last-child) {

      ---

      -   .lg\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .lg\\\\:markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .lg\\\\:prose-xl :where(hr) {
      +   .lg\\\\:markdown-xl :where(hr) {

      ---

      -   .lg\\\\:prose-xl :where(hr + *) {
      +   .lg\\\\:markdown-xl :where(hr + *) {

      ---

      -   .lg\\\\:prose-xl :where(h2 + *) {
      +   .lg\\\\:markdown-xl :where(h2 + *) {

      ---

      -   .lg\\\\:prose-xl :where(h3 + *) {
      +   .lg\\\\:markdown-xl :where(h3 + *) {

      ---

      -   .lg\\\\:prose-xl :where(h4 + *) {
      +   .lg\\\\:markdown-xl :where(h4 + *) {

      ---

      -   .lg\\\\:prose-xl :where(table) {
      +   .lg\\\\:markdown-xl :where(table) {

      ---

      -   .lg\\\\:prose-xl :where(thead th) {
      +   .lg\\\\:markdown-xl :where(thead th) {

      ---

      -   .lg\\\\:prose-xl :where(thead th:first-child) {
      +   .lg\\\\:markdown-xl :where(thead th:first-child) {

      ---

      -   .lg\\\\:prose-xl :where(thead th:last-child) {
      +   .lg\\\\:markdown-xl :where(thead th:last-child) {

      ---

      -   .lg\\\\:prose-xl :where(tbody td) {
      +   .lg\\\\:markdown-xl :where(tbody td) {

      ---

      -   .lg\\\\:prose-xl :where(tbody td:first-child) {
      +   .lg\\\\:markdown-xl :where(tbody td:first-child) {

      ---

      -   .lg\\\\:prose-xl :where(tbody td:last-child) {
      +   .lg\\\\:markdown-xl :where(tbody td:last-child) {

      ---

      -   .lg\\\\:prose-xl :where(> :first-child) {
      +   .lg\\\\:markdown-xl :where(> :first-child) {

      ---

      -   .lg\\\\:prose-xl :where(> :last-child) {
      +   .lg\\\\:markdown-xl :where(> :last-child) {

      ---

      -   .lg\\\\:prose-2xl {
      +   .lg\\\\:markdown-2xl {

      ---

      -   .lg\\\\:prose-2xl :where(p) {
      +   .lg\\\\:markdown-2xl :where(p) {

      ---

      -   .lg\\\\:prose-2xl :where([class~='lead']) {
      +   .lg\\\\:markdown-2xl :where([class~='lead']) {

      ---

      -   .lg\\\\:prose-2xl :where(blockquote) {
      +   .lg\\\\:markdown-2xl :where(blockquote) {

      ---

      -   .lg\\\\:prose-2xl :where(h1) {
      +   .lg\\\\:markdown-2xl :where(h1) {

      ---

      -   .lg\\\\:prose-2xl :where(h2) {
      +   .lg\\\\:markdown-2xl :where(h2) {

      ---

      -   .lg\\\\:prose-2xl :where(h3) {
      +   .lg\\\\:markdown-2xl :where(h3) {

      ---

      -   .lg\\\\:prose-2xl :where(h4) {
      +   .lg\\\\:markdown-2xl :where(h4) {

      ---

      -   .lg\\\\:prose-2xl :where(img) {
      +   .lg\\\\:markdown-2xl :where(img) {

      ---

      -   .lg\\\\:prose-2xl :where(video) {
      +   .lg\\\\:markdown-2xl :where(video) {

      ---

      -   .lg\\\\:prose-2xl :where(figure) {
      +   .lg\\\\:markdown-2xl :where(figure) {

      ---

      -   .lg\\\\:prose-2xl :where(figure > *) {
      +   .lg\\\\:markdown-2xl :where(figure > *) {

      ---

      -   .lg\\\\:prose-2xl :where(figure figcaption) {
      +   .lg\\\\:markdown-2xl :where(figure figcaption) {

      ---

      -   .lg\\\\:prose-2xl :where(code) {
      +   .lg\\\\:markdown-2xl :where(code) {

      ---

      -   .lg\\\\:prose-2xl :where(h2 code) {
      +   .lg\\\\:markdown-2xl :where(h2 code) {

      ---

      -   .lg\\\\:prose-2xl :where(h3 code) {
      +   .lg\\\\:markdown-2xl :where(h3 code) {

      ---

      -   .lg\\\\:prose-2xl :where(pre) {
      +   .lg\\\\:markdown-2xl :where(pre) {

      ---

      -   .lg\\\\:prose-2xl :where(ol) {
      +   .lg\\\\:markdown-2xl :where(ol) {

      ---

      -   .lg\\\\:prose-2xl :where(ul) {
      +   .lg\\\\:markdown-2xl :where(ul) {

      ---

      -   .lg\\\\:prose-2xl :where(li) {
      +   .lg\\\\:markdown-2xl :where(li) {

      ---

      -   .lg\\\\:prose-2xl :where(ol > li) {
      +   .lg\\\\:markdown-2xl :where(ol > li) {

      ---

      -   .lg\\\\:prose-2xl :where(ol > li)::before {
      +   .lg\\\\:markdown-2xl :where(ol > li)::before {

      ---

      -   .lg\\\\:prose-2xl :where(ul > li) {
      +   .lg\\\\:markdown-2xl :where(ul > li) {

      ---

      -   .lg\\\\:prose-2xl :where(ul > li)::before {
      +   .lg\\\\:markdown-2xl :where(ul > li)::before {

      ---

      -   .lg\\\\:prose-2xl :where(> ul > li p) {
      +   .lg\\\\:markdown-2xl :where(> ul > li p) {

      ---

      -   .lg\\\\:prose-2xl :where(> ul > li > *:first-child) {
      +   .lg\\\\:markdown-2xl :where(> ul > li > *:first-child) {

      ---

      -   .lg\\\\:prose-2xl :where(> ul > li > *:last-child) {
      +   .lg\\\\:markdown-2xl :where(> ul > li > *:last-child) {

      ---

      -   .lg\\\\:prose-2xl :where(> ol > li > *:first-child) {
      +   .lg\\\\:markdown-2xl :where(> ol > li > *:first-child) {

      ---

      -   .lg\\\\:prose-2xl :where(> ol > li > *:last-child) {
      +   .lg\\\\:markdown-2xl :where(> ol > li > *:last-child) {

      ---

      -   .lg\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .lg\\\\:markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .lg\\\\:prose-2xl :where(hr) {
      +   .lg\\\\:markdown-2xl :where(hr) {

      ---

      -   .lg\\\\:prose-2xl :where(hr + *) {
      +   .lg\\\\:markdown-2xl :where(hr + *) {

      ---

      -   .lg\\\\:prose-2xl :where(h2 + *) {
      +   .lg\\\\:markdown-2xl :where(h2 + *) {

      ---

      -   .lg\\\\:prose-2xl :where(h3 + *) {
      +   .lg\\\\:markdown-2xl :where(h3 + *) {

      ---

      -   .lg\\\\:prose-2xl :where(h4 + *) {
      +   .lg\\\\:markdown-2xl :where(h4 + *) {

      ---

      -   .lg\\\\:prose-2xl :where(table) {
      +   .lg\\\\:markdown-2xl :where(table) {

      ---

      -   .lg\\\\:prose-2xl :where(thead th) {
      +   .lg\\\\:markdown-2xl :where(thead th) {

      ---

      -   .lg\\\\:prose-2xl :where(thead th:first-child) {
      +   .lg\\\\:markdown-2xl :where(thead th:first-child) {

      ---

      -   .lg\\\\:prose-2xl :where(thead th:last-child) {
      +   .lg\\\\:markdown-2xl :where(thead th:last-child) {

      ---

      -   .lg\\\\:prose-2xl :where(tbody td) {
      +   .lg\\\\:markdown-2xl :where(tbody td) {

      ---

      -   .lg\\\\:prose-2xl :where(tbody td:first-child) {
      +   .lg\\\\:markdown-2xl :where(tbody td:first-child) {

      ---

      -   .lg\\\\:prose-2xl :where(tbody td:last-child) {
      +   .lg\\\\:markdown-2xl :where(tbody td:last-child) {

      ---

      -   .lg\\\\:prose-2xl :where(> :first-child) {
      +   .lg\\\\:markdown-2xl :where(> :first-child) {

      ---

      -   .lg\\\\:prose-2xl :where(> :last-child) {
      +   .lg\\\\:markdown-2xl :where(> :last-child) {

      ---

      -   }
      -
      -   .lg\\\\:prose-red :where(a) {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-red :where(a code) {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-yellow :where(a) {
      -     color: #d97706;
      -   }
      -
      -   .lg\\\\:prose-yellow :where(a code) {
      -     color: #d97706;

      ---

      -
      -   .lg\\\\:prose-green :where(a) {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-green :where(a code) {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-blue :where(a) {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-blue :where(a code) {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-indigo :where(a) {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-indigo :where(a code) {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-purple :where(a) {
      -     color: #7c3aed;
      -   }
      -
      -   .lg\\\\:prose-purple :where(a code) {
      -     color: #7c3aed;
      -   }
      -
      -   .lg\\\\:prose-pink :where(a) {
      -     color: #db2777;
      -   }
      -
      -   .lg\\\\:prose-pink :where(a code) {
      -     color: #db2777;
      -   }

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose :where([class~='lead']) {
      +   .xl\\\\:markdown :where([class~='lead']) {

      ---

      -   .xl\\\\:prose :where(a) {
      +   .xl\\\\:markdown :where(a) {

      ---

      -   .xl\\\\:prose :where(strong) {
      +   .xl\\\\:markdown :where(strong) {

      ---

      -   .xl\\\\:prose :where(ol[type='A']) {
      +   .xl\\\\:markdown :where(ol[type='A']) {

      ---

      -   .xl\\\\:prose :where(ol[type='a']) {
      +   .xl\\\\:markdown :where(ol[type='a']) {

      ---

      -   .xl\\\\:prose :where(ol[type='A' s]) {
      +   .xl\\\\:markdown :where(ol[type='A' s]) {

      ---

      -   .xl\\\\:prose :where(ol[type='a' s]) {
      +   .xl\\\\:markdown :where(ol[type='a' s]) {

      ---

      -   .xl\\\\:prose :where(ol[type='I']) {
      +   .xl\\\\:markdown :where(ol[type='I']) {

      ---

      -   .xl\\\\:prose :where(ol[type='i']) {
      +   .xl\\\\:markdown :where(ol[type='i']) {

      ---

      -   .xl\\\\:prose :where(ol[type='I' s]) {
      +   .xl\\\\:markdown :where(ol[type='I' s]) {

      ---

      -   .xl\\\\:prose :where(ol[type='i' s]) {
      +   .xl\\\\:markdown :where(ol[type='i' s]) {

      ---

      -   .xl\\\\:prose :where(ol[type='1']) {
      +   .xl\\\\:markdown :where(ol[type='1']) {

      ---

      -   .xl\\\\:prose :where(ol > li) {
      +   .xl\\\\:markdown :where(ol > li) {

      ---

      -   .xl\\\\:prose :where(ol > li)::before {
      +   .xl\\\\:markdown :where(ol > li)::before {

      ---

      -   .xl\\\\:prose :where(ul > li) {
      +   .xl\\\\:markdown :where(ul > li) {

      ---

      -   .xl\\\\:prose :where(ul > li)::before {
      +   .xl\\\\:markdown :where(ul > li)::before {

      ---

      -   .xl\\\\:prose :where(hr) {
      +   .xl\\\\:markdown :where(hr) {

      ---

      -   .xl\\\\:prose :where(blockquote) {
      +   .xl\\\\:markdown :where(blockquote) {

      ---

      -   .xl\\\\:prose :where(blockquote p:first-of-type)::before {
      +   .xl\\\\:markdown :where(blockquote p:first-of-type)::before {

      ---

      -   .xl\\\\:prose :where(blockquote p:last-of-type)::after {
      +   .xl\\\\:markdown :where(blockquote p:last-of-type)::after {

      ---

      -   .xl\\\\:prose :where(h1) {
      +   .xl\\\\:markdown :where(h1) {

      ---

      -   .xl\\\\:prose :where(h1 strong) {
      +   .xl\\\\:markdown :where(h1 strong) {

      ---

      -   .xl\\\\:prose :where(h2) {
      +   .xl\\\\:markdown :where(h2) {

      ---

      -   .xl\\\\:prose :where(h2 strong) {
      +   .xl\\\\:markdown :where(h2 strong) {

      ---

      -   .xl\\\\:prose :where(h3) {
      +   .xl\\\\:markdown :where(h3) {

      ---

      -   .xl\\\\:prose :where(h3 strong) {
      +   .xl\\\\:markdown :where(h3 strong) {

      ---

      -   .xl\\\\:prose :where(h4) {
      +   .xl\\\\:markdown :where(h4) {

      ---

      -   .xl\\\\:prose :where(h4 strong) {
      +   .xl\\\\:markdown :where(h4 strong) {

      ---

      -   .xl\\\\:prose :where(figure figcaption) {
      +   .xl\\\\:markdown :where(figure figcaption) {

      ---

      -   .xl\\\\:prose :where(code) {
      +   .xl\\\\:markdown :where(code) {

      ---

      -   .xl\\\\:prose :where(code)::before {
      +   .xl\\\\:markdown :where(code)::before {

      ---

      -   .xl\\\\:prose :where(code)::after {
      +   .xl\\\\:markdown :where(code)::after {

      ---

      -   .xl\\\\:prose :where(a code) {
      +   .xl\\\\:markdown :where(a code) {

      ---

      -   .xl\\\\:prose :where(pre) {
      +   .xl\\\\:markdown :where(pre) {

      ---

      -   .xl\\\\:prose :where(pre code) {
      +   .xl\\\\:markdown :where(pre code) {

      ---

      -   .xl\\\\:prose :where(pre code)::before {
      +   .xl\\\\:markdown :where(pre code)::before {

      ---

      -   .xl\\\\:prose :where(pre code)::after {
      +   .xl\\\\:markdown :where(pre code)::after {

      ---

      -   .xl\\\\:prose :where(table) {
      +   .xl\\\\:markdown :where(table) {

      ---

      -   .xl\\\\:prose :where(thead) {
      +   .xl\\\\:markdown :where(thead) {

      ---

      -   .xl\\\\:prose :where(thead th) {
      +   .xl\\\\:markdown :where(thead th) {

      ---

      -   .xl\\\\:prose :where(tbody tr) {
      +   .xl\\\\:markdown :where(tbody tr) {

      ---

      -   .xl\\\\:prose :where(tbody tr:last-child) {
      +   .xl\\\\:markdown :where(tbody tr:last-child) {

      ---

      -   .xl\\\\:prose :where(tbody td) {
      +   .xl\\\\:markdown :where(tbody td) {

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose :where(p) {
      +   .xl\\\\:markdown :where(p) {

      ---

      -   .xl\\\\:prose :where(img) {
      +   .xl\\\\:markdown :where(img) {

      ---

      -   .xl\\\\:prose :where(video) {
      +   .xl\\\\:markdown :where(video) {

      ---

      -   .xl\\\\:prose :where(figure) {
      +   .xl\\\\:markdown :where(figure) {

      ---

      -   .xl\\\\:prose :where(figure > *) {
      +   .xl\\\\:markdown :where(figure > *) {

      ---

      -   .xl\\\\:prose :where(h2 code) {
      +   .xl\\\\:markdown :where(h2 code) {

      ---

      -   .xl\\\\:prose :where(h3 code) {
      +   .xl\\\\:markdown :where(h3 code) {

      ---

      -   .xl\\\\:prose :where(ol) {
      +   .xl\\\\:markdown :where(ol) {

      ---

      -   .xl\\\\:prose :where(ul) {
      +   .xl\\\\:markdown :where(ul) {

      ---

      -   .xl\\\\:prose :where(li) {
      +   .xl\\\\:markdown :where(li) {

      ---

      -   .xl\\\\:prose :where(> ul > li p) {
      +   .xl\\\\:markdown :where(> ul > li p) {

      ---

      -   .xl\\\\:prose :where(> ul > li > *:first-child) {
      +   .xl\\\\:markdown :where(> ul > li > *:first-child) {

      ---

      -   .xl\\\\:prose :where(> ul > li > *:last-child) {
      +   .xl\\\\:markdown :where(> ul > li > *:last-child) {

      ---

      -   .xl\\\\:prose :where(> ol > li > *:first-child) {
      +   .xl\\\\:markdown :where(> ol > li > *:first-child) {

      ---

      -   .xl\\\\:prose :where(> ol > li > *:last-child) {
      +   .xl\\\\:markdown :where(> ol > li > *:last-child) {

      ---

      -   .xl\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
      +   .xl\\\\:markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .xl\\\\:prose :where(hr + *) {
      +   .xl\\\\:markdown :where(hr + *) {

      ---

      -   .xl\\\\:prose :where(h2 + *) {
      +   .xl\\\\:markdown :where(h2 + *) {

      ---

      -   .xl\\\\:prose :where(h3 + *) {
      +   .xl\\\\:markdown :where(h3 + *) {

      ---

      -   .xl\\\\:prose :where(h4 + *) {
      +   .xl\\\\:markdown :where(h4 + *) {

      ---

      -   .xl\\\\:prose :where(thead th:first-child) {
      +   .xl\\\\:markdown :where(thead th:first-child) {

      ---

      -   .xl\\\\:prose :where(thead th:last-child) {
      +   .xl\\\\:markdown :where(thead th:last-child) {

      ---

      -   .xl\\\\:prose :where(tbody td:first-child) {
      +   .xl\\\\:markdown :where(tbody td:first-child) {

      ---

      -   .xl\\\\:prose :where(tbody td:last-child) {
      +   .xl\\\\:markdown :where(tbody td:last-child) {

      ---

      -   .xl\\\\:prose :where(> :first-child) {
      +   .xl\\\\:markdown :where(> :first-child) {

      ---

      -   .xl\\\\:prose :where(> :last-child) {
      +   .xl\\\\:markdown :where(> :last-child) {

      ---

      -   .xl\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .xl\\\\:prose-sm :where(p) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm :where([class~='lead']) {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(blockquote) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(h1) {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .xl\\\\:prose-sm :where(h2) {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .xl\\\\:prose-sm :where(h3) {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .xl\\\\:prose-sm :where(h4) {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .xl\\\\:prose-sm :where(img) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(video) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(figure) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(figure > *) {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(figure figcaption) {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(code) {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(h2 code) {
      -     font-size: 0.9em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(h3 code) {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(pre) {
      -     font-size: 0.8571429em;
      -     line-height: 1.6666667;
      -     margin-top: 1.6666667em;
      -     margin-bottom: 1.6666667em;
      -     border-radius: 0.25rem;
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(ol) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(ul) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(li) {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(ol > li) {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(ol > li)::before {
      -     left: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(ul > li) {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(ul > li)::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(> ul > li p) {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(> ul > li > *:first-child) {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(> ul > li > *:last-child) {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(> ol > li > *:first-child) {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(> ol > li > *:last-child) {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(hr) {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(hr + *) {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(h2 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(h4 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(table) {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .xl\\\\:prose-sm :where(thead th) {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(thead th:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(thead th:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(tbody td) {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .xl\\\\:prose-sm :where(tbody td:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(tbody td:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(> :first-child) {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm :where(> :last-child) {
      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-lg {
      +   .xl\\\\:markdown-lg {

      ---

      -   .xl\\\\:prose-lg :where(p) {
      +   .xl\\\\:markdown-lg :where(p) {

      ---

      -   .xl\\\\:prose-lg :where([class~='lead']) {
      +   .xl\\\\:markdown-lg :where([class~='lead']) {

      ---

      -   .xl\\\\:prose-lg :where(blockquote) {
      +   .xl\\\\:markdown-lg :where(blockquote) {

      ---

      -   .xl\\\\:prose-lg :where(h1) {
      +   .xl\\\\:markdown-lg :where(h1) {

      ---

      -   .xl\\\\:prose-lg :where(h2) {
      +   .xl\\\\:markdown-lg :where(h2) {

      ---

      -   .xl\\\\:prose-lg :where(h3) {
      +   .xl\\\\:markdown-lg :where(h3) {

      ---

      -   .xl\\\\:prose-lg :where(h4) {
      +   .xl\\\\:markdown-lg :where(h4) {

      ---

      -   .xl\\\\:prose-lg :where(img) {
      +   .xl\\\\:markdown-lg :where(img) {

      ---

      -   .xl\\\\:prose-lg :where(video) {
      +   .xl\\\\:markdown-lg :where(video) {

      ---

      -   .xl\\\\:prose-lg :where(figure) {
      +   .xl\\\\:markdown-lg :where(figure) {

      ---

      -   .xl\\\\:prose-lg :where(figure > *) {
      +   .xl\\\\:markdown-lg :where(figure > *) {

      ---

      -   .xl\\\\:prose-lg :where(figure figcaption) {
      +   .xl\\\\:markdown-lg :where(figure figcaption) {

      ---

      -   .xl\\\\:prose-lg :where(code) {
      +   .xl\\\\:markdown-lg :where(code) {

      ---

      -   .xl\\\\:prose-lg :where(h2 code) {
      +   .xl\\\\:markdown-lg :where(h2 code) {

      ---

      -   .xl\\\\:prose-lg :where(h3 code) {
      +   .xl\\\\:markdown-lg :where(h3 code) {

      ---

      -   .xl\\\\:prose-lg :where(pre) {
      +   .xl\\\\:markdown-lg :where(pre) {

      ---

      -   .xl\\\\:prose-lg :where(ol) {
      +   .xl\\\\:markdown-lg :where(ol) {

      ---

      -   .xl\\\\:prose-lg :where(ul) {
      +   .xl\\\\:markdown-lg :where(ul) {

      ---

      -   .xl\\\\:prose-lg :where(li) {
      +   .xl\\\\:markdown-lg :where(li) {

      ---

      -   .xl\\\\:prose-lg :where(ol > li) {
      +   .xl\\\\:markdown-lg :where(ol > li) {

      ---

      -   .xl\\\\:prose-lg :where(ol > li)::before {
      +   .xl\\\\:markdown-lg :where(ol > li)::before {

      ---

      -   .xl\\\\:prose-lg :where(ul > li) {
      +   .xl\\\\:markdown-lg :where(ul > li) {

      ---

      -   .xl\\\\:prose-lg :where(ul > li)::before {
      +   .xl\\\\:markdown-lg :where(ul > li)::before {

      ---

      -   .xl\\\\:prose-lg :where(> ul > li p) {
      +   .xl\\\\:markdown-lg :where(> ul > li p) {

      ---

      -   .xl\\\\:prose-lg :where(> ul > li > *:first-child) {
      +   .xl\\\\:markdown-lg :where(> ul > li > *:first-child) {

      ---

      -   .xl\\\\:prose-lg :where(> ul > li > *:last-child) {
      +   .xl\\\\:markdown-lg :where(> ul > li > *:last-child) {

      ---

      -   .xl\\\\:prose-lg :where(> ol > li > *:first-child) {
      +   .xl\\\\:markdown-lg :where(> ol > li > *:first-child) {

      ---

      -   .xl\\\\:prose-lg :where(> ol > li > *:last-child) {
      +   .xl\\\\:markdown-lg :where(> ol > li > *:last-child) {

      ---

      -   .xl\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      +   .xl\\\\:markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .xl\\\\:prose-lg :where(hr) {
      +   .xl\\\\:markdown-lg :where(hr) {

      ---

      -   .xl\\\\:prose-lg :where(hr + *) {
      +   .xl\\\\:markdown-lg :where(hr + *) {

      ---

      -   .xl\\\\:prose-lg :where(h2 + *) {
      +   .xl\\\\:markdown-lg :where(h2 + *) {

      ---

      -   .xl\\\\:prose-lg :where(h3 + *) {
      +   .xl\\\\:markdown-lg :where(h3 + *) {

      ---

      -   .xl\\\\:prose-lg :where(h4 + *) {
      +   .xl\\\\:markdown-lg :where(h4 + *) {

      ---

      -   .xl\\\\:prose-lg :where(table) {
      +   .xl\\\\:markdown-lg :where(table) {

      ---

      -   .xl\\\\:prose-lg :where(thead th) {
      +   .xl\\\\:markdown-lg :where(thead th) {

      ---

      -   .xl\\\\:prose-lg :where(thead th:first-child) {
      +   .xl\\\\:markdown-lg :where(thead th:first-child) {

      ---

      -   .xl\\\\:prose-lg :where(thead th:last-child) {
      +   .xl\\\\:markdown-lg :where(thead th:last-child) {

      ---

      -   .xl\\\\:prose-lg :where(tbody td) {
      +   .xl\\\\:markdown-lg :where(tbody td) {

      ---

      -   .xl\\\\:prose-lg :where(tbody td:first-child) {
      +   .xl\\\\:markdown-lg :where(tbody td:first-child) {

      ---

      -   .xl\\\\:prose-lg :where(tbody td:last-child) {
      +   .xl\\\\:markdown-lg :where(tbody td:last-child) {

      ---

      -   .xl\\\\:prose-lg :where(> :first-child) {
      +   .xl\\\\:markdown-lg :where(> :first-child) {

      ---

      -   .xl\\\\:prose-lg :where(> :last-child) {
      +   .xl\\\\:markdown-lg :where(> :last-child) {

      ---

      -   .xl\\\\:prose-xl {
      +   .xl\\\\:markdown-xl {

      ---

      -   .xl\\\\:prose-xl :where(p) {
      +   .xl\\\\:markdown-xl :where(p) {

      ---

      -   .xl\\\\:prose-xl :where([class~='lead']) {
      +   .xl\\\\:markdown-xl :where([class~='lead']) {

      ---

      -   .xl\\\\:prose-xl :where(blockquote) {
      +   .xl\\\\:markdown-xl :where(blockquote) {

      ---

      -   .xl\\\\:prose-xl :where(h1) {
      +   .xl\\\\:markdown-xl :where(h1) {

      ---

      -   .xl\\\\:prose-xl :where(h2) {
      +   .xl\\\\:markdown-xl :where(h2) {

      ---

      -   .xl\\\\:prose-xl :where(h3) {
      +   .xl\\\\:markdown-xl :where(h3) {

      ---

      -   .xl\\\\:prose-xl :where(h4) {
      +   .xl\\\\:markdown-xl :where(h4) {

      ---

      -   .xl\\\\:prose-xl :where(img) {
      +   .xl\\\\:markdown-xl :where(img) {

      ---

      -   .xl\\\\:prose-xl :where(video) {
      +   .xl\\\\:markdown-xl :where(video) {

      ---

      -   .xl\\\\:prose-xl :where(figure) {
      +   .xl\\\\:markdown-xl :where(figure) {

      ---

      -   .xl\\\\:prose-xl :where(figure > *) {
      +   .xl\\\\:markdown-xl :where(figure > *) {

      ---

      -   .xl\\\\:prose-xl :where(figure figcaption) {
      +   .xl\\\\:markdown-xl :where(figure figcaption) {

      ---

      -   .xl\\\\:prose-xl :where(code) {
      +   .xl\\\\:markdown-xl :where(code) {

      ---

      -   .xl\\\\:prose-xl :where(h2 code) {
      +   .xl\\\\:markdown-xl :where(h2 code) {

      ---

      -   .xl\\\\:prose-xl :where(h3 code) {
      +   .xl\\\\:markdown-xl :where(h3 code) {

      ---

      -   .xl\\\\:prose-xl :where(pre) {
      +   .xl\\\\:markdown-xl :where(pre) {

      ---

      -   .xl\\\\:prose-xl :where(ol) {
      +   .xl\\\\:markdown-xl :where(ol) {

      ---

      -   .xl\\\\:prose-xl :where(ul) {
      +   .xl\\\\:markdown-xl :where(ul) {

      ---

      -   .xl\\\\:prose-xl :where(li) {
      +   .xl\\\\:markdown-xl :where(li) {

      ---

      -   .xl\\\\:prose-xl :where(ol > li) {
      +   .xl\\\\:markdown-xl :where(ol > li) {

      ---

      -   .xl\\\\:prose-xl :where(ol > li)::before {
      +   .xl\\\\:markdown-xl :where(ol > li)::before {

      ---

      -   .xl\\\\:prose-xl :where(ul > li) {
      +   .xl\\\\:markdown-xl :where(ul > li) {

      ---

      -   .xl\\\\:prose-xl :where(ul > li)::before {
      +   .xl\\\\:markdown-xl :where(ul > li)::before {

      ---

      -   .xl\\\\:prose-xl :where(> ul > li p) {
      +   .xl\\\\:markdown-xl :where(> ul > li p) {

      ---

      -   .xl\\\\:prose-xl :where(> ul > li > *:first-child) {
      +   .xl\\\\:markdown-xl :where(> ul > li > *:first-child) {

      ---

      -   .xl\\\\:prose-xl :where(> ul > li > *:last-child) {
      +   .xl\\\\:markdown-xl :where(> ul > li > *:last-child) {

      ---

      -   .xl\\\\:prose-xl :where(> ol > li > *:first-child) {
      +   .xl\\\\:markdown-xl :where(> ol > li > *:first-child) {

      ---

      -   .xl\\\\:prose-xl :where(> ol > li > *:last-child) {
      +   .xl\\\\:markdown-xl :where(> ol > li > *:last-child) {

      ---

      -   .xl\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .xl\\\\:markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .xl\\\\:prose-xl :where(hr) {
      +   .xl\\\\:markdown-xl :where(hr) {

      ---

      -   .xl\\\\:prose-xl :where(hr + *) {
      +   .xl\\\\:markdown-xl :where(hr + *) {

      ---

      -   .xl\\\\:prose-xl :where(h2 + *) {
      +   .xl\\\\:markdown-xl :where(h2 + *) {

      ---

      -   .xl\\\\:prose-xl :where(h3 + *) {
      +   .xl\\\\:markdown-xl :where(h3 + *) {

      ---

      -   .xl\\\\:prose-xl :where(h4 + *) {
      +   .xl\\\\:markdown-xl :where(h4 + *) {

      ---

      -   .xl\\\\:prose-xl :where(table) {
      +   .xl\\\\:markdown-xl :where(table) {

      ---

      -   .xl\\\\:prose-xl :where(thead th) {
      +   .xl\\\\:markdown-xl :where(thead th) {

      ---

      -   .xl\\\\:prose-xl :where(thead th:first-child) {
      +   .xl\\\\:markdown-xl :where(thead th:first-child) {

      ---

      -   .xl\\\\:prose-xl :where(thead th:last-child) {
      +   .xl\\\\:markdown-xl :where(thead th:last-child) {

      ---

      -   .xl\\\\:prose-xl :where(tbody td) {
      +   .xl\\\\:markdown-xl :where(tbody td) {

      ---

      -   .xl\\\\:prose-xl :where(tbody td:first-child) {
      +   .xl\\\\:markdown-xl :where(tbody td:first-child) {

      ---

      -   .xl\\\\:prose-xl :where(tbody td:last-child) {
      +   .xl\\\\:markdown-xl :where(tbody td:last-child) {

      ---

      -   .xl\\\\:prose-xl :where(> :first-child) {
      +   .xl\\\\:markdown-xl :where(> :first-child) {

      ---

      -   .xl\\\\:prose-xl :where(> :last-child) {
      +   .xl\\\\:markdown-xl :where(> :last-child) {

      ---

      -   .xl\\\\:prose-2xl {
      +   .xl\\\\:markdown-2xl {

      ---

      -   .xl\\\\:prose-2xl :where(p) {
      +   .xl\\\\:markdown-2xl :where(p) {

      ---

      -   .xl\\\\:prose-2xl :where([class~='lead']) {
      +   .xl\\\\:markdown-2xl :where([class~='lead']) {

      ---

      -   .xl\\\\:prose-2xl :where(blockquote) {
      +   .xl\\\\:markdown-2xl :where(blockquote) {

      ---

      -   .xl\\\\:prose-2xl :where(h1) {
      +   .xl\\\\:markdown-2xl :where(h1) {

      ---

      -   .xl\\\\:prose-2xl :where(h2) {
      +   .xl\\\\:markdown-2xl :where(h2) {

      ---

      -   .xl\\\\:prose-2xl :where(h3) {
      +   .xl\\\\:markdown-2xl :where(h3) {

      ---

      -   .xl\\\\:prose-2xl :where(h4) {
      +   .xl\\\\:markdown-2xl :where(h4) {

      ---

      -   .xl\\\\:prose-2xl :where(img) {
      +   .xl\\\\:markdown-2xl :where(img) {

      ---

      -   .xl\\\\:prose-2xl :where(video) {
      +   .xl\\\\:markdown-2xl :where(video) {

      ---

      -   .xl\\\\:prose-2xl :where(figure) {
      +   .xl\\\\:markdown-2xl :where(figure) {

      ---

      -   .xl\\\\:prose-2xl :where(figure > *) {
      +   .xl\\\\:markdown-2xl :where(figure > *) {

      ---

      -   .xl\\\\:prose-2xl :where(figure figcaption) {
      +   .xl\\\\:markdown-2xl :where(figure figcaption) {

      ---

      -   .xl\\\\:prose-2xl :where(code) {
      +   .xl\\\\:markdown-2xl :where(code) {

      ---

      -   .xl\\\\:prose-2xl :where(h2 code) {
      +   .xl\\\\:markdown-2xl :where(h2 code) {

      ---

      -   .xl\\\\:prose-2xl :where(h3 code) {
      +   .xl\\\\:markdown-2xl :where(h3 code) {

      ---

      -   .xl\\\\:prose-2xl :where(pre) {
      +   .xl\\\\:markdown-2xl :where(pre) {

      ---

      -   .xl\\\\:prose-2xl :where(ol) {
      +   .xl\\\\:markdown-2xl :where(ol) {

      ---

      -   .xl\\\\:prose-2xl :where(ul) {
      +   .xl\\\\:markdown-2xl :where(ul) {

      ---

      -   .xl\\\\:prose-2xl :where(li) {
      +   .xl\\\\:markdown-2xl :where(li) {

      ---

      -   .xl\\\\:prose-2xl :where(ol > li) {
      +   .xl\\\\:markdown-2xl :where(ol > li) {

      ---

      -   .xl\\\\:prose-2xl :where(ol > li)::before {
      +   .xl\\\\:markdown-2xl :where(ol > li)::before {

      ---

      -   .xl\\\\:prose-2xl :where(ul > li) {
      +   .xl\\\\:markdown-2xl :where(ul > li) {

      ---

      -   .xl\\\\:prose-2xl :where(ul > li)::before {
      +   .xl\\\\:markdown-2xl :where(ul > li)::before {

      ---

      -   .xl\\\\:prose-2xl :where(> ul > li p) {
      +   .xl\\\\:markdown-2xl :where(> ul > li p) {

      ---

      -   .xl\\\\:prose-2xl :where(> ul > li > *:first-child) {
      +   .xl\\\\:markdown-2xl :where(> ul > li > *:first-child) {

      ---

      -   .xl\\\\:prose-2xl :where(> ul > li > *:last-child) {
      +   .xl\\\\:markdown-2xl :where(> ul > li > *:last-child) {

      ---

      -   .xl\\\\:prose-2xl :where(> ol > li > *:first-child) {
      +   .xl\\\\:markdown-2xl :where(> ol > li > *:first-child) {

      ---

      -   .xl\\\\:prose-2xl :where(> ol > li > *:last-child) {
      +   .xl\\\\:markdown-2xl :where(> ol > li > *:last-child) {

      ---

      -   .xl\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .xl\\\\:markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .xl\\\\:prose-2xl :where(hr) {
      +   .xl\\\\:markdown-2xl :where(hr) {

      ---

      -   .xl\\\\:prose-2xl :where(hr + *) {
      +   .xl\\\\:markdown-2xl :where(hr + *) {

      ---

      -   .xl\\\\:prose-2xl :where(h2 + *) {
      +   .xl\\\\:markdown-2xl :where(h2 + *) {

      ---

      -   .xl\\\\:prose-2xl :where(h3 + *) {
      +   .xl\\\\:markdown-2xl :where(h3 + *) {

      ---

      -   .xl\\\\:prose-2xl :where(h4 + *) {
      +   .xl\\\\:markdown-2xl :where(h4 + *) {

      ---

      -   .xl\\\\:prose-2xl :where(table) {
      +   .xl\\\\:markdown-2xl :where(table) {

      ---

      -   .xl\\\\:prose-2xl :where(thead th) {
      +   .xl\\\\:markdown-2xl :where(thead th) {

      ---

      -   .xl\\\\:prose-2xl :where(thead th:first-child) {
      +   .xl\\\\:markdown-2xl :where(thead th:first-child) {

      ---

      -   .xl\\\\:prose-2xl :where(thead th:last-child) {
      +   .xl\\\\:markdown-2xl :where(thead th:last-child) {

      ---

      -   .xl\\\\:prose-2xl :where(tbody td) {
      +   .xl\\\\:markdown-2xl :where(tbody td) {

      ---

      -   .xl\\\\:prose-2xl :where(tbody td:first-child) {
      +   .xl\\\\:markdown-2xl :where(tbody td:first-child) {

      ---

      -   .xl\\\\:prose-2xl :where(tbody td:last-child) {
      +   .xl\\\\:markdown-2xl :where(tbody td:last-child) {

      ---

      -   .xl\\\\:prose-2xl :where(> :first-child) {
      +   .xl\\\\:markdown-2xl :where(> :first-child) {

      ---

      -   .xl\\\\:prose-2xl :where(> :last-child) {
      +   .xl\\\\:markdown-2xl :where(> :last-child) {

      ---

      -   }
      -
      -   .xl\\\\:prose-red :where(a) {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-red :where(a code) {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-yellow :where(a) {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-yellow :where(a code) {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-green :where(a) {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-green :where(a code) {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-blue :where(a) {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-blue :where(a code) {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-indigo :where(a) {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-indigo :where(a code) {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-purple :where(a) {
      -     color: #7c3aed;
      -   }
      -
      -   .xl\\\\:prose-purple :where(a code) {
      -     color: #7c3aed;
      -   }
      -
      -   .xl\\\\:prose-pink :where(a) {
      -     color: #db2777;

      ---

      -
      -   .xl\\\\:prose-pink :where(a code) {
      -     color: #db2777;
      -   }

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose :where([class~='lead']) {
      +   .\\\\32xl\\\\:markdown :where([class~='lead']) {

      ---

      -   .\\\\32xl\\\\:prose :where(a) {
      +   .\\\\32xl\\\\:markdown :where(a) {

      ---

      -   .\\\\32xl\\\\:prose :where(strong) {
      +   .\\\\32xl\\\\:markdown :where(strong) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='A']) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='A']) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='a']) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='a']) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='A' s]) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='A' s]) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='a' s]) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='a' s]) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='I']) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='I']) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='i']) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='i']) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='I' s]) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='I' s]) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='i' s]) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='i' s]) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol[type='1']) {
      +   .\\\\32xl\\\\:markdown :where(ol[type='1']) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol > li) {
      +   .\\\\32xl\\\\:markdown :where(ol > li) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol > li)::before {
      +   .\\\\32xl\\\\:markdown :where(ol > li)::before {

      ---

      -   .\\\\32xl\\\\:prose :where(ul > li) {
      +   .\\\\32xl\\\\:markdown :where(ul > li) {

      ---

      -   .\\\\32xl\\\\:prose :where(ul > li)::before {
      +   .\\\\32xl\\\\:markdown :where(ul > li)::before {

      ---

      -   .\\\\32xl\\\\:prose :where(hr) {
      +   .\\\\32xl\\\\:markdown :where(hr) {

      ---

      -   .\\\\32xl\\\\:prose :where(blockquote) {
      +   .\\\\32xl\\\\:markdown :where(blockquote) {

      ---

      -   .\\\\32xl\\\\:prose :where(blockquote p:first-of-type)::before {
      +   .\\\\32xl\\\\:markdown :where(blockquote p:first-of-type)::before {

      ---

      -   .\\\\32xl\\\\:prose :where(blockquote p:last-of-type)::after {
      +   .\\\\32xl\\\\:markdown :where(blockquote p:last-of-type)::after {

      ---

      -   .\\\\32xl\\\\:prose :where(h1) {
      +   .\\\\32xl\\\\:markdown :where(h1) {

      ---

      -   .\\\\32xl\\\\:prose :where(h1 strong) {
      +   .\\\\32xl\\\\:markdown :where(h1 strong) {

      ---

      -   .\\\\32xl\\\\:prose :where(h2) {
      +   .\\\\32xl\\\\:markdown :where(h2) {

      ---

      -   .\\\\32xl\\\\:prose :where(h2 strong) {
      +   .\\\\32xl\\\\:markdown :where(h2 strong) {

      ---

      -   .\\\\32xl\\\\:prose :where(h3) {
      +   .\\\\32xl\\\\:markdown :where(h3) {

      ---

      -   .\\\\32xl\\\\:prose :where(h3 strong) {
      +   .\\\\32xl\\\\:markdown :where(h3 strong) {

      ---

      -   .\\\\32xl\\\\:prose :where(h4) {
      +   .\\\\32xl\\\\:markdown :where(h4) {

      ---

      -   .\\\\32xl\\\\:prose :where(h4 strong) {
      +   .\\\\32xl\\\\:markdown :where(h4 strong) {

      ---

      -   .\\\\32xl\\\\:prose :where(figure figcaption) {
      +   .\\\\32xl\\\\:markdown :where(figure figcaption) {

      ---

      -   .\\\\32xl\\\\:prose :where(code) {
      +   .\\\\32xl\\\\:markdown :where(code) {

      ---

      -   .\\\\32xl\\\\:prose :where(code)::before {
      +   .\\\\32xl\\\\:markdown :where(code)::before {

      ---

      -   .\\\\32xl\\\\:prose :where(code)::after {
      +   .\\\\32xl\\\\:markdown :where(code)::after {

      ---

      -   .\\\\32xl\\\\:prose :where(a code) {
      +   .\\\\32xl\\\\:markdown :where(a code) {

      ---

      -   .\\\\32xl\\\\:prose :where(pre) {
      +   .\\\\32xl\\\\:markdown :where(pre) {

      ---

      -   .\\\\32xl\\\\:prose :where(pre code) {
      +   .\\\\32xl\\\\:markdown :where(pre code) {

      ---

      -   .\\\\32xl\\\\:prose :where(pre code)::before {
      +   .\\\\32xl\\\\:markdown :where(pre code)::before {

      ---

      -   .\\\\32xl\\\\:prose :where(pre code)::after {
      +   .\\\\32xl\\\\:markdown :where(pre code)::after {

      ---

      -   .\\\\32xl\\\\:prose :where(table) {
      +   .\\\\32xl\\\\:markdown :where(table) {

      ---

      -   .\\\\32xl\\\\:prose :where(thead) {
      +   .\\\\32xl\\\\:markdown :where(thead) {

      ---

      -   .\\\\32xl\\\\:prose :where(thead th) {
      +   .\\\\32xl\\\\:markdown :where(thead th) {

      ---

      -   .\\\\32xl\\\\:prose :where(tbody tr) {
      +   .\\\\32xl\\\\:markdown :where(tbody tr) {

      ---

      -   .\\\\32xl\\\\:prose :where(tbody tr:last-child) {
      +   .\\\\32xl\\\\:markdown :where(tbody tr:last-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(tbody td) {
      +   .\\\\32xl\\\\:markdown :where(tbody td) {

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose :where(p) {
      +   .\\\\32xl\\\\:markdown :where(p) {

      ---

      -   .\\\\32xl\\\\:prose :where(img) {
      +   .\\\\32xl\\\\:markdown :where(img) {

      ---

      -   .\\\\32xl\\\\:prose :where(video) {
      +   .\\\\32xl\\\\:markdown :where(video) {

      ---

      -   .\\\\32xl\\\\:prose :where(figure) {
      +   .\\\\32xl\\\\:markdown :where(figure) {

      ---

      -   .\\\\32xl\\\\:prose :where(figure > *) {
      +   .\\\\32xl\\\\:markdown :where(figure > *) {

      ---

      -   .\\\\32xl\\\\:prose :where(h2 code) {
      +   .\\\\32xl\\\\:markdown :where(h2 code) {

      ---

      -   .\\\\32xl\\\\:prose :where(h3 code) {
      +   .\\\\32xl\\\\:markdown :where(h3 code) {

      ---

      -   .\\\\32xl\\\\:prose :where(ol) {
      +   .\\\\32xl\\\\:markdown :where(ol) {

      ---

      -   .\\\\32xl\\\\:prose :where(ul) {
      +   .\\\\32xl\\\\:markdown :where(ul) {

      ---

      -   .\\\\32xl\\\\:prose :where(li) {
      +   .\\\\32xl\\\\:markdown :where(li) {

      ---

      -   .\\\\32xl\\\\:prose :where(> ul > li p) {
      +   .\\\\32xl\\\\:markdown :where(> ul > li p) {

      ---

      -   .\\\\32xl\\\\:prose :where(> ul > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown :where(> ul > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(> ul > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown :where(> ul > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(> ol > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown :where(> ol > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(> ol > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown :where(> ol > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(ul ul, ul ol, ol ul, ol ol) {
      +   .\\\\32xl\\\\:markdown :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .\\\\32xl\\\\:prose :where(hr + *) {
      +   .\\\\32xl\\\\:markdown :where(hr + *) {

      ---

      -   .\\\\32xl\\\\:prose :where(h2 + *) {
      +   .\\\\32xl\\\\:markdown :where(h2 + *) {

      ---

      -   .\\\\32xl\\\\:prose :where(h3 + *) {
      +   .\\\\32xl\\\\:markdown :where(h3 + *) {

      ---

      -   .\\\\32xl\\\\:prose :where(h4 + *) {
      +   .\\\\32xl\\\\:markdown :where(h4 + *) {

      ---

      -   .\\\\32xl\\\\:prose :where(thead th:first-child) {
      +   .\\\\32xl\\\\:markdown :where(thead th:first-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(thead th:last-child) {
      +   .\\\\32xl\\\\:markdown :where(thead th:last-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(tbody td:first-child) {
      +   .\\\\32xl\\\\:markdown :where(tbody td:first-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(tbody td:last-child) {
      +   .\\\\32xl\\\\:markdown :where(tbody td:last-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(> :first-child) {
      +   .\\\\32xl\\\\:markdown :where(> :first-child) {

      ---

      -   .\\\\32xl\\\\:prose :where(> :last-child) {
      +   .\\\\32xl\\\\:markdown :where(> :last-child) {

      ---

      -   .\\\\32xl\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(p) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where([class~='lead']) {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(blockquote) {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(h1) {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(h2) {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(h3) {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(h4) {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(img) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(video) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(figure) {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(figure > *) {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(figure figcaption) {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(code) {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(h2 code) {
      -     font-size: 0.9em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(h3 code) {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(pre) {
      -     font-size: 0.8571429em;
      -     line-height: 1.6666667;
      -     margin-top: 1.6666667em;
      -     margin-bottom: 1.6666667em;
      -     border-radius: 0.25rem;
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(ol) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(ul) {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(li) {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(ol > li) {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(ol > li)::before {
      -     left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(ul > li) {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(ul > li)::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(> ul > li p) {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(> ul > li > *:first-child) {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(> ul > li > *:last-child) {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(> ol > li > *:first-child) {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(> ol > li > *:last-child) {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(ul ul, ul ol, ol ul, ol ol) {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(hr) {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(hr + *) {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(h2 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(h3 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(h4 + *) {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(table) {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(thead th) {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(thead th:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(thead th:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(tbody td) {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(tbody td:first-child) {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(tbody td:last-child) {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(> :first-child) {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm :where(> :last-child) {
      -     margin-bottom: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-lg {
      +   .\\\\32xl\\\\:markdown-lg {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(p) {
      +   .\\\\32xl\\\\:markdown-lg :where(p) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where([class~='lead']) {
      +   .\\\\32xl\\\\:markdown-lg :where([class~='lead']) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(blockquote) {
      +   .\\\\32xl\\\\:markdown-lg :where(blockquote) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h1) {
      +   .\\\\32xl\\\\:markdown-lg :where(h1) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h2) {
      +   .\\\\32xl\\\\:markdown-lg :where(h2) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h3) {
      +   .\\\\32xl\\\\:markdown-lg :where(h3) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h4) {
      +   .\\\\32xl\\\\:markdown-lg :where(h4) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(img) {
      +   .\\\\32xl\\\\:markdown-lg :where(img) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(video) {
      +   .\\\\32xl\\\\:markdown-lg :where(video) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(figure) {
      +   .\\\\32xl\\\\:markdown-lg :where(figure) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(figure > *) {
      +   .\\\\32xl\\\\:markdown-lg :where(figure > *) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(figure figcaption) {
      +   .\\\\32xl\\\\:markdown-lg :where(figure figcaption) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(code) {
      +   .\\\\32xl\\\\:markdown-lg :where(code) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h2 code) {
      +   .\\\\32xl\\\\:markdown-lg :where(h2 code) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h3 code) {
      +   .\\\\32xl\\\\:markdown-lg :where(h3 code) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(pre) {
      +   .\\\\32xl\\\\:markdown-lg :where(pre) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ol) {
      +   .\\\\32xl\\\\:markdown-lg :where(ol) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ul) {
      +   .\\\\32xl\\\\:markdown-lg :where(ul) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(li) {
      +   .\\\\32xl\\\\:markdown-lg :where(li) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ol > li) {
      +   .\\\\32xl\\\\:markdown-lg :where(ol > li) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ol > li)::before {
      +   .\\\\32xl\\\\:markdown-lg :where(ol > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ul > li) {
      +   .\\\\32xl\\\\:markdown-lg :where(ul > li) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ul > li)::before {
      +   .\\\\32xl\\\\:markdown-lg :where(ul > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> ul > li p) {
      +   .\\\\32xl\\\\:markdown-lg :where(> ul > li p) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> ul > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> ul > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> ul > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> ul > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> ol > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> ol > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> ol > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> ol > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(ul ul, ul ol, ol ul, ol ol) {
      +   .\\\\32xl\\\\:markdown-lg :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(hr) {
      +   .\\\\32xl\\\\:markdown-lg :where(hr) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(hr + *) {
      +   .\\\\32xl\\\\:markdown-lg :where(hr + *) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h2 + *) {
      +   .\\\\32xl\\\\:markdown-lg :where(h2 + *) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h3 + *) {
      +   .\\\\32xl\\\\:markdown-lg :where(h3 + *) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(h4 + *) {
      +   .\\\\32xl\\\\:markdown-lg :where(h4 + *) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(table) {
      +   .\\\\32xl\\\\:markdown-lg :where(table) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(thead th) {
      +   .\\\\32xl\\\\:markdown-lg :where(thead th) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(thead th:first-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(thead th:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(thead th:last-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(thead th:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(tbody td) {
      +   .\\\\32xl\\\\:markdown-lg :where(tbody td) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(tbody td:first-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(tbody td:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(tbody td:last-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(tbody td:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> :first-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> :first-child) {

      ---

      -   .\\\\32xl\\\\:prose-lg :where(> :last-child) {
      +   .\\\\32xl\\\\:markdown-lg :where(> :last-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl {
      +   .\\\\32xl\\\\:markdown-xl {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(p) {
      +   .\\\\32xl\\\\:markdown-xl :where(p) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where([class~='lead']) {
      +   .\\\\32xl\\\\:markdown-xl :where([class~='lead']) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(blockquote) {
      +   .\\\\32xl\\\\:markdown-xl :where(blockquote) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h1) {
      +   .\\\\32xl\\\\:markdown-xl :where(h1) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h2) {
      +   .\\\\32xl\\\\:markdown-xl :where(h2) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h3) {
      +   .\\\\32xl\\\\:markdown-xl :where(h3) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h4) {
      +   .\\\\32xl\\\\:markdown-xl :where(h4) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(img) {
      +   .\\\\32xl\\\\:markdown-xl :where(img) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(video) {
      +   .\\\\32xl\\\\:markdown-xl :where(video) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(figure) {
      +   .\\\\32xl\\\\:markdown-xl :where(figure) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(figure > *) {
      +   .\\\\32xl\\\\:markdown-xl :where(figure > *) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(figure figcaption) {
      +   .\\\\32xl\\\\:markdown-xl :where(figure figcaption) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(code) {
      +   .\\\\32xl\\\\:markdown-xl :where(code) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h2 code) {
      +   .\\\\32xl\\\\:markdown-xl :where(h2 code) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h3 code) {
      +   .\\\\32xl\\\\:markdown-xl :where(h3 code) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(pre) {
      +   .\\\\32xl\\\\:markdown-xl :where(pre) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ol) {
      +   .\\\\32xl\\\\:markdown-xl :where(ol) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ul) {
      +   .\\\\32xl\\\\:markdown-xl :where(ul) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(li) {
      +   .\\\\32xl\\\\:markdown-xl :where(li) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ol > li) {
      +   .\\\\32xl\\\\:markdown-xl :where(ol > li) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ol > li)::before {
      +   .\\\\32xl\\\\:markdown-xl :where(ol > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ul > li) {
      +   .\\\\32xl\\\\:markdown-xl :where(ul > li) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ul > li)::before {
      +   .\\\\32xl\\\\:markdown-xl :where(ul > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> ul > li p) {
      +   .\\\\32xl\\\\:markdown-xl :where(> ul > li p) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> ul > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> ul > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> ul > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> ul > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> ol > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> ol > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> ol > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> ol > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .\\\\32xl\\\\:markdown-xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(hr) {
      +   .\\\\32xl\\\\:markdown-xl :where(hr) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(hr + *) {
      +   .\\\\32xl\\\\:markdown-xl :where(hr + *) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h2 + *) {
      +   .\\\\32xl\\\\:markdown-xl :where(h2 + *) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h3 + *) {
      +   .\\\\32xl\\\\:markdown-xl :where(h3 + *) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(h4 + *) {
      +   .\\\\32xl\\\\:markdown-xl :where(h4 + *) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(table) {
      +   .\\\\32xl\\\\:markdown-xl :where(table) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(thead th) {
      +   .\\\\32xl\\\\:markdown-xl :where(thead th) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(thead th:first-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(thead th:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(thead th:last-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(thead th:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(tbody td) {
      +   .\\\\32xl\\\\:markdown-xl :where(tbody td) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(tbody td:first-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(tbody td:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(tbody td:last-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(tbody td:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> :first-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> :first-child) {

      ---

      -   .\\\\32xl\\\\:prose-xl :where(> :last-child) {
      +   .\\\\32xl\\\\:markdown-xl :where(> :last-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl {
      +   .\\\\32xl\\\\:markdown-2xl {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(p) {
      +   .\\\\32xl\\\\:markdown-2xl :where(p) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where([class~='lead']) {
      +   .\\\\32xl\\\\:markdown-2xl :where([class~='lead']) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(blockquote) {
      +   .\\\\32xl\\\\:markdown-2xl :where(blockquote) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h1) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h1) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h2) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h2) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h3) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h3) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h4) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h4) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(img) {
      +   .\\\\32xl\\\\:markdown-2xl :where(img) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(video) {
      +   .\\\\32xl\\\\:markdown-2xl :where(video) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(figure) {
      +   .\\\\32xl\\\\:markdown-2xl :where(figure) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(figure > *) {
      +   .\\\\32xl\\\\:markdown-2xl :where(figure > *) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(figure figcaption) {
      +   .\\\\32xl\\\\:markdown-2xl :where(figure figcaption) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(code) {
      +   .\\\\32xl\\\\:markdown-2xl :where(code) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h2 code) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h2 code) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h3 code) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h3 code) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(pre) {
      +   .\\\\32xl\\\\:markdown-2xl :where(pre) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ol) {
      +   .\\\\32xl\\\\:markdown-2xl :where(ol) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ul) {
      +   .\\\\32xl\\\\:markdown-2xl :where(ul) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(li) {
      +   .\\\\32xl\\\\:markdown-2xl :where(li) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ol > li) {
      +   .\\\\32xl\\\\:markdown-2xl :where(ol > li) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ol > li)::before {
      +   .\\\\32xl\\\\:markdown-2xl :where(ol > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ul > li) {
      +   .\\\\32xl\\\\:markdown-2xl :where(ul > li) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ul > li)::before {
      +   .\\\\32xl\\\\:markdown-2xl :where(ul > li)::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> ul > li p) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> ul > li p) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> ul > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> ul > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> ul > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> ul > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> ol > li > *:first-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> ol > li > *:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> ol > li > *:last-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> ol > li > *:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(ul ul, ul ol, ol ul, ol ol) {
      +   .\\\\32xl\\\\:markdown-2xl :where(ul ul, ul ol, ol ul, ol ol) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(hr) {
      +   .\\\\32xl\\\\:markdown-2xl :where(hr) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(hr + *) {
      +   .\\\\32xl\\\\:markdown-2xl :where(hr + *) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h2 + *) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h2 + *) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h3 + *) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h3 + *) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(h4 + *) {
      +   .\\\\32xl\\\\:markdown-2xl :where(h4 + *) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(table) {
      +   .\\\\32xl\\\\:markdown-2xl :where(table) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(thead th) {
      +   .\\\\32xl\\\\:markdown-2xl :where(thead th) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(thead th:first-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(thead th:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(thead th:last-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(thead th:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(tbody td) {
      +   .\\\\32xl\\\\:markdown-2xl :where(tbody td) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(tbody td:first-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(tbody td:first-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(tbody td:last-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(tbody td:last-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> :first-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> :first-child) {

      ---

      -   .\\\\32xl\\\\:prose-2xl :where(> :last-child) {
      +   .\\\\32xl\\\\:markdown-2xl :where(> :last-child) {

      ---

      -   }
      -
      -   .\\\\32xl\\\\:prose-red :where(a) {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-red :where(a code) {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow :where(a) {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow :where(a code) {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green :where(a) {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green :where(a code) {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue :where(a) {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue :where(a code) {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo :where(a) {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo :where(a code) {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple :where(a) {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple :where(a code) {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink :where(a) {
      -     color: #db2777;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink :where(a code) {
      -     color: #db2777;

    "
  `)
})

it('should be possible to add a new variant', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            typography: {
              dark: {
                css: [{ color: 'black', maxWidth: '65ch' }],
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      + .prose-dark {
      +   color: black;
      +   max-width: 65ch;
      + }
      +

      ---

      +
      +   .sm\\\\:prose-dark {
      +     color: black;
      +     max-width: 65ch;
      +   }

      ---

      +   }
      +
      +   .md\\\\:prose-dark {
      +     color: black;
      +     max-width: 65ch;

      ---

      +   }
      +
      +   .lg\\\\:prose-dark {
      +     color: black;
      +     max-width: 65ch;

      ---

      +   }
      +
      +   .xl\\\\:prose-dark {
      +     color: black;
      +     max-width: 65ch;

      ---

      +   }
      +
      +   .\\\\32xl\\\\:prose-dark {
      +     color: black;
      +     max-width: 65ch;

    "
  `)
})

it('should be possible to merge values', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            typography: {
              DEFAULT: {
                css: [{ a: { backgroundColor: 'red' } }, { a: { color: 'green' } }],
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      -   color: #111827;
      +   color: green;

      ---

      +   background-color: red;

      ---

      -     color: #111827;
      +     color: green;

      ---

      +     background-color: red;

      ---

      -     color: #111827;
      +     color: green;

      ---

      +     background-color: red;

      ---

      -     color: #111827;
      +     color: green;

      ---

      +     background-color: red;

      ---

      -     color: #111827;
      +     color: green;

      ---

      +     background-color: red;

      ---

      -     color: #111827;
      +     color: green;

      ---

      +     background-color: red;

    "
  `)
})

it('should be possible to only update a single value from an existing definition', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            typography: {
              DEFAULT: {
                css: {
                  blockquote: {
                    fontWeight: '600',
                  },
                },
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      -   font-weight: 500;
      +   font-weight: 600;

      ---

      -     font-weight: 500;
      +     font-weight: 600;

      ---

      -     font-weight: 500;
      +     font-weight: 600;

      ---

      -     font-weight: 500;
      +     font-weight: 600;

      ---

      -     font-weight: 500;
      +     font-weight: 600;

      ---

      -     font-weight: 500;
      +     font-weight: 600;

    "
  `)
})

it('should be possible to only update a single value from a different modifier', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            typography: {
              sm: {
                css: {
                  blockquote: {
                    fontWeight: '600',
                  },
                },
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      +   font-weight: 600;

      ---

      +     font-weight: 600;

      ---

      +     font-weight: 600;

      ---

      +     font-weight: 600;

      ---

      +     font-weight: 600;

      ---

      +     font-weight: 600;

    "
  `)
})

it('should be possible to override backticks for the inline `code` tag', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            typography: {
              DEFAULT: {
                css: [
                  {
                    'code::before': {
                      content: '""',
                    },
                    'code::after': {
                      content: '""',
                    },
                  },
                ],
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      -   content: '\`';
      +   content: '';

      ---

      -   content: '\`';
      +   content: '';

      ---

      -     content: '\`';
      +     content: '';

      ---

      -     content: '\`';
      +     content: '';

      ---

      -     content: '\`';
      +     content: '';

      ---

      -     content: '\`';
      +     content: '';

      ---

      -     content: '\`';
      +     content: '';

      ---

      -     content: '\`';
      +     content: '';

      ---

      -     content: '\`';
      +     content: '';

      ---

      -     content: '\`';
      +     content: '';

      ---

      -     content: '\`';
      +     content: '';

      ---

      -     content: '\`';
      +     content: '';

    "
  `)
})

it('should be possible to add colors without 600 and still get default and custom prose color helpers created', async () => {
  expect(
    await diffOnly(
      {},
      {
        theme: {
          extend: {
            colors: {
              'darkish-red': '#a85555',
              'darkish-green': {
                600: '#55a855',
              },
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

      + .prose-darkish-green :where(a) {
      +   color: #55a855;
      + }
      +
      + .prose-darkish-green :where(a code) {
      +   color: #55a855;
      + }
      +

      ---

      +   }
      +
      +   .sm\\\\:prose-darkish-green :where(a) {
      +     color: #55a855;
      +   }
      +
      +   .sm\\\\:prose-darkish-green :where(a code) {
      +     color: #55a855;

      ---

      +   }
      +
      +   .md\\\\:prose-darkish-green :where(a) {
      +     color: #55a855;
      +   }
      +
      +   .md\\\\:prose-darkish-green :where(a code) {
      +     color: #55a855;

      ---

      +   }
      +
      +   .lg\\\\:prose-darkish-green :where(a) {
      +     color: #55a855;

      ---

      +
      +   .lg\\\\:prose-darkish-green :where(a code) {
      +     color: #55a855;
      +   }

      ---

      +   }
      +
      +   .xl\\\\:prose-darkish-green :where(a) {
      +     color: #55a855;

      ---

      +
      +   .xl\\\\:prose-darkish-green :where(a code) {
      +     color: #55a855;
      +   }

      ---

      +   }
      +
      +   .\\\\32xl\\\\:prose-darkish-green :where(a) {
      +     color: #55a855;
      +   }
      +
      +   .\\\\32xl\\\\:prose-darkish-green :where(a code) {
      +     color: #55a855;

    "
  `)
})
