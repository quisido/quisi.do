/// <reference types="jest" />
import { dependencies as patreon } from 'patreon/package.json';
import { dependencies as root } from './package.json';

describe('package.json', (): void => {
  describe('dependencies', (): void => {
    it("should match `patreon`'s `form-urlencoded`", (): void => {
      expect(root['form-urlencoded']).toBe(patreon['form-urlencoded']);
    });
  });
});
