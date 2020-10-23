const typographyPlugin = require('.')
const snapshotDiff = require('snapshot-diff')

function run(options = {}, config = {}) {
  const state = { components: {}, variants: [] }
  typographyPlugin(options).handler({
    addComponents: (...args) => Object.assign(state.components, ...args.flat()),
    variants: (...args) => state.variants.push(...args),
    theme: () => config,
  })
  return state.components
}

function diffOnly(options = {}, config = {}) {
  const before = run()
  const after = run(options, config)

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
    .map((line) => `    ${line}`)
    .join('\n')}\n\n`
}

it('should generate the default classes for the typography components', () => {
  expect(run()).toMatchInlineSnapshot(`
    Object {
      ".prose": Object {
        "> :first-child": Object {
          "marginTop": "0",
        },
        "> :last-child": Object {
          "marginBottom": "0",
        },
        "> ol > li > *:first-child": Object {
          "marginTop": "1.25em",
        },
        "> ol > li > *:last-child": Object {
          "marginBottom": "1.25em",
        },
        "> ul > li > *:first-child": Object {
          "marginTop": "1.25em",
        },
        "> ul > li > *:last-child": Object {
          "marginBottom": "1.25em",
        },
        "> ul > li p": Object {
          "marginBottom": "0.75em",
          "marginTop": "0.75em",
        },
        "[class~=\\"lead\\"]": Object {
          "color": "#52525b",
          "fontSize": "1.25em",
          "lineHeight": "1.6",
          "marginBottom": "1.2em",
          "marginTop": "1.2em",
        },
        "a": Object {
          "color": "#18181b",
          "textDecoration": "underline",
        },
        "blockquote": Object {
          "borderLeftColor": "#e4e4e7",
          "borderLeftWidth": "0.25rem",
          "color": "#18181b",
          "fontStyle": "italic",
          "fontWeight": "500",
          "marginBottom": "1.6em",
          "marginTop": "1.6em",
          "paddingLeft": "1em",
          "quotes": "\\"\\\\201C\\"\\"\\\\201D\\"\\"\\\\2018\\"\\"\\\\2019\\"",
        },
        "blockquote p:first-of-type::before": Object {
          "content": "open-quote",
        },
        "blockquote p:last-of-type::after": Object {
          "content": "close-quote",
        },
        "code": Object {
          "color": "#18181b",
          "fontSize": "0.875em",
          "fontWeight": "600",
        },
        "code::after": Object {
          "content": "\\"\`\\"",
        },
        "code::before": Object {
          "content": "\\"\`\\"",
        },
        "color": "#3f3f46",
        "figure": Object {
          "marginBottom": "2em",
          "marginTop": "2em",
        },
        "figure > *": Object {
          "marginBottom": "0",
          "marginTop": "0",
        },
        "figure figcaption": Object {
          "color": "#71717a",
          "fontSize": "0.875em",
          "lineHeight": "1.4285714",
          "marginTop": "0.8571429em",
        },
        "fontSize": "1rem",
        "h1": Object {
          "color": "#18181b",
          "fontSize": "2.25em",
          "fontWeight": "800",
          "lineHeight": "1.1111111",
          "marginBottom": "0.8888889em",
          "marginTop": "0",
        },
        "h2": Object {
          "color": "#18181b",
          "fontSize": "1.5em",
          "fontWeight": "700",
          "lineHeight": "1.3333333",
          "marginBottom": "1em",
          "marginTop": "2em",
        },
        "h2 + *": Object {
          "marginTop": "0",
        },
        "h2 code": Object {
          "fontSize": "0.875em",
        },
        "h3": Object {
          "color": "#18181b",
          "fontSize": "1.25em",
          "fontWeight": "600",
          "lineHeight": "1.6",
          "marginBottom": "0.6em",
          "marginTop": "1.6em",
        },
        "h3 + *": Object {
          "marginTop": "0",
        },
        "h3 code": Object {
          "fontSize": "0.9em",
        },
        "h4": Object {
          "color": "#18181b",
          "fontWeight": "600",
          "lineHeight": "1.5",
          "marginBottom": "0.5em",
          "marginTop": "1.5em",
        },
        "h4 + *": Object {
          "marginTop": "0",
        },
        "hr": Object {
          "borderColor": "#e4e4e7",
          "borderTopWidth": 1,
          "marginBottom": "3em",
          "marginTop": "3em",
        },
        "hr + *": Object {
          "marginTop": "0",
        },
        "img": Object {
          "marginBottom": "2em",
          "marginTop": "2em",
        },
        "li": Object {
          "marginBottom": "0.5em",
          "marginTop": "0.5em",
        },
        "lineHeight": "1.75",
        "maxWidth": "65ch",
        "ol": Object {
          "counterReset": "list-counter",
          "marginBottom": "1.25em",
          "marginTop": "1.25em",
        },
        "ol > li": Object {
          "counterIncrement": "list-counter",
          "paddingLeft": "1.75em",
          "position": "relative",
        },
        "ol > li::before": Object {
          "color": "#71717a",
          "content": "counter(list-counter) \\".\\"",
          "fontWeight": "400",
          "left": "0",
          "position": "absolute",
        },
        "p": Object {
          "marginBottom": "1.25em",
          "marginTop": "1.25em",
        },
        "pre": Object {
          "backgroundColor": "#27272a",
          "borderRadius": "0.375rem",
          "color": "#e4e4e7",
          "fontSize": "0.875em",
          "lineHeight": "1.7142857",
          "marginBottom": "1.7142857em",
          "marginTop": "1.7142857em",
          "overflowX": "auto",
          "paddingBottom": "0.8571429em",
          "paddingLeft": "1.1428571em",
          "paddingRight": "1.1428571em",
          "paddingTop": "0.8571429em",
        },
        "pre code": Object {
          "backgroundColor": "transparent",
          "borderRadius": "0",
          "borderWidth": "0",
          "color": "inherit",
          "fontFamily": "inherit",
          "fontSize": "inherit",
          "fontWeight": "400",
          "lineHeight": "inherit",
          "padding": "0",
        },
        "pre code::after": Object {
          "content": "\\"\\"",
        },
        "pre code::before": Object {
          "content": "\\"\\"",
        },
        "strong": Object {
          "color": "#18181b",
          "fontWeight": "600",
        },
        "table": Object {
          "fontSize": "0.875em",
          "lineHeight": "1.7142857",
          "marginBottom": "2em",
          "marginTop": "2em",
          "tableLayout": "auto",
          "textAlign": "left",
          "width": "100%",
        },
        "tbody td": Object {
          "paddingBottom": "0.5714286em",
          "paddingLeft": "0.5714286em",
          "paddingRight": "0.5714286em",
          "paddingTop": "0.5714286em",
          "verticalAlign": "top",
        },
        "tbody td:first-child": Object {
          "paddingLeft": "0",
        },
        "tbody td:last-child": Object {
          "paddingRight": "0",
        },
        "tbody tr": Object {
          "borderBottomColor": "#e4e4e7",
          "borderBottomWidth": "1px",
        },
        "tbody tr:last-child": Object {
          "borderBottomWidth": "0",
        },
        "thead": Object {
          "borderBottomColor": "#d4d4d8",
          "borderBottomWidth": "1px",
          "color": "#18181b",
          "fontWeight": "600",
        },
        "thead th": Object {
          "paddingBottom": "0.5714286em",
          "paddingLeft": "0.5714286em",
          "paddingRight": "0.5714286em",
          "verticalAlign": "bottom",
        },
        "thead th:first-child": Object {
          "paddingLeft": "0",
        },
        "thead th:last-child": Object {
          "paddingRight": "0",
        },
        "ul": Object {
          "marginBottom": "1.25em",
          "marginTop": "1.25em",
        },
        "ul > li": Object {
          "paddingLeft": "1.75em",
          "position": "relative",
        },
        "ul > li::before": Object {
          "backgroundColor": "#d4d4d8",
          "borderRadius": "50%",
          "content": "\\"\\"",
          "height": "0.375em",
          "left": "0.25em",
          "position": "absolute",
          "top": "calc(0.875em - 0.1875em)",
          "width": "0.375em",
        },
        "ul ul, ul ol, ol ul, ol ol": Object {
          "marginBottom": "0.75em",
          "marginTop": "0.75em",
        },
        "video": Object {
          "marginBottom": "2em",
          "marginTop": "2em",
        },
      },
      ".prose-2xl": Object {
        "> :first-child": Object {
          "marginTop": "0",
        },
        "> :last-child": Object {
          "marginBottom": "0",
        },
        "> ol > li > *:first-child": Object {
          "marginTop": "1.3333333em",
        },
        "> ol > li > *:last-child": Object {
          "marginBottom": "1.3333333em",
        },
        "> ul > li > *:first-child": Object {
          "marginTop": "1.3333333em",
        },
        "> ul > li > *:last-child": Object {
          "marginBottom": "1.3333333em",
        },
        "> ul > li p": Object {
          "marginBottom": "0.8333333em",
          "marginTop": "0.8333333em",
        },
        "[class~=\\"lead\\"]": Object {
          "fontSize": "1.25em",
          "lineHeight": "1.4666667",
          "marginBottom": "1.0666667em",
          "marginTop": "1.0666667em",
        },
        "blockquote": Object {
          "marginBottom": "1.7777778em",
          "marginTop": "1.7777778em",
          "paddingLeft": "1.1111111em",
        },
        "code": Object {
          "fontSize": "0.8333333em",
        },
        "figure": Object {
          "marginBottom": "2em",
          "marginTop": "2em",
        },
        "figure > *": Object {
          "marginBottom": "0",
          "marginTop": "0",
        },
        "figure figcaption": Object {
          "fontSize": "0.8333333em",
          "lineHeight": "1.6",
          "marginTop": "1em",
        },
        "fontSize": "1.5rem",
        "h1": Object {
          "fontSize": "2.6666667em",
          "lineHeight": "1",
          "marginBottom": "0.875em",
          "marginTop": "0",
        },
        "h2": Object {
          "fontSize": "2em",
          "lineHeight": "1.0833333",
          "marginBottom": "0.8333333em",
          "marginTop": "1.5em",
        },
        "h2 + *": Object {
          "marginTop": "0",
        },
        "h2 code": Object {
          "fontSize": "0.875em",
        },
        "h3": Object {
          "fontSize": "1.5em",
          "lineHeight": "1.2222222",
          "marginBottom": "0.6666667em",
          "marginTop": "1.5555556em",
        },
        "h3 + *": Object {
          "marginTop": "0",
        },
        "h3 code": Object {
          "fontSize": "0.8888889em",
        },
        "h4": Object {
          "lineHeight": "1.5",
          "marginBottom": "0.6666667em",
          "marginTop": "1.6666667em",
        },
        "h4 + *": Object {
          "marginTop": "0",
        },
        "hr": Object {
          "marginBottom": "3em",
          "marginTop": "3em",
        },
        "hr + *": Object {
          "marginTop": "0",
        },
        "img": Object {
          "marginBottom": "2em",
          "marginTop": "2em",
        },
        "li": Object {
          "marginBottom": "0.5em",
          "marginTop": "0.5em",
        },
        "lineHeight": "1.6666667",
        "ol": Object {
          "marginBottom": "1.3333333em",
          "marginTop": "1.3333333em",
        },
        "ol > li": Object {
          "paddingLeft": "1.6666667em",
        },
        "ol > li::before": Object {
          "left": "0",
        },
        "p": Object {
          "marginBottom": "1.3333333em",
          "marginTop": "1.3333333em",
        },
        "pre": Object {
          "borderRadius": "0.5rem",
          "fontSize": "0.8333333em",
          "lineHeight": "1.8",
          "marginBottom": "2em",
          "marginTop": "2em",
          "paddingBottom": "1.2em",
          "paddingLeft": "1.6em",
          "paddingRight": "1.6em",
          "paddingTop": "1.2em",
        },
        "table": Object {
          "fontSize": "0.8333333em",
          "lineHeight": "1.4",
        },
        "tbody td": Object {
          "paddingBottom": "0.8em",
          "paddingLeft": "0.6em",
          "paddingRight": "0.6em",
          "paddingTop": "0.8em",
        },
        "tbody td:first-child": Object {
          "paddingLeft": "0",
        },
        "tbody td:last-child": Object {
          "paddingRight": "0",
        },
        "thead th": Object {
          "paddingBottom": "0.8em",
          "paddingLeft": "0.6em",
          "paddingRight": "0.6em",
        },
        "thead th:first-child": Object {
          "paddingLeft": "0",
        },
        "thead th:last-child": Object {
          "paddingRight": "0",
        },
        "ul": Object {
          "marginBottom": "1.3333333em",
          "marginTop": "1.3333333em",
        },
        "ul > li": Object {
          "paddingLeft": "1.6666667em",
        },
        "ul > li::before": Object {
          "height": "0.3333333em",
          "left": "0.25em",
          "top": "calc(0.8333333em - 0.1666667em)",
          "width": "0.3333333em",
        },
        "ul ul, ul ol, ol ul, ol ol": Object {
          "marginBottom": "0.6666667em",
          "marginTop": "0.6666667em",
        },
        "video": Object {
          "marginBottom": "2em",
          "marginTop": "2em",
        },
      },
      ".prose-lg": Object {
        "> :first-child": Object {
          "marginTop": "0",
        },
        "> :last-child": Object {
          "marginBottom": "0",
        },
        "> ol > li > *:first-child": Object {
          "marginTop": "1.3333333em",
        },
        "> ol > li > *:last-child": Object {
          "marginBottom": "1.3333333em",
        },
        "> ul > li > *:first-child": Object {
          "marginTop": "1.3333333em",
        },
        "> ul > li > *:last-child": Object {
          "marginBottom": "1.3333333em",
        },
        "> ul > li p": Object {
          "marginBottom": "0.8888889em",
          "marginTop": "0.8888889em",
        },
        "[class~=\\"lead\\"]": Object {
          "fontSize": "1.2222222em",
          "lineHeight": "1.4545455",
          "marginBottom": "1.0909091em",
          "marginTop": "1.0909091em",
        },
        "blockquote": Object {
          "marginBottom": "1.6666667em",
          "marginTop": "1.6666667em",
          "paddingLeft": "1em",
        },
        "code": Object {
          "fontSize": "0.8888889em",
        },
        "figure": Object {
          "marginBottom": "1.7777778em",
          "marginTop": "1.7777778em",
        },
        "figure > *": Object {
          "marginBottom": "0",
          "marginTop": "0",
        },
        "figure figcaption": Object {
          "fontSize": "0.8888889em",
          "lineHeight": "1.5",
          "marginTop": "1em",
        },
        "fontSize": "1.125rem",
        "h1": Object {
          "fontSize": "2.6666667em",
          "lineHeight": "1",
          "marginBottom": "0.8333333em",
          "marginTop": "0",
        },
        "h2": Object {
          "fontSize": "1.6666667em",
          "lineHeight": "1.3333333",
          "marginBottom": "1.0666667em",
          "marginTop": "1.8666667em",
        },
        "h2 + *": Object {
          "marginTop": "0",
        },
        "h2 code": Object {
          "fontSize": "0.8666667em",
        },
        "h3": Object {
          "fontSize": "1.3333333em",
          "lineHeight": "1.5",
          "marginBottom": "0.6666667em",
          "marginTop": "1.6666667em",
        },
        "h3 + *": Object {
          "marginTop": "0",
        },
        "h3 code": Object {
          "fontSize": "0.875em",
        },
        "h4": Object {
          "lineHeight": "1.5555556",
          "marginBottom": "0.4444444em",
          "marginTop": "1.7777778em",
        },
        "h4 + *": Object {
          "marginTop": "0",
        },
        "hr": Object {
          "marginBottom": "3.1111111em",
          "marginTop": "3.1111111em",
        },
        "hr + *": Object {
          "marginTop": "0",
        },
        "img": Object {
          "marginBottom": "1.7777778em",
          "marginTop": "1.7777778em",
        },
        "li": Object {
          "marginBottom": "0.6666667em",
          "marginTop": "0.6666667em",
        },
        "lineHeight": "1.7777778",
        "ol": Object {
          "marginBottom": "1.3333333em",
          "marginTop": "1.3333333em",
        },
        "ol > li": Object {
          "paddingLeft": "1.6666667em",
        },
        "ol > li::before": Object {
          "left": "0",
        },
        "p": Object {
          "marginBottom": "1.3333333em",
          "marginTop": "1.3333333em",
        },
        "pre": Object {
          "borderRadius": "0.375rem",
          "fontSize": "0.8888889em",
          "lineHeight": "1.75",
          "marginBottom": "2em",
          "marginTop": "2em",
          "paddingBottom": "1em",
          "paddingLeft": "1.5em",
          "paddingRight": "1.5em",
          "paddingTop": "1em",
        },
        "table": Object {
          "fontSize": "0.8888889em",
          "lineHeight": "1.5",
        },
        "tbody td": Object {
          "paddingBottom": "0.75em",
          "paddingLeft": "0.75em",
          "paddingRight": "0.75em",
          "paddingTop": "0.75em",
        },
        "tbody td:first-child": Object {
          "paddingLeft": "0",
        },
        "tbody td:last-child": Object {
          "paddingRight": "0",
        },
        "thead th": Object {
          "paddingBottom": "0.75em",
          "paddingLeft": "0.75em",
          "paddingRight": "0.75em",
        },
        "thead th:first-child": Object {
          "paddingLeft": "0",
        },
        "thead th:last-child": Object {
          "paddingRight": "0",
        },
        "ul": Object {
          "marginBottom": "1.3333333em",
          "marginTop": "1.3333333em",
        },
        "ul > li": Object {
          "paddingLeft": "1.6666667em",
        },
        "ul > li::before": Object {
          "height": "0.3333333em",
          "left": "0.2222222em",
          "top": "calc(0.8888889em - 0.1666667em)",
          "width": "0.3333333em",
        },
        "ul ul, ul ol, ol ul, ol ol": Object {
          "marginBottom": "0.8888889em",
          "marginTop": "0.8888889em",
        },
        "video": Object {
          "marginBottom": "1.7777778em",
          "marginTop": "1.7777778em",
        },
      },
      ".prose-sm": Object {
        "> :first-child": Object {
          "marginTop": "0",
        },
        "> :last-child": Object {
          "marginBottom": "0",
        },
        "> ol > li > *:first-child": Object {
          "marginTop": "1.1428571em",
        },
        "> ol > li > *:last-child": Object {
          "marginBottom": "1.1428571em",
        },
        "> ul > li > *:first-child": Object {
          "marginTop": "1.1428571em",
        },
        "> ul > li > *:last-child": Object {
          "marginBottom": "1.1428571em",
        },
        "> ul > li p": Object {
          "marginBottom": "0.5714286em",
          "marginTop": "0.5714286em",
        },
        "[class~=\\"lead\\"]": Object {
          "fontSize": "1.2857143em",
          "lineHeight": "1.5555556",
          "marginBottom": "0.8888889em",
          "marginTop": "0.8888889em",
        },
        "blockquote": Object {
          "marginBottom": "1.3333333em",
          "marginTop": "1.3333333em",
          "paddingLeft": "1.1111111em",
        },
        "code": Object {
          "fontSize": "0.8571429em",
        },
        "figure": Object {
          "marginBottom": "1.7142857em",
          "marginTop": "1.7142857em",
        },
        "figure > *": Object {
          "marginBottom": "0",
          "marginTop": "0",
        },
        "figure figcaption": Object {
          "fontSize": "0.8571429em",
          "lineHeight": "1.3333333",
          "marginTop": "0.6666667em",
        },
        "fontSize": "0.875rem",
        "h1": Object {
          "fontSize": "2.1428571em",
          "lineHeight": "1.2",
          "marginBottom": "0.8em",
          "marginTop": "0",
        },
        "h2": Object {
          "fontSize": "1.4285714em",
          "lineHeight": "1.4",
          "marginBottom": "0.8em",
          "marginTop": "1.6em",
        },
        "h2 + *": Object {
          "marginTop": "0",
        },
        "h2 code": Object {
          "fontSize": "0.9em",
        },
        "h3": Object {
          "fontSize": "1.2857143em",
          "lineHeight": "1.5555556",
          "marginBottom": "0.4444444em",
          "marginTop": "1.5555556em",
        },
        "h3 + *": Object {
          "marginTop": "0",
        },
        "h3 code": Object {
          "fontSize": "0.8888889em",
        },
        "h4": Object {
          "lineHeight": "1.4285714",
          "marginBottom": "0.5714286em",
          "marginTop": "1.4285714em",
        },
        "h4 + *": Object {
          "marginTop": "0",
        },
        "hr": Object {
          "marginBottom": "2.8571429em",
          "marginTop": "2.8571429em",
        },
        "hr + *": Object {
          "marginTop": "0",
        },
        "img": Object {
          "marginBottom": "1.7142857em",
          "marginTop": "1.7142857em",
        },
        "li": Object {
          "marginBottom": "0.2857143em",
          "marginTop": "0.2857143em",
        },
        "lineHeight": "1.7142857",
        "ol": Object {
          "marginBottom": "1.1428571em",
          "marginTop": "1.1428571em",
        },
        "ol > li": Object {
          "paddingLeft": "1.5714286em",
        },
        "ol > li::before": Object {
          "left": "0",
        },
        "p": Object {
          "marginBottom": "1.1428571em",
          "marginTop": "1.1428571em",
        },
        "pre": Object {
          "borderRadius": "0.25rem",
          "fontSize": "0.8571429em",
          "lineHeight": "1.6666667",
          "marginBottom": "1.6666667em",
          "marginTop": "1.6666667em",
          "paddingBottom": "0.6666667em",
          "paddingLeft": "1em",
          "paddingRight": "1em",
          "paddingTop": "0.6666667em",
        },
        "table": Object {
          "fontSize": "0.8571429em",
          "lineHeight": "1.5",
        },
        "tbody td": Object {
          "paddingBottom": "0.6666667em",
          "paddingLeft": "1em",
          "paddingRight": "1em",
          "paddingTop": "0.6666667em",
        },
        "tbody td:first-child": Object {
          "paddingLeft": "0",
        },
        "tbody td:last-child": Object {
          "paddingRight": "0",
        },
        "thead th": Object {
          "paddingBottom": "0.6666667em",
          "paddingLeft": "1em",
          "paddingRight": "1em",
        },
        "thead th:first-child": Object {
          "paddingLeft": "0",
        },
        "thead th:last-child": Object {
          "paddingRight": "0",
        },
        "ul": Object {
          "marginBottom": "1.1428571em",
          "marginTop": "1.1428571em",
        },
        "ul > li": Object {
          "paddingLeft": "1.5714286em",
        },
        "ul > li::before": Object {
          "height": "0.3571429em",
          "left": "0.2142857em",
          "top": "calc(0.8571429em - 0.1785714em)",
          "width": "0.3571429em",
        },
        "ul ul, ul ol, ol ul, ol ol": Object {
          "marginBottom": "0.5714286em",
          "marginTop": "0.5714286em",
        },
        "video": Object {
          "marginBottom": "1.7142857em",
          "marginTop": "1.7142857em",
        },
      },
      ".prose-xl": Object {
        "> :first-child": Object {
          "marginTop": "0",
        },
        "> :last-child": Object {
          "marginBottom": "0",
        },
        "> ol > li > *:first-child": Object {
          "marginTop": "1.2em",
        },
        "> ol > li > *:last-child": Object {
          "marginBottom": "1.2em",
        },
        "> ul > li > *:first-child": Object {
          "marginTop": "1.2em",
        },
        "> ul > li > *:last-child": Object {
          "marginBottom": "1.2em",
        },
        "> ul > li p": Object {
          "marginBottom": "0.8em",
          "marginTop": "0.8em",
        },
        "[class~=\\"lead\\"]": Object {
          "fontSize": "1.2em",
          "lineHeight": "1.5",
          "marginBottom": "1em",
          "marginTop": "1em",
        },
        "blockquote": Object {
          "marginBottom": "1.6em",
          "marginTop": "1.6em",
          "paddingLeft": "1.0666667em",
        },
        "code": Object {
          "fontSize": "0.9em",
        },
        "figure": Object {
          "marginBottom": "2em",
          "marginTop": "2em",
        },
        "figure > *": Object {
          "marginBottom": "0",
          "marginTop": "0",
        },
        "figure figcaption": Object {
          "fontSize": "0.9em",
          "lineHeight": "1.5555556",
          "marginTop": "1em",
        },
        "fontSize": "1.25rem",
        "h1": Object {
          "fontSize": "2.8em",
          "lineHeight": "1",
          "marginBottom": "0.8571429em",
          "marginTop": "0",
        },
        "h2": Object {
          "fontSize": "1.8em",
          "lineHeight": "1.1111111",
          "marginBottom": "0.8888889em",
          "marginTop": "1.5555556em",
        },
        "h2 + *": Object {
          "marginTop": "0",
        },
        "h2 code": Object {
          "fontSize": "0.8611111em",
        },
        "h3": Object {
          "fontSize": "1.5em",
          "lineHeight": "1.3333333",
          "marginBottom": "0.6666667em",
          "marginTop": "1.6em",
        },
        "h3 + *": Object {
          "marginTop": "0",
        },
        "h3 code": Object {
          "fontSize": "0.9em",
        },
        "h4": Object {
          "lineHeight": "1.6",
          "marginBottom": "0.6em",
          "marginTop": "1.8em",
        },
        "h4 + *": Object {
          "marginTop": "0",
        },
        "hr": Object {
          "marginBottom": "2.8em",
          "marginTop": "2.8em",
        },
        "hr + *": Object {
          "marginTop": "0",
        },
        "img": Object {
          "marginBottom": "2em",
          "marginTop": "2em",
        },
        "li": Object {
          "marginBottom": "0.6em",
          "marginTop": "0.6em",
        },
        "lineHeight": "1.8",
        "ol": Object {
          "marginBottom": "1.2em",
          "marginTop": "1.2em",
        },
        "ol > li": Object {
          "paddingLeft": "1.8em",
        },
        "ol > li::before": Object {
          "left": "0",
        },
        "p": Object {
          "marginBottom": "1.2em",
          "marginTop": "1.2em",
        },
        "pre": Object {
          "borderRadius": "0.5rem",
          "fontSize": "0.9em",
          "lineHeight": "1.7777778",
          "marginBottom": "2em",
          "marginTop": "2em",
          "paddingBottom": "1.1111111em",
          "paddingLeft": "1.3333333em",
          "paddingRight": "1.3333333em",
          "paddingTop": "1.1111111em",
        },
        "table": Object {
          "fontSize": "0.9em",
          "lineHeight": "1.5555556",
        },
        "tbody td": Object {
          "paddingBottom": "0.8888889em",
          "paddingLeft": "0.6666667em",
          "paddingRight": "0.6666667em",
          "paddingTop": "0.8888889em",
        },
        "tbody td:first-child": Object {
          "paddingLeft": "0",
        },
        "tbody td:last-child": Object {
          "paddingRight": "0",
        },
        "thead th": Object {
          "paddingBottom": "0.8888889em",
          "paddingLeft": "0.6666667em",
          "paddingRight": "0.6666667em",
        },
        "thead th:first-child": Object {
          "paddingLeft": "0",
        },
        "thead th:last-child": Object {
          "paddingRight": "0",
        },
        "ul": Object {
          "marginBottom": "1.2em",
          "marginTop": "1.2em",
        },
        "ul > li": Object {
          "paddingLeft": "1.8em",
        },
        "ul > li::before": Object {
          "height": "0.35em",
          "left": "0.25em",
          "top": "calc(0.9em - 0.175em)",
          "width": "0.35em",
        },
        "ul ul, ul ol, ol ul, ol ol": Object {
          "marginBottom": "0.8em",
          "marginTop": "0.8em",
        },
        "video": Object {
          "marginBottom": "2em",
          "marginTop": "2em",
        },
      },
    }
  `)
})

it('should be possilbe to change the default className from `prose` to `markdown`', () => {
  expect(diffOnly({ className: 'markdown' })).toMatchInlineSnapshot(`
    "

        -   '.prose': Object {
        +   '.markdown': Object {
        
        ---
        
        -   '.prose-2xl': Object {
        +   '.markdown-2xl': Object {
        
        ---
        
        -   '.prose-lg': Object {
        +   '.markdown-lg': Object {
        
        ---
        
        -   '.prose-sm': Object {
        +   '.markdown-sm': Object {
        
        ---
        
        -   '.prose-xl': Object {
        +   '.markdown-xl': Object {

    "
  `)
})

it('should be possilbe to change the default modifiers', () => {
  expect(diffOnly({ modifiers: ['sm', 'lg', 'xl' /**, '2xl' */] })).toMatchInlineSnapshot(`
    "

        -   '.prose-2xl': Object {
        -     '> :first-child': Object {
        -       'marginTop': '0',
        -     },
        -     '> :last-child': Object {
        -       'marginBottom': '0',
        -     },
        -     '> ol > li > *:first-child': Object {
        -       'marginTop': '1.3333333em',
        -     },
        -     '> ol > li > *:last-child': Object {
        -       'marginBottom': '1.3333333em',
        -     },
        -     '> ul > li > *:first-child': Object {
        -       'marginTop': '1.3333333em',
        -     },
        -     '> ul > li > *:last-child': Object {
        -       'marginBottom': '1.3333333em',
        -     },
        -     '> ul > li p': Object {
        -       'marginBottom': '0.8333333em',
        -       'marginTop': '0.8333333em',
        -     },
        -     '[class~=\\\\'lead\\\\']': Object {
        -       'fontSize': '1.25em',
        -       'lineHeight': '1.4666667',
        -       'marginBottom': '1.0666667em',
        -       'marginTop': '1.0666667em',
        -     },
        -     'blockquote': Object {
        -       'marginBottom': '1.7777778em',
        -       'marginTop': '1.7777778em',
        -       'paddingLeft': '1.1111111em',
        -     },
        -     'code': Object {
        -       'fontSize': '0.8333333em',
        -     },
        -     'figure': Object {
        -       'marginBottom': '2em',
        -       'marginTop': '2em',
        -     },
        -     'figure > *': Object {
        -       'marginBottom': '0',
        -       'marginTop': '0',
        -     },
        -     'figure figcaption': Object {
        -       'fontSize': '0.8333333em',
        -       'lineHeight': '1.6',
        -       'marginTop': '1em',
        -     },
        -     'fontSize': '1.5rem',
        -     'h1': Object {
        -       'fontSize': '2.6666667em',
        -       'lineHeight': '1',
        -       'marginBottom': '0.875em',
        -       'marginTop': '0',
        -     },
        -     'h2': Object {
        -       'fontSize': '2em',
        -       'lineHeight': '1.0833333',
        -       'marginBottom': '0.8333333em',
        -       'marginTop': '1.5em',
        -     },
        -     'h2 + *': Object {
        -       'marginTop': '0',
        -     },
        -     'h2 code': Object {
        -       'fontSize': '0.875em',
        -     },
        -     'h3': Object {
        -       'fontSize': '1.5em',
        -       'lineHeight': '1.2222222',
        -       'marginBottom': '0.6666667em',
        -       'marginTop': '1.5555556em',
        -     },
        -     'h3 + *': Object {
        -       'marginTop': '0',
        -     },
        -     'h3 code': Object {
        -       'fontSize': '0.8888889em',
        -     },
        -     'h4': Object {
        -       'lineHeight': '1.5',
        -       'marginBottom': '0.6666667em',
        -       'marginTop': '1.6666667em',
        -     },
        -     'h4 + *': Object {
        -       'marginTop': '0',
        -     },
        -     'hr': Object {
        -       'marginBottom': '3em',
        -       'marginTop': '3em',
        -     },
        -     'hr + *': Object {
        -       'marginTop': '0',
        -     },
        -     'img': Object {
        -       'marginBottom': '2em',
        -       'marginTop': '2em',
        -     },
        -     'li': Object {
        -       'marginBottom': '0.5em',
        -       'marginTop': '0.5em',
        -     },
        -     'lineHeight': '1.6666667',
        -     'ol': Object {
        -       'marginBottom': '1.3333333em',
        -       'marginTop': '1.3333333em',
        -     },
        -     'ol > li': Object {
        -       'paddingLeft': '1.6666667em',
        -     },
        -     'ol > li::before': Object {
        -       'left': '0',
        -     },
        -     'p': Object {
        -       'marginBottom': '1.3333333em',
        -       'marginTop': '1.3333333em',
        -     },
        -     'pre': Object {
        -       'borderRadius': '0.5rem',
        -       'fontSize': '0.8333333em',
        -       'lineHeight': '1.8',
        -       'marginBottom': '2em',
        -       'marginTop': '2em',
        -       'paddingBottom': '1.2em',
        -       'paddingLeft': '1.6em',
        -       'paddingRight': '1.6em',
        -       'paddingTop': '1.2em',
        -     },
        -     'table': Object {
        -       'fontSize': '0.8333333em',
        -       'lineHeight': '1.4',
        -     },
        -     'tbody td': Object {
        -       'paddingBottom': '0.8em',
        -       'paddingLeft': '0.6em',
        -       'paddingRight': '0.6em',
        -       'paddingTop': '0.8em',
        -     },
        -     'tbody td:first-child': Object {
        -       'paddingLeft': '0',
        -     },
        -     'tbody td:last-child': Object {
        -       'paddingRight': '0',
        -     },
        -     'thead th': Object {
        -       'paddingBottom': '0.8em',
        -       'paddingLeft': '0.6em',
        -       'paddingRight': '0.6em',
        -     },
        -     'thead th:first-child': Object {
        -       'paddingLeft': '0',
        -     },
        -     'thead th:last-child': Object {
        -       'paddingRight': '0',
        -     },
        -     'ul': Object {
        -       'marginBottom': '1.3333333em',
        -       'marginTop': '1.3333333em',
        -     },
        -     'ul > li': Object {
        -       'paddingLeft': '1.6666667em',
        -     },
        -     'ul > li::before': Object {
        -       'height': '0.3333333em',
        -       'left': '0.25em',
        -       'top': 'calc(0.8333333em - 0.1666667em)',
        -       'width': '0.3333333em',
        -     },
        -     'ul ul, ul ol, ol ul, ol ol': Object {
        -       'marginBottom': '0.6666667em',
        -       'marginTop': '0.6666667em',
        -     },
        -     'video': Object {
        -       'marginBottom': '2em',
        -       'marginTop': '2em',
        -     },
        -   },

    "
  `)
})

it('should be possilbe to change the default modifiers and change the className', () => {
  expect(diffOnly({ modifiers: [, /** 'sm', */ 'lg', 'xl', '2xl'], className: 'markdown' }))
    .toMatchInlineSnapshot(`
    "

        -   '.prose': Object {
        +   '.markdown': Object {
        
        ---
        
        -   '.prose-2xl': Object {
        +   '.markdown-2xl': Object {
        
        ---
        
        -   '.prose-lg': Object {
        +   '.markdown-lg': Object {
        
        ---
        
        -     },
        -   },
        -   '.prose-sm': Object {
        -     '> :first-child': Object {
        -       'marginTop': '0',
        -     },
        -     '> :last-child': Object {
        -       'marginBottom': '0',
        -     },
        -     '> ol > li > *:first-child': Object {
        -       'marginTop': '1.1428571em',
        -     },
        -     '> ol > li > *:last-child': Object {
        -       'marginBottom': '1.1428571em',
        -     },
        -     '> ul > li > *:first-child': Object {
        -       'marginTop': '1.1428571em',
        -     },
        -     '> ul > li > *:last-child': Object {
        -       'marginBottom': '1.1428571em',
        -     },
        -     '> ul > li p': Object {
        -       'marginBottom': '0.5714286em',
        -       'marginTop': '0.5714286em',
        -     },
        -     '[class~=\\\\'lead\\\\']': Object {
        -       'fontSize': '1.2857143em',
        -       'lineHeight': '1.5555556',
        -       'marginBottom': '0.8888889em',
        -       'marginTop': '0.8888889em',
        
        ---
        
        -     'blockquote': Object {
        -       'marginBottom': '1.3333333em',
        -       'marginTop': '1.3333333em',
        -       'paddingLeft': '1.1111111em',
        -     },
        -     'code': Object {
        -       'fontSize': '0.8571429em',
        
        ---
        
        -     'figure': Object {
        -       'marginBottom': '1.7142857em',
        -       'marginTop': '1.7142857em',
        -     },
        -     'figure > *': Object {
        -       'marginBottom': '0',
        -       'marginTop': '0',
        -     },
        -     'figure figcaption': Object {
        -       'fontSize': '0.8571429em',
        -       'lineHeight': '1.3333333',
        -       'marginTop': '0.6666667em',
        -     },
        -     'fontSize': '0.875rem',
        -     'h1': Object {
        -       'fontSize': '2.1428571em',
        -       'lineHeight': '1.2',
        -       'marginBottom': '0.8em',
        -       'marginTop': '0',
        -     },
        -     'h2': Object {
        -       'fontSize': '1.4285714em',
        -       'lineHeight': '1.4',
        -       'marginBottom': '0.8em',
        -       'marginTop': '1.6em',
        -     },
        -     'h2 + *': Object {
        -       'marginTop': '0',
        -     },
        -     'h2 code': Object {
        -       'fontSize': '0.9em',
        -     },
        -     'h3': Object {
        -       'fontSize': '1.2857143em',
        -       'lineHeight': '1.5555556',
        -       'marginBottom': '0.4444444em',
        -       'marginTop': '1.5555556em',
        -     },
        -     'h3 + *': Object {
        -       'marginTop': '0',
        -     },
        -     'h3 code': Object {
        -       'fontSize': '0.8888889em',
        -     },
        -     'h4': Object {
        -       'lineHeight': '1.4285714',
        -       'marginBottom': '0.5714286em',
        -       'marginTop': '1.4285714em',
        -     },
        -     'h4 + *': Object {
        -       'marginTop': '0',
        -     },
        -     'hr': Object {
        -       'marginBottom': '2.8571429em',
        -       'marginTop': '2.8571429em',
        -     },
        -     'hr + *': Object {
        -       'marginTop': '0',
        -     },
        -     'img': Object {
        -       'marginBottom': '1.7142857em',
        -       'marginTop': '1.7142857em',
        -     },
        -     'li': Object {
        -       'marginBottom': '0.2857143em',
        -       'marginTop': '0.2857143em',
        -     },
        -     'lineHeight': '1.7142857',
        -     'ol': Object {
        -       'marginBottom': '1.1428571em',
        -       'marginTop': '1.1428571em',
        -     },
        -     'ol > li': Object {
        -       'paddingLeft': '1.5714286em',
        -     },
        -     'ol > li::before': Object {
        -       'left': '0',
        -     },
        -     'p': Object {
        -       'marginBottom': '1.1428571em',
        -       'marginTop': '1.1428571em',
        -     },
        -     'pre': Object {
        -       'borderRadius': '0.25rem',
        -       'fontSize': '0.8571429em',
        -       'lineHeight': '1.6666667',
        -       'marginBottom': '1.6666667em',
        -       'marginTop': '1.6666667em',
        -       'paddingBottom': '0.6666667em',
        -       'paddingLeft': '1em',
        -       'paddingRight': '1em',
        -       'paddingTop': '0.6666667em',
        -     },
        -     'table': Object {
        -       'fontSize': '0.8571429em',
        -       'lineHeight': '1.5',
        -     },
        -     'tbody td': Object {
        -       'paddingBottom': '0.6666667em',
        -       'paddingLeft': '1em',
        -       'paddingRight': '1em',
        -       'paddingTop': '0.6666667em',
        -     },
        -     'tbody td:first-child': Object {
        -       'paddingLeft': '0',
        -     },
        -     'tbody td:last-child': Object {
        -       'paddingRight': '0',
        -     },
        -     'thead th': Object {
        -       'paddingBottom': '0.6666667em',
        -       'paddingLeft': '1em',
        -       'paddingRight': '1em',
        -     },
        -     'thead th:first-child': Object {
        -       'paddingLeft': '0',
        -     },
        -     'thead th:last-child': Object {
        -       'paddingRight': '0',
        -     },
        -     'ul': Object {
        -       'marginBottom': '1.1428571em',
        -       'marginTop': '1.1428571em',
        -     },
        -     'ul > li': Object {
        -       'paddingLeft': '1.5714286em',
        -     },
        -     'ul > li::before': Object {
        -       'height': '0.3571429em',
        -       'left': '0.2142857em',
        -       'top': 'calc(0.8571429em - 0.1785714em)',
        -       'width': '0.3571429em',
        -     },
        -     'ul ul, ul ol, ol ul, ol ol': Object {
        -       'marginBottom': '0.5714286em',
        -       'marginTop': '0.5714286em',
        -     },
        -     'video': Object {
        -       'marginBottom': '1.7142857em',
        -       'marginTop': '1.7142857em',
        -     },
        -   },
        -   '.prose-xl': Object {
        +   '.markdown-xl': Object {

    "
  `)
})

it('should be possible to add a new variant', () => {
  expect(
    diffOnly(
      {},
      {
        dark: {
          css: [{ color: 'black', maxWidth: '65ch' }],
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

        +   '.prose-dark': Object {
        +     'color': 'black',
        +     'maxWidth': '65ch',
        +   },

    "
  `)
})

it('should be possible to merge values', () => {
  expect(
    diffOnly(
      {},
      {
        DEFAULT: {
          css: [{ a: { backgroundColor: 'red' } }, { a: { color: 'green' } }],
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

        -       'color': '#18181b',
        +       'backgroundColor': 'red',
        +       'color': 'green',

    "
  `)
})

it('should be possible to only update a single value from an existing definition', () => {
  expect(
    diffOnly(
      {},
      {
        DEFAULT: {
          css: {
            blockquote: {
              fontWeight: '600',
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

        -       'fontWeight': '500',
        +       'fontWeight': '600',

    "
  `)
})

it('should be possible to only update a single value from a different modifier', () => {
  expect(
    diffOnly(
      {},
      {
        sm: {
          css: {
            blockquote: {
              fontWeight: '600',
            },
          },
        },
      }
    )
  ).toMatchInlineSnapshot(`
    "

        +       'fontWeight': '600',

    "
  `)
})
