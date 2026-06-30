import type TSConfig from '../../types/tsconfig.js';
import writeTemporaryFile from '../../utils/write-temporary-file.js';
import createTSConfig from './create-tsconfig.js';

interface Options {
  readonly cwd: string;
  readonly id: string;
}

const CACHE = new Map<string, Map<string, string>>();
const CREATING = new Set<string>();

const getCachedTSConfigPath = (cwd: string, id: string): string | undefined => {
  return CACHE.get(cwd)?.get(id);
};

const setCachedTSConfigPath = (
  cwd: string,
  id: string,
  tsconfigPath: string,
): void => {
  const cwdCache = new Map<string, string>(CACHE.get(cwd));
  cwdCache.set(id, tsconfigPath);
  CACHE.set(cwd, cwdCache);
};

export default async function createTSConfigFile({
  cwd,
  id,
}: Options): Promise<string> {
  const cachedTSConfigPath: string | undefined = getCachedTSConfigPath(cwd, id);
  if (cachedTSConfigPath !== undefined) {
    return cachedTSConfigPath;
  }

  const creatingKey = `${cwd}:${id}`;
  if (CREATING.has(creatingKey)) {
    throw new Error(
      `TypeScript "${id}" configuration contains a circular reference for ${cwd}`,
    );
  }

  CREATING.add(creatingKey);
  const tsconfig: TSConfig = await createTSConfig({ cwd, id });

  const tsconfigPath: string = await writeTemporaryFile(
    `tsconfig.${id}.json`,
    JSON.stringify(tsconfig),
  );

  setCachedTSConfigPath(cwd, id, tsconfigPath);

  CREATING.delete(creatingKey);
  return tsconfigPath;
}
