/// <reference types="@cloudflare/workers-types" />
import { expect, vi } from 'vitest';
import unimplementedMethod from './unimplemented-method.js';

const TEST_PUT = (): Promise<void> => Promise.resolve();

export default class TestKVNamespace<Key extends string = string>
  implements KVNamespace<Key>
{
  readonly #put =
    vi.fn<
      (
        key: Key,
        value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
        options?: KVNamespacePutOptions,
      ) => Promise<void>
    >(TEST_PUT);
  public delete = unimplementedMethod;
  public getWithMetadata = unimplementedMethod;
  public list = unimplementedMethod;
  #record: Partial<Record<string, string>>;

  public constructor(record: Partial<Record<string, string>>) {
    this.#record = record;
  }

  public expectToHavePut = (
    key: Key,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
    options?: KVNamespacePutOptions,
  ): void => {
    expect(this.#put).toHaveBeenCalledWith(key, value, options);
  };

  public get(
    key: Key,
    options?:
      | Partial<KVNamespaceGetOptions<undefined>>
      | KVNamespaceGetOptions<'text'>,
  ): Promise<string | null>;
  public async get(key: Key, type: 'text'): Promise<string | null>;
  public async get<ExpectedValue = unknown>(
    key: Key,
    type: 'json',
  ): Promise<ExpectedValue | null>;
  public async get(key: Key, type: 'arrayBuffer'): Promise<ArrayBuffer | null>;
  public async get(key: Key, type: 'stream'): Promise<ReadableStream | null>;
  public async get<ExpectedValue = unknown>(
    key: Key,
    options?: KVNamespaceGetOptions<'json'>,
  ): Promise<ExpectedValue | null>;
  public async get(
    key: Key,
    options?: KVNamespaceGetOptions<'arrayBuffer'>,
  ): Promise<ArrayBuffer | null>;
  public async get(
    key: Key,
    options?: KVNamespaceGetOptions<'stream'>,
  ): Promise<ReadableStream | null>;
  public async get<ExpectedValue = unknown>(
    key: string,
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
  ): Promise<ExpectedValue | ReadableStream | string | null> {
    switch (options) {
      case 'text':
        return Promise.resolve(this.#record[key] ?? null);
      default:
        throw new Error('Not implemented');
    }
  }

  public readonly put: KVNamespace<Key>['put'] = (
    key: Key,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
    options?: KVNamespacePutOptions,
  ): Promise<void> => {
    return this.#put(key, value, options);
  };
}
