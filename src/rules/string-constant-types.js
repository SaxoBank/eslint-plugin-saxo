'use strict';

module.exports = {
    create(context) {
        let isFlowAnnotated = false;

        return {
            Program(node) {
                isFlowAnnotated = node.comments.some(
                    (comment) => comment.value.trim() === '@flow'
                );
            },
            ExportNamedDeclaration(node) {
                if (!isFlowAnnotated) {
                    return;
                }

                // E.g. export { default } from './container'
                if (!node.declaration) {
                    return;
                }

                if (node.declaration.kind !== 'const') {
                    return;
                }

                const [declaration] = node.declaration.declarations;

                if (!declaration.init || declaration.init.type !== 'Literal') {
                    return;
                }

                if (typeof declaration.init.value !== 'string') {
                    return;
                }

                if (declaration.id.typeAnnotation) {
                    return;
                }

                const maxLiteralLength = 100;
                if (declaration.init.value.length > maxLiteralLength) {
                    return;
                }

                const message = `String literals should be typed. Expected to be of the form \`${declaration.id.name}: ${declaration.init.raw}\``;

                context.report({
                    node: declaration,
                    message,
                    fix(fixer) {
                        return fixer.insertTextAfter(
                            declaration.id,
                            `: ${declaration.init.raw}`
                        );
                    },
                });
            },
        };
    },
};
