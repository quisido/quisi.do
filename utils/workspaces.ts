import { type Dirent } from 'node:fs';
import { readdir } from 'node:fs/promises';
import isDirectory from './is-directory.js';

const ENTRIES: readonly Dirent[] = await readdir(
  new URL('../packages/', import.meta.url),
  { withFileTypes: true },
);

export const WORKSPACES: readonly Dirent[] = ENTRIES.filter(isDirectory);
