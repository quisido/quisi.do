import { readFile } from 'node:fs/promises';
import joinCwdPath from './join-path.js';

export default async function readPackageFile(
  path: string,
): Promise<string | null> {
  try {
    return await readFile(joinCwdPath(path), 'utf8');
  } catch (err: unknown) {
    // If the file doesn't exist, simply return null.
    if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
      return null;
    }

    throw err;
  }
}
