import type TSConfig from '../../types/tsconfig.js';
import writeTemporaryFile from '../../utils/write-temporary-file.js';
import createTSConfig from './create-tsconfig.js';

interface Options {
  readonly extends: string;
  readonly id: string;
}

const CACHE = new Map<string, Map<string, Promise<string> | string>>();

const getCachedTSConfigPath = (extendsPath: string, id: string): Promise<string> | string | undefined => {
  return CACHE.get(extendsPath)?.get(id);
};

const setCachedTSConfigPath = (
  extendsPath: string,
  id: string,
  tsconfigPath: Promise<string> | string,
): void => {
  const cacheById = new Map<string, Promise<string> | string>(CACHE.get(extendsPath));
  cacheById.set(id, tsconfigPath);
  CACHE.set(extendsPath, cacheById);
};

export default async function createTSConfigFile({
  extends: extendsPath,
  id,
}: Options): Promise<string> {
  const cachedTSConfigPath: Promise<string> | string | undefined = getCachedTSConfigPath(extendsPath, id);
  if (typeof cachedTSConfigPath === 'string') {
    return cachedTSConfigPath;
  }

  if (cachedTSConfigPath instanceof Promise) {
    throw new Error(`A circular reference was detected while creating a TypeScript configuration file for \`${extendsPath}\`.`);
  }

  const eventualTSConfigPath = (async (): Promise<string> => {
    const hash: string = Buffer.from(extendsPath).toString('base64url');
    const tsconfig: TSConfig = await createTSConfig({ extends: extendsPath, id });
    const tsconfigPath: string = await writeTemporaryFile(
      `tsconfig.${hash}.${id}.json`,
      JSON.stringify(tsconfig),
    );
    setCachedTSConfigPath(extendsPath, id, tsconfigPath);
    return tsconfigPath;
  })();

  setCachedTSConfigPath(extendsPath, id, eventualTSConfigPath);
  return eventualTSConfigPath;
}
