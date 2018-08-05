'use strict';

const { getNodeIndent, isParenthesised } = require('../astUtils');

module.exports = {
    create(context) {
        const MESSAGE = 'Expected indentation of {{needed}} {{type}} {{characters}} but found {{gotten}}.';

        let indentType = 'space';
        let indentSize = 4;

        const sourceCode = context.getSourceCode();

        if (context.options.length) {
            if (context.options[0] === 'tab') {
                indentSize = 1;
                indentType = 'tab';
            } else if (typeof context.options[0] === 'number') {
                indentSize = context.options[0];
                indentType = 'space';
            }
        }

        const indentChar = indentType === 'space' ? ' ' : '\t';

        /**
         * Responsible for fixing the indentation issue fix
         * @param {ASTNode} node Node violating the indent rule
         * @param {Number} needed Expected indentation character count
         * @returns {Function} function to be executed by the fixer
         * @private
         */
        function getFixerFunction(node, needed) {
            // no support for indenting when parens are used
            if (isParenthesised(sourceCode, node)) {
                return;
            }

            return function(fixer) {
                const indent = Array(needed + 1).join(indentChar);
                return fixer.replaceTextRange(
                    [node.range[0] - node.loc.start.column, node.range[0]],
                    indent
                );
            };
        }

        /**
         * Reports a given indent violation and properly pluralizes the message
         * @param {ASTNode} node Node violating the indent rule
         * @param {Number} needed Expected indentation character count
         * @param {Number} gotten Indentation character count in the actual node/code
         * @param {Object} loc Error line and column location
         */
        function report(node, needed, gotten, loc) {
            const msgContext = {
                needed,
                type: indentType,
                characters: needed === 1 ? 'character' : 'characters',
                gotten,
            };

            if (loc) {
                context.report({
                    node,
                    loc,
                    message: MESSAGE,
                    data: msgContext,
                    fix: getFixerFunction(node, needed),
                });
            } else {
                context.report({
                    node,
                    message: MESSAGE,
                    data: msgContext,
                    fix: getFixerFunction(node, needed),
                });
            }
        }

        return {
            LogicalExpression(node) {
                if (node.operator === '&&' &&
                    node.right.type === 'JSXElement' &&
                    node.left.loc.end.line !== node.right.loc.start.line) {

                    const nodeIndent = getNodeIndent(sourceCode, node.right);
                    const indent = getNodeIndent(sourceCode, node.left) + indentSize;

                    if (nodeIndent === indent) {
                        return;
                    }

                    report(node.right, indent, nodeIndent);
                }
            },
        };
    },
};
