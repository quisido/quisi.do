import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type TSConfig from '../../types/tsconfig.js';
import getDisposableTempDir from '../../utils/get-disposable-temp-dir.js';
import createTSConfig from './create-tsconfig.js';

interface Options {
  readonly skipLibCheck?: boolean | undefined;
}

export default async function createTSConfigFile({
  skipLibCheck,
}: Options): Promise<string> {
  const tempDir: string = await getDisposableTempDir();
  const tsconfigPath: string = join(tempDir, 'tsconfig.build.json');
  const tsconfig: TSConfig = await createTSConfig({ skipLibCheck });
  const tsconfigStr: string = JSON.stringify(tsconfig);
  await writeFile(tsconfigPath, tsconfigStr, { encoding: 'utf8' });
  return tsconfigPath;
}
