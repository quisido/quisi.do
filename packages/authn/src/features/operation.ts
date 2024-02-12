import mapMapToRecord from '../modules/map-reduce/map-map-to-record.js';
import createTraceId from '../utils/create-trace-id.js';
import since from '../utils/since.js';

// TODO: Add tracing.

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
  readonly moduleDuration: number;
  readonly operationDuration: number;
  readonly parentTraceId: string;
  readonly traceId: string;
}

const MODULE_TIMESTAMP: number = Date.now();

export default class Operation<
  Cause = unknown,
  MetricName extends string = string,
  MetricValue extends number = number,
  MetricDimensions extends Readonly<Record<string, number | string>> = Readonly<
    Record<string, number | string>
  >,
> {
  protected readonly _parentTraceId: string;

  protected readonly _publicMetadataetadata: Map<string, string | number> =
    new Map();

  protected readonly _startTimestamp: number;

  protected readonly _traceId: string = createTraceId();

  public constructor(parentTraceId: string) {
    this._parentTraceId = parentTraceId;
    this._startTimestamp = Date.now();
  }

  public get publicMetadata(): Metadata {
    return {
      moduleDuration: since(MODULE_TIMESTAMP),
      operationDuration: since(this._startTimestamp),
      parentTraceId: this.parentTraceId,
      traceId: this.traceId,
      ...mapMapToRecord(this._publicMetadataetadata),
    };
  }

  public get parentTraceId(): string {
    return this._parentTraceId;
  }

  public get traceId(): string {
    return this._traceId;
  }

  public addMetadata(key: string, value: string | number): this {
    this._publicMetadataetadata.set(key, value);
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

  public setEmitter(
    emit: Emit<MetricName, MetricValue, MetricDimensions>,
  ): this {
    this._emit = emit;
    return this;
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
