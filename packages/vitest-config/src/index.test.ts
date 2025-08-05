import { describe, expect, it } from 'vitest';
import { defineConfig } from 'vitest/config';
import USER_CONFIG from './index.js';

describe('USER_CONFIG', (): void => {
  it('should be a config', (): void => {
    expect(defineConfig(USER_CONFIG)).toBeDefined();
  });
});
