/// <reference types="jest" />
import assert from 'node:assert';
import { readFileSync, readdirSync } from 'node:fs';
import { scripts } from './package.json';

const isPublic = (value: unknown): boolean => {
  assert(typeof value === 'object');
  assert(value !== null);
  if (!('private' in value)) {
    return true;
  }
  return value.private !== true;
};

const mapToName = (value: unknown): string => {
  assert(typeof value === 'object');
  assert(value !== null);
  assert('name' in value);
  const { name } = value;
  assert(typeof name === 'string');
  return name;
};

const mapWorkspaceToPackage = (workspace: string): unknown => {
  const path = `./packages/${workspace}/package.json`;
  const contents: string = readFileSync(path).toString();
  return JSON.parse(contents) as unknown;
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
        expect(up).toMatch(
          [
            `yarn up \"@*/*\" "!(${publicPackageNames.join('|')})"`,
            'yarn up --recursive "@*/*" "*"',
            'yarn sdks vscode',
          ].join(' && '),
        );
      });
    });
  });
});
