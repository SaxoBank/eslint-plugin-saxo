# jsx-conditional-newline

When you have jsx conditionals, this rule enforces that you use a newline after the first clause.

## Rule Details

The following patterns are considered problems:

```js
/*eslint saxo/jsx-conditional-newline: "error"*/

return
    <a>
    {
        a && <b/>
    }
    </a>;
```

The following patterns are not considered warnings:

```js
/*eslint saxo/jsx-conditional-newline: "error"*/

return
    <a>
    {
        a &&
            <b/>
    }
    </a>;
```
