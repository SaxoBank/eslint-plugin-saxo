'use strict';

module.exports = {
    meta: {
        docs: {
            description: 'Enforces delegating to sagas directly using yield*',
            category: 'ECMAScript 6',
            recommended: true,
        },
        fixable: 'code',
        messages: {
            useYieldStar: 'Use `yield*` for delegating to other sagas; it preserves the call stack',
        },
    },
    create(context) {
        const generators = {};
        const yieldExpressionsMaybeToGenerator = [];

        return {
            FunctionDeclaration(node) {
                if (node.generator) {
                    generators[node.id.name] = node;
                }
            },
            YieldExpression(node) {
                const isYieldStar = node.delegate;
                const { type, callee } = node.argument;

                if (isYieldStar) {
                    return;
                }
                if (type !== 'CallExpression' || callee.type !== 'Identifier') {
                    return;
                }

                yieldExpressionsMaybeToGenerator.push(node);
            },
            'Program:exit': () => {
                yieldExpressionsMaybeToGenerator.forEach((node) => {
                    const { callee } = node.argument;

                    if (!generators[callee.name]) {
                        return;
                    }

                    context.report({
                        node,
                        messageId: 'useYieldStar',
                        fix: (fixer) => addStarToYieldExpression(context, fixer, node),
                    });
                });
            },
        };
    },
};

function addStarToYieldExpression(context, fixer, node) {
    const nodeText = context.getSourceCode().getText(node);
    const withoutYield = nodeText.substr('yield'.length);

    return fixer.replaceText(node, `yield*${withoutYield}`);
}
