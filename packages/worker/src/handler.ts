/// <reference types="@cloudflare/workers-types" />

import {
  isAnalyticsEngineDataset,
  isD1Database,
  isR2Bucket,
} from 'cloudflare-utils';
import { EventEmitter } from 'eventemitter3';
import { isRecord } from 'fmrs';
import { MetricName } from './metric-name.js';

interface EventTypes {
  readonly effect: [Promise<unknown>];
  readonly error: [Error];
  readonly log: [string];
  readonly metric: [string, Record<string, number | string>];
}

export interface HandlerOptions<Env> {
  readonly console: Console;
  readonly env: Env;
  readonly fetch: Fetcher['fetch'];
  readonly now?: (() => number) | undefined;
}

const FIRST = 0;

export default class Handler<
  K extends keyof Required<ExportedHandler>,
  Env = unknown,
  QueueHandlerMessage = unknown,
  CfHostMetadata = unknown,
> {
  readonly #eventEmitter = new EventEmitter<EventTypes>();
  #console: Console | undefined;
  #env: Env | undefined;
  #fetch: Fetcher['fetch'] | undefined;
  #now: () => number = Date.now.bind(Date);
  readonly #queue: (() => void)[] = [];

  public readonly handle: (
    /**
     *   Technical debt: This should be something like `this: this`, to denote
     * that the `handle` function will be bound to the `Handler` object.
     * However, doing so results in an error: classes that extend `Handler`
     * cannot be assigned to `new () => Handler`, because their `handle`'s
     * `this` types are incompatible.
     */
    options: HandlerOptions<Env>,
    ...params: Parameters<
      Required<ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata>>[K]
    >
  ) => ReturnType<
    Required<ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata>>[K]
  >;

  public constructor(
    handler: (
      ...params: Parameters<
        Required<ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata>>[K]
      >
    ) => ReturnType<
      Required<ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata>>[K]
    >,
  ) {
    this.handle = (
      { console, env, fetch, now }: HandlerOptions<Env>,
      ...params: Parameters<
        Required<ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata>>[K]
      >
    ): ReturnType<
      Required<ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata>>[K]
    > => {
      this.#console = console;
      this.#env = env;
      this.#fetch = fetch;
      if (typeof now !== 'undefined') {
        this.#now = now;
      }

      return handler.call(this, ...params);
    };
  }

  public affect = (promise: Promise<unknown>): void => {
    this.#emit('effect', promise);
  };

  public get console(): Console {
    if (typeof this.#console !== 'undefined') {
      return this.#console;
    }

    throw new Error('The console may only be accessed during an operation.');
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

  public emitMetric = (
    name: string,
    dimensions: Record<string, number | string>,
  ): void => {
    this.#emit('metric', name, {
      ...dimensions,
    });
  };

  public get fetch(): Fetcher['fetch'] {
    if (typeof this.#fetch !== 'undefined') {
      return this.#fetch;
    }

    throw new Error('You may only fetch during an operation.');
  }

  public flush = (): void => {
    const { length } = this.#queue;
    const queue: (() => void)[] = this.#queue.splice(FIRST, length);
    for (const fn of queue) {
      fn();
    }
  };

  public getAnalyticsEngineDataset = (name: string): AnalyticsEngineDataset => {
    const dataset: unknown = this.getEnv(name);
    if (isAnalyticsEngineDataset(dataset)) {
      return dataset;
    }

    this.emitMetric(MetricName.InvalidAnalyticsEngineDataset, {
      name,
    });

    throw new Error('Expected an Analytics Engine dataset.');
  };

  public getD1Database = (name: string): D1Database => {
    const db: unknown = this.getEnv(name);
    if (isD1Database(db)) {
      return db;
    }

    this.emitMetric(MetricName.InvalidD1Database, {
      name,
    });

    throw new Error('Expected a D1 database.');
  };

  /**
   *   Technical debt: This should be `<K extends keyof Env>(key: K): Env[K]`,
   * but that would (1) require `Env` be typed and (2) lose type-safety by
   * assuming `Env[K]` is the correct type. If the constructor can include a
   * `validateEnv: { [K in keyof Env]: (value: unknown) => value is Env[K] }`
   * type, this may be doable with `this.#validateEnv(this.#env[key])`.
   */
  public getEnv = (key: string): unknown => {
    if (isRecord(this.#env)) {
      return this.#env[key];
    }

    throw new Error('The environment may only be accessed during fetch.');
  };

  public getR2Bucket = (name: string): R2Bucket => {
    const bucket: unknown = this.getEnv(name);
    if (isR2Bucket(bucket)) {
      return bucket;
    }

    this.emitMetric(MetricName.InvalidR2Bucket, {
      name,
    });

    throw new Error('Expected an R2 bucket.');
  };

  public logError = (err: Error): void => {
    this.#emit('error', err);
  };

  public now = (): number => {
    return this.#now();
  };

  #on<K extends keyof EventTypes>(
    event: K,
    callback: (...args: EventTypes[K]) => void,
  ): void {
    this.#eventEmitter.on(event, callback);
  }

  public onError = (callback: (error: Error) => void): void => {
    this.#on('error', callback);
  };

  public onMetric = (
    callback: (
      name: string,
      dimensions: Record<string, number | string>,
    ) => void,
  ): this => {
    this.#on('metric', callback);
    return this;
  };

  public onSideEffect = (
    callback: (effect: Promise<unknown>) => void,
  ): void => {
    this.#on('effect', callback);
  };
}
