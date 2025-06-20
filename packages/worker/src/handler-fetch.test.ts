import {
  EXPECT_ANY_NUMBER,
  TEST_EXECUTION_CONTEXT,
} from 'cloudflare-test-utils';
import { assert, describe, expect, it, vi } from 'vitest';
import noop from './noop.js';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler, Handler, MetricName } from './index.js';

const TEST_METRIC_HANDLER = vi.fn();
const TEST_NOW = vi.fn();

describe('Handler', (): void => {
  describe('fetch', (): void => {
    it('should throw an error when fetching outside of an operation', async (): Promise<void> => {
      const handler = new Handler(noop);
      await expect(async (): Promise<void> => {
        await handler.fetch('');
      }).rejects.toThrow('You may only fetch during an operation.');
    });

    it('should emit a duration metric', async (): Promise<void> => {
      const testEndTime = 2345;
      const testStartTime = 1234;
      async function testFetchHandler(this: FetchHandler): Promise<Response> {
        await this.fetch('https://localhost/test/');
        return new Response();
      }

      TEST_NOW.mockReturnValue(testStartTime);
      const handler = new TestExportedHandler({
        now: TEST_NOW,
        onMetric: TEST_METRIC_HANDLER,

        fetch(): Promise<Response> {
          TEST_NOW.mockReturnValue(testEndTime);
          return Promise.resolve(new Response());
        },

        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testFetchHandler);
          }
        },
      });

      assert('fetch' in handler);
      await handler.fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(TEST_METRIC_HANDLER).toHaveBeenCalledWith(MetricName.Fetch, {
        endTime: testEndTime,
        startTime: testStartTime,
        url: 'https://localhost/test/',
      });
    });

    it('should support Request instances', async (): Promise<void> => {
      async function testFetchHandler(this: FetchHandler): Promise<Response> {
        return await this.fetch(new Request('https://localhost/test/'));
      }

      const handler = new TestExportedHandler({
        onMetric: TEST_METRIC_HANDLER,

        fetch(): Promise<Response> {
          return Promise.resolve(new Response());
        },

        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testFetchHandler);
          }
        },
      });

      assert('fetch' in handler);
      await handler.fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(TEST_METRIC_HANDLER).toHaveBeenCalledWith(MetricName.Fetch, {
        endTime: EXPECT_ANY_NUMBER,
        startTime: EXPECT_ANY_NUMBER,
        url: 'https://localhost/test/',
      });
    });
  });
});
