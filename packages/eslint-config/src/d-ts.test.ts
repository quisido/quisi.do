import { describe, it } from 'vitest';

describe('d.ts', (): void => {
  it('should not throw', async (): Promise<void> => {
    await import('./d-ts.js');
  });
});
