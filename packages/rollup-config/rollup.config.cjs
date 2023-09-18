// Who transpiles the transpiler? Oh, it's Babel. 👄

require('@babel/register')({
  babelrc: false,
  cache: false,
  cloneInputAst: false,
  compact: false,
  extensions: ['.js', '.ts'],
  filename: 'src/index.ts',
  minified: false,
  sourceFileName: 'index.ts',
  sourceMaps: 'inline',
  sourceRoot: 'src',
  sourceType: 'module',

  caller: {
    name: '@quisido/rollup-config',
    supportsDynamicImport: true,
    supportsExportNamespaceFrom: true,
    supportsStaticESM: true,
    supportsTopLevelAwait: true,
  },

  plugins: [
    // When Babel sees an ESM import, resolve it to its TypeScript counterpart.
    [
      'babel-plugin-add-import-extension',
      {
        extension: 'ts',
        observedScriptExtensions: ['js'],
        replace: true,
      },
    ],
  ],

  presets: [
    [
      "@babel/preset-env",
      {
        modules: 'commonjs',
        useBuiltIns: false,
        targets: {
          esmodules: true,
          node: "current",
        },
      },
    ],
    [
      "@babel/preset-typescript",
      {
        allExtensions: true,
        disallowAmbiguousJSXLike: true,
        optimizeConstEnums: false,
      },
    ],
  ],
});

module.exports = require('./src/index.ts').default;
