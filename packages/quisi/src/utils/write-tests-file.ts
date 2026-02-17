import { mkdir, writeFile } from 'node:fs/promises';
import joinCwdPath from './join-path.js';

// Writes a test output file to the `.tests` directory.

export default async function writeTestsFile(
  path: string,
  content: string,
): Promise<string> {
  const testsDir: string = joinCwdPath('.tests');

  // Ensure the directory exists before writing to it.
  await mkdir(testsDir, { recursive: true });

  const testsPath: string = joinCwdPath('.tests', path);
  await writeFile(testsPath, content, 'utf8');
  return testsPath;
}
