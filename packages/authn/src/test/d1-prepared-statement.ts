import { expect } from "vitest";
import unimplementedMethod from "./unimplemented-method.js";

interface Result {
  readonly lastRowId?: number | undefined;
  readonly results?: readonly unknown[] | undefined;
}

const DEFAULT_LAST_ROW_ID = 1;
const DEFAULT_RESULTS: readonly never[] = [];

export class TestD1PreparedStatement implements D1PreparedStatement {
  readonly #boundValues: (null | number | string)[] = [];
  public readonly first = unimplementedMethod;
  readonly #lastRowId: number;
  public readonly raw = unimplementedMethod;
  readonly #results: readonly unknown[];

  public constructor({
    lastRowId = DEFAULT_LAST_ROW_ID,
    results = DEFAULT_RESULTS,
  }: Result) {
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
    this.#boundValues.splice(0, this.#boundValues.length, ...values);
    return this;
  }

  public expectToHaveBound = (
    ...values: readonly (null | number | string)[]
  ): void => {
    expect(this.#boundValues).toEqual(values);
  };

  public run = (): Promise<D1Response> => {
    return Promise.resolve({
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
}
