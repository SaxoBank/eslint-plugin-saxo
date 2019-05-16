# Enforce specific cypress viewport presets
# cy-viewport-presets

This rule enforces the use of specific presets when setting cypress viewport, or disallows them entirely.

## Rule Details

Examples of incorrect code for this rule:
```js
/*eslint saxo/cy-viewport-presets: ["error", { allowed: ['phone', 'tablet', 'desktop'] }*/
cy.viewport('iphone-6');
```

```js
/*eslint saxo/cy-viewport-presets: "error"*/
cy.viewport('phone');
```

Examples of correct code for this rule:
```js
/*eslint saxo/cy-viewport-presets: ["error", { allowed: ['phone', 'tablet', 'desktop'] }*/
cy.viewport('phone', 'landscape');
```

```js
/*eslint saxo/cy-viewport-presets: ["error", { allowed: ['tablet'] }*/
cy.viewport('tablet');
```


## Options
This rule has an object option, containing one property. 

'allowed' contains the presets to enforce. If the array is empty, presets are disallowed.
