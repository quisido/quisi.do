import { dirname, join } from 'node:path';
import type { Reference } from '../../types/tsconfig.js';
import parseJsonFile from '../../utils/parse-json-file.js';
import isReference from './is-reference.js';
import createTSConfigFile from './create-tsconfig-file.js';

interface Options {
  readonly cwd: string;
  readonly id: string;
}

export default async function createReferences({
  cwd,
  id,
}: Options): Promise<readonly Reference[]> {
  const tsconfigPath: string = join(cwd, 'tsconfig.json');
  const { references } = await parseJsonFile(tsconfigPath);

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
        cwd: dirname(reference.path),
        id,
      }),
    };
  };

  return Promise.all(references.map(toQuisido));
}
