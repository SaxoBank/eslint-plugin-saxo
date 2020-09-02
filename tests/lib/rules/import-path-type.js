'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../src/rules/import-path-type');
const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
        jsx: true,
    },
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('import-path-type', rule, {
    valid: [
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\modules\\sampleModule\\component\\component.jsx',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 4,
                },
            ],
            code: `
import * as otherComponent from './otherComponent';
import component from 'src/frontend/modules/otherModule/component';
`,
        },
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\modules\\sampleModule\\component\\component.jsx',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 4,
                },
            ],
            code: `
import * as otherComponent from '..';
`,
        },
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\modules\\sampleModule\\component.jsx',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 4,
                },
            ],
            code: `
import * as otherComponent from '.';
import component from 'src/frontend/modules/otherModule/component';
`,
        },
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\modules\\orange\\foo.js',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 4,
                },
            ],
            code: `
import bar from 'src/frontend/modules/orangejuice/bar';
`,
        },
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\modules\\orange\\foo.js',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 4,
                },
            ],
            code: `
import(/* webpackChunkName: "chunk", webpackPreload: true */ './bar');
`,
        },
    ],
    invalid: [
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\modules\\sampleModule\\component\\component.jsx',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 4,
                },
            ],
            code: `
import * as otherComponent from '../../otherModule/Component';
import component from 'src/frontend/modules/sampleModule/component';
import { sampleOtherComponent } from 'src/frontend/components/sampleModule/component/test';
`,
            output: `
import * as otherComponent from 'src/frontend/modules/otherModule/Component';
import component from '.';
import { sampleOtherComponent } from 'src/frontend/components/sampleModule/component/test';
`,
            errors: [
                {
                    message:
                        'Path should be \'src/frontend/modules/otherModule/Component\'',
                },
                {
                    message: 'Path should be \'.\'',
                },
            ],
        },
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\app\\desktop\\component\\component.jsx',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 3,
                },
            ],
            code: `
import * as tabletComponent from 'src/frontend/app/tablet/Component';
import component from '../../../modules/otherModule/component';
`,
            output: `
import * as tabletComponent from '../../tablet/Component';
import component from 'src/frontend/modules/otherModule/component';
`,
            errors: [
                {
                    message: 'Path should be \'../../tablet/Component\'',
                },
                {
                    message:
                        'Path should be \'src/frontend/modules/otherModule/component\'',
                },
            ],
        },
        {
            filename:
                '/drives/c/projects/sample/src/frontend/app/desktop/component/component.jsx',
            options: [
                {
                    cwd: '/drives/c/projects/sample',
                    parts: 3,
                },
            ],
            code: `
import * as tabletComponent from 'src/frontend/app/tablet/Component';
import component from '../../../modules/otherModule/component';
`,
            output: `
import * as tabletComponent from '../../tablet/Component';
import component from 'src/frontend/modules/otherModule/component';
`,
            errors: [
                {
                    message: 'Path should be \'../../tablet/Component\'',
                },
                {
                    message:
                        'Path should be \'src/frontend/modules/otherModule/component\'',
                },
            ],
        },
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\modules\\orange\\foo.js',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 4,
                },
            ],
            code: `
import bar from '../orangejuice/bar';
`,
            output: `
import bar from 'src/frontend/modules/orangejuice/bar';
`,
            errors: [
                {
                    message:
                        'Path should be \'src/frontend/modules/orangejuice/bar\'',
                },
            ],
        },
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\modules\\sampleModule\\component\\component.jsx',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 4,
                },
            ],
            code: `
import * as otherComponent from 'src/frontend/modules/sampleModule';
`,
            output: `
import * as otherComponent from '..';
`,
            errors: [{
                message:
                    'Path should be \'..\'',
            }],

        },
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\modules\\sampleModule\\component.jsx',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 4,
                },
            ],
            code: `
import * as otherComponent from 'src/frontend/modules/sampleModule';
`,

            output: `
import * as otherComponent from '.';
`,
            errors: [{
                message:
                    'Path should be \'.\'',

            }],
        },
        {
            filename:
                'C:\\Projects\\SampleProject\\src\\frontend\\modules\\orange\\foo.js',
            options: [
                {
                    cwd: 'C:\\Projects\\SampleProject',
                    parts: 4,
                },
            ],
            code: `
import(/* webpackChunkName: "chunk", webpackPreload: true */ 'src/frontend/modules/orange/bar');
`,
            output: `
import(/* webpackChunkName: "chunk", webpackPreload: true */ './bar');
`,
            errors: [{
                message: 'Path should be \'./bar\'',
            }],
        }],
});
