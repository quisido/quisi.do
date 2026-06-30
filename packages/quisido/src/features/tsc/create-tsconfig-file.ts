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
  const cwdCache = new Map<string, Promise<string> | string>(CACHE.get(extendsPath));
  cwdCache.set(id, tsconfigPath);
  CACHE.set(extendsPath, cwdCache);
};

export default async function createTSConfigFile({
  extends: extendsPath,
  id,
}: Options): Promise<string> {
  const cachedTSConfigPath: Promise<string> | string | undefined = getCachedTSConfigPath(extendsPath, id);
  if (cachedTSConfigPath !== undefined) {
    return cachedTSConfigPath;
  }

  const executor = async (resolve: (value: string) => void, reject: (reason: unknown) => void): Promise<void> => {
    try {
      const hash: string = Buffer.from(extendsPath).toString('base64url');
      const tsconfig: TSConfig = await createTSConfig({ extends: extendsPath, id });
      const tsconfigPath: string = await writeTemporaryFile(
        `tsconfig.${hash}.${id}.json`,
        JSON.stringify(tsconfig),
      );
      resolve(tsconfigPath);
    } catch (err: unknown) {
      reject(err);
    }
  };

  const eventualTSConfigPath = new Promise<string>(executor);
  setCachedTSConfigPath(extendsPath, id, eventualTSConfigPath);
  return eventualTSConfigPath;
}
