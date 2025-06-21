/// <reference types="@cloudflare/workers-types" />
import type IFetchHandler from './fetch-handler.js';
import InternalServerErrorResponse from './internal-server-error-response.js';
import type { MetricDimensions } from './metric-dimensions.js';

export interface CreateExportedHandlerFetchOptions<
  Env,
  QueueHandlerMessage,
  CfHostMetadata,
> {
  readonly FetchHandler: new () => IFetchHandler<
    Env,
    QueueHandlerMessage,
    CfHostMetadata
  >;
  readonly console: Console;
  readonly fetch: Fetcher['fetch'];
  readonly finally?: (() => Promise<void> | void) | undefined;
  readonly now?: (() => number) | undefined;
  readonly onError?: ((error: Error) => Promise<void> | void) | undefined;
  readonly onLog?: ((message: string) => Promise<void> | void) | undefined;
  readonly onMetric?:
    | ((name: string, dimensions: MetricDimensions) => Promise<void> | void)
    | undefined;
}

/**
 * Creates a Cloudflare Workers-compatible fetch handler that wraps a FetchHandler class.
 * Manages request processing, error handling, logging, metrics, and side effects.
 *
 * @param options - Configuration options including handler class and lifecycle hooks
 * @returns A fetch handler function compatible with Cloudflare Workers
 */
export default function createExportedHandlerFetch<
  Env,
  QueueHandlerMessage,
  CfHostMetadata,
>({
  FetchHandler,
  console: consoleOption,
  fetch: fetchOption,
  finally: finallyOption,
  now,
  onError: handleError,
  onLog: handleLog,
  onMetric: handleMetric,
}: CreateExportedHandlerFetchOptions<
  Env,
  QueueHandlerMessage,
  CfHostMetadata
>): ExportedHandlerFetchHandler<Env, CfHostMetadata> {
  return function fetch(
    request: Request<
      CfHostMetadata,
      IncomingRequestCfProperties<CfHostMetadata>
    >,
    env: Env,
    ctxParam: ExecutionContext,
  ): Response | Promise<Response> {
    const effects: Promise<unknown>[] = [];
    const ctx: ExecutionContext = {
      ...ctxParam,
      waitUntil(promise: Promise<unknown>): void {
        effects.push(promise);
        ctxParam.waitUntil(promise);
      },
    };

    const handleFetchError = (err: unknown): Response => {
      consoleOption.error(`[${request.method}] ${request.url}`, err);
      return new InternalServerErrorResponse();
    };

    const handleFinally = (
      instance: IFetchHandler<
        Env,
        QueueHandlerMessage,
        CfHostMetadata
      > | null = null,
    ): void => {
      if (typeof finallyOption === 'undefined') {
        return;
      }

      ctxParam.waitUntil(
        Promise.allSettled(effects)
          .then(finallyOption.bind(instance))
          .catch((err: unknown): void => {
            consoleOption.error('`finally` threw:', err);
          }),
      );
    };

    const handleSideEffect = (promise: Promise<unknown>): void => {
      ctx.waitUntil(promise);
    };

    try {
      const fetchHandler = new FetchHandler();
      fetchHandler.onSideEffect(handleSideEffect);

      if (typeof handleError !== 'undefined') {
        fetchHandler.onError(handleError);
      }

      if (typeof handleLog !== 'undefined') {
        fetchHandler.onLog(handleLog);
      }

      if (typeof handleMetric !== 'undefined') {
        fetchHandler.onMetric(handleMetric);
      }

      try {
        const response: Promise<Response> | Response = fetchHandler.run(
          { console: consoleOption, env, fetch: fetchOption, now },
          request,
          env,
          ctx,
        );

        // Synchronous response
        if (!(response instanceof Promise)) {
          handleFinally(fetchHandler);
          return response;
        }

        // Asynchronous response
        return response.catch(handleFetchError).finally((): void => {
          handleFinally(fetchHandler);
        });
      } catch (err: unknown) {
        // This error was thrown by the Handler's `run` method.
        const response: Response = handleFetchError(err);
        handleFinally(fetchHandler);
        return response;
      }
    } catch (err: unknown) {
      // This error thrown while instantiating the Handler.
      const response: Response = handleFetchError(err);
      handleFinally();
      return response;
    }
  };
}
