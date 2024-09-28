import { Variable } from '@quisido/proposal-async-context';
import { type IncomingRequest } from 'cloudflare-utils';
import { type AllOrNone } from './all-or-none.js';
import catchSnapshot from './catch-snapshot.js';
import createWorkerExportedHandler from './create-worker-exported-handler.js';
import mapHeadersToCookies from './map-headers-to-cookies.js';
import mapRequestToPathname from './map-request-to-pathname.js';
import { type Metric } from './metric.js';
import snapshot from './snapshot.js';
import type WorkerFetchContext from './worker-fetch-context.js';

export interface CreateExportedHandlerOptions {
  readonly console: Console;
  readonly fetch: Fetcher['fetch'];
  readonly getNow?: (() => number) | undefined;
}

interface FetchOptions {
  readonly invalidPrivateDatasetMetricName: string;
  readonly invalidPublicDatasetMetricName: string;
  readonly invalidTraceParentMetricName: string;
  readonly missingPrivateDatasetMetricName: string;
  readonly missingPublicDatasetMetricName: string;
  readonly missingTraceParentMetricName: string;
  readonly onFetchRequest: (this: Worker) => Promise<Response> | Response;

  readonly onFetchError: (
    this: Worker,
    error: unknown,
  ) => Promise<Response> | Response;
}

export type Options = AllOrNone<FetchOptions>;

/*
Interface UseOptions {
  readonly account: number;
  readonly count?: number | undefined;
  readonly per?: number | undefined;
  readonly product: Product;
  readonly project: number;
  readonly type: UsageType;
}

const ONCE = 1;
const SINGLE = 1;
*/

export default class Worker {
  readonly #fetchOptions: AllOrNone<FetchOptions>;
  public catchSnapshot = catchSnapshot;
  public snapshot = snapshot;

  readonly #fetchContextVar = new Variable<WorkerFetchContext>({
    name: 'fetch context',
  });

  public constructor(options: Options) {
    this.#fetchOptions = options;
  }

  public affect = (promise: Promise<unknown>): void => {
    this.#fetchContext.affect(promise);
  };

  public createExportedHandler = ({
    console,
    getNow,
    fetch,
  }: CreateExportedHandlerOptions): ExportedHandler => {
    const ExportedHandler = createWorkerExportedHandler.call(this, {
      ...this.#fetchOptions,
      console,
      fetch,
      fetchContextVar: this.#fetchContextVar,
      getNow,
    });

    return new ExportedHandler();
  };

  public emitPrivateMetric = (metric: Metric): void => {
    this.#fetchContext.emitPrivateMetric(metric);
  };

  public emitPublicMetric = (metric: Metric): void => {
    this.#fetchContext.emitPublicMetric(metric);
  };

  get #fetchContext(): WorkerFetchContext {
    const state: WorkerFetchContext | undefined = this.#fetchContextVar.get();
    if (typeof state === 'undefined') {
      throw new Error('Expected a worker fetch context to be provided.');
    }
    return state;
  }

  public getCookie = (name: string): string | undefined => {
    const cookies: Partial<Record<string, string>> = this.getCookies();
    return cookies[name];
  };

  public getCookies = (): Partial<Record<string, string>> => {
    return mapHeadersToCookies(this.getRequestHeaders());
  };

  public getD1Database = (name: string): D1Database => {
    return this.#fetchContext.getD1Database(name);
  };

  public getEnv = (key: string): unknown => {
    return this.#fetchContext.env[key];
  };

  public getExecutionContext = (): ExecutionContext => {
    return this.#fetchContext.ctx;
  };

  public getFetch = (): Fetcher['fetch'] => {
    return this.#fetchContext.getFetch();
  };

  public getNow = (): number => {
    return this.#fetchContext.getNow();
  };

  public getR2Bucket = (name: string): R2Bucket => {
    return this.#fetchContext.getR2Bucket(name);
  };

  public getRequest = (): IncomingRequest => {
    return this.#fetchContext.request;
  };

  public getRequestHeaders = (): Headers => {
    return this.#fetchContext.request.headers;
  };

  public getRequestMethod = (): string => {
    return this.#fetchContext.request.method;
  };

  public getRequestPathname = (): string => {
    return mapRequestToPathname(this.#fetchContext.request);
  };

  public getRequestSearchParam = (name: string): string | null => {
    const { searchParams } = new URL(this.#fetchContext.request.url);
    return searchParams.get(name);
  };

  public getRequestText = async (): Promise<string> => {
    return await this.#fetchContext.request.text();
  };

  public logPrivateError = (err: Error): void => {
    this.#fetchContext.logPrivateError(err);
  };

  public logPublicError = (err: Error): void => {
    this.#fetchContext.logPublicError(err);
  };

  /*
  #use({
    account,
    count = ONCE,
    per = SINGLE,
    product,
    project,
    type,
  }: UseOptions): void {
    const { USAGE } = this.#fetchContext.env;

    if (!isAnalyticsEngineDataset(USAGE)) {
      if (typeof USAGE === 'undefined') {
        this.emitPrivateMetric({
          account,
          count,
          name: 'MISSING USAGE DATASET METRIC NAME',
          per,
          product,
          project,
          type,
        });
      }
      this.emitPrivateMetric({
        account,
        count,
        name: 'INVALID USAGE DATASET METRIC NAME',
        per,
        product,
        project,
        type,
      });
      return;
    }

    USAGE.writeDataPoint({
      indexes: [account.toString()],

      doubles: [
        product,
        project,
        type,
        count,
        per,
      ],
    });
  }
  */
}
