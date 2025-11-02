import { describe, expect, it } from 'vitest';
import { mapObjectToEntries } from './index.js';

describe('mapObjectToEntries', (): void => {
  it('should map an object to entries', (): void => {
    expect(mapObjectToEntries({ bool: true, num: 123, str: 'test' })).toEqual([
      ['bool', true],
      ['num', 123],
      ['str', 'test'],
    ]);
  });
});
