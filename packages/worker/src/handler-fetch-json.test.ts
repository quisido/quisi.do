import { TEST_EXECUTION_CONTEXT } from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

describe('Handler', (): void => {
  it('should support fetching and parsing JSON', async (): Promise<void> => {
    const testObject: unknown = {
      number: 1234,
      string: 'test',
    };

    let response: unknown = null;
    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      response = await this.fetchJson('https://localhost/');
      return new Response();
    }

    const handler = new TestExportedHandler({
      fetch(): Promise<Response> {
        return Promise.resolve(new Response(JSON.stringify(testObject)));
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

    expect(response).toEqual(testObject);
  });
});
