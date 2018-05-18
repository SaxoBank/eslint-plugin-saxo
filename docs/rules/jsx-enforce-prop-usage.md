# jsx-enforce-prop-usage

The eslint prop usage rule enforces className JSX attribute values to be one of:
* string literal
* template literal
* variable with specific name: `classes`, `className` or containing `Classes`, `ClassName` or `CLASS`

## Rule Details

The following patterns are considered problems:

```js
/*eslint saxo/jsx-enforce-prop-usage: "error"*/

<div className={classNames('abc', {a: true})} /> // inline call not allowed, need to extract to variable
<div className={true ? 'a' : 'v'} /> // not allowed, need to extract to variable

let foo = 'a b c';
<div className={foo}/> // variable name not allowed, must be `classes`, `className` or contain `Classes`, `ClassName` or `CLASS`
```

The following patterns are not considered warnings:

```js
/*eslint saxo/jsx-enforce-prop-usage: "error"*/

<div className="inline-classes defined-with-string"/> // string value allowed

<div className={`allow template literals`}/> // template literals allowed

const classes = classNames('abc', {a: true});
<div className={classes}/> // allowed variable name ("classes")

let fooClasses = 'a b c';
<div className={fooClasses}/> // allowed variable name (ends with "Classes")

const className = 'a b c';
<div className={className}/> // allowed variable name ("className")

let fooClassName = 'a b c';
<div className={fooClassName}/> // allowed variable name (ends with "ClassName")

const option = { className: 'a' };
<div className={option.className}/> // can use object's key which name matches allowed set of names (must be `classes`, `className` or contain `Classes`, `ClassName` or `CLASS`)

<div className={constants.DIV_CLASS}/> // contains CLASS
```
