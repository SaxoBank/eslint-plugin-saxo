'use strict';

const { isParenthesised } = require('../astUtils');

module.exports = {
    create(context) {
        const MESSAGE = 'Gratuitous parentheses around jsx inside logical expression.';

        const sourceCode = context.getSourceCode();

        function report(node) {
            const leftParenToken = sourceCode.getTokenBefore(node);
            const rightParenToken = sourceCode.getTokenAfter(node);

            context.report({
                node,
                loc: leftParenToken.loc.start,
                message: MESSAGE,
                fix(fixer) {
                    const parenthesizedSource = sourceCode.text.slice(leftParenToken.range[1], rightParenToken.range[0]);

                    return fixer.replaceTextRange([
                        leftParenToken.range[0],
                        rightParenToken.range[1],
                    ], parenthesizedSource.replace(/(^\r?\n)|(\r?\n[ \t]*$)/g, ''));
                },
            });
        }
        return {
            LogicalExpression(node) {
                if (node.operator === '&&' &&
                    node.right.type === 'JSXElement' &&
                    isParenthesised(sourceCode, node.right)
                ) {
                    report(node.right);
                }
            },
        };
    },
};
