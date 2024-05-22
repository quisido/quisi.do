import isObject from "./is-object.js";

export default function isConsole(value: unknown): value is Console {
  return (
    isObject(value) &&
    'assert' in value &&
    typeof value["assert"] === 'function' &&
    'clear' in value &&
    typeof value["clear"] === 'function' &&
    'count' in value &&
    typeof value["count"] === 'function' &&
    'countReset' in value &&
    typeof value["countReset"] === 'function' &&
    'debug' in value &&
    typeof value["debug"] === 'function' &&
    'dir' in value &&
    typeof value["dir"] === 'function' &&
    'dirxml' in value &&
    typeof value["dirxml"] === 'function' &&
    'error' in value &&
    typeof value["error"] === 'function' &&
    'group' in value &&
    typeof value["group"] === 'function' &&
    'groupCollapsed' in value &&
    typeof value["groupCollapsed"] === 'function' &&
    'groupEnd' in value &&
    typeof value["groupEnd"] === 'function' &&
    'info' in value &&
    typeof value["info"] === 'function' &&
    'log' in value &&
    typeof value["log"] === 'function' &&
    'table' in value &&
    typeof value["table"] === 'function' &&
    'time' in value &&
    typeof value["time"] === 'function' &&
    'timeEnd' in value &&
    typeof value["timeEnd"] === 'function' &&
    'timeLog' in value &&
    typeof value["timeLog"] === 'function' &&
    'timeStamp' in value &&
    typeof value["timeStamp"] === 'function' &&
    'trace' in value &&
    typeof value["trace"] === 'function' &&
    'warn' in value &&
    typeof value["warn"] === 'function'
  );
}
