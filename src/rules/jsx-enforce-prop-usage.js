'use strict';

const attributeNameToCheck = 'className';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const isAllowedName = (name = '') => (
    name === 'classes' ||
    name === 'className' ||
    name.indexOf('Classes') > -1 ||
    name.indexOf('ClassName') > -1
);

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
                        if (isAllowedName(node.value.expression.name)) {
                            // allow variables with appropriate
                            return;
                        }
                    }
                }

                if (node.value.expression.type === 'MemberExpression' && node.value.expression.property.type === 'Identifier') {
                    if (isAllowedName(node.value.expression.property.name)) {
                        // allow objects keys with appropriate name
                        return;
                    }
                }

                context.report(node, 'className attribute value must be string or variable which name ends with "classes" or "className"');
            },
        };
    },
};
