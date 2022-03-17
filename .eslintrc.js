module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },

  rules: {
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 0,
  },
};
