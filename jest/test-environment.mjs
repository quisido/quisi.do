import { createRequire } from 'module';

const require = createRequire(import.meta.url);

require('../.pnp.cjs').setup();

require('dd-trace').init({
  flushInterval: 300000,
  service: 'charlesstover.com',
});

export default require('jest-environment-jsdom');
