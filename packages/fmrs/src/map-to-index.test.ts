import { mapToIndex } from './index.js';

const FIRST = 0;
const SECOND = 1;
const TEST_NUMBER = 1234;
const THIRD = 2;

describe('mapToIndex', (): void => {
  it('should map to index', (): void => {
    const INDICES: readonly number[] = [FIRST, SECOND, THIRD];
    const VALUES: readonly unknown[] = [true, TEST_NUMBER, 'str'];
    expect(VALUES.map(mapToIndex)).toEqual(INDICES);
  });
});
