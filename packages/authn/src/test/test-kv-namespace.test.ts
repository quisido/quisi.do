import { describe, expect, it } from 'vitest';
import TestKVNamespace from './test-kv-namespace.js';

describe('TestKVNamespace', (): void => {
  it('should throw an error when getting an unimplemented option', async (): Promise<void> => {
    const namespace = new TestKVNamespace({});

    await expect(async (): Promise<void> => {
      await namespace.get('test', 'arrayBuffer');
    }).rejects.toThrow('Not implemented');
  });
});
