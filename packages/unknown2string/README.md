# `mapUnknownToString`

[![GitHub Action](https://github.com/CharlesStover/charlesstover.com/actions/workflows/unknown2string.yml/badge.svg?branch=main&event=push)](https://github.com/CharlesStover/charlesstover.com/actions/workflows/unknown2string.yml)
[![version](https://img.shields.io/npm/v/unknown2string.svg)](https://www.npmjs.com/package/unknown2string)
[![downloads](https://img.shields.io/npm/dt/unknown2string.svg)](https://www.npmjs.com/package/unknown2string)

- Takes any value
- Returns a string

It'll take a `boolean`, a `number`, `null`, `undefined`, an `Array`, an `Error`,
an `object`, even another `string`!

## Examples:

```js
const unknowns = [
  true,
  false,
  123,
  null,
  undefined,
  ['Hello', 'world'],
  new Error('test error message'),
  { Hello: 'world' },
  'string',
];

const strings = unknowns.map(mapUnknownToString);
console.log(strings);

/*
[
  'true',
  'false',
  '123',
  'null',
  'undefined',
  '["Hello", "world"]',
  'test error message',
  '{"Hello": "world"}',
  'string',
]
*/
```
