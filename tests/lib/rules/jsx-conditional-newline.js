'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/jsx-conditional-newline');
const errors = [{ message: 'Missing newline before jsx inside logical expression.' }];
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
ruleTester.run('jsx-conditional-newline', rule, {
    valid: [
        {
            code: `
true &&
true
`,
        },
        {
            code: `
true &&
    <a/>
`,
        },
        {
            code: `
true && <a/>
`,
        },
        {
            code: `
<a>
    {true &&
        <b></b>
    }
</a>;
`,
        },
    ],
    invalid: [
        {
            code: `
true && <b>
</b>
`,
            output: `
true && 
<b>
</b>
`,
            errors,
        },
        {
            code: `
<a>
    {true && <b>
    </b>}
</a>;
`,
            output: `
<a>
    {true && 
<b>
    </b>}
</a>;
`,
            errors,
        },
    ],
});
