import {
  EXPECT_ANY_STRING,
  TEST_EXECUTION_CONTEXT,
} from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import FetchHandler from './fetch-handler.js';

describe('FetchHandler', (): void => {
  describe('traceParentMetricDimensions', (): void => {
    it('should exist when there is no trace parent', async (): Promise<void> => {
      function testHandler(this: FetchHandler): Response {
        return new Response(JSON.stringify(this.traceParentMetricDimensions));
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

      expect(await response.json()).toEqual({
        traceFlags: 0,
        traceId: EXPECT_ANY_STRING,
        traceParentId: '0000000000000000',
        traceVersion: 0,
      });
    });

    it('should contain the trace parent as metric dimensions', async (): Promise<void> => {
      function testHandler(this: FetchHandler): Response {
        return new Response(JSON.stringify(this.traceParentMetricDimensions));
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
        new Request('https://localhost/', {
          headers: new Headers({
            traceparent:
              'ff-fefdfcfbfaf9f8f7f6f5f4f3f2f1f0ef-0001020304050607-08',
          }),
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.json()).toEqual({
        traceFlags: 8,
        traceId: 'fefdfcfbfaf9f8f7f6f5f4f3f2f1f0ef',
        traceParentId: '0001020304050607',
        traceVersion: 255,
      });
    });

    it('should handle invalid traceparents', async (): Promise<void> => {
      function testHandler(this: FetchHandler): Response {
        return new Response(JSON.stringify(this.traceParentMetricDimensions));
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
        new Request('https://localhost/', {
          headers: new Headers({
            traceparent: 'hello-world',
          }),
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.json()).toEqual({
        traceFlags: 0,
        traceId: EXPECT_ANY_STRING,
        traceParentId: '0000000000000000',
        traceVersion: 0,
      });
    });

    it('should handle invalid trace IDs', async (): Promise<void> => {
      function testHandler(this: FetchHandler): Response {
        return new Response(JSON.stringify(this.traceParentMetricDimensions));
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
        new Request('https://localhost/', {
          headers: new Headers({
            traceparent:
              'ff-00000000000000000000000000000000-ffffffffffffffff-ff',
          }),
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.json()).toEqual({
        traceFlags: 0,
        traceId: EXPECT_ANY_STRING,
        traceParentId: '0000000000000000',
        traceVersion: 0,
      });
    });

    it('should handle invalid parent trace IDs', async (): Promise<void> => {
      function testHandler(this: FetchHandler): Response {
        return new Response(JSON.stringify(this.traceParentMetricDimensions));
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
        new Request('https://localhost/', {
          headers: new Headers({
            traceparent:
              'ff-ffffffffffffffffffffffffffffffff-0000000000000000-ff',
          }),
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.json()).toEqual({
        traceFlags: 0,
        traceId: EXPECT_ANY_STRING,
        traceParentId: '0000000000000000',
        traceVersion: 0,
      });
    });
  });
});
