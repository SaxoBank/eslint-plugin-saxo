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
    ],
    invalid: [
        {
            code: `
<div className={classNames('abc', {a: true})} />;
`,
            errors: [{ message: 'className attribute value must be string or variable with classes name or ending with Classes' }],
        },
        {
            code: `
<div className={true ? 'a' : 'v'} />;;
`,
            errors: [{ message: 'className attribute value must be string or variable with classes name or ending with Classes' }],
        },
    ],
});
