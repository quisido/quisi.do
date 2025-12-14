import { readFile } from 'fs/promises';
import { join } from 'path';
import debug from './debug.js';

const CACHE = new Map<string, Record<string, unknown>>();

export default async function mapPathToPackageJson(
  path: string,
): Promise<Record<string, unknown>> {
  const cachedPackageJson: Record<string, unknown> | undefined =
    CACHE.get(path);

  if (typeof cachedPackageJson !== 'undefined') {
    return cachedPackageJson;
  }

  try {
    const json: unknown = JSON.parse(
      await readFile(join(path, 'package.json'), {
        encoding: 'utf8',
      }),
    );

    if (typeof json !== 'object' || json === null || Array.isArray(json)) {
      debug(`Invalid package.json at path: ${path}`);
      return {};
    }

    CACHE.set(path, json as Record<string, unknown>);
    return json as Record<string, unknown>;
  } catch (_err: unknown) {
    return {};
  }
}
