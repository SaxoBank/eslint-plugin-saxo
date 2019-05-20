'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'enforce specific cypress viewport presets',
            recommended: false,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    allowed: {
                        type: 'array',
                        default: [],
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            unSupportedPresets: 'Only use supported viewport presets: {{presets}}',
            noSupportedPresets: 'Do not use presets when setting cypress viewport',
        },
    },
    create(context) {
        const options = context.options[0] || {};
        const allowed = options.allowed || [];

        return {
            CallExpression(node) {
                if (
                    node.callee.object &&
                    node.callee.object.name === 'cy' &&
                    node.callee.property.name === 'viewport' &&
                    typeof node.arguments[0].value === 'string'
                ) {
                    if (allowed.length === 0) {
                        context.report({
                            node,
                            messageId: 'noSupportedPresets',
                        });
                    } else if (allowed.indexOf(node.arguments[0].value) < 0) {
                        context.report({
                            node,
                            messageId: 'unSupportedPresets',
                            data: { presets: allowed.join(', ') },
                        });
                    }
                }
            },
        };
    },
};
