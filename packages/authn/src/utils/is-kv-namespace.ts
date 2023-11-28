/// <reference types="@cloudflare/workers-types" />
import isObject from './is-object.js';

export default function isKVNamespace(value: unknown): value is KVNamespace {
  return (
    isObject(value) &&
    'delete' in value &&
    'get' in value &&
    'getWithMetadata' in value &&
    'list' in value &&
    'put' in value &&
    typeof value['delete'] === 'function' &&
    typeof value['get'] === 'function' &&
    typeof value['getWithMetadata'] === 'function' &&
    typeof value['list'] === 'function' &&
    typeof value['put'] === 'function'
  );
}
