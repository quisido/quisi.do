/// <reference types="@cloudflare/workers-types" />

import type IFetchHandler from './fetch-handler.js';
import InternalServerErrorResponse from './internal-server-error-response.js';
import type { MetricDimensions } from './metric-dimensions.js';

export interface ExportedHandlerOptions<
  Env,
  QueueHandlerMessage,
  CfHostMetadata,
> {
  readonly console?: Console | undefined;
  readonly fetch?: Fetcher['fetch'] | undefined;
  readonly now?: (() => number) | undefined;
  readonly onError?: ((error: Error) => Promise<void> | void) | undefined;
  readonly onLog?: ((message: string) => Promise<void> | void) | undefined;

  readonly FetchHandler?:
    | (new () => IFetchHandler<Env, QueueHandlerMessage, CfHostMetadata>)
    | undefined;

  readonly onMetric?:
    | ((name: string, dimensions: MetricDimensions) => Promise<void> | void)
    | undefined;
}

export const ExportedHandler = class QuisidoExportedHandler<
  Env = unknown,
  QueueHandlerMessage = unknown,
  CfHostMetadata = unknown,
> implements ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata>
{
  public readonly email?: EmailExportedHandler<Env>;
  public readonly fetch?: ExportedHandlerFetchHandler<Env, CfHostMetadata>;
  public readonly queue?: ExportedHandlerQueueHandler<Env, QueueHandlerMessage>;
  public readonly scheduled?: ExportedHandlerScheduledHandler<Env>;
  public readonly tail?: ExportedHandlerTailHandler<Env>;
  public readonly test?: ExportedHandlerTestHandler<Env>;
  public readonly trace?: ExportedHandlerTraceHandler<Env>;

  public constructor({
    console: consoleOption = console,
    fetch: fetchParam = fetch,
    FetchHandler,
    now,
    onError: handleError,
    onLog: handleLog,
    onMetric: handleMetric,
  }: ExportedHandlerOptions<Env, QueueHandlerMessage, CfHostMetadata> = {}) {
    if (typeof FetchHandler !== 'undefined') {
      this.fetch = (
        request: Request<
          CfHostMetadata,
          IncomingRequestCfProperties<CfHostMetadata>
        >,
        env: Env,
        ctx: ExecutionContext,
      ): Response | Promise<Response> => {
        const handleFetchError = (err: unknown): Response => {
          consoleOption.error(err);
          return new InternalServerErrorResponse();
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

          const response: Promise<Response> | Response = fetchHandler.run(
            { console: consoleOption, env, fetch: fetchParam, now },
            request,
            env,
            ctx,
          );

          if (!(response instanceof Promise)) {
            return response;
          }

          return response.catch(handleFetchError);
        } catch (err: unknown) {
          return handleFetchError(err);
        }
      };
    }
  }
};
