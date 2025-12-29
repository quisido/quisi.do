import npx from '../npx/npx.js';

const SUCCESS_STATUS_CODE = 0;

export default async function publint(): Promise<void> {
  const { exitCode, stdout } = await npx('publint', '--strict');

  if (exitCode !== SUCCESS_STATUS_CODE) {
    throw new Error(stdout, {
      cause: 'publint --strict',
    });
  }
}
