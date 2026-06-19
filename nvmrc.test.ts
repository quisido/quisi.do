import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const NODE_VERSION = await readFile(new URL('.nvmrc', import.meta.url), 'utf8');

describe('.nvmrc', (): void => {
  it('should pin a Node version supported by the dependency graph', (): void => {
    expect(NODE_VERSION.trim()).toBe('24.15.0');
  });
});
