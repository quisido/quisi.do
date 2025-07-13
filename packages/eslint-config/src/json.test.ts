import { describe, it } from 'vitest';

describe('json', (): void => {
  it('should not throw', async (): Promise<void> => {
    await import('./json.js');
  });
});
