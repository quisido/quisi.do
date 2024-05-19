import { describe, it } from 'vitest';

describe('cjs', (): void => {
  it('should not throw', async (): Promise<void> => {
    await import('./cjs.js');
  });
});
