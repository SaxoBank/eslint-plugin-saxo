'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/cy-viewport-max');
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
ruleTester.run('cy-viewport-max', rule, {
    valid: [{
        code: 'yc.viewport(1750, 1400)',
        options: [{ maxHeight: 1700, maxWidth: 1300 }],
    }, {
        code: 'cy.viewport("phone")',
        options: [{ maxHeight: 1700, maxWidth: 1300 }],
    }, {
        code: 'cy.viewport("phone", "landscape")',
        options: [{ maxHeight: 1700, maxWidth: 1300 }],
    }, {
        code: 'cy.viewport(1650, 1200)',
        options: [{ maxHeight: 1700, maxWidth: 1300 }],
    }, {
        code: 'cy.viewport(50, 200)',
        options: [{ maxHeight: 200, maxWidth: 300 }],
    }, {
        code: 'cy.viewport(1100, 2000)',
        options: [{ maxHeight: 1200 }],
    }, {
        code: 'cy.viewport(2000, 1100)',
        options: [{ maxWidth: 1200 }],
    }],
    invalid: [{
        code: 'cy.viewport(1400, 900)',
        options: [{ maxHeight: 1300, maxWidth: 700 }],
        errors: [{
            messageId: 'tooLargeViewport',
            data: { height: 1300, width: 700 },
        }],
    }, {
        code: 'cy.viewport(1600, 1160)',
        options: [{ maxHeight: 8000, maxWidth: 20 }],
        errors: [{
            messageId: 'tooLargeViewport',
            data: { height: 8000, width: 20 },
        }],
    }, {
        code: 'cy.viewport(height, 1200)',
        options: [{ maxHeight: 1600, maxWidth: 1160 }],
        errors: [{
            messageId: 'tooLargeViewport',
            data: { height: 1600, width: 1160 },
        }],
    }, {
        code: 'cy.viewport(1700, width)',
        options: [{ maxHeight: 1600, maxWidth: 1160 }],
        errors: [{
            messageId: 'tooLargeViewport',
            data: { height: 1600, width: 1160 },
        }],
    }, {
        code: 'cy.viewport(1600, 1160)',
        options: [{ maxHeight: 800 }],
        errors: [{
            messageId: 'tooHighViewport',
            data: { height: 800 },
        }],
    }, {
        code: 'cy.viewport(1600, 1160)',
        options: [{ maxWidth: 800 }],
        errors: [{
            messageId: 'tooWideViewport',
            data: { width: 800 },
        }],
    }],
});
