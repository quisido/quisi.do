import { TEST_EXECUTION_CONTEXT } from 'cloudflare-test-utils';
import { isString } from 'fmrs';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

describe('Handler', (): void => {
  describe('validateBinding', (): void => {
    it('should support default values', async (): Promise<void> => {
      function testFetchHandler(this: FetchHandler): Response {
        return new Response(
          this.validateBinding('TEST_KEY', isString, 'test value'),
        );
      }

      const handler = new TestExportedHandler({
        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testFetchHandler);
          }
        },
      });

      assert('fetch' in handler);
      const response: Response = await handler.fetch(
        new Request('https://localhost/'),
        {
          TEST_KEY: 1234,
        },
        TEST_EXECUTION_CONTEXT,
      );

      expect(await response.text()).toBe('test value');
    });
  });
});
