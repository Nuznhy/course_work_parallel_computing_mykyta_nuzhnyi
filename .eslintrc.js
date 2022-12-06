module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'prettier/prettier': [
            'warn',
            {
                'no-console': false,
                singleQuote: true,
                printWidth: 120,
                proseWrap: 'always',
                tabWidth: 4,
                useTabs: false,
                trailingComma: 'none',
                bracketSpacing: true,
                jsxSingleQuote: false,
                semi: true
            }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        'no-unused-vars': 'off',
        'vue/no-unused-components': [
            'error',
            {
                ignoreWhenBindingPresent: true
            }
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                mocha: true
            }
        }
    ]
};
