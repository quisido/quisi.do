import { EOL } from 'node:os';
import npx from '../npx/npx.js';
import debug from '../../utils/debug.js';
import { ExitCode } from '../../utils/exit-code.js';

const MAX_ATTEMPTS = 9;

const RETRYABLE_EXIT_CODES = new Set<number>([
  ExitCode.AccessViolation,
  ExitCode.HeapCorruption,
  ExitCode.StackBufferOverrun,
]);

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

  const lint = async (attempt: number): Promise<void> => {
    const { exitCode, stderr, stdout } = await npx(...npxArgs);
    if (exitCode === 0) {
      return;
    }

    if (RETRYABLE_EXIT_CODES.has(exitCode) && attempt < MAX_ATTEMPTS) {
      debug(`[eslint] Retrying after exit code: ${exitCode}`);
      await lint(attempt + 1);
      return;
    }

    /**
     *   When the `eslint` command fails, it will emit via stderr, e.g.
     * Error: The 'jiti' library is required for loading TypeScript configuration
     * files. Make sure to install it.
     *   When `eslint` encounters linting errors, it logs via stdout.
     *   For posterity, include both.
     */
    const message = [stderr, stdout].join(EOL).trim();
    if (message === '') {
      throw new Error(
        `ESLint failed with an unknown error (exit code ${exitCode})`,
        { cause: npxArgs.join(' ') },
      );
    }

    throw new Error(message, {
      cause: npxArgs.join(' '),
    });
  };

  await lint(1);
}
