import { join } from 'node:path';
import type { Config } from '../types/config.js';
import transpileConfig from './config/transpile-config.js';
import validateConfig from './validate-config.js';

interface Options {
  readonly cwd: string;
  readonly npxCommand: readonly [string, ...(readonly string[])];
  readonly tempDir: string;
}

export default async function loadConfig({
  cwd,
  npxCommand: [npxFile, ...npxArgs],
  tempDir,
}: Options): Promise<Config> {
  try {
    const { stderr, stdout } = await transpileConfig({
      configFilePath: join(cwd, 'quisi.config.ts'),
      npxCommand: [npxFile, ...npxArgs],
      tempDir,
    });

    if (stdout !== '') {
      console.log(stdout);
    }

    if (stderr !== '') {
      console.error(stderr);
    }

    // const config: unknown = JSON.parse(configStr);
    return validateConfig(stdout);
  } catch (err: unknown) {
    console.error(err);
    return {};
  }
}
