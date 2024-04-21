import Telemetry from './telemetry.js';

export default class TelemetryQueue<M extends object> extends Telemetry<M> {
  readonly #privateDimensions: Record<string, number | string> = {};

  readonly #publicDimensions: Record<string, number | string> = {};

  readonly #queue: (() => void)[] = [];

  protected proAddPrivateDimension(name: string, value: number | string): void {
    this.#privateDimensions[name] = value;
  }

  protected proAddPublicDimension(name: string, value: number | string): void {
    this.#publicDimensions[name] = value;
  }

  protected proAddPrivateDimensions(
    dimensions: Partial<Record<string, number | string>>,
  ): void {
    Object.assign(this.#privateDimensions, dimensions);
  }

  protected proAddPublicDimensions(
    dimensions: Partial<Record<string, number | string>>,
  ): void {
    Object.assign(this.#publicDimensions, dimensions);
  }

  protected override proEmitPrivateMetric(metric: M): void {
    this.#queue.push((): void => {
      super.proEmitPrivateMetric({
        ...this.#publicDimensions,
        ...this.#privateDimensions,
        ...metric,
      });
    });
  }

  protected override proEmitPublicMetric(metric: M): void {
    this.#queue.push((): void => {
      super.proEmitPublicMetric({
        ...this.#publicDimensions,
        ...metric,
      });
    });
  }

  protected proFlush(): void {
    for (const act of this.#queue) {
      act();
    }
  }

  protected override proLogPrivateError(err: Error): void {
    this.#queue.push((): void => {
      super.proLogPrivateError(err);
    });
  }

  protected override proLogPublicError(err: Error): void {
    this.#queue.push((): void => {
      super.proLogPublicError(err);
    });
  }

  public addPrivateDimension = this.proAddPrivateDimension.bind(this);

  public addPublicDimension = this.proAddPublicDimension.bind(this);

  public addPrivateDimensions = this.proAddPrivateDimensions.bind(this);

  public addPublicDimensions = this.proAddPublicDimensions.bind(this);

  public override emitPrivateMetric = this.proEmitPrivateMetric.bind(this);

  public override emitPublicMetric = this.proEmitPublicMetric.bind(this);

  public flush = this.proFlush.bind(this);

  public override logPrivateError = this.proLogPrivateError.bind(this);

  public override logPublicError = this.proLogPublicError.bind(this);
}
