module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        // Code Quality
        'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        'no-console': 'warn',
        'no-debugger': 'error',
        'no-alert': 'warn',
        
        // Best Practices
        'eqeqeq': 'error',
        'curly': 'error',
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-script-url': 'error',
        
        // Style
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'no-trailing-spaces': 'error',
        'eol-last': 'error',
        
        // ES6+
        'prefer-const': 'error',
        'no-var': 'error',
        'prefer-arrow-callback': 'error',
        'arrow-spacing': 'error',
        
        // Functions
        'no-unused-expressions': 'error',
        'no-unreachable': 'error',
        'consistent-return': 'error'
    },
    globals: {
        // Browser globals
        'localStorage': 'readonly',
        'sessionStorage': 'readonly',
        'fetch': 'readonly',
        'URL': 'readonly',
        'URLSearchParams': 'readonly',
        
        // Custom globals for the app
        'workoutTracker': 'writable'
    }
};