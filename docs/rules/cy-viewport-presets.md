# Enforce specific cypress viewport presets
# cy-viewport-presets

This rule enforces the use of specific presets when setting cypress viewport, or disallows them entirely.

## Rule Details

Examples of incorrect code for this rule:

```js
/*eslint saxo/cy-viewport-presets: ["error", ['phone', 'tablet', 'desktop']]*/
cy.viewport('phone', 'landscape');
```

```js
/*eslint saxo/cy-viewport-presets: ["error", ['tablet']]*/
cy.viewport('tablet');
```

Examples of correct code for this rule:

```js
/*eslint saxo/cy-viewport-presets: ["error", ['phone', 'tablet', 'desktop']]*/
cy.viewport('iphone-6');
```

```js
/*eslint saxo/cy-viewport-presets: ["error"]*/
cy.viewport('phone');
```

## Options
This rule has an array option containing the allowed presets. If none are defined no presets will be allowed.
