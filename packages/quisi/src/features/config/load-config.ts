import { join } from 'node:path';
import getDisposableTempDir from '../../utils/get-disposable-temp-dir.js';
import platformImport from '../../utils/platform-import.js';
import tsc from '../tsc/tsc.js';
import type { Config } from './config.js';
import validateConfig from './validate-config.js';

export default async function loadConfig(): Promise<Config> {
  const outDir: string = await getDisposableTempDir();
  await tsc(
    '--assumeChangesOnlyAffectDirectDependencies',
    '--module',
    'NodeNext',
    '--moduleResolution',
    'NodeNext',
    '--outDir',
    outDir,
    '--pretty',
    '--rootDir',
    process.cwd(),
    '--skipLibCheck',
    '--target',
    'ESNext',
    'quisi.config.ts',
  );

  const configPath: string = join(outDir, 'quisi.config.js');
  const importedConfig: unknown = await platformImport(configPath);

  if (typeof importedConfig !== 'object' || importedConfig === null) {
    throw new Error('`quisi.config.ts` must contain module exports.', {
      cause: JSON.stringify(importedConfig),
    });
  }

  if ('CONFIG' in importedConfig) {
    return validateConfig(importedConfig.CONFIG);
  }

  if ('default' in importedConfig) {
    return validateConfig(importedConfig.default);
  }

  throw new Error('`quisi.config.ts` must export a `CONFIG` property.', {
    cause: JSON.stringify(importedConfig),
  });
}
