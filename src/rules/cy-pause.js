'use strict';

const { getObjectName } = require('../astUtils');

module.exports = {
    meta: {
        docs: {
            description: 'cy.pause() stops commands from running to allow interaction, usually this isn\'t something we want to merge',
            recommended: false,
        },
    },
    create(context) {
        return {
            ExpressionStatement(node) {
                if (node.expression.callee.property.name === 'pause' && getObjectName(node.expression.callee) === 'cy') {
                    context.report({
                        node,
                        message: 'Do not use cy.pause()',
                    });
                }
            },
        };
    },
};
