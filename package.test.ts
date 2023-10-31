/// <reference types="jest" />
import assert from 'node:assert';
import { readFileSync, readdirSync } from 'node:fs';
import { scripts } from './package.json';

const isPublic = (value: object): boolean => {
  if (!('private' in value)) {
    return true;
  }
  return value.private !== true;
};

const mapToName = (value: object): string => {
  assert('name' in value);
  const { name } = value;
  assert(typeof name === 'string');
  return name;
};

const mapWorkspaceToPackage = (workspace: string): object => {
  const path = `./packages/${workspace}/package.json`;
  const contents: string = readFileSync(path).toString();
  return JSON.parse(contents);
};

const publicPackageNames: readonly string[] = readdirSync('packages')
  .map(mapWorkspaceToPackage)
  .filter(isPublic)
  .map(mapToName)
  .sort();

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
        expect(up).toMatch(`"!(${publicPackageNames.join('|')})"`);
      });
    });
  });
});
