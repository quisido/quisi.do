import {
  TEST_EXECUTION_CONTEXT,
  TestAnalyticsEngineDataset,
} from 'cloudflare-test-utils';
import { assert, describe, expect, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

describe('Handler', (): void => {
  it('should support analytics engine datasets', async (): Promise<void> => {
    let invalidError: unknown = null;
    let validDataset: AnalyticsEngineDataset | null = null;
    const testDataset = new TestAnalyticsEngineDataset();

    function testFetchHandler(this: FetchHandler): Response {
      validDataset = this.getAnalyticsEngineDataset('VALID');
      try {
        this.getAnalyticsEngineDataset('INVALID');
      } catch (err: unknown) {
        invalidError = err;
      }
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
        INVALID: null,
        VALID: testDataset,
      },
      TEST_EXECUTION_CONTEXT,
    );

    expect(validDataset).toBe(testDataset);
    expect(invalidError).not.toBeNull();
  });
});
