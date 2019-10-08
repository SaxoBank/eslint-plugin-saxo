# Enforce using `yield*` to delegate to other sagas
# saga-direct-delegation

This rule enforces that delegation to sagas is done directly using `yield*`, rather than indirectly by plain `yield` of the returned iterator to the saga middleware.

This has the benefit of maintaining the delegator (caller) on the call stack, which aids debugging and gives better error stack traces.

The rule is autofixable.

## Examples of incorrect code for this rule:

❌ Delegations not using `yield*`, where the callee is in the same file and accessed by identifier

```js
/* eslint saxo/saga-direct-delegation: "error" */
function* delegate() {}

function* caller() {
    yield delegate();
}
```

## Examples of correct code for this rule:

✅ Delegations not using `yield*`, where the callee is imported from from another file

```js
/* eslint saxo/saga-direct-delegation: "error" */
import delegate from './sagas';

function* caller() {
    yield delegate();
}
```

✅ Delegations not using `yield*`, where the callee is not accessed by identifier

```js
/* eslint saxo/saga-direct-delegation: "error" */
const obj = {
    delegate: function* () {}
};

function* caller() {
    yield obj.delegate();
}
```

✅ Delegations already using `yield*`

```js
/* eslint saxo/saga-direct-delegation: "error" */
function* delegate() {}

function* caller() {
    yield* delegate();
}
```
