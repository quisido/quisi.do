import type { Metric } from '../types/metric.js';
import type Telemetry from '../utils/telemetry.js';
import createReturnHref from './create-return-href.js';
import TelemetryQueue from './telemetry-queue.js';

export default class State {
  private readonly _ctx: ExecutionContext;

  private _env: Record<string, unknown> | null = null;

  private readonly _fetch: Fetcher['fetch'];

  private readonly _request: Request;

  private _returnHref: string | null = null;

  private _telemetry: TelemetryQueue | null = null;

  private readonly _traceId: string;

  public constructor(
    fetch: Fetcher['fetch'],
    request: Request,
    ctx: ExecutionContext,
    traceId: string,
  ) {
    this._ctx = ctx;
    this._fetch = fetch;
    this._request = request;
    this._traceId = traceId;
  }

  public get ctx(): ExecutionContext {
    return this._ctx;
  }

  public get env(): Record<string, unknown> | null {
    return this._env;
  }

  public get fetch(): Fetcher['fetch'] {
    return this._fetch;
  }

  public get request(): Request {
    return this._request;
  }

  public get returnHref(): string | null {
    return this._returnHref;
  }

  public get telemetry(): Telemetry<Metric> | null {
    return this._telemetry;
  }

  public get traceId(): string {
    return this._traceId;
  }

  public flushTelemetry(): void {
    if (this._telemetry === null) {
      return;
    }
    this._telemetry.flush();
  }

  public setEnv(env: Record<string, unknown>): void {
    this._env = env;
    this._telemetry = new TelemetryQueue(env, this._ctx, this._traceId);

    // Requires `env` and `telemetry`.
    this._returnHref = createReturnHref();
  }
}
