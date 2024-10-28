/// <reference types="@cloudflare/workers-types" />
import { isRecord } from 'fmrs';

export default function isKVNamespace(value: unknown): value is KVNamespace {
  return (
    isRecord(value) &&
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
