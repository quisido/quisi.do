/// <reference types="@cloudflare/workers-types" />
import { isRecord } from 'fmrs';
import hasMethods from './has-methods.js';

const REQUIRED_METHODS: readonly (keyof KVNamespace)[] = [
  'delete',
  'get',
  'getWithMetadata',
  'list',
  'put',
];

export default function isKVNamespace(value: unknown): value is KVNamespace {
  return isRecord(value) && hasMethods(value, REQUIRED_METHODS);
}
