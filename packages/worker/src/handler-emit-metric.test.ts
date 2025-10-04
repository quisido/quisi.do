import { TEST_EXECUTION_CONTEXT } from 'cloudflare-test-utils';
import { assert, describe, expect, it, vi } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

const TEST_METRIC_HANDLER = vi.fn();

describe('Handler', (): void => {
  describe('emitMetric', (): void => {
    it('should default to empty dimensions', async (): Promise<void> => {
      function testFetchHandler(this: FetchHandler): Response {
        this.emitMetric('test name');
        return new Response();
      }

      const handler = new TestExportedHandler({
        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testFetchHandler);
          }
        },
        onMetric: TEST_METRIC_HANDLER,
      });

      assert('fetch' in handler);
      await handler.fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(TEST_METRIC_HANDLER).toHaveBeenCalledWith('test name', {});
    });
  });
});
