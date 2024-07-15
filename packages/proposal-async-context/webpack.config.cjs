const { readdirSync } = require('node:fs');
const { dirname, join, resolve } = require('node:path');
const ts = require('ts-loader');

const PACKAGE = dirname(require.resolve('proposal-async-context/package.json'));
const FILENAMES = readdirSync(join(PACKAGE, 'src'));
const mapFilenameToAbsolutePath = filename => join(PACKAGE, 'src', filename);
const reduceFilenamesToEntry = (entry, filename) => ({
  ...entry,
  [filename.replace(/\.ts$/, '')]: mapFilenameToAbsolutePath(filename),
});

/** @type {import('webpack').Configuration} */
module.exports = {
  cache: false,
  devtool: 'source-map',
  entry: FILENAMES.reduce(reduceFilenamesToEntry, {}),
  mode: 'production',

  experiments: {
    outputModule: true,
  },

  module: {
    rules: [
      {
        exclude: /\.test\.ts$/,
        include: /\.ts$/,
        loader: 'ts-loader',
        /** @type {import('ts-loader/dist/interfaces.d.ts').LoaderOptions} */
        options: {
          allowTsInNodeModules: true,
          onlyCompileBundledFiles: false,
          transpileOnly: false,
          compilerOptions: {
            declaration: true,
            declarationDir: join(__dirname, 'dist'),
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            noEmit: false,
            rootDir: PACKAGE,
            sourceMap: true,
            types: [
              dirname(require.resolve('@types/mocha/package.json')),
              dirname(require.resolve('@types/node/package.json')),
            ],
          },
        },
      },
    ],
  },

  loader: {
    'ts-loader': ts,
  },

  output: {
    chunkFormat: 'module',
    chunkLoading: 'import',
    filename: '[name].js',
    libraryTarget: 'module',
    module: true,
    path: join(resolve('dist'), 'src'),
  },

  resolve: {
    cache: false,
    cacheWithContext: false,
    extensions: ['.ts'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
  },
};
