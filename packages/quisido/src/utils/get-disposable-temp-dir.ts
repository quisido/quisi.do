import type { DisposableTempDir } from 'node:fs';
import makeDisposableTempDir from './make-disposable-temp-dir.js';

let disposableTempDir: DisposableTempDir | Promise<DisposableTempDir> | null =
  null;

export default async function getDisposableTempDir(): Promise<string> {
  disposableTempDir ??= makeDisposableTempDir();

  if (disposableTempDir instanceof Promise) {
    return disposableTempDir.then((dir: DisposableTempDir): string => {
      disposableTempDir = dir;
      return dir.path;
    });
  }

  return disposableTempDir.path;
}
