# no-cy-pause

[`cy.pause()`](https://docs.cypress.io/api/commands/pause.html) is a useful command that stops other `cy` commands from running and allows interaction with the application.

While useful, this is generally only something we want to use during debugging and not something to be merged.

This rule, when enabled, will simply error when it encounters `cy.pause()` or when used in a chain, `cy.get(...).pause()`

## Rule Details

The following patterns are considered problems:

```js
/* eslint saxo/no-cy-pause: "error" */
cy.pause()
```

```js
/* eslint saxo/no-cy-pause: "error" */

cy
  .foo()
  .pause()
```

```js
/* eslint saxo/no-cy-pause: "error" */

cy
  .foo()
  .bar()
  .pause()
```