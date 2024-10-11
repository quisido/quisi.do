import type { IncomingRequest } from 'cloudflare-utils';
import { describe, expect, it } from 'vitest';
import { TEST_EXECUTION_CONTEXT } from './test/test-execution-context.js';
import TestWorker from './test/test-worker.js';

describe('snapshot', (): void => {
  it('should maintain context', async (): Promise<void> => {
    const testRequest: IncomingRequest = new Request('https://localhost/');
    let request: IncomingRequest | null = null;
    const { fetch, getRequest, snapshot } = new TestWorker({
      async onFetchRequest(): Promise<Response> {
        await snapshot(Promise.resolve(), (): void => {
          request = getRequest();
        });
        return new Response();
      },
    });

    await fetch(testRequest, {}, TEST_EXECUTION_CONTEXT);

    expect(request).toBe(testRequest);
  });
});
