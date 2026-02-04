/// <reference types="@types/node" />
import process from 'node:process';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

// Writes a test output file to the `.tests` directory.

export default async function writeTestsFile(
  path: string,
  content: string,
): Promise<string> {
  const cwd: string = process.cwd();
  const testsDir: string = join(cwd, '.tests');

  // Ensure the directory exists before writing to it.
  await mkdir(testsDir, { recursive: true });

  const testsPath: string = join(testsDir, path);
  await writeFile(testsPath, content, 'utf8');
  return testsPath;
}
