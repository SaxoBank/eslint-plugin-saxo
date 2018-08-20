# jsx-enforce-spec-describe

The eslint spec describe rule enforces *.spec.* unit tests top level describe method to have first argument matching path of file under test.

The rule accepts _topLevelDir_ option which allows to suggest expected fix. Example:

```json
"saxo/jsx-enforce-spec-describe": [
    "error",
    {
        "topLevelDir": "Project/Source/FrontendApp/js/"
    }
],
```

For `Project/Source/FrontendApp/js/` the spec file located in `C:\Projects\Source\FrontendApp\js\src\modules\foo\foo.spec.jsx'` the first argument of `describe` method will be enforced to be `'src/modules/foo/foo'`.

This also works for unix paths, example: `/home/dev/Project/Source/FrontendApp/js/src/modules/foo/foo.spec.jsx'` -> `'src/modules/foo/foo'`.

The rule is autofixable.

## Rule Details

The following patterns are considered problems:

```js
/*
"saxo/jsx-enforce-spec-describe": [
    "error",
    {
        "topLevelDir": "SampleProject/Source/SampleProject.App/js/"
    }
],
*/

// for file location: 'C:\\Projects\\SampleProject\\Source\\SampleProject.App\\js\\src\\modules\\sampleModule\\component\\component.spec.jsx',
describe('src/modules/incorrect/directory/and/file', () => {
    it('should throw error for unit test description not matching path', () => {})
})
// This will be autofixed to:
describe('src/modules/sampleModule/component/component', () => {
    it('should throw error for unit test description not matching path', () => {})
})

// for file location: '/some/dir/SampleProject/Source/SampleProject.App/js/src/modules/sampleModule/component/component.spec.jsx',
describe('src/modules/incorrect/directory/and/file', () => {
    it('should throw error for unit test description not matching path', () => {})
})
// This will be autofixed to:
describe('src/modules/sampleModule/component/component', () => {
    it('should throw error for unit test description not matching path', () => {})
})
```

The following patterns are not considered warnings:

```js
/*
"saxo/jsx-enforce-spec-describe": [
    "error",
    {
        "topLevelDir": "SampleProject/Source/SampleProject.App/js/"
    }
],
*/

// for file location: 'C:\\Projects\\SampleProject\\Source\\SampleProject.App\\js\\src\\modules\\sampleModule\\component\\component.jsx'
describe(() => {
    it('should be valid for non spec file with windows path', () => {})
})

// for file location: 'C:\\Projects\\SampleProject\\Source\\SampleProject.App\\js\\src\\modules\\sampleModule\\component\\component.spec.jsx',
describe('src/modules/sampleModule/component/component', () => {
    it('should be valid for spec file with expected windows path in the description', () => {})
})

// for file location: '/some/dir/SampleProject/Source/SampleProject.App/js/src/modules/sampleModule/component/component.jsx',
describe(() => {
    it('should be valid for non spec file with unix path', () => {})
})

// for file location: '/some/dir/SampleProject/Source/SampleProject.App/js/src/modules/sampleModule/component/component.spec.jsx',
describe('src/modules/sampleModule/component/component', () => {
    it('should be valid for spec file with expected unix path in the description', () => {})
})

// for file location: 'C:\\Projects\\SampleProject\\Source\\SampleProject.App\\js\\src\\modules\\sampleModule\\component\\component.spec.jsx',
describe('src/modules/sampleModule/component/component', () => {
    describe('anything', () => {
        it('should allow anything in the nested describe', () => {})
    })
})
```
