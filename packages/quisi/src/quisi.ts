#!/usr/bin/env node
import type { DisposableTempDir } from 'node:fs';
import type { Config } from './features/config/config.js';
import loadConfig from './features/config/load-config.js';
import Quisi from './features/quisi.js';
import makeDisposableTempDir from './utils/make-disposable-temp-dir.js';

const onDebug = (message: string): void => {
  // eslint-disable-next-line no-console
  console.debug(`[quisi] ${message}`);
};

const disposableTempDir: DisposableTempDir = await makeDisposableTempDir();
onDebug(`Created temporary directory: ${disposableTempDir.path}`);

process.on('exit', (): void => {
  void disposableTempDir.remove();
  onDebug(`Removed temporary directory: ${disposableTempDir.path}`);
});

const config: Config = await (async (): Promise<Config> => {
  try {
    return await loadConfig({
      tempDir: disposableTempDir.path,
    });
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error('Failed to load `quisi.config.ts`:', err);
    return {};
  }
})();

const QUISI: Quisi = new Quisi({
  ...config,
  onDebug(message: string): void {
    // eslint-disable-next-line no-console
    console.debug(`[quisi] ${message}`);
  },
});

// eslint-disable-next-line no-console
console.log(QUISI.coverage);
