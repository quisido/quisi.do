import { join } from 'node:path';
import parseJsonFile from './parse-json-file.js';

export default async function getPackageJson(): Promise<
  Record<string, unknown>
> {
  const cwd: string = process.cwd();
  return await parseJsonFile(join(cwd, 'package.json'));
}
