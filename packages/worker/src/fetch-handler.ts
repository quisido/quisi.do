/// <reference types="@cloudflare/workers-types" />
import createTraceId from './create-trace-id.js';
import handleErrorDefault from './default-error-handler.js';
import { DEFAULT_TRACE_PARENT_METRIC_DIMENSIONS } from './default-trace-parent-metric-dimensions.js';
import Handler from './handler.js';
import mapHeadersToCookies from './map-headers-to-cookies.js';
import mapRequestToPathname from './map-request-to-pathname.js';
import mapRequestToTraceParent from './map-request-to-trace-parent.js';
import mapTraceParentToMetricDimensions from './map-trace-parent-to-metric-dimensions.js';
import type { TraceParent } from './modules/trace-parent/index.js';
import type TraceParentMetricDimensions from './trace-parent-metric-dimensions.js';

export default class FetchHandler<
  Env = unknown,
  QueueHandlerMessage = unknown,
  CfHostMetadata = unknown,
> extends Handler<'fetch', Env, QueueHandlerMessage, CfHostMetadata> {
  #ctx: ExecutionContext | undefined;

  #request:
    | Request<CfHostMetadata, IncomingRequestCfProperties<CfHostMetadata>>
    | undefined;

  #traceId = createTraceId();

  public constructor(
    handleFetch: (
      request: Request<
        CfHostMetadata,
        IncomingRequestCfProperties<CfHostMetadata>
      >,
      env: Env,
      ctx: ExecutionContext,
    ) => ReturnType<ExportedHandlerFetchHandler<Env, CfHostMetadata>>,
    handleError: (
      error: unknown,
    ) => ReturnType<
      ExportedHandlerFetchHandler<Env, CfHostMetadata>
    > = handleErrorDefault,
  ) {
    super(
      (
        request: Request<
          CfHostMetadata,
          IncomingRequestCfProperties<CfHostMetadata>
        >,
        env: Env,
        ctx: ExecutionContext,
      ): Promise<Response> | Response => {
        this.#ctx = ctx;
        this.#request = request;
        try {
          const result = handleFetch.call(this, request, env, ctx);
          if (!(result instanceof Promise)) {
            return result;
          }
          return result.catch(handleError.bind(this));
        } catch (err: unknown) {
          return handleError.call(this, err);
        }
      },
    );
  }

  public get cookies(): Partial<Record<string, string>> {
    return mapHeadersToCookies(this.requestHeaders);
  }

  public get executionContext(): ExecutionContext {
    if (typeof this.#ctx !== 'undefined') {
      return this.#ctx;
    }

    throw new Error('The execution context may only be accessed during fetch.');
  }

  public getCookie = (name: string): string | undefined => {
    const { cookies } = this;
    return cookies[name];
  };

  public getRequestSearchParam = (key: string): string | null => {
    return this.requestSearchParams.get(key);
  };

  public get origin(): string | null {
    return this.requestHeaders.get('origin');
  }

  public get request(): Request {
    if (typeof this.#request !== 'undefined') {
      return this.#request;
    }

    throw new Error('The request may only be accessed during fetch.');
  }

  public get requestHeaders(): Headers {
    return this.request.headers;
  }

  public get requestMethod(): string {
    return this.request.method;
  }

  public get requestSearchParams(): URLSearchParams {
    return this.requestUrl.searchParams;
  }

  public get requestPathname(): string {
    return mapRequestToPathname(this.request);
  }

  public get requestUrl(): URL {
    return new URL(this.request.url);
  }

  public get traceId(): string {
    return this.traceId;
  }

  public get traceParent(): TraceParent | null {
    return mapRequestToTraceParent(this.request);
  }

  get traceParentMetricDimensions(): TraceParentMetricDimensions {
    /**
     *   Trace parent is null when it is not present in the request.
     *   Trace parent is undefined when this property is accessed before the
     * constructor completes, e.g. when a metric is emit during construction.
     */
    if (this.traceParent === null || typeof this.traceParent === 'undefined') {
      return {
        ...DEFAULT_TRACE_PARENT_METRIC_DIMENSIONS,
        traceId: this.#traceId,
      };
    }

    return mapTraceParentToMetricDimensions(this.traceParent);
  }
}
