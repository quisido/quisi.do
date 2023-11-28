/// <reference types="@cloudflare/workers-types" />
import isObject from './is-object.js';

export default function isR2Bucket(value: unknown): value is R2Bucket {
  return (
    isObject(value) &&
    'createMultipartUpload' in value &&
    'delete' in value &&
    'get' in value &&
    'head' in value &&
    'list' in value &&
    'put' in value &&
    'resumeMultipartUpload' in value &&
    typeof value['createMultipartUpload'] === 'function' &&
    typeof value['delete'] === 'function' &&
    typeof value['get'] === 'function' &&
    typeof value['head'] === 'function' &&
    typeof value['list'] === 'function' &&
    typeof value['put'] === 'function' &&
    typeof value['resumeMultipartUpload'] === 'function'
  );
}
