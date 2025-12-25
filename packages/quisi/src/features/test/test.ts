import process from 'node:process';
import mapToString from '../../utils/map-to-string.js';
import randomInt from '../../utils/random-int.js';
import type TestConfig from '../config/test-config.js';
import eslint from '../eslint/eslint.js';

const MAX_CONCURRENCY = 4;
const MIN_CONCURRENCY = 1;

export default async function test({
  eslintConfigFile,
}: TestConfig): Promise<void> {
  const errorLogs: string[] = [];
  const concurrency: number = randomInt(MIN_CONCURRENCY, MAX_CONCURRENCY);
  try {
    await eslint({ concurrency, eslintConfigFile });
  } catch (err: unknown) {
    errorLogs.push(mapToString(err));
    process.exitCode = 1;
  }

  // eslint-disable-next-line no-console
  console.error(...errorLogs);
}
