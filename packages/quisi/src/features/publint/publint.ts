import debug from '../../utils/debug.js';
import writeTestsFile from '../../utils/write-tests-file.js';
import npx from '../npx/npx.js';

const SUCCESS_STATUS_CODE = 0;

export default async function publint(): Promise<void> {
  debug('[publint] ⏳');
  const { exitCode, stdout } = await npx('publint', '--strict');

  if (exitCode !== SUCCESS_STATUS_CODE) {
    debug('[publint] ❌');
    await writeTestsFile('publint.txt', stdout);
    throw new Error(stdout, {
      cause: 'publint --strict',
    });
  }

  debug('[publint] ✔️');
}
