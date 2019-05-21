'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/cy-viewport-no-identifiers');
const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
        jsx: true,
    },
};

const noIdentifiersError = { messageId: 'noIdentifiers' };

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('cy-viewport-no-identifiers', rule, {
    valid: [{
        code: 'yc.viewport(height, width)',
    }, {
        code: 'cy.viewport()',
    }, {
        code: 'cy.viewport(1650, 1200)',
    }, {
        code: 'cy.viewport(1650, 1200, options)',
    }, {
        code: 'cy.viewport("macbook-13")',
    }, {
        code: 'cy.viewport("macbook-13", "landscape")',
    }, {
        code: 'cy.viewport("macbook-13", "landscape", options)',
    }],
    invalid: [{
        code: 'cy.viewport(height, 900)',
        errors: [noIdentifiersError],
    }, {
        code: 'cy.viewport(1600, width)',
        errors: [noIdentifiersError],
    }, {
        code: 'cy.viewport(height, width)',
        errors: [noIdentifiersError],
    }, {
        code: 'cy.viewport(preset)',
        errors: [noIdentifiersError],
    }, {
        code: 'cy.viewport(preset, "landscape")',
        errors: [noIdentifiersError],
    }, {
        code: 'cy.viewport("preset", orientation)',
        errors: [noIdentifiersError],
    }],
});
