import isDefaultExport from './is-default-export';

describe('isDefaultExport', (): void => {
  it('should return false for non-objects', (): void => {
    expect(isDefaultExport(null)).toBe(false);
    expect(isDefaultExport(true)).toBe(false);
    expect(isDefaultExport(false)).toBe(false);
    expect(isDefaultExport(0)).toBe(false);
    expect(isDefaultExport(1234)).toBe(false);
    expect(isDefaultExport('')).toBe(false);
    expect(isDefaultExport('str')).toBe(false);
    expect(isDefaultExport([])).toBe(false);
  });

  it('should return false for non-default exports', (): void => {
    expect(
      isDefaultExport({
        a: 'b',
      }),
    ).toBe(false);
  });

  it('should return false for exports containing more than default', (): void => {
    expect(
      isDefaultExport({
        a: 'b',
        default: 'default',
      }),
    ).toBe(false);
  });

  it('should return true for default exports', (): void => {
    expect(
      isDefaultExport({
        default: {
          a: 'b',
        },
      }),
    ).toBe(true);
  });
});
