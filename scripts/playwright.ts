import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import process from 'node:process';

// Install the browser revisions used by Vitest, even when another dependency
// exposes a different Playwright version through node_modules/.bin.
const REQUIRE: NodeJS.Require = createRequire(
  import.meta.resolve('@vitest/browser-playwright'),
);
const PLAYWRIGHT_DIRECTORY: string = dirname(
  REQUIRE.resolve('playwright/package.json'),
);
const [, , ...ARGS] = process.argv;
const { error, signal, status } = spawnSync(
  process.execPath,
  [join(PLAYWRIGHT_DIRECTORY, 'cli.js'), ...ARGS],
  { stdio: 'inherit' },
);

if (error) {
  throw new Error('Could not run the Vitest Playwright CLI.', { cause: error });
}

if (status === null) {
  throw new Error(
    `The Vitest Playwright CLI terminated with signal ${signal}.`,
  );
}

process.exitCode = status;
