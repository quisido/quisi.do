import type TSConfig from '../../types/tsconfig.js';
import writeTemporaryFile from '../../utils/write-temporary-file.js';
import createTSConfig from './create-tsconfig.js';

interface Options {
  readonly skipLibCheck?: boolean | undefined;
}

export default async function createTSConfigFile({
  skipLibCheck,
}: Options): Promise<string> {
  const tsconfig: TSConfig = await createTSConfig({ skipLibCheck });

  const tsconfigPath: string = await writeTemporaryFile(
    'tsconfig.build.json',
    JSON.stringify(tsconfig),
  );

  return tsconfigPath;
}
