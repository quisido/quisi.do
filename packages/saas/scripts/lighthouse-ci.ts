/// <reference types="node" />
import { spawnSync } from 'node:child_process';

import { chromium } from '@playwright/test';

// Use the installed Playwright browser instead of a runner-provided Chrome.
const result = spawnSync('bash', ['./scripts/lighthouse-serve.sh'], {
  env: {
    ...process.env,
    CHROME_PATH: chromium.executablePath(),
  },
  stdio: 'inherit',
});

if (result.error !== undefined) {
  throw new Error('Failed to start the local Lighthouse audit.', {
    cause: result.error,
  });
}

process.exitCode = result.status ?? 1;
