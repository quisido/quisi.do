import { resolve } from 'node:path';
import type { Reference } from '../../types/tsconfig.js';
import parseJsonFile from '../../utils/parse-json-file.js';
import isReference from './is-reference.js';
import createTSConfigFile from './create-tsconfig-file.js';

interface Options {
  readonly id: string;
  readonly rootDir: string;
  readonly tsConfigPath: string;
}

export default async function createReferences({
  id,
  rootDir,
  tsConfigPath,
}: Options): Promise<readonly Reference[]> {
  const { references } = await parseJsonFile(tsConfigPath);

  if (!Array.isArray(references)) {
    return [];
  }

  const toQuisido = async (reference: unknown): Promise<Reference> => {
    if (!isReference(reference)) {
      throw new Error(
        `Invalid TypeScript configuration reference: ${JSON.stringify(reference)}`,
      );
    }

    return {
      ...reference,
      path: await createTSConfigFile({
        extends: resolve(rootDir, reference.path),
        id,
      }),
    };
  };

  return Promise.all(references.map(toQuisido));
}
