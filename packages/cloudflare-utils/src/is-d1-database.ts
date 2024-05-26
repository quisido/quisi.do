/// <reference types="@cloudflare/workers-types" />

import hasMethods from "./has-methods.js";
import isRecord from "./is-record.js";

const REQUIRED_METHODS: readonly (keyof D1Database)[] = [
  'batch',
  'dump',
  'exec',
  'prepare',
];

export default function isD1Database(value: unknown): value is D1Database {
  return (
    isRecord(value) &&
    hasMethods(value, REQUIRED_METHODS)
  );
}
