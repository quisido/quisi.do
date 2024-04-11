import Telemetry from './telemetry.js';

export default class TelemetryQueue<M extends object> extends Telemetry<M> {
  private readonly _privateDimensions: Record<string, number | string> = {};

  private readonly _publicDimensions: Record<string, number | string> = {};

  private readonly _queue: (() => void)[] = [];

  protected _addPrivateDimension(name: string, value: number | string): void {
    this._privateDimensions[name] = value;
  }

  protected _addPublicDimension(name: string, value: number | string): void {
    this._publicDimensions[name] = value;
  }

  protected _addPrivateDimensions(
    dimensions: Partial<Record<string, number | string>>,
  ): void {
    Object.assign(this._privateDimensions, dimensions);
  }

  protected _addPublicDimensions(
    dimensions: Partial<Record<string, number | string>>,
  ): void {
    Object.assign(this._publicDimensions, dimensions);
  }

  protected override _emitPrivateMetric(metric: M): void {
    this._queue.push((): void => {
      super._emitPrivateMetric({
        ...this._publicDimensions,
        ...this._privateDimensions,
        ...metric,
      });
    });
  }

  protected override _emitPublicMetric(metric: M): void {
    this._queue.push((): void => {
      super._emitPublicMetric({
        ...this._publicDimensions,
        ...metric,
      });
    });
  }

  protected _flush(): void {
    for (const act of this._queue) {
      act();
    }
  }

  public override _logPrivateError(err: Error): void {
    this._queue.push((): void => {
      super._logPrivateError(err);
    });
  }

  public override _logPublicError(err: Error): void {
    this._queue.push((): void => {
      super._logPublicError(err);
    });
  }

  public addPrivateDimension = this._addPrivateDimension.bind(this);

  public addPublicDimension = this._addPublicDimension.bind(this);

  public addPrivateDimensions = this._addPrivateDimensions.bind(this);

  public addPublicDimensions = this._addPublicDimensions.bind(this);

  public override emitPrivateMetric = this._emitPrivateMetric.bind(this);

  public override emitPublicMetric = this._emitPublicMetric.bind(this);

  public flush = this._flush.bind(this);

  public override logPrivateError = this._logPrivateError.bind(this);

  public override logPublicError = this._logPublicError.bind(this);
}
