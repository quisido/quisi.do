import { TEST_EXECUTION_CONTEXT, TestR2Bucket } from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

describe('Handler', (): void => {
  it('should support getting R2 buckets', async (): Promise<void> => {
    let bucket: R2Bucket | null = null;
    const testBucket = new TestR2Bucket();

    function testFetchHandler(this: FetchHandler): Response {
      bucket = this.getR2Bucket('MY_BUCKET');
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
        MY_BUCKET: testBucket,
      },
      TEST_EXECUTION_CONTEXT,
    );

    expect(bucket).toBe(testBucket);
  });
});
