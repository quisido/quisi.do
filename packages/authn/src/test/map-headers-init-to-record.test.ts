import { describe, expect, it } from "vitest";
import mapHeadersInitToRecord from "./map-headers-init-to-record.js";
import unimplementedMethod from "./unimplemented-method.js";

const TEST_HEADERS = new Headers({
  a: 'b',
  c: 'd',
});

const TEST_RECORD: Record<string, string> = {
  a: 'b',
  c: 'd',
};

describe('mapHeadersInitToRecord', (): void => {
  it('should support Headers', (): void => {
    expect(mapHeadersInitToRecord(TEST_HEADERS)).toEqual({
      a: 'b',
      c: 'd',
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
