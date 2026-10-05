/// <reference types="node" />
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { chromium } from '@playwright/test';

const BROWSER_DIRECTORY = mkdtempSync(join(tmpdir(), 'lighthouse-ci-'));

try {
  // Installed Chrome has an Ubuntu AppArmor profile that permits its sandbox.
  // Give slow runners more time to launch than Lighthouse's default 25 seconds.
  const browser = await chromium.launchPersistentContext(BROWSER_DIRECTORY, {
    args: ['--remote-debugging-port=0'],
    channel: 'chrome',
    chromiumSandbox: true,
    headless: true,
    // Lighthouse audits the back/forward cache, which Playwright disables.
    ignoreDefaultArgs: ['--disable-back-forward-cache'],
    timeout: 120_000,
  });

  try {
    const [port] = readFileSync(
      join(BROWSER_DIRECTORY, 'DevToolsActivePort'),
      'utf8',
    ).split('\n');
    if (port === undefined || !/^\d+$/u.test(port)) {
      throw new Error(
        'Chrome did not provide a valid Lighthouse debugging port.',
      );
    }

    process.exitCode = await new Promise<number>((resolve, reject) => {
      const audit = spawn(
        'npx',
        [
          'concurrently',
          '--hide',
          'serve',
          '--kill-others',
          '--kill-others-on-fail',
          '--names',
          'lighthouse,serve',
          '--prefix-colors',
          'auto',
          '--success',
          'command-lighthouse',
          `npx wait-on http://localhost:3000/ --timeout 30s && npx lighthouse http://localhost:3000/ --port=${port} --budget-path=lighthouse.budget.json --config-path=lighthouse.config.js --enable-error-reporting --output=html,json --output-path=lighthouse --preset=experimental --save-assets`,
          'npx serve _site --listen 3000',
        ],
        { stdio: 'inherit' },
      );

      audit.once('error', reject);
      audit.once('close', code => {
        resolve(code ?? 1);
      });
    });
  } finally {
    await browser.close();
  }
} catch (cause) {
  throw new Error('Failed to run Lighthouse CI with sandboxed Chrome.', {
    cause,
  });
} finally {
  rmSync(BROWSER_DIRECTORY, { force: true, recursive: true });
}
