# Enforce string constants are explicitly typed
# string-constant-types

This rule enforces exported string constants are explicitly typed if they are in a flow annotated file.

This is important when creating enums of string values, as omitting even one type reverts the type to `string` (`'foo' | 'bar' | string` -> `string`)

## Examples of incorrect code for this rule:

❌ Exported string constants that aren't typed

```js
// @flow
/* eslint saxo/string-constant-types: "error" */
export const foo = 'foo'
```

## Examples of correct code for this rule:

✅ Exported string constants that aren't typed, but are in a non flow annotated file

```js
/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint saxo/string-constant-types: "error" */
export const foo = 'foo'
```

✅ Already typed exported constants

```js
// @flow
/* eslint saxo/string-constant-types: "error" */
export const foo: 'foo' = 'foo'
```

✅ Non exported constants

```js
// @flow
/* eslint saxo/string-constant-types: "error" */
const foo = 'foo'
```