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
                type: 'object',
                properties: {
                    parts: {
                        type: 'number',
                    },
                    cwd: {
                        type: 'string',
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            incorrectPath: 'Path should be \'{{expectedPath}}\'',
        },
        fixable: true,
    },
    create(context) {
        const parts = context.options[0].parts;

        return {
            ':matches(ImportDeclaration, ImportExpression[source.type=\'Literal\'])'(node) {
                const cwd = context.options[0].cwd || context.getCwd();
                const fileName = path
                    .relative(cwd, context.getFilename())
                    .replace(/\\/g, '/');

                const dirName = path.dirname(fileName);

                // the base at which outside of this it should be absolute and inside it should be relative
                const baseDir =
                    dirName.split('/').slice(0, parts).join('/');

                const importPath = node.source.value;
                const resolvedImportPath = importPath.startsWith('.') ?
                    path.join(dirName, importPath).replace(/\\/g, '/') :
                    importPath;

                let expectedPath = importPath;

                // its relative if its in the base dir exactly or a sub path
                const shouldBeRelative = resolvedImportPath === baseDir || resolvedImportPath.startsWith(baseDir + '/');

                if (shouldBeRelative) {
                    // if the current path is absolute (so wrong)
                    if (importPath === baseDir || importPath.startsWith(baseDir + '/')) {
                        let relativePath = path
                            .relative(dirName, resolvedImportPath)
                            .replace(/\\/g, '/');

                        if (!relativePath.startsWith('.')) {
                            relativePath = `./${relativePath}`;
                        }

                        // for importing a /index file like ./ it should just be '.'
                        if (relativePath.endsWith('/')) {
                            relativePath = relativePath.slice(0, relativePath.length - 1);
                        }

                        expectedPath = relativePath;
                    }
                } else if (
                    !shouldBeRelative &&
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
