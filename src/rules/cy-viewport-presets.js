'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'enforce specific cypress viewport presets',
            recommended: false,
        },
        schema: [
            {
                type: 'array',
            },
        ],
        messages: {
            unSupportedPresets: 'Only use supported viewport presets: {{allowedPresets}}',
            noSupportedPresets: 'Do not use presets when setting cypress viewport',
        },
    },
    create(context) {
        const presets = context.options[0] || [];

        return {
            CallExpression(node) {
                if (
                    node.callee.object.name === 'cy' &&
                    node.callee.property.name === 'viewport' &&
                    typeof node.arguments[0].value === 'string'
                ) {
                    if (presets.length === 0) {
                        context.report({
                            node,
                            messageId: 'noSupportedPresets',
                        });
                    } else if (presets.indexOf(node.arguments[0].value) < 0) {
                        context.report({
                            node,
                            messageId: 'unSupportedPresets',
                            data: { allowedPresets: presets.join(', ') },
                        });
                    }
                }
            },
        };
    },
};
