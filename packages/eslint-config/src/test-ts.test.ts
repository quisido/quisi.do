import { describe, it } from 'vitest';

describe('test.ts', (): void => {
  it('should not throw', async (): Promise<void> => {
    await import('./test-ts.js');
  });
});
