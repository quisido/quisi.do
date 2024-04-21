/// <reference types="jest" />
import { mapEntriesToRecord } from './index.js';

const TEST_RECORD: Record<string, unknown> = {
  boolean: true,
  number: 1234,
  string: 'str',
};

describe('mapEntriesToRecord', (): void => {
  it('should map entries to a Record', (): void => {
    expect(mapEntriesToRecord(Object.entries(TEST_RECORD))).toEqual(
      TEST_RECORD,
    );
  });
});
