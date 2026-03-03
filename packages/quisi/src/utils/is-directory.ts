import type { Stats } from 'node:fs';
import { stat } from 'node:fs/promises';

export default async function isDirectory(path: string): Promise<boolean> {
  try {
    const stats: Stats = await stat(path);
    return stats.isDirectory();
  } catch (_err: unknown) {
    return false;
  }
}
