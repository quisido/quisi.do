import { describe, expect, it } from 'vitest';
import codeWorkspace from './quisido.code-workspace' with { type: 'json' };
import vsCodeSettings from './.vscode/settings.json' with { type: 'json' };

describe('VS Code workspace', (): void => {
  describe('settings', (): void => {
    const { settings } = codeWorkspace;

    const settingsEntries: readonly [string, unknown][] =
      Object.entries(settings);
    it.each(settingsEntries)(
      'should match the VS Code root directory "%s" setting',
      (key: string, value: unknown): void => {
        expect(vsCodeSettings).toHaveProperty([key], value);
      },
    );
  });
});
