'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/saga-direct-delegation');

const useYieldStarError = { messageId: 'useYieldStar' };

const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 6,
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('string-constant-types', rule, {
    valid: [
        {
            code: `
// Delegation to a saga with yield*
function* delegate() {}

function* caller() {
    yield* delegate();
}
`,
        },
        {
            code: `
// Delegation to a saga with yield*, when delegate later in the file than caller
function* caller() {
    yield* delegate();
}

function* delegate() {}
`,
        },
        {
            code: `
// Yielding things that aren't sagas, using plain yield
function func() {}

function* caller() {
    yield 1;
    yield func();
}
`,
        },
        {
            code: `
// Invalid but not currently detected: Yielding an imported saga to the middleware with plain yield
import delegate from './sagas';

function* caller() {
    yield delegate();
}
`,
        },
        {
            code: `
// Invalid but not currently detected: Yielding a saga off a property to the middleware with plain yield
const obj = {
    delegate: function* () {}
};

function* caller() {
    yield obj.delegate();
}
`,
        },
    ],
    invalid: [
        {
            code: `
// Yielding a saga to the middleware with plain yield
function* delegate() {}

function* caller() {
    yield delegate();
}
`,
            errors: [useYieldStarError],
            output: `
// Yielding a saga to the middleware with plain yield
function* delegate() {}

function* caller() {
    yield* delegate();
}
`,
        },
    ],
});
