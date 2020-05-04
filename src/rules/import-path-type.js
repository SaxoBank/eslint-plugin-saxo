'use strict';
const path = require('path');

module.exports = {
    meta: {
        docs: {
            description:
                'enforce imports are absolute or relative depending on how many directory levels deep they are trying to escape from',
            recommended: false,
        },
        schema: [
            {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        parts: {
                            type: 'number',
                        },
                        paths: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                    },
                    additionalProperties: false,
                },
            },
        ],
        messages: {
            incorrectPath: 'Path should be \'{{expectedPath}}\'',
        },
        fixable: true,
    },
    create(context) {
        const rules = context.options[0];

        return {
            ImportDeclaration(node) {
                let fileName = context.getFilename().replace(/\\/g, '/');

                let ruleParts;
                rules.forEach(({ paths, parts }) => {
                    paths.forEach((rulePath) => {
                        if (fileName.indexOf(rulePath) >= 0) {
                            ruleParts = parts;
                            fileName = fileName.slice(
                                fileName.indexOf(rulePath)
                            );
                        }
                    });
                });

                if (ruleParts == null) {
                    return;
                }
                const dirName = path.dirname(fileName);

                // the base at which outside of this it should be absolute and inside it should be relative
                const baseDir = dirName
                    .split('/')
                    .slice(0, ruleParts)
                    .join('/');

                const importPath = node.source.value;
                const resolvedImportPath = importPath.startsWith('.') ?
                    path.join(dirName, importPath).replace(/\\/g, '/') :
                    importPath;

                let expectedPath = importPath;

                if (resolvedImportPath.startsWith(baseDir)) {
                    // should be relative
                    if (importPath.startsWith(baseDir)) {
                        let relativePath = path
                            .relative(dirName, resolvedImportPath)
                            .replace(/\\/g, '/');

                        if (!relativePath.startsWith('.')) {
                            relativePath = `./${relativePath}`;
                        }

                        expectedPath = relativePath;
                    }
                } else if (
                    !importPath.startsWith(baseDir) &&
                    resolvedImportPath !== importPath
                ) {
                    // should be absolute
                    expectedPath = resolvedImportPath;
                }

                if (expectedPath !== importPath) {
                    context.report({
                        node,
                        messageId: 'incorrectPath',
                        data: { expectedPath },
                        fix(fixer) {
                            return fixer.replaceText(
                                node.source,
                                `'${expectedPath}'`
                            );
                        },
                    });
                }
            },
        };
    },
};
