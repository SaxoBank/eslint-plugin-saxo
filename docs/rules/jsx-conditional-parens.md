# jsx-conditional-parens

When using conditionals inside JSX, this rule enforces no gratuitous parenthesis around the final clause containing the JSX itself.

## Rule Details

The following patterns are considered problems:

```js
/*eslint saxo/jsx-conditional-parens: "error"*/

return
    <a>
    {
        a &&
            (<b/>)
    }
    </a>;
```

The following patterns are not considered warnings:

```js
/*eslint saxo/jsx-conditional-parens: "error"*/

return
    <a>
    {
        a &&
            <b/>
    }
    </a>;
```

```js
/*eslint saxo/jsx-conditional-parens: "error"*/

return
    <a>
    {
        (a &&
            <b/>)
    }
    </a>;
```

```js
/*eslint saxo/jsx-conditional-parens: "error"*/

return
    <a>
    {
        (a) &&
            <b/>
    }
    </a>;
```
