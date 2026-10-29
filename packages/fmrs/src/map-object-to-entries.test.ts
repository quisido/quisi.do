import { describe, expect, it } from 'vitest';
import { mapObjectToEntries } from './index.js';

const TEST_NUMBER = 123;

describe('mapObjectToEntries', (): void => {
  it('should map an object to entries', (): void => {
    expect(
      mapObjectToEntries({ bool: true, num: TEST_NUMBER, str: 'test' }),
    ).toEqual([
      ['bool', true],
      ['num', TEST_NUMBER],
      ['str', 'test'],
    ]);
  });
});
