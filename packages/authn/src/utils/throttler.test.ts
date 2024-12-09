import { describe, it } from 'vitest';
import Throttler from './throttler.js';

const TEST_LIMIT = 3600;

describe('Throttler', (): void => {
  it("should default to Date's native now timestamp", (): void => {
    const throttler = new Throttler();
    throttler.run('value', TEST_LIMIT);
  });
});
