import { expect } from 'vitest';
import unimplementedMethod from './unimplemented-method.js';

interface Options {
  readonly error?: Error | undefined;
  readonly lastRowId?: number | undefined;
  readonly results?: readonly unknown[] | undefined;
}

const DEFAULT_LAST_ROW_ID = 1;
const DEFAULT_RESULTS: readonly never[] = [];
const FIRST = 0;

export class TestD1PreparedStatement implements D1PreparedStatement {
  readonly #boundValues: (null | number | string)[] = [];
  readonly #error: Error | undefined;
  public readonly first = unimplementedMethod;
  readonly #lastRowId: number;
  public readonly raw = unimplementedMethod;
  readonly #results: readonly unknown[];

  public constructor({
    error,
    lastRowId = DEFAULT_LAST_ROW_ID,
    results = DEFAULT_RESULTS,
  }: Options) {
    this.#error = error;
    this.#lastRowId = lastRowId;
    this.#results = results;
  }

  public all = <T>(): Promise<D1Result<T>> => {
    return Promise.resolve({
      /**
       *   We need to use `as T[]` here to match the `D1PareparedStatement`
       * behavior. Typechecking will be up to the runtime code.
       */
      results: this.#results as T[],
      success: true,

      meta: {
        changed_db: true,
        changes: 1,
        duration: 1,
        last_row_id: this.#lastRowId,
        rows_read: 1,
        rows_written: 1,
        size_after: 1,
      },
    });
  };

  public bind = (
    ...values: readonly (null | number | string)[]
  ): D1PreparedStatement => {
    this.#boundValues.splice(FIRST, this.#boundValues.length, ...values);
    return this;
  };

  public expectToHaveBound = (
    ...values: readonly (null | number | string)[]
  ): void => {
    expect(this.#boundValues).toEqual(values);
  };

  public run = <T = Record<string, unknown>>(): Promise<D1Result<T>> => {
    if (typeof this.#error !== 'undefined') {
      return Promise.reject(this.#error);
    }

    return Promise.resolve({
      success: true,
      results: [],

      meta: {
        changed_db: true,
        changes: 1,
        duration: 1,
        last_row_id: this.#lastRowId,
        rows_read: 1,
        rows_written: 1,
        size_after: 1,
      },
    });
  };
}
