# FullStory for React applications

[![version](https://img.shields.io/npm/v/fullstory-react.svg)](https://www.npmjs.com/package/fullstory-react)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/fullstory-react.svg)](https://www.npmjs.com/package/fullstory-react)
[![downloads](https://img.shields.io/npm/dt/fullstory-react.svg)](https://www.npmjs.com/package/fullstory-react)

FullStory integration with React

## Install

- `npm install fullstory-react` or
- `yarn add fullstory-react`

## Use

```jsx
import { useFullStory } from 'fullstory-react';

export default function App() {
  const { shutdown } = useFullStory({
    orgId: 'my-org-id',
  });

  // On unmount, shutdown FullStory.
  useEffect(() => shutdown);

  return <>Hello world!</>;
}
```

The `useFullStory` hook accepts all the same properties that would be passed to
the FullStory `init` method. The hook returns the `FS` object (type `FSApi`).

## Testing

To mock the FullStory API in unit tests, wrap your component or hook with the
`MockFullStory` component.

```jsx
import { render } from '@testing-library/react';
import { MockFullStory } from 'fullstory-react';
import MyComponent from './my-component.js';

const ONCE = 1;

describe('MyComponent', () => {
  it('should initialize FullStory', () => {
    const mockInit = jest.fn();

    render(<MyComponent />, {
      wrapper({ children }) {
        return <MockFullStory init={mockInit}>{children}</MockFullStory>;
      },
    });

    expect(mockInit).toHaveBeenCalledTimes(ONCE);
    expect(mockInit).toHaveBeenLastCalledWith({
      orgId: 'my-org-id',
    });
  });

  it('should shutdown FullStory on unmount', () => {
    const mockShutdown = jest.fn();

    const { unmount } = render(<MyComponent />, {
      wrapper({ children }) {
        return (
          <MockFullStory
            init={jest.fn()}
            onShutdown={mockShutdown}
          >
            {children}
          </MockFullStory>
        );
      },
    });

    expect(mockShutdown).not.toHaveBeenCalled();

    unmount();

    expect(mockShutdown).toHaveBeenCalledTimes(ONCE);
  });
});
```

The prop names for the `init` and `isInitiated` methods are named `init` and
`isInitiated` respectively. The prop names for all other operations are
camel-case: `on{Operation}`. The TypeScript definition for `MockFullStory` will
help you with auto-completion.

## Integrations

### Segment

To integrate with Segment, visit the Segment website, navigate to Catalog,
select FullStory, then add your FullStory organization ID.

### Sentry

To integrate with Sentry, visit the Sentry website, navigate to your
organization settings, to Security & Privacy, to Data Scrubbing, then add
`fullStoryUrl` to the Global Safe Fields.
