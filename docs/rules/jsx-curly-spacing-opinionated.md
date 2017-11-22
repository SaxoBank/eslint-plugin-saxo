# jsx-curly-spacing-opinionated

eslint-plugin-react has a rule that allows enforcing spacing for jsx curlies, but whilst quite configurable it doesn't fit the
coding standard we've used for some time in Saxo. So this opinionated rule defines how they should be formatted.

## Rule Details

The following patterns are considered problems:

```js
/*eslint saxo/jsx-curly-spacing-opinionated: "error"*/

<App foo={ bar }>{ bar }</App>;
```

```js
/*eslint saxo/jsx-curly-spacing-opinionated: "error"*/

<App>{ { bar: true, baz: true } }</App>
```

```js
/*eslint saxo/jsx-curly-spacing-opinionated: "error"*/

<App>
{true &&
   <a></a>}
</App>
```

The following patterns are not considered warnings:

```js
/*eslint saxo/jsx-curly-spacing-opinionated: "error"*/

<App foo={bar}>{bar}</App>;
```

```js
/*eslint saxo/jsx-curly-spacing-opinionated: "error"*/

<App>{{ bar: true, baz: true }}</App>
```

```js
/*eslint saxo/jsx-curly-spacing-opinionated: "error"*/

<App>
{true &&
   <a></a>
}
</App>
```
