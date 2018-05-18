# jsx-enforce-prop-usage

The eslint prop usage rule enforces className JSX attribute values to be one of:
* string literal
* template literal
* variable with specific name: `classes`, `className` or containing `Classes`, `ClassName` or `CLASS`

## Rule Details

The following patterns are considered problems:

```js
/*eslint saxo/jsx-enforce-prop-usage: "error"*/

<Sheet className={classNames('grid grid--y grid--fit-fill-fit', className)}>
```

The following patterns are not considered warnings:

```js
/*eslint saxo/jsx-enforce-prop-usage: "error"*/

const classes = classNames('grid grid--y grid--fit-fill-fit', this.props.className);
<Sheet className={classes}/>
```
