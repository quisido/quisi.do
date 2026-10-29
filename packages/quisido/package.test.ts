import { describe, expect, it } from 'vitest';
import packageJson from './package.json' with { type: 'json' };

describe('package.json', (): void => {
  describe('dependencies', (): void => {
    /**
     * The 'jiti' library is required for ESLint to load TypeScript
     * configuration files.
     */
    it("should contain 'jiti'", (): void => {
      expect(packageJson.dependencies).toHaveProperty('jiti');
    });
  });
});
