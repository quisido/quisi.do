/// <reference types="@cloudflare/workers-types" />
import { expect, vi } from 'vitest';
import createNotImplementedThrower from './create-not-implemented-thrower.js';

const TEST_PUT = (): Promise<void> => Promise.resolve();

export default class TestKVNamespace<
  Key extends string = string,
> implements KVNamespace<Key> {
  readonly #put =
    vi.fn<
      (
        key: Key,
        value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
        options?: KVNamespacePutOptions,
      ) => Promise<void>
    >(TEST_PUT);

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
