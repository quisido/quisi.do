import { EOL } from 'node:os';
import debug from '../../utils/debug.js';
import { ExitCode } from '../../utils/exit-code.js';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import execute from '../../utils/execute.js';

const ESLINT_CLI_PATH: string = fileURLToPath(
  new URL('./bin/eslint.js', import.meta.resolve('eslint/package.json')),
);

const MAX_ATTEMPTS = 9;

const RETRYABLE_EXIT_CODES = new Set<number>([
  ExitCode.AccessViolation,
  ExitCode.HeapCorruption,
  ExitCode.StackBufferOverrun,
]);

export default async function npxEslint(
  ...args: readonly string[]
): Promise<void> {
  const eslintArgs: readonly string[] = [
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
    const { exitCode, stderr, stdout } = await execute(process.execPath, [ESLINT_CLI_PATH, ...eslintArgs],
      {
        env: { NODE_OPTIONS: '--disable-warning=ESLintPoorConcurrencyWarning' },
      },
    );

    if (exitCode === 0) {
      return;
    }

    if (RETRYABLE_EXIT_CODES.has(exitCode) && attempt < MAX_ATTEMPTS) {
      debug(
        `[eslint] Retrying after ${ExitCode[exitCode]} exit code (${exitCode})`,
      );
      await lint(attempt + 1);
      return;
    }

    /**
     * When the `eslint` command fails, it will emit via stderr, e.g.
     * Error: The 'jiti' library is required for loading TypeScript configuration
     * files. Make sure to install it.
     * When `eslint` encounters linting errors, it logs via stdout.
     * For posterity, include both.
     */
    const message = [stderr, stdout].join(EOL).trim();
    if (message === '') {
      throw new Error(
        `ESLint failed with an unknown error (exit code ${exitCode})`,
        { cause: ['eslint', ...eslintArgs].join(' ') },
      );
    }

    throw new Error(
      [`ESLint failed with exit code ${exitCode}`, message].join(EOL),
      { cause: ['eslint', ...eslintArgs].join(' ') },
    );
  };

  await lint(1);
}
