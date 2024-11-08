/// <reference types="@cloudflare/workers-types" />
import Handler from './handler.js';
import mapRequestToPathname from './map-request-to-pathname.js';

export default class FetchHandler<
  Env = unknown,
  QueueHandlerMessage = unknown,
  CfHostMetadata = unknown,
> extends Handler<'fetch', Env, QueueHandlerMessage, CfHostMetadata> {
  #ctx: ExecutionContext | undefined;

  #request:
    | Request<CfHostMetadata, IncomingRequestCfProperties<CfHostMetadata>>
    | undefined;

  public constructor(
    handler: (
      request: Request<
        CfHostMetadata,
        IncomingRequestCfProperties<CfHostMetadata>
      >,
      env: Env,
      ctx: ExecutionContext,
    ) => ReturnType<ExportedHandlerFetchHandler<Env, CfHostMetadata>>,
  ) {
    super(
      (
        request: Request<
          CfHostMetadata,
          IncomingRequestCfProperties<CfHostMetadata>
        >,
        env: Env,
        ctx: ExecutionContext,
      ): ReturnType<ExportedHandlerFetchHandler<Env, CfHostMetadata>> => {
        this.#ctx = ctx;
        this.#request = request;
        return handler.call(this, request, env, ctx);
      },
    );
  }

  public get executionContext(): ExecutionContext {
    if (typeof this.#ctx !== 'undefined') {
      return this.#ctx;
    }

    throw new Error('The execution context may only be accessed during fetch.');
  }

  public get request(): Request {
    if (typeof this.#request !== 'undefined') {
      return this.#request;
    }

    throw new Error('The request may only be accessed during fetch.');
  }

  public get requestPathname(): string {
    return mapRequestToPathname(this.request);
  }
}
