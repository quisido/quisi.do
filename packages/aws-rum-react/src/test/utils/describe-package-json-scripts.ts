import assert from "node:assert";

export default function describePackageJsonScripts(packageJson: object): void {
  describe('scripts', (): void => {
    assert('scripts' in packageJson);
    const { scripts } = packageJson;
    assert(typeof scripts === 'object');
    assert(scripts !== null);

    it('should have an AreTheTypesWrong script', (): void => {
      assert('attw' in scripts);
      expect(scripts.attw).toBe('attw');
    });

    it('should have ESLint scripts', (): void => {
      assert('eslint' in scripts);
      expect(scripts.eslint).toBe(
        'eslint . --cache --color --exit-on-fatal-error --max-warnings 0',
      );

      assert('eslint:fix' in scripts);
      expect(scripts['eslint:fix']).toBe("eslint . --cache --color --exit-on-fatal-error --fix --max-warnings 0");
    });

    it('should have Jest scripts', (): void => {
      assert('jest' in scripts);
      expect(scripts.jest).toBe('jest --config jest.config.cjs');

      assert('jest:watch' in scripts);
      expect(scripts['jest:watch']).toBe(
        'jest --config jest.config.cjs --watch',
      );
    });

    it('should have prepack scripts', (): void => {
      assert('prepack' in scripts);
      expect(scripts.prepack).toBe('yarn run tsc');
    });

    it('should have prepublish scripts', (): void => {
      assert('prepublish' in scripts);
      expect(scripts.prepublish).toBe(
        'concurrently --kill-others-on-fail --names attw,eslint,jest "yarn run attw" "yarn run eslint" "yarn run jest"',
      );
    });

    it('should have TypeScript compiler script', (): void => {
      assert('tsc' in scripts);
      expect(scripts.tsc).toBe(
        'tsc --generateCpuProfile tsc-output.cpuprofile --project tsconfig.prepack.json',
      );
    });
  });
}
