# jsx-conditional-indent

The eslint indent rule allows two types of indentation for conditionals spanning multiple lines..

```js
const a =
    b &&
    c;

const d =
    e &&
        f;
```

Whilst the first is more normal for an expression inside an if statement, when a conditional is used within JSX, it is acting like an if statement rather than a boolean expression. e.g.

```
return
    <a>
    {
        a &&
            <b/>
    }
    </a>;
```

In the case above the indentation helps the reader see that `<b/>` is conditionally inserted.

This rule requires the extra indentation when expressions are used inside JSX.

## Rule Details

The following patterns are considered problems:

```js
/*eslint saxo/jsx-conditional-indent: "error"*/

return
    <a>
    {
        a &&
        <b/>
    }
    </a>;
```

The following patterns are not considered warnings:

```js
/*eslint saxo/jsx-conditional-indent: "error"*/

return
    <a>
    {
        a &&
            <b/>
    }
    </a>;
```
