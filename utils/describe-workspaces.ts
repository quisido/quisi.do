import type { Dirent } from 'node:fs';
import { describe } from 'vitest';
import { WORKSPACES } from './workspaces.js';

export default function describeWorkspaces(
  fn: (dirent: Dirent) => Promise<void> | void,
): void {
  describe('packages/', (): void => {
    describe.each(WORKSPACES)('$name/', fn);
  });
}
