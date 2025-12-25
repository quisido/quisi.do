import mapToString from '../../utils/map-to-string.js';
import type BuildConfig from '../config/build-config.js';
import tsc from '../tsc/tsc.js';
import createTSConfigFile from './create-tsconfig-file.js';

export default async function build({
  skipLibCheck,
}: BuildConfig): Promise<void> {
  const errorLogs: string[] = [];

  // tsc
  /**
   *   If this fails because `@types/node` mismatches, then a package has an
   * outdated version in `node_modules/`. `npm install @types/node@latest` does
   * not seem to fix it; you can delete `node_modules/` and remove references to
   * "packages/__/node_modules/@types/node" in `pacxkage-lock.json`. You can
   * find these references by Ctrl-F for "/@types/node" with the `/` prefix.
   */
  try {
    const tsconfigFile: string = await createTSConfigFile({ skipLibCheck });
    await tsc('--project', tsconfigFile);
  } catch (err: unknown) {
    errorLogs.push(mapToString(err));
    process.exitCode = 1;
  }

  // eslint-disable-next-line no-console
  console.error(...errorLogs);
}
