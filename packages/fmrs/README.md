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

- number
- string

## Mappers

| from    | to            |
| ------- | ------------- |
| entries | Record (`{}`) |
| `Map`   | entries       |
| `Map`   | Record (`{}`) |
| unknown | index         |
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
