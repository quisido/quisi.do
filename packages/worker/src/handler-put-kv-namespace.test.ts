import {
  EXPECT_ANY_NUMBER,
  TEST_EXECUTION_CONTEXT,
  TestKVNamespace,
} from 'cloudflare-test-utils';
import { assert, describe, expect, it, vi } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler, MetricName } from './index.js';

const TEST_ERROR_HANDLER = vi.fn();
const TEST_METRIC_HANDLER = vi.fn();

describe('Handler', (): void => {
  it('should support putting to KV namespaces', async (): Promise<void> => {
    const testNamespace = new TestKVNamespace();

    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      await this.putKVNamespace('MY_NAMESPACE', 'TEST_KEY', 'test value');
      return new Response();
    }

    const handler = new TestExportedHandler({
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

    testNamespace.expectToHavePut('TEST_KEY', 'test value');
    expect(TEST_METRIC_HANDLER).toHaveBeenCalledWith(MetricName.KVPut, {
      endTime: EXPECT_ANY_NUMBER,
      env: 'MY_NAMESPACE',
      startTime: EXPECT_ANY_NUMBER,
    });
  });

  it('should handle KV namespace put errors', async (): Promise<void> => {
    const testError = new Error('test');
    const testNamespace = new TestKVNamespace();
    testNamespace.setPutError(testError);

    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      await this.putKVNamespace('MY_NAMESPACE', 'TEST_KEY', 'test value');
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

    testNamespace.expectToHavePut('TEST_KEY', 'test value');
    expect(TEST_ERROR_HANDLER).toHaveBeenCalledWith(testError);
    expect(TEST_METRIC_HANDLER).toHaveBeenCalledWith(MetricName.KVPutError, {
      endTime: EXPECT_ANY_NUMBER,
      env: 'MY_NAMESPACE',
      startTime: EXPECT_ANY_NUMBER,
    });
  });
});
