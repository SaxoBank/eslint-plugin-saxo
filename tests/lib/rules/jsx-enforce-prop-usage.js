'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/jsx-enforce-prop-usage');
const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
        jsx: true,
    },
};
const expectedErrorMessage = 'className attribute value must be string or variable which name ends with "classes" or "className"';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('jsx-conditional-indent', rule, {
    valid: [
        {
            code: `
<div className="inline-classes defined-with-string"/>;
`,
        },
        {
            code: `
const classes = 'a b c';
<div className={classes}/>;
`,
        },
        {
            code: `
let fooClasses = 'a b c';
<div className={fooClasses}/>;
`,
        },
        {
            code: `
const className = 'a b c';
<div className={className}/>;
`,
        },
        {
            code: `
let fooClassName = 'a b c';
<div className={fooClassName}/>;
`,
        },
        {
            code: `
const option = { className: 'a' };
<SettingOption
    className={option.className}
/>
`,
        },
        {
            code: `
<SettingOption
    className={\`allow template literals\`}
/>
`,
        },
        {
            code: `
<SettingOption
    className={constants.SPLITTER_HANDLE_CLASS}
/>
`,
        },
    ],
    invalid: [
        {
            code: `
<div className={classNames('abc', {a: true})} />;
`,
            errors: [{ message: expectedErrorMessage }],
        },
        {
            code: `
<div className={true ? 'a' : 'v'} />;
`,
            errors: [{ message: expectedErrorMessage }],
        },
        {
            code: `
let foo = 'a b c';
<div className={foo}/>;
`,
            errors: [{ message: expectedErrorMessage }],
        },
    ],
});
