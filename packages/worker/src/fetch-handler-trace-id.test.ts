import { TEST_EXECUTION_CONTEXT } from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import FetchHandler from './fetch-handler.js';

describe('FetchHandler', (): void => {
  describe('traceId', (): void => {
    it('should contain a trace ID', async (): Promise<void> => {
      function testHandler(this: FetchHandler): Response {
        return new Response(this.traceId);
      }

      const handler = new TestExportedHandler({
        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testHandler);
          }
        },
      });

      assert(typeof handler.fetch !== 'undefined');
      const response: Response = await handler.fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.text()).toMatch(/^[0-9a-f]{32}$/u);
    });
  });
});
