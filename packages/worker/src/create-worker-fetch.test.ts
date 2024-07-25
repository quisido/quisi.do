import { describe, expect, it, vi } from 'vitest';
import { TEST_EXECUTION_CONTEXT } from './test/test-execution-context.js';
import TestWorker from './test/test-worker.js';

describe('createWorkerFetch', (): void => {
  it('should handle errors', async (): Promise<void> => {
    const TEST_ERROR = new Error();
    const TEST_FETCH_ERROR_HANDLER = vi.fn();
    const { fetch } = new TestWorker({
      onFetchError: TEST_FETCH_ERROR_HANDLER,
      onFetchRequest(): never {
        throw TEST_ERROR;
      },
    });

    await fetch(new Request('https://localhost/'), {}, TEST_EXECUTION_CONTEXT);

    expect(TEST_FETCH_ERROR_HANDLER).toHaveBeenCalledWith(TEST_ERROR);
  });
});
