# Enforce using `yield*` to delegate to other sagas
# saga-direct-delegation

This rule enforces that delegation to sagas is done directly using `yield*`, rather than indirectly by plain `yield` of the returned generator to the saga middleware.

This has the benefit of maintaining the delegator (caller) on the call stack, which aids debugging and gives better error stack traces. When a saga is being run by the middleware, both delegation methods are otherwise equivalent.

The rule is autofixable. You should read this page in full before autofixing an existing codebase.

## Examples of incorrect code for this rule:

❌ Delegations not using `yield*`, where the callee is in the same file and accessed by identifier

```js
/* eslint saxo/saga-direct-delegation: "error" */
function* delegate() {}

function* caller() {
    yield delegate();
}
```

## Examples of incorrect code that this rule does not currently detect:

👎 Delegations not using `yield*`, where the callee is imported from from another file

```js
/* eslint saxo/saga-direct-delegation: "error" */
import delegate from './sagas';

function* caller() {
    yield delegate();
}
```

👎 Delegations not using `yield*`, where the callee is not accessed by identifier

```js
/* eslint saxo/saga-direct-delegation: "error" */
const obj = {
    delegate: function* () {}
};

function* caller() {
    yield obj.delegate();
}
```

## Examples of correct code for this rule:

✅ Delegations already using `yield*`

```js
/* eslint saxo/saga-direct-delegation: "error" */
function* delegate() {}

function* caller() {
    yield* delegate();
}
```

## When not to use it
If you are using an [effect middleware](https://redux-saga.js.org/docs/advanced/Testing.html#effectmiddlwares), for example to test your sagas.

## Implications on unit testing of using `yield*`
When a saga delegates to a nested saga using `yield*`, it behaves as one saga. Tests that manually drive such sagas step-by-step using `next()` will not receive the nested saga, so no longer have the opportunity to "step over" them (by discarding), or to pass a mock value to the following call to `next()`. As an alternative, mock the nested saga at the start of the test. For new tests, consider techniques other than manually driving sagas.

A `yield*` expression can only delegate to a generator (or other iterable object). This demands that generator functions be mocked using generator functions. When existing code is changed to use `yield*` instead of `yield`, tests which mock generators using plain functions must be updated.
