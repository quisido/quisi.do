# `useShallowMemo`

[![CI/CD](https://github.com/quisido/quisi.do/actions/workflows/cd.yml/badge.svg?branch=main&event=push)](https://github.com/quisido/quisi.do/actions/workflows/cd.yml)
[![version](https://img.shields.io/npm/v/use-shallow-memo.svg)](https://www.npmjs.com/package/use-shallow-memo)
[![downloads](https://img.shields.io/npm/dt/use-shallow-memo.svg)](https://www.npmjs.com/package/use-shallow-memo)

a React hook for memoizing objects

## Use

```jsx
import useShallowMemo from 'use-shallow-memo';

export default function MyComponent({ data }) {
  const memoizedData = useShallowMemo(data);

  // Even though `data` changes every render, `memoizedData` does not.
  useEffect(() => {
    alert(memoizedData.message); // Hello world!
  }, [memoizedData]);

  // ...
}

<MyComponent
  data={{
    message: 'Hello world!',
  }}
/>
```
