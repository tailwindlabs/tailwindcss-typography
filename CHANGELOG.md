# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add styles for `tfoot` elements ([#243](https://github.com/tailwindlabs/tailwindcss-typography/pull/243))

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

[unreleased]: https://github.com/tailwindlabs/tailwindcss-typography/compare/v0.5.2...HEAD
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
