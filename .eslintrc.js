module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'node'],
  parserOptions: {
    ecmaVersion: 2016,
  },
  rules: {
    camelcase: 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'object-curly-newline': 'off',
    'import/no-commonjs': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'import/no-nodejs-modules': 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        functions: 'never',
      },
    ],
  },
};
