import { beforeEach, describe, expect, it } from 'vitest';
import TestD1Database from './test/d1-database.js';
import { EXPECT_ANY_STRING } from './test/expect-any.js';
import expectToEmitPublicMetric from './test/expect-emit-public-metric.js';
import expectToLogError from './test/expect-to-log-error.js';
import { TEST_EXECUTION_CONTEXT } from './test/test-execution-context.js';
import TestWorker from './test/test-worker.js';

describe('FetchContext', (): void => {
  describe('#createTraceParent', (): void => {
    it('should emit when traceparent is invalid', async (): Promise<void> => {
      const { fetch } = new TestWorker();

      await fetch(
        new Request('https://localhost/', {
          headers: new Headers({
            traceparent: 'test-invalid-traceparent',
          }),
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expectToEmitPublicMetric({
        name: 'test-invalid-trace-parent-metric-name',
      });

      expectToLogError(
        'Public:',
        'Invalid trace parent',
        new Error('Invalid trace parent'),
        EXPECT_ANY_STRING,
      );
    });

    it('should log when traceparent trace ID is invalid', async (): Promise<void> => {
      const { fetch } = new TestWorker();

      await fetch(
        new Request('https://localhost/', {
          headers: new Headers({
            traceparent:
              '00-00000000000000000000000000000000-23456789abcdef01-23',
          }),
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expectToLogError(
        'Public:',
        'Invalid trace parent',
        new Error('Trace parent trace IDs must be non-zero.'),
        EXPECT_ANY_STRING,
      );
    });

    it('should log when traceparent trace parent ID is invalid', async (): Promise<void> => {
      const { fetch } = new TestWorker();

      await fetch(
        new Request('https://localhost/', {
          headers: new Headers({
            traceparent:
              '00-23456789abcdef0123456789abcdef01-0000000000000000-23',
          }),
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expectToLogError(
        'Public:',
        'Invalid trace parent',
        new Error('Trace parent parent IDs must be non-zero.'),
        EXPECT_ANY_STRING,
      );
    });
  });

  describe('getD1Database', (): void => {
    let db: D1Database | null = null;
    beforeEach((): void => {
      db = null;
    });

    const handleFetchRequest = (
      getD1Database: (name: string) => D1Database,
    ): Response => {
      db = getD1Database('TEST_DB');
      return new Response();
    };

    it('should emit when the D1 database is invalid', async (): Promise<void> => {
      const { fetch, getD1Database } = new TestWorker({
        onFetchRequest(): Response {
          return handleFetchRequest(getD1Database);
        },
      });

      await fetch(
        new Request('https://localhost/'),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expectToEmitPublicMetric({
        db: 'TEST_DB',
        name: '@quisido/d1-database/invalid',
      });
    });

    it('should return a D1 database', async (): Promise<void> => {
      const TEST_DB: D1Database = new TestD1Database();
      const { fetch, getD1Database } = new TestWorker({
        onFetchRequest(): Response {
          return handleFetchRequest(getD1Database);
        },
      });

      await fetch(
        new Request('https://localhost/'),
        {
          TEST_DB,
        },
        TEST_EXECUTION_CONTEXT,
      );

      expect(db).toBe(TEST_DB);
    });
  });

  describe('#traceParentMetricDimensions', (): void => {
    it('should include the traceparent', async (): Promise<void> => {
      const { emitPublicMetric, fetch } = new TestWorker({
        onFetchRequest() {
          emitPublicMetric({
            name: 'test metric name',
          });
          return new Response();
        },
      });

      await fetch(
        new Request('https://localhost/', {
          headers: new Headers({
            traceparent:
              '01-23456789abcdef0123456789abcdef01-23456789abcdef01-23',
          }),
        }),
        {},
        TEST_EXECUTION_CONTEXT,
      );

      expectToEmitPublicMetric({
        name: 'test metric name',
        traceFlags: 35,
        traceId: '23456789abcdef0123456789abcdef01',
        traceParentId: '23456789abcdef01',
        traceVersion: 1,
      });
    });
  });
});
