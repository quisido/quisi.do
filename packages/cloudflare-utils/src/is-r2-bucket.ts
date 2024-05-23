/// <reference types="@cloudflare/workers-types" />

import hasMethods from "./has-methods.js";
import isRecord from "./is-record.js";

const REQUIRED_METHODS: readonly (keyof R2Bucket)[] = [
  'createMultipartUpload',
  'delete',
  'get',
  'head',
  'list',
  'put',
  'resumeMultipartUpload',
];

export default function isR2Bucket(value: unknown): value is R2Bucket {
  return (
    isRecord(value) &&
    hasMethods(value, REQUIRED_METHODS)
  );
}
