import { describe, expect, it } from 'vitest';
import tsconfig from './tsconfig.json' with { type: 'json' };

describe('tsconfig.json', (): void => {
  it('has a declaration directory for Vitest', (): void => {
    expect(tsconfig.compilerOptions.declarationDir).toBeDefined();
  });
});
