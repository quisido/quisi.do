import { assert, vi } from 'vitest';
import Worker from '../index.js';
import { TEST_CONSOLE } from './console.js';

interface Options {
  readonly fetch?: Fetcher['fetch'];
  readonly onFetchError?: (error: unknown) => Promise<Response> | Response;
  readonly onFetchRequest?: () => Promise<Response> | Response;
}

const DEFAULT_OPTIONS: Options = {};

export default class TestWorker extends Worker {
  public readonly fetch: ExportedHandlerFetchHandler;

  public constructor(options?: Options) {
    const {
      fetch = vi.fn(),
      onFetchError = vi.fn(),
      onFetchRequest = vi.fn(),
    } = options ?? DEFAULT_OPTIONS;

    super({
      invalidPrivateDatasetMetricName:
        'test-invalid-private-dataset-metric-name',
      invalidPublicDatasetMetricName: 'test-invalid-public-dataset-metric-name',
      invalidTraceParentMetricName: 'test-invalid-trace-parent-metric-name',
      missingPrivateDatasetMetricName:
        'test-missing-private-dataset-metric-name',
      missingPublicDatasetMetricName: 'test-missing-public-dataset-metric-name',
      missingTraceParentMetricName: 'test-missing-trace-parent-metric-name',
      onFetchError,
      onFetchRequest,
    });

    const { fetch: handleFetch } = new this.ExportedHandler({
      console: TEST_CONSOLE,
      fetch,
    });

    assert(typeof handleFetch !== 'undefined');
    this.fetch = handleFetch;
  }
}
