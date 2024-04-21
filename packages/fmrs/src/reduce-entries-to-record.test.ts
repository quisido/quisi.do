/// <reference types="jest" />
import { reduceEntriesToRecord } from './index.js';

const TEST_RECORD: Record<string, unknown> = {
  boolean: true,
  number: 1234,
  string: 'str',
};

describe('reduceEntriesToRecord', (): void => {
  it('should reduce entries to a Record', (): void => {
    expect(
      Object.entries(TEST_RECORD).reduce(reduceEntriesToRecord, {}),
    ).toEqual(TEST_RECORD);
  });
});
