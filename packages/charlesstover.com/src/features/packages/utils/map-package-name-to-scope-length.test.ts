import mapPackageNameToScopeLength from './map-package-name-to-scope-length';

const NOT_FOUND = -1;

describe('mapPackageNameToScopeLength', (): void => {
  it('should return -1 when there is no scope', (): void => {
    expect(mapPackageNameToScopeLength('react')).toBe(NOT_FOUND);
  });

  it('should be the scope length', (): void => {
    const TEST_SCOPE_LENGTH = 19;
    expect(mapPackageNameToScopeLength('@monorepo-template/test')).toBe(
      TEST_SCOPE_LENGTH,
    );
  });
});
