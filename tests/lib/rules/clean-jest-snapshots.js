'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const assert = require('assert');
const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/clean-jest-snapshots');
const cleanJestSnapshots = rule.create;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2015,
    },
});

const codeSmells = [
    {
        codeSmellPattern: 'className=""',
        reportedError: 'Empty value of className is not allowed, make sure to pass undefined to className attribute in jsx ' +
        'if you don\'t want any class names - this will prevent rendering unnecessary class attribute to DOM',
    },
    {
        codeSmellPattern: 'undefinedpx',
        reportedError: 'undefinedpx is not allowed as attribute value',
    },
];

ruleTester.run('clean-jest-snapshots', rule, {
    valid: [
        {
            filename: 'mock.js',
            code: `expect(something).toMatchInlineSnapshot(\`\n${'Array []'}\`);`,
        },
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).toMatchInlineSnapshot(\`\n${'Array []'}\`);`,
        },
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).toMatchInlineSnapshot(123,\`\n${'Array []'}\`);`,
        },
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).toMatchInlineSnapshot(\`\n${'<Layout\nsize="small"\nclassName="foo-bar-baz"\n>'}\`);`,
        },
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).toMatchInlineSnapshot(\`\n${'<Layout\nsize="small"\nwidth="123px"\n>'}\`);`,
        },
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).unsupportedFunction(\`\n${'<Layout\nsize="small"\nclassName=""\n>'}\`);`,
        },
    ],
    invalid: [
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).toMatchInlineSnapshot(\`\n${'<Layout\nsize="small"\nclassName=""\n>'}\`);`,
            errors: [
                {
                    message: codeSmells[0].reportedError,
                },
            ],
        },
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).toMatchInlineSnapshot(\`\n${'<Layout\nsize="small"\nwidth="undefinedpx"\n>'}\`);`,
            errors: [
                {
                    message: codeSmells[1].reportedError,
                },
            ],
        },
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).toMatchInlineSnapshot(123,\`\n${'<Layout\nsize="small"\nclassName=""\n>'}\`);`,
            errors: [
                {
                    message: codeSmells[0].reportedError,
                },
            ],
        },
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).toMatchInlineSnapshot(123,\`\n${'<Layout\nsize="small"\nwidth="undefinedpx"\n>'}\`);`,
            errors: [
                {
                    message: codeSmells[1].reportedError,
                },
            ],
        },
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).toThrowErrorMatchingInlineSnapshot(\`\n${'<Layout\nsize="small"\nclassName=""\n>'}\`);`,
            errors: [
                {
                    message: codeSmells[0].reportedError,
                },
            ],
        },
        {
            filename: 'mock.js',
            options: [{ codeSmells }],
            code: `expect(something).toThrowErrorMatchingInlineSnapshot(\`\n${'<Layout\nsize="small"\nwidth="undefinedpx"\n>'}\`);`,
            errors: [
                {
                    message: codeSmells[1].reportedError,
                },
            ],
        },
    ],
});

describe('clean-jest-snapshots', () => {
    it('should return an empty object for non snapshot files', () => {
        const mockContext = {
            getFilename: () => 'mock-component.jsx',
            options: [{ codeSmells }],
        };
        const result = cleanJestSnapshots(mockContext);
        assert.deepEqual(result, {});
    });

    it('should return an object with an ExpressionStatement function for snapshot files', () => {
        const mockContext = {
            getFilename: () => 'mock-component.jsx.snap',
            options: [{ codeSmells }],
        };

        const result = cleanJestSnapshots(mockContext);
        assert.equal(typeof result.ExpressionStatement, 'function');
    });
});
