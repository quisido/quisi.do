import { afterEach, assert, beforeEach, describe, expect, it } from 'vitest';
import { defineVitestConfig } from '../../index.js';

describe('defineVitestConfig', (): void => {
  it('places generated test artifacts under .tests', async (): Promise<void> => {
    const config = await defineVitestConfig({});

    assert(config.test !== undefined);
    expect(config.test.attachmentsDir).toBe('.tests/vitest/attachments');
    expect(config.test.reporters).toContainEqual([
      'html',
      { outputDir: '.tests/vitest' },
    ]);
  });

  it('extends a custom setup file', async (): Promise<void> => {
    const config = await defineVitestConfig({
      disableReports: true,
      test: { setupFiles: 'custom-setup.ts' },
    });

    assert(config.test !== undefined);
    expect(config.test.setupFiles).toEqual([
      'quisido/vitest-setup-file.js',
      'custom-setup.ts',
    ]);
  });

  it('imports VS Code workspace files', async (): Promise<void> => {
    const config = await defineVitestConfig({
      disableReports: true,
    });
    const [plugin] = config.plugins ?? [];

    assert(
      typeof plugin === 'object' &&
        plugin !== null &&
        !Array.isArray(plugin) &&
        'transform' in plugin,
    );
    const { transform } = plugin;
    assert(typeof transform === 'function');
    expect(
      Reflect.apply(transform, undefined, [
        '{ "folders": [] }',
        'test.code-workspace',
      ]),
    ).toBe('export default { "folders": [] };');
    expect(Reflect.apply(transform, undefined, ['content', 'test.ts'])).toBe(
      undefined,
    );
  });

  it('supports custom reporters', async (): Promise<void> => {
    const config = await defineVitestConfig({
      disableReports: false,
      test: { reporters: 'dot' },
    });

    assert(config.test !== undefined);
    expect(config.test.reporters).toContainEqual('dot');
  });

  describe('VS Code extension', (): void => {
    beforeEach((): void => {
      process.env['VITEST_VSCODE'] = 'true';
    });

    afterEach((): void => {
      delete process.env['VITEST_VSCODE'];
    });

    it('should not generate reports', async (): Promise<void> => {
      const config = await defineVitestConfig({});
      assert(config.test !== undefined);
      expect(config.test.reporters).toStrictEqual([]);
    });
  });
});
