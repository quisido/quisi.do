import {
  TEST_CONSOLE_ERROR,
  TEST_EXECUTION_CONTEXT,
} from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import asyncSetTimeout from '../test/async-set-timeout.js';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import throwy from '../test/throwy.js';
import { FetchHandler } from './index.js';

const IMMEDIATE = 0;
const TEST_ERROR = new Error('test message');

describe('Handler', (): void => {
  describe('#on', (): void => {
    it('should handle asynchronous listeners', async (): Promise<void> => {
      let testMessage: string | null = null;
      function testFetchHandler(this: FetchHandler): Response {
        this.onLog(async (message: string): Promise<void> => {
          await asyncSetTimeout(IMMEDIATE);
          testMessage = message;
        });
        this.log('test message');
        return new Response();
      }

      const handler = new TestExportedHandler({
        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testFetchHandler);
          }
        },
      });

      assert('fetch' in handler);
      const sideEffects: Promise<void>[] = [];
      await handler.fetch(
        new Request('https://localhost/'),
        {},
        {
          ...TEST_EXECUTION_CONTEXT,
          waitUntil(promise: Promise<void>): void {
            sideEffects.push(promise);
          },
        },
      );

      await Promise.all(sideEffects);

      expect(testMessage).toBe('test message');
    });

    it('should handle listener errors', async (): Promise<void> => {
      function testFetchHandler(this: FetchHandler): Response {
        this.onLog(throwy);
        this.onError((): void => {
          throw TEST_ERROR;
        });

        this.log('test message');
        return new Response();
      }

      const handler = new TestExportedHandler({
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

      expect(TEST_CONSOLE_ERROR).toHaveBeenCalledWith(TEST_ERROR);
    });
  });
});
