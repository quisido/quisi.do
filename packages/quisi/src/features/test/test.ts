import process from 'node:process';
import mapToString from '../../utils/map-to-string.js';
import attw from '../attw/attw.js';
import type TestConfig from '../config/test-config.js';
import eslint from '../eslint/eslint.js';
import publint from '../publint/publint.js';
// import vitest from '../vitest/vitest.js';

export default async function test({
  eslintConfigFile,
}: TestConfig): Promise<void> {
  const errorLogs: string[] = [];

  const handleError = (err: unknown): void => {
    errorLogs.push(mapToString(err));
    process.exitCode = 1;
  };

  await attw().catch(handleError);
  await eslint({ eslintConfigFile }).catch(handleError);
  await publint().catch(handleError);
  // await vitest().catch(handleError);

  // eslint-disable-next-line no-console
  console.error(...errorLogs);
}
