/// <reference types="@cloudflare/workers-types" />

import hasMethods from "./has-methods.js";
import isRecord from "./is-record.js";

const REQUIRED_METHODS: readonly (keyof Console)[] = [
  'assert',
  'clear',
  'count',
  'countReset',
  'debug',
  'dir',
  'dirxml',
  'error',
  'group',
  'groupCollapsed',
  'groupEnd',
  'info',
  'log',
  'table',
  'time',
  'timeEnd',
  'timeLog',
  'timeStamp',
  'trace',
  'warn',
];

export default function isConsole(value: unknown): value is Console {
  if (!isRecord(value)) {
    return false;
  }

  return hasMethods(value, REQUIRED_METHODS);
}
