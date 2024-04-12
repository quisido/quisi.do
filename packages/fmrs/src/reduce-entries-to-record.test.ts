/// <reference types="jest" />
import { reduceEntriesToRecord } from './index.js';

const TEST_RECORD: Record<string, unknown> = {
  a: true,
  b: 1234,
  c: 'str',
};

describe('reduceEntriesToRecord', (): void => {
  it('should reduce entries to a Record', (): void => {
    expect(
      Object.entries(TEST_RECORD).reduce(reduceEntriesToRecord, {}),
    ).toEqual(TEST_RECORD);
  });
});
