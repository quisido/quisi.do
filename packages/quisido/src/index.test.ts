import { assert, describe, expect, it } from 'vitest';
import { defineVitestConfig } from './index.js';

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
      test: { setupFiles: 'custom-setup.ts' },
    });

    assert(config.test !== undefined);
    expect(config.test.setupFiles).toEqual([
      'quisido/vitest-setup-file.js',
      'custom-setup.ts',
    ]);
  });

  it('imports VS Code workspace files', async (): Promise<void> => {
    const config = await defineVitestConfig({});
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
});
