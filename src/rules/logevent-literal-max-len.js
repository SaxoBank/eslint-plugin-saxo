'use strict';

const FEATURE_EVENT_MAX_LENGTH = 50;

module.exports = {
    meta: {
        docs: {
            description: `ensure featureTracker event does not exceed ${FEATURE_EVENT_MAX_LENGTH} characters`,
            recommended: false,
        },
        schema: [],
        messages: {
            logEventMaxLength: `featureEvent length should not exceed ${FEATURE_EVENT_MAX_LENGTH} characters`,
        },
    },
    create(context) {
        return {
            CallExpression(node) {
                const isFeatureTracker =
                    node.callee.object &&
                    node.callee.object.name === 'featureTracker' &&
                    node.callee.property.name === 'logEvent';
                const isLogEvent =
                    node.callee.type === 'Identifier' &&
                    node.callee.name === 'logEvent';
                const secondArgument = node.arguments[1];

                if (
                    (isFeatureTracker || isLogEvent) &&
                    secondArgument &&
                    secondArgument.type === 'Literal' &&
                    typeof secondArgument.value === 'string' &&
                    secondArgument.value.length > FEATURE_EVENT_MAX_LENGTH
                ) {
                    context.report({
                        node,
                        messageId: 'logEventMaxLength',
                    });
                }
            },
        };
    },
};
