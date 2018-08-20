'use strict';

// find only top level describe
const estQuery = 'Program > ExpressionStatement > CallExpression > Identifier[name=\'describe\']';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Enforce content of describe() in spec files matching tested file path',
            category: '',
            recommended: false,
        },
        fixable: 'code',
        schema: [
            {
                type: 'object',
                properties: {
                    topLevelDir: {
                        type: 'string', // path of top level js directory
                    },
                },
            },
        ],
    },

    create(context) {
        const optionsObject = context.options[0] || {};
        const topLevelDir = optionsObject.topLevelDir || '/js/';

        return {
            [estQuery](node) {
                const fileName = context.getFilename().replace(/\\/g, '/');

                if (fileName.indexOf('.spec.') === -1) {
                    // only check spec files
                    return;
                }

                const expectedDescription = fileName
                    .substring(topLevelDir.length + fileName.indexOf(topLevelDir)) // leave only src/... part
                    .replace(/\.spec\.[^/.]+$/, ''); // remove extension

                const actualDescription = node.parent.arguments[0].value;

                if (actualDescription === expectedDescription) {
                    return;
                }

                const errorMessage = 'First argument of describe() needs to be path to tested file, ' +
                    `expected=[${expectedDescription}], got=[${actualDescription}]`;

                context.report({
                    node,
                    loc: node.loc.start,
                    message: errorMessage,
                    fix(fixer) {
                        const firstDescribeArgumentNode = node.parent.arguments[0];
                        const correctPath = `'${expectedDescription}'`;
                        return fixer.replaceText(firstDescribeArgumentNode, correctPath);
                    },
                });
            },
        };
    },
};
