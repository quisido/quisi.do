import mapToString from '../../utils/map-to-string.js';
import type StartConfig from '../config/start-config.js';
import tsc from '../tsc/tsc.js';
import createTSConfigFile from './create-tsconfig-file.js';

export default async function start({
  skipLibCheck,
}: StartConfig): Promise<void> {
  const errorLogs: string[] = [];

  const handleError = (err: unknown): void => {
    errorLogs.push(mapToString(err));
    process.exitCode = 1;
  };

  // tsc
  /**
   *   If this fails because `@types/node` mismatches, then a package has an
   * outdated version in `node_modules/`. `npm install @types/node@latest` does
   * not seem to fix it; you can delete `node_modules/` and remove references to
   * "packages/__/node_modules/@types/node" in `package-lock.json`. You can find
   * these references by Ctrl-F for "/@types/node" with the `/` prefix.
   */
  try {
    const tsconfigFile: string = await createTSConfigFile({ skipLibCheck });
    await tsc('--project', tsconfigFile, '--watch');
  } catch (err: unknown) {
    handleError(err);
  }

  if (errorLogs.length > 0) {
    globalThis.console.error(...errorLogs);
  }
}
