import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import getDisposableTempDir from './get-disposable-temp-dir.js';

export default async function writeTemporaryFile(
  path: string,
  content: string,
): Promise<string> {
  const tempDir: string = await getDisposableTempDir();
  const tempFilePath: string = join(tempDir, path);
  await writeFile(tempFilePath, content, 'utf8');
  return tempFilePath;
}
