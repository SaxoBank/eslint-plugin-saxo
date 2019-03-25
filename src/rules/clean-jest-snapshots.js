'use strict';

const reportOnViolation = ({
    context, node, snapshot,
}) => {
    context.options[0].codeSmells.forEach(({ codeSmellPattern, reportedError }) => {
        let startIndex = 0;
        let currIndex;
        while (
            (currIndex = snapshot.value.raw.indexOf(codeSmellPattern, startIndex)) > -1
        ) {
            startIndex = currIndex + codeSmellPattern.length;
            const lineWhereExpressionStarts = snapshot.loc.start.line;
            const lineDelta = snapshot.value.raw.substring(0, currIndex).match(/\r?\n/g)
                .length;
            const problematicLine = lineWhereExpressionStarts + lineDelta;
            context.report(
                node,
                {
                    line: problematicLine,
                },
                reportedError
            );
        }
    });
};

module.exports = {
    create(context) {
        if (!context.options[0] || !context.options[0].codeSmells) {
            return {};
        }

        if (context.getFilename().endsWith('.snap')) {
            return {
                ExpressionStatement(node) {
                    if (node.expression.right.type !== 'TemplateLiteral') {
                        return;
                    }

                    reportOnViolation({
                        context,
                        node,
                        snapshot: node.expression.right.quasis[0],
                    });
                },
            };
        } else if (context.getFilename().endsWith('.js')) {
            return {
                CallExpression(node) {
                    const propertyName =
                        node.callee.property && node.callee.property.name;
                    if (
                        propertyName === 'toMatchInlineSnapshot' ||
                        propertyName === 'toThrowErrorMatchingInlineSnapshot'
                    ) {
                        let snapshot;

                        // When snapshot is 1st argument:
                        // * toMatchInlineSnapshot(snapshot?: string): void,
                        // * toThrowErrorMatchingInlineSnapshot(snapshot?: string): void,
                        if (
                            node.arguments[0] &&
                            node.arguments[0].type === 'TemplateLiteral'
                        ) {
                            snapshot = node.arguments[0].quasis[0];
                        }

                        // When snapshot is 2nd argument:
                        // * toMatchInlineSnapshot(propertyMatchers?: any, snapshot?: string): void,
                        if (
                            node.arguments[1] &&
                            node.arguments[1].type === 'TemplateLiteral'
                        ) {
                            snapshot = node.arguments[1].quasis[0];
                        }

                        if (!snapshot) {
                            return;
                        }

                        reportOnViolation({
                            context,
                            node,
                            snapshot,
                        });
                    }
                },
            };
        }

        return {};
    },
};
