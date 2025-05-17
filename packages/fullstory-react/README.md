# Fullstory for React applications

[![version](https://img.shields.io/npm/v/fullstory-react.svg)](https://www.npmjs.com/package/fullstory-react)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/fullstory-react.svg)](https://www.npmjs.com/package/fullstory-react)
[![downloads](https://img.shields.io/npm/dt/fullstory-react.svg)](https://www.npmjs.com/package/fullstory-react)

Fullstory integration with React

## Use

```tsx
// my-component.tsx
import { type FSApi, useFullstory } from 'fullstory-react';
import { type ReactElement } from 'react';

export default function App(): ReactElement {
  const fullstory: FSApi = useFullstory();

  useEffect((): void => {
    fullstory('log', { msg: 'Hello world' });
  }. [fullstory]);

  return <>Hello world!</>;
}
```

## Testing

To mock the Fullstory API in unit tests, wrap your component or hook with the
`MockFullstory` component.

```tsx
// my-component.test.tsx
import { render } from '@testing-library/react';
import { MockFullstory } from 'fullstory-react';
import { type ReactElement } from 'react';
import { vi } from 'vitest';
import MyComponent from './my-component.js';

const mockFSApi = vi.fn();

describe('MyComponent', (): void => {
  it('should call the Fullstory API', (): void => {
    render(<MyComponent />, {
      wrapper({ children }): ReactElement {
        return <MockFullstory FullStory={mockFSApi}>{children}</MockFullstory>;
      },
    });

    expect(mockFSApi).toHaveBeenCalledOnce();
    expect(mockFSApi).toHaveBeenLastCalledWith('log', { msg: 'Hello world' });
  });
});
```

## Integrations

### Segment

To integrate with Segment, visit the Segment website, navigate to Catalog,
select FullStory, then add your Fullstory organization ID.

### Sentry

To integrate with Sentry, visit the Sentry website, navigate to your
organization settings, to Security & Privacy, to Data Scrubbing, then add
`fullStoryUrl` to the Global Safe Fields.
