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
        options: [['phone', 'tablet', 'desktop']],
    }, {
        code: 'cy.viewport("tablet")',
        options: [['tablet']],
    }, {
        code: 'cy.viewport(1600, 1160)',
        options: [['tablet']],
    }, {
        code: 'cy.viewport(1600, 1160)',
    }, {
        code: 'cy.viewport(preset)',
    }],
    invalid: [{
        code: 'cy.viewport("rocket")',
        options: [['phone', 'tablet', 'desktop']],
        errors: [{
            messageId: 'unSupportedPresets',
            data: { allowedPresets: 'phone, tablet, desktop' },
        }],
    }, {
        code: 'cy.viewport("phone")',
        errors: [{
            messageId: 'noSupportedPresets',
        }],
    }],
});
