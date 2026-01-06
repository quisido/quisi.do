import debug from '../../utils/debug.js';
import requireResolve from '../../utils/require-resolve.js';
import writeTestsFile from '../../utils/write-tests-file.js';
import npx from '../npx/npx.js';

const CONFIG_PATH: string = requireResolve('quisi/.attw.json');
const SUCCESS_STATUS_CODE = 0;

export default async function attw(): Promise<void> {
  debug('[attw] ⏳');
  const { exitCode, stdout: json } = await npx(
    'attw',
    '--config-path',
    CONFIG_PATH,
    '--format',
    'json',
  );

  await writeTestsFile('attw.json', json);

  if (exitCode !== SUCCESS_STATUS_CODE) {
    debug('[attw] ❌');

    const { stdout: tableFlipped } = await npx(
      'attw',
      '--config-path',
      CONFIG_PATH,
      '--format',
      'table-flipped',
    );

    throw new Error(tableFlipped, {
      cause: `attw`,
    });
  }

  debug('[attw] ✔️');
}
