/// <reference types="@cloudflare/workers-types" />
import type { Variable } from '@quisido/proposal-async-context';
import { type IncomingRequest } from 'cloudflare-utils';
import isRecord from './is-record.js';
import WorkerFetchContext from './worker-fetch-context.js';

export interface Options {
  readonly console: Console;
  readonly contextVar: Variable<WorkerFetchContext>;
  readonly fetch: Fetcher['fetch'];
  readonly invalidPrivateDatasetMetricName: string;
  readonly invalidPublicDatasetMetricName: string;
  readonly invalidTraceParentMetricName: string;
  readonly missingPrivateDatasetMetricName: string;
  readonly missingPublicDatasetMetricName: string;
  readonly missingTraceParentMetricName: string;
  readonly onError: (error: unknown) => Promise<Response> | Response;
  readonly onInvalidIsolateEnvironment: (env: unknown) => Response;
  readonly onRequest: () => Promise<Response> | Response;
}

export default function createWorkerFetch({
  contextVar,
  onError,
  onInvalidIsolateEnvironment,
  onRequest,
  ...createContextOptions
}: Options): ExportedHandlerFetchHandler {
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
      return await contextVar.run(state, onRequest);
    } catch (err: unknown) {
      return await contextVar.run(state, onError, err);
    } finally {
      state.flush();
    }
  };
}
