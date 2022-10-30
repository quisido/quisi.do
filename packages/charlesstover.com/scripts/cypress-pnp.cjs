const { mkdirSync, writeFileSync } = require('fs');

const SPACES = 2;

const PACKAGE_JSON = {
  name: 'cypress',
  version: '0.0.1',
  main: './index.cjs',
  type: 'commonjs',
  peerDependencies: {
    cypress: '*',
  },
};

mkdirSync('./node_modules/cypress', {
  recursive: true,
});

writeFileSync(
  './node_modules/cypress/package.json',
  JSON.stringify(PACKAGE_JSON, null, SPACES),
);

writeFileSync(
  './node_modules/cypress/index.cjs',
  `require('../../../../.pnp.cjs').setup();
module.exports = require('cypress');`,
);
