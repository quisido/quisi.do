import { readFile } from 'node:fs/promises';

import { assert, describe, expect, it } from 'vitest';
import parseJsonc from './utils/parse-jsonc.js';

const codeWorkspaceBuffer: Buffer = await readFile('quisido.code-workspace');
const codeWorkspace: unknown = parseJsonc(codeWorkspaceBuffer.toString());
const vsCodeSettingsBuffer: Buffer = await readFile('.vscode/settings.json');
const vsCodeSettings: unknown = parseJsonc(vsCodeSettingsBuffer.toString());

describe('quisido.code-workspace', (): void => {
  describe('settings', (): void => {
    it('should match folder settings', (): void => {
      assert(typeof codeWorkspace === 'object' && codeWorkspace !== null);
      assert('settings' in codeWorkspace);
      const { settings } = codeWorkspace;
      assert(typeof settings === 'object' && settings !== null);
      assert('files.associations' in settings);
      assert(typeof vsCodeSettings === 'object' && vsCodeSettings !== null);
      assert('files.associations' in vsCodeSettings);
      expect(settings['files.associations']).toEqual(
        vsCodeSettings['files.associations'],
      );
    });
  });
});
