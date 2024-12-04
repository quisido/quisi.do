import {
  TEST_EXECUTION_CONTEXT,
  TestAnalyticsEngineDataset,
} from 'cloudflare-test-utils';
import { assert, describe, it } from 'vitest';
import { TestExportedHandler } from '../test/test-exported-handler.js';
import { FetchHandler } from './index.js';

const TEST_NUMBER = 1234;

describe('Handler', (): void => {
  describe('writeMetricDataPoint', (): void => {
    it('should write a standardized Analytics Engine data point', async (): Promise<void> => {
      const testDataset = new TestAnalyticsEngineDataset();
      function testFetchHandler(this: FetchHandler): Response {
        this.writeMetricDataPoint('DATASET', 'test name', {
          testNumber: TEST_NUMBER,
          testString: 'test string',
        });
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
          DATASET: testDataset,
        },
        TEST_EXECUTION_CONTEXT,
      );

      testDataset.expectToHaveWrittenDataPoint({
        blobs: ['test string'],
        doubles: [TEST_NUMBER],
        indexes: ['test name'],
      });
    });
  });
});
