import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// Vitest's provider can resolve a different Playwright version than npx does.
const requireFromProvider = createRequire(
  import.meta.resolve('@vitest/browser-playwright'),
);
const playwrightDirectory = dirname(
  requireFromProvider.resolve('playwright/package.json'),
);
const result = spawnSync(
  process.execPath,
  [
    join(playwrightDirectory, 'cli.js'),
    'install',
    '--only-shell',
    'chromium',
    'firefox',
    'webkit',
  ],
  { stdio: 'inherit' },
);

if (typeof result.error !== 'undefined') {
  throw new Error(
    'Failed to install browsers for the Vitest browser provider.',
    {
      cause: result.error,
    },
  );
}

if (result.status !== 0) {
  throw new Error(
    `Vitest browser installation failed: status=${String(result.status)}, signal=${String(result.signal)}`,
  );
}
