# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Nothing yet!

## [0.5.15] - 2024-08-28

### Fixed

- Support installing with alpha versions of Tailwind CSS v4 ([#358](https://github.com/tailwindlabs/tailwindcss-typography/pull/358))

## [0.5.14] - 2024-08-07

### Fixed

- Fix table text alignment ([#346](https://github.com/tailwindlabs/tailwindcss-typography/pull/346))

## [0.5.13] - 2024-04-26

### Fixed

- Don't apply margins to `<br>` elements contained in an `<li>` in FF ([#350](https://github.com/tailwindlabs/tailwindcss-typography/pull/350))

## [0.5.12] - 2024-03-27

### Added

- Use logical properties for better RTL support ([#323](https://github.com/tailwindlabs/tailwindcss-typography/pull/323))

## [0.5.11] - 2024-03-26

### Added

- Add `prose-kbd` modifier ([#340](https://github.com/tailwindlabs/tailwindcss-typography/pull/340))

### Fixed

- Fix space between `<figcaption>` and `<video>` ([#339](https://github.com/tailwindlabs/tailwindcss-typography/pull/339))

## [0.5.10] - 2023-09-05

### Fixed

- Fix space between `<figcaption>` and `<pre>` ([#313](https://github.com/tailwindlabs/tailwindcss-typography/pull/313))
- Remove typography styles from `not-prose` elements in addition to their children ([#301](https://github.com/tailwindlabs/tailwindcss-typography/pull/301))
- Add `<picture>` styles ([#314](https://github.com/tailwindlabs/tailwindcss-typography/pull/314))
- Fix `prose-invert` when used with colors in light mode ([#315](https://github.com/tailwindlabs/tailwindcss-typography/pull/315))
- Add `<kbd>` styles ([#317](https://github.com/tailwindlabs/tailwindcss-typography/pull/317))
- Add description list (`<dl>`, `<dt>`, `<dd>`) styles ([#316](https://github.com/tailwindlabs/tailwindcss-typography/pull/316))

## [0.5.9] - 2023-01-10

### Fixed

- Ensure `p` styles are inserted before `.lead` styles ([#294](https://github.com/tailwindlabs/tailwindcss-typography/pull/294))

## [0.5.8] - 2022-11-07

### Fixed

- Fix selector when using a non-default class (e.g. `prose-sm`) ([#289](https://github.com/tailwindlabs/tailwindcss-typography/pull/289))

## [0.5.7] - 2022-09-02

### Fixed

- Update TypeScript types ([#284](https://github.com/tailwindlabs/tailwindcss-typography/pull/284))

## [0.5.6] - 2022-09-01

- Actually publish types ([a54c1a8](https://github.com/tailwindlabs/tailwindcss-typography/commit/a54c1a82a64efdf23aab57e62edaa369d1a857f1))

## [0.5.5] - 2022-09-01

### Added

- Add typescript types ([#283](https://github.com/tailwindlabs/tailwindcss-typography/pull/283))

## [0.5.4] - 2022-07-12

### Fixed

- Update `strong` and `code` color styles to inherit from parent ([#276](https://github.com/tailwindlabs/tailwindcss-typography/pull/276))

## [0.5.3] - 2022-07-07

### Added

- Add styles for `tfoot` elements ([#243](https://github.com/tailwindlabs/tailwindcss-typography/pull/243))
- Add `prose-h5` and `prose-h6` variants ([#273](https://github.com/tailwindlabs/tailwindcss-typography/pull/273))

### Fixed

- Fix prose elements `legacy` mode ([#259](https://github.com/tailwindlabs/tailwindcss-typography/pull/259))
- Allow `lead` class to override element styles ([#260](https://github.com/tailwindlabs/tailwindcss-typography/pull/260))
- Fix generation of `prose-headings` variant ([#264](https://github.com/tailwindlabs/tailwindcss-typography/pull/264))
- Fix `figure` spacing ([#267](https://github.com/tailwindlabs/tailwindcss-typography/pull/267))
- Fix child combinator `:where` selectors ([#268](https://github.com/tailwindlabs/tailwindcss-typography/pull/267))
- Fix `prose-headings` variant to include `h5` and `h6` elements ([#273](https://github.com/tailwindlabs/tailwindcss-typography/pull/273))

## [0.5.2] - 2022-02-14

### Fixed

- Ensure nested selectors using `&:hover` work ([#246](https://github.com/tailwindlabs/tailwindcss-typography/pull/246))

## [0.5.1] - 2022-01-28

### Removed

- Remove `dist` folder and related dependencies ([#226](https://github.com/tailwindlabs/tailwindcss-typography/pull/226))

### Fixed

- Don't generate invalid CSS when given an array of property values ([#224](https://github.com/tailwindlabs/tailwindcss-typography/pull/224))

## [0.5.0] - 2021-12-09

## [0.5.0-alpha.3] - 2021-11-08

### Changes

- Use `:where` to reduce specificity, making it possible to override prose children with utilities ([#203](https://github.com/tailwindlabs/tailwindcss-typography/pull/203))
- Support "undoing" prose styles using the `not-prose` class on a group of child elements ([#205](https://github.com/tailwindlabs/tailwindcss-typography/pull/205))
- Update color palette for v3 ([#206](https://github.com/tailwindlabs/tailwindcss-typography/pull/206))
- Improve customization API, add alternate grays, add dark mode support, use `::marker` instead of pseudo-elements, and add child element variants (eg. `prose-h1:underline`)([#216](https://github.com/tailwindlabs/tailwindcss-typography/pull/216))

## [0.5.0-alpha.2] - 2021-11-08

## [0.5.0-alpha.1] - 2021-11-08

## [0.4.1] - 2021-05-24

### Fixed

- Fix list-style modifier selectors ([#137](https://github.com/tailwindlabs/tailwindcss-typography/pull/137))

## [0.4.0] - 2021-01-15

### Fixed

- Colors without `600` variant, breaks everything (#107)
- Fix empty line in firefox for `pre code` tags (#125)

### Added

- Add support for the `start` and `reversed` attribute on `ol` elements (#110)
- Add support for the `type` on `ul` and `ol` elements (#126)

### Changed (internal)

- Bumped dependencies (#103, #115)
- Cleanup/improve readme (#95)
- Reduce package size (#112)

## [0.3.0] - 2020-11-20

## Changed

- Add support for Tailwind CSS v2.0 and drops support for v1.0 (#79, #82, #87)
- Use `extend` for any overrides, assigning directly to `theme.typography` now completely overrides default configuration
- Consistently use `::before` instead of `:before` ([ba33d77](https://github.com/tailwindlabs/tailwindcss-typography/commit/ba33d77f25ab0c239edd7d425349c86f317061e2))
- Read color values from the user's theme instead of only the default theme

## Added

- Add new `className` option for overriding `prose` class (#28)
- Add color modifiers by default like `prose-blue` for setting link styles (#92)

## [0.2.0] - 2020-07-15

### Changes

- Switches how variants are generated to use the new component variants API in Tailwind 1.5, dropping support for Tailwind < 1.5

## [0.1.4] - 2020-07-15

### Fixes

- Fixes an issue where the `lead` class was not being applied correctly when used in conjunction with responsive variants

## [0.1.3] - 2020-07-14

### Fixes

- Fixes an issue where the configured monospace font family was not used by default for `pre` and `code` blocks

## [0.1.2] - 2020-07-14

### Fixes

- Fixes an issue in our internal rounding logic that would round values like `20` to `2` 👀

## [0.1.1] - 2020-07-14

### Fixes

- Fixes an issue where the plugin was totally broken and didn't work at all because I deleted some code without even testing my changes 🧠

## [0.1.0] - 2020-07-14

### Added

- Everything!

[unreleased]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.15...HEAD
[0.5.15]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.14...v0.5.15
[0.5.14]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.13...v0.5.14
[0.5.13]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.12...v0.5.13
[0.5.12]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.11...v0.5.12
[0.5.11]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.10...v0.5.11
[0.5.10]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.9...v0.5.10
[0.5.9]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.8...v0.5.9
[0.5.8]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.7...v0.5.8
[0.5.7]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.6...v0.5.7
[0.5.6]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.5...v0.5.6
[0.5.5]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.4...v0.5.5
[0.5.4]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.3...v0.5.4
[0.5.3]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.2...v0.5.3
[0.5.2]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.0-alpha.3...v0.5.0
[0.5.0-alpha.3]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.0-alpha.2...v0.5.0-alpha.3
[0.5.0-alpha.2]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.0-alpha.1...v0.5.0-alpha.2
[0.5.0-alpha.1]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.4.1...v0.5.0-alpha.1
[0.4.1]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.1.4...v0.2.0
[0.1.4]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/tailwindlabs/tailwindcss-typography/releases/tag/v0.1.0
