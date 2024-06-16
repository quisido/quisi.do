import { assert, describe, expect, it } from 'vitest';

export default function describePackageJsonFunding(
  packageJson: object,
  fundingType: string,
  fundingUrl: string,
): void {
  describe('funding', (): void => {
    assert('funding' in packageJson);
    const { funding } = packageJson;
    assert(typeof funding === 'object');
    assert(funding !== null);

    it('should have the expected funding type', (): void => {
      assert('type' in funding);
      expect(funding.type).toBe(fundingType);
    });

    it('should have the expected funding URL', (): void => {
      assert('url' in funding);
      expect(funding.url).toBe(fundingUrl);
    });
  });
}
