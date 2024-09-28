import type { Variable } from '@quisido/proposal-async-context';
import type { AllOrNone } from './all-or-none.js';
import createInvalidIsolateEnvironmentHandler from './create-invalid-isolate-environment-handler.js';
import createWorkerFetch from './create-worker-fetch.js';
import type WorkerFetchContext from './worker-fetch-context.js';
import type Worker from './worker.js';

interface BaseOptions {
  readonly console: Console;
  readonly fetch: Fetcher['fetch'];
}

interface FetchOptions {
  readonly fetchContextVar: Variable<WorkerFetchContext>;
  readonly getNow?: (() => number) | undefined;
  readonly invalidPrivateDatasetMetricName: string;
  readonly invalidPublicDatasetMetricName: string;
  readonly invalidTraceParentMetricName: string;
  readonly missingPrivateDatasetMetricName: string;
  readonly missingPublicDatasetMetricName: string;
  readonly missingTraceParentMetricName: string;
  readonly onFetchError: (
    this: Worker,
    error: unknown,
  ) => Promise<Response> | Response;
  readonly onFetchRequest: (this: Worker) => Promise<Response> | Response;
}

export type Options = BaseOptions & AllOrNone<FetchOptions>;

export default function createWorkerExportedHandler(
  this: Worker,
  {
    console,
    fetch,
    fetchContextVar,
    getNow,
    invalidPrivateDatasetMetricName,
    invalidPublicDatasetMetricName,
    invalidTraceParentMetricName,
    missingPrivateDatasetMetricName,
    missingPublicDatasetMetricName,
    missingTraceParentMetricName,
    onFetchError,
    onFetchRequest,
  }: Options,
): new () => ExportedHandler {
  const worker: Worker = this;
  return class WorkerExportedHandler implements ExportedHandler {
    readonly fetch?: ExportedHandlerFetchHandler;

    public constructor() {
      if (typeof onFetchRequest === 'function') {
        this.fetch = createWorkerFetch.call(worker, {
          console,
          contextVar: fetchContextVar,
          fetch,
          getNow,
          invalidPrivateDatasetMetricName,
          invalidPublicDatasetMetricName,
          invalidTraceParentMetricName,
          missingPrivateDatasetMetricName,
          missingPublicDatasetMetricName,
          missingTraceParentMetricName,
          onError: onFetchError.bind(worker),
          onRequest: onFetchRequest.bind(worker),

          onInvalidIsolateEnvironment:
            createInvalidIsolateEnvironmentHandler(console),
        });
      }
    }
  };
}
