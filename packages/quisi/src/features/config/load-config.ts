import { join } from 'node:path';
import platformImport from '../../utils/platform-import.js';
import tsc from '../tsc/tsc.js';
import type { Config } from './config.js';
import validateConfig from './validate-config.js';

interface Options {
  readonly tempDir: string;
}

export default async function loadConfig({
  tempDir,
}: Options): Promise<Config> {
  await tsc('--outDir', tempDir, '--rootDir', process.cwd(), 'quisi.config.ts');

  const configPath: string = join(tempDir, 'quisi.config.js');
  const importedConfig: unknown = await platformImport(configPath);
  if (
    typeof importedConfig !== 'object' ||
    importedConfig === null ||
    !('CONFIG' in importedConfig)
  ) {
    throw new Error('`quisi.config.ts` must export a `CONFIG` property.', {
      cause: importedConfig,
    });
  }

  return validateConfig(importedConfig.CONFIG);
}
