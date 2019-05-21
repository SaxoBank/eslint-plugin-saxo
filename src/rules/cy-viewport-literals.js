'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'enforce literals as cypress viewport parameters',
            recommended: false,
        },
        schema: [],
        messages: {
            noIdentifiers: 'Only use literals as viewport parameters',
        },
    },
    create(context) {
        return {
            CallExpression(node) {
                if (
                    node.callee.object &&
                    node.callee.object.name === 'cy' &&
                    node.callee.property.name === 'viewport' &&
                    ((node.arguments[0] && node.arguments[0].type !== 'Literal') ||
                    (node.arguments[1] && node.arguments[1].type !== 'Literal'))
                ) {
                    context.report({
                        node,
                        messageId: 'noIdentifiers',
                    });
                }
            },
        };
    },
};
