import type IFetchHandler from './fetch-handler.js';
import InternalServerErrorResponse from './internal-server-error-response.js';

export interface ExportedHandlerOptions<
  Env,
  QueueHandlerMessage,
  CfHostMetadata,
> {
  readonly console: Console;
  readonly fetch: Fetcher['fetch'];
  readonly FetchHandler?:
    | (new () => IFetchHandler<Env, QueueHandlerMessage, CfHostMetadata>)
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
        try {
          const { handle, onMetric } = new FetchHandler();
          onMetric(handleMetric);
          return handle({ console, env, fetch }, request, env, ctx);
        } catch (err: unknown) {
          console.error(err);
          return new InternalServerErrorResponse();
        }
      };
    }
  }
};
