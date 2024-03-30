const ENV = [
  '@babel/preset-env',
  {
    targets: {
      node: 'current',
    },
  },
];

module.exports = [ENV, '@babel/preset-typescript'];
