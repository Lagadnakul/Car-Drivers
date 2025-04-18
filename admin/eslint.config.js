import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Ignore build directories
  { ignores: ['dist', 'build', 'node_modules'] },
  
  // Common JS/JSX files configuration
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
        __dirname: 'readonly'
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      
      // Handle unused variables - allowing variables starting with uppercase or underscore
      'no-unused-vars': ['warn', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_', 
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        args: 'after-used'
      }],
      
      // React refresh plugin rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // React hooks specific rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Code style rules
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single', { avoidEscape: true }],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-var': 'warn',
      'prefer-const': 'warn',
      'no-duplicate-imports': 'error',
      
      // Console usage
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      // Object related rules
      'object-shorthand': ['warn', 'always'],
      'no-useless-rename': 'warn',
      
      // Function related rules
      'prefer-arrow-callback': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],
      
      // Other useful rules
      'eqeqeq': ['warn', 'always', { 'null': 'ignore' }],
      'no-else-return': 'warn',
    },
  },
  
  // Specific overrides for different file patterns if needed
  {
    files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      // We often need to use test values in tests
      'no-unused-vars': 'off'
    }
  },
  
  // Component files
  {
    files: ['**/src/components/**/*.{js,jsx}'],
    rules: {
      // Add any component-specific rules here
    }
  },
  
  // Page files
  {
    files: ['**/src/pages/**/*.{js,jsx}'],
    rules: {
      // Add any page-specific rules here
    }
  },
  
  // Config files
  {
    files: ['**/*.config.{js,jsx}', '**/*rc.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    }
  }
]