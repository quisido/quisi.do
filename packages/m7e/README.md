# `m7e`

[![CI/CD](https://github.com/quisido/quisi.do/actions/workflows/cd.yml/badge.svg?branch=main&event=push)](https://github.com/quisido/quisi.do/actions/workflows/cd.yml)
[![version](https://img.shields.io/npm/v/m7e.svg)](https://www.npmjs.com/package/m7e)
[![downloads](https://img.shields.io/npm/dt/m7e.svg)](https://www.npmjs.com/package/m7e)

`m7e`, short for "map" plus "reduce," is a collection of utility functions that
_map_ and _reduce_ JavaScript primitives and built-ins between each other.

For example:

- _Mapping_ the boolean `true` to a string would be `'true'`.
- _Reducing_ the entries `[['key', 'value']]` to a record would be
  `{ key: 'value' }`.

## Supported

### Mappers

| Input   | Output |
| ------- | ------ |
| entries | Record (`{}`) |
| `Map` | entries |
| `Map` | Record (`{}`) |

### Reducers

| Input | Output |
| ----- | ------ |
| entries | Record (`{}`) |
