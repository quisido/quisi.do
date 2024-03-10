import { mapMapToRecord } from 'm7e';

export type Emit<
  M extends string = string,
  V extends number = number,
  D extends Readonly<Record<string, number | string>> = Readonly<
    Record<string, number | string>
  >,
> = (metric: M, value: V | null, dimensions: D) => void;

export type Emitter<
  M extends string = string,
  V extends number = number,
  D extends Readonly<Record<string, number | string>> = Readonly<
    Record<string, number | string>
  >,
> = ((name: M, dimensions?: D) => void) &
  ((name: M, value: V, dimensions?: D) => void);

interface Metadata {
  readonly [key: string]: string | number;
  readonly moduleTimestamp: number;
  readonly operationTimestamp: number;
  readonly timestamp: number;
  readonly traceId: string;
}

const UNINITIALIZED = 0;

export default class Operation<
  Cause = unknown,
  MetricName extends string = string,
  MetricValue extends number = number,
  MetricDimensions extends Readonly<Record<string, number | string>> = Readonly<
    Record<string, number | string>
  >,
> {
  private static INITIALIZATION_TIMESTAMP = Date.now();

  protected readonly _publicMetadata: Map<string, string | number> = new Map();

  protected readonly _startTimestamp: number;

  protected readonly _traceId: string;

  public constructor(traceId: string) {
    // As of 2024-02-25, Cloudflare mocks `Date` as `0` until its first run.
    if (Operation.INITIALIZATION_TIMESTAMP === UNINITIALIZED) {
      Operation.INITIALIZATION_TIMESTAMP = Date.now();
    }

    this._startTimestamp = Date.now();
    this._traceId = traceId;
  }

  public get publicMetadata(): Metadata {
    return {
      moduleTimestamp: Operation.INITIALIZATION_TIMESTAMP,
      operationTimestamp: this._startTimestamp,
      timestamp: Date.now(),
      traceId: this.traceId,
      ...mapMapToRecord(this._publicMetadata),
    };
  }

  public get traceId(): string {
    return this._traceId;
  }

  public addMetadata(key: string, value: string | number): this {
    this._publicMetadata.set(key, value);
    return this;
  }

  public assert(
    assertion: boolean,
    message: string,
    cause: Cause,
  ): asserts assertion {
    if (assertion) {
      return;
    }

    throw this.createError(message, cause);
  }

  public createError(message: string, cause: Cause): Error {
    return new Error(message, {
      cause,
    });
  }

  public emit(
    name: MetricName,
    value?: MetricValue,
    dimensions?: MetricDimensions,
  ): void;
  public emit(name: MetricName, dimensions?: MetricDimensions): void;
  public emit(
    name: MetricName,
    valueParam?: MetricValue | MetricDimensions,
    dimensionsParam?: MetricDimensions,
  ): void {
    const value: MetricValue | null =
      typeof valueParam === 'number' ? valueParam : null;
    const dimensions: MetricDimensions =
      typeof valueParam === 'object'
        ? valueParam
        : dimensionsParam ?? ({} as MetricDimensions);
    this._emit(name, value, dimensions);
  }

  public logErrorPrivately(err: unknown): void {
    console.error({
      ...this.publicMetadata,
      error: err,
    });
  }

  public logErrorPublicly(err: unknown): void {
    console.error({
      ...this.publicMetadata,
      error: err,
    });
  }

  protected _emit(
    name: MetricName,
    value: null | MetricValue,
    dimensions: MetricDimensions,
  ): void {
    console.log({
      ...this.publicMetadata,
      ...dimensions,
      name,
      value,
    });
  }
}
