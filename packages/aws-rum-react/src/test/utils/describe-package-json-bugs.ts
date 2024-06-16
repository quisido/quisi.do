import { assert, describe, expect, it } from 'vitest';

export default function describePackageJsonBugs(
  packageJson: object,
  expectedEmail: string,
  repo: string,
): void {
  describe('bugs', (): void => {
    assert('bugs' in packageJson);
    const { bugs } = packageJson;
    assert(typeof bugs === 'object');
    assert(bugs !== null);

    it('should have the expected email for bugs', (): void => {
      assert('email' in bugs);
      expect(bugs.email).toBe(expectedEmail);
    });

    it('should have the expected URL for bugs', (): void => {
      assert('url' in bugs);
      expect(bugs.url).toBe(`https://github.com/${repo}/issues`);
    });
  });
}
