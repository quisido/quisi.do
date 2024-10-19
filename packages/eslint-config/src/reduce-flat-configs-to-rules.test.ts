import type { Linter } from 'eslint';
import { describe, expect, it } from 'vitest';
import reduceConfigsToRules from './reduce-configs-to-rules.js';

const CONFIGS: readonly Linter.Config[] = [
  {},
  {
    rules: {},
  },
  {
    rules: {
      '@quisido/test-error-rule': 'error',
    },
  },
  {
    rules: {
      '@quisido/test-off-rule': 'off',
      '@quisido/test-warn-rule': 'warn',
    },
  },
];

describe('reduceConfigsToRules', (): void => {
  it('should reduce flag configurations to their rules', (): void => {
    expect(CONFIGS.reduce(reduceConfigsToRules, {})).toEqual({
      '@quisido/test-error-rule': 'error',
      '@quisido/test-off-rule': 'off',
      '@quisido/test-warn-rule': 'warn',
    });
  });
});
