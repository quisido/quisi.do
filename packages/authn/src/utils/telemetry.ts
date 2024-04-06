function callCallbacks<A extends readonly unknown[]>(
  callbacks: readonly ((...args: A) => void)[],
  ...args: A
): void {
  for (const callback of callbacks) {
    callback(...args);
  }
}

export default class Telemetry<M extends object> {
  private readonly _privateEmitListeners: ((metric: M) => void)[] = [];

  private readonly _privateLogListeners: ((error: Error) => void)[] = [];

  private readonly _publicEmitListeners: ((metric: M) => void)[] = [];

  private readonly _publicLogListeners: ((error: Error) => void)[] = [];

  protected _emitPrivateMetric(metric: M): void {
    callCallbacks(this._privateEmitListeners, metric);
  }

  protected _emitPublicMetric(metric: M): void {
    callCallbacks(this._publicEmitListeners, metric);
  }

  protected _logPrivateError(error: Error): void {
    callCallbacks(this._privateLogListeners, error);
  }

  protected _logPublicError(error: Error): void {
    callCallbacks(this._publicLogListeners, error);
  }

  protected _onPrivateError(callback: (err: Error) => void): void {
    this._privateLogListeners.push(callback);
  }

  protected _onPrivateMetric(callback: (Mtric: M) => void): void {
    this._privateEmitListeners.push(callback);
  }

  protected _onPublicError(callback: (err: Error) => void): void {
    this._publicLogListeners.push(callback);
  }

  protected _onPublicMetric(callback: (Mtric: M) => void): void {
    this._publicEmitListeners.push(callback);
  }

  public readonly emitPrivateMetric = this._emitPrivateMetric.bind(this);

  public readonly emitPublicMetric = this._emitPublicMetric.bind(this);

  public readonly logPrivateError = this._logPrivateError.bind(this);

  public readonly logPublicError = this._logPublicError.bind(this);

  public readonly onPrivateError = this._onPrivateError.bind(this);

  public readonly onPrivateMetric = this._onPrivateMetric.bind(this);

  public readonly onPublicError = this._onPublicError.bind(this);

  public readonly onPublicMetric = this._onPublicMetric.bind(this);
}
