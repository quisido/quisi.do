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

- number (`value is number`)
  - `arr.every(isNumber)`
  - `arr.filter(filterByNumber)`
  - `arr.find(findNumber)`
- object (`value is object`)
  - `arr.every(isObject)`
  - `arr.filter(filterByObject)`
  - `arr.find(findObject)`
- record (`value is Record<number | string | symbol, unknown>`)
  - `arr.every(isRecord)`
  - `arr.filter(filterByRecord)`
  - `arr.find(findRecord)`
- string
  - `arr.every(isString)`
  - `arr.filter(filterByString)`
  - `arr.find(findString)`

## Mappers

| from    | to            | example                                  |
| ------- | ------------- | ---------------------------------------- |
| entries | Record (`{}`) | `mapEntriesToRecord([['key', 'value']])` |
| `Map`   | entries       | `mapMapToEntries(new Map())`             |
| `Map`   | Record (`{}`) | `mapMapToRecord(new Map())`              |
| unknown | index         | `arr.map(mapToIndex)`                    |
| unknown | string        | `arr.map(mapToString)`                   |

## Reducers

| from    | to            | example                                                    |
| ------- | ------------- | ---------------------------------------------------------- |
| entries | Record (`{}`) | `Object.entries(record).reduce(reduceEntriesToRecord, {})` |

## Sorters

| items           | example                          |
| --------------- | -------------------------------- |
| any             | `arr.sort(sort)`                 |
| arrays by index | `arrOfArrs.sort(sortByIndex(0))` |
| numbers         | `arr.sort(sortNumbers)`          |
| numbers         | `arr.sort(sortStrings)`          |
