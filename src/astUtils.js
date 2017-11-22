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
