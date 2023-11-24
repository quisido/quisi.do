import pnp from './utils/pnp.js';

pnp('@monorepo-template/ignore-cypress-dependency-logs');
pnp('bluebird');
pnp('cypress');

pnp('@cypress/code-coverage', {
  'support': 'support.js',
});
