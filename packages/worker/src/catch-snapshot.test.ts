import type { IncomingRequest } from 'cloudflare-utils';
import { describe, expect, it } from 'vitest';
import { TEST_EXECUTION_CONTEXT } from './test/test-execution-context.js';
import TestWorker from './test/test-worker.js';
import throwError from './test/throw-error.js';

describe('catchSnapshot', (): void => {
  it('should maintain context', async (): Promise<void> => {
    const testRequest: IncomingRequest = new Request('https://localhost/');
    let request: IncomingRequest | null = null;
    const { catchSnapshot, fetch, getRequest } = new TestWorker({
      async onFetchRequest(): Promise<Response> {
        return await catchSnapshot(throwError, (): Response => {
          request = getRequest();
          return new Response();
        });
      },
    });

    await fetch(testRequest, {}, TEST_EXECUTION_CONTEXT);

    expect(request).toBe(testRequest);
  });
});
