/// <reference types="@cloudflare/workers-types" />
import isObject from './is-object.js';

export default function isD1Database(value: unknown): value is D1Database {
  return (
    isObject(value) &&
    'batch' in value &&
    'dump' in value &&
    'exec' in value &&
    'prepare' in value &&
    typeof value.batch === 'function' &&
    typeof value.dump === 'function' &&
    typeof value.exec === 'function' &&
    typeof value.prepare === 'function'
  );
}
