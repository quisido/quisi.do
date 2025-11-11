import { describe, expect, it } from 'vitest';
import { version } from './package.json';
import { VERSION } from './src/modules/quisido-reconciler/index.js';

describe('VERSION', (): void => {
  it('should match the `package.json` version', (): void => {
    expect(VERSION).toBe(version);
  });
});
