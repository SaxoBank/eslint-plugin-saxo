'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/string-constant-types');

const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 6,
};

const stringLiteralsShouldBeTypedError = { message: 'String literals should be typed' };

const ruleTester = new RuleTester({ parserOptions, parser: 'babel-eslint' });
ruleTester.run('string-constant-types', rule, {
    valid: [{
        code:
            `
// Doesn't complain when file isn't flow annotated
export const constant = "value"
`,
    }, {
        code:
            `
// @flow
// Doesn't complain when variable is already type annotated
export const constant: 'foo' = 'foo'
`,
    }, {
        code:
            `
// @flow
// Doesn't complain about non string literal types not being explicitly typed
export const numberLiteral = 5
export const nullLiteral = null
`,
    }, {
        code:
            `
// @flow
// Doesn't complain about string constants that aren't exported
const nonExportedConstant = 'bar'
`,
    }],
    invalid: [{
        code:
            `
// @flow
export const foo = 'foo'
`,
        errors: [stringLiteralsShouldBeTypedError],
    }],
});
