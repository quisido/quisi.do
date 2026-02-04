import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export default async function readPackageFile(
  path: string,
): Promise<string | null> {
  const cwd: string = process.cwd();
  try {
    return await readFile(join(cwd, path), 'utf8');
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}
