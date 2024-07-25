import {
  isAnalyticsEngineDataset,
  type IncomingRequest,
} from 'cloudflare-utils';
import FetchContext, {
  type Options as FetchContextOptions,
} from './fetch-context.js';
import mapAnalyticsEngineDatasetToEmitter from './map-analytics-dataset-engine-to-emitter.js';
import { type Metric } from './metric.js';

/**
 *   The `WorkerFetchContext` class is an implementation of a `FetchContext`
 * tailored for a `Worker` instance, so it is gnostic of the `Worker` class.
 */

export interface Options extends FetchContextOptions {
  readonly console: Console;
  readonly ctx: ExecutionContext;
  readonly env: Readonly<Record<string, unknown>>;
  readonly fetch: Fetcher['fetch'];
  readonly invalidPrivateDatasetMetricName: string;
  readonly invalidPublicDatasetMetricName: string;
  readonly missingPrivateDatasetMetricName: string;
  readonly missingPublicDatasetMetricName: string;
  readonly request: IncomingRequest;
}

export default class WorkerFetchContext extends FetchContext {
  readonly #fetch: Fetcher['fetch'];

  public constructor({
    console,
    ctx,
    env,
    fetch,
    invalidPrivateDatasetMetricName,
    invalidPublicDatasetMetricName,
    invalidTraceParentMetricName,
    missingPrivateDatasetMetricName,
    missingPublicDatasetMetricName,
    missingTraceParentMetricName,
    request,
  }: Options) {
    super({
      ctx,
      env,
      invalidTraceParentMetricName,
      missingTraceParentMetricName,
      request,
    });

    this.#fetch = fetch;
    this.#setConsole(console);
    this.#setExecutionContext(ctx);

    const { PRIVATE_DATASET, PUBLIC_DATASET } = env;
    this.#setPrivateDataset(
      PRIVATE_DATASET,
      missingPrivateDatasetMetricName,
      invalidPrivateDatasetMetricName,
    );
    this.#setPublicDataset(
      PUBLIC_DATASET,
      missingPublicDatasetMetricName,
      invalidPublicDatasetMetricName,
    );
  }

  public getFetch(): Fetcher['fetch'] {
    return this.#fetch;
  }

  #setConsole(console: Console): void {
    this.onPrivateError((err: Error): void => {
      console.error('Private:', err.message, err.cause, err.stack);
    });

    this.onPublicError((err: Error): void => {
      console.error('Public:', err.message, err.cause, err.stack);
    });

    this.onPrivateMetric((metric: Metric): void => {
      console.log('Private:', metric);
    });

    this.onPublicMetric((metric: Metric): void => {
      console.log('Public:', metric);
    });
  }

  #setExecutionContext(ctx: ExecutionContext): void {
    this.onSideEffect((promise: Promise<unknown>): void => {
      ctx.waitUntil(promise);
    });
  }

  #setPrivateDataset(
    dataset: unknown,
    missingMetricName: string,
    invalidMetricName: string,
  ): void {
    if (isAnalyticsEngineDataset(dataset)) {
      const emit = mapAnalyticsEngineDatasetToEmitter(dataset);
      this.onPrivateMetric(emit);
      // USAGE.writeDataPoint()
    } else if (typeof dataset === 'undefined') {
      this.emitPublicMetric({ name: missingMetricName });
    } else {
      this.emitPublicMetric({
        name: invalidMetricName,
        type: typeof dataset,
      });
      this.logPrivateError(
        new Error('Invalid private dataset', { cause: dataset }),
      );
    }
  }

  #setPublicDataset(
    dataset: unknown,
    missingMetricName: string,
    invalidMetricName: string,
  ): void {
    if (isAnalyticsEngineDataset(dataset)) {
      const emit = mapAnalyticsEngineDatasetToEmitter(dataset);
      this.onPublicMetric(emit);
      // USAGE.writeDataPoint()
    } else if (typeof dataset === 'undefined') {
      this.emitPublicMetric({ name: missingMetricName });
    } else {
      this.emitPublicMetric({
        name: invalidMetricName,
        type: typeof dataset,
      });
      this.logPrivateError(
        new Error('Invalid public dataset', { cause: dataset }),
      );
    }
  }
}
