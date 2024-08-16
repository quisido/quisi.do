/// <reference types="@cloudflare/workers-types" />
import { isD1Database, type IncomingRequest } from 'cloudflare-utils';
import { EventEmitter } from 'eventemitter3';
import createTraceId from './create-trace-id.js';
import { DEFAULT_TRACE_PARENT_METRIC_DIMENSIONS } from './default-trace-parent-metric-dimensions.js';
import mapRequestToTraceParent from './map-request-to-trace-parent.js';
import mapTraceParentToMetricDimensions from './map-trace-parent-to-metric-dimensions.js';
import type { Metric } from './metric.js';
import { type TraceParent } from './modules/trace-parent/index.js';
import type TraceParentMetricDimensions from './trace-parent-metric-dimensions.js';

interface EventTypes {
  readonly effect: [Promise<unknown>];
  readonly 'error:private': [Error];
  readonly 'error:public': [Error];
  readonly 'metric:private': [Metric];
  readonly 'metric:public': [Metric];
}

const FIRST = 0;

export interface Options<
  Env extends Record<string, unknown> = Record<string, unknown>,
  CfHostMetadata = unknown,
> {
  readonly ctx: ExecutionContext;
  readonly env: Env;
  readonly invalidTraceParentMetricName: string;
  readonly missingTraceParentMetricName: string;
  readonly request: IncomingRequest<CfHostMetadata>;
}

export default class FetchContext<
  Env extends Record<string, unknown> = Record<string, unknown>,
  CfHostMetadata = unknown,
> {
  readonly #ctx: ExecutionContext;
  readonly #env: Env;
  readonly #eventEmitter: EventEmitter<EventTypes>;
  readonly #queue: (() => void)[] = [];
  readonly #request: IncomingRequest<CfHostMetadata>;
  readonly #traceId: string;
  readonly #traceParent?: TraceParent | null | undefined;

  public constructor({
    ctx,
    env,
    invalidTraceParentMetricName,
    missingTraceParentMetricName,
    request,
  }: Options<Env, CfHostMetadata>) {
    this.#eventEmitter = new EventEmitter();

    this.#traceId = createTraceId();
    this.#traceParent = this.#createTraceParent(
      request,
      missingTraceParentMetricName,
      invalidTraceParentMetricName,
    );

    this.#ctx = ctx;
    this.#env = env;
    this.#request = request;
  }

  public affect = (promise: Promise<unknown>): void => {
    this.#emit('effect', promise);
  };

  #createTraceParent(
    request: Request,
    missingMetricName: string,
    invalidMetricName: string,
  ): TraceParent | null {
    try {
      const traceParent: TraceParent | null = mapRequestToTraceParent(request);
      if (traceParent === null) {
        this.emitPublicMetric({ name: missingMetricName });
      }

      return traceParent;
    } catch (err: unknown) {
      /**
       *   This is an "expected" error, because it represents user input. We
       * don't want to alarm on this, but we do want to monitor it for
       * anomalies.
       */
      this.emitPublicMetric({ name: invalidMetricName });
      this.logPublicError(new Error('Invalid trace parent', { cause: err }));
      return null;
    }
  }

  public get ctx(): ExecutionContext {
    return this.#ctx;
  }

  #emit<T extends EventEmitter.EventNames<EventTypes>>(
    event: T,
    ...args: EventEmitter.EventArgs<EventTypes, T>
  ): boolean {
    this.#queue.push((): void => {
      this.#eventEmitter.emit(event, ...args);
    });
    return true;
  }

  public emitPrivateMetric = (metric: Metric): void => {
    this.#emit('metric:private', {
      ...this.#privateMetricDimensions,
      ...metric,
    });
  };

  public emitPublicMetric = (metric: Metric): void => {
    this.#emit('metric:public', {
      ...this.#publicMetricDimensions,
      ...metric,
    });
  };

  public get env(): Env {
    return this.#env;
  }

  public flush(): void {
    const { length } = this.#queue;
    const queue: (() => void)[] = this.#queue.splice(FIRST, length);
    for (const fn of queue) {
      fn();
    }
  }

  public getD1Database(name: string): D1Database {
    const db: unknown = this.env[name];

    if (!isD1Database(db)) {
      this.emitPublicMetric({
        db: name,
        name: '@quisido/d1-database/invalid',
      });

      throw new Error('Expected a D1 database.');
    }

    return db;
  }

  public logPrivateError = (err: Error): void => {
    this.#emit('error:private', err);
  };

  public logPublicError = (err: Error): void => {
    this.#emit('error:public', err);
  };

  #on<K extends keyof EventTypes>(
    event: K,
    callback: (...args: EventTypes[K]) => void,
  ): this {
    this.#eventEmitter.on(event, callback);
    return this;
  }

  public onPrivateError(callback: (error: Error) => void): this {
    this.#on('error:private', callback);
    return this;
  }

  public onPrivateMetric(callback: (metric: Metric) => void): this {
    this.#on('metric:private', callback);
    return this;
  }

  public onPublicError(callback: (error: Error) => void): this {
    this.#on('error:public', callback);
    return this;
  }

  public onPublicMetric(callback: (metric: Metric) => void): this {
    this.#on('metric:public', callback);
    return this;
  }

  public onSideEffect(callback: (effect: Promise<unknown>) => void): this {
    this.#on('effect', callback);
    return this;
  }

  get #privateMetricDimensions(): Record<string, number | string> {
    return {
      ...this.#publicMetricDimensions,
    };
  }

  get #publicMetricDimensions(): Record<string, number | string> {
    return {
      ...this.#traceParentMetricDimensions,
      timestamp: Date.now(),
    };
  }

  public get request(): Request<
    CfHostMetadata,
    IncomingRequestCfProperties<CfHostMetadata>
  > {
    return this.#request;
  }

  get #traceParentMetricDimensions(): TraceParentMetricDimensions {
    /**
     *   Trace parent is null when it is not present in the request.
     *   Trace parent is undefined when this property is accessed before the
     * constructor completes, e.g. when a metric is emit during construction.
     */
    if (
      this.#traceParent === null ||
      typeof this.#traceParent === 'undefined'
    ) {
      return {
        ...DEFAULT_TRACE_PARENT_METRIC_DIMENSIONS,
        traceId: this.#traceId,
      };
    }

    return mapTraceParentToMetricDimensions(this.#traceParent);
  }
}