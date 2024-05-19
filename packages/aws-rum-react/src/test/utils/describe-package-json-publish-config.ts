import { assert, describe, expect, it } from "vitest";

export default function describePackageJsonPublishConfig(
  packageJson: object,
): void {
  describe('publishConfig', (): void => {
    assert('publishConfig' in packageJson);
    const { publishConfig } = packageJson;
    assert(typeof publishConfig === 'object');
    assert(publishConfig !== null);

    it('should have public access', (): void => {
      assert('access' in publishConfig);
      expect(publishConfig.access).toBe('public');
    });
  });
}
