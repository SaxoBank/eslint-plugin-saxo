'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/jsx-conditional-parens');
const errors = [{ message: 'Gratuitous parentheses around jsx inside logical expression.' }];
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
ruleTester.run('jsx-conditional-parens', rule, {
    valid: [
        {
            code: `
true &&
(true);
`,
        },
        {
            code: `
(true &&
(true));
`,
        },
        {
            code: `
<a>
    {(true) &&
    (true) && <b/>
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
    {(true && <b/>)}
</a>;
`,
        },
    ],
    invalid: [
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
            output: `
<a>
    {true &&
                    <b/>
    }
</a>;
`,
            errors,
        },
        {
            code: `
<a>
    {((true) &&
        (<b/>))
    }
</a>;
`,
            output: `
<a>
    {((true) &&
        <b/>)
    }
</a>;
`,
            errors,
        },
        {
            code: `
<a>
    {true &&
        ((<b/>))
    }
</a>;
    `,
            output: `
<a>
    {true &&
        (<b/>)
    }
</a>;
    `,
            errors,
        },
    ],
});
