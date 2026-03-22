import type TSConfig from '../../types/tsconfig.js';
import writeTemporaryFile from '../../utils/write-temporary-file.js';
import createTSConfig from './create-tsconfig.js';

interface Options {
  readonly id: string;
}

export default async function createTSConfigFile({
  id,
}: Options): Promise<string> {
  const tsconfig: TSConfig = await createTSConfig({ id });

  const tsconfigPath: string = await writeTemporaryFile(
    `tsconfig.${id}.json`,
    JSON.stringify(tsconfig),
  );

  return tsconfigPath;
}
