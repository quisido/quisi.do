export default function mapPackageNameToJson(name) {
  return {
    main: './index.js',
    name,
    type: 'commonjs',
    version: '0.0.1',
    exports: {
      '.': './index.js',
    },
    peerDependencies: {
      [name]: '*',
    },
  };
}
