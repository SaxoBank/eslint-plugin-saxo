# clean-jest-snapshots

The eslint clean jest snapshots rule check for code smells in **.snap* files that contain [Jest snapshots](docs/rules/jsx-conditional-indent.md) and in **.js* files with [inline Jest snapshots](https://jestjs.io/docs/en/snapshot-testing#inline-snapshots) created using `toMatchInlineSnapshot` and `toThrowErrorMatchingInlineSnapshot` methods.

The rule must be configured with mandatory _codeSmells_ option array which allows to specify patterns in snapshots that will yield errors. Example:

```js
'saxo/clean-jest-snapshots': ['error', {
    codeSmells: [
        {
            codeSmellPattern: 'className=""',
            reportedError: 'Empty value of className is not allowed, make sure to pass undefined to className attribute in jsx if you don\'t want any class names - this will prevent rendering unnecessary class attribute to DOM'
        },
        {
            codeSmellPattern: 'undefinedpx',
            reportedError: 'undefinedpx is not allowed as attribute value'
        },
    ],
}],
```

For presented configuration the rule will thor error each time it encounters `className=""` and `undefinedpx` in snapshots.

The rule is not autofixable.

## Rule Details

### The following patterns are considered problems:

1) Snaphot file `foo.spec.js.snap`:
```js
/*
'saxo/clean-jest-snapshots': ['error', {
    codeSmells: [        
        {
            codeSmellPattern: 'undefinedpx',
            reportedError: 'undefinedpx is not allowed as attribute value'
        },
    ],
}],
 */

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`src/components/foo/bar renders correctly 1`] = `
<FooBar
    width="undefinedpx"
/>
`;
```

2) Inline snapshot within unit test `foo.spec.js`:

```js
/*
'saxo/clean-jest-snapshots': ['error', {
    codeSmells: [        
        {
            codeSmellPattern: 'undefinedpx',
            reportedError: 'undefinedpx is not allowed as attribute value'
        },
    ],
}],
 */

expect(wrapper).toMatchInlineSnapshot(`
<FooBar
    width="undefinedpx"
/>
`);
```

### The following patterns are not considered errors:

1) Snaphot file `foo.spec.js.snap`:
```js
/*
'saxo/clean-jest-snapshots': ['error', {
    codeSmells: [        
        {
            codeSmellPattern: 'undefinedpx',
            reportedError: 'undefinedpx is not allowed as attribute value'
        },
    ],
}],
 */

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`src/components/foo/bar renders correctly 1`] = `
<FooBar
    width="100px"
/>
`;
```

2) Inline snapshot within unit test `foo.spec.js`:

```js
/*
'saxo/clean-jest-snapshots': ['error', {
    codeSmells: [        
        {
            codeSmellPattern: 'undefinedpx',
            reportedError: 'undefinedpx is not allowed as attribute value'
        },
    ],
}],
 */

expect(wrapper).toMatchInlineSnapshot(`
<FooBar
    width="100px"
/>
`);
```

## Configuration

Example of `.eslintrc.js`:

```js
module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },
    overrides: [
        {
            files: ['js/src/**/*.{snap,js}'],
            plugins: [
                'eslint-plugin-saxo',
            ],
            rules: {
                'saxo/clean-jest-snapshots': ["error", {
                    "codeSmells": [
                        {
                            "codeSmellPattern": 'className=""',
                            "reportedError": 'Empty value of className is not allowed, make sure to pass undefined to className attribute in jsx if you don\'t want any class names - this will prevent rendering unnecessary class attribute to DOM'
                        },
                        {
                            "codeSmellPattern": 'undefinedpx',
                            "reportedError": 'undefinedpx is not allowed as attribute value'
                        },
                    ],
                }],
            },
        },
    ],
};
```
