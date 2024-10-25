import { describe, expect, it, vi } from 'vitest';
import TestAnalyticsEngineDataset from './test/analytics-engine-dataset.js';
import { EXPECT_ANY_NUMBER, EXPECT_ANY_STRING } from './test/expect-any.js';
import expectPrivateMetric from './test/expect-private-metric.js';
import expectPublicMetric from './test/expect-public-metric.js';
import expectToLogError from './test/expect-to-log-error.js';
import {
  TEST_EXECUTION_CONTEXT,
  TEST_WAIT_UNTIL,
} from './test/test-execution-context.js';
import TestWorker from './test/test-worker.js';

const NONE = 0;
const UNSPECIFIED = 0;

describe('WorkerFetchContext', (): void => {
  describe('#setConsole', (): void => {
    it('should subscribe to events', async (): Promise<void> => {
      const {
        emitPrivateMetric,
        emitPublicMetric,
        fetch,
        logPrivateError,
        logPublicError,
      } = new TestWorker({
        onFetchRequest(): Response {
          emitPrivateMetric({ name: 'private' });
          emitPublicMetric({ name: 'public' });
          logPrivateError(
            new Error('private message', { cause: 'private cause' }),
          );
          logPublicError(
            new Error('public message', { cause: 'public cause' }),
          );
          return new Response();
        },
      });

      await fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expectPrivateMetric({ name: 'private' });
      expectPublicMetric({ name: 'public' });

      expectToLogError(
        'Private error:',
        'private message',
        'private cause',
        EXPECT_ANY_STRING,
      );

      expectToLogError(
        'Public error:',
        'public message',
        'public cause',
        EXPECT_ANY_STRING,
      );
    });
  });

  describe('#setExecutionContext', (): void => {
    it('should subscribe to side effects', async (): Promise<void> => {
      const TEST_PROMISE = Promise.resolve();
      const { affect, fetch } = new TestWorker({
        onFetchRequest(): Response {
          affect(TEST_PROMISE);
          return new Response();
        },
      });

      await fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expect(TEST_WAIT_UNTIL).toHaveBeenCalledWith(TEST_PROMISE);
    });
  });

  describe('#setPrivateDataset', (): void => {
    it('should subscribe to private metrics', async (): Promise<void> => {
      const TEST_WRITE_DATA_POINT = vi.fn();
      const { emitPrivateMetric, fetch } = new TestWorker({
        onFetchRequest(): Response {
          emitPrivateMetric({ name: 'private' });
          return new Response();
        },
      });

      await fetch(
        new Request('https://localhost/'),
        {
          PRIVATE_DATASET: new TestAnalyticsEngineDataset(
            TEST_WRITE_DATA_POINT,
          ),
        },
        TEST_EXECUTION_CONTEXT,
      );

      expect(TEST_WRITE_DATA_POINT).toHaveBeenCalledWith({
        blobs: [EXPECT_ANY_STRING, EXPECT_ANY_STRING],
        doubles: [EXPECT_ANY_NUMBER, NONE, UNSPECIFIED],
        indexes: ['private'],
      });
    });

    it('should emit a missing metric', async (): Promise<void> => {
      const { fetch } = new TestWorker();

      await fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expectPublicMetric({
        name: 'test-missing-private-dataset-metric-name',
      });
    });

    it('should emit an invalid metric', async (): Promise<void> => {
      const { fetch } = new TestWorker();

      await fetch(
        new Request('https://localhost/'),
        {
          PRIVATE_DATASET: 'test invalid private dataset',
        },
        TEST_EXECUTION_CONTEXT,
      );

      expectPublicMetric({
        name: 'test-invalid-private-dataset-metric-name',
        type: 'string',
      });

      expectToLogError(
        'Private error:',
        'Invalid private dataset',
        'test invalid private dataset',
        EXPECT_ANY_STRING,
      );
    });
  });

  describe('#setPublicDataset', (): void => {
    it('should subscribe to public metrics', async (): Promise<void> => {
      const TEST_WRITE_DATA_POINT = vi.fn();
      const { emitPublicMetric, fetch } = new TestWorker({
        onFetchRequest(): Response {
          emitPublicMetric({ name: 'public' });
          return new Response();
        },
      });

      await fetch(
        new Request('https://localhost/'),
        {
          PUBLIC_DATASET: new TestAnalyticsEngineDataset(TEST_WRITE_DATA_POINT),
        },
        TEST_EXECUTION_CONTEXT,
      );

      expect(TEST_WRITE_DATA_POINT).toHaveBeenCalledWith({
        blobs: [EXPECT_ANY_STRING, EXPECT_ANY_STRING],
        doubles: [EXPECT_ANY_NUMBER, NONE, UNSPECIFIED],
        indexes: ['public'],
      });
    });

    it('should emit a missing metric', async (): Promise<void> => {
      const { fetch } = new TestWorker();

      await fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expectPublicMetric({
        name: 'test-missing-public-dataset-metric-name',
      });
    });

    it('should emit an invalid metric', async (): Promise<void> => {
      const { fetch } = new TestWorker();

      await fetch(
        new Request('https://localhost/'),
        {
          PUBLIC_DATASET: 'test invalid public dataset',
        },
        TEST_EXECUTION_CONTEXT,
      );

      expectToLogError(
        'Private error:',
        'Invalid public dataset',
        'test invalid public dataset',
        EXPECT_ANY_STRING,
      );

      expectPublicMetric({
        name: 'test-invalid-public-dataset-metric-name',
        type: 'string',
      });
    });
  });
});
