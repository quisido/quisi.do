import { FetchHandler } from '@quisido/worker';
import { TestAnalyticsEngineDataset } from 'cloudflare-test-utils';
import { describe, it } from 'vitest';
import { TestExportedHandler } from './index.js';

describe('TestExportedHandler', (): void => {
  describe('expectMetric', (): void => {
    it('should spy on the metric handler', async (): Promise<void> => {
      function testFetchHandler(this: FetchHandler): Response {
        this.emitMetric('name', { key: 'value' });
        return new Response();
      }

      const handler = new TestExportedHandler({
        env: {},

        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testFetchHandler);
          }
        },
      });

      await handler.fetch('/test/');

      handler.expectMetric('name', { key: 'value' });
    });
  });

  describe('expectNotToHaveWrittenDataPoint', (): void => {
    it('should spy on an Analytics Engine dataset', async (): Promise<void> => {
      function testFetchHandler(this: FetchHandler): Response {
        this.writeMetricDataPoint('MY_DATASET', 'name', { key: 'value' });
        return new Response();
      }

      const handler = new TestExportedHandler({
        env: {
          TEST_DATASET: new TestAnalyticsEngineDataset(),
        },

        FetchHandler: class TestFetchHandler extends FetchHandler {
          public constructor() {
            super(testFetchHandler);
          }
        },
      });

      await handler.fetch('/test/');

      handler.expectNotToHaveWrittenDataPoint('TEST_DATASET', {
        blobs: ['value'],
        doubles: [],
        indexes: ['value'],
      });
    });
  });
});
