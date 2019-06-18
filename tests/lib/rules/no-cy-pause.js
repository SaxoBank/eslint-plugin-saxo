'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/no-cy-pause');

const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 6,
};

const doNotUseCyPauseError = { message: 'Do not use cy.pause()' };

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('no-cy-pause', rule, {
    valid: [{
        code: 'other.pause()',
    }, {
        code: 'properties.pause',
    }, {
        code: 'pause()',
    }],
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
