# logevent-literal-max-len

This rule ensures logged event does not exceed 50 characters.

## Rule Details

Examples of incorrect code for this rule:

```js
/*eslint saxo/logevent-literal-max-len: "error"*/
featureTracker.logEvent(
    AREA,
    'This string contains more characters than it should, which is 50 at the moment'
);
```

```js
/*eslint saxo/logevent-literal-max-len: "error"*/
logEvent(
    AREA,
    'This string contains more characters than it should, which is 50 at the moment'
);
```

Examples of correct code for this rule:

```js
/*eslint saxo/logevent-literal-max-len: "error"*/
featureTracker.logEvent(AREA, 'Event occurred');
```

```js
/*eslint saxo/logevent-literal-max-len: "error"*/
logEvent(AREA, 'Event occurred', options);
```
