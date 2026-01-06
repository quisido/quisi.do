import { rename, stat } from 'node:fs/promises';
import { join } from 'node:path';
import debug from '../../utils/debug.js';
import getDisposableTempDir from '../../utils/get-disposable-temp-dir.js';
import getPackageJson from '../../utils/get-package-json.js';
import platformImport from '../../utils/platform-import.js';
import tsc from '../tsc/tsc.js';

export default async function loadConfig(): Promise<object> {
  const cwd: string = process.cwd();

  // Check if a config file exists.
  try {
    await stat(join(cwd, 'quisi.config.ts'));
  } catch {
    // debug('No `quisi.config.ts` file found.');
    return {};
  }

  const outDir: string = await getDisposableTempDir();
  await tsc(
    '--module',
    'NodeNext',
    '--moduleResolution',
    'NodeNext',
    '--outDir',
    outDir,
    '--pretty',
    '--rootDir',
    cwd,
    '--skipLibCheck',
    '--target',
    'ESNext',
    'quisi.config.ts',
  );

  const getConfigPath = async (): Promise<string> => {
    const { type } = await getPackageJson();
    const jsPath: string = join(outDir, 'quisi.config.js');
    if (type === 'commonjs') {
      debug('Renaming CommonJS config file to `.cjs`.');
      const cjsPath: string = join(outDir, 'quisi.config.cjs');
      await rename(jsPath, cjsPath);
      return cjsPath;
    }

    return jsPath;
  };

  const configPath: string = await getConfigPath();
  const importedConfig: unknown = await platformImport(configPath);

  if (typeof importedConfig !== 'object' || importedConfig === null) {
    throw new Error('`quisi.config.ts` must contain module exports.', {
      cause: JSON.stringify(importedConfig),
    });
  }

  return importedConfig;
}
