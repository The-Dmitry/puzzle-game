module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 'prettier/prettier': 'error',
    // "import/extensions": ["error", "ignorePackages"],
    // "no-unused-vars": "warn",
    // 'no-console': 'off',
    // "func-names": "off",
    // "no-process-exit": "off",
    // "object-shorthand": "off",
    // "class-methods-use-this": "off",
  },
};
