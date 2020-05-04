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
const topLevelDir = 'SampleProject/Source/SampleProject.App/js/';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('jsx-enforce-spec-describe', rule, {
    valid: [
        {
            filename: 'C:\\Projects\\SampleProject\\Source\\SampleProject.App\\js\\src\\modules\\sampleModule\\component\\component.jsx',
            options: [{ topLevelDir }],
            code: `
describe(() => {
    it('should be valid for non spec file with windows path', () => {})
})
`,
        },
        {
            filename: 'C:\\Projects\\SampleProject\\Source\\SampleProject.App\\js\\src\\modules\\sampleModule\\component\\component.spec.jsx',
            code: `
describe('src/modules/sampleModule/component/component', () => {
    it('should be valid for spec file with expected windows path in the description', () => {})
})
`,
        },
        {
            filename: '/some/dir/SampleProject/Source/SampleProject.App/js/src/modules/sampleModule/component/component.jsx',
            code: `
describe(() => {
    it('should be valid for non spec file with unix path', () => {})
})
`,
        },
        {
            filename: '/some/dir/SampleProject/Source/SampleProject.App/js/src/modules/sampleModule/component/component.spec.jsx',
            code: `
describe('src/modules/sampleModule/component/component', () => {
    it('should be valid for spec file with expected unix path in the description', () => {})
})
`,
        },
        {
            filename: 'C:\\Projects\\SampleProject\\Source\\SampleProject.App\\js\\src\\modules\\sampleModule\\component\\component.spec.jsx',
            code: `
describe('src/modules/sampleModule/component/component', () => {
    describe('anything', () => {
        it('should allow anything in the nested describe', () => {})
    })
})
`,
        },
    ],
    invalid: [
        {
            filename: 'C:\\Projects\\SampleProject\\Source\\SampleProject.App\\js\\src\\modules\\sampleModule\\component\\component.spec.jsx',
            code: `
describe('src/modules/incorrect/directory/and/file', () => {
    it('should throw error for unit test description not matching path', () => {})
})
`,
            output: `
describe('src/modules/sampleModule/component/component', () => {
    it('should throw error for unit test description not matching path', () => {})
})
`,
            errors: [
                {
                    message: 'First argument of describe() needs to be path to tested file, ' +
                        'expected=[src/modules/sampleModule/component/component], ' +
                        'got=[src/modules/incorrect/directory/and/file]',
                },
            ],
        },
        {
            filename: '/some/dir/SampleProject/Source/SampleProject.App/js/src/modules/sampleModule/component/component.spec.jsx',
            code: `
describe('src/modules/incorrect/directory/and/file', () => {
    it('should throw error for unit test description not matching path', () => {})
})
`,
            output: `
describe('src/modules/sampleModule/component/component', () => {
    it('should throw error for unit test description not matching path', () => {})
})
`,
            errors: [
                {
                    message: 'First argument of describe() needs to be path to tested file, ' +
                        'expected=[src/modules/sampleModule/component/component], ' +
                        'got=[src/modules/incorrect/directory/and/file]',
                },
            ],
        },
    ],
});
