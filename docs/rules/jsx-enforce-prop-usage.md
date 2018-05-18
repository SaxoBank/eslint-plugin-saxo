# jsx-enforce-prop-usage

The eslint prop usage rule enforces className JSX attribute values to be one of:
* string literal
* template literal
* variable with specific name: `classes`, `className` or containing `Classes`, `ClassName` or `CLASS`

## Rule Details

The following patterns are considered problems:

```js
/*eslint saxo/jsx-enforce-prop-usage: "error"*/

<div className={classNames('abc', {a: true})} />
<div className={true ? 'a' : 'v'} />

let foo = 'a b c';
<div className={foo}/>
```

The following patterns are not considered warnings:

```js
/*eslint saxo/jsx-enforce-prop-usage: "error"*/

<div className="inline-classes defined-with-string"/>

const classes = classNames('abc', {a: true});
<div className={classes}/>

let fooClasses = 'a b c';
<div className={fooClasses}/>

const className = 'a b c';
<div className={className}/>

let fooClassName = 'a b c';
<div className={fooClassName}/>

const option = { className: 'a' };
<div className={option.className}/>

<div className={\`allow template literals\`}/>

<div className={constants.DIV_CLASS}/>
```
