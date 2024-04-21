/// <reference types="jest" />
import assert from 'node:assert';
import { readFileSync, readdirSync } from 'node:fs';
import { scripts } from './package.json';

const SECOND = 1;
const isScoped = (name: string): boolean => name.startsWith('@');
const isUnscoped = (name: string): boolean => !name.startsWith('@');
const mapToScope = (name: string): string =>
  name.substring(SECOND, name.indexOf('/'));

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
  .map(mapToName);

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
        const scopes: readonly string[] = Array.from(
          new Set(publicPackageNames.filter(isScoped).map(mapToScope)),
        ).sort();

        const unscopedPackageNames: readonly string[] = [
          ...publicPackageNames.filter(isUnscoped),
          'proposal-async-context',
        ].sort();

        expect(up).toMatch(
          [
            `yarn up "@!(${scopes.join('|')})/*" "!(${unscopedPackageNames.join(
              '|',
            )})"`,
            'yarn up --recursive "@*/*" "*"',
            'yarn sdks vscode',
          ].join(' && '),
        );
      });
    });
  });
});
