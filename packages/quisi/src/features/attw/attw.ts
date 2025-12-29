import npx from '../npx/npx.js';

const SUCCESS_STATUS_CODE = 0;

export default async function attw(): Promise<void> {
  const { exitCode, stdout } = await npx('attw', '--quiet');

  if (exitCode !== SUCCESS_STATUS_CODE) {
    throw new Error(stdout, {
      cause: 'attw --quiet',
    });
  }
}
