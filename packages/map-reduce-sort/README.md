# map, reduce, sort

[![CI/CD](https://github.com/quisido/quisi.do/actions/workflows/cd.yml/badge.svg?branch=main&event=push)](https://github.com/quisido/quisi.do/actions/workflows/cd.yml)
[![version](https://img.shields.io/npm/v/map-reduce-sort.svg)](https://www.npmjs.com/package/map-reduce-sort)
[![downloads](https://img.shields.io/npm/dt/map-reduce-sort.svg)](https://www.npmjs.com/package/map-reduce-sort)

`map-reduce-sort` is a collection of utility functions that _map_, _reduce_, and
_sort_ JavaScript primitives and built-ins between each other.

For example:

- _Mapping_ the boolean `true` to a string would be `'true'`.
- _Reducing_ the entries `[['key', 'value']]` to a record would be
  `{ key: 'value' }`.
- _Sorting_ the values `1` and `2` would be `-1`.

## Mappers

| from    | to            |
| ------- | ------------- |
| entries | Record (`{}`) |
| `Map`   | entries       |
| `Map`   | Record (`{}`) |
| unknown | string        |

## Reducers

| from    | to            |
| ------- | ------------- |
| entries | Record (`{}`) |

## Sorters

- arrays (by index)
- number
- string
- unknown
