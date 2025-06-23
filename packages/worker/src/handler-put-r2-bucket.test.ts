import {
  EXPECT_ANY_NUMBER,
  TEST_EXECUTION_CONTEXT,
  TestR2Bucket,
} from 'cloudflare-test-utils';
import { assert, describe, expect, it, vi } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler, MetricName } from './index.js';

const TEST_ERROR_HANDLER = vi.fn();
const TEST_METRIC_HANDLER = vi.fn();

describe('Handler', (): void => {
  it('should support putting to R2 buckets', async (): Promise<void> => {
    const testBucket = new TestR2Bucket();

    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      await this.putR2Bucket('MY_BUCKET', 'test.json', '{}');
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
        MY_BUCKET: testBucket,
      },
      TEST_EXECUTION_CONTEXT,
    );

    testBucket.expectToHavePut('test.json', '{}');
    expect(TEST_METRIC_HANDLER).toHaveBeenCalledWith(MetricName.R2BucketPut, {
      bytes: 2,
      endTime: EXPECT_ANY_NUMBER,
      env: 'MY_BUCKET',
      startTime: EXPECT_ANY_NUMBER,
    });
  });

  it('should handle KV namespace put errors', async (): Promise<void> => {
    const testBucket = new TestR2Bucket();
    const testError = new Error('test');
    testBucket.setPutError(testError);

    async function testFetchHandler(this: FetchHandler): Promise<Response> {
      await this.putR2Bucket('MY_BUCKET', 'test.json', '{}');
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
        MY_BUCKET: testBucket,
      },
      TEST_EXECUTION_CONTEXT,
    );

    testBucket.expectToHavePut('test.json', '{}');
    expect(TEST_ERROR_HANDLER).toHaveBeenCalledWith(testError);
    expect(TEST_METRIC_HANDLER).toHaveBeenCalledWith(
      MetricName.R2BucketPutError,
      {
        endTime: EXPECT_ANY_NUMBER,
        env: 'MY_BUCKET',
        startTime: EXPECT_ANY_NUMBER,
      },
    );
  });
});
