# `usePropertyFilter`

`usePropertyFilter` is a React hook for managing `PropertyFilter`'s state with
React Router.

## Table of Contents

- [Props](#props)
  - [`defaultOperation`](#defaultoperation)
  - [`delimiter`](#delimiter)
  - [`propertyKeys`](#propertykeys)
- [State](#state)
  - [`handleChange`](#handlechange)
  - [`query`](#query)
- [Examples](#examples)

## Props

### `defaultOperation`

Type: `'and' | 'or'` _(optional)_

### `delimiter`

Type: `string` _(optional)_

Default: `','`

### `propertyKeys`

Type: `string[]` _(optional)_

The property keys array specifies which search parameters in the URL belong to
the property filter. When the property filter tokens change, only search keys
present in this array are changed. This is important for maintaining other
search keys.

## State

### `handleChange`

`PropertyFilter`'s `onChange` prop

### `query`

`PropertyFilter`'s `query` prop

## Examples

```jsx
import PropertyFilter from '@awsui/components-react/property-filter';
import { usePropertyFilter } from 'use-next-awsui';

const FILTERING_PROPERTIES = [
  // ...
];

export default function MyPropertyFilter() {
  const { handleChange, query } = usePropertyFilter();

  return (
    <PropertyFilter
      filteringProperties={FILTERING_PROPERTIES}
      onChange={handleChange}
      query={query}
    />
  );
}
```
