/* eslint-disable max-classes-per-file */
import { TEST_EXECUTION_CONTEXT } from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import FetchHandler from './fetch-handler.js';

describe('FetchHandler', (): void => {
  describe('traceParent', (): void => {
    it('should be null when there is no trace parent', async (): Promise<void> => {
      /**
       *   Technical debt: ESLint should not expect function expressions for
       * functions typed with `this`.
       */
      // eslint-disable-next-line func-style
      function testHandler(this: FetchHandler): Response {
        return new Response(JSON.stringify(this.traceParent));
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

      expect(await response.text()).toBe('null');
    });

    it('should contain the trace parent when present', async (): Promise<void> => {
      /**
       *   Technical debt: ESLint should not expect function expressions for
       * functions typed with `this`.
       */
      // eslint-disable-next-line func-style
      function testHandler(this: FetchHandler): Response {
        return new Response(JSON.stringify(this.traceParent));
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
              'ff-fefdfcfbfaf9f8f7f6f5f4f3f2f1f0ef-eeedecebeae9e8e7-e6',
          }),
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.json()).toEqual({
        // eslint-disable-next-line no-magic-numbers
        parentId: [238, 237, 236, 235, 234, 233, 232, 231],
        traceFlagRandom: true,
        traceFlags: 230,
        traceFlagSampled: false,

        traceId: [
          // eslint-disable-next-line no-magic-numbers
          254, 253, 252, 251, 250, 249, 248, 247, 246, 245, 244, 243, 242, 241,
          // eslint-disable-next-line no-magic-numbers
          240, 239,
        ],
        version: 255,
      });
    });
  });
});
