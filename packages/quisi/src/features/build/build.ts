import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import getDisposableTempDir from '../../utils/get-disposable-temp-dir.js';
import type { Config } from '../config/config.js';
import tsc from '../tsc/tsc.js';
import createTSConfig from './create-tsconfig.js';

export default async function build({ skipLibCheck }: Config): Promise<void> {
  const tempDir: string = await getDisposableTempDir();

  const tsconfigPath: string = join(tempDir, 'tsconfig.build.json');
  const tsconfig: Record<string, unknown> = await createTSConfig({
    skipLibCheck,
  });
  await writeFile(tsconfigPath, JSON.stringify(tsconfig), { encoding: 'utf8' });

  await tsc('--project', tsconfigPath);
}
