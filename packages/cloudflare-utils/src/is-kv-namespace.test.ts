import { describe, expect, it } from 'vitest';
import noop from '../test/noop.js';
import { isKVNamespace } from './index.js';

describe('isKVNamespace', (): void => {
  it('should return false for non-KV Namespaces', (): void => {
    expect(isKVNamespace(null)).toBe(false);
    expect(isKVNamespace({})).toBe(false);
  });

  it('should return true for KV namespaces', (): void => {
    expect(
      isKVNamespace({
        delete: noop,
        get: noop,
        getWithMetadata: noop,
        list: noop,
        put: noop,
      }),
    ).toBe(true);
  });
});
