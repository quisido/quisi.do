import { assert, describe, expect, it } from 'vitest';

export default function describePackageJsonScripts(packageJson: object): void {
  describe('scripts', (): void => {
    assert('scripts' in packageJson);
    const { scripts } = packageJson;
    assert(typeof scripts === 'object');
    assert(scripts !== null);

    it('should have an AreTheTypesWrong script', (): void => {
      assert('attw' in scripts);
      expect(scripts.attw).toBe('attw --quiet');
    });

    it('should have ESLint scripts', (): void => {
      assert('eslint' in scripts);
      expect(scripts.eslint).toBe(
        'eslint . --cache --color --exit-on-fatal-error --max-warnings 0',
      );

      assert('eslint:fix' in scripts);
      expect(scripts['eslint:fix']).toBe(
        'eslint . --cache --color --exit-on-fatal-error --fix --max-warnings 0',
      );
    });

    it('should have prepack scripts', (): void => {
      assert('prepack' in scripts);
      expect(scripts.prepack).toBe('yarn run tsc');
    });

    it('should have prepublish scripts', (): void => {
      assert('prepublish' in scripts);
      expect(scripts.prepublish).toBe(
        'concurrently --kill-others-on-fail --names eslint,publint,vitest --prefix-colors auto "yarn run eslint" "yarn run publint" "yarn run vitest:run"',
      );
    });

    it('should have TypeScript compiler script', (): void => {
      assert('tsc' in scripts);
      expect(scripts.tsc).toBe('tsc --project tsconfig.prepack.json');
    });

    it('should have vitest scripts', (): void => {
      assert('vitest' in scripts);
      expect(scripts.vitest).toBe('vitest');

      assert('vitest:run' in scripts);
      expect(scripts['vitest:run']).toBe('vitest run');

      assert('vitest:watch' in scripts);
      expect(scripts['vitest:watch']).toBe('vitest watch');
    });
  });
}
