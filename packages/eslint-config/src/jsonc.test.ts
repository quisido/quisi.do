import { describe, it } from 'vitest';

describe('jsonc', (): void => {
  it('should not throw', async (): Promise<void> => {
    await import('./jsonc.js');
  });
});
