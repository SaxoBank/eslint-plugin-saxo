'use strict';

/**
 * Enforce or disallow spaces inside of curly braces in JSX attributes.
 * A opinionated version of the react-plugin rule - https://github.com/yannickcr/eslint-plugin-react/blob/master/lib/rules/jsx-curly-spacing.js
 */

const { getTokenIndent } = require('../astUtils');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Enforce opinionated curly brace style in JSX attributes',
            category: 'Stylistic Issues',
        },
        fixable: 'code',
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        // --------------------------------------------------------------------------
        // Helpers
        // --------------------------------------------------------------------------

        function isRequiringNewLine(leftCurly, rightCurly) {
            const afterLeft = sourceCode.getTokenAfter(leftCurly, { includeComments: true });
            if (afterLeft === rightCurly) {
                return false;
            }
            const beforeRight = sourceCode.getTokenBefore(rightCurly, { includeComments: true });

            // single token or single line, then no newline
            if (beforeRight === afterLeft || afterLeft.loc.end.line === beforeRight.loc.start.line) {
                return false;
            }

            const leftCurlyIndent = getTokenIndent(sourceCode, leftCurly);
            const lastTokenIndent = getTokenIndent(sourceCode, beforeRight);

            return lastTokenIndent > leftCurlyIndent;
        }

        /**
         * Trims text of whitespace between two ranges
         * @param {Fixer} fixer - the eslint fixer object
         * @param {Location} fromLoc - the start location
         * @param {Location} toLoc - the end location
         * @param {string} mode - either 'start' or 'end'
         * @returns {Object|*|{range, text}}
         */
        function fixByTrimmingWhitespace(fixer, fromLoc, toLoc, mode) {
            let replacementText = sourceCode.text.slice(fromLoc, toLoc);
            if (mode === 'start') {
                replacementText = replacementText.replace(/^\s+/g, '');
            } else {
                replacementText = replacementText.replace(/\s+$/g, '');
            }
            return fixer.replaceTextRange([fromLoc, toLoc], replacementText);
        }

        function requireNoWhitespaceAtStart(node, token) {
            const nextToken = sourceCode.getTokenAfter(token, { includeComments: true });
            const fromLoc = token.range[1];
            const toLoc = nextToken.range[0];
            const text = sourceCode.text.slice(fromLoc, toLoc);
            if (text.match(/^\s+/g)) {
                context.report({
                    node,
                    loc: token.loc.start,
                    message: `There should be no whitespace after '${token.value}'`,
                    fix(fixer) {
                        return fixByTrimmingWhitespace(fixer, fromLoc, toLoc, 'start');
                    },
                });
            }

        }

        function requireNoWhitespaceAtEnd(node, token) {
            const previousToken = sourceCode.getTokenBefore(token, { includeComments: true });
            const fromLoc = previousToken.range[1];
            const toLoc = token.range[0];
            const text = sourceCode.text.slice(fromLoc, toLoc);
            if (text.match(/\s+$/g)) {
                context.report({
                    node,
                    loc: token.loc.start,
                    message: `There should be no whitespace before '${token.value}'`,
                    fix: previousToken.type === 'Line' ? undefined : function fix(fixer) {
                        return fixByTrimmingWhitespace(fixer, previousToken.range[1], token.range[0], 'end');
                    },
                });
            }
        }

        function requireNewLineAtEnd(node, token) {
            const previousToken = sourceCode.getTokenBefore(token, { includeComments: true });
            const fromLoc = previousToken.range[1];
            const toLoc = token.range[0];
            const text = sourceCode.text.slice(fromLoc, toLoc);
            if (!text.match(/[\t \r]*\n[\t \r]*$/g)) {
                context.report({
                    node,
                    loc: token.loc.start,
                    message: `There should be a newline before '${token.value}'`,
                    fix(fixer) {
                        return fixer.insertTextBefore(token, '\n');
                    },
                });
            }
        }

        /**
         * Determines if spacing in curly braces is valid.
         * @param {ASTNode} node The AST node to check.
         * @returns {void}
         */
        function validateBraceSpacing(node) {
            if (node.parent.type !== 'JSXAttribute' && node.parent.type !== 'JSXOpeningElement' && node.parent.type !== 'JSXElement') {
                return;
            }
            const first = context.getFirstToken(node);
            const last = sourceCode.getLastToken(node);

            requireNoWhitespaceAtStart(node, first);

            if (node.parent.type === 'JSXElement' && isRequiringNewLine(first, last)) {
                requireNewLineAtEnd(node, last);
            } else {
                requireNoWhitespaceAtEnd(node, last);
            }
        }

        // --------------------------------------------------------------------------
        // Public
        // --------------------------------------------------------------------------

        return {
            JSXExpressionContainer: validateBraceSpacing,
            JSXSpreadAttribute: validateBraceSpacing,
        };
    },
};
