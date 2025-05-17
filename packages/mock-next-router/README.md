# `MockNextRouter`

[![version](https://img.shields.io/npm/v/mock-next-router.svg)](https://www.npmjs.com/package/mock-next-router)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/mock-next-router.svg)](https://www.npmjs.com/package/mock-next-router)
[![downloads](https://img.shields.io/npm/dt/mock-next-router.svg)](https://www.npmjs.com/package/mock-next-router)

`MockNextRouter` is a mocked NextJS Router context provider for use in unit
tests. It uses the `history` package for managing pathname and search
parameters. It uses the `window`'s `hashchange` event for managing hashes, so
you will want to use a `jsdom` test environment.

```sh
pnpm add --dev history mock-next-router
npm install --save-dev history mock-next-router
yarn add --dev history mock-next-router
```

## Simple example

If your component makes use of a Next router, e.g. the `useRouter` hook, then
add the `MockNextRouter` component as a wrapper.

```ts
import { act, render } from '@testing-library/react';
import MockNextRouter from 'mock-next-router';
import MyComponent from './my-component.js';

describe('MyComponent', (): void => {
  it('should support routing', (): void => {
    const { getByText } = render(<MyComponent />, {
      wrapper: MockNextRouter,
    });

    act((): void => {
      getByText('my link').click();
    });
  });
});
```

## Prefetching

If you want to test prefetching, provide a `prefetch` prop.

```tsx
import { render } from '@testing-library/react';
import MockNextRouter from 'mock-next-router';
import { vi } from 'vitest';
import MyComponent from './my-component.js';

describe('MyComponent', (): void => {
  it('should support prefetching', (): void => {
    const prefetch = vi.fn();
    const { getByText } = render(<MyComponent />, {
      wrapper({ children }) {
        return <MockNextRouter prefetch={prefetch}>{children}</MockNextRouter>;
      },
    });

    expect(prefetch).toHaveBeenCalledTimes(1);
    expect(prefetch).toHaveBeenLastCalledWith('/my-link');
  });
});
```

## Manual navigation

If you want to _manually_ test navigation, provide a `history` prop, then use
that instance to change the state.

```tsx
import { act, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import MockNextRouter from 'mock-next-router';
import MyComponent from './my-component.js';

describe('MyComponent', (): void => {
  it('should respond to navigation', (): void => {
    const history = createMemoryHistory({
      initialEntries: ['/old-route'],
    });

    const { getByText } = render(<MyComponent />, {
      wrapper({ children }) {
        return <MockNextRouter history={history}>{children}</MockNextRouter>;
      },
    });

    getByText('old route text');

    act((): void => {
      history.push('/new-route');
    });

    getByText('new route text');
  });
});
```
