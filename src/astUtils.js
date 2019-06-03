'use strict';

exports.getTokenIndent = function getTokenIndent(sourceCode, token) {
    const previousToken = sourceCode.getTokenBefore(token, { includeComments: true });
    const fromLoc = previousToken.range[1] - previousToken.loc.end.column;
    const toLoc = token.range[0];
    const lines = sourceCode.text.slice(fromLoc, toLoc).split('\n');
    const src = lines[lines.length - 1];
    const regExp = /^[\t ]+/;
    const indent = regExp.exec(src);
    return indent ? indent[0].length : 0;
};

/**
 * Get node indent
 * @param {ASTNode} node Node to examine
 * @return {Number} Indent
 */
exports.getNodeIndent = function getNodeIndent(sourceCode, node) {
    let src = sourceCode.getText(node, node.loc.start.column);
    const lines = src.split('\n');
    src = lines[0];

    const regExp = /^[\t ]+/;
    const indent = regExp.exec(src);
    return indent ? indent[0].length : 0;
};

/**
 * Takes from the eslint codebase. https://github.com/eslint/eslint/blob/master/lib/util/ast-utils.js
 * Determines if a node is surrounded by parentheses.
 * @param {SourceCode} sourceCode The ESLint source code object
 * @param {ASTNode} node The node to be checked.
 * @returns {boolean} True if the node is parenthesised.
 * @private
 */
exports.isParenthesised = function isParenthesised(sourceCode, node) {
    const previousToken = sourceCode.getTokenBefore(node);
    const nextToken = sourceCode.getTokenAfter(node);

    return Boolean(previousToken && nextToken) &&
        previousToken.value === '(' && previousToken.range[1] <= node.range[0] &&
        nextToken.value === ')' && nextToken.range[0] >= node.range[1];
};

// Gets the top level object name of a chain.
exports.getObjectName = (node) => {
    if (node.object.type === 'Identifier') {
        return node.object.name;
    }

    return exports.getObjectName(node.object.callee);
};
