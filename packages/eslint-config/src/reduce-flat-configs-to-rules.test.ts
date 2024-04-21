/// <reference types="jest" />
import type { Linter } from "eslint";
import reduceFlatConfigsToRules from "./reduce-flat-configs-to-rules.js";

const FLAT_CONFIGS: readonly Linter.FlatConfig[] = [
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

describe('reduceFlatConfigsToRules', (): void => {
  it('should reduce flag configurations to their rules', (): void => {
    expect(FLAT_CONFIGS.reduce(reduceFlatConfigsToRules, {})).toEqual({
      '@quisido/test-error-rule': 'error',
      '@quisido/test-off-rule': 'off',
      '@quisido/test-warn-rule': 'warn',
    });
  });
});
