/// <reference types="@cloudflare/workers-types" />
import type { Variable } from '@quisido/proposal-async-context';
import { type IncomingRequest } from 'cloudflare-utils';
import isRecord from './is-record.js';
import WorkerFetchContext from './worker-fetch-context.js';
import type Worker from './worker.js';

export interface Options {
  readonly console: Console;
  readonly contextVar: Variable<WorkerFetchContext>;
  readonly fetch: Fetcher['fetch'];
  readonly getNow?: (() => number) | undefined;
  readonly invalidPrivateDatasetMetricName: string;
  readonly invalidPublicDatasetMetricName: string;
  readonly invalidTraceParentMetricName: string;
  readonly missingPrivateDatasetMetricName: string;
  readonly missingPublicDatasetMetricName: string;
  readonly missingTraceParentMetricName: string;
  readonly onError: (
    this: Worker,
    error: unknown,
  ) => Promise<Response> | Response;
  readonly onInvalidIsolateEnvironment: (env: unknown) => Response;
  readonly onRequest: (this: Worker) => Promise<Response> | Response;
}

export default function createWorkerFetch(
  this: Worker,
  {
    contextVar,
    onError,
    onInvalidIsolateEnvironment,
    onRequest,
    ...createContextOptions
  }: Options,
): ExportedHandlerFetchHandler {
  return async (
    request: IncomingRequest,
    env: unknown,
    ctx: ExecutionContext,
  ): Promise<Response> => {
    if (!isRecord(env)) {
      return onInvalidIsolateEnvironment(env);
    }

    const state: WorkerFetchContext = new WorkerFetchContext({
      ...createContextOptions,
      ctx,
      env,
      request,
    });
    try {
      return await contextVar.run(state, onRequest.bind(this));
    } catch (err: unknown) {
      return await contextVar.run(state, onError.bind(this), err);
    } finally {
      state.flush();
    }
  };
}
