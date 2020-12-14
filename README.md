<p>
  <img alt="Tailwind CSS Typography" width="350" src="./.github/logo.svg">
</p>

**As of v0.3.0, @tailwindcss/typography is designed for Tailwind CSS v2.0+.**

A plugin that provides a set of `prose` classes you can use to add beautiful typographic defaults to any vanilla HTML you don't control (like HTML rendered from Markdown, or pulled from a CMS).

[View live demo](https://tailwindcss-typography.netlify.app/)

```html
<article class="prose lg:prose-xl">
  {{ markdown }}
</article>
```

## Installation

Install the plugin from npm:

```sh
# Using npm
npm install @tailwindcss/typography

# Using Yarn
yarn add @tailwindcss/typography
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

### Using a CDN

If you need to pull in these styles via CDN, you can do so using services like UNPKG or jsDeliver:

```html
<!-- From UNPKG -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@tailwindcss/typography@0.2.x/dist/typography.min.css"
/>

<!-- From jsDelivr -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.2.x/dist/typography.min.css"
/>
```

To use these styles alongside the rest of Tailwind via CDN, we recommend pulling in each layer separately so you can put the styles in the correct order:

```html
<link rel="stylesheet" href="https://unpkg.com/tailwindcss@^1.5/dist/base.min.css" />
<link rel="stylesheet" href="https://unpkg.com/tailwindcss@^1.5/dist/components.min.css" />
<link
  rel="stylesheet"
  href="https://unpkg.com/@tailwindcss/typography@0.2.x/dist/typography.min.css"
/>
<link rel="stylesheet" href="https://unpkg.com/tailwindcss@^1.5/dist/utilities.min.css" />
```

## Usage

Now you can use the `prose` classes to add sensible typography styles to any vanilla HTML:

```html
<article class="prose lg:prose-xl">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread with cheese to their
    children, with the food earning such an iconic status in our culture that kids will often dress
    up as warm, cheesy loaf for Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
    springing up around the country.
  </p>
  <!-- ... -->
</article>
```

### Size modifiers

Size modifiers allow you to adjust the overall size of your typography for different contexts.

```html
<article class="prose prose-xl">
  {{ markdown }}
</article>
```

Five different typography sizes are included out of the box:

| Class       |  Body font size |
| ----------- | --------------: |
| `prose-sm`  | 0.875rem (14px) |
| `prose`     |     1rem (16px) |
| `prose-lg`  | 1.125rem (18px) |
| `prose-xl`  |  1.25rem (20px) |
| `prose-2xl` |   1.5rem (24px) |

Everything about the provided size modifiers has been hand-tuned to look as beautiful as possible, including the relationships between font sizes, heading spacing, code block padding, etc. Just like the Tailwind color palettes, none of these styles are based on naive mathematical formulas, and have been hand-crafted by professional designers.

Size modifiers are designed to be used with the [multi-class modifier pattern](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/#component-modifiers) and **must be used in conjunction with the base `prose` class**:

```html
<!-- Will not work -->
<article class="prose-lg">
  {{ markdown }}
</article>

<!-- Always add the `prose` class -->
<article class="prose prose-lg">
  {{ markdown }}
</article>
```

### Color modifiers

Color modifiers allow you to "brand" your typography sections by changing the link color. By default, modifiers are generated for every color in your color palette that include a `600` shade except for `gray` since it's the default.

```html
<article class="prose prose-indigo">
  {{ markdown }}
</article>
```

Here are the classes that are generated using a totally default Tailwind CSS v2.0 build:

| Class          | Link color   |
| -------------- | ------------ |
| `prose-red`    | `red.600`    |
| `prose-yellow` | `yellow.600` |
| `prose-green`  | `green.600`  |
| `prose-blue`   | `blue.600`   |
| `prose-indigo` | `indigo.600` |
| `prose-purple` | `purple.600` |
| `prose-pink`   | `pink.600`   |

For more control, use the [low-level customization API](#customization).

### Responsive variants

None of the sizes are automatically responsive, but responsive variants are provided for each size modifier so you can easily change the typography size at different breakpoints:

```html
<article class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
  {{ markdown }}
</article>
```


## Customization

> The customization API is currently extremely low-level in order to be as flexible as possible. We will be introducing higher-level configuration options over time as we learn what types of customizations are most common.

To customize the styles provided by this plugin, add your overrides under the `typography` key in the `theme` section of your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

Like with all theme customizations in Tailwind, you can also define the `typography` key as a function if you need access to the `theme` helper:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),

            // ...
          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

Customizations should be applied to a specific modifier like `DEFAULT` or `xl`, and must be added under the `css` property. Customizations are authored in the same [CSS-in-JS syntax](https://tailwindcss.com/docs/plugins#css-in-js-syntax) used to write Tailwind plugins.

It's important to note that all customizations are **merged** with the defaults. If you'd like to completely override a provided size modifier, you can do so by disabling that modifier so the default styles are not included.

See [the default styles](./src/styles.js) for this plugin for more in-depth examples of configuring each modifier.

### Customizing shared styles

Many styles _(for example colors, font weight, and text decoration)_ are shared between all size modifiers, and are therefore defined only for the `DEFAULT` modifier, since modifiers are designed to be used with the [multi-class modifier pattern](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/#component-modifiers).

If you'd like to customize these sorts of styles, do so using the `DEFAULT` modifier:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            strong: {
              fontWeight: '800',
            },
            // ...
          },
        },
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

### Adding new modifiers

You can add a new modifier by creating a new key in the `typography` section of your theme and providing your own styles under the `css` key:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      typography: {
        '3xl': {
          css: {
            fontSize: '1.875rem',
            h1: {
              fontSize: '4rem',
            },
            // ...
          },
        },
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

### Overriding max-width

Each size modifier comes with a baked in `max-width` designed to keep the content as readable as possible. This isn't always what you want though, and sometimes you'll want the content to just fill the width of its container.

In those cases, all you need to do is add `max-w-none` to your content to override the embedded max-width:

```html
<div class="grid grid-cols-4">
  <div class="col-span-1">
    <!-- ... -->
  </div>
  <div class="col-span-3">
    <article class="prose max-w-none">
      {{ markdown }}
    </article>
  </div>
</div>
```

### Disabling size modifiers

If you'd like to completely disable any size modifiers (either for file size reasons or because you'd like to completely redefine that modifier), you can do so using the `modifiers` option when including the plugin:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography')({
      modifiers: ['sm', 'lg'],
    }),
    // ...
  ],
}
```

This option acts as a _safelist_, so you can list only the modifiers you'd actually like included and the others will be removed.

The `DEFAULT` modifier is always included and cannot be disabled.

### Disabling responsive variants

If you'd like to disable the responsive variants for any reason, you can do so by setting the `typography` key to an empty array in the `variants` section of your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
  variants: {
    typography: [],
  },
}
```
