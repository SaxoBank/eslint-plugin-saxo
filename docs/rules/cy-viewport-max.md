# Enforce a limit on cypress viewport size
# cy-viewport-max

This rule enforces a limit on cypress viewport size. It does not account for identifiers.

## Rule Details

Examples of incorrect code for this rule:

```js
/*eslint saxo/cy-viewport-max: ["error", { maxHeight: 1600, maxWidth: 1160 }]*/
cy.viewport(1600, 1260);
```

```js
/*eslint saxo/cy-viewport-max: ["error", { maxHeight: 1600 }]*/
cy.viewport(1700, 1160);
```

```js
/*eslint saxo/cy-viewport-max: ["error", { maxWidth: 1160 }]*/
cy.viewport(1600, 1700);
```

Examples of correct code for this rule:

```js
/*eslint saxo/cy-viewport-max: ["error", { maxHeight: 1600, maxWidth: 1160 }]*/
cy.viewport(1600, 1160);
```

```js
/*eslint saxo/cy-viewport-max: ["error", { maxHeight: 1600 }]*/
cy.viewport(1600, 1160);
```

```js
/*eslint saxo/cy-viewport-max: ["error", { maxWidth: 1160 }]*/
cy.viewport(1600, 1160);
```

## Options
This rule has an object option, containing two properties.

'maxHeight' enforces a limit on the height of the viewport.
'maxWidth' enforces a limit on the width of the viewport.
