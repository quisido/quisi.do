import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import debug from '../../utils/debug.js';
import requireResolve from '../../utils/require-resolve.js';
import npx from '../npx/npx.js';

const CONFIG_PATH: string = requireResolve('quisi/.attw.json');
const SUCCESS_STATUS_CODE = 0;

export default async function attw(): Promise<void> {
  const cwd: string = process.cwd();

  debug('[attw] ⏳');
  const { exitCode, stdout: json } = await npx(
    'attw',
    '--config-path',
    CONFIG_PATH,
    '--format',
    'json',
  );

  await writeFile(join(cwd, '.tests', 'attw.json'), json, {
    encoding: 'utf8',
  });

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
