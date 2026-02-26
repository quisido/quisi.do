import type { DisposableTempDir } from 'node:fs';
import { mkdir, mkdtempDisposable } from 'node:fs/promises';
import { join } from 'node:path';
import { onExit } from './exit.js';

const QUISI_ROOT_DIR: string = join(import.meta.dirname, '..', '..');
const TEMP_DIR: string = join(QUISI_ROOT_DIR, '.cache', '.temp');
const PREFIX: string = join(TEMP_DIR, '.quisi-');

export default async function makeDisposableTempDir(): Promise<DisposableTempDir> {
  /**
   *   While we could make the temporary directory in the module scope, a
   * failure there would exit the entire process instead of just the subtask
   * that needed the directory. By failing here, we can continue to run parallel
   * tasks that do not need this temporary directory.
   */
  await mkdir(TEMP_DIR, { recursive: true });

  const disposableTempDir: DisposableTempDir = await mkdtempDisposable(PREFIX, {
    encoding: 'utf8',
  });

  // This has been reliable. The log can be disabled until needed again.
  // debug(`Created temporary directory: ${disposableTempDir.path}`);

  onExit(async (): Promise<void> => {
    await disposableTempDir.remove();

    // This has been reliable. The log can be disabled until needed again.
    // debug(`Removed temporary directory: ${disposableTempDir.path}`);
  });

  return disposableTempDir;
}
