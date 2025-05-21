module.exports = {
  printWidth: 100,
  tabWidth: 2,
  bracketSameLine: true,
  trailingComma: 'es5',
  doubleQuote: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindAttributes: ['className'],
};
