'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/cy-pause');

const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
        jsx: true,
    },
};

const doNotUseCyPauseError = { message: 'Do not use cy.pause()' };

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('cy-pause', rule, {
    valid: [],
    invalid: [{
        code: 'cy.pause()',
        errors: [doNotUseCyPauseError],
    }, {
        code: 'cy.foo().pause()',
        errors: [doNotUseCyPauseError],
    }, {
        code: 'cy.foo().bar().pause()',
        errors: [doNotUseCyPauseError],
    }],
});
