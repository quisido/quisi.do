import process from 'node:process';
import getPackageJson from '../../utils/get-package-json.js';
import mapToString from '../../utils/map-to-string.js';
import attw from '../attw/attw.js';
import type TestConfig from '../config/test-config.js';
import eslint from '../eslint/eslint.js';
import publint from '../publint/publint.js';
import quisiTest from './quisi-test.js';
// import vitest from '../vitest/vitest.js';

interface Report {
  readonly file: string;
  readonly message: string;
  readonly tool: string;
}

export default async function test({
  coverage: _coverage,
}: TestConfig): Promise<readonly Report[]> {
  const reports: Report[] = [];

  const handleError = ({
    file,
    tool,
  }: Omit<Report, 'message'>): ((err: unknown) => void) => {
    return (err: unknown): void => {
      reports.push({ file, message: mapToString(err), tool });
      process.exitCode = 1;
    };
  };

  const { private: isPrivate } = await getPackageJson();

  if (isPrivate !== true) {
    await attw().catch(handleError({ file: 'attw.json', tool: 'attw' }));
  }

  await eslint().catch(handleError({ file: 'eslint.json', tool: 'eslint' }));
  await publint().catch(handleError({ file: 'publint.txt', tool: 'publint' }));
  await quisiTest().catch(handleError({ file: '', tool: 'quisi' }));
  // await vitest().catch(handleError);

  return reports;
}
