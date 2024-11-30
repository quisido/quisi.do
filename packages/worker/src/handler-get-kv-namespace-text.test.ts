import { TEST_EXECUTION_CONTEXT, TestKVNamespace } from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

describe('Handler', (): void => {
  it('should support getting KV Namespace text', async (): Promise<void> => {
    let text: string | null = null;
    const testNamespace = new TestKVNamespace({
      TEST_KEY: 'test value',
    });

    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      text = await this.getKVNamespaceText('MY_NAMESPACE', 'TEST_KEY');
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
      {
        MY_NAMESPACE: testNamespace,
      },
      TEST_EXECUTION_CONTEXT,
    );

    expect(text).toBe('test value');
  });
});
