/// <reference types="@cloudflare/workers-types" />
import type IFetchHandler from './fetch-handler.js';
import InternalServerErrorResponse from './internal-server-error-response.js';
import type { MetricDimensions } from './metric-dimensions.js';
import noop from './noop.js';

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

export default function createExportedHandlerFetch<
  Env,
  QueueHandlerMessage,
  CfHostMetadata,
>({
  FetchHandler,
  console: consoleOption,
  fetch: fetchOption,
  finally: handleFinally,
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
    ctx: ExecutionContext,
  ): Response | Promise<Response> {
    const handleFetchError = (err: unknown): Response => {
      consoleOption.error(err);
      return new InternalServerErrorResponse();
    };

    const effects: Promise<unknown>[] = [];
    const handleSideEffect = (promise: Promise<unknown>): void => {
      ctx.waitUntil(promise);
      effects.push(promise);
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

      const afterResponse = (): void => {
        if (typeof handleFinally === 'undefined') {
          return;
        }

        ctx.waitUntil(
          Promise.allSettled(effects)
            .then(handleFinally.bind(fetchHandler))
            .catch(noop),
        );
      };

      try {
        const response: Promise<Response> | Response = fetchHandler.run(
          { console: consoleOption, env, fetch: fetchOption, now },
          request,
          env,
          {
            ...ctx,
            waitUntil(promise: Promise<unknown>) {
              effects.push(promise);
              ctx.waitUntil(promise);
            },
          },
        );

        // Will it actually wait? Will it call the side effects? Will metrics be emit or tracked?
        // Will costs be tracked if handleFinally calls an API?
        // Is there a way to make ctx inaccessible to handleFinally?
        // Should this await handleFinally? Or just ctx.waitUntil(handleFinally) ignoring the result?
        // Also implement this solution in the `else` for this branch.
        // What to do with thrown errors?

        if (!(response instanceof Promise)) {
          afterResponse();
          return response;
        }

        return response.catch(handleFetchError).finally(afterResponse);
      } catch (err: unknown) {
        const response: Response = handleFetchError(err);
        afterResponse();
        return response;
      }
    } catch (err: unknown) {
      return handleFetchError(err);
    }
  };
}
