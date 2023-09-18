export default function mapPackageNameToJson(name) {
  return {
    main: './index.cjs',
    name,
    type: 'commonjs',
    version: '0.0.1',
    peerDependencies: {
      [name]: '*',
    },
  };
}
