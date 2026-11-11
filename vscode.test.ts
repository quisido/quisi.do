import { describe, expect, it } from 'vitest';
import settings from './.vscode/settings.json' with { type: 'json' };
import codeWorkspace from './quisido.code-workspace' with { type: 'json' };

describe('quisido.code-workspace', (): void => {
  describe('settings', (): void => {
    it('should match folder settings', (): void => {
      expect(codeWorkspace.settings['files.associations']).toEqual(
        settings['files.associations'],
      );
    });
  });
});
