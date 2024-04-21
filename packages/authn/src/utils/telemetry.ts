import callCallbacks from "./call-callbacks.js";

export default class Telemetry<M extends object> {
  readonly #privateEmitListeners: ((metric: M) => void)[] = [];

  readonly #privateLogListeners: ((error: Error) => void)[] = [];

  readonly #publicEmitListeners: ((metric: M) => void)[] = [];

  readonly #publicLogListeners: ((error: Error) => void)[] = [];

  readonly #sideEffectListeners: ((
    promise: Promise<unknown>,
  ) => void)[] = [];

  protected proAffect(promise: Promise<unknown>): void {
    callCallbacks(this.#sideEffectListeners, promise);
  }

  protected proEmitPrivateMetric(metric: M): void {
    callCallbacks(this.#privateEmitListeners, metric);
  }

  protected proEmitPublicMetric(metric: M): void {
    callCallbacks(this.#publicEmitListeners, metric);
  }

  protected proLogPrivateError(error: Error): void {
    callCallbacks(this.#privateLogListeners, error);
  }

  protected proLogPublicError(error: Error): void {
    callCallbacks(this.#publicLogListeners, error);
  }

  protected proOnPrivateError(callback: (err: Error) => void): void {
    this.#privateLogListeners.push(callback);
  }

  protected proOnPrivateMetric(callback: (metric: M) => void): void {
    this.#privateEmitListeners.push(callback);
  }

  protected proOnPublicError(callback: (err: Error) => void): void {
    this.#publicLogListeners.push(callback);
  }

  protected proOnPublicMetric(callback: (metric: M) => void): void {
    this.#publicEmitListeners.push(callback);
  }

  protected proOnSideEffect(callback: (promise: Promise<unknown>) => void): void {
    this.#sideEffectListeners.push(callback);
  }

  public readonly affect = this.proAffect.bind(this);

  public readonly emitPrivateMetric = this.proEmitPrivateMetric.bind(this);

  public readonly emitPublicMetric = this.proEmitPublicMetric.bind(this);

  public readonly logPrivateError = this.proLogPrivateError.bind(this);

  public readonly logPublicError = this.proLogPublicError.bind(this);

  public readonly onPrivateError = this.proOnPrivateError.bind(this);

  public readonly onPrivateMetric = this.proOnPrivateMetric.bind(this);

  public readonly onPublicError = this.proOnPublicError.bind(this);

  public readonly onPublicMetric = this.proOnPublicMetric.bind(this);

  public readonly onSideEffect = this.proOnSideEffect.bind(this);
}
