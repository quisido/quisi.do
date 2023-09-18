import sortRecordKeys from './sort-record-keys';

const AFTER = 1;
const BEFORE = -1;
const EQUAL = 0;

describe('sortRecordKeys', (): void => {
  it('should sort numbers', (): void => {
    const FIRST = 1;
    const SECOND = 2;
    expect(sortRecordKeys(FIRST, SECOND)).toBe(BEFORE);
    expect(sortRecordKeys(SECOND, FIRST)).toBe(AFTER);
    expect(sortRecordKeys(FIRST, FIRST)).toBe(EQUAL);
  });

  it('should sort strings', (): void => {
    expect(sortRecordKeys('a', 'b')).toBe(BEFORE);
    expect(sortRecordKeys('b', 'a')).toBe(AFTER);
    expect(sortRecordKeys('a', 'a')).toBe(EQUAL);
  });

  it('should sort symbols', (): void => {
    expect(sortRecordKeys(Symbol('a'), Symbol('b'))).toBe(BEFORE);
    expect(sortRecordKeys(Symbol('b'), Symbol('a'))).toBe(AFTER);
    expect(sortRecordKeys(Symbol('a'), Symbol('a'))).toBe(EQUAL);
  });
});
