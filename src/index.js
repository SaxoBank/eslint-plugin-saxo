'use strict';

const fs = require('fs');
const path = require('path');
const zipObject = require('lodash.zipobject');

const rules = fs.readdirSync(path.resolve(__dirname, 'rules')).map((f) => f.replace(/\.js$/, ''));

module.exports = {
    rules: zipObject(rules, rules.map((rule) => require(`./rules/${rule}`))),
    configs: {
        recommended: {
            rules: {
                '@saxo/saxo/jsx-conditional-indent': 'error',
                '@saxo/saxo/jsx-conditional-newline': 'error',
                '@saxo/saxo/jsx-conditional-parens': 'error',
                '@saxo/saxo/jsx-curly-spacing-opinionated': 'error',
                '@saxo/saxo/jsx-enforce-prop-usage': 'warn',
                '@saxo/saxo/jsx-enforce-spec-describe': 'warn',
            },
        },
    },
};
