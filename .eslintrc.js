module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    babelOptions: {
      configFile: './babel.config.js',
    },
  },
  extends: [
    '@wavesenterprise/eslint-config/typescript-mixed',
    '@wavesenterprise/eslint-config/react',
  ],
  rules: {
    'no-redeclare': 'off',
  },
  globals: {
    ROOT_URL: 'readonly',
    heap: 'readonly',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
}
