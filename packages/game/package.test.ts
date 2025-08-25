import { describe, expect, it } from 'vitest';
import { version } from './package.json';
import { VERSION } from './src/modules/quisido-game/constants.js';

describe('VERSION', (): void => {
  it('should be accurate', (): void => {
    expect(VERSION).toBe(version);
  });
});
