import { type IncomingRequest } from 'cloudflare-utils';
import { describe, expect, it, vi } from 'vitest';
import { State } from './index.js';
import Telemetry from './telemetry.js';
import TestAnalyticsEngineDataset from './test/analytics-engine-dataset.js';
import { TEST_CONSOLE, TEST_CONSOLE_ERROR } from './test/console.js';
import type { TestMetric } from './test/metric.js';
import { TEST_TELEMETRY_OPTIONS } from './test/telemetry-options.js';

const TEST_FETCH = vi.fn();
const TEST_TRACE_FLAGS = 0;
const TEST_TRACE_VERSION = 0;
const TEST_WRITE_PRIVATE_DATA_POINT = vi.fn();
const TEST_WRITE_PUBLIC_DATA_POINT = vi.fn();

const TEST_EXECUTION_CONTEXT: ExecutionContext = {
  passThroughOnException: vi.fn(),
  waitUntil: vi.fn(),
};

const mapTraceparentToState = (traceparent: string): State<TestMetric> =>
  new State<TestMetric>(
    TEST_CONSOLE,
    TEST_FETCH,
    new Request('https://localhost/', {
      headers: new Headers({ traceparent }),
    }),
    {
      PRIVATE_DATASET: new TestAnalyticsEngineDataset(
        TEST_WRITE_PRIVATE_DATA_POINT,
      ),
      PUBLIC_DATASET: new TestAnalyticsEngineDataset(
        TEST_WRITE_PUBLIC_DATA_POINT,
      ),
    },
    TEST_EXECUTION_CONTEXT,
    TEST_TELEMETRY_OPTIONS,
  );

describe('State', (): void => {
  it('should emit when traceparent is missing', (): void => {
    new State<TestMetric>(
      TEST_CONSOLE,
      TEST_FETCH,
      new Request('https://localhost/'),
      {
        PRIVATE_DATASET: new TestAnalyticsEngineDataset(
          TEST_WRITE_PRIVATE_DATA_POINT,
        ),
        PUBLIC_DATASET: new TestAnalyticsEngineDataset(
          TEST_WRITE_PUBLIC_DATA_POINT,
        ),
        USAGE: new TestAnalyticsEngineDataset(vi.fn()),
      },
      TEST_EXECUTION_CONTEXT,
      TEST_TELEMETRY_OPTIONS,
    );

    expect(TEST_WRITE_PUBLIC_DATA_POINT).toHaveBeenCalledWith({
      blobs: [expect.any(String) as string, '0000000000000000'],
      doubles: [
        expect.any(Number) as number,
        TEST_TRACE_FLAGS,
        TEST_TRACE_VERSION,
      ],
      indexes: ['test-missing-trace-parent-metric-name'],
    });
  });

  it('should emit when traceparent is invalid', (): void => {
    mapTraceparentToState('test-invalid-traceparent');

    expect(TEST_WRITE_PUBLIC_DATA_POINT).toHaveBeenCalledWith({
      blobs: [expect.any(String) as string, '0000000000000000'],
      doubles: [
        expect.any(Number) as number,
        TEST_TRACE_FLAGS,
        TEST_TRACE_VERSION,
      ],
      indexes: ['test-invalid-trace-parent-metric-name'],
    });
  });

  it('should emit when traceparent parent ID is 0', (): void => {
    mapTraceparentToState(
      '00-0102030405060708090a0b0c0d0e0f10-0000000000000000-19',
    );

    expect(TEST_WRITE_PUBLIC_DATA_POINT).toHaveBeenCalledWith({
      blobs: [expect.any(String) as string, '0000000000000000'],
      doubles: [
        expect.any(Number) as number,
        TEST_TRACE_FLAGS,
        TEST_TRACE_VERSION,
      ],
      indexes: ['test-invalid-trace-parent-metric-name'],
    });
  });

  it('should emit when traceparent trace ID is 0', (): void => {
    mapTraceparentToState(
      '00-00000000000000000000000000000000-1112131415161718-19',
    );

    expect(TEST_WRITE_PUBLIC_DATA_POINT).toHaveBeenCalledWith({
      blobs: [expect.any(String) as string, '0000000000000000'],
      doubles: [
        expect.any(Number) as number,
        TEST_TRACE_FLAGS,
        TEST_TRACE_VERSION,
      ],
      indexes: ['test-invalid-trace-parent-metric-name'],
    });
  });

  it('should include traceparent in metrics', (): void => {
    const testTraceFlags = 128;
    mapTraceparentToState(
      '00-0102030405060708090a0b0c0d0e0f10-1112131415161718-80',
    );

    expect(TEST_WRITE_PUBLIC_DATA_POINT).toHaveBeenCalledWith({
      blobs: [expect.any(String) as string, '1112131415161718'],
      doubles: [
        expect.any(Number) as number,
        testTraceFlags,
        TEST_TRACE_VERSION,
      ],
      indexes: [expect.any(String) as string],
    });
  });

  it('should surface state', (): void => {
    const testEnv = {
      PRIVATE_DATASET: new TestAnalyticsEngineDataset(
        TEST_WRITE_PRIVATE_DATA_POINT,
      ),
      PUBLIC_DATASET: new TestAnalyticsEngineDataset(
        TEST_WRITE_PUBLIC_DATA_POINT,
      ),
      USAGE: new TestAnalyticsEngineDataset(vi.fn()),
    };

    const testRequest: IncomingRequest = new Request('https://localhost/');

    const state = new State<TestMetric>(
      TEST_CONSOLE,
      TEST_FETCH,
      testRequest,
      testEnv,
      TEST_EXECUTION_CONTEXT,
      TEST_TELEMETRY_OPTIONS,
    );

    expect(state.console).toBe(TEST_CONSOLE);
    expect(state.ctx).toBe(TEST_EXECUTION_CONTEXT);
    expect(state.env).toBe(testEnv);
    expect(state.fetch).toBe(TEST_FETCH);
    expect(state.request).toBe(testRequest);
    expect(state.telemetry).toBeInstanceOf(Telemetry);
  });

  it('should emit when the private dataset is invalid', (): void => {
    new State<TestMetric>(
      TEST_CONSOLE,
      TEST_FETCH,
      new Request('https://localhost/'),
      {
        PRIVATE_DATASET: 'invalid dataset',
        PUBLIC_DATASET: new TestAnalyticsEngineDataset(
          TEST_WRITE_PUBLIC_DATA_POINT,
        ),
        USAGE: new TestAnalyticsEngineDataset(vi.fn()),
      },
      TEST_EXECUTION_CONTEXT,
      TEST_TELEMETRY_OPTIONS,
    );

    expect(TEST_WRITE_PUBLIC_DATA_POINT).toHaveBeenCalledWith({
      blobs: [expect.any(String) as string, '0000000000000000', 'string'],
      doubles: [
        expect.any(Number) as number,
        TEST_TRACE_FLAGS,
        TEST_TRACE_VERSION,
      ],
      indexes: ['test-invalid-private-dataset-metric-name'],
    });

    expect(TEST_CONSOLE_ERROR).toHaveBeenCalledWith(
      'Invalid private dataset',
      '"invalid dataset"',
      expect.any(String) as string,
    );
  });

  it('should log when the public dataset is invalid', (): void => {
    new State<TestMetric>(
      TEST_CONSOLE,
      TEST_FETCH,
      new Request('https://localhost/'),
      {
        PRIVATE_DATASET: new TestAnalyticsEngineDataset(
          TEST_WRITE_PRIVATE_DATA_POINT,
        ),
        PUBLIC_DATASET: 'invalid dataset',
        USAGE: new TestAnalyticsEngineDataset(vi.fn()),
      },
      TEST_EXECUTION_CONTEXT,
      TEST_TELEMETRY_OPTIONS,
    );

    expect(TEST_CONSOLE_ERROR).toHaveBeenCalledWith(
      'Invalid public dataset',
      '"invalid dataset"',
      expect.any(String) as string,
    );
  });

  it('should emit when the usage dataset is invalid', (): void => {
    new State<TestMetric>(
      TEST_CONSOLE,
      TEST_FETCH,
      new Request('https://localhost/'),
      {
        PUBLIC_DATASET: new TestAnalyticsEngineDataset(
          TEST_WRITE_PUBLIC_DATA_POINT,
        ),
        USAGE: 'invalid dataset',
      },
      TEST_EXECUTION_CONTEXT,
      TEST_TELEMETRY_OPTIONS,
    );

    expect(TEST_WRITE_PUBLIC_DATA_POINT).toHaveBeenCalledWith({
      blobs: [expect.any(String) as string, '0000000000000000', 'string'],
      doubles: [
        expect.any(Number) as number,
        TEST_TRACE_FLAGS,
        TEST_TRACE_VERSION,
      ],
      indexes: ['test-invalid-usage-dataset-metric-name'],
    });

    expect(TEST_CONSOLE_ERROR).toHaveBeenCalledWith(
      'Invalid usage dataset',
      '"invalid dataset"',
      expect.any(String) as string,
    );
  });
});
