import type TSConfig from '../../types/tsconfig.js';
import writeTemporaryFile from '../../utils/write-temporary-file.js';
import createTSConfig from './create-tsconfig.js';

export default async function createTSConfigFile(): Promise<string> {
  const tsconfig: TSConfig = await createTSConfig();

  const tsconfigPath: string = await writeTemporaryFile(
    'tsconfig.build.json',
    JSON.stringify(tsconfig),
  );

  return tsconfigPath;
}
