'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'disallow identifiers as cypress viewport parameters',
            recommended: false,
        },
        schema: [],
        messages: {
            noIdentifiers: 'Do not use identifiers as viewport parameters',
        },
    },
    create(context) {
        return {
            CallExpression(node) {
                if (
                    node.callee.object &&
                    node.callee.object.name === 'cy' &&
                    node.callee.property.name === 'viewport' &&
                    (node.arguments[0].type === 'Identifier' ||
                    (node.arguments.length > 1 && node.arguments[1].type === 'Identifier'))
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
