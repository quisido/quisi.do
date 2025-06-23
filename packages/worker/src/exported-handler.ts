/// <reference types="@cloudflare/workers-types" />

import createExportedHandlerFetch, {
  type CreateExportedHandlerFetchOptions,
} from './create-exported-handler-fetch.js';

export type ExportedHandlerOptions<Env, QueueHandlerMessage, CfHostMetadata> =
  Partial<
    CreateExportedHandlerFetchOptions<Env, QueueHandlerMessage, CfHostMetadata>
  >;

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
    FetchHandler,
    console: consoleOption = console,
    fetch: fetchOption = fetch,
    finally: handleFinally,
    now,
    onError,
    onLog,
    onMetric,
  }: ExportedHandlerOptions<Env, QueueHandlerMessage, CfHostMetadata> = {}) {
    if (typeof FetchHandler !== 'undefined') {
      this.fetch = createExportedHandlerFetch({
        FetchHandler,
        console: consoleOption,
        fetch: fetchOption,
        finally: handleFinally,
        now,
        onError,
        onLog,
        onMetric,
      });
    }
  }
};
