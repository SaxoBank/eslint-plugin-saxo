'use strict';

const attributeNameToCheck = 'className';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Enforce prop value',
            category: '',
            recommended: false,
        },
        schema: [],
    },

    create(context) {

        return {
            JSXAttribute(node) {
                if (!node.value || node.name.name !== attributeNameToCheck) {
                    // only check attributes with given name
                    return;
                }

                if (node.value.type === 'Literal') {
                    // allow string literals as attributes
                    return;
                }

                if (node.value.type === 'JSXExpressionContainer') {
                    if (node.value.expression.type === 'Identifier') {
                        // TODO: refactor
                        if (node.value.expression.name === 'classes') {
                            return;
                        }
                        if (node.value.expression.name.indexOf('Classes') > -1) {
                            return;
                        }
                    }
                }

                context.report(node, `${attributeNameToCheck} attribute value must be string or variable with classes name or ending with Classes`);
            },
        };
    },
};
