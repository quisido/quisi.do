// `@babel/preset-typescript` does not yet support fully-qualified imports.
const REPLACE_IMPORT_EXTENSION = [
  'replace-import-extension',
  {
    extMapping: {
      '.js': '.ts',
    },
  },
];

module.exports = [REPLACE_IMPORT_EXTENSION];
