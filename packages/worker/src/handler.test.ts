import { assert, describe, expect, it, vi } from 'vitest';
import asyncSetTimeout from '../test/async-set-timeout.js';
import { TEST_EXECUTION_CONTEXT } from '../test/test-execution-context.js';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

const IMMEDIATE = 1;
const TEST_LOG_HANDLER = vi.fn();

describe('Handler', (): void => {
  it('should support custom a now method', async (): Promise<void> => {
    let nowValue = 0;
    const testNow = 1234;
    const handler = new TestExportedHandler({
      now: (): number => testNow,

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super((): Response => {
            nowValue = this.now();
            return new Response();
          });
        }
      },
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(nowValue).toBe(testNow);
  });

  it('should emit after flushing', async (): Promise<void> => {
    let promise: Promise<void> = Promise.resolve();
    const handler = new TestExportedHandler({
      onLog: TEST_LOG_HANDLER,

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super((): Response => {
            promise = asyncSetTimeout((): void => {
              this.log('test message');
            }, IMMEDIATE);
            return new Response();
          });
        }
      },
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
