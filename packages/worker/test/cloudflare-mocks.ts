/* eslint-disable max-classes-per-file, max-lines */
/// <reference types="@cloudflare/workers-types" />
import { expect, type Mock, vi } from 'vitest';

// Expect helpers
export const EXPECT_ANY_HEADERS: Headers = expect.any(Headers) as Headers;
export const EXPECT_ANY_NUMBER: number = expect.any(Number) as number;
export const EXPECT_ANY_OBJECT: object = expect.any(Object) as object;
export const EXPECT_ANY_STRING: string = expect.any(String) as string;

// eslint-disable-next-line func-style
export function expectStringMatching(expected: RegExp | string): string {
  return expect.stringMatching(expected) as string;
}

// Execution context
export const TEST_PASS_THROUGH_ON_EXCEPTION: Mock = vi.fn();
export const TEST_WAIT_UNTIL: Mock = vi.fn();

export const TEST_EXECUTION_CONTEXT: ExecutionContext = {
  passThroughOnException: TEST_PASS_THROUGH_ON_EXCEPTION,
  props: null,
  waitUntil: TEST_WAIT_UNTIL,
};

// Console
export const TEST_CONSOLE_ASSERT: Mock = vi.fn();
export const TEST_CONSOLE_CLEAR: Mock = vi.fn();
export const TEST_CONSOLE_COUNT: Mock = vi.fn();
export const TEST_CONSOLE_COUNT_RESET: Mock = vi.fn();
export const TEST_CONSOLE_DEBUG: Mock = vi.fn();
export const TEST_CONSOLE_DIR: Mock = vi.fn();
export const TEST_CONSOLE_DIRXML: Mock = vi.fn();
export const TEST_CONSOLE_ERROR: Mock = vi.fn();
export const TEST_CONSOLE_GROUP: Mock = vi.fn();
export const TEST_CONSOLE_GROUP_COLLAPSED: Mock = vi.fn();
export const TEST_CONSOLE_GROUP_END: Mock = vi.fn();
export const TEST_CONSOLE_INFO: Mock = vi.fn();
export const TEST_CONSOLE_LOG: Mock = vi.fn();
export const TEST_CONSOLE_PROFILE: Mock = vi.fn();
export const TEST_CONSOLE_PROFILE_END: Mock = vi.fn();
export const TEST_CONSOLE_TABLE: Mock = vi.fn();
export const TEST_CONSOLE_TIME: Mock = vi.fn();
export const TEST_CONSOLE_TIME_END: Mock = vi.fn();
export const TEST_CONSOLE_TIME_LOG: Mock = vi.fn();
export const TEST_CONSOLE_TIME_STAMP: Mock = vi.fn();
export const TEST_CONSOLE_TRACE: Mock = vi.fn();
export const TEST_CONSOLE_WARN: Mock = vi.fn();

class TestConsole implements Console {
  public readonly assert = TEST_CONSOLE_ASSERT;
  public readonly clear = TEST_CONSOLE_CLEAR;
  public readonly Console = TestConsole;
  public readonly count = TEST_CONSOLE_COUNT;
  public readonly countReset = TEST_CONSOLE_COUNT_RESET;
  public readonly debug = TEST_CONSOLE_DEBUG;
  public readonly dir = TEST_CONSOLE_DIR;
  public readonly dirxml = TEST_CONSOLE_DIRXML;
  public readonly error = TEST_CONSOLE_ERROR;
  public readonly group = TEST_CONSOLE_GROUP;
  public readonly groupCollapsed = TEST_CONSOLE_GROUP_COLLAPSED;
  public readonly groupEnd = TEST_CONSOLE_GROUP_END;
  public readonly info = TEST_CONSOLE_INFO;
  public readonly log = TEST_CONSOLE_LOG;
  public readonly profile = TEST_CONSOLE_PROFILE;
  public readonly profileEnd = TEST_CONSOLE_PROFILE_END;
  public readonly table = TEST_CONSOLE_TABLE;
  public readonly time = TEST_CONSOLE_TIME;
  public readonly timeEnd = TEST_CONSOLE_TIME_END;
  public readonly timeLog = TEST_CONSOLE_TIME_LOG;
  public readonly timeStamp = TEST_CONSOLE_TIME_STAMP;
  public readonly trace = TEST_CONSOLE_TRACE;
  public readonly warn = TEST_CONSOLE_WARN;
}

export const TEST_CONSOLE: Console = new TestConsole();

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

// eslint-disable-next-line func-style
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
interface D1Result {
  readonly error?: Error | undefined;
  readonly lastRowId?: number | undefined;
  readonly results?: readonly unknown[] | undefined;
}

export class TestD1Database implements D1Database {
  readonly #preparedStatements = new Map<string, TestD1PreparedStatement>();
  readonly #queries = new Map<string, D1Result>();

  public constructor(queries: Record<string, D1Result> = {}) {
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
    const result: D1Result | undefined = this.#queries.get(query);
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

export class TestKVNamespace<
  Key extends string = string,
> implements KVNamespace<Key> {
  readonly #put =
    vi.fn<
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
