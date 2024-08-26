import type { Variable } from '@quisido/proposal-async-context';
import type { AllOrNone } from './all-or-none.js';
import createInvalidIsolateEnvironmentHandler from './create-invalid-isolate-environment-handler.js';
import createWorkerFetch from './create-worker-fetch.js';
import type WorkerFetchContext from './worker-fetch-context.js';

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
  readonly onFetchError: (error: unknown) => Promise<Response> | Response;
  readonly onFetchRequest: () => Promise<Response> | Response;
}

export type Options = BaseOptions & AllOrNone<FetchOptions>;

export default function createWorkerExportedHandler({
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
}: Options): new () => ExportedHandler {
  return class WorkerExportedHandler implements ExportedHandler {
    readonly fetch?: ExportedHandlerFetchHandler;

    public constructor() {
      if (typeof onFetchRequest === 'function') {
        this.fetch = createWorkerFetch({
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
          onError: onFetchError,
          onRequest: onFetchRequest,

          onInvalidIsolateEnvironment:
            createInvalidIsolateEnvironmentHandler(console),
        });
      }
    }
  };
}
