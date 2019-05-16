# Disallow identifiers as cypress viewport parameters
# cy-viewport-no-identifiers

This rule disallows the use of identifiers when setting cypress viewport.

## Rule Details

Examples of incorrect code for this rule:
```js
/*eslint saxo/cy-viewport-no-identifiers: "error"*/
cy.viewport(height, 1260);
```

```js
/*eslint saxo/cy-viewport-no-identifiers: "error"*/
cy.viewport(preset, 'landscape');
```

```js
/*eslint saxo/cy-viewport-no-identifiers: "error"*/
cy.viewport('macbook-13', orientation);
```


Examples of correct code for this rule:
```js
/*eslint saxo/cy-viewport-no-identifiers: "error"*/
cy.viewport('macbook-13', 'landscape', options);
```

```js
/*eslint saxo/cy-viewport-no-identifiers: "error"*/
cy.viewport(1600, 1160, options);
```

```js
/*eslint saxo/cy-viewport-no-identifiers: "error"*/
cy.viewport('macbook-13');
```
