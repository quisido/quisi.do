import { assert, describe, expect, it, vi } from 'vitest';
import Worker from './index.js';
import { TEST_CONSOLE } from './test/console.js';

describe('defaultGetNow', (): void => {
  it('should return the current timestamp', async (): Promise<void> => {
    let now: null | number = null;
    const { createExportedHandler, getNow } = new Worker({
      invalidPublicDatasetMetricName: 'test-invalid-public-dataset-metric-name',
      invalidTraceParentMetricName: 'test-invalid-trace-parent-metric-name',
      missingPublicDatasetMetricName: 'test-missing-public-dataset-metric-name',
      missingTraceParentMetricName: 'test-missing-trace-parent-metric-name',
      onFetchError: vi.fn(),

      invalidPrivateDatasetMetricName:
        'test-invalid-private-dataset-metric-name',

      missingPrivateDatasetMetricName:
        'test-missing-private-dataset-metric-name',

      onFetchRequest(): Response {
        now = getNow();
        return new Response();
      },
    });

    const { fetch } = createExportedHandler({
      console: TEST_CONSOLE,
      fetch: vi.fn(),
    });

    assert(typeof fetch !== 'undefined');
    await fetch(
      new Request('https://localhost/'),
      {},
      {
        passThroughOnException: vi.fn(),
        waitUntil: vi.fn(),
      },
    );

    expect(now).toBeLessThanOrEqual(Date.now());
  });
});
