import { describe, expect, it } from 'vitest';
import tsconfig from './tsconfig.json' with { type: 'json' };

describe('tsconfig.json', (): void => {
  // Vitest will throw a cryptic error without a declaration directory.
  it('should have a declaration directory', (): void => {
    expect(tsconfig.compilerOptions.declarationDir).toBeDefined();
  });
});
