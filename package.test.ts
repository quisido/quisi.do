/// <reference types="jest" />
import { readFileSync, readdirSync } from 'node:fs';
import { scripts } from './package.json';

const isPublic = (workspace: string): boolean => {
  const packageJsonPath = `./packages/${workspace}/package.json`;
  const packageJson: string = readFileSync(packageJsonPath).toString();
  const { private: isPrivate } = JSON.parse(packageJson);
  return isPrivate !== true;
};

const workspaces: readonly string[] = readdirSync('packages').sort();
const publicWorkspaces: readonly string[] = workspaces.filter(isPublic);

describe('package.json', (): void => {
  describe('scripts', (): void => {
    describe('up', (): void => {
      const { up } = scripts;

      /**
       * Since workspaces will exist locally and in the registry, we remove
       *   ambiguity by excluding them from the upgrade and relying on the local
       *   copy as the source of truth.
       */
      it('should not upgrade workspaces', (): void => {
        expect(up).toMatch(`"!(${publicWorkspaces.join('|')})"`);
      });
    });
  });
});
