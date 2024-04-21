/// <reference types="jest" />
import { mapMapToRecord } from './index.js';

const TEST_RECORD: Record<string, unknown> = {
  boolean: true,
  number: 1234,
  string: 'str',
};

describe('mapMapToRecord', (): void => {
  it('should map a Map to a Record', (): void => {
    expect(mapMapToRecord(new Map(Object.entries(TEST_RECORD)))).toEqual(
      TEST_RECORD,
    );
  });
});
