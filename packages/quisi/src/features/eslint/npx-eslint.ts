import { EOL } from 'node:os';
import npx from '../npx/npx.js';

const SUCCESS_STATUS_CODE = 0;

export default async function npxEslint(
  ...args: readonly string[]
): Promise<void> {
  // Set NODE_OPTIONS env to "--disable-warning=ESLintPoorConcurrencyWarning"
  const npxArgs: readonly string[] = [
    'eslint',
    '.',
    '--cache',
    '--cache-location',
    '.cache/eslint.json',
    '--exit-on-fatal-error',
    '--max-warnings',
    '9999',
    '--no-config-lookup',
    '--report-unused-disable-directives-severity',
    'error',
    '--report-unused-inline-configs',
    'error',
    ...args,
  ];

  const { exitCode, stderr, stdout } = await npx(...npxArgs);

  /**
   *   When the `eslint` command fails, it will emit via stderr, e.g.
   * Error: The 'jiti' library is required for loading TypeScript configuration
   * files. Make sure to install it.
   */
  if (stderr !== '') {
    throw new Error(stderr + EOL + stdout, {
      cause: npxArgs.join(' '),
    });
  }

  // When `eslint` encounters linting errors, it logs via stdout.
  if (exitCode !== SUCCESS_STATUS_CODE) {
    throw new Error(stdout, {
      cause: npxArgs.join(' '),
    });
  }
}
