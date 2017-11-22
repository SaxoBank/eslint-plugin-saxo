'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/jsx-curly-spacing-opinionated');
const RuleTester = require('eslint').RuleTester;
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
ruleTester.run('jsx-curly-spacing', rule, {
    valid: [{
        code: '<App foo={bar} />;',
    }, {
        code: '<App foo={bar}>{bar}</App>;',
    }, {
        code: '<App foo={{ bar: true, baz: true }}>{{ bar: true, baz: true }}</App>;',
    }, {
        code: '<App>{foo /* comment */}</App>',
    }, {
        code: '<App>{/* comment */ foo}</App>',
    }, {
        code: [
            '<App>',
            '{a ? b :',
            '   c',
            '}</App>;',
        ].join('\n'),
    }, {
        code: [
            '<App>',
            '{true &&',
            '   <bar>',
            '   </bar>',
            '}',
            '</App>;',
        ].join('\n'),
    }, {
        code: [
            '<App>',
            '{true &&',
            '   <bar>',
            '   </bar>',
            ' } ',
            '</App>;',
        ].join('\n'),
    }, {
        code: '<App {...bar/* comment */} />;',
    }, {
        code: '<App foo={bar} {...baz} />;',
    }, {
        code: '<App>{bar} {baz}</App>;',
    }, {
        code: [
            '<app>',
            '{/*',
            'multi-line-ok-in comment',
            '*/}',
            '</app>',
        ].join('\n'),
    }, {
        code: [
            '<app>',
            '{`',
            'multi-line-ok-in template-string',
            '`}',
            '</app>',
        ].join('\n'),
    }, {
        code: [
            '<app>',
            '{_.map(() => {',
            '   return true;',
            '})}',
            '</app>',
        ].join('\n'),
    }, {
        code: [
            '<App>',
            '{foo} {{ bar: baz }}',
            '</App>',
        ].join('\n'),
    }],

    invalid: [{
        code: '<App foo={ bar }>{bar}</App>;',
        output: '<App foo={bar}>{bar}</App>;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App>{ bar }</App>;',
        output: '<App>{bar}</App>;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App>{ { bar: true, baz: true } }</App>;',
        output: '<App>{{ bar: true, baz: true }}</App>;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: [
            '<App foo={',
            'bar',
            '} />;',
        ].join('\n'),
        output: '<App foo={bar} />;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: [
            '<App foo={',
            '{ bar: true, baz: true }',
            '} />;',
        ].join('\n'),
        output: '<App foo={{ bar: true, baz: true }} />;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App { ...bar } />;',
        output: '<App {...bar} />;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App foo={ bar } { ...baz } />;',
        output: '<App foo={bar} {...baz} />;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }, {
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: [
            '<App foo={',
            'bar',
            '} {',
            '...baz',
            '} />;',
        ].join('\n'),
        output: '<App foo={bar} {...baz} />;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }, {
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App foo={ foo /* comment */ } />',
        output: '<App foo={foo /* comment */} />',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App foo={ /* comment */ foo } />',
        output: '<App foo={/* comment */ foo} />',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: [
            '<App>',
            '{// test',
            '}',
            '</App>',
        ].join('\n'),
        output: [
            '<App>',
            '{// test',
            '}',
            '</App>',
        ].join('\n'),
        errors: [{
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App>{ bar } { baz }</App>;',
        output: '<App>{bar} {baz}</App>;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }, {
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: [
            '<App>{',
            'bar',
            '} {',
            'baz',
            '}</App>;',
        ].join('\n'),
        output: '<App>{bar} {baz}</App>;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }, {
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: [
            '<App>{bar',
            '} {baz',
            '}</App>;',
        ].join('\n'),
        output: '<App>{bar} {baz}</App>;',
        errors: [{
            message: 'There should be no whitespace before \'}\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App>{ foo /* comment */ }</App>',
        output: '<App>{foo /* comment */}</App>',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App { ...bar} />;',
        output: '<App {...bar} />;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }],
    }, {
        code: '<App {...bar } />;',
        output: '<App {...bar} />;',
        errors: [{
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: [
            '<App {',
            '...bar',
            '} />;',
        ].join('\n'),
        output: '<App {...bar} />;',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App>{/*comment*/ }</App>',
        output: '<App>{/*comment*/}</App>',
        errors: [{
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: '<App>{ /*comment*/}</App>',
        output: '<App>{/*comment*/}</App>',
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }],
    }, {
        code: [
            '<App>',
            '{true &&',
            '   <a></a> }',
            '</App>',
        ].join('\n'),
        output: [
            '<App>',
            '{true &&',
            '   <a></a> ',
            '}',
            '</App>',
        ].join('\n'),
        errors: [{
            message: 'There should be a newline before \'}\'',
        }],
    }, {
        code: [
            '<App>',
            '{ true &&',
            '   <a></a>}',
            '</App>',
        ].join('\n'),
        output: [
            '<App>',
            '{true &&',
            '   <a></a>',
            '}',
            '</App>',
        ].join('\n'),
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }, {
            message: 'There should be a newline before \'}\'',
        }],
    }, {
        code: [
            '<App>',
            '{/*comment*/',
            '}',
            '</App>',
        ].join('\n'),
        output: [
            '<App>',
            '{/*comment*/}',
            '</App>',
        ].join('\n'),
        errors: [{
            message: 'There should be no whitespace before \'}\'',
        }],
    }, {
        code: [
            '<App>',
            '{',
            '/*comment*/}',
            '</App>',
        ].join('\n'),
        output: [
            '<App>',
            '{/*comment*/}',
            '</App>',
        ].join('\n'),
        errors: [{
            message: 'There should be no whitespace after \'{\'',
        }],
    }],
});
