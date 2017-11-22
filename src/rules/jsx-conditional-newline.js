'use strict';

module.exports = {
    create(context) {
        const MESSAGE = 'Missing newline before jsx inside logical expression.';

        function report(node) {
            context.report({
                node,
                loc: node.loc.start,
                message: MESSAGE,
                fix(fixer) {
                    return fixer.insertTextBefore(node, '\n');
                },
            });
        }

        return {
            LogicalExpression(node) {
                if (node.operator === '&&' &&
                    node.right.type === 'JSXElement' &&
                    node.left.loc.end.line === node.right.loc.start.line &&
                    node.right.loc.start.line !== node.right.loc.end.line // if the jsx is multi-line
                ) {
                    report(node.right);
                }
            },
        };
    },
};
