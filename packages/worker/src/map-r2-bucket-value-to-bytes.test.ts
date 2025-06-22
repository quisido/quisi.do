import { describe, expect, it } from 'vitest';
import mapR2BucketValueToBytes from './map-r2-bucket-value-to-bytes.js';

describe('mapR2BucketValueToBytes', (): void => {
  it('should throw for ReadableStreams', (): void => {
    const stream = new ReadableStream();
    expect((): number => mapR2BucketValueToBytes(stream)).toThrowError();
  });

  it('should support other value types', (): void => {
    expect(mapR2BucketValueToBytes(null)).toBe(1);
    expect(mapR2BucketValueToBytes('test')).toBe(4);
    expect(mapR2BucketValueToBytes('te😀st')).toBe(8);
    expect(mapR2BucketValueToBytes(new ArrayBuffer(10))).toBe(10);
    expect(mapR2BucketValueToBytes(new Blob(['test']))).toBe(4);
    expect(mapR2BucketValueToBytes(new Uint8Array([1, 2, 3]))).toBe(3);
  });
});
