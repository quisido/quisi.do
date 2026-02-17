import { join, relative, resolve } from 'node:path';
import process from 'node:process';

/**
 *   Joins the given path segments with the current working directory, ensuring
 * that the resulting path does not traverse outside of the current working
 * directory.
 */
export default function joinCwdPath(...segments: readonly string[]): string {
  const cwd: string = process.cwd();
  const resolvedPath: string = resolve(cwd, ...segments);
  const relativePath: string = relative(cwd, resolvedPath);

  if (relativePath.startsWith('..') || resolve(relativePath) !== resolvedPath) {
    throw new Error(`Path traversal detected: ${segments.join('/')}`);
  }

  return join(cwd, ...segments);
}
