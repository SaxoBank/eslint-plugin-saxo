'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/cy-viewport-presets');
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
ruleTester.run('cy-viewport-presets', rule, {
    valid: [{
        code: 'yc.viewport("phone")',
    }, {
        code: 'cy.viewport("phone")',
        options: [{ allowed: ['phone', 'tablet', 'desktop'] }],
    }, {
        code: 'cy.viewport("tablet")',
        options: [{ allowed: ['tablet'] }],
    }, {
        code: 'cy.viewport(1600, 1160)',
        options: [{ allowed: ['tablet'] }],
    }, {
        code: 'cy.viewport(1600, 1160)',
    }, {
        code: 'cy.viewport(preset)',
    }],
    invalid: [{
        code: 'cy.viewport("rocket")',
        options: [{ allowed: ['phone', 'tablet', 'desktop'] }],
        errors: [{
            messageId: 'unSupportedPresets',
            data: { presets: 'phone, tablet, desktop' },
        }],
    }, {
        code: 'cy.viewport("phone")',
        errors: [{
            messageId: 'noSupportedPresets',
        }],
    }],
});
