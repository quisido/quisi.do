import { describe, expect, it } from 'vitest';
import packageJson from './package.json' with { type: 'json' };
import reduceWorkspaceEntriesToOverrides from './utils/reduce-workspace-entries-to-overrides.js';
import { WORKSPACES } from './utils/workspaces.js';

describe('package.json', (): void => {
  /**
   *   NPM only respects `overrides` in the root `package.json`, but including
   * them in the workspace `package.json` allows the workspace to function
   * autonomously if it were ever to split from the monorepo.
   */
  describe('overrides', (): void => {
    it('should contain workspace overrides', (): void => {
      const rootOverrides: Record<string, Record<string, string> | string> =
        WORKSPACES.reduce(reduceWorkspaceEntriesToOverrides, {});
      expect(packageJson.overrides).toStrictEqual(rootOverrides);
    });
  });
});
