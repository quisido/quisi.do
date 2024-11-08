/// <reference types="@cloudflare/workers-types" />
import { type IncomingRequest } from 'cloudflare-utils';
import createTraceId from './create-trace-id.js';
import { DEFAULT_TRACE_PARENT_METRIC_DIMENSIONS } from './default-trace-parent-metric-dimensions.js';
import mapRequestToTraceParent from './map-request-to-trace-parent.js';
import mapTraceParentToMetricDimensions from './map-trace-parent-to-metric-dimensions.js';
import { type TraceParent } from './modules/trace-parent/index.js';
import type TraceParentMetricDimensions from './trace-parent-metric-dimensions.js';

export interface Options<
  Env extends Record<string, unknown> = Record<string, unknown>,
  CfHostMetadata = unknown,
> {
  readonly ctx: ExecutionContext;
  readonly env: Env;
  readonly invalidTraceParentMetricName: string;
  readonly missingTraceParentMetricName: string;
  readonly now?: (() => number) | undefined;
  readonly request: IncomingRequest<CfHostMetadata>;
}

export default class FetchContext<
  Env extends Record<string, unknown> = Record<string, unknown>,
  CfHostMetadata = unknown,
> {
  readonly #traceId: string;
  readonly #traceParent?: TraceParent | null | undefined;

  public constructor({}: Options<Env, CfHostMetadata>) {
    this.#traceId = createTraceId();

    this.#traceParent = this.#createTraceParent(
      request,
      missingTraceParentMetricName,
      invalidTraceParentMetricName,
    );
  }

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
