import {
  EXPECT_ANY_NUMBER,
  TEST_EXECUTION_CONTEXT,
  TestKVNamespace,
} from 'cloudflare-test-utils';
import { assert, describe, expect, it, vi } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler, MetricName } from './index.js';

const TEST_ERROR_HANDLER = vi.fn();
const TEST_KV_NAMESPACE_GET = vi.fn();
const TEST_METRIC_HANDLER = vi.fn();

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

  it('should handle KV Namespace get errors', async (): Promise<void> => {
    const testError = new Error('test');
    const testNamespace = new TestKVNamespace({});
    testNamespace.get = TEST_KV_NAMESPACE_GET;
    TEST_KV_NAMESPACE_GET.mockRejectedValue(testError);

    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      await this.getKVNamespaceText('MY_NAMESPACE', 'TEST_KEY');
      return new Response();
    }

    const handler = new TestExportedHandler({
      onError: TEST_ERROR_HANDLER,
      onMetric: TEST_METRIC_HANDLER,

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

    expect(TEST_ERROR_HANDLER).toHaveBeenCalledWith(testError);
    expect(TEST_METRIC_HANDLER).toHaveBeenCalledWith(
      MetricName.KVNamespaceGetError,
      {
        endTime: EXPECT_ANY_NUMBER,
        env: 'MY_NAMESPACE',
        startTime: EXPECT_ANY_NUMBER,
      },
    );
  });
});
