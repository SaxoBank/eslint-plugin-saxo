'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'enforce a limit on cypress viewport size',
            recommended: false,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    maxHeight: {
                        type: 'number',
                    },
                    maxWidth: {
                        type: 'number',
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            tooLargeViewport: 'Do not use viewport sizes larger than {{width}}x{{height}}',
            tooHighViewport: 'Do not use a viewport height larger than {{height}}',
            tooWideViewport: 'Do not use a viewport width larger than {{width}}',
        },
    },
    create(context) {
        const options = context.options[0] || {};
        const maxHeight = options.maxHeight;
        const maxWidth = options.maxWidth;

        return {
            CallExpression(node) {
                if (
                    node.callee.object &&
                    node.callee.object.name === 'cy' &&
                    node.callee.property.name === 'viewport' &&
                    node.arguments.length > 1 &&
                    typeof node.arguments[0].value !== 'string'
                ) {
                    if (maxWidth && maxHeight && (node.arguments[0].value > maxWidth || node.arguments[1].value > maxHeight)) {
                        context.report({
                            node,
                            messageId: 'tooLargeViewport',
                            data: { height: maxWidth, width: maxHeight },
                        });
                    } else if (maxWidth && node.arguments[0].value > maxWidth) {
                        context.report({
                            node,
                            messageId: 'tooWideViewport',
                            data: { width: maxWidth },
                        });
                    } else if (maxHeight && node.arguments[1].value > maxHeight) {
                        context.report({
                            node,
                            messageId: 'tooHighViewport',
                            data: { height: maxHeight },
                        });
                    }
                }
            },
        };
    },
};
