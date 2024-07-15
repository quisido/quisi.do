import { isAnalyticsEngineDataset } from 'cloudflare-utils';
import { EventEmitter } from 'eventemitter3';
import { mapUnknownToError } from 'fmrs';
import createTraceId from './create-trace-id.js';
import mapAnalyticsEngineDatasetToEmitter from './map-analytics-dataset-engine-to-emitter.js';
import mapRequestToTraceParent from './map-request-to-trace-parent.js';
import mapTraceParentToMetricDimensions from './map-trace-parent-to-metric-dimensions.js';
import type { Metric } from './metric.js';
import { type TraceParent } from './modules/trace-parent/index.js';
import type TelemetryOptions from './telemetry-options.js';
import type TraceParentMetricDimensions from './trace-parent-metric-dimensions.js';

interface EventTypes<M extends Metric> {
  readonly effect: [Promise<unknown>];
  readonly 'error:private': [Error];
  readonly 'error:public': [Error];
  readonly 'metric:private': [M];
  readonly 'metric:public': [M];
}

type MetricName<
  M extends Metric,
  ND extends string = never,
  SD extends string = never,
> = M extends Metric<infer N, ND, SD> ? N : never;

const FIRST = 0;

// Current design does not allow optional dimensions. Set defaults.
const DEFAULT_TRACE_PARENT_METRIC_DIMENSIONS: TraceParentMetricDimensions = {
  traceFlags: 0,
  traceId: '00000000000000000000000000000000',
  traceParentId: '0000000000000000',
  traceVersion: 0,
};

export default class Telemetry<M extends Metric> extends EventEmitter<
  EventTypes<M>
> {
  readonly #constructorQueue: (() => void)[] = [];
  readonly #traceId: string;
  readonly #traceParent: TraceParent | null;

  public constructor(
    console: Console,
    request: Request,
    env: Record<string, unknown>,
    ctx: ExecutionContext,
    {
      invalidPrivateDatasetMetricName,
      invalidPublicDatasetMetricName,
      invalidTraceParentMetricName,
      invalidUsageDatasetMetricName,
      missingPrivateDatasetMetricName,
      missingPublicDatasetMetricName,
      missingTraceParentMetricName,
      missingUsageDatasetMetricName,
    }: TelemetryOptions<M>,
  ) {
    super();

    this.#traceId = createTraceId();
    this.#setConsole(console);
    this.#setExecutionContext(ctx);
    this.#traceParent = this.#createTraceParent(
      request,
      missingTraceParentMetricName,
      invalidTraceParentMetricName,
    );

    const { PRIVATE_DATASET, PUBLIC_DATASET, USAGE } = env;
    this.#setDataset(
      'private',
      PRIVATE_DATASET,
      missingPrivateDatasetMetricName,
      invalidPrivateDatasetMetricName,
    );
    this.#setDataset(
      'public',
      PUBLIC_DATASET,
      missingPublicDatasetMetricName,
      invalidPublicDatasetMetricName,
    );
    this.#setUsageDataset(
      USAGE,
      missingUsageDatasetMetricName,
      invalidUsageDatasetMetricName,
    );

    this.#flushConstructorQueue();
  }

  public affect = (promise: Promise<unknown>): void => {
    this.emit('effect', promise);
  };

  #createTraceParent(
    request: Request,
    missingMetricName: MetricName<M>,
    invalidMetricName: MetricName<M>,
  ): TraceParent | null {
    try {
      const traceParent: TraceParent | null = mapRequestToTraceParent(request);

      if (traceParent === null) {
        this.#constructorQueue.push((): void => {
          // @ts-expect-error: ... is assignable to the constraint of type 'M',
          // But 'M' could be instantiated with a different subtype of
          // Constraint 'Metric'.
          this.emitPublicMetric({ name: missingMetricName });
        });
      }
      return traceParent;
    } catch (err: unknown) {
      this.#constructorQueue.push((): void => {
        this.logPublicError(mapUnknownToError(err));

        // @ts-expect-error: ... is assignable to the constraint of type 'M',
        // But 'M' could be instantiated with a different subtype of constraint
        // 'Metric'.
        this.emitPublicMetric({ name: invalidMetricName });
      });
      return null;
    }
  }

  public emitPrivateMetric = (metric: M): void => {
    this.emit('metric:private', {
      ...this.#privateMetricDimensions,
      ...metric,
    });
  };

  public emitPublicMetric = (metric: M): void => {
    this.emit('metric:public', {
      ...this.#publicMetricDimensions,
      ...metric,
    });
  };

  #flushConstructorQueue(): void {
    const callbacks = this.#constructorQueue.splice(
      FIRST,
      this.#constructorQueue.length,
    );
    for (const fn of callbacks) {
      fn();
    }
  }

  public logPrivateError = (err: Error): void => {
    this.emit('error:private', err);
  };

  public logPublicError = (err: Error): void => {
    this.emit('error:public', err);
  };

  get #privateMetricDimensions(): Partial<Record<string, number | string>> {
    return {
      ...this.#publicMetricDimensions,
    };
  }

  get #publicMetricDimensions(): Partial<Record<string, number | string>> {
    return {
      ...this.#traceParentMetricDimensions,
      timestamp: Date.now(),
      traceId: this.#traceId,
    };
  }

  #setConsole(console: Console): void {
    this.on('error:private', (err: Error): void => {
      console.error(err.message, err.cause, err.stack);
    });

    this.on('error:public', (err: Error): void => {
      console.error(err.message, err.cause, err.stack);
    });

    this.on('metric:private', (metric: M): void => {
      console.log('Private:', {
        ...this.#privateMetricDimensions,
        ...metric,
      });
    });

    this.on('metric:public', (metric: M): void => {
      console.log('Public:', {
        ...this.#publicMetricDimensions,
        ...metric,
      });
    });
  }

  #setDataset(
    type: 'private' | 'public',
    dataset: unknown,
    missingMetricName: MetricName<M>,
    invalidMetricName: MetricName<M, never, 'type'>,
  ): void {
    if (typeof dataset === 'undefined') {
      this.#constructorQueue.push((): void => {
        // @ts-expect-error: ... is assignable to the constraint of type 'M',
        // But 'M' could be instantiated with a different subtype of constraint
        // 'Metric'.
        this.emitPublicMetric({
          name: missingMetricName,
        });
      });
      return;
    }

    if (!isAnalyticsEngineDataset(dataset)) {
      this.#constructorQueue.push((): void => {
        // @ts-expect-error: ... is assignable to the constraint of type 'M',
        // But 'M' could be instantiated with a different subtype of constraint
        // 'Metric'.
        this.emitPublicMetric({
          name: invalidMetricName,
          type: typeof dataset,
        });

        this.logPrivateError(
          new Error(`Invalid ${type} dataset`, {
            cause: JSON.stringify(dataset),
          }),
        );
      });
      return;
    }

    const emit = mapAnalyticsEngineDatasetToEmitter<M>(dataset);
    this.on(`metric:${type}`, emit);
  }

  #setExecutionContext(ctx: ExecutionContext): void {
    this.on('effect', (promise: Promise<unknown>): void => {
      ctx.waitUntil(promise);
    });
  }

  #setUsageDataset(
    dataset: unknown,
    missingMetricName: MetricName<M>,
    invalidMetricName: MetricName<M, never, 'type'>,
  ): void {
    if (typeof dataset === 'undefined') {
      this.#constructorQueue.push((): void => {
        // @ts-expect-error: ... is assignable to the constraint of type 'M',
        // But 'M' could be instantiated with a different subtype of constraint
        // 'Metric'.
        this.emitPublicMetric({
          name: missingMetricName,
        });
      });
      return;
    }

    if (!isAnalyticsEngineDataset(dataset)) {
      this.#constructorQueue.push((): void => {
        // @ts-expect-error: ... is assignable to the constraint of type 'M',
        // But 'M' could be instantiated with a different subtype of constraint
        // 'Metric'.
        this.emitPublicMetric({
          name: invalidMetricName,
          type: typeof dataset,
        });
        this.logPrivateError(
          new Error('Invalid usage dataset', {
            cause: JSON.stringify(dataset),
          }),
        );
      });
    }

    // This.onPrivateMetric((): void => {
    //   Dataset.writeDataPoint({
    //     Doubles: [UsageType.AnalyticsEngineDatasetWriteDataPoint, ONCE],
    //     Indexes: [AccountNumber.Quisido.toString()],
    //   });
    // });

    // This.onPublicMetric((): void => {
    //   Dataset.writeDataPoint({
    //     Doubles: [UsageType.AnalyticsEngineDatasetWriteDataPoint, ONCE],
    //     Indexes: [AccountNumber.Quisido.toString()],
    //   });
    // });
  }

  get #traceParentMetricDimensions(): TraceParentMetricDimensions {
    if (this.#traceParent === null) {
      return DEFAULT_TRACE_PARENT_METRIC_DIMENSIONS;
    }
    return mapTraceParentToMetricDimensions(this.#traceParent);
  }
}
