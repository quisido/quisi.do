/* eslint-disable max-classes-per-file */
import { FetchHandler } from '@quisido/worker';
import { TestAnalyticsEngineDataset } from 'cloudflare-test-utils';
import { describe, expect, it } from 'vitest';
import { TestExportedHandler } from './index.js';

describe('TestExportedHandler', (): void => {
  it('should forward tracing callback arguments and return values during fetch', async (): Promise<void> => {
    const handler = new TestExportedHandler({
      FetchHandler: class TestFetchHandler extends FetchHandler {
        public constructor() {
          super((_request, _env, { tracing }): Response => {
            const span: Span = tracing.startSpan('test');
            const callback = (...args: [string, boolean]): string => {
              expect(args).toEqual(['result', true]);
              return args[0];
            };

            const result: string = tracing.withActiveSpan(
              span,
              callback,
              'result',
              true,
            );

            return new Response(result);
          });
        }
      },
    });

    const response = await handler.fetch('/test/');

    response.expectBodyToBe('result');
  });

  describe('expectMetric', (): void => {
    it('should spy on the metric handler', async (): Promise<void> => {
      /**
       * Technical debt: ESLint should not expect function expressions for
       * functions typed with `this`.
       */
      // eslint-disable-next-line func-style
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
      /**
       * Technical debt: ESLint should not expect function expressions for
       * functions typed with `this`.
       */
      // eslint-disable-next-line func-style
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
