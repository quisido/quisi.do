import isRecord from './is-record.js';

describe('isRecord', (): void => {
  it('should return false for non-objects', (): void => {
    expect(isRecord(null)).toBe(false);
    expect(isRecord(true)).toBe(false);
    expect(isRecord(1234)).toBe(false);
    expect(isRecord('str')).toBe(false);
  });

  it('should return false for arrays', (): void => {
    expect(isRecord([])).toBe(false);
  });

  it('should return false for Promises', (): void => {
    expect(isRecord(Promise.resolve({}))).toBe(false);
  });

  it('should return true for records', (): void => {
    expect(isRecord({ a: 'b' })).toBe(true);
  });
});
