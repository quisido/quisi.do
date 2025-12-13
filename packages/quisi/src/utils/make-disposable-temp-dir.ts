import type { DisposableTempDir } from 'node:fs';
import { mkdir, mkdtempDisposable } from 'node:fs/promises';
import { join } from 'node:path';

const QUISI_ROOT_DIR: string = join(import.meta.dirname, '..', '..');
const TEMP_DIR: string = join(QUISI_ROOT_DIR, '.cache', '.temp');
await mkdir(TEMP_DIR, { recursive: true });

const PREFIX: string = join(TEMP_DIR, '.quisi-');

export default async function makeDisposableTempDir(): Promise<DisposableTempDir> {
  return await mkdtempDisposable(PREFIX, { encoding: 'utf8' });
}
