import { assert, describe, it, vi } from 'vitest';
import Worker from './index.js';
import { TEST_CONSOLE } from './test/console.js';

describe('createWorkerExportedHandler', (): void => {
  it('should not create a fetch method', (): void => {
    const { createExportedHandler } = new Worker({});

    const { fetch } = createExportedHandler({
      console: TEST_CONSOLE,
      fetch: vi.fn(),
    });

    assert(typeof fetch === 'undefined');
  });
});
