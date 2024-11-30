import { TEST_EXECUTION_CONTEXT } from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

describe('Handler', (): void => {
  it('should support fetching text', async (): Promise<void> => {
    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      return new Response(await this.fetchText('https://localhost/'));
    }

    const handler = new TestExportedHandler({
      fetch(): Promise<Response> {
        return Promise.resolve(new Response('Hello world'));
      },

      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super(testFetchHandler);
        }
      },
    });

    assert('fetch' in handler);
    const response: Response = await handler.fetch(
      new Request('https://localhost/'),
      {},
      TEST_EXECUTION_CONTEXT,
    );

    expect(await response.text()).toEqual('Hello world');
  });
});
