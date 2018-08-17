'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/jsx-enforce-spec-describe');
const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
        jsx: true,
    },
};
const topLevelDir = 'SaxoTrader/Source/Iit.SaxoTrader.App/js/';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('jsx-conditional-indent', rule, {
    valid: [
        {
            filename: 'C:\\Projects\\SaxoTrader\\Source\\Iit.SaxoTrader.App\\js\\src\\modules\\initialWorkspaceChoice\\session\\session.jsx',
            options: [{ topLevelDir }],
            code: `
describe(() => {
    it('should be valid for non spec file with windows path', () => {})
})
`,
        },
        {
            filename: 'C:\\Projects\\SaxoTrader\\Source\\Iit.SaxoTrader.App\\js\\src\\modules\\initialWorkspaceChoice\\session\\session.spec.jsx',
            code: `
describe('src/modules/initialWorkspaceChoice/session/session', () => {
    it('should be valid for spec file with expected windows path in the description', () => {})
})
`,
        },
        {
            filename: '/some/dir/SaxoTrader/Source/Iit.SaxoTrader.App/js/src/modules/initialWorkspaceChoice/session/session.jsx',
            code: `
describe(() => {
    it('should be valid for non spec file with unix path', () => {})
})
`,
        },
        {
            filename: '/some/dir/SaxoTrader/Source/Iit.SaxoTrader.App/js/src/modules/initialWorkspaceChoice/session/session.spec.jsx',
            code: `
describe('src/modules/initialWorkspaceChoice/session/session', () => {
    it('should be valid for spec file with expected unix path in the description', () => {})
})
`,
        },
        {
            filename: 'C:\\Projects\\SaxoTrader\\Source\\Iit.SaxoTrader.App\\js\\src\\modules\\initialWorkspaceChoice\\session\\session.spec.jsx',
            code: `
describe('src/modules/initialWorkspaceChoice/session/session', () => {
    describe('anything', () => {
        it('should allow anything in the nested describe', () => {})
    })
})
`,
        },
    ],
    invalid: [
        {
            filename: 'C:\\Projects\\SaxoTrader\\Source\\Iit.SaxoTrader.App\\js\\src\\modules\\initialWorkspaceChoice\\session\\session.spec.jsx',
            code: `
describe('src/modules/incorrect/directory/and/file', () => {
    it('should throw error for unit test description not matching path', () => {})
})
`,
            output: `
describe('src/modules/initialWorkspaceChoice/session/session', () => {
    it('should throw error for unit test description not matching path', () => {})
})
`,
            errors: [
                {
                    message: 'First argument of describe() needs to be path to tested file, ' +
                        'expected=[src/modules/initialWorkspaceChoice/session/session], ' +
                        'got=[src/modules/incorrect/directory/and/file]',
                },
            ],
        },
        {
            filename: '/some/dir/SaxoTrader/Source/Iit.SaxoTrader.App/js/src/modules/initialWorkspaceChoice/session/session.spec.jsx',
            code: `
describe('src/modules/incorrect/directory/and/file', () => {
    it('should throw error for unit test description not matching path', () => {})
})
`,
            output: `
describe('src/modules/initialWorkspaceChoice/session/session', () => {
    it('should throw error for unit test description not matching path', () => {})
})
`,
            errors: [
                {
                    message: 'First argument of describe() needs to be path to tested file, ' +
                        'expected=[src/modules/initialWorkspaceChoice/session/session], ' +
                        'got=[src/modules/incorrect/directory/and/file]',
                },
            ],
        },
    ],
});
