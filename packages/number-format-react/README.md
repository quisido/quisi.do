# `NumberFormat`

[![version](https://img.shields.io/npm/v/number-format-react.svg)](https://www.npmjs.com/package/number-format-react)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/number-format-react.svg)](https://www.npmjs.com/package/number-format-react)
[![downloads](https://img.shields.io/npm/dt/number-format-react.svg)](https://www.npmjs.com/package/number-format-react)

`number-format-react` is a React component implementation of the
[`Intl.NumberFormat` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).

## Install

- `npm install number-format-react` or
- `yarn add number-format-react`

## Use

```javascript
import NumberFormat from 'number-format-react';

function MyComponent() {
  return (
    <p>
      My favorite number is
      <NumberFormat>3141.58</NumberFormat>!
    </p>
  );
}
```

## Props

The `NumberFormat` component supports the entire `Intl.NumberFormat` API via
its props, with strong type-checking. For a full catalog of the
`Intl.NumberFormat` API, check out
[MDN's documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).
