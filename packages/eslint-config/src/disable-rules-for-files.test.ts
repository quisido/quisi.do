import { describe, expect, it } from 'vitest';
import disableRulesForFiles from './disable-rules-for-files.js';

describe('disableRulesForFiles', (): void => {
  it('should create custom rules', (): void => {
    expect(
      disableRulesForFiles({
        ruleA: ['a.js', 'b.js'],
        ruleB: ['c.js', 'd.js'],
      }),
    ).toEqual([
      {
        files: ['a.js', 'b.js'],
        rules: {
          ruleA: 'off',
        },
      },
      {
        files: ['c.js', 'd.js'],
        rules: {
          ruleB: 'off',
        },
      },
    ]);
  });
});
