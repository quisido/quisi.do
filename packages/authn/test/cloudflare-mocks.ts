/// <reference types="@cloudflare/workers-types" />
import { expect, type Mock, vi } from 'vitest';

// Expect helpers
export const EXPECT_ANY_HEADERS: Headers = expect.any(Headers) as Headers;
export const EXPECT_ANY_NUMBER: number = expect.any(Number) as number;
export const EXPECT_ANY_STRING: string = expect.any(String) as string;

export function expectStringMatching(expected: RegExp | string): string {
  return expect.stringMatching(expected) as string;
}

// Analytics Engine Dataset mock
export class TestAnalyticsEngineDataset implements AnalyticsEngineDataset {
  public readonly expectToHaveWrittenDataPoint = (
    event?: AnalyticsEngineDataPoint,
  ): void => {
    expect(this.writeDataPoint).toHaveBeenCalledWith(event);
  };

  public readonly writeDataPoint: Mock<
    (event?: AnalyticsEngineDataPoint) => void
  > = vi.fn<(event?: AnalyticsEngineDataPoint) => void>();
}

function createNotImplementedThrower(methodName: string): () => never {
  return (): never => {
    throw new Error(`\`${methodName}\` is not implemented.`);
  };
}

// D1 Prepared Statement mock
interface D1StatementOptions {
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
  readonly #lastRowId: number;
  readonly #results: readonly unknown[];

  public constructor({
    error,
    lastRowId = DEFAULT_LAST_ROW_ID,
    results = DEFAULT_RESULTS,
  }: D1StatementOptions) {
    this.#error = error;
    this.#lastRowId = lastRowId;
    this.#results = results;
    this.all = this.all.bind(this);
    this.bind = this.bind.bind(this);
    this.run = this.run.bind(this);
  }

  public all<T>(): Promise<D1Result<T>> {
    if (typeof this.#error !== 'undefined') {
      return Promise.reject(this.#error);
    }

    return Promise.resolve({
      meta: {
        changed_db: true,
        changes: 1,
        duration: 1,
        last_row_id: this.#lastRowId,
        rows_read: 1,
        rows_written: 1,
        size_after: 1,
      },
      results: this.#results as T[],
      success: true,
    });
  }

  public bind(
    ...values: readonly (null | number | string)[]
  ): D1PreparedStatement {
    this.#boundValues.splice(FIRST, this.#boundValues.length, ...values);
    return this;
  }

  public expectToHaveBound = (
    ...values: readonly (null | number | string)[]
  ): void => {
    expect(this.#boundValues).toEqual(values);
  };

  public readonly first: D1PreparedStatement['first'] =
    createNotImplementedThrower('first');

  public readonly raw: D1PreparedStatement['raw'] =
    createNotImplementedThrower('raw');

  public run<T = Record<string, unknown>>(): Promise<D1Result<T>> {
    if (typeof this.#error !== 'undefined') {
      return Promise.reject(this.#error);
    }

    return Promise.resolve({
      meta: {
        changed_db: true,
        changes: 1,
        duration: 1,
        last_row_id: this.#lastRowId,
        rows_read: 1,
        rows_written: 1,
        size_after: 1,
      },
      results: [],
      success: true,
    });
  }
}

// D1 Database mock
interface D1ResultOptions {
  readonly error?: Error | undefined;
  readonly lastRowId?: number | undefined;
  readonly results?: readonly unknown[] | undefined;
}

export class TestD1Database implements D1Database {
  readonly #preparedStatements = new Map<string, TestD1PreparedStatement>();
  readonly #queries = new Map<string, D1ResultOptions>();

  public constructor(queries: Record<string, D1ResultOptions> = {}) {
    this.prepare = this.prepare.bind(this);

    for (const [query, result] of Object.entries(queries)) {
      this.#queries.set(query, result);
    }
  }

  public readonly batch: D1Database['batch'] =
    createNotImplementedThrower('batch');

  public readonly dump: D1Database['dump'] =
    createNotImplementedThrower('dump');

  public readonly exec: D1Database['exec'] =
    createNotImplementedThrower('exec');

  public readonly expectNotToHaveQueried = (query: string): void => {
    const statement: TestD1PreparedStatement | undefined =
      this.#preparedStatements.get(query);
    expect(statement).not.toBeDefined();
  };

  public readonly expectToHaveQueried = (
    query: string,
    values: readonly (null | number | string)[],
  ): void => {
    const statement: TestD1PreparedStatement | undefined =
      this.#preparedStatements.get(query);
    if (typeof statement === 'undefined') {
      throw new Error(`Expected query to have been prepared:
${query}`);
    }

    const { expectToHaveBound } = statement;
    expectToHaveBound(...values);
  };

  public prepare(query: string): D1PreparedStatement {
    const result: D1ResultOptions | undefined = this.#queries.get(query);
    if (typeof result === 'undefined') {
      throw new Error(`Expected query to be mocked:
${query}`);
    }

    const statement = new TestD1PreparedStatement(result);
    this.#preparedStatements.set(query, statement);
    return statement;
  }

  public withSession: D1Database['withSession'] =
    createNotImplementedThrower('withSession');
}

// KV Namespace mock
const TEST_KV_PUT = (): Promise<void> => Promise.resolve();

export class TestKVNamespace<Key extends string = string>
  implements KVNamespace<Key>
{
  readonly #put = vi.fn<
    (
      key: Key,
      value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
      options?: KVNamespacePutOptions,
    ) => Promise<void>
  >(TEST_KV_PUT);

  readonly #record: Partial<Record<string, string>>;

  public constructor(record: Partial<Record<string, string>> = {}) {
    this.#record = record;
    this.get = this.get.bind(this);
  }

  public delete: KVNamespace<Key>['delete'] =
    createNotImplementedThrower('delete');

  public expectToHavePut = (
    key: Key,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
    options?: KVNamespacePutOptions,
  ): void => {
    expect(this.#put).toHaveBeenCalledWith(key, value, options);
  };

  public async get<ExpectedValue = unknown>(
    key: Key | readonly Key[],
    options?:
      | Partial<KVNamespaceGetOptions<undefined>>
      | KVNamespaceGetOptions<'arrayBuffer'>
      | KVNamespaceGetOptions<'stream'>
      | KVNamespaceGetOptions<'json'>
      | KVNamespaceGetOptions<'text'>
      | 'arrayBuffer'
      | 'json'
      | 'stream'
      | 'text',
  ): Promise<
    | ArrayBuffer
    | ExpectedValue
    | Map<string, ExpectedValue | string | null>
    | ReadableStream
    | string
    | null
  > {
    if (typeof key !== 'string') {
      return key.reduce(
        this.#reduceGetKeysToMap,
        new Map<string, ExpectedValue | string | null>(),
      );
    }

    switch (options) {
      case 'text':
        return Promise.resolve(this.#record[key] ?? null);

      default:
        throw new Error('Not implemented');
    }
  }

  public getWithMetadata: KVNamespace<Key>['getWithMetadata'] =
    createNotImplementedThrower('getWithMetadata');

  public list: KVNamespace<Key>['list'] = createNotImplementedThrower('list');

  public put(
    key: Key,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
    options?: KVNamespacePutOptions,
  ): Promise<void> {
    return this.#put(key, value, options);
  }

  #reduceGetKeysToMap = <ExpectedValue>(
    map: Map<string, ExpectedValue | string | null>,
    key: Key,
  ): Map<string, ExpectedValue | string | null> => {
    map.set(key, this.#record[key] ?? null);
    return map;
  };

  public setPutError(error: Error): void {
    this.#put.mockRejectedValue(error);
  }
}

// R2 Bucket mock
export class TestR2Bucket implements R2Bucket {
  public readonly createMultipartUpload: Mock = vi.fn();
  public readonly delete: Mock = vi.fn();
  public readonly get: Mock = vi.fn();
  public readonly head: Mock = vi.fn();
  public readonly list: Mock = vi.fn();
  public readonly put: Mock = vi.fn();
  public readonly resumeMultipartUpload: Mock = vi.fn();

  public expectToHaveGot = (...params: Parameters<R2Bucket['get']>): void => {
    expect(this.get).toHaveBeenCalledWith(...params);
  };

  public expectToHavePut = (...params: Parameters<R2Bucket['put']>): void => {
    expect(this.put).toHaveBeenCalledWith(...params);
  };

  public setGetError = (error: Error): void => {
    this.get.mockRejectedValue(error);
  };

  public setPutError = (error: Error): void => {
    this.put.mockRejectedValue(error);
  };
}
