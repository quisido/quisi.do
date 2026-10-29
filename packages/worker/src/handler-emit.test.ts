import { TEST_EXECUTION_CONTEXT } from 'cloudflare-test-utils';
import { assert, describe, expect, it, vi } from 'vitest';
import asyncSetTimeout from '../test/async-set-timeout.js';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import FetchHandler from './fetch-handler.js';

const IMMEDIATE = 1;
const TEST_LOG_HANDLER = vi.fn();

describe('Handler', (): void => {
  it('should emit after flushing', async (): Promise<void> => {
    let promise: Promise<void> = Promise.resolve();
    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super((): Response => {
            promise = asyncSetTimeout(IMMEDIATE).then((): void => {
              this.log('test message');
            });
            return new Response();
          });
        }
      },
      onLog: TEST_LOG_HANDLER,
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(TEST_LOG_HANDLER).not.toHaveBeenCalled();
    await promise;
    expect(TEST_LOG_HANDLER).toHaveBeenCalledWith('test message');
  });
});
