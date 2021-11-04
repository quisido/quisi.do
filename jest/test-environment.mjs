import { createRequire } from 'module';

const require = createRequire(import.meta.url);

require('../.pnp.cjs').setup();

// Enable DataDog tracing in CI.
if (process.env.DD_ENV === 'ci') {
  require('dd-trace').init({
    flushInterval: 300000,
    service: 'charlesstover.com',
  });
}

export default require('jest-environment-jsdom');
