import type IFetchHandler from './fetch-handler.js';
import InternalServerErrorResponse from './internal-server-error-response.js';

export interface ExportedHandlerOptions<
  Env,
  QueueHandlerMessage,
  CfHostMetadata,
> {
  readonly console: Console;
  readonly fetch: Fetcher['fetch'];
  readonly onError?: ((error: Error) => Promise<void> | void) | undefined;
  readonly onLog?: ((message: string) => Promise<void> | void) | undefined;

  readonly FetchHandler?:
    | (new () => IFetchHandler<Env, QueueHandlerMessage, CfHostMetadata>)
    | undefined;

  readonly onMetric?:
    | ((
        name: string,
        dimensions: Record<string, number | string>,
      ) => Promise<void> | void)
    | undefined;
}

export const ExportedHandler = class QuisidoExportedHandler<
  Env = unknown,
  QueueHandlerMessage = unknown,
  CfHostMetadata = unknown,
> implements ExportedHandler<Env, QueueHandlerMessage, CfHostMetadata>
{
  public readonly fetch?: ExportedHandlerFetchHandler<Env, CfHostMetadata>;

  public constructor({
    console,
    fetch,
    FetchHandler,
    onError: handleError,
    onLog: handleLog,
    onMetric: handleMetric,
  }: ExportedHandlerOptions<Env, QueueHandlerMessage, CfHostMetadata>) {
    if (typeof FetchHandler !== 'undefined') {
      if (typeof this.fetch !== 'undefined') {
        throw new Error(`An ExportedHandler can only have one fetch handler.`);
      }

      this.fetch = (
        request: Request<
          CfHostMetadata,
          IncomingRequestCfProperties<CfHostMetadata>
        >,
        env: Env,
        ctx: ExecutionContext,
      ): Response | Promise<Response> => {
        const handleSideEffect = (promise: Promise<unknown>): void => {
          ctx.waitUntil(promise);
        };

        try {
          const { handle, onError, onLog, onMetric, onSideEffect } =
            new FetchHandler();
          if (typeof handleError !== 'undefined') {
            onError(handleError);
          }

          if (typeof handleLog !== 'undefined') {
            onLog(handleLog);
          }

          if (typeof handleMetric !== 'undefined') {
            onMetric(handleMetric);
          }

          onSideEffect(handleSideEffect);
          return handle({ console, env, fetch }, request, env, ctx);
        } catch (err: unknown) {
          console.error(err);
          return new InternalServerErrorResponse();
        }
      };
    }
  }
};
