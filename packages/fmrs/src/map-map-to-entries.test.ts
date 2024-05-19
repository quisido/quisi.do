import { describe, expect, it } from 'vitest';
import { mapMapToEntries } from './index.js';

const TEST_ENTRIES: readonly [string, string][] = [
  ['a', 'first'],
  ['b', 'second'],
  ['c', 'third'],
];

describe('mapMapToEntries', (): void => {
  it('should map a Map to entries', (): void => {
    expect(mapMapToEntries(new Map(TEST_ENTRIES))).toEqual(TEST_ENTRIES);
  });
});
