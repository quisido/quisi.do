/// <reference types="@cloudflare/workers-types" />
import { type IncomingRequest } from 'cloudflare-utils';
import type { Metric } from './metric.js';
import Telemetry from './telemetry.js';

export interface Options<M extends Metric> {
  readonly invalidPrivateDatasetMetricName: M extends Metric<
    infer N,
    never,
    'type'
  >
    ? N
    : never;
  readonly invalidPublicDatasetMetricName: M extends Metric<
    infer N,
    never,
    'type'
  >
    ? N
    : never;
  readonly invalidTraceParentMetricName: M extends Metric<infer N> ? N : never;
  readonly invalidUsageDatasetMetricName: M extends Metric<
    infer N,
    never,
    'type'
  >
    ? N
    : never;
  readonly missingPrivateDatasetMetricName: M extends Metric<infer N>
    ? N
    : never;
  readonly missingPublicDatasetMetricName: M extends Metric<infer N>
    ? N
    : never;
  readonly missingTraceParentMetricName: M extends Metric<infer N> ? N : never;
  readonly missingUsageDatasetMetricName: M extends Metric<infer N> ? N : never;
}

export default class State<
  M extends Metric,
  Env extends Record<string, unknown> = Record<string, unknown>,
  CfHostMetadata = unknown,
> {
  readonly #console: Console;

  readonly #ctx: ExecutionContext;

  readonly #env: Env;

  readonly #fetch: Fetcher['fetch'];

  readonly #request: IncomingRequest<CfHostMetadata>;

  readonly #telemetry: Telemetry<M>;

  public constructor(
    console: Console,
    fetch: Fetcher['fetch'],
    request: IncomingRequest<CfHostMetadata>,
    env: Env,
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
    }: Options<M>,
  ) {
    this.#console = console;
    this.#ctx = ctx;
    this.#env = env;
    this.#fetch = fetch;
    this.#request = request;
    this.#telemetry = new Telemetry<M>(console, request, env, ctx, {
      invalidPrivateDatasetMetricName,
      invalidPublicDatasetMetricName,
      invalidTraceParentMetricName,
      invalidUsageDatasetMetricName,
      missingPrivateDatasetMetricName,
      missingPublicDatasetMetricName,
      missingTraceParentMetricName,
      missingUsageDatasetMetricName,
    });
  }

  public get console(): Console {
    return this.#console;
  }

  public get ctx(): ExecutionContext {
    return this.#ctx;
  }

  public get env(): Env {
    return this.#env;
  }

  public get fetch(): Fetcher['fetch'] {
    return this.#fetch;
  }

  public get request(): Request<
    CfHostMetadata,
    IncomingRequestCfProperties<CfHostMetadata>
  > {
    return this.#request;
  }

  public get telemetry(): Telemetry<M> {
    return this.#telemetry;
  }
}
