import { TEST_EXECUTION_CONTEXT } from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

describe('Handler', (): void => {
  it('should support a custom `now` method', async (): Promise<void> => {
    let nowValue = 0;
    const testNow = 1234;
    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super((): Response => {
            nowValue = this.now();
            return new Response();
          });
        }
      },
      now: (): number => testNow,
    });

    assert(typeof handler.fetch !== 'undefined');
    await handler.fetch(
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(nowValue).toBe(testNow);
  });
});
