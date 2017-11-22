'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/jsx-conditional-indent');
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
true &&
true;
`,
        },
        {
            code: `
<a>
    {true &&
    true && <b/>
    }
</a>;
`,
        },
        {
            code: `
<a>
    {true &&
    true &&
        <b/>
    }
</a>;
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
        {
            code: `
<a>
    {true &&
        <b>
            <c/>
        </b>
    }
</a>;
`,
        },
        {
            code: `
<a>
    {true &&
        <b/>
    }
</a>;
`,
        },
        {
            code: `
<a>
    {true && <b/>}
</a>;
`,
        },
    ],
    invalid: [
        {
            code: `
<a>
    {true &&
    <b/>
    }
</a>;
    `,
            output: `
<a>
    {true &&
        <b/>
    }
</a>;
    `,
            errors: [{ message: 'Expected indentation of 8 space characters but found 4.' }],
        },
        {
            code: `
<a>
    {true &&
    (
    <b/>
    )
    }
</a>;
    `,
            errors: [{ message: 'Expected indentation of 8 space characters but found 4.' }],
        },
    ],
});
