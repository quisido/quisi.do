import { assert, describe, it } from 'vitest';

export default function describePackageJsonDevDependencies(
  packageJson: object,
): void {
  describe('devDependencies', (): void => {
    assert('devDependencies' in packageJson);
    const { devDependencies } = packageJson;
    assert(typeof devDependencies === 'object');
    assert(devDependencies !== null);

    it('should have the expected developer dependencies', (): void => {
      assert('@arethetypeswrong/cli' in devDependencies);
      assert('@microsoft/eslint-formatter-sarif' in devDependencies);
      assert('@types/node' in devDependencies);
      assert('@vitest/coverage-istanbul' in devDependencies);
      assert('concurrently' in devDependencies);
      assert('eslint' in devDependencies);
      assert('typescript' in devDependencies);
      assert('vitest' in devDependencies);
    });
  });
}
