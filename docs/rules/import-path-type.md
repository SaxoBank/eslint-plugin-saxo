# import-path-type

This rule ensures that for certain directories in a project, everything up to a certain directory level is relative and everything above that directory level is absolute.

The rule accepts an array of option. Example:

```json
"saxo/import-path-type": [
    "error",
    {
      "parts": 4,
    }    
],
```

This specifies that for modules in the modules folder, anything trying to escape its own module needs to use an absolute path and anything inside should use a relative one.

The rule is autofixable.

## Rule Details

The following patterns are considered problems:

```js
/*
"saxo/jsx-enforce-spec-describe": [
    "error",
    {
      "parts": 4,
    }    
],
*/

// for file location: 'C:\Projects\SampleProject\src\frontend\modules\sampleModule\component\component.jsx',
import * as otherComponent from '../../otherModule/Component';
import component from 'src/frontend/modules/sampleModule/component';

// This will be autofixed to:
import * as otherComponent from 'src/frontend/modules/otherModule/Component';
import component from './';
```

The following patterns are not considered warnings:

```js
/*
"saxo/jsx-enforce-spec-describe": [
    "error",
    {
      "parts": 4,
    }
],
*/

// for file location: 'C:\Projects\SampleProject\src\frontend\modules\sampleModule\component\component.jsx',
import * as otherComponent from 'src/frontend/modules/otherModule/Component';
import component from './';
```
