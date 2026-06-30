import { readFile } from 'node:fs/promises';
import debug from './debug.js';
import toString from './to-string.js';

const CACHE = new Map<string, Record<string, unknown>>();

const isValidJson = (json: unknown): json is Record<string, unknown> =>
  typeof json === 'object' && json !== null && !Array.isArray(json);

export default async function parseJsonFile(
  path: string,
): Promise<Record<string, unknown>> {
  const cached: Record<string, unknown> | undefined = CACHE.get(path);
  if (cached !== undefined) {
    return cached;
  }

  try {
    const json: unknown = JSON.parse(await readFile(path, 'utf8'));

    if (isValidJson(json)) {
      CACHE.set(path, json);
      return json;
    }

    debug(`Invalid JSON file @ ${path}`);
    CACHE.set(path, {});
    return {};
  } catch (err: unknown) {
    debug(`Invalid JSON file @ ${path}: ${toString(err)}`);
    CACHE.set(path, {});
    return {};
  }
}
