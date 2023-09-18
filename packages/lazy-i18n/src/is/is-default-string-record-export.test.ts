import isDefaultStringRecordExport from './is-default-string-record-export';

describe('isDefaultStringRecordExport', (): void => {
  it('should return false for non-default exports', (): void => {
    expect(isDefaultStringRecordExport({})).toBe(false);
  });

  it('should return false for non-string-record default exports', (): void => {
    expect(
      isDefaultStringRecordExport({
        default: 'test',
      }),
    );
  });

  it('should return true for default string record exports', (): void => {
    expect(
      isDefaultStringRecordExport({
        default: {
          a: 'b',
        },
      }),
    ).toBe(true);
  });
});
