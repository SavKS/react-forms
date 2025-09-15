import eslintJs from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default defineConfig([
    {
        files: [
            '**/*.{ts,tsx}'
        ],

        extends: [
            eslintJs.configs.recommended,
            tsEslint.configs.recommended
        ],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },

            parser: tsEslint.parser,

            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },

    {
        rules: {
            'no-console': [
                'error'
            ],

            'no-alert': [
                'error'
            ],
            'no-debugger': [
                'error'
            ],

            'curly': [
                'error'
            ],

            'no-cond-assign': [
                'off'
            ]
        }
    },

    {
        plugins: {
            '@stylistic': stylistic
        },

        rules: {
            '@stylistic/brace-style': [
                'error'
            ],

            '@stylistic/no-multi-spaces': [
                'error'
            ],

            '@stylistic/comma-dangle': [
                'error',
                'never'
            ],

            '@stylistic/comma-spacing': [
                'error'
            ],

            '@stylistic/semi': [
                'error',
                'always'
            ],

            '@stylistic/indent': [
                'error',
                4,
                {
                    SwitchCase: 1,
                    ignoredNodes: [
                        'PropertyDefinition[decorators]',
                        'TSUnionType',
                        'TSTypeParameterInstantiation',
                        'TSIntersectionType'
                    ]
                }
            ],

            '@stylistic/space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    named: 'never',
                    asyncArrow: 'always'
                }
            ],

            '@stylistic/space-infix-ops': [
                'error',
                {
                    int32Hint: false
                }
            ],

            '@stylistic/space-unary-ops': [
                'error',
                {
                    words: true,
                    nonwords: false
                }
            ],

            '@stylistic/object-curly-spacing': [
                'error',
                'always'
            ],

            '@stylistic/array-bracket-spacing': [
                'error',
                'always'
            ],

            '@stylistic/template-curly-spacing': [
                'error',
                'always'
            ],

            '@stylistic/arrow-spacing': [
                'error'
            ],

            '@stylistic/space-before-blocks': [
                'error'
            ],

            '@stylistic/keyword-spacing': [
                'error'
            ],

            '@stylistic/computed-property-spacing': [
                'error',
                'always'
            ],

            '@stylistic/quotes': [
                'error',
                'single'
            ],

            '@stylistic/jsx-quotes': [
                'error',
                'prefer-double'
            ],

            '@stylistic/quote-props': [
                'error',
                'consistent-as-needed'
            ],

            '@stylistic/key-spacing': [
                'error'
            ],

            '@stylistic/no-whitespace-before-property': [
                'error'
            ],

            '@stylistic/arrow-parens': [
                'error',
                'as-needed'
            ],

            '@stylistic/no-multiple-empty-lines': [
                'error',
                {
                    max: 1
                }
            ],

            '@stylistic/type-annotation-spacing': [
                'error'
            ],

            '@stylistic/member-delimiter-style': [
                'error',
                {
                    multiline: {
                        delimiter: 'comma',
                        requireLast: false
                    },
                    singleline: {
                        delimiter: 'comma',
                        requireLast: false
                    },
                    multilineDetection: 'brackets'
                }
            ],

            '@stylistic/jsx-self-closing-comp': [
                'error'
            ],

            '@stylistic/jsx-max-props-per-line': [
                'error',
                {
                    maximum: {
                        single: 1,
                        multi: 2
                    }
                }
            ],

            '@stylistic/jsx-curly-spacing': [
                'error',
                {
                    when: 'always',
                    children: true
                }
            ],

            '@stylistic/jsx-first-prop-new-line': [
                'error',
                'multiline'
            ],

            '@stylistic/jsx-closing-bracket-location': [
                'error',
                {
                    nonEmpty: 'line-aligned',
                    selfClosing: 'line-aligned'
                }
            ],

            '@stylistic/jsx-tag-spacing': [
                'error',
                {
                    beforeClosing: 'never'
                }
            ],

            '@stylistic/jsx-wrap-multilines': [
                'error',
                {
                    return: 'parens-new-line'
                }
            ],

            '@stylistic/jsx-curly-brace-presence': [
                'error'
            ],

            '@stylistic/jsx-sort-props': [
                'error',
                {
                    callbacksLast: true,
                    reservedFirst: true,
                    noSortAlphabetically: true,
                    shorthandLast: true
                }
            ]
        }
    },

    {
        rules: {
            '@typescript-eslint/dot-notation': [
                'error'
            ],

            '@typescript-eslint/no-explicit-any': 'off',

            '@typescript-eslint/no-non-null-assertion': [
                'off'
            ],

            '@typescript-eslint/no-require-imports': 'off',

            '@typescript-eslint/no-this-alias': [
                'off'
            ],

            'no-unused-vars': [
                'off'
            ],

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_'
                }
            ]
        }
    },

    {
        extends: [
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript
        ],

        rules: {
            'sort-imports': [
                'error',
                {
                    ignoreDeclarationSort: true
                }
            ],

            'import/no-unresolved': 'off',

            'import/newline-after-import': [
                'error',
                {
                    count: 1
                }
            ],

            'import/no-duplicates': 'off',
            'import/no-named-as-default': 'off',

            'import/order': [
                'error',
                {
                    'alphabetize': {
                        order: 'asc',
                        caseInsensitive: true
                    },
                    'newlines-between': 'always',
                    'groups': [
                        [
                            'builtin',
                            'external'
                        ],
                        'internal',
                        'parent',
                        [
                            'sibling',
                            'index'
                        ]
                    ],
                    'pathGroups': [
                        {
                            pattern: '@control/**',
                            group: 'internal'
                        },
                        {
                            pattern: '@control-plugins/**',
                            group: 'internal'
                        },
                        {
                            pattern: '@services.d',
                            group: 'internal'
                        },
                        {
                            pattern: '@/**',
                            group: 'internal'
                        },
                        {
                            pattern: '@root/**',
                            group: 'internal'
                        },
                        {
                            pattern: '@UI/**',
                            group: 'internal'
                        }
                    ],
                    'pathGroupsExcludedImportTypes': [
                        'builtin'
                    ]
                }
            ]
        }
    },

    {
        settings: {
            react: {
                version: '19'
            }
        },

        extends: [
            eslintReact.configs[ 'recommended-typescript' ]
        ],

        plugins: {
            'react': pluginReact,
            'react-hooks': pluginReactHooks
        },

        rules: {
            'react-hooks/exhaustive-deps': [
                'error',
                {
                    additionalHooks: 'useDeepCompareMemo|useDidUpdate'
                }
            ],

            'react/display-name': [
                'error',
                {
                    checkContextObjects: true
                }
            ],

            'react/prop-types': [
                'off'
            ],

            'react-hooks/rules-of-hooks': [
                'error'
            ],

            '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': [
                'off'
            ],

            '@eslint-react/dom/no-dangerously-set-innerhtml': [
                'off'
            ],

            '@eslint-react/no-array-index-key': [
                'off'
            ]
        }
    },

    {
        ignores: [
            '!.generated'
        ]
    }
]);
