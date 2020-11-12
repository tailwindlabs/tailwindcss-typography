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

    .prose [class~=\\"lead\\"] {
      color: #4b5563;
      font-size: 1.25em;
      line-height: 1.6;
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose a {
      color: #111827;
      text-decoration: underline;
      font-weight: 500;
    }

    .prose strong {
      color: #111827;
      font-weight: 600;
    }

    .prose ol {
      counter-reset: list-counter;
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }

    .prose ol > li {
      position: relative;
      counter-increment: list-counter;
      padding-left: 1.75em;
    }

    .prose ol > li::before {
      content: counter(list-counter) \\".\\";
      position: absolute;
      font-weight: 400;
      color: #6b7280;
      left: 0;
    }

    .prose ul > li {
      position: relative;
      padding-left: 1.75em;
    }

    .prose ul > li::before {
      content: \\"\\";
      position: absolute;
      background-color: #d1d5db;
      border-radius: 50%;
      width: 0.375em;
      height: 0.375em;
      top: calc(0.875em - 0.1875em);
      left: 0.25em;
    }

    .prose hr {
      border-color: #e5e7eb;
      border-top-width: 1px;
      margin-top: 3em;
      margin-bottom: 3em;
    }

    .prose blockquote {
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

    .prose blockquote p:first-of-type::before {
      content: open-quote;
    }

    .prose blockquote p:last-of-type::after {
      content: close-quote;
    }

    .prose h1 {
      color: #111827;
      font-weight: 800;
      font-size: 2.25em;
      margin-top: 0;
      margin-bottom: 0.8888889em;
      line-height: 1.1111111;
    }

    .prose h2 {
      color: #111827;
      font-weight: 700;
      font-size: 1.5em;
      margin-top: 2em;
      margin-bottom: 1em;
      line-height: 1.3333333;
    }

    .prose h3 {
      color: #111827;
      font-weight: 600;
      font-size: 1.25em;
      margin-top: 1.6em;
      margin-bottom: 0.6em;
      line-height: 1.6;
    }

    .prose h4 {
      color: #111827;
      font-weight: 600;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      line-height: 1.5;
    }

    .prose figure figcaption {
      color: #6b7280;
      font-size: 0.875em;
      line-height: 1.4285714;
      margin-top: 0.8571429em;
    }

    .prose code {
      color: #111827;
      font-weight: 600;
      font-size: 0.875em;
    }

    .prose code::before {
      content: \\"\`\\";
    }

    .prose code::after {
      content: \\"\`\\";
    }

    .prose a code {
      color: #111827;
    }

    .prose pre {
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

    .prose pre code {
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

    .prose pre code::before {
      content: \\"\\";
    }

    .prose pre code::after {
      content: \\"\\";
    }

    .prose table {
      width: 100%;
      table-layout: auto;
      text-align: left;
      margin-top: 2em;
      margin-bottom: 2em;
      font-size: 0.875em;
      line-height: 1.7142857;
    }

    .prose thead {
      color: #111827;
      font-weight: 600;
      border-bottom-width: 1px;
      border-bottom-color: #d1d5db;
    }

    .prose thead th {
      vertical-align: bottom;
      padding-right: 0.5714286em;
      padding-bottom: 0.5714286em;
      padding-left: 0.5714286em;
    }

    .prose tbody tr {
      border-bottom-width: 1px;
      border-bottom-color: #e5e7eb;
    }

    .prose tbody tr:last-child {
      border-bottom-width: 0;
    }

    .prose tbody td {
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

    .prose p {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }

    .prose img {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose video {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose figure {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose figure > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose h2 code {
      font-size: 0.875em;
    }

    .prose h3 code {
      font-size: 0.9em;
    }

    .prose ul {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }

    .prose li {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }

    .prose > ul > li p {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }

    .prose > ul > li > *:first-child {
      margin-top: 1.25em;
    }

    .prose > ul > li > *:last-child {
      margin-bottom: 1.25em;
    }

    .prose > ol > li > *:first-child {
      margin-top: 1.25em;
    }

    .prose > ol > li > *:last-child {
      margin-bottom: 1.25em;
    }

    .prose ul ul, .prose ul ol, .prose ol ul, .prose ol ol {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }

    .prose hr + * {
      margin-top: 0;
    }

    .prose h2 + * {
      margin-top: 0;
    }

    .prose h3 + * {
      margin-top: 0;
    }

    .prose h4 + * {
      margin-top: 0;
    }

    .prose thead th:first-child {
      padding-left: 0;
    }

    .prose thead th:last-child {
      padding-right: 0;
    }

    .prose tbody td:first-child {
      padding-left: 0;
    }

    .prose tbody td:last-child {
      padding-right: 0;
    }

    .prose > :first-child {
      margin-top: 0;
    }

    .prose > :last-child {
      margin-bottom: 0;
    }

    .prose-sm {
      font-size: 0.875rem;
      line-height: 1.7142857;
    }

    .prose-sm p {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }

    .prose-sm [class~=\\"lead\\"] {
      font-size: 1.2857143em;
      line-height: 1.5555556;
      margin-top: 0.8888889em;
      margin-bottom: 0.8888889em;
    }

    .prose-sm blockquote {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
      padding-left: 1.1111111em;
    }

    .prose-sm h1 {
      font-size: 2.1428571em;
      margin-top: 0;
      margin-bottom: 0.8em;
      line-height: 1.2;
    }

    .prose-sm h2 {
      font-size: 1.4285714em;
      margin-top: 1.6em;
      margin-bottom: 0.8em;
      line-height: 1.4;
    }

    .prose-sm h3 {
      font-size: 1.2857143em;
      margin-top: 1.5555556em;
      margin-bottom: 0.4444444em;
      line-height: 1.5555556;
    }

    .prose-sm h4 {
      margin-top: 1.4285714em;
      margin-bottom: 0.5714286em;
      line-height: 1.4285714;
    }

    .prose-sm img {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }

    .prose-sm video {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }

    .prose-sm figure {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }

    .prose-sm figure > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-sm figure figcaption {
      font-size: 0.8571429em;
      line-height: 1.3333333;
      margin-top: 0.6666667em;
    }

    .prose-sm code {
      font-size: 0.8571429em;
    }

    .prose-sm h2 code {
      font-size: 0.9em;
    }

    .prose-sm h3 code {
      font-size: 0.8888889em;
    }

    .prose-sm pre {
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

    .prose-sm ol {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }

    .prose-sm ul {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }

    .prose-sm li {
      margin-top: 0.2857143em;
      margin-bottom: 0.2857143em;
    }

    .prose-sm ol > li {
      padding-left: 1.5714286em;
    }

    .prose-sm ol > li::before {
      left: 0;
    }

    .prose-sm ul > li {
      padding-left: 1.5714286em;
    }

    .prose-sm ul > li::before {
      height: 0.3571429em;
      width: 0.3571429em;
      top: calc(0.8571429em - 0.1785714em);
      left: 0.2142857em;
    }

    .prose-sm > ul > li p {
      margin-top: 0.5714286em;
      margin-bottom: 0.5714286em;
    }

    .prose-sm > ul > li > *:first-child {
      margin-top: 1.1428571em;
    }

    .prose-sm > ul > li > *:last-child {
      margin-bottom: 1.1428571em;
    }

    .prose-sm > ol > li > *:first-child {
      margin-top: 1.1428571em;
    }

    .prose-sm > ol > li > *:last-child {
      margin-bottom: 1.1428571em;
    }

    .prose-sm ul ul, .prose-sm ul ol, .prose-sm ol ul, .prose-sm ol ol {
      margin-top: 0.5714286em;
      margin-bottom: 0.5714286em;
    }

    .prose-sm hr {
      margin-top: 2.8571429em;
      margin-bottom: 2.8571429em;
    }

    .prose-sm hr + * {
      margin-top: 0;
    }

    .prose-sm h2 + * {
      margin-top: 0;
    }

    .prose-sm h3 + * {
      margin-top: 0;
    }

    .prose-sm h4 + * {
      margin-top: 0;
    }

    .prose-sm table {
      font-size: 0.8571429em;
      line-height: 1.5;
    }

    .prose-sm thead th {
      padding-right: 1em;
      padding-bottom: 0.6666667em;
      padding-left: 1em;
    }

    .prose-sm thead th:first-child {
      padding-left: 0;
    }

    .prose-sm thead th:last-child {
      padding-right: 0;
    }

    .prose-sm tbody td {
      padding-top: 0.6666667em;
      padding-right: 1em;
      padding-bottom: 0.6666667em;
      padding-left: 1em;
    }

    .prose-sm tbody td:first-child {
      padding-left: 0;
    }

    .prose-sm tbody td:last-child {
      padding-right: 0;
    }

    .prose-sm > :first-child {
      margin-top: 0;
    }

    .prose-sm > :last-child {
      margin-bottom: 0;
    }

    .prose-lg {
      font-size: 1.125rem;
      line-height: 1.7777778;
    }

    .prose-lg p {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-lg [class~=\\"lead\\"] {
      font-size: 1.2222222em;
      line-height: 1.4545455;
      margin-top: 1.0909091em;
      margin-bottom: 1.0909091em;
    }

    .prose-lg blockquote {
      margin-top: 1.6666667em;
      margin-bottom: 1.6666667em;
      padding-left: 1em;
    }

    .prose-lg h1 {
      font-size: 2.6666667em;
      margin-top: 0;
      margin-bottom: 0.8333333em;
      line-height: 1;
    }

    .prose-lg h2 {
      font-size: 1.6666667em;
      margin-top: 1.8666667em;
      margin-bottom: 1.0666667em;
      line-height: 1.3333333;
    }

    .prose-lg h3 {
      font-size: 1.3333333em;
      margin-top: 1.6666667em;
      margin-bottom: 0.6666667em;
      line-height: 1.5;
    }

    .prose-lg h4 {
      margin-top: 1.7777778em;
      margin-bottom: 0.4444444em;
      line-height: 1.5555556;
    }

    .prose-lg img {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
    }

    .prose-lg video {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
    }

    .prose-lg figure {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
    }

    .prose-lg figure > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-lg figure figcaption {
      font-size: 0.8888889em;
      line-height: 1.5;
      margin-top: 1em;
    }

    .prose-lg code {
      font-size: 0.8888889em;
    }

    .prose-lg h2 code {
      font-size: 0.8666667em;
    }

    .prose-lg h3 code {
      font-size: 0.875em;
    }

    .prose-lg pre {
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

    .prose-lg ol {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-lg ul {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-lg li {
      margin-top: 0.6666667em;
      margin-bottom: 0.6666667em;
    }

    .prose-lg ol > li {
      padding-left: 1.6666667em;
    }

    .prose-lg ol > li::before {
      left: 0;
    }

    .prose-lg ul > li {
      padding-left: 1.6666667em;
    }

    .prose-lg ul > li::before {
      width: 0.3333333em;
      height: 0.3333333em;
      top: calc(0.8888889em - 0.1666667em);
      left: 0.2222222em;
    }

    .prose-lg > ul > li p {
      margin-top: 0.8888889em;
      margin-bottom: 0.8888889em;
    }

    .prose-lg > ul > li > *:first-child {
      margin-top: 1.3333333em;
    }

    .prose-lg > ul > li > *:last-child {
      margin-bottom: 1.3333333em;
    }

    .prose-lg > ol > li > *:first-child {
      margin-top: 1.3333333em;
    }

    .prose-lg > ol > li > *:last-child {
      margin-bottom: 1.3333333em;
    }

    .prose-lg ul ul, .prose-lg ul ol, .prose-lg ol ul, .prose-lg ol ol {
      margin-top: 0.8888889em;
      margin-bottom: 0.8888889em;
    }

    .prose-lg hr {
      margin-top: 3.1111111em;
      margin-bottom: 3.1111111em;
    }

    .prose-lg hr + * {
      margin-top: 0;
    }

    .prose-lg h2 + * {
      margin-top: 0;
    }

    .prose-lg h3 + * {
      margin-top: 0;
    }

    .prose-lg h4 + * {
      margin-top: 0;
    }

    .prose-lg table {
      font-size: 0.8888889em;
      line-height: 1.5;
    }

    .prose-lg thead th {
      padding-right: 0.75em;
      padding-bottom: 0.75em;
      padding-left: 0.75em;
    }

    .prose-lg thead th:first-child {
      padding-left: 0;
    }

    .prose-lg thead th:last-child {
      padding-right: 0;
    }

    .prose-lg tbody td {
      padding-top: 0.75em;
      padding-right: 0.75em;
      padding-bottom: 0.75em;
      padding-left: 0.75em;
    }

    .prose-lg tbody td:first-child {
      padding-left: 0;
    }

    .prose-lg tbody td:last-child {
      padding-right: 0;
    }

    .prose-lg > :first-child {
      margin-top: 0;
    }

    .prose-lg > :last-child {
      margin-bottom: 0;
    }

    .prose-xl {
      font-size: 1.25rem;
      line-height: 1.8;
    }

    .prose-xl p {
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose-xl [class~=\\"lead\\"] {
      font-size: 1.2em;
      line-height: 1.5;
      margin-top: 1em;
      margin-bottom: 1em;
    }

    .prose-xl blockquote {
      margin-top: 1.6em;
      margin-bottom: 1.6em;
      padding-left: 1.0666667em;
    }

    .prose-xl h1 {
      font-size: 2.8em;
      margin-top: 0;
      margin-bottom: 0.8571429em;
      line-height: 1;
    }

    .prose-xl h2 {
      font-size: 1.8em;
      margin-top: 1.5555556em;
      margin-bottom: 0.8888889em;
      line-height: 1.1111111;
    }

    .prose-xl h3 {
      font-size: 1.5em;
      margin-top: 1.6em;
      margin-bottom: 0.6666667em;
      line-height: 1.3333333;
    }

    .prose-xl h4 {
      margin-top: 1.8em;
      margin-bottom: 0.6em;
      line-height: 1.6;
    }

    .prose-xl img {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-xl video {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-xl figure {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-xl figure > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-xl figure figcaption {
      font-size: 0.9em;
      line-height: 1.5555556;
      margin-top: 1em;
    }

    .prose-xl code {
      font-size: 0.9em;
    }

    .prose-xl h2 code {
      font-size: 0.8611111em;
    }

    .prose-xl h3 code {
      font-size: 0.9em;
    }

    .prose-xl pre {
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

    .prose-xl ol {
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose-xl ul {
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }

    .prose-xl li {
      margin-top: 0.6em;
      margin-bottom: 0.6em;
    }

    .prose-xl ol > li {
      padding-left: 1.8em;
    }

    .prose-xl ol > li::before {
      left: 0;
    }

    .prose-xl ul > li {
      padding-left: 1.8em;
    }

    .prose-xl ul > li::before {
      width: 0.35em;
      height: 0.35em;
      top: calc(0.9em - 0.175em);
      left: 0.25em;
    }

    .prose-xl > ul > li p {
      margin-top: 0.8em;
      margin-bottom: 0.8em;
    }

    .prose-xl > ul > li > *:first-child {
      margin-top: 1.2em;
    }

    .prose-xl > ul > li > *:last-child {
      margin-bottom: 1.2em;
    }

    .prose-xl > ol > li > *:first-child {
      margin-top: 1.2em;
    }

    .prose-xl > ol > li > *:last-child {
      margin-bottom: 1.2em;
    }

    .prose-xl ul ul, .prose-xl ul ol, .prose-xl ol ul, .prose-xl ol ol {
      margin-top: 0.8em;
      margin-bottom: 0.8em;
    }

    .prose-xl hr {
      margin-top: 2.8em;
      margin-bottom: 2.8em;
    }

    .prose-xl hr + * {
      margin-top: 0;
    }

    .prose-xl h2 + * {
      margin-top: 0;
    }

    .prose-xl h3 + * {
      margin-top: 0;
    }

    .prose-xl h4 + * {
      margin-top: 0;
    }

    .prose-xl table {
      font-size: 0.9em;
      line-height: 1.5555556;
    }

    .prose-xl thead th {
      padding-right: 0.6666667em;
      padding-bottom: 0.8888889em;
      padding-left: 0.6666667em;
    }

    .prose-xl thead th:first-child {
      padding-left: 0;
    }

    .prose-xl thead th:last-child {
      padding-right: 0;
    }

    .prose-xl tbody td {
      padding-top: 0.8888889em;
      padding-right: 0.6666667em;
      padding-bottom: 0.8888889em;
      padding-left: 0.6666667em;
    }

    .prose-xl tbody td:first-child {
      padding-left: 0;
    }

    .prose-xl tbody td:last-child {
      padding-right: 0;
    }

    .prose-xl > :first-child {
      margin-top: 0;
    }

    .prose-xl > :last-child {
      margin-bottom: 0;
    }

    .prose-2xl {
      font-size: 1.5rem;
      line-height: 1.6666667;
    }

    .prose-2xl p {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-2xl [class~=\\"lead\\"] {
      font-size: 1.25em;
      line-height: 1.4666667;
      margin-top: 1.0666667em;
      margin-bottom: 1.0666667em;
    }

    .prose-2xl blockquote {
      margin-top: 1.7777778em;
      margin-bottom: 1.7777778em;
      padding-left: 1.1111111em;
    }

    .prose-2xl h1 {
      font-size: 2.6666667em;
      margin-top: 0;
      margin-bottom: 0.875em;
      line-height: 1;
    }

    .prose-2xl h2 {
      font-size: 2em;
      margin-top: 1.5em;
      margin-bottom: 0.8333333em;
      line-height: 1.0833333;
    }

    .prose-2xl h3 {
      font-size: 1.5em;
      margin-top: 1.5555556em;
      margin-bottom: 0.6666667em;
      line-height: 1.2222222;
    }

    .prose-2xl h4 {
      margin-top: 1.6666667em;
      margin-bottom: 0.6666667em;
      line-height: 1.5;
    }

    .prose-2xl img {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-2xl video {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-2xl figure {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    .prose-2xl figure > * {
      margin-top: 0;
      margin-bottom: 0;
    }

    .prose-2xl figure figcaption {
      font-size: 0.8333333em;
      line-height: 1.6;
      margin-top: 1em;
    }

    .prose-2xl code {
      font-size: 0.8333333em;
    }

    .prose-2xl h2 code {
      font-size: 0.875em;
    }

    .prose-2xl h3 code {
      font-size: 0.8888889em;
    }

    .prose-2xl pre {
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

    .prose-2xl ol {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-2xl ul {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
    }

    .prose-2xl li {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }

    .prose-2xl ol > li {
      padding-left: 1.6666667em;
    }

    .prose-2xl ol > li::before {
      left: 0;
    }

    .prose-2xl ul > li {
      padding-left: 1.6666667em;
    }

    .prose-2xl ul > li::before {
      width: 0.3333333em;
      height: 0.3333333em;
      top: calc(0.8333333em - 0.1666667em);
      left: 0.25em;
    }

    .prose-2xl > ul > li p {
      margin-top: 0.8333333em;
      margin-bottom: 0.8333333em;
    }

    .prose-2xl > ul > li > *:first-child {
      margin-top: 1.3333333em;
    }

    .prose-2xl > ul > li > *:last-child {
      margin-bottom: 1.3333333em;
    }

    .prose-2xl > ol > li > *:first-child {
      margin-top: 1.3333333em;
    }

    .prose-2xl > ol > li > *:last-child {
      margin-bottom: 1.3333333em;
    }

    .prose-2xl ul ul, .prose-2xl ul ol, .prose-2xl ol ul, .prose-2xl ol ol {
      margin-top: 0.6666667em;
      margin-bottom: 0.6666667em;
    }

    .prose-2xl hr {
      margin-top: 3em;
      margin-bottom: 3em;
    }

    .prose-2xl hr + * {
      margin-top: 0;
    }

    .prose-2xl h2 + * {
      margin-top: 0;
    }

    .prose-2xl h3 + * {
      margin-top: 0;
    }

    .prose-2xl h4 + * {
      margin-top: 0;
    }

    .prose-2xl table {
      font-size: 0.8333333em;
      line-height: 1.4;
    }

    .prose-2xl thead th {
      padding-right: 0.6em;
      padding-bottom: 0.8em;
      padding-left: 0.6em;
    }

    .prose-2xl thead th:first-child {
      padding-left: 0;
    }

    .prose-2xl thead th:last-child {
      padding-right: 0;
    }

    .prose-2xl tbody td {
      padding-top: 0.8em;
      padding-right: 0.6em;
      padding-bottom: 0.8em;
      padding-left: 0.6em;
    }

    .prose-2xl tbody td:first-child {
      padding-left: 0;
    }

    .prose-2xl tbody td:last-child {
      padding-right: 0;
    }

    .prose-2xl > :first-child {
      margin-top: 0;
    }

    .prose-2xl > :last-child {
      margin-bottom: 0;
    }

    .prose-red a {
      color: #dc2626;
    }

    .prose-red a code {
      color: #dc2626;
    }

    .prose-yellow a {
      color: #d97706;
    }

    .prose-yellow a code {
      color: #d97706;
    }

    .prose-green a {
      color: #059669;
    }

    .prose-green a code {
      color: #059669;
    }

    .prose-blue a {
      color: #2563eb;
    }

    .prose-blue a code {
      color: #2563eb;
    }

    .prose-indigo a {
      color: #4f46e5;
    }

    .prose-indigo a code {
      color: #4f46e5;
    }

    .prose-purple a {
      color: #7c3aed;
    }

    .prose-purple a code {
      color: #7c3aed;
    }

    .prose-pink a {
      color: #db2777;
    }

    .prose-pink a code {
      color: #db2777;
    }

    @media (min-width: 640px) {
      .sm\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .sm\\\\:prose [class~=\\"lead\\"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose a {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .sm\\\\:prose strong {
        color: #111827;
        font-weight: 600;
      }

      .sm\\\\:prose ol {
        counter-reset: list-counter;
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose ol > li {
        position: relative;
        counter-increment: list-counter;
        padding-left: 1.75em;
      }

      .sm\\\\:prose ol > li::before {
        content: counter(list-counter) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .sm\\\\:prose ul > li {
        position: relative;
        padding-left: 1.75em;
      }

      .sm\\\\:prose ul > li::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .sm\\\\:prose hr {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .sm\\\\:prose blockquote {
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

      .sm\\\\:prose blockquote p:first-of-type::before {
        content: open-quote;
      }

      .sm\\\\:prose blockquote p:last-of-type::after {
        content: close-quote;
      }

      .sm\\\\:prose h1 {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .sm\\\\:prose h2 {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .sm\\\\:prose h3 {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .sm\\\\:prose h4 {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .sm\\\\:prose figure figcaption {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .sm\\\\:prose code {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .sm\\\\:prose code::before {
        content: \\"\`\\";
      }

      .sm\\\\:prose code::after {
        content: \\"\`\\";
      }

      .sm\\\\:prose a code {
        color: #111827;
      }

      .sm\\\\:prose pre {
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

      .sm\\\\:prose pre code {
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

      .sm\\\\:prose pre code::before {
        content: \\"\\";
      }

      .sm\\\\:prose pre code::after {
        content: \\"\\";
      }

      .sm\\\\:prose table {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .sm\\\\:prose thead {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .sm\\\\:prose thead th {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .sm\\\\:prose tbody tr {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .sm\\\\:prose tbody tr:last-child {
        border-bottom-width: 0;
      }

      .sm\\\\:prose tbody td {
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

      .sm\\\\:prose p {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose h2 code {
        font-size: 0.875em;
      }

      .sm\\\\:prose h3 code {
        font-size: 0.9em;
      }

      .sm\\\\:prose ul {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .sm\\\\:prose > ul > li p {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .sm\\\\:prose > ul > li > *:first-child {
        margin-top: 1.25em;
      }

      .sm\\\\:prose > ul > li > *:last-child {
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose > ol > li > *:first-child {
        margin-top: 1.25em;
      }

      .sm\\\\:prose > ol > li > *:last-child {
        margin-bottom: 1.25em;
      }

      .sm\\\\:prose ul ul, .sm\\\\:prose ul ol, .sm\\\\:prose ol ul, .sm\\\\:prose ol ol {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .sm\\\\:prose hr + * {
        margin-top: 0;
      }

      .sm\\\\:prose h2 + * {
        margin-top: 0;
      }

      .sm\\\\:prose h3 + * {
        margin-top: 0;
      }

      .sm\\\\:prose h4 + * {
        margin-top: 0;
      }

      .sm\\\\:prose thead th:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose thead th:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose tbody td:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose tbody td:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose > :first-child {
        margin-top: 0;
      }

      .sm\\\\:prose > :last-child {
        margin-bottom: 0;
      }

      .sm\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .sm\\\\:prose-sm p {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm [class~=\\"lead\\"] {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .sm\\\\:prose-sm blockquote {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .sm\\\\:prose-sm h1 {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .sm\\\\:prose-sm h2 {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .sm\\\\:prose-sm h3 {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .sm\\\\:prose-sm h4 {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .sm\\\\:prose-sm img {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .sm\\\\:prose-sm video {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .sm\\\\:prose-sm figure {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .sm\\\\:prose-sm figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-sm figure figcaption {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .sm\\\\:prose-sm code {
        font-size: 0.8571429em;
      }

      .sm\\\\:prose-sm h2 code {
        font-size: 0.9em;
      }

      .sm\\\\:prose-sm h3 code {
        font-size: 0.8888889em;
      }

      .sm\\\\:prose-sm pre {
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

      .sm\\\\:prose-sm ol {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm ul {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm li {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .sm\\\\:prose-sm ol > li {
        padding-left: 1.5714286em;
      }

      .sm\\\\:prose-sm ol > li::before {
        left: 0;
      }

      .sm\\\\:prose-sm ul > li {
        padding-left: 1.5714286em;
      }

      .sm\\\\:prose-sm ul > li::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .sm\\\\:prose-sm > ul > li p {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .sm\\\\:prose-sm > ul > li > *:first-child {
        margin-top: 1.1428571em;
      }

      .sm\\\\:prose-sm > ul > li > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm > ol > li > *:first-child {
        margin-top: 1.1428571em;
      }

      .sm\\\\:prose-sm > ol > li > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .sm\\\\:prose-sm ul ul, .sm\\\\:prose-sm ul ol, .sm\\\\:prose-sm ol ul, .sm\\\\:prose-sm ol ol {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .sm\\\\:prose-sm hr {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .sm\\\\:prose-sm hr + * {
        margin-top: 0;
      }

      .sm\\\\:prose-sm h2 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-sm h3 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-sm h4 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-sm table {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .sm\\\\:prose-sm thead th {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-sm thead th:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-sm thead th:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-sm tbody td {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-sm tbody td:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-sm tbody td:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-sm > :first-child {
        margin-top: 0;
      }

      .sm\\\\:prose-sm > :last-child {
        margin-bottom: 0;
      }

      .sm\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .sm\\\\:prose-lg p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg [class~=\\"lead\\"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .sm\\\\:prose-lg blockquote {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .sm\\\\:prose-lg h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .sm\\\\:prose-lg h2 {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .sm\\\\:prose-lg h3 {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .sm\\\\:prose-lg h4 {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .sm\\\\:prose-lg img {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .sm\\\\:prose-lg video {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .sm\\\\:prose-lg figure {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .sm\\\\:prose-lg figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-lg figure figcaption {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .sm\\\\:prose-lg code {
        font-size: 0.8888889em;
      }

      .sm\\\\:prose-lg h2 code {
        font-size: 0.8666667em;
      }

      .sm\\\\:prose-lg h3 code {
        font-size: 0.875em;
      }

      .sm\\\\:prose-lg pre {
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

      .sm\\\\:prose-lg ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg li {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .sm\\\\:prose-lg ol > li {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-lg ol > li::before {
        left: 0;
      }

      .sm\\\\:prose-lg ul > li {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-lg ul > li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .sm\\\\:prose-lg > ul > li p {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .sm\\\\:prose-lg > ul > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-lg > ul > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg > ol > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-lg > ol > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-lg ul ul, .sm\\\\:prose-lg ul ol, .sm\\\\:prose-lg ol ul, .sm\\\\:prose-lg ol ol {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .sm\\\\:prose-lg hr {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .sm\\\\:prose-lg hr + * {
        margin-top: 0;
      }

      .sm\\\\:prose-lg h2 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-lg h3 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-lg h4 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-lg table {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .sm\\\\:prose-lg thead th {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .sm\\\\:prose-lg thead th:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-lg thead th:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-lg tbody td {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .sm\\\\:prose-lg tbody td:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-lg tbody td:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-lg > :first-child {
        margin-top: 0;
      }

      .sm\\\\:prose-lg > :last-child {
        margin-bottom: 0;
      }

      .sm\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .sm\\\\:prose-xl p {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl [class~=\\"lead\\"] {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .sm\\\\:prose-xl blockquote {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .sm\\\\:prose-xl h1 {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .sm\\\\:prose-xl h2 {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .sm\\\\:prose-xl h3 {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .sm\\\\:prose-xl h4 {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .sm\\\\:prose-xl img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-xl video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-xl figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-xl figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-xl figure figcaption {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .sm\\\\:prose-xl code {
        font-size: 0.9em;
      }

      .sm\\\\:prose-xl h2 code {
        font-size: 0.8611111em;
      }

      .sm\\\\:prose-xl h3 code {
        font-size: 0.9em;
      }

      .sm\\\\:prose-xl pre {
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

      .sm\\\\:prose-xl ol {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl ul {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl li {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .sm\\\\:prose-xl ol > li {
        padding-left: 1.8em;
      }

      .sm\\\\:prose-xl ol > li::before {
        left: 0;
      }

      .sm\\\\:prose-xl ul > li {
        padding-left: 1.8em;
      }

      .sm\\\\:prose-xl ul > li::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .sm\\\\:prose-xl > ul > li p {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .sm\\\\:prose-xl > ul > li > *:first-child {
        margin-top: 1.2em;
      }

      .sm\\\\:prose-xl > ul > li > *:last-child {
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl > ol > li > *:first-child {
        margin-top: 1.2em;
      }

      .sm\\\\:prose-xl > ol > li > *:last-child {
        margin-bottom: 1.2em;
      }

      .sm\\\\:prose-xl ul ul, .sm\\\\:prose-xl ul ol, .sm\\\\:prose-xl ol ul, .sm\\\\:prose-xl ol ol {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .sm\\\\:prose-xl hr {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .sm\\\\:prose-xl hr + * {
        margin-top: 0;
      }

      .sm\\\\:prose-xl h2 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-xl h3 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-xl h4 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-xl table {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .sm\\\\:prose-xl thead th {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .sm\\\\:prose-xl thead th:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-xl thead th:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-xl tbody td {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .sm\\\\:prose-xl tbody td:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-xl tbody td:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-xl > :first-child {
        margin-top: 0;
      }

      .sm\\\\:prose-xl > :last-child {
        margin-bottom: 0;
      }

      .sm\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .sm\\\\:prose-2xl p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl [class~=\\"lead\\"] {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .sm\\\\:prose-2xl blockquote {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .sm\\\\:prose-2xl h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .sm\\\\:prose-2xl h2 {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .sm\\\\:prose-2xl h3 {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .sm\\\\:prose-2xl h4 {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .sm\\\\:prose-2xl img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-2xl video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-2xl figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .sm\\\\:prose-2xl figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .sm\\\\:prose-2xl figure figcaption {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .sm\\\\:prose-2xl code {
        font-size: 0.8333333em;
      }

      .sm\\\\:prose-2xl h2 code {
        font-size: 0.875em;
      }

      .sm\\\\:prose-2xl h3 code {
        font-size: 0.8888889em;
      }

      .sm\\\\:prose-2xl pre {
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

      .sm\\\\:prose-2xl ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .sm\\\\:prose-2xl ol > li {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-2xl ol > li::before {
        left: 0;
      }

      .sm\\\\:prose-2xl ul > li {
        padding-left: 1.6666667em;
      }

      .sm\\\\:prose-2xl ul > li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .sm\\\\:prose-2xl > ul > li p {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .sm\\\\:prose-2xl > ul > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-2xl > ul > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl > ol > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .sm\\\\:prose-2xl > ol > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .sm\\\\:prose-2xl ul ul, .sm\\\\:prose-2xl ul ol, .sm\\\\:prose-2xl ol ul, .sm\\\\:prose-2xl ol ol {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .sm\\\\:prose-2xl hr {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .sm\\\\:prose-2xl hr + * {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl h2 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl h3 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl h4 + * {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl table {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .sm\\\\:prose-2xl thead th {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .sm\\\\:prose-2xl thead th:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-2xl thead th:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-2xl tbody td {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .sm\\\\:prose-2xl tbody td:first-child {
        padding-left: 0;
      }

      .sm\\\\:prose-2xl tbody td:last-child {
        padding-right: 0;
      }

      .sm\\\\:prose-2xl > :first-child {
        margin-top: 0;
      }

      .sm\\\\:prose-2xl > :last-child {
        margin-bottom: 0;
      }

      .sm\\\\:prose-red a {
        color: #dc2626;
      }

      .sm\\\\:prose-red a code {
        color: #dc2626;
      }

      .sm\\\\:prose-yellow a {
        color: #d97706;
      }

      .sm\\\\:prose-yellow a code {
        color: #d97706;
      }

      .sm\\\\:prose-green a {
        color: #059669;
      }

      .sm\\\\:prose-green a code {
        color: #059669;
      }

      .sm\\\\:prose-blue a {
        color: #2563eb;
      }

      .sm\\\\:prose-blue a code {
        color: #2563eb;
      }

      .sm\\\\:prose-indigo a {
        color: #4f46e5;
      }

      .sm\\\\:prose-indigo a code {
        color: #4f46e5;
      }

      .sm\\\\:prose-purple a {
        color: #7c3aed;
      }

      .sm\\\\:prose-purple a code {
        color: #7c3aed;
      }

      .sm\\\\:prose-pink a {
        color: #db2777;
      }

      .sm\\\\:prose-pink a code {
        color: #db2777;
      }
    }

    @media (min-width: 768px) {
      .md\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .md\\\\:prose [class~=\\"lead\\"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose a {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .md\\\\:prose strong {
        color: #111827;
        font-weight: 600;
      }

      .md\\\\:prose ol {
        counter-reset: list-counter;
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .md\\\\:prose ol > li {
        position: relative;
        counter-increment: list-counter;
        padding-left: 1.75em;
      }

      .md\\\\:prose ol > li::before {
        content: counter(list-counter) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .md\\\\:prose ul > li {
        position: relative;
        padding-left: 1.75em;
      }

      .md\\\\:prose ul > li::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .md\\\\:prose hr {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .md\\\\:prose blockquote {
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

      .md\\\\:prose blockquote p:first-of-type::before {
        content: open-quote;
      }

      .md\\\\:prose blockquote p:last-of-type::after {
        content: close-quote;
      }

      .md\\\\:prose h1 {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .md\\\\:prose h2 {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .md\\\\:prose h3 {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .md\\\\:prose h4 {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .md\\\\:prose figure figcaption {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .md\\\\:prose code {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .md\\\\:prose code::before {
        content: \\"\`\\";
      }

      .md\\\\:prose code::after {
        content: \\"\`\\";
      }

      .md\\\\:prose a code {
        color: #111827;
      }

      .md\\\\:prose pre {
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

      .md\\\\:prose pre code {
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

      .md\\\\:prose pre code::before {
        content: \\"\\";
      }

      .md\\\\:prose pre code::after {
        content: \\"\\";
      }

      .md\\\\:prose table {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .md\\\\:prose thead {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .md\\\\:prose thead th {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .md\\\\:prose tbody tr {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .md\\\\:prose tbody tr:last-child {
        border-bottom-width: 0;
      }

      .md\\\\:prose tbody td {
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

      .md\\\\:prose p {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .md\\\\:prose img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose h2 code {
        font-size: 0.875em;
      }

      .md\\\\:prose h3 code {
        font-size: 0.9em;
      }

      .md\\\\:prose ul {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .md\\\\:prose li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .md\\\\:prose > ul > li p {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .md\\\\:prose > ul > li > *:first-child {
        margin-top: 1.25em;
      }

      .md\\\\:prose > ul > li > *:last-child {
        margin-bottom: 1.25em;
      }

      .md\\\\:prose > ol > li > *:first-child {
        margin-top: 1.25em;
      }

      .md\\\\:prose > ol > li > *:last-child {
        margin-bottom: 1.25em;
      }

      .md\\\\:prose ul ul, .md\\\\:prose ul ol, .md\\\\:prose ol ul, .md\\\\:prose ol ol {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .md\\\\:prose hr + * {
        margin-top: 0;
      }

      .md\\\\:prose h2 + * {
        margin-top: 0;
      }

      .md\\\\:prose h3 + * {
        margin-top: 0;
      }

      .md\\\\:prose h4 + * {
        margin-top: 0;
      }

      .md\\\\:prose thead th:first-child {
        padding-left: 0;
      }

      .md\\\\:prose thead th:last-child {
        padding-right: 0;
      }

      .md\\\\:prose tbody td:first-child {
        padding-left: 0;
      }

      .md\\\\:prose tbody td:last-child {
        padding-right: 0;
      }

      .md\\\\:prose > :first-child {
        margin-top: 0;
      }

      .md\\\\:prose > :last-child {
        margin-bottom: 0;
      }

      .md\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .md\\\\:prose-sm p {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm [class~=\\"lead\\"] {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .md\\\\:prose-sm blockquote {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .md\\\\:prose-sm h1 {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .md\\\\:prose-sm h2 {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .md\\\\:prose-sm h3 {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .md\\\\:prose-sm h4 {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .md\\\\:prose-sm img {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .md\\\\:prose-sm video {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .md\\\\:prose-sm figure {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .md\\\\:prose-sm figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-sm figure figcaption {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .md\\\\:prose-sm code {
        font-size: 0.8571429em;
      }

      .md\\\\:prose-sm h2 code {
        font-size: 0.9em;
      }

      .md\\\\:prose-sm h3 code {
        font-size: 0.8888889em;
      }

      .md\\\\:prose-sm pre {
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

      .md\\\\:prose-sm ol {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm ul {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm li {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .md\\\\:prose-sm ol > li {
        padding-left: 1.5714286em;
      }

      .md\\\\:prose-sm ol > li::before {
        left: 0;
      }

      .md\\\\:prose-sm ul > li {
        padding-left: 1.5714286em;
      }

      .md\\\\:prose-sm ul > li::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .md\\\\:prose-sm > ul > li p {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .md\\\\:prose-sm > ul > li > *:first-child {
        margin-top: 1.1428571em;
      }

      .md\\\\:prose-sm > ul > li > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm > ol > li > *:first-child {
        margin-top: 1.1428571em;
      }

      .md\\\\:prose-sm > ol > li > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .md\\\\:prose-sm ul ul, .md\\\\:prose-sm ul ol, .md\\\\:prose-sm ol ul, .md\\\\:prose-sm ol ol {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .md\\\\:prose-sm hr {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .md\\\\:prose-sm hr + * {
        margin-top: 0;
      }

      .md\\\\:prose-sm h2 + * {
        margin-top: 0;
      }

      .md\\\\:prose-sm h3 + * {
        margin-top: 0;
      }

      .md\\\\:prose-sm h4 + * {
        margin-top: 0;
      }

      .md\\\\:prose-sm table {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .md\\\\:prose-sm thead th {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-sm thead th:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-sm thead th:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-sm tbody td {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-sm tbody td:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-sm tbody td:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-sm > :first-child {
        margin-top: 0;
      }

      .md\\\\:prose-sm > :last-child {
        margin-bottom: 0;
      }

      .md\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .md\\\\:prose-lg p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg [class~=\\"lead\\"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .md\\\\:prose-lg blockquote {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .md\\\\:prose-lg h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .md\\\\:prose-lg h2 {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .md\\\\:prose-lg h3 {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .md\\\\:prose-lg h4 {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .md\\\\:prose-lg img {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .md\\\\:prose-lg video {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .md\\\\:prose-lg figure {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .md\\\\:prose-lg figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-lg figure figcaption {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .md\\\\:prose-lg code {
        font-size: 0.8888889em;
      }

      .md\\\\:prose-lg h2 code {
        font-size: 0.8666667em;
      }

      .md\\\\:prose-lg h3 code {
        font-size: 0.875em;
      }

      .md\\\\:prose-lg pre {
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

      .md\\\\:prose-lg ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg li {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .md\\\\:prose-lg ol > li {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-lg ol > li::before {
        left: 0;
      }

      .md\\\\:prose-lg ul > li {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-lg ul > li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .md\\\\:prose-lg > ul > li p {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .md\\\\:prose-lg > ul > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-lg > ul > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg > ol > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-lg > ol > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-lg ul ul, .md\\\\:prose-lg ul ol, .md\\\\:prose-lg ol ul, .md\\\\:prose-lg ol ol {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .md\\\\:prose-lg hr {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .md\\\\:prose-lg hr + * {
        margin-top: 0;
      }

      .md\\\\:prose-lg h2 + * {
        margin-top: 0;
      }

      .md\\\\:prose-lg h3 + * {
        margin-top: 0;
      }

      .md\\\\:prose-lg h4 + * {
        margin-top: 0;
      }

      .md\\\\:prose-lg table {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .md\\\\:prose-lg thead th {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .md\\\\:prose-lg thead th:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-lg thead th:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-lg tbody td {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .md\\\\:prose-lg tbody td:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-lg tbody td:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-lg > :first-child {
        margin-top: 0;
      }

      .md\\\\:prose-lg > :last-child {
        margin-bottom: 0;
      }

      .md\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .md\\\\:prose-xl p {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl [class~=\\"lead\\"] {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .md\\\\:prose-xl blockquote {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .md\\\\:prose-xl h1 {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .md\\\\:prose-xl h2 {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .md\\\\:prose-xl h3 {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .md\\\\:prose-xl h4 {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .md\\\\:prose-xl img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-xl video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-xl figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-xl figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-xl figure figcaption {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .md\\\\:prose-xl code {
        font-size: 0.9em;
      }

      .md\\\\:prose-xl h2 code {
        font-size: 0.8611111em;
      }

      .md\\\\:prose-xl h3 code {
        font-size: 0.9em;
      }

      .md\\\\:prose-xl pre {
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

      .md\\\\:prose-xl ol {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl ul {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl li {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .md\\\\:prose-xl ol > li {
        padding-left: 1.8em;
      }

      .md\\\\:prose-xl ol > li::before {
        left: 0;
      }

      .md\\\\:prose-xl ul > li {
        padding-left: 1.8em;
      }

      .md\\\\:prose-xl ul > li::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .md\\\\:prose-xl > ul > li p {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .md\\\\:prose-xl > ul > li > *:first-child {
        margin-top: 1.2em;
      }

      .md\\\\:prose-xl > ul > li > *:last-child {
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl > ol > li > *:first-child {
        margin-top: 1.2em;
      }

      .md\\\\:prose-xl > ol > li > *:last-child {
        margin-bottom: 1.2em;
      }

      .md\\\\:prose-xl ul ul, .md\\\\:prose-xl ul ol, .md\\\\:prose-xl ol ul, .md\\\\:prose-xl ol ol {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .md\\\\:prose-xl hr {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .md\\\\:prose-xl hr + * {
        margin-top: 0;
      }

      .md\\\\:prose-xl h2 + * {
        margin-top: 0;
      }

      .md\\\\:prose-xl h3 + * {
        margin-top: 0;
      }

      .md\\\\:prose-xl h4 + * {
        margin-top: 0;
      }

      .md\\\\:prose-xl table {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .md\\\\:prose-xl thead th {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .md\\\\:prose-xl thead th:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-xl thead th:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-xl tbody td {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .md\\\\:prose-xl tbody td:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-xl tbody td:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-xl > :first-child {
        margin-top: 0;
      }

      .md\\\\:prose-xl > :last-child {
        margin-bottom: 0;
      }

      .md\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .md\\\\:prose-2xl p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl [class~=\\"lead\\"] {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .md\\\\:prose-2xl blockquote {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .md\\\\:prose-2xl h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .md\\\\:prose-2xl h2 {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .md\\\\:prose-2xl h3 {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .md\\\\:prose-2xl h4 {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .md\\\\:prose-2xl img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-2xl video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-2xl figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .md\\\\:prose-2xl figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .md\\\\:prose-2xl figure figcaption {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .md\\\\:prose-2xl code {
        font-size: 0.8333333em;
      }

      .md\\\\:prose-2xl h2 code {
        font-size: 0.875em;
      }

      .md\\\\:prose-2xl h3 code {
        font-size: 0.8888889em;
      }

      .md\\\\:prose-2xl pre {
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

      .md\\\\:prose-2xl ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .md\\\\:prose-2xl ol > li {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-2xl ol > li::before {
        left: 0;
      }

      .md\\\\:prose-2xl ul > li {
        padding-left: 1.6666667em;
      }

      .md\\\\:prose-2xl ul > li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .md\\\\:prose-2xl > ul > li p {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .md\\\\:prose-2xl > ul > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-2xl > ul > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl > ol > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .md\\\\:prose-2xl > ol > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .md\\\\:prose-2xl ul ul, .md\\\\:prose-2xl ul ol, .md\\\\:prose-2xl ol ul, .md\\\\:prose-2xl ol ol {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .md\\\\:prose-2xl hr {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .md\\\\:prose-2xl hr + * {
        margin-top: 0;
      }

      .md\\\\:prose-2xl h2 + * {
        margin-top: 0;
      }

      .md\\\\:prose-2xl h3 + * {
        margin-top: 0;
      }

      .md\\\\:prose-2xl h4 + * {
        margin-top: 0;
      }

      .md\\\\:prose-2xl table {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .md\\\\:prose-2xl thead th {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .md\\\\:prose-2xl thead th:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-2xl thead th:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-2xl tbody td {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .md\\\\:prose-2xl tbody td:first-child {
        padding-left: 0;
      }

      .md\\\\:prose-2xl tbody td:last-child {
        padding-right: 0;
      }

      .md\\\\:prose-2xl > :first-child {
        margin-top: 0;
      }

      .md\\\\:prose-2xl > :last-child {
        margin-bottom: 0;
      }

      .md\\\\:prose-red a {
        color: #dc2626;
      }

      .md\\\\:prose-red a code {
        color: #dc2626;
      }

      .md\\\\:prose-yellow a {
        color: #d97706;
      }

      .md\\\\:prose-yellow a code {
        color: #d97706;
      }

      .md\\\\:prose-green a {
        color: #059669;
      }

      .md\\\\:prose-green a code {
        color: #059669;
      }

      .md\\\\:prose-blue a {
        color: #2563eb;
      }

      .md\\\\:prose-blue a code {
        color: #2563eb;
      }

      .md\\\\:prose-indigo a {
        color: #4f46e5;
      }

      .md\\\\:prose-indigo a code {
        color: #4f46e5;
      }

      .md\\\\:prose-purple a {
        color: #7c3aed;
      }

      .md\\\\:prose-purple a code {
        color: #7c3aed;
      }

      .md\\\\:prose-pink a {
        color: #db2777;
      }

      .md\\\\:prose-pink a code {
        color: #db2777;
      }
    }

    @media (min-width: 1024px) {
      .lg\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .lg\\\\:prose [class~=\\"lead\\"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose a {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .lg\\\\:prose strong {
        color: #111827;
        font-weight: 600;
      }

      .lg\\\\:prose ol {
        counter-reset: list-counter;
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose ol > li {
        position: relative;
        counter-increment: list-counter;
        padding-left: 1.75em;
      }

      .lg\\\\:prose ol > li::before {
        content: counter(list-counter) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .lg\\\\:prose ul > li {
        position: relative;
        padding-left: 1.75em;
      }

      .lg\\\\:prose ul > li::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .lg\\\\:prose hr {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .lg\\\\:prose blockquote {
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

      .lg\\\\:prose blockquote p:first-of-type::before {
        content: open-quote;
      }

      .lg\\\\:prose blockquote p:last-of-type::after {
        content: close-quote;
      }

      .lg\\\\:prose h1 {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .lg\\\\:prose h2 {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .lg\\\\:prose h3 {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .lg\\\\:prose h4 {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .lg\\\\:prose figure figcaption {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .lg\\\\:prose code {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .lg\\\\:prose code::before {
        content: \\"\`\\";
      }

      .lg\\\\:prose code::after {
        content: \\"\`\\";
      }

      .lg\\\\:prose a code {
        color: #111827;
      }

      .lg\\\\:prose pre {
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

      .lg\\\\:prose pre code {
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

      .lg\\\\:prose pre code::before {
        content: \\"\\";
      }

      .lg\\\\:prose pre code::after {
        content: \\"\\";
      }

      .lg\\\\:prose table {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .lg\\\\:prose thead {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .lg\\\\:prose thead th {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .lg\\\\:prose tbody tr {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .lg\\\\:prose tbody tr:last-child {
        border-bottom-width: 0;
      }

      .lg\\\\:prose tbody td {
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

      .lg\\\\:prose p {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose h2 code {
        font-size: 0.875em;
      }

      .lg\\\\:prose h3 code {
        font-size: 0.9em;
      }

      .lg\\\\:prose ul {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .lg\\\\:prose > ul > li p {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .lg\\\\:prose > ul > li > *:first-child {
        margin-top: 1.25em;
      }

      .lg\\\\:prose > ul > li > *:last-child {
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose > ol > li > *:first-child {
        margin-top: 1.25em;
      }

      .lg\\\\:prose > ol > li > *:last-child {
        margin-bottom: 1.25em;
      }

      .lg\\\\:prose ul ul, .lg\\\\:prose ul ol, .lg\\\\:prose ol ul, .lg\\\\:prose ol ol {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .lg\\\\:prose hr + * {
        margin-top: 0;
      }

      .lg\\\\:prose h2 + * {
        margin-top: 0;
      }

      .lg\\\\:prose h3 + * {
        margin-top: 0;
      }

      .lg\\\\:prose h4 + * {
        margin-top: 0;
      }

      .lg\\\\:prose thead th:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose thead th:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose tbody td:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose tbody td:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose > :first-child {
        margin-top: 0;
      }

      .lg\\\\:prose > :last-child {
        margin-bottom: 0;
      }

      .lg\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .lg\\\\:prose-sm p {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm [class~=\\"lead\\"] {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .lg\\\\:prose-sm blockquote {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .lg\\\\:prose-sm h1 {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .lg\\\\:prose-sm h2 {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .lg\\\\:prose-sm h3 {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .lg\\\\:prose-sm h4 {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .lg\\\\:prose-sm img {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .lg\\\\:prose-sm video {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .lg\\\\:prose-sm figure {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .lg\\\\:prose-sm figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-sm figure figcaption {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .lg\\\\:prose-sm code {
        font-size: 0.8571429em;
      }

      .lg\\\\:prose-sm h2 code {
        font-size: 0.9em;
      }

      .lg\\\\:prose-sm h3 code {
        font-size: 0.8888889em;
      }

      .lg\\\\:prose-sm pre {
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

      .lg\\\\:prose-sm ol {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm ul {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm li {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .lg\\\\:prose-sm ol > li {
        padding-left: 1.5714286em;
      }

      .lg\\\\:prose-sm ol > li::before {
        left: 0;
      }

      .lg\\\\:prose-sm ul > li {
        padding-left: 1.5714286em;
      }

      .lg\\\\:prose-sm ul > li::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .lg\\\\:prose-sm > ul > li p {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .lg\\\\:prose-sm > ul > li > *:first-child {
        margin-top: 1.1428571em;
      }

      .lg\\\\:prose-sm > ul > li > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm > ol > li > *:first-child {
        margin-top: 1.1428571em;
      }

      .lg\\\\:prose-sm > ol > li > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .lg\\\\:prose-sm ul ul, .lg\\\\:prose-sm ul ol, .lg\\\\:prose-sm ol ul, .lg\\\\:prose-sm ol ol {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .lg\\\\:prose-sm hr {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .lg\\\\:prose-sm hr + * {
        margin-top: 0;
      }

      .lg\\\\:prose-sm h2 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-sm h3 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-sm h4 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-sm table {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .lg\\\\:prose-sm thead th {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-sm thead th:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-sm thead th:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-sm tbody td {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-sm tbody td:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-sm tbody td:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-sm > :first-child {
        margin-top: 0;
      }

      .lg\\\\:prose-sm > :last-child {
        margin-bottom: 0;
      }

      .lg\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .lg\\\\:prose-lg p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg [class~=\\"lead\\"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .lg\\\\:prose-lg blockquote {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .lg\\\\:prose-lg h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .lg\\\\:prose-lg h2 {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .lg\\\\:prose-lg h3 {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .lg\\\\:prose-lg h4 {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .lg\\\\:prose-lg img {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .lg\\\\:prose-lg video {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .lg\\\\:prose-lg figure {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .lg\\\\:prose-lg figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-lg figure figcaption {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .lg\\\\:prose-lg code {
        font-size: 0.8888889em;
      }

      .lg\\\\:prose-lg h2 code {
        font-size: 0.8666667em;
      }

      .lg\\\\:prose-lg h3 code {
        font-size: 0.875em;
      }

      .lg\\\\:prose-lg pre {
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

      .lg\\\\:prose-lg ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg li {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .lg\\\\:prose-lg ol > li {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-lg ol > li::before {
        left: 0;
      }

      .lg\\\\:prose-lg ul > li {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-lg ul > li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .lg\\\\:prose-lg > ul > li p {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .lg\\\\:prose-lg > ul > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-lg > ul > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg > ol > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-lg > ol > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-lg ul ul, .lg\\\\:prose-lg ul ol, .lg\\\\:prose-lg ol ul, .lg\\\\:prose-lg ol ol {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .lg\\\\:prose-lg hr {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .lg\\\\:prose-lg hr + * {
        margin-top: 0;
      }

      .lg\\\\:prose-lg h2 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-lg h3 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-lg h4 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-lg table {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .lg\\\\:prose-lg thead th {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .lg\\\\:prose-lg thead th:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-lg thead th:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-lg tbody td {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .lg\\\\:prose-lg tbody td:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-lg tbody td:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-lg > :first-child {
        margin-top: 0;
      }

      .lg\\\\:prose-lg > :last-child {
        margin-bottom: 0;
      }

      .lg\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .lg\\\\:prose-xl p {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl [class~=\\"lead\\"] {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .lg\\\\:prose-xl blockquote {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .lg\\\\:prose-xl h1 {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .lg\\\\:prose-xl h2 {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .lg\\\\:prose-xl h3 {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .lg\\\\:prose-xl h4 {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .lg\\\\:prose-xl img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-xl video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-xl figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-xl figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-xl figure figcaption {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .lg\\\\:prose-xl code {
        font-size: 0.9em;
      }

      .lg\\\\:prose-xl h2 code {
        font-size: 0.8611111em;
      }

      .lg\\\\:prose-xl h3 code {
        font-size: 0.9em;
      }

      .lg\\\\:prose-xl pre {
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

      .lg\\\\:prose-xl ol {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl ul {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl li {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .lg\\\\:prose-xl ol > li {
        padding-left: 1.8em;
      }

      .lg\\\\:prose-xl ol > li::before {
        left: 0;
      }

      .lg\\\\:prose-xl ul > li {
        padding-left: 1.8em;
      }

      .lg\\\\:prose-xl ul > li::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .lg\\\\:prose-xl > ul > li p {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .lg\\\\:prose-xl > ul > li > *:first-child {
        margin-top: 1.2em;
      }

      .lg\\\\:prose-xl > ul > li > *:last-child {
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl > ol > li > *:first-child {
        margin-top: 1.2em;
      }

      .lg\\\\:prose-xl > ol > li > *:last-child {
        margin-bottom: 1.2em;
      }

      .lg\\\\:prose-xl ul ul, .lg\\\\:prose-xl ul ol, .lg\\\\:prose-xl ol ul, .lg\\\\:prose-xl ol ol {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .lg\\\\:prose-xl hr {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .lg\\\\:prose-xl hr + * {
        margin-top: 0;
      }

      .lg\\\\:prose-xl h2 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-xl h3 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-xl h4 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-xl table {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .lg\\\\:prose-xl thead th {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .lg\\\\:prose-xl thead th:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-xl thead th:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-xl tbody td {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .lg\\\\:prose-xl tbody td:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-xl tbody td:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-xl > :first-child {
        margin-top: 0;
      }

      .lg\\\\:prose-xl > :last-child {
        margin-bottom: 0;
      }

      .lg\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .lg\\\\:prose-2xl p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl [class~=\\"lead\\"] {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .lg\\\\:prose-2xl blockquote {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .lg\\\\:prose-2xl h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .lg\\\\:prose-2xl h2 {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .lg\\\\:prose-2xl h3 {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .lg\\\\:prose-2xl h4 {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .lg\\\\:prose-2xl img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-2xl video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-2xl figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .lg\\\\:prose-2xl figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .lg\\\\:prose-2xl figure figcaption {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .lg\\\\:prose-2xl code {
        font-size: 0.8333333em;
      }

      .lg\\\\:prose-2xl h2 code {
        font-size: 0.875em;
      }

      .lg\\\\:prose-2xl h3 code {
        font-size: 0.8888889em;
      }

      .lg\\\\:prose-2xl pre {
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

      .lg\\\\:prose-2xl ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .lg\\\\:prose-2xl ol > li {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-2xl ol > li::before {
        left: 0;
      }

      .lg\\\\:prose-2xl ul > li {
        padding-left: 1.6666667em;
      }

      .lg\\\\:prose-2xl ul > li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .lg\\\\:prose-2xl > ul > li p {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .lg\\\\:prose-2xl > ul > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-2xl > ul > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl > ol > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .lg\\\\:prose-2xl > ol > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .lg\\\\:prose-2xl ul ul, .lg\\\\:prose-2xl ul ol, .lg\\\\:prose-2xl ol ul, .lg\\\\:prose-2xl ol ol {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .lg\\\\:prose-2xl hr {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .lg\\\\:prose-2xl hr + * {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl h2 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl h3 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl h4 + * {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl table {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .lg\\\\:prose-2xl thead th {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .lg\\\\:prose-2xl thead th:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-2xl thead th:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-2xl tbody td {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .lg\\\\:prose-2xl tbody td:first-child {
        padding-left: 0;
      }

      .lg\\\\:prose-2xl tbody td:last-child {
        padding-right: 0;
      }

      .lg\\\\:prose-2xl > :first-child {
        margin-top: 0;
      }

      .lg\\\\:prose-2xl > :last-child {
        margin-bottom: 0;
      }

      .lg\\\\:prose-red a {
        color: #dc2626;
      }

      .lg\\\\:prose-red a code {
        color: #dc2626;
      }

      .lg\\\\:prose-yellow a {
        color: #d97706;
      }

      .lg\\\\:prose-yellow a code {
        color: #d97706;
      }

      .lg\\\\:prose-green a {
        color: #059669;
      }

      .lg\\\\:prose-green a code {
        color: #059669;
      }

      .lg\\\\:prose-blue a {
        color: #2563eb;
      }

      .lg\\\\:prose-blue a code {
        color: #2563eb;
      }

      .lg\\\\:prose-indigo a {
        color: #4f46e5;
      }

      .lg\\\\:prose-indigo a code {
        color: #4f46e5;
      }

      .lg\\\\:prose-purple a {
        color: #7c3aed;
      }

      .lg\\\\:prose-purple a code {
        color: #7c3aed;
      }

      .lg\\\\:prose-pink a {
        color: #db2777;
      }

      .lg\\\\:prose-pink a code {
        color: #db2777;
      }
    }

    @media (min-width: 1280px) {
      .xl\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .xl\\\\:prose [class~=\\"lead\\"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose a {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .xl\\\\:prose strong {
        color: #111827;
        font-weight: 600;
      }

      .xl\\\\:prose ol {
        counter-reset: list-counter;
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose ol > li {
        position: relative;
        counter-increment: list-counter;
        padding-left: 1.75em;
      }

      .xl\\\\:prose ol > li::before {
        content: counter(list-counter) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .xl\\\\:prose ul > li {
        position: relative;
        padding-left: 1.75em;
      }

      .xl\\\\:prose ul > li::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .xl\\\\:prose hr {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .xl\\\\:prose blockquote {
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

      .xl\\\\:prose blockquote p:first-of-type::before {
        content: open-quote;
      }

      .xl\\\\:prose blockquote p:last-of-type::after {
        content: close-quote;
      }

      .xl\\\\:prose h1 {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .xl\\\\:prose h2 {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .xl\\\\:prose h3 {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .xl\\\\:prose h4 {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .xl\\\\:prose figure figcaption {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .xl\\\\:prose code {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .xl\\\\:prose code::before {
        content: \\"\`\\";
      }

      .xl\\\\:prose code::after {
        content: \\"\`\\";
      }

      .xl\\\\:prose a code {
        color: #111827;
      }

      .xl\\\\:prose pre {
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

      .xl\\\\:prose pre code {
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

      .xl\\\\:prose pre code::before {
        content: \\"\\";
      }

      .xl\\\\:prose pre code::after {
        content: \\"\\";
      }

      .xl\\\\:prose table {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .xl\\\\:prose thead {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .xl\\\\:prose thead th {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .xl\\\\:prose tbody tr {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .xl\\\\:prose tbody tr:last-child {
        border-bottom-width: 0;
      }

      .xl\\\\:prose tbody td {
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

      .xl\\\\:prose p {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose h2 code {
        font-size: 0.875em;
      }

      .xl\\\\:prose h3 code {
        font-size: 0.9em;
      }

      .xl\\\\:prose ul {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .xl\\\\:prose > ul > li p {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .xl\\\\:prose > ul > li > *:first-child {
        margin-top: 1.25em;
      }

      .xl\\\\:prose > ul > li > *:last-child {
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose > ol > li > *:first-child {
        margin-top: 1.25em;
      }

      .xl\\\\:prose > ol > li > *:last-child {
        margin-bottom: 1.25em;
      }

      .xl\\\\:prose ul ul, .xl\\\\:prose ul ol, .xl\\\\:prose ol ul, .xl\\\\:prose ol ol {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .xl\\\\:prose hr + * {
        margin-top: 0;
      }

      .xl\\\\:prose h2 + * {
        margin-top: 0;
      }

      .xl\\\\:prose h3 + * {
        margin-top: 0;
      }

      .xl\\\\:prose h4 + * {
        margin-top: 0;
      }

      .xl\\\\:prose thead th:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose thead th:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose tbody td:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose tbody td:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose > :first-child {
        margin-top: 0;
      }

      .xl\\\\:prose > :last-child {
        margin-bottom: 0;
      }

      .xl\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .xl\\\\:prose-sm p {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm [class~=\\"lead\\"] {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .xl\\\\:prose-sm blockquote {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .xl\\\\:prose-sm h1 {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .xl\\\\:prose-sm h2 {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .xl\\\\:prose-sm h3 {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .xl\\\\:prose-sm h4 {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .xl\\\\:prose-sm img {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .xl\\\\:prose-sm video {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .xl\\\\:prose-sm figure {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .xl\\\\:prose-sm figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-sm figure figcaption {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .xl\\\\:prose-sm code {
        font-size: 0.8571429em;
      }

      .xl\\\\:prose-sm h2 code {
        font-size: 0.9em;
      }

      .xl\\\\:prose-sm h3 code {
        font-size: 0.8888889em;
      }

      .xl\\\\:prose-sm pre {
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

      .xl\\\\:prose-sm ol {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm ul {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm li {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .xl\\\\:prose-sm ol > li {
        padding-left: 1.5714286em;
      }

      .xl\\\\:prose-sm ol > li::before {
        left: 0;
      }

      .xl\\\\:prose-sm ul > li {
        padding-left: 1.5714286em;
      }

      .xl\\\\:prose-sm ul > li::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .xl\\\\:prose-sm > ul > li p {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .xl\\\\:prose-sm > ul > li > *:first-child {
        margin-top: 1.1428571em;
      }

      .xl\\\\:prose-sm > ul > li > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm > ol > li > *:first-child {
        margin-top: 1.1428571em;
      }

      .xl\\\\:prose-sm > ol > li > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .xl\\\\:prose-sm ul ul, .xl\\\\:prose-sm ul ol, .xl\\\\:prose-sm ol ul, .xl\\\\:prose-sm ol ol {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .xl\\\\:prose-sm hr {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .xl\\\\:prose-sm hr + * {
        margin-top: 0;
      }

      .xl\\\\:prose-sm h2 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-sm h3 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-sm h4 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-sm table {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .xl\\\\:prose-sm thead th {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-sm thead th:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-sm thead th:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-sm tbody td {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-sm tbody td:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-sm tbody td:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-sm > :first-child {
        margin-top: 0;
      }

      .xl\\\\:prose-sm > :last-child {
        margin-bottom: 0;
      }

      .xl\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .xl\\\\:prose-lg p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg [class~=\\"lead\\"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .xl\\\\:prose-lg blockquote {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .xl\\\\:prose-lg h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .xl\\\\:prose-lg h2 {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .xl\\\\:prose-lg h3 {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .xl\\\\:prose-lg h4 {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .xl\\\\:prose-lg img {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .xl\\\\:prose-lg video {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .xl\\\\:prose-lg figure {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .xl\\\\:prose-lg figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-lg figure figcaption {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .xl\\\\:prose-lg code {
        font-size: 0.8888889em;
      }

      .xl\\\\:prose-lg h2 code {
        font-size: 0.8666667em;
      }

      .xl\\\\:prose-lg h3 code {
        font-size: 0.875em;
      }

      .xl\\\\:prose-lg pre {
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

      .xl\\\\:prose-lg ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg li {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .xl\\\\:prose-lg ol > li {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-lg ol > li::before {
        left: 0;
      }

      .xl\\\\:prose-lg ul > li {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-lg ul > li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .xl\\\\:prose-lg > ul > li p {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .xl\\\\:prose-lg > ul > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-lg > ul > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg > ol > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-lg > ol > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-lg ul ul, .xl\\\\:prose-lg ul ol, .xl\\\\:prose-lg ol ul, .xl\\\\:prose-lg ol ol {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .xl\\\\:prose-lg hr {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .xl\\\\:prose-lg hr + * {
        margin-top: 0;
      }

      .xl\\\\:prose-lg h2 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-lg h3 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-lg h4 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-lg table {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .xl\\\\:prose-lg thead th {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .xl\\\\:prose-lg thead th:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-lg thead th:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-lg tbody td {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .xl\\\\:prose-lg tbody td:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-lg tbody td:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-lg > :first-child {
        margin-top: 0;
      }

      .xl\\\\:prose-lg > :last-child {
        margin-bottom: 0;
      }

      .xl\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .xl\\\\:prose-xl p {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl [class~=\\"lead\\"] {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .xl\\\\:prose-xl blockquote {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .xl\\\\:prose-xl h1 {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .xl\\\\:prose-xl h2 {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .xl\\\\:prose-xl h3 {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .xl\\\\:prose-xl h4 {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .xl\\\\:prose-xl img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-xl video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-xl figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-xl figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-xl figure figcaption {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .xl\\\\:prose-xl code {
        font-size: 0.9em;
      }

      .xl\\\\:prose-xl h2 code {
        font-size: 0.8611111em;
      }

      .xl\\\\:prose-xl h3 code {
        font-size: 0.9em;
      }

      .xl\\\\:prose-xl pre {
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

      .xl\\\\:prose-xl ol {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl ul {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl li {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .xl\\\\:prose-xl ol > li {
        padding-left: 1.8em;
      }

      .xl\\\\:prose-xl ol > li::before {
        left: 0;
      }

      .xl\\\\:prose-xl ul > li {
        padding-left: 1.8em;
      }

      .xl\\\\:prose-xl ul > li::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .xl\\\\:prose-xl > ul > li p {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .xl\\\\:prose-xl > ul > li > *:first-child {
        margin-top: 1.2em;
      }

      .xl\\\\:prose-xl > ul > li > *:last-child {
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl > ol > li > *:first-child {
        margin-top: 1.2em;
      }

      .xl\\\\:prose-xl > ol > li > *:last-child {
        margin-bottom: 1.2em;
      }

      .xl\\\\:prose-xl ul ul, .xl\\\\:prose-xl ul ol, .xl\\\\:prose-xl ol ul, .xl\\\\:prose-xl ol ol {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .xl\\\\:prose-xl hr {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .xl\\\\:prose-xl hr + * {
        margin-top: 0;
      }

      .xl\\\\:prose-xl h2 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-xl h3 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-xl h4 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-xl table {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .xl\\\\:prose-xl thead th {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .xl\\\\:prose-xl thead th:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-xl thead th:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-xl tbody td {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .xl\\\\:prose-xl tbody td:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-xl tbody td:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-xl > :first-child {
        margin-top: 0;
      }

      .xl\\\\:prose-xl > :last-child {
        margin-bottom: 0;
      }

      .xl\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .xl\\\\:prose-2xl p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl [class~=\\"lead\\"] {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .xl\\\\:prose-2xl blockquote {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .xl\\\\:prose-2xl h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .xl\\\\:prose-2xl h2 {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .xl\\\\:prose-2xl h3 {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .xl\\\\:prose-2xl h4 {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .xl\\\\:prose-2xl img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-2xl video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-2xl figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .xl\\\\:prose-2xl figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .xl\\\\:prose-2xl figure figcaption {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .xl\\\\:prose-2xl code {
        font-size: 0.8333333em;
      }

      .xl\\\\:prose-2xl h2 code {
        font-size: 0.875em;
      }

      .xl\\\\:prose-2xl h3 code {
        font-size: 0.8888889em;
      }

      .xl\\\\:prose-2xl pre {
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

      .xl\\\\:prose-2xl ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .xl\\\\:prose-2xl ol > li {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-2xl ol > li::before {
        left: 0;
      }

      .xl\\\\:prose-2xl ul > li {
        padding-left: 1.6666667em;
      }

      .xl\\\\:prose-2xl ul > li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .xl\\\\:prose-2xl > ul > li p {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .xl\\\\:prose-2xl > ul > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-2xl > ul > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl > ol > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .xl\\\\:prose-2xl > ol > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .xl\\\\:prose-2xl ul ul, .xl\\\\:prose-2xl ul ol, .xl\\\\:prose-2xl ol ul, .xl\\\\:prose-2xl ol ol {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .xl\\\\:prose-2xl hr {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .xl\\\\:prose-2xl hr + * {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl h2 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl h3 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl h4 + * {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl table {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .xl\\\\:prose-2xl thead th {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .xl\\\\:prose-2xl thead th:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-2xl thead th:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-2xl tbody td {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .xl\\\\:prose-2xl tbody td:first-child {
        padding-left: 0;
      }

      .xl\\\\:prose-2xl tbody td:last-child {
        padding-right: 0;
      }

      .xl\\\\:prose-2xl > :first-child {
        margin-top: 0;
      }

      .xl\\\\:prose-2xl > :last-child {
        margin-bottom: 0;
      }

      .xl\\\\:prose-red a {
        color: #dc2626;
      }

      .xl\\\\:prose-red a code {
        color: #dc2626;
      }

      .xl\\\\:prose-yellow a {
        color: #d97706;
      }

      .xl\\\\:prose-yellow a code {
        color: #d97706;
      }

      .xl\\\\:prose-green a {
        color: #059669;
      }

      .xl\\\\:prose-green a code {
        color: #059669;
      }

      .xl\\\\:prose-blue a {
        color: #2563eb;
      }

      .xl\\\\:prose-blue a code {
        color: #2563eb;
      }

      .xl\\\\:prose-indigo a {
        color: #4f46e5;
      }

      .xl\\\\:prose-indigo a code {
        color: #4f46e5;
      }

      .xl\\\\:prose-purple a {
        color: #7c3aed;
      }

      .xl\\\\:prose-purple a code {
        color: #7c3aed;
      }

      .xl\\\\:prose-pink a {
        color: #db2777;
      }

      .xl\\\\:prose-pink a code {
        color: #db2777;
      }
    }

    @media (min-width: 1536px) {
      .\\\\32xl\\\\:prose {
        color: #374151;
        max-width: 65ch;
      }

      .\\\\32xl\\\\:prose [class~=\\"lead\\"] {
        color: #4b5563;
        font-size: 1.25em;
        line-height: 1.6;
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose a {
        color: #111827;
        text-decoration: underline;
        font-weight: 500;
      }

      .\\\\32xl\\\\:prose strong {
        color: #111827;
        font-weight: 600;
      }

      .\\\\32xl\\\\:prose ol {
        counter-reset: list-counter;
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose ol > li {
        position: relative;
        counter-increment: list-counter;
        padding-left: 1.75em;
      }

      .\\\\32xl\\\\:prose ol > li::before {
        content: counter(list-counter) \\".\\";
        position: absolute;
        font-weight: 400;
        color: #6b7280;
        left: 0;
      }

      .\\\\32xl\\\\:prose ul > li {
        position: relative;
        padding-left: 1.75em;
      }

      .\\\\32xl\\\\:prose ul > li::before {
        content: \\"\\";
        position: absolute;
        background-color: #d1d5db;
        border-radius: 50%;
        width: 0.375em;
        height: 0.375em;
        top: calc(0.875em - 0.1875em);
        left: 0.25em;
      }

      .\\\\32xl\\\\:prose hr {
        border-color: #e5e7eb;
        border-top-width: 1px;
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .\\\\32xl\\\\:prose blockquote {
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

      .\\\\32xl\\\\:prose blockquote p:first-of-type::before {
        content: open-quote;
      }

      .\\\\32xl\\\\:prose blockquote p:last-of-type::after {
        content: close-quote;
      }

      .\\\\32xl\\\\:prose h1 {
        color: #111827;
        font-weight: 800;
        font-size: 2.25em;
        margin-top: 0;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .\\\\32xl\\\\:prose h2 {
        color: #111827;
        font-weight: 700;
        font-size: 1.5em;
        margin-top: 2em;
        margin-bottom: 1em;
        line-height: 1.3333333;
      }

      .\\\\32xl\\\\:prose h3 {
        color: #111827;
        font-weight: 600;
        font-size: 1.25em;
        margin-top: 1.6em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .\\\\32xl\\\\:prose h4 {
        color: #111827;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose figure figcaption {
        color: #6b7280;
        font-size: 0.875em;
        line-height: 1.4285714;
        margin-top: 0.8571429em;
      }

      .\\\\32xl\\\\:prose code {
        color: #111827;
        font-weight: 600;
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose code::before {
        content: \\"\`\\";
      }

      .\\\\32xl\\\\:prose code::after {
        content: \\"\`\\";
      }

      .\\\\32xl\\\\:prose a code {
        color: #111827;
      }

      .\\\\32xl\\\\:prose pre {
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

      .\\\\32xl\\\\:prose pre code {
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

      .\\\\32xl\\\\:prose pre code::before {
        content: \\"\\";
      }

      .\\\\32xl\\\\:prose pre code::after {
        content: \\"\\";
      }

      .\\\\32xl\\\\:prose table {
        width: 100%;
        table-layout: auto;
        text-align: left;
        margin-top: 2em;
        margin-bottom: 2em;
        font-size: 0.875em;
        line-height: 1.7142857;
      }

      .\\\\32xl\\\\:prose thead {
        color: #111827;
        font-weight: 600;
        border-bottom-width: 1px;
        border-bottom-color: #d1d5db;
      }

      .\\\\32xl\\\\:prose thead th {
        vertical-align: bottom;
        padding-right: 0.5714286em;
        padding-bottom: 0.5714286em;
        padding-left: 0.5714286em;
      }

      .\\\\32xl\\\\:prose tbody tr {
        border-bottom-width: 1px;
        border-bottom-color: #e5e7eb;
      }

      .\\\\32xl\\\\:prose tbody tr:last-child {
        border-bottom-width: 0;
      }

      .\\\\32xl\\\\:prose tbody td {
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

      .\\\\32xl\\\\:prose p {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose h2 code {
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose h3 code {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose ul {
        margin-top: 1.25em;
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .\\\\32xl\\\\:prose > ul > li p {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .\\\\32xl\\\\:prose > ul > li > *:first-child {
        margin-top: 1.25em;
      }

      .\\\\32xl\\\\:prose > ul > li > *:last-child {
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose > ol > li > *:first-child {
        margin-top: 1.25em;
      }

      .\\\\32xl\\\\:prose > ol > li > *:last-child {
        margin-bottom: 1.25em;
      }

      .\\\\32xl\\\\:prose ul ul, .\\\\32xl\\\\:prose ul ol, .\\\\32xl\\\\:prose ol ul, .\\\\32xl\\\\:prose ol ol {
        margin-top: 0.75em;
        margin-bottom: 0.75em;
      }

      .\\\\32xl\\\\:prose hr + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose h2 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose h3 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose h4 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose thead th:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose thead th:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose tbody td:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose tbody td:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose > :first-child {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose > :last-child {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-sm {
        font-size: 0.875rem;
        line-height: 1.7142857;
      }

      .\\\\32xl\\\\:prose-sm p {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm [class~=\\"lead\\"] {
        font-size: 1.2857143em;
        line-height: 1.5555556;
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-sm blockquote {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
        padding-left: 1.1111111em;
      }

      .\\\\32xl\\\\:prose-sm h1 {
        font-size: 2.1428571em;
        margin-top: 0;
        margin-bottom: 0.8em;
        line-height: 1.2;
      }

      .\\\\32xl\\\\:prose-sm h2 {
        font-size: 1.4285714em;
        margin-top: 1.6em;
        margin-bottom: 0.8em;
        line-height: 1.4;
      }

      .\\\\32xl\\\\:prose-sm h3 {
        font-size: 1.2857143em;
        margin-top: 1.5555556em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .\\\\32xl\\\\:prose-sm h4 {
        margin-top: 1.4285714em;
        margin-bottom: 0.5714286em;
        line-height: 1.4285714;
      }

      .\\\\32xl\\\\:prose-sm img {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .\\\\32xl\\\\:prose-sm video {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .\\\\32xl\\\\:prose-sm figure {
        margin-top: 1.7142857em;
        margin-bottom: 1.7142857em;
      }

      .\\\\32xl\\\\:prose-sm figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-sm figure figcaption {
        font-size: 0.8571429em;
        line-height: 1.3333333;
        margin-top: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-sm code {
        font-size: 0.8571429em;
      }

      .\\\\32xl\\\\:prose-sm h2 code {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose-sm h3 code {
        font-size: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-sm pre {
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

      .\\\\32xl\\\\:prose-sm ol {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm ul {
        margin-top: 1.1428571em;
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm li {
        margin-top: 0.2857143em;
        margin-bottom: 0.2857143em;
      }

      .\\\\32xl\\\\:prose-sm ol > li {
        padding-left: 1.5714286em;
      }

      .\\\\32xl\\\\:prose-sm ol > li::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-sm ul > li {
        padding-left: 1.5714286em;
      }

      .\\\\32xl\\\\:prose-sm ul > li::before {
        height: 0.3571429em;
        width: 0.3571429em;
        top: calc(0.8571429em - 0.1785714em);
        left: 0.2142857em;
      }

      .\\\\32xl\\\\:prose-sm > ul > li p {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .\\\\32xl\\\\:prose-sm > ul > li > *:first-child {
        margin-top: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm > ul > li > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm > ol > li > *:first-child {
        margin-top: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm > ol > li > *:last-child {
        margin-bottom: 1.1428571em;
      }

      .\\\\32xl\\\\:prose-sm ul ul, .\\\\32xl\\\\:prose-sm ul ol, .\\\\32xl\\\\:prose-sm ol ul, .\\\\32xl\\\\:prose-sm ol ol {
        margin-top: 0.5714286em;
        margin-bottom: 0.5714286em;
      }

      .\\\\32xl\\\\:prose-sm hr {
        margin-top: 2.8571429em;
        margin-bottom: 2.8571429em;
      }

      .\\\\32xl\\\\:prose-sm hr + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm h2 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm h3 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm h4 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm table {
        font-size: 0.8571429em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-sm thead th {
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-sm thead th:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-sm thead th:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-sm tbody td {
        padding-top: 0.6666667em;
        padding-right: 1em;
        padding-bottom: 0.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-sm tbody td:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-sm tbody td:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-sm > :first-child {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-sm > :last-child {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-lg {
        font-size: 1.125rem;
        line-height: 1.7777778;
      }

      .\\\\32xl\\\\:prose-lg p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg [class~=\\"lead\\"] {
        font-size: 1.2222222em;
        line-height: 1.4545455;
        margin-top: 1.0909091em;
        margin-bottom: 1.0909091em;
      }

      .\\\\32xl\\\\:prose-lg blockquote {
        margin-top: 1.6666667em;
        margin-bottom: 1.6666667em;
        padding-left: 1em;
      }

      .\\\\32xl\\\\:prose-lg h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.8333333em;
        line-height: 1;
      }

      .\\\\32xl\\\\:prose-lg h2 {
        font-size: 1.6666667em;
        margin-top: 1.8666667em;
        margin-bottom: 1.0666667em;
        line-height: 1.3333333;
      }

      .\\\\32xl\\\\:prose-lg h3 {
        font-size: 1.3333333em;
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-lg h4 {
        margin-top: 1.7777778em;
        margin-bottom: 0.4444444em;
        line-height: 1.5555556;
      }

      .\\\\32xl\\\\:prose-lg img {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .\\\\32xl\\\\:prose-lg video {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .\\\\32xl\\\\:prose-lg figure {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
      }

      .\\\\32xl\\\\:prose-lg figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-lg figure figcaption {
        font-size: 0.8888889em;
        line-height: 1.5;
        margin-top: 1em;
      }

      .\\\\32xl\\\\:prose-lg code {
        font-size: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-lg h2 code {
        font-size: 0.8666667em;
      }

      .\\\\32xl\\\\:prose-lg h3 code {
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose-lg pre {
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

      .\\\\32xl\\\\:prose-lg ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg li {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-lg ol > li {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-lg ol > li::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-lg ul > li {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-lg ul > li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8888889em - 0.1666667em);
        left: 0.2222222em;
      }

      .\\\\32xl\\\\:prose-lg > ul > li p {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-lg > ul > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg > ul > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg > ol > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg > ol > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-lg ul ul, .\\\\32xl\\\\:prose-lg ul ol, .\\\\32xl\\\\:prose-lg ol ul, .\\\\32xl\\\\:prose-lg ol ol {
        margin-top: 0.8888889em;
        margin-bottom: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-lg hr {
        margin-top: 3.1111111em;
        margin-bottom: 3.1111111em;
      }

      .\\\\32xl\\\\:prose-lg hr + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg h2 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg h3 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg h4 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg table {
        font-size: 0.8888889em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-lg thead th {
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .\\\\32xl\\\\:prose-lg thead th:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-lg thead th:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-lg tbody td {
        padding-top: 0.75em;
        padding-right: 0.75em;
        padding-bottom: 0.75em;
        padding-left: 0.75em;
      }

      .\\\\32xl\\\\:prose-lg tbody td:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-lg tbody td:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-lg > :first-child {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-lg > :last-child {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-xl {
        font-size: 1.25rem;
        line-height: 1.8;
      }

      .\\\\32xl\\\\:prose-xl p {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl [class~=\\"lead\\"] {
        font-size: 1.2em;
        line-height: 1.5;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      .\\\\32xl\\\\:prose-xl blockquote {
        margin-top: 1.6em;
        margin-bottom: 1.6em;
        padding-left: 1.0666667em;
      }

      .\\\\32xl\\\\:prose-xl h1 {
        font-size: 2.8em;
        margin-top: 0;
        margin-bottom: 0.8571429em;
        line-height: 1;
      }

      .\\\\32xl\\\\:prose-xl h2 {
        font-size: 1.8em;
        margin-top: 1.5555556em;
        margin-bottom: 0.8888889em;
        line-height: 1.1111111;
      }

      .\\\\32xl\\\\:prose-xl h3 {
        font-size: 1.5em;
        margin-top: 1.6em;
        margin-bottom: 0.6666667em;
        line-height: 1.3333333;
      }

      .\\\\32xl\\\\:prose-xl h4 {
        margin-top: 1.8em;
        margin-bottom: 0.6em;
        line-height: 1.6;
      }

      .\\\\32xl\\\\:prose-xl img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-xl video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-xl figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-xl figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-xl figure figcaption {
        font-size: 0.9em;
        line-height: 1.5555556;
        margin-top: 1em;
      }

      .\\\\32xl\\\\:prose-xl code {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose-xl h2 code {
        font-size: 0.8611111em;
      }

      .\\\\32xl\\\\:prose-xl h3 code {
        font-size: 0.9em;
      }

      .\\\\32xl\\\\:prose-xl pre {
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

      .\\\\32xl\\\\:prose-xl ol {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl ul {
        margin-top: 1.2em;
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl li {
        margin-top: 0.6em;
        margin-bottom: 0.6em;
      }

      .\\\\32xl\\\\:prose-xl ol > li {
        padding-left: 1.8em;
      }

      .\\\\32xl\\\\:prose-xl ol > li::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-xl ul > li {
        padding-left: 1.8em;
      }

      .\\\\32xl\\\\:prose-xl ul > li::before {
        width: 0.35em;
        height: 0.35em;
        top: calc(0.9em - 0.175em);
        left: 0.25em;
      }

      .\\\\32xl\\\\:prose-xl > ul > li p {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .\\\\32xl\\\\:prose-xl > ul > li > *:first-child {
        margin-top: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl > ul > li > *:last-child {
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl > ol > li > *:first-child {
        margin-top: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl > ol > li > *:last-child {
        margin-bottom: 1.2em;
      }

      .\\\\32xl\\\\:prose-xl ul ul, .\\\\32xl\\\\:prose-xl ul ol, .\\\\32xl\\\\:prose-xl ol ul, .\\\\32xl\\\\:prose-xl ol ol {
        margin-top: 0.8em;
        margin-bottom: 0.8em;
      }

      .\\\\32xl\\\\:prose-xl hr {
        margin-top: 2.8em;
        margin-bottom: 2.8em;
      }

      .\\\\32xl\\\\:prose-xl hr + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl h2 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl h3 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl h4 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl table {
        font-size: 0.9em;
        line-height: 1.5555556;
      }

      .\\\\32xl\\\\:prose-xl thead th {
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-xl thead th:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-xl thead th:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-xl tbody td {
        padding-top: 0.8888889em;
        padding-right: 0.6666667em;
        padding-bottom: 0.8888889em;
        padding-left: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-xl tbody td:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-xl tbody td:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-xl > :first-child {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-xl > :last-child {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-2xl {
        font-size: 1.5rem;
        line-height: 1.6666667;
      }

      .\\\\32xl\\\\:prose-2xl p {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl [class~=\\"lead\\"] {
        font-size: 1.25em;
        line-height: 1.4666667;
        margin-top: 1.0666667em;
        margin-bottom: 1.0666667em;
      }

      .\\\\32xl\\\\:prose-2xl blockquote {
        margin-top: 1.7777778em;
        margin-bottom: 1.7777778em;
        padding-left: 1.1111111em;
      }

      .\\\\32xl\\\\:prose-2xl h1 {
        font-size: 2.6666667em;
        margin-top: 0;
        margin-bottom: 0.875em;
        line-height: 1;
      }

      .\\\\32xl\\\\:prose-2xl h2 {
        font-size: 2em;
        margin-top: 1.5em;
        margin-bottom: 0.8333333em;
        line-height: 1.0833333;
      }

      .\\\\32xl\\\\:prose-2xl h3 {
        font-size: 1.5em;
        margin-top: 1.5555556em;
        margin-bottom: 0.6666667em;
        line-height: 1.2222222;
      }

      .\\\\32xl\\\\:prose-2xl h4 {
        margin-top: 1.6666667em;
        margin-bottom: 0.6666667em;
        line-height: 1.5;
      }

      .\\\\32xl\\\\:prose-2xl img {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-2xl video {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-2xl figure {
        margin-top: 2em;
        margin-bottom: 2em;
      }

      .\\\\32xl\\\\:prose-2xl figure > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-2xl figure figcaption {
        font-size: 0.8333333em;
        line-height: 1.6;
        margin-top: 1em;
      }

      .\\\\32xl\\\\:prose-2xl code {
        font-size: 0.8333333em;
      }

      .\\\\32xl\\\\:prose-2xl h2 code {
        font-size: 0.875em;
      }

      .\\\\32xl\\\\:prose-2xl h3 code {
        font-size: 0.8888889em;
      }

      .\\\\32xl\\\\:prose-2xl pre {
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

      .\\\\32xl\\\\:prose-2xl ol {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl ul {
        margin-top: 1.3333333em;
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl li {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      .\\\\32xl\\\\:prose-2xl ol > li {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-2xl ol > li::before {
        left: 0;
      }

      .\\\\32xl\\\\:prose-2xl ul > li {
        padding-left: 1.6666667em;
      }

      .\\\\32xl\\\\:prose-2xl ul > li::before {
        width: 0.3333333em;
        height: 0.3333333em;
        top: calc(0.8333333em - 0.1666667em);
        left: 0.25em;
      }

      .\\\\32xl\\\\:prose-2xl > ul > li p {
        margin-top: 0.8333333em;
        margin-bottom: 0.8333333em;
      }

      .\\\\32xl\\\\:prose-2xl > ul > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl > ul > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl > ol > li > *:first-child {
        margin-top: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl > ol > li > *:last-child {
        margin-bottom: 1.3333333em;
      }

      .\\\\32xl\\\\:prose-2xl ul ul, .\\\\32xl\\\\:prose-2xl ul ol, .\\\\32xl\\\\:prose-2xl ol ul, .\\\\32xl\\\\:prose-2xl ol ol {
        margin-top: 0.6666667em;
        margin-bottom: 0.6666667em;
      }

      .\\\\32xl\\\\:prose-2xl hr {
        margin-top: 3em;
        margin-bottom: 3em;
      }

      .\\\\32xl\\\\:prose-2xl hr + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl h2 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl h3 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl h4 + * {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl table {
        font-size: 0.8333333em;
        line-height: 1.4;
      }

      .\\\\32xl\\\\:prose-2xl thead th {
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .\\\\32xl\\\\:prose-2xl thead th:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-2xl thead th:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-2xl tbody td {
        padding-top: 0.8em;
        padding-right: 0.6em;
        padding-bottom: 0.8em;
        padding-left: 0.6em;
      }

      .\\\\32xl\\\\:prose-2xl tbody td:first-child {
        padding-left: 0;
      }

      .\\\\32xl\\\\:prose-2xl tbody td:last-child {
        padding-right: 0;
      }

      .\\\\32xl\\\\:prose-2xl > :first-child {
        margin-top: 0;
      }

      .\\\\32xl\\\\:prose-2xl > :last-child {
        margin-bottom: 0;
      }

      .\\\\32xl\\\\:prose-red a {
        color: #dc2626;
      }

      .\\\\32xl\\\\:prose-red a code {
        color: #dc2626;
      }

      .\\\\32xl\\\\:prose-yellow a {
        color: #d97706;
      }

      .\\\\32xl\\\\:prose-yellow a code {
        color: #d97706;
      }

      .\\\\32xl\\\\:prose-green a {
        color: #059669;
      }

      .\\\\32xl\\\\:prose-green a code {
        color: #059669;
      }

      .\\\\32xl\\\\:prose-blue a {
        color: #2563eb;
      }

      .\\\\32xl\\\\:prose-blue a code {
        color: #2563eb;
      }

      .\\\\32xl\\\\:prose-indigo a {
        color: #4f46e5;
      }

      .\\\\32xl\\\\:prose-indigo a code {
        color: #4f46e5;
      }

      .\\\\32xl\\\\:prose-purple a {
        color: #7c3aed;
      }

      .\\\\32xl\\\\:prose-purple a code {
        color: #7c3aed;
      }

      .\\\\32xl\\\\:prose-pink a {
        color: #db2777;
      }

      .\\\\32xl\\\\:prose-pink a code {
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

      - .prose [class~='lead'] {
      + .markdown [class~='lead'] {

      ---

      - .prose a {
      + .markdown a {

      ---

      - .prose strong {
      + .markdown strong {

      ---

      - .prose ol {
      + .markdown ol {

      ---

      - .prose ol > li {
      + .markdown ol > li {

      ---

      - .prose ol > li::before {
      + .markdown ol > li::before {

      ---

      - .prose ul > li {
      + .markdown ul > li {

      ---

      - .prose ul > li::before {
      + .markdown ul > li::before {

      ---

      - .prose hr {
      + .markdown hr {

      ---

      - .prose blockquote {
      + .markdown blockquote {

      ---

      - .prose blockquote p:first-of-type::before {
      + .markdown blockquote p:first-of-type::before {

      ---

      - .prose blockquote p:last-of-type::after {
      + .markdown blockquote p:last-of-type::after {

      ---

      - .prose h1 {
      + .markdown h1 {

      ---

      - .prose h2 {
      + .markdown h2 {

      ---

      - .prose h3 {
      + .markdown h3 {

      ---

      - .prose h4 {
      + .markdown h4 {

      ---

      - .prose figure figcaption {
      + .markdown figure figcaption {

      ---

      - .prose code {
      + .markdown code {

      ---

      - .prose code::before {
      + .markdown code::before {

      ---

      - .prose code::after {
      + .markdown code::after {

      ---

      - .prose a code {
      + .markdown a code {

      ---

      - .prose pre {
      + .markdown pre {

      ---

      - .prose pre code {
      + .markdown pre code {

      ---

      - .prose pre code::before {
      + .markdown pre code::before {

      ---

      - .prose pre code::after {
      + .markdown pre code::after {

      ---

      - .prose table {
      + .markdown table {

      ---

      - .prose thead {
      + .markdown thead {

      ---

      - .prose thead th {
      + .markdown thead th {

      ---

      - .prose tbody tr {
      + .markdown tbody tr {

      ---

      - .prose tbody tr:last-child {
      + .markdown tbody tr:last-child {

      ---

      - .prose tbody td {
      + .markdown tbody td {

      ---

      - .prose {
      + .markdown {

      ---

      - .prose p {
      + .markdown p {

      ---

      - .prose img {
      + .markdown img {

      ---

      - .prose video {
      + .markdown video {

      ---

      - .prose figure {
      + .markdown figure {

      ---

      - .prose figure > * {
      + .markdown figure > * {

      ---

      - .prose h2 code {
      + .markdown h2 code {

      ---

      - .prose h3 code {
      + .markdown h3 code {

      ---

      - .prose ul {
      + .markdown ul {

      ---

      - .prose li {
      + .markdown li {

      ---

      - .prose > ul > li p {
      + .markdown > ul > li p {

      ---

      - .prose > ul > li > *:first-child {
      + .markdown > ul > li > *:first-child {

      ---

      - .prose > ul > li > *:last-child {
      + .markdown > ul > li > *:last-child {

      ---

      - .prose > ol > li > *:first-child {
      + .markdown > ol > li > *:first-child {

      ---

      - .prose > ol > li > *:last-child {
      + .markdown > ol > li > *:last-child {

      ---

      - .prose ul ul, .prose ul ol, .prose ol ul, .prose ol ol {
      + .markdown ul ul, .markdown ul ol, .markdown ol ul, .markdown ol ol {

      ---

      - .prose hr + * {
      + .markdown hr + * {

      ---

      - .prose h2 + * {
      + .markdown h2 + * {

      ---

      - .prose h3 + * {
      + .markdown h3 + * {

      ---

      - .prose h4 + * {
      + .markdown h4 + * {

      ---

      - .prose thead th:first-child {
      + .markdown thead th:first-child {

      ---

      - .prose thead th:last-child {
      + .markdown thead th:last-child {

      ---

      - .prose tbody td:first-child {
      + .markdown tbody td:first-child {

      ---

      - .prose tbody td:last-child {
      + .markdown tbody td:last-child {

      ---

      - .prose > :first-child {
      + .markdown > :first-child {

      ---

      - .prose > :last-child {
      + .markdown > :last-child {

      ---

      - .prose-sm {
      + .markdown-sm {

      ---

      - .prose-sm p {
      + .markdown-sm p {

      ---

      - .prose-sm [class~='lead'] {
      + .markdown-sm [class~='lead'] {

      ---

      - .prose-sm blockquote {
      + .markdown-sm blockquote {

      ---

      - .prose-sm h1 {
      + .markdown-sm h1 {

      ---

      - .prose-sm h2 {
      + .markdown-sm h2 {

      ---

      - .prose-sm h3 {
      + .markdown-sm h3 {

      ---

      - .prose-sm h4 {
      + .markdown-sm h4 {

      ---

      - .prose-sm img {
      + .markdown-sm img {

      ---

      - .prose-sm video {
      + .markdown-sm video {

      ---

      - .prose-sm figure {
      + .markdown-sm figure {

      ---

      - .prose-sm figure > * {
      + .markdown-sm figure > * {

      ---

      - .prose-sm figure figcaption {
      + .markdown-sm figure figcaption {

      ---

      - .prose-sm code {
      + .markdown-sm code {

      ---

      - .prose-sm h2 code {
      + .markdown-sm h2 code {

      ---

      - .prose-sm h3 code {
      + .markdown-sm h3 code {

      ---

      - .prose-sm pre {
      + .markdown-sm pre {

      ---

      - .prose-sm ol {
      + .markdown-sm ol {

      ---

      - .prose-sm ul {
      + .markdown-sm ul {

      ---

      - .prose-sm li {
      + .markdown-sm li {

      ---

      - .prose-sm ol > li {
      + .markdown-sm ol > li {

      ---

      - .prose-sm ol > li::before {
      + .markdown-sm ol > li::before {

      ---

      - .prose-sm ul > li {
      + .markdown-sm ul > li {

      ---

      - .prose-sm ul > li::before {
      + .markdown-sm ul > li::before {

      ---

      - .prose-sm > ul > li p {
      + .markdown-sm > ul > li p {

      ---

      - .prose-sm > ul > li > *:first-child {
      + .markdown-sm > ul > li > *:first-child {

      ---

      - .prose-sm > ul > li > *:last-child {
      + .markdown-sm > ul > li > *:last-child {

      ---

      - .prose-sm > ol > li > *:first-child {
      + .markdown-sm > ol > li > *:first-child {

      ---

      - .prose-sm > ol > li > *:last-child {
      + .markdown-sm > ol > li > *:last-child {

      ---

      - .prose-sm ul ul, .prose-sm ul ol, .prose-sm ol ul, .prose-sm ol ol {
      + .markdown-sm ul ul, .markdown-sm ul ol, .markdown-sm ol ul, .markdown-sm ol ol {

      ---

      - .prose-sm hr {
      + .markdown-sm hr {

      ---

      - .prose-sm hr + * {
      + .markdown-sm hr + * {

      ---

      - .prose-sm h2 + * {
      + .markdown-sm h2 + * {

      ---

      - .prose-sm h3 + * {
      + .markdown-sm h3 + * {

      ---

      - .prose-sm h4 + * {
      + .markdown-sm h4 + * {

      ---

      - .prose-sm table {
      + .markdown-sm table {

      ---

      - .prose-sm thead th {
      + .markdown-sm thead th {

      ---

      - .prose-sm thead th:first-child {
      + .markdown-sm thead th:first-child {

      ---

      - .prose-sm thead th:last-child {
      + .markdown-sm thead th:last-child {

      ---

      - .prose-sm tbody td {
      + .markdown-sm tbody td {

      ---

      - .prose-sm tbody td:first-child {
      + .markdown-sm tbody td:first-child {

      ---

      - .prose-sm tbody td:last-child {
      + .markdown-sm tbody td:last-child {

      ---

      - .prose-sm > :first-child {
      + .markdown-sm > :first-child {

      ---

      - .prose-sm > :last-child {
      + .markdown-sm > :last-child {

      ---

      - .prose-lg {
      + .markdown-lg {

      ---

      - .prose-lg p {
      + .markdown-lg p {

      ---

      - .prose-lg [class~='lead'] {
      + .markdown-lg [class~='lead'] {

      ---

      - .prose-lg blockquote {
      + .markdown-lg blockquote {

      ---

      - .prose-lg h1 {
      + .markdown-lg h1 {

      ---

      - .prose-lg h2 {
      + .markdown-lg h2 {

      ---

      - .prose-lg h3 {
      + .markdown-lg h3 {

      ---

      - .prose-lg h4 {
      + .markdown-lg h4 {

      ---

      - .prose-lg img {
      + .markdown-lg img {

      ---

      - .prose-lg video {
      + .markdown-lg video {

      ---

      - .prose-lg figure {
      + .markdown-lg figure {

      ---

      - .prose-lg figure > * {
      + .markdown-lg figure > * {

      ---

      - .prose-lg figure figcaption {
      + .markdown-lg figure figcaption {

      ---

      - .prose-lg code {
      + .markdown-lg code {

      ---

      - .prose-lg h2 code {
      + .markdown-lg h2 code {

      ---

      - .prose-lg h3 code {
      + .markdown-lg h3 code {

      ---

      - .prose-lg pre {
      + .markdown-lg pre {

      ---

      - .prose-lg ol {
      + .markdown-lg ol {

      ---

      - .prose-lg ul {
      + .markdown-lg ul {

      ---

      - .prose-lg li {
      + .markdown-lg li {

      ---

      - .prose-lg ol > li {
      + .markdown-lg ol > li {

      ---

      - .prose-lg ol > li::before {
      + .markdown-lg ol > li::before {

      ---

      - .prose-lg ul > li {
      + .markdown-lg ul > li {

      ---

      - .prose-lg ul > li::before {
      + .markdown-lg ul > li::before {

      ---

      - .prose-lg > ul > li p {
      + .markdown-lg > ul > li p {

      ---

      - .prose-lg > ul > li > *:first-child {
      + .markdown-lg > ul > li > *:first-child {

      ---

      - .prose-lg > ul > li > *:last-child {
      + .markdown-lg > ul > li > *:last-child {

      ---

      - .prose-lg > ol > li > *:first-child {
      + .markdown-lg > ol > li > *:first-child {

      ---

      - .prose-lg > ol > li > *:last-child {
      + .markdown-lg > ol > li > *:last-child {

      ---

      - .prose-lg ul ul, .prose-lg ul ol, .prose-lg ol ul, .prose-lg ol ol {
      + .markdown-lg ul ul, .markdown-lg ul ol, .markdown-lg ol ul, .markdown-lg ol ol {

      ---

      - .prose-lg hr {
      + .markdown-lg hr {

      ---

      - .prose-lg hr + * {
      + .markdown-lg hr + * {

      ---

      - .prose-lg h2 + * {
      + .markdown-lg h2 + * {

      ---

      - .prose-lg h3 + * {
      + .markdown-lg h3 + * {

      ---

      - .prose-lg h4 + * {
      + .markdown-lg h4 + * {

      ---

      - .prose-lg table {
      + .markdown-lg table {

      ---

      - .prose-lg thead th {
      + .markdown-lg thead th {

      ---

      - .prose-lg thead th:first-child {
      + .markdown-lg thead th:first-child {

      ---

      - .prose-lg thead th:last-child {
      + .markdown-lg thead th:last-child {

      ---

      - .prose-lg tbody td {
      + .markdown-lg tbody td {

      ---

      - .prose-lg tbody td:first-child {
      + .markdown-lg tbody td:first-child {

      ---

      - .prose-lg tbody td:last-child {
      + .markdown-lg tbody td:last-child {

      ---

      - .prose-lg > :first-child {
      + .markdown-lg > :first-child {

      ---

      - .prose-lg > :last-child {
      + .markdown-lg > :last-child {

      ---

      - .prose-xl {
      + .markdown-xl {

      ---

      - .prose-xl p {
      + .markdown-xl p {

      ---

      - .prose-xl [class~='lead'] {
      + .markdown-xl [class~='lead'] {

      ---

      - .prose-xl blockquote {
      + .markdown-xl blockquote {

      ---

      - .prose-xl h1 {
      + .markdown-xl h1 {

      ---

      - .prose-xl h2 {
      + .markdown-xl h2 {

      ---

      - .prose-xl h3 {
      + .markdown-xl h3 {

      ---

      - .prose-xl h4 {
      + .markdown-xl h4 {

      ---

      - .prose-xl img {
      + .markdown-xl img {

      ---

      - .prose-xl video {
      + .markdown-xl video {

      ---

      - .prose-xl figure {
      + .markdown-xl figure {

      ---

      - .prose-xl figure > * {
      + .markdown-xl figure > * {

      ---

      - .prose-xl figure figcaption {
      + .markdown-xl figure figcaption {

      ---

      - .prose-xl code {
      + .markdown-xl code {

      ---

      - .prose-xl h2 code {
      + .markdown-xl h2 code {

      ---

      - .prose-xl h3 code {
      + .markdown-xl h3 code {

      ---

      - .prose-xl pre {
      + .markdown-xl pre {

      ---

      - .prose-xl ol {
      + .markdown-xl ol {

      ---

      - .prose-xl ul {
      + .markdown-xl ul {

      ---

      - .prose-xl li {
      + .markdown-xl li {

      ---

      - .prose-xl ol > li {
      + .markdown-xl ol > li {

      ---

      - .prose-xl ol > li::before {
      + .markdown-xl ol > li::before {

      ---

      - .prose-xl ul > li {
      + .markdown-xl ul > li {

      ---

      - .prose-xl ul > li::before {
      + .markdown-xl ul > li::before {

      ---

      - .prose-xl > ul > li p {
      + .markdown-xl > ul > li p {

      ---

      - .prose-xl > ul > li > *:first-child {
      + .markdown-xl > ul > li > *:first-child {

      ---

      - .prose-xl > ul > li > *:last-child {
      + .markdown-xl > ul > li > *:last-child {

      ---

      - .prose-xl > ol > li > *:first-child {
      + .markdown-xl > ol > li > *:first-child {

      ---

      - .prose-xl > ol > li > *:last-child {
      + .markdown-xl > ol > li > *:last-child {

      ---

      - .prose-xl ul ul, .prose-xl ul ol, .prose-xl ol ul, .prose-xl ol ol {
      + .markdown-xl ul ul, .markdown-xl ul ol, .markdown-xl ol ul, .markdown-xl ol ol {

      ---

      - .prose-xl hr {
      + .markdown-xl hr {

      ---

      - .prose-xl hr + * {
      + .markdown-xl hr + * {

      ---

      - .prose-xl h2 + * {
      + .markdown-xl h2 + * {

      ---

      - .prose-xl h3 + * {
      + .markdown-xl h3 + * {

      ---

      - .prose-xl h4 + * {
      + .markdown-xl h4 + * {

      ---

      - .prose-xl table {
      + .markdown-xl table {

      ---

      - .prose-xl thead th {
      + .markdown-xl thead th {

      ---

      - .prose-xl thead th:first-child {
      + .markdown-xl thead th:first-child {

      ---

      - .prose-xl thead th:last-child {
      + .markdown-xl thead th:last-child {

      ---

      - .prose-xl tbody td {
      + .markdown-xl tbody td {

      ---

      - .prose-xl tbody td:first-child {
      + .markdown-xl tbody td:first-child {

      ---

      - .prose-xl tbody td:last-child {
      + .markdown-xl tbody td:last-child {

      ---

      - .prose-xl > :first-child {
      + .markdown-xl > :first-child {

      ---

      - .prose-xl > :last-child {
      + .markdown-xl > :last-child {

      ---

      - .prose-2xl {
      + .markdown-2xl {

      ---

      - .prose-2xl p {
      + .markdown-2xl p {

      ---

      - .prose-2xl [class~='lead'] {
      + .markdown-2xl [class~='lead'] {

      ---

      - .prose-2xl blockquote {
      + .markdown-2xl blockquote {

      ---

      - .prose-2xl h1 {
      + .markdown-2xl h1 {

      ---

      - .prose-2xl h2 {
      + .markdown-2xl h2 {

      ---

      - .prose-2xl h3 {
      + .markdown-2xl h3 {

      ---

      - .prose-2xl h4 {
      + .markdown-2xl h4 {

      ---

      - .prose-2xl img {
      + .markdown-2xl img {

      ---

      - .prose-2xl video {
      + .markdown-2xl video {

      ---

      - .prose-2xl figure {
      + .markdown-2xl figure {

      ---

      - .prose-2xl figure > * {
      + .markdown-2xl figure > * {

      ---

      - .prose-2xl figure figcaption {
      + .markdown-2xl figure figcaption {

      ---

      - .prose-2xl code {
      + .markdown-2xl code {

      ---

      - .prose-2xl h2 code {
      + .markdown-2xl h2 code {

      ---

      - .prose-2xl h3 code {
      + .markdown-2xl h3 code {

      ---

      - .prose-2xl pre {
      + .markdown-2xl pre {

      ---

      - .prose-2xl ol {
      + .markdown-2xl ol {

      ---

      - .prose-2xl ul {
      + .markdown-2xl ul {

      ---

      - .prose-2xl li {
      + .markdown-2xl li {

      ---

      - .prose-2xl ol > li {
      + .markdown-2xl ol > li {

      ---

      - .prose-2xl ol > li::before {
      + .markdown-2xl ol > li::before {

      ---

      - .prose-2xl ul > li {
      + .markdown-2xl ul > li {

      ---

      - .prose-2xl ul > li::before {
      + .markdown-2xl ul > li::before {

      ---

      - .prose-2xl > ul > li p {
      + .markdown-2xl > ul > li p {

      ---

      - .prose-2xl > ul > li > *:first-child {
      + .markdown-2xl > ul > li > *:first-child {

      ---

      - .prose-2xl > ul > li > *:last-child {
      + .markdown-2xl > ul > li > *:last-child {

      ---

      - .prose-2xl > ol > li > *:first-child {
      + .markdown-2xl > ol > li > *:first-child {

      ---

      - .prose-2xl > ol > li > *:last-child {
      + .markdown-2xl > ol > li > *:last-child {

      ---

      - .prose-2xl ul ul, .prose-2xl ul ol, .prose-2xl ol ul, .prose-2xl ol ol {
      + .markdown-2xl ul ul, .markdown-2xl ul ol, .markdown-2xl ol ul, .markdown-2xl ol ol {

      ---

      - .prose-2xl hr {
      + .markdown-2xl hr {

      ---

      - .prose-2xl hr + * {
      + .markdown-2xl hr + * {

      ---

      - .prose-2xl h2 + * {
      + .markdown-2xl h2 + * {

      ---

      - .prose-2xl h3 + * {
      + .markdown-2xl h3 + * {

      ---

      - .prose-2xl h4 + * {
      + .markdown-2xl h4 + * {

      ---

      - .prose-2xl table {
      + .markdown-2xl table {

      ---

      - .prose-2xl thead th {
      + .markdown-2xl thead th {

      ---

      - .prose-2xl thead th:first-child {
      + .markdown-2xl thead th:first-child {

      ---

      - .prose-2xl thead th:last-child {
      + .markdown-2xl thead th:last-child {

      ---

      - .prose-2xl tbody td {
      + .markdown-2xl tbody td {

      ---

      - .prose-2xl tbody td:first-child {
      + .markdown-2xl tbody td:first-child {

      ---

      - .prose-2xl tbody td:last-child {
      + .markdown-2xl tbody td:last-child {

      ---

      - .prose-2xl > :first-child {
      + .markdown-2xl > :first-child {

      ---

      - .prose-2xl > :last-child {
      + .markdown-2xl > :last-child {

      ---

      - .prose-red a {
      + .markdown-red a {

      ---

      - .prose-red a code {
      + .markdown-red a code {

      ---

      - .prose-yellow a {
      + .markdown-yellow a {

      ---

      - .prose-yellow a code {
      + .markdown-yellow a code {

      ---

      - .prose-green a {
      + .markdown-green a {

      ---

      - .prose-green a code {
      + .markdown-green a code {

      ---

      - .prose-blue a {
      + .markdown-blue a {

      ---

      - .prose-blue a code {
      + .markdown-blue a code {

      ---

      - .prose-indigo a {
      + .markdown-indigo a {

      ---

      - .prose-indigo a code {
      + .markdown-indigo a code {

      ---

      - .prose-purple a {
      + .markdown-purple a {

      ---

      - .prose-purple a code {
      + .markdown-purple a code {

      ---

      - .prose-pink a {
      + .markdown-pink a {

      ---

      - .prose-pink a code {
      + .markdown-pink a code {

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose [class~='lead'] {
      +   .sm\\\\:markdown [class~='lead'] {

      ---

      -   .sm\\\\:prose a {
      +   .sm\\\\:markdown a {

      ---

      -   .sm\\\\:prose strong {
      +   .sm\\\\:markdown strong {

      ---

      -   .sm\\\\:prose ol {
      +   .sm\\\\:markdown ol {

      ---

      -   .sm\\\\:prose ol > li {
      +   .sm\\\\:markdown ol > li {

      ---

      -   .sm\\\\:prose ol > li::before {
      +   .sm\\\\:markdown ol > li::before {

      ---

      -   .sm\\\\:prose ul > li {
      +   .sm\\\\:markdown ul > li {

      ---

      -   .sm\\\\:prose ul > li::before {
      +   .sm\\\\:markdown ul > li::before {

      ---

      -   .sm\\\\:prose hr {
      +   .sm\\\\:markdown hr {

      ---

      -   .sm\\\\:prose blockquote {
      +   .sm\\\\:markdown blockquote {

      ---

      -   .sm\\\\:prose blockquote p:first-of-type::before {
      +   .sm\\\\:markdown blockquote p:first-of-type::before {

      ---

      -   .sm\\\\:prose blockquote p:last-of-type::after {
      +   .sm\\\\:markdown blockquote p:last-of-type::after {

      ---

      -   .sm\\\\:prose h1 {
      +   .sm\\\\:markdown h1 {

      ---

      -   .sm\\\\:prose h2 {
      +   .sm\\\\:markdown h2 {

      ---

      -   .sm\\\\:prose h3 {
      +   .sm\\\\:markdown h3 {

      ---

      -   .sm\\\\:prose h4 {
      +   .sm\\\\:markdown h4 {

      ---

      -   .sm\\\\:prose figure figcaption {
      +   .sm\\\\:markdown figure figcaption {

      ---

      -   .sm\\\\:prose code {
      +   .sm\\\\:markdown code {

      ---

      -   .sm\\\\:prose code::before {
      +   .sm\\\\:markdown code::before {

      ---

      -   .sm\\\\:prose code::after {
      +   .sm\\\\:markdown code::after {

      ---

      -   .sm\\\\:prose a code {
      +   .sm\\\\:markdown a code {

      ---

      -   .sm\\\\:prose pre {
      +   .sm\\\\:markdown pre {

      ---

      -   .sm\\\\:prose pre code {
      +   .sm\\\\:markdown pre code {

      ---

      -   .sm\\\\:prose pre code::before {
      +   .sm\\\\:markdown pre code::before {

      ---

      -   .sm\\\\:prose pre code::after {
      +   .sm\\\\:markdown pre code::after {

      ---

      -   .sm\\\\:prose table {
      +   .sm\\\\:markdown table {

      ---

      -   .sm\\\\:prose thead {
      +   .sm\\\\:markdown thead {

      ---

      -   .sm\\\\:prose thead th {
      +   .sm\\\\:markdown thead th {

      ---

      -   .sm\\\\:prose tbody tr {
      +   .sm\\\\:markdown tbody tr {

      ---

      -   .sm\\\\:prose tbody tr:last-child {
      +   .sm\\\\:markdown tbody tr:last-child {

      ---

      -   .sm\\\\:prose tbody td {
      +   .sm\\\\:markdown tbody td {

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose p {
      +   .sm\\\\:markdown p {

      ---

      -   .sm\\\\:prose img {
      +   .sm\\\\:markdown img {

      ---

      -   .sm\\\\:prose video {
      +   .sm\\\\:markdown video {

      ---

      -   .sm\\\\:prose figure {
      +   .sm\\\\:markdown figure {

      ---

      -   .sm\\\\:prose figure > * {
      +   .sm\\\\:markdown figure > * {

      ---

      -   .sm\\\\:prose h2 code {
      +   .sm\\\\:markdown h2 code {

      ---

      -   .sm\\\\:prose h3 code {
      +   .sm\\\\:markdown h3 code {

      ---

      -   .sm\\\\:prose ul {
      +   .sm\\\\:markdown ul {

      ---

      -   .sm\\\\:prose li {
      +   .sm\\\\:markdown li {

      ---

      -   .sm\\\\:prose > ul > li p {
      +   .sm\\\\:markdown > ul > li p {

      ---

      -   .sm\\\\:prose > ul > li > *:first-child {
      +   .sm\\\\:markdown > ul > li > *:first-child {

      ---

      -   .sm\\\\:prose > ul > li > *:last-child {
      +   .sm\\\\:markdown > ul > li > *:last-child {

      ---

      -   .sm\\\\:prose > ol > li > *:first-child {
      +   .sm\\\\:markdown > ol > li > *:first-child {

      ---

      -   .sm\\\\:prose > ol > li > *:last-child {
      +   .sm\\\\:markdown > ol > li > *:last-child {

      ---

      -   .sm\\\\:prose ul ul, .sm\\\\:prose ul ol, .sm\\\\:prose ol ul, .sm\\\\:prose ol ol {
      +   .sm\\\\:markdown ul ul, .sm\\\\:markdown ul ol, .sm\\\\:markdown ol ul, .sm\\\\:markdown ol ol {

      ---

      -   .sm\\\\:prose hr + * {
      +   .sm\\\\:markdown hr + * {

      ---

      -   .sm\\\\:prose h2 + * {
      +   .sm\\\\:markdown h2 + * {

      ---

      -   .sm\\\\:prose h3 + * {
      +   .sm\\\\:markdown h3 + * {

      ---

      -   .sm\\\\:prose h4 + * {
      +   .sm\\\\:markdown h4 + * {

      ---

      -   .sm\\\\:prose thead th:first-child {
      +   .sm\\\\:markdown thead th:first-child {

      ---

      -   .sm\\\\:prose thead th:last-child {
      +   .sm\\\\:markdown thead th:last-child {

      ---

      -   .sm\\\\:prose tbody td:first-child {
      +   .sm\\\\:markdown tbody td:first-child {

      ---

      -   .sm\\\\:prose tbody td:last-child {
      +   .sm\\\\:markdown tbody td:last-child {

      ---

      -   .sm\\\\:prose > :first-child {
      +   .sm\\\\:markdown > :first-child {

      ---

      -   .sm\\\\:prose > :last-child {
      +   .sm\\\\:markdown > :last-child {

      ---

      -   .sm\\\\:prose-sm {
      +   .sm\\\\:markdown-sm {

      ---

      -   .sm\\\\:prose-sm p {
      +   .sm\\\\:markdown-sm p {

      ---

      -   .sm\\\\:prose-sm [class~='lead'] {
      +   .sm\\\\:markdown-sm [class~='lead'] {

      ---

      -   .sm\\\\:prose-sm blockquote {
      +   .sm\\\\:markdown-sm blockquote {

      ---

      -   .sm\\\\:prose-sm h1 {
      +   .sm\\\\:markdown-sm h1 {

      ---

      -   .sm\\\\:prose-sm h2 {
      +   .sm\\\\:markdown-sm h2 {

      ---

      -   .sm\\\\:prose-sm h3 {
      +   .sm\\\\:markdown-sm h3 {

      ---

      -   .sm\\\\:prose-sm h4 {
      +   .sm\\\\:markdown-sm h4 {

      ---

      -   .sm\\\\:prose-sm img {
      +   .sm\\\\:markdown-sm img {

      ---

      -   .sm\\\\:prose-sm video {
      +   .sm\\\\:markdown-sm video {

      ---

      -   .sm\\\\:prose-sm figure {
      +   .sm\\\\:markdown-sm figure {

      ---

      -   .sm\\\\:prose-sm figure > * {
      +   .sm\\\\:markdown-sm figure > * {

      ---

      -   .sm\\\\:prose-sm figure figcaption {
      +   .sm\\\\:markdown-sm figure figcaption {

      ---

      -   .sm\\\\:prose-sm code {
      +   .sm\\\\:markdown-sm code {

      ---

      -   .sm\\\\:prose-sm h2 code {
      +   .sm\\\\:markdown-sm h2 code {

      ---

      -   .sm\\\\:prose-sm h3 code {
      +   .sm\\\\:markdown-sm h3 code {

      ---

      -   .sm\\\\:prose-sm pre {
      +   .sm\\\\:markdown-sm pre {

      ---

      -   .sm\\\\:prose-sm ol {
      +   .sm\\\\:markdown-sm ol {

      ---

      -   .sm\\\\:prose-sm ul {
      +   .sm\\\\:markdown-sm ul {

      ---

      -   .sm\\\\:prose-sm li {
      +   .sm\\\\:markdown-sm li {

      ---

      -   .sm\\\\:prose-sm ol > li {
      +   .sm\\\\:markdown-sm ol > li {

      ---

      -   .sm\\\\:prose-sm ol > li::before {
      +   .sm\\\\:markdown-sm ol > li::before {

      ---

      -   .sm\\\\:prose-sm ul > li {
      +   .sm\\\\:markdown-sm ul > li {

      ---

      -   .sm\\\\:prose-sm ul > li::before {
      +   .sm\\\\:markdown-sm ul > li::before {

      ---

      -   .sm\\\\:prose-sm > ul > li p {
      +   .sm\\\\:markdown-sm > ul > li p {

      ---

      -   .sm\\\\:prose-sm > ul > li > *:first-child {
      +   .sm\\\\:markdown-sm > ul > li > *:first-child {

      ---

      -   .sm\\\\:prose-sm > ul > li > *:last-child {
      +   .sm\\\\:markdown-sm > ul > li > *:last-child {

      ---

      -   .sm\\\\:prose-sm > ol > li > *:first-child {
      +   .sm\\\\:markdown-sm > ol > li > *:first-child {

      ---

      -   .sm\\\\:prose-sm > ol > li > *:last-child {
      +   .sm\\\\:markdown-sm > ol > li > *:last-child {

      ---

      -   .sm\\\\:prose-sm ul ul, .sm\\\\:prose-sm ul ol, .sm\\\\:prose-sm ol ul, .sm\\\\:prose-sm ol ol {
      +   .sm\\\\:markdown-sm ul ul, .sm\\\\:markdown-sm ul ol, .sm\\\\:markdown-sm ol ul, .sm\\\\:markdown-sm ol ol {

      ---

      -   .sm\\\\:prose-sm hr {
      +   .sm\\\\:markdown-sm hr {

      ---

      -   .sm\\\\:prose-sm hr + * {
      +   .sm\\\\:markdown-sm hr + * {

      ---

      -   .sm\\\\:prose-sm h2 + * {
      +   .sm\\\\:markdown-sm h2 + * {

      ---

      -   .sm\\\\:prose-sm h3 + * {
      +   .sm\\\\:markdown-sm h3 + * {

      ---

      -   .sm\\\\:prose-sm h4 + * {
      +   .sm\\\\:markdown-sm h4 + * {

      ---

      -   .sm\\\\:prose-sm table {
      +   .sm\\\\:markdown-sm table {

      ---

      -   .sm\\\\:prose-sm thead th {
      +   .sm\\\\:markdown-sm thead th {

      ---

      -   .sm\\\\:prose-sm thead th:first-child {
      +   .sm\\\\:markdown-sm thead th:first-child {

      ---

      -   .sm\\\\:prose-sm thead th:last-child {
      +   .sm\\\\:markdown-sm thead th:last-child {

      ---

      -   .sm\\\\:prose-sm tbody td {
      +   .sm\\\\:markdown-sm tbody td {

      ---

      -   .sm\\\\:prose-sm tbody td:first-child {
      +   .sm\\\\:markdown-sm tbody td:first-child {

      ---

      -   .sm\\\\:prose-sm tbody td:last-child {
      +   .sm\\\\:markdown-sm tbody td:last-child {

      ---

      -   .sm\\\\:prose-sm > :first-child {
      +   .sm\\\\:markdown-sm > :first-child {

      ---

      -   .sm\\\\:prose-sm > :last-child {
      +   .sm\\\\:markdown-sm > :last-child {

      ---

      -   .sm\\\\:prose-lg {
      +   .sm\\\\:markdown-lg {

      ---

      -   .sm\\\\:prose-lg p {
      +   .sm\\\\:markdown-lg p {

      ---

      -   .sm\\\\:prose-lg [class~='lead'] {
      +   .sm\\\\:markdown-lg [class~='lead'] {

      ---

      -   .sm\\\\:prose-lg blockquote {
      +   .sm\\\\:markdown-lg blockquote {

      ---

      -   .sm\\\\:prose-lg h1 {
      +   .sm\\\\:markdown-lg h1 {

      ---

      -   .sm\\\\:prose-lg h2 {
      +   .sm\\\\:markdown-lg h2 {

      ---

      -   .sm\\\\:prose-lg h3 {
      +   .sm\\\\:markdown-lg h3 {

      ---

      -   .sm\\\\:prose-lg h4 {
      +   .sm\\\\:markdown-lg h4 {

      ---

      -   .sm\\\\:prose-lg img {
      +   .sm\\\\:markdown-lg img {

      ---

      -   .sm\\\\:prose-lg video {
      +   .sm\\\\:markdown-lg video {

      ---

      -   .sm\\\\:prose-lg figure {
      +   .sm\\\\:markdown-lg figure {

      ---

      -   .sm\\\\:prose-lg figure > * {
      +   .sm\\\\:markdown-lg figure > * {

      ---

      -   .sm\\\\:prose-lg figure figcaption {
      +   .sm\\\\:markdown-lg figure figcaption {

      ---

      -   .sm\\\\:prose-lg code {
      +   .sm\\\\:markdown-lg code {

      ---

      -   .sm\\\\:prose-lg h2 code {
      +   .sm\\\\:markdown-lg h2 code {

      ---

      -   .sm\\\\:prose-lg h3 code {
      +   .sm\\\\:markdown-lg h3 code {

      ---

      -   .sm\\\\:prose-lg pre {
      +   .sm\\\\:markdown-lg pre {

      ---

      -   .sm\\\\:prose-lg ol {
      +   .sm\\\\:markdown-lg ol {

      ---

      -   .sm\\\\:prose-lg ul {
      +   .sm\\\\:markdown-lg ul {

      ---

      -   .sm\\\\:prose-lg li {
      +   .sm\\\\:markdown-lg li {

      ---

      -   .sm\\\\:prose-lg ol > li {
      +   .sm\\\\:markdown-lg ol > li {

      ---

      -   .sm\\\\:prose-lg ol > li::before {
      +   .sm\\\\:markdown-lg ol > li::before {

      ---

      -   .sm\\\\:prose-lg ul > li {
      +   .sm\\\\:markdown-lg ul > li {

      ---

      -   .sm\\\\:prose-lg ul > li::before {
      +   .sm\\\\:markdown-lg ul > li::before {

      ---

      -   .sm\\\\:prose-lg > ul > li p {
      +   .sm\\\\:markdown-lg > ul > li p {

      ---

      -   .sm\\\\:prose-lg > ul > li > *:first-child {
      +   .sm\\\\:markdown-lg > ul > li > *:first-child {

      ---

      -   .sm\\\\:prose-lg > ul > li > *:last-child {
      +   .sm\\\\:markdown-lg > ul > li > *:last-child {

      ---

      -   .sm\\\\:prose-lg > ol > li > *:first-child {
      +   .sm\\\\:markdown-lg > ol > li > *:first-child {

      ---

      -   .sm\\\\:prose-lg > ol > li > *:last-child {
      +   .sm\\\\:markdown-lg > ol > li > *:last-child {

      ---

      -   .sm\\\\:prose-lg ul ul, .sm\\\\:prose-lg ul ol, .sm\\\\:prose-lg ol ul, .sm\\\\:prose-lg ol ol {
      +   .sm\\\\:markdown-lg ul ul, .sm\\\\:markdown-lg ul ol, .sm\\\\:markdown-lg ol ul, .sm\\\\:markdown-lg ol ol {

      ---

      -   .sm\\\\:prose-lg hr {
      +   .sm\\\\:markdown-lg hr {

      ---

      -   .sm\\\\:prose-lg hr + * {
      +   .sm\\\\:markdown-lg hr + * {

      ---

      -   .sm\\\\:prose-lg h2 + * {
      +   .sm\\\\:markdown-lg h2 + * {

      ---

      -   .sm\\\\:prose-lg h3 + * {
      +   .sm\\\\:markdown-lg h3 + * {

      ---

      -   .sm\\\\:prose-lg h4 + * {
      +   .sm\\\\:markdown-lg h4 + * {

      ---

      -   .sm\\\\:prose-lg table {
      +   .sm\\\\:markdown-lg table {

      ---

      -   .sm\\\\:prose-lg thead th {
      +   .sm\\\\:markdown-lg thead th {

      ---

      -   .sm\\\\:prose-lg thead th:first-child {
      +   .sm\\\\:markdown-lg thead th:first-child {

      ---

      -   .sm\\\\:prose-lg thead th:last-child {
      +   .sm\\\\:markdown-lg thead th:last-child {

      ---

      -   .sm\\\\:prose-lg tbody td {
      +   .sm\\\\:markdown-lg tbody td {

      ---

      -   .sm\\\\:prose-lg tbody td:first-child {
      +   .sm\\\\:markdown-lg tbody td:first-child {

      ---

      -   .sm\\\\:prose-lg tbody td:last-child {
      +   .sm\\\\:markdown-lg tbody td:last-child {

      ---

      -   .sm\\\\:prose-lg > :first-child {
      +   .sm\\\\:markdown-lg > :first-child {

      ---

      -   .sm\\\\:prose-lg > :last-child {
      +   .sm\\\\:markdown-lg > :last-child {

      ---

      -   .sm\\\\:prose-xl {
      +   .sm\\\\:markdown-xl {

      ---

      -   .sm\\\\:prose-xl p {
      +   .sm\\\\:markdown-xl p {

      ---

      -   .sm\\\\:prose-xl [class~='lead'] {
      +   .sm\\\\:markdown-xl [class~='lead'] {

      ---

      -   .sm\\\\:prose-xl blockquote {
      +   .sm\\\\:markdown-xl blockquote {

      ---

      -   .sm\\\\:prose-xl h1 {
      +   .sm\\\\:markdown-xl h1 {

      ---

      -   .sm\\\\:prose-xl h2 {
      +   .sm\\\\:markdown-xl h2 {

      ---

      -   .sm\\\\:prose-xl h3 {
      +   .sm\\\\:markdown-xl h3 {

      ---

      -   .sm\\\\:prose-xl h4 {
      +   .sm\\\\:markdown-xl h4 {

      ---

      -   .sm\\\\:prose-xl img {
      +   .sm\\\\:markdown-xl img {

      ---

      -   .sm\\\\:prose-xl video {
      +   .sm\\\\:markdown-xl video {

      ---

      -   .sm\\\\:prose-xl figure {
      +   .sm\\\\:markdown-xl figure {

      ---

      -   .sm\\\\:prose-xl figure > * {
      +   .sm\\\\:markdown-xl figure > * {

      ---

      -   .sm\\\\:prose-xl figure figcaption {
      +   .sm\\\\:markdown-xl figure figcaption {

      ---

      -   .sm\\\\:prose-xl code {
      +   .sm\\\\:markdown-xl code {

      ---

      -   .sm\\\\:prose-xl h2 code {
      +   .sm\\\\:markdown-xl h2 code {

      ---

      -   .sm\\\\:prose-xl h3 code {
      +   .sm\\\\:markdown-xl h3 code {

      ---

      -   .sm\\\\:prose-xl pre {
      +   .sm\\\\:markdown-xl pre {

      ---

      -   .sm\\\\:prose-xl ol {
      +   .sm\\\\:markdown-xl ol {

      ---

      -   .sm\\\\:prose-xl ul {
      +   .sm\\\\:markdown-xl ul {

      ---

      -   .sm\\\\:prose-xl li {
      +   .sm\\\\:markdown-xl li {

      ---

      -   .sm\\\\:prose-xl ol > li {
      +   .sm\\\\:markdown-xl ol > li {

      ---

      -   .sm\\\\:prose-xl ol > li::before {
      +   .sm\\\\:markdown-xl ol > li::before {

      ---

      -   .sm\\\\:prose-xl ul > li {
      +   .sm\\\\:markdown-xl ul > li {

      ---

      -   .sm\\\\:prose-xl ul > li::before {
      +   .sm\\\\:markdown-xl ul > li::before {

      ---

      -   .sm\\\\:prose-xl > ul > li p {
      +   .sm\\\\:markdown-xl > ul > li p {

      ---

      -   .sm\\\\:prose-xl > ul > li > *:first-child {
      +   .sm\\\\:markdown-xl > ul > li > *:first-child {

      ---

      -   .sm\\\\:prose-xl > ul > li > *:last-child {
      +   .sm\\\\:markdown-xl > ul > li > *:last-child {

      ---

      -   .sm\\\\:prose-xl > ol > li > *:first-child {
      +   .sm\\\\:markdown-xl > ol > li > *:first-child {

      ---

      -   .sm\\\\:prose-xl > ol > li > *:last-child {
      +   .sm\\\\:markdown-xl > ol > li > *:last-child {

      ---

      -   .sm\\\\:prose-xl ul ul, .sm\\\\:prose-xl ul ol, .sm\\\\:prose-xl ol ul, .sm\\\\:prose-xl ol ol {
      +   .sm\\\\:markdown-xl ul ul, .sm\\\\:markdown-xl ul ol, .sm\\\\:markdown-xl ol ul, .sm\\\\:markdown-xl ol ol {

      ---

      -   .sm\\\\:prose-xl hr {
      +   .sm\\\\:markdown-xl hr {

      ---

      -   .sm\\\\:prose-xl hr + * {
      +   .sm\\\\:markdown-xl hr + * {

      ---

      -   .sm\\\\:prose-xl h2 + * {
      +   .sm\\\\:markdown-xl h2 + * {

      ---

      -   .sm\\\\:prose-xl h3 + * {
      +   .sm\\\\:markdown-xl h3 + * {

      ---

      -   .sm\\\\:prose-xl h4 + * {
      +   .sm\\\\:markdown-xl h4 + * {

      ---

      -   .sm\\\\:prose-xl table {
      +   .sm\\\\:markdown-xl table {

      ---

      -   .sm\\\\:prose-xl thead th {
      +   .sm\\\\:markdown-xl thead th {

      ---

      -   .sm\\\\:prose-xl thead th:first-child {
      +   .sm\\\\:markdown-xl thead th:first-child {

      ---

      -   .sm\\\\:prose-xl thead th:last-child {
      +   .sm\\\\:markdown-xl thead th:last-child {

      ---

      -   .sm\\\\:prose-xl tbody td {
      +   .sm\\\\:markdown-xl tbody td {

      ---

      -   .sm\\\\:prose-xl tbody td:first-child {
      +   .sm\\\\:markdown-xl tbody td:first-child {

      ---

      -   .sm\\\\:prose-xl tbody td:last-child {
      +   .sm\\\\:markdown-xl tbody td:last-child {

      ---

      -   .sm\\\\:prose-xl > :first-child {
      +   .sm\\\\:markdown-xl > :first-child {

      ---

      -   .sm\\\\:prose-xl > :last-child {
      +   .sm\\\\:markdown-xl > :last-child {

      ---

      -   .sm\\\\:prose-2xl {
      +   .sm\\\\:markdown-2xl {

      ---

      -   .sm\\\\:prose-2xl p {
      +   .sm\\\\:markdown-2xl p {

      ---

      -   .sm\\\\:prose-2xl [class~='lead'] {
      +   .sm\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .sm\\\\:prose-2xl blockquote {
      +   .sm\\\\:markdown-2xl blockquote {

      ---

      -   .sm\\\\:prose-2xl h1 {
      +   .sm\\\\:markdown-2xl h1 {

      ---

      -   .sm\\\\:prose-2xl h2 {
      +   .sm\\\\:markdown-2xl h2 {

      ---

      -   .sm\\\\:prose-2xl h3 {
      +   .sm\\\\:markdown-2xl h3 {

      ---

      -   .sm\\\\:prose-2xl h4 {
      +   .sm\\\\:markdown-2xl h4 {

      ---

      -   .sm\\\\:prose-2xl img {
      +   .sm\\\\:markdown-2xl img {

      ---

      -   .sm\\\\:prose-2xl video {
      +   .sm\\\\:markdown-2xl video {

      ---

      -   .sm\\\\:prose-2xl figure {
      +   .sm\\\\:markdown-2xl figure {

      ---

      -   .sm\\\\:prose-2xl figure > * {
      +   .sm\\\\:markdown-2xl figure > * {

      ---

      -   .sm\\\\:prose-2xl figure figcaption {
      +   .sm\\\\:markdown-2xl figure figcaption {

      ---

      -   .sm\\\\:prose-2xl code {
      +   .sm\\\\:markdown-2xl code {

      ---

      -   .sm\\\\:prose-2xl h2 code {
      +   .sm\\\\:markdown-2xl h2 code {

      ---

      -   .sm\\\\:prose-2xl h3 code {
      +   .sm\\\\:markdown-2xl h3 code {

      ---

      -   .sm\\\\:prose-2xl pre {
      +   .sm\\\\:markdown-2xl pre {

      ---

      -   .sm\\\\:prose-2xl ol {
      +   .sm\\\\:markdown-2xl ol {

      ---

      -   .sm\\\\:prose-2xl ul {
      +   .sm\\\\:markdown-2xl ul {

      ---

      -   .sm\\\\:prose-2xl li {
      +   .sm\\\\:markdown-2xl li {

      ---

      -   .sm\\\\:prose-2xl ol > li {
      +   .sm\\\\:markdown-2xl ol > li {

      ---

      -   .sm\\\\:prose-2xl ol > li::before {
      +   .sm\\\\:markdown-2xl ol > li::before {

      ---

      -   .sm\\\\:prose-2xl ul > li {
      +   .sm\\\\:markdown-2xl ul > li {

      ---

      -   .sm\\\\:prose-2xl ul > li::before {
      +   .sm\\\\:markdown-2xl ul > li::before {

      ---

      -   .sm\\\\:prose-2xl > ul > li p {
      +   .sm\\\\:markdown-2xl > ul > li p {

      ---

      -   .sm\\\\:prose-2xl > ul > li > *:first-child {
      +   .sm\\\\:markdown-2xl > ul > li > *:first-child {

      ---

      -   .sm\\\\:prose-2xl > ul > li > *:last-child {
      +   .sm\\\\:markdown-2xl > ul > li > *:last-child {

      ---

      -   .sm\\\\:prose-2xl > ol > li > *:first-child {
      +   .sm\\\\:markdown-2xl > ol > li > *:first-child {

      ---

      -   .sm\\\\:prose-2xl > ol > li > *:last-child {
      +   .sm\\\\:markdown-2xl > ol > li > *:last-child {

      ---

      -   .sm\\\\:prose-2xl ul ul, .sm\\\\:prose-2xl ul ol, .sm\\\\:prose-2xl ol ul, .sm\\\\:prose-2xl ol ol {
      +   .sm\\\\:markdown-2xl ul ul, .sm\\\\:markdown-2xl ul ol, .sm\\\\:markdown-2xl ol ul, .sm\\\\:markdown-2xl ol ol {

      ---

      -   .sm\\\\:prose-2xl hr {
      +   .sm\\\\:markdown-2xl hr {

      ---

      -   .sm\\\\:prose-2xl hr + * {
      +   .sm\\\\:markdown-2xl hr + * {

      ---

      -   .sm\\\\:prose-2xl h2 + * {
      +   .sm\\\\:markdown-2xl h2 + * {

      ---

      -   .sm\\\\:prose-2xl h3 + * {
      +   .sm\\\\:markdown-2xl h3 + * {

      ---

      -   .sm\\\\:prose-2xl h4 + * {
      +   .sm\\\\:markdown-2xl h4 + * {

      ---

      -   .sm\\\\:prose-2xl table {
      +   .sm\\\\:markdown-2xl table {

      ---

      -   .sm\\\\:prose-2xl thead th {
      +   .sm\\\\:markdown-2xl thead th {

      ---

      -   .sm\\\\:prose-2xl thead th:first-child {
      +   .sm\\\\:markdown-2xl thead th:first-child {

      ---

      -   .sm\\\\:prose-2xl thead th:last-child {
      +   .sm\\\\:markdown-2xl thead th:last-child {

      ---

      -   .sm\\\\:prose-2xl tbody td {
      +   .sm\\\\:markdown-2xl tbody td {

      ---

      -   .sm\\\\:prose-2xl tbody td:first-child {
      +   .sm\\\\:markdown-2xl tbody td:first-child {

      ---

      -   .sm\\\\:prose-2xl tbody td:last-child {
      +   .sm\\\\:markdown-2xl tbody td:last-child {

      ---

      -   .sm\\\\:prose-2xl > :first-child {
      +   .sm\\\\:markdown-2xl > :first-child {

      ---

      -   .sm\\\\:prose-2xl > :last-child {
      +   .sm\\\\:markdown-2xl > :last-child {

      ---

      -   .sm\\\\:prose-red a {
      +   .sm\\\\:markdown-red a {

      ---

      -   .sm\\\\:prose-red a code {
      +   .sm\\\\:markdown-red a code {

      ---

      -   .sm\\\\:prose-yellow a {
      +   .sm\\\\:markdown-yellow a {

      ---

      -   .sm\\\\:prose-yellow a code {
      +   .sm\\\\:markdown-yellow a code {

      ---

      -   .sm\\\\:prose-green a {
      +   .sm\\\\:markdown-green a {

      ---

      -   .sm\\\\:prose-green a code {
      +   .sm\\\\:markdown-green a code {

      ---

      -   .sm\\\\:prose-blue a {
      +   .sm\\\\:markdown-blue a {

      ---

      -   .sm\\\\:prose-blue a code {
      +   .sm\\\\:markdown-blue a code {

      ---

      -   .sm\\\\:prose-indigo a {
      +   .sm\\\\:markdown-indigo a {

      ---

      -   .sm\\\\:prose-indigo a code {
      +   .sm\\\\:markdown-indigo a code {

      ---

      -   .sm\\\\:prose-purple a {
      +   .sm\\\\:markdown-purple a {

      ---

      -   .sm\\\\:prose-purple a code {
      +   .sm\\\\:markdown-purple a code {

      ---

      -   .sm\\\\:prose-pink a {
      +   .sm\\\\:markdown-pink a {

      ---

      -   .sm\\\\:prose-pink a code {
      +   .sm\\\\:markdown-pink a code {

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose [class~='lead'] {
      +   .md\\\\:markdown [class~='lead'] {

      ---

      -   .md\\\\:prose a {
      +   .md\\\\:markdown a {

      ---

      -   .md\\\\:prose strong {
      +   .md\\\\:markdown strong {

      ---

      -   .md\\\\:prose ol {
      +   .md\\\\:markdown ol {

      ---

      -   .md\\\\:prose ol > li {
      +   .md\\\\:markdown ol > li {

      ---

      -   .md\\\\:prose ol > li::before {
      +   .md\\\\:markdown ol > li::before {

      ---

      -   .md\\\\:prose ul > li {
      +   .md\\\\:markdown ul > li {

      ---

      -   .md\\\\:prose ul > li::before {
      +   .md\\\\:markdown ul > li::before {

      ---

      -   .md\\\\:prose hr {
      +   .md\\\\:markdown hr {

      ---

      -   .md\\\\:prose blockquote {
      +   .md\\\\:markdown blockquote {

      ---

      -   .md\\\\:prose blockquote p:first-of-type::before {
      +   .md\\\\:markdown blockquote p:first-of-type::before {

      ---

      -   .md\\\\:prose blockquote p:last-of-type::after {
      +   .md\\\\:markdown blockquote p:last-of-type::after {

      ---

      -   .md\\\\:prose h1 {
      +   .md\\\\:markdown h1 {

      ---

      -   .md\\\\:prose h2 {
      +   .md\\\\:markdown h2 {

      ---

      -   .md\\\\:prose h3 {
      +   .md\\\\:markdown h3 {

      ---

      -   .md\\\\:prose h4 {
      +   .md\\\\:markdown h4 {

      ---

      -   .md\\\\:prose figure figcaption {
      +   .md\\\\:markdown figure figcaption {

      ---

      -   .md\\\\:prose code {
      +   .md\\\\:markdown code {

      ---

      -   .md\\\\:prose code::before {
      +   .md\\\\:markdown code::before {

      ---

      -   .md\\\\:prose code::after {
      +   .md\\\\:markdown code::after {

      ---

      -   .md\\\\:prose a code {
      +   .md\\\\:markdown a code {

      ---

      -   .md\\\\:prose pre {
      +   .md\\\\:markdown pre {

      ---

      -   .md\\\\:prose pre code {
      +   .md\\\\:markdown pre code {

      ---

      -   .md\\\\:prose pre code::before {
      +   .md\\\\:markdown pre code::before {

      ---

      -   .md\\\\:prose pre code::after {
      +   .md\\\\:markdown pre code::after {

      ---

      -   .md\\\\:prose table {
      +   .md\\\\:markdown table {

      ---

      -   .md\\\\:prose thead {
      +   .md\\\\:markdown thead {

      ---

      -   .md\\\\:prose thead th {
      +   .md\\\\:markdown thead th {

      ---

      -   .md\\\\:prose tbody tr {
      +   .md\\\\:markdown tbody tr {

      ---

      -   .md\\\\:prose tbody tr:last-child {
      +   .md\\\\:markdown tbody tr:last-child {

      ---

      -   .md\\\\:prose tbody td {
      +   .md\\\\:markdown tbody td {

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose p {
      +   .md\\\\:markdown p {

      ---

      -   .md\\\\:prose img {
      +   .md\\\\:markdown img {

      ---

      -   .md\\\\:prose video {
      +   .md\\\\:markdown video {

      ---

      -   .md\\\\:prose figure {
      +   .md\\\\:markdown figure {

      ---

      -   .md\\\\:prose figure > * {
      +   .md\\\\:markdown figure > * {

      ---

      -   .md\\\\:prose h2 code {
      +   .md\\\\:markdown h2 code {

      ---

      -   .md\\\\:prose h3 code {
      +   .md\\\\:markdown h3 code {

      ---

      -   .md\\\\:prose ul {
      +   .md\\\\:markdown ul {

      ---

      -   .md\\\\:prose li {
      +   .md\\\\:markdown li {

      ---

      -   .md\\\\:prose > ul > li p {
      +   .md\\\\:markdown > ul > li p {

      ---

      -   .md\\\\:prose > ul > li > *:first-child {
      +   .md\\\\:markdown > ul > li > *:first-child {

      ---

      -   .md\\\\:prose > ul > li > *:last-child {
      +   .md\\\\:markdown > ul > li > *:last-child {

      ---

      -   .md\\\\:prose > ol > li > *:first-child {
      +   .md\\\\:markdown > ol > li > *:first-child {

      ---

      -   .md\\\\:prose > ol > li > *:last-child {
      +   .md\\\\:markdown > ol > li > *:last-child {

      ---

      -   .md\\\\:prose ul ul, .md\\\\:prose ul ol, .md\\\\:prose ol ul, .md\\\\:prose ol ol {
      +   .md\\\\:markdown ul ul, .md\\\\:markdown ul ol, .md\\\\:markdown ol ul, .md\\\\:markdown ol ol {

      ---

      -   .md\\\\:prose hr + * {
      +   .md\\\\:markdown hr + * {

      ---

      -   .md\\\\:prose h2 + * {
      +   .md\\\\:markdown h2 + * {

      ---

      -   .md\\\\:prose h3 + * {
      +   .md\\\\:markdown h3 + * {

      ---

      -   .md\\\\:prose h4 + * {
      +   .md\\\\:markdown h4 + * {

      ---

      -   .md\\\\:prose thead th:first-child {
      +   .md\\\\:markdown thead th:first-child {

      ---

      -   .md\\\\:prose thead th:last-child {
      +   .md\\\\:markdown thead th:last-child {

      ---

      -   .md\\\\:prose tbody td:first-child {
      +   .md\\\\:markdown tbody td:first-child {

      ---

      -   .md\\\\:prose tbody td:last-child {
      +   .md\\\\:markdown tbody td:last-child {

      ---

      -   .md\\\\:prose > :first-child {
      +   .md\\\\:markdown > :first-child {

      ---

      -   .md\\\\:prose > :last-child {
      +   .md\\\\:markdown > :last-child {

      ---

      -   .md\\\\:prose-sm {
      +   .md\\\\:markdown-sm {

      ---

      -   .md\\\\:prose-sm p {
      +   .md\\\\:markdown-sm p {

      ---

      -   .md\\\\:prose-sm [class~='lead'] {
      +   .md\\\\:markdown-sm [class~='lead'] {

      ---

      -   .md\\\\:prose-sm blockquote {
      +   .md\\\\:markdown-sm blockquote {

      ---

      -   .md\\\\:prose-sm h1 {
      +   .md\\\\:markdown-sm h1 {

      ---

      -   .md\\\\:prose-sm h2 {
      +   .md\\\\:markdown-sm h2 {

      ---

      -   .md\\\\:prose-sm h3 {
      +   .md\\\\:markdown-sm h3 {

      ---

      -   .md\\\\:prose-sm h4 {
      +   .md\\\\:markdown-sm h4 {

      ---

      -   .md\\\\:prose-sm img {
      +   .md\\\\:markdown-sm img {

      ---

      -   .md\\\\:prose-sm video {
      +   .md\\\\:markdown-sm video {

      ---

      -   .md\\\\:prose-sm figure {
      +   .md\\\\:markdown-sm figure {

      ---

      -   .md\\\\:prose-sm figure > * {
      +   .md\\\\:markdown-sm figure > * {

      ---

      -   .md\\\\:prose-sm figure figcaption {
      +   .md\\\\:markdown-sm figure figcaption {

      ---

      -   .md\\\\:prose-sm code {
      +   .md\\\\:markdown-sm code {

      ---

      -   .md\\\\:prose-sm h2 code {
      +   .md\\\\:markdown-sm h2 code {

      ---

      -   .md\\\\:prose-sm h3 code {
      +   .md\\\\:markdown-sm h3 code {

      ---

      -   .md\\\\:prose-sm pre {
      +   .md\\\\:markdown-sm pre {

      ---

      -   .md\\\\:prose-sm ol {
      +   .md\\\\:markdown-sm ol {

      ---

      -   .md\\\\:prose-sm ul {
      +   .md\\\\:markdown-sm ul {

      ---

      -   .md\\\\:prose-sm li {
      +   .md\\\\:markdown-sm li {

      ---

      -   .md\\\\:prose-sm ol > li {
      +   .md\\\\:markdown-sm ol > li {

      ---

      -   .md\\\\:prose-sm ol > li::before {
      +   .md\\\\:markdown-sm ol > li::before {

      ---

      -   .md\\\\:prose-sm ul > li {
      +   .md\\\\:markdown-sm ul > li {

      ---

      -   .md\\\\:prose-sm ul > li::before {
      +   .md\\\\:markdown-sm ul > li::before {

      ---

      -   .md\\\\:prose-sm > ul > li p {
      +   .md\\\\:markdown-sm > ul > li p {

      ---

      -   .md\\\\:prose-sm > ul > li > *:first-child {
      +   .md\\\\:markdown-sm > ul > li > *:first-child {

      ---

      -   .md\\\\:prose-sm > ul > li > *:last-child {
      +   .md\\\\:markdown-sm > ul > li > *:last-child {

      ---

      -   .md\\\\:prose-sm > ol > li > *:first-child {
      +   .md\\\\:markdown-sm > ol > li > *:first-child {

      ---

      -   .md\\\\:prose-sm > ol > li > *:last-child {
      +   .md\\\\:markdown-sm > ol > li > *:last-child {

      ---

      -   .md\\\\:prose-sm ul ul, .md\\\\:prose-sm ul ol, .md\\\\:prose-sm ol ul, .md\\\\:prose-sm ol ol {
      +   .md\\\\:markdown-sm ul ul, .md\\\\:markdown-sm ul ol, .md\\\\:markdown-sm ol ul, .md\\\\:markdown-sm ol ol {

      ---

      -   .md\\\\:prose-sm hr {
      +   .md\\\\:markdown-sm hr {

      ---

      -   .md\\\\:prose-sm hr + * {
      +   .md\\\\:markdown-sm hr + * {

      ---

      -   .md\\\\:prose-sm h2 + * {
      +   .md\\\\:markdown-sm h2 + * {

      ---

      -   .md\\\\:prose-sm h3 + * {
      +   .md\\\\:markdown-sm h3 + * {

      ---

      -   .md\\\\:prose-sm h4 + * {
      +   .md\\\\:markdown-sm h4 + * {

      ---

      -   .md\\\\:prose-sm table {
      +   .md\\\\:markdown-sm table {

      ---

      -   .md\\\\:prose-sm thead th {
      +   .md\\\\:markdown-sm thead th {

      ---

      -   .md\\\\:prose-sm thead th:first-child {
      +   .md\\\\:markdown-sm thead th:first-child {

      ---

      -   .md\\\\:prose-sm thead th:last-child {
      +   .md\\\\:markdown-sm thead th:last-child {

      ---

      -   .md\\\\:prose-sm tbody td {
      +   .md\\\\:markdown-sm tbody td {

      ---

      -   .md\\\\:prose-sm tbody td:first-child {
      +   .md\\\\:markdown-sm tbody td:first-child {

      ---

      -   .md\\\\:prose-sm tbody td:last-child {
      +   .md\\\\:markdown-sm tbody td:last-child {

      ---

      -   .md\\\\:prose-sm > :first-child {
      +   .md\\\\:markdown-sm > :first-child {

      ---

      -   .md\\\\:prose-sm > :last-child {
      +   .md\\\\:markdown-sm > :last-child {

      ---

      -   .md\\\\:prose-lg {
      +   .md\\\\:markdown-lg {

      ---

      -   .md\\\\:prose-lg p {
      +   .md\\\\:markdown-lg p {

      ---

      -   .md\\\\:prose-lg [class~='lead'] {
      +   .md\\\\:markdown-lg [class~='lead'] {

      ---

      -   .md\\\\:prose-lg blockquote {
      +   .md\\\\:markdown-lg blockquote {

      ---

      -   .md\\\\:prose-lg h1 {
      +   .md\\\\:markdown-lg h1 {

      ---

      -   .md\\\\:prose-lg h2 {
      +   .md\\\\:markdown-lg h2 {

      ---

      -   .md\\\\:prose-lg h3 {
      +   .md\\\\:markdown-lg h3 {

      ---

      -   .md\\\\:prose-lg h4 {
      +   .md\\\\:markdown-lg h4 {

      ---

      -   .md\\\\:prose-lg img {
      +   .md\\\\:markdown-lg img {

      ---

      -   .md\\\\:prose-lg video {
      +   .md\\\\:markdown-lg video {

      ---

      -   .md\\\\:prose-lg figure {
      +   .md\\\\:markdown-lg figure {

      ---

      -   .md\\\\:prose-lg figure > * {
      +   .md\\\\:markdown-lg figure > * {

      ---

      -   .md\\\\:prose-lg figure figcaption {
      +   .md\\\\:markdown-lg figure figcaption {

      ---

      -   .md\\\\:prose-lg code {
      +   .md\\\\:markdown-lg code {

      ---

      -   .md\\\\:prose-lg h2 code {
      +   .md\\\\:markdown-lg h2 code {

      ---

      -   .md\\\\:prose-lg h3 code {
      +   .md\\\\:markdown-lg h3 code {

      ---

      -   .md\\\\:prose-lg pre {
      +   .md\\\\:markdown-lg pre {

      ---

      -   .md\\\\:prose-lg ol {
      +   .md\\\\:markdown-lg ol {

      ---

      -   .md\\\\:prose-lg ul {
      +   .md\\\\:markdown-lg ul {

      ---

      -   .md\\\\:prose-lg li {
      +   .md\\\\:markdown-lg li {

      ---

      -   .md\\\\:prose-lg ol > li {
      +   .md\\\\:markdown-lg ol > li {

      ---

      -   .md\\\\:prose-lg ol > li::before {
      +   .md\\\\:markdown-lg ol > li::before {

      ---

      -   .md\\\\:prose-lg ul > li {
      +   .md\\\\:markdown-lg ul > li {

      ---

      -   .md\\\\:prose-lg ul > li::before {
      +   .md\\\\:markdown-lg ul > li::before {

      ---

      -   .md\\\\:prose-lg > ul > li p {
      +   .md\\\\:markdown-lg > ul > li p {

      ---

      -   .md\\\\:prose-lg > ul > li > *:first-child {
      +   .md\\\\:markdown-lg > ul > li > *:first-child {

      ---

      -   .md\\\\:prose-lg > ul > li > *:last-child {
      +   .md\\\\:markdown-lg > ul > li > *:last-child {

      ---

      -   .md\\\\:prose-lg > ol > li > *:first-child {
      +   .md\\\\:markdown-lg > ol > li > *:first-child {

      ---

      -   .md\\\\:prose-lg > ol > li > *:last-child {
      +   .md\\\\:markdown-lg > ol > li > *:last-child {

      ---

      -   .md\\\\:prose-lg ul ul, .md\\\\:prose-lg ul ol, .md\\\\:prose-lg ol ul, .md\\\\:prose-lg ol ol {
      +   .md\\\\:markdown-lg ul ul, .md\\\\:markdown-lg ul ol, .md\\\\:markdown-lg ol ul, .md\\\\:markdown-lg ol ol {

      ---

      -   .md\\\\:prose-lg hr {
      +   .md\\\\:markdown-lg hr {

      ---

      -   .md\\\\:prose-lg hr + * {
      +   .md\\\\:markdown-lg hr + * {

      ---

      -   .md\\\\:prose-lg h2 + * {
      +   .md\\\\:markdown-lg h2 + * {

      ---

      -   .md\\\\:prose-lg h3 + * {
      +   .md\\\\:markdown-lg h3 + * {

      ---

      -   .md\\\\:prose-lg h4 + * {
      +   .md\\\\:markdown-lg h4 + * {

      ---

      -   .md\\\\:prose-lg table {
      +   .md\\\\:markdown-lg table {

      ---

      -   .md\\\\:prose-lg thead th {
      +   .md\\\\:markdown-lg thead th {

      ---

      -   .md\\\\:prose-lg thead th:first-child {
      +   .md\\\\:markdown-lg thead th:first-child {

      ---

      -   .md\\\\:prose-lg thead th:last-child {
      +   .md\\\\:markdown-lg thead th:last-child {

      ---

      -   .md\\\\:prose-lg tbody td {
      +   .md\\\\:markdown-lg tbody td {

      ---

      -   .md\\\\:prose-lg tbody td:first-child {
      +   .md\\\\:markdown-lg tbody td:first-child {

      ---

      -   .md\\\\:prose-lg tbody td:last-child {
      +   .md\\\\:markdown-lg tbody td:last-child {

      ---

      -   .md\\\\:prose-lg > :first-child {
      +   .md\\\\:markdown-lg > :first-child {

      ---

      -   .md\\\\:prose-lg > :last-child {
      +   .md\\\\:markdown-lg > :last-child {

      ---

      -   .md\\\\:prose-xl {
      +   .md\\\\:markdown-xl {

      ---

      -   .md\\\\:prose-xl p {
      +   .md\\\\:markdown-xl p {

      ---

      -   .md\\\\:prose-xl [class~='lead'] {
      +   .md\\\\:markdown-xl [class~='lead'] {

      ---

      -   .md\\\\:prose-xl blockquote {
      +   .md\\\\:markdown-xl blockquote {

      ---

      -   .md\\\\:prose-xl h1 {
      +   .md\\\\:markdown-xl h1 {

      ---

      -   .md\\\\:prose-xl h2 {
      +   .md\\\\:markdown-xl h2 {

      ---

      -   .md\\\\:prose-xl h3 {
      +   .md\\\\:markdown-xl h3 {

      ---

      -   .md\\\\:prose-xl h4 {
      +   .md\\\\:markdown-xl h4 {

      ---

      -   .md\\\\:prose-xl img {
      +   .md\\\\:markdown-xl img {

      ---

      -   .md\\\\:prose-xl video {
      +   .md\\\\:markdown-xl video {

      ---

      -   .md\\\\:prose-xl figure {
      +   .md\\\\:markdown-xl figure {

      ---

      -   .md\\\\:prose-xl figure > * {
      +   .md\\\\:markdown-xl figure > * {

      ---

      -   .md\\\\:prose-xl figure figcaption {
      +   .md\\\\:markdown-xl figure figcaption {

      ---

      -   .md\\\\:prose-xl code {
      +   .md\\\\:markdown-xl code {

      ---

      -   .md\\\\:prose-xl h2 code {
      +   .md\\\\:markdown-xl h2 code {

      ---

      -   .md\\\\:prose-xl h3 code {
      +   .md\\\\:markdown-xl h3 code {

      ---

      -   .md\\\\:prose-xl pre {
      +   .md\\\\:markdown-xl pre {

      ---

      -   .md\\\\:prose-xl ol {
      +   .md\\\\:markdown-xl ol {

      ---

      -   .md\\\\:prose-xl ul {
      +   .md\\\\:markdown-xl ul {

      ---

      -   .md\\\\:prose-xl li {
      +   .md\\\\:markdown-xl li {

      ---

      -   .md\\\\:prose-xl ol > li {
      +   .md\\\\:markdown-xl ol > li {

      ---

      -   .md\\\\:prose-xl ol > li::before {
      +   .md\\\\:markdown-xl ol > li::before {

      ---

      -   .md\\\\:prose-xl ul > li {
      +   .md\\\\:markdown-xl ul > li {

      ---

      -   .md\\\\:prose-xl ul > li::before {
      +   .md\\\\:markdown-xl ul > li::before {

      ---

      -   .md\\\\:prose-xl > ul > li p {
      +   .md\\\\:markdown-xl > ul > li p {

      ---

      -   .md\\\\:prose-xl > ul > li > *:first-child {
      +   .md\\\\:markdown-xl > ul > li > *:first-child {

      ---

      -   .md\\\\:prose-xl > ul > li > *:last-child {
      +   .md\\\\:markdown-xl > ul > li > *:last-child {

      ---

      -   .md\\\\:prose-xl > ol > li > *:first-child {
      +   .md\\\\:markdown-xl > ol > li > *:first-child {

      ---

      -   .md\\\\:prose-xl > ol > li > *:last-child {
      +   .md\\\\:markdown-xl > ol > li > *:last-child {

      ---

      -   .md\\\\:prose-xl ul ul, .md\\\\:prose-xl ul ol, .md\\\\:prose-xl ol ul, .md\\\\:prose-xl ol ol {
      +   .md\\\\:markdown-xl ul ul, .md\\\\:markdown-xl ul ol, .md\\\\:markdown-xl ol ul, .md\\\\:markdown-xl ol ol {

      ---

      -   .md\\\\:prose-xl hr {
      +   .md\\\\:markdown-xl hr {

      ---

      -   .md\\\\:prose-xl hr + * {
      +   .md\\\\:markdown-xl hr + * {

      ---

      -   .md\\\\:prose-xl h2 + * {
      +   .md\\\\:markdown-xl h2 + * {

      ---

      -   .md\\\\:prose-xl h3 + * {
      +   .md\\\\:markdown-xl h3 + * {

      ---

      -   .md\\\\:prose-xl h4 + * {
      +   .md\\\\:markdown-xl h4 + * {

      ---

      -   .md\\\\:prose-xl table {
      +   .md\\\\:markdown-xl table {

      ---

      -   .md\\\\:prose-xl thead th {
      +   .md\\\\:markdown-xl thead th {

      ---

      -   .md\\\\:prose-xl thead th:first-child {
      +   .md\\\\:markdown-xl thead th:first-child {

      ---

      -   .md\\\\:prose-xl thead th:last-child {
      +   .md\\\\:markdown-xl thead th:last-child {

      ---

      -   .md\\\\:prose-xl tbody td {
      +   .md\\\\:markdown-xl tbody td {

      ---

      -   .md\\\\:prose-xl tbody td:first-child {
      +   .md\\\\:markdown-xl tbody td:first-child {

      ---

      -   .md\\\\:prose-xl tbody td:last-child {
      +   .md\\\\:markdown-xl tbody td:last-child {

      ---

      -   .md\\\\:prose-xl > :first-child {
      +   .md\\\\:markdown-xl > :first-child {

      ---

      -   .md\\\\:prose-xl > :last-child {
      +   .md\\\\:markdown-xl > :last-child {

      ---

      -   .md\\\\:prose-2xl {
      +   .md\\\\:markdown-2xl {

      ---

      -   .md\\\\:prose-2xl p {
      +   .md\\\\:markdown-2xl p {

      ---

      -   .md\\\\:prose-2xl [class~='lead'] {
      +   .md\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .md\\\\:prose-2xl blockquote {
      +   .md\\\\:markdown-2xl blockquote {

      ---

      -   .md\\\\:prose-2xl h1 {
      +   .md\\\\:markdown-2xl h1 {

      ---

      -   .md\\\\:prose-2xl h2 {
      +   .md\\\\:markdown-2xl h2 {

      ---

      -   .md\\\\:prose-2xl h3 {
      +   .md\\\\:markdown-2xl h3 {

      ---

      -   .md\\\\:prose-2xl h4 {
      +   .md\\\\:markdown-2xl h4 {

      ---

      -   .md\\\\:prose-2xl img {
      +   .md\\\\:markdown-2xl img {

      ---

      -   .md\\\\:prose-2xl video {
      +   .md\\\\:markdown-2xl video {

      ---

      -   .md\\\\:prose-2xl figure {
      +   .md\\\\:markdown-2xl figure {

      ---

      -   .md\\\\:prose-2xl figure > * {
      +   .md\\\\:markdown-2xl figure > * {

      ---

      -   .md\\\\:prose-2xl figure figcaption {
      +   .md\\\\:markdown-2xl figure figcaption {

      ---

      -   .md\\\\:prose-2xl code {
      +   .md\\\\:markdown-2xl code {

      ---

      -   .md\\\\:prose-2xl h2 code {
      +   .md\\\\:markdown-2xl h2 code {

      ---

      -   .md\\\\:prose-2xl h3 code {
      +   .md\\\\:markdown-2xl h3 code {

      ---

      -   .md\\\\:prose-2xl pre {
      +   .md\\\\:markdown-2xl pre {

      ---

      -   .md\\\\:prose-2xl ol {
      +   .md\\\\:markdown-2xl ol {

      ---

      -   .md\\\\:prose-2xl ul {
      +   .md\\\\:markdown-2xl ul {

      ---

      -   .md\\\\:prose-2xl li {
      +   .md\\\\:markdown-2xl li {

      ---

      -   .md\\\\:prose-2xl ol > li {
      +   .md\\\\:markdown-2xl ol > li {

      ---

      -   .md\\\\:prose-2xl ol > li::before {
      +   .md\\\\:markdown-2xl ol > li::before {

      ---

      -   .md\\\\:prose-2xl ul > li {
      +   .md\\\\:markdown-2xl ul > li {

      ---

      -   .md\\\\:prose-2xl ul > li::before {
      +   .md\\\\:markdown-2xl ul > li::before {

      ---

      -   .md\\\\:prose-2xl > ul > li p {
      +   .md\\\\:markdown-2xl > ul > li p {

      ---

      -   .md\\\\:prose-2xl > ul > li > *:first-child {
      +   .md\\\\:markdown-2xl > ul > li > *:first-child {

      ---

      -   .md\\\\:prose-2xl > ul > li > *:last-child {
      +   .md\\\\:markdown-2xl > ul > li > *:last-child {

      ---

      -   .md\\\\:prose-2xl > ol > li > *:first-child {
      +   .md\\\\:markdown-2xl > ol > li > *:first-child {

      ---

      -   .md\\\\:prose-2xl > ol > li > *:last-child {
      +   .md\\\\:markdown-2xl > ol > li > *:last-child {

      ---

      -   .md\\\\:prose-2xl ul ul, .md\\\\:prose-2xl ul ol, .md\\\\:prose-2xl ol ul, .md\\\\:prose-2xl ol ol {
      +   .md\\\\:markdown-2xl ul ul, .md\\\\:markdown-2xl ul ol, .md\\\\:markdown-2xl ol ul, .md\\\\:markdown-2xl ol ol {

      ---

      -   .md\\\\:prose-2xl hr {
      +   .md\\\\:markdown-2xl hr {

      ---

      -   .md\\\\:prose-2xl hr + * {
      +   .md\\\\:markdown-2xl hr + * {

      ---

      -   .md\\\\:prose-2xl h2 + * {
      +   .md\\\\:markdown-2xl h2 + * {

      ---

      -   .md\\\\:prose-2xl h3 + * {
      +   .md\\\\:markdown-2xl h3 + * {

      ---

      -   .md\\\\:prose-2xl h4 + * {
      +   .md\\\\:markdown-2xl h4 + * {

      ---

      -   .md\\\\:prose-2xl table {
      +   .md\\\\:markdown-2xl table {

      ---

      -   .md\\\\:prose-2xl thead th {
      +   .md\\\\:markdown-2xl thead th {

      ---

      -   .md\\\\:prose-2xl thead th:first-child {
      +   .md\\\\:markdown-2xl thead th:first-child {

      ---

      -   .md\\\\:prose-2xl thead th:last-child {
      +   .md\\\\:markdown-2xl thead th:last-child {

      ---

      -   .md\\\\:prose-2xl tbody td {
      +   .md\\\\:markdown-2xl tbody td {

      ---

      -   .md\\\\:prose-2xl tbody td:first-child {
      +   .md\\\\:markdown-2xl tbody td:first-child {

      ---

      -   .md\\\\:prose-2xl tbody td:last-child {
      +   .md\\\\:markdown-2xl tbody td:last-child {

      ---

      -   .md\\\\:prose-2xl > :first-child {
      +   .md\\\\:markdown-2xl > :first-child {

      ---

      -   .md\\\\:prose-2xl > :last-child {
      +   .md\\\\:markdown-2xl > :last-child {

      ---

      -   .md\\\\:prose-red a {
      +   .md\\\\:markdown-red a {

      ---

      -   .md\\\\:prose-red a code {
      +   .md\\\\:markdown-red a code {

      ---

      -   .md\\\\:prose-yellow a {
      +   .md\\\\:markdown-yellow a {

      ---

      -   .md\\\\:prose-yellow a code {
      +   .md\\\\:markdown-yellow a code {

      ---

      -   .md\\\\:prose-green a {
      +   .md\\\\:markdown-green a {

      ---

      -   .md\\\\:prose-green a code {
      +   .md\\\\:markdown-green a code {

      ---

      -   .md\\\\:prose-blue a {
      +   .md\\\\:markdown-blue a {

      ---

      -   .md\\\\:prose-blue a code {
      +   .md\\\\:markdown-blue a code {

      ---

      -   .md\\\\:prose-indigo a {
      +   .md\\\\:markdown-indigo a {

      ---

      -   .md\\\\:prose-indigo a code {
      +   .md\\\\:markdown-indigo a code {

      ---

      -   .md\\\\:prose-purple a {
      +   .md\\\\:markdown-purple a {

      ---

      -   .md\\\\:prose-purple a code {
      +   .md\\\\:markdown-purple a code {

      ---

      -   .md\\\\:prose-pink a {
      +   .md\\\\:markdown-pink a {

      ---

      -   .md\\\\:prose-pink a code {
      +   .md\\\\:markdown-pink a code {

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose [class~='lead'] {
      +   .lg\\\\:markdown [class~='lead'] {

      ---

      -   .lg\\\\:prose a {
      +   .lg\\\\:markdown a {

      ---

      -   .lg\\\\:prose strong {
      +   .lg\\\\:markdown strong {

      ---

      -   .lg\\\\:prose ol {
      +   .lg\\\\:markdown ol {

      ---

      -   .lg\\\\:prose ol > li {
      +   .lg\\\\:markdown ol > li {

      ---

      -   .lg\\\\:prose ol > li::before {
      +   .lg\\\\:markdown ol > li::before {

      ---

      -   .lg\\\\:prose ul > li {
      +   .lg\\\\:markdown ul > li {

      ---

      -   .lg\\\\:prose ul > li::before {
      +   .lg\\\\:markdown ul > li::before {

      ---

      -   .lg\\\\:prose hr {
      +   .lg\\\\:markdown hr {

      ---

      -   .lg\\\\:prose blockquote {
      +   .lg\\\\:markdown blockquote {

      ---

      -   .lg\\\\:prose blockquote p:first-of-type::before {
      +   .lg\\\\:markdown blockquote p:first-of-type::before {

      ---

      -   .lg\\\\:prose blockquote p:last-of-type::after {
      +   .lg\\\\:markdown blockquote p:last-of-type::after {

      ---

      -   .lg\\\\:prose h1 {
      +   .lg\\\\:markdown h1 {

      ---

      -   .lg\\\\:prose h2 {
      +   .lg\\\\:markdown h2 {

      ---

      -   .lg\\\\:prose h3 {
      +   .lg\\\\:markdown h3 {

      ---

      -   .lg\\\\:prose h4 {
      +   .lg\\\\:markdown h4 {

      ---

      -   .lg\\\\:prose figure figcaption {
      +   .lg\\\\:markdown figure figcaption {

      ---

      -   .lg\\\\:prose code {
      +   .lg\\\\:markdown code {

      ---

      -   .lg\\\\:prose code::before {
      +   .lg\\\\:markdown code::before {

      ---

      -   .lg\\\\:prose code::after {
      +   .lg\\\\:markdown code::after {

      ---

      -   .lg\\\\:prose a code {
      +   .lg\\\\:markdown a code {

      ---

      -   .lg\\\\:prose pre {
      +   .lg\\\\:markdown pre {

      ---

      -   .lg\\\\:prose pre code {
      +   .lg\\\\:markdown pre code {

      ---

      -   .lg\\\\:prose pre code::before {
      +   .lg\\\\:markdown pre code::before {

      ---

      -   .lg\\\\:prose pre code::after {
      +   .lg\\\\:markdown pre code::after {

      ---

      -   .lg\\\\:prose table {
      +   .lg\\\\:markdown table {

      ---

      -   .lg\\\\:prose thead {
      +   .lg\\\\:markdown thead {

      ---

      -   .lg\\\\:prose thead th {
      +   .lg\\\\:markdown thead th {

      ---

      -   .lg\\\\:prose tbody tr {
      +   .lg\\\\:markdown tbody tr {

      ---

      -   .lg\\\\:prose tbody tr:last-child {
      +   .lg\\\\:markdown tbody tr:last-child {

      ---

      -   .lg\\\\:prose tbody td {
      +   .lg\\\\:markdown tbody td {

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose p {
      +   .lg\\\\:markdown p {

      ---

      -   .lg\\\\:prose img {
      +   .lg\\\\:markdown img {

      ---

      -   .lg\\\\:prose video {
      +   .lg\\\\:markdown video {

      ---

      -   .lg\\\\:prose figure {
      +   .lg\\\\:markdown figure {

      ---

      -   .lg\\\\:prose figure > * {
      +   .lg\\\\:markdown figure > * {

      ---

      -   .lg\\\\:prose h2 code {
      +   .lg\\\\:markdown h2 code {

      ---

      -   .lg\\\\:prose h3 code {
      +   .lg\\\\:markdown h3 code {

      ---

      -   .lg\\\\:prose ul {
      +   .lg\\\\:markdown ul {

      ---

      -   .lg\\\\:prose li {
      +   .lg\\\\:markdown li {

      ---

      -   .lg\\\\:prose > ul > li p {
      +   .lg\\\\:markdown > ul > li p {

      ---

      -   .lg\\\\:prose > ul > li > *:first-child {
      +   .lg\\\\:markdown > ul > li > *:first-child {

      ---

      -   .lg\\\\:prose > ul > li > *:last-child {
      +   .lg\\\\:markdown > ul > li > *:last-child {

      ---

      -   .lg\\\\:prose > ol > li > *:first-child {
      +   .lg\\\\:markdown > ol > li > *:first-child {

      ---

      -   .lg\\\\:prose > ol > li > *:last-child {
      +   .lg\\\\:markdown > ol > li > *:last-child {

      ---

      -   .lg\\\\:prose ul ul, .lg\\\\:prose ul ol, .lg\\\\:prose ol ul, .lg\\\\:prose ol ol {
      +   .lg\\\\:markdown ul ul, .lg\\\\:markdown ul ol, .lg\\\\:markdown ol ul, .lg\\\\:markdown ol ol {

      ---

      -   .lg\\\\:prose hr + * {
      +   .lg\\\\:markdown hr + * {

      ---

      -   .lg\\\\:prose h2 + * {
      +   .lg\\\\:markdown h2 + * {

      ---

      -   .lg\\\\:prose h3 + * {
      +   .lg\\\\:markdown h3 + * {

      ---

      -   .lg\\\\:prose h4 + * {
      +   .lg\\\\:markdown h4 + * {

      ---

      -   .lg\\\\:prose thead th:first-child {
      +   .lg\\\\:markdown thead th:first-child {

      ---

      -   .lg\\\\:prose thead th:last-child {
      +   .lg\\\\:markdown thead th:last-child {

      ---

      -   .lg\\\\:prose tbody td:first-child {
      +   .lg\\\\:markdown tbody td:first-child {

      ---

      -   .lg\\\\:prose tbody td:last-child {
      +   .lg\\\\:markdown tbody td:last-child {

      ---

      -   .lg\\\\:prose > :first-child {
      +   .lg\\\\:markdown > :first-child {

      ---

      -   .lg\\\\:prose > :last-child {
      +   .lg\\\\:markdown > :last-child {

      ---

      -   .lg\\\\:prose-sm {
      +   .lg\\\\:markdown-sm {

      ---

      -   .lg\\\\:prose-sm p {
      +   .lg\\\\:markdown-sm p {

      ---

      -   .lg\\\\:prose-sm [class~='lead'] {
      +   .lg\\\\:markdown-sm [class~='lead'] {

      ---

      -   .lg\\\\:prose-sm blockquote {
      +   .lg\\\\:markdown-sm blockquote {

      ---

      -   .lg\\\\:prose-sm h1 {
      +   .lg\\\\:markdown-sm h1 {

      ---

      -   .lg\\\\:prose-sm h2 {
      +   .lg\\\\:markdown-sm h2 {

      ---

      -   .lg\\\\:prose-sm h3 {
      +   .lg\\\\:markdown-sm h3 {

      ---

      -   .lg\\\\:prose-sm h4 {
      +   .lg\\\\:markdown-sm h4 {

      ---

      -   .lg\\\\:prose-sm img {
      +   .lg\\\\:markdown-sm img {

      ---

      -   .lg\\\\:prose-sm video {
      +   .lg\\\\:markdown-sm video {

      ---

      -   .lg\\\\:prose-sm figure {
      +   .lg\\\\:markdown-sm figure {

      ---

      -   .lg\\\\:prose-sm figure > * {
      +   .lg\\\\:markdown-sm figure > * {

      ---

      -   .lg\\\\:prose-sm figure figcaption {
      +   .lg\\\\:markdown-sm figure figcaption {

      ---

      -   .lg\\\\:prose-sm code {
      +   .lg\\\\:markdown-sm code {

      ---

      -   .lg\\\\:prose-sm h2 code {
      +   .lg\\\\:markdown-sm h2 code {

      ---

      -   .lg\\\\:prose-sm h3 code {
      +   .lg\\\\:markdown-sm h3 code {

      ---

      -   .lg\\\\:prose-sm pre {
      +   .lg\\\\:markdown-sm pre {

      ---

      -   .lg\\\\:prose-sm ol {
      +   .lg\\\\:markdown-sm ol {

      ---

      -   .lg\\\\:prose-sm ul {
      +   .lg\\\\:markdown-sm ul {

      ---

      -   .lg\\\\:prose-sm li {
      +   .lg\\\\:markdown-sm li {

      ---

      -   .lg\\\\:prose-sm ol > li {
      +   .lg\\\\:markdown-sm ol > li {

      ---

      -   .lg\\\\:prose-sm ol > li::before {
      +   .lg\\\\:markdown-sm ol > li::before {

      ---

      -   .lg\\\\:prose-sm ul > li {
      +   .lg\\\\:markdown-sm ul > li {

      ---

      -   .lg\\\\:prose-sm ul > li::before {
      +   .lg\\\\:markdown-sm ul > li::before {

      ---

      -   .lg\\\\:prose-sm > ul > li p {
      +   .lg\\\\:markdown-sm > ul > li p {

      ---

      -   .lg\\\\:prose-sm > ul > li > *:first-child {
      +   .lg\\\\:markdown-sm > ul > li > *:first-child {

      ---

      -   .lg\\\\:prose-sm > ul > li > *:last-child {
      +   .lg\\\\:markdown-sm > ul > li > *:last-child {

      ---

      -   .lg\\\\:prose-sm > ol > li > *:first-child {
      +   .lg\\\\:markdown-sm > ol > li > *:first-child {

      ---

      -   .lg\\\\:prose-sm > ol > li > *:last-child {
      +   .lg\\\\:markdown-sm > ol > li > *:last-child {

      ---

      -   .lg\\\\:prose-sm ul ul, .lg\\\\:prose-sm ul ol, .lg\\\\:prose-sm ol ul, .lg\\\\:prose-sm ol ol {
      +   .lg\\\\:markdown-sm ul ul, .lg\\\\:markdown-sm ul ol, .lg\\\\:markdown-sm ol ul, .lg\\\\:markdown-sm ol ol {

      ---

      -   .lg\\\\:prose-sm hr {
      +   .lg\\\\:markdown-sm hr {

      ---

      -   .lg\\\\:prose-sm hr + * {
      +   .lg\\\\:markdown-sm hr + * {

      ---

      -   .lg\\\\:prose-sm h2 + * {
      +   .lg\\\\:markdown-sm h2 + * {

      ---

      -   .lg\\\\:prose-sm h3 + * {
      +   .lg\\\\:markdown-sm h3 + * {

      ---

      -   .lg\\\\:prose-sm h4 + * {
      +   .lg\\\\:markdown-sm h4 + * {

      ---

      -   .lg\\\\:prose-sm table {
      +   .lg\\\\:markdown-sm table {

      ---

      -   .lg\\\\:prose-sm thead th {
      +   .lg\\\\:markdown-sm thead th {

      ---

      -   .lg\\\\:prose-sm thead th:first-child {
      +   .lg\\\\:markdown-sm thead th:first-child {

      ---

      -   .lg\\\\:prose-sm thead th:last-child {
      +   .lg\\\\:markdown-sm thead th:last-child {

      ---

      -   .lg\\\\:prose-sm tbody td {
      +   .lg\\\\:markdown-sm tbody td {

      ---

      -   .lg\\\\:prose-sm tbody td:first-child {
      +   .lg\\\\:markdown-sm tbody td:first-child {

      ---

      -   .lg\\\\:prose-sm tbody td:last-child {
      +   .lg\\\\:markdown-sm tbody td:last-child {

      ---

      -   .lg\\\\:prose-sm > :first-child {
      +   .lg\\\\:markdown-sm > :first-child {

      ---

      -   .lg\\\\:prose-sm > :last-child {
      +   .lg\\\\:markdown-sm > :last-child {

      ---

      -   .lg\\\\:prose-lg {
      +   .lg\\\\:markdown-lg {

      ---

      -   .lg\\\\:prose-lg p {
      +   .lg\\\\:markdown-lg p {

      ---

      -   .lg\\\\:prose-lg [class~='lead'] {
      +   .lg\\\\:markdown-lg [class~='lead'] {

      ---

      -   .lg\\\\:prose-lg blockquote {
      +   .lg\\\\:markdown-lg blockquote {

      ---

      -   .lg\\\\:prose-lg h1 {
      +   .lg\\\\:markdown-lg h1 {

      ---

      -   .lg\\\\:prose-lg h2 {
      +   .lg\\\\:markdown-lg h2 {

      ---

      -   .lg\\\\:prose-lg h3 {
      +   .lg\\\\:markdown-lg h3 {

      ---

      -   .lg\\\\:prose-lg h4 {
      +   .lg\\\\:markdown-lg h4 {

      ---

      -   .lg\\\\:prose-lg img {
      +   .lg\\\\:markdown-lg img {

      ---

      -   .lg\\\\:prose-lg video {
      +   .lg\\\\:markdown-lg video {

      ---

      -   .lg\\\\:prose-lg figure {
      +   .lg\\\\:markdown-lg figure {

      ---

      -   .lg\\\\:prose-lg figure > * {
      +   .lg\\\\:markdown-lg figure > * {

      ---

      -   .lg\\\\:prose-lg figure figcaption {
      +   .lg\\\\:markdown-lg figure figcaption {

      ---

      -   .lg\\\\:prose-lg code {
      +   .lg\\\\:markdown-lg code {

      ---

      -   .lg\\\\:prose-lg h2 code {
      +   .lg\\\\:markdown-lg h2 code {

      ---

      -   .lg\\\\:prose-lg h3 code {
      +   .lg\\\\:markdown-lg h3 code {

      ---

      -   .lg\\\\:prose-lg pre {
      +   .lg\\\\:markdown-lg pre {

      ---

      -   .lg\\\\:prose-lg ol {
      +   .lg\\\\:markdown-lg ol {

      ---

      -   .lg\\\\:prose-lg ul {
      +   .lg\\\\:markdown-lg ul {

      ---

      -   .lg\\\\:prose-lg li {
      +   .lg\\\\:markdown-lg li {

      ---

      -   .lg\\\\:prose-lg ol > li {
      +   .lg\\\\:markdown-lg ol > li {

      ---

      -   .lg\\\\:prose-lg ol > li::before {
      +   .lg\\\\:markdown-lg ol > li::before {

      ---

      -   .lg\\\\:prose-lg ul > li {
      +   .lg\\\\:markdown-lg ul > li {

      ---

      -   .lg\\\\:prose-lg ul > li::before {
      +   .lg\\\\:markdown-lg ul > li::before {

      ---

      -   .lg\\\\:prose-lg > ul > li p {
      +   .lg\\\\:markdown-lg > ul > li p {

      ---

      -   .lg\\\\:prose-lg > ul > li > *:first-child {
      +   .lg\\\\:markdown-lg > ul > li > *:first-child {

      ---

      -   .lg\\\\:prose-lg > ul > li > *:last-child {
      +   .lg\\\\:markdown-lg > ul > li > *:last-child {

      ---

      -   .lg\\\\:prose-lg > ol > li > *:first-child {
      +   .lg\\\\:markdown-lg > ol > li > *:first-child {

      ---

      -   .lg\\\\:prose-lg > ol > li > *:last-child {
      +   .lg\\\\:markdown-lg > ol > li > *:last-child {

      ---

      -   .lg\\\\:prose-lg ul ul, .lg\\\\:prose-lg ul ol, .lg\\\\:prose-lg ol ul, .lg\\\\:prose-lg ol ol {
      +   .lg\\\\:markdown-lg ul ul, .lg\\\\:markdown-lg ul ol, .lg\\\\:markdown-lg ol ul, .lg\\\\:markdown-lg ol ol {

      ---

      -   .lg\\\\:prose-lg hr {
      +   .lg\\\\:markdown-lg hr {

      ---

      -   .lg\\\\:prose-lg hr + * {
      +   .lg\\\\:markdown-lg hr + * {

      ---

      -   .lg\\\\:prose-lg h2 + * {
      +   .lg\\\\:markdown-lg h2 + * {

      ---

      -   .lg\\\\:prose-lg h3 + * {
      +   .lg\\\\:markdown-lg h3 + * {

      ---

      -   .lg\\\\:prose-lg h4 + * {
      +   .lg\\\\:markdown-lg h4 + * {

      ---

      -   .lg\\\\:prose-lg table {
      +   .lg\\\\:markdown-lg table {

      ---

      -   .lg\\\\:prose-lg thead th {
      +   .lg\\\\:markdown-lg thead th {

      ---

      -   .lg\\\\:prose-lg thead th:first-child {
      +   .lg\\\\:markdown-lg thead th:first-child {

      ---

      -   .lg\\\\:prose-lg thead th:last-child {
      +   .lg\\\\:markdown-lg thead th:last-child {

      ---

      -   .lg\\\\:prose-lg tbody td {
      +   .lg\\\\:markdown-lg tbody td {

      ---

      -   .lg\\\\:prose-lg tbody td:first-child {
      +   .lg\\\\:markdown-lg tbody td:first-child {

      ---

      -   .lg\\\\:prose-lg tbody td:last-child {
      +   .lg\\\\:markdown-lg tbody td:last-child {

      ---

      -   .lg\\\\:prose-lg > :first-child {
      +   .lg\\\\:markdown-lg > :first-child {

      ---

      -   .lg\\\\:prose-lg > :last-child {
      +   .lg\\\\:markdown-lg > :last-child {

      ---

      -   .lg\\\\:prose-xl {
      +   .lg\\\\:markdown-xl {

      ---

      -   .lg\\\\:prose-xl p {
      +   .lg\\\\:markdown-xl p {

      ---

      -   .lg\\\\:prose-xl [class~='lead'] {
      +   .lg\\\\:markdown-xl [class~='lead'] {

      ---

      -   .lg\\\\:prose-xl blockquote {
      +   .lg\\\\:markdown-xl blockquote {

      ---

      -   .lg\\\\:prose-xl h1 {
      +   .lg\\\\:markdown-xl h1 {

      ---

      -   .lg\\\\:prose-xl h2 {
      +   .lg\\\\:markdown-xl h2 {

      ---

      -   .lg\\\\:prose-xl h3 {
      +   .lg\\\\:markdown-xl h3 {

      ---

      -   .lg\\\\:prose-xl h4 {
      +   .lg\\\\:markdown-xl h4 {

      ---

      -   .lg\\\\:prose-xl img {
      +   .lg\\\\:markdown-xl img {

      ---

      -   .lg\\\\:prose-xl video {
      +   .lg\\\\:markdown-xl video {

      ---

      -   .lg\\\\:prose-xl figure {
      +   .lg\\\\:markdown-xl figure {

      ---

      -   .lg\\\\:prose-xl figure > * {
      +   .lg\\\\:markdown-xl figure > * {

      ---

      -   .lg\\\\:prose-xl figure figcaption {
      +   .lg\\\\:markdown-xl figure figcaption {

      ---

      -   .lg\\\\:prose-xl code {
      +   .lg\\\\:markdown-xl code {

      ---

      -   .lg\\\\:prose-xl h2 code {
      +   .lg\\\\:markdown-xl h2 code {

      ---

      -   .lg\\\\:prose-xl h3 code {
      +   .lg\\\\:markdown-xl h3 code {

      ---

      -   .lg\\\\:prose-xl pre {
      +   .lg\\\\:markdown-xl pre {

      ---

      -   .lg\\\\:prose-xl ol {
      +   .lg\\\\:markdown-xl ol {

      ---

      -   .lg\\\\:prose-xl ul {
      +   .lg\\\\:markdown-xl ul {

      ---

      -   .lg\\\\:prose-xl li {
      +   .lg\\\\:markdown-xl li {

      ---

      -   .lg\\\\:prose-xl ol > li {
      +   .lg\\\\:markdown-xl ol > li {

      ---

      -   .lg\\\\:prose-xl ol > li::before {
      +   .lg\\\\:markdown-xl ol > li::before {

      ---

      -   .lg\\\\:prose-xl ul > li {
      +   .lg\\\\:markdown-xl ul > li {

      ---

      -   .lg\\\\:prose-xl ul > li::before {
      +   .lg\\\\:markdown-xl ul > li::before {

      ---

      -   .lg\\\\:prose-xl > ul > li p {
      +   .lg\\\\:markdown-xl > ul > li p {

      ---

      -   .lg\\\\:prose-xl > ul > li > *:first-child {
      +   .lg\\\\:markdown-xl > ul > li > *:first-child {

      ---

      -   .lg\\\\:prose-xl > ul > li > *:last-child {
      +   .lg\\\\:markdown-xl > ul > li > *:last-child {

      ---

      -   .lg\\\\:prose-xl > ol > li > *:first-child {
      +   .lg\\\\:markdown-xl > ol > li > *:first-child {

      ---

      -   .lg\\\\:prose-xl > ol > li > *:last-child {
      +   .lg\\\\:markdown-xl > ol > li > *:last-child {

      ---

      -   .lg\\\\:prose-xl ul ul, .lg\\\\:prose-xl ul ol, .lg\\\\:prose-xl ol ul, .lg\\\\:prose-xl ol ol {
      +   .lg\\\\:markdown-xl ul ul, .lg\\\\:markdown-xl ul ol, .lg\\\\:markdown-xl ol ul, .lg\\\\:markdown-xl ol ol {

      ---

      -   .lg\\\\:prose-xl hr {
      +   .lg\\\\:markdown-xl hr {

      ---

      -   .lg\\\\:prose-xl hr + * {
      +   .lg\\\\:markdown-xl hr + * {

      ---

      -   .lg\\\\:prose-xl h2 + * {
      +   .lg\\\\:markdown-xl h2 + * {

      ---

      -   .lg\\\\:prose-xl h3 + * {
      +   .lg\\\\:markdown-xl h3 + * {

      ---

      -   .lg\\\\:prose-xl h4 + * {
      +   .lg\\\\:markdown-xl h4 + * {

      ---

      -   .lg\\\\:prose-xl table {
      +   .lg\\\\:markdown-xl table {

      ---

      -   .lg\\\\:prose-xl thead th {
      +   .lg\\\\:markdown-xl thead th {

      ---

      -   .lg\\\\:prose-xl thead th:first-child {
      +   .lg\\\\:markdown-xl thead th:first-child {

      ---

      -   .lg\\\\:prose-xl thead th:last-child {
      +   .lg\\\\:markdown-xl thead th:last-child {

      ---

      -   .lg\\\\:prose-xl tbody td {
      +   .lg\\\\:markdown-xl tbody td {

      ---

      -   .lg\\\\:prose-xl tbody td:first-child {
      +   .lg\\\\:markdown-xl tbody td:first-child {

      ---

      -   .lg\\\\:prose-xl tbody td:last-child {
      +   .lg\\\\:markdown-xl tbody td:last-child {

      ---

      -   .lg\\\\:prose-xl > :first-child {
      +   .lg\\\\:markdown-xl > :first-child {

      ---

      -   .lg\\\\:prose-xl > :last-child {
      +   .lg\\\\:markdown-xl > :last-child {

      ---

      -   .lg\\\\:prose-2xl {
      +   .lg\\\\:markdown-2xl {

      ---

      -   .lg\\\\:prose-2xl p {
      +   .lg\\\\:markdown-2xl p {

      ---

      -   .lg\\\\:prose-2xl [class~='lead'] {
      +   .lg\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .lg\\\\:prose-2xl blockquote {
      +   .lg\\\\:markdown-2xl blockquote {

      ---

      -   .lg\\\\:prose-2xl h1 {
      +   .lg\\\\:markdown-2xl h1 {

      ---

      -   .lg\\\\:prose-2xl h2 {
      +   .lg\\\\:markdown-2xl h2 {

      ---

      -   .lg\\\\:prose-2xl h3 {
      +   .lg\\\\:markdown-2xl h3 {

      ---

      -   .lg\\\\:prose-2xl h4 {
      +   .lg\\\\:markdown-2xl h4 {

      ---

      -   .lg\\\\:prose-2xl img {
      +   .lg\\\\:markdown-2xl img {

      ---

      -   .lg\\\\:prose-2xl video {
      +   .lg\\\\:markdown-2xl video {

      ---

      -   .lg\\\\:prose-2xl figure {
      +   .lg\\\\:markdown-2xl figure {

      ---

      -   .lg\\\\:prose-2xl figure > * {
      +   .lg\\\\:markdown-2xl figure > * {

      ---

      -   .lg\\\\:prose-2xl figure figcaption {
      +   .lg\\\\:markdown-2xl figure figcaption {

      ---

      -   .lg\\\\:prose-2xl code {
      +   .lg\\\\:markdown-2xl code {

      ---

      -   .lg\\\\:prose-2xl h2 code {
      +   .lg\\\\:markdown-2xl h2 code {

      ---

      -   .lg\\\\:prose-2xl h3 code {
      +   .lg\\\\:markdown-2xl h3 code {

      ---

      -   .lg\\\\:prose-2xl pre {
      +   .lg\\\\:markdown-2xl pre {

      ---

      -   .lg\\\\:prose-2xl ol {
      +   .lg\\\\:markdown-2xl ol {

      ---

      -   .lg\\\\:prose-2xl ul {
      +   .lg\\\\:markdown-2xl ul {

      ---

      -   .lg\\\\:prose-2xl li {
      +   .lg\\\\:markdown-2xl li {

      ---

      -   .lg\\\\:prose-2xl ol > li {
      +   .lg\\\\:markdown-2xl ol > li {

      ---

      -   .lg\\\\:prose-2xl ol > li::before {
      +   .lg\\\\:markdown-2xl ol > li::before {

      ---

      -   .lg\\\\:prose-2xl ul > li {
      +   .lg\\\\:markdown-2xl ul > li {

      ---

      -   .lg\\\\:prose-2xl ul > li::before {
      +   .lg\\\\:markdown-2xl ul > li::before {

      ---

      -   .lg\\\\:prose-2xl > ul > li p {
      +   .lg\\\\:markdown-2xl > ul > li p {

      ---

      -   .lg\\\\:prose-2xl > ul > li > *:first-child {
      +   .lg\\\\:markdown-2xl > ul > li > *:first-child {

      ---

      -   .lg\\\\:prose-2xl > ul > li > *:last-child {
      +   .lg\\\\:markdown-2xl > ul > li > *:last-child {

      ---

      -   .lg\\\\:prose-2xl > ol > li > *:first-child {
      +   .lg\\\\:markdown-2xl > ol > li > *:first-child {

      ---

      -   .lg\\\\:prose-2xl > ol > li > *:last-child {
      +   .lg\\\\:markdown-2xl > ol > li > *:last-child {

      ---

      -   .lg\\\\:prose-2xl ul ul, .lg\\\\:prose-2xl ul ol, .lg\\\\:prose-2xl ol ul, .lg\\\\:prose-2xl ol ol {
      +   .lg\\\\:markdown-2xl ul ul, .lg\\\\:markdown-2xl ul ol, .lg\\\\:markdown-2xl ol ul, .lg\\\\:markdown-2xl ol ol {

      ---

      -   .lg\\\\:prose-2xl hr {
      +   .lg\\\\:markdown-2xl hr {

      ---

      -   .lg\\\\:prose-2xl hr + * {
      +   .lg\\\\:markdown-2xl hr + * {

      ---

      -   .lg\\\\:prose-2xl h2 + * {
      +   .lg\\\\:markdown-2xl h2 + * {

      ---

      -   .lg\\\\:prose-2xl h3 + * {
      +   .lg\\\\:markdown-2xl h3 + * {

      ---

      -   .lg\\\\:prose-2xl h4 + * {
      +   .lg\\\\:markdown-2xl h4 + * {

      ---

      -   .lg\\\\:prose-2xl table {
      +   .lg\\\\:markdown-2xl table {

      ---

      -   .lg\\\\:prose-2xl thead th {
      +   .lg\\\\:markdown-2xl thead th {

      ---

      -   .lg\\\\:prose-2xl thead th:first-child {
      +   .lg\\\\:markdown-2xl thead th:first-child {

      ---

      -   .lg\\\\:prose-2xl thead th:last-child {
      +   .lg\\\\:markdown-2xl thead th:last-child {

      ---

      -   .lg\\\\:prose-2xl tbody td {
      +   .lg\\\\:markdown-2xl tbody td {

      ---

      -   .lg\\\\:prose-2xl tbody td:first-child {
      +   .lg\\\\:markdown-2xl tbody td:first-child {

      ---

      -   .lg\\\\:prose-2xl tbody td:last-child {
      +   .lg\\\\:markdown-2xl tbody td:last-child {

      ---

      -   .lg\\\\:prose-2xl > :first-child {
      +   .lg\\\\:markdown-2xl > :first-child {

      ---

      -   .lg\\\\:prose-2xl > :last-child {
      +   .lg\\\\:markdown-2xl > :last-child {

      ---

      -   .lg\\\\:prose-red a {
      +   .lg\\\\:markdown-red a {

      ---

      -   .lg\\\\:prose-red a code {
      +   .lg\\\\:markdown-red a code {

      ---

      -   .lg\\\\:prose-yellow a {
      +   .lg\\\\:markdown-yellow a {

      ---

      -   .lg\\\\:prose-yellow a code {
      +   .lg\\\\:markdown-yellow a code {

      ---

      -   .lg\\\\:prose-green a {
      +   .lg\\\\:markdown-green a {

      ---

      -   .lg\\\\:prose-green a code {
      +   .lg\\\\:markdown-green a code {

      ---

      -   .lg\\\\:prose-blue a {
      +   .lg\\\\:markdown-blue a {

      ---

      -   .lg\\\\:prose-blue a code {
      +   .lg\\\\:markdown-blue a code {

      ---

      -   .lg\\\\:prose-indigo a {
      +   .lg\\\\:markdown-indigo a {

      ---

      -   .lg\\\\:prose-indigo a code {
      +   .lg\\\\:markdown-indigo a code {

      ---

      -   .lg\\\\:prose-purple a {
      +   .lg\\\\:markdown-purple a {

      ---

      -   .lg\\\\:prose-purple a code {
      +   .lg\\\\:markdown-purple a code {

      ---

      -   .lg\\\\:prose-pink a {
      +   .lg\\\\:markdown-pink a {

      ---

      -   .lg\\\\:prose-pink a code {
      +   .lg\\\\:markdown-pink a code {

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose [class~='lead'] {
      +   .xl\\\\:markdown [class~='lead'] {

      ---

      -   .xl\\\\:prose a {
      +   .xl\\\\:markdown a {

      ---

      -   .xl\\\\:prose strong {
      +   .xl\\\\:markdown strong {

      ---

      -   .xl\\\\:prose ol {
      +   .xl\\\\:markdown ol {

      ---

      -   .xl\\\\:prose ol > li {
      +   .xl\\\\:markdown ol > li {

      ---

      -   .xl\\\\:prose ol > li::before {
      +   .xl\\\\:markdown ol > li::before {

      ---

      -   .xl\\\\:prose ul > li {
      +   .xl\\\\:markdown ul > li {

      ---

      -   .xl\\\\:prose ul > li::before {
      +   .xl\\\\:markdown ul > li::before {

      ---

      -   .xl\\\\:prose hr {
      +   .xl\\\\:markdown hr {

      ---

      -   .xl\\\\:prose blockquote {
      +   .xl\\\\:markdown blockquote {

      ---

      -   .xl\\\\:prose blockquote p:first-of-type::before {
      +   .xl\\\\:markdown blockquote p:first-of-type::before {

      ---

      -   .xl\\\\:prose blockquote p:last-of-type::after {
      +   .xl\\\\:markdown blockquote p:last-of-type::after {

      ---

      -   .xl\\\\:prose h1 {
      +   .xl\\\\:markdown h1 {

      ---

      -   .xl\\\\:prose h2 {
      +   .xl\\\\:markdown h2 {

      ---

      -   .xl\\\\:prose h3 {
      +   .xl\\\\:markdown h3 {

      ---

      -   .xl\\\\:prose h4 {
      +   .xl\\\\:markdown h4 {

      ---

      -   .xl\\\\:prose figure figcaption {
      +   .xl\\\\:markdown figure figcaption {

      ---

      -   .xl\\\\:prose code {
      +   .xl\\\\:markdown code {

      ---

      -   .xl\\\\:prose code::before {
      +   .xl\\\\:markdown code::before {

      ---

      -   .xl\\\\:prose code::after {
      +   .xl\\\\:markdown code::after {

      ---

      -   .xl\\\\:prose a code {
      +   .xl\\\\:markdown a code {

      ---

      -   .xl\\\\:prose pre {
      +   .xl\\\\:markdown pre {

      ---

      -   .xl\\\\:prose pre code {
      +   .xl\\\\:markdown pre code {

      ---

      -   .xl\\\\:prose pre code::before {
      +   .xl\\\\:markdown pre code::before {

      ---

      -   .xl\\\\:prose pre code::after {
      +   .xl\\\\:markdown pre code::after {

      ---

      -   .xl\\\\:prose table {
      +   .xl\\\\:markdown table {

      ---

      -   .xl\\\\:prose thead {
      +   .xl\\\\:markdown thead {

      ---

      -   .xl\\\\:prose thead th {
      +   .xl\\\\:markdown thead th {

      ---

      -   .xl\\\\:prose tbody tr {
      +   .xl\\\\:markdown tbody tr {

      ---

      -   .xl\\\\:prose tbody tr:last-child {
      +   .xl\\\\:markdown tbody tr:last-child {

      ---

      -   .xl\\\\:prose tbody td {
      +   .xl\\\\:markdown tbody td {

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose p {
      +   .xl\\\\:markdown p {

      ---

      -   .xl\\\\:prose img {
      +   .xl\\\\:markdown img {

      ---

      -   .xl\\\\:prose video {
      +   .xl\\\\:markdown video {

      ---

      -   .xl\\\\:prose figure {
      +   .xl\\\\:markdown figure {

      ---

      -   .xl\\\\:prose figure > * {
      +   .xl\\\\:markdown figure > * {

      ---

      -   .xl\\\\:prose h2 code {
      +   .xl\\\\:markdown h2 code {

      ---

      -   .xl\\\\:prose h3 code {
      +   .xl\\\\:markdown h3 code {

      ---

      -   .xl\\\\:prose ul {
      +   .xl\\\\:markdown ul {

      ---

      -   .xl\\\\:prose li {
      +   .xl\\\\:markdown li {

      ---

      -   .xl\\\\:prose > ul > li p {
      +   .xl\\\\:markdown > ul > li p {

      ---

      -   .xl\\\\:prose > ul > li > *:first-child {
      +   .xl\\\\:markdown > ul > li > *:first-child {

      ---

      -   .xl\\\\:prose > ul > li > *:last-child {
      +   .xl\\\\:markdown > ul > li > *:last-child {

      ---

      -   .xl\\\\:prose > ol > li > *:first-child {
      +   .xl\\\\:markdown > ol > li > *:first-child {

      ---

      -   .xl\\\\:prose > ol > li > *:last-child {
      +   .xl\\\\:markdown > ol > li > *:last-child {

      ---

      -   .xl\\\\:prose ul ul, .xl\\\\:prose ul ol, .xl\\\\:prose ol ul, .xl\\\\:prose ol ol {
      +   .xl\\\\:markdown ul ul, .xl\\\\:markdown ul ol, .xl\\\\:markdown ol ul, .xl\\\\:markdown ol ol {

      ---

      -   .xl\\\\:prose hr + * {
      +   .xl\\\\:markdown hr + * {

      ---

      -   .xl\\\\:prose h2 + * {
      +   .xl\\\\:markdown h2 + * {

      ---

      -   .xl\\\\:prose h3 + * {
      +   .xl\\\\:markdown h3 + * {

      ---

      -   .xl\\\\:prose h4 + * {
      +   .xl\\\\:markdown h4 + * {

      ---

      -   .xl\\\\:prose thead th:first-child {
      +   .xl\\\\:markdown thead th:first-child {

      ---

      -   .xl\\\\:prose thead th:last-child {
      +   .xl\\\\:markdown thead th:last-child {

      ---

      -   .xl\\\\:prose tbody td:first-child {
      +   .xl\\\\:markdown tbody td:first-child {

      ---

      -   .xl\\\\:prose tbody td:last-child {
      +   .xl\\\\:markdown tbody td:last-child {

      ---

      -   .xl\\\\:prose > :first-child {
      +   .xl\\\\:markdown > :first-child {

      ---

      -   .xl\\\\:prose > :last-child {
      +   .xl\\\\:markdown > :last-child {

      ---

      -   .xl\\\\:prose-sm {
      +   .xl\\\\:markdown-sm {

      ---

      -   .xl\\\\:prose-sm p {
      +   .xl\\\\:markdown-sm p {

      ---

      -   .xl\\\\:prose-sm [class~='lead'] {
      +   .xl\\\\:markdown-sm [class~='lead'] {

      ---

      -   .xl\\\\:prose-sm blockquote {
      +   .xl\\\\:markdown-sm blockquote {

      ---

      -   .xl\\\\:prose-sm h1 {
      +   .xl\\\\:markdown-sm h1 {

      ---

      -   .xl\\\\:prose-sm h2 {
      +   .xl\\\\:markdown-sm h2 {

      ---

      -   .xl\\\\:prose-sm h3 {
      +   .xl\\\\:markdown-sm h3 {

      ---

      -   .xl\\\\:prose-sm h4 {
      +   .xl\\\\:markdown-sm h4 {

      ---

      -   .xl\\\\:prose-sm img {
      +   .xl\\\\:markdown-sm img {

      ---

      -   .xl\\\\:prose-sm video {
      +   .xl\\\\:markdown-sm video {

      ---

      -   .xl\\\\:prose-sm figure {
      +   .xl\\\\:markdown-sm figure {

      ---

      -   .xl\\\\:prose-sm figure > * {
      +   .xl\\\\:markdown-sm figure > * {

      ---

      -   .xl\\\\:prose-sm figure figcaption {
      +   .xl\\\\:markdown-sm figure figcaption {

      ---

      -   .xl\\\\:prose-sm code {
      +   .xl\\\\:markdown-sm code {

      ---

      -   .xl\\\\:prose-sm h2 code {
      +   .xl\\\\:markdown-sm h2 code {

      ---

      -   .xl\\\\:prose-sm h3 code {
      +   .xl\\\\:markdown-sm h3 code {

      ---

      -   .xl\\\\:prose-sm pre {
      +   .xl\\\\:markdown-sm pre {

      ---

      -   .xl\\\\:prose-sm ol {
      +   .xl\\\\:markdown-sm ol {

      ---

      -   .xl\\\\:prose-sm ul {
      +   .xl\\\\:markdown-sm ul {

      ---

      -   .xl\\\\:prose-sm li {
      +   .xl\\\\:markdown-sm li {

      ---

      -   .xl\\\\:prose-sm ol > li {
      +   .xl\\\\:markdown-sm ol > li {

      ---

      -   .xl\\\\:prose-sm ol > li::before {
      +   .xl\\\\:markdown-sm ol > li::before {

      ---

      -   .xl\\\\:prose-sm ul > li {
      +   .xl\\\\:markdown-sm ul > li {

      ---

      -   .xl\\\\:prose-sm ul > li::before {
      +   .xl\\\\:markdown-sm ul > li::before {

      ---

      -   .xl\\\\:prose-sm > ul > li p {
      +   .xl\\\\:markdown-sm > ul > li p {

      ---

      -   .xl\\\\:prose-sm > ul > li > *:first-child {
      +   .xl\\\\:markdown-sm > ul > li > *:first-child {

      ---

      -   .xl\\\\:prose-sm > ul > li > *:last-child {
      +   .xl\\\\:markdown-sm > ul > li > *:last-child {

      ---

      -   .xl\\\\:prose-sm > ol > li > *:first-child {
      +   .xl\\\\:markdown-sm > ol > li > *:first-child {

      ---

      -   .xl\\\\:prose-sm > ol > li > *:last-child {
      +   .xl\\\\:markdown-sm > ol > li > *:last-child {

      ---

      -   .xl\\\\:prose-sm ul ul, .xl\\\\:prose-sm ul ol, .xl\\\\:prose-sm ol ul, .xl\\\\:prose-sm ol ol {
      +   .xl\\\\:markdown-sm ul ul, .xl\\\\:markdown-sm ul ol, .xl\\\\:markdown-sm ol ul, .xl\\\\:markdown-sm ol ol {

      ---

      -   .xl\\\\:prose-sm hr {
      +   .xl\\\\:markdown-sm hr {

      ---

      -   .xl\\\\:prose-sm hr + * {
      +   .xl\\\\:markdown-sm hr + * {

      ---

      -   .xl\\\\:prose-sm h2 + * {
      +   .xl\\\\:markdown-sm h2 + * {

      ---

      -   .xl\\\\:prose-sm h3 + * {
      +   .xl\\\\:markdown-sm h3 + * {

      ---

      -   .xl\\\\:prose-sm h4 + * {
      +   .xl\\\\:markdown-sm h4 + * {

      ---

      -   .xl\\\\:prose-sm table {
      +   .xl\\\\:markdown-sm table {

      ---

      -   .xl\\\\:prose-sm thead th {
      +   .xl\\\\:markdown-sm thead th {

      ---

      -   .xl\\\\:prose-sm thead th:first-child {
      +   .xl\\\\:markdown-sm thead th:first-child {

      ---

      -   .xl\\\\:prose-sm thead th:last-child {
      +   .xl\\\\:markdown-sm thead th:last-child {

      ---

      -   .xl\\\\:prose-sm tbody td {
      +   .xl\\\\:markdown-sm tbody td {

      ---

      -   .xl\\\\:prose-sm tbody td:first-child {
      +   .xl\\\\:markdown-sm tbody td:first-child {

      ---

      -   .xl\\\\:prose-sm tbody td:last-child {
      +   .xl\\\\:markdown-sm tbody td:last-child {

      ---

      -   .xl\\\\:prose-sm > :first-child {
      +   .xl\\\\:markdown-sm > :first-child {

      ---

      -   .xl\\\\:prose-sm > :last-child {
      +   .xl\\\\:markdown-sm > :last-child {

      ---

      -   .xl\\\\:prose-lg {
      +   .xl\\\\:markdown-lg {

      ---

      -   .xl\\\\:prose-lg p {
      +   .xl\\\\:markdown-lg p {

      ---

      -   .xl\\\\:prose-lg [class~='lead'] {
      +   .xl\\\\:markdown-lg [class~='lead'] {

      ---

      -   .xl\\\\:prose-lg blockquote {
      +   .xl\\\\:markdown-lg blockquote {

      ---

      -   .xl\\\\:prose-lg h1 {
      +   .xl\\\\:markdown-lg h1 {

      ---

      -   .xl\\\\:prose-lg h2 {
      +   .xl\\\\:markdown-lg h2 {

      ---

      -   .xl\\\\:prose-lg h3 {
      +   .xl\\\\:markdown-lg h3 {

      ---

      -   .xl\\\\:prose-lg h4 {
      +   .xl\\\\:markdown-lg h4 {

      ---

      -   .xl\\\\:prose-lg img {
      +   .xl\\\\:markdown-lg img {

      ---

      -   .xl\\\\:prose-lg video {
      +   .xl\\\\:markdown-lg video {

      ---

      -   .xl\\\\:prose-lg figure {
      +   .xl\\\\:markdown-lg figure {

      ---

      -   .xl\\\\:prose-lg figure > * {
      +   .xl\\\\:markdown-lg figure > * {

      ---

      -   .xl\\\\:prose-lg figure figcaption {
      +   .xl\\\\:markdown-lg figure figcaption {

      ---

      -   .xl\\\\:prose-lg code {
      +   .xl\\\\:markdown-lg code {

      ---

      -   .xl\\\\:prose-lg h2 code {
      +   .xl\\\\:markdown-lg h2 code {

      ---

      -   .xl\\\\:prose-lg h3 code {
      +   .xl\\\\:markdown-lg h3 code {

      ---

      -   .xl\\\\:prose-lg pre {
      +   .xl\\\\:markdown-lg pre {

      ---

      -   .xl\\\\:prose-lg ol {
      +   .xl\\\\:markdown-lg ol {

      ---

      -   .xl\\\\:prose-lg ul {
      +   .xl\\\\:markdown-lg ul {

      ---

      -   .xl\\\\:prose-lg li {
      +   .xl\\\\:markdown-lg li {

      ---

      -   .xl\\\\:prose-lg ol > li {
      +   .xl\\\\:markdown-lg ol > li {

      ---

      -   .xl\\\\:prose-lg ol > li::before {
      +   .xl\\\\:markdown-lg ol > li::before {

      ---

      -   .xl\\\\:prose-lg ul > li {
      +   .xl\\\\:markdown-lg ul > li {

      ---

      -   .xl\\\\:prose-lg ul > li::before {
      +   .xl\\\\:markdown-lg ul > li::before {

      ---

      -   .xl\\\\:prose-lg > ul > li p {
      +   .xl\\\\:markdown-lg > ul > li p {

      ---

      -   .xl\\\\:prose-lg > ul > li > *:first-child {
      +   .xl\\\\:markdown-lg > ul > li > *:first-child {

      ---

      -   .xl\\\\:prose-lg > ul > li > *:last-child {
      +   .xl\\\\:markdown-lg > ul > li > *:last-child {

      ---

      -   .xl\\\\:prose-lg > ol > li > *:first-child {
      +   .xl\\\\:markdown-lg > ol > li > *:first-child {

      ---

      -   .xl\\\\:prose-lg > ol > li > *:last-child {
      +   .xl\\\\:markdown-lg > ol > li > *:last-child {

      ---

      -   .xl\\\\:prose-lg ul ul, .xl\\\\:prose-lg ul ol, .xl\\\\:prose-lg ol ul, .xl\\\\:prose-lg ol ol {
      +   .xl\\\\:markdown-lg ul ul, .xl\\\\:markdown-lg ul ol, .xl\\\\:markdown-lg ol ul, .xl\\\\:markdown-lg ol ol {

      ---

      -   .xl\\\\:prose-lg hr {
      +   .xl\\\\:markdown-lg hr {

      ---

      -   .xl\\\\:prose-lg hr + * {
      +   .xl\\\\:markdown-lg hr + * {

      ---

      -   .xl\\\\:prose-lg h2 + * {
      +   .xl\\\\:markdown-lg h2 + * {

      ---

      -   .xl\\\\:prose-lg h3 + * {
      +   .xl\\\\:markdown-lg h3 + * {

      ---

      -   .xl\\\\:prose-lg h4 + * {
      +   .xl\\\\:markdown-lg h4 + * {

      ---

      -   .xl\\\\:prose-lg table {
      +   .xl\\\\:markdown-lg table {

      ---

      -   .xl\\\\:prose-lg thead th {
      +   .xl\\\\:markdown-lg thead th {

      ---

      -   .xl\\\\:prose-lg thead th:first-child {
      +   .xl\\\\:markdown-lg thead th:first-child {

      ---

      -   .xl\\\\:prose-lg thead th:last-child {
      +   .xl\\\\:markdown-lg thead th:last-child {

      ---

      -   .xl\\\\:prose-lg tbody td {
      +   .xl\\\\:markdown-lg tbody td {

      ---

      -   .xl\\\\:prose-lg tbody td:first-child {
      +   .xl\\\\:markdown-lg tbody td:first-child {

      ---

      -   .xl\\\\:prose-lg tbody td:last-child {
      +   .xl\\\\:markdown-lg tbody td:last-child {

      ---

      -   .xl\\\\:prose-lg > :first-child {
      +   .xl\\\\:markdown-lg > :first-child {

      ---

      -   .xl\\\\:prose-lg > :last-child {
      +   .xl\\\\:markdown-lg > :last-child {

      ---

      -   .xl\\\\:prose-xl {
      +   .xl\\\\:markdown-xl {

      ---

      -   .xl\\\\:prose-xl p {
      +   .xl\\\\:markdown-xl p {

      ---

      -   .xl\\\\:prose-xl [class~='lead'] {
      +   .xl\\\\:markdown-xl [class~='lead'] {

      ---

      -   .xl\\\\:prose-xl blockquote {
      +   .xl\\\\:markdown-xl blockquote {

      ---

      -   .xl\\\\:prose-xl h1 {
      +   .xl\\\\:markdown-xl h1 {

      ---

      -   .xl\\\\:prose-xl h2 {
      +   .xl\\\\:markdown-xl h2 {

      ---

      -   .xl\\\\:prose-xl h3 {
      +   .xl\\\\:markdown-xl h3 {

      ---

      -   .xl\\\\:prose-xl h4 {
      +   .xl\\\\:markdown-xl h4 {

      ---

      -   .xl\\\\:prose-xl img {
      +   .xl\\\\:markdown-xl img {

      ---

      -   .xl\\\\:prose-xl video {
      +   .xl\\\\:markdown-xl video {

      ---

      -   .xl\\\\:prose-xl figure {
      +   .xl\\\\:markdown-xl figure {

      ---

      -   .xl\\\\:prose-xl figure > * {
      +   .xl\\\\:markdown-xl figure > * {

      ---

      -   .xl\\\\:prose-xl figure figcaption {
      +   .xl\\\\:markdown-xl figure figcaption {

      ---

      -   .xl\\\\:prose-xl code {
      +   .xl\\\\:markdown-xl code {

      ---

      -   .xl\\\\:prose-xl h2 code {
      +   .xl\\\\:markdown-xl h2 code {

      ---

      -   .xl\\\\:prose-xl h3 code {
      +   .xl\\\\:markdown-xl h3 code {

      ---

      -   .xl\\\\:prose-xl pre {
      +   .xl\\\\:markdown-xl pre {

      ---

      -   .xl\\\\:prose-xl ol {
      +   .xl\\\\:markdown-xl ol {

      ---

      -   .xl\\\\:prose-xl ul {
      +   .xl\\\\:markdown-xl ul {

      ---

      -   .xl\\\\:prose-xl li {
      +   .xl\\\\:markdown-xl li {

      ---

      -   .xl\\\\:prose-xl ol > li {
      +   .xl\\\\:markdown-xl ol > li {

      ---

      -   .xl\\\\:prose-xl ol > li::before {
      +   .xl\\\\:markdown-xl ol > li::before {

      ---

      -   .xl\\\\:prose-xl ul > li {
      +   .xl\\\\:markdown-xl ul > li {

      ---

      -   .xl\\\\:prose-xl ul > li::before {
      +   .xl\\\\:markdown-xl ul > li::before {

      ---

      -   .xl\\\\:prose-xl > ul > li p {
      +   .xl\\\\:markdown-xl > ul > li p {

      ---

      -   .xl\\\\:prose-xl > ul > li > *:first-child {
      +   .xl\\\\:markdown-xl > ul > li > *:first-child {

      ---

      -   .xl\\\\:prose-xl > ul > li > *:last-child {
      +   .xl\\\\:markdown-xl > ul > li > *:last-child {

      ---

      -   .xl\\\\:prose-xl > ol > li > *:first-child {
      +   .xl\\\\:markdown-xl > ol > li > *:first-child {

      ---

      -   .xl\\\\:prose-xl > ol > li > *:last-child {
      +   .xl\\\\:markdown-xl > ol > li > *:last-child {

      ---

      -   .xl\\\\:prose-xl ul ul, .xl\\\\:prose-xl ul ol, .xl\\\\:prose-xl ol ul, .xl\\\\:prose-xl ol ol {
      +   .xl\\\\:markdown-xl ul ul, .xl\\\\:markdown-xl ul ol, .xl\\\\:markdown-xl ol ul, .xl\\\\:markdown-xl ol ol {

      ---

      -   .xl\\\\:prose-xl hr {
      +   .xl\\\\:markdown-xl hr {

      ---

      -   .xl\\\\:prose-xl hr + * {
      +   .xl\\\\:markdown-xl hr + * {

      ---

      -   .xl\\\\:prose-xl h2 + * {
      +   .xl\\\\:markdown-xl h2 + * {

      ---

      -   .xl\\\\:prose-xl h3 + * {
      +   .xl\\\\:markdown-xl h3 + * {

      ---

      -   .xl\\\\:prose-xl h4 + * {
      +   .xl\\\\:markdown-xl h4 + * {

      ---

      -   .xl\\\\:prose-xl table {
      +   .xl\\\\:markdown-xl table {

      ---

      -   .xl\\\\:prose-xl thead th {
      +   .xl\\\\:markdown-xl thead th {

      ---

      -   .xl\\\\:prose-xl thead th:first-child {
      +   .xl\\\\:markdown-xl thead th:first-child {

      ---

      -   .xl\\\\:prose-xl thead th:last-child {
      +   .xl\\\\:markdown-xl thead th:last-child {

      ---

      -   .xl\\\\:prose-xl tbody td {
      +   .xl\\\\:markdown-xl tbody td {

      ---

      -   .xl\\\\:prose-xl tbody td:first-child {
      +   .xl\\\\:markdown-xl tbody td:first-child {

      ---

      -   .xl\\\\:prose-xl tbody td:last-child {
      +   .xl\\\\:markdown-xl tbody td:last-child {

      ---

      -   .xl\\\\:prose-xl > :first-child {
      +   .xl\\\\:markdown-xl > :first-child {

      ---

      -   .xl\\\\:prose-xl > :last-child {
      +   .xl\\\\:markdown-xl > :last-child {

      ---

      -   .xl\\\\:prose-2xl {
      +   .xl\\\\:markdown-2xl {

      ---

      -   .xl\\\\:prose-2xl p {
      +   .xl\\\\:markdown-2xl p {

      ---

      -   .xl\\\\:prose-2xl [class~='lead'] {
      +   .xl\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .xl\\\\:prose-2xl blockquote {
      +   .xl\\\\:markdown-2xl blockquote {

      ---

      -   .xl\\\\:prose-2xl h1 {
      +   .xl\\\\:markdown-2xl h1 {

      ---

      -   .xl\\\\:prose-2xl h2 {
      +   .xl\\\\:markdown-2xl h2 {

      ---

      -   .xl\\\\:prose-2xl h3 {
      +   .xl\\\\:markdown-2xl h3 {

      ---

      -   .xl\\\\:prose-2xl h4 {
      +   .xl\\\\:markdown-2xl h4 {

      ---

      -   .xl\\\\:prose-2xl img {
      +   .xl\\\\:markdown-2xl img {

      ---

      -   .xl\\\\:prose-2xl video {
      +   .xl\\\\:markdown-2xl video {

      ---

      -   .xl\\\\:prose-2xl figure {
      +   .xl\\\\:markdown-2xl figure {

      ---

      -   .xl\\\\:prose-2xl figure > * {
      +   .xl\\\\:markdown-2xl figure > * {

      ---

      -   .xl\\\\:prose-2xl figure figcaption {
      +   .xl\\\\:markdown-2xl figure figcaption {

      ---

      -   .xl\\\\:prose-2xl code {
      +   .xl\\\\:markdown-2xl code {

      ---

      -   .xl\\\\:prose-2xl h2 code {
      +   .xl\\\\:markdown-2xl h2 code {

      ---

      -   .xl\\\\:prose-2xl h3 code {
      +   .xl\\\\:markdown-2xl h3 code {

      ---

      -   .xl\\\\:prose-2xl pre {
      +   .xl\\\\:markdown-2xl pre {

      ---

      -   .xl\\\\:prose-2xl ol {
      +   .xl\\\\:markdown-2xl ol {

      ---

      -   .xl\\\\:prose-2xl ul {
      +   .xl\\\\:markdown-2xl ul {

      ---

      -   .xl\\\\:prose-2xl li {
      +   .xl\\\\:markdown-2xl li {

      ---

      -   .xl\\\\:prose-2xl ol > li {
      +   .xl\\\\:markdown-2xl ol > li {

      ---

      -   .xl\\\\:prose-2xl ol > li::before {
      +   .xl\\\\:markdown-2xl ol > li::before {

      ---

      -   .xl\\\\:prose-2xl ul > li {
      +   .xl\\\\:markdown-2xl ul > li {

      ---

      -   .xl\\\\:prose-2xl ul > li::before {
      +   .xl\\\\:markdown-2xl ul > li::before {

      ---

      -   .xl\\\\:prose-2xl > ul > li p {
      +   .xl\\\\:markdown-2xl > ul > li p {

      ---

      -   .xl\\\\:prose-2xl > ul > li > *:first-child {
      +   .xl\\\\:markdown-2xl > ul > li > *:first-child {

      ---

      -   .xl\\\\:prose-2xl > ul > li > *:last-child {
      +   .xl\\\\:markdown-2xl > ul > li > *:last-child {

      ---

      -   .xl\\\\:prose-2xl > ol > li > *:first-child {
      +   .xl\\\\:markdown-2xl > ol > li > *:first-child {

      ---

      -   .xl\\\\:prose-2xl > ol > li > *:last-child {
      +   .xl\\\\:markdown-2xl > ol > li > *:last-child {

      ---

      -   .xl\\\\:prose-2xl ul ul, .xl\\\\:prose-2xl ul ol, .xl\\\\:prose-2xl ol ul, .xl\\\\:prose-2xl ol ol {
      +   .xl\\\\:markdown-2xl ul ul, .xl\\\\:markdown-2xl ul ol, .xl\\\\:markdown-2xl ol ul, .xl\\\\:markdown-2xl ol ol {

      ---

      -   .xl\\\\:prose-2xl hr {
      +   .xl\\\\:markdown-2xl hr {

      ---

      -   .xl\\\\:prose-2xl hr + * {
      +   .xl\\\\:markdown-2xl hr + * {

      ---

      -   .xl\\\\:prose-2xl h2 + * {
      +   .xl\\\\:markdown-2xl h2 + * {

      ---

      -   .xl\\\\:prose-2xl h3 + * {
      +   .xl\\\\:markdown-2xl h3 + * {

      ---

      -   .xl\\\\:prose-2xl h4 + * {
      +   .xl\\\\:markdown-2xl h4 + * {

      ---

      -   .xl\\\\:prose-2xl table {
      +   .xl\\\\:markdown-2xl table {

      ---

      -   .xl\\\\:prose-2xl thead th {
      +   .xl\\\\:markdown-2xl thead th {

      ---

      -   .xl\\\\:prose-2xl thead th:first-child {
      +   .xl\\\\:markdown-2xl thead th:first-child {

      ---

      -   .xl\\\\:prose-2xl thead th:last-child {
      +   .xl\\\\:markdown-2xl thead th:last-child {

      ---

      -   .xl\\\\:prose-2xl tbody td {
      +   .xl\\\\:markdown-2xl tbody td {

      ---

      -   .xl\\\\:prose-2xl tbody td:first-child {
      +   .xl\\\\:markdown-2xl tbody td:first-child {

      ---

      -   .xl\\\\:prose-2xl tbody td:last-child {
      +   .xl\\\\:markdown-2xl tbody td:last-child {

      ---

      -   .xl\\\\:prose-2xl > :first-child {
      +   .xl\\\\:markdown-2xl > :first-child {

      ---

      -   .xl\\\\:prose-2xl > :last-child {
      +   .xl\\\\:markdown-2xl > :last-child {

      ---

      -   .xl\\\\:prose-red a {
      +   .xl\\\\:markdown-red a {

      ---

      -   .xl\\\\:prose-red a code {
      +   .xl\\\\:markdown-red a code {

      ---

      -   .xl\\\\:prose-yellow a {
      +   .xl\\\\:markdown-yellow a {

      ---

      -   .xl\\\\:prose-yellow a code {
      +   .xl\\\\:markdown-yellow a code {

      ---

      -   .xl\\\\:prose-green a {
      +   .xl\\\\:markdown-green a {

      ---

      -   .xl\\\\:prose-green a code {
      +   .xl\\\\:markdown-green a code {

      ---

      -   .xl\\\\:prose-blue a {
      +   .xl\\\\:markdown-blue a {

      ---

      -   .xl\\\\:prose-blue a code {
      +   .xl\\\\:markdown-blue a code {

      ---

      -   .xl\\\\:prose-indigo a {
      +   .xl\\\\:markdown-indigo a {

      ---

      -   .xl\\\\:prose-indigo a code {
      +   .xl\\\\:markdown-indigo a code {

      ---

      -   .xl\\\\:prose-purple a {
      +   .xl\\\\:markdown-purple a {

      ---

      -   .xl\\\\:prose-purple a code {
      +   .xl\\\\:markdown-purple a code {

      ---

      -   .xl\\\\:prose-pink a {
      +   .xl\\\\:markdown-pink a {

      ---

      -   .xl\\\\:prose-pink a code {
      +   .xl\\\\:markdown-pink a code {

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose [class~='lead'] {
      +   .\\\\32xl\\\\:markdown [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose a {
      +   .\\\\32xl\\\\:markdown a {

      ---

      -   .\\\\32xl\\\\:prose strong {
      +   .\\\\32xl\\\\:markdown strong {

      ---

      -   .\\\\32xl\\\\:prose ol {
      +   .\\\\32xl\\\\:markdown ol {

      ---

      -   .\\\\32xl\\\\:prose ol > li {
      +   .\\\\32xl\\\\:markdown ol > li {

      ---

      -   .\\\\32xl\\\\:prose ol > li::before {
      +   .\\\\32xl\\\\:markdown ol > li::before {

      ---

      -   .\\\\32xl\\\\:prose ul > li {
      +   .\\\\32xl\\\\:markdown ul > li {

      ---

      -   .\\\\32xl\\\\:prose ul > li::before {
      +   .\\\\32xl\\\\:markdown ul > li::before {

      ---

      -   .\\\\32xl\\\\:prose hr {
      +   .\\\\32xl\\\\:markdown hr {

      ---

      -   .\\\\32xl\\\\:prose blockquote {
      +   .\\\\32xl\\\\:markdown blockquote {

      ---

      -   .\\\\32xl\\\\:prose blockquote p:first-of-type::before {
      +   .\\\\32xl\\\\:markdown blockquote p:first-of-type::before {

      ---

      -   .\\\\32xl\\\\:prose blockquote p:last-of-type::after {
      +   .\\\\32xl\\\\:markdown blockquote p:last-of-type::after {

      ---

      -   .\\\\32xl\\\\:prose h1 {
      +   .\\\\32xl\\\\:markdown h1 {

      ---

      -   .\\\\32xl\\\\:prose h2 {
      +   .\\\\32xl\\\\:markdown h2 {

      ---

      -   .\\\\32xl\\\\:prose h3 {
      +   .\\\\32xl\\\\:markdown h3 {

      ---

      -   .\\\\32xl\\\\:prose h4 {
      +   .\\\\32xl\\\\:markdown h4 {

      ---

      -   .\\\\32xl\\\\:prose figure figcaption {
      +   .\\\\32xl\\\\:markdown figure figcaption {

      ---

      -   .\\\\32xl\\\\:prose code {
      +   .\\\\32xl\\\\:markdown code {

      ---

      -   .\\\\32xl\\\\:prose code::before {
      +   .\\\\32xl\\\\:markdown code::before {

      ---

      -   .\\\\32xl\\\\:prose code::after {
      +   .\\\\32xl\\\\:markdown code::after {

      ---

      -   .\\\\32xl\\\\:prose a code {
      +   .\\\\32xl\\\\:markdown a code {

      ---

      -   .\\\\32xl\\\\:prose pre {
      +   .\\\\32xl\\\\:markdown pre {

      ---

      -   .\\\\32xl\\\\:prose pre code {
      +   .\\\\32xl\\\\:markdown pre code {

      ---

      -   .\\\\32xl\\\\:prose pre code::before {
      +   .\\\\32xl\\\\:markdown pre code::before {

      ---

      -   .\\\\32xl\\\\:prose pre code::after {
      +   .\\\\32xl\\\\:markdown pre code::after {

      ---

      -   .\\\\32xl\\\\:prose table {
      +   .\\\\32xl\\\\:markdown table {

      ---

      -   .\\\\32xl\\\\:prose thead {
      +   .\\\\32xl\\\\:markdown thead {

      ---

      -   .\\\\32xl\\\\:prose thead th {
      +   .\\\\32xl\\\\:markdown thead th {

      ---

      -   .\\\\32xl\\\\:prose tbody tr {
      +   .\\\\32xl\\\\:markdown tbody tr {

      ---

      -   .\\\\32xl\\\\:prose tbody tr:last-child {
      +   .\\\\32xl\\\\:markdown tbody tr:last-child {

      ---

      -   .\\\\32xl\\\\:prose tbody td {
      +   .\\\\32xl\\\\:markdown tbody td {

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose p {
      +   .\\\\32xl\\\\:markdown p {

      ---

      -   .\\\\32xl\\\\:prose img {
      +   .\\\\32xl\\\\:markdown img {

      ---

      -   .\\\\32xl\\\\:prose video {
      +   .\\\\32xl\\\\:markdown video {

      ---

      -   .\\\\32xl\\\\:prose figure {
      +   .\\\\32xl\\\\:markdown figure {

      ---

      -   .\\\\32xl\\\\:prose figure > * {
      +   .\\\\32xl\\\\:markdown figure > * {

      ---

      -   .\\\\32xl\\\\:prose h2 code {
      +   .\\\\32xl\\\\:markdown h2 code {

      ---

      -   .\\\\32xl\\\\:prose h3 code {
      +   .\\\\32xl\\\\:markdown h3 code {

      ---

      -   .\\\\32xl\\\\:prose ul {
      +   .\\\\32xl\\\\:markdown ul {

      ---

      -   .\\\\32xl\\\\:prose li {
      +   .\\\\32xl\\\\:markdown li {

      ---

      -   .\\\\32xl\\\\:prose > ul > li p {
      +   .\\\\32xl\\\\:markdown > ul > li p {

      ---

      -   .\\\\32xl\\\\:prose > ul > li > *:first-child {
      +   .\\\\32xl\\\\:markdown > ul > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose > ul > li > *:last-child {
      +   .\\\\32xl\\\\:markdown > ul > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose > ol > li > *:first-child {
      +   .\\\\32xl\\\\:markdown > ol > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose > ol > li > *:last-child {
      +   .\\\\32xl\\\\:markdown > ol > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose ul ul, .\\\\32xl\\\\:prose ul ol, .\\\\32xl\\\\:prose ol ul, .\\\\32xl\\\\:prose ol ol {
      +   .\\\\32xl\\\\:markdown ul ul, .\\\\32xl\\\\:markdown ul ol, .\\\\32xl\\\\:markdown ol ul, .\\\\32xl\\\\:markdown ol ol {

      ---

      -   .\\\\32xl\\\\:prose hr + * {
      +   .\\\\32xl\\\\:markdown hr + * {

      ---

      -   .\\\\32xl\\\\:prose h2 + * {
      +   .\\\\32xl\\\\:markdown h2 + * {

      ---

      -   .\\\\32xl\\\\:prose h3 + * {
      +   .\\\\32xl\\\\:markdown h3 + * {

      ---

      -   .\\\\32xl\\\\:prose h4 + * {
      +   .\\\\32xl\\\\:markdown h4 + * {

      ---

      -   .\\\\32xl\\\\:prose thead th:first-child {
      +   .\\\\32xl\\\\:markdown thead th:first-child {

      ---

      -   .\\\\32xl\\\\:prose thead th:last-child {
      +   .\\\\32xl\\\\:markdown thead th:last-child {

      ---

      -   .\\\\32xl\\\\:prose tbody td:first-child {
      +   .\\\\32xl\\\\:markdown tbody td:first-child {

      ---

      -   .\\\\32xl\\\\:prose tbody td:last-child {
      +   .\\\\32xl\\\\:markdown tbody td:last-child {

      ---

      -   .\\\\32xl\\\\:prose > :first-child {
      +   .\\\\32xl\\\\:markdown > :first-child {

      ---

      -   .\\\\32xl\\\\:prose > :last-child {
      +   .\\\\32xl\\\\:markdown > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm {
      +   .\\\\32xl\\\\:markdown-sm {

      ---

      -   .\\\\32xl\\\\:prose-sm p {
      +   .\\\\32xl\\\\:markdown-sm p {

      ---

      -   .\\\\32xl\\\\:prose-sm [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-sm [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-sm blockquote {
      +   .\\\\32xl\\\\:markdown-sm blockquote {

      ---

      -   .\\\\32xl\\\\:prose-sm h1 {
      +   .\\\\32xl\\\\:markdown-sm h1 {

      ---

      -   .\\\\32xl\\\\:prose-sm h2 {
      +   .\\\\32xl\\\\:markdown-sm h2 {

      ---

      -   .\\\\32xl\\\\:prose-sm h3 {
      +   .\\\\32xl\\\\:markdown-sm h3 {

      ---

      -   .\\\\32xl\\\\:prose-sm h4 {
      +   .\\\\32xl\\\\:markdown-sm h4 {

      ---

      -   .\\\\32xl\\\\:prose-sm img {
      +   .\\\\32xl\\\\:markdown-sm img {

      ---

      -   .\\\\32xl\\\\:prose-sm video {
      +   .\\\\32xl\\\\:markdown-sm video {

      ---

      -   .\\\\32xl\\\\:prose-sm figure {
      +   .\\\\32xl\\\\:markdown-sm figure {

      ---

      -   .\\\\32xl\\\\:prose-sm figure > * {
      +   .\\\\32xl\\\\:markdown-sm figure > * {

      ---

      -   .\\\\32xl\\\\:prose-sm figure figcaption {
      +   .\\\\32xl\\\\:markdown-sm figure figcaption {

      ---

      -   .\\\\32xl\\\\:prose-sm code {
      +   .\\\\32xl\\\\:markdown-sm code {

      ---

      -   .\\\\32xl\\\\:prose-sm h2 code {
      +   .\\\\32xl\\\\:markdown-sm h2 code {

      ---

      -   .\\\\32xl\\\\:prose-sm h3 code {
      +   .\\\\32xl\\\\:markdown-sm h3 code {

      ---

      -   .\\\\32xl\\\\:prose-sm pre {
      +   .\\\\32xl\\\\:markdown-sm pre {

      ---

      -   .\\\\32xl\\\\:prose-sm ol {
      +   .\\\\32xl\\\\:markdown-sm ol {

      ---

      -   .\\\\32xl\\\\:prose-sm ul {
      +   .\\\\32xl\\\\:markdown-sm ul {

      ---

      -   .\\\\32xl\\\\:prose-sm li {
      +   .\\\\32xl\\\\:markdown-sm li {

      ---

      -   .\\\\32xl\\\\:prose-sm ol > li {
      +   .\\\\32xl\\\\:markdown-sm ol > li {

      ---

      -   .\\\\32xl\\\\:prose-sm ol > li::before {
      +   .\\\\32xl\\\\:markdown-sm ol > li::before {

      ---

      -   .\\\\32xl\\\\:prose-sm ul > li {
      +   .\\\\32xl\\\\:markdown-sm ul > li {

      ---

      -   .\\\\32xl\\\\:prose-sm ul > li::before {
      +   .\\\\32xl\\\\:markdown-sm ul > li::before {

      ---

      -   .\\\\32xl\\\\:prose-sm > ul > li p {
      +   .\\\\32xl\\\\:markdown-sm > ul > li p {

      ---

      -   .\\\\32xl\\\\:prose-sm > ul > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-sm > ul > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > ul > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-sm > ul > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > ol > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-sm > ol > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > ol > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-sm > ol > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm ul ul, .\\\\32xl\\\\:prose-sm ul ol, .\\\\32xl\\\\:prose-sm ol ul, .\\\\32xl\\\\:prose-sm ol ol {
      +   .\\\\32xl\\\\:markdown-sm ul ul, .\\\\32xl\\\\:markdown-sm ul ol, .\\\\32xl\\\\:markdown-sm ol ul, .\\\\32xl\\\\:markdown-sm ol ol {

      ---

      -   .\\\\32xl\\\\:prose-sm hr {
      +   .\\\\32xl\\\\:markdown-sm hr {

      ---

      -   .\\\\32xl\\\\:prose-sm hr + * {
      +   .\\\\32xl\\\\:markdown-sm hr + * {

      ---

      -   .\\\\32xl\\\\:prose-sm h2 + * {
      +   .\\\\32xl\\\\:markdown-sm h2 + * {

      ---

      -   .\\\\32xl\\\\:prose-sm h3 + * {
      +   .\\\\32xl\\\\:markdown-sm h3 + * {

      ---

      -   .\\\\32xl\\\\:prose-sm h4 + * {
      +   .\\\\32xl\\\\:markdown-sm h4 + * {

      ---

      -   .\\\\32xl\\\\:prose-sm table {
      +   .\\\\32xl\\\\:markdown-sm table {

      ---

      -   .\\\\32xl\\\\:prose-sm thead th {
      +   .\\\\32xl\\\\:markdown-sm thead th {

      ---

      -   .\\\\32xl\\\\:prose-sm thead th:first-child {
      +   .\\\\32xl\\\\:markdown-sm thead th:first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm thead th:last-child {
      +   .\\\\32xl\\\\:markdown-sm thead th:last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm tbody td {
      +   .\\\\32xl\\\\:markdown-sm tbody td {

      ---

      -   .\\\\32xl\\\\:prose-sm tbody td:first-child {
      +   .\\\\32xl\\\\:markdown-sm tbody td:first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm tbody td:last-child {
      +   .\\\\32xl\\\\:markdown-sm tbody td:last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > :first-child {
      +   .\\\\32xl\\\\:markdown-sm > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > :last-child {
      +   .\\\\32xl\\\\:markdown-sm > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg {
      +   .\\\\32xl\\\\:markdown-lg {

      ---

      -   .\\\\32xl\\\\:prose-lg p {
      +   .\\\\32xl\\\\:markdown-lg p {

      ---

      -   .\\\\32xl\\\\:prose-lg [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-lg [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-lg blockquote {
      +   .\\\\32xl\\\\:markdown-lg blockquote {

      ---

      -   .\\\\32xl\\\\:prose-lg h1 {
      +   .\\\\32xl\\\\:markdown-lg h1 {

      ---

      -   .\\\\32xl\\\\:prose-lg h2 {
      +   .\\\\32xl\\\\:markdown-lg h2 {

      ---

      -   .\\\\32xl\\\\:prose-lg h3 {
      +   .\\\\32xl\\\\:markdown-lg h3 {

      ---

      -   .\\\\32xl\\\\:prose-lg h4 {
      +   .\\\\32xl\\\\:markdown-lg h4 {

      ---

      -   .\\\\32xl\\\\:prose-lg img {
      +   .\\\\32xl\\\\:markdown-lg img {

      ---

      -   .\\\\32xl\\\\:prose-lg video {
      +   .\\\\32xl\\\\:markdown-lg video {

      ---

      -   .\\\\32xl\\\\:prose-lg figure {
      +   .\\\\32xl\\\\:markdown-lg figure {

      ---

      -   .\\\\32xl\\\\:prose-lg figure > * {
      +   .\\\\32xl\\\\:markdown-lg figure > * {

      ---

      -   .\\\\32xl\\\\:prose-lg figure figcaption {
      +   .\\\\32xl\\\\:markdown-lg figure figcaption {

      ---

      -   .\\\\32xl\\\\:prose-lg code {
      +   .\\\\32xl\\\\:markdown-lg code {

      ---

      -   .\\\\32xl\\\\:prose-lg h2 code {
      +   .\\\\32xl\\\\:markdown-lg h2 code {

      ---

      -   .\\\\32xl\\\\:prose-lg h3 code {
      +   .\\\\32xl\\\\:markdown-lg h3 code {

      ---

      -   .\\\\32xl\\\\:prose-lg pre {
      +   .\\\\32xl\\\\:markdown-lg pre {

      ---

      -   .\\\\32xl\\\\:prose-lg ol {
      +   .\\\\32xl\\\\:markdown-lg ol {

      ---

      -   .\\\\32xl\\\\:prose-lg ul {
      +   .\\\\32xl\\\\:markdown-lg ul {

      ---

      -   .\\\\32xl\\\\:prose-lg li {
      +   .\\\\32xl\\\\:markdown-lg li {

      ---

      -   .\\\\32xl\\\\:prose-lg ol > li {
      +   .\\\\32xl\\\\:markdown-lg ol > li {

      ---

      -   .\\\\32xl\\\\:prose-lg ol > li::before {
      +   .\\\\32xl\\\\:markdown-lg ol > li::before {

      ---

      -   .\\\\32xl\\\\:prose-lg ul > li {
      +   .\\\\32xl\\\\:markdown-lg ul > li {

      ---

      -   .\\\\32xl\\\\:prose-lg ul > li::before {
      +   .\\\\32xl\\\\:markdown-lg ul > li::before {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul > li p {
      +   .\\\\32xl\\\\:markdown-lg > ul > li p {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-lg > ul > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-lg > ul > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ol > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-lg > ol > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ol > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-lg > ol > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg ul ul, .\\\\32xl\\\\:prose-lg ul ol, .\\\\32xl\\\\:prose-lg ol ul, .\\\\32xl\\\\:prose-lg ol ol {
      +   .\\\\32xl\\\\:markdown-lg ul ul, .\\\\32xl\\\\:markdown-lg ul ol, .\\\\32xl\\\\:markdown-lg ol ul, .\\\\32xl\\\\:markdown-lg ol ol {

      ---

      -   .\\\\32xl\\\\:prose-lg hr {
      +   .\\\\32xl\\\\:markdown-lg hr {

      ---

      -   .\\\\32xl\\\\:prose-lg hr + * {
      +   .\\\\32xl\\\\:markdown-lg hr + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h2 + * {
      +   .\\\\32xl\\\\:markdown-lg h2 + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h3 + * {
      +   .\\\\32xl\\\\:markdown-lg h3 + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h4 + * {
      +   .\\\\32xl\\\\:markdown-lg h4 + * {

      ---

      -   .\\\\32xl\\\\:prose-lg table {
      +   .\\\\32xl\\\\:markdown-lg table {

      ---

      -   .\\\\32xl\\\\:prose-lg thead th {
      +   .\\\\32xl\\\\:markdown-lg thead th {

      ---

      -   .\\\\32xl\\\\:prose-lg thead th:first-child {
      +   .\\\\32xl\\\\:markdown-lg thead th:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg thead th:last-child {
      +   .\\\\32xl\\\\:markdown-lg thead th:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody td {
      +   .\\\\32xl\\\\:markdown-lg tbody td {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody td:first-child {
      +   .\\\\32xl\\\\:markdown-lg tbody td:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody td:last-child {
      +   .\\\\32xl\\\\:markdown-lg tbody td:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > :first-child {
      +   .\\\\32xl\\\\:markdown-lg > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > :last-child {
      +   .\\\\32xl\\\\:markdown-lg > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl {
      +   .\\\\32xl\\\\:markdown-xl {

      ---

      -   .\\\\32xl\\\\:prose-xl p {
      +   .\\\\32xl\\\\:markdown-xl p {

      ---

      -   .\\\\32xl\\\\:prose-xl [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-xl [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-xl blockquote {
      +   .\\\\32xl\\\\:markdown-xl blockquote {

      ---

      -   .\\\\32xl\\\\:prose-xl h1 {
      +   .\\\\32xl\\\\:markdown-xl h1 {

      ---

      -   .\\\\32xl\\\\:prose-xl h2 {
      +   .\\\\32xl\\\\:markdown-xl h2 {

      ---

      -   .\\\\32xl\\\\:prose-xl h3 {
      +   .\\\\32xl\\\\:markdown-xl h3 {

      ---

      -   .\\\\32xl\\\\:prose-xl h4 {
      +   .\\\\32xl\\\\:markdown-xl h4 {

      ---

      -   .\\\\32xl\\\\:prose-xl img {
      +   .\\\\32xl\\\\:markdown-xl img {

      ---

      -   .\\\\32xl\\\\:prose-xl video {
      +   .\\\\32xl\\\\:markdown-xl video {

      ---

      -   .\\\\32xl\\\\:prose-xl figure {
      +   .\\\\32xl\\\\:markdown-xl figure {

      ---

      -   .\\\\32xl\\\\:prose-xl figure > * {
      +   .\\\\32xl\\\\:markdown-xl figure > * {

      ---

      -   .\\\\32xl\\\\:prose-xl figure figcaption {
      +   .\\\\32xl\\\\:markdown-xl figure figcaption {

      ---

      -   .\\\\32xl\\\\:prose-xl code {
      +   .\\\\32xl\\\\:markdown-xl code {

      ---

      -   .\\\\32xl\\\\:prose-xl h2 code {
      +   .\\\\32xl\\\\:markdown-xl h2 code {

      ---

      -   .\\\\32xl\\\\:prose-xl h3 code {
      +   .\\\\32xl\\\\:markdown-xl h3 code {

      ---

      -   .\\\\32xl\\\\:prose-xl pre {
      +   .\\\\32xl\\\\:markdown-xl pre {

      ---

      -   .\\\\32xl\\\\:prose-xl ol {
      +   .\\\\32xl\\\\:markdown-xl ol {

      ---

      -   .\\\\32xl\\\\:prose-xl ul {
      +   .\\\\32xl\\\\:markdown-xl ul {

      ---

      -   .\\\\32xl\\\\:prose-xl li {
      +   .\\\\32xl\\\\:markdown-xl li {

      ---

      -   .\\\\32xl\\\\:prose-xl ol > li {
      +   .\\\\32xl\\\\:markdown-xl ol > li {

      ---

      -   .\\\\32xl\\\\:prose-xl ol > li::before {
      +   .\\\\32xl\\\\:markdown-xl ol > li::before {

      ---

      -   .\\\\32xl\\\\:prose-xl ul > li {
      +   .\\\\32xl\\\\:markdown-xl ul > li {

      ---

      -   .\\\\32xl\\\\:prose-xl ul > li::before {
      +   .\\\\32xl\\\\:markdown-xl ul > li::before {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul > li p {
      +   .\\\\32xl\\\\:markdown-xl > ul > li p {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-xl > ul > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-xl > ul > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ol > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-xl > ol > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ol > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-xl > ol > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl ul ul, .\\\\32xl\\\\:prose-xl ul ol, .\\\\32xl\\\\:prose-xl ol ul, .\\\\32xl\\\\:prose-xl ol ol {
      +   .\\\\32xl\\\\:markdown-xl ul ul, .\\\\32xl\\\\:markdown-xl ul ol, .\\\\32xl\\\\:markdown-xl ol ul, .\\\\32xl\\\\:markdown-xl ol ol {

      ---

      -   .\\\\32xl\\\\:prose-xl hr {
      +   .\\\\32xl\\\\:markdown-xl hr {

      ---

      -   .\\\\32xl\\\\:prose-xl hr + * {
      +   .\\\\32xl\\\\:markdown-xl hr + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h2 + * {
      +   .\\\\32xl\\\\:markdown-xl h2 + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h3 + * {
      +   .\\\\32xl\\\\:markdown-xl h3 + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h4 + * {
      +   .\\\\32xl\\\\:markdown-xl h4 + * {

      ---

      -   .\\\\32xl\\\\:prose-xl table {
      +   .\\\\32xl\\\\:markdown-xl table {

      ---

      -   .\\\\32xl\\\\:prose-xl thead th {
      +   .\\\\32xl\\\\:markdown-xl thead th {

      ---

      -   .\\\\32xl\\\\:prose-xl thead th:first-child {
      +   .\\\\32xl\\\\:markdown-xl thead th:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl thead th:last-child {
      +   .\\\\32xl\\\\:markdown-xl thead th:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody td {
      +   .\\\\32xl\\\\:markdown-xl tbody td {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody td:first-child {
      +   .\\\\32xl\\\\:markdown-xl tbody td:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody td:last-child {
      +   .\\\\32xl\\\\:markdown-xl tbody td:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > :first-child {
      +   .\\\\32xl\\\\:markdown-xl > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > :last-child {
      +   .\\\\32xl\\\\:markdown-xl > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl {
      +   .\\\\32xl\\\\:markdown-2xl {

      ---

      -   .\\\\32xl\\\\:prose-2xl p {
      +   .\\\\32xl\\\\:markdown-2xl p {

      ---

      -   .\\\\32xl\\\\:prose-2xl [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl blockquote {
      +   .\\\\32xl\\\\:markdown-2xl blockquote {

      ---

      -   .\\\\32xl\\\\:prose-2xl h1 {
      +   .\\\\32xl\\\\:markdown-2xl h1 {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2 {
      +   .\\\\32xl\\\\:markdown-2xl h2 {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3 {
      +   .\\\\32xl\\\\:markdown-2xl h3 {

      ---

      -   .\\\\32xl\\\\:prose-2xl h4 {
      +   .\\\\32xl\\\\:markdown-2xl h4 {

      ---

      -   .\\\\32xl\\\\:prose-2xl img {
      +   .\\\\32xl\\\\:markdown-2xl img {

      ---

      -   .\\\\32xl\\\\:prose-2xl video {
      +   .\\\\32xl\\\\:markdown-2xl video {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure {
      +   .\\\\32xl\\\\:markdown-2xl figure {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure > * {
      +   .\\\\32xl\\\\:markdown-2xl figure > * {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure figcaption {
      +   .\\\\32xl\\\\:markdown-2xl figure figcaption {

      ---

      -   .\\\\32xl\\\\:prose-2xl code {
      +   .\\\\32xl\\\\:markdown-2xl code {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2 code {
      +   .\\\\32xl\\\\:markdown-2xl h2 code {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3 code {
      +   .\\\\32xl\\\\:markdown-2xl h3 code {

      ---

      -   .\\\\32xl\\\\:prose-2xl pre {
      +   .\\\\32xl\\\\:markdown-2xl pre {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol {
      +   .\\\\32xl\\\\:markdown-2xl ol {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul {
      +   .\\\\32xl\\\\:markdown-2xl ul {

      ---

      -   .\\\\32xl\\\\:prose-2xl li {
      +   .\\\\32xl\\\\:markdown-2xl li {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol > li {
      +   .\\\\32xl\\\\:markdown-2xl ol > li {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol > li::before {
      +   .\\\\32xl\\\\:markdown-2xl ol > li::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul > li {
      +   .\\\\32xl\\\\:markdown-2xl ul > li {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul > li::before {
      +   .\\\\32xl\\\\:markdown-2xl ul > li::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul > li p {
      +   .\\\\32xl\\\\:markdown-2xl > ul > li p {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-2xl > ul > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-2xl > ul > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ol > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-2xl > ol > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ol > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-2xl > ol > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul ul, .\\\\32xl\\\\:prose-2xl ul ol, .\\\\32xl\\\\:prose-2xl ol ul, .\\\\32xl\\\\:prose-2xl ol ol {
      +   .\\\\32xl\\\\:markdown-2xl ul ul, .\\\\32xl\\\\:markdown-2xl ul ol, .\\\\32xl\\\\:markdown-2xl ol ul, .\\\\32xl\\\\:markdown-2xl ol ol {

      ---

      -   .\\\\32xl\\\\:prose-2xl hr {
      +   .\\\\32xl\\\\:markdown-2xl hr {

      ---

      -   .\\\\32xl\\\\:prose-2xl hr + * {
      +   .\\\\32xl\\\\:markdown-2xl hr + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2 + * {
      +   .\\\\32xl\\\\:markdown-2xl h2 + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3 + * {
      +   .\\\\32xl\\\\:markdown-2xl h3 + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h4 + * {
      +   .\\\\32xl\\\\:markdown-2xl h4 + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl table {
      +   .\\\\32xl\\\\:markdown-2xl table {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead th {
      +   .\\\\32xl\\\\:markdown-2xl thead th {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead th:first-child {
      +   .\\\\32xl\\\\:markdown-2xl thead th:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead th:last-child {
      +   .\\\\32xl\\\\:markdown-2xl thead th:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody td {
      +   .\\\\32xl\\\\:markdown-2xl tbody td {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody td:first-child {
      +   .\\\\32xl\\\\:markdown-2xl tbody td:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody td:last-child {
      +   .\\\\32xl\\\\:markdown-2xl tbody td:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > :first-child {
      +   .\\\\32xl\\\\:markdown-2xl > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > :last-child {
      +   .\\\\32xl\\\\:markdown-2xl > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-red a {
      +   .\\\\32xl\\\\:markdown-red a {

      ---

      -   .\\\\32xl\\\\:prose-red a code {
      +   .\\\\32xl\\\\:markdown-red a code {

      ---

      -   .\\\\32xl\\\\:prose-yellow a {
      +   .\\\\32xl\\\\:markdown-yellow a {

      ---

      -   .\\\\32xl\\\\:prose-yellow a code {
      +   .\\\\32xl\\\\:markdown-yellow a code {

      ---

      -   .\\\\32xl\\\\:prose-green a {
      +   .\\\\32xl\\\\:markdown-green a {

      ---

      -   .\\\\32xl\\\\:prose-green a code {
      +   .\\\\32xl\\\\:markdown-green a code {

      ---

      -   .\\\\32xl\\\\:prose-blue a {
      +   .\\\\32xl\\\\:markdown-blue a {

      ---

      -   .\\\\32xl\\\\:prose-blue a code {
      +   .\\\\32xl\\\\:markdown-blue a code {

      ---

      -   .\\\\32xl\\\\:prose-indigo a {
      +   .\\\\32xl\\\\:markdown-indigo a {

      ---

      -   .\\\\32xl\\\\:prose-indigo a code {
      +   .\\\\32xl\\\\:markdown-indigo a code {

      ---

      -   .\\\\32xl\\\\:prose-purple a {
      +   .\\\\32xl\\\\:markdown-purple a {

      ---

      -   .\\\\32xl\\\\:prose-purple a code {
      +   .\\\\32xl\\\\:markdown-purple a code {

      ---

      -   .\\\\32xl\\\\:prose-pink a {
      +   .\\\\32xl\\\\:markdown-pink a {

      ---

      -   .\\\\32xl\\\\:prose-pink a code {
      +   .\\\\32xl\\\\:markdown-pink a code {

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
      - .prose-2xl p {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl [class~='lead'] {
      -   font-size: 1.25em;
      -   line-height: 1.4666667;
      -   margin-top: 1.0666667em;
      -   margin-bottom: 1.0666667em;
      - }
      -
      - .prose-2xl blockquote {
      -   margin-top: 1.7777778em;
      -   margin-bottom: 1.7777778em;
      -   padding-left: 1.1111111em;
      - }
      -
      - .prose-2xl h1 {
      -   font-size: 2.6666667em;
      -   margin-top: 0;
      -   margin-bottom: 0.875em;
      -   line-height: 1;
      - }
      -
      - .prose-2xl h2 {
      -   font-size: 2em;
      -   margin-top: 1.5em;
      -   margin-bottom: 0.8333333em;
      -   line-height: 1.0833333;
      - }
      -
      - .prose-2xl h3 {
      -   font-size: 1.5em;
      -   margin-top: 1.5555556em;
      -   margin-bottom: 0.6666667em;
      -   line-height: 1.2222222;
      - }
      -
      - .prose-2xl h4 {
      -   margin-top: 1.6666667em;
      -   margin-bottom: 0.6666667em;
      -   line-height: 1.5;
      - }
      -
      - .prose-2xl img {
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      - }
      -
      - .prose-2xl video {
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      - }
      -
      - .prose-2xl figure {
      -   margin-top: 2em;
      -   margin-bottom: 2em;
      - }
      -
      - .prose-2xl figure > * {
      -   margin-top: 0;
      -   margin-bottom: 0;
      - }
      -
      - .prose-2xl figure figcaption {
      -   font-size: 0.8333333em;
      -   line-height: 1.6;
      -   margin-top: 1em;
      - }
      -
      - .prose-2xl code {
      -   font-size: 0.8333333em;
      - }
      -
      - .prose-2xl h2 code {
      -   font-size: 0.875em;
      - }
      -
      - .prose-2xl h3 code {
      -   font-size: 0.8888889em;
      - }
      -
      - .prose-2xl pre {
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
      - .prose-2xl ol {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl ul {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl li {
      -   margin-top: 0.5em;
      -   margin-bottom: 0.5em;
      - }
      -
      - .prose-2xl ol > li {
      -   padding-left: 1.6666667em;
      - }
      -
      - .prose-2xl ol > li::before {
      -   left: 0;
      - }
      -
      - .prose-2xl ul > li {
      -   padding-left: 1.6666667em;
      - }
      -
      - .prose-2xl ul > li::before {
      -   width: 0.3333333em;
      -   height: 0.3333333em;
      -   top: calc(0.8333333em - 0.1666667em);
      -   left: 0.25em;
      - }
      -
      - .prose-2xl > ul > li p {
      -   margin-top: 0.8333333em;
      -   margin-bottom: 0.8333333em;
      - }
      -
      - .prose-2xl > ul > li > *:first-child {
      -   margin-top: 1.3333333em;
      - }
      -
      - .prose-2xl > ul > li > *:last-child {
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl > ol > li > *:first-child {
      -   margin-top: 1.3333333em;
      - }
      -
      - .prose-2xl > ol > li > *:last-child {
      -   margin-bottom: 1.3333333em;
      - }
      -
      - .prose-2xl ul ul, .prose-2xl ul ol, .prose-2xl ol ul, .prose-2xl ol ol {
      -   margin-top: 0.6666667em;
      -   margin-bottom: 0.6666667em;
      - }
      -
      - .prose-2xl hr {
      -   margin-top: 3em;
      -   margin-bottom: 3em;
      - }
      -
      - .prose-2xl hr + * {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl h2 + * {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl h3 + * {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl h4 + * {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl table {
      -   font-size: 0.8333333em;
      -   line-height: 1.4;
      - }
      -
      - .prose-2xl thead th {
      -   padding-right: 0.6em;
      -   padding-bottom: 0.8em;
      -   padding-left: 0.6em;
      - }
      -
      - .prose-2xl thead th:first-child {
      -   padding-left: 0;
      - }
      -
      - .prose-2xl thead th:last-child {
      -   padding-right: 0;
      - }
      -
      - .prose-2xl tbody td {
      -   padding-top: 0.8em;
      -   padding-right: 0.6em;
      -   padding-bottom: 0.8em;
      -   padding-left: 0.6em;
      - }
      -
      - .prose-2xl tbody td:first-child {
      -   padding-left: 0;
      - }
      -
      - .prose-2xl tbody td:last-child {
      -   padding-right: 0;
      - }
      -
      - .prose-2xl > :first-child {
      -   margin-top: 0;
      - }
      -
      - .prose-2xl > :last-child {
      -   margin-bottom: 0;
      - }
      -
      - .prose-red a {
      -   color: #dc2626;
      - }
      -
      - .prose-red a code {
      -   color: #dc2626;
      - }
      -
      - .prose-yellow a {
      -   color: #d97706;
      - }
      -
      - .prose-yellow a code {
      -   color: #d97706;
      - }
      -
      - .prose-green a {
      -   color: #059669;
      - }
      -
      - .prose-green a code {
      -   color: #059669;
      - }
      -
      - .prose-blue a {
      -   color: #2563eb;
      - }
      -
      - .prose-blue a code {
      -   color: #2563eb;
      - }
      -
      - .prose-indigo a {
      -   color: #4f46e5;
      - }
      -
      - .prose-indigo a code {
      -   color: #4f46e5;
      - }
      -
      - .prose-purple a {
      -   color: #7c3aed;
      - }
      -
      - .prose-purple a code {
      -   color: #7c3aed;
      - }
      -
      - .prose-pink a {
      -   color: #db2777;
      - }
      -
      - .prose-pink a code {
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
      -   .sm\\\\:prose-2xl p {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl [class~='lead'] {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl blockquote {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .sm\\\\:prose-2xl h1 {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .sm\\\\:prose-2xl h2 {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .sm\\\\:prose-2xl h3 {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .sm\\\\:prose-2xl h4 {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .sm\\\\:prose-2xl img {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .sm\\\\:prose-2xl video {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .sm\\\\:prose-2xl figure {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .sm\\\\:prose-2xl figure > * {
      -     margin-top: 0;

      ---

      -   }
      -
      -   .sm\\\\:prose-2xl figure figcaption {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .sm\\\\:prose-2xl code {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl h2 code {
      -     font-size: 0.875em;
      -   }
      -
      -   .sm\\\\:prose-2xl h3 code {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .sm\\\\:prose-2xl pre {
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
      -   .sm\\\\:prose-2xl ol {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl ul {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl li {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .sm\\\\:prose-2xl ol > li {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl ol > li::before {
      -     left: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl ul > li {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl ul > li::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .sm\\\\:prose-2xl > ul > li p {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;

      ---

      -
      -   .sm\\\\:prose-2xl > ul > li > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl > ul > li > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl > ol > li > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl > ol > li > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .sm\\\\:prose-2xl ul ul, .sm\\\\:prose-2xl ul ol, .sm\\\\:prose-2xl ol ul, .sm\\\\:prose-2xl ol ol {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .sm\\\\:prose-2xl hr {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .sm\\\\:prose-2xl hr + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl h2 + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl h4 + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl table {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .sm\\\\:prose-2xl thead th {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .sm\\\\:prose-2xl thead th:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl thead th:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl tbody td {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .sm\\\\:prose-2xl tbody td:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl tbody td:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-2xl > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-red a {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-red a code {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-yellow a {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-yellow a code {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-green a {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-green a code {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-blue a {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-blue a code {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-indigo a {
      -     color: #4f46e5;
      -   }
      -
      -   .sm\\\\:prose-indigo a code {
      -     color: #4f46e5;
      -   }
      -
      -   .sm\\\\:prose-purple a {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-purple a code {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-pink a {
      -     color: #db2777;
      -   }
      -
      -   .sm\\\\:prose-pink a code {
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
      -   .md\\\\:prose-2xl p {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl [class~='lead'] {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .md\\\\:prose-2xl blockquote {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .md\\\\:prose-2xl h1 {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .md\\\\:prose-2xl h2 {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .md\\\\:prose-2xl h3 {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .md\\\\:prose-2xl h4 {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .md\\\\:prose-2xl img {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .md\\\\:prose-2xl video {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .md\\\\:prose-2xl figure {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .md\\\\:prose-2xl figure > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .md\\\\:prose-2xl figure figcaption {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .md\\\\:prose-2xl code {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .md\\\\:prose-2xl h2 code {
      -     font-size: 0.875em;
      -   }
      -
      -   .md\\\\:prose-2xl h3 code {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .md\\\\:prose-2xl pre {
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
      -   .md\\\\:prose-2xl ol {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl ul {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl li {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .md\\\\:prose-2xl ol > li {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .md\\\\:prose-2xl ol > li::before {
      -     left: 0;
      -   }
      -
      -   .md\\\\:prose-2xl ul > li {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .md\\\\:prose-2xl ul > li::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .md\\\\:prose-2xl > ul > li p {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .md\\\\:prose-2xl > ul > li > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl > ul > li > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl > ol > li > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl > ol > li > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .md\\\\:prose-2xl ul ul, .md\\\\:prose-2xl ul ol, .md\\\\:prose-2xl ol ul, .md\\\\:prose-2xl ol ol {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .md\\\\:prose-2xl hr {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .md\\\\:prose-2xl hr + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl h2 + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl h4 + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl table {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .md\\\\:prose-2xl thead th {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .md\\\\:prose-2xl thead th:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose-2xl thead th:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose-2xl tbody td {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .md\\\\:prose-2xl tbody td:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose-2xl tbody td:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose-2xl > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-2xl > :last-child {

      ---

      -   }
      -
      -   .md\\\\:prose-red a {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-red a code {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-yellow a {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-yellow a code {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-green a {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-green a code {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-blue a {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-blue a code {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-indigo a {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-indigo a code {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-purple a {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-purple a code {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-pink a {
      -     color: #db2777;
      -   }
      -
      -   .md\\\\:prose-pink a code {
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
      -   .lg\\\\:prose-2xl p {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl [class~='lead'] {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl blockquote {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .lg\\\\:prose-2xl h1 {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .lg\\\\:prose-2xl h2 {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .lg\\\\:prose-2xl h3 {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .lg\\\\:prose-2xl h4 {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .lg\\\\:prose-2xl img {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .lg\\\\:prose-2xl video {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .lg\\\\:prose-2xl figure {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .lg\\\\:prose-2xl figure > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl figure figcaption {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .lg\\\\:prose-2xl code {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl h2 code {
      -     font-size: 0.875em;
      -   }
      -
      -   .lg\\\\:prose-2xl h3 code {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .lg\\\\:prose-2xl pre {
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
      -   .lg\\\\:prose-2xl ol {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl ul {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl li {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .lg\\\\:prose-2xl ol > li {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl ol > li::before {
      -     left: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl ul > li {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl ul > li::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .lg\\\\:prose-2xl > ul > li p {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl > ul > li > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl > ul > li > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl > ol > li > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl > ol > li > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .lg\\\\:prose-2xl ul ul, .lg\\\\:prose-2xl ul ol, .lg\\\\:prose-2xl ol ul, .lg\\\\:prose-2xl ol ol {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .lg\\\\:prose-2xl hr {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .lg\\\\:prose-2xl hr + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl h2 + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl h4 + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl table {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .lg\\\\:prose-2xl thead th {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .lg\\\\:prose-2xl thead th:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl thead th:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl tbody td {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .lg\\\\:prose-2xl tbody td:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl tbody td:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-2xl > :last-child {

      ---

      -   }
      -
      -   .lg\\\\:prose-red a {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-red a code {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-yellow a {
      -     color: #d97706;
      -   }
      -
      -   .lg\\\\:prose-yellow a code {
      -     color: #d97706;
      -   }
      -
      -   .lg\\\\:prose-green a {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-green a code {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-blue a {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-blue a code {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-indigo a {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-indigo a code {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-purple a {
      -     color: #7c3aed;
      -   }
      -
      -   .lg\\\\:prose-purple a code {
      -     color: #7c3aed;

      ---

      -
      -   .lg\\\\:prose-pink a {
      -     color: #db2777;
      -   }
      -
      -   .lg\\\\:prose-pink a code {
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
      -   .xl\\\\:prose-2xl p {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl [class~='lead'] {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl blockquote {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .xl\\\\:prose-2xl h1 {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .xl\\\\:prose-2xl h2 {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .xl\\\\:prose-2xl h3 {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .xl\\\\:prose-2xl h4 {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .xl\\\\:prose-2xl img {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .xl\\\\:prose-2xl video {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .xl\\\\:prose-2xl figure {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .xl\\\\:prose-2xl figure > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl figure figcaption {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .xl\\\\:prose-2xl code {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl h2 code {
      -     font-size: 0.875em;
      -   }
      -
      -   .xl\\\\:prose-2xl h3 code {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .xl\\\\:prose-2xl pre {
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
      -   .xl\\\\:prose-2xl ol {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl ul {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl li {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .xl\\\\:prose-2xl ol > li {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl ol > li::before {
      -     left: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl ul > li {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl ul > li::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .xl\\\\:prose-2xl > ul > li p {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl > ul > li > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl > ul > li > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl > ol > li > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl > ol > li > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .xl\\\\:prose-2xl ul ul, .xl\\\\:prose-2xl ul ol, .xl\\\\:prose-2xl ol ul, .xl\\\\:prose-2xl ol ol {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .xl\\\\:prose-2xl hr {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .xl\\\\:prose-2xl hr + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl h2 + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl h4 + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl table {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .xl\\\\:prose-2xl thead th {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .xl\\\\:prose-2xl thead th:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl thead th:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl tbody td {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .xl\\\\:prose-2xl tbody td:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl tbody td:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-2xl > :last-child {

      ---

      -   }
      -
      -   .xl\\\\:prose-red a {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-red a code {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-yellow a {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-yellow a code {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-green a {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-green a code {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-blue a {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-blue a code {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-indigo a {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-indigo a code {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-purple a {
      -     color: #7c3aed;
      -   }
      -
      -   .xl\\\\:prose-purple a code {
      -     color: #7c3aed;

      ---

      -
      -   .xl\\\\:prose-pink a {
      -     color: #db2777;
      -   }
      -
      -   .xl\\\\:prose-pink a code {
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
      -   .\\\\32xl\\\\:prose-2xl p {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl [class~='lead'] {
      -     font-size: 1.25em;
      -     line-height: 1.4666667;
      -     margin-top: 1.0666667em;
      -     margin-bottom: 1.0666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl blockquote {
      -     margin-top: 1.7777778em;
      -     margin-bottom: 1.7777778em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h1 {
      -     font-size: 2.6666667em;
      -     margin-top: 0;
      -     margin-bottom: 0.875em;
      -     line-height: 1;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h2 {
      -     font-size: 2em;
      -     margin-top: 1.5em;
      -     margin-bottom: 0.8333333em;
      -     line-height: 1.0833333;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h3 {
      -     font-size: 1.5em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.2222222;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h4 {
      -     margin-top: 1.6666667em;
      -     margin-bottom: 0.6666667em;
      -     line-height: 1.5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl img {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl video {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl figure {
      -     margin-top: 2em;
      -     margin-bottom: 2em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl figure > * {
      -     margin-top: 0;

      ---

      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl figure figcaption {
      -     font-size: 0.8333333em;
      -     line-height: 1.6;
      -     margin-top: 1em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl code {
      -     font-size: 0.8333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h2 code {
      -     font-size: 0.875em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h3 code {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl pre {
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
      -   .\\\\32xl\\\\:prose-2xl ol {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ul {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl li {
      -     margin-top: 0.5em;
      -     margin-bottom: 0.5em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ol > li {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ol > li::before {
      -     left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ul > li {
      -     padding-left: 1.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ul > li::before {
      -     width: 0.3333333em;
      -     height: 0.3333333em;
      -     top: calc(0.8333333em - 0.1666667em);
      -     left: 0.25em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > ul > li p {
      -     margin-top: 0.8333333em;
      -     margin-bottom: 0.8333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > ul > li > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > ul > li > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > ol > li > *:first-child {
      -     margin-top: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > ol > li > *:last-child {
      -     margin-bottom: 1.3333333em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl ul ul, .\\\\32xl\\\\:prose-2xl ul ol, .\\\\32xl\\\\:prose-2xl ol ul, .\\\\32xl\\\\:prose-2xl ol ol {
      -     margin-top: 0.6666667em;
      -     margin-bottom: 0.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl hr {
      -     margin-top: 3em;
      -     margin-bottom: 3em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl hr + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h2 + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl h4 + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl table {
      -     font-size: 0.8333333em;
      -     line-height: 1.4;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl thead th {
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl thead th:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl thead th:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl tbody td {
      -     padding-top: 0.8em;
      -     padding-right: 0.6em;
      -     padding-bottom: 0.8em;
      -     padding-left: 0.6em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl tbody td:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl tbody td:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-2xl > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-red a {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-red a code {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow a {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow a code {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green a {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green a code {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue a {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue a code {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo a {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo a code {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple a {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple a code {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink a {
      -     color: #db2777;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink a code {
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

      - .prose [class~='lead'] {
      + .markdown [class~='lead'] {

      ---

      - .prose a {
      + .markdown a {

      ---

      - .prose strong {
      + .markdown strong {

      ---

      - .prose ol {
      + .markdown ol {

      ---

      - .prose ol > li {
      + .markdown ol > li {

      ---

      - .prose ol > li::before {
      + .markdown ol > li::before {

      ---

      - .prose ul > li {
      + .markdown ul > li {

      ---

      - .prose ul > li::before {
      + .markdown ul > li::before {

      ---

      - .prose hr {
      + .markdown hr {

      ---

      - .prose blockquote {
      + .markdown blockquote {

      ---

      - .prose blockquote p:first-of-type::before {
      + .markdown blockquote p:first-of-type::before {

      ---

      - .prose blockquote p:last-of-type::after {
      + .markdown blockquote p:last-of-type::after {

      ---

      - .prose h1 {
      + .markdown h1 {

      ---

      - .prose h2 {
      + .markdown h2 {

      ---

      - .prose h3 {
      + .markdown h3 {

      ---

      - .prose h4 {
      + .markdown h4 {

      ---

      - .prose figure figcaption {
      + .markdown figure figcaption {

      ---

      - .prose code {
      + .markdown code {

      ---

      - .prose code::before {
      + .markdown code::before {

      ---

      - .prose code::after {
      + .markdown code::after {

      ---

      - .prose a code {
      + .markdown a code {

      ---

      - .prose pre {
      + .markdown pre {

      ---

      - .prose pre code {
      + .markdown pre code {

      ---

      - .prose pre code::before {
      + .markdown pre code::before {

      ---

      - .prose pre code::after {
      + .markdown pre code::after {

      ---

      - .prose table {
      + .markdown table {

      ---

      - .prose thead {
      + .markdown thead {

      ---

      - .prose thead th {
      + .markdown thead th {

      ---

      - .prose tbody tr {
      + .markdown tbody tr {

      ---

      - .prose tbody tr:last-child {
      + .markdown tbody tr:last-child {

      ---

      - .prose tbody td {
      + .markdown tbody td {

      ---

      - .prose {
      + .markdown {

      ---

      - .prose p {
      + .markdown p {

      ---

      - .prose img {
      + .markdown img {

      ---

      - .prose video {
      + .markdown video {

      ---

      - .prose figure {
      + .markdown figure {

      ---

      - .prose figure > * {
      + .markdown figure > * {

      ---

      - .prose h2 code {
      + .markdown h2 code {

      ---

      - .prose h3 code {
      + .markdown h3 code {

      ---

      - .prose ul {
      + .markdown ul {

      ---

      - .prose li {
      + .markdown li {

      ---

      - .prose > ul > li p {
      + .markdown > ul > li p {

      ---

      - .prose > ul > li > *:first-child {
      + .markdown > ul > li > *:first-child {

      ---

      - .prose > ul > li > *:last-child {
      + .markdown > ul > li > *:last-child {

      ---

      - .prose > ol > li > *:first-child {
      + .markdown > ol > li > *:first-child {

      ---

      - .prose > ol > li > *:last-child {
      + .markdown > ol > li > *:last-child {

      ---

      - .prose ul ul, .prose ul ol, .prose ol ul, .prose ol ol {
      + .markdown ul ul, .markdown ul ol, .markdown ol ul, .markdown ol ol {

      ---

      - .prose hr + * {
      + .markdown hr + * {

      ---

      - .prose h2 + * {
      + .markdown h2 + * {

      ---

      - .prose h3 + * {
      + .markdown h3 + * {

      ---

      - .prose h4 + * {
      + .markdown h4 + * {

      ---

      - .prose thead th:first-child {
      + .markdown thead th:first-child {

      ---

      - .prose thead th:last-child {
      + .markdown thead th:last-child {

      ---

      - .prose tbody td:first-child {
      + .markdown tbody td:first-child {

      ---

      - .prose tbody td:last-child {
      + .markdown tbody td:last-child {

      ---

      - }
      -
      - .prose > :first-child {
      -   margin-top: 0;
      - }
      -
      - .prose > :last-child {
      -   margin-bottom: 0;

      ---

      - .prose-sm {
      -   font-size: 0.875rem;
      -   line-height: 1.7142857;
      - }
      -
      - .prose-sm p {
      -   margin-top: 1.1428571em;
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm [class~='lead'] {
      -   font-size: 1.2857143em;
      -   line-height: 1.5555556;
      -   margin-top: 0.8888889em;
      -   margin-bottom: 0.8888889em;
      - }
      -
      - .prose-sm blockquote {
      -   margin-top: 1.3333333em;
      -   margin-bottom: 1.3333333em;
      -   padding-left: 1.1111111em;
      - }
      -
      - .prose-sm h1 {
      -   font-size: 2.1428571em;
      + .markdown > :first-child {

      ---

      -   margin-bottom: 0.8em;
      -   line-height: 1.2;

      ---

      - .prose-sm h2 {
      -   font-size: 1.4285714em;
      -   margin-top: 1.6em;
      -   margin-bottom: 0.8em;
      -   line-height: 1.4;
      - }
      -
      - .prose-sm h3 {
      -   font-size: 1.2857143em;
      -   margin-top: 1.5555556em;
      -   margin-bottom: 0.4444444em;
      -   line-height: 1.5555556;
      - }
      -
      - .prose-sm h4 {
      -   margin-top: 1.4285714em;
      -   margin-bottom: 0.5714286em;
      -   line-height: 1.4285714;
      - }
      -
      - .prose-sm img {
      -   margin-top: 1.7142857em;
      -   margin-bottom: 1.7142857em;
      - }
      -
      - .prose-sm video {
      -   margin-top: 1.7142857em;
      -   margin-bottom: 1.7142857em;
      - }
      -
      - .prose-sm figure {
      -   margin-top: 1.7142857em;
      -   margin-bottom: 1.7142857em;
      - }
      -
      - .prose-sm figure > * {
      -   margin-top: 0;
      + .markdown > :last-child {

      ---

      - .prose-sm figure figcaption {
      -   font-size: 0.8571429em;
      -   line-height: 1.3333333;
      -   margin-top: 0.6666667em;
      - }
      -
      - .prose-sm code {
      -   font-size: 0.8571429em;
      - }
      -
      - .prose-sm h2 code {
      -   font-size: 0.9em;
      - }
      -
      - .prose-sm h3 code {
      -   font-size: 0.8888889em;
      - }
      -
      - .prose-sm pre {
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
      - .prose-sm ol {
      -   margin-top: 1.1428571em;
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm ul {
      -   margin-top: 1.1428571em;
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm li {
      -   margin-top: 0.2857143em;
      -   margin-bottom: 0.2857143em;
      - }
      -
      - .prose-sm ol > li {
      -   padding-left: 1.5714286em;
      - }
      -
      - .prose-sm ol > li::before {
      -   left: 0;
      - }
      -
      - .prose-sm ul > li {
      -   padding-left: 1.5714286em;
      - }
      -
      - .prose-sm ul > li::before {
      -   height: 0.3571429em;
      -   width: 0.3571429em;
      -   top: calc(0.8571429em - 0.1785714em);
      -   left: 0.2142857em;
      - }
      -
      - .prose-sm > ul > li p {
      -   margin-top: 0.5714286em;
      -   margin-bottom: 0.5714286em;
      - }
      -
      - .prose-sm > ul > li > *:first-child {
      -   margin-top: 1.1428571em;
      - }
      -
      - .prose-sm > ul > li > *:last-child {
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm > ol > li > *:first-child {
      -   margin-top: 1.1428571em;
      - }
      -
      - .prose-sm > ol > li > *:last-child {
      -   margin-bottom: 1.1428571em;
      - }
      -
      - .prose-sm ul ul, .prose-sm ul ol, .prose-sm ol ul, .prose-sm ol ol {
      -   margin-top: 0.5714286em;
      -   margin-bottom: 0.5714286em;
      - }
      -
      - .prose-sm hr {
      -   margin-top: 2.8571429em;
      -   margin-bottom: 2.8571429em;
      - }
      -
      - .prose-sm hr + * {
      -   margin-top: 0;
      - }
      -
      - .prose-sm h2 + * {
      -   margin-top: 0;
      - }
      -
      - .prose-sm h3 + * {
      -   margin-top: 0;
      - }
      -
      - .prose-sm h4 + * {
      -   margin-top: 0;
      - }
      -
      - .prose-sm table {
      -   font-size: 0.8571429em;
      -   line-height: 1.5;
      - }
      -
      - .prose-sm thead th {
      -   padding-right: 1em;
      -   padding-bottom: 0.6666667em;
      -   padding-left: 1em;
      - }
      -
      - .prose-sm thead th:first-child {
      -   padding-left: 0;
      - }
      -
      - .prose-sm thead th:last-child {
      -   padding-right: 0;
      - }
      -
      - .prose-sm tbody td {
      -   padding-top: 0.6666667em;
      -   padding-right: 1em;
      -   padding-bottom: 0.6666667em;
      -   padding-left: 1em;
      - }
      -
      - .prose-sm tbody td:first-child {
      -   padding-left: 0;
      - }
      -
      - .prose-sm tbody td:last-child {
      -   padding-right: 0;
      - }
      -
      - .prose-sm > :first-child {
      -   margin-top: 0;
      - }
      -
      - .prose-sm > :last-child {
      -   margin-bottom: 0;
      - }
      -
      - .prose-lg {
      + .markdown-lg {

      ---

      - .prose-lg p {
      + .markdown-lg p {

      ---

      - .prose-lg [class~='lead'] {
      + .markdown-lg [class~='lead'] {

      ---

      - .prose-lg blockquote {
      + .markdown-lg blockquote {

      ---

      - .prose-lg h1 {
      + .markdown-lg h1 {

      ---

      - .prose-lg h2 {
      + .markdown-lg h2 {

      ---

      - .prose-lg h3 {
      + .markdown-lg h3 {

      ---

      - .prose-lg h4 {
      + .markdown-lg h4 {

      ---

      - .prose-lg img {
      + .markdown-lg img {

      ---

      - .prose-lg video {
      + .markdown-lg video {

      ---

      - .prose-lg figure {
      + .markdown-lg figure {

      ---

      - .prose-lg figure > * {
      + .markdown-lg figure > * {

      ---

      - .prose-lg figure figcaption {
      + .markdown-lg figure figcaption {

      ---

      - .prose-lg code {
      + .markdown-lg code {

      ---

      - .prose-lg h2 code {
      + .markdown-lg h2 code {

      ---

      - .prose-lg h3 code {
      + .markdown-lg h3 code {

      ---

      - .prose-lg pre {
      + .markdown-lg pre {

      ---

      - .prose-lg ol {
      + .markdown-lg ol {

      ---

      - .prose-lg ul {
      + .markdown-lg ul {

      ---

      - .prose-lg li {
      + .markdown-lg li {

      ---

      - .prose-lg ol > li {
      + .markdown-lg ol > li {

      ---

      - .prose-lg ol > li::before {
      + .markdown-lg ol > li::before {

      ---

      - .prose-lg ul > li {
      + .markdown-lg ul > li {

      ---

      - .prose-lg ul > li::before {
      + .markdown-lg ul > li::before {

      ---

      - .prose-lg > ul > li p {
      + .markdown-lg > ul > li p {

      ---

      - .prose-lg > ul > li > *:first-child {
      + .markdown-lg > ul > li > *:first-child {

      ---

      - .prose-lg > ul > li > *:last-child {
      + .markdown-lg > ul > li > *:last-child {

      ---

      - .prose-lg > ol > li > *:first-child {
      + .markdown-lg > ol > li > *:first-child {

      ---

      - .prose-lg > ol > li > *:last-child {
      + .markdown-lg > ol > li > *:last-child {

      ---

      - .prose-lg ul ul, .prose-lg ul ol, .prose-lg ol ul, .prose-lg ol ol {
      + .markdown-lg ul ul, .markdown-lg ul ol, .markdown-lg ol ul, .markdown-lg ol ol {

      ---

      - .prose-lg hr {
      + .markdown-lg hr {

      ---

      - .prose-lg hr + * {
      + .markdown-lg hr + * {

      ---

      - .prose-lg h2 + * {
      + .markdown-lg h2 + * {

      ---

      - .prose-lg h3 + * {
      + .markdown-lg h3 + * {

      ---

      - .prose-lg h4 + * {
      + .markdown-lg h4 + * {

      ---

      - .prose-lg table {
      + .markdown-lg table {

      ---

      - .prose-lg thead th {
      + .markdown-lg thead th {

      ---

      - .prose-lg thead th:first-child {
      + .markdown-lg thead th:first-child {

      ---

      - .prose-lg thead th:last-child {
      + .markdown-lg thead th:last-child {

      ---

      - .prose-lg tbody td {
      + .markdown-lg tbody td {

      ---

      - .prose-lg tbody td:first-child {
      + .markdown-lg tbody td:first-child {

      ---

      - .prose-lg tbody td:last-child {
      + .markdown-lg tbody td:last-child {

      ---

      - .prose-lg > :first-child {
      + .markdown-lg > :first-child {

      ---

      - .prose-lg > :last-child {
      + .markdown-lg > :last-child {

      ---

      - .prose-xl {
      + .markdown-xl {

      ---

      - .prose-xl p {
      + .markdown-xl p {

      ---

      - .prose-xl [class~='lead'] {
      + .markdown-xl [class~='lead'] {

      ---

      - .prose-xl blockquote {
      + .markdown-xl blockquote {

      ---

      - .prose-xl h1 {
      + .markdown-xl h1 {

      ---

      - .prose-xl h2 {
      + .markdown-xl h2 {

      ---

      - .prose-xl h3 {
      + .markdown-xl h3 {

      ---

      - .prose-xl h4 {
      + .markdown-xl h4 {

      ---

      - .prose-xl img {
      + .markdown-xl img {

      ---

      - .prose-xl video {
      + .markdown-xl video {

      ---

      - .prose-xl figure {
      + .markdown-xl figure {

      ---

      - .prose-xl figure > * {
      + .markdown-xl figure > * {

      ---

      - .prose-xl figure figcaption {
      + .markdown-xl figure figcaption {

      ---

      - .prose-xl code {
      + .markdown-xl code {

      ---

      - .prose-xl h2 code {
      + .markdown-xl h2 code {

      ---

      - .prose-xl h3 code {
      + .markdown-xl h3 code {

      ---

      - .prose-xl pre {
      + .markdown-xl pre {

      ---

      - .prose-xl ol {
      + .markdown-xl ol {

      ---

      - .prose-xl ul {
      + .markdown-xl ul {

      ---

      - .prose-xl li {
      + .markdown-xl li {

      ---

      - .prose-xl ol > li {
      + .markdown-xl ol > li {

      ---

      - .prose-xl ol > li::before {
      + .markdown-xl ol > li::before {

      ---

      - .prose-xl ul > li {
      + .markdown-xl ul > li {

      ---

      - .prose-xl ul > li::before {
      + .markdown-xl ul > li::before {

      ---

      - .prose-xl > ul > li p {
      + .markdown-xl > ul > li p {

      ---

      - .prose-xl > ul > li > *:first-child {
      + .markdown-xl > ul > li > *:first-child {

      ---

      - .prose-xl > ul > li > *:last-child {
      + .markdown-xl > ul > li > *:last-child {

      ---

      - .prose-xl > ol > li > *:first-child {
      + .markdown-xl > ol > li > *:first-child {

      ---

      - .prose-xl > ol > li > *:last-child {
      + .markdown-xl > ol > li > *:last-child {

      ---

      - .prose-xl ul ul, .prose-xl ul ol, .prose-xl ol ul, .prose-xl ol ol {
      + .markdown-xl ul ul, .markdown-xl ul ol, .markdown-xl ol ul, .markdown-xl ol ol {

      ---

      - .prose-xl hr {
      + .markdown-xl hr {

      ---

      - .prose-xl hr + * {
      + .markdown-xl hr + * {

      ---

      - .prose-xl h2 + * {
      + .markdown-xl h2 + * {

      ---

      - .prose-xl h3 + * {
      + .markdown-xl h3 + * {

      ---

      - .prose-xl h4 + * {
      + .markdown-xl h4 + * {

      ---

      - .prose-xl table {
      + .markdown-xl table {

      ---

      - .prose-xl thead th {
      + .markdown-xl thead th {

      ---

      - .prose-xl thead th:first-child {
      + .markdown-xl thead th:first-child {

      ---

      - .prose-xl thead th:last-child {
      + .markdown-xl thead th:last-child {

      ---

      - .prose-xl tbody td {
      + .markdown-xl tbody td {

      ---

      - .prose-xl tbody td:first-child {
      + .markdown-xl tbody td:first-child {

      ---

      - .prose-xl tbody td:last-child {
      + .markdown-xl tbody td:last-child {

      ---

      - .prose-xl > :first-child {
      + .markdown-xl > :first-child {

      ---

      - .prose-xl > :last-child {
      + .markdown-xl > :last-child {

      ---

      - .prose-2xl {
      + .markdown-2xl {

      ---

      - .prose-2xl p {
      + .markdown-2xl p {

      ---

      - .prose-2xl [class~='lead'] {
      + .markdown-2xl [class~='lead'] {

      ---

      - .prose-2xl blockquote {
      + .markdown-2xl blockquote {

      ---

      - .prose-2xl h1 {
      + .markdown-2xl h1 {

      ---

      - .prose-2xl h2 {
      + .markdown-2xl h2 {

      ---

      - .prose-2xl h3 {
      + .markdown-2xl h3 {

      ---

      - .prose-2xl h4 {
      + .markdown-2xl h4 {

      ---

      - .prose-2xl img {
      + .markdown-2xl img {

      ---

      - .prose-2xl video {
      + .markdown-2xl video {

      ---

      - .prose-2xl figure {
      + .markdown-2xl figure {

      ---

      - .prose-2xl figure > * {
      + .markdown-2xl figure > * {

      ---

      - .prose-2xl figure figcaption {
      + .markdown-2xl figure figcaption {

      ---

      - .prose-2xl code {
      + .markdown-2xl code {

      ---

      - .prose-2xl h2 code {
      + .markdown-2xl h2 code {

      ---

      - .prose-2xl h3 code {
      + .markdown-2xl h3 code {

      ---

      - .prose-2xl pre {
      + .markdown-2xl pre {

      ---

      - .prose-2xl ol {
      + .markdown-2xl ol {

      ---

      - .prose-2xl ul {
      + .markdown-2xl ul {

      ---

      - .prose-2xl li {
      + .markdown-2xl li {

      ---

      - .prose-2xl ol > li {
      + .markdown-2xl ol > li {

      ---

      - .prose-2xl ol > li::before {
      + .markdown-2xl ol > li::before {

      ---

      - .prose-2xl ul > li {
      + .markdown-2xl ul > li {

      ---

      - .prose-2xl ul > li::before {
      + .markdown-2xl ul > li::before {

      ---

      - .prose-2xl > ul > li p {
      + .markdown-2xl > ul > li p {

      ---

      - .prose-2xl > ul > li > *:first-child {
      + .markdown-2xl > ul > li > *:first-child {

      ---

      - .prose-2xl > ul > li > *:last-child {
      + .markdown-2xl > ul > li > *:last-child {

      ---

      - .prose-2xl > ol > li > *:first-child {
      + .markdown-2xl > ol > li > *:first-child {

      ---

      - .prose-2xl > ol > li > *:last-child {
      + .markdown-2xl > ol > li > *:last-child {

      ---

      - .prose-2xl ul ul, .prose-2xl ul ol, .prose-2xl ol ul, .prose-2xl ol ol {
      + .markdown-2xl ul ul, .markdown-2xl ul ol, .markdown-2xl ol ul, .markdown-2xl ol ol {

      ---

      - .prose-2xl hr {
      + .markdown-2xl hr {

      ---

      - .prose-2xl hr + * {
      + .markdown-2xl hr + * {

      ---

      - .prose-2xl h2 + * {
      + .markdown-2xl h2 + * {

      ---

      - .prose-2xl h3 + * {
      + .markdown-2xl h3 + * {

      ---

      - .prose-2xl h4 + * {
      + .markdown-2xl h4 + * {

      ---

      - .prose-2xl table {
      + .markdown-2xl table {

      ---

      - .prose-2xl thead th {
      + .markdown-2xl thead th {

      ---

      - .prose-2xl thead th:first-child {
      + .markdown-2xl thead th:first-child {

      ---

      - .prose-2xl thead th:last-child {
      + .markdown-2xl thead th:last-child {

      ---

      - .prose-2xl tbody td {
      + .markdown-2xl tbody td {

      ---

      - .prose-2xl tbody td:first-child {
      + .markdown-2xl tbody td:first-child {

      ---

      - .prose-2xl tbody td:last-child {
      + .markdown-2xl tbody td:last-child {

      ---

      - .prose-2xl > :first-child {
      + .markdown-2xl > :first-child {

      ---

      - .prose-2xl > :last-child {
      + .markdown-2xl > :last-child {

      ---

      - }
      -
      - .prose-red a {
      -   color: #dc2626;
      - }
      -
      - .prose-red a code {
      -   color: #dc2626;
      - }
      -
      - .prose-yellow a {
      -   color: #d97706;
      - }
      -
      - .prose-yellow a code {
      -   color: #d97706;

      ---

      - .prose-green a {
      -   color: #059669;
      - }
      -
      - .prose-green a code {
      -   color: #059669;
      - }
      -
      - .prose-blue a {
      -   color: #2563eb;
      - }
      -
      - .prose-blue a code {
      -   color: #2563eb;
      - }
      -
      - .prose-indigo a {
      -   color: #4f46e5;
      - }
      -
      - .prose-indigo a code {
      -   color: #4f46e5;
      - }
      -
      - .prose-purple a {
      -   color: #7c3aed;
      - }
      -
      - .prose-purple a code {
      -   color: #7c3aed;
      - }
      -
      - .prose-pink a {
      -   color: #db2777;
      - }
      -
      - .prose-pink a code {
      -   color: #db2777;
      - }
      -

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose [class~='lead'] {
      +   .sm\\\\:markdown [class~='lead'] {

      ---

      -   .sm\\\\:prose a {
      +   .sm\\\\:markdown a {

      ---

      -   .sm\\\\:prose strong {
      +   .sm\\\\:markdown strong {

      ---

      -   .sm\\\\:prose ol {
      +   .sm\\\\:markdown ol {

      ---

      -   .sm\\\\:prose ol > li {
      +   .sm\\\\:markdown ol > li {

      ---

      -   .sm\\\\:prose ol > li::before {
      +   .sm\\\\:markdown ol > li::before {

      ---

      -   .sm\\\\:prose ul > li {
      +   .sm\\\\:markdown ul > li {

      ---

      -   .sm\\\\:prose ul > li::before {
      +   .sm\\\\:markdown ul > li::before {

      ---

      -   .sm\\\\:prose hr {
      +   .sm\\\\:markdown hr {

      ---

      -   .sm\\\\:prose blockquote {
      +   .sm\\\\:markdown blockquote {

      ---

      -   .sm\\\\:prose blockquote p:first-of-type::before {
      +   .sm\\\\:markdown blockquote p:first-of-type::before {

      ---

      -   .sm\\\\:prose blockquote p:last-of-type::after {
      +   .sm\\\\:markdown blockquote p:last-of-type::after {

      ---

      -   .sm\\\\:prose h1 {
      +   .sm\\\\:markdown h1 {

      ---

      -   .sm\\\\:prose h2 {
      +   .sm\\\\:markdown h2 {

      ---

      -   .sm\\\\:prose h3 {
      +   .sm\\\\:markdown h3 {

      ---

      -   .sm\\\\:prose h4 {
      +   .sm\\\\:markdown h4 {

      ---

      -   .sm\\\\:prose figure figcaption {
      +   .sm\\\\:markdown figure figcaption {

      ---

      -   .sm\\\\:prose code {
      +   .sm\\\\:markdown code {

      ---

      -   .sm\\\\:prose code::before {
      +   .sm\\\\:markdown code::before {

      ---

      -   .sm\\\\:prose code::after {
      +   .sm\\\\:markdown code::after {

      ---

      -   .sm\\\\:prose a code {
      +   .sm\\\\:markdown a code {

      ---

      -   .sm\\\\:prose pre {
      +   .sm\\\\:markdown pre {

      ---

      -   .sm\\\\:prose pre code {
      +   .sm\\\\:markdown pre code {

      ---

      -   .sm\\\\:prose pre code::before {
      +   .sm\\\\:markdown pre code::before {

      ---

      -   .sm\\\\:prose pre code::after {
      +   .sm\\\\:markdown pre code::after {

      ---

      -   .sm\\\\:prose table {
      +   .sm\\\\:markdown table {

      ---

      -   .sm\\\\:prose thead {
      +   .sm\\\\:markdown thead {

      ---

      -   .sm\\\\:prose thead th {
      +   .sm\\\\:markdown thead th {

      ---

      -   .sm\\\\:prose tbody tr {
      +   .sm\\\\:markdown tbody tr {

      ---

      -   .sm\\\\:prose tbody tr:last-child {
      +   .sm\\\\:markdown tbody tr:last-child {

      ---

      -   .sm\\\\:prose tbody td {
      +   .sm\\\\:markdown tbody td {

      ---

      -   .sm\\\\:prose {
      +   .sm\\\\:markdown {

      ---

      -   .sm\\\\:prose p {
      +   .sm\\\\:markdown p {

      ---

      -   .sm\\\\:prose img {
      +   .sm\\\\:markdown img {

      ---

      -   .sm\\\\:prose video {
      +   .sm\\\\:markdown video {

      ---

      -   .sm\\\\:prose figure {
      +   .sm\\\\:markdown figure {

      ---

      -   .sm\\\\:prose figure > * {
      +   .sm\\\\:markdown figure > * {

      ---

      -   .sm\\\\:prose h2 code {
      +   .sm\\\\:markdown h2 code {

      ---

      -   .sm\\\\:prose h3 code {
      +   .sm\\\\:markdown h3 code {

      ---

      -   .sm\\\\:prose ul {
      +   .sm\\\\:markdown ul {

      ---

      -   .sm\\\\:prose li {
      +   .sm\\\\:markdown li {

      ---

      -   .sm\\\\:prose > ul > li p {
      +   .sm\\\\:markdown > ul > li p {

      ---

      -   .sm\\\\:prose > ul > li > *:first-child {
      +   .sm\\\\:markdown > ul > li > *:first-child {

      ---

      -   .sm\\\\:prose > ul > li > *:last-child {
      +   .sm\\\\:markdown > ul > li > *:last-child {

      ---

      -   .sm\\\\:prose > ol > li > *:first-child {
      +   .sm\\\\:markdown > ol > li > *:first-child {

      ---

      -   .sm\\\\:prose > ol > li > *:last-child {
      +   .sm\\\\:markdown > ol > li > *:last-child {

      ---

      -   .sm\\\\:prose ul ul, .sm\\\\:prose ul ol, .sm\\\\:prose ol ul, .sm\\\\:prose ol ol {
      +   .sm\\\\:markdown ul ul, .sm\\\\:markdown ul ol, .sm\\\\:markdown ol ul, .sm\\\\:markdown ol ol {

      ---

      -   .sm\\\\:prose hr + * {
      +   .sm\\\\:markdown hr + * {

      ---

      -   .sm\\\\:prose h2 + * {
      +   .sm\\\\:markdown h2 + * {

      ---

      -   .sm\\\\:prose h3 + * {
      +   .sm\\\\:markdown h3 + * {

      ---

      -   .sm\\\\:prose h4 + * {
      +   .sm\\\\:markdown h4 + * {

      ---

      -   .sm\\\\:prose thead th:first-child {
      +   .sm\\\\:markdown thead th:first-child {

      ---

      -   }
      -
      -   .sm\\\\:prose thead th:last-child {
      -     padding-right: 0;

      ---

      -   .sm\\\\:prose tbody td:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose tbody td:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .sm\\\\:prose > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .sm\\\\:prose-sm p {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm [class~='lead'] {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .sm\\\\:prose-sm blockquote {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .sm\\\\:prose-sm h1 {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .sm\\\\:prose-sm h2 {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .sm\\\\:prose-sm h3 {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .sm\\\\:prose-sm h4 {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .sm\\\\:prose-sm img {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .sm\\\\:prose-sm video {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .sm\\\\:prose-sm figure {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .sm\\\\:prose-sm figure > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .sm\\\\:prose-sm figure figcaption {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .sm\\\\:prose-sm code {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .sm\\\\:prose-sm h2 code {
      -     font-size: 0.9em;
      -   }
      -
      -   .sm\\\\:prose-sm h3 code {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .sm\\\\:prose-sm pre {
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
      -   .sm\\\\:prose-sm ol {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm ul {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm li {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .sm\\\\:prose-sm ol > li {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm ol > li::before {
      -     left: 0;
      -   }
      -
      -   .sm\\\\:prose-sm ul > li {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm ul > li::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .sm\\\\:prose-sm > ul > li p {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm > ul > li > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm > ul > li > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm > ol > li > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm > ol > li > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .sm\\\\:prose-sm ul ul, .sm\\\\:prose-sm ul ol, .sm\\\\:prose-sm ol ul, .sm\\\\:prose-sm ol ol {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .sm\\\\:prose-sm hr {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .sm\\\\:prose-sm hr + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm h2 + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm h4 + * {
      -     margin-top: 0;
      -   }
      -
      -   .sm\\\\:prose-sm table {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .sm\\\\:prose-sm thead th {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .sm\\\\:prose-sm thead th:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .sm\\\\:prose-sm thead th:last-child {
      +   .sm\\\\:markdown thead th:last-child {

      ---

      -   .sm\\\\:prose-sm tbody td {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .sm\\\\:prose-sm tbody td:first-child {
      +   .sm\\\\:markdown tbody td:first-child {

      ---

      -   .sm\\\\:prose-sm tbody td:last-child {
      +   .sm\\\\:markdown tbody td:last-child {

      ---

      -   .sm\\\\:prose-sm > :first-child {
      +   .sm\\\\:markdown > :first-child {

      ---

      -   .sm\\\\:prose-sm > :last-child {
      +   .sm\\\\:markdown > :last-child {

      ---

      -   .sm\\\\:prose-lg {
      +   .sm\\\\:markdown-lg {

      ---

      -   .sm\\\\:prose-lg p {
      +   .sm\\\\:markdown-lg p {

      ---

      -   .sm\\\\:prose-lg [class~='lead'] {
      +   .sm\\\\:markdown-lg [class~='lead'] {

      ---

      -   .sm\\\\:prose-lg blockquote {
      +   .sm\\\\:markdown-lg blockquote {

      ---

      -   .sm\\\\:prose-lg h1 {
      +   .sm\\\\:markdown-lg h1 {

      ---

      -   .sm\\\\:prose-lg h2 {
      +   .sm\\\\:markdown-lg h2 {

      ---

      -   .sm\\\\:prose-lg h3 {
      +   .sm\\\\:markdown-lg h3 {

      ---

      -   .sm\\\\:prose-lg h4 {
      +   .sm\\\\:markdown-lg h4 {

      ---

      -   .sm\\\\:prose-lg img {
      +   .sm\\\\:markdown-lg img {

      ---

      -   .sm\\\\:prose-lg video {
      +   .sm\\\\:markdown-lg video {

      ---

      -   .sm\\\\:prose-lg figure {
      +   .sm\\\\:markdown-lg figure {

      ---

      -   .sm\\\\:prose-lg figure > * {
      +   .sm\\\\:markdown-lg figure > * {

      ---

      -   .sm\\\\:prose-lg figure figcaption {
      +   .sm\\\\:markdown-lg figure figcaption {

      ---

      -   .sm\\\\:prose-lg code {
      +   .sm\\\\:markdown-lg code {

      ---

      -   .sm\\\\:prose-lg h2 code {
      +   .sm\\\\:markdown-lg h2 code {

      ---

      -   .sm\\\\:prose-lg h3 code {
      +   .sm\\\\:markdown-lg h3 code {

      ---

      -   .sm\\\\:prose-lg pre {
      +   .sm\\\\:markdown-lg pre {

      ---

      -   .sm\\\\:prose-lg ol {
      +   .sm\\\\:markdown-lg ol {

      ---

      -   .sm\\\\:prose-lg ul {
      +   .sm\\\\:markdown-lg ul {

      ---

      -   .sm\\\\:prose-lg li {
      +   .sm\\\\:markdown-lg li {

      ---

      -   .sm\\\\:prose-lg ol > li {
      +   .sm\\\\:markdown-lg ol > li {

      ---

      -   .sm\\\\:prose-lg ol > li::before {
      +   .sm\\\\:markdown-lg ol > li::before {

      ---

      -   .sm\\\\:prose-lg ul > li {
      +   .sm\\\\:markdown-lg ul > li {

      ---

      -   .sm\\\\:prose-lg ul > li::before {
      +   .sm\\\\:markdown-lg ul > li::before {

      ---

      -   .sm\\\\:prose-lg > ul > li p {
      +   .sm\\\\:markdown-lg > ul > li p {

      ---

      -   .sm\\\\:prose-lg > ul > li > *:first-child {
      +   .sm\\\\:markdown-lg > ul > li > *:first-child {

      ---

      -   .sm\\\\:prose-lg > ul > li > *:last-child {
      +   .sm\\\\:markdown-lg > ul > li > *:last-child {

      ---

      -   .sm\\\\:prose-lg > ol > li > *:first-child {
      +   .sm\\\\:markdown-lg > ol > li > *:first-child {

      ---

      -   .sm\\\\:prose-lg > ol > li > *:last-child {
      +   .sm\\\\:markdown-lg > ol > li > *:last-child {

      ---

      -   .sm\\\\:prose-lg ul ul, .sm\\\\:prose-lg ul ol, .sm\\\\:prose-lg ol ul, .sm\\\\:prose-lg ol ol {
      +   .sm\\\\:markdown-lg ul ul, .sm\\\\:markdown-lg ul ol, .sm\\\\:markdown-lg ol ul, .sm\\\\:markdown-lg ol ol {

      ---

      -   .sm\\\\:prose-lg hr {
      +   .sm\\\\:markdown-lg hr {

      ---

      -   .sm\\\\:prose-lg hr + * {
      +   .sm\\\\:markdown-lg hr + * {

      ---

      -   .sm\\\\:prose-lg h2 + * {
      +   .sm\\\\:markdown-lg h2 + * {

      ---

      -   .sm\\\\:prose-lg h3 + * {
      +   .sm\\\\:markdown-lg h3 + * {

      ---

      -   .sm\\\\:prose-lg h4 + * {
      +   .sm\\\\:markdown-lg h4 + * {

      ---

      -   .sm\\\\:prose-lg table {
      +   .sm\\\\:markdown-lg table {

      ---

      -   .sm\\\\:prose-lg thead th {
      +   .sm\\\\:markdown-lg thead th {

      ---

      -   .sm\\\\:prose-lg thead th:first-child {
      +   .sm\\\\:markdown-lg thead th:first-child {

      ---

      -   .sm\\\\:prose-lg thead th:last-child {
      +   .sm\\\\:markdown-lg thead th:last-child {

      ---

      -   .sm\\\\:prose-lg tbody td {
      +   .sm\\\\:markdown-lg tbody td {

      ---

      -   .sm\\\\:prose-lg tbody td:first-child {
      +   .sm\\\\:markdown-lg tbody td:first-child {

      ---

      -   .sm\\\\:prose-lg tbody td:last-child {
      +   .sm\\\\:markdown-lg tbody td:last-child {

      ---

      -   .sm\\\\:prose-lg > :first-child {
      +   .sm\\\\:markdown-lg > :first-child {

      ---

      -   .sm\\\\:prose-lg > :last-child {
      +   .sm\\\\:markdown-lg > :last-child {

      ---

      -   .sm\\\\:prose-xl {
      +   .sm\\\\:markdown-xl {

      ---

      -   .sm\\\\:prose-xl p {
      +   .sm\\\\:markdown-xl p {

      ---

      -   .sm\\\\:prose-xl [class~='lead'] {
      +   .sm\\\\:markdown-xl [class~='lead'] {

      ---

      -   .sm\\\\:prose-xl blockquote {
      +   .sm\\\\:markdown-xl blockquote {

      ---

      -   .sm\\\\:prose-xl h1 {
      +   .sm\\\\:markdown-xl h1 {

      ---

      -   .sm\\\\:prose-xl h2 {
      +   .sm\\\\:markdown-xl h2 {

      ---

      -   .sm\\\\:prose-xl h3 {
      +   .sm\\\\:markdown-xl h3 {

      ---

      -   .sm\\\\:prose-xl h4 {
      +   .sm\\\\:markdown-xl h4 {

      ---

      -   .sm\\\\:prose-xl img {
      +   .sm\\\\:markdown-xl img {

      ---

      -   .sm\\\\:prose-xl video {
      +   .sm\\\\:markdown-xl video {

      ---

      -   .sm\\\\:prose-xl figure {
      +   .sm\\\\:markdown-xl figure {

      ---

      -   .sm\\\\:prose-xl figure > * {
      +   .sm\\\\:markdown-xl figure > * {

      ---

      -   .sm\\\\:prose-xl figure figcaption {
      +   .sm\\\\:markdown-xl figure figcaption {

      ---

      -   .sm\\\\:prose-xl code {
      +   .sm\\\\:markdown-xl code {

      ---

      -   .sm\\\\:prose-xl h2 code {
      +   .sm\\\\:markdown-xl h2 code {

      ---

      -   .sm\\\\:prose-xl h3 code {
      +   .sm\\\\:markdown-xl h3 code {

      ---

      -   .sm\\\\:prose-xl pre {
      +   .sm\\\\:markdown-xl pre {

      ---

      -   .sm\\\\:prose-xl ol {
      +   .sm\\\\:markdown-xl ol {

      ---

      -   .sm\\\\:prose-xl ul {
      +   .sm\\\\:markdown-xl ul {

      ---

      -   .sm\\\\:prose-xl li {
      +   .sm\\\\:markdown-xl li {

      ---

      -   .sm\\\\:prose-xl ol > li {
      +   .sm\\\\:markdown-xl ol > li {

      ---

      -   .sm\\\\:prose-xl ol > li::before {
      +   .sm\\\\:markdown-xl ol > li::before {

      ---

      -   .sm\\\\:prose-xl ul > li {
      +   .sm\\\\:markdown-xl ul > li {

      ---

      -   .sm\\\\:prose-xl ul > li::before {
      +   .sm\\\\:markdown-xl ul > li::before {

      ---

      -   .sm\\\\:prose-xl > ul > li p {
      +   .sm\\\\:markdown-xl > ul > li p {

      ---

      -   .sm\\\\:prose-xl > ul > li > *:first-child {
      +   .sm\\\\:markdown-xl > ul > li > *:first-child {

      ---

      -   .sm\\\\:prose-xl > ul > li > *:last-child {
      +   .sm\\\\:markdown-xl > ul > li > *:last-child {

      ---

      -   .sm\\\\:prose-xl > ol > li > *:first-child {
      +   .sm\\\\:markdown-xl > ol > li > *:first-child {

      ---

      -   .sm\\\\:prose-xl > ol > li > *:last-child {
      +   .sm\\\\:markdown-xl > ol > li > *:last-child {

      ---

      -   .sm\\\\:prose-xl ul ul, .sm\\\\:prose-xl ul ol, .sm\\\\:prose-xl ol ul, .sm\\\\:prose-xl ol ol {
      +   .sm\\\\:markdown-xl ul ul, .sm\\\\:markdown-xl ul ol, .sm\\\\:markdown-xl ol ul, .sm\\\\:markdown-xl ol ol {

      ---

      -   .sm\\\\:prose-xl hr {
      +   .sm\\\\:markdown-xl hr {

      ---

      -   .sm\\\\:prose-xl hr + * {
      +   .sm\\\\:markdown-xl hr + * {

      ---

      -   .sm\\\\:prose-xl h2 + * {
      +   .sm\\\\:markdown-xl h2 + * {

      ---

      -   .sm\\\\:prose-xl h3 + * {
      +   .sm\\\\:markdown-xl h3 + * {

      ---

      -   .sm\\\\:prose-xl h4 + * {
      +   .sm\\\\:markdown-xl h4 + * {

      ---

      -   .sm\\\\:prose-xl table {
      +   .sm\\\\:markdown-xl table {

      ---

      -   .sm\\\\:prose-xl thead th {
      +   .sm\\\\:markdown-xl thead th {

      ---

      -   .sm\\\\:prose-xl thead th:first-child {
      +   .sm\\\\:markdown-xl thead th:first-child {

      ---

      -   .sm\\\\:prose-xl thead th:last-child {
      +   .sm\\\\:markdown-xl thead th:last-child {

      ---

      -   .sm\\\\:prose-xl tbody td {
      +   .sm\\\\:markdown-xl tbody td {

      ---

      -   .sm\\\\:prose-xl tbody td:first-child {
      +   .sm\\\\:markdown-xl tbody td:first-child {

      ---

      -   .sm\\\\:prose-xl tbody td:last-child {
      +   .sm\\\\:markdown-xl tbody td:last-child {

      ---

      -   .sm\\\\:prose-xl > :first-child {
      +   .sm\\\\:markdown-xl > :first-child {

      ---

      -   .sm\\\\:prose-xl > :last-child {
      +   .sm\\\\:markdown-xl > :last-child {

      ---

      -   .sm\\\\:prose-2xl {
      +   .sm\\\\:markdown-2xl {

      ---

      -   .sm\\\\:prose-2xl p {
      +   .sm\\\\:markdown-2xl p {

      ---

      -   .sm\\\\:prose-2xl [class~='lead'] {
      +   .sm\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .sm\\\\:prose-2xl blockquote {
      +   .sm\\\\:markdown-2xl blockquote {

      ---

      -   .sm\\\\:prose-2xl h1 {
      +   .sm\\\\:markdown-2xl h1 {

      ---

      -   .sm\\\\:prose-2xl h2 {
      +   .sm\\\\:markdown-2xl h2 {

      ---

      -   .sm\\\\:prose-2xl h3 {
      +   .sm\\\\:markdown-2xl h3 {

      ---

      -   .sm\\\\:prose-2xl h4 {
      +   .sm\\\\:markdown-2xl h4 {

      ---

      -   .sm\\\\:prose-2xl img {
      +   .sm\\\\:markdown-2xl img {

      ---

      -   .sm\\\\:prose-2xl video {
      +   .sm\\\\:markdown-2xl video {

      ---

      -   .sm\\\\:prose-2xl figure {
      +   .sm\\\\:markdown-2xl figure {

      ---

      -   .sm\\\\:prose-2xl figure > * {
      +   .sm\\\\:markdown-2xl figure > * {

      ---

      -   .sm\\\\:prose-2xl figure figcaption {
      +   .sm\\\\:markdown-2xl figure figcaption {

      ---

      -   .sm\\\\:prose-2xl code {
      +   .sm\\\\:markdown-2xl code {

      ---

      -   .sm\\\\:prose-2xl h2 code {
      +   .sm\\\\:markdown-2xl h2 code {

      ---

      -   .sm\\\\:prose-2xl h3 code {
      +   .sm\\\\:markdown-2xl h3 code {

      ---

      -   .sm\\\\:prose-2xl pre {
      +   .sm\\\\:markdown-2xl pre {

      ---

      -   .sm\\\\:prose-2xl ol {
      +   .sm\\\\:markdown-2xl ol {

      ---

      -   .sm\\\\:prose-2xl ul {
      +   .sm\\\\:markdown-2xl ul {

      ---

      -   .sm\\\\:prose-2xl li {
      +   .sm\\\\:markdown-2xl li {

      ---

      -   .sm\\\\:prose-2xl ol > li {
      +   .sm\\\\:markdown-2xl ol > li {

      ---

      -   .sm\\\\:prose-2xl ol > li::before {
      +   .sm\\\\:markdown-2xl ol > li::before {

      ---

      -   .sm\\\\:prose-2xl ul > li {
      +   .sm\\\\:markdown-2xl ul > li {

      ---

      -   .sm\\\\:prose-2xl ul > li::before {
      +   .sm\\\\:markdown-2xl ul > li::before {

      ---

      -   .sm\\\\:prose-2xl > ul > li p {
      +   .sm\\\\:markdown-2xl > ul > li p {

      ---

      -   .sm\\\\:prose-2xl > ul > li > *:first-child {
      +   .sm\\\\:markdown-2xl > ul > li > *:first-child {

      ---

      -   .sm\\\\:prose-2xl > ul > li > *:last-child {
      +   .sm\\\\:markdown-2xl > ul > li > *:last-child {

      ---

      -   .sm\\\\:prose-2xl > ol > li > *:first-child {
      +   .sm\\\\:markdown-2xl > ol > li > *:first-child {

      ---

      -   .sm\\\\:prose-2xl > ol > li > *:last-child {
      +   .sm\\\\:markdown-2xl > ol > li > *:last-child {

      ---

      -   .sm\\\\:prose-2xl ul ul, .sm\\\\:prose-2xl ul ol, .sm\\\\:prose-2xl ol ul, .sm\\\\:prose-2xl ol ol {
      +   .sm\\\\:markdown-2xl ul ul, .sm\\\\:markdown-2xl ul ol, .sm\\\\:markdown-2xl ol ul, .sm\\\\:markdown-2xl ol ol {

      ---

      -   .sm\\\\:prose-2xl hr {
      +   .sm\\\\:markdown-2xl hr {

      ---

      -   .sm\\\\:prose-2xl hr + * {
      +   .sm\\\\:markdown-2xl hr + * {

      ---

      -   .sm\\\\:prose-2xl h2 + * {
      +   .sm\\\\:markdown-2xl h2 + * {

      ---

      -   .sm\\\\:prose-2xl h3 + * {
      +   .sm\\\\:markdown-2xl h3 + * {

      ---

      -   .sm\\\\:prose-2xl h4 + * {
      +   .sm\\\\:markdown-2xl h4 + * {

      ---

      -   .sm\\\\:prose-2xl table {
      +   .sm\\\\:markdown-2xl table {

      ---

      -   .sm\\\\:prose-2xl thead th {
      +   .sm\\\\:markdown-2xl thead th {

      ---

      -   .sm\\\\:prose-2xl thead th:first-child {
      +   .sm\\\\:markdown-2xl thead th:first-child {

      ---

      -   .sm\\\\:prose-2xl thead th:last-child {
      +   .sm\\\\:markdown-2xl thead th:last-child {

      ---

      -   .sm\\\\:prose-2xl tbody td {
      +   .sm\\\\:markdown-2xl tbody td {

      ---

      -   .sm\\\\:prose-2xl tbody td:first-child {
      +   .sm\\\\:markdown-2xl tbody td:first-child {

      ---

      -   .sm\\\\:prose-2xl tbody td:last-child {
      +   .sm\\\\:markdown-2xl tbody td:last-child {

      ---

      -   .sm\\\\:prose-2xl > :first-child {
      +   .sm\\\\:markdown-2xl > :first-child {

      ---

      -   .sm\\\\:prose-2xl > :last-child {
      +   .sm\\\\:markdown-2xl > :last-child {

      ---

      -   }
      -
      -   .sm\\\\:prose-red a {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-red a code {
      -     color: #dc2626;
      -   }
      -
      -   .sm\\\\:prose-yellow a {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-yellow a code {
      -     color: #d97706;
      -   }
      -
      -   .sm\\\\:prose-green a {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-green a code {
      -     color: #059669;
      -   }
      -
      -   .sm\\\\:prose-blue a {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-blue a code {
      -     color: #2563eb;
      -   }
      -
      -   .sm\\\\:prose-indigo a {
      -     color: #4f46e5;

      ---

      -
      -   .sm\\\\:prose-indigo a code {
      -     color: #4f46e5;
      -   }
      -
      -   .sm\\\\:prose-purple a {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-purple a code {
      -     color: #7c3aed;
      -   }
      -
      -   .sm\\\\:prose-pink a {
      -     color: #db2777;
      -   }
      -
      -   .sm\\\\:prose-pink a code {
      -     color: #db2777;
      -   }

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose [class~='lead'] {
      +   .md\\\\:markdown [class~='lead'] {

      ---

      -   .md\\\\:prose a {
      +   .md\\\\:markdown a {

      ---

      -   .md\\\\:prose strong {
      +   .md\\\\:markdown strong {

      ---

      -   .md\\\\:prose ol {
      +   .md\\\\:markdown ol {

      ---

      -   .md\\\\:prose ol > li {
      +   .md\\\\:markdown ol > li {

      ---

      -   .md\\\\:prose ol > li::before {
      +   .md\\\\:markdown ol > li::before {

      ---

      -   .md\\\\:prose ul > li {
      +   .md\\\\:markdown ul > li {

      ---

      -   .md\\\\:prose ul > li::before {
      +   .md\\\\:markdown ul > li::before {

      ---

      -   .md\\\\:prose hr {
      +   .md\\\\:markdown hr {

      ---

      -   .md\\\\:prose blockquote {
      +   .md\\\\:markdown blockquote {

      ---

      -   .md\\\\:prose blockquote p:first-of-type::before {
      +   .md\\\\:markdown blockquote p:first-of-type::before {

      ---

      -   .md\\\\:prose blockquote p:last-of-type::after {
      +   .md\\\\:markdown blockquote p:last-of-type::after {

      ---

      -   .md\\\\:prose h1 {
      +   .md\\\\:markdown h1 {

      ---

      -   .md\\\\:prose h2 {
      +   .md\\\\:markdown h2 {

      ---

      -   .md\\\\:prose h3 {
      +   .md\\\\:markdown h3 {

      ---

      -   .md\\\\:prose h4 {
      +   .md\\\\:markdown h4 {

      ---

      -   .md\\\\:prose figure figcaption {
      +   .md\\\\:markdown figure figcaption {

      ---

      -   .md\\\\:prose code {
      +   .md\\\\:markdown code {

      ---

      -   .md\\\\:prose code::before {
      +   .md\\\\:markdown code::before {

      ---

      -   .md\\\\:prose code::after {
      +   .md\\\\:markdown code::after {

      ---

      -   .md\\\\:prose a code {
      +   .md\\\\:markdown a code {

      ---

      -   .md\\\\:prose pre {
      +   .md\\\\:markdown pre {

      ---

      -   .md\\\\:prose pre code {
      +   .md\\\\:markdown pre code {

      ---

      -   .md\\\\:prose pre code::before {
      +   .md\\\\:markdown pre code::before {

      ---

      -   .md\\\\:prose pre code::after {
      +   .md\\\\:markdown pre code::after {

      ---

      -   .md\\\\:prose table {
      +   .md\\\\:markdown table {

      ---

      -   .md\\\\:prose thead {
      +   .md\\\\:markdown thead {

      ---

      -   .md\\\\:prose thead th {
      +   .md\\\\:markdown thead th {

      ---

      -   .md\\\\:prose tbody tr {
      +   .md\\\\:markdown tbody tr {

      ---

      -   .md\\\\:prose tbody tr:last-child {
      +   .md\\\\:markdown tbody tr:last-child {

      ---

      -   .md\\\\:prose tbody td {
      +   .md\\\\:markdown tbody td {

      ---

      -   .md\\\\:prose {
      +   .md\\\\:markdown {

      ---

      -   .md\\\\:prose p {
      +   .md\\\\:markdown p {

      ---

      -   .md\\\\:prose img {
      +   .md\\\\:markdown img {

      ---

      -   .md\\\\:prose video {
      +   .md\\\\:markdown video {

      ---

      -   .md\\\\:prose figure {
      +   .md\\\\:markdown figure {

      ---

      -   .md\\\\:prose figure > * {
      +   .md\\\\:markdown figure > * {

      ---

      -   .md\\\\:prose h2 code {
      +   .md\\\\:markdown h2 code {

      ---

      -   .md\\\\:prose h3 code {
      +   .md\\\\:markdown h3 code {

      ---

      -   .md\\\\:prose ul {
      +   .md\\\\:markdown ul {

      ---

      -   .md\\\\:prose li {
      +   .md\\\\:markdown li {

      ---

      -   .md\\\\:prose > ul > li p {
      +   .md\\\\:markdown > ul > li p {

      ---

      -   .md\\\\:prose > ul > li > *:first-child {
      +   .md\\\\:markdown > ul > li > *:first-child {

      ---

      -   .md\\\\:prose > ul > li > *:last-child {
      +   .md\\\\:markdown > ul > li > *:last-child {

      ---

      -   .md\\\\:prose > ol > li > *:first-child {
      +   .md\\\\:markdown > ol > li > *:first-child {

      ---

      -   .md\\\\:prose > ol > li > *:last-child {
      +   .md\\\\:markdown > ol > li > *:last-child {

      ---

      -   .md\\\\:prose ul ul, .md\\\\:prose ul ol, .md\\\\:prose ol ul, .md\\\\:prose ol ol {
      +   .md\\\\:markdown ul ul, .md\\\\:markdown ul ol, .md\\\\:markdown ol ul, .md\\\\:markdown ol ol {

      ---

      -   .md\\\\:prose hr + * {
      +   .md\\\\:markdown hr + * {

      ---

      -   .md\\\\:prose h2 + * {
      +   .md\\\\:markdown h2 + * {

      ---

      -   .md\\\\:prose h3 + * {
      +   .md\\\\:markdown h3 + * {

      ---

      -   .md\\\\:prose h4 + * {
      +   .md\\\\:markdown h4 + * {

      ---

      -   .md\\\\:prose thead th:first-child {
      +   .md\\\\:markdown thead th:first-child {

      ---

      -   .md\\\\:prose thead th:last-child {
      +   .md\\\\:markdown thead th:last-child {

      ---

      -   .md\\\\:prose tbody td:first-child {
      +   .md\\\\:markdown tbody td:first-child {

      ---

      -   .md\\\\:prose tbody td:last-child {
      +   .md\\\\:markdown tbody td:last-child {

      ---

      -   .md\\\\:prose > :first-child {
      +   .md\\\\:markdown > :first-child {

      ---

      -   .md\\\\:prose > :last-child {
      +   .md\\\\:markdown > :last-child {

      ---

      -   .md\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .md\\\\:prose-sm p {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm [class~='lead'] {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .md\\\\:prose-sm blockquote {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .md\\\\:prose-sm h1 {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .md\\\\:prose-sm h2 {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .md\\\\:prose-sm h3 {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .md\\\\:prose-sm h4 {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .md\\\\:prose-sm img {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .md\\\\:prose-sm video {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .md\\\\:prose-sm figure {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .md\\\\:prose-sm figure > * {
      -     margin-top: 0;
      -     margin-bottom: 0;
      -   }
      -
      -   .md\\\\:prose-sm figure figcaption {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .md\\\\:prose-sm code {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .md\\\\:prose-sm h2 code {
      -     font-size: 0.9em;
      -   }
      -
      -   .md\\\\:prose-sm h3 code {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .md\\\\:prose-sm pre {
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
      -   .md\\\\:prose-sm ol {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm ul {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm li {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .md\\\\:prose-sm ol > li {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm ol > li::before {
      -     left: 0;
      -   }
      -
      -   .md\\\\:prose-sm ul > li {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm ul > li::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .md\\\\:prose-sm > ul > li p {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm > ul > li > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm > ul > li > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm > ol > li > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm > ol > li > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .md\\\\:prose-sm ul ul, .md\\\\:prose-sm ul ol, .md\\\\:prose-sm ol ul, .md\\\\:prose-sm ol ol {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .md\\\\:prose-sm hr {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .md\\\\:prose-sm hr + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-sm h2 + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-sm h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-sm h4 + * {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-sm table {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .md\\\\:prose-sm thead th {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .md\\\\:prose-sm thead th:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose-sm thead th:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose-sm tbody td {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .md\\\\:prose-sm tbody td:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .md\\\\:prose-sm tbody td:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .md\\\\:prose-sm > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .md\\\\:prose-sm > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .md\\\\:prose-lg {
      +   .md\\\\:markdown-lg {

      ---

      -   .md\\\\:prose-lg p {
      +   .md\\\\:markdown-lg p {

      ---

      -   .md\\\\:prose-lg [class~='lead'] {
      +   .md\\\\:markdown-lg [class~='lead'] {

      ---

      -   .md\\\\:prose-lg blockquote {
      +   .md\\\\:markdown-lg blockquote {

      ---

      -   .md\\\\:prose-lg h1 {
      +   .md\\\\:markdown-lg h1 {

      ---

      -   .md\\\\:prose-lg h2 {
      +   .md\\\\:markdown-lg h2 {

      ---

      -   .md\\\\:prose-lg h3 {
      +   .md\\\\:markdown-lg h3 {

      ---

      -   .md\\\\:prose-lg h4 {
      +   .md\\\\:markdown-lg h4 {

      ---

      -   .md\\\\:prose-lg img {
      +   .md\\\\:markdown-lg img {

      ---

      -   .md\\\\:prose-lg video {
      +   .md\\\\:markdown-lg video {

      ---

      -   .md\\\\:prose-lg figure {
      +   .md\\\\:markdown-lg figure {

      ---

      -   .md\\\\:prose-lg figure > * {
      +   .md\\\\:markdown-lg figure > * {

      ---

      -   .md\\\\:prose-lg figure figcaption {
      +   .md\\\\:markdown-lg figure figcaption {

      ---

      -   .md\\\\:prose-lg code {
      +   .md\\\\:markdown-lg code {

      ---

      -   .md\\\\:prose-lg h2 code {
      +   .md\\\\:markdown-lg h2 code {

      ---

      -   .md\\\\:prose-lg h3 code {
      +   .md\\\\:markdown-lg h3 code {

      ---

      -   .md\\\\:prose-lg pre {
      +   .md\\\\:markdown-lg pre {

      ---

      -   .md\\\\:prose-lg ol {
      +   .md\\\\:markdown-lg ol {

      ---

      -   .md\\\\:prose-lg ul {
      +   .md\\\\:markdown-lg ul {

      ---

      -   .md\\\\:prose-lg li {
      +   .md\\\\:markdown-lg li {

      ---

      -   .md\\\\:prose-lg ol > li {
      +   .md\\\\:markdown-lg ol > li {

      ---

      -   .md\\\\:prose-lg ol > li::before {
      +   .md\\\\:markdown-lg ol > li::before {

      ---

      -   .md\\\\:prose-lg ul > li {
      +   .md\\\\:markdown-lg ul > li {

      ---

      -   .md\\\\:prose-lg ul > li::before {
      +   .md\\\\:markdown-lg ul > li::before {

      ---

      -   .md\\\\:prose-lg > ul > li p {
      +   .md\\\\:markdown-lg > ul > li p {

      ---

      -   .md\\\\:prose-lg > ul > li > *:first-child {
      +   .md\\\\:markdown-lg > ul > li > *:first-child {

      ---

      -   .md\\\\:prose-lg > ul > li > *:last-child {
      +   .md\\\\:markdown-lg > ul > li > *:last-child {

      ---

      -   .md\\\\:prose-lg > ol > li > *:first-child {
      +   .md\\\\:markdown-lg > ol > li > *:first-child {

      ---

      -   .md\\\\:prose-lg > ol > li > *:last-child {
      +   .md\\\\:markdown-lg > ol > li > *:last-child {

      ---

      -   .md\\\\:prose-lg ul ul, .md\\\\:prose-lg ul ol, .md\\\\:prose-lg ol ul, .md\\\\:prose-lg ol ol {
      +   .md\\\\:markdown-lg ul ul, .md\\\\:markdown-lg ul ol, .md\\\\:markdown-lg ol ul, .md\\\\:markdown-lg ol ol {

      ---

      -   .md\\\\:prose-lg hr {
      +   .md\\\\:markdown-lg hr {

      ---

      -   .md\\\\:prose-lg hr + * {
      +   .md\\\\:markdown-lg hr + * {

      ---

      -   .md\\\\:prose-lg h2 + * {
      +   .md\\\\:markdown-lg h2 + * {

      ---

      -   .md\\\\:prose-lg h3 + * {
      +   .md\\\\:markdown-lg h3 + * {

      ---

      -   .md\\\\:prose-lg h4 + * {
      +   .md\\\\:markdown-lg h4 + * {

      ---

      -   .md\\\\:prose-lg table {
      +   .md\\\\:markdown-lg table {

      ---

      -   .md\\\\:prose-lg thead th {
      +   .md\\\\:markdown-lg thead th {

      ---

      -   .md\\\\:prose-lg thead th:first-child {
      +   .md\\\\:markdown-lg thead th:first-child {

      ---

      -   .md\\\\:prose-lg thead th:last-child {
      +   .md\\\\:markdown-lg thead th:last-child {

      ---

      -   .md\\\\:prose-lg tbody td {
      +   .md\\\\:markdown-lg tbody td {

      ---

      -   .md\\\\:prose-lg tbody td:first-child {
      +   .md\\\\:markdown-lg tbody td:first-child {

      ---

      -   .md\\\\:prose-lg tbody td:last-child {
      +   .md\\\\:markdown-lg tbody td:last-child {

      ---

      -   .md\\\\:prose-lg > :first-child {
      +   .md\\\\:markdown-lg > :first-child {

      ---

      -   .md\\\\:prose-lg > :last-child {
      +   .md\\\\:markdown-lg > :last-child {

      ---

      -   .md\\\\:prose-xl {
      +   .md\\\\:markdown-xl {

      ---

      -   .md\\\\:prose-xl p {
      +   .md\\\\:markdown-xl p {

      ---

      -   .md\\\\:prose-xl [class~='lead'] {
      +   .md\\\\:markdown-xl [class~='lead'] {

      ---

      -   .md\\\\:prose-xl blockquote {
      +   .md\\\\:markdown-xl blockquote {

      ---

      -   .md\\\\:prose-xl h1 {
      +   .md\\\\:markdown-xl h1 {

      ---

      -   .md\\\\:prose-xl h2 {
      +   .md\\\\:markdown-xl h2 {

      ---

      -   .md\\\\:prose-xl h3 {
      +   .md\\\\:markdown-xl h3 {

      ---

      -   .md\\\\:prose-xl h4 {
      +   .md\\\\:markdown-xl h4 {

      ---

      -   .md\\\\:prose-xl img {
      +   .md\\\\:markdown-xl img {

      ---

      -   .md\\\\:prose-xl video {
      +   .md\\\\:markdown-xl video {

      ---

      -   .md\\\\:prose-xl figure {
      +   .md\\\\:markdown-xl figure {

      ---

      -   .md\\\\:prose-xl figure > * {
      +   .md\\\\:markdown-xl figure > * {

      ---

      -   .md\\\\:prose-xl figure figcaption {
      +   .md\\\\:markdown-xl figure figcaption {

      ---

      -   .md\\\\:prose-xl code {
      +   .md\\\\:markdown-xl code {

      ---

      -   .md\\\\:prose-xl h2 code {
      +   .md\\\\:markdown-xl h2 code {

      ---

      -   .md\\\\:prose-xl h3 code {
      +   .md\\\\:markdown-xl h3 code {

      ---

      -   .md\\\\:prose-xl pre {
      +   .md\\\\:markdown-xl pre {

      ---

      -   .md\\\\:prose-xl ol {
      +   .md\\\\:markdown-xl ol {

      ---

      -   .md\\\\:prose-xl ul {
      +   .md\\\\:markdown-xl ul {

      ---

      -   .md\\\\:prose-xl li {
      +   .md\\\\:markdown-xl li {

      ---

      -   .md\\\\:prose-xl ol > li {
      +   .md\\\\:markdown-xl ol > li {

      ---

      -   .md\\\\:prose-xl ol > li::before {
      +   .md\\\\:markdown-xl ol > li::before {

      ---

      -   .md\\\\:prose-xl ul > li {
      +   .md\\\\:markdown-xl ul > li {

      ---

      -   .md\\\\:prose-xl ul > li::before {
      +   .md\\\\:markdown-xl ul > li::before {

      ---

      -   .md\\\\:prose-xl > ul > li p {
      +   .md\\\\:markdown-xl > ul > li p {

      ---

      -   .md\\\\:prose-xl > ul > li > *:first-child {
      +   .md\\\\:markdown-xl > ul > li > *:first-child {

      ---

      -   .md\\\\:prose-xl > ul > li > *:last-child {
      +   .md\\\\:markdown-xl > ul > li > *:last-child {

      ---

      -   .md\\\\:prose-xl > ol > li > *:first-child {
      +   .md\\\\:markdown-xl > ol > li > *:first-child {

      ---

      -   .md\\\\:prose-xl > ol > li > *:last-child {
      +   .md\\\\:markdown-xl > ol > li > *:last-child {

      ---

      -   .md\\\\:prose-xl ul ul, .md\\\\:prose-xl ul ol, .md\\\\:prose-xl ol ul, .md\\\\:prose-xl ol ol {
      +   .md\\\\:markdown-xl ul ul, .md\\\\:markdown-xl ul ol, .md\\\\:markdown-xl ol ul, .md\\\\:markdown-xl ol ol {

      ---

      -   .md\\\\:prose-xl hr {
      +   .md\\\\:markdown-xl hr {

      ---

      -   .md\\\\:prose-xl hr + * {
      +   .md\\\\:markdown-xl hr + * {

      ---

      -   .md\\\\:prose-xl h2 + * {
      +   .md\\\\:markdown-xl h2 + * {

      ---

      -   .md\\\\:prose-xl h3 + * {
      +   .md\\\\:markdown-xl h3 + * {

      ---

      -   .md\\\\:prose-xl h4 + * {
      +   .md\\\\:markdown-xl h4 + * {

      ---

      -   .md\\\\:prose-xl table {
      +   .md\\\\:markdown-xl table {

      ---

      -   .md\\\\:prose-xl thead th {
      +   .md\\\\:markdown-xl thead th {

      ---

      -   .md\\\\:prose-xl thead th:first-child {
      +   .md\\\\:markdown-xl thead th:first-child {

      ---

      -   .md\\\\:prose-xl thead th:last-child {
      +   .md\\\\:markdown-xl thead th:last-child {

      ---

      -   .md\\\\:prose-xl tbody td {
      +   .md\\\\:markdown-xl tbody td {

      ---

      -   .md\\\\:prose-xl tbody td:first-child {
      +   .md\\\\:markdown-xl tbody td:first-child {

      ---

      -   .md\\\\:prose-xl tbody td:last-child {
      +   .md\\\\:markdown-xl tbody td:last-child {

      ---

      -   .md\\\\:prose-xl > :first-child {
      +   .md\\\\:markdown-xl > :first-child {

      ---

      -   .md\\\\:prose-xl > :last-child {
      +   .md\\\\:markdown-xl > :last-child {

      ---

      -   .md\\\\:prose-2xl {
      +   .md\\\\:markdown-2xl {

      ---

      -   .md\\\\:prose-2xl p {
      +   .md\\\\:markdown-2xl p {

      ---

      -   .md\\\\:prose-2xl [class~='lead'] {
      +   .md\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .md\\\\:prose-2xl blockquote {
      +   .md\\\\:markdown-2xl blockquote {

      ---

      -   .md\\\\:prose-2xl h1 {
      +   .md\\\\:markdown-2xl h1 {

      ---

      -   .md\\\\:prose-2xl h2 {
      +   .md\\\\:markdown-2xl h2 {

      ---

      -   .md\\\\:prose-2xl h3 {
      +   .md\\\\:markdown-2xl h3 {

      ---

      -   .md\\\\:prose-2xl h4 {
      +   .md\\\\:markdown-2xl h4 {

      ---

      -   .md\\\\:prose-2xl img {
      +   .md\\\\:markdown-2xl img {

      ---

      -   .md\\\\:prose-2xl video {
      +   .md\\\\:markdown-2xl video {

      ---

      -   .md\\\\:prose-2xl figure {
      +   .md\\\\:markdown-2xl figure {

      ---

      -   .md\\\\:prose-2xl figure > * {
      +   .md\\\\:markdown-2xl figure > * {

      ---

      -   .md\\\\:prose-2xl figure figcaption {
      +   .md\\\\:markdown-2xl figure figcaption {

      ---

      -   .md\\\\:prose-2xl code {
      +   .md\\\\:markdown-2xl code {

      ---

      -   .md\\\\:prose-2xl h2 code {
      +   .md\\\\:markdown-2xl h2 code {

      ---

      -   .md\\\\:prose-2xl h3 code {
      +   .md\\\\:markdown-2xl h3 code {

      ---

      -   .md\\\\:prose-2xl pre {
      +   .md\\\\:markdown-2xl pre {

      ---

      -   .md\\\\:prose-2xl ol {
      +   .md\\\\:markdown-2xl ol {

      ---

      -   .md\\\\:prose-2xl ul {
      +   .md\\\\:markdown-2xl ul {

      ---

      -   .md\\\\:prose-2xl li {
      +   .md\\\\:markdown-2xl li {

      ---

      -   .md\\\\:prose-2xl ol > li {
      +   .md\\\\:markdown-2xl ol > li {

      ---

      -   .md\\\\:prose-2xl ol > li::before {
      +   .md\\\\:markdown-2xl ol > li::before {

      ---

      -   .md\\\\:prose-2xl ul > li {
      +   .md\\\\:markdown-2xl ul > li {

      ---

      -   .md\\\\:prose-2xl ul > li::before {
      +   .md\\\\:markdown-2xl ul > li::before {

      ---

      -   .md\\\\:prose-2xl > ul > li p {
      +   .md\\\\:markdown-2xl > ul > li p {

      ---

      -   .md\\\\:prose-2xl > ul > li > *:first-child {
      +   .md\\\\:markdown-2xl > ul > li > *:first-child {

      ---

      -   .md\\\\:prose-2xl > ul > li > *:last-child {
      +   .md\\\\:markdown-2xl > ul > li > *:last-child {

      ---

      -   .md\\\\:prose-2xl > ol > li > *:first-child {
      +   .md\\\\:markdown-2xl > ol > li > *:first-child {

      ---

      -   .md\\\\:prose-2xl > ol > li > *:last-child {
      +   .md\\\\:markdown-2xl > ol > li > *:last-child {

      ---

      -   .md\\\\:prose-2xl ul ul, .md\\\\:prose-2xl ul ol, .md\\\\:prose-2xl ol ul, .md\\\\:prose-2xl ol ol {
      +   .md\\\\:markdown-2xl ul ul, .md\\\\:markdown-2xl ul ol, .md\\\\:markdown-2xl ol ul, .md\\\\:markdown-2xl ol ol {

      ---

      -   .md\\\\:prose-2xl hr {
      +   .md\\\\:markdown-2xl hr {

      ---

      -   .md\\\\:prose-2xl hr + * {
      +   .md\\\\:markdown-2xl hr + * {

      ---

      -   .md\\\\:prose-2xl h2 + * {
      +   .md\\\\:markdown-2xl h2 + * {

      ---

      -   .md\\\\:prose-2xl h3 + * {
      +   .md\\\\:markdown-2xl h3 + * {

      ---

      -   .md\\\\:prose-2xl h4 + * {
      +   .md\\\\:markdown-2xl h4 + * {

      ---

      -   .md\\\\:prose-2xl table {
      +   .md\\\\:markdown-2xl table {

      ---

      -   .md\\\\:prose-2xl thead th {
      +   .md\\\\:markdown-2xl thead th {

      ---

      -   .md\\\\:prose-2xl thead th:first-child {
      +   .md\\\\:markdown-2xl thead th:first-child {

      ---

      -   .md\\\\:prose-2xl thead th:last-child {
      +   .md\\\\:markdown-2xl thead th:last-child {

      ---

      -   .md\\\\:prose-2xl tbody td {
      +   .md\\\\:markdown-2xl tbody td {

      ---

      -   .md\\\\:prose-2xl tbody td:first-child {
      +   .md\\\\:markdown-2xl tbody td:first-child {

      ---

      -   .md\\\\:prose-2xl tbody td:last-child {
      +   .md\\\\:markdown-2xl tbody td:last-child {

      ---

      -   .md\\\\:prose-2xl > :first-child {
      +   .md\\\\:markdown-2xl > :first-child {

      ---

      -   .md\\\\:prose-2xl > :last-child {
      +   .md\\\\:markdown-2xl > :last-child {

      ---

      -   }
      -
      -   .md\\\\:prose-red a {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-red a code {
      -     color: #dc2626;
      -   }
      -
      -   .md\\\\:prose-yellow a {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-yellow a code {
      -     color: #d97706;
      -   }
      -
      -   .md\\\\:prose-green a {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-green a code {
      -     color: #059669;
      -   }
      -
      -   .md\\\\:prose-blue a {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-blue a code {
      -     color: #2563eb;
      -   }
      -
      -   .md\\\\:prose-indigo a {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-indigo a code {
      -     color: #4f46e5;
      -   }
      -
      -   .md\\\\:prose-purple a {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-purple a code {
      -     color: #7c3aed;
      -   }
      -
      -   .md\\\\:prose-pink a {
      -     color: #db2777;
      -   }
      -
      -   .md\\\\:prose-pink a code {
      -     color: #db2777;

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose [class~='lead'] {
      +   .lg\\\\:markdown [class~='lead'] {

      ---

      -   .lg\\\\:prose a {
      +   .lg\\\\:markdown a {

      ---

      -   .lg\\\\:prose strong {
      +   .lg\\\\:markdown strong {

      ---

      -   .lg\\\\:prose ol {
      +   .lg\\\\:markdown ol {

      ---

      -   .lg\\\\:prose ol > li {
      +   .lg\\\\:markdown ol > li {

      ---

      -   .lg\\\\:prose ol > li::before {
      +   .lg\\\\:markdown ol > li::before {

      ---

      -   .lg\\\\:prose ul > li {
      +   .lg\\\\:markdown ul > li {

      ---

      -   .lg\\\\:prose ul > li::before {
      +   .lg\\\\:markdown ul > li::before {

      ---

      -   .lg\\\\:prose hr {
      +   .lg\\\\:markdown hr {

      ---

      -   .lg\\\\:prose blockquote {
      +   .lg\\\\:markdown blockquote {

      ---

      -   .lg\\\\:prose blockquote p:first-of-type::before {
      +   .lg\\\\:markdown blockquote p:first-of-type::before {

      ---

      -   .lg\\\\:prose blockquote p:last-of-type::after {
      +   .lg\\\\:markdown blockquote p:last-of-type::after {

      ---

      -   .lg\\\\:prose h1 {
      +   .lg\\\\:markdown h1 {

      ---

      -   .lg\\\\:prose h2 {
      +   .lg\\\\:markdown h2 {

      ---

      -   .lg\\\\:prose h3 {
      +   .lg\\\\:markdown h3 {

      ---

      -   .lg\\\\:prose h4 {
      +   .lg\\\\:markdown h4 {

      ---

      -   .lg\\\\:prose figure figcaption {
      +   .lg\\\\:markdown figure figcaption {

      ---

      -   .lg\\\\:prose code {
      +   .lg\\\\:markdown code {

      ---

      -   .lg\\\\:prose code::before {
      +   .lg\\\\:markdown code::before {

      ---

      -   .lg\\\\:prose code::after {
      +   .lg\\\\:markdown code::after {

      ---

      -   .lg\\\\:prose a code {
      +   .lg\\\\:markdown a code {

      ---

      -   .lg\\\\:prose pre {
      +   .lg\\\\:markdown pre {

      ---

      -   .lg\\\\:prose pre code {
      +   .lg\\\\:markdown pre code {

      ---

      -   .lg\\\\:prose pre code::before {
      +   .lg\\\\:markdown pre code::before {

      ---

      -   .lg\\\\:prose pre code::after {
      +   .lg\\\\:markdown pre code::after {

      ---

      -   .lg\\\\:prose table {
      +   .lg\\\\:markdown table {

      ---

      -   .lg\\\\:prose thead {
      +   .lg\\\\:markdown thead {

      ---

      -   .lg\\\\:prose thead th {
      +   .lg\\\\:markdown thead th {

      ---

      -   .lg\\\\:prose tbody tr {
      +   .lg\\\\:markdown tbody tr {

      ---

      -   .lg\\\\:prose tbody tr:last-child {
      +   .lg\\\\:markdown tbody tr:last-child {

      ---

      -   .lg\\\\:prose tbody td {
      +   .lg\\\\:markdown tbody td {

      ---

      -   .lg\\\\:prose {
      +   .lg\\\\:markdown {

      ---

      -   .lg\\\\:prose p {
      +   .lg\\\\:markdown p {

      ---

      -   .lg\\\\:prose img {
      +   .lg\\\\:markdown img {

      ---

      -   .lg\\\\:prose video {
      +   .lg\\\\:markdown video {

      ---

      -   .lg\\\\:prose figure {
      +   .lg\\\\:markdown figure {

      ---

      -   .lg\\\\:prose figure > * {
      +   .lg\\\\:markdown figure > * {

      ---

      -   .lg\\\\:prose h2 code {
      +   .lg\\\\:markdown h2 code {

      ---

      -   .lg\\\\:prose h3 code {
      +   .lg\\\\:markdown h3 code {

      ---

      -   .lg\\\\:prose ul {
      +   .lg\\\\:markdown ul {

      ---

      -   .lg\\\\:prose li {
      +   .lg\\\\:markdown li {

      ---

      -   .lg\\\\:prose > ul > li p {
      +   .lg\\\\:markdown > ul > li p {

      ---

      -   .lg\\\\:prose > ul > li > *:first-child {
      +   .lg\\\\:markdown > ul > li > *:first-child {

      ---

      -   .lg\\\\:prose > ul > li > *:last-child {
      +   .lg\\\\:markdown > ul > li > *:last-child {

      ---

      -   .lg\\\\:prose > ol > li > *:first-child {
      +   .lg\\\\:markdown > ol > li > *:first-child {

      ---

      -   .lg\\\\:prose > ol > li > *:last-child {
      +   .lg\\\\:markdown > ol > li > *:last-child {

      ---

      -   .lg\\\\:prose ul ul, .lg\\\\:prose ul ol, .lg\\\\:prose ol ul, .lg\\\\:prose ol ol {
      +   .lg\\\\:markdown ul ul, .lg\\\\:markdown ul ol, .lg\\\\:markdown ol ul, .lg\\\\:markdown ol ol {

      ---

      -   .lg\\\\:prose hr + * {
      +   .lg\\\\:markdown hr + * {

      ---

      -   .lg\\\\:prose h2 + * {
      +   .lg\\\\:markdown h2 + * {

      ---

      -   .lg\\\\:prose h3 + * {
      +   .lg\\\\:markdown h3 + * {

      ---

      -   .lg\\\\:prose h4 + * {
      +   .lg\\\\:markdown h4 + * {

      ---

      -   .lg\\\\:prose thead th:first-child {
      +   .lg\\\\:markdown thead th:first-child {

      ---

      -   .lg\\\\:prose thead th:last-child {
      +   .lg\\\\:markdown thead th:last-child {

      ---

      -   .lg\\\\:prose tbody td:first-child {
      +   .lg\\\\:markdown tbody td:first-child {

      ---

      -   .lg\\\\:prose tbody td:last-child {
      +   .lg\\\\:markdown tbody td:last-child {

      ---

      -   }
      -
      -   .lg\\\\:prose > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose > :last-child {
      -     margin-bottom: 0;

      ---

      -   .lg\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .lg\\\\:prose-sm p {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm [class~='lead'] {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .lg\\\\:prose-sm blockquote {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .lg\\\\:prose-sm h1 {
      -     font-size: 2.1428571em;
      +   .lg\\\\:markdown > :first-child {

      ---

      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .lg\\\\:prose-sm h2 {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;

      ---

      -   .lg\\\\:prose-sm h3 {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .lg\\\\:prose-sm h4 {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .lg\\\\:prose-sm img {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .lg\\\\:prose-sm video {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .lg\\\\:prose-sm figure {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .lg\\\\:prose-sm figure > * {
      -     margin-top: 0;
      +   .lg\\\\:markdown > :last-child {

      ---

      -   .lg\\\\:prose-sm figure figcaption {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .lg\\\\:prose-sm code {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .lg\\\\:prose-sm h2 code {
      -     font-size: 0.9em;
      -   }
      -
      -   .lg\\\\:prose-sm h3 code {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .lg\\\\:prose-sm pre {
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
      -   .lg\\\\:prose-sm ol {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm ul {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm li {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .lg\\\\:prose-sm ol > li {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm ol > li::before {
      -     left: 0;
      -   }
      -
      -   .lg\\\\:prose-sm ul > li {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm ul > li::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .lg\\\\:prose-sm > ul > li p {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm > ul > li > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm > ul > li > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm > ol > li > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm > ol > li > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .lg\\\\:prose-sm ul ul, .lg\\\\:prose-sm ul ol, .lg\\\\:prose-sm ol ul, .lg\\\\:prose-sm ol ol {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .lg\\\\:prose-sm hr {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .lg\\\\:prose-sm hr + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-sm h2 + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-sm h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-sm h4 + * {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-sm table {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .lg\\\\:prose-sm thead th {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .lg\\\\:prose-sm thead th:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose-sm thead th:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose-sm tbody td {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .lg\\\\:prose-sm tbody td:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .lg\\\\:prose-sm tbody td:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .lg\\\\:prose-sm > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .lg\\\\:prose-sm > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .lg\\\\:prose-lg {
      +   .lg\\\\:markdown-lg {

      ---

      -   .lg\\\\:prose-lg p {
      +   .lg\\\\:markdown-lg p {

      ---

      -   .lg\\\\:prose-lg [class~='lead'] {
      +   .lg\\\\:markdown-lg [class~='lead'] {

      ---

      -   .lg\\\\:prose-lg blockquote {
      +   .lg\\\\:markdown-lg blockquote {

      ---

      -   .lg\\\\:prose-lg h1 {
      +   .lg\\\\:markdown-lg h1 {

      ---

      -   .lg\\\\:prose-lg h2 {
      +   .lg\\\\:markdown-lg h2 {

      ---

      -   .lg\\\\:prose-lg h3 {
      +   .lg\\\\:markdown-lg h3 {

      ---

      -   .lg\\\\:prose-lg h4 {
      +   .lg\\\\:markdown-lg h4 {

      ---

      -   .lg\\\\:prose-lg img {
      +   .lg\\\\:markdown-lg img {

      ---

      -   .lg\\\\:prose-lg video {
      +   .lg\\\\:markdown-lg video {

      ---

      -   .lg\\\\:prose-lg figure {
      +   .lg\\\\:markdown-lg figure {

      ---

      -   .lg\\\\:prose-lg figure > * {
      +   .lg\\\\:markdown-lg figure > * {

      ---

      -   .lg\\\\:prose-lg figure figcaption {
      +   .lg\\\\:markdown-lg figure figcaption {

      ---

      -   .lg\\\\:prose-lg code {
      +   .lg\\\\:markdown-lg code {

      ---

      -   .lg\\\\:prose-lg h2 code {
      +   .lg\\\\:markdown-lg h2 code {

      ---

      -   .lg\\\\:prose-lg h3 code {
      +   .lg\\\\:markdown-lg h3 code {

      ---

      -   .lg\\\\:prose-lg pre {
      +   .lg\\\\:markdown-lg pre {

      ---

      -   .lg\\\\:prose-lg ol {
      +   .lg\\\\:markdown-lg ol {

      ---

      -   .lg\\\\:prose-lg ul {
      +   .lg\\\\:markdown-lg ul {

      ---

      -   .lg\\\\:prose-lg li {
      +   .lg\\\\:markdown-lg li {

      ---

      -   .lg\\\\:prose-lg ol > li {
      +   .lg\\\\:markdown-lg ol > li {

      ---

      -   .lg\\\\:prose-lg ol > li::before {
      +   .lg\\\\:markdown-lg ol > li::before {

      ---

      -   .lg\\\\:prose-lg ul > li {
      +   .lg\\\\:markdown-lg ul > li {

      ---

      -   .lg\\\\:prose-lg ul > li::before {
      +   .lg\\\\:markdown-lg ul > li::before {

      ---

      -   .lg\\\\:prose-lg > ul > li p {
      +   .lg\\\\:markdown-lg > ul > li p {

      ---

      -   .lg\\\\:prose-lg > ul > li > *:first-child {
      +   .lg\\\\:markdown-lg > ul > li > *:first-child {

      ---

      -   .lg\\\\:prose-lg > ul > li > *:last-child {
      +   .lg\\\\:markdown-lg > ul > li > *:last-child {

      ---

      -   .lg\\\\:prose-lg > ol > li > *:first-child {
      +   .lg\\\\:markdown-lg > ol > li > *:first-child {

      ---

      -   .lg\\\\:prose-lg > ol > li > *:last-child {
      +   .lg\\\\:markdown-lg > ol > li > *:last-child {

      ---

      -   .lg\\\\:prose-lg ul ul, .lg\\\\:prose-lg ul ol, .lg\\\\:prose-lg ol ul, .lg\\\\:prose-lg ol ol {
      +   .lg\\\\:markdown-lg ul ul, .lg\\\\:markdown-lg ul ol, .lg\\\\:markdown-lg ol ul, .lg\\\\:markdown-lg ol ol {

      ---

      -   .lg\\\\:prose-lg hr {
      +   .lg\\\\:markdown-lg hr {

      ---

      -   .lg\\\\:prose-lg hr + * {
      +   .lg\\\\:markdown-lg hr + * {

      ---

      -   .lg\\\\:prose-lg h2 + * {
      +   .lg\\\\:markdown-lg h2 + * {

      ---

      -   .lg\\\\:prose-lg h3 + * {
      +   .lg\\\\:markdown-lg h3 + * {

      ---

      -   .lg\\\\:prose-lg h4 + * {
      +   .lg\\\\:markdown-lg h4 + * {

      ---

      -   .lg\\\\:prose-lg table {
      +   .lg\\\\:markdown-lg table {

      ---

      -   .lg\\\\:prose-lg thead th {
      +   .lg\\\\:markdown-lg thead th {

      ---

      -   .lg\\\\:prose-lg thead th:first-child {
      +   .lg\\\\:markdown-lg thead th:first-child {

      ---

      -   .lg\\\\:prose-lg thead th:last-child {
      +   .lg\\\\:markdown-lg thead th:last-child {

      ---

      -   .lg\\\\:prose-lg tbody td {
      +   .lg\\\\:markdown-lg tbody td {

      ---

      -   .lg\\\\:prose-lg tbody td:first-child {
      +   .lg\\\\:markdown-lg tbody td:first-child {

      ---

      -   .lg\\\\:prose-lg tbody td:last-child {
      +   .lg\\\\:markdown-lg tbody td:last-child {

      ---

      -   .lg\\\\:prose-lg > :first-child {
      +   .lg\\\\:markdown-lg > :first-child {

      ---

      -   .lg\\\\:prose-lg > :last-child {
      +   .lg\\\\:markdown-lg > :last-child {

      ---

      -   .lg\\\\:prose-xl {
      +   .lg\\\\:markdown-xl {

      ---

      -   .lg\\\\:prose-xl p {
      +   .lg\\\\:markdown-xl p {

      ---

      -   .lg\\\\:prose-xl [class~='lead'] {
      +   .lg\\\\:markdown-xl [class~='lead'] {

      ---

      -   .lg\\\\:prose-xl blockquote {
      +   .lg\\\\:markdown-xl blockquote {

      ---

      -   .lg\\\\:prose-xl h1 {
      +   .lg\\\\:markdown-xl h1 {

      ---

      -   .lg\\\\:prose-xl h2 {
      +   .lg\\\\:markdown-xl h2 {

      ---

      -   .lg\\\\:prose-xl h3 {
      +   .lg\\\\:markdown-xl h3 {

      ---

      -   .lg\\\\:prose-xl h4 {
      +   .lg\\\\:markdown-xl h4 {

      ---

      -   .lg\\\\:prose-xl img {
      +   .lg\\\\:markdown-xl img {

      ---

      -   .lg\\\\:prose-xl video {
      +   .lg\\\\:markdown-xl video {

      ---

      -   .lg\\\\:prose-xl figure {
      +   .lg\\\\:markdown-xl figure {

      ---

      -   .lg\\\\:prose-xl figure > * {
      +   .lg\\\\:markdown-xl figure > * {

      ---

      -   .lg\\\\:prose-xl figure figcaption {
      +   .lg\\\\:markdown-xl figure figcaption {

      ---

      -   .lg\\\\:prose-xl code {
      +   .lg\\\\:markdown-xl code {

      ---

      -   .lg\\\\:prose-xl h2 code {
      +   .lg\\\\:markdown-xl h2 code {

      ---

      -   .lg\\\\:prose-xl h3 code {
      +   .lg\\\\:markdown-xl h3 code {

      ---

      -   .lg\\\\:prose-xl pre {
      +   .lg\\\\:markdown-xl pre {

      ---

      -   .lg\\\\:prose-xl ol {
      +   .lg\\\\:markdown-xl ol {

      ---

      -   .lg\\\\:prose-xl ul {
      +   .lg\\\\:markdown-xl ul {

      ---

      -   .lg\\\\:prose-xl li {
      +   .lg\\\\:markdown-xl li {

      ---

      -   .lg\\\\:prose-xl ol > li {
      +   .lg\\\\:markdown-xl ol > li {

      ---

      -   .lg\\\\:prose-xl ol > li::before {
      +   .lg\\\\:markdown-xl ol > li::before {

      ---

      -   .lg\\\\:prose-xl ul > li {
      +   .lg\\\\:markdown-xl ul > li {

      ---

      -   .lg\\\\:prose-xl ul > li::before {
      +   .lg\\\\:markdown-xl ul > li::before {

      ---

      -   .lg\\\\:prose-xl > ul > li p {
      +   .lg\\\\:markdown-xl > ul > li p {

      ---

      -   .lg\\\\:prose-xl > ul > li > *:first-child {
      +   .lg\\\\:markdown-xl > ul > li > *:first-child {

      ---

      -   .lg\\\\:prose-xl > ul > li > *:last-child {
      +   .lg\\\\:markdown-xl > ul > li > *:last-child {

      ---

      -   .lg\\\\:prose-xl > ol > li > *:first-child {
      +   .lg\\\\:markdown-xl > ol > li > *:first-child {

      ---

      -   .lg\\\\:prose-xl > ol > li > *:last-child {
      +   .lg\\\\:markdown-xl > ol > li > *:last-child {

      ---

      -   .lg\\\\:prose-xl ul ul, .lg\\\\:prose-xl ul ol, .lg\\\\:prose-xl ol ul, .lg\\\\:prose-xl ol ol {
      +   .lg\\\\:markdown-xl ul ul, .lg\\\\:markdown-xl ul ol, .lg\\\\:markdown-xl ol ul, .lg\\\\:markdown-xl ol ol {

      ---

      -   .lg\\\\:prose-xl hr {
      +   .lg\\\\:markdown-xl hr {

      ---

      -   .lg\\\\:prose-xl hr + * {
      +   .lg\\\\:markdown-xl hr + * {

      ---

      -   .lg\\\\:prose-xl h2 + * {
      +   .lg\\\\:markdown-xl h2 + * {

      ---

      -   .lg\\\\:prose-xl h3 + * {
      +   .lg\\\\:markdown-xl h3 + * {

      ---

      -   .lg\\\\:prose-xl h4 + * {
      +   .lg\\\\:markdown-xl h4 + * {

      ---

      -   .lg\\\\:prose-xl table {
      +   .lg\\\\:markdown-xl table {

      ---

      -   .lg\\\\:prose-xl thead th {
      +   .lg\\\\:markdown-xl thead th {

      ---

      -   .lg\\\\:prose-xl thead th:first-child {
      +   .lg\\\\:markdown-xl thead th:first-child {

      ---

      -   .lg\\\\:prose-xl thead th:last-child {
      +   .lg\\\\:markdown-xl thead th:last-child {

      ---

      -   .lg\\\\:prose-xl tbody td {
      +   .lg\\\\:markdown-xl tbody td {

      ---

      -   .lg\\\\:prose-xl tbody td:first-child {
      +   .lg\\\\:markdown-xl tbody td:first-child {

      ---

      -   .lg\\\\:prose-xl tbody td:last-child {
      +   .lg\\\\:markdown-xl tbody td:last-child {

      ---

      -   .lg\\\\:prose-xl > :first-child {
      +   .lg\\\\:markdown-xl > :first-child {

      ---

      -   .lg\\\\:prose-xl > :last-child {
      +   .lg\\\\:markdown-xl > :last-child {

      ---

      -   .lg\\\\:prose-2xl {
      +   .lg\\\\:markdown-2xl {

      ---

      -   .lg\\\\:prose-2xl p {
      +   .lg\\\\:markdown-2xl p {

      ---

      -   .lg\\\\:prose-2xl [class~='lead'] {
      +   .lg\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .lg\\\\:prose-2xl blockquote {
      +   .lg\\\\:markdown-2xl blockquote {

      ---

      -   .lg\\\\:prose-2xl h1 {
      +   .lg\\\\:markdown-2xl h1 {

      ---

      -   .lg\\\\:prose-2xl h2 {
      +   .lg\\\\:markdown-2xl h2 {

      ---

      -   .lg\\\\:prose-2xl h3 {
      +   .lg\\\\:markdown-2xl h3 {

      ---

      -   .lg\\\\:prose-2xl h4 {
      +   .lg\\\\:markdown-2xl h4 {

      ---

      -   .lg\\\\:prose-2xl img {
      +   .lg\\\\:markdown-2xl img {

      ---

      -   .lg\\\\:prose-2xl video {
      +   .lg\\\\:markdown-2xl video {

      ---

      -   .lg\\\\:prose-2xl figure {
      +   .lg\\\\:markdown-2xl figure {

      ---

      -   .lg\\\\:prose-2xl figure > * {
      +   .lg\\\\:markdown-2xl figure > * {

      ---

      -   .lg\\\\:prose-2xl figure figcaption {
      +   .lg\\\\:markdown-2xl figure figcaption {

      ---

      -   .lg\\\\:prose-2xl code {
      +   .lg\\\\:markdown-2xl code {

      ---

      -   .lg\\\\:prose-2xl h2 code {
      +   .lg\\\\:markdown-2xl h2 code {

      ---

      -   .lg\\\\:prose-2xl h3 code {
      +   .lg\\\\:markdown-2xl h3 code {

      ---

      -   .lg\\\\:prose-2xl pre {
      +   .lg\\\\:markdown-2xl pre {

      ---

      -   .lg\\\\:prose-2xl ol {
      +   .lg\\\\:markdown-2xl ol {

      ---

      -   .lg\\\\:prose-2xl ul {
      +   .lg\\\\:markdown-2xl ul {

      ---

      -   .lg\\\\:prose-2xl li {
      +   .lg\\\\:markdown-2xl li {

      ---

      -   .lg\\\\:prose-2xl ol > li {
      +   .lg\\\\:markdown-2xl ol > li {

      ---

      -   .lg\\\\:prose-2xl ol > li::before {
      +   .lg\\\\:markdown-2xl ol > li::before {

      ---

      -   .lg\\\\:prose-2xl ul > li {
      +   .lg\\\\:markdown-2xl ul > li {

      ---

      -   .lg\\\\:prose-2xl ul > li::before {
      +   .lg\\\\:markdown-2xl ul > li::before {

      ---

      -   .lg\\\\:prose-2xl > ul > li p {
      +   .lg\\\\:markdown-2xl > ul > li p {

      ---

      -   .lg\\\\:prose-2xl > ul > li > *:first-child {
      +   .lg\\\\:markdown-2xl > ul > li > *:first-child {

      ---

      -   .lg\\\\:prose-2xl > ul > li > *:last-child {
      +   .lg\\\\:markdown-2xl > ul > li > *:last-child {

      ---

      -   .lg\\\\:prose-2xl > ol > li > *:first-child {
      +   .lg\\\\:markdown-2xl > ol > li > *:first-child {

      ---

      -   .lg\\\\:prose-2xl > ol > li > *:last-child {
      +   .lg\\\\:markdown-2xl > ol > li > *:last-child {

      ---

      -   .lg\\\\:prose-2xl ul ul, .lg\\\\:prose-2xl ul ol, .lg\\\\:prose-2xl ol ul, .lg\\\\:prose-2xl ol ol {
      +   .lg\\\\:markdown-2xl ul ul, .lg\\\\:markdown-2xl ul ol, .lg\\\\:markdown-2xl ol ul, .lg\\\\:markdown-2xl ol ol {

      ---

      -   .lg\\\\:prose-2xl hr {
      +   .lg\\\\:markdown-2xl hr {

      ---

      -   .lg\\\\:prose-2xl hr + * {
      +   .lg\\\\:markdown-2xl hr + * {

      ---

      -   .lg\\\\:prose-2xl h2 + * {
      +   .lg\\\\:markdown-2xl h2 + * {

      ---

      -   .lg\\\\:prose-2xl h3 + * {
      +   .lg\\\\:markdown-2xl h3 + * {

      ---

      -   .lg\\\\:prose-2xl h4 + * {
      +   .lg\\\\:markdown-2xl h4 + * {

      ---

      -   .lg\\\\:prose-2xl table {
      +   .lg\\\\:markdown-2xl table {

      ---

      -   .lg\\\\:prose-2xl thead th {
      +   .lg\\\\:markdown-2xl thead th {

      ---

      -   .lg\\\\:prose-2xl thead th:first-child {
      +   .lg\\\\:markdown-2xl thead th:first-child {

      ---

      -   .lg\\\\:prose-2xl thead th:last-child {
      +   .lg\\\\:markdown-2xl thead th:last-child {

      ---

      -   .lg\\\\:prose-2xl tbody td {
      +   .lg\\\\:markdown-2xl tbody td {

      ---

      -   .lg\\\\:prose-2xl tbody td:first-child {
      +   .lg\\\\:markdown-2xl tbody td:first-child {

      ---

      -   .lg\\\\:prose-2xl tbody td:last-child {
      +   .lg\\\\:markdown-2xl tbody td:last-child {

      ---

      -   .lg\\\\:prose-2xl > :first-child {
      +   .lg\\\\:markdown-2xl > :first-child {

      ---

      -   .lg\\\\:prose-2xl > :last-child {
      +   .lg\\\\:markdown-2xl > :last-child {

      ---

      -   }
      -
      -   .lg\\\\:prose-red a {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-red a code {
      -     color: #dc2626;
      -   }
      -
      -   .lg\\\\:prose-yellow a {
      -     color: #d97706;
      -   }
      -
      -   .lg\\\\:prose-yellow a code {
      -     color: #d97706;
      -   }
      -
      -   .lg\\\\:prose-green a {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-green a code {
      -     color: #059669;
      -   }
      -
      -   .lg\\\\:prose-blue a {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-blue a code {
      -     color: #2563eb;
      -   }
      -
      -   .lg\\\\:prose-indigo a {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-indigo a code {
      -     color: #4f46e5;
      -   }
      -
      -   .lg\\\\:prose-purple a {
      -     color: #7c3aed;

      ---

      -
      -   .lg\\\\:prose-purple a code {
      -     color: #7c3aed;
      -   }
      -
      -   .lg\\\\:prose-pink a {
      -     color: #db2777;
      -   }
      -
      -   .lg\\\\:prose-pink a code {
      -     color: #db2777;
      -   }

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose [class~='lead'] {
      +   .xl\\\\:markdown [class~='lead'] {

      ---

      -   .xl\\\\:prose a {
      +   .xl\\\\:markdown a {

      ---

      -   .xl\\\\:prose strong {
      +   .xl\\\\:markdown strong {

      ---

      -   .xl\\\\:prose ol {
      +   .xl\\\\:markdown ol {

      ---

      -   .xl\\\\:prose ol > li {
      +   .xl\\\\:markdown ol > li {

      ---

      -   .xl\\\\:prose ol > li::before {
      +   .xl\\\\:markdown ol > li::before {

      ---

      -   .xl\\\\:prose ul > li {
      +   .xl\\\\:markdown ul > li {

      ---

      -   .xl\\\\:prose ul > li::before {
      +   .xl\\\\:markdown ul > li::before {

      ---

      -   .xl\\\\:prose hr {
      +   .xl\\\\:markdown hr {

      ---

      -   .xl\\\\:prose blockquote {
      +   .xl\\\\:markdown blockquote {

      ---

      -   .xl\\\\:prose blockquote p:first-of-type::before {
      +   .xl\\\\:markdown blockquote p:first-of-type::before {

      ---

      -   .xl\\\\:prose blockquote p:last-of-type::after {
      +   .xl\\\\:markdown blockquote p:last-of-type::after {

      ---

      -   .xl\\\\:prose h1 {
      +   .xl\\\\:markdown h1 {

      ---

      -   .xl\\\\:prose h2 {
      +   .xl\\\\:markdown h2 {

      ---

      -   .xl\\\\:prose h3 {
      +   .xl\\\\:markdown h3 {

      ---

      -   .xl\\\\:prose h4 {
      +   .xl\\\\:markdown h4 {

      ---

      -   .xl\\\\:prose figure figcaption {
      +   .xl\\\\:markdown figure figcaption {

      ---

      -   .xl\\\\:prose code {
      +   .xl\\\\:markdown code {

      ---

      -   .xl\\\\:prose code::before {
      +   .xl\\\\:markdown code::before {

      ---

      -   .xl\\\\:prose code::after {
      +   .xl\\\\:markdown code::after {

      ---

      -   .xl\\\\:prose a code {
      +   .xl\\\\:markdown a code {

      ---

      -   .xl\\\\:prose pre {
      +   .xl\\\\:markdown pre {

      ---

      -   .xl\\\\:prose pre code {
      +   .xl\\\\:markdown pre code {

      ---

      -   .xl\\\\:prose pre code::before {
      +   .xl\\\\:markdown pre code::before {

      ---

      -   .xl\\\\:prose pre code::after {
      +   .xl\\\\:markdown pre code::after {

      ---

      -   .xl\\\\:prose table {
      +   .xl\\\\:markdown table {

      ---

      -   .xl\\\\:prose thead {
      +   .xl\\\\:markdown thead {

      ---

      -   .xl\\\\:prose thead th {
      +   .xl\\\\:markdown thead th {

      ---

      -   .xl\\\\:prose tbody tr {
      +   .xl\\\\:markdown tbody tr {

      ---

      -   .xl\\\\:prose tbody tr:last-child {
      +   .xl\\\\:markdown tbody tr:last-child {

      ---

      -   .xl\\\\:prose tbody td {
      +   .xl\\\\:markdown tbody td {

      ---

      -   .xl\\\\:prose {
      +   .xl\\\\:markdown {

      ---

      -   .xl\\\\:prose p {
      +   .xl\\\\:markdown p {

      ---

      -   .xl\\\\:prose img {
      +   .xl\\\\:markdown img {

      ---

      -   .xl\\\\:prose video {
      +   .xl\\\\:markdown video {

      ---

      -   .xl\\\\:prose figure {
      +   .xl\\\\:markdown figure {

      ---

      -   .xl\\\\:prose figure > * {
      +   .xl\\\\:markdown figure > * {

      ---

      -   .xl\\\\:prose h2 code {
      +   .xl\\\\:markdown h2 code {

      ---

      -   .xl\\\\:prose h3 code {
      +   .xl\\\\:markdown h3 code {

      ---

      -   .xl\\\\:prose ul {
      +   .xl\\\\:markdown ul {

      ---

      -   .xl\\\\:prose li {
      +   .xl\\\\:markdown li {

      ---

      -   .xl\\\\:prose > ul > li p {
      +   .xl\\\\:markdown > ul > li p {

      ---

      -   .xl\\\\:prose > ul > li > *:first-child {
      +   .xl\\\\:markdown > ul > li > *:first-child {

      ---

      -   .xl\\\\:prose > ul > li > *:last-child {
      +   .xl\\\\:markdown > ul > li > *:last-child {

      ---

      -   .xl\\\\:prose > ol > li > *:first-child {
      +   .xl\\\\:markdown > ol > li > *:first-child {

      ---

      -   .xl\\\\:prose > ol > li > *:last-child {
      +   .xl\\\\:markdown > ol > li > *:last-child {

      ---

      -   .xl\\\\:prose ul ul, .xl\\\\:prose ul ol, .xl\\\\:prose ol ul, .xl\\\\:prose ol ol {
      +   .xl\\\\:markdown ul ul, .xl\\\\:markdown ul ol, .xl\\\\:markdown ol ul, .xl\\\\:markdown ol ol {

      ---

      -   .xl\\\\:prose hr + * {
      +   .xl\\\\:markdown hr + * {

      ---

      -   .xl\\\\:prose h2 + * {
      +   .xl\\\\:markdown h2 + * {

      ---

      -   .xl\\\\:prose h3 + * {
      +   .xl\\\\:markdown h3 + * {

      ---

      -   .xl\\\\:prose h4 + * {
      +   .xl\\\\:markdown h4 + * {

      ---

      -   .xl\\\\:prose thead th:first-child {
      +   .xl\\\\:markdown thead th:first-child {

      ---

      -   .xl\\\\:prose thead th:last-child {
      +   .xl\\\\:markdown thead th:last-child {

      ---

      -   .xl\\\\:prose tbody td:first-child {
      +   .xl\\\\:markdown tbody td:first-child {

      ---

      -   .xl\\\\:prose tbody td:last-child {
      +   .xl\\\\:markdown tbody td:last-child {

      ---

      -   .xl\\\\:prose > :first-child {
      +   .xl\\\\:markdown > :first-child {

      ---

      -   .xl\\\\:prose > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .xl\\\\:prose-sm p {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm [class~='lead'] {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .xl\\\\:prose-sm blockquote {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .xl\\\\:prose-sm h1 {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .xl\\\\:prose-sm h2 {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .xl\\\\:prose-sm h3 {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .xl\\\\:prose-sm h4 {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .xl\\\\:prose-sm img {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .xl\\\\:prose-sm video {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .xl\\\\:prose-sm figure {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .xl\\\\:prose-sm figure > * {
      -     margin-top: 0;
      +   .xl\\\\:markdown > :last-child {

      ---

      -   .xl\\\\:prose-sm figure figcaption {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .xl\\\\:prose-sm code {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .xl\\\\:prose-sm h2 code {
      -     font-size: 0.9em;
      -   }
      -
      -   .xl\\\\:prose-sm h3 code {
      -     font-size: 0.8888889em;
      -   }
      -
      -   .xl\\\\:prose-sm pre {
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
      -   .xl\\\\:prose-sm ol {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm ul {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm li {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .xl\\\\:prose-sm ol > li {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm ol > li::before {
      -     left: 0;
      -   }
      -
      -   .xl\\\\:prose-sm ul > li {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm ul > li::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .xl\\\\:prose-sm > ul > li p {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm > ul > li > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm > ul > li > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm > ol > li > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm > ol > li > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .xl\\\\:prose-sm ul ul, .xl\\\\:prose-sm ul ol, .xl\\\\:prose-sm ol ul, .xl\\\\:prose-sm ol ol {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .xl\\\\:prose-sm hr {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .xl\\\\:prose-sm hr + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm h2 + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm h4 + * {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm table {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .xl\\\\:prose-sm thead th {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .xl\\\\:prose-sm thead th:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-sm thead th:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-sm tbody td {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .xl\\\\:prose-sm tbody td:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .xl\\\\:prose-sm tbody td:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .xl\\\\:prose-sm > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .xl\\\\:prose-sm > :last-child {
      -     margin-bottom: 0;
      -   }
      -
      -   .xl\\\\:prose-lg {
      +   .xl\\\\:markdown-lg {

      ---

      -   .xl\\\\:prose-lg p {
      +   .xl\\\\:markdown-lg p {

      ---

      -   .xl\\\\:prose-lg [class~='lead'] {
      +   .xl\\\\:markdown-lg [class~='lead'] {

      ---

      -   .xl\\\\:prose-lg blockquote {
      +   .xl\\\\:markdown-lg blockquote {

      ---

      -   .xl\\\\:prose-lg h1 {
      +   .xl\\\\:markdown-lg h1 {

      ---

      -   .xl\\\\:prose-lg h2 {
      +   .xl\\\\:markdown-lg h2 {

      ---

      -   .xl\\\\:prose-lg h3 {
      +   .xl\\\\:markdown-lg h3 {

      ---

      -   .xl\\\\:prose-lg h4 {
      +   .xl\\\\:markdown-lg h4 {

      ---

      -   .xl\\\\:prose-lg img {
      +   .xl\\\\:markdown-lg img {

      ---

      -   .xl\\\\:prose-lg video {
      +   .xl\\\\:markdown-lg video {

      ---

      -   .xl\\\\:prose-lg figure {
      +   .xl\\\\:markdown-lg figure {

      ---

      -   .xl\\\\:prose-lg figure > * {
      +   .xl\\\\:markdown-lg figure > * {

      ---

      -   .xl\\\\:prose-lg figure figcaption {
      +   .xl\\\\:markdown-lg figure figcaption {

      ---

      -   .xl\\\\:prose-lg code {
      +   .xl\\\\:markdown-lg code {

      ---

      -   .xl\\\\:prose-lg h2 code {
      +   .xl\\\\:markdown-lg h2 code {

      ---

      -   .xl\\\\:prose-lg h3 code {
      +   .xl\\\\:markdown-lg h3 code {

      ---

      -   .xl\\\\:prose-lg pre {
      +   .xl\\\\:markdown-lg pre {

      ---

      -   .xl\\\\:prose-lg ol {
      +   .xl\\\\:markdown-lg ol {

      ---

      -   .xl\\\\:prose-lg ul {
      +   .xl\\\\:markdown-lg ul {

      ---

      -   .xl\\\\:prose-lg li {
      +   .xl\\\\:markdown-lg li {

      ---

      -   .xl\\\\:prose-lg ol > li {
      +   .xl\\\\:markdown-lg ol > li {

      ---

      -   .xl\\\\:prose-lg ol > li::before {
      +   .xl\\\\:markdown-lg ol > li::before {

      ---

      -   .xl\\\\:prose-lg ul > li {
      +   .xl\\\\:markdown-lg ul > li {

      ---

      -   .xl\\\\:prose-lg ul > li::before {
      +   .xl\\\\:markdown-lg ul > li::before {

      ---

      -   .xl\\\\:prose-lg > ul > li p {
      +   .xl\\\\:markdown-lg > ul > li p {

      ---

      -   .xl\\\\:prose-lg > ul > li > *:first-child {
      +   .xl\\\\:markdown-lg > ul > li > *:first-child {

      ---

      -   .xl\\\\:prose-lg > ul > li > *:last-child {
      +   .xl\\\\:markdown-lg > ul > li > *:last-child {

      ---

      -   .xl\\\\:prose-lg > ol > li > *:first-child {
      +   .xl\\\\:markdown-lg > ol > li > *:first-child {

      ---

      -   .xl\\\\:prose-lg > ol > li > *:last-child {
      +   .xl\\\\:markdown-lg > ol > li > *:last-child {

      ---

      -   .xl\\\\:prose-lg ul ul, .xl\\\\:prose-lg ul ol, .xl\\\\:prose-lg ol ul, .xl\\\\:prose-lg ol ol {
      +   .xl\\\\:markdown-lg ul ul, .xl\\\\:markdown-lg ul ol, .xl\\\\:markdown-lg ol ul, .xl\\\\:markdown-lg ol ol {

      ---

      -   .xl\\\\:prose-lg hr {
      +   .xl\\\\:markdown-lg hr {

      ---

      -   .xl\\\\:prose-lg hr + * {
      +   .xl\\\\:markdown-lg hr + * {

      ---

      -   .xl\\\\:prose-lg h2 + * {
      +   .xl\\\\:markdown-lg h2 + * {

      ---

      -   .xl\\\\:prose-lg h3 + * {
      +   .xl\\\\:markdown-lg h3 + * {

      ---

      -   .xl\\\\:prose-lg h4 + * {
      +   .xl\\\\:markdown-lg h4 + * {

      ---

      -   .xl\\\\:prose-lg table {
      +   .xl\\\\:markdown-lg table {

      ---

      -   .xl\\\\:prose-lg thead th {
      +   .xl\\\\:markdown-lg thead th {

      ---

      -   .xl\\\\:prose-lg thead th:first-child {
      +   .xl\\\\:markdown-lg thead th:first-child {

      ---

      -   .xl\\\\:prose-lg thead th:last-child {
      +   .xl\\\\:markdown-lg thead th:last-child {

      ---

      -   .xl\\\\:prose-lg tbody td {
      +   .xl\\\\:markdown-lg tbody td {

      ---

      -   .xl\\\\:prose-lg tbody td:first-child {
      +   .xl\\\\:markdown-lg tbody td:first-child {

      ---

      -   .xl\\\\:prose-lg tbody td:last-child {
      +   .xl\\\\:markdown-lg tbody td:last-child {

      ---

      -   .xl\\\\:prose-lg > :first-child {
      +   .xl\\\\:markdown-lg > :first-child {

      ---

      -   .xl\\\\:prose-lg > :last-child {
      +   .xl\\\\:markdown-lg > :last-child {

      ---

      -   .xl\\\\:prose-xl {
      +   .xl\\\\:markdown-xl {

      ---

      -   .xl\\\\:prose-xl p {
      +   .xl\\\\:markdown-xl p {

      ---

      -   .xl\\\\:prose-xl [class~='lead'] {
      +   .xl\\\\:markdown-xl [class~='lead'] {

      ---

      -   .xl\\\\:prose-xl blockquote {
      +   .xl\\\\:markdown-xl blockquote {

      ---

      -   .xl\\\\:prose-xl h1 {
      +   .xl\\\\:markdown-xl h1 {

      ---

      -   .xl\\\\:prose-xl h2 {
      +   .xl\\\\:markdown-xl h2 {

      ---

      -   .xl\\\\:prose-xl h3 {
      +   .xl\\\\:markdown-xl h3 {

      ---

      -   .xl\\\\:prose-xl h4 {
      +   .xl\\\\:markdown-xl h4 {

      ---

      -   .xl\\\\:prose-xl img {
      +   .xl\\\\:markdown-xl img {

      ---

      -   .xl\\\\:prose-xl video {
      +   .xl\\\\:markdown-xl video {

      ---

      -   .xl\\\\:prose-xl figure {
      +   .xl\\\\:markdown-xl figure {

      ---

      -   .xl\\\\:prose-xl figure > * {
      +   .xl\\\\:markdown-xl figure > * {

      ---

      -   .xl\\\\:prose-xl figure figcaption {
      +   .xl\\\\:markdown-xl figure figcaption {

      ---

      -   .xl\\\\:prose-xl code {
      +   .xl\\\\:markdown-xl code {

      ---

      -   .xl\\\\:prose-xl h2 code {
      +   .xl\\\\:markdown-xl h2 code {

      ---

      -   .xl\\\\:prose-xl h3 code {
      +   .xl\\\\:markdown-xl h3 code {

      ---

      -   .xl\\\\:prose-xl pre {
      +   .xl\\\\:markdown-xl pre {

      ---

      -   .xl\\\\:prose-xl ol {
      +   .xl\\\\:markdown-xl ol {

      ---

      -   .xl\\\\:prose-xl ul {
      +   .xl\\\\:markdown-xl ul {

      ---

      -   .xl\\\\:prose-xl li {
      +   .xl\\\\:markdown-xl li {

      ---

      -   .xl\\\\:prose-xl ol > li {
      +   .xl\\\\:markdown-xl ol > li {

      ---

      -   .xl\\\\:prose-xl ol > li::before {
      +   .xl\\\\:markdown-xl ol > li::before {

      ---

      -   .xl\\\\:prose-xl ul > li {
      +   .xl\\\\:markdown-xl ul > li {

      ---

      -   .xl\\\\:prose-xl ul > li::before {
      +   .xl\\\\:markdown-xl ul > li::before {

      ---

      -   .xl\\\\:prose-xl > ul > li p {
      +   .xl\\\\:markdown-xl > ul > li p {

      ---

      -   .xl\\\\:prose-xl > ul > li > *:first-child {
      +   .xl\\\\:markdown-xl > ul > li > *:first-child {

      ---

      -   .xl\\\\:prose-xl > ul > li > *:last-child {
      +   .xl\\\\:markdown-xl > ul > li > *:last-child {

      ---

      -   .xl\\\\:prose-xl > ol > li > *:first-child {
      +   .xl\\\\:markdown-xl > ol > li > *:first-child {

      ---

      -   .xl\\\\:prose-xl > ol > li > *:last-child {
      +   .xl\\\\:markdown-xl > ol > li > *:last-child {

      ---

      -   .xl\\\\:prose-xl ul ul, .xl\\\\:prose-xl ul ol, .xl\\\\:prose-xl ol ul, .xl\\\\:prose-xl ol ol {
      +   .xl\\\\:markdown-xl ul ul, .xl\\\\:markdown-xl ul ol, .xl\\\\:markdown-xl ol ul, .xl\\\\:markdown-xl ol ol {

      ---

      -   .xl\\\\:prose-xl hr {
      +   .xl\\\\:markdown-xl hr {

      ---

      -   .xl\\\\:prose-xl hr + * {
      +   .xl\\\\:markdown-xl hr + * {

      ---

      -   .xl\\\\:prose-xl h2 + * {
      +   .xl\\\\:markdown-xl h2 + * {

      ---

      -   .xl\\\\:prose-xl h3 + * {
      +   .xl\\\\:markdown-xl h3 + * {

      ---

      -   .xl\\\\:prose-xl h4 + * {
      +   .xl\\\\:markdown-xl h4 + * {

      ---

      -   .xl\\\\:prose-xl table {
      +   .xl\\\\:markdown-xl table {

      ---

      -   .xl\\\\:prose-xl thead th {
      +   .xl\\\\:markdown-xl thead th {

      ---

      -   .xl\\\\:prose-xl thead th:first-child {
      +   .xl\\\\:markdown-xl thead th:first-child {

      ---

      -   .xl\\\\:prose-xl thead th:last-child {
      +   .xl\\\\:markdown-xl thead th:last-child {

      ---

      -   .xl\\\\:prose-xl tbody td {
      +   .xl\\\\:markdown-xl tbody td {

      ---

      -   .xl\\\\:prose-xl tbody td:first-child {
      +   .xl\\\\:markdown-xl tbody td:first-child {

      ---

      -   .xl\\\\:prose-xl tbody td:last-child {
      +   .xl\\\\:markdown-xl tbody td:last-child {

      ---

      -   .xl\\\\:prose-xl > :first-child {
      +   .xl\\\\:markdown-xl > :first-child {

      ---

      -   .xl\\\\:prose-xl > :last-child {
      +   .xl\\\\:markdown-xl > :last-child {

      ---

      -   .xl\\\\:prose-2xl {
      +   .xl\\\\:markdown-2xl {

      ---

      -   .xl\\\\:prose-2xl p {
      +   .xl\\\\:markdown-2xl p {

      ---

      -   .xl\\\\:prose-2xl [class~='lead'] {
      +   .xl\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .xl\\\\:prose-2xl blockquote {
      +   .xl\\\\:markdown-2xl blockquote {

      ---

      -   .xl\\\\:prose-2xl h1 {
      +   .xl\\\\:markdown-2xl h1 {

      ---

      -   .xl\\\\:prose-2xl h2 {
      +   .xl\\\\:markdown-2xl h2 {

      ---

      -   .xl\\\\:prose-2xl h3 {
      +   .xl\\\\:markdown-2xl h3 {

      ---

      -   .xl\\\\:prose-2xl h4 {
      +   .xl\\\\:markdown-2xl h4 {

      ---

      -   .xl\\\\:prose-2xl img {
      +   .xl\\\\:markdown-2xl img {

      ---

      -   .xl\\\\:prose-2xl video {
      +   .xl\\\\:markdown-2xl video {

      ---

      -   .xl\\\\:prose-2xl figure {
      +   .xl\\\\:markdown-2xl figure {

      ---

      -   .xl\\\\:prose-2xl figure > * {
      +   .xl\\\\:markdown-2xl figure > * {

      ---

      -   .xl\\\\:prose-2xl figure figcaption {
      +   .xl\\\\:markdown-2xl figure figcaption {

      ---

      -   .xl\\\\:prose-2xl code {
      +   .xl\\\\:markdown-2xl code {

      ---

      -   .xl\\\\:prose-2xl h2 code {
      +   .xl\\\\:markdown-2xl h2 code {

      ---

      -   .xl\\\\:prose-2xl h3 code {
      +   .xl\\\\:markdown-2xl h3 code {

      ---

      -   .xl\\\\:prose-2xl pre {
      +   .xl\\\\:markdown-2xl pre {

      ---

      -   .xl\\\\:prose-2xl ol {
      +   .xl\\\\:markdown-2xl ol {

      ---

      -   .xl\\\\:prose-2xl ul {
      +   .xl\\\\:markdown-2xl ul {

      ---

      -   .xl\\\\:prose-2xl li {
      +   .xl\\\\:markdown-2xl li {

      ---

      -   .xl\\\\:prose-2xl ol > li {
      +   .xl\\\\:markdown-2xl ol > li {

      ---

      -   .xl\\\\:prose-2xl ol > li::before {
      +   .xl\\\\:markdown-2xl ol > li::before {

      ---

      -   .xl\\\\:prose-2xl ul > li {
      +   .xl\\\\:markdown-2xl ul > li {

      ---

      -   .xl\\\\:prose-2xl ul > li::before {
      +   .xl\\\\:markdown-2xl ul > li::before {

      ---

      -   .xl\\\\:prose-2xl > ul > li p {
      +   .xl\\\\:markdown-2xl > ul > li p {

      ---

      -   .xl\\\\:prose-2xl > ul > li > *:first-child {
      +   .xl\\\\:markdown-2xl > ul > li > *:first-child {

      ---

      -   .xl\\\\:prose-2xl > ul > li > *:last-child {
      +   .xl\\\\:markdown-2xl > ul > li > *:last-child {

      ---

      -   .xl\\\\:prose-2xl > ol > li > *:first-child {
      +   .xl\\\\:markdown-2xl > ol > li > *:first-child {

      ---

      -   .xl\\\\:prose-2xl > ol > li > *:last-child {
      +   .xl\\\\:markdown-2xl > ol > li > *:last-child {

      ---

      -   .xl\\\\:prose-2xl ul ul, .xl\\\\:prose-2xl ul ol, .xl\\\\:prose-2xl ol ul, .xl\\\\:prose-2xl ol ol {
      +   .xl\\\\:markdown-2xl ul ul, .xl\\\\:markdown-2xl ul ol, .xl\\\\:markdown-2xl ol ul, .xl\\\\:markdown-2xl ol ol {

      ---

      -   .xl\\\\:prose-2xl hr {
      +   .xl\\\\:markdown-2xl hr {

      ---

      -   .xl\\\\:prose-2xl hr + * {
      +   .xl\\\\:markdown-2xl hr + * {

      ---

      -   .xl\\\\:prose-2xl h2 + * {
      +   .xl\\\\:markdown-2xl h2 + * {

      ---

      -   .xl\\\\:prose-2xl h3 + * {
      +   .xl\\\\:markdown-2xl h3 + * {

      ---

      -   .xl\\\\:prose-2xl h4 + * {
      +   .xl\\\\:markdown-2xl h4 + * {

      ---

      -   .xl\\\\:prose-2xl table {
      +   .xl\\\\:markdown-2xl table {

      ---

      -   .xl\\\\:prose-2xl thead th {
      +   .xl\\\\:markdown-2xl thead th {

      ---

      -   .xl\\\\:prose-2xl thead th:first-child {
      +   .xl\\\\:markdown-2xl thead th:first-child {

      ---

      -   .xl\\\\:prose-2xl thead th:last-child {
      +   .xl\\\\:markdown-2xl thead th:last-child {

      ---

      -   .xl\\\\:prose-2xl tbody td {
      +   .xl\\\\:markdown-2xl tbody td {

      ---

      -   .xl\\\\:prose-2xl tbody td:first-child {
      +   .xl\\\\:markdown-2xl tbody td:first-child {

      ---

      -   .xl\\\\:prose-2xl tbody td:last-child {
      +   .xl\\\\:markdown-2xl tbody td:last-child {

      ---

      -   .xl\\\\:prose-2xl > :first-child {
      +   .xl\\\\:markdown-2xl > :first-child {

      ---

      -   .xl\\\\:prose-2xl > :last-child {
      +   .xl\\\\:markdown-2xl > :last-child {

      ---

      -   }
      -
      -   .xl\\\\:prose-red a {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-red a code {
      -     color: #dc2626;
      -   }
      -
      -   .xl\\\\:prose-yellow a {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-yellow a code {
      -     color: #d97706;
      -   }
      -
      -   .xl\\\\:prose-green a {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-green a code {
      -     color: #059669;
      -   }
      -
      -   .xl\\\\:prose-blue a {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-blue a code {
      -     color: #2563eb;
      -   }
      -
      -   .xl\\\\:prose-indigo a {
      -     color: #4f46e5;

      ---

      -
      -   .xl\\\\:prose-indigo a code {
      -     color: #4f46e5;
      -   }
      -
      -   .xl\\\\:prose-purple a {
      -     color: #7c3aed;
      -   }
      -
      -   .xl\\\\:prose-purple a code {
      -     color: #7c3aed;
      -   }
      -
      -   .xl\\\\:prose-pink a {
      -     color: #db2777;
      -   }
      -
      -   .xl\\\\:prose-pink a code {
      -     color: #db2777;
      -   }

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose [class~='lead'] {
      +   .\\\\32xl\\\\:markdown [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose a {
      +   .\\\\32xl\\\\:markdown a {

      ---

      -   .\\\\32xl\\\\:prose strong {
      +   .\\\\32xl\\\\:markdown strong {

      ---

      -   .\\\\32xl\\\\:prose ol {
      +   .\\\\32xl\\\\:markdown ol {

      ---

      -   .\\\\32xl\\\\:prose ol > li {
      +   .\\\\32xl\\\\:markdown ol > li {

      ---

      -   .\\\\32xl\\\\:prose ol > li::before {
      +   .\\\\32xl\\\\:markdown ol > li::before {

      ---

      -   .\\\\32xl\\\\:prose ul > li {
      +   .\\\\32xl\\\\:markdown ul > li {

      ---

      -   .\\\\32xl\\\\:prose ul > li::before {
      +   .\\\\32xl\\\\:markdown ul > li::before {

      ---

      -   .\\\\32xl\\\\:prose hr {
      +   .\\\\32xl\\\\:markdown hr {

      ---

      -   .\\\\32xl\\\\:prose blockquote {
      +   .\\\\32xl\\\\:markdown blockquote {

      ---

      -   .\\\\32xl\\\\:prose blockquote p:first-of-type::before {
      +   .\\\\32xl\\\\:markdown blockquote p:first-of-type::before {

      ---

      -   .\\\\32xl\\\\:prose blockquote p:last-of-type::after {
      +   .\\\\32xl\\\\:markdown blockquote p:last-of-type::after {

      ---

      -   .\\\\32xl\\\\:prose h1 {
      +   .\\\\32xl\\\\:markdown h1 {

      ---

      -   .\\\\32xl\\\\:prose h2 {
      +   .\\\\32xl\\\\:markdown h2 {

      ---

      -   .\\\\32xl\\\\:prose h3 {
      +   .\\\\32xl\\\\:markdown h3 {

      ---

      -   .\\\\32xl\\\\:prose h4 {
      +   .\\\\32xl\\\\:markdown h4 {

      ---

      -   .\\\\32xl\\\\:prose figure figcaption {
      +   .\\\\32xl\\\\:markdown figure figcaption {

      ---

      -   .\\\\32xl\\\\:prose code {
      +   .\\\\32xl\\\\:markdown code {

      ---

      -   .\\\\32xl\\\\:prose code::before {
      +   .\\\\32xl\\\\:markdown code::before {

      ---

      -   .\\\\32xl\\\\:prose code::after {
      +   .\\\\32xl\\\\:markdown code::after {

      ---

      -   .\\\\32xl\\\\:prose a code {
      +   .\\\\32xl\\\\:markdown a code {

      ---

      -   .\\\\32xl\\\\:prose pre {
      +   .\\\\32xl\\\\:markdown pre {

      ---

      -   .\\\\32xl\\\\:prose pre code {
      +   .\\\\32xl\\\\:markdown pre code {

      ---

      -   .\\\\32xl\\\\:prose pre code::before {
      +   .\\\\32xl\\\\:markdown pre code::before {

      ---

      -   .\\\\32xl\\\\:prose pre code::after {
      +   .\\\\32xl\\\\:markdown pre code::after {

      ---

      -   .\\\\32xl\\\\:prose table {
      +   .\\\\32xl\\\\:markdown table {

      ---

      -   .\\\\32xl\\\\:prose thead {
      +   .\\\\32xl\\\\:markdown thead {

      ---

      -   .\\\\32xl\\\\:prose thead th {
      +   .\\\\32xl\\\\:markdown thead th {

      ---

      -   .\\\\32xl\\\\:prose tbody tr {
      +   .\\\\32xl\\\\:markdown tbody tr {

      ---

      -   .\\\\32xl\\\\:prose tbody tr:last-child {
      +   .\\\\32xl\\\\:markdown tbody tr:last-child {

      ---

      -   .\\\\32xl\\\\:prose tbody td {
      +   .\\\\32xl\\\\:markdown tbody td {

      ---

      -   .\\\\32xl\\\\:prose {
      +   .\\\\32xl\\\\:markdown {

      ---

      -   .\\\\32xl\\\\:prose p {
      +   .\\\\32xl\\\\:markdown p {

      ---

      -   .\\\\32xl\\\\:prose img {
      +   .\\\\32xl\\\\:markdown img {

      ---

      -   .\\\\32xl\\\\:prose video {
      +   .\\\\32xl\\\\:markdown video {

      ---

      -   .\\\\32xl\\\\:prose figure {
      +   .\\\\32xl\\\\:markdown figure {

      ---

      -   .\\\\32xl\\\\:prose figure > * {
      +   .\\\\32xl\\\\:markdown figure > * {

      ---

      -   .\\\\32xl\\\\:prose h2 code {
      +   .\\\\32xl\\\\:markdown h2 code {

      ---

      -   .\\\\32xl\\\\:prose h3 code {
      +   .\\\\32xl\\\\:markdown h3 code {

      ---

      -   .\\\\32xl\\\\:prose ul {
      +   .\\\\32xl\\\\:markdown ul {

      ---

      -   .\\\\32xl\\\\:prose li {
      +   .\\\\32xl\\\\:markdown li {

      ---

      -   .\\\\32xl\\\\:prose > ul > li p {
      +   .\\\\32xl\\\\:markdown > ul > li p {

      ---

      -   .\\\\32xl\\\\:prose > ul > li > *:first-child {
      +   .\\\\32xl\\\\:markdown > ul > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose > ul > li > *:last-child {
      +   .\\\\32xl\\\\:markdown > ul > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose > ol > li > *:first-child {
      +   .\\\\32xl\\\\:markdown > ol > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose > ol > li > *:last-child {
      +   .\\\\32xl\\\\:markdown > ol > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose ul ul, .\\\\32xl\\\\:prose ul ol, .\\\\32xl\\\\:prose ol ul, .\\\\32xl\\\\:prose ol ol {
      +   .\\\\32xl\\\\:markdown ul ul, .\\\\32xl\\\\:markdown ul ol, .\\\\32xl\\\\:markdown ol ul, .\\\\32xl\\\\:markdown ol ol {

      ---

      -   }
      -
      -   .\\\\32xl\\\\:prose hr + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose h2 + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose h4 + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose thead th:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose thead th:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose tbody td:first-child {
      -     padding-left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose tbody td:last-child {
      -     padding-right: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose > :first-child {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose > :last-child {
      -     margin-bottom: 0;

      ---

      -   .\\\\32xl\\\\:prose-sm {
      -     font-size: 0.875rem;
      -     line-height: 1.7142857;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm p {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm [class~='lead'] {
      -     font-size: 1.2857143em;
      -     line-height: 1.5555556;
      -     margin-top: 0.8888889em;
      -     margin-bottom: 0.8888889em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm blockquote {
      -     margin-top: 1.3333333em;
      -     margin-bottom: 1.3333333em;
      -     padding-left: 1.1111111em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h1 {
      -     font-size: 2.1428571em;
      -     margin-top: 0;
      -     margin-bottom: 0.8em;
      -     line-height: 1.2;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h2 {
      -     font-size: 1.4285714em;
      -     margin-top: 1.6em;
      -     margin-bottom: 0.8em;
      -     line-height: 1.4;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h3 {
      -     font-size: 1.2857143em;
      -     margin-top: 1.5555556em;
      -     margin-bottom: 0.4444444em;
      -     line-height: 1.5555556;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h4 {
      -     margin-top: 1.4285714em;
      -     margin-bottom: 0.5714286em;
      -     line-height: 1.4285714;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm img {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm video {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm figure {
      -     margin-top: 1.7142857em;
      -     margin-bottom: 1.7142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm figure > * {
      +   .\\\\32xl\\\\:markdown hr + * {

      ---

      -     margin-bottom: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm figure figcaption {
      -     font-size: 0.8571429em;
      -     line-height: 1.3333333;
      -     margin-top: 0.6666667em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm code {
      -     font-size: 0.8571429em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h2 code {
      -     font-size: 0.9em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h3 code {
      -     font-size: 0.8888889em;

      ---

      -   .\\\\32xl\\\\:prose-sm pre {
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
      -   .\\\\32xl\\\\:prose-sm ol {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ul {
      -     margin-top: 1.1428571em;
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm li {
      -     margin-top: 0.2857143em;
      -     margin-bottom: 0.2857143em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ol > li {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ol > li::before {
      -     left: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ul > li {
      -     padding-left: 1.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ul > li::before {
      -     height: 0.3571429em;
      -     width: 0.3571429em;
      -     top: calc(0.8571429em - 0.1785714em);
      -     left: 0.2142857em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > ul > li p {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > ul > li > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > ul > li > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > ol > li > *:first-child {
      -     margin-top: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm > ol > li > *:last-child {
      -     margin-bottom: 1.1428571em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm ul ul, .\\\\32xl\\\\:prose-sm ul ol, .\\\\32xl\\\\:prose-sm ol ul, .\\\\32xl\\\\:prose-sm ol ol {
      -     margin-top: 0.5714286em;
      -     margin-bottom: 0.5714286em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm hr {
      -     margin-top: 2.8571429em;
      -     margin-bottom: 2.8571429em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm hr + * {
      +   .\\\\32xl\\\\:markdown h2 + * {

      ---

      -   .\\\\32xl\\\\:prose-sm h2 + * {
      +   .\\\\32xl\\\\:markdown h3 + * {

      ---

      -   .\\\\32xl\\\\:prose-sm h3 + * {
      -     margin-top: 0;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm h4 + * {
      +   .\\\\32xl\\\\:markdown h4 + * {

      ---

      -   }
      -
      -   .\\\\32xl\\\\:prose-sm table {
      -     font-size: 0.8571429em;
      -     line-height: 1.5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm thead th {
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;

      ---

      -   .\\\\32xl\\\\:prose-sm thead th:first-child {
      +   .\\\\32xl\\\\:markdown thead th:first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm thead th:last-child {
      +   .\\\\32xl\\\\:markdown thead th:last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm tbody td {
      -     padding-top: 0.6666667em;
      -     padding-right: 1em;
      -     padding-bottom: 0.6666667em;
      -     padding-left: 1em;
      -   }
      -
      -   .\\\\32xl\\\\:prose-sm tbody td:first-child {
      +   .\\\\32xl\\\\:markdown tbody td:first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm tbody td:last-child {
      +   .\\\\32xl\\\\:markdown tbody td:last-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > :first-child {
      +   .\\\\32xl\\\\:markdown > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-sm > :last-child {
      +   .\\\\32xl\\\\:markdown > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg {
      +   .\\\\32xl\\\\:markdown-lg {

      ---

      -   .\\\\32xl\\\\:prose-lg p {
      +   .\\\\32xl\\\\:markdown-lg p {

      ---

      -   .\\\\32xl\\\\:prose-lg [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-lg [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-lg blockquote {
      +   .\\\\32xl\\\\:markdown-lg blockquote {

      ---

      -   .\\\\32xl\\\\:prose-lg h1 {
      +   .\\\\32xl\\\\:markdown-lg h1 {

      ---

      -   .\\\\32xl\\\\:prose-lg h2 {
      +   .\\\\32xl\\\\:markdown-lg h2 {

      ---

      -   .\\\\32xl\\\\:prose-lg h3 {
      +   .\\\\32xl\\\\:markdown-lg h3 {

      ---

      -   .\\\\32xl\\\\:prose-lg h4 {
      +   .\\\\32xl\\\\:markdown-lg h4 {

      ---

      -   .\\\\32xl\\\\:prose-lg img {
      +   .\\\\32xl\\\\:markdown-lg img {

      ---

      -   .\\\\32xl\\\\:prose-lg video {
      +   .\\\\32xl\\\\:markdown-lg video {

      ---

      -   .\\\\32xl\\\\:prose-lg figure {
      +   .\\\\32xl\\\\:markdown-lg figure {

      ---

      -   .\\\\32xl\\\\:prose-lg figure > * {
      +   .\\\\32xl\\\\:markdown-lg figure > * {

      ---

      -   .\\\\32xl\\\\:prose-lg figure figcaption {
      +   .\\\\32xl\\\\:markdown-lg figure figcaption {

      ---

      -   .\\\\32xl\\\\:prose-lg code {
      +   .\\\\32xl\\\\:markdown-lg code {

      ---

      -   .\\\\32xl\\\\:prose-lg h2 code {
      +   .\\\\32xl\\\\:markdown-lg h2 code {

      ---

      -   .\\\\32xl\\\\:prose-lg h3 code {
      +   .\\\\32xl\\\\:markdown-lg h3 code {

      ---

      -   .\\\\32xl\\\\:prose-lg pre {
      +   .\\\\32xl\\\\:markdown-lg pre {

      ---

      -   .\\\\32xl\\\\:prose-lg ol {
      +   .\\\\32xl\\\\:markdown-lg ol {

      ---

      -   .\\\\32xl\\\\:prose-lg ul {
      +   .\\\\32xl\\\\:markdown-lg ul {

      ---

      -   .\\\\32xl\\\\:prose-lg li {
      +   .\\\\32xl\\\\:markdown-lg li {

      ---

      -   .\\\\32xl\\\\:prose-lg ol > li {
      +   .\\\\32xl\\\\:markdown-lg ol > li {

      ---

      -   .\\\\32xl\\\\:prose-lg ol > li::before {
      +   .\\\\32xl\\\\:markdown-lg ol > li::before {

      ---

      -   .\\\\32xl\\\\:prose-lg ul > li {
      +   .\\\\32xl\\\\:markdown-lg ul > li {

      ---

      -   .\\\\32xl\\\\:prose-lg ul > li::before {
      +   .\\\\32xl\\\\:markdown-lg ul > li::before {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul > li p {
      +   .\\\\32xl\\\\:markdown-lg > ul > li p {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-lg > ul > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ul > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-lg > ul > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ol > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-lg > ol > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > ol > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-lg > ol > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg ul ul, .\\\\32xl\\\\:prose-lg ul ol, .\\\\32xl\\\\:prose-lg ol ul, .\\\\32xl\\\\:prose-lg ol ol {
      +   .\\\\32xl\\\\:markdown-lg ul ul, .\\\\32xl\\\\:markdown-lg ul ol, .\\\\32xl\\\\:markdown-lg ol ul, .\\\\32xl\\\\:markdown-lg ol ol {

      ---

      -   .\\\\32xl\\\\:prose-lg hr {
      +   .\\\\32xl\\\\:markdown-lg hr {

      ---

      -   .\\\\32xl\\\\:prose-lg hr + * {
      +   .\\\\32xl\\\\:markdown-lg hr + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h2 + * {
      +   .\\\\32xl\\\\:markdown-lg h2 + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h3 + * {
      +   .\\\\32xl\\\\:markdown-lg h3 + * {

      ---

      -   .\\\\32xl\\\\:prose-lg h4 + * {
      +   .\\\\32xl\\\\:markdown-lg h4 + * {

      ---

      -   .\\\\32xl\\\\:prose-lg table {
      +   .\\\\32xl\\\\:markdown-lg table {

      ---

      -   .\\\\32xl\\\\:prose-lg thead th {
      +   .\\\\32xl\\\\:markdown-lg thead th {

      ---

      -   .\\\\32xl\\\\:prose-lg thead th:first-child {
      +   .\\\\32xl\\\\:markdown-lg thead th:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg thead th:last-child {
      +   .\\\\32xl\\\\:markdown-lg thead th:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody td {
      +   .\\\\32xl\\\\:markdown-lg tbody td {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody td:first-child {
      +   .\\\\32xl\\\\:markdown-lg tbody td:first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg tbody td:last-child {
      +   .\\\\32xl\\\\:markdown-lg tbody td:last-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > :first-child {
      +   .\\\\32xl\\\\:markdown-lg > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-lg > :last-child {
      +   .\\\\32xl\\\\:markdown-lg > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl {
      +   .\\\\32xl\\\\:markdown-xl {

      ---

      -   .\\\\32xl\\\\:prose-xl p {
      +   .\\\\32xl\\\\:markdown-xl p {

      ---

      -   .\\\\32xl\\\\:prose-xl [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-xl [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-xl blockquote {
      +   .\\\\32xl\\\\:markdown-xl blockquote {

      ---

      -   .\\\\32xl\\\\:prose-xl h1 {
      +   .\\\\32xl\\\\:markdown-xl h1 {

      ---

      -   .\\\\32xl\\\\:prose-xl h2 {
      +   .\\\\32xl\\\\:markdown-xl h2 {

      ---

      -   .\\\\32xl\\\\:prose-xl h3 {
      +   .\\\\32xl\\\\:markdown-xl h3 {

      ---

      -   .\\\\32xl\\\\:prose-xl h4 {
      +   .\\\\32xl\\\\:markdown-xl h4 {

      ---

      -   .\\\\32xl\\\\:prose-xl img {
      +   .\\\\32xl\\\\:markdown-xl img {

      ---

      -   .\\\\32xl\\\\:prose-xl video {
      +   .\\\\32xl\\\\:markdown-xl video {

      ---

      -   .\\\\32xl\\\\:prose-xl figure {
      +   .\\\\32xl\\\\:markdown-xl figure {

      ---

      -   .\\\\32xl\\\\:prose-xl figure > * {
      +   .\\\\32xl\\\\:markdown-xl figure > * {

      ---

      -   .\\\\32xl\\\\:prose-xl figure figcaption {
      +   .\\\\32xl\\\\:markdown-xl figure figcaption {

      ---

      -   .\\\\32xl\\\\:prose-xl code {
      +   .\\\\32xl\\\\:markdown-xl code {

      ---

      -   .\\\\32xl\\\\:prose-xl h2 code {
      +   .\\\\32xl\\\\:markdown-xl h2 code {

      ---

      -   .\\\\32xl\\\\:prose-xl h3 code {
      +   .\\\\32xl\\\\:markdown-xl h3 code {

      ---

      -   .\\\\32xl\\\\:prose-xl pre {
      +   .\\\\32xl\\\\:markdown-xl pre {

      ---

      -   .\\\\32xl\\\\:prose-xl ol {
      +   .\\\\32xl\\\\:markdown-xl ol {

      ---

      -   .\\\\32xl\\\\:prose-xl ul {
      +   .\\\\32xl\\\\:markdown-xl ul {

      ---

      -   .\\\\32xl\\\\:prose-xl li {
      +   .\\\\32xl\\\\:markdown-xl li {

      ---

      -   .\\\\32xl\\\\:prose-xl ol > li {
      +   .\\\\32xl\\\\:markdown-xl ol > li {

      ---

      -   .\\\\32xl\\\\:prose-xl ol > li::before {
      +   .\\\\32xl\\\\:markdown-xl ol > li::before {

      ---

      -   .\\\\32xl\\\\:prose-xl ul > li {
      +   .\\\\32xl\\\\:markdown-xl ul > li {

      ---

      -   .\\\\32xl\\\\:prose-xl ul > li::before {
      +   .\\\\32xl\\\\:markdown-xl ul > li::before {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul > li p {
      +   .\\\\32xl\\\\:markdown-xl > ul > li p {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-xl > ul > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ul > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-xl > ul > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ol > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-xl > ol > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > ol > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-xl > ol > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl ul ul, .\\\\32xl\\\\:prose-xl ul ol, .\\\\32xl\\\\:prose-xl ol ul, .\\\\32xl\\\\:prose-xl ol ol {
      +   .\\\\32xl\\\\:markdown-xl ul ul, .\\\\32xl\\\\:markdown-xl ul ol, .\\\\32xl\\\\:markdown-xl ol ul, .\\\\32xl\\\\:markdown-xl ol ol {

      ---

      -   .\\\\32xl\\\\:prose-xl hr {
      +   .\\\\32xl\\\\:markdown-xl hr {

      ---

      -   .\\\\32xl\\\\:prose-xl hr + * {
      +   .\\\\32xl\\\\:markdown-xl hr + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h2 + * {
      +   .\\\\32xl\\\\:markdown-xl h2 + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h3 + * {
      +   .\\\\32xl\\\\:markdown-xl h3 + * {

      ---

      -   .\\\\32xl\\\\:prose-xl h4 + * {
      +   .\\\\32xl\\\\:markdown-xl h4 + * {

      ---

      -   .\\\\32xl\\\\:prose-xl table {
      +   .\\\\32xl\\\\:markdown-xl table {

      ---

      -   .\\\\32xl\\\\:prose-xl thead th {
      +   .\\\\32xl\\\\:markdown-xl thead th {

      ---

      -   .\\\\32xl\\\\:prose-xl thead th:first-child {
      +   .\\\\32xl\\\\:markdown-xl thead th:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl thead th:last-child {
      +   .\\\\32xl\\\\:markdown-xl thead th:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody td {
      +   .\\\\32xl\\\\:markdown-xl tbody td {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody td:first-child {
      +   .\\\\32xl\\\\:markdown-xl tbody td:first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl tbody td:last-child {
      +   .\\\\32xl\\\\:markdown-xl tbody td:last-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > :first-child {
      +   .\\\\32xl\\\\:markdown-xl > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-xl > :last-child {
      +   .\\\\32xl\\\\:markdown-xl > :last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl {
      +   .\\\\32xl\\\\:markdown-2xl {

      ---

      -   .\\\\32xl\\\\:prose-2xl p {
      +   .\\\\32xl\\\\:markdown-2xl p {

      ---

      -   .\\\\32xl\\\\:prose-2xl [class~='lead'] {
      +   .\\\\32xl\\\\:markdown-2xl [class~='lead'] {

      ---

      -   .\\\\32xl\\\\:prose-2xl blockquote {
      +   .\\\\32xl\\\\:markdown-2xl blockquote {

      ---

      -   .\\\\32xl\\\\:prose-2xl h1 {
      +   .\\\\32xl\\\\:markdown-2xl h1 {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2 {
      +   .\\\\32xl\\\\:markdown-2xl h2 {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3 {
      +   .\\\\32xl\\\\:markdown-2xl h3 {

      ---

      -   .\\\\32xl\\\\:prose-2xl h4 {
      +   .\\\\32xl\\\\:markdown-2xl h4 {

      ---

      -   .\\\\32xl\\\\:prose-2xl img {
      +   .\\\\32xl\\\\:markdown-2xl img {

      ---

      -   .\\\\32xl\\\\:prose-2xl video {
      +   .\\\\32xl\\\\:markdown-2xl video {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure {
      +   .\\\\32xl\\\\:markdown-2xl figure {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure > * {
      +   .\\\\32xl\\\\:markdown-2xl figure > * {

      ---

      -   .\\\\32xl\\\\:prose-2xl figure figcaption {
      +   .\\\\32xl\\\\:markdown-2xl figure figcaption {

      ---

      -   .\\\\32xl\\\\:prose-2xl code {
      +   .\\\\32xl\\\\:markdown-2xl code {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2 code {
      +   .\\\\32xl\\\\:markdown-2xl h2 code {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3 code {
      +   .\\\\32xl\\\\:markdown-2xl h3 code {

      ---

      -   .\\\\32xl\\\\:prose-2xl pre {
      +   .\\\\32xl\\\\:markdown-2xl pre {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol {
      +   .\\\\32xl\\\\:markdown-2xl ol {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul {
      +   .\\\\32xl\\\\:markdown-2xl ul {

      ---

      -   .\\\\32xl\\\\:prose-2xl li {
      +   .\\\\32xl\\\\:markdown-2xl li {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol > li {
      +   .\\\\32xl\\\\:markdown-2xl ol > li {

      ---

      -   .\\\\32xl\\\\:prose-2xl ol > li::before {
      +   .\\\\32xl\\\\:markdown-2xl ol > li::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul > li {
      +   .\\\\32xl\\\\:markdown-2xl ul > li {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul > li::before {
      +   .\\\\32xl\\\\:markdown-2xl ul > li::before {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul > li p {
      +   .\\\\32xl\\\\:markdown-2xl > ul > li p {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-2xl > ul > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ul > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-2xl > ul > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ol > li > *:first-child {
      +   .\\\\32xl\\\\:markdown-2xl > ol > li > *:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > ol > li > *:last-child {
      +   .\\\\32xl\\\\:markdown-2xl > ol > li > *:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl ul ul, .\\\\32xl\\\\:prose-2xl ul ol, .\\\\32xl\\\\:prose-2xl ol ul, .\\\\32xl\\\\:prose-2xl ol ol {
      +   .\\\\32xl\\\\:markdown-2xl ul ul, .\\\\32xl\\\\:markdown-2xl ul ol, .\\\\32xl\\\\:markdown-2xl ol ul, .\\\\32xl\\\\:markdown-2xl ol ol {

      ---

      -   .\\\\32xl\\\\:prose-2xl hr {
      +   .\\\\32xl\\\\:markdown-2xl hr {

      ---

      -   .\\\\32xl\\\\:prose-2xl hr + * {
      +   .\\\\32xl\\\\:markdown-2xl hr + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h2 + * {
      +   .\\\\32xl\\\\:markdown-2xl h2 + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h3 + * {
      +   .\\\\32xl\\\\:markdown-2xl h3 + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl h4 + * {
      +   .\\\\32xl\\\\:markdown-2xl h4 + * {

      ---

      -   .\\\\32xl\\\\:prose-2xl table {
      +   .\\\\32xl\\\\:markdown-2xl table {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead th {
      +   .\\\\32xl\\\\:markdown-2xl thead th {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead th:first-child {
      +   .\\\\32xl\\\\:markdown-2xl thead th:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl thead th:last-child {
      +   .\\\\32xl\\\\:markdown-2xl thead th:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody td {
      +   .\\\\32xl\\\\:markdown-2xl tbody td {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody td:first-child {
      +   .\\\\32xl\\\\:markdown-2xl tbody td:first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl tbody td:last-child {
      +   .\\\\32xl\\\\:markdown-2xl tbody td:last-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > :first-child {
      +   .\\\\32xl\\\\:markdown-2xl > :first-child {

      ---

      -   .\\\\32xl\\\\:prose-2xl > :last-child {
      +   .\\\\32xl\\\\:markdown-2xl > :last-child {

      ---

      -   }
      -
      -   .\\\\32xl\\\\:prose-red a {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-red a code {
      -     color: #dc2626;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow a {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-yellow a code {
      -     color: #d97706;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green a {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-green a code {
      -     color: #059669;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue a {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-blue a code {
      -     color: #2563eb;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo a {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-indigo a code {
      -     color: #4f46e5;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple a {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-purple a code {
      -     color: #7c3aed;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink a {
      -     color: #db2777;
      -   }
      -
      -   .\\\\32xl\\\\:prose-pink a code {
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
