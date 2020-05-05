'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/logevent-literal-max-len');
const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
        jsx: true,
    },
};

const logEventMaxLengthError = { messageId: 'logEventMaxLength' };
const fiftyCharacters = '1234567890'.repeat(5);
const sixtyCharacters = 'ABCD567890'.repeat(6);

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('logevent-literal-max-len', rule, {
    valid: [
        {
            code: `otherTracker.logEvent(AREA, "${sixtyCharacters}")`,
        },
        {
            code: 'featureTracker.logEvent()',
        },
        {
            code: 'featureTracker.logEvent(AREA, "Event occurred")',
        },
        {
            code: `featureTracker.logEvent(AREA, ${sixtyCharacters})`,
        },
        {
            code: `featureTracker.logEvent(AREA, "${fiftyCharacters}")`,
        },
        {
            code: `featureTracker.logEvent(AREA, "${fiftyCharacters}", options)`,
        },
        {
            code: `logEvent(AREA, "${fiftyCharacters}")`,
        },
        {
            code: `logEvent(AREA, "${fiftyCharacters}", options)`,
        },
    ],
    invalid: [
        {
            code: `featureTracker.logEvent(FEATURE_AREA, "${sixtyCharacters}")`,
            errors: [logEventMaxLengthError],
        },
        {
            code: `logEvent(FEATURE_AREA, "${sixtyCharacters}")`,
            errors: [logEventMaxLengthError],
        },
    ],
});
