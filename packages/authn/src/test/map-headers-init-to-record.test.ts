import { describe, expect, it } from 'vitest';
import mapHeadersInitToRecord from './map-headers-init-to-record.js';
import unimplementedMethod from './unimplemented-method.js';

const TEST_HEADERS = new Headers({
  num: '1234',
  str: 'value',
});

const TEST_RECORD: Record<string, string> = {
  num: '1234',
  str: 'value',
};

describe('mapHeadersInitToRecord', (): void => {
  it('should support Headers', (): void => {
    expect(mapHeadersInitToRecord(TEST_HEADERS)).toEqual({
      num: '1234',
      str: 'value',
    });
  });

  it('should not support iterators', (): void => {
    expect((): void => {
      mapHeadersInitToRecord({
        [Symbol.iterator]: unimplementedMethod,
      });
    }).toThrow('Iterable HeadersInit not supported');
  });

  it('should support records', (): void => {
    expect(mapHeadersInitToRecord(TEST_RECORD)).toBe(TEST_RECORD);
  });
});
