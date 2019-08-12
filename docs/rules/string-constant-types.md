# Enforce string constants are explicitly typed
# string-constant-types

This rule enforces exported string constants are explicitly typed if they are in a flow annotated file.

This is important when creating enums of string values, as omitting even one type reverts the type to `string` (`'foo' | 'bar' | string` -> `string`)

## Examples of incorrect code for this rule:

```js
/* eslint saxo/string-constant-types: "error" */
// @flow
export const foo = 'foo'
```

## Examples of correct code for this rule:

```js
/* eslint saxo/string-constant-types: "error" */
/* eslint-disable flowtype/require-valid-file-annotation */
export const foo = 'foo'
```

```js
/* eslint saxo/string-constant-types: "error" */
// @flow
export const foo: 'foo' = 'foo'
```

```js
/* eslint saxo/string-constant-types: "error" */

const foo = 'foo'
```