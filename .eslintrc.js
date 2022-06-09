module.exports = {
  root: true,
  extends: [
    '@metamask/eslint-config',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  overrides: [
    {
      files: ['*.js', '*.ts'],
      parserOptions: {
        sourceType: 'script',
      },
      globals: {
        wallet: 'readonly',
      },
      extends: ['@metamask/eslint-config-nodejs'],
    },

    {
      files: ['*.test.ts'],
      extends: ['@metamask/eslint-config-jest'],
    },
  ],
  rules: {
    '@typescript-eslint/no-inferrable-types': 0,
    'simple-import-sort/imports': 'warn',
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  ignorePatterns: ['!.eslintrc.js', '!.prettierrc.js', 'dist/'],
};
