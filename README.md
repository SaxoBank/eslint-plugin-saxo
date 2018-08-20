ESLint-Plugin-Saxo
==================

ESLint rules that have been developed at Saxo to enforce a range of project specific and general standards.

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

    $ npm install eslint

If you installed `ESLint` globally, you have to install the plugin globally too. Otherwise, install it locally.

    $ npm install eslint-plugin-saxo

# Configuration

Add a `plugins` section and specify eslint-plugin-saxo as a plugin.

Then, enable all of the rules that you would like to use.

## Recommended configuration
This plugin exports a `recommended` configuration that enforces all the rules. You can configure the plugin as follows:

```json
{
  "plugins": ["saxo"],
  "extends": ["plugin:saxo/recommended"]
}
```
# List of provided rules
Rules are divided into categories for your convenience. All rules are off by default, unless you use one of the plugin's configurations which turn all relevant rules on.

### Stylistic Issues
These rules are purely matters of style and are quite subjective.
* [jsx-conditional-indent](docs/rules/jsx-conditional-indent.md): Require a indented line when a conditional expression spans multiple lines inside JSX.
* [jsx-conditional-newline](docs/rules/jsx-conditional-newline.md): Require a newline when a conditional expression is used within JSX.
* [jsx-conditional-parens](docs/rules/jsx-conditional-parens.md): Require no parens when JSX is used within a conditional.
* [jsx-curly-spacing-opinionated](docs/rules/jsx-curly-spacing-opinionated.md): Require particular spacing rules that cannot be defined using jsx-curly-spacing inside eslint-plugin-react.
* [jsx-enforce-prop-usage](docs/rules/jsx-enforce-prop-usage.md): Enforce how props are used. Can help to enforce extracting inline function calls to variables.
* [jsx-enforce-spec-describe](docs/rules/jsx-enforce-spec-describe.md): Enforces *.spec.* unit tests top level describe method to have first argument matching path of file under test.

# Contributing
Contributions are always welcome!.

# License

eslint-plugin-saxo is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
