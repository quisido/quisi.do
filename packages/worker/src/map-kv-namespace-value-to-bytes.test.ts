import { describe, expect, it } from 'vitest';
import mapKVNamespaceValueToBytes from './map-kv-namespace-value-to-bytes.js';

describe('mapKVNamespaceValueToBytes', (): void => {
  it('should throw for ReadableStreams', (): void => {
    const stream = new ReadableStream();
    expect((): number => mapKVNamespaceValueToBytes(stream)).toThrowError();
  });

  it('should support other value types', (): void => {
    expect(mapKVNamespaceValueToBytes('test')).toBe(4);
    expect(mapKVNamespaceValueToBytes('te😀st')).toBe(8);
    expect(mapKVNamespaceValueToBytes(new ArrayBuffer(10))).toBe(10);
    expect(mapKVNamespaceValueToBytes(new Uint8Array([1, 2, 3]))).toBe(3);
  });
});
