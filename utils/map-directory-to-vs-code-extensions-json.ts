import { type Dirent } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type VSCodeExtensionsJson from '../types/vs-code-extensions-json.js';
import validateVSCodeExtensions from './validate-vs-code-extensions-json.js';

export default async function mapDirectoryToVsCodeExtensionsJson(
  dirent: Dirent,
): Promise<VSCodeExtensionsJson> {
  const contents: string = await readFile(
    join(dirent.parentPath, dirent.name, '.vscode', 'extensions.json'),
    'utf8',
  );

  const json: unknown = JSON.parse(contents);
  return validateVSCodeExtensions(json);
}
