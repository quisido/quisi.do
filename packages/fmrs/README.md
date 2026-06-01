# filter/find, map, reduce, sort

[![CI/CD](https://github.com/quisido/quisi.do/actions/workflows/cd.yml/badge.svg?branch=main&event=push)](https://github.com/quisido/quisi.do/actions/workflows/cd.yml)
[![version](https://img.shields.io/npm/v/fmrs.svg)](https://www.npmjs.com/package/fmrs)
[![downloads](https://img.shields.io/npm/dt/fmrs.svg)](https://www.npmjs.com/package/fmrs)

`fmrs` is a collection of utility functions that _filter/find_, _map_, _reduce_,
and _sort_ JavaScript primitives and built-ins between each other.

For example:

- _Mapping_ the boolean `true` to a string would be `'true'`.
- _Reducing_ the entries `[['key', 'value']]` to a record would be
  `{ key: 'value' }`.
- _Sorting_ the values `1` and `2` would be `-1`.

## Filters and finders

- `Record<number | string | symbol, unknown>` (`isRecord`)
- boolean (`isBoolean`)
- defined (`isDefined`)
- number (`isNumber`)
- object (`isObject`)
- string (`isString`)
- undefined (`isUndefined`)

## Mappers

| from      | to       | example                                  |
| --------- | -------- | ---------------------------------------- |
| boolean   | number   | `[false, true].map(mapBooleanToNumber)`  |
| entries   | `Record` | `mapEntriesToRecord([['key', 'value']])` |
| entry     | key      | `mapEntryToKey(['key', 'value'])`        |
| entry     | value    | `mapEntryToValue(['key', 'value'])`      |
| `Map`     | entries  | `mapMapToEntries(new Map())`             |
| `Map`     | `Record` | `mapMapToRecord(new Map())`              |
| `unknown` | `Error`  | `arr.map(toError)`                       |
| `unknown` | index    | `arr.map(toIndex)`                       |
| `unknown` | string   | `arr.map(toString)`                      |

## Reducers

| from    | to       | example                                                    |
| ------- | -------- | ---------------------------------------------------------- |
| entries | `Record` | `Object.entries(record).reduce(reduceEntriesToRecord, {})` |

## Sorters

| items     | example                          |
| --------- | -------------------------------- |
| arrays    | `arrOfArrs.sort(sortByIndex(0))` |
| numbers   | `arr.sort(sortNumbers)`          |
| strings   | `arr.sort(sortStrings)`          |
| `unknown` | `arr.sort(sort)`                 |

## Utilities

| function | example                           |
| -------- | --------------------------------- |
| `is`     | `['a', 'b'].filter(is('a'))`      |
| `isNot`  | `['a', 'b'].filter(isNot('a'))`   |
| `not`    | `['a', 'b'].filter(not(is('a')))` |
