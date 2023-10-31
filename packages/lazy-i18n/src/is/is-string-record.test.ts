import isStringRecord from './is-string-record.js';

describe('isStringRecord', (): void => {
  it('should return false for non-records', (): void => {
    expect(isStringRecord(null)).toBe(false);
    expect(isStringRecord(true)).toBe(false);
    expect(isStringRecord(1234)).toBe(false);
    expect(isStringRecord('str')).toBe(false);
    expect(isStringRecord([])).toBe(false);
  });

  it('should return false for non-string records', (): void => {
    expect(
      isStringRecord({
        a: 1,
      }),
    ).toBe(false);
    expect(
      isStringRecord({
        a: 'b',
        c: 4,
      }),
    ).toBe(false);
  });

  it('should return true for string records', (): void => {
    expect(
      isStringRecord({
        a: 'b',
      }),
    ).toBe(true);
  });
});
