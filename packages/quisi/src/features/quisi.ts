import type { DisposableTempDir } from 'node:fs';
import { mkdtempDisposable } from 'node:fs/promises';
import type { Config } from '../types/config.js';
import mapPlatformToNpxCommand from '../utils/map-platform-to-npx-command.js';
import loadConfig from './load-config.js';

interface Options {
  readonly cwd: string;
  readonly onBeforeExit: (callback: () => Promise<void>) => void;
  readonly platform: NodeJS.Platform;
}

export default class Quisi {
  readonly #cwd: string;
  #disposableTempDir: DisposableTempDir | null = null;
  // readonly #npmCommand: readonly [string, ...(readonly string[])];
  readonly #npxCommand: readonly [string, ...(readonly string[])];
  readonly #onBeforeExit: (callback: () => Promise<void>) => void;

  public constructor({ cwd, onBeforeExit, platform }: Options) {
    this.#cwd = cwd;
    // this.#npmCommand = mapPlatformToNpmCommand(platform);
    this.#npxCommand = mapPlatformToNpxCommand(platform);
    this.#onBeforeExit = onBeforeExit;
  }

  async #getDisposableTempDir(): Promise<string> {
    if (this.#disposableTempDir !== null) {
      return this.#disposableTempDir.path;
    }

    const disposableTempDir: DisposableTempDir =
      await mkdtempDisposable('quisi-');
    this.#disposableTempDir = disposableTempDir;
    this.#onBeforeExit(async (): Promise<void> => {
      await disposableTempDir.remove();
      this.#disposableTempDir = null;
    });
    return disposableTempDir.path;
  }

  public async loadConfig(): Promise<Config> {
    return await loadConfig({
      cwd: this.#cwd,
      npxCommand: this.#npxCommand,
      tempDir: await this.#getDisposableTempDir(),
    });
  }
}
