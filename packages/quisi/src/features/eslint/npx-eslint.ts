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

  const { exitCode, stdout } = await npx(...npxArgs);

  // `eslint` emits errors via stdout.
  if (exitCode !== SUCCESS_STATUS_CODE) {
    throw new Error(stdout, {
      cause: npxArgs.join(' '),
    });
  }
}
