import npx from '../npx/npx.js';

const SUCCESS_STATUS_CODE = 0;

export default async function vitest(): Promise<void> {
  const { exitCode, stdout } = await npx('vitest', 'run');

  if (exitCode !== SUCCESS_STATUS_CODE) {
    throw new Error(stdout, {
      cause: 'vitest run',
    });
  }
}
